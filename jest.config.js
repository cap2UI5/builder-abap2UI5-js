/**
 * Jest does not resolve package self-references ("abap2UI5/..." from within
 * this repo, see the "exports" map in core/package.json), so the mapping is
 * generated from that map — tests then resolve exactly what a consumer does,
 * including what the package does NOT export.
 */
module.exports = {
  // anchored at the repo root — this suite covers the transpile project (core
  // package, transpiler, adapters); the CAP app has its own suite in the
  // cap2UI5 repo (run via `npm test` there)
  rootDir: ".",
  // Derived from the package's own `exports` map — see scripts/lib/path-map.js.
  // Jest does not resolve package self-references, so it needs its own copy of
  // the mapping; generating it means the copy cannot drift from the manifest
  // that actually resolves for consumers (it did, four times over).
  moduleNameMapper: require("./scripts/lib/path-map").moduleNameMapper(),
  testPathIgnorePatterns: ["/node_modules/", "/core/app/", "<rootDir>/src/", "<rootDir>/run/output/", "/adapters/"],
  // src/ is the hand-maintained SOURCE of the core package and
  // run/output/core is the assembled copy — keep both out of module
  // resolution so their package.json / sources never shadow the real
  // core/ the tests load.
  modulePathIgnorePatterns: ["<rootDir>/src/", "<rootDir>/run/output/core/"],
};
