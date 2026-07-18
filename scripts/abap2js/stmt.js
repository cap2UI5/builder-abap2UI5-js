"use strict";
// ---------------------------------------------------------------------------
// statement transpiler — the big per-statement-type switch (emitStatement)
// plus the OpenSQL WHERE lowering
// ---------------------------------------------------------------------------

const { KW, isParenL, isId, isDash, isInstArrow, isStatArrow, depthDelta, matchGroup, splitTop, findTopWord } = require("./lex");
const { requirePathFor, safeIdent, fsIdent, varOrFsIdent } = require("./naming");
const { typeDefault, parseTypeAfter, rowStructComponents, declaredInit, renderComps, targetTypeTokens, resolveMemberEntry, uniqueSiblingField, renderLiteralToken } = require("./model");
const { txExpr, txCond, txArgs, namedArgsOf, renderNamedVal, txWhere, splitTopExprs } = require("./expr");

function emitStatement(s, ctx, st, push, assignedTwice, methodDef) {
  const T = s.type;
  const toks = s.toks.slice(0, -1); // drop trailing "."
  const todo = () => {
    ctx.todos.push(`unsupported statement: ${s.src.slice(0, 120)}`);
    push(`// TODO(abap2js): ${s.src}`);
  };

  switch (T) {
    case "DataBegin": {
      // DATA BEGIN OF s ... DATA END OF s — collect members into one object
      const ofIdx = toks.findIndex((t) => KW(t.str) === "OF");
      st.dataStructs = st.dataStructs || [];
      st.dataStructs.push({ name: safeIdent(toks[ofIdx + 1].str.toLowerCase()), members: [] });
      break;
    }
    case "DataEnd": {
      const col = st.dataStructs?.pop();
      if (!col) break;
      const literal = `{ ${col.members.map((m) => `${m.name}: ${m.init}`).join(", ")} }`;
      if (st.dataStructs?.length) {
        st.dataStructs[st.dataStructs.length - 1].members.push({ name: col.name, init: literal });
      } else {
        ctx.locals.add(col.name);
        push(`let ${col.name} = ${literal};`);
      }
      break;
    }
    case "Data": {
      // DATA x TYPE t [VALUE lit].
      const name = safeIdent(toks[1].str.toLowerCase());
      ctx.locals.add(name);
      const { typeTokens, value } = parseTypeAfter(toks.slice(2), 0);
      // remember REF TO targets so `x = NEW #( … )` can infer the class
      const refIdx = typeTokens.findIndex((t, k) => KW(t) === "REF" && KW(typeTokens[k + 1] || "") === "TO");
      if (refIdx >= 0 && typeTokens[refIdx + 2]) {
        ctx.localRefTypes.set(name, typeTokens[refIdx + 2].toLowerCase());
        ctx.refVars.add(name);
      }
      ctx.varTypes.set(name, typeTokens);
      let init = declaredInit(typeTokens, ctx.model, 0, ctx);
      if (value) {
        const rendered = renderLiteralToken(value);
        if (rendered != null) {
          // numeric target types take the literal as a number ('123.45' → 123.45)
          const numericTarget = init === "0" || /^(TYPE|LIKE)\s+(P\b|I$|INT|F$|DECFLOAT|TIMESTAMP)/.test(typeTokens.join(" ").toUpperCase());
          const numeric = Number(String(value.str).replace(/^'|'$/g, "").replace(/''/g, "'"));
          init = numericTarget && !Number.isNaN(numeric) ? String(numeric) : rendered;
        }
      }
      if (st.dataStructs?.length) {
        // member of a DATA BEGIN OF block
        st.dataStructs[st.dataStructs.length - 1].members.push({ name, init });
        break;
      }
      push(`let ${name} = ${init};`);
      break;
    }
    case "Constant": {
      // method-local CONSTANTS c_x TYPE t VALUE lit.
      const name = safeIdent(toks[1].str.toLowerCase());
      ctx.locals.add(name);
      const { typeTokens, value } = parseTypeAfter(toks.slice(2), 0);
      const rendered = value ? renderLiteralToken(value) : null;
      push(`const ${name} = ${rendered ?? typeDefault(typeTokens)};`);
      break;
    }
    case "FieldSymbol":
      // FIELD-SYMBOLS <x> TYPE t. — already hoisted to the method top
      break;
    case "Type":
    case "TypeBegin":
    case "TypeEnd":
      // method-local TYPES (incl. BEGIN OF ... END OF): pure type declarations
      // carry no runtime meaning in JS — references resolve structurally, so
      // the declaration is simply dropped.
      break;
    case "Unassign": {
      const name = fsIdent(toks[1].str);
      push(`${name} = null;`);
      const shadow = ctx.fsBacked.get(name);
      if (shadow) push(`${shadow} = null;`);
      break;
    }
    case "Assign": {
      // ASSIGN COMPONENT c OF STRUCTURE s TO <x>. | ASSIGN src TO <x>.
      const toIdx = findTopWord(toks, "TO");
      if (toIdx < 0) return todo();
      // TO <x> | TO FIELD-SYMBOL( <x> ) — FIELD-SYMBOL lexes as FIELD - SYMBOL
      let fsAt = toIdx + 1;
      if (KW(toks[fsAt]?.str ?? "") === "FIELD" && isDash(toks[fsAt + 1] ?? { type: "" })) fsAt = toIdx + 5;
      const fsTok = toks[fsAt];
      if (!fsTok || !/^<\w+>$/.test(fsTok.str)) return todo();
      // trailing options: ELSE UNASSIGN matches our null handling, the rest
      // (CASTING, dynamic pieces) has no JS mapping
      const trailing = toks.slice(fsAt + (fsAt === toIdx + 5 ? 2 : 1));
      if (trailing.length && !(KW(trailing[0].str) === "ELSE" && KW(trailing[1]?.str ?? "") === "UNASSIGN")) return todo();
      const name = fsIdent(fsTok.str);
      const shadow = ctx.fsBacked.get(name);
      if (KW(toks[1].str) === "COMPONENT") {
        // component by name (ABAP-uppercase -> JS-lowercase keys) or by index
        const ofIdx = findTopWord(toks, "OF");
        if (ofIdx < 0 || KW(toks[ofIdx + 1].str) !== "STRUCTURE") return todo();
        const comp = txExpr(toks.slice(2, ofIdx), ctx);
        const struct = txExpr(toks.slice(ofIdx + 2, toIdx), ctx);
        push(`${shadow} = ((_o, _c) => { if (_o == null) return null; const _k = typeof _c === "number" ? Object.keys(_o)[_c - 1] : String(_c).toLowerCase(); return _k != null && _k in _o ? { o: _o, k: _k } : null; })(${struct}, ${comp});`);
        push(`${name} = ${shadow} ? ${shadow}.o[${shadow}.k] : null;`);
        push(`sy_subrc = ${shadow} ? 0 : 4;`);
      } else {
        // a dref deref (`ref->*`) collapses to the value itself — drop the
        // tokens; ASSIGN obj->(`NAME`) resolves the attribute dynamically
        let srcToks = toks.slice(1, toIdx);
        if (isParenL(srcToks[0])) return todo();
        for (let k = 0; k < srcToks.length; k++) {
          if (isInstArrow(srcToks[k]) && isParenL(srcToks[k + 1] ?? { type: "" })) {
            const closeAt = matchGroup(srcToks, k + 1);
            if (closeAt !== srcToks.length - 1) return todo();
            const objExpr = txExpr(srcToks.slice(0, k), ctx);
            const attrExpr = txExpr(srcToks.slice(k + 2, closeAt), ctx);
            push(`${shadow} = ((_o, _n) => { if (_o == null) return null; const _k = String(_n).toLowerCase(); return _k in _o ? { o: _o, k: _k } : null; })(${objExpr}, ${attrExpr});`);
            push(`${name} = ${shadow} ? ${shadow}.o[${shadow}.k] : null;`);
            push(`sy_subrc = ${shadow} ? 0 : 4;`);
            return;
          }
        }
        srcToks = srcToks.filter((t, k) => t.str !== "->*" && !(t.str === "*" && srcToks[k - 1]?.str === "->") && !(t.str === "->" && srcToks[k + 1]?.str === "*"));
        if (!srcToks.length) return todo();
        const src = txExpr(srcToks, ctx);
        const m = src.match(/^(.+)\.([A-Za-z_$][\w$]*)$/);
        push(`${name} = ${src};`);
        push(`${shadow} = ${m ? `{ o: ${m[1]}, k: \`${m[2]}\` }` : "null"};`);
        push(`sy_subrc = 0;`);
      }
      break;
    }
    case "ReadTable": {
      // READ TABLE tab [WITH [TABLE] KEY c = v ...] [INDEX n]
      //   [INTO [DATA(]x[)] | REFERENCE INTO [DATA(]x[)]
      //    | ASSIGNING [FIELD-SYMBOL(]<x>[)] | TRANSPORTING NO FIELDS].
      const intoIdx = findTopWord(toks, "INTO");
      const asgIdx = findTopWord(toks, "ASSIGNING");
      const withIdx = findTopWord(toks, "WITH");
      const idxIdx = findTopWord(toks, "INDEX");
      const transIdx = findTopWord(toks, "TRANSPORTING");
      const refIdx = findTopWord(toks, "REFERENCE");
      const stops = [intoIdx, asgIdx, withIdx, idxIdx, transIdx, refIdx].filter((x) => x > 0);
      const tab = txExpr(toks.slice(2, stops.length ? Math.min(...stops) : toks.length), ctx);
      // locator — INDEX n or WITH [TABLE] KEY c1 = v1 c2 = v2 (BINARY SEARCH is a no-op)
      let locator = null;
      if (idxIdx > 0) {
        const end = stops.filter((x) => x > idxIdx).sort((a, b) => a - b)[0] ?? toks.length;
        locator = `(${txExpr(toks.slice(idxIdx + 1, end), ctx)}) - 1`;
      } else if (withIdx > 0) {
        let k = withIdx + 1;
        if (KW(toks[k].str) === "TABLE") k++;
        if (KW(toks[k].str) !== "KEY") return todo();
        k++;
        const conds = [];
        while (k < toks.length) {
          if (!isId(toks[k]) || toks[k + 1]?.str !== "=") break;
          const comp = toks[k].str.toLowerCase();
          // value expr runs until the next `comp =` pair or section keyword
          let end = toks.length;
          let depth = 0;
          for (let j = k + 2; j < toks.length; j++) {
            depth += depthDelta(toks[j]);
            if (depth !== 0) continue;
            const u = KW(toks[j].str);
            if (["INTO", "ASSIGNING", "REFERENCE", "TRANSPORTING", "BINARY", "INDEX"].includes(u) || (isId(toks[j]) && toks[j + 1]?.str === "=")) {
              end = j;
              break;
            }
          }
          const val = txExpr(toks.slice(k + 2, end), ctx);
          conds.push(comp === "table_line" ? `_r === ${val}` : `_r.${comp} === ${val}`);
          k = end;
        }
        if (!conds.length) return todo();
        locator = `_t.findIndex((_r) => ${conds.join(" && ")})`;
      } else {
        return todo();
      }
      // target
      let target = null; // { name, isFs }
      if (asgIdx > 0) {
        let fsAt = asgIdx + 1;
        if (KW(toks[fsAt]?.str ?? "") === "FIELD" && isDash(toks[fsAt + 1] ?? { type: "" })) fsAt = asgIdx + 5;
        if (!toks[fsAt] || !/^<\w+>$/.test(toks[fsAt].str)) return todo();
        target = { name: fsIdent(toks[fsAt].str), isFs: true };
      } else if (intoIdx > 0) {
        let tAt = intoIdx + 1;
        if (["DATA", "FINAL"].includes(KW(toks[tAt]?.str ?? "")) && isParenL(toks[tAt + 1] ?? { type: "" })) {
          const name = safeIdent(toks[tAt + 2].str.toLowerCase());
          if (ctx.hoisted?.has(name)) {
            push(`${name} = {};`);
          } else {
            ctx.locals.add(name);
            push(`let ${name} = {};`);
          }
          target = { name, isFs: false };
        } else {
          const end = stops.filter((x) => x > tAt).sort((a, b) => a - b)[0] ?? toks.length;
          target = { name: txExpr(toks.slice(tAt, end), ctx), isFs: false };
        }
      } else if (transIdx < 0) {
        return todo();
      }
      push(`{`);
      st.indent++;
      push(`const _t = ${tab};`);
      push(`const _i = ${locator};`);
      push(`sy_subrc = _i >= 0 && _i < _t.length ? 0 : 4;`);
      if (target) {
        if (target.isFs) {
          push(`${target.name} = sy_subrc === 0 ? _t[_i] : null;`);
          const shadow = ctx.fsBacked.get(target.name);
          if (shadow) push(`${shadow} = sy_subrc === 0 ? { o: _t, k: _i } : null;`);
        } else {
          push(`if (sy_subrc === 0) ${target.name} = _t[_i];`);
        }
      }
      st.indent--;
      push(`}`);
      break;
    }
    case "Move": {
      // possibly DATA(x) = ... / FINAL(x) = ...
      let i = 0;
      let decl = null;
      if ((KW(toks[0].str) === "DATA" || KW(toks[0].str) === "FINAL") && isParenL(toks[1])) {
        decl = safeIdent(toks[2].str.toLowerCase());
        ctx.locals.add(decl);
        i = 4;
      }
      // split at first top-level "=" (also handles ?=)
      let depth = 0;
      let eq = -1;
      for (let k = i; k < toks.length; k++) {
        depth += depthDelta(toks[k]);
        if (depth === 0 && (toks[k].str === "=" || toks[k].str === "?=") && isId(toks[k]) === false ? false : depth === 0 && (toks[k].str === "=" || toks[k].str === "?=")) {
          eq = k;
          break;
        }
      }
      if (eq < 0) return todo();
      // `x = NEW #( … )` — expose x's declared REF TO class for inference
      const lhsName = eq === i + 1 && isId(toks[i]) ? toks[i].str.toLowerCase() : decl;
      ctx.newTargetType = lhsName ? ctx.localRefTypes.get(lhsName) || ctx.model.fields.get(lhsName)?.refType || null : null;
      // member-path target (`lo_app->mo_mid = NEW #( )`) — resolve the last
      // segment's declared REF TO type through own/sibling class fields
      const lhsEntry = !ctx.newTargetType && eq > i + 1 ? resolveMemberEntry(toks.slice(i, eq), ctx) : null;
      if (lhsEntry?.refType) ctx.newTargetType = lhsEntry.refType;
      let rhs = txExpr(toks.slice(eq + 1), ctx);
      ctx.newTargetType = null;
      // remember the class of `DATA(x) = NEW cls( … )` for member-path walks
      if (decl) {
        const newCls = rhs.match(/^new ([a-z_][a-z0-9_]*)\(/)?.[1];
        if (newCls) {
          ctx.localRefTypes.set(decl, newCls);
          ctx.refVars.add(decl);
        }
      }
      // `?=` downcast onto a declared object reference — a scalar RHS must
      // raise cx_sy_move_cast_error (ABAP semantics), objects pass through
      if (toks[eq].str === "?=") {
        const refOfToks = (tt) => {
          if (!tt) return null;
          const k = tt.findIndex((t, x) => KW(String(t)) === "REF" && KW(String(tt[x + 1] ?? "")) === "TO");
          return k >= 0 && tt[k + 2] ? String(tt[k + 2]).toLowerCase() : null;
        };
        const refTarget = lhsName
          ? ctx.localRefTypes.get(lhsName) || ctx.model.fields.get(lhsName)?.refType
          : lhsEntry?.refType || refOfToks(lhsEntry?.typeTokens);
        if (refTarget && refTarget !== "data") {
          ctx.requires?.add("z2ui5_cl_util");
          rhs = `z2ui5_cl_util.abap_cast(${rhs})`;
        }
      }
      // vars initialized from client.get() carry UPPERCASE component keys
      if (decl && /(?:^|\.)client\.get\(\)/.test(rhs)) ctx.upperLocals.add(decl);
      // ABAP assignments have VALUE semantics: copying a table/struct variable
      // must not alias it (a later DELETE on the copy would empty the source
      // too). When the RHS is a plain reference into existing data — a bare
      // variable/attribute chain, optionally with index access — route it
      // through the runtime copy helper (class refs pass through unchanged).
      // Constructor expressions / calls already produce fresh values.
      if (/^(this\.)?[A-Za-z_$][\w$]*(\.[A-Za-z_$][\w$]*|\[[^\[\]]*\])*$/.test(rhs) && !/^(true|false|null|undefined)$/.test(rhs)) {
        // REF TO assignments keep reference semantics — no value copy when
        // either side is declared as a reference (param/local/field) or the
        // RHS chain ends in a REF TO field
        const isRefName = (n) => !!n && (ctx.refVars.has(n) || !!ctx.model.fields.get(n)?.refType);
        const rhsBare = rhs.match(/^(?:this\.)?([A-Za-z_$][\w$]*)$/)?.[1];
        const rhsLast = rhs.match(/\.([A-Za-z_$][\w$]*)$/)?.[1];
        const entryIsRef = (e) => !!e && (e.refType || e.isRef || (e.typeTokens && /\bREF\s+TO\b/i.test(e.typeTokens.join(" "))));
        const lhsIsRef = lhsName ? isRefName(lhsName) : entryIsRef(lhsEntry);
        const rhsIsRef = rhsBare ? isRefName(rhsBare) : rhsLast ? isRefName(rhsLast) || !!uniqueSiblingField(rhsLast, ctx) : false;
        if (!lhsIsRef && !rhsIsRef) {
          ctx.requires?.add("z2ui5_cl_util");
          rhs = `z2ui5_cl_util.abap_copy(${rhs})`;
        }
      }
      if (decl) {
        const kw = ctx.hoisted?.has(decl) ? "" : `${assignedTwice.has(decl) ? "let" : "const"} `;
        push(`${kw}${decl} = ${rhs};`);
      } else {
        // offset/length writes (lv_x+off(len) = ...) have no JS counterpart
        if (toks.slice(i, eq).some((t) => t.str === "+")) return todo();
        const lhs = txExpr(toks.slice(i, eq), ctx);
        // x = VALUE #( ). resets to the type's INITIAL value — restore the
        // declared component defaults instead of dropping the keys
        let rhs2 = rhs;
        if (rhs === "{}") {
          const f = ctx.model.fields.get(lhs.replace(/^this\./, ""));
          if (f && f.default.startsWith("{")) rhs2 = f.default;
        }
        // A struct copied out of client.get() carries UPPERCASE wire keys,
        // but non-local targets are read with the lowercase naming later on —
        // rebuild the copy with lowercase keys (scalars/class refs pass
        // through struct_lower_keys unchanged).
        if (
          /^\(\{ \.\.\.[^{}]*client\.get\(\)[^{}]*\}\)$/.test(rhs2) ||
          /client\.get\(\)(\.[A-Za-z0-9_]+)+$/.test(rhs2)
        ) {
          ctx.requires?.add("z2ui5_cl_util");
          rhs2 = `z2ui5_cl_util.struct_lower_keys(${rhs2})`;
        }
        // ABAP table assignment fills the target IN PLACE — references onto
        // the table (REF #( itab ) held elsewhere) stay valid. Preserve the
        // array identity when both sides are tables.
        if (rhs2.startsWith("[") || rhs2.startsWith("z2ui5_cl_util.abap_copy(")) {
          ctx.requires?.add("z2ui5_cl_util");
          rhs2 = `z2ui5_cl_util.abap_tab_assign(${lhs}, ${rhs2})`;
        }
        push(`${lhs} = ${rhs2};`);
        // writes through a backed field symbol propagate into the structure
        const shadow = ctx.fsBacked.get(lhs);
        if (shadow) push(`if (${shadow}) ${shadow}.o[${shadow}.k] = ${lhs};`);
      }
      break;
    }
    case "Call": {
      // CALL METHOD long form / dynamic invocation cannot be mapped inline —
      // except for kernel APIs the JS runtime emulates:
      if (KW(toks[0].str) === "CALL") {
        // CALL METHOD (…)=>if_system_uuid_static~create_uuid_c32 RECEIVING uuid = x
        if (/if_system_uuid_static~create_uuid_c32/i.test(s.src)) {
          const recIdx = toks.findIndex((t) => isId(t) && KW(t.str) === "RECEIVING");
          const eqIdx = toks.findIndex((t, k) => k > recIdx && t.str === "=");
          if (recIdx > 0 && eqIdx > recIdx) {
            const uuidTarget = txExpr(toks.slice(eqIdx + 1, toks.length), ctx);
            ctx.requires?.add("z2ui5_cl_util");
            push(`${uuidTarget} = z2ui5_cl_util.uuid_get_c32();`);
            break;
          }
        }
        // CALL METHOD obj->(`NAME`) [EXPORTING …] [IMPORTING …] [RECEIVING …]
        // [EXCEPTIONS …] — dynamic instance dispatch resolves natively on JS
        // objects (methods are lowercase); missing method → sy-subrc 4 (the
        // ABAP EXCEPTIONS convention) or a throw without EXCEPTIONS clause.
        {
          let arrowIdx = -1;
          for (let k = 2; k < toks.length; k++) {
            if (isInstArrow(toks[k]) && isParenL(toks[k + 1] ?? { type: "" })) {
              arrowIdx = k;
              break;
            }
            if (isId(toks[k]) && ["EXPORTING", "IMPORTING", "RECEIVING", "CHANGING", "EXCEPTIONS"].includes(KW(toks[k].str))) break;
          }
          if (arrowIdx > 2 && KW(toks[1].str) === "METHOD") {
            const close = matchGroup(toks, arrowIdx + 1);
            const recv = txExpr(toks.slice(2, arrowIdx), ctx);
            const nameExpr = txExpr(toks.slice(arrowIdx + 2, close), ctx);
            // split trailing sections
            const sections = [];
            let cur = null;
            for (let k = close + 1; k < toks.length; k++) {
              const kw = KW(toks[k].str);
              if (isId(toks[k]) && ["EXPORTING", "IMPORTING", "RECEIVING", "CHANGING", "EXCEPTIONS"].includes(kw)) {
                cur = { kind: kw, toks: [] };
                sections.push(cur);
                continue;
              }
              if (cur) cur.toks.push(toks[k]);
            }
            const pairs = [];
            const copyBack = [];
            let receiving = null;
            let hasExceptions = false;
            let ok = true;
            for (const sec of sections) {
              if (sec.kind === "EXCEPTIONS") {
                hasExceptions = true;
                continue;
              }
              const named = namedArgsOf(sec.toks, ctx);
              if (!named) {
                ok = false;
                break;
              }
              for (const [k2, v] of named) {
                const rendered = renderNamedVal(v);
                if (sec.kind === "RECEIVING") {
                  receiving = { key: k2, target: rendered };
                } else if (sec.kind === "EXPORTING") {
                  pairs.push(`${k2}: ${rendered}`);
                } else {
                  // IMPORTING/CHANGING — pass current value, copy back afterwards
                  pairs.push(`${k2}: ${rendered}`);
                  copyBack.push([k2, rendered]);
                }
              }
            }
            if (ok) {
              push(`{`);
              push(`  const _dynr = (${recv});`);
              push(`  const _dynm = _dynr ? _dynr[String(${nameExpr}).toLowerCase()] : undefined;`);
              if (hasExceptions && ctx.locals.has("sy_subrc")) {
                push(`  sy_subrc = typeof _dynm === "function" ? 0 : 4;`);
                push(`  if (typeof _dynm === "function") {`);
              } else {
                push(`  if (typeof _dynm !== "function") throw new Error(\`CALL METHOD: \${String(${nameExpr})} not found\`);`);
                push(`  {`);
              }
              push(`    const _dynargs = { ${pairs.join(", ")} };`);
              push(`    const _dynret = _dynm.call(_dynr, _dynargs);`);
              for (const [k2, target] of copyBack) push(`    ${target} = _dynargs.${k2};`);
              if (receiving) push(`    ${receiving.target} = _dynret !== undefined ? _dynret : _dynargs.${receiving.key};`);
              push(`  }`);
              push(`}`);
              break;
            }
          }
        }
        return todo();
      }
      const hasOut = toks.some((t) => isId(t) && ["IMPORTING", "RECEIVING", "CHANGING"].includes(KW(t.str)));
      if (toks.some((t) => isId(t) && KW(t.str) === "EXCEPTIONS")) return todo();
      if (hasOut) {
        // method( EXPORTING a = x IMPORTING b = y CHANGING c = z RECEIVING r = w )
        // → one merged args object; IMPORTING/CHANGING targets are copied
        // back afterwards (callees sync their out-params onto the object)
        const parenIdx = toks.findIndex((t) => isParenL(t));
        const close = parenIdx >= 0 ? matchGroup(toks, parenIdx) : -1;
        if (parenIdx <= 0 || close !== toks.length - 1) return todo();
        const inner = toks.slice(parenIdx + 1, close);
        const sections = []; // { kind, toks }
        let cur = { kind: "EXPORTING", toks: [] };
        let depth = 0;
        for (const t of inner) {
          depth += depthDelta(t);
          const kw = KW(t.str);
          if (depth === 0 && isId(t) && ["EXPORTING", "IMPORTING", "CHANGING", "RECEIVING"].includes(kw)) {
            if (cur.toks.length) sections.push(cur);
            cur = { kind: kw, toks: [] };
            continue;
          }
          cur.toks.push(t);
        }
        if (cur.toks.length) sections.push(cur);

        const pairs = new Map(); // key → rendered expr
        const copyBack = []; // [key, targetJs]
        let receiving = null;
        let ok = true;
        for (const sec of sections) {
          const named = namedArgsOf(sec.toks, ctx);
          if (!named) {
            ok = false;
            break;
          }
          for (const [k, v] of named) {
            if (v instanceof Map) {
              pairs.set(k, renderNamedVal(v));
              continue;
            }
            if (sec.kind === "RECEIVING") {
              receiving = v;
              continue;
            }
            pairs.set(k, v);
            if (sec.kind !== "EXPORTING" && /^[A-Za-z_$][\w$]*(\.[A-Za-z_$][\w$]*|\[[^\]]+\])*$/.test(v)) {
              copyBack.push([k, v]);
            }
          }
        }
        if (!ok) return todo();
        let callee;
        if (parenIdx === 1 && isId(toks[0])) {
          // bare own-method call — qualify like the expression renderer would
          const mname = toks[0].str.toLowerCase();
          const mdef = ctx.model.methods.get(mname);
          callee = `${mdef?.isStatic ? ctx.model.name : "this"}.${safeIdent(mname)}`;
        } else {
          callee = txExpr(toks.slice(0, parenIdx), ctx);
        }
        const outVar = `_out${st.tabixSeq++}`;
        push(`const ${outVar} = { ${[...pairs.entries()].map(([k, v]) => (k === v ? k : `${k}: ${v}`)).join(", ")} };`);
        push(`${receiving ? `${receiving} = ` : ""}${callee}(${outVar});`);
        for (const [k, tgt] of copyBack) {
          push(`if (${JSON.stringify(k)} in ${outVar}) ${tgt} = ${outVar}.${k};`);
          const shadow = ctx.fsBacked.get(tgt);
          if (shadow) push(`if (${shadow}) ${shadow}.o[${shadow}.k] = ${tgt};`);
        }
        break;
      }
      push(`${txExpr(toks, ctx)};`);
      break;
    }
    case "CreateObject": {
      // CREATE OBJECT x TYPE (name) — dynamic instantiation resolves through
      // the framework's app-class registry (the same lookup app_start uses).
      // A miss throws, mirroring ABAP's cx_sy_create_object_error.
      const target = txExpr([toks[2]], ctx);
      const typeIdx = toks.findIndex((t) => isId(t) && KW(t.str) === "TYPE");
      if (typeIdx > 0 && isParenL(toks[typeIdx + 1])) {
        const close = matchGroup(toks, typeIdx + 1);
        if (close === toks.length - 1) {
          const nameExpr = txExpr(toks.slice(typeIdx + 2, close), ctx);
          ctx.requires?.add("z2ui5_cl_util");
          push(`${target} = (() => { const _n = String(${nameExpr}); const _c = z2ui5_cl_util.rtti_get_class(_n.toLowerCase()); if (!_c) throw new Error(\`CREATE OBJECT: class \${_n} not found\`); return new _c(); })();`);
          break;
        }
      }
      // statement tokens carry no trailing "." — strip one defensively anyway
      const endTok = toks[toks.length - 1]?.str === "." ? toks.length - 1 : toks.length;
      const expIdx = toks.findIndex((t) => isId(t) && KW(t.str) === "EXPORTING");
      // static TYPE cls [EXPORTING …]
      if (typeIdx > 0 && isId(toks[typeIdx + 1]) && (typeIdx === endTok - 2 || expIdx === typeIdx + 2)) {
        const cls = toks[typeIdx + 1].str.toLowerCase();
        if (/^z2ui5_/.test(cls)) ctx.requires?.add(cls);
        const args = expIdx > 0 ? txArgs(toks.slice(expIdx + 1, endTok), ctx, cls) : "";
        push(`${target} = new ${safeIdent(cls)}(${args});`);
        break;
      }
      // plain CREATE OBJECT x [EXPORTING …] — infer the class from the
      // target's declared REF TO type, same inference as `x = NEW #( )`
      if (typeIdx < 0 && isId(toks[2])) {
        const tname = toks[2].str.toLowerCase();
        const cls = ctx.localRefTypes?.get(tname) || ctx.model.fields.get(tname)?.refType || null;
        if (cls && /^[a-z_][a-z0-9_]*$/.test(cls)) {
          const args = expIdx > 0 ? txArgs(toks.slice(expIdx + 1, endTok), ctx, cls) : "";
          if (cls === ctx.model.name) {
            push(`${target} = new ${ctx.model.name}(${args});`);
            break;
          }
          if (requirePathFor(cls)) {
            ctx.requires?.add(cls);
            push(`${target} = new ${cls}(${args});`);
            break;
          }
          // local class (lcl_/ltcl_) defined in the same module — no require
          if (!/^(cl_|cx_|z2ui5_)/.test(cls)) {
            push(`${target} = new ${safeIdent(cls)}(${args});`);
            break;
          }
        }
      }
      ctx.todos.push(`CREATE OBJECT: ${s.src}`);
      push(`${target} = null; // TODO(abap2js): ${s.src}`);
      break;
    }
    case "CreateData": {
      // JS has no data references — a dref collapses to its value. CREATE
      // DATA therefore initializes the target with the referenced type's
      // INITIAL value (`x->*` deref sites read the value directly):
      //   CREATE DATA x TYPE t   → x = <initial of t>
      //   CREATE DATA x LIKE y   → x = abap_initial_like(y)  (runtime shape)
      //   CREATE DATA x          → x = <initial of x's declared REF TO type>
      const cdToks = toks[toks.length - 1]?.str === "." ? toks.slice(0, -1) : toks;
      let clauseIdx = -1;
      let clause = null;
      for (let k = 2; k < cdToks.length; k++) {
        const kw = KW(cdToks[k].str);
        if (isId(cdToks[k]) && (kw === "TYPE" || kw === "LIKE") && !isInstArrow(cdToks[k - 1] ?? { type: "" }) && !isDash(cdToks[k - 1] ?? { type: "" })) {
          clauseIdx = k;
          clause = kw;
          break;
        }
      }
      const targetToks = cdToks.slice(2, clauseIdx > 0 ? clauseIdx : cdToks.length);
      const cdTarget = txExpr(targetToks, ctx);
      if (clause === "LIKE" && KW(cdToks[clauseIdx + 1]?.str) !== "LINE") {
        ctx.requires?.add("z2ui5_cl_util");
        push(`${cdTarget} = z2ui5_cl_util.abap_initial_like(${txExpr(cdToks.slice(clauseIdx + 1), ctx)});`);
        break;
      }
      let cdTypeToks = null;
      if (clause === "TYPE") {
        const tt = cdToks.slice(clauseIdx, cdToks.length).map((t) => t.str);
        // TYPE HANDLE / TYPE (dyn) — no static type available
        if (!/^(HANDLE|\()/i.test(String(tt[1] ?? ""))) cdTypeToks = tt;
      } else if (!clause) {
        const entry = resolveMemberEntry(targetToks, ctx);
        const et = entry?.typeTokens;
        if (et && /\bREF\s+TO\b/i.test(et.join(" "))) {
          const toIdx = et.findIndex((t, k) => KW(t) === "REF" && KW(et[k + 1] || "") === "TO");
          const refd = et.slice(toIdx + 2).filter((t) => !/^(READ-ONLY|OPTIONAL)$/i.test(String(t)));
          if (refd.length && String(refd[0]).toLowerCase() !== "data" && String(refd[0]).toLowerCase() !== "object") {
            cdTypeToks = ["TYPE", ...refd];
          }
        }
      }
      if (cdTypeToks) {
        const init = declaredInit(cdTypeToks, ctx.model, 0, ctx);
        push(`${cdTarget} = ${init};`);
        break;
      }
      ctx.todos.push(`CREATE DATA: ${s.src}`);
      push(`// TODO(abap2js): ${s.src}`);
      break;
    }
    case "If":
      push(`if (${txCond(toks.slice(1), ctx)}) {`);
      st.indent++;
      break;
    case "ElseIf":
      st.indent--;
      push(`} else if (${txCond(toks.slice(1), ctx)}) {`);
      st.indent++;
      break;
    case "Else":
      st.indent--;
      push(`} else {`);
      st.indent++;
      break;
    case "EndIf":
      st.indent--;
      push(`}`);
      break;
    case "Case":
      push(`switch (${txExpr(toks.slice(1), ctx)}) {`);
      st.indent++;
      st.caseStack.push({ open: false });
      break;
    case "WhenOthers":
    case "When": {
      const top = st.caseStack[st.caseStack.length - 1];
      if (top?.open) {
        push(`break;`);
        st.indent--;
      }
      const isOthers = KW(toks[1].str) === "OTHERS";
      if (isOthers) push(`default:`);
      else for (const alt of splitTop(toks.slice(1), (t) => isId(t) && KW(t.str) === "OR")) push(`case ${txExpr(alt, ctx)}:`);
      st.indent++;
      if (top) top.open = true;
      break;
    }
    case "EndCase": {
      const top = st.caseStack.pop();
      if (top?.open) {
        push(`break;`);
        st.indent--;
      }
      st.indent--;
      push(`}`);
      break;
    }
    case "Loop": {
      // LOOP AT tab [INTO DATA(x)|REFERENCE INTO DATA(x)|ASSIGNING FIELD-SYMBOL(<x>)] [WHERE cond].
      const atIdx = toks.findIndex((t) => KW(t.str) === "AT");
      const intoIdx = toks.findIndex((t) => KW(t.str) === "INTO");
      const assignIdx = toks.findIndex((t) => KW(t.str) === "ASSIGNING");
      const whereIdx = toks.findIndex((t) => KW(t.str) === "WHERE");
      const tabEnd = [intoIdx, assignIdx, whereIdx, toks.findIndex((t) => KW(t.str) === "REFERENCE")].filter((x) => x > 0);
      const tabToks = toks.slice(atIdx + 1, tabEnd.length ? Math.min(...tabEnd) : toks.length);
      const tab = txExpr(tabToks, ctx);
      let rowVar = "row";
      if (intoIdx > 0 && toks[intoIdx + 2] && isParenL(toks[intoIdx + 2])) rowVar = varOrFsIdent(toks[intoIdx + 3].str);
      else if (intoIdx > 0) rowVar = varOrFsIdent(toks[intoIdx + 1].str);
      else if (assignIdx > 0) {
        // ASSIGNING <fs> (pre-declared) or ASSIGNING FIELD-SYMBOL(<fs>)
        const fs = /^<\w+>$/.test(toks[assignIdx + 1]?.str ?? "") ? toks[assignIdx + 1].str : (toks[assignIdx + 1 + 2]?.str ?? "fs");
        rowVar = varOrFsIdent(fs);
      }
      ctx.locals.add(rowVar);
      const loopDepth = st.loopStack.filter((l) => l && l.restoreTabix !== undefined).length;
      let restoreTabix = null;
      if (loopDepth > 0) {
        restoreTabix = `_sy_tabix_${++st.tabixSeq}`;
        push(`const ${restoreTabix} = sy_tabix;`);
      }
      push(`sy_tabix = 0;`);
      push(`for (const ${rowVar} of ${tab}) {`);
      st.indent++;
      push(`sy_tabix++;`);
      if (whereIdx > 0) {
        const cond = txWhere(toks.slice(whereIdx + 1), rowVar, ctx);
        push(`if (!(${cond})) continue;`);
      }
      st.loopStack.push({ restoreTabix });
      break;
    }
    case "EndLoop": {
      st.indent--;
      push(`}`);
      const closed = st.loopStack.pop();
      if (closed?.restoreTabix) push(`sy_tabix = ${closed.restoreTabix};`);
      break;
    }
    case "Do": {
      if (toks.length > 1 && KW(toks[toks.length - 1].str) === "TIMES") {
        ctx.locals.add("sy_index");
        push(`for (let sy_index = 1; sy_index <= ${txExpr(toks.slice(1, -1), ctx)}; sy_index++) {`);
      } else {
        // bare DO. — sy-index still counts the passes
        ctx.locals.add("sy_index");
        push(`for (let sy_index = 1; ; sy_index++) {`);
      }
      st.indent++;
      st.loopStack.push("do");
      break;
    }
    case "EndDo":
      st.indent--;
      push(`}`);
      st.loopStack.pop();
      break;
    case "While":
      push(`while (${txCond(toks.slice(1), ctx)}) {`);
      st.indent++;
      st.loopStack.push("while");
      break;
    case "EndWhile":
      st.indent--;
      push(`}`);
      st.loopStack.pop();
      break;
    case "Exit":
      push(st.loopStack.length ? `break;` : methodDef.returning ? `return ${methodDef.returning.name};` : `return;`);
      break;
    case "Continue":
      push(`continue;`);
      break;
    case "Check": {
      const cond = txCond(toks.slice(1), ctx);
      const ret = methodDef.returning ? `return ${methodDef.returning.name};` : `return;`;
      push(st.loopStack.length ? `if (!(${cond})) continue;` : `if (!(${cond})) { ${st.outSync ?? ""} ${ret} }`);
      break;
    }
    case "Return":
      if (st.outSync) push(st.outSync);
      push(methodDef.returning ? `return ${methodDef.returning.name};` : `return;`);
      break;
    case "Condense": {
      // CONDENSE x [NO-GAPS] — strip leading/trailing blanks; interior runs
      // of blanks collapse to one space (or vanish entirely with NO-GAPS).
      // ABAP blanks are SPACES only — tabs/newlines survive CONDENSE.
      const noGaps = toks.some((t) => KW(t.str) === "NO-GAPS");
      const end = noGaps ? toks.findIndex((t) => KW(t.str) === "NO-GAPS") : toks.length;
      const target = txExpr(toks.slice(1, end), ctx);
      push(`${target} = String(${target}).replace(/^ +| +$/g, "").replace(/ +/g, ${noGaps ? "``" : "` `"});`);
      const shadowC = ctx.fsBacked.get(target);
      if (shadowC) push(`if (${shadowC}) ${shadowC}.o[${shadowC}.k] = ${target};`);
      break;
    }
    case "Replace": {
      // REPLACE [ALL OCCURRENCES OF|FIRST OCCURRENCE OF] sub IN target WITH with.
      // (REGEX / section-based variants keep falling through to TODO)
      const kws = toks.map((t) => KW(t.str));
      if (kws.includes("REGEX") || kws.includes("SECTION")) return todo();
      const inIdx = findTopWord(toks, "IN");
      const withIdx = findTopWord(toks, "WITH");
      if (inIdx < 0 || withIdx < 0 || withIdx < inIdx) return todo();
      const all = kws.includes("ALL");
      const ofIdx = findTopWord(toks, "OF");
      const sub = txExpr(toks.slice(ofIdx >= 0 && ofIdx < inIdx ? ofIdx + 1 : 1, inIdx), ctx);
      const target = txExpr(toks.slice(inIdx + 1, withIdx), ctx);
      const withExpr = txExpr(toks.slice(withIdx + 1), ctx);
      push(`${target} = String(${target}).${all ? "replaceAll" : "replace"}(${sub}, ${withExpr} ?? \`\`);`);
      const shadowR = ctx.fsBacked.get(target);
      if (shadowR) push(`if (${shadowR}) ${shadowR}.o[${shadowR}.k] = ${target};`);
      break;
    }
    case "Clear": {
      const target = txExpr(toks.slice(1), ctx);
      // best effort by declared default
      const name = toks[1].str.toLowerCase();
      const f = ctx.model.fields.get(name);
      const vt = ctx.varTypes.get(name);
      const dflt = f ? f.default : vt ? declaredInit(vt, ctx.model, 0, ctx) : "null";
      push(`${target} = ${dflt === "null" && /\.length/.test(target) ? "[]" : dflt};`);
      const shadow = ctx.fsBacked.get(target);
      if (shadow) push(`if (${shadow}) ${shadow}.o[${shadow}.k] = ${target};`);
      break;
    }
    case "Append": {
      // APPEND [INITIAL LINE TO t | LINES OF t1 TO t2 | expr TO t]
      //        [REFERENCE INTO DATA(x) | ASSIGNING FIELD-SYMBOL(<x>)]
      const refIdx = findTopWord(toks, "REFERENCE");
      const asgIdx = findTopWord(toks, "ASSIGNING");
      const end = Math.min(...[refIdx, asgIdx, toks.length].filter((x) => x > 0));
      let refVar = null;
      if (refIdx > 0 || asgIdx > 0) {
        // the target name sits inside the DATA( x ) / FIELD-SYMBOL( <x> ) group
        for (let k = end; k < toks.length; k++) {
          if (isParenL(toks[k])) {
            refVar = varOrFsIdent(toks[k + 1].str);
            break;
          }
        }
        // … or is a pre-declared target: ASSIGNING <n> / REFERENCE INTO ref
        if (!refVar) {
          const at = asgIdx > 0 ? asgIdx + 1 : refIdx + 2;
          if (toks[at]) refVar = varOrFsIdent(toks[at].str);
        }
      }
      // a target seen before (hoisted field symbol, or re-ASSIGNING the same
      // inline one) is re-bound, not re-declared — and a rebindable target's
      // first declaration must be `let`, not `const`
      const refSeen = refVar && (ctx.hoisted?.has(refVar) || ctx.locals.has(refVar));
      if (refVar) ctx.locals.add(refVar);
      const refKw = refSeen ? "" : "let ";
      const up1 = KW(toks[1].str);
      if (up1 === "INITIAL") {
        const tabToks0 = toks.slice(4, end);
        const tab = txExpr(tabToks0, ctx);
        const rowComps = rowStructComponents(targetTypeTokens(tabToks0, ctx), ctx.model);
        const blank = rowComps ? renderComps(rowComps, ctx.model, 0) : "{}";
        if (refVar) {
          push(`${refKw}${refVar} = ${blank};`);
          push(`${tab}.push(${refVar});`);
        } else {
          push(`${tab}.push(${blank});`);
        }
      } else if (up1 === "LINES") {
        const toIdx = toks.findIndex((t, k) => k > 2 && KW(t.str) === "TO");
        push(`${txExpr(toks.slice(toIdx + 1, end), ctx)}.push(...${txExpr(toks.slice(3, toIdx), ctx)});`);
      } else {
        const toIdx = findTopWord(toks, "TO");
        if (toIdx < 0) return todo();
        const tab = txExpr(toks.slice(toIdx + 1, end), ctx);
        const comps = rowStructComponents(targetTypeTokens(toks.slice(toIdx + 1, end), ctx), ctx.model);
        if (comps) ctx._completeStruct = comps;
        // ABAP APPEND copies the line — plain JS push would alias the object
        ctx.requires?.add("z2ui5_cl_util");
        const val = `z2ui5_cl_util.abap_copy(${txExpr(toks.slice(1, toIdx), ctx)})`;
        ctx._completeStruct = null;
        if (refVar) {
          push(`${refKw}${refVar} = ${val};`);
          push(`${tab}.push(${refVar});`);
        } else {
          push(`${tab}.push(${val});`);
        }
      }
      break;
    }
    case "InsertInternal": {
      // INSERT [LINES OF] expr INTO [TABLE] tab [INDEX n]
      //        [REFERENCE INTO [DATA(]x[)] | ASSIGNING FIELD-SYMBOL(<x>)].
      const intoIdx = findTopWord(toks, "INTO");
      if (intoIdx < 0) return todo();
      const idxIdx = findTopWord(toks, "INDEX");
      const refIdx = findTopWord(toks, "REFERENCE");
      const asgIdx = findTopWord(toks, "ASSIGNING");
      const end = Math.min(...[idxIdx, refIdx, asgIdx, toks.length].filter((x) => x > 0));
      let tabStart = intoIdx + 1;
      if (KW(toks[tabStart].str) === "TABLE") tabStart++;
      const tabToks = toks.slice(tabStart, end);
      const tab = txExpr(tabToks, ctx);
      const isLines = KW(toks[1].str) === "LINES" && KW(toks[2].str) === "OF";
      const isInitial = KW(toks[1].str) === "INITIAL" && KW(toks[2].str) === "LINE";
      if (!isLines && !isInitial) {
        const comps = rowStructComponents(targetTypeTokens(tabToks, ctx), ctx.model);
        if (comps) ctx._completeStruct = comps;
      }
      // ABAP INSERT copies the line(s) — plain JS push would alias the object
      let val = isInitial ? "{}" : txExpr(toks.slice(isLines ? 3 : 1, intoIdx), ctx);
      if (!isInitial) {
        ctx.requires?.add("z2ui5_cl_util");
        val = isLines ? `${val}.map((_r) => z2ui5_cl_util.abap_copy(_r))` : `z2ui5_cl_util.abap_copy(${val})`;
      }
      ctx._completeStruct = null;
      const spread = isLines ? "..." : "";
      // capture the inserted line into a reference/field symbol
      if ((refIdx > 0 || asgIdx > 0) && !isLines) {
        const from = refIdx > 0 ? refIdx + 2 : asgIdx + 1;
        const target = toks.slice(from);
        const parenAt = target.findIndex(isParenL);
        if (parenAt >= 0) {
          // DATA(x) / FINAL(x) / FIELD-SYMBOL(<x>) inline declaration
          const name = varOrFsIdent(target[parenAt + 1].str);
          ctx.locals.add(name);
          push(`const ${name} = ${val};`);
          val = name;
        } else if (target.length) {
          const rendered = txExpr(target, ctx);
          push(`${rendered} = ${val};`);
          val = rendered;
        }
      }
      if (idxIdx > 0) {
        const idxEnd = [refIdx, asgIdx].filter((x) => x > idxIdx).sort((a, b) => a - b)[0] ?? toks.length;
        push(`${tab}.splice((${txExpr(toks.slice(idxIdx + 1, idxEnd), ctx)}) - 1, 0, ${spread}${val});`);
      } else {
        push(`${tab}.push(${spread}${val});`);
      }
      break;
    }
    case "DeleteInternal": {
      // DELETE tab WHERE cond.
      const whereIdx = findTopWord(toks, "WHERE");
      if (whereIdx < 0) return todo();
      const tab = txExpr(toks.slice(1, whereIdx), ctx);
      const cond = txWhere(toks.slice(whereIdx + 1), "row", ctx);
      push(`for (let _i = ${tab}.length - 1; _i >= 0; _i--) { const row = ${tab}[_i]; if (${cond}) ${tab}.splice(_i, 1); }`);
      break;
    }
    case "Sort": {
      // SORT tab [BY comp ... [DESCENDING] | BY (dynamic)].
      const byIdx = findTopWord(toks, "BY");
      if (byIdx < 0) {
        push(`${txExpr(toks.slice(1), ctx)}.sort();`);
        break;
      }
      const tab = txExpr(toks.slice(1, byIdx), ctx);
      const rest = toks.slice(byIdx + 1);
      const desc = rest.some((t) => KW(t.str) === "DESCENDING");
      if (isParenL(rest[0])) {
        // dynamic component name — ABAP names are uppercase, JS keys lowercase
        const close = matchGroup(rest, 0);
        const nameExpr = txExpr(rest.slice(1, close), ctx);
        push(`{ const _f = String(${nameExpr}).toLowerCase(); ${tab}.sort((a, b) => (a[_f] > b[_f] ? 1 : a[_f] < b[_f] ? -1 : 0)${desc ? " * -1" : ""}); }`);
        break;
      }
      const comps = [];
      for (const t of rest) {
        const u = KW(t.str);
        if (u === "DESCENDING" || u === "ASCENDING" || u === "AS" || u === "TEXT") continue;
        if (isId(t)) comps.push(t.str.toLowerCase());
      }
      if (!comps.length) return todo();
      const cmp = comps.map((c) => `(a.${c} > b.${c} ? 1 : a.${c} < b.${c} ? -1 : 0)`).join(" || ");
      push(`${tab}.sort((a, b) => (${cmp})${desc ? " * -1" : ""});`);
      break;
    }
    case "Concatenate": {
      // CONCATENATE a b INTO c [SEPARATED BY s].
      const intoIdx = findTopWord(toks, "INTO");
      if (intoIdx < 0) return todo();
      const sepIdx = findTopWord(toks, "SEPARATED");
      const parts = splitTopExprs(toks.slice(1, intoIdx), ctx);
      const target = txExpr(toks.slice(intoIdx + 1, sepIdx > 0 ? sepIdx : undefined), ctx);
      const sep = sepIdx > 0 ? txExpr(toks.slice(sepIdx + 2), ctx) : "``";
      push(`${target} = [${parts.join(", ")}].join(${sep});`);
      break;
    }
    case "Split": {
      // SPLIT s AT sep INTO TABLE t / INTO a b.
      const atIdx = findTopWord(toks, "AT");
      const intoIdx = findTopWord(toks, "INTO");
      if (atIdx < 0 || intoIdx < 0) return todo();
      const src = txExpr(toks.slice(1, atIdx), ctx);
      const sep = txExpr(toks.slice(atIdx + 1, intoIdx), ctx);
      let rest = toks.slice(intoIdx + 1);
      if (KW(rest[0].str) === "TABLE") {
        rest = rest.slice(1);
        if ((KW(rest[0].str) === "DATA" || KW(rest[0].str) === "FINAL") && rest[1] && isParenL(rest[1])) {
          const name = safeIdent(rest[2].str.toLowerCase());
          ctx.locals.add(name);
          push(`let ${name} = ${src}.split(${sep});`);
        } else {
          push(`${txExpr(rest, ctx)} = ${src}.split(${sep});`);
        }
      } else {
        // target list: DATA(x) / FINAL(x) inline decls or identifier chains (a-b, a->b, a=>b)
        const targets = [];
        const decls = [];
        let k = 0;
        while (k < rest.length) {
          if ((KW(rest[k].str) === "DATA" || KW(rest[k].str) === "FINAL") && rest[k + 1] && isParenL(rest[k + 1])) {
            const name = safeIdent(rest[k + 2].str.toLowerCase());
            ctx.locals.add(name);
            decls.push(name);
            targets.push(name);
            k += 4;
            continue;
          }
          let end = k + 1;
          while (end + 1 < rest.length && (isDash(rest[end]) || isInstArrow(rest[end]) || isStatArrow(rest[end]))) end += 2;
          targets.push(txExpr(rest.slice(k, end), ctx));
          k = end;
        }
        if (decls.length === targets.length) {
          push(`let [${targets.join(", ")}] = ${src}.split(${sep});`);
        } else {
          for (const d of decls) push(`let ${d};`);
          push(`[${targets.join(", ")}] = ${src}.split(${sep});`);
        }
      }
      break;
    }
    case "Try":
      push(`try {`);
      st.indent++;
      break;
    case "Catch": {
      // CATCH cx_a cx_b [INTO DATA(x)].
      const intoIdx = findTopWord(toks, "INTO");
      let varName = null;
      if (intoIdx > 0) {
        if (toks[intoIdx + 2] && isParenL(toks[intoIdx + 2])) varName = safeIdent(toks[intoIdx + 3].str.toLowerCase());
        else varName = safeIdent(toks[intoIdx + 1].str.toLowerCase());
        ctx.locals.add(varName);
      }
      const info = s._catch;
      if (!info || info.tryInfo.catches <= 1) {
        st.indent--;
        if (varName) {
          // hoisted method-scoped var (see pre-scan) — assign the caught value
          const tmp = `_caught${++st.caughtSeq}`;
          push(`} catch (${tmp}) {`);
          st.indent++;
          push(`${varName} = ${tmp};`);
        } else {
          push(`} catch (error) {`);
          st.indent++;
          ctx.locals.add("error");
        }
        break;
      }
      // multi-CATCH: dispatch on the exception class
      const tryInfo = info.tryInfo;
      const classToks = toks.slice(1, intoIdx > 0 ? intoIdx : undefined).filter((t) => isId(t) && !["BEFORE", "UNWIND"].includes(KW(t.str)));
      const caught = tryInfo.caughtVar ?? (tryInfo.caughtVar = `_caught${++st.caughtSeq}`);
      const cond = classToks
        .map((t) => {
          const cls = t.str.toLowerCase();
          if (["cx_root", "cx_static_check", "cx_dynamic_check", "cx_no_check"].includes(cls)) return "true";
          if (/^z2ui5_/.test(cls)) {
            ctx.requires.add(cls);
            return `${caught} instanceof ${cls}`;
          }
          // unknown platform class — no JS counterpart, never matches
          return `${caught}?.constructor?.name === ${JSON.stringify(cls)}`;
        })
        .join(" || ") || "true";
      if (info.ordinal === 1) {
        st.indent--;
        push(`} catch (${caught}) {`);
        st.indent++;
        push(`if (${cond}) {`);
        st.indent++;
      } else {
        st.indent--;
        push(`} else if (${cond}) {`);
        st.indent++;
      }
      if (varName) push(`${varName} = ${caught};`);
      break;
    }
    case "EndTry": {
      const t = s._endTry;
      if (t && t.catches > 1) {
        st.indent--;
        push(`} else {`);
        st.indent++;
        push(`throw ${t.caughtVar};`);
        st.indent--;
        push(`}`);
        st.indent--;
        push(`}`);
      } else {
        st.indent--;
        push(`}`);
      }
      break;
    }
    case "Raise": {
      // RAISE EXCEPTION TYPE cx EXPORTING a = b. / RAISE EXCEPTION NEW cx( ) / RAISE EXCEPTION x.
      const typeIdx = findTopWord(toks, "TYPE");
      if (typeIdx > 0) {
        const cls = toks[typeIdx + 1].str.toLowerCase();
        ctx.requires.add(cls);
        const expIdx = findTopWord(toks, "EXPORTING");
        if (expIdx > 0) {
          const named = namedArgsOf(toks.slice(expIdx + 1), ctx);
          push(`throw new ${cls}({ ${[...(named ?? new Map()).entries()].map(([k, v]) => `${k}: ${renderNamedVal(v)}`).join(", ")} });`);
        } else {
          push(`throw new ${cls}();`);
        }
      } else {
        push(`throw ${txExpr(toks.slice(2), ctx)};`);
      }
      break;
    }
    case "Assert":
      push(`if (!(${txCond(toks.slice(1), ctx)})) throw new Error(\`ASSERT failed\`);`);
      break;
    case "DeleteDatabase": {
      // DELETE FROM <t> WHERE <conds>. → neutral DB IR marker.
      // Only the plain `DELETE FROM <t>` form is lowered; bulk/other forms TODO.
      if (KW(toks[1].str) !== "FROM") return todo();
      const whereIdx = findTopWord(toks, "WHERE");
      const table = toks[2].str.toLowerCase();
      if (!isTableName(table)) return todo();
      const where = whereIdx > 0 ? sqlWhere(toks.slice(whereIdx + 1), ctx) : "[]";
      if (where === null) return todo();
      ctx.requires?.add("z2ui5_port");
      push(`z2ui5_port.db({ op: \`delete\`, table: \`${table}\`, where: ${where} });`);
      push(`sy_subrc = z2ui5_port.sy_subrc;`);
      break;
    }
    case "ModifyDatabase": {
      // MODIFY <t> FROM @<row>. → neutral DB IR marker (upsert by table key).
      // FROM TABLE @<itab> (bulk) is not lowered.
      const fromIdx = findTopWord(toks, "FROM");
      const table = toks[1].str.toLowerCase();
      if (fromIdx < 0 || !isTableName(table)) return todo();
      let rowToks = toks.slice(fromIdx + 1);
      if (KW(rowToks[0]?.str ?? "") === "TABLE") return todo();
      if (rowToks[0]?.type === "WAt") rowToks = rowToks.slice(1);
      ctx.requires?.add("z2ui5_port");
      push(`z2ui5_port.db({ op: \`modify\`, table: \`${table}\`, row: ${txExpr(rowToks, ctx)} });`);
      push(`sy_subrc = z2ui5_port.sy_subrc;`);
      break;
    }
    case "Commit":
      ctx.requires?.add("z2ui5_port");
      push(`z2ui5_port.db({ op: \`commit\` });`);
      break;
    case "Select": {
      // SELECT [SINGLE] <fields|FIELDS *|*> FROM <t> [WHERE <conds>]
      //   INTO ( [TABLE] @DATA(x) | @x | CORRESPONDING FIELDS OF [TABLE] @x )
      // Anything outside this subset (joins, aggregates, ORDER/GROUP, UP TO,
      // non eq/in WHERE ops) falls back to a clean TODO — never broken JS.
      const single = KW(toks[1].str) === "SINGLE";
      const fromIdx = findTopWord(toks, "FROM");
      const whereIdx = findTopWord(toks, "WHERE");
      const intoIdx = findTopWord(toks, "INTO");
      const fieldsIdx = findTopWord(toks, "FIELDS");
      if (fromIdx < 0 || intoIdx < 0) return todo();
      for (const w of ["JOIN", "GROUP", "ORDER", "HAVING", "UNION", "UP"]) {
        if (findTopWord(toks.slice(0, intoIdx), w) > 0) return todo();
      }
      const table = toks[fromIdx + 1].str.toLowerCase();
      if (!isTableName(table)) return todo();
      const fieldToks = fieldsIdx >= 0 ? toks.slice(fieldsIdx + 1, whereIdx > 0 ? whereIdx : intoIdx) : toks.slice(single ? 2 : 1, fromIdx);
      if (fieldToks.some((t) => isParenL(t))) return todo(); // aggregates COUNT( )/SUM( )
      const isStar = fieldToks.length === 1 && fieldToks[0].str === "*";
      const fieldList = isStar ? [] : fieldToks.filter((t) => t.str !== ",").map((t) => `\`${t.str.toLowerCase()}\``);
      const where = whereIdx > 0 ? sqlWhere(toks.slice(whereIdx + 1, intoIdx), ctx) : "[]";
      if (where === null) return todo();

      let intoToks = toks.slice(intoIdx + 1);
      let op, target, dataDecl = false, singleField = false;
      if (KW(intoToks[0].str) === "CORRESPONDING") {
        const ofIdx = intoToks.findIndex((t) => KW(t.str) === "OF");
        if (ofIdx < 0) return todo();
        let rest = intoToks.slice(ofIdx + 1);
        const isTable = KW(rest[0]?.str ?? "") === "TABLE";
        if (isTable) rest = rest.slice(1);
        if (rest[0]?.type === "WAt") rest = rest.slice(1);
        if (!rest.length) return todo();
        op = isTable ? "select_table" : "select_single";
        dataDecl = KW(rest[0].str) === "DATA" && isParenL(rest[1] ?? { type: "" });
        target = dataDecl ? safeIdent(rest[2].str.toLowerCase()) : txExpr(rest, ctx);
      } else {
        let t0 = intoToks;
        let forceTable = false;
        if (KW(t0[0].str) === "TABLE") { t0 = t0.slice(1); forceTable = true; }
        if (t0[0]?.type === "WAt") t0 = t0.slice(1);
        if (!t0.length) return todo();
        op = forceTable ? "select_table" : single ? "select_single" : "select_table";
        dataDecl = KW(t0[0].str) === "DATA" && isParenL(t0[1] ?? { type: "" });
        target = dataDecl ? safeIdent(t0[2].str.toLowerCase()) : txExpr(t0, ctx);
        singleField = op === "select_single" && fieldList.length === 1;
      }
      if (!/^[A-Za-z_$][\w$.]*$/.test(target)) return todo(); // guard against garbage lvalue
      if (dataDecl) ctx.locals.add(target);
      ctx.requires?.add("z2ui5_port");
      const extra = op === "select_single" ? `, single_field: ${singleField}` : "";
      push(`${dataDecl ? "let " : ""}${target} = z2ui5_port.db({ op: \`${op}\`, table: \`${table}\`, fields: [${fieldList.join(", ")}], where: ${where}${extra} });`);
      push(`sy_subrc = z2ui5_port.sy_subrc;`);
      break;
    }
    case "Convert": {
      // ABAP timestamps are packed YYYYMMDDhhmmss numbers — the two CONVERT
      // forms are digit-group splices (timezone shifts are not modeled; the
      // framework passes UTC everywhere)
      const kws = toks.map((t) => KW(t.str));
      const intoIdx = findTopWord(toks, "INTO");
      if (intoIdx < 0) return todo();
      if (kws[1] === "DATE") {
        // CONVERT DATE d TIME t INTO TIME STAMP ts [TIME ZONE tz]
        const timeIdx = findTopWord(toks.slice(0, intoIdx), "TIME");
        if (timeIdx < 0 || kws[intoIdx + 1] !== "TIME" || kws[intoIdx + 2] !== "STAMP") return todo();
        const dateExpr = txExpr(toks.slice(2, timeIdx), ctx);
        const timeExpr = txExpr(toks.slice(timeIdx + 1, intoIdx), ctx);
        const target = txExpr([toks[intoIdx + 3]], ctx);
        push(`${target} = Number(\`\${${dateExpr}}\${${timeExpr}}\`) || 0;`);
        break;
      }
      if (kws[1] === "TIME" && kws[2] === "STAMP") {
        // CONVERT TIME STAMP ts [TIME ZONE tz] INTO DATE d [TIME t]
        const zoneIdx = findTopWord(toks.slice(0, intoIdx), "ZONE");
        const tsExpr = txExpr(toks.slice(3, zoneIdx > 0 ? zoneIdx - 1 : intoIdx), ctx);
        const after = toks.slice(intoIdx + 1);
        const afterKw = after.map((t) => KW(t.str));
        const dIdx = afterKw.indexOf("DATE");
        const tIdx = afterKw.indexOf("TIME");
        const tmp = `_ts${st.tabixSeq++}`;
        push(`const ${tmp} = String(Math.trunc(Number(${tsExpr}) || 0)).padStart(14, \`0\`);`);
        if (dIdx >= 0) push(`${txExpr([after[dIdx + 1]], ctx)} = ${tmp}.slice(0, 8);`);
        if (tIdx >= 0) push(`${txExpr([after[tIdx + 1]], ctx)} = ${tmp}.slice(8, 14);`);
        break;
      }
      return todo();
    }
    case "GetReference": {
      // GET REFERENCE OF x INTO y — JS has no scalar refs; objects/tables
      // alias naturally, scalars degrade to a value copy (deref collapses)
      const intoIdx = findTopWord(toks, "INTO");
      if (intoIdx < 0) return todo();
      const src = txExpr(toks.slice(3, intoIdx), ctx);
      let tgtToks = toks.slice(intoIdx + 1);
      if (["DATA", "FINAL"].includes(KW(tgtToks[0]?.str ?? "")) && isParenL(tgtToks[1] ?? { type: "" })) {
        const nm = safeIdent(tgtToks[2].str.toLowerCase());
        ctx.locals.add(nm);
        push(`let ${nm} = ${src};`);
        break;
      }
      const tgt = txExpr(tgtToks, ctx);
      push(`${tgt} = ${src};`);
      const shadowG = ctx.fsBacked.get(tgt);
      if (shadowG) push(`if (${shadowG}) ${shadowG}.o[${shadowG}.k] = ${tgt};`);
      break;
    }
    case "Comment":
      break;
    default:
      todo();
  }
}

const isTableName = (s) => /^[a-z_]\w*$/i.test(s);

/**
 * OpenSQL WHERE (`a = @v AND b IN @r ...`) → neutral condition-array literal.
 * Only equality (`=`) and range membership (`IN`) map cleanly; any other
 * comparison (<, >, <>, LIKE, …) or a malformed condition returns null so the
 * caller falls back to a TODO instead of emitting wrong semantics.
 */
function sqlWhere(condToks, ctx) {
  const parts = [];
  let cur = [];
  let depth = 0;
  for (const t of condToks) {
    depth += depthDelta(t);
    if (depth === 0 && isId(t) && KW(t.str) === "AND") { parts.push(cur); cur = []; }
    else cur.push(t);
  }
  if (cur.length) parts.push(cur);
  const conds = [];
  for (const p of parts) {
    if (p.length < 3 || !isId(p[0])) return null;
    const opTok = KW(p[1].str);
    const op = opTok === "IN" ? "in" : opTok === "=" ? "eq" : null;
    if (!op) return null; // unsupported comparison operator
    const field = p[0].str.toLowerCase();
    let valToks = p.slice(2);
    if (valToks[0]?.type === "WAt") valToks = valToks.slice(1);
    if (!valToks.length) return null;
    conds.push(`{ field: \`${field}\`, op: \`${op}\`, value: ${txExpr(valToks, ctx)} }`);
  }
  return `[${conds.join(", ")}]`;
}

module.exports = { emitStatement };
