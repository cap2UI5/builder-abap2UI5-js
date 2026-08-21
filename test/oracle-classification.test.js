// The oracle classification is a COMMITTED artifact, so it has to behave like
// one: deterministic, in step with the baseline it classifies, and honest
// about what it does and does not prove.
//
// It used to be printed to $GITHUB_STEP_SUMMARY, which expires with the
// Actions log — so the one tool that can answer "how much of the baseline is
// actually work?" produced an answer nobody could read a week later. Now it is
// tracked, which only helps if an unchanged verdict produces no diff.
"use strict";

const fs = require("fs");
const os = require("os");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.join(__dirname, "..");
const FILE = path.join(ROOT, "test", "oracle-classification.json");
const BASELINE = path.join(ROOT, "test", "upstream-units.known-failures.json");

const doc = JSON.parse(fs.readFileSync(FILE, "utf8"));
const baseline = JSON.parse(fs.readFileSync(BASELINE, "utf8"));

/** Run the classifier against a synthetic oracle log; return the parsed output. */
function classify(greenEntries) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "oracle-"));
  const log = path.join(dir, "run.txt");
  const out = path.join(dir, "out.json");
  fs.writeFileSync(
    log,
    greenEntries
      .map((n) => {
        const [obj, cls, m] = n.split("::");
        return `${obj}: running ${cls}->${m} ... ok`;
      })
      .join("\n") + "\n",
  );
  execFileSync(process.execPath, [path.join(ROOT, "scripts", "oracle-classify.js"), log, "--json", out], {
    stdio: "pipe",
  });
  return JSON.parse(fs.readFileSync(out, "utf8"));
}

describe("the committed classification", () => {
  test("covers exactly the baseline it classifies", () => {
    // A stale classification is worse than none: it would describe entries
    // that no longer exist and miss the ones that do.
    expect(doc.entries.map((e) => e.name).sort()).toEqual(baseline.map((e) => e.name).sort());
  });

  test("its totals add up to the baseline size", () => {
    const sum = Object.values(doc.totals).reduce((a, b) => a + b, 0);
    expect(sum).toBe(baseline.length);
    expect(sum).toBe(doc.entries.length);
  });

  test("every verdict is one of the three known ones", () => {
    for (const e of doc.entries) expect(["BUG", "KERNEL", "NOTRUN"]).toContain(e.verdict);
  });

  test("carries no timestamp, run id or other per-run noise", () => {
    // The weekly job commits this file. Anything that changes every run would
    // produce a commit every week and make the diff meaningless.
    const raw = fs.readFileSync(FILE, "utf8");
    expect(raw).not.toMatch(/\d{4}-\d{2}-\d{2}T\d{2}:/); // ISO timestamp
    expect(raw).not.toMatch(/"(generated_at|timestamp|run_id|date)"/);
  });
});

describe("the classifier is deterministic", () => {
  test("the same oracle log produces byte-identical output", () => {
    const green = baseline.slice(0, 5).map((e) => e.name);
    const a = classify(green);
    const b = classify(green);
    expect(JSON.stringify(a)).toBe(JSON.stringify(b));
  });

  test("output order does not depend on the log order", () => {
    const green = baseline.slice(0, 5).map((e) => e.name);
    const a = classify(green);
    const b = classify([...green].reverse());
    expect(JSON.stringify(a)).toBe(JSON.stringify(b));
  });

  test("a test the oracle runs green is classified BUG — provably fixable here", () => {
    // That is the whole point of the oracle: upstream's own JS runtime passing
    // a test proves it is achievable in JS, so the entry is a defect here
    // rather than ABAP-kernel semantics.
    const target = baseline[0].name;
    const out = classify([target]);
    expect(out.entries.find((e) => e.name === target).verdict).toBe("BUG");
    expect(out.totals.BUG).toBe(1);
  });

  test("an empty oracle log proves nothing, rather than proving the negative", () => {
    const out = classify([]);
    expect(out.totals.BUG).toBe(0);
    expect(out.totals.NOTRUN).toBe(baseline.length);
  });
});
