#!/usr/bin/env node
/**
 * publish-core — the very last build step of the transpile project: copy the
 * assembled package 1:1 from builder-abap2UI5-js/run/output/core into builder-abap2UI5-js/core/,
 * the published npm package `abap2UI5`.
 *
 * builder-abap2UI5-js/core/ is a pure build artifact — it is wiped and rewritten on
 * every publish, so nothing there should be hand-edited (edit builder-abap2UI5-js/src/
 * instead). Only `node_modules/` is preserved, to avoid a reinstall after
 * each build.
 *
 *   npm run publish_core     (usually via `npm run build_core` = assemble + publish)
 */
"use strict";

const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");          // builder-abap2UI5-js/
// Env overrides exist so the guardrails below can be tested against temp
// fixtures instead of the real package (test/pipeline-guards.test.js). They are
// a test seam only — the pipeline never sets them.
const src = process.env.CORE_SRC_ROOT || path.join(root, "run", "output", "core");
const dest = process.env.CORE_DEST_ROOT || path.join(root, "core");

// Local, non-published entries kept across a wipe (all gitignored).
const PRESERVE = new Set(["node_modules"]);

function copyDir(from, to) {
  fs.mkdirSync(to, { recursive: true });
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const s = path.join(from, entry.name);
    const d = path.join(to, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

if (!fs.existsSync(src)) {
  console.error("builder-abap2UI5-js/run/output/core not found — run `npm run assemble_core` first");
  process.exit(1);
}

// Floor before the wipe. This step deletes the published package and replaces
// it with whatever it was handed, so an assemble that produced a near-empty
// tree (a failed transpile, a mis-pointed path) would otherwise be published
// over the good one and exit 0. The real tree is ~311 files; anything under
// half that is a build accident, not a shrinking package.
const MIN_PUBLISHED_FILES = 150;
const countFiles = (d) => {
  let n = 0;
  for (const e of fs.readdirSync(d, { withFileTypes: true })) n += e.isDirectory() ? countFiles(path.join(d, e.name)) : 1;
  return n;
};
const srcCount = countFiles(src);
if (srcCount < MIN_PUBLISHED_FILES) {
  console.error(`ERROR: run/output/core holds only ${srcCount} files (expected at least ${MIN_PUBLISHED_FILES}).`);
  console.error(`       Refusing to overwrite the published core/ with what looks like a failed build.`);
  process.exit(1);
}

// Wipe the target (except preserved local dirs), then copy the assembled tree in.
fs.mkdirSync(dest, { recursive: true });
for (const entry of fs.readdirSync(dest)) {
  if (PRESERVE.has(entry)) continue;
  fs.rmSync(path.join(dest, entry), { recursive: true, force: true });
}
copyDir(src, dest);

console.log(`published ${srcCount} files → builder-abap2UI5-js/core/ (1:1 copy of run/output/core)`);
