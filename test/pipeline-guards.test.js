// Guardrail tests for the scripts that decide WHAT SHIPS.
//
// assemble-core, publish-core and transpile-tree produce the package every
// downstream repo mirrors, and each of them used to have a way to fail quietly:
// assemble deleted modules it could not load and still exited 0, publish wiped
// core/ and copied whatever it was handed, and transpile wrote an empty report
// when it found nothing to do. None of the three was tested at all.
//
// These tests drive the real scripts against temp fixtures (the pattern
// builder-cap2UI5's suite already uses) and assert the failure paths, because
// the success path is what every green build already exercises.
"use strict";

const fs = require("fs");
const os = require("os");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.join(__dirname, "..");

function tmpdir(prefix) {
  return fs.mkdtempSync(path.join(os.tmpdir(), prefix));
}

/** Run a script; return {status, stdout, stderr} without throwing on exit≠0. */
function run(script, { env = {}, args = [] } = {}) {
  try {
    const stdout = execFileSync(process.execPath, [path.join(ROOT, "scripts", script), ...args], {
      encoding: "utf8",
      env: { ...process.env, ...env },
      stdio: ["ignore", "pipe", "pipe"],
    });
    return { status: 0, stdout, stderr: "" };
  } catch (e) {
    return { status: e.status ?? 1, stdout: e.stdout ?? "", stderr: e.stderr ?? "" };
  }
}

describe("publish-core size floor", () => {
  let src;
  let dest;

  beforeEach(() => {
    src = tmpdir("pub-src-");
    dest = tmpdir("pub-dest-");
  });

  afterEach(() => {
    fs.rmSync(src, { recursive: true, force: true });
    fs.rmSync(dest, { recursive: true, force: true });
  });

  test("refuses to publish a suspiciously small tree, leaving the target intact", () => {
    // A build accident: assemble produced almost nothing.
    fs.writeFileSync(path.join(src, "package.json"), "{}");
    // The currently-published package the accident would overwrite.
    fs.writeFileSync(path.join(dest, "KEEP_ME.js"), "module.exports = 1;");

    const res = run("publish-core.js", { env: { CORE_SRC_ROOT: src, CORE_DEST_ROOT: dest } });

    expect(res.status).toBe(1);
    expect(res.stderr).toMatch(/Refusing to overwrite/);
    // The good package must still be there — the wipe happens after the floor.
    expect(fs.existsSync(path.join(dest, "KEEP_ME.js"))).toBe(true);
  });

  test("publishes a tree that clears the floor", () => {
    for (let i = 0; i < 160; i++) fs.writeFileSync(path.join(src, `m${i}.js`), "module.exports = {};");
    fs.writeFileSync(path.join(dest, "stale.js"), "module.exports = 'old';");

    const res = run("publish-core.js", { env: { CORE_SRC_ROOT: src, CORE_DEST_ROOT: dest } });

    expect(res.status).toBe(0);
    expect(fs.existsSync(path.join(dest, "m0.js"))).toBe(true);
    // and the wipe really happened
    expect(fs.existsSync(path.join(dest, "stale.js"))).toBe(false);
  });
});

describe("assemble-core preconditions", () => {
  let fakeRoot;

  afterEach(() => {
    if (fakeRoot) fs.rmSync(fakeRoot, { recursive: true, force: true });
    fakeRoot = null;
  });

  test("refuses to run the load gate without the cap adapter's dependencies", () => {
    // The gate resolves @sap/cds/express through adapters/cap/node_modules.
    // Absent, every fill-in requiring them fails to load and is DELETED — the
    // build then reports success on a gutted package. Build a root that HAS a
    // backend overlay to gate but no adapter tree, and assert it stops.
    fakeRoot = tmpdir("asm-root-");
    fs.mkdirSync(path.join(fakeRoot, "src"), { recursive: true });
    const overlay = path.join(fakeRoot, "run", "output", "abap2UI5");
    fs.mkdirSync(overlay, { recursive: true });
    fs.writeFileSync(path.join(overlay, "z2ui5_cl_thing.js"), "module.exports = {};");

    const res = run("assemble-core.js", { env: { CORE_ROOT: fakeRoot } });

    expect(res.status).toBe(1);
    expect(res.stderr).toMatch(/adapters\/cap/);
    // and it stopped BEFORE assembling anything
    expect(fs.existsSync(path.join(fakeRoot, "run", "output", "core"))).toBe(false);
  });

  test("proceeds when there is no backend overlay to gate", () => {
    // Assembling before the transpile step is legitimate; the precondition
    // must not fire when the gate has nothing to do.
    fakeRoot = tmpdir("asm-root-");
    fs.mkdirSync(path.join(fakeRoot, "src"), { recursive: true });
    fs.writeFileSync(path.join(fakeRoot, "src", "package.json"), '{"name":"x"}');

    const res = run("assemble-core.js", { env: { CORE_ROOT: fakeRoot } });

    expect(res.status).toBe(0);
    expect(res.stderr).not.toMatch(/adapters\/cap/);
  });
});

describe("the shipped guardrails are wired, not just written", () => {
  test("assemble-core fails on skipped files unless explicitly overridden", () => {
    const src = fs.readFileSync(path.join(ROOT, "scripts", "assemble-core.js"), "utf8");
    // A skipped file means a smaller published package: it must exit non-zero.
    expect(src).toMatch(/ASSEMBLE_ALLOW_SKIPPED/);
    expect(src).toMatch(/process\.exit\(1\)/);
    // and the reason for each skip must be carried, not discarded
    expect(src).toMatch(/function parseError/);
  });

  test("transpile-tree carries a per-tree size floor", () => {
    const src = fs.readFileSync(path.join(ROOT, "scripts", "transpile-tree.js"), "utf8");
    expect(src).toMatch(/MIN_TRANSPILED/);
  });

  test("the ratchet floors match the ones the jest gates assert", () => {
    const ratchet = fs.readFileSync(path.join(ROOT, "scripts", "ratchet-update.js"), "utf8");
    const units = fs.readFileSync(path.join(ROOT, "test", "upstream-units.test.js"), "utf8");
    const smoke = fs.readFileSync(path.join(ROOT, "test", "apps-smoke.test.js"), "utf8");

    // ratchet-update WRITES the baselines, so its floors must not be looser
    // than the gates that only read them.
    const num = (s, re) => Number(s.match(re)[1]);
    expect(num(ratchet, /units\.total <= (\d+)/)).toBeGreaterThanOrEqual(num(units, /toBeGreaterThan\((\d+)\)/));
    expect(num(ratchet, /smoke\.total <= (\d+)/)).toBeGreaterThanOrEqual(num(smoke, /toBeGreaterThan\((\d+)\)/));
  });
});

describe("check-port-drift write discipline", () => {
  const BASELINE = path.join(ROOT, "test", "port-drift.baseline.json");

  test("a report run never touches the baseline", () => {
    const before = fs.readFileSync(BASELINE, "utf8");
    const res = run("check-port-drift.js");
    expect(res.status).toBe(0);
    expect(fs.readFileSync(BASELINE, "utf8")).toBe(before);
  });

  test("--strict does not write either", () => {
    const before = fs.readFileSync(BASELINE, "utf8");
    run("check-port-drift.js", { args: ["--strict"] });
    expect(fs.readFileSync(BASELINE, "utf8")).toBe(before);
  });
});
