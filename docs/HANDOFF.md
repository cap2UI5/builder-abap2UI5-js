# Handoff — continue the transpiler / minimal-base work

Start here in a new session. Full design + backlog is in
[`transpiler-roadmap.md`](transpiler-roadmap.md); this file is the operational
"how to pick up". Repo layout and pipeline rules live in [`../AGENTS.md`](../AGENTS.md)
— read that first; this file only adds the transpiler-work specifics.

> Historical note: this work started in a `cap2UI5/cap2UI5` monorepo
> (`builder/` folder). The repo was reorganized in 2026-07 into
> `builder-abap2UI5-js` (this repo: transpiler + `src/` + generated `core/` +
> `adapters/`), `builder-cap2UI5` (builds the CAP app from its `src/`) and
> `cap2UI5` (the published app). Everything below uses the current layout.

## Where things stand

- **Transpiler** (`scripts/abap2js.js`): TODO comments in the generated trees
  are down to a low double-digit count (see `run/output/*/transpile-report.json`
  for the live numbers). Shipped along the way: drop `TYPES`;
  word-operators-as-identifiers (`lt`/`ns`); OpenSQL → neutral
  `z2ui5_port.db()` IR + in-memory backend; whitespace-in-literals
  (multi-line strings); popup `PREFERRED PARAMETER` emission;
  `LOOP AT … TRANSPORTING NO FIELDS`.
- **Hand-ported base** (`src/srv/z2ui5`): pruned to the "architectural floor"
  described in the roadmap — engine/RTTI/serialization, interfaces, exception
  classes and frontend assets stay hand-written.
- **Tests:** full jest + smoke suite green (19 suites, ~225 tests); two
  self-healing ratchet baselines (`test/upstream-units.known-failures.json`,
  `test/apps-smoke.known-failures.json`).

## Environment setup (ephemeral container — redo each session)

```bash
npm install                       # transpiler deps (@abaplint/core, jest)
(cd adapters/cap && npm install)  # backs the assemble load-gate (@sap/cds)
npm test                          # sanity: expect all green
```

## Build / verify loop (for any transpiler or base change)

```bash
node scripts/transpile-tree.js abap2UI5   # regenerate run/output/abap2UI5
node scripts/transpile-tree.js samples    # regenerate run/output/samples
npm run build_core                        # assemble-core.js && publish-core.js → core/
node scripts/ratchet-update.js            # reconcile the two baselines
npm test                                  # behavioural gate
```

The transpile step fails on parse errors (gate in `transpile-tree.js`;
deliberate losses go into `scripts/transpile-parse-allow.json`).

**Pruning a base class safely** (the proven method): find the adaptation the
hand-port carries that the transpile drops → teach the emitter to reproduce it →
prove the reproduction matches the hand-port → remove from `src/srv/z2ui5` →
gate on the full suite AND a byte/runtime-diff review (only known-safe
residuals like `abap_copy` wrapping). "Zero TODOs" / "green suite" alone are
NOT sufficient.

## Caveats / gotchas

- `z2ui5_cl_app_preload` always fails the assemble load-gate by design (deps
  map to a non-existent path) — that one "SKIPPED" line is expected.

## What's next (pick one)

Per roadmap, further base reduction is the **Step-2 porter** (architectural, not
cleanup). Highest-leverage first:
1. **RTTI shim** (`z2ui5_cl_srt_*`, informed by open-abap) — unlocks the most
   engine classes.
2. **sxml / `CALL TRANSFORMATION` shim** — unlocks `ajson` serialization.
3. **CDS-backed async `z2ui5_port` DB store** (mind the async ripple).

Smaller: `get_range` preferred-map fix; the remaining TODO popups; stub the
`cx_*` SAP standard exception base classes; optional UI5 `Component-preload`
build to silence the dev-mode 404s.

## Paste this into a new Claude session to resume

> Wir arbeiten im Repo `cap2UI5/builder-abap2UI5-js` am ABAP→JS-Transpiler
> (`scripts/abap2js.js`) und der base-Ausdünnung. Lies zuerst `AGENTS.md`,
> `docs/HANDOFF.md` und `docs/transpiler-roadmap.md`. Richte die Umgebung wie
> im Handoff ein, bestätige dass `npm test` grün ist, und mach danach weiter
> mit: <ZIEL>. Halte dich an die dokumentierte sichere Prune-Methode und
> committe/pushe verifizierte Schritte auf denselben Branch.

Replace `<ZIEL>` with e.g. "dem RTTI-Shim (Punkt 1 der Roadmap)" or whatever you
want next.
