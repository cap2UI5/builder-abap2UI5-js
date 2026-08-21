#!/usr/bin/env node
/**
 * oracle-classify — differential oracle over the known-failures ratchet.
 *
 * The upstream abap2UI5 repo ships its own JS runtime under node/: the
 * official @abaplint/transpiler + open-abap-core execute the REAL ABAP
 * (downported) — including every testclass this repo transpiles for the
 * upstream-units ratchet. Whatever passes there is proven achievable in
 * JS, so every baseline entry that the oracle runs green is a fixable
 * port/transpiler bug HERE — not ABAP-kernel magic. Entries on the
 * upstream skip list (node/setup/abap_transpile.json) are the documented
 * kernel/runtime limits.
 *
 * Produce the oracle log in an abap2UI5 checkout (rule 10 there: restore
 * src/ afterwards!):
 *
 *   cd /path/to/abap2UI5
 *   npm ci && npm run auto_downport && npm run auto_transpile
 *   npm run unit > /tmp/oracle-run.txt; git checkout -- src/ abaplint.jsonc
 *
 * Then classify this repo's baseline against it:
 *
 *   node scripts/oracle-classify.js /tmp/oracle-run.txt [/path/to/abap2UI5]
 *
 * WHY IT WRITES A FILE
 * --------------------
 * Until 2026-08 this printed to stdout and the workflow appended that to
 * $GITHUB_STEP_SUMMARY — which expires with the Actions log. So the one tool
 * that can answer "how much of the 111-entry baseline is actually work?"
 * produced an answer nobody could read a week later, and certainly could not
 * diff against the previous week. `--json <file>` writes the classification to
 * a tracked file instead, so it lands as a reviewable diff: an entry moving
 * from NOTRUN to BUG is a lead somebody can pick up, and that transition is
 * only visible if last week's answer is still around.
 */
"use strict";

const fs = require("fs");
const path = require("path");

const argv = process.argv.slice(2);
const jsonIdx = argv.indexOf("--json");
const jsonOut = jsonIdx >= 0 ? argv[jsonIdx + 1] : null;
const positional = argv.filter((a, i) => a !== "--json" && i !== jsonIdx + 1);
const [logFile, upstreamDir] = positional;
if (!logFile) {
  console.error("usage: node scripts/oracle-classify.js <oracle-run.txt> [abap2UI5-checkout] [--json <file>]");
  process.exit(1);
}

const oracle = new Set();
for (const l of fs.readFileSync(logFile, "utf8").split("\n")) {
  const m = l.match(/^(\S+): running (\w+)->(\w+)/);
  if (m) oracle.add(`${m[1].toLowerCase()}::${m[2]}::${m[3]}`);
}

let skips = [];
if (upstreamDir) {
  const cfg = JSON.parse(fs.readFileSync(path.join(upstreamDir, "node/setup/abap_transpile.json"), "utf8"));
  skips = (cfg.options?.skip || []).map((s) => `${s.object.toLowerCase()}::${s.class}::${s.method}`);
}

const baseline = JSON.parse(
  fs.readFileSync(path.join(__dirname, "..", "test", "upstream-units.known-failures.json"), "utf8")
);

const byClass = {};
const totals = { BUG: 0, KERNEL: 0, NOTRUN: 0 };
const classified = [];
for (const e of baseline) {
  const cls = e.name.split("::")[0];
  const cat = oracle.has(e.name) ? "BUG" : skips.includes(e.name) ? "KERNEL" : "NOTRUN";
  totals[cat]++;
  (byClass[cls] = byClass[cls] || { BUG: 0, KERNEL: 0, NOTRUN: 0 })[cat]++;
  classified.push({ name: e.name, category: e.category, verdict: cat });
}

console.log(`oracle green: ${oracle.size} test methods${skips.length ? ` (+${skips.length} upstream skips)` : ""}`);
console.log(
  `baseline ${baseline.length}: BUG (fixable here) = ${totals.BUG}, KERNEL (upstream skip list) = ${totals.KERNEL}, NOTRUN (unknown to oracle) = ${totals.NOTRUN}\n`
);
console.log(" fix ker n/a  class");
for (const [c, v] of Object.entries(byClass).sort((a, b) => b[1].BUG - a[1].BUG)) {
  console.log(String(v.BUG).padStart(4), String(v.KERNEL).padStart(3), String(v.NOTRUN).padStart(3), " ", c);
}
// ---- the tracked classification -------------------------------------------
if (jsonOut) {
  // Deterministic: sorted, and carrying no timestamp or run id. An identical
  // classification must produce an identical file, or every weekly run would
  // commit noise and the diff would stop meaning anything.
  classified.sort((a, b) => a.name.localeCompare(b.name));
  const doc = {
    _comment:
      "Written by scripts/oracle-classify.js --json. Each baseline entry is classified " +
      "against upstream's own JS runtime (@abaplint transpiler + open-abap): BUG = the " +
      "upstream oracle runs this test GREEN, so it is achievable in JS and is a fixable " +
      "defect here, not ABAP-kernel semantics. KERNEL = on upstream's documented skip " +
      "list. NOTRUN = the oracle did not execute it, so nothing is proven either way. " +
      "Committed rather than printed so a verdict changing week to week is a diff " +
      "somebody can see. Do not hand-edit.",
    oracle_green_methods: oracle.size,
    upstream_skips: skips.length,
    totals,
    entries: classified,
  };
  fs.mkdirSync(path.dirname(jsonOut), { recursive: true });
  fs.writeFileSync(jsonOut, JSON.stringify(doc, null, 2) + "\n");
  console.log(`\nclassification written → ${jsonOut}`);

  if (totals.BUG > 0) {
    console.log(`\n${totals.BUG} baseline entr(ies) are PROVABLY fixable in JS:`);
    for (const e of classified.filter((c) => c.verdict === "BUG")) console.log(`  ${e.name}  [${e.category}]`);
  }
}

process.exit(0);
