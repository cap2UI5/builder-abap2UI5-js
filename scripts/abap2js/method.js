"use strict";
// Method emitter — signatures, hoisting (inline DATA(), field symbols,
// sy-* declarations), multi-CATCH annotation and the statement loop.

const { KW, isParenL, isId, findTopWord } = require("./lex");
const { SY_RUNTIME_FIELDS, safeIdent, fsIdent } = require("./naming");
const { typeDefault, Ctx } = require("./model");
const { txExpr } = require("./expr");
const { emitStatement } = require("./stmt");

function emitMethod(model, body, lines, requires, todos) {
  const lname = body.name;
  const isIntfMain = /~main$/.test(lname);
  const plainName = lname.replace(/^.*~/, "");
  // interface method implementations take their signature from the interface
  // definition when available (METHOD intf~name has no local METHODS entry)
  let intfDef = lname.includes("~") ? model.intfSigs?.get(lname.split("~")[0])?.get(plainName) : null;
  if (intfDef) {
    // param DEFAULTs written inside the interface reference its own
    // constants unqualified — qualify them for the implementing class
    const intf = lname.split("~")[0];
    intfDef = {
      ...intfDef,
      importing: intfDef.importing.map((p) => {
        if (!p.defaultToks?.length) return p;
        const t0 = p.defaultToks[0];
        if (t0.type !== "Identifier" || /^(abap_true|abap_false|abap_undefined|space)$/i.test(t0.str)) return p;
        if (p.defaultToks.some((t) => t.str === "=>")) return p;
        return { ...p, defaultToks: [{ type: "Identifier", str: intf }, { type: "StaticArrow", str: "=>" }, ...p.defaultToks] };
      }),
    };
  }
  const def = model.methods.get(lname) ?? model.methods.get(plainName) ?? intfDef ?? { isStatic: false, importing: [], returning: null, outParams: [] };
  // get_text/get_longtext REDEFINITIONs inherit `RETURNING VALUE(result) TYPE string`
  // from cx_root — the local definition carries no signature
  if ((plainName === "get_text" || plainName === "get_longtext") && !def.returning) {
    def.returning = { name: "result", typeTokens: ["TYPE", "string"] };
  }
  const ctx = new Ctx(model, { name: plainName, def });
  ctx.requires = requires;
  ctx.todos = todos;

  // find reassigned locals to pick const/let; inline declarations inside a
  // nested block are hoisted to the method top (ABAP DATA(x) is
  // method-scoped, a JS let/const at the site would be block-scoped)
  const assignedTwice = new Set();
  const declared = new Set();
  const hoisted = new Set();
  {
    const OPEN = new Set(["If", "Case", "Loop", "Do", "While", "Try"]);
    const CLOSE = new Set(["EndIf", "EndCase", "EndLoop", "EndDo", "EndWhile", "EndTry"]);
    let depth = 0;
    for (const s of body.statements) {
      if (OPEN.has(s.type)) depth++;
      else if (CLOSE.has(s.type)) depth = Math.max(0, depth - 1);
      if (s.type === "Move") {
        const toks = s.toks;
        if ((KW(toks[0].str) === "DATA" || KW(toks[0].str) === "FINAL") && isParenL(toks[1])) {
          const n = toks[2].str.toLowerCase();
          if (declared.has(n) || depth > 0) hoisted.add(safeIdent(n));
          declared.add(n);
        } else if (isId(toks[0]) && toks[1]?.str === "=" && declared.has(toks[0].str.toLowerCase())) {
          assignedTwice.add(toks[0].str.toLowerCase());
        }
      } else if (s.type === "ReadTable" && depth > 0) {
        const toks = s.toks;
        const intoIdx = findTopWord(toks, "INTO");
        if (intoIdx > 0 && ["DATA", "FINAL"].includes(KW(toks[intoIdx + 1]?.str ?? "")) && isParenL(toks[intoIdx + 2] ?? { type: "" })) {
          hoisted.add(safeIdent(toks[intoIdx + 3].str.toLowerCase()));
        }
      } else if (s.type === "Catch") {
        // CATCH … INTO DATA(x) — ABAP catch vars are method-scoped, a JS
        // catch binding is block-scoped: hoist and assign inside the catch
        const toks = s.toks;
        const intoIdx = findTopWord(toks, "INTO");
        // only the INTO DATA(x) inline-declaration form introduces a new
        // var — bare INTO x targets an existing declaration
        if (intoIdx > 0 && ["DATA", "FINAL"].includes(KW(toks[intoIdx + 1]?.str ?? "")) && isParenL(toks[intoIdx + 2] ?? { type: "" })) {
          const v = toks[intoIdx + 3];
          if (v) {
            const n = safeIdent(v.str.toLowerCase());
            hoisted.add(n);
            declared.add(n);
          }
        }
      } else if (s.type === "Call") {
        // out-param call sites copy IMPORTING/CHANGING/RECEIVING targets back
        // — those targets get reassigned, so inline DATA() must emit `let`
        const toks = s.toks;
        let mode = null;
        for (let k = 0; k < toks.length; k++) {
          const kw = KW(toks[k].str);
          if (isId(toks[k]) && ["EXPORTING", "IMPORTING", "CHANGING", "RECEIVING"].includes(kw)) {
            mode = kw;
            continue;
          }
          if (mode && mode !== "EXPORTING" && isId(toks[k]) && toks[k + 1]?.str === "=" && isId(toks[k + 2] ?? { type: "" })) {
            assignedTwice.add(toks[k + 2].str.toLowerCase());
          }
        }
      }
    }
  }

  // signature
  const outParams = (def.outParams || []).map((n) => safeIdent(n));
  let sig;
  let argsBind = null;
  if (isIntfMain) {
    sig = `async main(client)`;
    ctx.locals.add("client");
  } else if (def.importing.length) {
    const params = def.importing
      .map((p) => {
        const local = safeIdent(p.name);
        ctx.locals.add(local);
        if (p.isRef) ctx.refVars.add(local);
        const bind = local === p.name ? p.name : `${p.name}: ${local}`;
        return p.defaultToks ? `${bind} = ${txExpr(p.defaultToks, ctx)}` : bind;
      })
      .join(", ");
    if (outParams.length) {
      // out-params (EXPORTING/CHANGING) sync back onto the args object at
      // every exit so call sites can copy scalar results out
      sig = `${def.isStatic ? "static " : ""}${plainName}(_args = {})`;
      argsBind = `let { ${params} } = _args;`;
    } else {
      sig = `${def.isStatic ? "static " : ""}${plainName}({ ${params} } = {})`;
    }
  } else {
    sig = `${def.isStatic ? "static " : ""}${plainName}()`;
  }
  lines.push(`  ${sig} {`);

  const st = { indent: 2, caseStack: [], loopStack: [], tabixSeq: 0, caughtSeq: 0 };

  // annotate multi-CATCH try blocks — JS allows only one catch clause, so
  // additional CATCHes become an instanceof if/else chain
  {
    const tryStack = [];
    for (const s of body.statements) {
      if (s.type === "Try") tryStack.push({ catches: 0 });
      else if (s.type === "Catch" && tryStack.length) {
        const t = tryStack[tryStack.length - 1];
        t.catches++;
        s._catch = { ordinal: t.catches, tryInfo: t };
      } else if (s.type === "EndTry" && tryStack.length) {
        s._endTry = tryStack.pop();
      }
    }
  }
  const push = (s) => lines.push("  ".repeat(st.indent) + s);

  if (argsBind) push(argsBind);
  // out-param sync emitted before every return and at the method end
  st.outSync = outParams.length && argsBind ? `Object.assign(_args, { ${outParams.join(", ")} });` : null;

  if (def.returning) {
    ctx.locals.add(def.returning.name);
    ctx.varTypes.set(def.returning.name.toLowerCase(), def.returning.typeTokens);
    push(`let ${def.returning.name} = ${typeDefault(def.returning.typeTokens)};`);
  }

  // one declaration per method — LOOPs reset/save/restore it (nested loops
  // in the same block must not redeclare)
  if (body.statements.some((x) => x.type === "Loop")) {
    ctx.locals.add("sy_tabix");
    push(`let sy_tabix = 0;`);
  }

  // sy-subrc — declared once per method when read anywhere or set by a
  // supported statement (ASSIGN / READ TABLE)
  if (body.statements.some((x) => x.type === "Assign" || x.type === "ReadTable" || /\bsy-subrc\b/i.test(x.src))) {
    ctx.locals.add("sy_subrc");
    push(`let sy_subrc = 0;`);
  }

  // read-only system fields referenced anywhere in the method body — declared
  // with runtime defaults (see SY_RUNTIME_FIELDS) so their `sy_<field>`
  // references resolve. Skipped when the name is already a declared local.
  {
    const bodySrc = body.statements.map((x) => x.src || "").join("\n");
    for (const [field, dflt] of Object.entries(SY_RUNTIME_FIELDS)) {
      if (ctx.locals.has(`sy_${field}`)) continue;
      if (new RegExp(`\\bsy-${field}\\b`, "i").test(bodySrc)) {
        ctx.locals.add(`sy_${field}`);
        push(`let sy_${field} = ${dflt};`);
      }
    }
  }

  // field symbols are method-scoped in ABAP while the ASSIGN sites may sit in
  // nested blocks — hoist every target to the method top. Each gets a shadow
  // var holding its { o, k } write-back target so plain `<fs> = val` writes
  // propagate into the assigned structure component / table line.
  for (const name of collectFsTargets(body.statements)) {
    if (ctx.locals.has(name)) continue;
    ctx.locals.add(name);
    ctx.fsBacked.set(name, `_fs$${name}`);
    push(`let ${name} = null;`);
    push(`let _fs$${name} = null;`);
  }

  // inline DATA(x) declarations that sit inside nested blocks — hoist to the
  // method top, the declaration sites then assign only
  ctx.hoisted = hoisted;
  for (const name of hoisted) {
    if (ctx.locals.has(name)) continue;
    ctx.locals.add(name);
    push(`let ${name};`);
  }

  const bodyStart = lines.length;
  for (const s of body.statements) {
    emitStatement(s, ctx, st, push, assignedTwice, def);
  }

  // derived-class constructor MUST call super() — either the transpiled
  // `super->constructor( … )` (emitted as super.constructor(…)) becomes the
  // real super(…) call, or a plain super() is injected at the top
  if (plainName === "constructor" && (model.superclass || model.interfaces.includes("z2ui5_if_app"))) {
    let called = false;
    for (let k = bodyStart; k < lines.length; k++) {
      if (/\bsuper\.constructor\(/.test(lines[k])) {
        lines[k] = lines[k].replace(/\bsuper\.constructor\(/, "super(");
        called = true;
        break;
      }
    }
    if (!called) lines.splice(bodyStart, 0, `${"  ".repeat(2)}super();`);
  }

  if (st.outSync) push(st.outSync);
  if (def.returning) push(`return ${def.returning.name};`);
  lines.push(`  }`);
}

/** field-symbol names a method body declares or assigns to (FIELD-SYMBOLS,
 *  ASSIGN ... TO, READ TABLE ... ASSIGNING, UNASSIGN) */
function collectFsTargets(statements) {
  const names = new Set();
  const grab = (tok) => {
    if (tok && /^<\w+>$/.test(tok.str)) names.add(fsIdent(tok.str));
  };
  for (const s of statements) {
    if (s.type === "FieldSymbol" || s.type === "Unassign") {
      grab(s.toks[1]);
    } else if (s.type === "Assign" || s.type === "ReadTable") {
      for (let i = 0; i < s.toks.length; i++) {
        const up = KW(s.toks[i].str);
        if (up === "TO" || up === "ASSIGNING") {
          // TO <x> | TO FIELD-SYMBOL( <x> ) — FIELD-SYMBOL lexes as 3 tokens
          for (let j = i + 1; j < Math.min(i + 7, s.toks.length); j++) {
            if (/^<\w+>$/.test(s.toks[j].str)) {
              grab(s.toks[j]);
              break;
            }
          }
        }
      }
    }
  }
  return names;
}

module.exports = { emitMethod };
