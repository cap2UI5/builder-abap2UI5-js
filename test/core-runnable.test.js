/**
 * The assembled core must answer one roundtrip. Not "load" — ANSWER.
 *
 * WHY THIS EXISTS
 * ---------------
 * assemble-core.js has a load gate: every fill-in must `require()`. That
 * catches a module with a syntax error or a missing dependency, and it caught
 * real ones. It cannot catch a module that loads perfectly and then does not
 * work, which is the failure this repository actually shipped into:
 *
 *   npm run build_core   # green, publishes 325 files
 *   → the very first roundtrip never returns
 *
 * Diagnosis, for whoever hits this again: the freshly transpiled
 * z2ui5_cl_ui5_view_builder reaches a dynamic `CALL METHOD (`CONVERT`)` in
 * z2ui5_cl_ui5_util_context, which is the RTTI path AGENTS.md records as
 * permanently unimplementable in this port. stringify() therefore throws, the
 * handler retries, and the retry is synchronous — so the process does not
 * crash with that error, it spins. A hang is the worst possible shape for this:
 * `npm test` looks slow rather than broken, CI burns its whole timeout, and the
 * log ends with no failure to read.
 *
 * The nightly's "only commit core/ on green" rule then froze core/ at the last
 * good build, which is correct behaviour and also why nothing was obviously
 * red: the published package kept working while the repository lost the ability
 * to rebuild it.
 *
 * SHAPE
 * -----
 * Runs in a CHILD PROCESS with a hard timeout, because the failure mode is a
 * hang: an in-process `await` would take jest's whole timeout down with it and
 * report nothing useful. A timeout here is a FAILURE, never a skip.
 */
const { spawnSync } = require("child_process");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const LIMIT_MS = Number(process.env.Z2UI5_RUNGATE_TIMEOUT_MS || 20000);

// Deliberately the smallest app in the package: one input, one button. If
// hi_world cannot render, nothing can, and a failure here needs no triage.
const PROBE = `
  const engine = require(${JSON.stringify(path.join(ROOT, "core", "srv", "z2ui5", "engine.js"))});
  const { reqInfo, memoryStore } = require(${JSON.stringify(path.join(ROOT, "adapters", "_shared"))});
  engine.set_store(memoryStore());
  const body = { S_FRONT: { ID: "", APP: "z2ui5_cl_ui5_app_hi_world", EVENT: "",
    T_EVENT_ARG: [], ORIGIN: "http://127.0.0.1", PATHNAME: "/rest/root/z2ui5",
    SEARCH: "?app_start=z2ui5_cl_ui5_app_hi_world", HASH: "", CONFIG: {} }, XX: {}, MODEL: {} };
  const req = { method: "POST", path: "/rest/root/z2ui5", query: {}, headers: {} };
  engine.roundtrip(body, reqInfo(req, JSON.stringify({ value: body })))
    .then((r) => {
      const s = typeof r === "string" ? r : JSON.stringify(r);
      if (!s || s.length < 50) { console.error("EMPTY_RESPONSE " + s); process.exit(3); }
      process.stdout.write(s.slice(0, 400));
      process.exit(0);
    })
    .catch((e) => { console.error("THREW " + (e && e.message)); process.exit(4); });
`;

describe("the assembled core answers a roundtrip", () => {
  jest.setTimeout(LIMIT_MS + 15000);

  test("hi_world renders without hanging or throwing", () => {
    const res = spawnSync(process.execPath, ["-e", PROBE], {
      encoding: "utf8",
      timeout: LIMIT_MS,
      killSignal: "SIGKILL",
      cwd: ROOT,
    });

    if (res.error?.code === "ETIMEDOUT" || res.signal === "SIGKILL") {
      throw new Error(
        `the roundtrip did not return within ${LIMIT_MS}ms — the core HANGS.\n` +
          `This is the documented failure above: a dynamic CALL METHOD the port\n` +
          `cannot resolve, thrown inside a synchronous retry. Reproduce with:\n` +
          `  node -e '<the probe in ${path.relative(ROOT, __filename)}>'\n` +
          `stderr: ${(res.stderr || "").slice(0, 2000)}`
      );
    }
    if (res.status !== 0) {
      throw new Error(`the roundtrip failed (exit ${res.status}):\n${(res.stderr || "").slice(0, 2000)}`);
    }
    expect(res.stdout).toContain("S_FRONT");
  });
});
