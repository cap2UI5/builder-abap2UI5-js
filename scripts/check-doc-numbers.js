#!/usr/bin/env node
/**
 * check-doc-numbers — keep the counts quoted in prose true.
 *
 * WHY THIS EXISTS
 * ---------------
 * The prose in this repository is unusually good, which makes its numbers
 * unusually load-bearing — and every one of them had drifted. A 2026-08 review
 * found AGENTS.md and docs/HANDOFF.md advertising "19 suites / ~225 tests"
 * against a real 21/221; eslint.config.js claiming a warning bucket "down from
 * 102 to 48" when it was 88 and rising; docs/transpiler-roadmap.md saying the
 * ratchet baseline was in "the low twenties" when it held 113, and quoting a
 * TODO count off by an order of magnitude; jest.config.js describing an
 * "8.5k-line view builder" that upstream had rewritten to 124 lines.
 *
 * None of that is careless writing. It is what happens when a number is copied
 * into prose once and the thing it describes keeps moving. The fix is not to
 * write fewer numbers — they are what make the docs worth reading — but to let
 * a build check them.
 *
 * HOW TO USE IT
 * -------------
 * Mark a number in any tracked text file with an HTML comment naming a metric:
 *
 *     npm test    # 26 suites <!-- count:suites -->
 *
 * The comment may sit anywhere on the line; the first number on that line is
 * the claim. Run `node scripts/check-doc-numbers.js` to verify, or with
 * `--fix` to rewrite the claims to the measured values.
 *
 * Adding a metric means adding one entry to METRICS below — each is a function
 * that measures the real thing, so the check can never drift from what it
 * describes.
 */
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const FIX = process.argv.includes("--fix");

const read = (p) => fs.readFileSync(path.join(ROOT, p), "utf8");
const readJson = (p) => JSON.parse(read(p));

function countFiles(dir, filter) {
  const out = [];
  const walk = (d) => {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      if (e.name === "node_modules") continue;
      const p = path.join(d, e.name);
      if (e.isDirectory()) walk(p);
      else if (!filter || filter(p)) out.push(p);
    }
  };
  walk(path.join(ROOT, dir));
  return out.length;
}

/**
 * Each metric measures the real thing. Keep them cheap — this runs in the
 * test suite, so nothing here may transpile, install or hit the network.
 */
const METRICS = {
  /** jest suites: one per test file. */
  suites: () => countFiles("test", (p) => p.endsWith(".test.js")),

  /** Entries in the upstream-units ratchet baseline. */
  "ratchet-units": () => readJson("test/upstream-units.known-failures.json").length,

  /** Entries in the apps-smoke ratchet baseline. */
  "ratchet-smoke": () => readJson("test/apps-smoke.known-failures.json").length,

  /** Samples shipped in the published package. */
  samples: () => countFiles("core/srv/app/samples", (p) => p.endsWith(".js")),

  /** Files in the published package. */
  "core-files": () => countFiles("core"),

  /** TODO(abap2js) markers left in the published package. */
  "core-todos": () => {
    let n = 0;
    const walk = (d) => {
      for (const e of fs.readdirSync(d, { withFileTypes: true })) {
        const p = path.join(d, e.name);
        if (e.isDirectory()) walk(p);
        else if (p.endsWith(".js")) n += (fs.readFileSync(p, "utf8").match(/TODO\(abap2js\)/g) || []).length;
      }
    };
    walk(path.join(ROOT, "core", "srv", "z2ui5"));
    return n;
  },

  /** Subpaths in the package's exports map. */
  exports: () => Object.keys(readJson("src/package.json").exports).length,
};

// ---------------------------------------------------------------------------

const MARKER = /<!--\s*count:([a-z0-9-]+)\s*-->/i;
const FILES = ["AGENTS.md", "README.md", "src/README.md", "docs/HANDOFF.md", "docs/transpiler-roadmap.md"];

const measured = {};
for (const [name, fn] of Object.entries(METRICS)) {
  try {
    measured[name] = fn();
  } catch (e) {
    console.error(`cannot measure '${name}': ${e.message}`);
    process.exit(1);
  }
}

const problems = [];
let fixedCount = 0;

for (const rel of FILES) {
  const file = path.join(ROOT, rel);
  if (!fs.existsSync(file)) continue;
  const lines = fs.readFileSync(file, "utf8").split("\n");
  let changed = false;

  lines.forEach((line, i) => {
    const m = line.match(MARKER);
    if (!m) return;
    const metric = m[1].toLowerCase();
    if (!(metric in measured)) {
      problems.push(`${rel}:${i + 1}  unknown metric '${metric}' (known: ${Object.keys(measured).join(", ")})`);
      return;
    }
    const claimed = line.match(/\d[\d,]*/);
    if (!claimed) {
      problems.push(`${rel}:${i + 1}  marker count:${metric} but no number on the line`);
      return;
    }
    const have = Number(claimed[0].replace(/,/g, ""));
    const want = measured[metric];
    if (have === want) return;
    if (FIX) {
      lines[i] = line.replace(claimed[0], String(want));
      changed = true;
      fixedCount++;
    } else {
      problems.push(`${rel}:${i + 1}  ${metric}: says ${have}, actually ${want}`);
    }
  });

  if (changed) fs.writeFileSync(file, lines.join("\n"));
}

if (FIX) {
  console.log(`check-doc-numbers: updated ${fixedCount} claim(s)`);
  process.exit(0);
}

if (problems.length) {
  console.error(`check-doc-numbers: ${problems.length} stale claim(s)\n`);
  for (const p of problems) console.error(`  ${p}`);
  console.error(`\nRun \`node scripts/check-doc-numbers.js --fix\` to update them.`);
  process.exit(1);
}

const marked = Object.entries(measured).map(([k, v]) => `${k}=${v}`).join(" ");
console.log(`check-doc-numbers: OK — ${marked}`);
