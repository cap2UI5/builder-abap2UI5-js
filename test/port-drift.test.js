/**
 * The hand-port drift baseline must stay a faithful index of what is actually
 * hand-ported — otherwise the drift detector reports on a stale set and the
 * silent-divergence hole it exists to close reopens.
 *
 * Note what this does NOT assert: that no drift exists. A changed upstream
 * class is news, not a defect — it needs a human to decide whether the
 * hand-port must follow, and blocking the sync pipeline on it would just
 * teach everyone to bypass the gate. Drift surfaces as a CI warning +
 * job summary (scripts/check-port-drift.js); the baseline then records it as
 * seen. What must never happen is the INDEX going stale, and that is what is
 * checked here.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const BASELINE = path.join(ROOT, "test", "port-drift.baseline.json");
const SRC_DIR = path.join(ROOT, "src", "srv", "z2ui5");
const UPSTREAM_DIR = path.join(ROOT, "run", "input", "abap2UI5", "src");

function walk(dir, ext, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, ext, out);
    else if (e.name.endsWith(ext)) out.push(p);
  }
  return out;
}

describe("hand-port drift baseline", () => {
  const baseline = JSON.parse(fs.readFileSync(BASELINE, "utf8"));

  test("is a well-formed index", () => {
    expect(typeof baseline.upstream_commit).toBe("string");
    expect(Object.keys(baseline.ports).length).toBeGreaterThan(50); // sanity floor
    for (const [name, entry] of Object.entries(baseline.ports)) {
      expect(entry.hash).toMatch(/^[0-9a-f]{16}$/);
      expect(entry.js).toContain("src/srv/z2ui5");
      expect(path.basename(entry.js, ".js").toLowerCase()).toBe(name);
    }
  });

  test("covers exactly the classes that shadow an upstream object", () => {
    const upstreamNames = new Set(
      [...walk(UPSTREAM_DIR, ".clas.abap"), ...walk(UPSTREAM_DIR, ".intf.abap")]
        .map((p) => path.basename(p).replace(/\.(clas|intf)\.abap$/, "").toLowerCase()),
    );
    const shadowing = walk(SRC_DIR, ".js")
      .map((p) => path.basename(p, ".js").toLowerCase())
      .filter((n) => upstreamNames.has(n))
      .sort();

    // Missing entries mean the detector is blind to those classes; extra ones
    // mean it reports on classes that no longer exist. Both are stale-index
    // bugs — regenerate with `node scripts/check-port-drift.js --update`.
    expect(Object.keys(baseline.ports).sort()).toEqual(shadowing);
  });

  test("every referenced file still exists", () => {
    for (const entry of Object.values(baseline.ports)) {
      expect(fs.existsSync(path.join(ROOT, entry.js))).toBe(true);
      expect(fs.existsSync(path.join(ROOT, entry.abap))).toBe(true);
    }
  });
});
