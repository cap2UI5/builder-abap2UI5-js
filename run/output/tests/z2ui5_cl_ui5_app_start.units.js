// GENERATED from run/input/abap2UI5/src/01/04/z2ui5_cl_ui5_app_start.clas.testclasses.abap — do not edit
const cl_abap_unit_assert = require("abap2UI5/cl_abap_unit_assert");
const z2ui5_cl_ui5_app_start = require("abap2UI5/z2ui5_cl_ui5_app_start");


class ltcl_app_startup_test {
  test_first() {
    const lo_app = z2ui5_cl_ui5_app_start.factory();
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
  __tests: {"ltcl_app_startup_test":["test_first","test_link_enabled"]},
};
