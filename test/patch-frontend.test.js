// patch-frontend applies the few cap2UI5-specific changes to the mirrored
// upstream frontend. Every one of them used to fail SILENTLY: on a miss the
// script left the file alone and printed "already patched" — the same thing it
// prints on a genuine no-op — then exited 0.
//
// That is not theoretical. The getViewContent patch targeted
// core/DebugTool.js; upstream moved the function to devtools/Tabs.js, and from
// that day the patch shipped unapplied with a green build. A miss means the
// frontend ships unpatched: a bootstrap pointing at a CDN that CSP blocks, or
// a dataSource pointing at the ABAP ICF path CAP does not serve. The app boots
// to a blank shell.
//
// These tests drive the real script against temp fixtures.
"use strict";

const fs = require("fs");
const os = require("os");
const path = require("path");
const { execFileSync } = require("child_process");

const SCRIPT = path.join(__dirname, "..", "scripts", "patch-frontend.js");
const UPSTREAM = path.join(__dirname, "..", "run", "input", "app", "webapp");

function run(dir) {
  try {
    return { status: 0, out: execFileSync(process.execPath, [SCRIPT, dir], { encoding: "utf8", stdio: "pipe" }) };
  } catch (e) {
    return { status: e.status ?? 1, out: (e.stdout ?? "") + (e.stderr ?? "") };
  }
}

/** A minimal webapp with the shapes the script patches. */
function fixture(overrides = {}) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "patch-fe-"));
  fs.mkdirSync(path.join(dir, "view"), { recursive: true });
  fs.mkdirSync(path.join(dir, "devtools"), { recursive: true });

  fs.writeFileSync(
    path.join(dir, "index.html"),
    overrides.index ?? `<script id="sap-ui-bootstrap" src="resources/sap-ui-core.js"></script>`,
  );
  fs.writeFileSync(
    path.join(dir, "view", "App.view.xml"),
    overrides.appView ?? `<mvc:View><App id="app">\n  </App></mvc:View>`,
  );
  fs.writeFileSync(
    path.join(dir, "manifest.json"),
    overrides.manifest ?? JSON.stringify({ "sap.app": { dataSources: { http: { uri: "/sap/bc/z2ui5" } } } }, null, 2),
  );
  fs.writeFileSync(
    path.join(dir, "devtools", "Tabs.js"),
    overrides.tabs ?? `function getViewContent(view) { return view?.mProperties?.viewContent; }`,
  );
  return dir;
}

describe("the happy path", () => {
  let dir;
  beforeAll(() => { dir = fixture(); });

  test("applies every patch and succeeds", () => {
    const r = run(dir);
    expect(r.status).toBe(0);
    expect(fs.readFileSync(path.join(dir, "index.html"), "utf8")).toContain('src="/resources/sap-ui-core.js"');
    expect(fs.readFileSync(path.join(dir, "view", "App.view.xml"), "utf8")).toContain('<Page showHeader="false"/>');
    expect(JSON.parse(fs.readFileSync(path.join(dir, "manifest.json"), "utf8"))["sap.app"].dataSources.http.uri)
      .toBe("/rest/root/z2ui5");
  });

  test("is idempotent — a second run changes nothing and still succeeds", () => {
    const before = fs.readFileSync(path.join(dir, "index.html"), "utf8");
    const r = run(dir);
    expect(r.status).toBe(0);
    expect(r.out).toMatch(/already patched/);
    expect(fs.readFileSync(path.join(dir, "index.html"), "utf8")).toBe(before);
  });
});

describe("a patch that cannot find its target FAILS", () => {
  // Each of these is upstream having changed the shape the patch was written
  // against. Before, every one printed "already patched" and exited 0.

  test("index.html: the bootstrap script tag is gone", () => {
    const r = run(fixture({ index: `<script id="sap-ui-bootstrap" src="https://cdn.example/ui5.js"></script>` }));
    expect(r.status).toBe(1);
    expect(r.out).toMatch(/index\.html/);
    expect(r.out).toMatch(/unpatched/);
  });

  test("App.view.xml: the App element changed", () => {
    const r = run(fixture({ appView: `<mvc:View><App id="mainApp"></App></mvc:View>` }));
    expect(r.status).toBe(1);
    expect(r.out).toMatch(/App\.view\.xml/);
  });

  test("manifest.json: the dataSource moved", () => {
    const r = run(fixture({ manifest: JSON.stringify({ "sap.app": { dataSources: {} } }) }));
    expect(r.status).toBe(1);
    expect(r.out).toMatch(/dataSources\/http not found/);
  });

  test("a missing required file is a failure, not a skip", () => {
    const dir = fixture();
    fs.rmSync(path.join(dir, "view", "App.view.xml"));
    const r = run(dir);
    expect(r.status).toBe(1);
    expect(r.out).toMatch(/does not exist/);
  });
});

describe("the getViewContent assertion", () => {
  // The patch itself is gone: upstream fixed the bug and moved the function.
  // What is left guards against upstream regressing.

  test("passes while upstream reads mProperties", () => {
    const r = run(fixture());
    expect(r.status).toBe(0);
    expect(r.out).toMatch(/no patch needed/);
  });

  test("fails if upstream goes back to getProperty(\"viewContent\")", () => {
    const r = run(fixture({
      tabs: `function getViewContent(view) { return view?.getProperty("viewContent"); }`,
    }));
    expect(r.status).toBe(1);
    expect(r.out).toMatch(/regressed/);
  });

  test("says nothing alarming when upstream restructured harmlessly", () => {
    const r = run(fixture({ tabs: `function somethingElse() { return 1; }` }));
    expect(r.status).toBe(0);
    expect(r.out).toMatch(/restructured/);
  });
});

describe("against the real mirrored upstream", () => {
  const available = fs.existsSync(UPSTREAM);

  (available ? test : test.skip)("patches the actual webapp cleanly and idempotently", () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "patch-fe-real-"));
    fs.cpSync(UPSTREAM, dir, { recursive: true });

    const first = run(dir);
    expect(first.status).toBe(0);
    const second = run(dir);
    expect(second.status).toBe(0);
    expect(second.out).toMatch(/already patched/);
  });
});
