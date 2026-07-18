#!/usr/bin/env node
/**
 * transpile-tests — the generator half of the self-healing loop.
 *
 * The upstream abap2UI5 sources carry ~40 ABAP unit-test includes
 * (*.clas.testclasses.abap). They encode the EXPECTED behavior of every
 * framework class — so transpiling them with abap2js and running them
 * against the transpiled/ported code turns every failure into a concrete
 * transpiler-or-port bug on a worklist:
 *
 *   input:  run/input/abap2UI5/src/** /*.clas.testclasses.abap  (no /99/)
 *   output: run/output/tests/<main_class>.units.js   one module per file
 *           run/output/tests/units-report.json
 *
 * Each output module exports { __main, __classes: {name: Class}, __tests:
 * {ltclName: [methodNames]} }. All local classes of one include are emitted
 * into ONE module (they may reference each other); requires of sibling
 * locals are dropped in favor of the in-module definitions.
 *
 * The runner half is test/upstream-units.test.js: it executes every
 * test method (fresh instance + setup/teardown, ABAP AUnit semantics) and
 * diffs the outcome against test/upstream-units.known-failures.json — the
 * ratchet that makes the loop self-healing: a new failure is a REGRESSION
 * (test red), a fixed one still on the list must be delisted (test red),
 * so the list can only shrink.
 */
"use strict";

const fs = require("fs");
const path = require("path");
const { createRequire } = require("module");
const { transpileClass, transpileInterface, parseInterfaceSigs, parseInterfaceTypes } = require("./abap2js");

const root = path.join(__dirname, "..");
const INPUT = path.join(root, "run", "input", "abap2UI5", "src");
const OUTPUT = path.join(root, "run", "output", "tests");

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== "99") walk(p, out); // 99/ = upstream-obsolete tree
    } else if (entry.name.endsWith(".clas.testclasses.abap")) out.push(p);
  }
  return out;
}

/** split an include into class chunks: { name: { def, impl } } (source order kept) */
function splitClasses(source) {
  const chunks = new Map();
  let cur = null; // { name, kind }
  let buf = [];
  for (const line of source.split(/\r?\n/)) {
    const open = line.match(/^\s*CLASS\s+(\w+)\s+(DEFINITION|IMPLEMENTATION)\b/i);
    if (open && !cur) {
      // Skip bodyless CLASS statements that carry no ENDCLASS — otherwise the
      // scanner opens a chunk that never closes and swallows the following
      // (real) class, so the whole include fails with "no class found":
      //   CLASS <main> DEFINITION LOCAL FRIENDS <ltcl>.  (test friends grant)
      //   CLASS <x> DEFINITION DEFERRED.                 (forward declaration)
      //   CLASS <x> DEFINITION LOAD.
      if (/\b(LOCAL\s+FRIENDS|DEFERRED|DEFINITION\s+LOAD)\b/i.test(line)) continue;
      cur = { name: open[1].toLowerCase(), kind: open[2].toUpperCase() };
      buf = [line];
      continue;
    }
    if (cur) {
      buf.push(line);
      if (/^\s*ENDCLASS\s*\./i.test(line)) {
        const slot = chunks.get(cur.name) || { def: "", impl: "" };
        slot[cur.kind === "DEFINITION" ? "def" : "impl"] = buf.join("\n");
        chunks.set(cur.name, slot);
        cur = null;
      }
    }
  }
  return chunks;
}

/** local INTERFACE blocks (constants containers like ajson's lif_kind) */
function splitInterfaces(sourceText) {
  const out = new Map();
  let cur = null;
  let buf = [];
  for (const line of sourceText.split(/\r?\n/)) {
    const open = line.match(/^\s*INTERFACE\s+(\w+)/i);
    if (open && !cur) {
      if (/\bDEFERRED\b/i.test(line)) continue;
      cur = open[1].toLowerCase();
      buf = [line];
      continue;
    }
    if (cur) {
      buf.push(line);
      if (/^\s*ENDINTERFACE\s*\./i.test(line)) {
        out.set(cur, buf.join("\n"));
        cur = null;
      }
    }
  }
  return out;
}

/** test method names: METHODS <name> ... FOR TESTING (single or chained form) */
function testMethods(def) {
  // class-header noise that also precedes FOR TESTING (CLASS x DEFINITION
  // FINAL FOR TESTING RISK LEVEL HARMLESS DURATION SHORT)
  const STOP = new Set(["final", "abstract", "create", "public", "definition", "testing", "level", "harmless", "critical", "dangerous", "duration", "short", "medium", "long", "risk"]);
  const found = [];
  const re = /(\w+)\s+FOR\s+TESTING/gi;
  let m;
  while ((m = re.exec(def))) {
    const name = m[1].toLowerCase();
    if (!STOP.has(name)) found.push(name);
  }
  return [...new Set(found)];
}

fs.rmSync(OUTPUT, { recursive: true, force: true });
fs.mkdirSync(OUTPUT, { recursive: true });

// the generated modules require("abap2UI5/…") — a node_modules symlink onto
// the published CAP project resolves that natively (package name + exports),
// so the runner works standalone, without jest module mapping
const nm = path.join(OUTPUT, "node_modules");
fs.mkdirSync(nm, { recursive: true });
fs.symlinkSync(path.join(root, "core"), path.join(nm, "abap2UI5"), "junction");

// hand-ported classes may re-export their ABAP class-pool locals as
// __locals — the tests then bind to the hand-port instead of re-transpiling
// the (SXML-/RTTI-dependent) ABAP locals
const coreRequire = createRequire(path.join(OUTPUT, "resolve.js"));
function handPortedLocals(mainClass) {
  try {
    const mod = coreRequire(`abap2UI5/${mainClass}`);
    if (mod && mod.__locals && typeof mod.__locals === "object") return mod.__locals;
  } catch {
    /* not hand-ported / not exported — transpile the ABAP locals */
  }
  return null;
}

// global interface signatures — interface method implementations in the
// testclasses (METHOD intf~name / INTERFACES intf) need real parameter lists
const globalIntfSigs = new Map();
const externTypes = new Map(); // "intf=>ty" -> struct members / ":table" marker
(function walkIntf(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walkIntf(p);
    else if (entry.name.endsWith(".intf.abap")) {
      const intfName = entry.name.replace(/\.intf\.abap$/i, "").toLowerCase();
      try {
        const src = fs.readFileSync(p, "utf8");
        globalIntfSigs.set(intfName, parseInterfaceSigs(src, entry.name));
        for (const [ty, members] of parseInterfaceTypes(src, entry.name)) externTypes.set(`${intfName}=>${ty}`, members);
      } catch { /* fall back to signature-less */ }
    }
  }
})(INPUT);

const report = [];
for (const file of walk(INPUT).sort()) {
  const mainClass = path.basename(file).replace(".clas.testclasses.abap", "");
  const source = fs.readFileSync(file, "utf8");
  // The testclasses may exercise the class pool's LOCAL classes directly
  // (e.g. ajson's ltcl_parser_test instantiates lcl_json_parser, defined in
  // the locals includes) — emit those into the same module first, so the
  // references resolve in-module. abapGit splits locals into locals_def
  // (definitions) + locals_imp (implementations); concatenate before
  // chunking so def/impl pairs land in one slot.
  const localsSource = [".clas.locals_def.abap", ".clas.locals_imp.abap"]
    .map((suffix) => file.replace(".clas.testclasses.abap", suffix))
    .filter((f) => fs.existsSync(f))
    .map((f) => fs.readFileSync(f, "utf8"))
    .join("\n");
  const localChunks = splitClasses(localsSource);
  const chunks = new Map([...localChunks, ...splitClasses(source)]);
  const interfaces = new Map([...splitInterfaces(localsSource), ...splitInterfaces(source)]);
  const localNames = new Set([...chunks.keys(), ...interfaces.keys()]);
  const portedLocals = handPortedLocals(mainClass);
  const portedNames = [];

  const requires = new Map(); // varName → require line
  const todoLines = [];
  const bodies = [];
  const tests = {};
  const emitted = [];
  let error = null;

  // pass 1: collect every chunk's method signatures, so positional calls
  // onto sibling locals (lo_nodes->add('…')) can be wrapped into the
  // destructured-options convention during the real transpile
  const siblingSigs = new Map(); // class name → Map(method → first importing param)
  const intfSigs = new Map(globalIntfSigs);
  for (const [name, src] of interfaces) {
    try {
      intfSigs.set(name, parseInterfaceSigs(src, `${name}.intf.abap`));
    } catch { /* fall back to signature-less */ }
  }
  for (const [name, { def, impl }] of chunks) {
    if (!def) continue;
    try {
      const { methodSigs } = transpileClass(`${def}\n\n${impl}`, `${name}.clas.abap`, { intfSigs, externTypes });
      siblingSigs.set(name, methodSigs);
    } catch {
      /* pass 2 reports it */
    }
  }

  // local interfaces first — pure constant containers the classes reference
  for (const [name, src] of interfaces) {
    if (portedLocals && name in portedLocals) {
      portedNames.push(name);
      continue;
    }
    try {
      const { code } = transpileInterface(src, `${name}.intf.abap`);
      for (const l of code.split("\n")) {
        if (/^module\.exports =/.test(l)) continue;
        const req = l.match(/^const (\w+) = require\("(.*)"\);$/);
        if (req) {
          if (!localNames.has(req[1])) requires.set(req[1], l);
          continue;
        }
        bodies.push(l);
      }
    } catch (e) {
      console.error(`  skip local interface ${name} in ${mainClass}: ${e.message}`);
    }
  }

  for (const [name, { def, impl }] of chunks) {
    if (portedLocals && localChunks.has(name) && name in portedLocals) {
      // the hand-port supplies this local — bind it instead of transpiling
      portedNames.push(name);
      emitted.push(name);
      continue;
    }
    try {
      if (!def && localChunks.has(name)) {
        // impl-only local relic (definition removed upstream) — skip it,
        // only tests that reach the missing class will fail
        console.error(`  skip local ${name} in ${mainClass}: no definition`);
        continue;
      }
      const { code } = transpileClass(`${def}\n\n${impl}`, `${name}.clas.abap`, { siblingSigs, intfSigs, externTypes });
      const lines = code.split("\n").filter((l) => !/^module\.exports =/.test(l));
      for (const l of lines) {
        const req = l.match(/^const (\w+) = require\("(.*)"\);$/);
        if (req) {
          if (!localNames.has(req[1])) requires.set(req[1], l);
          continue;
        }
        if (/^\/\/ TODO\(abap2js\)/.test(l)) {
          const ref = l.match(/unresolved reference (\w+)/);
          if (ref && localNames.has(ref[1])) continue; // sibling local — defined in-module
          todoLines.push(l);
          continue;
        }
        bodies.push(l);
      }
      const t = testMethods(def);
      if (t.length) tests[name] = t;
      emitted.push(name);
    } catch (e) {
      if (localChunks.has(name)) {
        // a broken LOCAL must not sink the whole include — the testclasses
        // still transpile; only tests reaching this class fail (visible on
        // the ratchet worklist instead of a blanket __transpile entry)
        console.error(`  skip local ${name} in ${mainClass}: ${e.message}`);
        continue;
      }
      error = `${name}: ${e.message}`;
      break;
    }
  }

  if (error) {
    report.push({ main: mainClass, error });
    continue;
  }

  const portedBind = portedNames.length
    ? [`const { ${portedNames.join(", ")} } = require(${JSON.stringify(`abap2UI5/${mainClass}`)}).__locals;`]
    : [];

  const out = [
    `// GENERATED from ${path.relative(root, file)} — do not edit`,
    ...[...requires.values()].sort(),
    ...portedBind,
    ...todoLines,
    "",
    ...bodies,
    "",
    `module.exports = {`,
    `  __main: ${JSON.stringify(mainClass)},`,
    `  __classes: { ${emitted.join(", ")} },`,
    `  __tests: ${JSON.stringify(tests)},`,
    `};`,
    "",
  ].join("\n");
  fs.writeFileSync(path.join(OUTPUT, `${mainClass}.units.js`), out);
  report.push({ main: mainClass, classes: emitted.length, tests: Object.values(tests).flat().length, todos: todoLines.length });
}

fs.writeFileSync(path.join(OUTPUT, "units-report.json"), JSON.stringify(report, null, 2) + "\n");
const total = report.reduce((n, r) => n + (r.tests || 0), 0);
console.log(`${report.length} testclass includes → ${total} test methods (${report.filter((r) => r.error).length} failed to transpile)`);
