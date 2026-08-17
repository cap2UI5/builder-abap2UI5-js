// GENERATED from run/input/abap2UI5/src/01/04/z2ui5_cl_ui5_app_start.clas.testclasses.abap — do not edit
const cl_abap_unit_assert = require("abap2UI5/cl_abap_unit_assert");
const z2ui5_cl_ui5_app_start = require("abap2UI5/z2ui5_cl_ui5_app_start");


class ltcl_app_startup_test {
  test_factory_state() {
    const lo_app = z2ui5_cl_ui5_app_start.factory();
    cl_abap_unit_assert.assert_bound(lo_app);
    cl_abap_unit_assert.assert_equals({ act: lo_app.ms_home.class_editable, exp: true, msg: `a fresh app offers an editable class name` });
    cl_abap_unit_assert.assert_equals({ act: lo_app.ms_home.link_enabled, exp: false, msg: `nothing has been checked yet - the app link stays dead` });
  }

  test_on_init_proposal() {
    const lo_app = z2ui5_cl_ui5_app_start.factory();
    lo_app.on_init();
    cl_abap_unit_assert.assert_equals({ act: lo_app.ms_home.classname.toUpperCase(), exp: `Z2UI5_CL_UI5_APP_HI_WORLD`, msg: `on_init proposes the hello-world app as the class to check` });
    cl_abap_unit_assert.assert_equals({ act: lo_app.ms_home.btn_event_id, exp: z2ui5_cl_ui5_app_start.cs_event.button_check, msg: `on_init leaves the button on Check` });
  }

  test_reset_clears_outcome() {
    const lo_app = z2ui5_cl_ui5_app_start.factory();
    lo_app.ms_home.url = `https://example.org/?app_start=ZCL_X`;
    lo_app.ms_home.class_value_state = `Success`;
    lo_app.ms_home.class_value_state_text = `all good`;
    lo_app.reset_button_state();
    cl_abap_unit_assert.assert_initial({ act: lo_app.ms_home.url, msg: `reset drops the link of the previous check` });
    cl_abap_unit_assert.assert_initial({ act: lo_app.ms_home.class_value_state_text, msg: `reset drops the previous check's message` });
    cl_abap_unit_assert.assert_equals({ act: lo_app.ms_home.class_value_state, exp: `None`, msg: `ValueState is set to None, never cleared` });
  }

  test_link_enabled() {
    const lo_app = z2ui5_cl_ui5_app_start.factory();
    lo_app.ms_home.link_enabled = true;
    lo_app.reset_button_state();
    cl_abap_unit_assert.assert_equals({ act: lo_app.ms_home.link_enabled, exp: false, msg: `reset must disable the app link again` });
    cl_abap_unit_assert.assert_equals({ act: lo_app.ms_home.class_editable, exp: true, msg: `reset must make the class name editable again` });
  }
}





module.exports = {
  __main: "z2ui5_cl_ui5_app_start",
  __classes: { ltcl_app_startup_test },
  __tests: {"ltcl_app_startup_test":["test_factory_state","test_on_init_proposal","test_reset_clears_outcome","test_link_enabled"]},
};
