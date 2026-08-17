/**
 * path-map — one source for "which file does `abap2UI5/<name>` mean".
 *
 * WHY THIS EXISTS
 * ---------------
 * That mapping used to be written out four times: the `exports` map in
 * src/package.json (the real one, shipped with the package), jest's
 * moduleNameMapper (jest does not resolve package self-references), the
 * transpiler's requirePathFor (which decides what a transpiled class requires),
 * and the web bundler's resolver. Four copies of one fact.
 *
 * The 2026-08 upstream rename had to be chased through all of them, and a
 * copy left behind does not fail loudly: the transpiler's fallback is `null`,
 * which emits a TODO comment instead of a require. So the mapping was both
 * duplicated and silent when wrong.
 *
 * The package's own `exports` map is the authority — it is what actually
 * resolves at runtime for consumers. Everything else is derived from it here.
 */
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..", "..");

/** The published package manifest (falls back to the source manifest). */
function manifest() {
  for (const p of [path.join(ROOT, "core", "package.json"), path.join(ROOT, "src", "package.json")]) {
    if (fs.existsSync(p)) return JSON.parse(fs.readFileSync(p, "utf8"));
  }
  throw new Error("path-map: neither core/package.json nor src/package.json found");
}

/**
 * The exports map as entries, ordered the way a resolver must try them:
 * exact subpaths first, then wildcard patterns by descending prefix length.
 *
 * npm resolves the most specific pattern; jest's moduleNameMapper takes the
 * first regex that matches. Sorting here is what makes the two agree — with
 * insertion order alone, `./z2ui5_cl_util_*` could shadow `./z2ui5_cl_util_db`.
 */
function entries() {
  const exp = manifest().exports || {};
  const out = [];
  for (const [subpath, target] of Object.entries(exp)) {
    if (subpath === ".") continue; // the bare package name, handled separately
    const name = subpath.replace(/^\.\//, "");
    out.push({
      name,
      target: String(target).replace(/^\.\//, ""),
      wildcard: name.includes("*"),
      // specificity = how much is fixed before the wildcard
      prefix: name.split("*")[0].length,
    });
  }
  out.sort((a, b) => {
    if (a.wildcard !== b.wildcard) return a.wildcard ? 1 : -1;
    return b.prefix - a.prefix;
  });
  return out;
}

/** The bare-package export ("." → the util class). */
function rootTarget() {
  return String(manifest().exports?.["."] || "").replace(/^\.\//, "");
}

/**
 * jest moduleNameMapper for the published package, derived from `exports`.
 * @param {string} pkgRoot path prefix of the package inside the repo
 */
function moduleNameMapper(pkgRoot = "<rootDir>/core") {
  const map = {};
  for (const e of entries()) {
    if (e.wildcard) {
      const [pre, post] = e.name.split("*");
      const [tpre, tpost] = e.target.split("*");
      map[`^abap2UI5/${escapeRe(pre)}(.*)${escapeRe(post)}$`] = `${pkgRoot}/${tpre}$1${tpost}`;
    } else {
      map[`^abap2UI5/${escapeRe(e.name)}$`] = `${pkgRoot}/${e.target}`;
    }
  }
  map["^abap2UI5$"] = `${pkgRoot}/${rootTarget()}`;
  return map;
}

function escapeRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Is `className` reachable as a package export — and under which subpath?
 * Returns e.g. "abap2UI5/z2ui5_cl_util", or null when the package does not
 * export it (the transpiler then emits a visible TODO rather than a require
 * that would fail at load time).
 */
function subpathFor(className) {
  for (const e of entries()) {
    if (e.wildcard) {
      const [pre, post] = e.name.split("*");
      if (className.startsWith(pre) && className.endsWith(post) && className.length >= pre.length + post.length) {
        return `abap2UI5/${className}`;
      }
    } else if (e.name === className) {
      return `abap2UI5/${className}`;
    }
  }
  return null;
}

/** Absolute path of the file `abap2UI5/<className>` resolves to, or null. */
function fileFor(className, pkgRoot = path.join(ROOT, "core")) {
  for (const e of entries()) {
    if (e.wildcard) {
      const [pre, post] = e.name.split("*");
      if (className.startsWith(pre) && className.endsWith(post) && className.length >= pre.length + post.length) {
        const middle = className.slice(pre.length, className.length - post.length);
        const [tpre, tpost] = e.target.split("*");
        return path.join(pkgRoot, `${tpre}${middle}${tpost}`);
      }
    } else if (e.name === className) {
      return path.join(pkgRoot, e.target);
    }
  }
  return null;
}

module.exports = { entries, moduleNameMapper, subpathFor, fileFor, rootTarget };
