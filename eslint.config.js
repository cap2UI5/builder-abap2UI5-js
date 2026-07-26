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
      // requiring a large, risky port refactor up front. Tighten to "error"
      // as these are worked down.
      "no-undef": "warn",
      "no-this-before-super": "warn",
      "constructor-super": "warn",
      "no-extra-boolean-cast": "warn",
      "no-unreachable": "warn",
      "no-useless-escape": "warn",
      "no-regex-spaces": "warn",
      "no-global-assign": "warn",
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_", caughtErrors: "none" }],
      "no-empty": ["warn", { allowEmptyCatch: true }],
      "no-constant-condition": ["warn", { checkLoops: false }],
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
      },
    },
  },
];
