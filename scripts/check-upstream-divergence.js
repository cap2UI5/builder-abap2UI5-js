#!/usr/bin/env node
/**
 * check-upstream-divergence — notice when upstream retires something we ship.
 *
 * WHY THIS EXISTS
 * ---------------
 * Upstream `main` moves constantly (50 commits in three weeks of 2026-08)
 * while its releases are quarterly, and it maintains a standing obsolescence
 * list in `docs/removal-plan.md`: APIs scheduled for removal, custom controls
 * already marked `// OBSOLETE:`, parameters accepted but no longer evaluated.
 * None of that reached this port except by somebody happening to read it. The
 * port's own README was still teaching `_bind_edit` months after upstream had
 * migrated every caller off it and scheduled its removal.
 *
 * That is the shape of problem a check should own: upstream announces a
 * retirement, the port keeps shipping the thing, and the two only reconcile
 * when a human goes looking. This turns it into a baseline diff — the same
 * idiom as the test ratchets. Known divergences are recorded in
 * test/upstream-divergence.baseline.json with a reason; a NEW one is what
 * turns the build red.
 *
 *   node scripts/check-upstream-divergence.js            report (exit 0)
 *   node scripts/check-upstream-divergence.js --strict   exit 1 on a new one
 *   node scripts/check-upstream-divergence.js --update   accept current state
 *
 * A divergence is not automatically a defect. The webapp is mirrored 1:1 from
 * upstream on purpose, so an obsolete control we carry is usually *correct* —
 * the point is that it is written down, with a reason, instead of unnoticed.
 */
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
// The mirror splits upstream across two trees: `src` under run/input/abap2UI5
// and the frontend under run/input/app. `docs/removal-plan.md` is not mirrored
// at all (mirror-input.js takes only src and app/webapp), so that half of the
// check reads it from a sibling checkout when there is one and skips
// otherwise — a CI job that wants it can check upstream out and point
// UPSTREAM_CHECKOUT at it.
const UPSTREAM = path.join(ROOT, "run", "input", "abap2UI5");
const UPSTREAM_APP = path.join(ROOT, "run", "input", "app");
const UPSTREAM_CHECKOUT = process.env.UPSTREAM_CHECKOUT || path.join(ROOT, "..", "abap2UI5");
const BASELINE = path.join(ROOT, "test", "upstream-divergence.baseline.json");

const args = process.argv.slice(2);
const STRICT = args.includes("--strict");
const UPDATE = args.includes("--update");

if (!fs.existsSync(UPSTREAM) && !fs.existsSync(UPSTREAM_APP)) {
  console.log("check-upstream-divergence: no upstream mirror — run `npm run mirror_abap2ui5` first (skipped)");
  process.exit(0);
}

const found = [];

/**
 * (1) Custom controls upstream has marked obsolete that the port still ships.
 * Upstream keeps them for backward compatibility with installed ABAP systems;
 * this port has no installed base, so each one is a candidate for dropping —
 * a decision, not an automatic removal, since the webapp is mirrored 1:1.
 */
const upstreamCc = path.join(UPSTREAM_APP, "webapp", "cc");
const portCc = path.join(ROOT, "core", "app", "z2ui5", "webapp", "cc");
if (fs.existsSync(upstreamCc) && fs.existsSync(portCc)) {
  for (const f of fs.readdirSync(upstreamCc).filter((f) => f.endsWith(".js"))) {
    const src = fs.readFileSync(path.join(upstreamCc, f), "utf8");
    const m = src.match(/\/\/\s*OBSOLETE:\s*(.+)/);
    if (m && fs.existsSync(path.join(portCc, f))) {
      found.push({ kind: "obsolete-control", id: `cc/${f}`, note: m[1].trim().slice(0, 120) });
    }
  }
}

/**
 * (2) Public API upstream has scheduled for removal that the port still
 * documents. Teaching a caller an API upstream is retiring is how a port ends
 * up with users on a dead path.
 */
const removalPlan = path.join(UPSTREAM_CHECKOUT, "docs", "removal-plan.md");
if (fs.existsSync(removalPlan)) {
  const plan = fs.readFileSync(removalPlan, "utf8");
  // Names in the plan that read as a public API rather than prose.
  const scheduled = new Set(
    [...plan.matchAll(/`(_?[a-z][a-z0-9_]{4,})\(\s*\)`/g)].map((m) => m[1]).filter((n) => !n.startsWith("__")),
  );
  const docs = ["README.md", "src/README.md", "AGENTS.md"]
    .map((p) => path.join(ROOT, p))
    .filter((p) => fs.existsSync(p));
  for (const name of scheduled) {
    for (const d of docs) {
      if (fs.readFileSync(d, "utf8").includes(`${name}(`)) {
        found.push({ kind: "scheduled-api-in-docs", id: `${name} in ${path.relative(ROOT, d)}`, note: "upstream schedules this for removal" });
        break;
      }
    }
  }
}

found.sort((a, b) => `${a.kind}${a.id}`.localeCompare(`${b.kind}${b.id}`));

// ---- compare against the baseline -----------------------------------------
let base = { entries: [] };
if (fs.existsSync(BASELINE)) {
  try {
    base = JSON.parse(fs.readFileSync(BASELINE, "utf8"));
  } catch {
    console.error(`check-upstream-divergence: ${path.relative(ROOT, BASELINE)} is not valid JSON`);
    process.exit(1);
  }
}

const known = new Map((base.entries || []).map((e) => [`${e.kind}::${e.id}`, e]));
const now = new Map(found.map((e) => [`${e.kind}::${e.id}`, e]));

const added = [...now.keys()].filter((k) => !known.has(k));
const gone = [...known.keys()].filter((k) => !now.has(k));

if (UPDATE) {
  const entries = found.map((e) => ({
    ...e,
    // Preserve a reason somebody wrote; seed a placeholder for a new one so
    // the file never contains an unexplained entry for long.
    why: known.get(`${e.kind}::${e.id}`)?.why || "TODO: why does the port still carry this?",
  }));
  fs.writeFileSync(
    BASELINE,
    JSON.stringify(
      {
        _comment:
          "Known divergences from upstream's obsolescence list, written by " +
          "scripts/check-upstream-divergence.js --update. An entry is not necessarily a " +
          "defect — the webapp is mirrored 1:1 on purpose — but every entry needs a `why`. " +
          "A NEW divergence fails --strict.",
        entries,
      },
      null,
      2,
    ) + "\n",
  );
  console.log(`baseline written → ${path.relative(ROOT, BASELINE)} (${entries.length} entries)`);
  process.exit(0);
}

console.log(`check-upstream-divergence: ${found.length} divergence(s), ${known.size} known`);
for (const e of found) {
  const mark = known.has(`${e.kind}::${e.id}`) ? " " : "+";
  console.log(`  ${mark} ${e.kind.padEnd(24)} ${e.id}`);
}
for (const k of gone) console.log(`  - ${k}  (no longer diverging — run --update to delist)`);

if (added.length) {
  console.log(`\n  ${added.length} NEW divergence(s). Upstream retired something this port still ships.`);
  console.log(`  Decide what to do, record the reason, then: node scripts/check-upstream-divergence.js --update\n`);
  for (const k of added) console.log(`::warning::new upstream divergence — ${k}`);
}

if (STRICT && added.length) process.exit(1);
