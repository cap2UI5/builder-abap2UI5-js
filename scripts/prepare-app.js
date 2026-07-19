#!/usr/bin/env node
/**
 * prepare-app — step 5: builds the ready-to-serve frontend into run/output/app.
 * Takes run/input/app/webapp 1:1 and applies the two cap2UI5-specific
 * patches (see patch-frontend.js). The assemble step (assemble-core.js) then
 * overlays run/output/app onto the base skeleton like the other output folders.
 *
 * Run `npm run mirror_app` first.
 */
"use strict";

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const root = path.join(__dirname, "..");
const src = path.join(root, "run", "input", "app", "webapp");
const dest = path.join(root, "run", "output", "app");

if (!fs.existsSync(path.join(src, "index.html"))) {
  console.error("run/input/app/webapp not found — run `npm run mirror_app` first");
  process.exit(1);
}

fs.rmSync(dest, { recursive: true, force: true });
fs.mkdirSync(path.dirname(dest), { recursive: true });
fs.cpSync(src, dest, { recursive: true });
execSync(`node ${JSON.stringify(path.join(__dirname, "patch-frontend.js"))} ${JSON.stringify(dest)}`, { stdio: "inherit" });
console.log(`run/output/app prepared from run/input/app/webapp`);
