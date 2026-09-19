/**
 * Wire-conformance gate — this port's roundtrip answers vs real abap2UI5.
 *
 * The reference is upstream's own node/ runtime (official @abaplint transpiler
 * over open-abap-core), driven over HTTP by scripts/conformance.js. See that
 * file's header for the why, and docs/adr-006-conformance.md for the decision.
 *
 * SKIPPING RULE — deliberately asymmetric, same shape as test/adapters.test.js:
 *
 *   locally  a missing reference SKIPS. Nobody touching the transpiler should
 *            have to build and boot an open-abap server to run `npm test`.
 *   in CI    a missing reference FAILS. The conformance workflow exists
 *            precisely to provide one, so its absence means a step was dropped
 *            or broke — and a gate whose failure mode is "passes" has stopped
 *            being a gate. Z2UI5_CONFORMANCE_OPTIONAL=1 opts a CI job out
 *            explicitly (the PR gate does not build a reference; the
 *            conformance workflow does).
 */
const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const BASELINE = path.join(__dirname, "conformance.baseline.json");

const REF = process.env.Z2UI5_CONFORMANCE_REF || "";
const OPTIONAL = process.env.Z2UI5_CONFORMANCE_OPTIONAL === "1";
const IN_CI = process.env.CI === "true";

describe("wire conformance against upstream abap2UI5 (open-abap reference)", () => {
  jest.setTimeout(300000);

  if (!REF) {
    if (IN_CI && !OPTIONAL) {
      test("a reference server must be available in CI", () => {
        throw new Error(
          "Z2UI5_CONFORMANCE_REF is unset in CI.\n" +
            "The conformance workflow builds upstream's node/ runtime and exports this\n" +
            "variable; without it this gate would pass while comparing nothing.\n" +
            "Restore that step, or set Z2UI5_CONFORMANCE_OPTIONAL=1 for jobs that\n" +
            "deliberately do not build a reference (e.g. the fast PR gate)."
        );
      });
    } else {
      test.skip("skipped — no reference server (set Z2UI5_CONFORMANCE_REF)", () => {});
    }
    return;
  }

  test("every differing wire field is a known, explained difference", () => {
    const out = execFileSync(
      process.execPath,
      [path.join(ROOT, "scripts", "conformance.js"), "--ref", REF, "--json"],
      { encoding: "utf8", timeout: 280000, maxBuffer: 64 * 1024 * 1024 }
    );
    const report = JSON.parse(out);
    const known = JSON.parse(fs.readFileSync(BASELINE, "utf8")).entries || {};

    const found = Object.keys(report.mismatches);
    const regressions = found
      .filter((k) => !(k in known))
      .map((k) => `${k}\n      upstream: ${report.mismatches[k].ref}\n      port:     ${report.mismatches[k].sub}`);
    const fixedButStillListed = Object.keys(known).filter((k) => !found.includes(k));

    expect({ regressions, fixedButStillListed }).toEqual({ regressions: [], fixedButStillListed: [] });

    // Corpus floor — the same lesson the units ratchet learned the hard way. A
    // scenario file that fails to load, or a reference that answers every
    // request with the same error, produces ZERO mismatches and would read as
    // perfect conformance. Kept just under the real count so shrinkage is loud.
    expect(report.compared).toBeGreaterThanOrEqual(4);
  });

});

// Governance runs with or without a reference: the baseline is a tracked file,
// so its discipline is checkable even on a machine that cannot build open-abap.
// Splitting it out also means a missing reference never hides a baseline that
// has decayed into unexplained entries.
describe("conformance baseline governance", () => {
  const known = JSON.parse(fs.readFileSync(BASELINE, "utf8")).entries || {};

  test("every entry carries a reason worth reading", () => {
    // An entry without a real `why` is a difference somebody silenced rather
    // than decided — the exact failure test/ratchet-governance.test.js exists
    // to prevent on the other two baselines.
    const unexplained = Object.entries(known)
      .filter(([, v]) => !v.why || v.why.length < 40 || /^TODO/i.test(v.why))
      .map(([k]) => k);
    expect(unexplained).toEqual([]);
  });

  test("every entry declares a known status", () => {
    const bad = Object.entries(known)
      .filter(([, v]) => !["break", "accepted"].includes(v.status))
      .map(([k]) => `${k} (status: ${JSON.stringify(known[k].status)})`);
    expect(bad).toEqual([]);
  });

  test("a 'break' entry says where its fix is tracked", () => {
    // `break` means the port is wrong and the shipped package is affected. The
    // baseline keeps the gate green while such an entry is worked off — which
    // is only legitimate while somebody can find the plan. Without this rule
    // the difference between "known and scheduled" and "known and forgotten"
    // is invisible, and the second one is just a defect with a green build in
    // front of it. Same reasoning as the port-bug issue-URL rule next door.
    const untracked = Object.entries(known)
      .filter(([, v]) => v.status === "break" && (!v.tracked || v.tracked.length < 10))
      .map(([k]) => k);
    expect(untracked).toEqual([]);
  });
});
