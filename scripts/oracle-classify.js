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
 */
"use strict";

const fs = require("fs");
const path = require("path");

const [logFile, upstreamDir] = process.argv.slice(2);
if (!logFile) {
  console.error("usage: node scripts/oracle-classify.js <oracle-run.txt> [abap2UI5-checkout]");
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
for (const e of baseline) {
  const cls = e.name.split("::")[0];
  const cat = oracle.has(e.name) ? "BUG" : skips.includes(e.name) ? "KERNEL" : "NOTRUN";
  totals[cat]++;
  (byClass[cls] = byClass[cls] || { BUG: 0, KERNEL: 0, NOTRUN: 0 })[cat]++;
}

console.log(`oracle green: ${oracle.size} test methods${skips.length ? ` (+${skips.length} upstream skips)` : ""}`);
console.log(
  `baseline ${baseline.length}: BUG (fixable here) = ${totals.BUG}, KERNEL (upstream skip list) = ${totals.KERNEL}, NOTRUN (unknown to oracle) = ${totals.NOTRUN}\n`
);
console.log(" fix ker n/a  class");
for (const [c, v] of Object.entries(byClass).sort((a, b) => b[1].BUG - a[1].BUG)) {
  console.log(String(v.BUG).padStart(4), String(v.KERNEL).padStart(3), String(v.NOTRUN).padStart(3), " ", c);
}
process.exit(0);
