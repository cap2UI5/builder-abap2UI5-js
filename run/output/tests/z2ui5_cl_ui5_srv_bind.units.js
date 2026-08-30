// GENERATED from run/input/abap2UI5/src/01/02/z2ui5_cl_ui5_srv_bind.clas.testclasses.abap — do not edit
const cl_abap_unit_assert = require("abap2UI5/cl_abap_unit_assert");
const z2ui5_cl_ui5_app_cont = require("abap2UI5/z2ui5_cl_ui5_app_cont");
const z2ui5_cl_ui5_srv_bind = require("abap2UI5/z2ui5_cl_ui5_srv_bind");
const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");
const z2ui5_if_ajson_filter = require("abap2UI5/z2ui5_if_ajson_filter");


class ltcl_test_app {
  ms_struc = { input: ``, s_02: { input: ``, s_03: { input: ``, s_04: { input: `` } } } };
  mv_value = ``;
  mr_value = null;
  mr_struc = null;
  mo_app = null;
  xx = ``;
}




class ltcl_test_filter {
  keep_node({ is_node, iv_visit = z2ui5_if_ajson_filter.visit_type.value } = {}) {
    let rv_keep = false;
    rv_keep = true;
    return rv_keep;
  }
}





class ltcl_test_bind {
  test_attri_named_xx() {
    const lo_app_client = new ltcl_test_app();
    const lo_app = new z2ui5_cl_ui5_app_cont();
    lo_app.mo_app = lo_app_client;
    const lo_bind = new z2ui5_cl_ui5_srv_bind(lo_app);
    const lv_bind = lo_bind.main((lo_app_client.xx));
    cl_abap_unit_assert.assert_equals({ exp: `{/XX}`, act: lv_bind });
  }

  test_bind_path() {
    const lo_app_client = new ltcl_test_app();
    const lo_app = new z2ui5_cl_ui5_app_cont();
    lo_app.mo_app = lo_app_client;
    const lo_bind = new z2ui5_cl_ui5_srv_bind(lo_app);
    const lv_bind = lo_bind.main((lo_app_client.mv_value));
    cl_abap_unit_assert.assert_equals({ exp: `{/MV_VALUE}`, act: lv_bind });
  }

  test_bind_idempotent() {
    const lo_app_client = new ltcl_test_app();
    const lo_app = new z2ui5_cl_ui5_app_cont();
    lo_app.mo_app = lo_app_client;
    const lo_bind = new z2ui5_cl_ui5_srv_bind(lo_app);
    const lv_bind = lo_bind.main((lo_app_client.mv_value));
    const lv_bind2 = lo_bind.main((lo_app_client.mv_value));
    cl_abap_unit_assert.assert_equals({ exp: lv_bind2, act: lv_bind });
    cl_abap_unit_assert.assert_not_initial(lv_bind);
  }

  test_bind_adopt_filter() {
    const lo_app_client = new ltcl_test_app();
    const lo_app = new z2ui5_cl_ui5_app_cont();
    lo_app.mo_app = lo_app_client;
    const lo_bind = new z2ui5_cl_ui5_srv_bind(lo_app);
    lo_bind.main((lo_app_client.mv_value));
    cl_abap_unit_assert.assert_not_bound({ act: lo_bind.mr_attri.custom_filter, msg: `the plain first bind must not invent a filter` });
    const lo_filter = new ltcl_test_filter();
    lo_bind.main({ val: (lo_app_client.mv_value), config: { custom_filter: lo_filter } });
    cl_abap_unit_assert.assert_bound({ act: lo_bind.mr_attri.custom_filter, msg: `the second bind's filter has to reach the attribute` });
  }

  test_bind_adopt_json() {
    const lo_app_client = new ltcl_test_app();
    const lo_app = new z2ui5_cl_ui5_app_cont();
    lo_app.mo_app = lo_app_client;
    const lo_bind = new z2ui5_cl_ui5_srv_bind(lo_app);
    lo_bind.main((lo_app_client.mv_value));
    lo_bind.main({ val: (lo_app_client.mv_value), config: { check_json: true } });
    cl_abap_unit_assert.assert_equals({ exp: true, act: lo_bind.mr_attri.check_json, msg: `check_json asked for by the second bind has to stick` });
  }

  test_bind_keeps_json() {
    const lo_app_client = new ltcl_test_app();
    const lo_app = new z2ui5_cl_ui5_app_cont();
    lo_app.mo_app = lo_app_client;
    const lo_bind = new z2ui5_cl_ui5_srv_bind(lo_app);
    lo_bind.main({ val: (lo_app_client.mv_value), config: { check_json: true } });
    lo_bind.main((lo_app_client.mv_value));
    cl_abap_unit_assert.assert_equals({ exp: true, act: lo_bind.mr_attri.check_json, msg: `a plain rebind must not clear check_json` });
  }
}





class ltcl_test_main_structure {
  ms_struc = { input: ``, s_02: { input: ``, s_03: { input: ``, s_04: { input: `` } } } };

  test_bind_lev1() {
    const lo_test_app = new ltcl_test_main_structure();
    const lo_app = new z2ui5_cl_ui5_app_cont();
    lo_app.mo_app = lo_test_app;
    const lo_bind = new z2ui5_cl_ui5_srv_bind(lo_app);
    let lv_result = lo_bind.main((lo_test_app.ms_struc.input));
    cl_abap_unit_assert.assert_equals({ exp: `{/MS_STRUC/INPUT}`, act: lv_result });
    lv_result = lo_bind.main({ val: (lo_test_app.ms_struc.input), config: { path_only: true } });
    cl_abap_unit_assert.assert_equals({ exp: `/MS_STRUC/INPUT`, act: lv_result });
  }

  test_bind_lev2() {
    const lo_test_app = new ltcl_test_main_structure();
    const lo_app = new z2ui5_cl_ui5_app_cont();
    lo_app.mo_app = lo_test_app;
    const lo_bind = new z2ui5_cl_ui5_srv_bind(lo_app);
    const lv_result = lo_bind.main((lo_test_app.ms_struc.s_02.input));
    cl_abap_unit_assert.assert_equals({ exp: `{/MS_STRUC/S_02/INPUT}`, act: lv_result });
  }

  test_bind_lev3() {
    const lo_test_app = new ltcl_test_main_structure();
    const lo_app = new z2ui5_cl_ui5_app_cont();
    lo_app.mo_app = lo_test_app;
    const lo_bind = new z2ui5_cl_ui5_srv_bind(lo_app);
    const lv_result = lo_bind.main((lo_test_app.ms_struc.s_02.s_03.input));
    cl_abap_unit_assert.assert_equals({ exp: `{/MS_STRUC/S_02/S_03/INPUT}`, act: lv_result });
  }

  test_bind_lev4_long_name() {
    const lo_test_app = new ltcl_test_main_structure();
    const lo_app = new z2ui5_cl_ui5_app_cont();
    lo_app.mo_app = lo_test_app;
    const lo_bind = new z2ui5_cl_ui5_srv_bind(lo_app);
    const lv_result = lo_bind.main((lo_test_app.ms_struc.s_02.s_03.s_04.input));
    cl_abap_unit_assert.assert_equals({ exp: `{/MS_STRUC/S_02/S_03/S_04/INPUT}`, act: lv_result });
  }
}





class ltcl_test_main_object {
  mo_obj = null;
  mv_value = ``;
  ms_struc = { input: ``, s_02: { input: ``, s_03: { input: ``, s_04: { input: `` } } } };

  test_bind_value() {
    const lo_test_app = new ltcl_test_main_object();
    lo_test_app.mo_obj = new ltcl_test_main_object();
    lo_test_app.mo_obj.mv_value = `test`;
    const lo_app = new z2ui5_cl_ui5_app_cont();
    lo_app.mo_app = lo_test_app;
    const lo_bind = new z2ui5_cl_ui5_srv_bind(lo_app);
    const lv_result = lo_bind.main((lo_test_app.mo_obj.mv_value));
    cl_abap_unit_assert.assert_equals({ exp: `{/MO_OBJ/MV_VALUE}`, act: lv_result });
  }

  test_bind_struc() {
    const lo_test_app = new ltcl_test_main_object();
    lo_test_app.mo_obj = new ltcl_test_main_object();
    const lo_app = new z2ui5_cl_ui5_app_cont();
    lo_app.mo_app = lo_test_app;
    const lo_bind = new z2ui5_cl_ui5_srv_bind(lo_app);
    const lv_result = lo_bind.main((lo_test_app.mo_obj.ms_struc.input));
    cl_abap_unit_assert.assert_equals({ exp: `{/MO_OBJ/MS_STRUC/INPUT}`, act: lv_result });
  }
}





class ltcl_test_main_cell {
  mt_tab = [];
  mv_other = ``;

  setup() {
    this.mt_tab = [];
    this.mt_tab.push(z2ui5_cl_util.abap_copy({ name: `Michael Adams`, job: `Scrum Master` }));
    this.mt_tab.push(z2ui5_cl_util.abap_copy({ name: `John Miller`, job: `Product Owner` }));
  }

  bind() {
    let result = null;
    const lo_app = new z2ui5_cl_ui5_app_cont();
    lo_app.mo_app = this;
    result = new z2ui5_cl_ui5_srv_bind(lo_app);
    return result;
  }

  cell_name({ iv_index } = {}) {
    let result = null;
    let sy_subrc = 0;
    let fs_row = null;
    let _fs$fs_row = null;
    const lr_row = (this.mt_tab[(iv_index) - 1]);
    fs_row = lr_row;
    _fs$fs_row = null;
    sy_subrc = 0;
    result = (fs_row.name);
    return result;
  }

  test_cell_row1() {
    const lv_result = this.bind().main({ val: this.cell_name({ iv_index: 1 }), config: { tab: (this.mt_tab), tab_index: 1 } });
    cl_abap_unit_assert.assert_equals({ exp: `{/MT_TAB/0/NAME}`, act: lv_result });
  }

  test_cell_row2() {
    const lv_result = this.bind().main({ val: this.cell_name({ iv_index: 2 }), config: { tab: (this.mt_tab), tab_index: 2 } });
    cl_abap_unit_assert.assert_equals({ exp: `{/MT_TAB/1/NAME}`, act: lv_result });
  }

  test_cell_path_only() {
    const lv_result = this.bind().main({ val: this.cell_name({ iv_index: 1 }), config: { tab: (this.mt_tab), tab_index: 1, path_only: true } });
    cl_abap_unit_assert.assert_equals({ exp: `/MT_TAB/0/NAME`, act: lv_result });
  }

  test_cell_bad_index() {
    let lx_index;
    try {
      this.bind().main({ val: this.cell_name({ iv_index: 1 }), config: { tab: (this.mt_tab), tab_index: 3 } });
      cl_abap_unit_assert.fail(`a tab_index past the last row must raise the binding error`);
    } catch (_caught1) {
      lx_index = _caught1;
      cl_abap_unit_assert.assert_true((String(lx_index.get_text()).toLowerCase().includes(String(`BINDING_ERROR_TAB_CELL_LEVEL`).toLowerCase())));
    }
  }

  test_cell_foreign_val() {
    let lx_val;
    this.mv_other = z2ui5_cl_util.abap_tab_assign(this.mv_other, z2ui5_cl_util.abap_copy(this.mt_tab[(1) - 1].name));
    try {
      this.bind().main({ val: (this.mv_other), config: { tab: (this.mt_tab), tab_index: 1 } });
      cl_abap_unit_assert.fail(`a val that is not a component of the addressed row must raise the binding error`);
    } catch (_caught1) {
      lx_val = _caught1;
      cl_abap_unit_assert.assert_true((String(lx_val.get_text()).toLowerCase().includes(String(`BINDING_ERROR_TAB_CELL_LEVEL`).toLowerCase())));
    }
  }
}





module.exports = {
  __main: "z2ui5_cl_ui5_srv_bind",
  __classes: { ltcl_test_app, ltcl_test_filter, ltcl_test_bind, ltcl_test_main_structure, ltcl_test_main_object, ltcl_test_main_cell },
  __tests: {"ltcl_test_bind":["test_bind_path","test_attri_named_xx","test_bind_idempotent","test_bind_adopt_filter","test_bind_adopt_json","test_bind_keeps_json"],"ltcl_test_main_structure":["test_bind_lev1","test_bind_lev2","test_bind_lev3","test_bind_lev4_long_name"],"ltcl_test_main_object":["test_bind_value","test_bind_struc"],"ltcl_test_main_cell":["test_cell_row1","test_cell_row2","test_cell_path_only","test_cell_bad_index","test_cell_foreign_val"]},
};
