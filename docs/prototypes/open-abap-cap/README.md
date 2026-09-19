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
| The whole CAP wrapper | **48 lines** (`srv/server.js` plus `setup/setup.mjs`) |
| Drafts in a CDS entity | `db/schema.cds` + `srv/draft-store.cjs`, installed with one `set_instance( )` |
| A JavaScript app class | `srv/jsapp.mjs` — plain fields, plain values, **no `async`, no `await`, no ABAP** |
| Survives a process restart | `cold-test.mjs`: process A writes, is SIGKILLed, a fresh process B answers correctly |

The reason the wrapper can be that short is that upstream's own
`cl_express_icf_shim` reads nothing but plain express fields (`req.method`,
`req.body`, headers, url), and CAP hands its handlers the raw express request.
Upstream's adapter fits a CAP server without a line of change.

## Reproducing it

The transpiled framework and the webapp are **not** committed here — 19 MB of
generated output that any checkout can rebuild. Two directories have to be
filled in:

```bash
# 1. build upstream's runtime, in a SCRATCH COPY: auto_downport rewrites src/
git clone https://github.com/abap2UI5/abap2UI5 /tmp/ref && cd /tmp/ref
npm ci && npm run deps && npm run auto_downport && npm run auto_transpile

# 2. assemble this prototype
cd <this directory>
cp -r /tmp/ref/node/output ./abap        # the transpiled framework
cp -r /tmp/ref/app/webapp  ./webapp      # the UI5 shell, unmodified
npm install
npx cds-deploy                           # creates db.sqlite with cap2ui5.Drafts

# 3. run it, or run the cold test
npx cds-serve                            # → /rest/root/z2ui5?app_start=ZCL_JS_HELLO
node cold-test.mjs                       # the restart proof, control included
```

The four seams this leans on (`z2ui5_if_ui5_draft_store`,
`z2ui5_if_ui5_app_serializer`, the guarded codepage fallback and `c_protocol`)
live on the `claude/happy-turing-qt6ljo` branch of `abap2UI5/abap2UI5` and are
**not merged upstream**. Build the reference from that branch, or `draft-store`
has no interface to implement.

## What the pieces are

- **`srv/server.js`** — the wrapper. Static `webapp/`, one route into
  `cl_express_icf_shim`, and the two installs (`defineApp`'s app, the CDS
  store). That is all of it.
- **`setup/setup.mjs`** — the one hook the transpiled bundle requires, named in
  upstream's `node/setup/abap_transpile.json`. It wires a database; here SQLite,
  because the drafts go to CDS through the store instead.
- **`db/schema.cds` + `srv/draft-store.cjs`** — `cap2ui5.Drafts` and a
  `z2ui5_if_ui5_draft_store` implementation over it, so the framework's session
  state shares the project's database, transactions and authorization with every
  other CAP service. Reads are owner-scoped via `cds.context.user` and fail
  closed with the same "not found" the interface contract prescribes.
  Async is fine: the transpiled ABAP awaits every call.
- **`srv/define-app.mjs`** — the app API. Boxes plain fields, derives the
  ATTRIBUTES schema RTTI needs, and gives `main( )` a synchronous surface. Its
  header explains why each move is necessary; read it before changing anything,
  because two of the three were arrived at by getting them wrong first.
- **`srv/jsapp.mjs`** — what an app then looks like.
- **`cold-test.mjs`** — the restart proof. Always run with its control.

## What it does NOT show

- **The UI has never rendered in a browser.** All of it is the wire. The sandbox
  this was built in cannot reach the UI5 CDN, and serving UI5 locally means the
  611 MB `openui5-dist`. Frontend and backend come from the same upstream, so
  the protocol match is structural — but unproven.
- **No authorization was exercised.** `owner` came out as `anonymous` because
  the prototype configures no auth.
- **Objects and arrays as app state** are not supported by `defineApp`: a
  structure or table type cannot be derived from `{}` or `[]`. Scalars only.
- **The facade is a stub** — `isInitial`, `bind`, `event`, `view`, `messageBox`,
  `messageToast`, plus `raw` as the escape hatch. No popups, navigation or
  tables.
- **None of the 105 samples are here.** Upstream's `node/` build transpiles
  `src/` only.
