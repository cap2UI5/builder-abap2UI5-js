// GENERATED from run/input/abap2UI5/src/01/02/z2ui5_cl_core_app.clas.testclasses.abap — do not edit
const cl_abap_unit_assert = require("abap2UI5/cl_abap_unit_assert");
const z2ui5_cl_core_app = require("abap2UI5/z2ui5_cl_core_app");
const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");


class ltcl_test {
  test_instantiation() {
    let lo_app = null;
    lo_app = new z2ui5_cl_core_app();
    cl_abap_unit_assert.assert_bound(lo_app);
    cl_abap_unit_assert.assert_bound(lo_app.mt_attri);
  }

  test_attri_initialized() {
    let lo_app = null;
    lo_app = new z2ui5_cl_core_app();
    cl_abap_unit_assert.assert_equals({ exp: 0, act: lo_app.mt_attri.length });
  }

  test_buffer_clear() {
    z2ui5_cl_core_app.db_load_buffer_clear();
    cl_abap_unit_assert.assert_equals({ exp: 0, act: z2ui5_cl_core_app.mt_buffer.length });
  }
}



class ltcl_test_db extends z2ui5_if_app {
  mv_value = ``;
  mv_name = ``;
  mv_count = 0;

  constructor() {
  }

  test_db_save() {
    let lo_app_user = null;
    let lo_app = null;
    let lo_app_db = null;
    let temp1 = null;
    let lo_app_user_db = null;
    if (sy_sysid === `ABC`) {
      return;
    }
    lo_app_user = new ltcl_test_db();
    lo_app_user.mv_value = `my value`;
    lo_app = new z2ui5_cl_core_app();
    lo_app.ms_draft.id = `TEST_ID`;
    lo_app.mo_app = z2ui5_cl_util.abap_copy(lo_app_user);
    lo_app.db_save();
    z2ui5_cl_core_app.db_load_buffer_clear();
    lo_app_db = z2ui5_cl_core_app.db_load(`TEST_ID`);
    temp1 = z2ui5_cl_util.abap_copy(lo_app_db.mo_app);
    lo_app_user_db = z2ui5_cl_util.abap_copy(temp1);
    cl_abap_unit_assert.assert_equals({ exp: lo_app_user.mv_value, act: lo_app_user_db.mv_value });
  }

  test_db_roundtrip() {
    let lo_app_user = null;
    let lo_app = null;
    let lo_loaded = null;
    let temp2 = null;
    let lo_restored = null;
    if (sy_sysid === `ABC`) {
      return;
    }
    lo_app_user = new ltcl_test_db();
    lo_app_user.mv_value = `roundtrip value`;
    lo_app_user.mv_name = `test name`;
    lo_app_user.mv_count = 42;
    lo_app = new z2ui5_cl_core_app();
    lo_app.ms_draft.id = `TEST_ROUNDTRIP`;
    lo_app.mo_app = z2ui5_cl_util.abap_copy(lo_app_user);
    lo_app.db_save();
    z2ui5_cl_core_app.db_load_buffer_clear();
    lo_loaded = z2ui5_cl_core_app.db_load(`TEST_ROUNDTRIP`);
    temp2 = z2ui5_cl_util.abap_copy(lo_loaded.mo_app);
    lo_restored = z2ui5_cl_util.abap_copy(temp2);
    cl_abap_unit_assert.assert_equals({ exp: `roundtrip value`, act: lo_restored.mv_value });
    cl_abap_unit_assert.assert_equals({ exp: `test name`, act: lo_restored.mv_name });
    cl_abap_unit_assert.assert_equals({ exp: 42, act: lo_restored.mv_count });
  }

  test_db_save_complex() {
    let lo_app_user = null;
    let lo_app = null;
    let temp3 = null;
    if (sy_sysid === `ABC`) {
      return;
    }
    lo_app_user = new ltcl_test_db();
    lo_app_user.mv_value = `complex`;
    lo_app = new z2ui5_cl_core_app();
    lo_app.ms_draft.id = `TEST_COMPLEX`;
    lo_app.mo_app = z2ui5_cl_util.abap_copy(lo_app_user);
    lo_app.ms_draft.id_prev = `PREV_ID`;
    lo_app.ms_draft.id_prev_app = `PREV_APP`;
    lo_app.db_save();
    temp3 = z2ui5_cl_util.abap_copy(lo_app.mo_app);
    cl_abap_unit_assert.assert_equals({ exp: true, act: temp3.check_initialized });
  }

  test_model_stringify() {
    let lo_app_user = null;
    let lo_app = null;
    let lv_json = ``;
    lo_app_user = new ltcl_test_db();
    lo_app_user.mv_value = `json test`;
    lo_app = new z2ui5_cl_core_app();
    lo_app.mo_app = z2ui5_cl_util.abap_copy(lo_app_user);
    lv_json = lo_app.model_json_stringify();
    cl_abap_unit_assert.assert_not_initial(lv_json);
  }

  async main(client) {
  }
}



module.exports = {
  __main: "z2ui5_cl_core_app",
  __classes: { ltcl_test, ltcl_test_db },
  __tests: {"ltcl_test":["test_instantiation","test_attri_initialized","test_buffer_clear"],"ltcl_test_db":["test_db_save","test_db_roundtrip","test_db_save_complex","test_model_stringify"]},
};
