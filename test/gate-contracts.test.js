// The two ratchet gates decide what the pipeline believes about the port, and
// each of them used to rest on something that could change without anything
// failing.
//
//  - smoke-apps classified every sample by looking for the framework's
//    "UNCAUGHT EXCEPTION" text in the response. That literal was COPIED into
//    the script, so rewording the message in z2ui5_cl_ui5_handler would have
//    reclassified every erroring sample while the gate kept running and kept
//    reporting — measuring a rule that no longer matched anything.
//  - both gates hard-coded their timeouts. A timeout is a NEW failure, a new
//    failure is a ratchet regression, and a ratchet regression is what blocks
//    core/ from being committed. On a slow shared runner, "slow" looked like
//    "broken port".
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const read = (p) => fs.readFileSync(path.join(ROOT, p), "utf8");

describe("the uncaught-exception marker is one contract, not two copies", () => {
  const handler = require("abap2UI5/z2ui5_cl_ui5_handler");

  test("the handler exports it", () => {
    expect(typeof handler.UNCAUGHT_EXCEPTION_PREFIX).toBe("string");
    expect(handler.UNCAUGHT_EXCEPTION_PREFIX.length).toBeGreaterThan(10);
  });

  test("the handler wraps errors with the exported constant, not a literal", () => {
    // A literal here is how the two copies drift apart.
    const src = read("src/srv/z2ui5/01/02/z2ui5_cl_ui5_handler.js");
    const wrapSite = src.match(/new z2ui5_cx_util_error\(([^,]+),/);
    expect(wrapSite).not.toBeNull();
    expect(wrapSite[1]).toMatch(/UNCAUGHT_EXCEPTION_PREFIX/);
  });

  test("the smoke gate reads it from the handler", () => {
    const src = read("scripts/smoke-apps.js");
    expect(src).toMatch(/UNCAUGHT_EXCEPTION_PREFIX/);
    // The fallback literal may stay (the script must work standalone), but the
    // verdict must be decided by the constant.
    expect(src).toMatch(/rawStr\.includes\(UNCAUGHT_PREFIX\)/);
  });

  test("an error really is wrapped with that prefix end to end", () => {
    // The contract is only worth pinning if it is the real behaviour, so drive
    // a failing app through the engine and look at what comes back.
    const engine = require("abap2UI5/engine");
    class Boom {
      async main() {
        throw new Error("kaboom-marker-probe");
      }
    }
    engine.register_app_class(Boom);

    return engine
      .roundtrip({ S_FRONT: { ORIGIN: "http://x", PATHNAME: "/p", SEARCH: "?app_start=Boom" } })
      .then((out) => {
        expect(String(out)).toContain(handler.UNCAUGHT_EXCEPTION_PREFIX);
        expect(String(out)).toContain("kaboom-marker-probe");
      });
  });
});

describe("gate timeouts are configurable", () => {
  test("the smoke gate takes its budget from the environment", () => {
    const src = read("scripts/smoke-apps.js");
    expect(src).toMatch(/Z2UI5_SMOKE_TIMEOUT_MS/);
    expect(src).toMatch(/\|\|\s*10000/); // and still has a sane default
  });

  test("the unit runner takes its budget from the environment", () => {
    const src = read("scripts/run-units.js");
    expect(src).toMatch(/Z2UI5_UNIT_TIMEOUT_MS/);
    expect(src).toMatch(/\|\|\s*5000/);
  });

  test("neither still hard-codes a bare timeout literal in the race", () => {
    expect(read("scripts/run-units.js")).not.toMatch(/rej\(new Error\("timeout \(5s\)"\)\), 5000\)/);
    expect(read("scripts/smoke-apps.js")).not.toMatch(/\), 10000\)/);
  });
});
