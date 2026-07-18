"use strict";
// Naming rules — require-path mapping for the generated package, JS reserved
// word handling, field-symbol / parameter name normalization and the sy-*
// runtime field defaults.

// Read-only system fields (sy-<field>) that carry a runtime default instead of
// being computed. Emitted as `sy_<field>` references; declared once per method
// (see emitMethod) so transpiled code — mostly test guards like
// `IF sy-sysid = 'ABC'` — resolves them instead of throwing "not defined".
// index / tabix / subrc are handled separately (loop / read-table semantics).
const SY_RUNTIME_FIELDS = {
  sysid: '""', uname: '""', mandt: '"000"', langu: '"E"',
  datum: '""', uzeit: '""', datlo: '""', timlo: '""', zonlo: '""',
  tcode: '""', cprog: '""', repid: '""', host: '""', dbcnt: "0",
};

// ---------------------------------------------------------------------------
// require-path mapping (mirrors the "exports" of cap2UI5's package.json)
// ---------------------------------------------------------------------------

function requirePathFor(className) {
  if (/^z2ui5_cl_demo_/.test(className)) return `./${className}`;
  // sample-tree helpers (context, error) — flattened next to the demo apps
  if (/^z2ui5_(cl|cx)_sample_/.test(className)) return `./${className}`;
  // SAP kernel classes — native shims under srv/z2ui5/00/00 (see abap_rtti.js);
  // a class without a shim fails the assemble load-gate visibly, not silently
  if (/^cl_abap_[a-z0-9_]+$/.test(className)) return `abap2UI5/${className}`;
  if (/^cx_sy_[a-z0-9_]+$/.test(className)) return `abap2UI5/${className}`;
  // kernel exception roots — one shared shim keeps previous/textid + get_text
  if (/^cx_(root|no_check|static_check|dynamic_check)$/.test(className)) return `abap2UI5/cx_root`;
  if (
    /^z2ui5_(cl|cx)_abap2ui5_/.test(className) ||
    /^z2ui5_(cl|cx)_a2ui5_/.test(className) ||
    /^z2ui5_cl_core_/.test(className) ||
    className === "z2ui5_cl_exit" ||
    className === "z2ui5_cl_http_handler" ||
    /^z2ui5_(cl|cx)_srt_?/.test(className) ||
    /^z2ui5_(cl|cx)_ajson/.test(className) ||
    /^z2ui5_if_/.test(className) ||
    /^z2ui5_cl_pop_/.test(className) ||
    /^z2ui5_cl_util/.test(className) ||
    /^z2ui5_cl_app_/.test(className) ||
    className === "z2ui5_cl_xml_view" ||
    className === "z2ui5_cl_xml_view_cc" ||
    className === "z2ui5_cx_util_error" ||
    className === "z2ui5_port"
  ) {
    return `abap2UI5/${className}`;
  }
  return null; // unknown — will be flagged as TODO
}

const JS_RESERVED = new Set(["class", "new", "delete", "function", "var", "let", "const", "switch", "case", "return", "this", "typeof", "in", "of", "do", "if", "else", "for", "while", "void", "with", "yield", "await", "static", "import", "export", "extends", "super", "catch", "try", "finally", "throw", "default", "break", "continue", "instanceof", "null", "true", "false", "enum", "arguments", "interface", "implements", "package", "private", "protected", "public"]);

/** rename identifiers that collide with JS reserved words (class → class_) */
function safeIdent(name) {
  return JS_RESERVED.has(name) ? `${name}_` : name;
}

/** JS name for an ABAP field symbol — `<x>` → `fs_x`. ABAP `<x>` and `x` are
 *  distinct names, so stripping only the brackets can collide. */
function fsIdent(raw) {
  return safeIdent(`fs_${raw.replace(/[<>]/g, "").toLowerCase()}`);
}

/** identifier that may be a plain var or a field symbol */
function varOrFsIdent(raw) {
  return /^<\w+>$/.test(raw) ? fsIdent(raw) : safeIdent(raw.toLowerCase());
}

/** parameter names may carry the ABAP escape prefix: !name */
function paramName(str) {
  return str.replace(/^!/, "").toLowerCase();
}

module.exports = { SY_RUNTIME_FIELDS, requirePathFor, JS_RESERVED, safeIdent, fsIdent, varOrFsIdent, paramName };
