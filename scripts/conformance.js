#!/usr/bin/env node
/**
 * conformance — diff this port's WIRE ANSWERS against real abap2UI5.
 *
 * WHY THIS EXISTS
 * ---------------
 * Every gate in this repo measures the port against the ABAP *source*: the
 * upstream-units ratchet transpiles upstream testclasses and runs them,
 * check-port-drift hashes the ABAP a hand-port shadows. Both answer "does our
 * code resemble theirs?". Neither answers the only question a user has: **does
 * a roundtrip come back the same?**
 *
 * That gap is not academic. 69% of the framework core is a hand-written
 * reimplementation, not a transpile — for those classes the unit ratchet is
 * measuring a translation that was never attempted, which is why 72 of its 131
 * entries are categorised `port-deviation` and simply carried. Meanwhile the
 * contract that actually binds — the JSON roundtrip the unchanged upstream
 * webapp speaks — had no gate at all. The webapp is mirrored 1:1 from upstream,
 * so it is the *protocol* that has to match; whether z2ui5_cl_ui5_srv_model
 * internally looks like its ABAP is the port's own business.
 *
 * THE ORACLE
 * ----------
 * Upstream ships a complete abap2UI5 on Node: `npm run express` runs the real
 * ICF handler through the official @abaplint transpiler over open-abap-core,
 * backed by SQLite. That is a REFERENCE IMPLEMENTATION, not an approximation —
 * it executes the same ABAP the SAP system does. This script drives it and the
 * local engine through identical roundtrip sequences and diffs the responses.
 *
 * Producing the reference (see also scripts/oracle-classify.js, which uses the
 * same build for the unit oracle):
 *
 *   cd /path/to/abap2UI5            # a SCRATCH COPY — auto_downport rewrites src/
 *   npm ci && npm run deps
 *   npm run auto_downport && npm run auto_transpile
 *   PORT=3000 npm run express
 *
 * Then:
 *
 *   node scripts/conformance.js --ref http://127.0.0.1:3000
 *   node scripts/conformance.js --ref http://127.0.0.1:3000 --json   # report
 *   node scripts/conformance.js --ref … --update                     # baseline
 *
 * WHAT IT DOES NOT DO
 * -------------------
 * It does not compare rendered pixels, and it does not claim the two stacks are
 * interchangeable. It compares the response envelope the webapp consumes, field
 * by field, after normalising the values that are volatile BY CONSTRUCTION
 * (draft uuids, timestamps). Everything else is a difference somebody chose,
 * and belongs in the baseline with a reason or in a fix.
 */
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const SCENARIOS = path.join(ROOT, "test", "conformance.scenarios.json");
const BASELINE = path.join(ROOT, "test", "conformance.baseline.json");

const argv = process.argv.slice(2);
const has = (f) => argv.includes(f);
const opt = (f, d) => {
  const i = argv.indexOf(f);
  return i >= 0 && argv[i + 1] ? argv[i + 1] : d;
};

const REF = opt("--ref", process.env.Z2UI5_CONFORMANCE_REF || "");
const JSON_OUT = has("--json");
const UPDATE = has("--update");
const TIMEOUT = Number(process.env.Z2UI5_CONFORMANCE_TIMEOUT_MS || 15000);

// ---------------------------------------------------------------------------
// normalisation
//
// Only values that CANNOT match are rewritten, and each one is rewritten to a
// token that still distinguishes "same value twice" from "two values" — a
// blanket delete would hide a real defect (e.g. the port reusing a draft id
// where upstream mints a fresh one, which is a correctness bug, not noise).
// ---------------------------------------------------------------------------

const UUID = /\b[0-9a-f]{8}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{12}\b/gi;
/** ABAP GUID_32 / raw16 hex, as the ABAP side mints them (upper case, no dashes). */
const HEX32 = /\b[0-9A-F]{32}\b/g;
const ISO_TS = /\b\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}:\d{2}(\.\d+)?Z?\b/g;
/** ABAP timestamp literals: 20260917123001 and the packed 7-decimal form. */
const ABAP_TS = /\b20\d{12}(\.\d{1,7})?\b/g;

/**
 * Replace each volatile literal with `<kind:n>`, numbered in order of first
 * appearance WITHIN one side. Identical ids therefore normalise identically on
 * both sides, and a side that emits two distinct ids where the other emits one
 * still differs.
 */
function normalise(value) {
  const seen = new Map();
  const token = (kind, raw) => {
    const key = `${kind}:${raw}`;
    if (!seen.has(key)) seen.set(key, `<${kind}:${seen.size}>`);
    return seen.get(key);
  };
  const str = (s) =>
    s
      .replace(UUID, (m) => token("uuid", m.toLowerCase().replace(/-/g, "")))
      .replace(HEX32, (m) => token("uuid", m.toLowerCase()))
      .replace(ISO_TS, (m) => token("ts", m))
      .replace(ABAP_TS, (m) => token("ts", m));

  const walk = (v) => {
    if (typeof v === "string") return str(v);
    if (Array.isArray(v)) return v.map(walk);
    if (v && typeof v === "object") {
      const out = {};
      for (const k of Object.keys(v).sort()) out[k] = walk(v[k]);
      return out;
    }
    return v;
  };
  return walk(value);
}

// ---------------------------------------------------------------------------
// structural diff
// ---------------------------------------------------------------------------

/** Every leaf difference between two normalised values, as JSON-path strings. */
function diff(a, b, at = "", out = []) {
  const ta = a === null ? "null" : Array.isArray(a) ? "array" : typeof a;
  const tb = b === null ? "null" : Array.isArray(b) ? "array" : typeof b;

  if (ta !== tb) {
    out.push({ path: at || "$", ref: brief(a), sub: brief(b), kind: "type" });
    return out;
  }
  if (ta === "array") {
    if (a.length !== b.length) {
      out.push({ path: `${at}.length`, ref: a.length, sub: b.length, kind: "length" });
    }
    for (let i = 0; i < Math.min(a.length, b.length); i++) diff(a[i], b[i], `${at}[${i}]`, out);
    return out;
  }
  if (ta === "object") {
    for (const k of new Set([...Object.keys(a), ...Object.keys(b)])) {
      if (!(k in a)) out.push({ path: `${at}.${k}`, ref: "(absent)", sub: brief(b[k]), kind: "extra" });
      else if (!(k in b)) out.push({ path: `${at}.${k}`, ref: brief(a[k]), sub: "(absent)", kind: "missing" });
      else diff(a[k], b[k], `${at}.${k}`, out);
    }
    return out;
  }
  if (a !== b) out.push({ path: at || "$", ref: brief(a), sub: brief(b), kind: "value" });
  return out;
}

function brief(v) {
  const s = typeof v === "string" ? v : JSON.stringify(v);
  if (s === undefined) return String(v);
  return s.length > 220 ? `${s.slice(0, 220)}…` : s;
}

/**
 * Two long strings, excerpted around where they FIRST differ.
 *
 * brief() truncates from the start, which for a view is exactly the wrong end:
 * two views share a long identical prefix (the namespace declarations), so a
 * head excerpt shows two identical strings and hides the difference it was
 * printed to show. That happened on the first run — `hi_world`'s button reads
 * "Post" upstream and "Send" here, 500 characters in, and the report showed
 * neither.
 */
function excerptDelta(a, b, pad = 90) {
  const [x, y] = [String(a), String(b)];
  let i = 0;
  while (i < x.length && i < y.length && x[i] === y[i]) i++;
  const from = Math.max(0, i - pad);
  const cut = (s) => `${from > 0 ? "…" : ""}${s.slice(from, i + pad)}${i + pad < s.length ? "…" : ""}`;
  return { at: i, ref: cut(x), sub: cut(y) };
}

// ---------------------------------------------------------------------------
// the two sides
// ---------------------------------------------------------------------------

/** One roundtrip against the upstream reference server, over HTTP. */
async function askReference(body) {
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), TIMEOUT);
  try {
    const res = await fetch(`${REF.replace(/\/$/, "")}/sap/bc/z2ui5`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: ac.signal,
    });
    const text = await res.text();
    try {
      return JSON.parse(text);
    } catch {
      throw new Error(`reference returned non-JSON (HTTP ${res.status}): ${text.slice(0, 300)}`);
    }
  } finally {
    clearTimeout(t);
  }
}

/**
 * One roundtrip against the local engine, IN PROCESS.
 *
 * No HTTP server: the transport is the adapters' business and is covered by
 * test/adapters.test.js. What this gate is about is the engine's answer, so it
 * calls the same seam every adapter calls and nothing else can colour the
 * result.
 */
function makeSubject() {
  const engine = require(path.join(ROOT, "core", "srv", "z2ui5", "engine.js"));
  const { reqInfo, memoryStore } = require(path.join(ROOT, "adapters", "_shared"));
  engine.set_store(memoryStore());
  return async (body) => {
    const raw = JSON.stringify(body);
    const req = { method: "POST", path: "/rest/root/z2ui5", query: {}, headers: {} };
    const json = await engine.roundtrip(body.value ?? body, reqInfo(req, raw));
    return typeof json === "string" ? JSON.parse(json) : json;
  };
}

// ---------------------------------------------------------------------------
// scenario driver
// ---------------------------------------------------------------------------

/** The request envelope, with the fields a browser would supply held constant. */
function envelope(scenario, step, prevId) {
  return {
    value: {
      S_FRONT: {
        ID: prevId || "",
        APP: step.app || scenario.app || "",
        EVENT: step.event || "",
        T_EVENT_ARG: step.args || [],
        R_EVENT_DATA: step.data ?? null,
        ORIGIN: "http://127.0.0.1",
        PATHNAME: "/rest/root/z2ui5",
        SEARCH: scenario.search ?? `?app_start=${scenario.app}`,
        HASH: "",
        CONFIG: {},
      },
      XX: step.xx || {},
      MODEL: step.model || {},
    },
  };
}

/** The id a response hands to the next step. */
function idOf(res) {
  return res?.S_FRONT?.ID || res?.PARAMS?.ID || "";
}

/**
 * The view XML each side rendered, per slot — pulled out of whichever envelope
 * that side uses.
 *
 * WHY THIS IS SEPARATE FROM THE STRUCTURAL DIFF
 * --------------------------------------------
 * The structural diff stops at the first differing node. While the port emits
 * `S_FRONT.PARAMS` and upstream emits `S_FRONT.S_ACTION`, that node is the
 * whole payload — so the diff reports two opaque subtrees and never descends
 * into the view. The first run of this gate reported 18 differences and NONE
 * of them were about view content, while `hi_world`'s button plainly says
 * "Send" here and "Post" upstream. An envelope mismatch was hiding every
 * difference inside it, which is the failure mode where a gate reports a
 * number that goes DOWN as the real divergence goes up.
 *
 * Extracting the views by slot compares the thing an app author actually
 * writes, independently of how it is wrapped — so this half keeps working
 * through the envelope migration instead of being blocked by it.
 */
function extractViews(res) {
  const out = {};
  // Current upstream shape: ordered action rows [event, method, slot, payload].
  for (const row of res?.S_FRONT?.S_ACTION?.T_SYSTEM || []) {
    if (Array.isArray(row) && row[0] === "VIEW_SLOTS" && typeof row[3] === "string") {
      out[`${row[2] || "MAIN"}`] = row[3];
    }
  }
  // Superseded shape this port still emits — one record per slot.
  const p = res?.S_FRONT?.PARAMS;
  if (p) {
    const slots = { S_VIEW: "MAIN", S_VIEW_NEST: "NEST", S_VIEW_NEST2: "NEST2", S_POPUP: "POPUP", S_POPOVER: "POPOVER" };
    for (const [key, slot] of Object.entries(slots)) {
      if (p[key]?.XML) out[slot] = p[key].XML;
    }
  }
  return out;
}

async function runSide(scenario, ask) {
  const steps = [];
  let id = "";
  for (const step of scenario.steps) {
    let res;
    try {
      res = await ask(envelope(scenario, step, id));
    } catch (e) {
      res = { __error: String(e.message || e) };
    }
    id = idOf(res) || id;
    steps.push(res);
  }
  return steps;
}

// ---------------------------------------------------------------------------
// main
// ---------------------------------------------------------------------------

async function main() {
  if (!REF) {
    console.error(
      "conformance: no reference server.\n" +
        "  Pass --ref <url> or set Z2UI5_CONFORMANCE_REF.\n" +
        "  See the header of this file for how to build and start one."
    );
    process.exit(2);
  }

  const scenarios = JSON.parse(fs.readFileSync(SCENARIOS, "utf8")).scenarios;
  const subject = makeSubject();

  const mismatches = {};
  const perScenario = [];
  let compared = 0;

  for (const sc of scenarios) {
    const [ref, sub] = [await runSide(sc, askReference), await runSide(sc, subject)];
    const found = [];
    for (let i = 0; i < sc.steps.length; i++) {
      const label = sc.steps[i].name || `step${i}`;
      const record = (path, one) => {
        const key = `${sc.name}::${label}::${path}`;
        mismatches[key] = one;
        found.push(key);
      };

      // (1) the whole envelope
      for (const one of diff(normalise(ref[i]), normalise(sub[i]), "")) record(one.path, one);

      // (2) the view XML per slot, envelope-independently — see extractViews().
      // Compared as whole strings: a view is one artefact, and a character
      // difference anywhere in it is one thing to look at, not N.
      const [rv, sv] = [extractViews(ref[i]), extractViews(sub[i])];
      for (const slot of new Set([...Object.keys(rv), ...Object.keys(sv)])) {
        if (rv[slot] === sv[slot]) continue;
        const both = slot in rv && slot in sv;
        const d = both ? excerptDelta(rv[slot], sv[slot]) : null;
        record(`view:${slot}`, {
          path: `view:${slot}`,
          kind: !(slot in sv) ? "missing" : !(slot in rv) ? "extra" : "value",
          ...(d
            ? { at: d.at, ref: d.ref, sub: d.sub }
            : { ref: brief(rv[slot] ?? "(absent)"), sub: brief(sv[slot] ?? "(absent)") }),
        });
      }
      compared++;
    }
    perScenario.push({ name: sc.name, steps: sc.steps.length, mismatches: found.length });
    if (!JSON_OUT) {
      const mark = found.length ? `${String(found.length).padStart(3)} diff` : "     ok";
      console.log(`  ${mark}  ${sc.name}`);
    }
  }

  const report = { reference: REF, scenarios: perScenario, compared, mismatches };

  if (UPDATE) {
    const known = fs.existsSync(BASELINE) ? JSON.parse(fs.readFileSync(BASELINE, "utf8")) : { entries: {} };
    const entries = {};
    for (const key of Object.keys(mismatches).sort()) {
      entries[key] = known.entries?.[key] || {
        why: "TODO: explain this difference, or fix it and delist the entry",
        ref: mismatches[key].ref,
        sub: mismatches[key].sub,
      };
    }
    fs.writeFileSync(
      BASELINE,
      JSON.stringify(
        {
          _comment:
            "Known wire differences between this port and upstream abap2UI5 running on " +
            "open-abap (scripts/conformance.js). A NEW key is a regression; a key that " +
            "no longer reproduces must be delisted. Every entry needs a `why` that says " +
            "whether the difference is intended — an unexplained entry is a bug with a " +
            "green build in front of it. Regenerate with --update, then write the reasons.",
          entries,
        },
        null,
        2
      ) + "\n"
    );
    console.log(`\nbaseline written → ${path.relative(ROOT, BASELINE)} (${Object.keys(entries).length} entries)`);
  }

  if (JSON_OUT) {
    process.stdout.write(JSON.stringify(report, null, 2) + "\n");
  } else {
    console.log(`\n${compared} responses compared, ${Object.keys(mismatches).length} differing field(s)`);
  }
  return report;
}

if (require.main === module) {
  main().catch((e) => {
    console.error(`conformance: ${e.message}`);
    process.exit(1);
  });
}

module.exports = { normalise, diff };
