// ESLint flat config — a lean, high-signal lint gate for the HAND-WRITTEN
// Node code only. Generated trees (core/, run/), the vendored/browser webapp
// and node_modules are excluded: they are produced by the pipeline and are
// not ours to lint. The rule set is deliberately narrow — it catches real
// defects (undefined refs, duplicate keys, unreachable code) without drowning
// the deliberate ABAP-port idioms (empty CATCH blocks, `_`-prefixed unused
// params mirroring ABAP signatures) in noise.
"use strict";

const js = require("@eslint/js");

module.exports = [
  {
    ignores: [
      "core/**",
      "run/**",
      "node_modules/**",
      "adapters/**/node_modules/**",
      "adapters/web/dist/**",
      "adapters/web/register-all.generated.js",
      // upstream UI5 webapp (browser globals, copied verbatim)
      "src/app/**",
    ],
  },
  js.configs.recommended,
  {
    files: ["scripts/**/*.js", "src/**/*.js", "adapters/**/*.js", "test/**/*.js"],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: "commonjs",
      globals: {
        require: "readonly",
        module: "writable",
        exports: "writable",
        process: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        console: "readonly",
        Buffer: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
        setInterval: "readonly",
        clearInterval: "readonly",
        globalThis: "readonly",
        URL: "readonly",
        TextEncoder: "readonly",
        TextDecoder: "readonly",
      },
    },
    rules: {
      // Rules that are already clean stay as ERRORS so new violations block
      // the gate: no-dupe-keys/args, no-func-assign, no-self-assign,
      // no-unsafe-negation, no-cond-assign (all inherited from recommended).
      "no-cond-assign": ["error", "except-parens"],
      "no-control-regex": "off",

      // Pre-existing legacy debt in the hand-ported classes (SRTTI
      // super.constructor() calls, undefined refs in util_ext, unreachable
      // tails). Surfaced as WARNINGS — visible for triage, non-blocking — so
      // the gate can be introduced green over a legacy codebase instead of
      // requiring a large, risky port refactor up front.
      //
      // Status (2026-08): **the demotion is over — these are errors now.**
      // The bucket went 130 → 0. What had dominated it was not a config gap
      // but genuinely undefined identifiers the transpiler emitted, i.e.
      // latent runtime bugs, and they were concentrated in two places that no
      // longer exist in this form:
      //
      //   97  00/02/z2ui5_cl_srt_*  — upstream's S-RTTI, removed: 12 classes
      //                              whose factory returned null for every
      //                              type kind, with no consumers and a
      //                              purpose (serialize an ABAP type
      //                              descriptor for CREATE DATA … TYPE
      //                              HANDLE) that has no JS counterpart.
      //   11  00/03/z2ui5_cl_util_json_fltr.js — fixed: keep_node() took no
      //                              parameters while using the ABAP importing
      //                              names, and returned nothing.
      //
      // The rest was a real config gap after all: CAP injects SELECT/INSERT/
      // DELETE as globals and `fetch` is a Node global — declared above, so a
      // REAL no-undef is now visible instead of buried in known noise.
      //
      // Keep these at "error". A new undefined identifier in this codebase is
      // a runtime bug, and the whole reason the bucket grew to 130 is that for
      // a year nothing failed when one appeared.
      "no-undef": "error",
      "no-this-before-super": "error",
      "constructor-super": "error",
      "no-unreachable": "error",
      "no-global-assign": "error",
      // Stylistic — kept at "warn", but `npm run lint` passes --max-warnings 0,
      // so a new one still fails the build. The split is about severity in the
      // output, not about tolerance.
      "no-extra-boolean-cast": "warn",
      "no-useless-escape": "warn",
      "no-regex-spaces": "warn",
      // ignoreRestSiblings: `({ val, ...meta }) => meta` is the standard way to
      // omit a key from an object; the omitted name is not dead code.
      "no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_", caughtErrors: "none", ignoreRestSiblings: true },
      ],
      "no-empty": ["warn", { allowEmptyCatch: true }],
      "no-constant-condition": ["warn", { checkLoops: false }],
    },
  },
  {
    // adapters/web/entry.js is the browser bundle's entry point — it runs in
    // the page, so the DOM and fetch globals are legitimately defined there.
    // The CAP entry points run inside a @sap/cds server, which injects the
    // query-builder globals (SELECT/INSERT/UPDATE/DELETE) rather than
    // exporting them. `fetch` is a Node 18+ global. Neither is undefined —
    // declaring them here is what makes a REAL no-undef in these files visible
    // instead of buried in known noise.
    files: ["src/srv/cap/**/*.js", "src/srv/z2ui5/**/*.js"],
    languageOptions: {
      globals: {
        SELECT: "readonly",
        INSERT: "readonly",
        UPDATE: "readonly",
        DELETE: "readonly",
        fetch: "readonly",
        AbortController: "readonly",
        URL: "readonly",
        TextEncoder: "readonly",
        TextDecoder: "readonly",
      },
    },
  },
  {
    files: ["adapters/web/entry.js"],
    languageOptions: {
      globals: {
        window: "readonly",
        document: "readonly",
        indexedDB: "readonly",
        fetch: "readonly",
        Request: "readonly",
        Response: "readonly",
        Headers: "readonly",
        URL: "readonly",
      },
    },
  },
  {
    // This config file and other root Node tooling (jest.config.js, etc.).
    files: ["*.config.js"],
    languageOptions: {
      globals: { require: "readonly", module: "writable", __dirname: "readonly" },
    },
  },
  {
    // Jest test files — add the test-runner globals.
    files: ["test/**/*.js", "**/*.test.js"],
    languageOptions: {
      globals: {
        describe: "readonly",
        test: "readonly",
        it: "readonly",
        expect: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly",
        jest: "readonly",
        // the adapter smoke tests drive a real server over HTTP
        fetch: "readonly",
      },
    },
  },
];
