#!/usr/bin/env node
/**
 * transpile-tree — transpiles ABAP classes from run/input/<name>/src into
 * run/output/<name>/ (folder structure mirrored 1:1) and writes a
 * transpile-report.json with the TODO count per class. The assemble step
 * (assemble-cap.js) uses that report as its safety gate.
 *
 *   node scripts/transpile-tree.js abap2UI5   → every class under src/
 *   node scripts/transpile-tree.js samples    → every class under src/
 */
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { transpileFile, parseInterfaceSigs, parseInterfaceTypes } = require("./abap2js");

// Framework classes that are hand-maintained in this repo's src/srv/z2ui5
// overlay win at assemble time (assemble-core copies src/ first and overlays
// the transpiled tree add-only). Transpiling their upstream ABAP is wasted
// work, and for classes abap2js cannot yet parse (e.g. z2ui5_cl_xml_view in
// tree 99) it emits a parse-error file that assemble then skips — pure noise
// that also masks any *new* parse error. Skip them here; the hand-port already
// covers every path that requires them. (Popups in 99/02 that are NOT
// hand-ported — e.g. z2ui5_cl_pop_error, required by core_handler — keep
// transpiling.)
const handPortedClasses = (() => {
  const set = new Set();
  const base = path.join(__dirname, "..", "src", "srv", "z2ui5");
  (function walk(dir) {
    if (!fs.existsSync(dir)) return;
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.name.endsWith(".js")) set.add(e.name.slice(0, -3).toLowerCase());
    }
  })(base);
  return set;
})();
const notHandPorted = (fname) => !handPortedClasses.has(fname.replace(/\.(clas|intf)\.abap$/i, "").toLowerCase());

const TARGETS = {
  abap2UI5: { base: ["src"], filter: notHandPorted },
  samples: { base: ["src"], filter: () => true },
};

const name = process.argv[2];
const cfg = TARGETS[name];
if (!cfg) {
  console.error(`usage: node scripts/transpile-tree.js <${Object.keys(TARGETS).join("|")}>`);
  process.exit(1);
}

const root = path.join(__dirname, "..");
const srcBase = path.join(root, "run", "input", name, ...cfg.base);
const outBase = path.join(root, "run", "output", name);

if (!fs.existsSync(srcBase)) {
  console.error(`${path.relative(root, srcBase)} not found — run \`npm run mirror_${name.toLowerCase()}\` first`);
  process.exit(1);
}

const targets = [];
(function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if ((entry.name.endsWith(".clas.abap") || entry.name.endsWith(".intf.abap")) && !entry.name.includes(".testclasses.") && cfg.filter(entry.name)) {
      targets.push({ file: full, relDir: path.relative(srcBase, dir) });
    }
  }
})(srcBase);

// interface signatures (from every *.intf.abap in the tree) let interface
// method implementations (METHOD intf~name) get their real parameter lists
const intfSigs = new Map();
const externTypes = new Map(); // "intf=>ty" -> struct members / ":table" marker
(function walkIntf(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkIntf(full);
    else if (entry.name.endsWith(".intf.abap")) {
      const intfName = entry.name.replace(/\.intf\.abap$/i, "").toLowerCase();
      try {
        const src = fs.readFileSync(full, "utf8");
        intfSigs.set(intfName, parseInterfaceSigs(src, entry.name));
        for (const [ty, members] of parseInterfaceTypes(src, entry.name)) externTypes.set(`${intfName}=>${ty}`, members);
      } catch { /* signature-less interface — implementations fall back as before */ }
    }
  }
})(srcBase);

fs.rmSync(outBase, { recursive: true, force: true });
const report = [];
const failed = [];
for (const { file, relDir } of targets) {
  try {
    const { code, todos, name: className } = transpileFile(file, { intfSigs, externTypes });
    const relPath = path.join(relDir, `${className}.js`);
    const outPath = path.join(outBase, relPath);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, code);
    let parseError = null;
    try {
      new vm.Script(code, { filename: relPath });
    } catch (e) {
      parseError = e.message;
    }
    report.push({ class: className, path: relPath, todos: todos.length, ...(parseError ? { parseError } : {}), todoDetails: todos });
  } catch (e) {
    failed.push(`${path.basename(file)}: ${e.message}`);
  }
}
report.sort((a, b) => a.path.localeCompare(b.path));
fs.mkdirSync(outBase, { recursive: true });
fs.writeFileSync(path.join(outBase, "transpile-report.json"), JSON.stringify(report, null, 2) + "\n");

const clean = report.filter((r) => r.todos === 0).length;
const unparseable = report.filter((r) => r.parseError);
console.log(`run/output/${name}: ${report.length} classes transpiled (${clean} clean, ${report.length - clean} with TODOs, ${unparseable.length} with parse errors), ${failed.length} failed`);
for (const r of unparseable) console.error(`  PARSE ERROR: ${r.path}: ${r.parseError}`);
for (const f of failed) console.error(`  FAILED: ${f}`);
if (failed.length) process.exit(1);
