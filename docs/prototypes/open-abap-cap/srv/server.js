// SPIKE — abap2UI5 (the REAL ABAP, transpiled over open-abap) inside a CAP server.
//
// The question this answers: how thin can the CAP wrapper be if cap2UI5 stops
// being a hand-written JS port and becomes a HOST for upstream's own runtime?
//
// Everything below is the whole wrapper. There is no port, no transpiler of our
// own, no hand-maintained framework classes — `node/output` is what upstream's
// `npm run auto_transpile` produces, unmodified.
const cds = require("@sap/cds");
const express = require("express");
const path = require("path");

const OUT = path.join(__dirname, "..", "abap");        // upstream's node/output
const WEBAPP = path.join(__dirname, "..", "webapp");   // upstream's app/webapp

let ready;

/**
 * Boot the ABAP runtime once, with SQLite underneath.
 *
 * This is upstream's own node/setup/setup.mjs, inlined: the transpiled Open SQL
 * talks to `abap.context.databaseConnections.DEFAULT`, and @abaplint's SQLite
 * client satisfies it. Swapping this for a CDS-backed client is what
 * z2ui5_if_ui5_draft_store (Naht 1) is for — but nothing forces that swap to
 * happen before the thing runs at all, which is the point of the spike.
 */
async function boot() {
  const { initializeABAP } = await import(path.join(OUT, "init.mjs"));
  await initializeABAP();

  // A JavaScript app class (see §11 of the roadmap: a plain class plus a
  // declared ATTRIBUTES schema is enough).
  await import("./jsapp.mjs");

  // Drafts go into the CAP database, not the ABAP runtime's private SQLite.
  // This is Naht 1 doing its job: one set_instance( ) and the framework's
  // session state is an ordinary CDS entity, sharing the project's connection,
  // transactions and authorization with every other service.
  const { ZCL_CDS_DRAFT_STORE } = require("./draft-store.cjs");
  abap.Classes["ZCL_CDS_DRAFT_STORE"] = ZCL_CDS_DRAFT_STORE;
  const ref = new abap.types.ABAPObject({ qualifiedName: "Z2UI5_IF_UI5_DRAFT_STORE" });
  ref.set(await new ZCL_CDS_DRAFT_STORE().constructor_());
  await abap.Classes["Z2UI5_CL_UI5_SRV_DRAFT"].set_instance({ store: ref });
  console.log("[store] drafts now live in cap2ui5.Drafts");

  return await import(path.join(OUT, "cl_express_icf_shim.clas.mjs"));
}

cds.on("bootstrap", (app) => {
  ready = boot();

  // The UI5 shell, served straight from upstream's app/webapp. It is not
  // mirrored, not patched, not generated — it is the same directory upstream
  // ships, which is exactly what removes the frontend/backend drift the port
  // has today.
  app.use("/z2ui5/webapp", express.static(WEBAPP, { maxAge: "1h" }));

  // The roundtrip endpoint. cl_express_icf_shim is upstream's own adapter and
  // reads plain express fields (req.method, req.body, headers, url) — so CAP,
  // whose handlers expose the raw express request, can hand it the same objects
  // an express app would. That is the whole reason this wrapper is short.
  app.all(
    ["/sap/bc/z2ui5", "/rest/root/z2ui5"],
    express.raw({ type: "*/*", limit: "10mb" }),
    async (req, res) => {
      try {
        const { cl_express_icf_shim } = await ready;
        if (!req.body || !Buffer.isBuffer(req.body)) req.body = Buffer.alloc(0);
        await cl_express_icf_shim.run({ req, res, class: "ZCL_SICF" });
      } catch (e) {
        console.error("z2ui5 roundtrip failed:", e);
        if (!res.headersSent) res.status(500).type("text/plain").send(String(e?.message || e));
      }
    },
  );

  app.get("/", (_req, res) => res.redirect("/z2ui5/webapp/index.html"));
});

module.exports = cds.server;
