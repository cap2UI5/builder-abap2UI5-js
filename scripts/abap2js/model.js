"use strict";
// Class model — parses the ABAP class definition/implementation statement
// stream into a ClassModel (fields, methods, TYPES) plus the type-resolution
// helpers (declared initializers, member-path walks) and the per-method Ctx.

const { KW, tokify, isParenL, isStr, isId, isDash, matchGroup, stringToken } = require("./lex");
const { paramName } = require("./naming");

// ---------------------------------------------------------------------------
// class model
// ---------------------------------------------------------------------------

function typeDefault(typeTokens) {
  const t = typeTokens.join(" ").toUpperCase().replace(/^(TYPE|LIKE)\s+/, "").replace(/\s*READ\s*-\s*ONLY$/, "");
  if (/REF TO/.test(t)) return "null";
  if (/TABLE OF|TABLE$|_TAB$|^TY_T_|_T_|STANDARD TABLE|SORTED TABLE|HASHED TABLE|TT_|_TT$|_TS$|RANGE OF/.test(t)) return "[]";
  if (/ABAP_BOOL|XSDBOOLEAN|^XFELD/.test(t)) return "false";
  // structure types by naming convention (ty_s_result, ts_data, ...)
  if (/^TY_S_|^TS_|^S_[A-Z0-9_]/.test(t)) return "{}";
  if (/^I$|^INT4|^INT8|^F$|^P |^P$|DECFLOAT|^TIMESTAMP/.test(t)) return "0";
  if (/^STRING|^C |^C$|CLIKE|^CHAR|^N |^N$|CSEQUENCE/.test(t)) return "``";
  return "null";
}

function parseTypeAfter(toks, i) {
  // returns { typeTokens, default: <VALUE literal or null>, next }
  const typeTokens = [];
  let value = null;
  while (i < toks.length) {
    const up = KW(toks[i].str);
    if (up === "VALUE") {
      i++;
      if (i < toks.length) {
        value = toks[i];
        // negative literal (VALUE -1) lexes as two tokens
        if (isDash(value) && toks[i + 1]) {
          value = { ...toks[i + 1], str: `-${toks[i + 1].str}` };
          i++;
        }
        i++;
      }
      continue;
    }
    if (up === "READ-ONLY" || up === "OPTIONAL" || up === "DEFAULT" || up === "LENGTH" || up === "DECIMALS") {
      typeTokens.push(toks[i].str);
      i++;
      continue;
    }
    typeTokens.push(toks[i].str);
    i++;
  }
  return { typeTokens, value };
}

class ClassModel {
  constructor(name) {
    this.name = name;
    this.superclass = null;
    this.interfaces = [];
    this.fields = new Map(); // name -> { default, isStatic, isConst, valueExpr }
    this.structConsts = new Map(); // name -> [{ name, valueTok }]
    this.structTypes = new Map(); // TYPES BEGIN OF name -> [{ name, default }]
    this.tableTypes = new Map(); // TYPES name TYPE ... TABLE OF row -> row (lower)
    this.methods = new Map(); // lowername -> { isStatic, importing:[{name,defaultTok}], returning:{name,typeTokens}|null }
    this.methodBodies = []; // { name, statements: [{type,toks,src}] }
  }
}

/** METHODS/CLASS-METHODS definition → { name, def } (shared by classes and
 *  interfaces; EXPORTING/CHANGING params are recorded as out-params) */
function parseMethodDef(toksIn) {
  let toks = toksIn;
  // CLASS-METHODS lexes as three tokens: CLASS - METHODS
  const isStatic = KW(toks[0].str) === "CLASS" && isDash(toks[1]);
  if (isStatic) toks = toks.slice(2);
  if (!toks[1]) return null;
  const name = toks[1].str.toLowerCase();
  const def = { isStatic, importing: [], returning: null, outParams: [] };
  let mode = null;
  for (let i = 2; i < toks.length - 1; i++) {
    const up = KW(toks[i].str);
    if (["IMPORTING", "EXPORTING", "CHANGING", "RETURNING", "RAISING", "REDEFINITION", "FOR", "ABSTRACT", "FINAL"].includes(up)) {
      mode = up;
      continue;
    }
    if (["IMPORTING", "EXPORTING", "CHANGING"].includes(mode) && isId(toks[i]) && !["TYPE", "LIKE", "REF", "TO", "OF", "OPTIONAL", "DEFAULT", "TABLE", "STANDARD", "SORTED", "HASHED", "WITH", "KEY", "EMPTY", "UNIQUE", "NON-UNIQUE", "LINE", "PREFERRED", "PARAMETER"].includes(up.replace(/^!/, ""))) {
      // parameter names are followed by TYPE/LIKE — EXPORTING/CHANGING
      // params join the destructured signature (JS object refs give the
      // by-reference semantics for structures and tables)
      if (KW(toks[i + 1]?.str) === "TYPE" || KW(toks[i + 1]?.str) === "LIKE") {
        // TYPE REF TO … params carry reference semantics — assignments from
        // them must NOT be routed through the value-copy helper
        const isRef = KW(toks[i + 1]?.str) === "TYPE" && KW(toks[i + 2]?.str) === "REF" && KW(toks[i + 3]?.str) === "TO";
        const param = { name: paramName(toks[i].str), defaultToks: null, isRef };
        // scan ahead for DEFAULT <tok...> until next param/section
        for (let j = i + 2; j < toks.length - 1; j++) {
          const u = KW(toks[j].str);
          if (["IMPORTING", "EXPORTING", "CHANGING", "RETURNING", "RAISING"].includes(u)) break;
          if (u === "DEFAULT") {
            const dToks = [];
            for (let k = j + 1; k < toks.length - 1; k++) {
              const uu = KW(toks[k].str);
              if (["IMPORTING", "EXPORTING", "CHANGING", "RETURNING", "RAISING", "OPTIONAL", "PREFERRED"].includes(uu)) break;
              if (isId(toks[k]) && KW(toks[k + 1]?.str) === "TYPE") break;
              dToks.push(toks[k]);
            }
            param.defaultToks = dToks;
            break;
          }
          if (isId(toks[j]) && KW(toks[j + 1]?.str) === "TYPE") break;
        }
        def.importing.push(param);
        // EXPORTING/CHANGING params are out-params — callees sync them
        // back onto the args object so callers can copy them out
        if (mode !== "IMPORTING") def.outParams.push(param.name);
      }
    }
    if (mode === "RETURNING" && KW(toks[i].str) === "VALUE" && isParenL(toks[i + 1])) {
      const close = matchGroup(toks, i + 1);
      def.returning = { name: paramName(toks[i + 2].str), typeTokens: toks.slice(close + 2, toks.length - 1).map((t) => t.str) };
    }
  }
  return { name, def };
}

function buildModel(file) {
  const statements = file.getStatements().map((s) => ({
    type: s.get().constructor.name,
    toks: tokify(s),
    src: s.concatTokens(),
  }));

  let model = null;
  let inImpl = false;
  let curMethod = null;
  let structCollector = null; // { name, members: [] , isConst }

  for (const s of statements) {
    const T = s.type;
    let toks = s.toks;

    if (T === "ClassDefinition") {
      const name = toks[1].str.toLowerCase();
      model = new ClassModel(name);
      const idxInh = toks.findIndex((t) => KW(t.str) === "INHERITING");
      if (idxInh >= 0) model.superclass = toks[idxInh + 2].str.toLowerCase();
      continue;
    }
    if (!model) continue;

    if (T === "ClassImplementation") {
      inImpl = true;
      continue;
    }

    if (!inImpl) {
      // ----- definition part -----
      if (T === "InterfaceDef") {
        model.interfaces.push(toks[1].str.toLowerCase());
      } else if (T === "DataBegin" || T === "ConstantBegin") {
        structCollector = { name: toks[toks.length - 2].str.toLowerCase(), members: [], isConst: T === "ConstantBegin" };
        // "DATA BEGIN OF name ." → name is token before final "."
        const ofIdx = toks.findIndex((t) => KW(t.str) === "OF");
        structCollector.name = toks[ofIdx + 1].str.toLowerCase();
      } else if (T === "DataEnd" || T === "ConstantEnd") {
        if (structCollector) {
          if (structCollector.isConst) model.structConsts.set(structCollector.name, structCollector.members);
          else
            model.fields.set(structCollector.name, {
              default: "{ " + structCollector.members.map((m) => `${m.name}: ${m.value ?? m.default}`).join(", ") + " }",
              isStatic: false,
              isConst: false,
              members: structCollector.members,
            });
          structCollector = null;
        }
      } else if (T === "Data" || T === "ClassData" || T === "Constant") {
        // CLASS-DATA lexes as three tokens: CLASS - DATA
        const body = KW(toks[0].str) === "CLASS" && isDash(toks[1]) ? toks.slice(2) : toks;
        const name = body[1].str.toLowerCase();
        const { typeTokens, value } = parseTypeAfter(body.slice(2, -1), 0);
        const rendered = value ? renderLiteralToken(value) : null;
        if (structCollector) {
          structCollector.members.push({ name, default: typeDefault(typeTokens), value: rendered, typeTokens });
        } else if (T === "Constant") {
          model.fields.set(name, { default: rendered ?? typeDefault(typeTokens), isStatic: true, isConst: true });
        } else {
          // remember `REF TO cls` so `<member> = NEW #( )` can infer the class.
          const refI = typeTokens.findIndex((t, k) => KW(t) === "REF" && KW(typeTokens[k + 1] || "") === "TO");
          const refType = refI >= 0 && typeTokens[refI + 2] ? String(typeTokens[refI + 2]).toLowerCase() : null;
          model.fields.set(name, { default: rendered ?? typeDefault(typeTokens), isStatic: T === "ClassData", isConst: false, refType, typeTokens });
        }
      } else if (T === "MethodDef") {
        const parsed = parseMethodDef(toks);
        if (parsed) model.methods.set(parsed.name, parsed.def);
      }
      continue;
    }

    // ----- implementation part -----
    if (T === "MethodImplementation") {
      curMethod = { name: toks[1].str.toLowerCase(), statements: [] };
      model.methodBodies.push(curMethod);
      continue;
    }
    if (T === "EndMethod") {
      curMethod = null;
      continue;
    }
    if (curMethod) curMethod.statements.push(s);
  }
  collectTypeDefs(statements, model);
  return model;
}

// Collect TYPES declarations — flat structures (BEGIN OF … END OF) and named
// table types (… TYPE STANDARD TABLE OF row) — from any section (class-level
// or method-local). These let VALUE #( )/INSERT/APPEND complete a partial row
// with its type's component defaults, matching ABAP where an unmentioned
// numeric component reads as 0 rather than JS `undefined` (which would poison
// later arithmetic into NaN).
function collectTypeDefs(statements, model) {
  const stack = []; // active BEGIN OF collectors (supports nesting)
  for (const s of statements) {
    const T = s.type;
    const toks = s.toks;
    if (T === "TypeBegin") {
      const ofIdx = toks.findIndex((t) => KW(t.str) === "OF");
      const name = ofIdx >= 0 && toks[ofIdx + 1] ? toks[ofIdx + 1].str.toLowerCase() : null;
      stack.push({ name, members: [] });
    } else if (T === "TypeEnd") {
      const col = stack.pop();
      if (col && col.name) {
        model.structTypes.set(col.name, col.members);
        if (stack.length) {
          // nested BEGIN OF — the inner struct is a component of the outer
          stack[stack.length - 1].members.push({
            name: col.name,
            default: `{ ${col.members.map((m) => `${m.name}: ${m.default}`).join(", ")} }`,
          });
        }
      }
    } else if (T === "Type") {
      const body = toks.slice(0, -1); // drop trailing "," or "."
      if (!body.length) continue;
      if (stack.length) {
        // struct component: TYPES comp TYPE … (a nested BEGIN OF is a TypeBegin)
        const name = body[1] ? body[1].str.toLowerCase() : null;
        if (name) {
          const { typeTokens } = parseTypeAfter(body.slice(2), 0);
          stack[stack.length - 1].members.push({ name, default: typeDefault(typeTokens), typeTokens });
        }
      } else {
        // standalone: TYPES name TYPE [STANDARD|SORTED|HASHED] TABLE OF row …
        const name = body[1] ? body[1].str.toLowerCase() : null;
        if (!name) continue;
        const tblIdx = body.findIndex((t) => KW(t.str) === "TABLE");
        const ofIdx = body.findIndex((t) => KW(t.str) === "OF");
        if (tblIdx >= 0 && ofIdx > tblIdx && body[ofIdx + 1]) {
          model.tableTypes.set(name, body[ofIdx + 1].str.toLowerCase());
        }
      }
    }
  }
}

// Resolve the component list of the row structure described by `typeTokens`
// (a TYPE clause as an array of token strings). Handles inline `TABLE OF row`,
// named table types, and direct structure types. Returns [{name, default}] or
// null when the type is unknown / not a known structure.
const TYPE_KEYWORDS = new Set(["TYPE", "LIKE", "REF", "TO", "STANDARD", "SORTED", "HASHED", "TABLE", "OF", "WITH", "DEFAULT", "KEY", "EMPTY", "UNIQUE", "NON-UNIQUE", "LINE", "RANGE", "LENGTH", "DECIMALS", "BOXED", "INITIAL", "READ-ONLY"]);
function rowStructComponents(typeTokens, model) {
  if (!typeTokens || !typeTokens.length) return null;
  const up = typeTokens.map((t) => String(t).toUpperCase());
  const tblIdx = up.indexOf("TABLE");
  const ofIdx = up.indexOf("OF");
  let structName = null;
  if (tblIdx >= 0 && ofIdx > tblIdx && typeTokens[ofIdx + 1]) {
    structName = String(typeTokens[ofIdx + 1]).toLowerCase();
  } else {
    const nameTok = typeTokens.find((t) => !TYPE_KEYWORDS.has(String(t).toUpperCase()));
    structName = nameTok ? String(nameTok).toLowerCase() : null;
  }
  if (!structName) return null;
  if (model.tableTypes.has(structName)) structName = model.tableTypes.get(structName);
  else if (model.siblingTypes?.tableTypes.has(structName)) structName = model.siblingTypes.tableTypes.get(structName);
  return model.structTypes.get(structName) || model.siblingTypes?.structTypes.get(structName) || null;
}

/** initializer for a declared variable — resolves local TYPES structures and
 *  interface-defined structures (intf=>ty_x, via opts.externTypes) so DATA of
 *  a known struct type starts as a typed object literal instead of null */
function declaredInit(typeTokens, model, depth = 0, ctx = null) {
  let init = typeDefault(typeTokens);
  // "{}" comes from struct-naming conventions (ty_s_x, s_x, …) — still try to
  // resolve the real component defaults; "null" is the unknown-type fallback
  if ((init !== "null" && init !== "{}") || !typeTokens || depth > 3) return init;
  const up = typeTokens.map((t) => String(t).toUpperCase());
  // LIKE LINE OF <var[-comp…]> — row type of the declared table (member)
  if (up[0] === "LIKE" && up[1] === "LINE" && up[2] === "OF" && typeTokens[3] && ctx) {
    const pathToks = typeTokens.slice(3).map((t) => {
      const str = String(t);
      return { type: str === "-" ? "Dash" : "Identifier", str };
    });
    const src = targetTypeTokens(pathToks, ctx);
    if (src) {
      const rowComps = rowStructComponents(src, model) || externRowComponents(src, model);
      if (rowComps) return renderComps(rowComps, model, depth);
    }
    return init;
  }
  // LIKE <var> — mirror the referenced variable's declared type
  if (up[0] === "LIKE" && typeTokens.length === 2) {
    const nm = String(typeTokens[1]).toLowerCase();
    const src = ctx?.varTypes.get(nm) || model.fields.get(nm)?.typeTokens;
    if (src && src !== typeTokens) return declaredInit(src, model, depth + 1, ctx);
    return init;
  }
  if (up.includes("TABLE") || up.includes("REF")) return init;
  // a bare name that is a declared TABLE type initializes as []
  {
    const nameTok = typeTokens.find((t) => !TYPE_KEYWORDS.has(String(t).toUpperCase()));
    if (nameTok && model.tableTypes?.has(String(nameTok).toLowerCase())) return "[]";
  }
  // interface-qualified type: [TYPE] intf => ty_x
  const arrowIdx = typeTokens.findIndex((t) => String(t) === "=>");
  let comps = null;
  if (arrowIdx > 0 && typeTokens[arrowIdx + 1]) {
    const key = `${String(typeTokens[arrowIdx - 1]).toLowerCase()}=>${String(typeTokens[arrowIdx + 1]).toLowerCase()}`;
    comps = model.externTypes?.get(key) || null;
    if (!comps && model.externTypes?.has(`${key}:table`)) return "[]";
  } else {
    comps = rowStructComponents(typeTokens, model);
  }
  if (!comps) return init;
  return renderComps(comps, model, depth);
}

/** row components of an interface-qualified TABLE type ("intf=>tty":table) */
function externRowComponents(typeTokens, model) {
  const arrowIdx = typeTokens.findIndex((t) => String(t) === "=>");
  if (arrowIdx <= 0 || !typeTokens[arrowIdx + 1] || !model.externTypes) return null;
  const intf = String(typeTokens[arrowIdx - 1]).toLowerCase();
  const ty = String(typeTokens[arrowIdx + 1]).toLowerCase();
  const rowName = model.externTypes.get(`${intf}=>${ty}:table`);
  if (typeof rowName !== "string") return null;
  return model.externTypes.get(`${intf}=>${rowName}`) || null;
}

function renderComps(comps, model, depth) {
  const parts = comps.map((m) => {
    let d = m.value ?? m.default;
    if ((d === "null" || d === "{}" || d == null) && m.typeTokens) d = declaredInit(m.typeTokens, model, depth + 1);
    return `${m.name}: ${d ?? "null"}`;
  });
  return `{ ${parts.join(", ")} }`;
}

// The declared TYPE tokens of a bare variable/attribute target, or null.
function targetTypeTokens(nameToks, ctx) {
  if (nameToks.length === 1 && isId(nameToks[0])) {
    const nm = nameToks[0].str.toLowerCase();
    if (ctx.varTypes.has(nm)) return ctx.varTypes.get(nm);
    const f = ctx.model.fields.get(nm);
    if (f && f.typeTokens) return f.typeTokens;
  }
  // dashed member path (var-comp-comp): walk the declared structure types
  if (nameToks.length >= 3 && isId(nameToks[0]) && isDash(nameToks[1])) {
    let cur = targetTypeTokens([nameToks[0]], ctx);
    for (let i = 2; i < nameToks.length && cur; i += 2) {
      if (!isId(nameToks[i])) return null;
      const comps = rowStructComponents(cur, ctx.model);
      const member = comps?.find((c) => c.name === nameToks[i].str.toLowerCase());
      cur = member?.typeTokens ?? null;
    }
    return cur;
  }
  return null;
}

/** field entry ({refType, typeTokens, …}) of `fname` on class `cls` — own
 *  model or a sibling local class of the same module (opts.siblingFields) */
function fieldEntryOf(cls, fname, ctx) {
  if (!cls || !fname) return null;
  if (cls === ctx.model.name) return ctx.model.fields.get(fname) || null;
  return ctx.model.siblingFields?.get(cls)?.get(fname) || null;
}

/** Walk a member path (`a->b->c`, dashes allowed for struct components) to
 *  the declared field entry of the LAST segment. Returns {refType?,
 *  typeTokens?} or null. Used for `x->field = NEW #( )` inference and for
 *  CREATE DATA without TYPE clause. */
function resolveMemberEntry(nameToks, ctx) {
  // split into segments at -> (class hop) / - (struct component)
  const segs = [];
  for (let i = 0; i < nameToks.length; i++) {
    const t = nameToks[i];
    if (isId(t)) segs.push({ name: t.str.toLowerCase(), viaArrow: i > 0 && nameToks[i - 1].type === "InstanceArrow" });
    else if (t.type !== "InstanceArrow" && !isDash(t)) return null; // parens/indices — give up
  }
  if (!segs.length) return null;
  if (segs.length === 1) {
    const nm = segs[0].name;
    const f = ctx.model.fields.get(nm);
    if (f) return f;
    if (ctx.varTypes.has(nm)) return { typeTokens: ctx.varTypes.get(nm), refType: ctx.localRefTypes.get(nm) || null };
    if (ctx.localRefTypes.has(nm)) return { refType: ctx.localRefTypes.get(nm) };
    return null;
  }
  // start: class of the first segment (me/local var/own field)
  let cls = null;
  let typeToks = null;
  let members = null; // DATA BEGIN OF … blocks carry their member list
  {
    const nm = segs[0].name;
    if (nm === "me") cls = ctx.model.name;
    else {
      const f = ctx.model.fields.get(nm);
      cls = ctx.localRefTypes.get(nm) || f?.refType || null;
      typeToks = ctx.varTypes.get(nm) || f?.typeTokens || null;
      members = f?.members || null;
    }
  }
  let entry = null;
  for (let k = 1; k < segs.length; k++) {
    const seg = segs[k];
    if (seg.viaArrow && cls) {
      entry = fieldEntryOf(cls, seg.name, ctx);
    } else if (!seg.viaArrow && (members || typeToks)) {
      const comps = members || rowStructComponents(typeToks, ctx.model);
      entry = comps?.find((c) => c.name === seg.name) || null;
    } else {
      entry = null;
    }
    if (!entry) return k === segs.length - 1 ? uniqueSiblingField(segs[segs.length - 1].name, ctx) : null;
    cls = entry.refType || null;
    typeToks = entry.typeTokens || null;
    members = entry.members || null;
  }
  return entry;
}

/** last-resort inference: the field name exists with a REF TO type on exactly
 *  one distinct class among the module's local classes */
function uniqueSiblingField(fname, ctx) {
  if (!ctx.model.siblingFields) return null;
  const found = new Map(); // refType → entry
  const own = ctx.model.fields.get(fname);
  if (own?.refType) found.set(own.refType, own);
  for (const fields of ctx.model.siblingFields.values()) {
    const f = fields.get(fname);
    if (f?.refType) found.set(f.refType, f);
  }
  return found.size === 1 ? [...found.values()][0] : null;
}

function renderLiteralToken(tok) {
  if (isStr(tok)) return stringToken(tok.str);
  const up = KW(tok.str);
  if (up === "ABAP_TRUE") return "true";
  if (up === "ABAP_FALSE") return "false";
  return tok.str;
}

class Ctx {
  constructor(model, method) {
    this.model = model;
    this.method = method; // { name, def }
    this.locals = new Set(); // declared local vars (lowercase)
    this.upperLocals = new Set(); // locals holding client.get() structs (UPPERCASE keys)
    this.localRefTypes = new Map(); // local var → class name (DATA x TYPE REF TO cls)
    this.refVars = new Set(); // params/locals declared TYPE REF TO … (reference semantics)
    this.varTypes = new Map(); // local/param var → declared TYPE tokens (struct completion)
    this._completeStruct = null; // pending row components for the next top-level VALUE #()
    this.newTargetType = null; // declared type of the current assignment target (NEW # inference)
    this.requires = null; // shared Set on emitter
    this.todos = null; // shared array
    this.rowVar = null; // WHERE context: bare names resolve to <rowVar>.<name>
    this.loopDepth = 0;
    this.fsBacked = new Map(); // field symbol name -> shadow var holding { o, k } write-back target
  }
  isLocal(name) {
    return this.locals.has(name.toLowerCase());
  }
  isField(name) {
    const lower = name.toLowerCase();
    // inherited exception-class attributes (cx_root) — resolve as fields
    if (this.model.superclass && (lower === "previous" || lower === "textid")) return true;
    return this.model.fields.has(lower) && !this.model.fields.get(lower).isStatic;
  }
  isStaticField(name) {
    const f = this.model.fields.get(name.toLowerCase());
    return (f && f.isStatic) || this.model.structConsts.has(name.toLowerCase());
  }
  isOwnMethod(name) {
    return this.model.methods.has(name.toLowerCase());
  }
}

module.exports = { typeDefault, parseTypeAfter, ClassModel, parseMethodDef, buildModel, collectTypeDefs, rowStructComponents, declaredInit, renderComps, targetTypeTokens, resolveMemberEntry, uniqueSiblingField, renderLiteralToken, Ctx };
