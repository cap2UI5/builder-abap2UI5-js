/**
 * Report reuse for the two heavy gates (upstream units, apps smoke).
 *
 * Both gates work off a JSON report produced by a script that takes tens of
 * seconds. The nightly pipeline needs the same two reports one step earlier,
 * for scripts/ratchet-update.js — so without this helper every pipeline run
 * produces each report TWICE and pays for it twice.
 *
 * The reuse is opt-in and explicit: only when Z2UI5_REPORTS_DIR names a
 * directory holding a fresh report does a gate skip its own run. Setting that
 * variable is the caller asserting "I just generated these, against this
 * exact tree" — which the pipeline can honestly claim and a developer running
 * `npm test` by hand cannot. There is deliberately no timestamp heuristic:
 * guessing at freshness is how a gate ends up silently validating a stale
 * report, which is worse than the duplicate work it would save.
 */
const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..", "..");

/** Where ratchet-update.js drops its reports, when asked to. */
function reportsDir() {
  const dir = process.env.Z2UI5_REPORTS_DIR;
  return dir ? path.resolve(ROOT, dir) : null;
}

/**
 * The report named `name` ("units" | "smoke"): reused when the pipeline
 * pre-generated it, otherwise produced now by running `script`.
 *
 * @param {string} name    report basename
 * @param {string} script  script under scripts/ that emits it on --json
 * @param {string[]} before scripts to run first (e.g. transpile-tests)
 */
function loadReport(name, script, before = []) {
  const dir = reportsDir();
  if (dir) {
    const file = path.join(dir, `${name}.json`);
    if (fs.existsSync(file)) {
      return JSON.parse(fs.readFileSync(file, "utf8"));
    }
  }

  for (const s of before) {
    execFileSync(process.execPath, [path.join(ROOT, "scripts", s)], { stdio: "pipe" });
  }
  const out = execFileSync(process.execPath, [path.join(ROOT, "scripts", script), "--json"], {
    encoding: "utf8",
    timeout: 280000,
    maxBuffer: 64 * 1024 * 1024,
    stdio: ["ignore", "pipe", "ignore"],
  });
  return JSON.parse(out);
}

module.exports = { loadReport, reportsDir };
