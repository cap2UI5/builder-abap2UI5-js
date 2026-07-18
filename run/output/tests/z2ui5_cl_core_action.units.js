// GENERATED from run/input/abap2UI5/src/01/02/z2ui5_cl_core_action.clas.testclasses.abap — do not edit
const cl_abap_unit_assert = require("abap2UI5/cl_abap_unit_assert");
const z2ui5_cl_core_action = require("abap2UI5/z2ui5_cl_core_action");
const z2ui5_cl_core_handler = require("abap2UI5/z2ui5_cl_core_handler");
const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");


class ltcl_test_app extends z2ui5_if_app {
  mv_value = ``;

  async main(client) {
  }
}



class ltcl_test {
  test_instantiation() {
    let lo_http = null;
    let lo_action = null;
    lo_http = new z2ui5_cl_core_handler({ val: `` });
    lo_action = new z2ui5_cl_core_action({ val: lo_http });
    cl_abap_unit_assert.assert_bound(lo_action);
    cl_abap_unit_assert.assert_bound(lo_action.mo_http_post);
    cl_abap_unit_assert.assert_bound(lo_action.mo_app);
  }

  test_system_startup() {
    let sy_sysid = "";
    let lo_http = null;
    let lo_action = null;
    let lo_result = null;
    if (sy_sysid === `ABC`) {
      return;
    }
    lo_http = new z2ui5_cl_core_handler({ val: `` });
    lo_action = new z2ui5_cl_core_action({ val: lo_http });
    lo_result = lo_action.factory_system_startup();
    cl_abap_unit_assert.assert_bound(lo_result);
    cl_abap_unit_assert.assert_bound(lo_result.mo_app.mo_app);
    cl_abap_unit_assert.assert_not_initial(lo_result.mo_app.ms_draft.id);
    cl_abap_unit_assert.assert_equals({ exp: true, act: lo_result.ms_actual.check_on_navigated });
  }

  test_first_start() {
    let sy_sysid = "";
    let lv_payload = ``;
    let lo_http = null;
    let lo_action = null;
    let lo_result = null;
    if (sy_sysid === `ABC`) {
      return;
    }
    lv_payload = `{"value":{"S_FRONT":{"ORIGIN":"O","PATHNAME":"/p","SEARCH":"?app_start=Z2UI5_CL_APP_HELLO_WORLD"}}}`;
    lo_http = new z2ui5_cl_core_handler({ val: lv_payload });
    lo_http.ms_request = lo_http.request_json_to_abap(lv_payload);
    lo_action = new z2ui5_cl_core_action({ val: lo_http });
    lo_result = lo_action.factory_first_start();
    cl_abap_unit_assert.assert_bound(lo_result.mo_app.mo_app);
    cl_abap_unit_assert.assert_not_initial(lo_result.mo_app.ms_draft.id);
    cl_abap_unit_assert.assert_equals({ exp: true, act: lo_result.ms_actual.check_on_navigated });
  }

  test_first_start_draft_gone() {
    let sy_sysid = "";
    let lv_payload = ``;
    let lo_http = null;
    let lo_action = null;
    let lo_result = null;
    if (sy_sysid === `ABC`) {
      return;
    }
    lv_payload = `{"value":{"S_FRONT":{"ORIGIN":"O","PATHNAME":"/p","SEARCH":"?app_start=Z2UI5_CL_APP_HELLO_WORLD"}}}`;
    lo_http = new z2ui5_cl_core_handler({ val: lv_payload });
    lo_http.ms_request = lo_http.request_json_to_abap(lv_payload);
    lo_http.ms_request.s_control.app_start_draft = `THIS_DRAFT_DOES_NOT_EXIST`;
    lo_action = new z2ui5_cl_core_action({ val: lo_http });
    lo_result = lo_action.factory_first_start();
    cl_abap_unit_assert.assert_bound(lo_result.mo_app.mo_app);
    cl_abap_unit_assert.assert_not_initial(lo_result.ms_next.s_set.s_msg_toast.text);
  }

  test_first_start_error() {
    let lv_payload = ``;
    let lo_http = null;
    let lo_action = null;
    let lx = null;
    let temp1 = false;
    lv_payload = `{"value":{"S_FRONT":{"ORIGIN":"O","PATHNAME":"/p","SEARCH":"?app_start=NONEXISTENT_CLASS"}}}`;
    lo_http = new z2ui5_cl_core_handler({ val: lv_payload });
    lo_http.ms_request = lo_http.request_json_to_abap(lv_payload);
    lo_action = new z2ui5_cl_core_action({ val: lo_http });
    try {
      lo_action.factory_first_start();
      cl_abap_unit_assert.fail(`Expected exception for nonexistent class`);
    } catch (lx) {
      temp1 = (String(lx.get_text()).toLowerCase().includes(String(`NONEXISTENT_CLASS`).toLowerCase()));
      cl_abap_unit_assert.assert_true(temp1);
    }
  }

  test_factory_by_frontend() {
    let sy_sysid = "";
    let lv_payload = ``;
    let lo_http = null;
    let lo_action = null;
    let lo_result = null;
    if (sy_sysid === `ABC`) {
      return;
    }
    lv_payload = `{"value":{"S_FRONT":{"ORIGIN":"O","PATHNAME":"/p","SEARCH":""}}}`;
    lo_http = new z2ui5_cl_core_handler({ val: lv_payload });
    lo_http.ms_request = lo_http.request_json_to_abap(lv_payload);
    lo_action = new z2ui5_cl_core_action({ val: lo_http });
    lo_action.mo_app.mo_app = new ltcl_test_app();
    lo_action.mo_app.ms_draft.id = `OLD_DRAFT_ID`;
    lo_http.mo_action = z2ui5_cl_util.abap_copy(lo_action);
    lo_http.ms_request.s_front.id = `OLD_DRAFT_ID`;
    lo_http.ms_request.s_front.event = `MY_EVENT`;
    lo_result = lo_action.factory_by_frontend();
    cl_abap_unit_assert.assert_bound(lo_result.mo_app.mo_app);
    cl_abap_unit_assert.assert_not_initial(lo_result.mo_app.ms_draft.id);
    cl_abap_unit_assert.assert_equals({ exp: `OLD_DRAFT_ID`, act: lo_result.mo_app.ms_draft.id_prev });
    cl_abap_unit_assert.assert_equals({ exp: `MY_EVENT`, act: lo_result.ms_actual.event });
  }

  test_reset_view_flags() {
    let lo_http = null;
    let lo_action = null;
    lo_http = new z2ui5_cl_core_handler({ val: `` });
    lo_action = new z2ui5_cl_core_action({ val: lo_http });
    lo_action.ms_next.s_set.s_view.check_update_model = true;
    lo_action.ms_next.s_set.s_view_nest.check_update_model = true;
    lo_action.ms_next.s_set.s_view_nest2.check_update_model = true;
    lo_action.ms_next.s_set.s_popup.check_update_model = true;
    lo_action.ms_next.s_set.s_popover.check_update_model = true;
    lo_action.reset_view_update_flags();
    cl_abap_unit_assert.assert_equals({ exp: false, act: lo_action.ms_next.s_set.s_view.check_update_model });
    cl_abap_unit_assert.assert_equals({ exp: false, act: lo_action.ms_next.s_set.s_view_nest.check_update_model });
    cl_abap_unit_assert.assert_equals({ exp: false, act: lo_action.ms_next.s_set.s_view_nest2.check_update_model });
    cl_abap_unit_assert.assert_equals({ exp: false, act: lo_action.ms_next.s_set.s_popup.check_update_model });
    cl_abap_unit_assert.assert_equals({ exp: false, act: lo_action.ms_next.s_set.s_popover.check_update_model });
  }

  test_stack_call() {
    let sy_sysid = "";
    let lo_http = null;
    let lo_action = null;
    let lo_new_app = null;
    let lo_result = null;
    if (sy_sysid === `ABC`) {
      return;
    }
    lo_http = new z2ui5_cl_core_handler({ val: `` });
    lo_action = new z2ui5_cl_core_action({ val: lo_http });
    lo_action.mo_app.mo_app = new ltcl_test_app();
    lo_action.mo_app.ms_draft.id = `CURRENT_DRAFT`;
    lo_new_app = new ltcl_test_app();
    lo_action.ms_next.o_app_call = z2ui5_cl_util.abap_copy(lo_new_app);
    lo_action.ms_next.s_set.s_msg_box.text = `box`;
    lo_action.ms_next.s_set.s_msg_toast.text = `toast`;
    lo_action.ms_next.s_set.s_follow_up_action.custom_js.push(z2ui5_cl_util.abap_copy(`some_js`));
    lo_action.ms_next.s_set.s_popup.xml = `<popup/>`;
    lo_action.ms_next.s_set.s_popover.xml = `<popover/>`;
    lo_result = lo_action.factory_stack_call();
    cl_abap_unit_assert.assert_bound(lo_result);
    cl_abap_unit_assert.assert_equals({ exp: `CURRENT_DRAFT`, act: lo_result.mo_app.ms_draft.id_prev_app_stack });
    cl_abap_unit_assert.assert_initial(lo_result.ms_next.s_set.s_msg_box);
    cl_abap_unit_assert.assert_initial(lo_result.ms_next.s_set.s_msg_toast);
    cl_abap_unit_assert.assert_initial(lo_result.ms_next.s_set.s_follow_up_action);
    cl_abap_unit_assert.assert_equals({ exp: true, act: lo_result.ms_next.s_set.s_popup.check_destroy });
    cl_abap_unit_assert.assert_initial(lo_result.ms_next.s_set.s_popup.xml);
    cl_abap_unit_assert.assert_equals({ exp: `<popover/>`, act: lo_result.ms_next.s_set.s_popover.xml });
  }

  test_stack_leave() {
    let sy_sysid = "";
    let lo_http = null;
    let lo_action = null;
    let lo_prev_app = null;
    let lo_result = null;
    if (sy_sysid === `ABC`) {
      return;
    }
    lo_http = new z2ui5_cl_core_handler({ val: `` });
    lo_action = new z2ui5_cl_core_action({ val: lo_http });
    lo_action.mo_app.mo_app = new ltcl_test_app();
    lo_action.mo_app.ms_draft.id = `CURRENT_DRAFT`;
    lo_prev_app = new ltcl_test_app();
    lo_action.ms_next.o_app_leave = z2ui5_cl_util.abap_copy(lo_prev_app);
    lo_action.ms_next.s_set.s_msg_box.text = `box`;
    lo_action.ms_next.s_set.s_msg_toast.text = `toast`;
    lo_action.ms_next.s_set.s_follow_up_action.custom_js.push(z2ui5_cl_util.abap_copy(`some_js`));
    lo_action.ms_next.s_set.s_popup.xml = `<popup/>`;
    lo_action.ms_next.s_set.s_popover.xml = `<popover/>`;
    lo_result = lo_action.factory_stack_leave();
    cl_abap_unit_assert.assert_bound(lo_result);
    cl_abap_unit_assert.assert_initial(lo_result.ms_next.s_set.s_msg_box);
    cl_abap_unit_assert.assert_initial(lo_result.ms_next.s_set.s_msg_toast);
    cl_abap_unit_assert.assert_initial(lo_result.ms_next.s_set.s_follow_up_action);
    cl_abap_unit_assert.assert_equals({ exp: true, act: lo_result.ms_next.s_set.s_popup.check_destroy });
    cl_abap_unit_assert.assert_initial(lo_result.ms_next.s_set.s_popup.xml);
    cl_abap_unit_assert.assert_equals({ exp: `<popover/>`, act: lo_result.ms_next.s_set.s_popover.xml });
  }
}



module.exports = {
  __main: "z2ui5_cl_core_action",
  __classes: { ltcl_test_app, ltcl_test },
  __tests: {"ltcl_test":["test_instantiation","test_system_startup","test_first_start","test_first_start_error","test_first_start_draft_gone","test_factory_by_frontend","test_reset_view_flags","test_stack_call","test_stack_leave"]},
};
