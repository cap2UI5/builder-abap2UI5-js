// GENERATED from run/input/abap2UI5/src/01/02/z2ui5_cl_core_handler.clas.testclasses.abap — do not edit
const cl_abap_unit_assert = require("abap2UI5/cl_abap_unit_assert");
const z2ui5_cl_a2ui5_context = require("abap2UI5/z2ui5_cl_a2ui5_context");
const z2ui5_cl_core_handler = require("abap2UI5/z2ui5_cl_core_handler");
const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");


class ltcl_app_nav_loop extends z2ui5_if_app {
  async main(client) {
    client.nav_app_call(new ltcl_app_nav_loop());
  }
}



class ltcl_test_handler_post {
  load_startup_app() {
    let lv_payload = ``;
    let lo_post = null;
    let temp1 = null;
    let lo_startup = null;
    if (sy_sysid === `ABC`) {
      return;
    }
    lv_payload = `{"value" : { "S_FRONT":{"ORIGIN":"ORIGIN","PATHNAME":"PATHNAME","SEARCH":""}}}`;
    lo_post = new z2ui5_cl_core_handler({ val: lv_payload });
    lo_post.main_begin();
    cl_abap_unit_assert.assert_bound(lo_post.mo_action);
    cl_abap_unit_assert.assert_equals({ exp: `ORIGIN`, act: lo_post.ms_request.s_front.origin });
    cl_abap_unit_assert.assert_equals({ exp: `PATHNAME`, act: lo_post.ms_request.s_front.pathname });
    temp1 = z2ui5_cl_util.abap_copy(lo_post.mo_action.mo_app.mo_app);
    lo_startup = z2ui5_cl_util.abap_copy(temp1);
  }

  test_request_parse() {
    let lv_payload = ``;
    let lo_handler = null;
    let ls_request = null;
    lv_payload = `{"value":{"S_FRONT":{"ORIGIN":"https://myhost.com","PATHNAME":"/sap/test","SEARCH":"?param=1"}}}`;
    lo_handler = new z2ui5_cl_core_handler({ val: lv_payload });
    ls_request = lo_handler.request_json_to_abap(lv_payload);
    cl_abap_unit_assert.assert_equals({ exp: `https://myhost.com`, act: ls_request.s_front.origin });
    cl_abap_unit_assert.assert_equals({ exp: `/sap/test`, act: ls_request.s_front.pathname });
    cl_abap_unit_assert.assert_equals({ exp: `?param=1`, act: ls_request.s_front.search });
  }

  test_request_origin() {
    let lv_payload = ``;
    let lo_handler = null;
    let ls_request = null;
    lv_payload = `{"value":{"S_FRONT":{"ORIGIN":"https://example.org","PATHNAME":"/app","SEARCH":""}}}`;
    lo_handler = new z2ui5_cl_core_handler({ val: lv_payload });
    ls_request = lo_handler.request_json_to_abap(lv_payload);
    cl_abap_unit_assert.assert_equals({ exp: `https://example.org`, act: ls_request.s_front.origin });
  }

  test_request_launchpad() {
    let lv_payload = ``;
    let lo_handler = null;
    let ls_request = null;
    lv_payload = `{"value":{"S_FRONT":{"ORIGIN":"O","PATHNAME":"/ui2/flp","SEARCH":"?scenario=LAUNCHPAD"}}}`;
    lo_handler = new z2ui5_cl_core_handler({ val: lv_payload });
    ls_request = lo_handler.request_json_to_abap(lv_payload);
    cl_abap_unit_assert.assert_equals({ exp: true, act: ls_request.s_control.check_launchpad });
  }

  test_parse_body_with_wrapper() {
    let lv_payload = ``;
    let lo_handler = null;
    let ls_request = null;
    lv_payload = `{"value":{"S_FRONT":{"ORIGIN":"https://myhost.com","PATHNAME":"/sap/bc/z2ui5","SEARCH":""}}}`;
    lo_handler = new z2ui5_cl_core_handler({ val: lv_payload });
    ls_request = lo_handler.request_json_to_abap(lv_payload);
    cl_abap_unit_assert.assert_equals({ exp: `https://myhost.com`, act: ls_request.s_front.origin });
    cl_abap_unit_assert.assert_equals({ exp: `/sap/bc/z2ui5`, act: ls_request.s_front.pathname });
  }

  test_parse_body_no_wrapper() {
    let lv_payload = ``;
    let lo_handler = null;
    let ls_request = null;
    lv_payload = `{"S_FRONT":{"ORIGIN":"https://myhost.com","PATHNAME":"/ui2/flp","SEARCH":"?scenario=LAUNCHPAD"}}`;
    lo_handler = new z2ui5_cl_core_handler({ val: lv_payload });
    ls_request = lo_handler.request_json_to_abap(lv_payload);
    cl_abap_unit_assert.assert_equals({ exp: `https://myhost.com`, act: ls_request.s_front.origin });
    cl_abap_unit_assert.assert_equals({ exp: true, act: ls_request.s_control.check_launchpad });
  }

  test_parse_body_model() {
    let lv_payload = ``;
    let lo_handler = null;
    let ls_request = null;
    lv_payload = `{"value":{"S_FRONT":{"ID":"ABC123","ORIGIN":"O","PATHNAME":"/p","SEARCH":""},"XX":{"NAME":"test-value"}}}`;
    lo_handler = new z2ui5_cl_core_handler({ val: lv_payload });
    ls_request = lo_handler.request_json_to_abap(lv_payload);
    cl_abap_unit_assert.assert_bound(ls_request.o_model);
    cl_abap_unit_assert.assert_equals({ exp: `test-value`, act: ls_request.o_model.get_string(`/XX/NAME`) });
  }

  test_parse_body_model_no_wrap() {
    let lv_payload = ``;
    let lo_handler = null;
    let ls_request = null;
    lv_payload = `{"S_FRONT":{"ID":"ABC123","ORIGIN":"O","PATHNAME":"/p","SEARCH":""},"XX":{"NAME":"test-value"}}`;
    lo_handler = new z2ui5_cl_core_handler({ val: lv_payload });
    ls_request = lo_handler.request_json_to_abap(lv_payload);
    cl_abap_unit_assert.assert_bound(ls_request.o_model);
    cl_abap_unit_assert.assert_equals({ exp: `test-value`, act: ls_request.o_model.get_string(`/XX/NAME`) });
  }

  test_parse_body_config() {
    let lv_payload = ``;
    let lo_handler = null;
    let ls_request = null;
    lv_payload = `{"value":{"S_FRONT":{"ID":"ABC123","ORIGIN":"O","PATHNAME":"/p","SEARCH":"",` + `"CONFIG":{"ComponentData":{"startupParameters":{}},` + `"S_DEVICE":{"SYSTEM":"desktop"},` + `"S_FOCUS":{"ID":"my-input","SELECTION_START":2,"SELECTION_END":5},` + `"S_SCROLL":{"MAIN":{"ID":"page","X":0,"Y":150}},` + `"S_UI5":{"VERSION":"1.120.0","BUILDTIMESTAMP":"20240101","GAV":"com.sap.ui:sdk:1.120.0","THEME":"sap_horizon"}}}}}`;
    lo_handler = new z2ui5_cl_core_handler({ val: lv_payload });
    ls_request = lo_handler.request_json_to_abap(lv_payload);
    cl_abap_unit_assert.assert_bound(ls_request.s_front.o_comp_data);
    cl_abap_unit_assert.assert_equals({ exp: `desktop`, act: ls_request.s_front.s_device.system });
    cl_abap_unit_assert.assert_equals({ exp: `my-input`, act: ls_request.s_front.s_focus.id });
    cl_abap_unit_assert.assert_equals({ exp: 150, act: ls_request.s_front.s_scroll.main.y });
    cl_abap_unit_assert.assert_equals({ exp: `1.120.0`, act: ls_request.s_front.s_ui5.version });
    cl_abap_unit_assert.assert_equals({ exp: `20240101`, act: ls_request.s_front.s_ui5.build_timestamp });
    cl_abap_unit_assert.assert_equals({ exp: `sap_horizon`, act: ls_request.s_front.s_ui5.theme });
  }

  test_parse_body_no_config() {
    let lv_payload = ``;
    let lo_handler = null;
    let ls_request = null;
    lv_payload = `{"value":{"S_FRONT":{"ID":"ABC123","ORIGIN":"O","PATHNAME":"/p","SEARCH":""}}}`;
    lo_handler = new z2ui5_cl_core_handler({ val: lv_payload });
    ls_request = lo_handler.request_json_to_abap(lv_payload);
    cl_abap_unit_assert.assert_not_bound(ls_request.s_front.o_comp_data);
    cl_abap_unit_assert.assert_initial(ls_request.s_front.s_device);
    cl_abap_unit_assert.assert_initial(ls_request.s_front.s_ui5);
  }

  test_parse_body_arg_string() {
    let lv_payload = ``;
    let lo_handler = null;
    let ls_request = null;
    lv_payload = `{"value":{"S_FRONT":{"ID":"ABC123","ORIGIN":"O","PATHNAME":"/p","SEARCH":"",` + `"EVENT":"MY_EVENT","T_EVENT_ARG":["first","second"]}}}`;
    lo_handler = new z2ui5_cl_core_handler({ val: lv_payload });
    ls_request = lo_handler.request_json_to_abap(lv_payload);
    cl_abap_unit_assert.assert_equals({ exp: 2, act: ls_request.s_front.t_event_arg.length });
    cl_abap_unit_assert.assert_equals({ exp: `first`, act: ls_request.s_front.t_event_arg[(1) - 1] });
    cl_abap_unit_assert.assert_equals({ exp: `second`, act: ls_request.s_front.t_event_arg[(2) - 1] });
  }

  test_parse_body_arg_object() {
    let lv_payload = ``;
    let lo_handler = null;
    let ls_request = null;
    lv_payload = `{"value":{"S_FRONT":{"ID":"ABC123","ORIGIN":"O","PATHNAME":"/p","SEARCH":"",` + `"EVENT":"MY_EVENT","T_EVENT_ARG":["plain",5,true,{"KEY":"val"},[1,2]]}}}`;
    lo_handler = new z2ui5_cl_core_handler({ val: lv_payload });
    ls_request = lo_handler.request_json_to_abap(lv_payload);
    cl_abap_unit_assert.assert_equals({ exp: 5, act: ls_request.s_front.t_event_arg.length });
    cl_abap_unit_assert.assert_equals({ exp: `plain`, act: ls_request.s_front.t_event_arg[(1) - 1] });
    cl_abap_unit_assert.assert_equals({ exp: `5`, act: ls_request.s_front.t_event_arg[(2) - 1] });
    cl_abap_unit_assert.assert_equals({ exp: `X`, act: ls_request.s_front.t_event_arg[(3) - 1] });
    cl_abap_unit_assert.assert_equals({ exp: `{"KEY":"val"}`, act: ls_request.s_front.t_event_arg[(4) - 1] });
    cl_abap_unit_assert.assert_equals({ exp: `[1,2]`, act: ls_request.s_front.t_event_arg[(5) - 1] });
  }

  test_request_app_start() {
    let lv_payload = ``;
    let lo_handler = null;
    let ls_request = null;
    lv_payload = `{"value":{"S_FRONT":{"ORIGIN":"O","PATHNAME":"/p","SEARCH":"?app_start=Z2UI5_CL_APP_HELLO_WORLD"}}}`;
    lo_handler = new z2ui5_cl_core_handler({ val: lv_payload });
    ls_request = lo_handler.request_json_to_abap(lv_payload);
    cl_abap_unit_assert.assert_equals({ exp: `Z2UI5_CL_APP_HELLO_WORLD`, act: ls_request.s_control.app_start });
  }

  test_request_with_id() {
    let lv_payload = ``;
    let lo_handler = null;
    let ls_request = null;
    lv_payload = `{"value":{"S_FRONT":{"ID":"ABC123","ORIGIN":"O","PATHNAME":"/p","SEARCH":""}}}`;
    lo_handler = new z2ui5_cl_core_handler({ val: lv_payload });
    ls_request = lo_handler.request_json_to_abap(lv_payload);
    cl_abap_unit_assert.assert_equals({ exp: `ABC123`, act: ls_request.s_front.id });
  }

  test_response_json() {
    let lo_handler = null;
    let temp2 = null;
    let ls_response = null;
    let lv_json = ``;
    let temp1 = false;
    let temp3 = false;
    let temp4 = false;
    lo_handler = new z2ui5_cl_core_handler({ val: `` });
    temp2 = null;
    temp2.s_front.id = `ID123`;
    temp2.s_front.app = `Z2UI5_CL_APP_HELLO_WORLD`;
    temp2.model = `{"name":"test"}`;
    ls_response = z2ui5_cl_util.abap_copy(temp2);
    lv_json = lo_handler.response_abap_to_json(ls_response);
    temp1 = (String(lv_json).toLowerCase().includes(String(`S_FRONT`).toLowerCase()));
    cl_abap_unit_assert.assert_true(temp1);
    temp3 = (String(lv_json).toLowerCase().includes(String(`MODEL`).toLowerCase()));
    cl_abap_unit_assert.assert_true(temp3);
    temp4 = (String(lv_json).toLowerCase().includes(String(`{"name":"test"}`).toLowerCase()));
    cl_abap_unit_assert.assert_true(temp4);
  }

  test_view_update_flag() {
    let lo_handler = null;
    lo_handler = new z2ui5_cl_core_handler({ val: `` });
    lo_handler.ms_response.s_front.params.s_view.xml = `<View/>`;
    cl_abap_unit_assert.assert_equals({ exp: true, act: lo_handler.check_view_update_needed() });
  }

  test_view_update_popup() {
    let lo_handler = null;
    lo_handler = new z2ui5_cl_core_handler({ val: `` });
    lo_handler.ms_response.s_front.params.s_popup.check_update_model = true;
    cl_abap_unit_assert.assert_equals({ exp: true, act: lo_handler.check_view_update_needed() });
  }

  test_view_update_none() {
    let lo_handler = null;
    lo_handler = new z2ui5_cl_core_handler({ val: `` });
    cl_abap_unit_assert.assert_equals({ exp: false, act: lo_handler.check_view_update_needed() });
  }

  test_dispatch_loop_guard() {
    let lo_handler = null;
    let lo_loop_app = null;
    let lx = null;
    lo_handler = new z2ui5_cl_core_handler({ val: `` });
    lo_handler.mv_dispatch_limit = 5;
    lo_loop_app = /* TODO(abap2js): NEW #( ) */ null;
    lo_handler.mo_action.mo_app.mo_app = z2ui5_cl_util.abap_copy(lo_loop_app);
    lo_handler.mo_action.mo_app.ms_draft.id = z2ui5_cl_a2ui5_context.uuid_get_c32();
    try {
      lo_handler.main_loop();
      cl_abap_unit_assert.fail(`dispatch loop guard did not raise`);
    } catch (lx) {
      cl_abap_unit_assert.assert_char_cp({ act: lx.get_text(), exp: `*nav_app_call*` });
    }
  }

  test_constructor() {
    let lo_handler = null;
    lo_handler = new z2ui5_cl_core_handler({ val: `test payload` });
    cl_abap_unit_assert.assert_equals({ exp: `test payload`, act: lo_handler.mv_request_json });
    cl_abap_unit_assert.assert_bound(lo_handler.mo_action);
  }
}



module.exports = {
  __main: "z2ui5_cl_core_handler",
  __classes: { ltcl_app_nav_loop, ltcl_test_handler_post },
  __tests: {"ltcl_test_handler_post":["load_startup_app","test_dispatch_loop_guard","test_request_parse","test_request_origin","test_request_launchpad","test_parse_body_with_wrapper","test_parse_body_no_wrapper","test_parse_body_model","test_parse_body_model_no_wrap","test_parse_body_config","test_parse_body_no_config","test_parse_body_arg_string","test_parse_body_arg_object","test_request_app_start","test_request_with_id","test_response_json","test_view_update_flag","test_view_update_popup","test_view_update_none","test_constructor"]},
};
