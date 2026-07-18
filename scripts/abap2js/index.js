"use strict";
// Top-level transpile drivers — transpileClass assembles the emitted class
// (fields, methods, requires, popup preferred-param wiring), transpileFile
// dispatches classes/interfaces and applies the chain pretty-printer.

const { Registry, MemoryFile } = require("@abaplint/core");
const fs = require("fs");
const path = require("path");
const { requirePathFor, paramName } = require("./naming");
const { buildModel, declaredInit } = require("./model");
const { emitMethod } = require("./method");
const { transpileInterface } = require("./interface");

/**
 * Derive the popup PREFERRED PARAMETER map from the class definition: per public
 * factory-style method, the preferred parameter is the explicit
 * `PREFERRED PARAMETER x`, else the first IMPORTING parameter that is neither
 * DEFAULTed nor OPTIONAL (abap's single-mandatory positional call). Methods
 * without such a parameter are omitted. Matches the hand-authored maps 1:1.
 */
function derivePreferredMap(file) {
  const out = {};
  for (const s of file.getStatements()) {
    const T = s.get().constructor.name;
    if (T === "ClassImplementation") break;
    if (T !== "MethodDef") continue;
    const toks = s.getTokens().map((t) => t.getStr());
    const up = toks.map((t) => t.toUpperCase());
    const isStatic = up[0] === "CLASS";
    const name = toks[isStatic ? 3 : 1];
    if (!name) continue;
    let preferred = null;
    const params = [];
    const pp = up.indexOf("PREFERRED");
    if (pp >= 0 && up[pp + 1] === "PARAMETER") preferred = paramName(toks[pp + 2]);
    const impIdx = up.indexOf("IMPORTING");
    if (impIdx >= 0) {
      const end = [up.indexOf("EXPORTING"), up.indexOf("RETURNING"), up.indexOf("CHANGING"), up.indexOf("RAISING"), up.indexOf("PREFERRED"), toks.length].filter((x) => x > impIdx).sort((a, b) => a - b)[0];
      let i = impIdx + 1;
      while (i < end) {
        if ((up[i + 1] === "TYPE" || up[i + 1] === "LIKE") && /^!?[a-z]/i.test(toks[i])) {
          const pn = paramName(toks[i]);
          let j = i + 2;
          let mandatory = true;
          while (j < end && !((up[j + 1] === "TYPE" || up[j + 1] === "LIKE") && /^!?[a-z]/i.test(toks[j]))) {
            if (up[j] === "DEFAULT" || up[j] === "OPTIONAL") mandatory = false;
            j++;
          }
          params.push(pn);
          if (!preferred && mandatory) preferred = pn;
          i = j;
          continue;
        }
        i++;
      }
    }
    if (preferred) out[name.toLowerCase()] = { preferred, params };
  }
  return out;
}

function transpileClass(source, filename, opts = {}) {
  const reg = new Registry().addFile(new MemoryFile(filename, source));
  reg.parse();
  const obj = reg.getFirstObject();
  if (!obj) throw new Error(`no ABAP object parsed from ${filename}`);
  const file = obj.getABAPFiles()[0];
  const model = buildModel(file);
  if (!model) throw new Error(`no class found in ${filename}`);
  // sibling method signatures (same-module local classes): method name →
  // first importing param, used to wrap single positional args on instance
  // calls the same way own-method calls are wrapped
  model.siblingSigs = opts.siblingSigs || null;
  // global interface signatures: Map(intf name -> Map(method -> def))
  model.intfSigs = opts.intfSigs || null;
  // interface-defined structure types: Map("intf=>ty" -> members)
  model.externTypes = opts.externTypes || null;
  model.siblingFields = opts.siblingFields || null; // Map(cls → Map(field → {refType, typeTokens, …}))
  model.siblingTypes = opts.siblingTypes || null; // { structTypes: Map, tableTypes: Map } of the sibling classes

  const requires = new Set();
  const todos = [];
  const lines = [];

  // interface z2ui5_if_app → extends (the JS base class provides factory glue)
  const base = model.superclass ?? (model.interfaces.includes("z2ui5_if_app") ? "z2ui5_if_app" : null);
  if (base) requires.add(base);

  lines.push(`class ${model.name}${base ? ` extends ${base}` : ""} {`);

  // fields
  const instanceFields = [...model.fields.entries()].filter(([, f]) => !f.isStatic);
  const staticFields = [...model.fields.entries()].filter(([, f]) => f.isStatic);
  // typed initializers: fields declared against known struct types start as
  // full object literals (collectTypeDefs has run by now — the parse-time
  // default couldn't see the TYPES yet)
  const fieldInit = (f) =>
    (f.default === "null" || f.default === "{}") && f.typeTokens ? declaredInit(f.typeTokens, model) : f.default;
  for (const [name, f] of staticFields) lines.push(`  static ${name} = ${fieldInit(f)};`);
  for (const [name, members] of model.structConsts) {
    lines.push(`  static ${name} = { ${members.map((m) => `${m.name}: ${m.value ?? m.default}`).join(", ")} };`);
  }
  if (staticFields.length || model.structConsts.size) lines.push("");
  for (const [name, f] of instanceFields) lines.push(`  ${name} = ${fieldInit(f)};`);
  if (instanceFields.length) lines.push("");

  // methods
  for (const body of model.methodBodies) {
    emitMethod(model, body, lines, requires, todos);
    lines.push("");
  }
  while (lines[lines.length - 1] === "") lines.pop();
  lines.push(`}`);
  lines.push("");

  // export BEFORE the (non-base) requires — CommonJS cycle break: when two
  // transpiled classes require each other, the later-loaded one would
  // otherwise capture the first's still-empty module.exports. Method bodies
  // touch the required bindings only at call time, so requiring after the
  // export is safe; only the superclass is needed at definition time.
  lines.push(`module.exports = ${model.name};`);
  lines.push("");
  lines.push(`__REQUIRES__`);

  // abap PREFERRED PARAMETER call style for popup factories — abap (and code
  // transpiled 1:1 from it) passes the preferred/single-mandatory parameter
  // positionally, while the JS factory destructures an options object. Wire the
  // z2ui5_pop_preferred_param shim so both call styles work, matching the
  // hand-ported popups. Only z2ui5_cl_pop_* classes carry this convention.
  if (/^z2ui5_cl_pop_/.test(model.name)) {
    const pmap = derivePreferredMap(file);
    const entries = Object.entries(pmap);
    if (entries.length) {
      lines.push(`// abap PREFERRED PARAMETER call style — see z2ui5_pop_preferred_param.js`);
      lines.push(`require("./z2ui5_pop_preferred_param")(${model.name}, {`);
      for (const [meth, { preferred, params }] of entries) {
        lines.push(`  ${meth}: { preferred: \`${preferred}\`, params: [${params.map((p) => `\`${p}\``).join(", ")}] },`);
      }
      lines.push(`});`);
      lines.push("");
    }
  }

  // ABAP CLASS_CONSTRUCTOR runs before first use of the class — invoke it at
  // module load (the closest JS equivalent; ABAP is lazy-on-first-touch)
  if (lines.some((l) => /^\s*static class_constructor\(/.test(l))) {
    lines.push(`${model.name}.class_constructor();`);
    lines.push("");
  }

  // requires — the superclass at the top (definition-time), everything else
  // after the export (call-time; see the cycle-break note above)
  const header = [];
  const tailReqs = [];
  for (const req of [...requires].sort()) {
    if (req === model.name) continue;
    if (!/^[a-z_][a-z0-9_]*$/.test(req)) {
      todos.push(`unresolvable reference skipped: ${req}`);
      continue;
    }
    const p = requirePathFor(req);
    if (p) (req === base ? header : tailReqs).push(`const ${req} = require("${p}");`);
    else if (req === base) {
      // an unresolved superclass would throw at load time — stub it
      header.push(`const ${req} = class {}; // TODO(abap2js): unresolved superclass — replace stub manually`);
      todos.push(`unresolved superclass stubbed: ${req}`);
    } else {
      tailReqs.push(`// TODO(abap2js): unresolved reference ${req} — add require manually`);
      todos.push(`unresolved class reference: ${req}`);
    }
  }
  header.push("");
  {
    const at = lines.indexOf(`__REQUIRES__`);
    lines.splice(at, 1, ...tailReqs, ...(tailReqs.length ? [""] : []));
  }

  const methodSigs = new Map(
    [...model.methods].map(([m, def]) => [m, def.importing[0]?.name ?? null])
  );
  return {
    code: header.join("\n") + "\n" + lines.join("\n") + "\n",
    todos,
    name: model.name,
    methodSigs,
    fields: model.fields,
    structTypes: model.structTypes,
    tableTypes: model.tableTypes,
  };
}

// ---------------------------------------------------------------------------
// pretty printing: break long builder chains
// ---------------------------------------------------------------------------

function breakChains(code) {
  return code
    .split("\n")
    .map((line) => {
      if (line.length <= 120) return line;
      const indent = line.match(/^\s*/)[0];
      // break before ".method(" following ")" — only at top nesting level of the line
      let out = "";
      let depth = 0;
      for (let i = 0; i < line.length; i++) {
        const c = line[i];
        if (c === "(") depth++;
        if (c === ")") depth--;
        if (c === "." && depth === 0 && line[i - 1] === ")" && /[a-z_$]/i.test(line[i + 1] ?? "")) {
          out += "\n" + indent + "  ";
        }
        out += c;
      }
      return out;
    })
    .join("\n");
}

function transpileFile(inputPath, opts = {}) {
  const source = fs.readFileSync(inputPath, "utf8");
  if (inputPath.endsWith(".intf.abap")) {
    return transpileInterface(source, path.basename(inputPath));
  }
  const { code, todos, name } = transpileClass(source, path.basename(inputPath), opts);
  return { code: breakChains(code), todos, name };
}

module.exports = { transpileClass, transpileFile };
