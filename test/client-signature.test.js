// The ABAP→JS calling convention for every transpiled app is decided by
// clientSignature(): whether a client method takes positional arguments or a
// single options object, and in which order. Get it wrong for one method and
// every app calling that method breaks AT RUNTIME — past the parse gate, past
// the load gate, in a sample nobody smoke-tests.
//
// It used to be one regex anchored on exactly two leading spaces. Reformat the
// client port and a method silently vanished from the map; give a parameter a
// default containing `)` and the parameter list was truncated. It is a
// brace/paren-balanced scan now, which depends on the code's structure rather
// than its layout — and this file is what keeps the scan honest, by REQUIRING
// the real class and asking the runtime what is actually there.
//
// The parser cannot do that itself: it runs before assemble_core, so the
// client's `abap2UI5/…` imports do not resolve yet. Jest resolves them, so the
// cross-check belongs here.
"use strict";

const fs = require("fs");
const path = require("path");
const { parseClassMethods } = require("../scripts/abap2js.js");

const CLIENT_SRC = path.join(__dirname, "..", "src", "srv", "z2ui5", "01", "02", "z2ui5_cl_ui5_client.js");
const parsed = new Map(parseClassMethods(fs.readFileSync(CLIENT_SRC, "utf8")));

describe("the parser agrees with the runtime", () => {
  const Client = require("abap2UI5/z2ui5_cl_ui5_client");

  /** Every own method the class actually has, per reflection. */
  const reflected = Object.getOwnPropertyNames(Client.prototype).filter((n) => {
    if (n === "constructor") return false;
    const d = Object.getOwnPropertyDescriptor(Client.prototype, n);
    return typeof d?.value === "function";
  });

  test("reflection finds a substantial API, so this test is not vacuous", () => {
    expect(reflected.length).toBeGreaterThan(50);
  });

  test("every method reflection sees, the parser found", () => {
    // This is the assertion the old regex could not survive: a method the
    // parser misses falls back to an options object and breaks at runtime.
    const missed = reflected.filter((n) => !parsed.has(n));
    expect(missed).toEqual([]);
  });

  test("the parser invents nothing reflection does not have", () => {
    const statics = Object.getOwnPropertyNames(Client).filter(
      (n) => typeof Client[n] === "function" && !["length", "name", "prototype"].includes(n),
    );
    const real = new Set([...reflected, ...statics]);
    expect([...parsed.keys()].filter((n) => !real.has(n))).toEqual([]);
  });

  test("parameter counts match what the functions declare", () => {
    // Function.length stops at the first default or rest parameter, so it is a
    // lower bound — but a parser that dropped or invented parameters would
    // still fail it.
    const wrong = [];
    for (const name of reflected) {
      const sig = parsed.get(name);
      if (!sig || sig.destructured) continue;
      if (sig.params.length < Client.prototype[name].length) {
        wrong.push(`${name}: parsed ${sig.params.length}, declares at least ${Client.prototype[name].length}`);
      }
    }
    expect(wrong).toEqual([]);
  });
});

describe("the scan handles what a regex could not", () => {
  const scan = (src) => new Map(parseClassMethods(src));

  test("a default value containing parentheses", () => {
    const m = scan(`class X {
      foo(a = bar(1, 2), b) {}
    }`);
    expect(m.get("foo").params).toEqual(["a", "b"]);
  });

  test("a default value containing braces and commas", () => {
    const m = scan(`class X {
      foo(text, opts = { a: 1, b: 2 }) {}
    }`);
    expect(m.get("foo").params).toEqual(["text", "opts"]);
  });

  test("indentation is irrelevant", () => {
    // The old regex required exactly two leading spaces, so a reformat
    // silently dropped methods.
    const m = scan(`class X {\n\t\tfoo(a) {}\n        bar(b) {}\n}`);
    expect([...m.keys()].sort()).toEqual(["bar", "foo"]);
  });

  test("a comment ending in a full stop does not hide the next method", () => {
    // "…mirrors client->_event_nav_app_leave( )." made the following method
    // look like a property access; three of the client's methods were lost.
    const m = scan(`class X {
      // Mirrors abap client->thing( ).
      thing(a) {}
      /** Doc ending in a period. */
      other(b) {}
    }`);
    expect([...m.keys()].sort()).toEqual(["other", "thing"]);
  });

  test("a destructured parameter list is reported as such, not as positional", () => {
    const m = scan(`class X {
      foo({ a, b } = {}) {}
    }`);
    expect(m.get("foo")).toEqual({ params: [], destructured: true });
  });

  test("calls inside a body are not mistaken for definitions", () => {
    const m = scan(`class X {
      real(a) { this.other(1); helper(2); return foo(3); }
    }`);
    expect([...m.keys()]).toEqual(["real"]);
  });

  test("braces inside strings and template literals do not desync the scan", () => {
    const m = scan(`class X {
      first(a) { return \`a \${ { x: 1 } } b\`; }
      second(b) { return "}{"; }
    }`);
    expect([...m.keys()].sort()).toEqual(["first", "second"]);
  });
});
