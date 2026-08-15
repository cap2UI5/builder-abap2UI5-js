// GENERATED from run/input/abap2UI5/src/01/02/z2ui5_cl_ui5_action.clas.testclasses.abap — do not edit
const cl_abap_unit_assert = require("abap2UI5/cl_abap_unit_assert");
const z2ui5_cl_ui5_action = require("abap2UI5/z2ui5_cl_ui5_action");
const z2ui5_cl_ui5_app_cont = require("abap2UI5/z2ui5_cl_ui5_app_cont");
const z2ui5_cl_ui5_handler = require("abap2UI5/z2ui5_cl_ui5_handler");
const z2ui5_cl_ui5_srv_draft = require("abap2UI5/z2ui5_cl_ui5_srv_draft");
const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");
const z2ui5_if_client = require("abap2UI5/z2ui5_if_client");
const z2ui5_if_ui5_types = require("abap2UI5/z2ui5_if_ui5_types");


class ltcl_test_app extends z2ui5_if_app {
  mv_value = ``;

  async main(client) {
  }
}




class ltcl_test_app2 extends z2ui5_if_app {
  async main(client) {
  }
}




class ltcl_test {
  test_instantiation() {
    let lo_http = null;
    let lo_action = null;
    lo_http = new z2ui5_cl_ui5_handler({ val: `` });
    lo_action = new z2ui5_cl_ui5_action({ val: lo_http });
    cl_abap_unit_assert.assert_bound(lo_action);
    cl_abap_unit_assert.assert_bound(lo_action.mo_http_post);
    cl_abap_unit_assert.assert_bound(lo_action.mo_app);
  }

  test_system_startup() {
    let lo_http = null;
    let lo_action = null;
    let lo_result = null;
    lo_http = new z2ui5_cl_ui5_handler({ val: `` });
    lo_action = new z2ui5_cl_ui5_action({ val: lo_http });
    lo_result = lo_action.factory_system_startup();
    cl_abap_unit_assert.assert_bound(lo_result);
    cl_abap_unit_assert.assert_bound(lo_result.mo_app.mo_app);
    cl_abap_unit_assert.assert_not_initial(lo_result.mo_app.ms_draft.id);
    cl_abap_unit_assert.assert_equals({ exp: true, act: lo_result.ms_actual.check_on_navigated });
  }

  test_first_start() {
    let lv_payload = ``;
    let lo_http = null;
    let lo_action = null;
    let lo_result = null;
    lv_payload = `{"value":{"S_FRONT":{"ORIGIN":"O","PATHNAME":"/p","SEARCH":"?app_start=Z2UI5_CL_UI5_APP_HI_WORLD"}}}`;
    lo_http = new z2ui5_cl_ui5_handler({ val: lv_payload });
    lo_http.ms_request = lo_http.request_json_to_abap(lv_payload);
    lo_action = new z2ui5_cl_ui5_action({ val: lo_http });
    lo_result = lo_action.factory_first_start();
    cl_abap_unit_assert.assert_bound(lo_result.mo_app.mo_app);
    cl_abap_unit_assert.assert_not_initial(lo_result.mo_app.ms_draft.id);
    cl_abap_unit_assert.assert_equals({ exp: true, act: lo_result.ms_actual.check_on_navigated });
  }

  test_first_start_draft_gone() {
    let lv_payload = ``;
    let lo_http = null;
    let lo_action = null;
    let lo_result = null;
    lv_payload = `{"value":{"S_FRONT":{"ORIGIN":"O","PATHNAME":"/p","SEARCH":"?app_start=Z2UI5_CL_UI5_APP_HI_WORLD"}}}`;
    lo_http = new z2ui5_cl_ui5_handler({ val: lv_payload });
    lo_http.ms_request = lo_http.request_json_to_abap(lv_payload);
    lo_http.ms_request.s_control.app_start_draft = `THIS_DRAFT_DOES_NOT_EXIST`;
    lo_action = new z2ui5_cl_ui5_action({ val: lo_http });
    lo_result = lo_action.factory_first_start();
    cl_abap_unit_assert.assert_bound(lo_result.mo_app.mo_app);
    cl_abap_unit_assert.assert_equals({ exp: 1, act: lo_result.ms_next.s_action.t_custom.length });
    cl_abap_unit_assert.assert_char_cp({ exp: `["MESSAGE_TOAST","show","Bookmarked app state expired*`, act: lo_result.ms_next.s_action.t_custom[(1) - 1].o_json.stringify() });
  }

  test_first_start_error() {
    let lv_payload = ``;
    let lo_http = null;
    let lo_action = null;
    let lx = null;
    let temp1 = false;
    lv_payload = `{"value":{"S_FRONT":{"ORIGIN":"O","PATHNAME":"/p","SEARCH":"?app_start=NONEXISTENT_CLASS"}}}`;
    lo_http = new z2ui5_cl_ui5_handler({ val: lv_payload });
    lo_http.ms_request = lo_http.request_json_to_abap(lv_payload);
    lo_action = new z2ui5_cl_ui5_action({ val: lo_http });
    try {
      lo_action.factory_first_start();
      cl_abap_unit_assert.fail(`Expected exception for nonexistent class`);
    } catch (_caught1) {
      lx = _caught1;
      temp1 = (String(lx.get_text()).toLowerCase().includes(String(`NONEXISTENT_CLASS`).toLowerCase()));
      cl_abap_unit_assert.assert_true(temp1);
    }
  }

  test_factory_by_frontend() {
    let lv_payload = ``;
    let lo_http = null;
    let lo_action = null;
    let lo_result = null;
    lv_payload = `{"value":{"S_FRONT":{"ORIGIN":"O","PATHNAME":"/p","SEARCH":""}}}`;
    lo_http = new z2ui5_cl_ui5_handler({ val: lv_payload });
    lo_http.ms_request = lo_http.request_json_to_abap(lv_payload);
    lo_action = new z2ui5_cl_ui5_action({ val: lo_http });
    lo_action.mo_app.mo_app = new ltcl_test_app();
    lo_action.mo_app.ms_draft.id = `OLD_DRAFT_ID`;
    lo_http.mo_action = lo_action;
    lo_http.ms_request.s_front.id = `OLD_DRAFT_ID`;
    lo_http.ms_request.s_front.event = `MY_EVENT`;
    lo_result = lo_action.factory_by_frontend();
    cl_abap_unit_assert.assert_bound(lo_result.mo_app.mo_app);
    cl_abap_unit_assert.assert_not_initial(lo_result.mo_app.ms_draft.id);
    cl_abap_unit_assert.assert_equals({ exp: `OLD_DRAFT_ID`, act: lo_result.mo_app.ms_draft.id_prev });
    cl_abap_unit_assert.assert_equals({ exp: `MY_EVENT`, act: lo_result.ms_actual.event });
  }

  test_stack_call() {
    let lo_http = null;
    let lo_action = null;
    let lo_new_app = null;
    let lo_result = null;
    let lo_chained = null;
    lo_http = new z2ui5_cl_ui5_handler({ val: `` });
    lo_action = new z2ui5_cl_ui5_action({ val: lo_http });
    lo_action.mo_app.mo_app = new ltcl_test_app();
    lo_action.mo_app.ms_draft.id = `CURRENT_DRAFT`;
    lo_action.mo_app.mv_nav_mode = z2ui5_cl_util.abap_tab_assign(lo_action.mo_app.mv_nav_mode, z2ui5_cl_util.abap_copy(z2ui5_if_client.cs_nav_mode.keep));
    lo_new_app = new ltcl_test_app();
    lo_action.ms_next.o_app_call = lo_new_app;
    lo_action.ms_next.s_action.t_custom.push(z2ui5_cl_util.abap_copy({ js: `some_js` }));
    lo_action.ms_next.s_action.t_system.push(z2ui5_cl_util.abap_copy({ js: `some_system_js` }));
    lo_result = lo_action.factory_stack_call();
    cl_abap_unit_assert.assert_bound(lo_result);
    cl_abap_unit_assert.assert_equals({ exp: `CURRENT_DRAFT`, act: lo_result.mo_app.ms_draft.id_prev_app_stack });
    cl_abap_unit_assert.assert_initial(lo_result.ms_next.s_action.t_custom);
    cl_abap_unit_assert.assert_equals({ exp: 2, act: lo_result.ms_next.t_action_front.length });
    cl_abap_unit_assert.assert_equals({ exp: `POPUP|destroy`, act: `${lo_result.ms_next.t_action_front[(1) - 1].slot}|` + `${lo_result.ms_next.t_action_front[(1) - 1].method}` });
    cl_abap_unit_assert.assert_equals({ exp: `POPOVER|destroy`, act: `${lo_result.ms_next.t_action_front[(2) - 1].slot}|` + `${lo_result.ms_next.t_action_front[(2) - 1].method}` });
    cl_abap_unit_assert.assert_equals({ exp: true, act: lo_result.ms_next.s_nav.check_nav_app_call });
    cl_abap_unit_assert.assert_equals({ exp: `CURRENT_DRAFT`, act: lo_result.ms_next.s_nav.nav_app_call_prev_id });
    cl_abap_unit_assert.assert_not_initial(lo_result.ms_next.s_nav.nav_app_call_prev_app);
    lo_result.ms_next.o_app_call = new ltcl_test_app();
    lo_result.mo_app.ms_draft.id = `SECOND_DRAFT`;
    lo_chained = lo_result.factory_stack_call();
    cl_abap_unit_assert.assert_equals({ exp: `CURRENT_DRAFT`, act: lo_chained.ms_next.s_nav.nav_app_call_prev_id });
  }

  test_nav_mode_inherited() {
    let lo_http = null;
    let lo_action = null;
    let lo_called = null;
    let lo_own = null;
    lo_http = new z2ui5_cl_ui5_handler({ val: `` });
    lo_action = new z2ui5_cl_ui5_action({ val: lo_http });
    lo_action.mo_app.mo_app = new ltcl_test_app();
    lo_action.mo_app.ms_draft.id = `CURRENT_DRAFT`;
    lo_action.mo_app.mv_nav_mode = z2ui5_cl_util.abap_tab_assign(lo_action.mo_app.mv_nav_mode, z2ui5_cl_util.abap_copy(z2ui5_if_client.cs_nav_mode.keep));
    lo_action.ms_next.o_app_call = new ltcl_test_app();
    lo_called = lo_action.factory_stack_call();
    cl_abap_unit_assert.assert_equals({ exp: z2ui5_if_client.cs_nav_mode.keep, act: lo_called.mo_app.mv_nav_mode });
    lo_own = new z2ui5_cl_ui5_action({ val: lo_http });
    lo_own.mo_app.mo_app = new ltcl_test_app();
    lo_own.mo_app.ms_draft.id = `PLAIN_DRAFT`;
    lo_own.ms_next.o_app_call = new ltcl_test_app();
    lo_called = lo_own.factory_stack_call();
    cl_abap_unit_assert.assert_initial(lo_called.mo_app.mv_nav_mode);
  }

  test_stack_call_cross_class() {
    let lo_http = null;
    let lo_action = null;
    let lo_result = null;
    lo_http = new z2ui5_cl_ui5_handler({ val: `` });
    lo_action = new z2ui5_cl_ui5_action({ val: lo_http });
    lo_action.mo_app.mo_app = new ltcl_test_app();
    lo_action.mo_app.ms_draft.id = `CURRENT_DRAFT`;
    lo_action.ms_next.t_action_front = z2ui5_cl_util.abap_tab_assign(lo_action.ms_next.t_action_front, [{ slot: z2ui5_if_client.cs_view.main, method: z2ui5_if_ui5_types.cs_slot_action.destroy }, { slot: z2ui5_if_client.cs_view.nested, method: z2ui5_if_ui5_types.cs_slot_action.display, xml: `<Nest/>` }]);
    lo_action.ms_next.o_app_call = new ltcl_test_app2();
    lo_result = lo_action.factory_stack_call();
    cl_abap_unit_assert.assert_equals({ exp: 1, act: lo_result.ms_next.t_action_front.length });
    cl_abap_unit_assert.assert_equals({ exp: `MAIN|destroy`, act: `${lo_result.ms_next.t_action_front[(1) - 1].slot}|` + `${lo_result.ms_next.t_action_front[(1) - 1].method}` });
    cl_abap_unit_assert.assert_equals({ exp: false, act: lo_result.ms_next.s_nav.check_nav_app_call });
  }

  test_stack_leave() {
    let lo_http = null;
    let lo_action = null;
    let lo_prev_app = null;
    let lo_result = null;
    lo_http = new z2ui5_cl_ui5_handler({ val: `` });
    lo_action = new z2ui5_cl_ui5_action({ val: lo_http });
    lo_action.mo_app.mo_app = new ltcl_test_app();
    lo_action.mo_app.ms_draft.id = `CURRENT_DRAFT`;
    lo_prev_app = new ltcl_test_app();
    lo_action.ms_next.o_app_leave = lo_prev_app;
    lo_action.ms_next.s_action.t_custom.push(z2ui5_cl_util.abap_copy({ js: `some_js` }));
    lo_action.ms_next.s_action.t_system.push(z2ui5_cl_util.abap_copy({ js: `some_system_js` }));
    lo_result = lo_action.factory_stack_leave();
    cl_abap_unit_assert.assert_bound(lo_result);
    cl_abap_unit_assert.assert_initial(lo_result.ms_next.s_action.t_custom);
    cl_abap_unit_assert.assert_equals({ exp: 2, act: lo_result.ms_next.t_action_front.length });
    cl_abap_unit_assert.assert_equals({ exp: `POPUP|destroy`, act: `${lo_result.ms_next.t_action_front[(1) - 1].slot}|` + `${lo_result.ms_next.t_action_front[(1) - 1].method}` });
    cl_abap_unit_assert.assert_equals({ exp: `POPOVER|destroy`, act: `${lo_result.ms_next.t_action_front[(2) - 1].slot}|` + `${lo_result.ms_next.t_action_front[(2) - 1].method}` });
  }

  test_stack_leave_cross_class() {
    let lo_http = null;
    let lo_action = null;
    let lo_result = null;
    lo_http = new z2ui5_cl_ui5_handler({ val: `` });
    lo_action = new z2ui5_cl_ui5_action({ val: lo_http });
    lo_action.mo_app.mo_app = new ltcl_test_app();
    lo_action.mo_app.ms_draft.id = `CURRENT_DRAFT`;
    lo_action.ms_next.o_app_leave = new ltcl_test_app2();
    lo_result = lo_action.factory_stack_leave();
    cl_abap_unit_assert.assert_initial(lo_result.ms_next.t_action_front);
  }

  test_stack_leave_fresh_target() {
    let lo_http = null;
    let lo_action = null;
    let lo_result = null;
    lo_http = new z2ui5_cl_ui5_handler({ val: `` });
    lo_action = new z2ui5_cl_ui5_action({ val: lo_http });
    lo_action.mo_app.mo_app = new ltcl_test_app();
    lo_action.mo_app.ms_draft.id = `LEAVE_FRESH_CURRENT`;
    lo_action.mo_app.ms_draft.id_prev_app_stack = `LEAVE_FRESH_ANCESTOR`;
    lo_action.ms_next.o_app_leave = new ltcl_test_app();
    lo_result = lo_action.factory_stack_leave();
    cl_abap_unit_assert.assert_equals({ exp: `LEAVE_FRESH_ANCESTOR`, act: lo_result.mo_app.ms_draft.id_prev_app_stack });
    cl_abap_unit_assert.assert_equals({ exp: `LEAVE_FRESH_CURRENT`, act: lo_result.mo_app.ms_draft.id_prev });
  }

  test_stack_leave_ancestor_gone() {
    let lo_http = null;
    let lo_target = null;
    let lo_target_core = null;
    let lo_action = null;
    let lo_result = null;
    let lo_pop = null;
    lo_target = new ltcl_test_app();
    lo_target_core = new z2ui5_cl_ui5_app_cont();
    lo_target_core.mo_app = lo_target;
    lo_target_core.ms_draft.id = `LEAVE_TARGET_DRAFT`;
    lo_target_core.db_save();
    lo_http = new z2ui5_cl_ui5_handler({ val: `` });
    lo_action = new z2ui5_cl_ui5_action({ val: lo_http });
    lo_action.mo_app.mo_app = new ltcl_test_app();
    lo_action.mo_app.ms_draft.id = `LEAVE_GONE_CURRENT`;
    lo_action.mo_app.ms_draft.id_prev_app_stack = `LEAVE_PURGED_ANCESTOR`;
    lo_action.ms_next.o_app_leave = lo_target;
    lo_result = lo_action.factory_stack_leave();
    cl_abap_unit_assert.assert_initial(lo_result.mo_app.ms_draft.id_prev_app_stack);
    new z2ui5_cl_ui5_srv_draft().create({ draft: { id: `LEAVE_ANCESTOR_DRAFT`, id_prev_app_stack: `LEAVE_GRANDPARENT` }, model_xml: `<dummy/>` });
    lo_action = new z2ui5_cl_ui5_action({ val: lo_http });
    lo_action.mo_app.mo_app = new ltcl_test_app();
    lo_action.mo_app.ms_draft.id = `LEAVE_GONE_CURRENT2`;
    lo_action.mo_app.ms_draft.id_prev_app_stack = `LEAVE_ANCESTOR_DRAFT`;
    lo_action.ms_next.o_app_leave = lo_target;
    lo_pop = lo_action.factory_stack_leave();
    cl_abap_unit_assert.assert_equals({ exp: `LEAVE_GRANDPARENT`, act: lo_pop.mo_app.ms_draft.id_prev_app_stack });
  }
}





module.exports = {
  __main: "z2ui5_cl_ui5_action",
  __classes: { ltcl_test_app, ltcl_test_app2, ltcl_test },
  __tests: {"ltcl_test":["test_instantiation","test_system_startup","test_first_start","test_first_start_error","test_first_start_draft_gone","test_factory_by_frontend","test_stack_call","test_stack_call_cross_class","test_stack_leave","test_stack_leave_cross_class","test_stack_leave_fresh_target","test_stack_leave_ancestor_gone","test_nav_mode_inherited"]},
};
