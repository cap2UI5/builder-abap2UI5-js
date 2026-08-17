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
  // Coverage is measured but NOT thresholded. There was no signal at all
  // about which of the ~22k hand-ported lines are exercised — the 8.5k-line
  // view builder has 8 tests — and a threshold on a number nobody has looked
  // at yet would just get set to whatever today happens to be. Report it,
  // read it, then decide.
  // Measured over core/, not src/: core/ is what the suite actually loads
  // (src/ is deliberately outside module resolution, see
  // modulePathIgnorePatterns below), and it is a 1:1 publish of src/ plus the
  // transpiled overlay. Pointing this at src/ reports on files no test ever
  // executes.
  collectCoverageFrom: [
    "core/srv/z2ui5/**/*.js",
    "!core/srv/z2ui5/**/z2ui5_cl_util_ext.js",  // platform stubs, nothing to cover
  ],
  coverageReporters: ["text-summary", "json-summary", "lcov"],
  coverageDirectory: "run/output/coverage",

  testPathIgnorePatterns: ["/node_modules/", "/core/app/", "<rootDir>/src/", "<rootDir>/run/output/", "/adapters/"],
  // src/ is the hand-maintained SOURCE of the core package and
  // run/output/core is the assembled copy — keep both out of module
  // resolution so their package.json / sources never shadow the real
  // core/ the tests load.
  modulePathIgnorePatterns: ["<rootDir>/src/", "<rootDir>/run/output/core/"],
};
