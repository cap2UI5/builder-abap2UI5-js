/**
 * The package's `exports` map is the single source for "which file does
 * `abap2UI5/<name>` mean" (scripts/lib/path-map). These tests are what makes
 * that claim safe to rely on.
 *
 * The failure mode being guarded is specific: a class that the manifest
 * promises but that is not there. Nothing else catches it — `require` of a
 * missing export throws at the call site, which for a rarely-taken branch
 * means production, and the transpiler's own fallback for an unmapped class
 * is a silent TODO comment rather than an error.
 */
const fs = require("fs");
const path = require("path");
const pathMap = require("../scripts/lib/path-map");

const CORE = path.join(__dirname, "..", "core");

describe("package path map", () => {
  test("every exported subpath resolves to a file that exists", () => {
    const missing = [];
    for (const e of pathMap.entries()) {
      if (e.wildcard) {
        // A pattern is satisfied if its directory exists — the concrete
        // members are covered by the class-by-class check below.
        const dir = path.join(CORE, path.dirname(e.target.split("*")[0] + "x"));
        if (!fs.existsSync(dir)) missing.push(`${e.name} → ${dir}`);
      } else if (!fs.existsSync(path.join(CORE, e.target))) {
        missing.push(`${e.name} → ${e.target}`);
      }
    }
    expect(missing).toEqual([]);
  });

  test("every framework class is reachable under its own name", () => {
    // Walk the shipped framework tree and ask the map for each class. A class
    // the package cannot address is invisible to transpiled callers, which
    // require by name.
    const unreachable = [];
    (function walk(dir) {
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const p = path.join(dir, entry.name);
        if (entry.isDirectory()) { walk(p); continue; }
        if (!entry.name.endsWith(".js")) continue;
        const name = path.basename(entry.name, ".js");
        // Only ABAP-shaped names are part of the contract; engine.js,
        // register-apps.js and the z2ui5_port/asset modules are addressed
        // explicitly and covered by the exports check above.
        if (!/^(z2ui5|cl_abap|cx_)/.test(name)) continue;
        const file = pathMap.fileFor(name);
        if (!file || path.resolve(file) !== path.resolve(p)) {
          unreachable.push(`${name}: map says ${file || "(nothing)"}, file is ${p}`);
        }
      }
    })(path.join(CORE, "srv", "z2ui5"));

    expect(unreachable).toEqual([]);
  });

  test("subpathFor answers for a known class and refuses an unknown one", () => {
    expect(pathMap.subpathFor("z2ui5_cl_util")).toBe("abap2UI5/z2ui5_cl_util");
    expect(pathMap.subpathFor("z2ui5_cl_ui5_client")).toBe("abap2UI5/z2ui5_cl_ui5_client");
    // A class the package does not export must return null so the transpiler
    // emits a visible TODO rather than a require that fails at load time.
    expect(pathMap.subpathFor("zcl_something_of_yours")).toBeNull();
  });

  test("the jest mapping and the manifest cannot drift apart", () => {
    // The suite you are reading resolves modules through this very map, so a
    // mismatch here means the tests are exercising different files than a
    // consumer would.
    const configured = require("../jest.config.js").moduleNameMapper;
    expect(configured).toEqual(pathMap.moduleNameMapper());
  });

  test("more specific patterns win over broader ones", () => {
    // `./z2ui5_cl_util_*` must not shadow `./z2ui5_cl_util_api`, which the
    // manifest places in a different directory, and the broad
    // `./z2ui5_cl_ui5_app_*` must not shadow the explicit
    // `./z2ui5_cl_ui5_app_cont`. Ordering is the only thing that makes jest's
    // first-match-wins agree with npm's most-specific-wins.
    expect(pathMap.fileFor("z2ui5_cl_util_api")).toMatch(/00[/\\]03[/\\]02[/\\]z2ui5_cl_util_api\.js$/);
    expect(pathMap.fileFor("z2ui5_cl_util_http")).toMatch(/00[/\\]03[/\\]z2ui5_cl_util_http\.js$/);
    expect(pathMap.fileFor("z2ui5_cl_ui5_app_cont")).toMatch(/01[/\\]02[/\\]z2ui5_cl_ui5_app_cont\.js$/);
    expect(pathMap.fileFor("z2ui5_cl_ui5_app_start")).toMatch(/01[/\\]04[/\\]z2ui5_cl_ui5_app_start\.js$/);
  });
});
