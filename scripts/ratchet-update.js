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

// The categories a known unit failure can have. They answer the only
// question the baseline exists to answer — how much of it is actual work:
//
//   port-gap        an upstream API the JS port does not implement yet.
//                   REAL WORK, and it affects apps, not just tests.
//   port-deviation  the test asserts on abap-internal state the idiomatic
//                   port models differently. Permanent; not fixable without
//                   giving up the port's design.
//   port-bug        the API exists but its behaviour is wrong or incomplete.
//                   REAL WORK, and unlike a port gap it is not visible from
//                   the outside — the method is there and answers, it just
//                   answers wrongly.
//   js-limit        ABAP type/reference semantics JS cannot express.
//   async-boundary  a sync ABAP test cannot await the async JS roundtrip.
//
// Free text used to carry this in square brackets, which broke on every
// assertion message that contained brackets of its own — five entries
// parsed to nonsense categories like "'ITEM_PRESS'". A field cannot.
const CATEGORIES = new Set(["port-gap", "port-bug", "port-deviation", "js-limit", "async-boundary"]);

/** Reject a malformed baseline outright — a silently mis-shaped entry makes
 *  the whole worklist unreadable, and this file is edited by hand. */
function validate(label, baseline) {
  const problems = [];
  for (const e of baseline) {
    if (!e || typeof e.name !== "string" || !e.name) { problems.push(`entry without a name: ${JSON.stringify(e)}`); continue; }
    // Only the units baseline is categorised; the smoke baseline records a
    // verdict from the smoke run instead.
    if (label !== "upstream-units") continue;
    if (!CATEGORIES.has(e.category)) {
      problems.push(`${e.name}: category ${JSON.stringify(e.category)} is not one of ${[...CATEGORIES].join(", ")}`);
    }
    if (e.category === "port-gap" && !e.api) {
      problems.push(`${e.name}: a port-gap entry must name the missing api`);
    }
    if (!e.why) problems.push(`${e.name}: no reason given`);
  }
  if (problems.length) {
    console.error(`${label}: baseline is malformed —\n  - ${problems.join("\n  - ")}`);
    process.exit(1);
  }
}

function reconcile(label, baselineFile, failingNames) {
  const file = path.join(ROOT, "test", baselineFile);
  const baseline = JSON.parse(fs.readFileSync(file, "utf8"));
  validate(label, baseline);
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

// Publish both reports so the jest gates can reuse them instead of producing
// the same two (tens-of-seconds) reports a second time in the same pipeline
// run. Reuse is opt-in on the consumer side via Z2UI5_REPORTS_DIR — see
// test/helpers/reports.js for why it is explicit rather than time-based.
const REPORTS_DIR = path.join(ROOT, "run", "output", "reports");
fs.mkdirSync(REPORTS_DIR, { recursive: true });
fs.writeFileSync(path.join(REPORTS_DIR, "units.json"), JSON.stringify(units));
fs.writeFileSync(path.join(REPORTS_DIR, "smoke.json"), JSON.stringify(smoke));

// Sanity floors, same as the jest gates — a shrunken report must never be
// allowed to delist the baseline. Keep these in step with the numbers in
// test/upstream-units.test.js and test/apps-smoke.test.js: this script is the
// one that WRITES the baselines, so a floor too low here is worse than a floor
// too low in a test — it does not just fail to notice a shrunken corpus, it
// records the shrinkage as "everything fixed".
if (units.total <= 480) throw new Error(`units report suspiciously small (total=${units.total}, expected >480)`);
if (smoke.total <= 100) throw new Error(`smoke report suspiciously small (total=${smoke.total}, expected >100)`);

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

// What is left, by category — so a three-digit "known failures" count stops
// reading like one undifferentiated pile. port-gap and port-bug entries are
// work; the rest is documented distance from ABAP semantics.
{
  const baseline = JSON.parse(fs.readFileSync(path.join(ROOT, "test", "upstream-units.known-failures.json"), "utf8"));
  const byCategory = {};
  const byApi = {};
  for (const e of baseline) {
    byCategory[e.category] = (byCategory[e.category] || 0) + 1;
    if (e.category === "port-gap") byApi[e.api] = (byApi[e.api] || 0) + 1;
  }
  const parts = Object.entries(byCategory).sort((a, b) => b[1] - a[1]).map(([c, n]) => `${c} ${n}`);
  console.log(`\nupstream-units: ${baseline.length} known — ${parts.join(", ")}`);
  const gaps = Object.entries(byApi).sort((a, b) => b[1] - a[1]);
  if (gaps.length) {
    console.log(`  port gaps (implementable — ${gaps.length} missing API${gaps.length === 1 ? "" : "s"}):`);
    for (const [api, n] of gaps) console.log(`    ${String(n).padStart(3)}x  ${api}()`);
  }
}

process.exit(failed ? 1 : 0);
