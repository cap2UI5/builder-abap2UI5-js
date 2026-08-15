// GENERATED from run/input/abap2UI5/src/01/02/z2ui5_cl_ui5_handler.clas.testclasses.abap — do not edit
const cl_abap_unit_assert = require("abap2UI5/cl_abap_unit_assert");
const z2ui5_cl_ajson = require("abap2UI5/z2ui5_cl_ajson");
const z2ui5_cl_ui5_client = require("abap2UI5/z2ui5_cl_ui5_client");
const z2ui5_cl_ui5_frontend = require("abap2UI5/z2ui5_cl_ui5_frontend");
const z2ui5_cl_ui5_handler = require("abap2UI5/z2ui5_cl_ui5_handler");
const z2ui5_cl_ui5_util_context = require("abap2UI5/z2ui5_cl_ui5_util_context");
const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");
const z2ui5_if_client = require("abap2UI5/z2ui5_if_client");


class ltcl_app_nav_loop extends z2ui5_if_app {
  async main(client) {
    client.nav_app_call(new ltcl_app_nav_loop());
  }
}




class ltcl_app_noop extends z2ui5_if_app {
  check_init = false;

  async main(client) {
    this.check_init = client.check_on_init();
  }
}




class ltcl_app_sticky extends z2ui5_if_app {
  mv_init_log = ``;

  async main(client) {
    if (!z2ui5_cl_util.abap_is_initial(this.mv_init_log)) {
      this.mv_init_log = this.mv_init_log + `|`;
    }
    this.mv_init_log = this.mv_init_log + ((client.check_on_init() === true || client.check_on_init() === `X`) ? `INIT` : `EVENT`);
  }
}





class ltcl_test_handler_post {
  load_startup_app() {
    let lv_payload = ``;
    let lo_post = null;
    let temp1 = null;
    let lo_startup = null;
    lv_payload = `{"value" : { "S_FRONT":{"ORIGIN":"ORIGIN","PATHNAME":"PATHNAME","SEARCH":""}}}`;
    lo_post = new z2ui5_cl_ui5_handler({ val: lv_payload });
    lo_post.main_begin();
    cl_abap_unit_assert.assert_bound(lo_post.mo_action);
    cl_abap_unit_assert.assert_equals({ exp: `ORIGIN`, act: lo_post.ms_request.s_front.origin });
    cl_abap_unit_assert.assert_equals({ exp: `PATHNAME`, act: lo_post.ms_request.s_front.pathname });
    temp1 = z2ui5_cl_util.abap_cast(lo_post.mo_action.mo_app.mo_app);
    lo_startup = temp1;
  }

  test_request_parse() {
    let lv_payload = ``;
    let lo_handler = null;
    let ls_request = { o_model: null, s_front: { id: ``, t_event_arg: [], event: ``, o_comp_data: null, origin: ``, pathname: ``, search: ``, hash: ``, s_device: { system: ``, orientation: ``, browser: { name: ``, version: `` }, os: { name: ``, version: `` }, resize: { width: 0, height: 0 }, support: { touch: false, pointer: false, retina: false } }, s_focus: { id: ``, selection_start: 0, selection_end: 0 }, s_scroll: { main: {}, nest: {}, nest2: {}, popup: {}, popover: {} }, s_ui5: { version: ``, build_timestamp: ``, gav: ``, theme: `` } }, s_control: { check_launchpad: false, app_start: ``, app_start_draft: `` } };
    lv_payload = `{"value":{"S_FRONT":{"ORIGIN":"https://myhost.com","PATHNAME":"/sap/test","SEARCH":"?param=1"}}}`;
    lo_handler = new z2ui5_cl_ui5_handler({ val: lv_payload });
    ls_request = lo_handler.request_json_to_abap(lv_payload);
    cl_abap_unit_assert.assert_equals({ exp: `https://myhost.com`, act: ls_request.s_front.origin });
    cl_abap_unit_assert.assert_equals({ exp: `/sap/test`, act: ls_request.s_front.pathname });
    cl_abap_unit_assert.assert_equals({ exp: `?param=1`, act: ls_request.s_front.search });
  }

  test_request_origin() {
    let lv_payload = ``;
    let lo_handler = null;
    let ls_request = { o_model: null, s_front: { id: ``, t_event_arg: [], event: ``, o_comp_data: null, origin: ``, pathname: ``, search: ``, hash: ``, s_device: { system: ``, orientation: ``, browser: { name: ``, version: `` }, os: { name: ``, version: `` }, resize: { width: 0, height: 0 }, support: { touch: false, pointer: false, retina: false } }, s_focus: { id: ``, selection_start: 0, selection_end: 0 }, s_scroll: { main: {}, nest: {}, nest2: {}, popup: {}, popover: {} }, s_ui5: { version: ``, build_timestamp: ``, gav: ``, theme: `` } }, s_control: { check_launchpad: false, app_start: ``, app_start_draft: `` } };
    lv_payload = `{"value":{"S_FRONT":{"ORIGIN":"https://example.org","PATHNAME":"/app","SEARCH":""}}}`;
    lo_handler = new z2ui5_cl_ui5_handler({ val: lv_payload });
    ls_request = lo_handler.request_json_to_abap(lv_payload);
    cl_abap_unit_assert.assert_equals({ exp: `https://example.org`, act: ls_request.s_front.origin });
  }

  test_request_launchpad() {
    let lv_payload = ``;
    let lo_handler = null;
    lv_payload = `{"value":{"S_FRONT":{"ORIGIN":"O","PATHNAME":"/ui2/flp","SEARCH":"?scenario=LAUNCHPAD"}}}`;
    lo_handler = new z2ui5_cl_ui5_handler({ val: lv_payload });
    lo_handler.ms_request = lo_handler.request_json_to_abap(lv_payload);
    lo_handler.session_merge();
    cl_abap_unit_assert.assert_equals({ exp: true, act: lo_handler.ms_request.s_control.check_launchpad });
  }

  test_parse_body_with_wrapper() {
    let lv_payload = ``;
    let lo_handler = null;
    let ls_request = { o_model: null, s_front: { id: ``, t_event_arg: [], event: ``, o_comp_data: null, origin: ``, pathname: ``, search: ``, hash: ``, s_device: { system: ``, orientation: ``, browser: { name: ``, version: `` }, os: { name: ``, version: `` }, resize: { width: 0, height: 0 }, support: { touch: false, pointer: false, retina: false } }, s_focus: { id: ``, selection_start: 0, selection_end: 0 }, s_scroll: { main: {}, nest: {}, nest2: {}, popup: {}, popover: {} }, s_ui5: { version: ``, build_timestamp: ``, gav: ``, theme: `` } }, s_control: { check_launchpad: false, app_start: ``, app_start_draft: `` } };
    lv_payload = `{"value":{"S_FRONT":{"ORIGIN":"https://myhost.com","PATHNAME":"/sap/bc/z2ui5","SEARCH":""}}}`;
    lo_handler = new z2ui5_cl_ui5_handler({ val: lv_payload });
    ls_request = lo_handler.request_json_to_abap(lv_payload);
    cl_abap_unit_assert.assert_equals({ exp: `https://myhost.com`, act: ls_request.s_front.origin });
    cl_abap_unit_assert.assert_equals({ exp: `/sap/bc/z2ui5`, act: ls_request.s_front.pathname });
  }

  test_parse_body_no_wrapper() {
    let lv_payload = ``;
    let lo_handler = null;
    let ls_request = { o_model: null, s_front: { id: ``, t_event_arg: [], event: ``, o_comp_data: null, origin: ``, pathname: ``, search: ``, hash: ``, s_device: { system: ``, orientation: ``, browser: { name: ``, version: `` }, os: { name: ``, version: `` }, resize: { width: 0, height: 0 }, support: { touch: false, pointer: false, retina: false } }, s_focus: { id: ``, selection_start: 0, selection_end: 0 }, s_scroll: { main: {}, nest: {}, nest2: {}, popup: {}, popover: {} }, s_ui5: { version: ``, build_timestamp: ``, gav: ``, theme: `` } }, s_control: { check_launchpad: false, app_start: ``, app_start_draft: `` } };
    lv_payload = `{"S_FRONT":{"ORIGIN":"https://myhost.com","PATHNAME":"/ui2/flp","SEARCH":"?scenario=LAUNCHPAD"}}`;
    lo_handler = new z2ui5_cl_ui5_handler({ val: lv_payload });
    ls_request = lo_handler.request_json_to_abap(lv_payload);
    cl_abap_unit_assert.assert_equals({ exp: `https://myhost.com`, act: ls_request.s_front.origin });
    lo_handler.ms_request = z2ui5_cl_util.abap_tab_assign(lo_handler.ms_request, z2ui5_cl_util.abap_copy(ls_request));
    lo_handler.session_merge();
    cl_abap_unit_assert.assert_equals({ exp: true, act: lo_handler.ms_request.s_control.check_launchpad });
  }

  test_parse_body_model() {
    let lv_payload = ``;
    let lo_handler = null;
    let ls_request = { o_model: null, s_front: { id: ``, t_event_arg: [], event: ``, o_comp_data: null, origin: ``, pathname: ``, search: ``, hash: ``, s_device: { system: ``, orientation: ``, browser: { name: ``, version: `` }, os: { name: ``, version: `` }, resize: { width: 0, height: 0 }, support: { touch: false, pointer: false, retina: false } }, s_focus: { id: ``, selection_start: 0, selection_end: 0 }, s_scroll: { main: {}, nest: {}, nest2: {}, popup: {}, popover: {} }, s_ui5: { version: ``, build_timestamp: ``, gav: ``, theme: `` } }, s_control: { check_launchpad: false, app_start: ``, app_start_draft: `` } };
    lv_payload = `{"value":{"S_FRONT":{"ID":"ABC123","ORIGIN":"O","PATHNAME":"/p","SEARCH":""},"MODEL":{"NAME":"test-value"}}}`;
    lo_handler = new z2ui5_cl_ui5_handler({ val: lv_payload });
    ls_request = lo_handler.request_json_to_abap(lv_payload);
    cl_abap_unit_assert.assert_bound(ls_request.o_model);
    cl_abap_unit_assert.assert_equals({ exp: `test-value`, act: ls_request.o_model.get_string(`/NAME`) });
  }

  test_parse_body_model_no_wrap() {
    let lv_payload = ``;
    let lo_handler = null;
    let ls_request = { o_model: null, s_front: { id: ``, t_event_arg: [], event: ``, o_comp_data: null, origin: ``, pathname: ``, search: ``, hash: ``, s_device: { system: ``, orientation: ``, browser: { name: ``, version: `` }, os: { name: ``, version: `` }, resize: { width: 0, height: 0 }, support: { touch: false, pointer: false, retina: false } }, s_focus: { id: ``, selection_start: 0, selection_end: 0 }, s_scroll: { main: {}, nest: {}, nest2: {}, popup: {}, popover: {} }, s_ui5: { version: ``, build_timestamp: ``, gav: ``, theme: `` } }, s_control: { check_launchpad: false, app_start: ``, app_start_draft: `` } };
    lv_payload = `{"S_FRONT":{"ID":"ABC123","ORIGIN":"O","PATHNAME":"/p","SEARCH":""},"MODEL":{"NAME":"test-value"}}`;
    lo_handler = new z2ui5_cl_ui5_handler({ val: lv_payload });
    ls_request = lo_handler.request_json_to_abap(lv_payload);
    cl_abap_unit_assert.assert_bound(ls_request.o_model);
    cl_abap_unit_assert.assert_equals({ exp: `test-value`, act: ls_request.o_model.get_string(`/NAME`) });
  }

  test_parse_body_config() {
    let lv_payload = ``;
    let lo_handler = null;
    let ls_request = { o_model: null, s_front: { id: ``, t_event_arg: [], event: ``, o_comp_data: null, origin: ``, pathname: ``, search: ``, hash: ``, s_device: { system: ``, orientation: ``, browser: { name: ``, version: `` }, os: { name: ``, version: `` }, resize: { width: 0, height: 0 }, support: { touch: false, pointer: false, retina: false } }, s_focus: { id: ``, selection_start: 0, selection_end: 0 }, s_scroll: { main: {}, nest: {}, nest2: {}, popup: {}, popover: {} }, s_ui5: { version: ``, build_timestamp: ``, gav: ``, theme: `` } }, s_control: { check_launchpad: false, app_start: ``, app_start_draft: `` } };
    lv_payload = `{"value":{"S_FRONT":{"ID":"ABC123","ORIGIN":"O","PATHNAME":"/p","SEARCH":"",` + `"CONFIG":{"ComponentData":{"startupParameters":{}},` + `"S_DEVICE":{"SYSTEM":"desktop"},` + `"S_FOCUS":{"ID":"my-input","SELECTION_START":2,"SELECTION_END":5},` + `"S_SCROLL":{"MAIN":{"ID":"page","X":0,"Y":150}},` + `"S_UI5":{"VERSION":"1.120.0","BUILDTIMESTAMP":"20240101","GAV":"com.sap.ui:sdk:1.120.0","THEME":"sap_horizon"}}}}}`;
    lo_handler = new z2ui5_cl_ui5_handler({ val: lv_payload });
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
    let ls_request = { o_model: null, s_front: { id: ``, t_event_arg: [], event: ``, o_comp_data: null, origin: ``, pathname: ``, search: ``, hash: ``, s_device: { system: ``, orientation: ``, browser: { name: ``, version: `` }, os: { name: ``, version: `` }, resize: { width: 0, height: 0 }, support: { touch: false, pointer: false, retina: false } }, s_focus: { id: ``, selection_start: 0, selection_end: 0 }, s_scroll: { main: {}, nest: {}, nest2: {}, popup: {}, popover: {} }, s_ui5: { version: ``, build_timestamp: ``, gav: ``, theme: `` } }, s_control: { check_launchpad: false, app_start: ``, app_start_draft: `` } };
    lv_payload = `{"value":{"S_FRONT":{"ID":"ABC123","ORIGIN":"O","PATHNAME":"/p","SEARCH":""}}}`;
    lo_handler = new z2ui5_cl_ui5_handler({ val: lv_payload });
    ls_request = lo_handler.request_json_to_abap(lv_payload);
    cl_abap_unit_assert.assert_not_bound(ls_request.s_front.o_comp_data);
    cl_abap_unit_assert.assert_initial(ls_request.s_front.s_device);
    cl_abap_unit_assert.assert_initial(ls_request.s_front.s_ui5);
  }

  test_parse_body_arg_string() {
    let lv_payload = ``;
    let lo_handler = null;
    let ls_request = { o_model: null, s_front: { id: ``, t_event_arg: [], event: ``, o_comp_data: null, origin: ``, pathname: ``, search: ``, hash: ``, s_device: { system: ``, orientation: ``, browser: { name: ``, version: `` }, os: { name: ``, version: `` }, resize: { width: 0, height: 0 }, support: { touch: false, pointer: false, retina: false } }, s_focus: { id: ``, selection_start: 0, selection_end: 0 }, s_scroll: { main: {}, nest: {}, nest2: {}, popup: {}, popover: {} }, s_ui5: { version: ``, build_timestamp: ``, gav: ``, theme: `` } }, s_control: { check_launchpad: false, app_start: ``, app_start_draft: `` } };
    lv_payload = `{"value":{"S_FRONT":{"ID":"ABC123","ORIGIN":"O","PATHNAME":"/p","SEARCH":"",` + `"EVENT":"MY_EVENT","T_EVENT_ARG":["first","second"]}}}`;
    lo_handler = new z2ui5_cl_ui5_handler({ val: lv_payload });
    ls_request = lo_handler.request_json_to_abap(lv_payload);
    cl_abap_unit_assert.assert_equals({ exp: 2, act: ls_request.s_front.t_event_arg.length });
    cl_abap_unit_assert.assert_equals({ exp: `first`, act: ls_request.s_front.t_event_arg[(1) - 1] });
    cl_abap_unit_assert.assert_equals({ exp: `second`, act: ls_request.s_front.t_event_arg[(2) - 1] });
  }

  test_parse_body_arg_object() {
    let lv_payload = ``;
    let lo_handler = null;
    let ls_request = { o_model: null, s_front: { id: ``, t_event_arg: [], event: ``, o_comp_data: null, origin: ``, pathname: ``, search: ``, hash: ``, s_device: { system: ``, orientation: ``, browser: { name: ``, version: `` }, os: { name: ``, version: `` }, resize: { width: 0, height: 0 }, support: { touch: false, pointer: false, retina: false } }, s_focus: { id: ``, selection_start: 0, selection_end: 0 }, s_scroll: { main: {}, nest: {}, nest2: {}, popup: {}, popover: {} }, s_ui5: { version: ``, build_timestamp: ``, gav: ``, theme: `` } }, s_control: { check_launchpad: false, app_start: ``, app_start_draft: `` } };
    lv_payload = `{"value":{"S_FRONT":{"ID":"ABC123","ORIGIN":"O","PATHNAME":"/p","SEARCH":"",` + `"EVENT":"MY_EVENT","T_EVENT_ARG":["plain",5,true,{"KEY":"val"},[1,2]]}}}`;
    lo_handler = new z2ui5_cl_ui5_handler({ val: lv_payload });
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
    let ls_request = { o_model: null, s_front: { id: ``, t_event_arg: [], event: ``, o_comp_data: null, origin: ``, pathname: ``, search: ``, hash: ``, s_device: { system: ``, orientation: ``, browser: { name: ``, version: `` }, os: { name: ``, version: `` }, resize: { width: 0, height: 0 }, support: { touch: false, pointer: false, retina: false } }, s_focus: { id: ``, selection_start: 0, selection_end: 0 }, s_scroll: { main: {}, nest: {}, nest2: {}, popup: {}, popover: {} }, s_ui5: { version: ``, build_timestamp: ``, gav: ``, theme: `` } }, s_control: { check_launchpad: false, app_start: ``, app_start_draft: `` } };
    lv_payload = `{"value":{"S_FRONT":{"ORIGIN":"O","PATHNAME":"/p","SEARCH":"?app_start=Z2UI5_CL_UI5_APP_HI_WORLD"}}}`;
    lo_handler = new z2ui5_cl_ui5_handler({ val: lv_payload });
    ls_request = lo_handler.request_json_to_abap(lv_payload);
    cl_abap_unit_assert.assert_equals({ exp: `Z2UI5_CL_UI5_APP_HI_WORLD`, act: ls_request.s_control.app_start });
  }

  test_request_with_id() {
    let lv_payload = ``;
    let lo_handler = null;
    let ls_request = { o_model: null, s_front: { id: ``, t_event_arg: [], event: ``, o_comp_data: null, origin: ``, pathname: ``, search: ``, hash: ``, s_device: { system: ``, orientation: ``, browser: { name: ``, version: `` }, os: { name: ``, version: `` }, resize: { width: 0, height: 0 }, support: { touch: false, pointer: false, retina: false } }, s_focus: { id: ``, selection_start: 0, selection_end: 0 }, s_scroll: { main: {}, nest: {}, nest2: {}, popup: {}, popover: {} }, s_ui5: { version: ``, build_timestamp: ``, gav: ``, theme: `` } }, s_control: { check_launchpad: false, app_start: ``, app_start_draft: `` } };
    lv_payload = `{"value":{"S_FRONT":{"ID":"ABC123","ORIGIN":"O","PATHNAME":"/p","SEARCH":""}}}`;
    lo_handler = new z2ui5_cl_ui5_handler({ val: lv_payload });
    ls_request = lo_handler.request_json_to_abap(lv_payload);
    cl_abap_unit_assert.assert_equals({ exp: `ABC123`, act: ls_request.s_front.id });
  }

  test_response_json() {
    let lo_handler = null;
    let temp2 = { s_front: { s_action: {}, id: ``, app: `` }, model: `` };
    let ls_response = { s_front: { s_action: {}, id: ``, app: `` }, model: `` };
    let lv_json = ``;
    let temp1 = false;
    let temp3 = false;
    let temp4 = false;
    lo_handler = new z2ui5_cl_ui5_handler({ val: `` });
    temp2 = { s_front: { s_action: {}, id: ``, app: `` }, model: `` };
    temp2.s_front.id = `ID123`;
    temp2.s_front.app = `Z2UI5_CL_UI5_APP_HI_WORLD`;
    temp2.model = `{"name":"test"}`;
    ls_response = z2ui5_cl_util.abap_tab_assign(ls_response, z2ui5_cl_util.abap_copy(temp2));
    lv_json = lo_handler.response_abap_to_json(ls_response);
    temp1 = (String(lv_json).toLowerCase().includes(String(`S_FRONT`).toLowerCase()));
    cl_abap_unit_assert.assert_true(temp1);
    temp3 = (String(lv_json).toLowerCase().includes(String(`MODEL`).toLowerCase()));
    cl_abap_unit_assert.assert_true(temp3);
    temp4 = (String(lv_json).toLowerCase().includes(String(`{"name":"test"}`).toLowerCase()));
    cl_abap_unit_assert.assert_true(temp4);
  }

  test_session_stored() {
    let lo_handler = null;
    lo_handler = new z2ui5_cl_ui5_handler({ val: `` });
    lo_handler.ms_request.s_front.s_device.system = `desktop`;
    lo_handler.ms_request.s_front.s_device.os.name = `Windows`;
    lo_handler.ms_request.s_front.s_ui5.version = `1.120.0`;
    lo_handler.session_merge();
    cl_abap_unit_assert.assert_equals({ exp: `desktop`, act: lo_handler.mo_action.mo_app.ms_session.s_device.system });
    cl_abap_unit_assert.assert_equals({ exp: `1.120.0`, act: lo_handler.mo_action.mo_app.ms_session.s_ui5.version });
  }

  test_session_location() {
    let lo_handler = null;
    lo_handler = new z2ui5_cl_ui5_handler({ val: `` });
    lo_handler.ms_request.s_front.origin = `https://host`;
    lo_handler.ms_request.s_front.pathname = `/sap/bc/z2ui5`;
    lo_handler.ms_request.s_front.search = `?app_start=Z_MY_APP`;
    lo_handler.ms_request.s_front.s_device.system = `desktop`;
    lo_handler.ms_request.s_front.s_ui5.version = `1.120.0`;
    lo_handler.session_merge();
    cl_abap_unit_assert.assert_equals({ exp: `https://host`, act: lo_handler.mo_action.mo_app.ms_session.origin });
    lo_handler.ms_request.s_front.origin = null;
    lo_handler.ms_request.s_front.pathname = null;
    lo_handler.ms_request.s_front.search = null;
    lo_handler.ms_request.s_front.s_device = null;
    lo_handler.ms_request.s_front.s_ui5 = null;
    lo_handler.session_merge();
    cl_abap_unit_assert.assert_equals({ exp: `https://host`, act: lo_handler.ms_request.s_front.origin });
    cl_abap_unit_assert.assert_equals({ exp: `/sap/bc/z2ui5`, act: lo_handler.ms_request.s_front.pathname });
    cl_abap_unit_assert.assert_equals({ exp: `?app_start=Z_MY_APP`, act: lo_handler.ms_request.s_front.search });
  }

  test_session_launchpad() {
    let lo_handler = null;
    lo_handler = new z2ui5_cl_ui5_handler({ val: `` });
    lo_handler.ms_request.s_front.origin = `https://host`;
    lo_handler.ms_request.s_front.pathname = `/sap/bc/ui2/flp`;
    lo_handler.ms_request.s_front.s_device.system = `desktop`;
    lo_handler.ms_request.s_front.s_ui5.version = `1.120.0`;
    lo_handler.session_merge();
    cl_abap_unit_assert.assert_true(lo_handler.ms_request.s_control.check_launchpad);
    lo_handler.ms_request.s_front.origin = null;
    lo_handler.ms_request.s_front.pathname = null;
    lo_handler.ms_request.s_front.search = null;
    lo_handler.ms_request.s_front.s_device = null;
    lo_handler.ms_request.s_front.s_ui5 = null;
    lo_handler.ms_request.s_control = null;
    lo_handler.session_merge();
    cl_abap_unit_assert.assert_true(lo_handler.ms_request.s_control.check_launchpad);
  }

  test_session_from_draft() {
    let lo_handler = null;
    lo_handler = new z2ui5_cl_ui5_handler({ val: `` });
    lo_handler.mo_action.mo_app.ms_session = { s_ui5: { version: `1.120.0` }, s_device: { system: `phone`, os: { name: `iOS` }, orientation: `portrait`, resize: { width: 400 } } };
    lo_handler.ms_request.s_front.s_device.orientation = `landscape`;
    lo_handler.ms_request.s_front.s_device.resize.width = 900;
    lo_handler.session_merge();
    cl_abap_unit_assert.assert_equals({ exp: `phone`, act: lo_handler.ms_request.s_front.s_device.system });
    cl_abap_unit_assert.assert_equals({ exp: `1.120.0`, act: lo_handler.ms_request.s_front.s_ui5.version });
    cl_abap_unit_assert.assert_equals({ exp: `landscape`, act: lo_handler.ms_request.s_front.s_device.orientation });
    cl_abap_unit_assert.assert_equals({ exp: 900, act: lo_handler.ms_request.s_front.s_device.resize.width });
  }

  test_session_new_device() {
    let lo_handler = null;
    lo_handler = new z2ui5_cl_ui5_handler({ val: `` });
    lo_handler.mo_action.mo_app.ms_session = { s_device: { system: `phone`, os: { name: `iOS` } } };
    lo_handler.ms_request.s_front.s_device.system = `desktop`;
    lo_handler.ms_request.s_front.s_device.os.name = `Windows`;
    lo_handler.session_merge();
    cl_abap_unit_assert.assert_equals({ exp: `desktop`, act: lo_handler.mo_action.mo_app.ms_session.s_device.system });
    cl_abap_unit_assert.assert_equals({ exp: `Windows`, act: lo_handler.mo_action.mo_app.ms_session.s_device.os.name });
  }

  test_response_actions_embedded() {
    let lo_handler = null;
    let ls_response = { s_front: { s_action: {}, id: ``, app: `` }, model: `` };
    lo_handler = new z2ui5_cl_ui5_handler({ val: `` });
    ls_response.s_front.id = `ID123`;
    ls_response.s_front.s_action.t_system.push(z2ui5_cl_util.abap_copy({ o_json: z2ui5_cl_ajson.parse(`["CONTROL_BY_ID","tab","","setHiddenInPopin",{"A":1}]`) }));
    ls_response.s_front.s_action.t_custom.push(z2ui5_cl_util.abap_copy({ o_json: z2ui5_cl_ajson.parse(`["SET_FOCUS","id1"]`) }));
    ls_response.s_front.s_action.t_custom.push(z2ui5_cl_util.abap_copy({ js: `eF('SET_FOCUS','id2')` }));
    const lv_json = lo_handler.response_abap_to_json(ls_response);
    cl_abap_unit_assert.assert_true((String(lv_json).toLowerCase().includes(String(`"T_SYSTEM":[["CONTROL_BY_ID","tab","","setHiddenInPopin",{"A":1}]]`).toLowerCase())));
    cl_abap_unit_assert.assert_true((String(lv_json).toLowerCase().includes(String(`"T_CUSTOM":[["SET_FOCUS","id1"],"eF('SET_FOCUS','id2')"]`).toLowerCase())));
  }

  test_response_no_model() {
    let lo_handler = null;
    let ls_response = { s_front: { s_action: {}, id: ``, app: `` }, model: `` };
    lo_handler = new z2ui5_cl_ui5_handler({ val: `` });
    ls_response.s_front.id = `ID123`;
    let lv_json = lo_handler.response_abap_to_json(ls_response);
    cl_abap_unit_assert.assert_false((String(lv_json).toLowerCase().includes(String(`MODEL`).toLowerCase())));
    cl_abap_unit_assert.assert_true((String(lv_json).toLowerCase().includes(String(`S_FRONT`).toLowerCase())));
    ls_response.model = `{}`;
    lv_json = lo_handler.response_abap_to_json(ls_response);
    cl_abap_unit_assert.assert_false((String(lv_json).toLowerCase().includes(String(`MODEL`).toLowerCase())));
  }

  test_system_slot_order() {
    let lo_handler = null;
    let li_client = null;
    lo_handler = new z2ui5_cl_ui5_handler({ val: `` });
    li_client = new z2ui5_cl_ui5_client(lo_handler.mo_action);
    li_client.popover_display({ xml: `<Popover/>`, by_id: `btn` });
    li_client.nest2_view_display({ val: `<Nest2/>`, id: `n2`, method_insert: `addEndColumnPage` });
    li_client.nest_view_display({ val: `<Nest/>`, id: `n1`, method_insert: `addMidColumnPage` });
    li_client.popup_display(`<Dialog/>`);
    li_client.view_display(`<View/>`);
    new z2ui5_cl_ui5_frontend(lo_handler.mo_action).slots_serialize();
    cl_abap_unit_assert.assert_equals({ exp: `MAIN|NEST|NEST2|POPUP|POPOVER`, act: this.slot_sequence({ val: lo_handler }) });
  }

  test_system_last_wins() {
    let lo_handler = null;
    let li_client = null;
    lo_handler = new z2ui5_cl_ui5_handler({ val: `` });
    li_client = new z2ui5_cl_ui5_client(lo_handler.mo_action);
    li_client.view_display(`<First/>`);
    li_client.view_display(`<Second/>`);
    new z2ui5_cl_ui5_frontend(lo_handler.mo_action).slots_serialize();
    const lt_js = z2ui5_cl_util.abap_copy(lo_handler.mo_action.ms_next.s_action.t_system);
    cl_abap_unit_assert.assert_equals({ exp: 1, act: lt_js.length });
    cl_abap_unit_assert.assert_equals({ exp: `["VIEW_SLOTS","display","MAIN","<Second/>"]`, act: lt_js[(1) - 1].o_json.stringify() });
  }

  test_system_empty() {
    let lo_handler = null;
    lo_handler = new z2ui5_cl_ui5_handler({ val: `` });
    new z2ui5_cl_ui5_frontend(lo_handler.mo_action).slots_serialize();
    cl_abap_unit_assert.assert_initial(lo_handler.mo_action.ms_next.s_action.t_system);
  }

  test_system_destroy_only() {
    let lo_handler = null;
    let li_client = null;
    lo_handler = new z2ui5_cl_ui5_handler({ val: `` });
    li_client = new z2ui5_cl_ui5_client(lo_handler.mo_action);
    li_client.popup_destroy();
    new z2ui5_cl_ui5_frontend(lo_handler.mo_action).slots_serialize();
    const lt_js = z2ui5_cl_util.abap_copy(lo_handler.mo_action.ms_next.s_action.t_system);
    cl_abap_unit_assert.assert_equals({ exp: 1, act: lt_js.length });
    cl_abap_unit_assert.assert_equals({ exp: `["VIEW_SLOTS","destroy","POPUP"]`, act: lt_js[(1) - 1].o_json.stringify() });
  }

  system_actions_of({ val } = {}) {
    let result = ``;
    let sy_tabix = 0;
    sy_tabix = 0;
    for (const ls_queued of val.ms_response.s_front.s_action.t_system) {
      sy_tabix++;
      if (!z2ui5_cl_util.abap_is_initial(result)) {
        result = result + `|`;
      }
      result = result + (ls_queued.o_json != null ? ls_queued.o_json.stringify() : ls_queued.js);
    }
    return result;
  }

  slot_sequence({ val } = {}) {
    let result = ``;
    let sy_tabix = 0;
    let lv_js;
    let lv_slot;
    sy_tabix = 0;
    for (const ls_queued of val.mo_action.ms_next.s_action.t_system) {
      sy_tabix++;
      lv_js = ls_queued.o_json.stringify();
      let lt_part = lv_js.split(`","`);
      lv_slot = (() => { try { return lt_part[(3) - 1] ?? null; } catch { return null; } })().replace(`"]`, ``);
      if (String(result).toLowerCase().includes(String(lv_slot).toLowerCase())) {
        continue;
      }
      if (!z2ui5_cl_util.abap_is_initial(result)) {
        result = result + `|`;
      }
      result = result + lv_slot;
    }
    return result;
  }

  test_view_update_flag() {
    let lo_handler = null;
    lo_handler = new z2ui5_cl_ui5_handler({ val: `` });
    let li_client = null;
    li_client = new z2ui5_cl_ui5_client(lo_handler.mo_action);
    li_client.view_display(`<View/>`);
    cl_abap_unit_assert.assert_true((lo_handler.mo_action.ms_next.t_action_front.some((row) => row.method === `display`)));
  }

  test_view_update_popup() {
    let lo_handler = null;
    lo_handler = new z2ui5_cl_ui5_handler({ val: `` });
    let li_client = null;
    li_client = new z2ui5_cl_ui5_client(lo_handler.mo_action);
    li_client.popup_display(`<Dialog/>`);
    cl_abap_unit_assert.assert_true((lo_handler.mo_action.ms_next.t_action_front.some((row) => row.method === `display`)));
    li_client.popup_destroy();
    cl_abap_unit_assert.assert_false((lo_handler.mo_action.ms_next.t_action_front.some((row) => row.method === `display`)));
  }

  test_view_update_none() {
    let lo_handler = null;
    lo_handler = new z2ui5_cl_ui5_handler({ val: `` });
    cl_abap_unit_assert.assert_false((lo_handler.mo_action.ms_next.t_action_front.some((row) => row.method === `display`)));
  }

  test_dispatch_loop_guard() {
    let lo_handler = null;
    let lo_loop_app = null;
    let lx = null;
    lo_handler = new z2ui5_cl_ui5_handler({ val: `` });
    lo_handler.mv_dispatch_limit = 5;
    lo_loop_app = new ltcl_app_nav_loop();
    lo_handler.mo_action.mo_app.mo_app = lo_loop_app;
    lo_handler.mo_action.mo_app.ms_draft.id = z2ui5_cl_ui5_util_context.uuid_get_c32();
    try {
      lo_handler.main_loop();
      cl_abap_unit_assert.fail(`dispatch loop guard did not raise`);
    } catch (_caught1) {
      lx = _caught1;
      cl_abap_unit_assert.assert_char_cp({ act: lx.get_text(), exp: `*nav_app_call*` });
    }
  }

  test_constructor() {
    let lo_handler = null;
    lo_handler = new z2ui5_cl_ui5_handler({ val: `test payload` });
    cl_abap_unit_assert.assert_equals({ exp: `test payload`, act: lo_handler.mv_request_json });
    cl_abap_unit_assert.assert_bound(lo_handler.mo_action);
  }

  test_hash_app_part() {
    let lo_handler = null;
    lo_handler = new z2ui5_cl_ui5_handler({ val: `` });
    cl_abap_unit_assert.assert_equals({ exp: `/app/ZCL_X/D1`, act: lo_handler.hash_get_app_part(`#/app/ZCL_X/D1`) });
    cl_abap_unit_assert.assert_equals({ exp: `app/ZCL_X/D1`, act: lo_handler.hash_get_app_part(`#Z2UI5-display&/app/ZCL_X/D1`) });
    cl_abap_unit_assert.assert_equals({ exp: `app/ZCL_X`, act: lo_handler.hash_get_app_part(`#Z2UI5-display?a=b&c=d&/app/ZCL_X`) });
    cl_abap_unit_assert.assert_equals({ exp: `/app/ZCL_X/D1?next=&/y`, act: lo_handler.hash_get_app_part(`#/app/ZCL_X/D1?next=&/y`) });
    cl_abap_unit_assert.assert_equals({ exp: ``, act: lo_handler.hash_get_app_part(``) });
  }

  test_route_standalone() {
    let lo_handler = null;
    lo_handler = new z2ui5_cl_ui5_handler({ val: `` });
    cl_abap_unit_assert.assert_equals({ exp: `ZCL_X`, act: lo_handler.request_app_start_route(`#/app/ZCL_X/D1`) });
    cl_abap_unit_assert.assert_equals({ exp: `D1`, act: lo_handler.request_app_start_route_draft(`#/app/ZCL_X/D1`) });
    cl_abap_unit_assert.assert_equals({ exp: `ZCL_X`, act: lo_handler.request_app_start_route(`#/app/ZCL_X`) });
    cl_abap_unit_assert.assert_equals({ exp: ``, act: lo_handler.request_app_start_route_draft(`#/app/ZCL_X`) });
    cl_abap_unit_assert.assert_equals({ exp: `ZCL_X`, act: lo_handler.request_app_start_route(`#//app/ZCL_X/D1`) });
    cl_abap_unit_assert.assert_equals({ exp: `D1`, act: lo_handler.request_app_start_route_draft(`#//app/ZCL_X/D1`) });
    cl_abap_unit_assert.assert_equals({ exp: `ZCL_X`, act: lo_handler.request_app_start_route(`#//app/ZCL_X`) });
  }

  test_route_launchpad() {
    let lo_handler = null;
    lo_handler = new z2ui5_cl_ui5_handler({ val: `` });
    cl_abap_unit_assert.assert_equals({ exp: `ZCL_X`, act: lo_handler.request_app_start_route(`#Z2UI5-display&/app/ZCL_X/D1`) });
    cl_abap_unit_assert.assert_equals({ exp: `D1`, act: lo_handler.request_app_start_route_draft(`#Z2UI5-display&/app/ZCL_X/D1`) });
    cl_abap_unit_assert.assert_equals({ exp: `ZCL_X`, act: lo_handler.request_app_start_route(`#Z2UI5-display&//app/ZCL_X/D1`) });
  }

  test_route_no_route() {
    let lo_handler = null;
    lo_handler = new z2ui5_cl_ui5_handler({ val: `` });
    cl_abap_unit_assert.assert_equals({ exp: ``, act: lo_handler.request_app_start_route(``) });
    cl_abap_unit_assert.assert_equals({ exp: ``, act: lo_handler.request_app_start_route(`#/head/pos/42`) });
    cl_abap_unit_assert.assert_equals({ exp: ``, act: lo_handler.request_app_start_route(`#Z2UI5-display`) });
    cl_abap_unit_assert.assert_equals({ exp: ``, act: lo_handler.request_app_start_route(`#/head/app/ZCL_X`) });
  }

  test_app_state_hash() {
    let lo_handler = null;
    lo_handler = new z2ui5_cl_ui5_handler({ val: `` });
    cl_abap_unit_assert.assert_equals({ exp: `ABC123`, act: lo_handler.request_app_start_draft(`#/z2ui5-xapp-state=ABC123`) });
    cl_abap_unit_assert.assert_equals({ exp: `ABC123`, act: lo_handler.request_app_start_draft(`#Z2UI5-display&/z2ui5-xapp-state=ABC123`) });
    cl_abap_unit_assert.assert_equals({ exp: `ABC123`, act: lo_handler.request_app_start_draft(`#//z2ui5-xapp-state=ABC123`) });
  }

  test_auto_update_push() {
    let lo_handler = null;
    lo_handler = new z2ui5_cl_ui5_handler({ val: `` });
    lo_handler.mo_action.mo_app.mo_app = new ltcl_app_noop();
    lo_handler.mo_action.mo_app.ms_draft.id = z2ui5_cl_ui5_util_context.uuid_get_c32();
    lo_handler.mv_model_before_taken = true;
    lo_handler.mv_model_before = `<other model state>`;
    lo_handler.main_end();
    cl_abap_unit_assert.assert_equals({ exp: false, act: (String(this.system_actions_of({ val: lo_handler })).toLowerCase().includes(String(`updateModel`).toLowerCase())) });
    cl_abap_unit_assert.assert_equals({ exp: lo_handler.mo_action.mo_app.model_json_stringify(), act: lo_handler.ms_response.model });
  }

  test_auto_update_same() {
    let lo_handler = null;
    lo_handler = new z2ui5_cl_ui5_handler({ val: `` });
    lo_handler.mo_action.mo_app.mo_app = new ltcl_app_noop();
    lo_handler.mo_action.mo_app.ms_draft.id = z2ui5_cl_ui5_util_context.uuid_get_c32();
    lo_handler.mv_model_before_taken = true;
    lo_handler.mv_model_before = lo_handler.mo_action.mo_app.model_json_stringify();
    lo_handler.main_end();
    cl_abap_unit_assert.assert_equals({ exp: `{}`, act: lo_handler.ms_response.model });
    cl_abap_unit_assert.assert_equals({ exp: false, act: (String(this.system_actions_of({ val: lo_handler })).toLowerCase().includes(String(`updateModel`).toLowerCase())) });
  }

  test_nested_display_push() {
    let lo_handler = null;
    let li_client = null;
    lo_handler = new z2ui5_cl_ui5_handler({ val: `` });
    lo_handler.mo_action.mo_app.mo_app = new ltcl_app_noop();
    lo_handler.mo_action.mo_app.ms_draft.id = z2ui5_cl_ui5_util_context.uuid_get_c32();
    li_client = new z2ui5_cl_ui5_client(lo_handler.mo_action);
    li_client.nest_view_display({ val: `<Nest/>`, id: `col`, method_insert: `addMidColumnPage` });
    lo_handler.main_end();
    cl_abap_unit_assert.assert_equals({ exp: lo_handler.mo_action.mo_app.model_json_stringify(), act: lo_handler.ms_response.model });
    cl_abap_unit_assert.assert_equals({ exp: false, act: (String(this.system_actions_of({ val: lo_handler })).toLowerCase().includes(String(`updateModel`).toLowerCase())) });
  }

  test_auto_update_snapshot() {
    let lo_handler = null;
    lo_handler = new z2ui5_cl_ui5_handler({ val: `` });
    lo_handler.mo_action.mo_app.mo_app = new ltcl_app_noop();
    lo_handler.mo_action.mo_app.ms_draft.id = z2ui5_cl_ui5_util_context.uuid_get_c32();
    lo_handler.main_process();
    cl_abap_unit_assert.assert_equals({ exp: true, act: lo_handler.mv_model_before_taken });
  }

  test_nav_mode_resent() {
    let lo_handler = null;
    let lo_app = null;
    lo_handler = new z2ui5_cl_ui5_handler({ val: `` });
    lo_app = new ltcl_app_nav_loop();
    lo_handler.mo_action.mo_app.mo_app = lo_app;
    lo_handler.mo_action.mo_app.ms_draft.id = z2ui5_cl_ui5_util_context.uuid_get_c32();
    lo_handler.mo_action.mo_app.mv_nav_mode = z2ui5_cl_util.abap_tab_assign(lo_handler.mo_action.mo_app.mv_nav_mode, z2ui5_cl_util.abap_copy(z2ui5_if_client.cs_nav_mode.keep));
    lo_handler.main_end();
    cl_abap_unit_assert.assert_char_cp({ exp: `*"setNavRouting":"KEEP"*`, act: this.system_actions_of({ val: lo_handler }) });
    lo_handler.ms_request.s_front.id = `SOME_DRAFT`;
    lo_handler.mo_action.ms_next = null;
    lo_handler.main_end();
    cl_abap_unit_assert.assert_equals({ exp: false, act: (String(this.system_actions_of({ val: lo_handler })).toLowerCase().includes(String(`setNavRouting`).toLowerCase())) });
    lo_handler = new z2ui5_cl_ui5_handler({ val: `` });
    lo_handler.mo_action.mo_app.mo_app = new ltcl_app_nav_loop();
    lo_handler.mo_action.mo_app.ms_draft.id = z2ui5_cl_ui5_util_context.uuid_get_c32();
    lo_handler.main_end();
    cl_abap_unit_assert.assert_equals({ exp: false, act: (String(this.system_actions_of({ val: lo_handler })).toLowerCase().includes(String(`setNavRouting`).toLowerCase())) });
  }
}





module.exports = {
  __main: "z2ui5_cl_ui5_handler",
  __classes: { ltcl_app_nav_loop, ltcl_app_noop, ltcl_app_sticky, ltcl_test_handler_post },
  __tests: {"ltcl_test_handler_post":["load_startup_app","test_dispatch_loop_guard","test_request_parse","test_request_origin","test_request_launchpad","test_parse_body_with_wrapper","test_parse_body_no_wrapper","test_parse_body_model","test_parse_body_model_no_wrap","test_parse_body_config","test_parse_body_no_config","test_parse_body_arg_string","test_parse_body_arg_object","test_request_app_start","test_request_with_id","test_response_json","test_view_update_flag","test_view_update_popup","test_view_update_none","test_constructor","test_hash_app_part","test_route_standalone","test_route_launchpad","test_route_no_route","test_app_state_hash","test_nav_mode_resent","test_auto_update_push","test_auto_update_same","test_nested_display_push","test_auto_update_snapshot","test_session_stored","test_session_location","test_session_launchpad","test_session_from_draft","test_session_new_device","test_response_no_model","test_response_actions_embedded","test_system_slot_order","test_system_last_wins","test_system_empty","test_system_destroy_only"]},
};
