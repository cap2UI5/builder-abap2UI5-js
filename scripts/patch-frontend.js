#!/usr/bin/env node
/**
 * patch-frontend — applies the few cap2UI5-specific changes to a freshly
 * mirrored abap2UI5 frontend, so no stored copies ("backup" files) are
 * needed and everything else keeps flowing 1:1 from upstream:
 *
 *   index.html    bootstrap src:  resources/sap-ui-core.js  →  /resources/…
 *                 (the CAP server ships a local UI5 runtime at /resources,
 *                 served from the openui5-dist dependency — see srv/server.js)
 *   manifest.json dataSources.http.uri:  /sap/bc/z2ui5  →  /rest/root/z2ui5
 *                 (the CDS REST action instead of the abap ICF path)
 *   view/App.view.xml
 *                 an initial placeholder page, so sap.m.NavContainer does not
 *                 log "page stack is empty" three times on every start.
 *
 * Idempotent — running it on an already patched webapp changes nothing.
 *
 * A patch that cannot find what it was written against FAILS. It used to warn
 * and exit 0, which is indistinguishable from "already patched" — and that is
 * not theoretical: the getViewContent patch targeted core/DebugTool.js, which
 * upstream moved, so it shipped unapplied and green until this was fixed.
 * (Upstream had also fixed the underlying bug; that patch is now an assertion
 * that the fix is still there.)
 *
 * Usage: node scripts/patch-frontend.js <path/to/webapp>
 */
"use strict";

const fs = require("fs");
const path = require("path");

// The CAP server ships its own local UI5 runtime at /resources (see
// srv/server.js — served from the openui5-dist dependency), so bootstrap from
// there instead of a public CDN. This keeps the whole stack offline-capable.
const UI5_SRC = "/resources/sap-ui-core.js";
const DATA_SOURCE_URI = "/rest/root/z2ui5";

const webapp = process.argv[2];
if (!webapp || !fs.existsSync(path.join(webapp, "index.html"))) {
  console.error("usage: node scripts/patch-frontend.js <path/to/webapp>");
  process.exit(1);
}

/**
 * Apply one patch, and refuse to confuse "nothing to do" with "could not find
 * it".
 *
 * Every patch here matched upstream text with a regex or an exact literal, and
 * on a miss simply left the file alone — printing "already patched", which is
 * the same thing it prints on a genuine no-op. So when upstream reindented
 * DebugTool.js or renamed an attribute in index.html, this script reported
 * success and shipped an unpatched frontend: a bootstrap pointing at a CDN
 * that CSP blocks, or a dataSource pointing at the ABAP ICF path that does not
 * exist in CAP. The app boots to a blank shell and the build is green.
 *
 * `isApplied` is what tells the two apart. A patch is only allowed to do
 * nothing when the END STATE is already there.
 *
 * @param {string} label      what to call this patch in the log
 * @param {string} file       absolute path
 * @param {(text: string) => boolean} isApplied  is the desired end state present?
 * @param {(text: string) => string}  apply      produce the patched text
 * @param {boolean} [optional] a file that upstream may legitimately not ship
 */
function patch(label, file, isApplied, apply, optional = false) {
  if (!fs.existsSync(file)) {
    if (optional) {
      console.log(`${label}: not present — skipped`);
      return;
    }
    failures.push(`${label}: ${path.relative(webapp, file)} does not exist`);
    return;
  }

  const before = fs.readFileSync(file, "utf8");
  if (isApplied(before)) {
    console.log(`${label}: already patched`);
    return;
  }

  const after = apply(before);
  if (after === before || !isApplied(after)) {
    // The upstream shape this patch was written against is gone. Saying so is
    // the whole point: the alternative is a frontend that ships unpatched.
    failures.push(
      `${label}: upstream text not found — the patch matched nothing and the ` +
      `result is not in the expected end state. Upstream probably changed this ` +
      `file; re-check the patch (or drop it, if upstream fixed the issue).`,
    );
    return;
  }

  fs.writeFileSync(file, after);
  console.log(`${label}: patched`);
}

const failures = [];

// index.html — point the bootstrap at the local /resources runtime.
//
// NOTE: the bootstrap config attributes are deliberately left in the upstream
// lowercase form (data-sap-ui-oninit / -resourceroots / -compatversion /
// -frameoptions). The hyphenated form (data-sap-ui-on-init, …) was only
// introduced around UI5 1.120, and the local runtime we ship (openui5-dist,
// currently 1.113) does not recognise it — hyphenating here made
// ComponentSupport's on-init never fire, so the app booted a blank shell.
// The lowercase form works on every version.
patch(
  "index.html   ",
  path.join(webapp, "index.html"),
  (t) => t.includes(`src="${UI5_SRC}"`),
  (t) => t.replace(/src="[^"]*resources\/sap-ui-core\.js"/, `src="${UI5_SRC}"`),
);

// view/App.view.xml — give the empty shell App an initial placeholder page.
// The root App control renders before the first backend roundtrip returns a
// view; with zero pages sap.m.NavContainer logs "page stack is empty but
// should have been initialized" (3x) to the console on every start. The
// placeholder is dropped by the regular removeAllPages()+insertPage() cycle
// as soon as the first real view arrives (View1.controller displayView).
patch(
  "App.view.xml ",
  path.join(webapp, "view", "App.view.xml"),
  (t) => /<App id="app">\s*<Page showHeader="false"\s*\/>/.test(t),
  (t) => t.replace(/(<App id="app">)\s*(<\/App>)/, `$1<Page showHeader="false"/>$2`),
);

// manifest.json — point the data source at the CDS REST endpoint. Structured
// rather than textual, so it gets its own shape: a missing dataSource is an
// upstream restructure and must stop the build, not be patched around.
const manifestPath = path.join(webapp, "manifest.json");
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const http = manifest["sap.app"]?.dataSources?.http;
if (!http) {
  failures.push("manifest.json: sap.app/dataSources/http not found — upstream structure changed, adjust this script");
} else if (http.uri === DATA_SOURCE_URI) {
  console.log("manifest.json: already patched");
} else {
  http.uri = DATA_SOURCE_URI;
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
  console.log(`manifest.json: patched -> ${DATA_SOURCE_URI}`);
}

// getViewContent — no longer patched, because UPSTREAM FIXED IT.
//
// This used to rewrite `core/DebugTool.js`, whose getViewContent() called
// getProperty("viewContent") — a special setting on current UI5, so it throws
// and the DevTools View tab shows nothing. Upstream has since moved the
// function to devtools/Tabs.js AND made it read mProperties directly, with the
// same reasoning the patch carried.
//
// Worth knowing how that was discovered: the patch matched an exact,
// whitespace-sensitive literal at a path that no longer exists, and on a miss
// the old script printed a warning and exited 0. So from the day upstream
// moved the file, this shipped unapplied and green. Making a miss a failure
// surfaced it on the first run.
//
// What replaces it is an assertion, not a patch. If upstream ever regresses to
// getProperty("viewContent"), that is a real defect for us and the build
// should say so rather than silently shipping a broken View tab.
const tabsPath = path.join(webapp, "devtools", "Tabs.js");
if (fs.existsSync(tabsPath)) {
  const tabs = fs.readFileSync(tabsPath, "utf8");
  if (tabs.includes("mProperties?.viewContent")) {
    console.log("Tabs.js      : upstream reads mProperties — no patch needed");
  } else if (/getViewContent[\s\S]{0,200}getProperty\("viewContent"\)/.test(tabs)) {
    failures.push(
      "devtools/Tabs.js: getViewContent() is back to getProperty(\"viewContent\"), which " +
      "throws on current UI5 and blanks the DevTools View tab. Upstream regressed a fix " +
      "it had made; reinstate the mProperties fallback patch here.",
    );
  } else {
    console.log("Tabs.js      : getViewContent not recognised — upstream restructured (harmless, no patch applies)");
  }
}

// A patch that could not find what it was written against means the frontend
// ships UNPATCHED: a bootstrap pointing at a CDN that CSP blocks, or a
// dataSource pointing at the ABAP ICF path CAP does not serve. The app boots
// to a blank shell. That must not be a warning.
if (failures.length) {
  console.error(`\npatch-frontend: ${failures.length} patch(es) could not be applied —\n`);
  for (const f of failures) console.error(`  - ${f}`);
  console.error(`\nThe frontend would ship unpatched and boot to a blank shell.`);
  process.exit(1);
}
