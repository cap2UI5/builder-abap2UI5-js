// GENERATED from run/input/abap2UI5/src/02/z2ui5_cl_ui5_http_handler.clas.testclasses.abap — do not edit
const cl_abap_unit_assert = require("abap2UI5/cl_abap_unit_assert");
const z2ui5_cl_ui5_http_handler = require("abap2UI5/z2ui5_cl_ui5_http_handler");
const z2ui5_cl_ui5f_preload = require("abap2UI5/z2ui5_cl_ui5f_preload");


class ltcl_test_http_handler {
  test_http_get_status() {
    let ls_result = { body: ``, status_code: 0, status_reason: ``, s_stateful: { active: 0, switched: false } };
    ls_result = z2ui5_cl_ui5_http_handler._http_get();
    cl_abap_unit_assert.assert_equals({ exp: 200, act: ls_result.status_code });
    cl_abap_unit_assert.assert_equals({ exp: `OK`, act: ls_result.status_reason });
  }

  test_http_get_html() {
    let ls_result = { body: ``, status_code: 0, status_reason: ``, s_stateful: { active: 0, switched: false } };
    let temp1 = false;
    let temp2 = false;
    let temp3 = false;
    ls_result = z2ui5_cl_ui5_http_handler._http_get();
    cl_abap_unit_assert.assert_not_initial(ls_result.body);
    temp1 = (String(ls_result.body).toLowerCase().includes(String(`<!DOCTYPE html>`).toLowerCase()));
    cl_abap_unit_assert.assert_true(temp1);
    temp2 = (String(ls_result.body).toLowerCase().includes(String(`<html`).toLowerCase()));
    cl_abap_unit_assert.assert_true(temp2);
    temp3 = (String(ls_result.body).toLowerCase().includes(String(`</html>`).toLowerCase()));
    cl_abap_unit_assert.assert_true(temp3);
  }

  test_http_get_ui5_boot() {
    let ls_result = { body: ``, status_code: 0, status_reason: ``, s_stateful: { active: 0, switched: false } };
    let temp4 = false;
    let temp5 = false;
    ls_result = z2ui5_cl_ui5_http_handler._http_get();
    temp4 = (String(ls_result.body).toLowerCase().includes(String(`sap-ui-bootstrap`).toLowerCase()));
    cl_abap_unit_assert.assert_true(temp4);
    temp5 = (String(ls_result.body).toLowerCase().includes(String(`z2ui5`).toLowerCase()));
    cl_abap_unit_assert.assert_true(temp5);
  }

  test_http_get_favicon() {
    let ls_result = { body: ``, status_code: 0, status_reason: ``, s_stateful: { active: 0, switched: false } };
    let temp7 = false;
    let temp8 = false;
    ls_result = z2ui5_cl_ui5_http_handler._http_get();
    temp7 = (String(ls_result.body).toLowerCase().includes(String(`<link rel="icon" href="`).toLowerCase()));
    cl_abap_unit_assert.assert_true(temp7);
    temp8 = (String(ls_result.body).toLowerCase().includes(String(`data:image/svg+xml,<svg`).toLowerCase()));
    cl_abap_unit_assert.assert_true(temp8);
  }

  test_http_post_ok() {
    let ls_req = { method: ``, body: ``, path: ``, t_params: [] };
    let ls_result = { body: ``, status_code: 0, status_reason: ``, s_stateful: { active: 0, switched: false } };
    let temp6 = false;
    ls_req.method = `POST`;
    ls_req.body = `{"value":{"S_FRONT":{"ORIGIN":"O","PATHNAME":"/p","SEARCH":""}}}`;
    ls_result = z2ui5_cl_ui5_http_handler._http_post(ls_req);
    cl_abap_unit_assert.assert_equals({ exp: 200, act: ls_result.status_code });
    temp6 = (String(ls_result.body).toLowerCase().includes(String(`S_FRONT`).toLowerCase()));
    cl_abap_unit_assert.assert_true(temp6);
  }

  test_http_post_error() {
    let ls_req = { method: ``, body: ``, path: ``, t_params: [] };
    let lv_raised = false;
    ls_req.method = `POST`;
    ls_req.body = `not valid json at all!!!`;
    try {
      z2ui5_cl_ui5_http_handler._http_post(ls_req);
    } catch (error) {
      lv_raised = true;
    }
    cl_abap_unit_assert.assert_true(lv_raised);
  }

  test_main_post_no_app() {
    let ls_req = { method: ``, body: ``, path: ``, t_params: [] };
    let ls_result = { body: ``, status_code: 0, status_reason: ``, s_stateful: { active: 0, switched: false } };
    ls_req.method = `POST`;
    ls_req.body = `{"value":{"S_FRONT":{"ORIGIN":"O","PATHNAME":"/p","SEARCH":"?app_start=Z2UI5_CL_APP_DOES_NOT_EXIST"}}}`;
    ls_result = z2ui5_cl_ui5_http_handler._main(ls_req);
    cl_abap_unit_assert.assert_equals({ exp: 500, act: ls_result.status_code });
    cl_abap_unit_assert.assert_char_cp({ act: ls_result.body, exp: `*Z2UI5_CL_APP_DOES_NOT_EXIST*does not exist*` });
  }

  test_main_unsupported() {
    let ls_req = { method: ``, body: ``, path: ``, t_params: [] };
    let ls_result = { body: ``, status_code: 0, status_reason: ``, s_stateful: { active: 0, switched: false } };
    ls_req.method = `OPTIONS`;
    ls_result = z2ui5_cl_ui5_http_handler._main(ls_req);
    cl_abap_unit_assert.assert_equals({ exp: 405, act: ls_result.status_code });
    cl_abap_unit_assert.assert_equals({ exp: `Method Not Allowed`, act: ls_result.status_reason });
  }

  test_post_no_s_front() {
    let ls_req = { method: ``, body: ``, path: ``, t_params: [] };
    let ls_result = { body: ``, status_code: 0, status_reason: ``, s_stateful: { active: 0, switched: false } };
    ls_req.method = `POST`;
    ls_req.body = `{"value":{}}`;
    ls_result = z2ui5_cl_ui5_http_handler._main(ls_req);
    cl_abap_unit_assert.assert_equals({ exp: 200, act: ls_result.status_code });
  }

  test_main_get_routing() {
    let ls_req = { method: ``, body: ``, path: ``, t_params: [] };
    let ls_result = { body: ``, status_code: 0, status_reason: ``, s_stateful: { active: 0, switched: false } };
    let temp8 = false;
    ls_req.method = `GET`;
    ls_result = z2ui5_cl_ui5_http_handler._main(ls_req);
    cl_abap_unit_assert.assert_equals({ exp: 200, act: ls_result.status_code });
    temp8 = (String(ls_result.body).toLowerCase().includes(String(`<!DOCTYPE html>`).toLowerCase()));
    cl_abap_unit_assert.assert_true(temp8);
  }

  test_main_post_routing() {
    let ls_req = { method: ``, body: ``, path: ``, t_params: [] };
    let ls_result = { body: ``, status_code: 0, status_reason: ``, s_stateful: { active: 0, switched: false } };
    ls_req.method = `POST`;
    ls_req.body = `{"value":{"S_FRONT":{"ORIGIN":"O","PATHNAME":"/p","SEARCH":""}}}`;
    ls_result = z2ui5_cl_ui5_http_handler._main(ls_req);
    cl_abap_unit_assert.assert_equals({ exp: 200, act: ls_result.status_code });
  }

  test_csrf_inactive() {
    const lv_rejected = z2ui5_cl_ui5_http_handler._check_csrf_rejected({ active: false, origin: `https://evil.example.com`, referer: ``, host: `app.corp:44300` });
    cl_abap_unit_assert.assert_false(lv_rejected);
  }

  test_csrf_same_origin() {
    const lv_rejected = z2ui5_cl_ui5_http_handler._check_csrf_rejected({ active: true, origin: `https://App.Corp:44300`, referer: ``, host: `app.corp:44300` });
    cl_abap_unit_assert.assert_false(lv_rejected);
  }

  test_csrf_cross_origin() {
    const lv_rejected = z2ui5_cl_ui5_http_handler._check_csrf_rejected({ active: true, origin: `https://evil.example.com`, referer: ``, host: `app.corp:44300` });
    cl_abap_unit_assert.assert_true(lv_rejected);
  }

  test_csrf_no_headers() {
    const lv_rejected = z2ui5_cl_ui5_http_handler._check_csrf_rejected({ active: true, origin: ``, referer: ``, host: `app.corp:44300` });
    cl_abap_unit_assert.assert_false(lv_rejected);
  }

  test_csrf_referer() {
    const lv_rejected = z2ui5_cl_ui5_http_handler._check_csrf_rejected({ active: true, origin: ``, referer: `https://evil.example.com/attack?x=1`, host: `app.corp:44300` });
    cl_abap_unit_assert.assert_true(lv_rejected);
  }

  test_preload_escaping() {
    let lv_css = ``;
    let temp30 = false;
    let temp31 = false;
    let temp32 = false;
    let temp33 = false;
    lv_css = `.a::after { content: 'x'; }` + `
` + `.b { background: url("i\\c.png"); }`;
    const lv_preload = z2ui5_cl_ui5f_preload.get({ styles_css: lv_css, custom_js: `` });
    temp30 = (String(lv_preload).toLowerCase().includes(String(`content: \\'x\\';`).toLowerCase()));
    cl_abap_unit_assert.assert_true(temp30);
    temp31 = (String(lv_preload).toLowerCase().includes(String(`}\\n.b`).toLowerCase()));
    cl_abap_unit_assert.assert_true(temp31);
    temp32 = (String(lv_preload).toLowerCase().includes(String(`url("i\\\\c.png")`).toLowerCase()));
    cl_abap_unit_assert.assert_true(temp32);
    temp33 = (String(lv_preload).toLowerCase().includes(String(`content: 'x';`).toLowerCase()));
    cl_abap_unit_assert.assert_false(temp33);
  }

  test_preload_literals() {
    let sy_tabix = 0;
    let lt_lines = [];
    let lt_quotes = [];
    let lv_rest = ``;
    let lv_checked = 0;
    const lv_preload = z2ui5_cl_ui5f_preload.get({ styles_css: `.a { content: 'x'; }`, custom_js: `` });
    lt_lines = lv_preload.split(`
`);
    sy_tabix = 0;
    for (const lv_line of lt_lines) {
      sy_tabix++;
      if (!String(lv_line).includes(String(`      "z2ui5/*": '*',`).replace(/\*/g, ""))) {
        continue;
      }
      lv_rest = lv_line.replaceAll(`\\'`, ``);
      lt_quotes = lv_rest.split(`'`);
      cl_abap_unit_assert.assert_equals({ exp: 3, act: lt_quotes.length, msg: `a preload text resource carries an unescaped apostrophe` });
      lv_checked = lv_checked + 1;
    }
    cl_abap_unit_assert.assert_differs({ exp: 0, act: lv_checked });
  }
}





module.exports = {
  __main: "z2ui5_cl_ui5_http_handler",
  __classes: { ltcl_test_http_handler },
  __tests: {"ltcl_test_http_handler":["test_http_get_status","test_http_get_html","test_http_get_ui5_boot","test_http_get_favicon","test_http_post_ok","test_http_post_error","test_main_post_no_app","test_main_get_routing","test_main_post_routing","test_main_unsupported","test_post_no_s_front","test_csrf_inactive","test_csrf_same_origin","test_csrf_cross_origin","test_csrf_no_headers","test_csrf_referer","test_preload_escaping","test_preload_literals"]},
};
