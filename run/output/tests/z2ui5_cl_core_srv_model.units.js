// GENERATED from run/input/abap2UI5/src/01/02/z2ui5_cl_core_srv_model.clas.testclasses.abap — do not edit
const cl_abap_datadescr = require("abap2UI5/cl_abap_datadescr");
const cl_abap_typedescr = require("abap2UI5/cl_abap_typedescr");
const cl_abap_unit_assert = require("abap2UI5/cl_abap_unit_assert");
const z2ui5_cl_ajson = require("abap2UI5/z2ui5_cl_ajson");
const z2ui5_cl_core_srv_model = require("abap2UI5/z2ui5_cl_core_srv_model");
const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");
const z2ui5_if_client = require("abap2UI5/z2ui5_if_client");
const z2ui5_if_core_types = require("abap2UI5/z2ui5_if_core_types");


class ltcl_test_dissolve {
  ms_struc = {};
  mv_value = ``;
  mr_value = null;
  mr_struc = null;
  mo_app = null;
  ms_struc2 = {};

  test_init() {
    const lo_app = new ltcl_test_dissolve();
    let lt_attri = [];
    const lo_model = new z2ui5_cl_core_srv_model({ attri: (lt_attri), app: lo_app });
    lo_model.dissolve();
    lo_model.dissolve();
    lo_model.dissolve();
    cl_abap_unit_assert.assert_not_initial((() => { try { return lt_attri.find((row) => row.name === `MR_STRUC`) ?? null; } catch { return null; } })());
    cl_abap_unit_assert.assert_not_initial((() => { try { return lt_attri.find((row) => row.name === `MR_VALUE`) ?? null; } catch { return null; } })());
    cl_abap_unit_assert.assert_not_initial((() => { try { return lt_attri.find((row) => row.name === `MS_STRUC`) ?? null; } catch { return null; } })());
    cl_abap_unit_assert.assert_not_initial((() => { try { return lt_attri.find((row) => row.name === `MV_VALUE`) ?? null; } catch { return null; } })());
  }

  test_dref() {
    const lo_app = new ltcl_test_dissolve();
    // TODO(abap2js): CREATE DATA lo_app->mr_struc.
    // TODO(abap2js): CREATE DATA lo_app->mr_value TYPE string.
    let lt_attri = [];
    const lo_model = new z2ui5_cl_core_srv_model({ attri: (lt_attri), app: lo_app });
    lo_model.dissolve();
    lo_model.dissolve();
    cl_abap_unit_assert.assert_not_initial((() => { try { return lt_attri.find((row) => row.name === `MR_VALUE->*`) ?? null; } catch { return null; } })());
  }

  test_oref() {
    const lo_app = new ltcl_test_dissolve();
    lo_app.mo_app = /* TODO(abap2js): NEW #( ) */ null;
    const lo_app2 = new ltcl_test_dissolve();
    lo_app2.mo_app = z2ui5_cl_util.abap_copy(lo_app);
    // TODO(abap2js): CREATE DATA lo_app->mo_app->mr_struc.
    // TODO(abap2js): CREATE DATA lo_app->mo_app->mr_value TYPE string.
    let lt_attri = [];
    const lo_model = new z2ui5_cl_core_srv_model({ attri: (lt_attri), app: lo_app2 });
    lo_model.dissolve();
    lo_model.dissolve();
    lo_model.dissolve();
    cl_abap_unit_assert.assert_not_initial((() => { try { return lt_attri.find((row) => row.name === `MO_APP->MV_VALUE`) ?? null; } catch { return null; } })());
    cl_abap_unit_assert.assert_not_initial((() => { try { return lt_attri.find((row) => row.name === `MO_APP->MR_STRUC`) ?? null; } catch { return null; } })());
    cl_abap_unit_assert.assert_not_initial((() => { try { return lt_attri.find((row) => row.name === `MO_APP->MR_VALUE`) ?? null; } catch { return null; } })());
    cl_abap_unit_assert.assert_not_initial((() => { try { return lt_attri.find((row) => row.name === `MO_APP->MS_STRUC`) ?? null; } catch { return null; } })());
  }

  test_struc() {
    const lo_app = new ltcl_test_dissolve();
    let lt_attri = [];
    const lo_model = new z2ui5_cl_core_srv_model({ attri: (lt_attri), app: lo_app });
    lo_model.dissolve();
    lo_model.dissolve();
    lo_model.dissolve();
    lo_model.dissolve();
    lo_model.dissolve();
    cl_abap_unit_assert.assert_not_initial((() => { try { return lt_attri.find((row) => row.name === `MS_STRUC-INPUT`) ?? null; } catch { return null; } })());
    cl_abap_unit_assert.assert_not_initial((() => { try { return lt_attri.find((row) => row.name === `MS_STRUC-S_02-INPUT`) ?? null; } catch { return null; } })());
    cl_abap_unit_assert.assert_not_initial((() => { try { return lt_attri.find((row) => row.name === `MS_STRUC-S_02-S_03-S_04-INPUT`) ?? null; } catch { return null; } })());
  }

  test_dref_struc() {
    const lo_app = new ltcl_test_dissolve();
    lo_app.mo_app = /* TODO(abap2js): NEW #( ) */ null;
    const lo_app2 = new ltcl_test_dissolve();
    lo_app2.mo_app = z2ui5_cl_util.abap_copy(lo_app);
    // TODO(abap2js): CREATE DATA lo_app->mr_struc.
    let lt_attri = [];
    const lo_model = new z2ui5_cl_core_srv_model({ attri: (lt_attri), app: lo_app });
    lo_model.dissolve();
    lo_model.dissolve();
    lo_model.dissolve();
    cl_abap_unit_assert.assert_not_initial((() => { try { return lt_attri.find((row) => row.name === `MR_STRUC`) ?? null; } catch { return null; } })());
    cl_abap_unit_assert.assert_not_initial((() => { try { return lt_attri.find((row) => row.name === `MR_STRUC->INPUT`) ?? null; } catch { return null; } })());
    cl_abap_unit_assert.assert_not_initial((() => { try { return lt_attri.find((row) => row.name === `MR_STRUC->S_02-INPUT`) ?? null; } catch { return null; } })());
  }

  test_oref_dref() {
    const lo_app = new ltcl_test_dissolve();
    const lo_app2 = new ltcl_test_dissolve();
    lo_app.mo_app = z2ui5_cl_util.abap_copy(lo_app2);
    // TODO(abap2js): CREATE DATA lo_app2->mr_value TYPE string.
    let lt_attri = [];
    const lo_model = new z2ui5_cl_core_srv_model({ attri: (lt_attri), app: lo_app });
    lo_model.dissolve();
    lo_model.dissolve();
    lo_model.dissolve();
    cl_abap_unit_assert.assert_not_initial((() => { try { return lt_attri.find((row) => row.name === `MO_APP->MR_VALUE->*`) ?? null; } catch { return null; } })());
  }

  test_oref_dref_struc() {
    const lo_app = new ltcl_test_dissolve();
    const lo_app2 = new ltcl_test_dissolve();
    lo_app.mo_app = z2ui5_cl_util.abap_copy(lo_app2);
    // TODO(abap2js): CREATE DATA lo_app->mo_app->mr_struc.
    let lt_attri = [];
    const lo_model = new z2ui5_cl_core_srv_model({ attri: (lt_attri), app: lo_app });
    lo_model.dissolve();
    lo_model.dissolve();
    lo_model.dissolve();
    lo_model.dissolve();
    cl_abap_unit_assert.assert_not_initial((() => { try { return lt_attri.find((row) => row.name === `MO_APP->MR_STRUC`) ?? null; } catch { return null; } })());
    cl_abap_unit_assert.assert_not_initial((() => { try { return lt_attri.find((row) => row.name === `MO_APP->MR_STRUC->INPUT`) ?? null; } catch { return null; } })());
    cl_abap_unit_assert.assert_not_initial((() => { try { return lt_attri.find((row) => row.name === `MO_APP->MR_STRUC->S_02-INPUT`) ?? null; } catch { return null; } })());
  }

  test_struc_dref() {
    const lo_app = new ltcl_test_dissolve();
    lo_app.mo_app = /* TODO(abap2js): NEW #( ) */ null;
    // TODO(abap2js): CREATE DATA lo_app->mo_app->ms_struc2-r_ref TYPE string.
    let lt_attri = [];
    const lo_model = new z2ui5_cl_core_srv_model({ attri: (lt_attri), app: lo_app });
    lo_model.dissolve();
    lo_model.dissolve();
    lo_model.dissolve();
    lo_model.dissolve();
    cl_abap_unit_assert.assert_not_initial((() => { try { return lt_attri.find((row) => row.name === `MO_APP->MS_STRUC2-R_REF`) ?? null; } catch { return null; } })());
    cl_abap_unit_assert.assert_not_initial((() => { try { return lt_attri.find((row) => row.name === `MO_APP->MS_STRUC2-R_REF->*`) ?? null; } catch { return null; } })());
  }
}



class ltcl_test_app_sub {
  mv_value = ``;
  mr_value = null;

  constructor() {
  }
}



class ltcl_test_app3 {
  mv_value = ``;
  mr_value = null;
  mo_app = null;

  constructor() {
    this.mo_app = /* TODO(abap2js): NEW #( ) */ null;
  }
}



class ltcl_test_get_attri {
  test_first() {
    const lo_app_client = new ltcl_test_app3();
    let lr_value = null;
    // TODO(abap2js): GET REFERENCE OF lo_app_client->mv_value INTO lr_value.
    const lt_attri = {};
    const lo_model = new z2ui5_cl_core_srv_model({ attri: (lt_attri), app: lo_app_client });
    const lr_attri = lo_model.attri_get_val_ref(`MV_VALUE`);
    if ((lo_app_client.mv_value) !== lr_attri) {
      cl_abap_unit_assert.abort();
    }
  }

  test_second() {
    const lo_app_client = new ltcl_test_app3();
    // TODO(abap2js): CREATE DATA lo_app_client->mr_value.
    const lt_attri = {};
    const lo_model = new z2ui5_cl_core_srv_model({ attri: (lt_attri), app: lo_app_client });
    const lr_attri = lo_model.attri_get_val_ref(`MR_VALUE->*`);
    if (lr_attri !== lo_app_client.mr_value) {
      cl_abap_unit_assert.abort();
    }
  }

  third_test() {
    const lo_app_client = new ltcl_test_app3();
    const lt_attri = {};
    const lo_model = new z2ui5_cl_core_srv_model({ attri: (lt_attri), app: lo_app_client });
    const lr_attri = lo_model.attri_get_val_ref(`MO_APP->MV_VALUE`);
    if ((lo_app_client.mo_app.mv_value) !== lr_attri) {
      cl_abap_unit_assert.abort();
    }
  }

  test4() {
    const lo_app_client = new ltcl_test_app3();
    // TODO(abap2js): CREATE DATA lo_app_client->mo_app->mr_value.
    const lt_attri = {};
    const lo_model = new z2ui5_cl_core_srv_model({ attri: (lt_attri), app: lo_app_client });
    const lr_attri = lo_model.attri_get_val_ref(`MO_APP->MR_VALUE->*`);
    if (lr_attri !== lo_app_client.mo_app.mr_value) {
      cl_abap_unit_assert.abort();
    }
  }
}



class ltcl_test_app_root_attri {
  mr_tab = null;

  constructor({ ir_tab } = {}) {
    this.mr_tab = z2ui5_cl_util.abap_copy(ir_tab);
  }

  test_obj_tab_ref() {
    if (sy_sysid === `ABC`) {
      return;
    }
    const lo_app = new ltcl_test_app_root();
    const lt_attri = {};
    const lo_model = new z2ui5_cl_core_srv_model({ attri: (lt_attri), app: lo_app });
    const ls_attri = lo_model.main_attri_search(lo_app.mo_obj.mr_tab);
    if (ls_attri.name !== `MT_TAB`) {
      cl_abap_unit_assert.abort();
    }
  }
}



class ltcl_test_app_root {
  mt_tab = [];
  mo_obj = null;

  constructor() {
    this.mt_tab.push({ comp1: `comp1`, comp2: `comp2` });
    this.mo_obj = new ltcl_test_app_root_attri({ ir_tab: (this.mt_tab) });
  }
}



class ltcl_test_app_root_attri2 {
  mr_struc = null;

  constructor({ ir_struc } = {}) {
    this.mr_struc = z2ui5_cl_util.abap_copy(ir_struc);
  }

  test_obj_struc_ref() {
    if (sy_sysid === `ABC`) {
      return;
    }
    const lo_app = new ltcl_test_app_root2();
    const lt_attri = {};
    const lo_model = new z2ui5_cl_core_srv_model({ attri: (lt_attri), app: lo_app });
    const ls_attri = lo_model.main_attri_search(lo_app.mo_obj.mr_struc);
    if (ls_attri.name !== `MS_STRUC`) {
      cl_abap_unit_assert.abort();
    }
  }
}



class ltcl_test_app_root2 {
  ms_struc = {};
  mo_obj = null;

  constructor() {
    this.ms_struc = { comp1: `comp1`, comp2: `comp2` };
    this.mo_obj = new ltcl_test_app_root_attri2({ ir_struc: (this.ms_struc) });
  }
}



class ltcl_test_app_root4 {
  mr_tab = null;

  test_tab_ref_gen() {
    let sy_subrc = 0;
    let fs_tab = null;
    let _fs$fs_tab = null;
    if (sy_sysid === `ABC`) {
      return;
    }
    let lo_app = new ltcl_test_app_root4();
    // TODO(abap2js): CREATE DATA lo_app->mr_tab TYPE ty_t_tab.
    // TODO(abap2js): ASSIGN lo_app->mr_tab->* TO <tab>.
    fs_tab.push({ comp1: `comp1`, comp2: `comp2` });
    const lt_attri = {};
    let lo_model = new z2ui5_cl_core_srv_model({ attri: (lt_attri), app: lo_app });
    const ls_attri = lo_model.main_attri_search(lo_app.mr_tab);
    if (ls_attri.name !== `MR_TAB->*`) {
      cl_abap_unit_assert.abort();
    }
    lo_model.main_attri_db_save_srtti();
    lo_app = new ltcl_test_app_root4();
    lo_model = new z2ui5_cl_core_srv_model({ attri: (lt_attri), app: lo_app });
    lo_model.main_attri_db_load();
    if (lo_app.mr_tab != null) {
      cl_abap_unit_assert.abort();
    }
  }
}



class ltcl_app_inner {
  mv_inner = ``;
  mr_data = null;
}



class ltcl_app_middle {
  mv_mid = ``;
  mo_inner = null;
}



class ltcl_app_complex extends z2ui5_if_app {
  mt_tab = [];
  ms_nested = {};
  mo_mid = null;
  ms_ref = {};
  mr_tab = null;
  mv_simple = ``;
  mv_int = 0;

  async main(client) {
  }
}



class ltcl_test_diss_complex {
  test_table() {
    const lo_app = new ltcl_app_complex();
    lo_app.mt_tab = [{ col1: `A`, col2: `1` }, { col1: `B`, col2: `2` }];
    let lt_attri = [];
    const lo_model = new z2ui5_cl_core_srv_model({ attri: (lt_attri), app: lo_app });
    lo_model.dissolve();
    cl_abap_unit_assert.assert_not_initial((() => { try { return lt_attri.find((row) => row.name === `MT_TAB`) ?? null; } catch { return null; } })());
    const ls_attri = (() => { try { return lt_attri.find((row) => row.name === `MT_TAB`) ?? null; } catch { return null; } })();
    cl_abap_unit_assert.assert_equals({ exp: cl_abap_datadescr.typekind_table, act: ls_attri.type_kind });
  }

  test_nested_struc() {
    const lo_app = new ltcl_app_complex();
    lo_app.ms_nested = { name: `test`, value: `123`, inner: { deep1: `d1`, deep2: `d2` } };
    let lt_attri = [];
    const lo_model = new z2ui5_cl_core_srv_model({ attri: (lt_attri), app: lo_app });
    lo_model.dissolve();
    lo_model.dissolve();
    lo_model.dissolve();
    cl_abap_unit_assert.assert_not_initial((() => { try { return lt_attri.find((row) => row.name === `MS_NESTED-NAME`) ?? null; } catch { return null; } })());
    cl_abap_unit_assert.assert_not_initial((() => { try { return lt_attri.find((row) => row.name === `MS_NESTED-VALUE`) ?? null; } catch { return null; } })());
    cl_abap_unit_assert.assert_not_initial((() => { try { return lt_attri.find((row) => row.name === `MS_NESTED-INNER-DEEP1`) ?? null; } catch { return null; } })());
    cl_abap_unit_assert.assert_not_initial((() => { try { return lt_attri.find((row) => row.name === `MS_NESTED-INNER-DEEP2`) ?? null; } catch { return null; } })());
  }

  test_oref_chain() {
    const lo_app = new ltcl_app_complex();
    lo_app.mo_mid = /* TODO(abap2js): NEW #( ) */ null;
    lo_app.mo_mid.mo_inner = /* TODO(abap2js): NEW #( ) */ null;
    let lt_attri = [];
    const lo_model = new z2ui5_cl_core_srv_model({ attri: (lt_attri), app: lo_app });
    lo_model.dissolve();
    lo_model.dissolve();
    lo_model.dissolve();
    cl_abap_unit_assert.assert_not_initial((() => { try { return lt_attri.find((row) => row.name === `MO_MID->MV_MID`) ?? null; } catch { return null; } })());
    cl_abap_unit_assert.assert_not_initial((() => { try { return lt_attri.find((row) => row.name === `MO_MID->MO_INNER`) ?? null; } catch { return null; } })());
    cl_abap_unit_assert.assert_not_initial((() => { try { return lt_attri.find((row) => row.name === `MO_MID->MO_INNER->MV_INNER`) ?? null; } catch { return null; } })());
  }

  test_table_in_dref() {
    let sy_subrc = 0;
    let fs_tab = null;
    let _fs$fs_tab = null;
    const lo_app = new ltcl_app_complex();
    // TODO(abap2js): CREATE DATA lo_app->mr_tab LIKE lo_app->mt_tab.
    // TODO(abap2js): ASSIGN lo_app->mr_tab->* TO <tab>.
    let ls_row = [];
    ls_row.col1 = `X`;
    ls_row.col2 = `Y`;
    fs_tab.push(ls_row);
    let lt_attri = [];
    const lo_model = new z2ui5_cl_core_srv_model({ attri: (lt_attri), app: lo_app });
    lo_model.dissolve();
    lo_model.dissolve();
    cl_abap_unit_assert.assert_not_initial((() => { try { return lt_attri.find((row) => row.name === `MR_TAB`) ?? null; } catch { return null; } })());
    cl_abap_unit_assert.assert_not_initial((() => { try { return lt_attri.find((row) => row.name === `MR_TAB->*`) ?? null; } catch { return null; } })());
    const ls_tab = (() => { try { return lt_attri.find((row) => row.name === `MR_TAB->*`) ?? null; } catch { return null; } })();
    cl_abap_unit_assert.assert_equals({ exp: cl_abap_datadescr.typekind_table, act: ls_tab.type_kind });
  }

  test_mixed_types() {
    const lo_app = new ltcl_app_complex();
    lo_app.mt_tab = [{ col1: `A`, col2: `1` }];
    lo_app.ms_nested.name = `test`;
    lo_app.mo_mid = /* TODO(abap2js): NEW #( ) */ null;
    // TODO(abap2js): CREATE DATA lo_app->mr_tab LIKE lo_app->mt_tab.
    let lt_attri = [];
    const lo_model = new z2ui5_cl_core_srv_model({ attri: (lt_attri), app: lo_app });
    lo_model.dissolve();
    lo_model.dissolve();
    lo_model.dissolve();
    cl_abap_unit_assert.assert_not_initial((() => { try { return lt_attri.find((row) => row.name === `MT_TAB`) ?? null; } catch { return null; } })());
    cl_abap_unit_assert.assert_not_initial((() => { try { return lt_attri.find((row) => row.name === `MS_NESTED-NAME`) ?? null; } catch { return null; } })());
    cl_abap_unit_assert.assert_not_initial((() => { try { return lt_attri.find((row) => row.name === `MO_MID->MV_MID`) ?? null; } catch { return null; } })());
    cl_abap_unit_assert.assert_not_initial((() => { try { return lt_attri.find((row) => row.name === `MR_TAB`) ?? null; } catch { return null; } })());
    cl_abap_unit_assert.assert_not_initial((() => { try { return lt_attri.find((row) => row.name === `MV_SIMPLE`) ?? null; } catch { return null; } })());
    cl_abap_unit_assert.assert_not_initial((() => { try { return lt_attri.find((row) => row.name === `MV_INT`) ?? null; } catch { return null; } })());
  }

  test_dissolve_idempotent() {
    const lo_app = new ltcl_app_complex();
    lo_app.ms_nested.name = `test`;
    lo_app.mo_mid = /* TODO(abap2js): NEW #( ) */ null;
    let lt_attri = [];
    const lo_model = new z2ui5_cl_core_srv_model({ attri: (lt_attri), app: lo_app });
    lo_model.dissolve();
    lo_model.dissolve();
    lo_model.dissolve();
    const lv_count_1 = z2ui5_cl_util.abap_copy(lt_attri.length);
    lo_model.dissolve();
    const lv_count_2 = z2ui5_cl_util.abap_copy(lt_attri.length);
    cl_abap_unit_assert.assert_equals({ exp: lv_count_1, act: lv_count_2 });
  }

  test_search_table() {
    if (sy_sysid === `ABC`) {
      return;
    }
    const lo_app = new ltcl_app_complex();
    lo_app.mt_tab = [{ col1: `A`, col2: `1` }];
    let lt_attri = [];
    const lo_model = new z2ui5_cl_core_srv_model({ attri: (lt_attri), app: lo_app });
    const ls_attri = lo_model.main_attri_search((lo_app.mt_tab));
    cl_abap_unit_assert.assert_equals({ exp: `MT_TAB`, act: ls_attri.name });
  }

  test_search_nested_struc() {
    if (sy_sysid === `ABC`) {
      return;
    }
    const lo_app = new ltcl_app_complex();
    lo_app.ms_nested.inner.deep1 = `found`;
    let lt_attri = [];
    const lo_model = new z2ui5_cl_core_srv_model({ attri: (lt_attri), app: lo_app });
    const ls_attri = lo_model.main_attri_search((lo_app.ms_nested.inner.deep1));
    cl_abap_unit_assert.assert_equals({ exp: `MS_NESTED-INNER-DEEP1`, act: ls_attri.name });
  }

  test_name_parent_chain() {
    const lo_app = new ltcl_app_complex();
    lo_app.mo_mid = /* TODO(abap2js): NEW #( ) */ null;
    lo_app.mo_mid.mo_inner = /* TODO(abap2js): NEW #( ) */ null;
    let lt_attri = [];
    const lo_model = new z2ui5_cl_core_srv_model({ attri: (lt_attri), app: lo_app });
    lo_model.dissolve();
    lo_model.dissolve();
    lo_model.dissolve();
    const ls_mid = (() => { try { return lt_attri.find((row) => row.name === `MO_MID->MO_INNER`) ?? null; } catch { return null; } })();
    cl_abap_unit_assert.assert_equals({ exp: `MO_MID`, act: ls_mid.name_parent });
    const ls_inner = (() => { try { return lt_attri.find((row) => row.name === `MO_MID->MO_INNER->MV_INNER`) ?? null; } catch { return null; } })();
    cl_abap_unit_assert.assert_equals({ exp: `MO_MID->MO_INNER`, act: ls_inner.name_parent });
  }
}



class ltcl_app_inner_335 {
  mr_data = null;

  constructor({ ir_data } = {}) {
    this.mr_data = z2ui5_cl_util.abap_copy(ir_data);
  }
}



class ltcl_app_root_335 {
  ms_struc = {};
  mo_obj = null;
  mo_obj_2 = null;

  constructor() {
    this.ms_struc = { comp1: `comp1`, comp2: `comp2` };
    this.mo_obj = new ltcl_app_inner_335({ ir_data: (this.ms_struc) });
    this.mo_obj_2 = new ltcl_app_inner_335({ ir_data: (this.ms_struc) });
  }
}



class ltcl_test_sample335 {
  test_two_drefs_to_same_struc() {
    if (sy_sysid === `ABC`) {
      return;
    }
    const lo_app = new ltcl_app_root_335();
    let lt_attri = [];
    const lo_model = new z2ui5_cl_core_srv_model({ attri: (lt_attri), app: lo_app });
    lo_model.dissolve();
    lo_model.dissolve();
    lo_model.dissolve();
    const ls_mr_data_1 = (() => { try { return lt_attri.find((row) => row.name === `MO_OBJ->MR_DATA`) ?? null; } catch { return null; } })();
    cl_abap_unit_assert.assert_equals({ exp: `MS_STRUC`, act: ls_mr_data_1.name_ref });
    const ls_mr_data_2 = (() => { try { return lt_attri.find((row) => row.name === `MO_OBJ_2->MR_DATA`) ?? null; } catch { return null; } })();
    cl_abap_unit_assert.assert_equals({ exp: `MS_STRUC`, act: ls_mr_data_2.name_ref });
  }
}



class ltcl_test_attri_create {
  test_string_type_kind() {
    const lo_app = new ltcl_app_complex();
    let lt_attri = [];
    const lo_model = new z2ui5_cl_core_srv_model({ attri: (lt_attri), app: lo_app });
    const ls_result = lo_model.attri_create_new(`MV_SIMPLE`);
    cl_abap_unit_assert.assert_equals({ exp: cl_abap_datadescr.typekind_string, act: ls_result.type_kind });
  }

  test_table_type_kind() {
    const lo_app = new ltcl_app_complex();
    let lt_attri = [];
    const lo_model = new z2ui5_cl_core_srv_model({ attri: (lt_attri), app: lo_app });
    const ls_result = lo_model.attri_create_new(`MT_TAB`);
    cl_abap_unit_assert.assert_equals({ exp: cl_abap_datadescr.typekind_table, act: ls_result.type_kind });
  }

  test_oref_type_kind() {
    const lo_app = new ltcl_app_complex();
    lo_app.mo_mid = /* TODO(abap2js): NEW #( ) */ null;
    let lt_attri = [];
    const lo_model = new z2ui5_cl_core_srv_model({ attri: (lt_attri), app: lo_app });
    const ls_result = lo_model.attri_create_new(`MO_MID`);
    cl_abap_unit_assert.assert_equals({ exp: cl_abap_datadescr.typekind_oref, act: ls_result.type_kind });
  }

  test_int_kind() {
    const lo_app = new ltcl_app_complex();
    let lt_attri = [];
    const lo_model = new z2ui5_cl_core_srv_model({ attri: (lt_attri), app: lo_app });
    const ls_result = lo_model.attri_create_new(`MV_INT`);
    cl_abap_unit_assert.assert_equals({ exp: cl_abap_typedescr.kind_elem, act: ls_result.kind });
  }
}



class ltcl_test_json_stringify {
  test_simple_string() {
    let sy_subrc = 0;
    const lo_app = new ltcl_app_complex();
    lo_app.mv_simple = `hello`;
    let lt_attri = [];
    const lo_model = new z2ui5_cl_core_srv_model({ attri: (lt_attri), app: lo_app });
    lo_model.dissolve();
    let lr_simple = {};
    {
      const _t = lt_attri;
      const _i = _t.findIndex((_r) => _r.name === `MV_SIMPLE`);
      sy_subrc = _i >= 0 && _i < _t.length ? 0 : 4;
      if (sy_subrc === 0) lr_simple = _t[_i];
    }
    if (sy_subrc !== 0) {
      cl_abap_unit_assert.abort();
    }
    lr_simple.bind_type = z2ui5_cl_util.abap_copy(z2ui5_if_core_types.cs_bind_type.one_way);
    lr_simple.name_client = `/MV_SIMPLE`;
    const lv_json = lo_model.main_json_stringify();
    const lo_result = z2ui5_cl_ajson.parse(lv_json);
    cl_abap_unit_assert.assert_equals({ exp: `hello`, act: lo_result.get_string(`/MV_SIMPLE`) });
  }

  test_empty_no_bind() {
    const lo_app = new ltcl_app_complex();
    let lt_attri = [];
    const lo_model = new z2ui5_cl_core_srv_model({ attri: (lt_attri), app: lo_app });
    lo_model.dissolve();
    const lv_json = lo_model.main_json_stringify();
    cl_abap_unit_assert.assert_equals({ exp: `{}`, act: lv_json });
  }
}



class ltcl_test_json_to_attri {
  test_updates_two_way() {
    let sy_subrc = 0;
    const lo_app = new ltcl_app_complex();
    let lt_attri = [];
    const lo_model = new z2ui5_cl_core_srv_model({ attri: (lt_attri), app: lo_app });
    lo_model.dissolve();
    let lr = {};
    {
      const _t = lt_attri;
      const _i = _t.findIndex((_r) => _r.name === `MV_SIMPLE`);
      sy_subrc = _i >= 0 && _i < _t.length ? 0 : 4;
      if (sy_subrc === 0) lr = _t[_i];
    }
    if (sy_subrc !== 0) {
      cl_abap_unit_assert.abort();
    }
    lr.bind_type = z2ui5_cl_util.abap_copy(z2ui5_if_core_types.cs_bind_type.two_way);
    lr.view = z2ui5_cl_util.abap_copy(z2ui5_if_client.cs_view.main);
    lr.name_client = `/MV_SIMPLE`;
    let lo_model_json = null;
    lo_model_json = z2ui5_cl_ajson.create_empty();
    lo_model_json.set({ iv_path: `/MV_SIMPLE`, iv_val: `updated` });
    lo_model.main_json_to_attri({ view: z2ui5_if_client.cs_view.main, model: lo_model_json });
    cl_abap_unit_assert.assert_equals({ exp: `updated`, act: lo_app.mv_simple });
  }

  test_skips_one_way() {
    let sy_subrc = 0;
    const lo_app = new ltcl_app_complex();
    let lt_attri = [];
    const lo_model = new z2ui5_cl_core_srv_model({ attri: (lt_attri), app: lo_app });
    lo_model.dissolve();
    let lr = {};
    {
      const _t = lt_attri;
      const _i = _t.findIndex((_r) => _r.name === `MV_SIMPLE`);
      sy_subrc = _i >= 0 && _i < _t.length ? 0 : 4;
      if (sy_subrc === 0) lr = _t[_i];
    }
    if (sy_subrc !== 0) {
      cl_abap_unit_assert.abort();
    }
    lr.bind_type = z2ui5_cl_util.abap_copy(z2ui5_if_core_types.cs_bind_type.one_way);
    lr.view = z2ui5_cl_util.abap_copy(z2ui5_if_client.cs_view.main);
    lr.name_client = `/MV_SIMPLE`;
    let lo_model_json = null;
    lo_model_json = z2ui5_cl_ajson.create_empty();
    lo_model_json.set({ iv_path: `/MV_SIMPLE`, iv_val: `should_not_update` });
    lo_model.main_json_to_attri({ view: z2ui5_if_client.cs_view.main, model: lo_model_json });
    cl_abap_unit_assert.assert_equals({ exp: ``, act: lo_app.mv_simple });
  }

  test_view_filter() {
    let sy_subrc = 0;
    const lo_app = new ltcl_app_complex();
    let lt_attri = [];
    const lo_model = new z2ui5_cl_core_srv_model({ attri: (lt_attri), app: lo_app });
    lo_model.dissolve();
    let lr = {};
    {
      const _t = lt_attri;
      const _i = _t.findIndex((_r) => _r.name === `MV_SIMPLE`);
      sy_subrc = _i >= 0 && _i < _t.length ? 0 : 4;
      if (sy_subrc === 0) lr = _t[_i];
    }
    if (sy_subrc !== 0) {
      cl_abap_unit_assert.abort();
    }
    lr.bind_type = z2ui5_cl_util.abap_copy(z2ui5_if_core_types.cs_bind_type.two_way);
    lr.view = z2ui5_cl_util.abap_copy(z2ui5_if_client.cs_view.popup);
    lr.name_client = `/MV_SIMPLE`;
    let lo_model_json = null;
    lo_model_json = z2ui5_cl_ajson.create_empty();
    lo_model_json.set({ iv_path: `/MV_SIMPLE`, iv_val: `should_not_update` });
    lo_model.main_json_to_attri({ view: z2ui5_if_client.cs_view.main, model: lo_model_json });
    cl_abap_unit_assert.assert_equals({ exp: ``, act: lo_app.mv_simple });
  }
}



class ltcl_test_attri_refresh {
  test_bindings_preserved() {
    let sy_subrc = 0;
    const lo_app = new ltcl_app_complex();
    let lt_attri = [];
    const lo_model = new z2ui5_cl_core_srv_model({ attri: (lt_attri), app: lo_app });
    lo_model.dissolve();
    let lr = {};
    {
      const _t = lt_attri;
      const _i = _t.findIndex((_r) => _r.name === `MV_SIMPLE`);
      sy_subrc = _i >= 0 && _i < _t.length ? 0 : 4;
      if (sy_subrc === 0) lr = _t[_i];
    }
    if (sy_subrc !== 0) {
      cl_abap_unit_assert.abort();
    }
    lr.bind_type = z2ui5_cl_util.abap_copy(z2ui5_if_core_types.cs_bind_type.two_way);
    lr.name_client = `/XX/MV_SIMPLE`;
    lr.view = z2ui5_cl_util.abap_copy(z2ui5_if_client.cs_view.main);
    lo_model.main_attri_refresh();
    const ls_after = (() => { try { return lt_attri.find((row) => row.name === `MV_SIMPLE`) ?? null; } catch { return null; } })();
    cl_abap_unit_assert.assert_equals({ exp: z2ui5_if_core_types.cs_bind_type.two_way, act: ls_after.bind_type });
    cl_abap_unit_assert.assert_equals({ exp: `/XX/MV_SIMPLE`, act: ls_after.name_client });
    cl_abap_unit_assert.assert_equals({ exp: z2ui5_if_client.cs_view.main, act: ls_after.view });
  }
}



class ltcl_test_entry_refs_children {
  test_dref_children_name_ref() {
    if (sy_sysid === `ABC`) {
      return;
    }
    const lo_app = new ltcl_app_root_335();
    let lt_attri = [];
    const lo_model = new z2ui5_cl_core_srv_model({ attri: (lt_attri), app: lo_app });
    lo_model.dissolve();
    lo_model.dissolve();
    lo_model.dissolve();
    const ls_child1 = (() => { try { return lt_attri.find((row) => row.name === `MO_OBJ->MR_DATA->COMP1`) ?? null; } catch { return null; } })();
    cl_abap_unit_assert.assert_equals({ exp: `MS_STRUC-COMP1`, act: ls_child1.name_ref });
    const ls_child2 = (() => { try { return lt_attri.find((row) => row.name === `MO_OBJ->MR_DATA->COMP2`) ?? null; } catch { return null; } })();
    cl_abap_unit_assert.assert_equals({ exp: `MS_STRUC-COMP2`, act: ls_child2.name_ref });
  }

  test_second_dref_children() {
    if (sy_sysid === `ABC`) {
      return;
    }
    const lo_app = new ltcl_app_root_335();
    let lt_attri = [];
    const lo_model = new z2ui5_cl_core_srv_model({ attri: (lt_attri), app: lo_app });
    lo_model.dissolve();
    lo_model.dissolve();
    lo_model.dissolve();
    const ls_child1 = (() => { try { return lt_attri.find((row) => row.name === `MO_OBJ_2->MR_DATA->COMP1`) ?? null; } catch { return null; } })();
    cl_abap_unit_assert.assert_equals({ exp: `MS_STRUC-COMP1`, act: ls_child1.name_ref });
    const ls_child2 = (() => { try { return lt_attri.find((row) => row.name === `MO_OBJ_2->MR_DATA->COMP2`) ?? null; } catch { return null; } })();
    cl_abap_unit_assert.assert_equals({ exp: `MS_STRUC-COMP2`, act: ls_child2.name_ref });
  }
}



class ltcl_app_tree extends z2ui5_if_app {
  mt_tree = [];

  async main(client) {
  }
}



class ltcl_test_delta_apply {
  test_update_first_row() {
    const lo_app = new ltcl_app_complex();
    lo_app.mt_tab = [{ col1: `A`, col2: `1` }, { col1: `B`, col2: `2` }];
    let lt_attri = [];
    const lo_model = new z2ui5_cl_core_srv_model({ attri: (lt_attri), app: lo_app });
    let lo_delta = null;
    lo_delta = z2ui5_cl_ajson.create_empty();
    lo_delta.set({ iv_path: `/__delta/0/COL1`, iv_val: `X` });
    lo_model.delta_apply_to_table({ io_val_front: lo_delta, iv_name: `MT_TAB` });
    cl_abap_unit_assert.assert_equals({ exp: `X`, act: lo_app.mt_tab[(1) - 1].col1 });
    cl_abap_unit_assert.assert_equals({ exp: `1`, act: lo_app.mt_tab[(1) - 1].col2 });
    cl_abap_unit_assert.assert_equals({ exp: `B`, act: lo_app.mt_tab[(2) - 1].col1 });
  }

  test_update_second_row() {
    const lo_app = new ltcl_app_complex();
    lo_app.mt_tab = [{ col1: `A`, col2: `1` }, { col1: `B`, col2: `2` }];
    let lt_attri = [];
    const lo_model = new z2ui5_cl_core_srv_model({ attri: (lt_attri), app: lo_app });
    let lo_delta = null;
    lo_delta = z2ui5_cl_ajson.create_empty();
    lo_delta.set({ iv_path: `/__delta/1/COL2`, iv_val: `Y` });
    lo_model.delta_apply_to_table({ io_val_front: lo_delta, iv_name: `MT_TAB` });
    cl_abap_unit_assert.assert_equals({ exp: `A`, act: lo_app.mt_tab[(1) - 1].col1 });
    cl_abap_unit_assert.assert_equals({ exp: `Y`, act: lo_app.mt_tab[(2) - 1].col2 });
    cl_abap_unit_assert.assert_equals({ exp: `B`, act: lo_app.mt_tab[(2) - 1].col1 });
  }

  test_out_of_range() {
    const lo_app = new ltcl_app_complex();
    lo_app.mt_tab = [{ col1: `A`, col2: `1` }];
    let lt_attri = [];
    const lo_model = new z2ui5_cl_core_srv_model({ attri: (lt_attri), app: lo_app });
    let lo_delta = null;
    lo_delta = z2ui5_cl_ajson.create_empty();
    lo_delta.set({ iv_path: `/__delta/5/COL1`, iv_val: `Z` });
    lo_model.delta_apply_to_table({ io_val_front: lo_delta, iv_name: `MT_TAB` });
    cl_abap_unit_assert.assert_equals({ exp: 1, act: lo_app.mt_tab.length });
    cl_abap_unit_assert.assert_equals({ exp: `A`, act: lo_app.mt_tab[(1) - 1].col1 });
  }

  tree_app_create() {
    let result = null;
    result = /* TODO(abap2js): NEW #( ) */ null;
    result.mt_tree = [{ user: `Manager`, enabled: false, s_adr: { city: `Old Town`, zip: `00000` }, nodes: [{ user: `E1`, validated: false }, { user: `E2`, validated: false }] }];
    return result;
  }

  test_nested_cell() {
    const lo_app = this.tree_app_create();
    let lt_attri = [];
    const lo_model = new z2ui5_cl_core_srv_model({ attri: (lt_attri), app: lo_app });
    const lo_delta = (z2ui5_cl_ajson.parse(`{"__delta":{"0":{"NODES":{"__delta":{"1":{"VALIDATED":true}}}}}}`));
    lo_model.delta_apply_to_table({ io_val_front: lo_delta, iv_name: `MT_TREE` });
    cl_abap_unit_assert.assert_equals({ exp: true, act: lo_app.mt_tree[(1) - 1].nodes[(2) - 1].validated });
    cl_abap_unit_assert.assert_equals({ exp: false, act: lo_app.mt_tree[(1) - 1].nodes[(1) - 1].validated });
    cl_abap_unit_assert.assert_equals({ exp: `E1`, act: lo_app.mt_tree[(1) - 1].nodes[(1) - 1].user });
    cl_abap_unit_assert.assert_equals({ exp: `Manager`, act: lo_app.mt_tree[(1) - 1].user });
  }

  test_nested_mixed() {
    const lo_app = this.tree_app_create();
    let lt_attri = [];
    const lo_model = new z2ui5_cl_core_srv_model({ attri: (lt_attri), app: lo_app });
    const lo_delta = (z2ui5_cl_ajson.parse(`{"__delta":{"0":{"ENABLED":true,"NODES":{"__delta":{"0":{"USER":"E1-NEW"}}}}}}`));
    lo_model.delta_apply_to_table({ io_val_front: lo_delta, iv_name: `MT_TREE` });
    cl_abap_unit_assert.assert_equals({ exp: true, act: lo_app.mt_tree[(1) - 1].enabled });
    cl_abap_unit_assert.assert_equals({ exp: `E1-NEW`, act: lo_app.mt_tree[(1) - 1].nodes[(1) - 1].user });
    cl_abap_unit_assert.assert_equals({ exp: `E2`, act: lo_app.mt_tree[(1) - 1].nodes[(2) - 1].user });
  }

  test_struct_component() {
    const lo_app = this.tree_app_create();
    let lt_attri = [];
    const lo_model = new z2ui5_cl_core_srv_model({ attri: (lt_attri), app: lo_app });
    const lo_delta = (z2ui5_cl_ajson.parse(`{"__delta":{"0":{"S_ADR":{"CITY":"Berlin","ZIP":"10115"}}}}`));
    lo_model.delta_apply_to_table({ io_val_front: lo_delta, iv_name: `MT_TREE` });
    cl_abap_unit_assert.assert_equals({ exp: `Berlin`, act: lo_app.mt_tree[(1) - 1].s_adr.city });
    cl_abap_unit_assert.assert_equals({ exp: `10115`, act: lo_app.mt_tree[(1) - 1].s_adr.zip });
    cl_abap_unit_assert.assert_equals({ exp: `Manager`, act: lo_app.mt_tree[(1) - 1].user });
  }

  test_subtable_replace() {
    const lo_app = this.tree_app_create();
    let lt_attri = [];
    const lo_model = new z2ui5_cl_core_srv_model({ attri: (lt_attri), app: lo_app });
    const lo_delta = (z2ui5_cl_ajson.parse(`{"__delta":{"0":{"NODES":[{"USER":"NEW","VALIDATED":true}]}}}`));
    lo_model.delta_apply_to_table({ io_val_front: lo_delta, iv_name: `MT_TREE` });
    cl_abap_unit_assert.assert_equals({ exp: 1, act: lo_app.mt_tree[(1) - 1].nodes.length });
    cl_abap_unit_assert.assert_equals({ exp: `NEW`, act: lo_app.mt_tree[(1) - 1].nodes[(1) - 1].user });
    cl_abap_unit_assert.assert_equals({ exp: true, act: lo_app.mt_tree[(1) - 1].nodes[(1) - 1].validated });
  }
}



class ltcl_app_two_tab_drefs extends z2ui5_if_app {
  mt_tab = [];
  mo_ref1 = null;
  mo_ref2 = null;

  async main(client) {
  }

  constructor() {
    this.mo_ref1 = new ltcl_app_inner_335({ ir_data: (this.mt_tab) });
    this.mo_ref2 = new ltcl_app_inner_335({ ir_data: (this.mt_tab) });
  }
}



class ltcl_test_two_tab_refs {
  test_both_get_name_ref() {
    const lo_app = new ltcl_app_two_tab_drefs();
    lo_app.mt_tab = [{ col1: `A`, col2: `1` }];
    let lt_attri = [];
    const lo_model = new z2ui5_cl_core_srv_model({ attri: (lt_attri), app: lo_app });
    lo_model.dissolve();
    lo_model.dissolve();
    lo_model.dissolve();
    const ls_ref1 = (() => { try { return lt_attri.find((row) => row.name === `MO_REF1->MR_DATA->*`) ?? null; } catch { return null; } })();
    cl_abap_unit_assert.assert_equals({ exp: `MT_TAB`, act: ls_ref1.name_ref });
    const ls_ref2 = (() => { try { return lt_attri.find((row) => row.name === `MO_REF2->MR_DATA->*`) ?? null; } catch { return null; } })();
    cl_abap_unit_assert.assert_equals({ exp: `MT_TAB`, act: ls_ref2.name_ref });
  }

  test_canonical_search() {
    let sy_subrc = 0;
    let fs_tab = null;
    let _fs$fs_tab = null;
    const lo_app = new ltcl_app_two_tab_drefs();
    lo_app.mt_tab = [{ col1: `X`, col2: `Y` }];
    let lt_attri = [];
    const lo_model = new z2ui5_cl_core_srv_model({ attri: (lt_attri), app: lo_app });
    lo_model.dissolve();
    lo_model.dissolve();
    lo_model.dissolve();
    const lr_tab = lo_model.attri_get_val_ref(`MT_TAB`);
    cl_abap_unit_assert.assert_bound(lr_tab);
    // TODO(abap2js): ASSIGN lr_tab->* TO FIELD-SYMBOL(<tab>).
    cl_abap_unit_assert.assert_not_initial(fs_tab);
  }
}



class ltcl_test_deep_nesting {
  test_deep_struct_writeback() {
    let sy_subrc = 0;
    const lo_app = new ltcl_app_complex();
    let lt_attri = [];
    const lo_model = new z2ui5_cl_core_srv_model({ attri: (lt_attri), app: lo_app });
    lo_model.dissolve();
    lo_model.dissolve();
    let lr = {};
    {
      const _t = lt_attri;
      const _i = _t.findIndex((_r) => _r.name === `MS_NESTED-INNER-DEEP1`);
      sy_subrc = _i >= 0 && _i < _t.length ? 0 : 4;
      if (sy_subrc === 0) lr = _t[_i];
    }
    if (sy_subrc !== 0) {
      cl_abap_unit_assert.abort();
    }
    lr.bind_type = z2ui5_cl_util.abap_copy(z2ui5_if_core_types.cs_bind_type.two_way);
    lr.view = z2ui5_cl_util.abap_copy(z2ui5_if_client.cs_view.main);
    lr.name_client = `/MS_NESTED-INNER-DEEP1`;
    let lo_model_json = null;
    lo_model_json = z2ui5_cl_ajson.create_empty();
    lo_model_json.set({ iv_path: `/MS_NESTED-INNER-DEEP1`, iv_val: `deep_value` });
    lo_model.main_json_to_attri({ view: z2ui5_if_client.cs_view.main, model: lo_model_json });
    cl_abap_unit_assert.assert_equals({ exp: `deep_value`, act: lo_app.ms_nested.inner.deep1 });
  }

  test_deep_oref_writeback() {
    let sy_subrc = 0;
    const lo_app = new ltcl_app_complex();
    lo_app.mo_mid = /* TODO(abap2js): NEW #( ) */ null;
    lo_app.mo_mid.mo_inner = /* TODO(abap2js): NEW #( ) */ null;
    let lt_attri = [];
    const lo_model = new z2ui5_cl_core_srv_model({ attri: (lt_attri), app: lo_app });
    lo_model.dissolve();
    lo_model.dissolve();
    lo_model.dissolve();
    let lr_inner = {};
    {
      const _t = lt_attri;
      const _i = _t.findIndex((_r) => _r.name === `MO_MID->MO_INNER->MV_INNER`);
      sy_subrc = _i >= 0 && _i < _t.length ? 0 : 4;
      if (sy_subrc === 0) lr_inner = _t[_i];
    }
    if (sy_subrc !== 0) {
      cl_abap_unit_assert.abort();
    }
    lr_inner.bind_type = z2ui5_cl_util.abap_copy(z2ui5_if_core_types.cs_bind_type.two_way);
    lr_inner.view = z2ui5_cl_util.abap_copy(z2ui5_if_client.cs_view.main);
    lr_inner.name_client = `/MO_MID-MO_INNER-MV_INNER`;
    let lo_model_json = null;
    lo_model_json = z2ui5_cl_ajson.create_empty();
    lo_model_json.set({ iv_path: `/MO_MID-MO_INNER-MV_INNER`, iv_val: `inner_value` });
    lo_model.main_json_to_attri({ view: z2ui5_if_client.cs_view.main, model: lo_model_json });
    cl_abap_unit_assert.assert_equals({ exp: `inner_value`, act: lo_app.mo_mid.mo_inner.mv_inner });
  }
}



class ltcl_test_refresh_ext {
  test_oref_after_null_refresh() {
    let sy_subrc = 0;
    const lo_app = new ltcl_app_complex();
    let lt_attri = [];
    const lo_model = new z2ui5_cl_core_srv_model({ attri: (lt_attri), app: lo_app });
    lo_model.dissolve();
    let lr = {};
    {
      const _t = lt_attri;
      const _i = _t.findIndex((_r) => _r.name === `MV_SIMPLE`);
      sy_subrc = _i >= 0 && _i < _t.length ? 0 : 4;
      if (sy_subrc === 0) lr = _t[_i];
    }
    if (sy_subrc !== 0) {
      cl_abap_unit_assert.abort();
    }
    lr.bind_type = z2ui5_cl_util.abap_copy(z2ui5_if_core_types.cs_bind_type.two_way);
    lr.name_client = `/XX/MV_SIMPLE`;
    lr.view = z2ui5_cl_util.abap_copy(z2ui5_if_client.cs_view.main);
    lo_app.mo_mid = /* TODO(abap2js): NEW #( ) */ null;
    lo_model.main_attri_refresh();
    cl_abap_unit_assert.assert_not_initial((() => { try { return lt_attri.find((row) => row.name === `MO_MID->MV_MID`) ?? null; } catch { return null; } })());
    const ls_simple = (() => { try { return lt_attri.find((row) => row.name === `MV_SIMPLE`) ?? null; } catch { return null; } })();
    cl_abap_unit_assert.assert_equals({ exp: z2ui5_if_core_types.cs_bind_type.two_way, act: ls_simple.bind_type });
    cl_abap_unit_assert.assert_equals({ exp: `/XX/MV_SIMPLE`, act: ls_simple.name_client });
  }
}



class ltcl_test_json_types {
  test_updates_integer() {
    let sy_subrc = 0;
    const lo_app = new ltcl_app_complex();
    let lt_attri = [];
    const lo_model = new z2ui5_cl_core_srv_model({ attri: (lt_attri), app: lo_app });
    lo_model.dissolve();
    let lr = {};
    {
      const _t = lt_attri;
      const _i = _t.findIndex((_r) => _r.name === `MV_INT`);
      sy_subrc = _i >= 0 && _i < _t.length ? 0 : 4;
      if (sy_subrc === 0) lr = _t[_i];
    }
    if (sy_subrc !== 0) {
      cl_abap_unit_assert.abort();
    }
    lr.bind_type = z2ui5_cl_util.abap_copy(z2ui5_if_core_types.cs_bind_type.two_way);
    lr.view = z2ui5_cl_util.abap_copy(z2ui5_if_client.cs_view.main);
    lr.name_client = `/MV_INT`;
    let lo_model_json = null;
    lo_model_json = z2ui5_cl_ajson.create_empty();
    lo_model_json.set({ iv_path: `/MV_INT`, iv_val: 42 });
    lo_model.main_json_to_attri({ view: z2ui5_if_client.cs_view.main, model: lo_model_json });
    cl_abap_unit_assert.assert_equals({ exp: 42, act: lo_app.mv_int });
  }

  test_multiple_attrs_same_var() {
    let sy_subrc = 0;
    const lo_app = new ltcl_app_complex();
    let lt_attri = [];
    const lo_model = new z2ui5_cl_core_srv_model({ attri: (lt_attri), app: lo_app });
    lo_model.dissolve();
    let lr1 = {};
    {
      const _t = lt_attri;
      const _i = _t.findIndex((_r) => _r.name === `MV_SIMPLE`);
      sy_subrc = _i >= 0 && _i < _t.length ? 0 : 4;
      if (sy_subrc === 0) lr1 = _t[_i];
    }
    if (sy_subrc !== 0) {
      cl_abap_unit_assert.abort();
    }
    lr1.bind_type = z2ui5_cl_util.abap_copy(z2ui5_if_core_types.cs_bind_type.two_way);
    lr1.view = z2ui5_cl_util.abap_copy(z2ui5_if_client.cs_view.main);
    lr1.name_client = `/XX/MV_SIMPLE`;
    let ls_extra = null;
    ls_extra = z2ui5_cl_util.abap_copy(lr1);
    ls_extra.name = `MV_SIMPLE_ALIAS`;
    ls_extra.name_client = `/XX/ALIAS`;
    lt_attri.push(ls_extra);
    let lo_model_json = null;
    lo_model_json = z2ui5_cl_ajson.create_empty();
    lo_model_json.set({ iv_path: `/XX/MV_SIMPLE`, iv_val: `first` });
    lo_model.main_json_to_attri({ view: z2ui5_if_client.cs_view.main, model: lo_model_json });
    cl_abap_unit_assert.assert_equals({ exp: `first`, act: lo_app.mv_simple });
  }
}



module.exports = {
  __main: "z2ui5_cl_core_srv_model",
  __classes: { ltcl_test_dissolve, ltcl_test_app_sub, ltcl_test_app3, ltcl_test_get_attri, ltcl_test_app_root_attri, ltcl_test_app_root, ltcl_test_app_root_attri2, ltcl_test_app_root2, ltcl_test_app_root4, ltcl_app_inner, ltcl_app_middle, ltcl_app_complex, ltcl_test_diss_complex, ltcl_app_inner_335, ltcl_app_root_335, ltcl_test_sample335, ltcl_test_attri_create, ltcl_test_json_stringify, ltcl_test_json_to_attri, ltcl_test_attri_refresh, ltcl_test_entry_refs_children, ltcl_app_tree, ltcl_test_delta_apply, ltcl_app_two_tab_drefs, ltcl_test_two_tab_refs, ltcl_test_deep_nesting, ltcl_test_refresh_ext, ltcl_test_json_types },
  __tests: {"ltcl_test_dissolve":["test_init","test_struc","test_dref","test_struc_dref","test_oref","test_oref_dref_struc","test_oref_dref","test_dref_struc"],"ltcl_test_get_attri":["test_first","test_second","third_test","test4"],"ltcl_test_app_root_attri":["test_obj_tab_ref"],"ltcl_test_app_root_attri2":["test_obj_struc_ref"],"ltcl_test_app_root4":["test_tab_ref_gen"],"ltcl_test_diss_complex":["test_table","test_nested_struc","test_oref_chain","test_table_in_dref","test_mixed_types","test_dissolve_idempotent","test_search_table","test_search_nested_struc","test_name_parent_chain"],"ltcl_test_sample335":["test_two_drefs_to_same_struc"],"ltcl_test_attri_create":["test_string_type_kind","test_table_type_kind","test_oref_type_kind","test_int_kind"],"ltcl_test_json_stringify":["test_simple_string","test_empty_no_bind"],"ltcl_test_json_to_attri":["test_updates_two_way","test_skips_one_way","test_view_filter"],"ltcl_test_attri_refresh":["test_bindings_preserved"],"ltcl_test_entry_refs_children":["test_dref_children_name_ref","test_second_dref_children"],"ltcl_test_delta_apply":["test_update_first_row","test_update_second_row","test_out_of_range","test_nested_cell","test_nested_mixed","test_struct_component","test_subtable_replace"],"ltcl_test_two_tab_refs":["test_both_get_name_ref","test_canonical_search"],"ltcl_test_deep_nesting":["test_deep_struct_writeback","test_deep_oref_writeback"],"ltcl_test_refresh_ext":["test_oref_after_null_refresh"],"ltcl_test_json_types":["test_updates_integer","test_multiple_attrs_same_var"]},
};
