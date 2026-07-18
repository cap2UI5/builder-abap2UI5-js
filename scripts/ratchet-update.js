#!/usr/bin/env node
/**
 * Ratchet maintenance for the two known-failures baselines.
 *
 * Behavior (the ratchet, but self-healing):
 *   - REGRESSION (failing but not listed)      → report + exit 1, files untouched
 *   - IMPROVEMENT (listed but now passing)     → delist it, rewrite the baseline
 *   - unchanged                                → no-op
 *
 * The pipelines run this after build_core and commit the shrunken baselines
 * together with core/ — an emitter improvement can then never freeze the
 * nightlies the way a manual-delist ratchet does, while a regression still
 * fails the run before anything is committed.
 *
 * Usage: node scripts/ratchet-update.js [--check]
 *   --check: dry-run — report what would be delisted, never write.
 */
const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const checkOnly = process.argv.includes("--check");

function runJson(script) {
  return JSON.parse(
    execFileSync(process.execPath, [path.join(ROOT, "scripts", script), "--json"], {
      encoding: "utf8",
      timeout: 280000,
      maxBuffer: 64 * 1024 * 1024,
      stdio: ["ignore", "pipe", "inherit"],
    })
  );
}

function reconcile(label, baselineFile, failingNames) {
  const file = path.join(ROOT, "test", baselineFile);
  const baseline = JSON.parse(fs.readFileSync(file, "utf8"));
  const known = new Set(baseline.map((e) => e.name));

  const regressions = [...failingNames].filter((n) => !known.has(n));
  const fixed = baseline.filter((e) => !failingNames.has(e.name)).map((e) => e.name);

  if (fixed.length && !regressions.length && !checkOnly) {
    const kept = baseline.filter((e) => failingNames.has(e.name));
    fs.writeFileSync(file, JSON.stringify(kept, null, 2) + "\n");
  }
  return { label, file, regressions, fixed };
}

execFileSync(process.execPath, [path.join(ROOT, "scripts", "transpile-tests.js")], { stdio: "pipe" });
const units = runJson("run-units.js");
const smoke = runJson("smoke-apps.js");

// sanity floors, same as the jest gates — an empty report must never be
// allowed to delist the whole baseline
if (units.total <= 150) throw new Error(`units report suspiciously small (total=${units.total})`);
if (smoke.total <= 150) throw new Error(`smoke report suspiciously small (total=${smoke.total})`);

const outcomes = [
  reconcile("upstream-units", "upstream-units.known-failures.json", new Set(Object.keys(units.failures))),
  reconcile(
    "apps-smoke",
    "apps-smoke.known-failures.json",
    new Set(smoke.results.filter((r) => r.verdict !== "ok").map((r) => r.name))
  ),
];

let failed = false;
for (const o of outcomes) {
  if (o.regressions.length) {
    failed = true;
    console.error(`\n${o.label}: ${o.regressions.length} REGRESSION(S) — baseline left untouched:`);
    for (const n of o.regressions) console.error(`  - ${n}`);
  }
  if (o.fixed.length) {
    const verb = o.regressions.length ? "would delist (blocked by regressions)" : checkOnly ? "would delist" : "delisted";
    console.log(`${o.label}: ${verb} ${o.fixed.length} fixed entr${o.fixed.length === 1 ? "y" : "ies"}:`);
    for (const n of o.fixed) console.log(`  - ${n}`);
  }
  if (!o.regressions.length && !o.fixed.length) console.log(`${o.label}: baseline unchanged`);
}
process.exit(failed ? 1 : 0);
