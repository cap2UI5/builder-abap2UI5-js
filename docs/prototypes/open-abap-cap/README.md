# Prototype — abap2UI5 on open-abap, hosted by CAP

> [!IMPORTANT]
> **This is evidence, not a deliverable.** Nothing here is built, tested or
> shipped by this repository's pipeline, and no part of cap2UI5 depends on it.
> It exists because the measurements it produced decide a strategic question,
> and a measurement nobody can re-run is an anecdote.

## What it demonstrates

That cap2UI5 could stop being a hand-written JavaScript port of abap2UI5 and
become a **host** for upstream's own runtime — the real ABAP, downported and
transpiled by the official `@abaplint/transpiler` over `open-abap-core`, which
upstream already ships and serves itself via `node/srv/express.mjs`.

Measured, with a transpiled ABAP app running as the control on every single run:

| | |
|---|---|
| cap2UI5 is a **cds-plugin** | `npm i cap2ui5` is the installation: route, UI5 shell and the Drafts entity arrive through `cds-plugin.js`; the project's own `server.js` is untouched |
| Drafts in a CDS entity | `plugin/index.cds` + `plugin/lib/draft-store.js`, installed with one `set_instance( )` |
| A JavaScript app class | `example/srv/apps/hello.js` — plain fields, plain values, **no `async`, no `await`, no ABAP** |
| Tables and CDS queries | `example/srv/apps/books.js` — `t.table( )` state filled from `SELECT.from(Books)`, uppercase in the model, persisted in the draft |
| Survives a process restart | `example/cold-test.mjs`: process A writes, is SIGKILLed, a fresh process B answers correctly |
| Drafts belong to the CAP user | `example/test/auth.test.mjs`: alice's draft answers to alice and to nobody else; no login, no roundtrip |
| Users interleaved in one process | `example/test/concurrency.test.mjs`: three users, roundtrips in parallel, every answer to its owner |
| **14 ms per roundtrip** | `example/bench.mjs`: 200 sequential roundtrips over HTTP on SQLite; the runtime's own SQLite sees no SQL, only transaction ends |
| **It renders.** | `example/test/browser.e2e.mjs`: real Chromium opens the page the framework serves on GET, UI5 boots, the hello app answers a MessageBox, the Books app shows its table |

The reason the plugin can be that short is that upstream's own
`cl_express_icf_shim` reads nothing but plain express fields (`req.method`,
`req.body`, headers, url), and CAP hands its handlers the raw express request.
Upstream's adapter fits a CAP server without a line of change.

## The three packages

The directory is an npm workspace of the three packages exactly as they would
ship — which is the point: the boundaries between them are the boundaries the
product would have.

```
runtime/   @abap2ui5/runtime   what UPSTREAM would publish - a stand-in, see runtime/README.md
plugin/    cap2ui5             the plugin: cds-plugin.js, index.cds, lib/
example/   (a CAP project)     consumes cap2ui5 like any dependency; srv/apps/ holds its apps
```

- **`plugin/cds-plugin.js`** — CAP loads it from the dependency. On `bootstrap`
  it locates the runtime package, boots it, serves `webapp/` and mounts the
  roundtrip route into `cl_express_icf_shim`. That is all of it.
- **`plugin/index.cds`** — `cap2ui5.Drafts`, contributed to the project's model
  through `package.json#cds.requires.cap2ui5.model`, so `cds deploy` creates it
  next to the project's own entities.
- **`plugin/lib/draft-store.js`** — the `z2ui5_if_ui5_draft_store`
  implementation over that entity, so the framework's session state shares the
  project's database, transactions and authorization with every other CAP
  service. Reads are owner-scoped via `cds.context.user` and fail closed with
  the same "not found" the interface contract prescribes. Async is fine: the
  transpiled ABAP awaits every call.
- **`plugin/lib/define-app.js`** — the app API. Boxes plain fields, derives the
  ATTRIBUTES schema RTTI needs, and gives `main( )` a synchronous surface. Its
  header explains why each move is necessary; read it before changing anything,
  because two of the three were arrived at by getting them wrong first.
- **`plugin/lib/runtime.js`** — resolves `@abap2ui5/runtime` from the project,
  boots it, installs the store, loads `srv/apps/`.
- **`example/srv/apps/hello.js`** — what an app then looks like;
  **`books.js`** — one with a table, reading the project's own entity.
- **`example/cold-test.mjs`** — the restart proof. Always run with its control.
- **`example/bench.mjs`** — `npm run --workspace example bench -- 100`.

The app API, all of it: `c.isInitial`, `c.eventName`, `c.bind(field)`,
`c.event(name)`, `c.view(xml)`, `c.modelUpdate()`, `c.messageBox(text)`,
`c.messageToast(text)`, `c.raw` (the transpiled client, async). State: strings,
numbers, booleans, `t.packed(l, d)`, `t.char(n)`, a plain object (a structure),
`t.table({ …one row… })`. Component names appear UPPERCASE in the model.

Configuration a project can override in its `package.json#cds.cap2ui5`:
`apps` (default `srv/apps`), `routes`, `webapp` (the mount path of the shell),
`requires` (default `authenticated-user`; `null` allows anonymous callers).

The route runs behind `cds.middlewares.before` — the same chain as every CAP
service. That line is not optional: CAP creates `cds.context` only there, and a
route mounted straight on express never sees a user. The first version of the
plugin got exactly that wrong, and every draft was stored as `anonymous` —
alice's draft answered to bob. The auth test is the proof it stays fixed.

## Tests

```bash
npm test                                  # cds-deploy, then test/*.test.mjs
```

`.github/workflows/prototype.yml` runs all of it from a scratch build of
upstream's runtime, nightly and on every change under this directory.

- **`example/test/abi-gate.test.mjs`** — the plugin's coupling surface to the
  transpiler, named touchpoint by touchpoint and checked against a class the
  transpiler itself emitted. cap2ui5 couples to what `@abaplint/transpiler`
  *emits* (`ATTRIBUTES`/`METHODS` maps, `constructor_`, `~`→`$` naming,
  `abap.types.*`), not to a published contract — so a transpiler or upstream
  bump that changes it must fail here, not as a `BINDING_ERROR` on the wire.
- **`example/test/auth.test.mjs`** — the owner binding end to end, against a
  running server with CAP's mocked users.
- **`example/test/books.test.mjs`** — table state: from `cds.ql` into the
  model and through the draft.
- **`example/test/concurrency.test.mjs`** — the transpiled framework keeps
  CLASS-DATA in process-global statics; three users at once must not mix.
- **`example/test/browser.e2e.mjs`** — `npm run test:browser`, kept out of
  `npm test` because it needs a browser. UI5 comes from the CDN the page names;
  without one, `UI5_DIST=<openui5-dist>/dist/resources` answers those requests
  from disk (the page is not touched), and `PW_CHROMIUM=<binary>` uses a
  Chromium that is already there. Screenshots land in `example/screenshots/`.
- **`example/test/server.mjs`** — boots the example project in a process group
  of its own and speaks the wire; shared with the cold test.

## Reproducing it

The transpiled framework and the webapp are **not** committed — 20 MB of
generated output that any checkout can rebuild. `runtime/` is filled from an
upstream checkout:

```bash
# 1. build upstream's runtime, in a SCRATCH COPY: auto_downport rewrites src/
git clone https://github.com/abap2UI5/abap2UI5 /tmp/ref && cd /tmp/ref
npm ci && npm run deps && npm run auto_downport && npm run auto_transpile

# 2. assemble and install
cd <this directory>
scripts/assemble-runtime.sh /tmp/ref
npm install
(cd example && npx cds-deploy)            # creates db.sqlite with cap2ui5.Drafts

# 3. run it, or run the cold test
npm start                                 # → /rest/root/z2ui5?app_start=ZCL_JS_HELLO
npm run --workspace example cold-test     # the restart proof, control included
```

The four seams this leans on (`z2ui5_if_ui5_draft_store`,
`z2ui5_if_ui5_app_serializer`, the guarded codepage fallback and `c_protocol`)
live on the `claude/happy-turing-qt6ljo` branch of `abap2UI5/abap2UI5` and are
**not merged upstream**. Build the reference from that branch, or `draft-store`
has no interface to implement.

## What it does NOT show

- **Rendered with OpenUI5 1.108 only** — the newest `openui5-dist` on npm, the
  only way to get UI5 into the sandbox. The CDN default is the current release;
  the workflow runs against that.
- **Nested structures and tables of tables** are not supported by `defineApp`:
  a structure's components must be scalars. An empty `[]` has no row type —
  declare it with `t.table( )`.
- **The facade covers views, model updates and messages.** No popups, no
  navigation, no nested views; `c.raw` is the escape hatch.
- **`@abap2ui5/runtime` does not exist.** `runtime/` is what it would contain;
  publishing it is a job in upstream's `release.yaml` that has not been asked
  for yet.
- **None of the 105 samples are here.** Upstream's `node/` build transpiles
  `src/` only.
