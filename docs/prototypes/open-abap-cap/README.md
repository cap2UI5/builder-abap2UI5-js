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
| Survives a process restart | `example/cold-test.mjs`: process A writes, is SIGKILLed, a fresh process B answers correctly |
| Drafts belong to the CAP user | `example/test/auth.test.mjs`: alice's draft answers to alice and to nobody else; no login, no roundtrip |

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
- **`example/srv/apps/hello.js`** — what an app then looks like.
- **`example/cold-test.mjs`** — the restart proof. Always run with its control.

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

- **`example/test/auth.test.mjs`** — the owner binding end to end, against a
  running server with CAP's mocked users.
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

- **The UI has never rendered in a browser.** All of it is the wire. The sandbox
  this was built in cannot reach the UI5 CDN, and serving UI5 locally means the
  611 MB `openui5-dist`. Frontend and backend come from the same upstream, so
  the protocol match is structural — but unproven.
- **Objects and arrays as app state** are not supported by `defineApp`: a
  structure or table type cannot be derived from `{}` or `[]`. Scalars only.
- **The facade is a stub** — `isInitial`, `bind`, `event`, `view`, `messageBox`,
  `messageToast`, plus `raw` as the escape hatch. No popups, navigation or
  tables.
- **`@abap2ui5/runtime` does not exist.** `runtime/` is what it would contain;
  publishing it is a job in upstream's `release.yaml` that has not been asked
  for yet.
- **None of the 105 samples are here.** Upstream's `node/` build transpiles
  `src/` only.
