// GENERATED from run/input/abap2UI5/src/01/02/z2ui5_cl_core_srv_bind.clas.testclasses.abap — do not edit
const cl_abap_unit_assert = require("abap2UI5/cl_abap_unit_assert");
const z2ui5_cl_core_app = require("abap2UI5/z2ui5_cl_core_app");
const z2ui5_cl_core_srv_bind = require("abap2UI5/z2ui5_cl_core_srv_bind");
const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");
const z2ui5_if_core_types = require("abap2UI5/z2ui5_if_core_types");


class ltcl_test_app {
  ms_struc = {};
  mv_value = ``;
  mr_value = null;
  mr_struc = null;
  mo_app = null;
  xx = ``;

  constructor() {
  }
}



class ltcl_test_bind {
  test_one_way_w_x_error() {
    const lo_app_client = new ltcl_test_app();
    const lo_app = new z2ui5_cl_core_app();
    lo_app.mo_app = z2ui5_cl_util.abap_copy(lo_app_client);
    const lo_bind = new z2ui5_cl_core_srv_bind(lo_app);
    try {
      lo_bind.main({ val: (lo_app_client.xx), type: z2ui5_if_core_types.cs_bind_type.one_way });
      cl_abap_unit_assert.abort();
    } catch (error) {
    }
  }

  test_one_way() {
    let sy_sysid = "";
    if (sy_sysid === `ABC`) {
      return;
    }
    const lo_app_client = new ltcl_test_app();
    const lo_app = new z2ui5_cl_core_app();
    lo_app.mo_app = z2ui5_cl_util.abap_copy(lo_app_client);
    const lo_bind = new z2ui5_cl_core_srv_bind(lo_app);
    const lv_bind = lo_bind.main({ val: (lo_app_client.mv_value), type: z2ui5_if_core_types.cs_bind_type.one_way });
    cl_abap_unit_assert.assert_equals({ exp: `{/MV_VALUE}`, act: lv_bind });
  }

  test_error_diff() {
    let sy_sysid = "";
    if (sy_sysid === `ABC`) {
      return;
    }
    const lo_app_client = new ltcl_test_app();
    const lo_app = new z2ui5_cl_core_app();
    lo_app.mo_app = z2ui5_cl_util.abap_copy(lo_app_client);
    const lo_bind = new z2ui5_cl_core_srv_bind(lo_app);
    lo_bind.main({ val: (lo_app_client.mv_value), type: z2ui5_if_core_types.cs_bind_type.one_way });
    try {
      lo_bind.main({ val: (lo_app_client.mv_value), type: z2ui5_if_core_types.cs_bind_type.two_way });
      cl_abap_unit_assert.abort();
    } catch (error) {
    }
  }

  test_two_way() {
    let sy_sysid = "";
    if (sy_sysid === `ABC`) {
      return;
    }
    const lo_app_client = new ltcl_test_app();
    const lo_app = new z2ui5_cl_core_app();
    lo_app.mo_app = z2ui5_cl_util.abap_copy(lo_app_client);
    const lo_bind = new z2ui5_cl_core_srv_bind(lo_app);
    const lv_bind = lo_bind.main({ val: (lo_app_client.mv_value), type: z2ui5_if_core_types.cs_bind_type.two_way });
    const lv_bind2 = lo_bind.main({ val: (lo_app_client.mv_value), type: z2ui5_if_core_types.cs_bind_type.two_way });
    cl_abap_unit_assert.assert_equals({ exp: lv_bind2, act: lv_bind });
    cl_abap_unit_assert.assert_not_initial(lv_bind);
  }
}



class ltcl_test_main_structure {
  ms_struc = {};

  test_one_way_lev1() {
    let sy_sysid = "";
    if (sy_sysid === `ABC`) {
      return;
    }
    const lo_test_app = new ltcl_test_main_structure();
    const lo_app = new z2ui5_cl_core_app();
    lo_app.mo_app = z2ui5_cl_util.abap_copy(lo_test_app);
    const lo_bind = new z2ui5_cl_core_srv_bind(lo_app);
    let lv_result = lo_bind.main({ val: (lo_test_app.ms_struc.input), type: z2ui5_if_core_types.cs_bind_type.one_way });
    cl_abap_unit_assert.assert_equals({ exp: `{/MS_STRUC/INPUT}`, act: lv_result });
    lv_result = lo_bind.main({ val: (lo_test_app.ms_struc.input), config: { path_only: true }, type: z2ui5_if_core_types.cs_bind_type.one_way });
    cl_abap_unit_assert.assert_equals({ exp: `/MS_STRUC/INPUT`, act: lv_result });
  }

  test_one_way_lev2() {
    let sy_sysid = "";
    if (sy_sysid === `ABC`) {
      return;
    }
    const lo_test_app = new ltcl_test_main_structure();
    const lo_app = new z2ui5_cl_core_app();
    lo_app.mo_app = z2ui5_cl_util.abap_copy(lo_test_app);
    const lo_bind = new z2ui5_cl_core_srv_bind(lo_app);
    const lv_result = lo_bind.main({ val: (lo_test_app.ms_struc.s_02.input), type: z2ui5_if_core_types.cs_bind_type.one_way });
    cl_abap_unit_assert.assert_equals({ exp: `{/MS_STRUC/S_02/INPUT}`, act: lv_result });
  }

  test_one_way_lev3() {
    let sy_sysid = "";
    if (sy_sysid === `ABC`) {
      return;
    }
    const lo_test_app = new ltcl_test_main_structure();
    const lo_app = new z2ui5_cl_core_app();
    lo_app.mo_app = z2ui5_cl_util.abap_copy(lo_test_app);
    const lo_bind = new z2ui5_cl_core_srv_bind(lo_app);
    const lv_result = lo_bind.main({ val: (lo_test_app.ms_struc.s_02.s_03.input), type: z2ui5_if_core_types.cs_bind_type.one_way });
    cl_abap_unit_assert.assert_equals({ exp: `{/MS_STRUC/S_02/S_03/INPUT}`, act: lv_result });
  }

  test_one_way_lev4_long_name() {
    let sy_sysid = "";
    if (sy_sysid === `ABC`) {
      return;
    }
    const lo_test_app = new ltcl_test_main_structure();
    const lo_app = new z2ui5_cl_core_app();
    lo_app.mo_app = z2ui5_cl_util.abap_copy(lo_test_app);
    const lo_bind = new z2ui5_cl_core_srv_bind(lo_app);
    const lv_result = lo_bind.main({ val: (lo_test_app.ms_struc.s_02.s_03.s_04.input), type: z2ui5_if_core_types.cs_bind_type.one_way });
    cl_abap_unit_assert.assert_equals({ exp: `{/MS_STRUC/S_02/S_03/S_04/INPUT}`, act: lv_result });
  }
}



class ltcl_test_main_object {
  mo_obj = null;
  mv_value = ``;
  ms_struc = {};

  test_one_way_value() {
    let sy_sysid = "";
    if (sy_sysid === `ABC`) {
      return;
    }
    const lo_test_app = new ltcl_test_main_object();
    lo_test_app.mo_obj = /* TODO(abap2js): NEW #( ) */ null;
    lo_test_app.mo_obj.mv_value = `test`;
    const lo_app = new z2ui5_cl_core_app();
    lo_app.mo_app = z2ui5_cl_util.abap_copy(lo_test_app);
    const lo_bind = new z2ui5_cl_core_srv_bind(lo_app);
    const lv_result = lo_bind.main({ val: (lo_test_app.mo_obj.mv_value), type: z2ui5_if_core_types.cs_bind_type.one_way });
    cl_abap_unit_assert.assert_equals({ exp: `{/MO_OBJ/MV_VALUE}`, act: lv_result });
  }

  test_one_way_struc() {
    let sy_sysid = "";
    if (sy_sysid === `ABC`) {
      return;
    }
    const lo_test_app = new ltcl_test_main_object();
    lo_test_app.mo_obj = /* TODO(abap2js): NEW #( ) */ null;
    const lo_app = new z2ui5_cl_core_app();
    lo_app.mo_app = z2ui5_cl_util.abap_copy(lo_test_app);
    const lo_bind = new z2ui5_cl_core_srv_bind(lo_app);
    const lv_result = lo_bind.main({ val: (lo_test_app.mo_obj.ms_struc.input), type: z2ui5_if_core_types.cs_bind_type.one_way });
    cl_abap_unit_assert.assert_equals({ exp: `{/MO_OBJ/MS_STRUC/INPUT}`, act: lv_result });
  }
}



module.exports = {
  __main: "z2ui5_cl_core_srv_bind",
  __classes: { ltcl_test_app, ltcl_test_bind, ltcl_test_main_structure, ltcl_test_main_object },
  __tests: {"ltcl_test_bind":["test_one_way","test_one_way_w_x_error","test_error_diff","test_two_way"],"ltcl_test_main_structure":["test_one_way_lev1","test_one_way_lev2","test_one_way_lev3","test_one_way_lev4_long_name"],"ltcl_test_main_object":["test_one_way_value","test_one_way_struc"]},
};
