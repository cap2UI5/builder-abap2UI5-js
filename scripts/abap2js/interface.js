"use strict";

const { Registry, MemoryFile } = require("@abaplint/core");
const { KW, tokify } = require("./lex");
const { requirePathFor } = require("./naming");
const { typeDefault, parseTypeAfter, parseMethodDef, collectTypeDefs, renderLiteralToken } = require("./model");

// ---------------------------------------------------------------------------
// interfaces — constants become a plain object export (types and method
// definitions have no JS representation; implementers flatten the methods)
// ---------------------------------------------------------------------------

/** INTERFACE source → Map(ty name → struct members) + table-type markers,
 *  so DATA declarations against intf=>ty_x get typed initializers */
function parseInterfaceTypes(source, filename) {
  const reg = new Registry().addFile(new MemoryFile(filename, source));
  reg.parse();
  const obj = reg.getFirstObject();
  const file = obj && obj.getABAPFiles()[0];
  const out = new Map();
  if (!file) return out;
  const fake = { structTypes: new Map(), tableTypes: new Map() };
  const statements = file.getStatements().map((s) => ({ type: s.get().constructor.name, toks: tokify(s), src: s.concatTokens() }));
  collectTypeDefs(statements, fake);
  for (const [ty, members] of fake.structTypes) out.set(ty, members);
  for (const [ty, rowName] of fake.tableTypes) out.set(`${ty}:table`, rowName);
  return out;
}

/** INTERFACE source → Map(method name → method def) — feeds the signatures
 *  of interface method implementations in classes (METHOD intf~name) */
function parseInterfaceSigs(source, filename) {
  const reg = new Registry().addFile(new MemoryFile(filename, source));
  reg.parse();
  const obj = reg.getFirstObject();
  const file = obj && obj.getABAPFiles()[0];
  if (!file) return new Map();
  const sigs = new Map();
  for (const stmt of file.getStatements()) {
    if (stmt.get().constructor.name !== "MethodDef") continue;
    const parsed = parseMethodDef(tokify(stmt));
    if (parsed) sigs.set(parsed.name, parsed.def);
  }
  return sigs;
}

function transpileInterface(source, filename) {
  const reg = new Registry().addFile(new MemoryFile(filename, source));
  reg.parse();
  const obj = reg.getFirstObject();
  if (!obj) throw new Error(`no ABAP object parsed from ${filename}`);
  const file = obj.getABAPFiles()[0];

  let name = null;
  const consts = []; // { name, value } — value is a rendered literal or object
  let structCollector = null;
  const requires = new Set();

  // VALUE may carry a literal or a reference chain (cl_x=>const-comp)
  const renderConstValue = (valToks, typeTokens) => {
    if (!valToks.length) return typeDefault(typeTokens);
    if (valToks.length === 1) return renderLiteralToken(valToks[0]);
    const head = valToks[0].str.toLowerCase();
    if (/^(cl_|cx_|z2ui5_)/.test(head)) requires.add(head);
    return valToks.map((t) => (t.str === "=>" || t.str === "-" ? "." : t.str.toLowerCase())).join("");
  };

  for (const s of file.getStatements()) {
    const T = s.get().constructor.name;
    const toks = tokify(s);
    if (T === "Interface") {
      name = toks[1].str.toLowerCase();
    } else if (T === "ConstantBegin") {
      const ofIdx = toks.findIndex((t) => KW(t.str) === "OF");
      structCollector = { name: toks[ofIdx + 1].str.toLowerCase(), members: [] };
    } else if (T === "ConstantEnd") {
      if (structCollector) {
        consts.push({ name: structCollector.name, value: `{ ${structCollector.members.map((m) => `${m.name}: ${m.value}`).join(", ")} }` });
        structCollector = null;
      }
    } else if (T === "Constant") {
      const cname = toks[1].str.toLowerCase();
      const body = [".", ","].includes(toks[toks.length - 1]?.str) ? toks.slice(2, -1) : toks.slice(2);
      const valIdx = body.findIndex((t) => KW(t.str) === "VALUE");
      const { typeTokens } = parseTypeAfter(valIdx >= 0 ? body.slice(0, valIdx) : body, 0);
      const rendered = renderConstValue(valIdx >= 0 ? body.slice(valIdx + 1) : [], typeTokens);
      if (structCollector) structCollector.members.push({ name: cname, value: rendered });
      else consts.push({ name: cname, value: rendered });
    }
  }
  if (!name) throw new Error(`no interface found in ${filename}`);

  const lines = [];
  lines.push(`// transpiled ABAP interface — constants only, types/methods have no JS form`);
  for (const req of [...requires].sort()) {
    const p = requirePathFor(req);
    if (p) lines.push(`const ${req} = require("${p}");`);
  }
  lines.push(`const ${name} = {`);
  for (const c of consts) lines.push(`  ${c.name}: ${c.value},`);
  lines.push(`};`);
  lines.push("");
  lines.push(`module.exports = ${name};`);
  return { code: lines.join("\n") + "\n", todos: [], name };
}

module.exports = { transpileInterface, parseInterfaceSigs, parseInterfaceTypes };
