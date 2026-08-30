// GENERATED from run/input/abap2UI5/src/01/01/z2ui5_cl_ui5_srv_draft.clas.testclasses.abap — do not edit
const cl_abap_unit_assert = require("abap2UI5/cl_abap_unit_assert");
const z2ui5_cl_ui5_srv_draft = require("abap2UI5/z2ui5_cl_ui5_srv_draft");
const z2ui5_port = require("abap2UI5/z2ui5_port");


class ltcl_test {
  test_create() {
    let lo_draft = null;
    let temp1 = { id: ``, id_prev: ``, id_prev_app: ``, id_prev_app_stack: `` };
    let ls_db = [];
    lo_draft = new z2ui5_cl_ui5_srv_draft();
    temp1 = { id: ``, id_prev: ``, id_prev_app: ``, id_prev_app_stack: `` };
    temp1.id = `TEST_ID`;
    lo_draft.create({ draft: temp1, model_xml: `my xml` });
    ls_db = lo_draft.read_draft(`TEST_ID`);
    cl_abap_unit_assert.assert_equals({ exp: `my xml`, act: ls_db.data });
  }

  test_create_and_read() {
    let lo_draft = null;
    let temp2 = { id: ``, id_prev: ``, id_prev_app: ``, id_prev_app_stack: `` };
    let ls_db = [];
    lo_draft = new z2ui5_cl_ui5_srv_draft();
    temp2 = { id: ``, id_prev: ``, id_prev_app: ``, id_prev_app_stack: `` };
    temp2.id = `TEST_CR`;
    temp2.id_prev = `PREV1`;
    temp2.id_prev_app = `APP1`;
    temp2.id_prev_app_stack = `STACK1`;
    lo_draft.create({ draft: temp2, model_xml: `<xml>data</xml>` });
    ls_db = lo_draft.read_draft(`TEST_CR`);
    cl_abap_unit_assert.assert_equals({ exp: `<xml>data</xml>`, act: ls_db.data });
    cl_abap_unit_assert.assert_equals({ exp: `TEST_CR`, act: ls_db.id });
  }

  test_read_info() {
    let lo_draft = null;
    let temp3 = { id: ``, id_prev: ``, id_prev_app: ``, id_prev_app_stack: `` };
    let ls_info = { id: ``, id_prev: ``, id_prev_app: ``, id_prev_app_stack: `` };
    lo_draft = new z2ui5_cl_ui5_srv_draft();
    temp3 = { id: ``, id_prev: ``, id_prev_app: ``, id_prev_app_stack: `` };
    temp3.id = `TEST_INFO`;
    temp3.id_prev_app_stack = `MY_STACK`;
    lo_draft.create({ draft: temp3, model_xml: `info test` });
    ls_info = lo_draft.read_info(`TEST_INFO`);
    cl_abap_unit_assert.assert_equals({ exp: `TEST_INFO`, act: ls_info.id });
    cl_abap_unit_assert.assert_equals({ exp: `MY_STACK`, act: ls_info.id_prev_app_stack });
  }

  test_buffer() {
    let lo_draft = null;
    let temp4 = { id: ``, id_prev: ``, id_prev_app: ``, id_prev_app_stack: `` };
    let ls_first = [];
    let ls_second = [];
    lo_draft = new z2ui5_cl_ui5_srv_draft();
    temp4 = { id: ``, id_prev: ``, id_prev_app: ``, id_prev_app_stack: `` };
    temp4.id = `TEST_BUF`;
    lo_draft.create({ draft: temp4, model_xml: `buffered data` });
    ls_first = lo_draft.read_draft(`TEST_BUF`);
    lo_draft.create({ draft: temp4, model_xml: `overwritten data` });
    ls_second = lo_draft.read_draft(`TEST_BUF`);
    cl_abap_unit_assert.assert_true((String(ls_first.data).toLowerCase().includes(String(`buffered data`).toLowerCase())));
    cl_abap_unit_assert.assert_true((String(ls_second.data).toLowerCase().includes(String(`overwritten data`).toLowerCase())));
  }

  test_overwrite() {
    let lo_draft = null;
    let temp5 = { id: ``, id_prev: ``, id_prev_app: ``, id_prev_app_stack: `` };
    let temp6 = { id: ``, id_prev: ``, id_prev_app: ``, id_prev_app_stack: `` };
    let ls_db = [];
    lo_draft = new z2ui5_cl_ui5_srv_draft();
    temp5 = { id: ``, id_prev: ``, id_prev_app: ``, id_prev_app_stack: `` };
    temp5.id = `TEST_OW`;
    lo_draft.create({ draft: temp5, model_xml: `original` });
    temp6 = { id: ``, id_prev: ``, id_prev_app: ``, id_prev_app_stack: `` };
    temp6.id = `TEST_OW`;
    lo_draft.create({ draft: temp6, model_xml: `updated` });
    ls_db = lo_draft.read_draft(`TEST_OW`);
    cl_abap_unit_assert.assert_equals({ exp: `updated`, act: ls_db.data });
  }

  test_owner_binding() {
    let sy_subrc = 0;
    let sy_uname = "";
    let ls_db = [];
    ls_db.id = `TEST_OWNER`;
    ls_db.uname = `${sy_uname}_OTHER`;
    ls_db.data = `secret state`;
    z2ui5_port.db({ op: `modify`, table: `z2ui5_t_01`, row: ls_db });
    sy_subrc = z2ui5_port.sy_subrc;
    z2ui5_port.db({ op: `commit` });
    let lo_draft = null;
    lo_draft = new z2ui5_cl_ui5_srv_draft();
    let lv_raised = false;
    try {
      lo_draft.read_draft(`TEST_OWNER`);
    } catch (error) {
      lv_raised = true;
    }
    cl_abap_unit_assert.assert_true(lv_raised);
    cl_abap_unit_assert.assert_false(lo_draft.check_exists(`TEST_OWNER`));
  }

  test_count_total() {
    let sy_subrc = 0;
    let sy_uname = "";
    let lo_draft = null;
    let ls_db = [];
    let lv_own = 0;
    let lv_total = 0;
    let lv_total_exp = 0;
    z2ui5_port.db({ op: `delete`, table: `z2ui5_t_01`, where: [{ field: `id`, op: `eq`, value: (`TEST_COUNT_FOREIGN`) }] });
    sy_subrc = z2ui5_port.sy_subrc;
    z2ui5_port.db({ op: `commit` });
    lo_draft = new z2ui5_cl_ui5_srv_draft();
    lv_own = lo_draft.count_entries();
    lv_total = lo_draft.count_entries_total();
    ls_db.id = `TEST_COUNT_FOREIGN`;
    ls_db.uname = `${sy_uname}_OTHER_COUNT`;
    ls_db.data = `foreign row`;
    z2ui5_port.db({ op: `modify`, table: `z2ui5_t_01`, row: ls_db });
    sy_subrc = z2ui5_port.sy_subrc;
    z2ui5_port.db({ op: `commit` });
    cl_abap_unit_assert.assert_equals({ exp: lv_own, act: lo_draft.count_entries(), msg: `a row of another user must not raise the own count` });
    lv_total_exp = lv_total + 1;
    cl_abap_unit_assert.assert_equals({ exp: lv_total_exp, act: lo_draft.count_entries_total(), msg: `the total count must include every owner` });
  }
}





module.exports = {
  __main: "z2ui5_cl_ui5_srv_draft",
  __classes: { ltcl_test },
  __tests: {"ltcl_test":["test_create","test_create_and_read","test_read_info","test_buffer","test_overwrite","test_owner_binding","test_count_total"]},
};
