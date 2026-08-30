// GENERATED from run/input/abap2UI5/src/01/04/z2ui5_cl_ui5_user_exit.clas.testclasses.abap — do not edit
const cl_abap_unit_assert = require("abap2UI5/cl_abap_unit_assert");
const z2ui5_cl_ui5_user_exit = require("abap2UI5/z2ui5_cl_ui5_user_exit");


class ltcl_exit_dep {
  set_config_http_get() {
    cs_config.theme = `sap_belize`;
  }

  set_config_http_post() {
    cs_config.draft_exp_time_in_hours = 9;
  }
}




class ltcl_test_user_exit {
  installed_exit = null;

  setup() {
    z2ui5_cl_ui5_user_exit.get_instance();
    this.installed_exit = z2ui5_cl_ui5_user_exit.gi_user_exit;
    z2ui5_cl_ui5_user_exit.gi_user_exit = null;
    z2ui5_cl_ui5_user_exit.gi_user_exit_dep = null;
  }

  teardown() {
    z2ui5_cl_ui5_user_exit.gi_user_exit = this.installed_exit;
    z2ui5_cl_ui5_user_exit.gi_user_exit_dep = null;
  }

  test_defaults_http_get() {
    let ls_config = { src: ``, theme: ``, content_security_policy: ``, styles_css: ``, title: ``, t_add_config: [], custom_js: ``, t_security_header: [] };
    let temp1 = false;
    const _out0 = { cs_config: ls_config };
    z2ui5_cl_ui5_user_exit.get_instance().set_config_http_get(_out0);
    if ("cs_config" in _out0) ls_config = _out0.cs_config;
    cl_abap_unit_assert.assert_equals({ exp: `sap_horizon`, act: ls_config.theme });
    cl_abap_unit_assert.assert_not_initial(ls_config.src);
    temp1 = (String(ls_config.content_security_policy).toLowerCase().includes(String(`Content-Security-Policy`).toLowerCase()));
    cl_abap_unit_assert.assert_true(temp1);
    cl_abap_unit_assert.assert_not_initial(ls_config.t_security_header);
  }

  test_defaults_http_post() {
    let ls_config = { draft_exp_time_in_hours: 0, check_hide_error_details: false, check_csrf_active: false };
    const _out0 = { cs_config: ls_config };
    z2ui5_cl_ui5_user_exit.get_instance().set_config_http_post(_out0);
    if ("cs_config" in _out0) ls_config = _out0.cs_config;
    cl_abap_unit_assert.assert_equals({ exp: true, act: ls_config.check_csrf_active });
    cl_abap_unit_assert.assert_equals({ exp: 4, act: ls_config.draft_exp_time_in_hours });
  }

  test_expiry_clamped() {
    let ls_config = { draft_exp_time_in_hours: 0, check_hide_error_details: false, check_csrf_active: false };
    ls_config.draft_exp_time_in_hours = - 1;
    const _out0 = { cs_config: ls_config };
    z2ui5_cl_ui5_user_exit.get_instance().set_config_http_post(_out0);
    if ("cs_config" in _out0) ls_config = _out0.cs_config;
    cl_abap_unit_assert.assert_equals({ exp: 4, act: ls_config.draft_exp_time_in_hours });
  }

  test_superseded_intf() {
    let ls_config = { src: ``, theme: ``, content_security_policy: ``, styles_css: ``, title: ``, t_add_config: [], custom_js: ``, t_security_header: [] };
    let ls_post = { draft_exp_time_in_hours: 0, check_hide_error_details: false, check_csrf_active: false };
    const li_exit = z2ui5_cl_ui5_user_exit.get_instance();
    z2ui5_cl_ui5_user_exit.gi_user_exit_dep = new ltcl_exit_dep();
    const _out0 = { cs_config: ls_config };
    li_exit.set_config_http_get(_out0);
    if ("cs_config" in _out0) ls_config = _out0.cs_config;
    const _out1 = { cs_config: ls_post };
    li_exit.set_config_http_post(_out1);
    if ("cs_config" in _out1) ls_post = _out1.cs_config;
    cl_abap_unit_assert.assert_equals({ exp: `sap_belize`, act: ls_config.theme });
    cl_abap_unit_assert.assert_equals({ exp: 9, act: ls_post.draft_exp_time_in_hours });
  }
}





module.exports = {
  __main: "z2ui5_cl_ui5_user_exit",
  __classes: { ltcl_exit_dep, ltcl_test_user_exit },
  __tests: {"ltcl_test_user_exit":["test_defaults_http_get","test_defaults_http_post","test_expiry_clamped","test_superseded_intf"]},
};
