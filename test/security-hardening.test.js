// P1 security hardening: the CSRF gate and HTML escaping on the bootstrap page.
//
// Both of these were findings of the 2026-08 review:
//   - CSRF protection existed but was opt-in and nothing opted in, and the
//     check itself allowed any request that carried neither Origin nor
//     Referer — precisely the shape an attacker can produce.
//   - The bootstrap page interpolated exit-supplied config (tab title, favicon
//     URI, bootstrap src, theme, every t_add_config row) into markup with no
//     escaping. The exit receives the request context, so any app reflecting a
//     query parameter into its title had an injection point.
"use strict";

const path = require("path");

const CORE = path.join(__dirname, "..", "core", "srv", "z2ui5");
const handler = require(path.join(CORE, "02", "z2ui5_cl_ui5_http_handler.js"));
const html = require(path.join(CORE, "00", "03", "z2ui5_html.js"));
const exit = require(path.join(CORE, "01", "04", "z2ui5_cl_ui5_user_exit.js"));

describe("CSRF gate", () => {
  const HOST = "app.example.com";

  test("is on by default in the shipped exit", () => {
    // It used to default to off, so the gate shipped inert.
    const cfg = exit.get_instance().set_config_http_post({ cs_config: {} });
    expect(cfg.check_csrf_active).toBe(true);
  });

  test("allows a same-origin POST", () => {
    expect(handler._check_csrf_rejected({
      active: true, origin: `https://${HOST}`, host: HOST, content_type: "application/json",
    })).toBe(false);
  });

  test("rejects a cross-origin POST", () => {
    expect(handler._check_csrf_rejected({
      active: true, origin: "https://evil.example.net", host: HOST, content_type: "application/json",
    })).toBe(true);
  });

  test("falls back to Referer when Origin is absent", () => {
    expect(handler._check_csrf_rejected({
      active: true, referer: `https://${HOST}/z2ui5/index.html`, host: HOST,
    })).toBe(false);
    expect(handler._check_csrf_rejected({
      active: true, referer: "https://evil.example.net/x", host: HOST,
    })).toBe(true);
  });

  test("allows when there is neither Origin nor Referer, as upstream specifies", () => {
    // Upstream pins this (ltcl_test_http_handler~test_csrf_no_headers:
    // "lenient: no Origin and no Referer -> allowed (proxies / old clients)").
    // A stricter rule — require a JSON content type, since a cross-site <form>
    // can only send the three simple types — was tried and reverted: it
    // contradicts that contract and breaks non-browser callers. In this
    // deployment the form vector is closed one layer up anyway (CDS accepts an
    // action call only as application/json; the approuter forwards a JWT).
    expect(handler._check_csrf_rejected({ active: true, host: HOST })).toBe(false);
    expect(handler._check_csrf_rejected({ active: true, origin: "", referer: "", host: HOST })).toBe(false);
  });

  describe("reaches the wire, not just the pure function", () => {
    // Both of these were found by booting a real CAP 9 server against this
    // package, and neither was visible to a unit test of the check itself.

    test("the handler reads headers from CAP's current accessor", async () => {
      // The gate read `req.req || req._.req`. On CAP 9 the express request is
      // `req.http.req`, so innerReq was null, origin/host arrived empty, and
      // the lenient no-headers branch let every cross-origin POST through — an
      // active, correct gate that never saw a header. (It also meant user
      // exits saw no request context at all.)
      const src = require("fs").readFileSync(
        require("path").join(CORE, "02", "z2ui5_cl_ui5_http_handler.js"), "utf8",
      );
      expect(src).toMatch(/req\?\.http\?\.req/);
      expect(src).toMatch(/req\?\.http\?\.res/);
    });

    test("a rejection is refused through CDS, not returned as a value", async () => {
      // Returning {status_code: 403} made CDS serialize it as a SUCCESSFUL
      // action result: HTTP 200 carrying a 403 in the body, so a blocked
      // request looked completed to any client that checks the status.
      const rejects = [];
      const req = {
        http: { req: { headers: { origin: "https://evil.example.net", host: "app.example.com" } }, res: {} },
        data: { value: { S_FRONT: {} } },
        reject: (code, msg) => { rejects.push([code, msg]); throw new Error(`rejected ${code}`); },
      };
      await expect(handler(req)).rejects.toThrow(/rejected 403/);
      expect(rejects).toEqual([[403, "CSRF validation failed - cross-origin POST rejected"]]);
    });

    test("a same-origin POST is not rejected", async () => {
      const req = {
        http: { req: { headers: { origin: "https://app.example.com", host: "app.example.com" } }, res: {} },
        data: { value: { S_FRONT: { ORIGIN: "https://app.example.com", PATHNAME: "/rest/root/z2ui5", SEARCH: "" } } },
        reject: (code) => { throw new Error(`must not reject (${code})`); },
      };
      await expect(handler(req)).resolves.toBeDefined();
    });
  });

  test("does nothing when an app switches it off", () => {
    expect(handler._check_csrf_rejected({
      active: false, origin: "https://evil.example.net", host: HOST,
    })).toBe(false);
  });

  test("compares host authorities, not raw strings", () => {
    // scheme, path and port handling — a same-host Referer with a path must
    // still match, and a different port must not.
    expect(handler._check_csrf_rejected({
      active: true, referer: `http://${HOST}/deep/path?q=1#frag`, host: HOST,
    })).toBe(false);
    expect(handler._check_csrf_rejected({
      active: true, origin: `https://${HOST}:8443`, host: HOST,
    })).toBe(true);
  });
});

describe("HTML escaping helpers", () => {
  test("neutralise the characters that break out of text and attributes", () => {
    expect(html.escape_text(`</title><script>alert(1)</script>`))
      .toBe(`&lt;/title&gt;&lt;script&gt;alert(1)&lt;/script&gt;`);
    expect(html.escape_attr(`' onload='alert(1)`)).toBe(`&#39; onload=&#39;alert(1)`);
    expect(html.escape_attr(`" onload="alert(1)`)).toBe(`&quot; onload=&quot;alert(1)`);
  });

  test("escape the ampersand first, so entities are not double-encoded", () => {
    expect(html.escape_text(`a & b`)).toBe(`a &amp; b`);
    expect(html.escape_text(`&lt;`)).toBe(`&amp;lt;`);
  });

  test("treat null/undefined as empty rather than printing them", () => {
    for (const v of [null, undefined]) {
      expect(html.escape_text(v)).toBe(``);
      expect(html.escape_uri(v)).toBe(``);
    }
  });

  test("escape_uri drops script schemes and keeps legitimate ones", () => {
    expect(html.escape_uri(`javascript:alert(1)`)).toBe(``);
    expect(html.escape_uri(`JaVaScRiPt:alert(1)`)).toBe(``);
    // browsers parse control characters out of the scheme, so we must too
    expect(html.escape_uri(`java\tscript:alert(1)`)).toBe(``);
    expect(html.escape_uri(`java\nscript:alert(1)`)).toBe(``);
    expect(html.escape_uri(` javascript:alert(1)`)).toBe(``);
    expect(html.escape_uri(`vbscript:msgbox`)).toBe(``);

    expect(html.escape_uri(`/resources/sap-ui-core.js`)).toBe(`/resources/sap-ui-core.js`);
    expect(html.escape_uri(`https://sdk.openui5.org/x.js`)).toBe(`https://sdk.openui5.org/x.js`);

    // A double-quoted attribute only needs & and " neutralised; < > ' are
    // inert there. The shipped favicon is the worked example — it is a
    // data:image/svg+xml URI full of angle brackets and single quotes, and
    // upstream asserts the page carries `data:image/svg+xml,<svg` literally,
    // so over-escaping would both corrupt it and break that contract.
    expect(html.escape_uri(`data:image/svg+xml,<svg xmlns='http://x'/>`))
      .toBe(`data:image/svg+xml,<svg xmlns='http://x'/>`);
    // …but a quote that would end the attribute is still neutralised
    expect(html.escape_uri(`/x.js" onload="alert(1)`)).toBe(`/x.js&quot; onload=&quot;alert(1)`);
    expect(html.escape_uri(`/a?x=1&y=2`)).toBe(`/a?x=1&amp;y=2`);
  });
});

describe("the bootstrap page escapes what the exit supplies", () => {
  test("a reflected title cannot close the element", () => {
    const page = handler._http_get();
    expect(page.body).toContain(`<title>`);
    // and the shipped favicon made it in, escaped but intact
    expect(page.body).toContain(`<link rel="icon" href="data:image/svg+xml,`);
  });

  test("index_html escapes title, theme and t_add_config rows", () => {
    const index = require(path.join(CORE, "01", "03", "z2ui5_cl_ui5f_index_html.js"));
    const body = index.get_source({
      title: `</title><script>alert(1)</script>`,
      theme: `sap_horizon" onerror="alert(1)`,
      src: `/resources/sap-ui-core.js`,
      t_add_config: [
        { n: `data-sap-ui-frameOptions`, v: `trusted' onload='alert(1)` },
        // an attribute NAME is not a quoted context — this row must be dropped
        { n: `x' onload='alert(1)`, v: `y` },
      ],
    });

    expect(body).not.toContain(`<script>alert(1)</script>`);
    expect(body).toContain(`&lt;script&gt;alert(1)&lt;/script&gt;`);
    expect(body).not.toContain(`onerror="alert(1)"`);
    expect(body).toContain(`data-sap-ui-frameOptions='trusted&#39; onload=&#39;alert(1)'`);
    expect(body).not.toContain(`onload='alert(1)'`);
  });

  test("a javascript: bootstrap src is dropped, not emitted", () => {
    const index = require(path.join(CORE, "01", "03", "z2ui5_cl_ui5f_index_html.js"));
    const body = index.get_source({ title: `t`, theme: `t`, src: `javascript:alert(1)`, t_add_config: [] });
    expect(body).not.toContain(`javascript:`);
  });
});
