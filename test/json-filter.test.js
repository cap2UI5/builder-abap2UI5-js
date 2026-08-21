// z2ui5_cl_util_json_fltr — the shipped empty-value ajson filter.
//
// It never worked. The file was raw transpiler output nobody finished:
// keep_node() declared no parameters while using the ABAP importing names
// (iv_visit, is_node), assigned to an undeclared rv_keep, and returned nothing.
// In strict mode every call was a ReferenceError; on the happy path it would
// have answered `undefined`, which ajson reads as "drop this node" — so the
// filter whose job is to remove empty values would have removed the document.
//
// Nothing called it, which is why nothing noticed: z2ui5_cl_ajson_filter_lib
// carries a working equivalent and z2ui5_cl_ui5_handler a second one. But it
// is exported as abap2UI5/z2ui5_cl_util_json_fltr, i.e. public API, so it now
// does what it always claimed to — and these tests hold it to that.
"use strict";

const path = require("path");

const CORE = path.join(__dirname, "..", "core", "srv", "z2ui5");
const fltr = require(path.join(CORE, "00", "03", "z2ui5_cl_util_json_fltr.js"));
const FILTER = require(path.join(CORE, "00", "01", "z2ui5_if_ajson_filter.js"));
const TYPES = require(path.join(CORE, "00", "01", "z2ui5_if_ajson_types.js"));

const VALUE = FILTER.visit_type.value;
const CLOSE = FILTER.visit_type.close;
const NT = TYPES.node_type;

const keep = (node, visit) => fltr.create_no_empty_values().keep_node({ is_node: node, iv_visit: visit });

describe("values", () => {
  test("drops the empty string, keeps a filled one", () => {
    expect(keep({ type: NT.string, value: "" }, VALUE)).toBe(false);
    expect(keep({ type: NT.string, value: "x" }, VALUE)).toBe(true);
  });

  test("drops zero, keeps any other number — including a negative", () => {
    expect(keep({ type: NT.number, value: "0" }, VALUE)).toBe(false);
    expect(keep({ type: NT.number, value: "1" }, VALUE)).toBe(true);
    expect(keep({ type: NT.number, value: "-1" }, VALUE)).toBe(true);
  });

  test("drops false, keeps true", () => {
    expect(keep({ type: NT.boolean, value: "false" }, VALUE)).toBe(false);
    expect(keep({ type: NT.boolean, value: "true" }, VALUE)).toBe(true);
  });

  test("keeps a node type it does not recognise", () => {
    // Dropping the unknown would silently delete data; keeping it is the only
    // safe default for a filter.
    expect(keep({ type: "something-new", value: "" }, VALUE)).toBe(true);
  });
});

describe("containers", () => {
  test("on close, survives only if something inside did", () => {
    expect(keep({ type: NT.object, children: 0 }, CLOSE)).toBe(false);
    expect(keep({ type: NT.object, children: 2 }, CLOSE)).toBe(true);
    expect(keep({ type: NT.array, children: 1 }, CLOSE)).toBe(true);
  });

  test("children arriving as a string still counts", () => {
    // ajson carries counts as ABAP numerics, which reach JS as strings.
    expect(keep({ type: NT.object, children: "0" }, CLOSE)).toBe(false);
    expect(keep({ type: NT.object, children: "3" }, CLOSE)).toBe(true);
  });

  test("on open, keeps — the children have not been visited yet", () => {
    // Deciding here would drop every container before its contents are known.
    expect(keep({ type: NT.object, children: 0 }, FILTER.visit_type.open)).toBe(true);
  });
});

describe("the contract ajson actually calls with", () => {
  test("iv_visit defaults to `value`", () => {
    const f = fltr.create_no_empty_values();
    expect(f.keep_node({ is_node: { type: NT.string, value: "" } })).toBe(false);
    expect(f.keep_node({ is_node: { type: NT.string, value: "x" } })).toBe(true);
  });

  test("always answers a real boolean, never undefined", () => {
    // The original returned undefined for every input, which ajson reads as
    // "drop". Anything falsy-but-not-false would resurrect that bug.
    for (const node of [
      { type: NT.string, value: "" },
      { type: NT.number, value: "0" },
      { type: NT.object, children: 0 },
      null,
    ]) {
      for (const visit of [VALUE, CLOSE, FILTER.visit_type.open, undefined]) {
        expect(typeof keep(node, visit)).toBe("boolean");
      }
    }
  });

  test("create_no_empty_values returns a usable filter each time", () => {
    const a = fltr.create_no_empty_values();
    const b = fltr.create_no_empty_values();
    expect(a).not.toBe(b);
    expect(typeof a.keep_node).toBe("function");
  });
});
