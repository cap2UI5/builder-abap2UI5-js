#!/usr/bin/env node
/**
 * check-port-drift — tell us when upstream changed a class we hand-ported.
 *
 * WHY THIS EXISTS
 * ---------------
 * Most of src/srv/z2ui5 is not transpiled: ~84 of the classes are hand-ported
 * JS that deliberately shadows the upstream ABAP class of the same name
 * (transpile-tree.js skips any file that already exists in src/). That is a
 * good trade — idiomatic JS beats a mechanical transpile for the framework
 * core — but it has one silent failure mode: when upstream CHANGES one of
 * those classes, the change lands in run/input/, is skipped by the
 * transpiler, and nothing anywhere notices. The hand-port simply keeps
 * implementing the old behaviour.
 *
 * That is not hypothetical. The 2026-07/08 upstream rename wave broke the
 * nightlies for 16 days for exactly this reason: 47 hand-ports kept the old
 * names while the transpiler filled in raw transpiles next to them, and the
 * first signal anyone got was a red test suite with no obvious cause.
 *
 * WHAT IT DOES
 * ------------
 * For every hand-ported class it hashes the upstream .clas.abap it shadows
 * and compares against a committed baseline. A changed hash means: upstream
 * moved, someone must decide whether the hand-port needs to follow.
 *
 *   node scripts/check-port-drift.js            report (exit 0) + CI annotations
 *   node scripts/check-port-drift.js --strict    exit 1 when drift is unreconciled
 *   node scripts/check-port-drift.js --update    accept current state as baseline
 *
 * The build pipeline runs it in report mode and commits the refreshed
 * baseline, so each drift is announced exactly once — in the run that
 * introduced it — instead of either being silent or nagging forever.
 */
"use strict";

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const ROOT = path.join(__dirname, "..");
const SRC_DIR = path.join(ROOT, "src", "srv", "z2ui5");
const UPSTREAM_DIR = path.join(ROOT, "run", "input", "abap2UI5", "src");
const UPSTREAM_COMMIT_FILE = path.join(ROOT, "run", "input", "abap2UI5", "UPSTREAM_COMMIT");
const BASELINE = path.join(ROOT, "test", "port-drift.baseline.json");

const args = process.argv.slice(2);
const UPDATE = args.includes("--update");
const STRICT = args.includes("--strict");

/** Every *.js below dir, recursively. */
function walk(dir, ext, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, ext, out);
    else if (e.name.endsWith(ext)) out.push(p);
  }
  return out;
}

function sha(text) {
  // Hash the ABAP source with line endings normalised — a CRLF/LF flip in the
  // mirror is not a semantic change and must not read as drift.
  return crypto.createHash("sha256").update(text.replace(/\r\n/g, "\n")).digest("hex").slice(0, 16);
}

// ---- collect: upstream class name → abap file -----------------------------
const upstream = new Map();
for (const p of walk(UPSTREAM_DIR, ".clas.abap")) {
  upstream.set(path.basename(p, ".clas.abap").toLowerCase(), p);
}
for (const p of walk(UPSTREAM_DIR, ".intf.abap")) {
  upstream.set(path.basename(p, ".intf.abap").toLowerCase(), p);
}

// ---- collect: hand-ported classes that shadow one of them -----------------
const ports = new Map(); // className → { js, abap, hash }
for (const js of walk(SRC_DIR, ".js")) {
  const name = path.basename(js, ".js").toLowerCase();
  const abap = upstream.get(name);
  if (!abap) continue; // engine, ports, cl_abap_* shims — no upstream counterpart
  ports.set(name, {
    js: path.relative(ROOT, js),
    abap: path.relative(ROOT, abap),
    hash: sha(fs.readFileSync(abap, "utf8")),
  });
}

// ---- compare against the baseline -----------------------------------------
let base = { upstream_commit: "", ports: {} };
if (fs.existsSync(BASELINE)) {
  try {
    base = JSON.parse(fs.readFileSync(BASELINE, "utf8"));
  } catch (e) {
    console.error(`port-drift: baseline is not valid JSON (${e.message}) — regenerate with --update`);
    process.exit(1);
  }
}

const drifted = [];
const added = [];
const removed = [];

for (const [name, info] of ports) {
  const prev = base.ports?.[name];
  if (!prev) added.push(name);
  else if (prev.hash !== info.hash) drifted.push({ name, ...info, was: prev.hash });
}
for (const name of Object.keys(base.ports || {})) {
  if (!ports.has(name)) removed.push(name);
}

// ---- report ---------------------------------------------------------------
const upstreamCommit = fs.existsSync(UPSTREAM_COMMIT_FILE)
  ? fs.readFileSync(UPSTREAM_COMMIT_FILE, "utf8").trim()
  : "";

console.log(`port-drift: ${ports.size} hand-ported classes shadow an upstream object`);
console.log(`            upstream ${upstreamCommit.slice(0, 12) || "(unknown)"}`);

if (added.length) console.log(`  + ${added.length} newly tracked: ${added.slice(0, 8).join(", ")}${added.length > 8 ? ", …" : ""}`);
if (removed.length) console.log(`  - ${removed.length} no longer tracked: ${removed.slice(0, 8).join(", ")}${removed.length > 8 ? ", …" : ""}`);

const lines = [];
if (drifted.length) {
  console.log(`\n  !! ${drifted.length} hand-port(s) shadow an upstream class that CHANGED:\n`);
  for (const d of drifted) {
    console.log(`     ${d.name}`);
    console.log(`       upstream : ${d.abap}  (${d.was} → ${d.hash})`);
    console.log(`       hand-port: ${d.js}`);
    lines.push(`- \`${d.name}\` — upstream \`${d.abap}\` changed; hand-port \`${d.js}\` may need to follow`);
    // GitHub annotation — surfaces in the Actions UI without failing the job.
    console.log(`::warning file=${d.js}::upstream ${d.abap} changed — check whether this hand-port must follow`);
  }
  console.log(`\n     Review each one, update the hand-port where needed, then accept the`);
  console.log(`     new upstream state with:  node scripts/check-port-drift.js --update\n`);
} else {
  console.log(`  no drift — every hand-port matches the upstream revision it was reconciled against`);
}

// Job summary, when running in GitHub Actions.
if (process.env.GITHUB_STEP_SUMMARY && (drifted.length || added.length)) {
  const md = [
    `### Hand-port drift`,
    ``,
    `Upstream \`${upstreamCommit.slice(0, 12)}\` — ${ports.size} tracked hand-ports.`,
    ``,
    ...(drifted.length ? [`**${drifted.length} changed upstream:**`, ``, ...lines, ``] : [`No drift.`, ``]),
  ].join("\n");
  try {
    fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, md + "\n");
  } catch {
    /* summary is best-effort */
  }
}

// ---- persist --------------------------------------------------------------
if (UPDATE || (!STRICT && (drifted.length || added.length || removed.length))) {
  const next = {
    // Documentation for whoever opens this file cold.
    _comment:
      "Generated by scripts/check-port-drift.js. Maps each hand-ported class in " +
      "src/srv/z2ui5 to a hash of the upstream ABAP object it shadows. A changed " +
      "hash means upstream moved and the hand-port may need to follow — see the " +
      "script header. Do not hand-edit; run `node scripts/check-port-drift.js --update`.",
    upstream_commit: upstreamCommit,
    ports: Object.fromEntries(
      [...ports.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([n, i]) => [n, { abap: i.abap, js: i.js, hash: i.hash }]),
    ),
  };
  fs.writeFileSync(BASELINE, JSON.stringify(next, null, 2) + "\n");
  console.log(`  baseline written → ${path.relative(ROOT, BASELINE)}`);
}

if (STRICT && drifted.length) process.exit(1);
