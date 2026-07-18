"use strict";
// Expression transpiler — token stream → JS expression strings: atoms,
// identifier chains, constructor expressions (VALUE/COND/NEW/...), operator
// mapping, named-args rendering and the client-signature introspection.

const fs = require("fs");
const path = require("path");
const { KW, isAdjacent, isParenL, isBrackL, isTmplBegin, isTmplMiddle, isTmplEnd, isTmpl, isStr, isId, isDash, isInstArrow, isStatArrow, depthDelta, matchGroup, escTemplateText, unescAbapTemplate, stringToken, commentSafe, isRowParen, looksLikeKey, topIndexOfWord, findTopWord } = require("./lex");
const { SY_RUNTIME_FIELDS, requirePathFor, JS_RESERVED, safeIdent, paramName } = require("./naming");
const { Ctx } = require("./model");

// ---------------------------------------------------------------------------
// target signature introspection
//
// The hand-written client port (srv/z2ui5/01/02/z2ui5_cl_core_client.js) uses
// POSITIONAL parameters, while the view builder & transpiled app classes use
// destructured option objects. ABAP named arguments on a client receiver are
// therefore mapped to positional arguments in the order of the real JS
// signature, which is parsed from the port's source once.
// ---------------------------------------------------------------------------

let _clientSig;
function clientSignature() {
  if (_clientSig !== undefined) return _clientSig;
  _clientSig = null;
  const p = path.join(__dirname, "..", "..", "core", "srv", "z2ui5", "01", "02", "z2ui5_cl_core_client.js");
  if (!fs.existsSync(p)) return _clientSig;
  _clientSig = new Map();
  const src = fs.readFileSync(p, "utf8");
  // signatures may span multiple lines (e.g. message_box_display)
  const re = /^  (?:static |async )*([a-z_][a-z0-9_]*)\(([^)]*?)\)\s*\{/gms;
  let m;
  while ((m = re.exec(src)) !== null) {
    const raw = m[2].replace(/\s+/g, " ").trim();
    const destructured = raw.startsWith("{");
    const params = destructured
      ? []
      : raw === ""
        ? []
        : raw.split(",").map((s) => s.trim().split("=")[0].trim());
    _clientSig.set(m[1], { params, destructured });
  }
  return _clientSig;
}

function isClientReceiver(recv) {
  return recv === "client" || recv === "this.client" || /\.client$/.test(recv);
}

// _bind / _bind_edit: ABAP identifies nested struct members via reference
// semantics (REF #). JS values carry no identity, so the runtime needs the
// attribute path passed explicitly. Keep `val` positional, move all other
// ABAP parameters into the opts object, and derive `name` whenever the bound
// value is a member chain of an app attribute (rendered as `this.a.b`).
const BIND_METHS = new Set(["_bind", "_bind_edit"]);
const APP_MEMBER_PATH = /^this\.([A-Za-z0-9_$]+(?:\.[A-Za-z0-9_$]+)+)$/;

function bindArgs(meth, groupToks, ctx) {
  if (!BIND_METHS.has(meth)) return null;
  const named = namedArgsOf(groupToks, ctx);
  let valExpr;
  const extra = [];
  if (named) {
    if (!named.has("val")) return null;
    for (const [k, v] of named.entries()) {
      if (k === "val") valExpr = renderNamedVal(v);
      else extra.push(`${k}: ${renderNamedVal(v)}`);
    }
  } else {
    valExpr = txArgs(groupToks, ctx, meth);
    if (!valExpr || !APP_MEMBER_PATH.test(valExpr)) return null;
  }
  const m = APP_MEMBER_PATH.exec(valExpr || "");
  if (m) extra.unshift(`name: \`${m[1].replace(/\./g, "-")}\``);
  if (!valExpr) return null;
  return extra.length ? `${valExpr}, { ${extra.join(", ")} }` : valExpr;
}

/** named args on a client method → positional args in JS signature order */
function clientArgs(meth, groupToks, ctx) {
  const sig = clientSignature()?.get(meth);
  const named = namedArgsOf(groupToks, ctx);
  if (!named || !sig || sig.destructured || !sig.params.length) return null;
  const pos = sig.params.map((p) => (named.has(p) ? renderNamedVal(named.get(p)) : "undefined"));
  while (pos.length && pos[pos.length - 1] === "undefined") pos.pop();
  if ([...named.keys()].some((k) => !sig.params.includes(k))) return null; // unknown param — keep object
  return pos.join(", ");
}

// ---------------------------------------------------------------------------
// expression transpiler
// ---------------------------------------------------------------------------

const BUILTIN_PREDICATES = new Set(["xsdbool", "boolc", "line_exists"]);
const CONSTRUCTORS = new Set(["VALUE", "COND", "NEW", "CONV", "SWITCH", "CORRESPONDING", "REF", "EXACT", "REDUCE", "FILTER", "CAST"]);

/** transpile a full expression token list to a JS expression string */
function txExpr(toks, ctx) {
  const atoms = toAtoms(toks, ctx);
  return joinAtoms(atoms, ctx);
}

/** condition context: same as txExpr (comparison mapping happens in joinAtoms) */
function txCond(toks, ctx) {
  return txExpr(toks, ctx);
}

/**
 * Pass A: collapse the token stream into atoms — each atom is either a fully
 * rendered primary (identifier chain incl. calls, literals, templates,
 * constructor expressions) or an operator/keyword marker.
 */
function toAtoms(toks, ctx) {
  const atoms = [];
  let i = 0;
  while (i < toks.length) {
    const t = toks[i];
    const up = KW(t.str);

    // constructor expressions: VALUE #( ... ), COND #( ... ), NEW type( ... ),
    // VALUE intf=>ty_s_x( ... ) — the type may span `intf=>type` token chains
    if (isId(t) && CONSTRUCTORS.has(up) && i + 1 < toks.length) {
      let open = -1;
      let typeName = null;
      if (toks[i + 1].str === "#") {
        if (isParenL(toks[i + 2] ?? { type: "" })) {
          open = i + 2;
          typeName = null;
        }
      } else {
        let k = i + 1;
        while (k < toks.length && (isId(toks[k]) || isStatArrow(toks[k]))) k++;
        if (k > i + 1 && toks[k] && isParenL(toks[k])) {
          open = k;
          typeName = toks
            .slice(i + 1, k)
            .map((x) => x.str)
            .join("")
            .toLowerCase();
        }
      }
      if (open >= 0) {
        const close = matchGroup(toks, open);
        const inner = toks.slice(open + 1, close);
        atoms.push({ kind: "expr", str: txConstructor(up, typeName, inner, ctx) });
        i = close + 1;
        i = chainSuffix(toks, i, atoms, ctx);
        continue;
      }
    }

    // primaries — note: comparison operators (=, <>, >, ...) lex as
    // Identifier tokens too, so require a word/number/field-symbol shape here.
    // The 2-letter word operators (eq/lt/cs/ns/…) are also legal identifiers:
    // treat them as identifiers when NOT in operator position (i.e. an operand
    // is expected — at the start, or right after another operator), so a
    // variable/param named `lt` or `ns` is not mistaken for a comparison.
    const wordShaped = isId(t) && (/^[a-z0-9_]/i.test(t.str) || /^<\w+>$/.test(t.str));
    const operandExpected = atoms.length === 0 || atoms[atoms.length - 1].kind === "op";
    const asIdent = wordShaped && (!isOperatorWord(up) || (AMBIGUOUS_OP_IDENTS.has(up) && operandExpected));
    if (isStr(t) || isTmplBegin(t) || isTmpl(t) || asIdent || isParenL(t)) {
      const { str, next } = parsePrimary(toks, i, ctx);
      atoms.push({ kind: "expr", str });
      i = next;
      continue;
    }

    // ABAP offset/length substring: var+off(len) — no whitespace around +
    if (t.str === "+" && atoms.length && atoms[atoms.length - 1].kind === "expr" && isAdjacent(toks[i - 1], t) && isAdjacent(t, toks[i + 1]) && toks[i + 2] && isParenL(toks[i + 2]) && (/^\d+$/.test(toks[i + 1].str) || isId(toks[i + 1]))) {
      const base = atoms.pop().str;
      const off = /^\d+$/.test(toks[i + 1].str) ? toks[i + 1].str : txExpr([toks[i + 1]], ctx);
      const close = matchGroup(toks, i + 2);
      const lenToks = toks.slice(i + 3, close);
      const len = lenToks.length === 1 && lenToks[0].str === "*" ? null : txExpr(lenToks, ctx);
      atoms.push({ kind: "expr", str: len === null ? `String(${base}).substr(${off})` : `String(${base}).substr(${off}, ${len})` });
      i = close + 1;
      continue;
    }

    // operators / everything else
    atoms.push({ kind: "op", str: t.str, up });
    i++;
  }
  return atoms;
}

const OPERATOR_WORDS = new Set(["AND", "OR", "NOT", "IS", "IN", "EQ", "NE", "GT", "LT", "GE", "LE", "CS", "CP", "CO", "CN", "CA", "NA", "NS", "NP", "INITIAL", "BOUND", "SUPPLIED", "ASSIGNED", "INSTANCE", "OF", "BETWEEN", "XSDBOOL", "MOD", "DIV"]);
// Binary infix operators that are ALSO common identifier names (a namespace
// `ns`, a local table `lt`, …). They only act as operators in operator
// position; elsewhere they are plain identifiers. (AND/OR/NOT/IN/IS/BETWEEN are
// excluded — unlikely identifiers, and some are unary/keyword-shaped.)
const AMBIGUOUS_OP_IDENTS = new Set(["EQ", "NE", "GT", "LT", "GE", "LE", "CS", "CP", "CO", "CN", "CA", "NA", "NS", "NP", "MOD", "DIV"]);
function isOperatorWord(up) {
  return OPERATOR_WORDS.has(up) && up !== "XSDBOOL";
}

/** parse one primary starting at i; returns { str, next } */
function parsePrimary(toks, i, ctx) {
  const t = toks[i];

  // string literals
  if (isStr(t)) {
    return { str: stringToken(t.str), next: i + 1 };
  }

  // string templates |a { x } b|
  if (isTmpl(t)) {
    // template without embedded expressions: |text|
    return { str: "`" + escTemplateText(unescAbapTemplate(t.str.slice(1, -1))) + "`", next: i + 1 };
  }
  if (isTmplBegin(t)) {
    let out = "`" + escTemplateText(unescAbapTemplate(t.str.slice(1).replace(/\{\s*$/, "")));
    let j = i + 1;
    while (j < toks.length) {
      // collect expression tokens until Middle/End at depth 0
      const exprToks = [];
      let depth = 0;
      while (j < toks.length) {
        const tt = toks[j];
        if (depth === 0 && (isTmplMiddle(tt) || isTmplEnd(tt))) break;
        depth += depthDelta(tt);
        exprToks.push(tt);
        j++;
      }
      out += "${" + txTemplateExpr(exprToks, ctx) + "}";
      const tt = toks[j];
      if (isTmplMiddle(tt)) {
        out += escTemplateText(unescAbapTemplate(tt.str.replace(/^\}/, "").replace(/\{\s*$/, "")));
        j++;
        continue;
      }
      if (isTmplEnd(tt)) {
        out += escTemplateText(unescAbapTemplate(tt.str.replace(/^\}/, "").slice(0, -1)));
        j++;
        break;
      }
      break;
    }
    return { str: out + "`", next: j };
  }

  // parenthesized expression
  if (isParenL(t)) {
    const close = matchGroup(toks, i);
    const inner = txExpr(toks.slice(i + 1, close), ctx);
    const atoms = [{ kind: "expr", str: `(${inner})` }];
    const next = chainSuffix(toks, close + 1, atoms, ctx);
    return { str: atoms.map((a) => a.str).join(""), next };
  }

  // identifier chain
  return parseIdentChain(toks, i, ctx);
}

/** template expression may carry format options (ALPHA = ..., WIDTH = ...) */
function txTemplateExpr(exprToks, ctx) {
  const FORMAT = new Set(["ALPHA", "WIDTH", "PAD", "DATE", "TIME", "TIMESTAMP", "NUMBER", "SIGN", "DECIMALS", "ZERO", "STYLE", "CURRENCY", "COUNTRY", "ALIGN", "CASE", "EXPONENT", "XSD"]);
  for (let k = 0; k < exprToks.length; k++) {
    if (isId(exprToks[k]) && FORMAT.has(KW(exprToks[k].str)) && exprToks[k + 1]?.str === "=") {
      ctx.todos?.push(`format option dropped in template: ${exprToks.map((t) => t.str).join(" ")}`);
      exprToks = exprToks.slice(0, k);
      break;
    }
  }
  // a single identifier that collides with an operator word (a variable
  // named `and`, `in`, ...) is still just a variable here
  if (exprToks.length === 1 && isId(exprToks[0]) && isOperatorWord(KW(exprToks[0].str))) {
    return parseIdentChain(exprToks, 0, ctx).str;
  }
  return txExpr(exprToks, ctx);
}

const BUILTIN_FN = {
  lines: (args) => `${args[0]}.length`,
  strlen: (args) => `${args[0]}.length`,
  to_upper: (args) => `${args[0]}.toUpperCase()`,
  to_lower: (args) => `${args[0]}.toLowerCase()`,
  condense: (args) => `${args[0]}.trim()`,
  shift_left: null, // named args — handled below
  repeat: null,
  substring: null,
  replace: null,
  concat_lines_of: null,
  reverse: (args) => `${args[0]}.split("").reverse().join("")`,
  xsdbool: (args) => `Boolean(${args[0]})`,
  boolc: (args) => `Boolean(${args[0]})`,
  escape: null,
};

function renderBuiltinNamed(name, named, ctx) {
  const g = (k) => named.get(k);
  switch (name) {
    case "repeat":
      return `${g("val")}.repeat(${g("occ")})`;
    case "substring": {
      const off = g("off") ?? "0";
      return g("len") ? `${g("val")}.substr(${off}, ${g("len")})` : `${g("val")}.substr(${off})`;
    }
    case "replace":
      if (named.has("regex")) return `${g("val")}.replace(new RegExp(${g("regex")}, ${named.has("occ") ? "`g`" : "``"}), ${g("with")})`;
      return named.has("occ") ? `${g("val")}.replaceAll(${g("sub")}, ${g("with")})` : `${g("val")}.replace(${g("sub")}, ${g("with")})`;
    case "concat_lines_of":
      return `${g("table")}.join(${g("sep") ?? "``"})`;
    case "shift_left":
      if (named.has("places")) return `${g("val")}.slice(${g("places")})`;
      if (named.has("sub")) return `(${g("val")}.startsWith(${g("sub")}) ? ${g("val")}.slice((${g("sub")}).length) : ${g("val")})`;
      return null;
    case "escape":
      return null;
    default:
      return null;
  }
}

/** identifier chains: receiver=>method( ... )->meth( ... )-comp[ ... ] ... */
function parseIdentChain(toks, i, ctx) {
  const first = toks[i];
  // field symbols <fs> keep their name without the brackets
  const name = /^<\w+>$/.test(first.str) ? `fs_${first.str.slice(1, -1)}` : first.str;
  const lower = safeIdent(name.toLowerCase());
  const up = KW(name);
  let str;
  let j = i + 1;

  const callFollows = j < toks.length && isParenL(toks[j]);

  // interface components: intf~comp — the JS classes flatten interface
  // members, so own-interface calls go to this.comp, foreign ones to intf.comp
  if (name.includes("~")) {
    const [intfRaw, compRaw] = name.split("~");
    const intf = intfRaw.toLowerCase();
    const comp = compRaw.toLowerCase();
    const own = ctx.model.interfaces.includes(intf) || ctx.isOwnMethod(name.toLowerCase()) || ctx.isOwnMethod(comp);
    if (callFollows) {
      const close = matchGroup(toks, j);
      const args = txArgs(toks.slice(j + 1, close), ctx, comp);
      str = own ? `this.${comp}(${args})` : (ctx.requires?.add(intf), `${intf}.${comp}(${args})`);
      j = close + 1;
    } else if (!own && /^z2ui5_/.test(intf)) {
      ctx.requires?.add(intf);
      str = `${intf}.${comp}`;
    } else {
      str = `this.${comp}`;
    }
    const atoms0 = [{ kind: "expr", str }];
    j = chainSuffix(toks, j, atoms0, ctx);
    return { str: atoms0.map((a) => a.str).join(""), next: j };
  }

  if (up === "ME") {
    str = "this";
  } else if (up === "SUPER") {
    str = "super";
  } else if (up === "ABAP_TRUE") {
    str = "true";
  } else if (up === "ABAP_FALSE" || up === "ABAP_UNDEFINED") {
    str = "false";
  } else if (up === "SPACE") {
    str = "``";
  } else if (up === "SY" && isDash(toks[j] ?? { type: "" })) {
    const field = toks[j + 1].str.toLowerCase();
    str = field === "index" ? "sy_index" : field === "tabix" ? "sy_tabix" : `sy_${field}`;
    if (!["index", "tabix", "subrc"].includes(field) && !(field in SY_RUNTIME_FIELDS)) ctx.todos?.push(`sy-${field} used — provide manually`);
    j += 2;
  } else if (callFollows && lower in BUILTIN_FN) {
    // builtin function call
    const close = matchGroup(toks, j);
    const inner = toks.slice(j + 1, close);
    const named = namedArgsOf(inner, ctx);
    let rendered = null;
    if (lower === "xsdbool" || lower === "boolc") {
      // the argument is a logical expression — `x = y` inside is a
      // comparison, not a named parameter
      rendered = `(${txCond(inner, ctx)})`;
    } else if (named) rendered = renderBuiltinNamed(lower, named, ctx);
    else if (BUILTIN_FN[lower]) rendered = BUILTIN_FN[lower]([txExpr(inner, ctx)]);
    if (rendered === null) {
      ctx.todos?.push(`builtin ${lower}( ) not mapped`);
      rendered = `/* TODO(abap2js) */ ${lower}(${txExpr(inner, ctx)})`;
    }
    str = rendered;
    j = close + 1;
  } else if (callFollows && lower === "line_exists") {
    const close = matchGroup(toks, j);
    str = txTableExpr(toks.slice(j + 1, close), ctx, "some");
    j = close + 1;
  } else if (callFollows && ctx.isOwnMethod(lower)) {
    // implicit self call — own methods are emitted with a destructured
    // options object, so a single positional arg maps to the first param
    const def = ctx.model.methods.get(lower);
    const receiver = def.isStatic ? ctx.model.name : "this";
    const close = matchGroup(toks, j);
    const group = toks.slice(j + 1, close);
    let args = txArgs(group, ctx, lower);
    // Wrap a single positional arg as { firstParam: arg }. Skip when the call
    // carries an EXPORTING/CHANGING/IMPORTING section — txArgs already renders
    // those as a named-args object (namedArgsOf returns null for them, so the
    // bare !namedArgsOf test would wrongly re-wrap the whole object).
    const hasSection = group.some((t) => isId(t) && ["EXPORTING", "IMPORTING", "CHANGING", "RECEIVING", "EXCEPTIONS"].includes(KW(t.str)));
    if (group.length && def.importing.length && !hasSection && !namedArgsOf(group, ctx)) {
      args = `{ ${def.importing[0].name}: ${args} }`;
    }
    str = `${receiver}.${lower}(${args})`;
    j = close + 1;
  } else if (/^z2ui5_(cl|cx|if)_/.test(lower) || /^cl_|^cx_/.test(lower)) {
    ctx.requires?.add(lower);
    str = lower;
  } else if (ctx.isLocal(lower)) {
    str = lower;
  } else if (ctx.isField(lower)) {
    str = `this.${lower}`;
  } else if (ctx.isStaticField(lower)) {
    str = `${ctx.model.name}.${lower}`;
  } else if (callFollows) {
    // unknown bare call — most likely an inherited/interface method
    const close = matchGroup(toks, j);
    str = `this.${lower}(${txArgs(toks.slice(j + 1, close), ctx, lower)})`;
    j = close + 1;
  } else if (ctx.rowVar && /^[a-z_]/i.test(name)) {
    // WHERE context: unresolved bare names are components of the loop row
    str = `${ctx.rowVar}.${lower}`;
  } else {
    str = lower === name ? name : lower;
  }

  const atoms = [{ kind: "expr", str }];
  j = chainSuffix(toks, j, atoms, ctx, ctx.upperLocals.has(lower));
  return { str: atoms.map((a) => a.str).join(""), next: j };
}

/** consume ->meth( )/=>meth( )/-comp/[...] suffixes onto atoms */
function chainSuffix(toks, j, atoms, ctx, upper = false) {
  for (;;) {
    const t = toks[j];
    if (!t) break;
    if (isInstArrow(t) || isStatArrow(t)) {
      // obj->* dereference — JS references are transparent
      if (toks[j + 1]?.str === "*") {
        j += 2;
        continue;
      }
      // dynamic call: obj->(`METH`) — JS methods are lowercase
      if (toks[j + 1] && isParenL(toks[j + 1])) {
        const close = matchGroup(toks, j + 1);
        const nameExpr = txExpr(toks.slice(j + 2, close), ctx);
        j = close + 1;
        let args = "";
        if (toks[j] && isParenL(toks[j])) {
          const c2 = matchGroup(toks, j);
          args = txArgs(toks.slice(j + 1, c2), ctx, "dynamic");
          j = c2 + 1;
        }
        ctx.todos?.push(`dynamic method call approximated: ->(${nameExpr})`);
        atoms[atoms.length - 1].str += `[String(${nameExpr}).toLowerCase()](${args})`;
        continue;
      }
      // interface prefix on chained calls: obj->intf~meth( ) → obj.meth( )
      const meth = toks[j + 1].str.toLowerCase().replace(/^.*~/, "");
      j += 2;
      if (toks[j] && isParenL(toks[j])) {
        const close = matchGroup(toks, j);
        const group = toks.slice(j + 1, close);
        let args = null;
        if (isClientReceiver(atoms[atoms.length - 1].str)) {
          args = bindArgs(meth, group, ctx) ?? clientArgs(meth, group, ctx);
        }
        if (args === null) args = txArgs(group, ctx, meth);
        // sibling local class (same module): its methods destructure an
        // options object, so wrap a single positional arg as { firstParam: … }
        // — same convention as own-method calls above. The sibling class is
        // resolved through the receiver variable's declared REF TO type.
        if (group.length && ctx.model.siblingSigs) {
          const recv = atoms[atoms.length - 1].str.match(/^(?:this\.)?([a-z_][a-z0-9_]*)$/)?.[1];
          const recvCls = recv
            ? ctx.model.siblingSigs.has(recv)
              ? recv // static sibling call: cls=>meth( … )
              : ctx.localRefTypes?.get(recv) || ctx.model.fields.get(recv)?.refType
            : null;
          const param = recvCls ? ctx.model.siblingSigs.get(recvCls)?.get(meth) : null;
          if (
            param &&
            !group.some((t) => isId(t) && ["EXPORTING", "IMPORTING", "CHANGING", "RECEIVING", "EXCEPTIONS"].includes(KW(t.str))) &&
            !namedArgsOf(group, ctx)
          ) {
            args = `{ ${param}: ${args} }`;
          }
        }
        // client.get() returns the request struct with UPPERCASE keys
        if (meth === "get" && isClientReceiver(atoms[atoms.length - 1].str)) upper = true;
        atoms[atoms.length - 1].str += `.${meth}(${args})`;
        j = close + 1;
      } else {
        atoms[atoms.length - 1].str += `.${meth}`;
      }
      continue;
    }
    if (isDash(t) && toks[j + 1] && isId(toks[j + 1])) {
      const comp = toks[j + 1].str;
      atoms[atoms.length - 1].str += `.${upper ? comp.toUpperCase() : comp.toLowerCase()}`;
      j += 2;
      // component might be followed by a call? (rare) — leave to next loop turn
      continue;
    }
    if (isBrackL(t)) {
      const close = matchGroup(toks, j);
      const inner = toks.slice(j + 1, close);
      const base = atoms[atoms.length - 1].str;
      atoms[atoms.length - 1].str = txTableIndex(base, inner, ctx);
      j = close + 1;
      continue;
    }
    break;
  }
  return j;
}

/** tab[ ... ] access — either index or key lookup */
function txTableIndex(base, inner, ctx) {
  const named = namedArgsOf(inner, ctx);
  if (named) {
    const conds = [...named.entries()].map(([k, v]) => `row.${k} === ${renderNamedVal(v)}`).join(" && ");
    return `${base}.find((row) => ${conds})`;
  }
  return `${base}[(${txExpr(inner, ctx)}) - 1]`;
}

/** line_exists( tab[ k = v ] ) → tab.some(...) */
function txTableExpr(inner, ctx, verb) {
  // inner = `tab [ k = v ]`
  const bi = inner.findIndex(isBrackL);
  if (bi < 0) return `${txExpr(inner, ctx)} !== undefined`;
  const base = txExpr(inner.slice(0, bi), ctx);
  const close = matchGroup(inner, bi);
  const named = namedArgsOf(inner.slice(bi + 1, close), ctx);
  if (named) {
    const conds = [...named.entries()].map(([k, v]) => `row.${k} === ${renderNamedVal(v)}`).join(" && ");
    return `${base}.${verb}((row) => ${conds})`;
  }
  return `${base}.length >= (${txExpr(inner.slice(bi + 1, close), ctx)})`;
}

/**
 * If the group consists of `name = expr` / `name-comp = expr` pairs at top
 * level, return Map(name → rendered expr | nested Map); otherwise null.
 */
function namedArgsOf(groupToks, ctx) {
  // strip leading EXPORTING
  let toks = groupToks;
  if (toks.length && KW(toks[0].str) === "EXPORTING") toks = toks.slice(1);
  if (toks.some((t) => ["IMPORTING", "CHANGING", "RECEIVING", "EXCEPTIONS"].includes(KW(t.str)) && isId(t))) return null; // handled by caller as TODO
  if (toks.length < 3) return null;

  // a key is id (-id)* directly followed by "=" — returns [path, nextIdx]
  const keyAt = (k) => {
    if (!isId(toks[k]) || /^[^a-z_!]/i.test(toks[k].str)) return null;
    const path = [paramName(toks[k].str)];
    k++;
    while (isDash(toks[k] ?? { type: "" }) && isId(toks[k + 1] ?? { type: "" })) {
      path.push(toks[k + 1].str.toLowerCase());
      k += 2;
    }
    if (toks[k]?.str !== "=") return null;
    return [path, k + 1];
  };

  if (!keyAt(0)) return null;

  const named = new Map();
  const setPath = (path, val) => {
    let m = named;
    for (let d = 0; d < path.length - 1; d++) {
      if (!(m.get(path[d]) instanceof Map)) m.set(path[d], new Map());
      m = m.get(path[d]);
    }
    m.set(path[path.length - 1], val);
  };

  let i = 0;
  while (i < toks.length) {
    const key = keyAt(i);
    if (!key) return null;
    const [path, exprStart] = key;
    i = exprStart;
    const exprToks = [];
    let depth = 0;
    while (i < toks.length) {
      const t = toks[i];
      depth += depthDelta(t);
      if (depth === 0 && exprToks.length > 0 && keyAt(i)) break;
      exprToks.push(t);
      i++;
    }
    setPath(path, txExpr(exprToks, ctx));
  }
  return named.size ? named : null;
}

/** render a named-args value that may be a nested Map */
function renderNamedVal(v) {
  if (!(v instanceof Map)) return v;
  return `{ ${[...v.entries()].map(([k, x]) => `${k}: ${renderNamedVal(x)}`).join(", ")} }`;
}

/** like renderNamedVal, but fills components absent from `named` with the
 *  structure type's declared defaults (0, ``, [], …) — mirrors ABAP, where an
 *  unmentioned component is INITIAL rather than JS `undefined`. */
function renderNamedValWithDefaults(named, comps) {
  const have = new Set([...named.keys()].map((k) => k.toLowerCase()));
  const parts = [...named.entries()].map(([k, v]) => `${k}: ${renderNamedVal(v)}`);
  for (const c of comps) {
    if (!have.has(c.name.toLowerCase())) parts.push(`${c.name}: ${c.default}`);
  }
  return `{ ${parts.join(", ")} }`;
}

/** render call arguments: named → object literal, positional → expression */
function txArgs(groupToks, ctx, methodName) {
  if (groupToks.length === 0) return "";
  if (groupToks.some((t) => isId(t) && ["IMPORTING", "RECEIVING", "EXCEPTIONS"].includes(KW(t.str)))) {
    // true out-params need a rewritten callee — keep the call parseable
    ctx.todos?.push(`call with IMPORTING/RECEIVING/EXCEPTIONS params: ${methodName}( ... ) — rewrite manually`);
    return `undefined /* TODO(abap2js): out-params ${commentSafe(groupToks.map((t) => t.str).join(" "))} */`;
  }
  if (groupToks.some((t) => isId(t) && KW(t.str) === "CHANGING")) {
    // EXPORTING/CHANGING sections merge into one options object — the callee
    // signature includes CHANGING params, JS object refs mutate in place
    const merged = groupToks.filter((t) => !(isId(t) && ["EXPORTING", "CHANGING"].includes(KW(t.str))));
    const named = namedArgsOf(merged, ctx);
    if (named) return renderNamedArgs(named);
    ctx.todos?.push(`CHANGING call not mappable: ${methodName}( ... ) — rewrite manually`);
    return `undefined /* TODO(abap2js): out-params ${commentSafe(groupToks.map((t) => t.str).join(" "))} */`;
  }
  if (BUILTIN_PREDICATES.has(methodName)) return txCond(groupToks, ctx);
  const named = namedArgsOf(groupToks, ctx);
  if (named) return renderNamedArgs(named);
  return txCond(groupToks, ctx);
}

function renderNamedArgs(named) {
  return `{ ${[...named.entries()].map(([k, v]) => (k === v && !JS_RESERVED.has(k) ? k : `${k}: ${renderNamedVal(v)}`)).join(", ")} }`;
}

/** VALUE/COND/NEW/... constructor expressions — typeName is null for `#` */
function txConstructor(kind, typeName, inner, ctx) {
  switch (kind) {
    case "NEW": {
      if (typeName && /[~=>]/.test(typeName)) {
        ctx.todos?.push(`NEW with nested type ${typeName} — resolve manually`);
        return `null /* TODO(abap2js): NEW ${commentSafe(typeName)} */`;
      }
      if (typeName) {
        if (/^z2ui5_/.test(typeName)) ctx.requires?.add(typeName);
        return `new ${typeName}(${txArgs(inner, ctx, typeName)})`;
      }
      // NEW #( ) — infer from the assignment target's declared REF TO type
      // (DATA x TYPE REF TO cls; x = NEW #( … )) …
      if (ctx.newTargetType && /^[a-z_][a-z0-9_]*$/.test(ctx.newTargetType)) {
        const cls = ctx.newTargetType;
        if (cls === ctx.model.name) return `new ${ctx.model.name}(${txArgs(inner, ctx, cls)})`;
        if (requirePathFor(cls)) {
          ctx.requires?.add(cls);
          return `new ${cls}(${txArgs(inner, ctx, cls)})`;
        }
        // local class (lcl_/ltcl_ etc.) defined in the same module — instantiate
        // directly, no require. Framework prefixes are handled by requirePathFor.
        if (!/^(cl_|cx_|z2ui5_)/.test(cls)) return `new ${safeIdent(cls)}(${txArgs(inner, ctx, cls)})`;
      }
      // … or from the factory pattern (method returning REF TO own class)
      const ret = ctx.method?.def?.returning;
      if (ret && ret.typeTokens.join(" ").toUpperCase().includes("REF TO")) {
        const cls = ret.typeTokens[ret.typeTokens.length - 1].toLowerCase();
        if (cls === ctx.model.name) return `new ${ctx.model.name}(${txArgs(inner, ctx, cls)})`;
        if (/^z2ui5_/.test(cls)) {
          ctx.requires?.add(cls);
          return `new ${cls}(${txArgs(inner, ctx, cls)})`;
        }
        // local class (lcl_/ltcl_) defined in the same module
        if (!/^(cl_|cx_)/.test(cls)) return `new ${safeIdent(cls)}(${txArgs(inner, ctx, cls)})`;
      }
      ctx.todos?.push(`NEW #( ) — target type unknown, resolve manually`);
      return `/* TODO(abap2js): NEW #( ) */ null`;
    }
    case "VALUE": {
      // A pending row-completion map applies only to this outermost VALUE —
      // consume it so nested VALUE #( ) constructors don't inherit it.
      const completeComps = ctx._completeStruct;
      ctx._completeStruct = null;
      if (inner.length === 0) return "{}";
      // VALUE #( BASE tab ( row ) ... ) → [...tab, row, ...] /
      // VALUE #( BASE struct comp = x ) → { ...struct, comp: x }
      // `BASE` starts a VALUE #( BASE tab … ) only when followed by an
      // expression — a component literally named `base` is followed by `=`.
      if (KW(inner[0]?.str) === "BASE" && inner[1] && !isParenL(inner[1]) && inner[1].str !== "=") {
        let k = 1;
        let depth = 0;
        while (k < inner.length && !(depth === 0 && (isRowParen(inner[k]) || looksLikeKey(inner, k)))) {
          depth += depthDelta(inner[k]);
          k++;
        }
        const baseExpr = txExpr(inner.slice(1, k), ctx);
        const rest = inner.slice(k);
        if (!rest.length) return `(${baseExpr})`;
        const restRendered = txConstructor("VALUE", null, rest, ctx);
        if (restRendered.startsWith("[")) return `[...(${baseExpr} ?? []),${restRendered.slice(1)}`;
        if (restRendered.startsWith("{")) return `{ ...${baseExpr},${restRendered.slice(1)}`;
        return restRendered;
      }
      // table-expression fallbacks: VALUE #( tab[ ... ] OPTIONAL / DEFAULT x )
      const optIdx = findTopWord(inner, "OPTIONAL");
      if (optIdx > 0 && optIdx === inner.length - 1) {
        return `(() => { try { return ${txExpr(inner.slice(0, optIdx), ctx)} ?? null; } catch { return null; } })()`;
      }
      const defIdx = findTopWord(inner, "DEFAULT");
      if (defIdx > 0 && inner[defIdx + 1]?.str !== "=") {
        const dflt = txExpr(inner.slice(defIdx + 1), ctx);
        return `(() => { try { return ${txExpr(inner.slice(0, defIdx), ctx)} ?? ${dflt}; } catch { return ${dflt}; } })()`;
      }
      if (isId(inner[0]) && KW(inner[0].str) === "FOR") {
        const rendered = txValueFor(inner, ctx);
        if (rendered) return rendered;
      }
      if (inner.some((t, k) => isId(t) && (KW(t.str) === "FOR" || (KW(t.str) === "BASE" && isParenL(inner[k + 1] ?? { type: "" })) || (KW(t.str) === "LINES" && KW(inner[k + 1]?.str ?? "") === "OF")))) {
        ctx.todos?.push(`VALUE #( FOR/BASE/LINES OF ... ) not supported — rewrite manually`);
        return `/* TODO(abap2js): VALUE FOR/BASE */ []`;
      }
      // table rows — a standalone top-level paren group (not a call, not a
      // pair value) is a row; `comp = x` pairs before rows set defaults:
      // VALUE #( a = 1 ( b = 2 ) ( b = 3 ) ) → [{a:1,b:2}, {a:1,b:3}]
      let hasRow = false;
      {
        let d = 0;
        let prevEq = false;
        for (const t of inner) {
          if (d === 0 && isRowParen(t) && !prevEq) {
            hasRow = true;
            break;
          }
          if (d === 0) prevEq = t.str === "=";
          d += depthDelta(t);
        }
      }
      if (hasRow) {
        const rows = [];
        let defaults = new Map();
        let i = 0;
        while (i < inner.length) {
          if (isParenL(inner[i])) {
            const close = matchGroup(inner, i);
            const rowToks = inner.slice(i + 1, close);
            const named = rowToks.length ? namedArgsOf(rowToks, ctx) ?? null : new Map();
            if (named) {
              rows.push(renderNamedVal(new Map([...defaults, ...named])));
            } else {
              rows.push(txExpr(rowToks, ctx));
            }
            i = close + 1;
            continue;
          }
          // consume one `key = value` default pair (value may hold groups)
          let j = i;
          while (j < inner.length && inner[j].str !== "=") j++;
          j++; // first value token
          let depth = 0;
          let consumed = 0;
          while (j < inner.length) {
            const t = inner[j];
            if (depth === 0 && consumed > 0 && (isRowParen(t) || (isId(t) && !isOperatorWord(KW(t.str))) && looksLikeKey(inner, j))) break;
            depth += depthDelta(t);
            consumed++;
            j++;
          }
          const named = namedArgsOf(inner.slice(i, j), ctx);
          if (!named) return `(${txExpr(inner, ctx)})`;
          defaults = new Map([...defaults, ...named]);
          i = j;
        }
        return `[${rows.join(", ")}]`;
      }
      const named = namedArgsOf(inner, ctx);
      if (named) return completeComps ? renderNamedValWithDefaults(named, completeComps) : renderNamedVal(named);
      return `(${txExpr(inner, ctx)})`;
    }
    case "COND":
    case "SWITCH": {
      // WHEN c THEN v [WHEN ...] [ELSE d]
      const parts = [];
      let elseExpr = "null";
      let i = 0;
      const isSwitch = kind === "SWITCH";
      let switchSubject = null;
      if (isSwitch) {
        const whenIdx = topIndexOfWord(inner, "WHEN");
        switchSubject = txExpr(inner.slice(0, whenIdx), ctx);
        i = whenIdx;
      }
      while (i < inner.length) {
        const up = KW(inner[i].str);
        if (up === "WHEN") {
          const thenIdx = topIndexOfWord(inner, "THEN", i);
          const nextWhen = topIndexOfWord(inner, "WHEN", thenIdx);
          const elseIdx = topIndexOfWord(inner, "ELSE", thenIdx);
          const end = Math.min(nextWhen < 0 ? inner.length : nextWhen, elseIdx < 0 ? inner.length : elseIdx);
          const cond = isSwitch ? `${switchSubject} === ${txExpr(inner.slice(i + 1, thenIdx), ctx)}` : txCond(inner.slice(i + 1, thenIdx), ctx);
          parts.push({ cond, val: txExpr(inner.slice(thenIdx + 1, end), ctx) });
          i = end;
          continue;
        }
        if (up === "ELSE") {
          elseExpr = txExpr(inner.slice(i + 1), ctx);
          break;
        }
        i++;
      }
      let out = elseExpr;
      for (let k = parts.length - 1; k >= 0; k--) out = `${parts[k].cond} ? ${parts[k].val} : ${out}`;
      return `(${out})`;
    }
    case "CONV":
    case "EXACT":
    case "CAST": // duck typing — the runtime check happens at call time anyway
      return `(${txExpr(inner, ctx)})`;
    case "REF":
      return `(${txExpr(inner, ctx)})`;
    case "CORRESPONDING": {
      // CORRESPONDING #( BASE ( x ) y ) → ({ ...x, ...y })
      if (inner.length && KW(inner[0].str) === "BASE" && isParenL(inner[1])) {
        const close = matchGroup(inner, 1);
        const baseExpr = txExpr(inner.slice(2, close), ctx);
        const rest = inner.slice(close + 1);
        return rest.length ? `({ ...${baseExpr}, ...${txExpr(rest, ctx)} })` : `({ ...${baseExpr} })`;
      }
      return `({ ...${txExpr(inner, ctx)} })`;
    }
    default:
      ctx.todos?.push(`${kind} #( ) not supported`);
      return `/* TODO(abap2js): ${kind} */ null`;
  }
}

/**
 * VALUE #( FOR ... ) table comprehensions. Two supported forms:
 *
 *   FOR i = start [THEN expr] UNTIL|WHILE cond ( row ) ...
 *   FOR row IN tab [INDEX INTO idx] [WHERE ( cond )] ( row ) ...
 *
 * Renders an IIFE that accumulates the row groups per iteration. Returns
 * null for shapes outside this subset (nested FOR, LET, FROM/TO, GROUPS) —
 * the caller then falls back to the TODO comment.
 */
function txValueFor(inner, ctx) {
  const varTok = inner[1];
  if (!varTok || !isId(varTok) || !/^[a-z_]\w*$/i.test(varTok.str)) return null;
  const varName = varTok.str.toLowerCase();

  // Locate where the row groups begin — the first standalone top-level paren
  // that does not belong to a WHERE ( ... ) clause.
  let rowsStart = -1;
  {
    let k = 2;
    let d = 0;
    while (k < inner.length) {
      const t = inner[k];
      if (d === 0 && isId(t) && KW(t.str) === "WHERE" && isParenL(inner[k + 1] ?? { type: "" })) {
        k = matchGroup(inner, k + 1) + 1;
        continue;
      }
      if (d === 0 && isRowParen(t)) {
        rowsStart = k;
        break;
      }
      d += depthDelta(t);
      k++;
    }
  }
  if (rowsStart < 0) return null;

  const head = inner.slice(2, rowsStart);
  const rest = inner.slice(rowsStart);
  // unsupported shapes inside this comprehension
  const UNSUPPORTED = new Set(["LET", "GROUPS", "FROM", "TO", "STEP"]);
  if (head.some((t) => isId(t) && UNSUPPORTED.has(KW(t.str)))) return null;
  {
    let d = 0;
    for (const t of rest) {
      if (d === 0 && isId(t) && KW(t.str) === "FOR") return null; // nested FOR
      d += depthDelta(t);
    }
  }

  const addedLocal = !ctx.locals.has(varName);
  if (addedLocal) ctx.locals.add(varName);
  const done = (result) => {
    if (addedLocal) ctx.locals.delete(varName);
    return result;
  };

  // Row groups render exactly like a plain VALUE row list. Rendered lazily —
  // AFTER all comprehension locals (loop var, INDEX INTO var) are registered,
  // so row expressions referencing them resolve as locals, not `this.` fields.
  const renderRows = () => {
    const rendered = txConstructor("VALUE", null, rest, ctx);
    return rendered.startsWith("[") ? rendered : null;
  };

  if (head[0]?.str === "=") {
    // FOR i = start [THEN expr] UNTIL|WHILE cond
    const thenIdx = findTopWord(head, "THEN");
    const untilIdx = findTopWord(head, "UNTIL");
    const whileIdx = findTopWord(head, "WHILE");
    const condKw = untilIdx >= 0 ? untilIdx : whileIdx;
    if (condKw < 1) return done(null);
    const startExpr = txExpr(head.slice(1, thenIdx >= 0 ? thenIdx : condKw), ctx);
    const stepExpr = thenIdx >= 0 ? txExpr(head.slice(thenIdx + 1, condKw), ctx) : `${varName} + 1`;
    const cond = txCond(head.slice(condKw + 1), ctx);
    const test = untilIdx >= 0 ? `!(${cond})` : `(${cond})`;
    const rowsRendered = renderRows();
    if (!rowsRendered) return done(null);
    return done(
      `(() => { const __out = []; let __guard = 0; for (let ${varName} = ${startExpr}; ${test}; ${varName} = ${stepExpr}) { if (++__guard > 1000000) throw new Error(\`VALUE FOR: loop guard exceeded\`); __out.push(...${rowsRendered}); } return __out; })()`
    );
  }

  if (isId(head[0]) && KW(head[0].str) === "IN") {
    // FOR row IN tab [INDEX INTO idx] [WHERE ( cond )]
    const idxKw = findTopWord(head, "INDEX");
    const whereKw = findTopWord(head, "WHERE");
    let tabEnd = head.length;
    if (idxKw > 0) tabEnd = Math.min(tabEnd, idxKw);
    if (whereKw > 0) tabEnd = Math.min(tabEnd, whereKw);
    const tabExpr = txExpr(head.slice(1, tabEnd), ctx);

    let idxVar = null;
    if (idxKw > 0) {
      if (KW(head[idxKw + 1]?.str ?? "") !== "INTO" || !isId(head[idxKw + 2] ?? { type: "" })) return done(null);
      idxVar = head[idxKw + 2].str.toLowerCase();
      if (!ctx.locals.has(idxVar)) ctx.locals.add(idxVar);
    }
    let whereCond = null;
    if (whereKw > 0) {
      whereCond = txWhere(head.slice(whereKw + 1), varName, ctx);
    }

    const idxDecl = idxVar ? `let ${idxVar} = 0; ` : ``;
    const idxInc = idxVar ? `${idxVar} += 1; ` : ``;
    const whereGuard = whereCond ? `if (!(${whereCond})) continue; ` : ``;
    const rowsRendered = renderRows();
    if (!rowsRendered) return done(null);
    return done(
      `(() => { const __out = []; ${idxDecl}for (const ${varName} of (${tabExpr} ?? [])) { ${idxInc}${whereGuard}__out.push(...${rowsRendered}); } return __out; })()`
    );
  }

  return done(null);
}

/** Pass B: operator mapping over atoms */
function joinAtoms(atoms, ctx) {
  const out = [];
  for (let i = 0; i < atoms.length; i++) {
    const a = atoms[i];
    if (a.kind === "expr") {
      out.push(a.str);
      continue;
    }
    const up = a.up;
    const next = atoms[i + 1];
    const nextUp = next?.kind === "op" ? next.up : null;

    if (up === "IS") {
      // <expr> IS [NOT] INITIAL/BOUND/SUPPLIED
      const negated = nextUp === "NOT";
      const what = negated ? atoms[i + 2] : atoms[i + 1];
      const operand = out.pop();
      const w = what?.kind === "op" ? what.up : KW(what?.str ?? "");
      let cond;
      if (w === "INITIAL") cond = negated ? `${wrap(operand)}` : `!${wrap(operand)}`;
      else if (w === "BOUND" || w === "ASSIGNED") cond = negated ? `${wrap(operand)} == null` : `${wrap(operand)} != null`;
      else if (w === "SUPPLIED") cond = negated ? `${wrap(operand)} === undefined` : `${wrap(operand)} !== undefined`;
      else if (w === "INSTANCE") {
        // IS [NOT] INSTANCE OF cls
        const cls = atoms[i + (negated ? 4 : 3)];
        cond = `${wrap(operand)} instanceof ${cls.str}`;
        if (negated) cond = `!(${cond})`;
        i += 2;
      } else cond = `${wrap(operand)} /* TODO(abap2js): IS ${w} */`;
      out.push(cond);
      i += negated ? 2 : 1;
      continue;
    }
    switch (up) {
      case "=":
      case "EQ":
      case "<>":
      case "NE": {
        const eq = up === "=" || up === "EQ";
        // abap_bool comparisons need truthiness semantics, not identity:
        // depending on origin the value is true/false (JS literals), `X`/``
        // (ABAP char1 convention) or unset (row field never initialized), so
        // `selkz = abap_false` must match ``/undefined too. abap_true/false
        // render as bare true/false literals — no other source produces them.
        const rhsAtom = atoms[i + 1];
        const lhsStr = out.length ? out[out.length - 1] : null;
        const isBoolLit = (s) => s === "true" || s === "false";
        if (rhsAtom?.kind === "expr" && lhsStr !== null && (isBoolLit(rhsAtom.str) || isBoolLit(lhsStr))) {
          out.pop();
          const [expr, lit] = isBoolLit(rhsAtom.str) ? [lhsStr, rhsAtom.str] : [rhsAtom.str, lhsStr];
          const truthy = `(${wrap(expr)} === true || ${wrap(expr)} === \`X\`)`;
          out.push((lit === "true") === eq ? truthy : `!${truthy}`);
          i++;
        } else {
          out.push(eq ? "===" : "!==");
        }
        break;
      }
      case ">":
      case "GT":
        out.push(">");
        break;
      case "<":
      case "LT":
        out.push("<");
        break;
      case ">=":
      case "GE":
        out.push(">=");
        break;
      case "<=":
      case "LE":
        out.push("<=");
        break;
      case "AND":
        out.push("&&");
        break;
      case "OR":
        out.push("||");
        break;
      case "NOT": {
        // NOT <expr> <compare-op> ... — the comparison binds tighter than NOT
        // postfix form: <expr> NOT IN ... — lhs is already on the out stack
        const operand = atoms[i + 1];
        const after = atoms[i + 2];
        if (operand?.kind === "op" && COMPARE_WORDS.has(operand.up)) {
          const lhs = out.pop() ?? "undefined";
          const r = renderCompare(operand.up, lhs, atoms, i + 1, ctx);
          out.push(`!(${r.str})`);
          i = r.last;
        } else if (operand?.kind === "expr" && after?.kind === "op" && COMPARE_WORDS.has(after.up)) {
          const r = renderCompare(after.up, operand.str, atoms, i + 2, ctx);
          out.push(`!(${r.str})`);
          i = r.last;
        } else if (operand?.kind === "expr") {
          out.push(`!${wrap(operand.str)}`);
          i++;
        } else out.push("!");
        break;
      }
      case "&&":
      case "&":
        out.push("+");
        break;
      case "MOD":
        out.push("%");
        break;
      case "DIV": {
        const lhs = out.pop() ?? "0";
        const rhs = atoms[i + 1];
        ctx.requires?.add("z2ui5_cl_util");
        out.push(`Math.trunc(z2ui5_cl_util.abap_div(${wrap(lhs)}, ${wrap(rhs?.str ?? "1")}))`);
        i++;
        break;
      }
      case "/": {
        // ABAP raises CX_SY_ZERO_DIVIDE on division by zero (0 / 0 is 0);
        // plain JS `/` would silently yield Infinity/NaN. Route through the
        // runtime helper when both operands are proper expressions.
        const rhs = atoms[i + 1];
        const lhs = out.length ? out[out.length - 1] : null;
        if (rhs?.kind === "expr" && lhs && !/^[+\-*/%&|!<>=]+$/.test(lhs)) {
          out.pop();
          ctx.requires?.add("z2ui5_cl_util");
          out.push(`z2ui5_cl_util.abap_div(${wrap(lhs)}, ${wrap(rhs.str)})`);
          i++;
        } else {
          out.push(a.str);
        }
        break;
      }
      case "CS":
      case "CP":
      case "NS":
      case "NP":
      case "CO":
      case "CN":
      case "CA":
      case "NA":
      case "IN":
      case "BETWEEN": {
        const lhs = out.pop() ?? "undefined";
        const r = renderCompare(up, lhs, atoms, i, ctx);
        out.push(r.str);
        i = r.last;
        break;
      }
      default:
        out.push(a.str);
    }
  }
  return collapseOutsideLiterals(out.join(" ")).trim();
}

/**
 * Collapse runs of whitespace to a single space — but ONLY in code position,
 * never inside string/template literals. A blind `replace(/\s+/g, " ")` would
 * turn a newline (`|\n|`) or run of spaces embedded in an asset string into a
 * single space, corrupting multi-line content (e.g. inline JS/CSS whose `//`
 * comments would then swallow the rest of the file).
 */
function collapseOutsideLiterals(s) {
  let out = "";
  const stack = [{ t: "code" }];
  let i = 0;
  while (i < s.length) {
    const c = s[i];
    const top = stack[stack.length - 1];
    if (top.t === "tmpl") {
      if (c === "\\") { out += c + (s[i + 1] ?? ""); i += 2; continue; }
      if (c === "`") { stack.pop(); out += c; i++; continue; }
      if (c === "$" && s[i + 1] === "{") { stack.push({ t: "subst" }); out += "${"; i += 2; continue; }
      out += c; i++; continue; // literal char (incl. newlines/spaces) kept verbatim
    }
    // code / subst position
    if (c === "`") { stack.push({ t: "tmpl" }); out += c; i++; continue; }
    if (c === "'" || c === '"') {
      const q = c; out += c; i++;
      while (i < s.length && s[i] !== q) {
        if (s[i] === "\\") { out += s[i] + (s[i + 1] ?? ""); i += 2; } else { out += s[i]; i++; }
      }
      if (i < s.length) { out += s[i]; i++; }
      continue;
    }
    if (top.t === "subst" && c === "}") { stack.pop(); out += c; i++; continue; }
    if (/\s/.test(c)) { let j = i; while (j < s.length && /\s/.test(s[j])) j++; out += " "; i = j; continue; }
    out += c; i++;
  }
  return out;
}

const COMPARE_WORDS = new Set(["CS", "CP", "NS", "NP", "CO", "CN", "CA", "NA", "IN", "BETWEEN"]);

/**
 * ABAP string/range comparison operators — lhs is already rendered, the
 * operator sits at atoms[opIdx]. Returns the rendered condition and the
 * index of the last consumed atom.
 */
function renderCompare(op, lhs, atoms, opIdx, ctx) {
  const rhsAtom = atoms[opIdx + 1];
  if (!rhsAtom || rhsAtom.kind !== "expr") {
    ctx.todos?.push(`${op} comparison without operand — rewrite manually`);
    return { str: `false /* TODO(abap2js): ${op} */`, last: opIdx };
  }
  const rhs = rhsAtom.str;
  switch (op) {
    case "CS":
      return { str: `String(${lhs}).toLowerCase().includes(String(${rhs}).toLowerCase())`, last: opIdx + 1 };
    case "NS":
      return { str: `!String(${lhs}).toLowerCase().includes(String(${rhs}).toLowerCase())`, last: opIdx + 1 };
    case "CP":
      ctx.todos?.push(`CP pattern match approximated with includes()`);
      return { str: `String(${lhs}).includes(String(${rhs}).replace(/\\*/g, ""))`, last: opIdx + 1 };
    case "NP":
      ctx.todos?.push(`NP pattern match approximated with includes()`);
      return { str: `!String(${lhs}).includes(String(${rhs}).replace(/\\*/g, ""))`, last: opIdx + 1 };
    case "CO":
      return { str: `[...String(${lhs})].every(($c) => String(${rhs}).includes($c))`, last: opIdx + 1 };
    case "CN":
      return { str: `![...String(${lhs})].every(($c) => String(${rhs}).includes($c))`, last: opIdx + 1 };
    case "CA":
      return { str: `[...String(${lhs})].some(($c) => String(${rhs}).includes($c))`, last: opIdx + 1 };
    case "NA":
      return { str: `![...String(${lhs})].some(($c) => String(${rhs}).includes($c))`, last: opIdx + 1 };
    case "IN":
      // range table check (sign/option approximated: I/EQ, BT, CP, NE)
      ctx.todos?.push(`IN range-table check approximated (sign E ignored)`);
      return {
        str: `(($v, $r) => !$r || !$r.length || $r.some(($x) => ($x.option === \`BT\` ? $v >= $x.low && $v <= $x.high : $x.option === \`NE\` ? $v !== $x.low : $x.option === \`CP\` ? String($v).includes(String($x.low).replace(/\\*/g, "")) : $v === $x.low)))(${lhs}, ${rhs})`,
        last: opIdx + 1,
      };
    case "BETWEEN": {
      const andAtom = atoms[opIdx + 2];
      const highAtom = atoms[opIdx + 3];
      if (!andAtom || andAtom.up !== "AND" || !highAtom || highAtom.kind !== "expr") {
        ctx.todos?.push(`BETWEEN without AND bound — rewrite manually`);
        return { str: `false /* TODO(abap2js): BETWEEN */`, last: opIdx + 1 };
      }
      return { str: `${wrap(lhs)} >= ${rhs} && ${wrap(lhs)} <= ${highAtom.str}`, last: opIdx + 3 };
    }
    default:
      return { str: `false /* TODO(abap2js): ${op} */`, last: opIdx };
  }
}

function wrap(s) {
  return /^[a-zA-Z0-9_$.`]+$/.test(s) || /^[a-zA-Z0-9_$.]+\(.*\)$/.test(s) ? s : `(${s})`;
}

function splitTopExprs(toks, ctx) {
  // whitespace-separated top-level primaries (for CONCATENATE)
  const parts = [];
  let i = 0;
  while (i < toks.length) {
    const { str, next } = parsePrimary(toks, i, ctx);
    parts.push(str);
    i = next;
  }
  return parts;
}

/** WHERE conditions: bare component names refer to the row variable */
function txWhere(toks, rowVar, ctx) {
  const sub = new Ctx(ctx.model, ctx.method);
  sub.requires = ctx.requires;
  sub.todos = ctx.todos;
  sub.locals = ctx.locals;
  sub.upperLocals = ctx.upperLocals;
  sub.fsBacked = ctx.fsBacked;
  sub.rowVar = rowVar; // unresolved bare identifiers become row components
  return txCond(toks, sub);
}

module.exports = { txExpr, txCond, txArgs, namedArgsOf, renderNamedVal, txWhere, splitTopExprs };
