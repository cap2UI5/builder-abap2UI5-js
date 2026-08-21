#!/usr/bin/env node
/**
 * check-no-frozen — keep upstream's frozen package out of this port.
 *
 * abap2UI5 keeps `src/99` as declared legacy: retired utility classes
 * (99/01), the obsolete built-in popups (99/02, superseded by the popups
 * addon), the legacy XML view builder and the deprecated http_handler shim.
 * Upstream ships it for one reason — abapGit installs a repository, not a
 * folder, so removing those objects would break existing installations on
 * upgrade. It has zero consumers there, and its own guidance is to never add
 * one.
 *
 * That reason does not transfer. This port is an npm package with no
 * installed base to keep compiling, so carrying the frozen package buys
 * nothing and costs the usual: dead code that looks alive, a second way to do
 * everything, and — as actually happened here — framework code quietly built
 * on top of it (the engine's error dialog and the start page's value help
 * both sat on 99/02 popups).
 *
 * The mirror and the transpiler now skip it. This gate is the part that keeps
 * it skipped: mirrors and transpiles are configuration, and configuration
 * drifts back.
 *
 *   node scripts/check-no-frozen.js
 *
 * Run in `npm test`; exits 1 with the offending paths.
 */
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");

/** Every file below dir, repo-relative, skipping installs. */
function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === "node_modules" || e.name === ".git") continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else out.push(path.relative(ROOT, p).split(path.sep).join("/"));
  }
  return out;
}

const problems = [];

// 1. The mirror must not carry it in the first place.
for (const f of walk(path.join(ROOT, "run", "input", "abap2UI5"))) {
  if (f.includes("/src/99/")) problems.push(`mirrored from the frozen package: ${f}`);
  // Upstream's vendored S-RTTI. Same rule, different reason: it serializes ABAP
  // type descriptors so `CREATE DATA ... TYPE HANDLE` can rebuild a type, and
  // JS has neither. See the recorded policy in AGENTS.md.
  if (f.includes("/src/00/02/")) problems.push(`mirrored from upstream's S-RTTI package: ${f}`);
}

// 2. Nothing may be transpiled out of it.
for (const f of walk(path.join(ROOT, "run", "output", "abap2UI5"))) {
  if (/\/99\//.test(f)) problems.push(`transpiled from the frozen package: ${f}`);
  if (/\/00\/02\//.test(f)) problems.push(`transpiled from upstream's S-RTTI package: ${f}`);
}

// 3. No hand-port may reintroduce it — neither in a 99 folder of our own …
for (const tree of ["src/srv/z2ui5", "core/srv/z2ui5"]) {
  for (const f of walk(path.join(ROOT, tree))) {
    if (/\/99\//.test(f)) problems.push(`hand-written into a 99 folder: ${f}`);
  }
}

// … nor under the retired class names, wherever they are put. The framework's
// own error dialog and value help live in 01/04 as z2ui5_cl_ui5_app_error /
// _app_select; anything reaching for the old names is reaching for 99.
const RETIRED = [
  /^z2ui5_cl_pop_/,          // the obsolete built-in popups
  /^z2ui5_cl_xml_view(_cc)?$/, // the legacy view builder
  /^z2ui5_cl_http_handler$/,   // the deprecated shim (z2ui5_cl_ui5_http_handler is the live one)
  /^z2ui5_cl_util_(db|ext|log)$/, // retired utilities with no live role here
  // S-RTTI. Removed in 2026-08: 12 classes whose factory returned null for
  // every type kind, with zero consumers, zero coverage and zero entries in
  // the test corpus — and whose purpose (persist a type descriptor so
  // `CREATE DATA ... TYPE HANDLE` can rebuild the type) has no JS counterpart.
  /^z2ui5_cl_srt_/,
  /^z2ui5_cx_srt$/,
];
for (const f of walk(path.join(ROOT, "src", "srv", "z2ui5"))) {
  const name = path.basename(f, ".js");
  if (RETIRED.some((re) => re.test(name))) problems.push(`retired class name reintroduced: ${f}`);
}

// 4. And nothing may require them.
const RETIRED_REQUIRE = /require\((["'`])abap2UI5\/(z2ui5_cl_pop_[a-z0-9_]+|z2ui5_cl_xml_view(_cc)?|z2ui5_cl_http_handler|z2ui5_cl_srt_[a-z0-9_]+|z2ui5_cx_srt)\1\)/;
for (const tree of ["src", "adapters", "scripts"]) {
  for (const f of walk(path.join(ROOT, tree))) {
    if (!f.endsWith(".js")) continue;
    const text = fs.readFileSync(path.join(ROOT, f), "utf8");
    if (RETIRED_REQUIRE.test(text)) problems.push(`requires a retired class: ${f}`);
  }
}

if (problems.length) {
  console.error(`check-no-frozen: ${problems.length} problem(s) —\n`);
  for (const p of problems) console.error(`  - ${p}`);
  console.error(
    `\nUpstream's src/99 (frozen legacy) and src/00/02 (S-RTTI) are deliberately\n` +
    `not carried here — see AGENTS.md for both policies.\n` +
    `If the framework needs one of these capabilities, give it a home in the\n` +
    `live layer under its own name (see 01/04/z2ui5_cl_ui5_app_error).`,
  );
  process.exit(1);
}

console.log(`check-no-frozen: OK — nothing from upstream's src/99 or src/00/02 is carried here`);
