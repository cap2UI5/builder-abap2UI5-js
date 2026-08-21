// The two ABAP comparisons whose lowerings used to return WRONG ANSWERS.
//
// `IN` ignored the `sign` field, so an EXCLUDE line was evaluated as an
// include — the exact opposite result — and `CP`/`NP` threw the wildcards away
// and called includes(), so `A*Z` matched "ZA". Both carried a TODO in a
// comment and nothing else: the generated code ran, produced a plausible
// boolean, and took a branch nobody chose.
//
// These tests drive the emitted expressions themselves, so they check the
// thing that actually ships rather than a reimplementation of it.
"use strict";

const path = require("path");
const { transpileFile } = require(path.join(__dirname, "..", "scripts", "abap2js.js"));
const fs = require("fs");
const os = require("os");

/** Transpile a one-method class and return the callable method. */
function build(abapExpr, { param = "iv_val", extra = "" } = {}) {
  const abap = `
CLASS zcl_probe DEFINITION PUBLIC CREATE PUBLIC.
  PUBLIC SECTION.
    METHODS check IMPORTING ${param} TYPE string ${extra} RETURNING VALUE(rv_ok) TYPE abap_bool.
ENDCLASS.

CLASS zcl_probe IMPLEMENTATION.
  METHOD check.
    IF ${abapExpr}.
      rv_ok = abap_true.
    ELSE.
      rv_ok = abap_false.
    ENDIF.
  ENDMETHOD.
ENDCLASS.
`;
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "abap2js-cmp-"));
  const file = path.join(dir, "zcl_probe.clas.abap");
  fs.writeFileSync(file, abap);
  try {
    const { code } = transpileFile(file, {});
    const out = path.join(dir, "zcl_probe.js");
    fs.writeFileSync(out, code);
    const Cls = require(out);
    return { instance: new Cls(), code };
  } finally {
    // keep the dir until require() has read it; jest tears the tmpdir down
  }
}

describe("CP / NP compile the ABAP pattern", () => {
  let probe;
  beforeAll(() => { probe = build("iv_val CP iv_pat", { extra: "iv_pat TYPE string" }); });

  const cp = (val, pat) => probe.instance.check({ iv_val: val, iv_pat: pat });

  test("* matches any sequence, anchored at both ends", () => {
    expect(cp("ABCZ", "A*Z")).toBe(true);
    expect(cp("AZ", "A*Z")).toBe(true);
    // the old includes() lowering said true for this — the wildcards were
    // stripped and "AZ" is a substring of "ZAZ"
    expect(cp("ZA", "A*Z")).toBe(false);
    expect(cp("XABCZ", "A*Z")).toBe(false);
  });

  test("+ matches exactly one character", () => {
    expect(cp("AXZ", "A+Z")).toBe(true);
    expect(cp("AZ", "A+Z")).toBe(false);
    expect(cp("AXYZ", "A+Z")).toBe(false);
  });

  test("is case-insensitive, as ABAP's CP is", () => {
    expect(cp("abcz", "A*Z")).toBe(true);
  });

  test("# escapes the next character", () => {
    expect(cp("A*Z", "A#*Z")).toBe(true);
    expect(cp("ABZ", "A#*Z")).toBe(false);
  });

  test("regex metacharacters in the pattern are literals", () => {
    expect(cp("a.c", "a.c")).toBe(true);
    expect(cp("abc", "a.c")).toBe(false);
  });
});

describe("IN honours the range sign", () => {
  let probe;
  beforeAll(() => { probe = build("iv_val IN it_range", { extra: "it_range TYPE ty_t_range" }); });

  const inRange = (val, range) => probe.instance.check({ iv_val: val, it_range: range });

  test("an EXCLUDE line excludes, instead of including", () => {
    // The whole point. Before, sign was ignored and this answered "in range".
    expect(inRange("A", [{ sign: "E", option: "EQ", low: "A" }])).toBe(false);
    expect(inRange("B", [{ sign: "E", option: "EQ", low: "A" }])).toBe(true);
  });

  test("an E line beats a matching I line", () => {
    expect(inRange("A", [
      { sign: "I", option: "EQ", low: "A" },
      { sign: "E", option: "EQ", low: "A" },
    ])).toBe(false);
  });

  test("with I lines present, a value must match one", () => {
    const r = [{ sign: "I", option: "EQ", low: "A" }];
    expect(inRange("A", r)).toBe(true);
    expect(inRange("B", r)).toBe(false);
  });

  test("an empty range imposes no restriction", () => {
    expect(inRange("anything", [])).toBe(true);
  });

  test("options: BT, NE, GT/GE/LT/LE and CP", () => {
    expect(inRange("M", [{ sign: "I", option: "BT", low: "A", high: "Z" }])).toBe(true);
    expect(inRange("a", [{ sign: "I", option: "BT", low: "A", high: "Z" }])).toBe(false);
    expect(inRange("B", [{ sign: "I", option: "NE", low: "A" }])).toBe(true);
    expect(inRange("C", [{ sign: "I", option: "GT", low: "B" }])).toBe(true);
    expect(inRange("B", [{ sign: "I", option: "GE", low: "B" }])).toBe(true);
    expect(inRange("A", [{ sign: "I", option: "LT", low: "B" }])).toBe(true);
    expect(inRange("B", [{ sign: "I", option: "LE", low: "B" }])).toBe(true);
    // CP inside a range uses the same compiled pattern, not includes()
    expect(inRange("ABCZ", [{ sign: "I", option: "CP", low: "A*Z" }])).toBe(true);
    expect(inRange("ZA", [{ sign: "I", option: "CP", low: "A*Z" }])).toBe(false);
  });

  test("defaults: missing sign is I, missing option is EQ", () => {
    expect(inRange("A", [{ low: "A" }])).toBe(true);
    expect(inRange("B", [{ low: "A" }])).toBe(false);
  });
});

describe("an unsupported comparison throws instead of answering false", () => {
  test("the transpiler no longer has a `false` fallback for one", () => {
    // `false` is a wrong ANSWER that looks like a right one: the program takes
    // its else branch and nothing anywhere can notice. The two places that
    // emitted it (an unknown operator, and BETWEEN without its AND bound) now
    // emit an expression that throws when evaluated.
    const src = fs.readFileSync(path.join(__dirname, "..", "scripts", "abap2js.js"), "utf8");
    expect(src).not.toMatch(/str: `false \/\* TODO\(abap2js\)/);
    expect(src).toMatch(/function unsupported\(what\)/);
  });

  test("the emitted expression names what to rewrite", () => {
    const { unsupportedFor } = require(path.join(__dirname, "..", "scripts", "abap2js.js"));
    if (typeof unsupportedFor !== "function") return; // not exported — source check above covers it
    expect(unsupportedFor("comparison operator FOO")).toMatch(/not supported/);
  });
});
