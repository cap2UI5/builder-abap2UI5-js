const { loadReport } = require("./helpers/reports");

/**
 * Upstream unit-test gate — the self-healing loop's ratchet.
 *
 * The upstream abap2UI5 testclasses encode the EXPECTED behavior of every
 * framework class. scripts/transpile-tests.js transpiles them with abap2js,
 * scripts/run-units.js executes them against the published core package code
 * (AUnit semantics), and this test diffs the outcome against
 * test/upstream-units.known-failures.json:
 *
 *   - a test that fails but is not on the list is a REGRESSION → red
 *   - a listed test that now passes must be delisted → red (keeps the list
 *     honest; regenerate via `node scripts/run-units.js --json`)
 *
 * So the baseline is the transpiler/port bug WORKLIST and it can only
 * shrink. Every emitter improvement must delist what it fixes; every
 * upstream sync re-arms the gate against the fresh sources.
 */
describe("upstream unit tests (transpiled testclasses)", () => {
  jest.setTimeout(300000);

  test("every transpiled upstream unit test passes, except the known failures", () => {
    const report = loadReport("units", "run-units.js", ["transpile-tests.js"]);
    const known = new Set(require("./upstream-units.known-failures.json").map((f) => f.name));
    const failing = new Set(Object.keys(report.failures));

    const regressions = [...failing].filter((n) => !known.has(n)).map((n) => `${n}: ${report.failures[n]}`);
    const fixedButStillListed = [...known].filter((n) => !failing.has(n));

    expect({ regressions, fixedButStillListed }).toEqual({ regressions: [], fixedButStillListed: [] });
    // Sanity floor — guards against an empty/mis-generated tests folder.
    // Kept near the real corpus (511 as of 2026-08), not at a token value: at
    // the old floor of 150 two thirds of the upstream suite could vanish —
    // transpile-tests.js drops a test class it cannot emit with only a
    // console.error — and every ratchet check would still pass, on a corpus
    // silently reduced to the tests that happen to be easy. Raise it when
    // upstream grows; lower it only with a reason, since the whole point is
    // that shrinkage is loud.
    expect(report.total).toBeGreaterThan(480);
  });
});
