const cds = require("@sap/cds");
const engine = require("abap2UI5/engine");
const { reqInfo, errorText } = require("../../_shared");

/**
 * Wires the rootService.z2ui5 action to the engine roundtrip. CDS unwraps
 * the REST action call into `req.data` containing the named `value`
 * parameter — that inner object is the raw oBody the abap2UI5 ICF servlet
 * would receive.
 */
module.exports = cds.service.impl(function (srv) {
  srv.on("z2ui5", async (req) => {
    const oBody = req.data?.value ?? req.data;

    // exit-context request info from CAP's inner express req (when exposed)
    const inner = req.req || req._?.req;
    const info = inner ? reqInfo(inner, JSON.stringify(inner.body ?? {})) : undefined;

    try {
      // CDS will JSON.stringify whatever we return, so parse first to
      // avoid double-encoding the wire payload.
      return JSON.parse(await engine.roundtrip(oBody, info));
    } catch (x) {
      return req.error(500, `abap2UI5 Error:${errorText(x)}`);
    }
  });
});
