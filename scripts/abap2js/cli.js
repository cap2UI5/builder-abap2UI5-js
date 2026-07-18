"use strict";

const { Registry, MemoryFile } = require("@abaplint/core");
const fs = require("fs");
const path = require("path");
const { transpileFile } = require("./index");

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------

/** regenerate the PREFERRED_PARAM map for srv/z2ui5/02/z2ui5_cl_xml_view.js */
function printPreferredMap(abapPath) {
  const src = fs.readFileSync(abapPath, "utf8");
  const reg = new Registry().addFile(new MemoryFile(path.basename(abapPath), src));
  reg.parse();
  const map = {};
  for (const s of reg.getFirstObject().getABAPFiles()[0].getStatements()) {
    if (s.get().constructor.name !== "MethodDef") continue;
    const toks = s.getTokens().map((t) => t.getStr());
    const up = toks.map((t) => t.toUpperCase());
    const name = (up[0] === "CLASS" ? toks[3] : toks[1]).toLowerCase();
    if (name === "factory" || name === "factory_popup") continue;
    const prefIdx = up.indexOf("PREFERRED");
    if (prefIdx >= 0) {
      map[name] = toks[prefIdx + 2].toLowerCase();
      continue;
    }
    const impIdx = up.indexOf("IMPORTING");
    if (impIdx < 0) continue;
    const params = [];
    for (let i = impIdx + 1; i < toks.length; i++) {
      if (["EXPORTING", "CHANGING", "RETURNING", "RAISING"].includes(up[i])) break;
      if (up[i + 1] === "TYPE" || up[i + 1] === "LIKE") params.push(toks[i].toLowerCase());
    }
    if (params.length === 1) map[name] = params[0];
  }
  for (const [k, v] of Object.entries(map).sort(([a], [b]) => a.localeCompare(b))) {
    console.log(`    ${/^[a-z_][a-z0-9_]*$/.test(k) ? k : JSON.stringify(k)}: \`${v}\`,`);
  }
}

function main(argv) {
  const args = argv.slice(2);
  const inputs = [];
  let outDir = null;
  let stdout = false;
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "-o") outDir = args[++i];
    else if (args[i] === "--stdout") stdout = true;
    else if (args[i] === "--preferred-map") return printPreferredMap(args[++i]);
    else inputs.push(args[i]);
  }
  if (!inputs.length) {
    console.error("usage: node scripts/abap2js.js <file.clas.abap|dir>... [-o outdir | --stdout]");
    process.exit(1);
  }
  // collect inputs; directories are walked recursively and their internal
  // layout (e.g. abap2UI5 src/02/01) is mirrored 1:1 below the -o target
  const files = []; // { file, relDir }
  const walk = (dir, root) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full, root);
      else if ((entry.name.endsWith(".clas.abap") || entry.name.endsWith(".intf.abap")) && !entry.name.includes(".testclasses.")) {
        files.push({ file: full, relDir: path.relative(root, dir) });
      }
    }
  };
  for (const input of inputs) {
    const stat = fs.statSync(input);
    if (stat.isDirectory()) walk(input, input);
    else files.push({ file: input, relDir: "" });
  }
  let todoTotal = 0;
  for (const { file: f, relDir } of files) {
    try {
      const { code, todos, name } = transpileFile(f);
      todoTotal += todos.length;
      if (stdout) {
        console.log(code);
      } else {
        const out = path.join(outDir ?? path.dirname(f), outDir ? relDir : "", `${name}.js`);
        fs.mkdirSync(path.dirname(out), { recursive: true });
        fs.writeFileSync(out, code);
        console.log(`${f} -> ${out}${todos.length ? `  (${todos.length} TODOs)` : ""}`);
      }
      for (const t of todos) console.error(`  TODO(${name}): ${t}`);
    } catch (e) {
      console.error(`FAILED ${f}: ${e.message}`);
      process.exitCode = 1;
    }
  }
  if (todoTotal) console.error(`\n${todoTotal} TODO(s) need manual follow-up (search for "TODO(abap2js)").`);
}

module.exports = { main };
