/**
 * adapter-express — abap2UI5 as an express app.
 *
 * Same seam as adapter-node (require("abap2UI5/engine")), but the transport
 * is express middleware — showing what mounting abap2UI5 into an existing
 * express application looks like. Endpoints mirror the CAP wiring so the
 * unchanged upstream webapp works 1:1.
 *
 * Start:  npm install && npm start  →  http://localhost:4204/z2ui5/webapp/index.html
 */
"use strict";

const express = require("express");
const engine = require("abap2UI5/engine");
const { reqInfo, memoryStore, errorBody } = require("../_shared");

const PORT = Number(process.env.PORT || 4204);

// draft persistence: in-memory (swap for anything durable)
engine.set_store(memoryStore());

const app = express();
app.use(express.json({ limit: "10mb" }));

// statics: the bundled webapp + the local UI5 runtime
app.use("/z2ui5/webapp", express.static(engine.WEBAPP_DIR, { maxAge: "1h" }));
const ui5 = engine.ui5_resources_dir();
if (ui5) app.use("/resources", express.static(ui5, { maxAge: "1h" }), (_req, res) => res.status(404).end());
app.get("/", (_req, res) => res.redirect("/z2ui5/webapp/index.html"));

// the z2ui5 endpoint — GET bootstrap page, HEAD csrf ack, POST roundtrip
app.get("/rest/root/z2ui5", (req, res) => {
  const { html, headers } = engine.bootstrap_html(reqInfo(req));
  for (const h of headers) res.set(h.n, h.v);
  res.type("html").send(html);
});

app.head("/rest/root/z2ui5", (_req, res) => res.set("X-CSRF-Token", "disabled").end());

app.post("/rest/root/z2ui5", async (req, res) => {
  const oBody = req.body?.value ?? req.body; // webapp wraps in {value}, accept raw too
  try {
    const json = await engine.roundtrip(oBody, reqInfo(req, JSON.stringify(req.body ?? {})));
    res.type("application/json").send(json);
  } catch (x) {
    res.status(500).type("text/plain").send(errorBody(x));
  }
});

app.listen(PORT, () => {
  console.log(`abap2UI5 on express — http://localhost:${PORT}/z2ui5/webapp/index.html`);
});
