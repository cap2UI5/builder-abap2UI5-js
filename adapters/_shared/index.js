/**
 * adapters/_shared — the parts every adapter needs and none of them should
 * own privately.
 *
 * Each adapter's job is one thing: bind a transport (CAP action, express
 * route, node:http handler) to the engine seam. Everything around that —
 * turning a request into the exit-context `reqInfo`, a throwaway draft store,
 * rendering an ABAP exception as text — is identical in all of them and used
 * to be copy-pasted four times. It lives here instead, so a fix (e.g. adding
 * a field to reqInfo) lands in every adapter at once.
 *
 * Required by relative path (`require("../_shared")`) rather than by package
 * name: the adapters are sibling demo packages, not dependencies of each
 * other.
 */
"use strict";

// Reached by relative path into the core tree rather than by package name:
// this file is not itself inside an adapter, so `require("abap2UI5/…")` would
// resolve from adapters/_shared/ and miss the adapter's own node_modules.
// Every adapter links the same `file:../../core`, so this path is exact.
const z2ui5_identity = require("../../core/srv/z2ui5/z2ui5_identity");

/**
 * The exit-context request info — the same shape
 * z2ui5_cl_util_http.get_req_info() produces, including the identity fields
 * that isolate per-session server state (see z2ui5_identity).
 *
 * @param req   express-style request (method, path, query) OR node:http req
 * @param body  raw request body as string (`` for GET/HEAD)
 */
function reqInfo(req, body) {
  // node:http has no .path/.query — derive both from the raw URL.
  let path = req.path;
  let entries;
  if (path === undefined) {
    const url = new URL(req.url, `http://${req.headers?.host || `localhost`}`);
    path = url.pathname;
    entries = [...url.searchParams];
  } else {
    entries = Object.entries(req.query || {});
  }

  return {
    method:     req.method,
    body:       body || ``,
    path,
    t_params:   entries.map(([n, v]) => ({ n, v: String(v) })),
    session_id: z2ui5_identity.session_key(),
    tenant:     z2ui5_identity.get_tenant(),
  };
}

/**
 * A volatile draft store — the `{load, save}` contract engine.set_store()
 * expects, backed by a Map. Correct for the demo adapters (one process, one
 * user, state dies with the process); the real CAP project swaps in the
 * cap2ui5.z2ui5_t_01 table instead.
 */
function memoryStore() {
  const drafts = new Map();
  return {
    load: (id) => drafts.get(id) || null,
    save: (entry) => { drafts.set(entry.id, entry); },
  };
}

/**
 * Render a thrown value as text. ABAP exceptions carry their message in
 * get_text(); plain JS errors in .message; anything else stringifies.
 */
function errorText(x) {
  return x?.get_text?.() || x?.message || String(x);
}

/** The wire format the webapp expects for a failed roundtrip. */
function errorBody(x) {
  return `abap2UI5 Error:${errorText(x)}`;
}

module.exports = { reqInfo, memoryStore, errorText, errorBody };
