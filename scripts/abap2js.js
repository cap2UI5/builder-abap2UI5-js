#!/usr/bin/env node
/**
 * abap2js — transpiles abap2UI5 app classes (z2ui5_if_app implementations,
 * popup classes, demo apps) from ABAP to the idiomatic JavaScript style used
 * in srv/z2ui5 and srv/app/samples.
 *
 * Parsing is done by @abaplint/core (larshp's ABAP parser): it provides exact
 * statement boundaries, statement classification and the token stream. This
 * script only implements the JS emitter on top of that.
 *
 * Scope: the app layer that is supposed to be a 1:1 copy of the ABAP source.
 * The core engine (handler, binding, model, draft) is a hand-maintained
 * architecture adaptation (CDS/SQLite, native JSON) and is NOT a target.
 * Statements outside the supported subset are emitted as
 * `// TODO(abap2js): <original>` so nothing is silently dropped.
 *
 * Usage:
 *   node scripts/abap2js.js <file.clas.abap|dir> [more inputs...] -o <outdir>
 *   node scripts/abap2js.js <file.clas.abap> --stdout
 */
"use strict";

// The transpiler implementation lives in scripts/abap2js/ — lex (token
// helpers), naming (require paths / identifier rules), model (class model +
// type resolution), expr (expression transpiler), stmt (statement switch),
// method (method emitter), interface (interface transpile + signature/type
// parsing), index (transpileClass/transpileFile) and cli. This file re-exports
// the public API and the CLI entry point unchanged.
const { transpileClass, transpileFile } = require("./abap2js/index");
const { transpileInterface, parseInterfaceSigs, parseInterfaceTypes } = require("./abap2js/interface");

module.exports = { transpileClass, transpileFile, transpileInterface, parseInterfaceSigs, parseInterfaceTypes };

if (require.main === module) require("./abap2js/cli").main(process.argv);
