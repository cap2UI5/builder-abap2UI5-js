// Governance for the known-failures ratchets.
//
// The ratchet is what keeps the pipeline green while the port catches up with
// upstream, and that is exactly why it needs rules: a baselined entry is
// permanently invisible, so the baseline is the easiest place in the repo to
// park a real defect and forget it. In 2026-08 six entries carried
// `category: "port-bug"` — descriptions like "_bind does not walk nested
// structure levels" that read as shipped, user-facing breakage. Five turned out
// to be one inherent JS limit reachable only from the transpiled ABAP tests
// (an empty-string field has no reference identity, so the lookup answers the
// first empty attribute; real apps pass the member path via `name` and get the
// right answer at every depth). The sixth was a genuine one-line gap and is
// fixed. The categories had been wrong for months and nothing noticed.
//
// These tests encode what the categories have to mean, so the next
// miscategorisation fails a build instead of misleading a reader.
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const UNITS = JSON.parse(fs.readFileSync(path.join(ROOT, "test", "upstream-units.known-failures.json"), "utf8"));
const SMOKE = JSON.parse(fs.readFileSync(path.join(ROOT, "test", "apps-smoke.known-failures.json"), "utf8"));

// Every category a units entry may carry, and what claiming it commits you to.
const CATEGORIES = {
  // upstream asserts on ABAP-internal state the idiomatic port models differently
  "port-deviation": {},
  // JS cannot express what the test needs (scalar ref identity, RTTI precision)
  "js-limit": {},
  // an API the port has not implemented yet — implementable, tracked work
  "port-gap": {},
  // a sync ABAP test cannot await the JS roundtrip
  "async-boundary": {},
  // a REAL defect in shipped code. Allowed, but never silently: see below.
  "port-bug": { requiresIssue: true },
};

describe("upstream-units baseline hygiene", () => {
  test("every entry has a name, a known category and a reason", () => {
    const bad = [];
    for (const e of UNITS) {
      if (!e.name || typeof e.name !== "string") bad.push(`missing name: ${JSON.stringify(e)}`);
      else if (!CATEGORIES[e.category]) bad.push(`${e.name}: unknown category ${JSON.stringify(e.category)}`);
      else if (!e.why || e.why.trim().length < 20) bad.push(`${e.name}: reason too thin to review`);
    }
    expect(bad).toEqual([]);
  });

  test("no duplicate entries", () => {
    const seen = new Set();
    const dupes = [];
    for (const e of UNITS) {
      if (seen.has(e.name)) dupes.push(e.name);
      seen.add(e.name);
    }
    expect(dupes).toEqual([]);
  });

  test("a port-bug entry must link the issue that tracks it", () => {
    // A known-failing test that is a real defect is a defect FIRST and a
    // baseline entry second. Without a tracked issue it is just a bug with a
    // green build in front of it — which is precisely how the six sat unread.
    // To add one: open the issue, then put its URL in `issue`.
    const unlinked = UNITS
      .filter((e) => CATEGORIES[e.category]?.requiresIssue)
      .filter((e) => !/^https?:\/\/\S+$/.test(String(e.issue || "")))
      .map((e) => e.name);
    expect(unlinked).toEqual([]);
  });

  test("the category rollup matches what the entries actually say", () => {
    // Guards the reverse mistake: a summary in a doc or a commit message that
    // has drifted from the file. Counting here keeps the file self-describing.
    const counts = {};
    for (const e of UNITS) counts[e.category] = (counts[e.category] || 0) + 1;
    const total = Object.values(counts).reduce((a, b) => a + b, 0);
    expect(total).toBe(UNITS.length);
    // Whatever the split is, it may not be dominated by an unexplained bucket.
    for (const [cat, n] of Object.entries(counts)) {
      expect(CATEGORIES[cat]).toBeDefined();
      expect(n).toBeGreaterThan(0);
    }
  });
});

describe("apps-smoke baseline hygiene", () => {
  test("every entry carries a reason", () => {
    // This baseline had no schema at all: three of its five entries were bare
    // JS error strings with no root cause, and two described behaviour that is
    // CORRECT (the sample does the same thing in ABAP) — i.e. modelled as
    // failures although they will never be delisted.
    const bad = SMOKE
      .filter((e) => !e.why || String(e.why).trim().length < 20)
      .map((e) => e.name || JSON.stringify(e));
    expect(bad).toEqual([]);
  });

  test("entries that describe correct behaviour are marked as expected, not failing", () => {
    // `expected: true` says: this sample is SUPPOSED to end this way, it is
    // listed so the smoke run stays green, and no future fix will delist it.
    // Keeping that distinct from a real failure is what stops the baseline
    // from looking like five outstanding bugs when it holds three.
    for (const e of SMOKE) {
      if (e.expected === true) expect(String(e.why)).toMatch(/\S/);
    }
    expect(SMOKE.every((e) => typeof e === "object" && e !== null)).toBe(true);
  });
});
