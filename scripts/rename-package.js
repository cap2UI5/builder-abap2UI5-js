#!/usr/bin/env node
/**
 * rename-package — change the core package's npm name everywhere at once.
 *
 * WHY THIS EXISTS
 * ---------------
 * The package is called `abap2UI5`, and npm has rejected uppercase in new
 * package names since 2017 — so it cannot be published as it stands. See
 * docs/adr-001-npm-publishing.md for the decision and the chosen name.
 *
 * The rename is mechanical but wide: the name is the package identity in
 * several manifests across repositories, the prefix of every `exports`
 * subpath, the key scripts/lib/path-map.js derives four other resolvers from,
 * and the literal in every generated `require("abap2UI5/…")`. Doing it by hand
 * across that surface is how a spot gets missed, and a missed spot fails at
 * runtime rather than at build: the transpiler's fallback for an unknown
 * package prefix is to emit a TODO comment instead of a require.
 *
 * So it happens in one scripted step, and only over HAND-WRITTEN files.
 * Everything under core/ and run/ is regenerated afterwards.
 *
 *   node scripts/rename-package.js @cap2ui5/core --dry-run
 *   node scripts/rename-package.js @cap2ui5/core
 *
 * Then, as the ADR says:
 *   npm run build_core && npm test
 *   (cd ../builder-cap2UI5 && npm run mirror_core && npm run assemble && npm test)
 */
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const OLD = "abap2UI5";

const args = process.argv.slice(2);
const DRY = args.includes("--dry-run");
const NEXT = args.find((a) => !a.startsWith("--"));

if (!NEXT) {
  console.error("usage: node scripts/rename-package.js <new-name> [--dry-run]");
  console.error("       e.g. node scripts/rename-package.js @cap2ui5/core --dry-run");
  process.exit(2);
}

// npm's own rules, checked here rather than discovered at publish time.
if (!/^(?:@[a-z0-9][a-z0-9._-]*\/)?[a-z0-9][a-z0-9._-]*$/.test(NEXT)) {
  console.error(`"${NEXT}" is not a publishable npm name (lowercase; optional @scope/).`);
  process.exit(2);
}

/**
 * Hand-written trees only. core/ and run/ are regenerated from these, so
 * rewriting them here would be both redundant and a source of drift.
 */
const TARGETS = [
  { root: ROOT, dirs: ["src", "adapters", "scripts", "test"], files: ["package.json", "README.md", "AGENTS.md"] },
  // The sibling builder, when it is checked out next to this one. It carries
  // the dependency on this package in its own src/package.json.
  { root: path.join(ROOT, "..", "builder-cap2UI5"), dirs: ["src", "scripts", "test"], files: ["README.md", "AGENTS.md"] },
];

const SKIP_DIRS = new Set(["node_modules", ".git", "run", "core", "coverage", "gen"]);
const TEXT_EXT = new Set([".js", ".mjs", ".cjs", ".json", ".cds", ".md", ".ts", ".yml", ".yaml", ".jsonc"]);

function* walk(dir) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return; // an optional sibling checkout that is not there
  }
  for (const e of entries) {
    if (SKIP_DIRS.has(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (TEXT_EXT.has(path.extname(e.name))) yield p;
  }
}

/**
 * Replace the package name only where it is a MODULE SPECIFIER or the package
 * identity — never in prose, a URL or a repository slug, where "abap2UI5"
 * means the upstream ABAP project and must stay.
 */
function rewrite(text) {
  let out = text;
  let n = 0;
  const sub = (re, to) => {
    out = out.replace(re, (...m) => { n++; return to(...m); });
  };

  // require("abap2UI5") / require("abap2UI5/x"), import from, and the same
  // inside a `using from` in a .cds file.
  sub(new RegExp(`(["'\`])${OLD}(/[^"'\`]*)?\\1`, "g"), (_all, q, sub2) => `${q}${NEXT}${sub2 || ""}${q}`);
  // "abap2UI5": "file:..." as a dependency key
  sub(new RegExp(`"${OLD}"(\\s*:)`, "g"), (_all, tail) => `"${NEXT}"${tail}`);

  return { out, n };
}

const changed = [];
for (const t of TARGETS) {
  const roots = [
    ...t.dirs.map((d) => path.join(t.root, d)),
    ...t.files.map((f) => path.join(t.root, f)),
  ];
  for (const r of roots) {
    const files = fs.existsSync(r) && fs.statSync(r).isDirectory() ? [...walk(r)] : fs.existsSync(r) ? [r] : [];
    for (const file of files) {
      const before = fs.readFileSync(file, "utf8");
      const { out, n } = rewrite(before);
      if (out !== before) {
        changed.push([path.relative(ROOT, file), n]);
        if (!DRY) fs.writeFileSync(file, out);
      }
    }
  }
}

// The package's own identity, which the specifier rule above does not match.
const manifest = path.join(ROOT, "src", "package.json");
const pkg = JSON.parse(fs.readFileSync(manifest, "utf8"));
if (pkg.name !== NEXT) {
  pkg.name = NEXT;
  changed.push(["src/package.json (name)", 1]);
  if (!DRY) fs.writeFileSync(manifest, JSON.stringify(pkg, null, 2) + "\n");
}

console.log(`${DRY ? "DRY RUN — " : ""}${OLD} → ${NEXT}`);
for (const [file, n] of changed) console.log(`  ${String(n).padStart(3)}  ${file}`);
console.log(`\n${changed.length} file(s)${DRY ? " would be" : ""} changed.`);
if (!DRY) {
  console.log(`\nNext, per docs/adr-001-npm-publishing.md:`);
  console.log(`  npm run build_core && npm test`);
  console.log(`  (cd ../builder-cap2UI5 && npm run mirror_core && npm run assemble && npm test)`);
  console.log(`  then drop "private", set publishConfig, and publish from the pipeline.`);
}
