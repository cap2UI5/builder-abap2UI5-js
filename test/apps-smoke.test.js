const { loadReport } = require("./helpers/reports");

/**
 * Smoke gate over all bundled sample apps — every class in
 * core/srv/app/samples is started through the real core handler
 * (`?app_start=<class>`, same code path the browser hits) by
 * scripts/smoke-apps.js in a child process.
 *
 * The result is diffed against test/apps-smoke.known-failures.json:
 *   - an app that fails but is not on the list is a REGRESSION → test fails
 *   - an app on the list that now starts is an IMPROVEMENT → test fails too,
 *     so the list stays honest: remove the entry (regenerate via
 *     `node scripts/smoke-apps.js --json`)
 */
describe("sample apps smoke", () => {
  jest.setTimeout(300000);

  test("every sample app starts, except the known failures", () => {
    const report = loadReport("smoke", "smoke-apps.js");
    const known = new Set(require("./apps-smoke.known-failures.json").map((f) => f.name));

    const failing = new Set(report.results.filter((r) => r.verdict !== "ok").map((r) => r.name));

    const regressions = [...failing].filter((n) => !known.has(n));
    const fixed = [...known].filter((n) => !failing.has(n));

    expect({ regressions, fixedButStillListed: fixed }).toEqual({ regressions: [], fixedButStillListed: [] });
    // sanity floor: guard against an empty / mis-copied samples folder. The
    // exact count drifts as upstream adds/removes samples (currently ~104 —
    // the samples repo dropped its `cloud` branch in 2026-08 and moved every
    // SAPUI5-only sample out, so the catalog shrank from ~208), so this is a
    // loose lower bound, not a pin.
    expect(report.total).toBeGreaterThan(80);
  });
});
