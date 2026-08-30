// GENERATED from run/input/abap2UI5/src/01/02/z2ui5_cl_ui5_client.clas.testclasses.abap — do not edit
const cl_abap_unit_assert = require("abap2UI5/cl_abap_unit_assert");
const z2ui5_cl_ajson = require("abap2UI5/z2ui5_cl_ajson");
const z2ui5_cl_ui5_action = require("abap2UI5/z2ui5_cl_ui5_action");
const z2ui5_cl_ui5_app_cont = require("abap2UI5/z2ui5_cl_ui5_app_cont");
const z2ui5_cl_ui5_client = require("abap2UI5/z2ui5_cl_ui5_client");
const z2ui5_cl_ui5_handler = require("abap2UI5/z2ui5_cl_ui5_handler");
const z2ui5_cl_ui5_util_context = require("abap2UI5/z2ui5_cl_ui5_util_context");
const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");
const z2ui5_if_ajson_filter = require("abap2UI5/z2ui5_if_ajson_filter");
const z2ui5_if_ajson_types = require("abap2UI5/z2ui5_if_ajson_types");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");
const z2ui5_if_client = require("abap2UI5/z2ui5_if_client");


class lcl_empty_filter_keep_rows {
  keep_node({ is_node, iv_visit = z2ui5_if_ajson_filter.visit_type.value } = {}) {
    let rv_keep = false;
    if (is_node.index > 0) {
      rv_keep = true;
      return rv_keep;
    }
    if (iv_visit === z2ui5_if_ajson_filter.visit_type.value) {
      if (is_node.type === z2ui5_if_ajson_types.node_type.number) {
        rv_keep = (is_node.value !== `0`);
      } else {
        rv_keep = (!z2ui5_cl_util.abap_is_initial(is_node.value));
      }
    } else {
      rv_keep = (is_node.children > 0);
    }
    return rv_keep;
  }
}





class lcl_initial_paths_filter {
  mt_names = [];

  constructor({ it_paths } = {}) {
    let sy_tabix = 0;
    let lv_name;
    sy_tabix = 0;
    for (const lv_path of it_paths) {
      sy_tabix++;
      lv_name = lv_path.toUpperCase();
      if (String(lv_name).toLowerCase().includes(String(`/`).toLowerCase())) {
        let lt_parts = lv_name.split(`/`);
        lv_name = (() => { try { return lt_parts[(lt_parts.length) - 1] ?? null; } catch { return null; } })();
      }
      if (!z2ui5_cl_util.abap_is_initial(lv_name) && !this.mt_names.some((row) => row.table_line === lv_name)) {
        this.mt_names.push(z2ui5_cl_util.abap_copy(lv_name));
      }
    }
  }

  keep_node({ is_node, iv_visit = z2ui5_if_ajson_filter.visit_type.value } = {}) {
    let rv_keep = false;
    rv_keep = true;
    if (iv_visit !== z2ui5_if_ajson_filter.visit_type.value) {
      return rv_keep;
    }
    const lv_name = is_node.name.toUpperCase();
    if (!this.mt_names.some((row) => row.table_line === lv_name)) {
      return rv_keep;
    }
    if (is_node.type === z2ui5_if_ajson_types.node_type.number) {
      rv_keep = (is_node.value !== `0`);
    } else {
      rv_keep = (!z2ui5_cl_util.abap_is_initial(is_node.value));
    }
    return rv_keep;
  }
}





class lcl_and_filter {
  mi_first = null;
  mi_second = null;

  constructor({ ii_first, ii_second } = {}) {
    this.mi_first = ii_first;
    this.mi_second = ii_second;
  }

  keep_node({ is_node, iv_visit = z2ui5_if_ajson_filter.visit_type.value } = {}) {
    let rv_keep = false;
    rv_keep = this.mi_first.keep_node({ is_node, iv_visit });
    if ((rv_keep === true || rv_keep === `X`)) {
      rv_keep = this.mi_second.keep_node({ is_node, iv_visit });
    }
    return rv_keep;
  }
}





class ltcl_test_app extends z2ui5_if_app {
  mv_name = ``;
  mt_emp = [];

  async main(client) {
  }
}




class ltcl_bad_filter {
  keep_node({ is_node, iv_visit = z2ui5_if_ajson_filter.visit_type.value } = {}) {
    let rv_keep = false;
    rv_keep = true;
    return rv_keep;
  }
}





class ltcl_test_client {
  mo_client = null;
  mo_action = null;
  mo_test_app = null;

  system_actions() {
    let result = ``;
    let sy_tabix = 0;
    sy_tabix = 0;
    for (const ls_action of this.mo_action.ms_next.t_action_front) {
      sy_tabix++;
      if (!z2ui5_cl_util.abap_is_initial(result)) {
        result = result + `|`;
      }
      result = result + `${ls_action.slot}|${ls_action.method}|${ls_action.xml}`;
      if (ls_action.options != null && !(ls_action.options.is_empty() === true || ls_action.options.is_empty() === `X`)) {
        result = result + `|${ls_action.options.stringify()}`;
      }
    }
    return result;
  }

  setup() {
    let lo_http = null;
    let lo_test_app = null;
    lo_http = new z2ui5_cl_ui5_handler({ val: `` });
    this.mo_action = new z2ui5_cl_ui5_action({ val: lo_http });
    lo_test_app = new ltcl_test_app();
    this.mo_test_app = lo_test_app;
    this.mo_action.mo_app.mo_app = lo_test_app;
    this.mo_action.mo_app.mv_check_initialized = false;
    this.mo_client = new z2ui5_cl_ui5_client({ action: this.mo_action });
  }

  test_instantiation() {
    cl_abap_unit_assert.assert_bound(this.mo_client);
    cl_abap_unit_assert.assert_bound(this.mo_client.mo_action);
    cl_abap_unit_assert.assert_bound(this.mo_client.mo_srv_bind);
    cl_abap_unit_assert.assert_bound(this.mo_client.mo_srv_event);
  }

  test_view_display() {
    let temp1 = null;
    let li_client = null;
    temp1 = z2ui5_cl_util.abap_cast(this.mo_client);
    li_client = temp1;
    li_client.view_display(`<View></View>`);
    cl_abap_unit_assert.assert_equals({ exp: `MAIN|display|<View></View>`, act: this.system_actions() });
  }

  test_view_destroy() {
    let temp2 = null;
    let li_client = null;
    temp2 = z2ui5_cl_util.abap_cast(this.mo_client);
    li_client = temp2;
    li_client.view_destroy();
    cl_abap_unit_assert.assert_equals({ exp: `MAIN|destroy|`, act: this.system_actions() });
  }

  test_view_model_update() {
    let temp3 = null;
    let li_client = null;
    temp3 = z2ui5_cl_util.abap_cast(this.mo_client);
    li_client = temp3;
    li_client.view_model_update();
    cl_abap_unit_assert.assert_initial(this.mo_action.ms_next.s_action);
  }

  test_nest_model_update() {
    let temp4 = null;
    let li_client = null;
    temp4 = z2ui5_cl_util.abap_cast(this.mo_client);
    li_client = temp4;
    li_client.nest_view_model_update();
    li_client.nest2_view_model_update();
    cl_abap_unit_assert.assert_initial(this.mo_action.ms_next.s_action);
  }

  test_popup_display() {
    let temp4 = null;
    let li_client = null;
    temp4 = z2ui5_cl_util.abap_cast(this.mo_client);
    li_client = temp4;
    li_client.popup_display(`<Dialog/>`);
    cl_abap_unit_assert.assert_equals({ exp: `POPUP|display|<Dialog/>`, act: this.system_actions() });
  }

  test_popup_destroy() {
    let temp5 = null;
    let li_client = null;
    temp5 = z2ui5_cl_util.abap_cast(this.mo_client);
    li_client = temp5;
    li_client.popup_destroy();
    cl_abap_unit_assert.assert_equals({ exp: `POPUP|destroy|`, act: this.system_actions() });
  }

  test_popup_model_update() {
    let temp6 = null;
    let li_client = null;
    temp6 = z2ui5_cl_util.abap_cast(this.mo_client);
    li_client = temp6;
    li_client.popup_model_update();
    cl_abap_unit_assert.assert_initial(this.mo_action.ms_next.s_action);
  }

  test_popover_display() {
    let temp7 = null;
    let li_client = null;
    temp7 = z2ui5_cl_util.abap_cast(this.mo_client);
    li_client = temp7;
    li_client.popover_display({ xml: `<Popover/>`, by_id: `btn1` });
    cl_abap_unit_assert.assert_equals({ exp: `POPOVER|display|<Popover/>|{"openById":"btn1"}`, act: this.system_actions() });
  }

  test_popover_destroy() {
    let temp8 = null;
    let li_client = null;
    temp8 = z2ui5_cl_util.abap_cast(this.mo_client);
    li_client = temp8;
    li_client.popover_display({ xml: `<Popover/>`, by_id: `btn1` });
    li_client.popover_destroy();
    cl_abap_unit_assert.assert_equals({ exp: `POPOVER|destroy|`, act: this.system_actions() });
  }

  test_popover_model_update() {
    let temp9 = null;
    let li_client = null;
    temp9 = z2ui5_cl_util.abap_cast(this.mo_client);
    li_client = temp9;
    li_client.popover_model_update();
    cl_abap_unit_assert.assert_initial(this.mo_action.ms_next.s_action);
  }

  test_nest_view_display() {
    let temp10 = null;
    let li_client = null;
    temp10 = z2ui5_cl_util.abap_cast(this.mo_client);
    li_client = temp10;
    li_client.nest_view_destroy();
    li_client.nest_view_display({ val: `<NestView/>`, id: `nest1`, method_insert: `addMidColumnPage`, method_destroy: `removeMidColumnPage` });
    cl_abap_unit_assert.assert_equals({ exp: `NEST|display|<NestView/>|` + `{"id":"nest1","methodDestroy":"removeMidColumnPage","methodInsert":"addMidColumnPage"}`, act: this.system_actions() });
  }

  test_nest_view_destroy() {
    let temp11 = null;
    let li_client = null;
    temp11 = z2ui5_cl_util.abap_cast(this.mo_client);
    li_client = temp11;
    li_client.nest_view_display({ val: `<NestView/>`, id: `nest1`, method_insert: `addMidColumnPage` });
    li_client.nest_view_destroy();
    cl_abap_unit_assert.assert_equals({ exp: `NEST|destroy|`, act: this.system_actions() });
  }

  test_nest2_view_display() {
    let temp12 = null;
    let li_client = null;
    temp12 = z2ui5_cl_util.abap_cast(this.mo_client);
    li_client = temp12;
    li_client.nest2_view_display({ val: `<Nest2View/>`, id: `nest2`, method_insert: `addEndColumnPage` });
    cl_abap_unit_assert.assert_equals({ exp: `NEST2|display|<Nest2View/>|` + `{"id":"nest2","methodInsert":"addEndColumnPage"}`, act: this.system_actions() });
  }

  test_nest2_view_destroy() {
    let temp13 = null;
    let li_client = null;
    temp13 = z2ui5_cl_util.abap_cast(this.mo_client);
    li_client = temp13;
    li_client.nest2_view_destroy();
    cl_abap_unit_assert.assert_equals({ exp: `NEST2|destroy|`, act: this.system_actions() });
  }

  test_message_box_display() {
    let temp14 = null;
    let li_client = null;
    temp14 = z2ui5_cl_util.abap_cast(this.mo_client);
    li_client = temp14;
    li_client.message_box_display(`Hello World`);
    cl_abap_unit_assert.assert_equals({ exp: `["MESSAGE_BOX","show","Hello World",{"title":"Information"}]`, act: this.mo_action.ms_next.s_action.t_custom[(1) - 1].o_json.stringify() });
  }

  test_message_box_type() {
    let temp15 = null;
    let li_client = null;
    temp15 = z2ui5_cl_util.abap_cast(this.mo_client);
    li_client = temp15;
    li_client.message_box_display({ text: `Error occurred`, type: `error` });
    cl_abap_unit_assert.assert_equals({ exp: `["MESSAGE_BOX","error","Error occurred"]`, act: this.mo_action.ms_next.s_action.t_custom[(1) - 1].o_json.stringify() });
  }

  test_message_box_dependent() {
    let temp15b = null;
    let li_client = null;
    temp15b = z2ui5_cl_util.abap_cast(this.mo_client);
    li_client = temp15b;
    li_client.message_box_display({ text: `The quantity exceeds the plan.`, type: `confirm`, dependenton: `myPage`, contentwidth: `20rem` });
    cl_abap_unit_assert.assert_equals({ exp: `["MESSAGE_BOX","confirm","The quantity exceeds the plan.",` + `{"contentWidth":"20rem","dependentOn":"myPage"}]`, act: this.mo_action.ms_next.s_action.t_custom[(1) - 1].o_json.stringify() });
  }

  test_message_toast() {
    let temp16 = null;
    let li_client = null;
    temp16 = z2ui5_cl_util.abap_cast(this.mo_client);
    li_client = temp16;
    li_client.message_toast_display(`Saved`);
    cl_abap_unit_assert.assert_equals({ exp: `["MESSAGE_TOAST","show","Saved"]`, act: this.mo_action.ms_next.s_action.t_custom[(1) - 1].o_json.stringify() });
  }

  test_set_nav_routing() {
    let li_client = null;
    li_client = z2ui5_cl_util.abap_cast(this.mo_client);
    li_client.follow_up_action({ val: z2ui5_if_client.cs_event.set_nav_routing, t_arg: [z2ui5_if_client.cs_nav_mode.fresh] });
    cl_abap_unit_assert.assert_equals({ exp: z2ui5_if_client.cs_nav_mode.fresh, act: this.mo_action.ms_next.s_nav.set_nav_routing });
    cl_abap_unit_assert.assert_equals({ exp: z2ui5_if_client.cs_nav_mode.fresh, act: this.mo_action.mo_app.mv_nav_mode });
    cl_abap_unit_assert.assert_initial(this.mo_action.ms_next.s_action.t_custom);
  }

  test_set_nav_routing_default() {
    let li_client = null;
    li_client = z2ui5_cl_util.abap_cast(this.mo_client);
    li_client.follow_up_action(z2ui5_if_client.cs_event.set_nav_routing);
    cl_abap_unit_assert.assert_equals({ exp: z2ui5_if_client.cs_nav_mode.keep, act: this.mo_action.mo_app.mv_nav_mode });
  }

  test_follow_up_action() {
    let temp17 = null;
    let li_client = null;
    temp17 = z2ui5_cl_util.abap_cast(this.mo_client);
    li_client = temp17;
    li_client.follow_up_action(`sap.m.MessageToast.show('test')`);
    cl_abap_unit_assert.assert_equals({ exp: 1, act: this.mo_action.ms_next.s_action.t_custom.length });
  }

  test_follow_up_action_ev() {
    let li_client = null;
    li_client = z2ui5_cl_util.abap_cast(this.mo_client);
    li_client.follow_up_action({ val: z2ui5_if_client.cs_event.set_title, t_arg: [`My Title`] });
    li_client.follow_up_action(z2ui5_if_client.cs_event.location_reload);
    cl_abap_unit_assert.assert_equals({ exp: 2, act: this.mo_action.ms_next.s_action.t_custom.length });
    cl_abap_unit_assert.assert_equals({ exp: `["SET_TITLE","My Title"]`, act: this.mo_action.ms_next.s_action.t_custom[(1) - 1].o_json.stringify() });
    cl_abap_unit_assert.assert_equals({ exp: `["LOCATION_RELOAD"]`, act: this.mo_action.ms_next.s_action.t_custom[(2) - 1].o_json.stringify() });
  }

  test_follow_up_action_nav() {
    let li_client = null;
    li_client = z2ui5_cl_util.abap_cast(this.mo_client);
    li_client.follow_up_action({ val: z2ui5_if_client.cs_event.nav_container_to, t_arg: [`myContainer`, `myPage`] });
    li_client.follow_up_action({ val: z2ui5_if_client.cs_event.popup_nav_container_to, t_arg: [`popContainer`, `popPage`] });
    cl_abap_unit_assert.assert_equals({ exp: 2, act: this.mo_action.ms_next.s_action.t_custom.length });
    cl_abap_unit_assert.assert_equals({ exp: `["CONTROL_BY_ID","myContainer","MAIN","to","myPage"]`, act: this.mo_action.ms_next.s_action.t_custom[(1) - 1].o_json.stringify() });
    cl_abap_unit_assert.assert_equals({ exp: `["CONTROL_BY_ID","popContainer","POPUP","to","popPage"]`, act: this.mo_action.ms_next.s_action.t_custom[(2) - 1].o_json.stringify() });
  }

  test_follow_up_action_ctrl() {
    let li_client = null;
    li_client = z2ui5_cl_util.abap_cast(this.mo_client);
    li_client.follow_up_action({ val: z2ui5_if_client.cs_event.control_global, t_arg: [`MESSAGE_TOAST`, `show`, `Hello`] });
    li_client.follow_up_action({ val: z2ui5_if_client.cs_event.control_by_id, t_arg: [`demoPanel`, `setExpanded`, `X`] });
    li_client.follow_up_action({ val: z2ui5_if_client.cs_event.control_by_id, view: z2ui5_if_client.cs_view.popover, t_arg: [`demoPanel`, `setExpanded`, `X`] });
    cl_abap_unit_assert.assert_equals({ exp: 3, act: this.mo_action.ms_next.s_action.t_custom.length });
    cl_abap_unit_assert.assert_equals({ exp: `["CONTROL_GLOBAL","MESSAGE_TOAST","show","Hello"]`, act: this.mo_action.ms_next.s_action.t_custom[(1) - 1].o_json.stringify() });
    cl_abap_unit_assert.assert_equals({ exp: `["CONTROL_BY_ID","demoPanel","","setExpanded","X"]`, act: this.mo_action.ms_next.s_action.t_custom[(2) - 1].o_json.stringify() });
    cl_abap_unit_assert.assert_equals({ exp: `["CONTROL_BY_ID","demoPanel","POPOVER","setExpanded","X"]`, act: this.mo_action.ms_next.s_action.t_custom[(3) - 1].o_json.stringify() });
  }

  test_check_on_init() {
    this.mo_action.mo_app.mv_check_initialized = false;
    cl_abap_unit_assert.assert_equals({ exp: true, act: this.mo_client.check_on_init() });
  }

  test_check_on_init_done() {
    this.mo_action.mo_app.mv_check_initialized = true;
    cl_abap_unit_assert.assert_equals({ exp: false, act: this.mo_client.check_on_init() });
  }

  test_check_on_event() {
    let temp21 = null;
    let li_client = null;
    this.mo_action.ms_actual.event = `BUTTON_PRESS`;
    temp21 = z2ui5_cl_util.abap_cast(this.mo_client);
    li_client = temp21;
    cl_abap_unit_assert.assert_equals({ exp: true, act: li_client.check_on_event(`BUTTON_PRESS`) });
    cl_abap_unit_assert.assert_equals({ exp: false, act: li_client.check_on_event(`OTHER_EVENT`) });
  }

  test_check_on_event_empty() {
    let temp22 = null;
    let li_client = null;
    this.mo_action.ms_actual.event = ``;
    temp22 = z2ui5_cl_util.abap_cast(this.mo_client);
    li_client = temp22;
    cl_abap_unit_assert.assert_equals({ exp: false, act: li_client.check_on_event() });
  }

  test_check_on_navigated() {
    let temp23 = null;
    let li_client = null;
    this.mo_action.ms_actual.check_on_navigated = true;
    temp23 = z2ui5_cl_util.abap_cast(this.mo_client);
    li_client = temp23;
    cl_abap_unit_assert.assert_equals({ exp: true, act: li_client.check_on_navigated() });
  }

  test_nav_app_call() {
    let lo_new_app = null;
    let temp24 = null;
    let li_client = null;
    let lv_id = ``;
    lo_new_app = new ltcl_test_app();
    temp24 = z2ui5_cl_util.abap_cast(this.mo_client);
    li_client = temp24;
    lv_id = li_client.nav_app_call(lo_new_app);
    cl_abap_unit_assert.assert_not_initial(lv_id);
    cl_abap_unit_assert.assert_bound(this.mo_action.ms_next.o_app_call);
  }

  test_nav_app_call_id_stable() {
    let lo_new_app = null;
    let li_client = null;
    let lv_id_first = ``;
    let lv_id_second = ``;
    lo_new_app = new ltcl_test_app();
    li_client = z2ui5_cl_util.abap_cast(this.mo_client);
    lv_id_first = li_client.nav_app_call(lo_new_app);
    lv_id_second = li_client.nav_app_call(lo_new_app);
    cl_abap_unit_assert.assert_not_initial(lv_id_second);
    cl_abap_unit_assert.assert_equals({ exp: lv_id_first, act: lv_id_second });
    cl_abap_unit_assert.assert_equals({ exp: lv_id_first, act: lo_new_app.id_app });
  }

  test_nav_app_leave_event() {
    let lo_app = null;
    let li_client = null;
    lo_app = new ltcl_test_app();
    li_client = z2ui5_cl_util.abap_cast(this.mo_client);
    li_client.nav_app_leave({ app: lo_app, event: `MY_EVENT` });
    cl_abap_unit_assert.assert_bound(this.mo_action.ms_next.o_app_leave);
    cl_abap_unit_assert.assert_equals({ exp: `MY_EVENT`, act: this.mo_action.ms_next.next_event });
    cl_abap_unit_assert.assert_equals({ exp: 0, act: this.mo_action.ms_next.s_action.t_custom.length });
  }

  test_nav_app_leave_r_data() {
    let lo_app = null;
    let li_client = null;
    let lv_data = `payload`;
    lo_app = new ltcl_test_app();
    li_client = z2ui5_cl_util.abap_cast(this.mo_client);
    li_client.nav_app_leave({ app: lo_app, event: `MY_EVENT`, r_data: lv_data });
    cl_abap_unit_assert.assert_bound(this.mo_action.ms_next.r_data);
  }

  test_nav_leave_r_data_empty() {
    let sy_subrc = 0;
    let fs_data = null;
    let _fs$fs_data = null;
    let lo_app = null;
    let li_client = null;
    let lv_data = ``;
    lo_app = new ltcl_test_app();
    li_client = z2ui5_cl_util.abap_cast(this.mo_client);
    li_client.nav_app_leave({ app: lo_app, event: `MY_EVENT`, r_data: lv_data });
    cl_abap_unit_assert.assert_bound(this.mo_action.ms_next.r_data);
    fs_data = this.mo_action.ms_next.r_data;
    _fs$fs_data = { o: this.mo_action.ms_next, k: `r_data` };
    sy_subrc = 0;
    cl_abap_unit_assert.assert_initial(fs_data);
  }

  test_nav_leave_r_data_not_sup() {
    let lo_app = null;
    let li_client = null;
    lo_app = new ltcl_test_app();
    li_client = z2ui5_cl_util.abap_cast(this.mo_client);
    li_client.nav_app_leave({ app: lo_app, event: `MY_EVENT` });
    cl_abap_unit_assert.assert_not_bound(this.mo_action.ms_next.r_data);
  }

  test_nav_leave_r_data_unbound() {
    let lo_app = null;
    let li_client = null;
    let lr_data = null;
    lo_app = new ltcl_test_app();
    li_client = z2ui5_cl_util.abap_cast(this.mo_client);
    li_client.nav_app_leave({ app: lo_app, event: `MY_EVENT`, r_data: lr_data });
    cl_abap_unit_assert.assert_not_bound(this.mo_action.ms_next.r_data);
  }

  test_check_app_prev_stack() {
    let temp25 = null;
    let li_client = null;
    temp25 = z2ui5_cl_util.abap_cast(this.mo_client);
    li_client = temp25;
    cl_abap_unit_assert.assert_equals({ exp: false, act: li_client.check_app_prev_stack() });
    this.mo_action.mo_app.ms_draft.id_prev_app_stack = `PREV_ID`;
    cl_abap_unit_assert.assert_equals({ exp: true, act: li_client.check_app_prev_stack() });
  }

  test_set_push_state() {
    let temp26 = null;
    let li_client = null;
    temp26 = z2ui5_cl_util.abap_cast(this.mo_client);
    li_client = temp26;
    li_client.set_push_state(`mystate`);
    cl_abap_unit_assert.assert_equals({ exp: `mystate`, act: this.mo_action.ms_next.s_nav.set_push_state });
  }

  test_get_event() {
    let li_client = null;
    this.mo_action.ms_actual.event = `BUTTON_PRESS`;
    li_client = z2ui5_cl_util.abap_cast(this.mo_client);
    cl_abap_unit_assert.assert_equals({ exp: `BUTTON_PRESS`, act: li_client.get_event() });
  }

  test_event_arg_shorthand() {
    let li_client = null;
    li_client = z2ui5_cl_util.abap_cast(this.mo_client);
    cl_abap_unit_assert.assert_equals({ exp: li_client._event({ val: `PRESSED`, t_arg: [`\${AUTHOR}`] }), act: li_client._event({ val: `PRESSED`, arg: `\${AUTHOR}` }) });
  }

  test_event_arg_appends() {
    let li_client = null;
    li_client = z2ui5_cl_util.abap_cast(this.mo_client);
    cl_abap_unit_assert.assert_equals({ exp: li_client._event({ val: `PRESSED`, t_arg: [`first`, `second`] }), act: li_client._event({ val: `PRESSED`, t_arg: [`first`], arg: `second` }) });
  }

  test_event_arg_empty() {
    let li_client = null;
    li_client = z2ui5_cl_util.abap_cast(this.mo_client);
    cl_abap_unit_assert.assert_equals({ exp: li_client._event({ val: `PRESSED`, t_arg: [``] }), act: li_client._event({ val: `PRESSED`, arg: `` }) });
    cl_abap_unit_assert.assert_differs({ exp: li_client._event(`PRESSED`), act: li_client._event({ val: `PRESSED`, arg: `` }) });
  }

  test_bind_path_alias() {
    let li_client = null;
    li_client = z2ui5_cl_util.abap_cast(this.mo_client);
    cl_abap_unit_assert.assert_equals({ exp: li_client._bind({ val: this.mo_test_app.mv_name, path: true }), act: li_client._bind_path(this.mo_test_app.mv_name) });
    cl_abap_unit_assert.assert_equals({ exp: `/MV_NAME`, act: li_client._bind_path(this.mo_test_app.mv_name) });
    cl_abap_unit_assert.assert_equals({ exp: `{/MV_NAME}`, act: li_client._bind(this.mo_test_app.mv_name) });
  }

  test_get_event_arg() {
    let temp28 = [];
    let temp30 = null;
    let li_client = null;
    temp28 = [];
    temp28.push(z2ui5_cl_util.abap_copy(`arg1`));
    temp28.push(z2ui5_cl_util.abap_copy(`arg2`));
    this.mo_action.ms_actual.t_event_arg = z2ui5_cl_util.abap_tab_assign(this.mo_action.ms_actual.t_event_arg, z2ui5_cl_util.abap_copy(temp28));
    temp30 = z2ui5_cl_util.abap_cast(this.mo_client);
    li_client = temp30;
    cl_abap_unit_assert.assert_equals({ exp: `arg1`, act: li_client.get_event_arg(1) });
    cl_abap_unit_assert.assert_equals({ exp: `arg2`, act: li_client.get_event_arg(2) });
  }

  test_omit_initial_paths() {
    const li_filter = (new lcl_initial_paths_filter([`MIN`, `/ROWS/MAX`]));
    cl_abap_unit_assert.assert_equals({ exp: false, act: li_filter.keep_node({ name: `MIN`, type: `num`, value: `0` }) });
    cl_abap_unit_assert.assert_equals({ exp: false, act: li_filter.keep_node({ name: `MAX`, type: `str`, value: `` }) });
    cl_abap_unit_assert.assert_equals({ exp: true, act: li_filter.keep_node({ name: `MIN`, type: `num`, value: `5` }) });
    cl_abap_unit_assert.assert_equals({ exp: true, act: li_filter.keep_node({ name: `ENABLED`, type: `bool`, value: `false` }) });
    cl_abap_unit_assert.assert_equals({ exp: true, act: li_filter.keep_node({ is_node: { name: `MIN`, type: `object` }, iv_visit: z2ui5_if_ajson_filter.visit_type.open }) });
  }

  test_omit_initial_keeps_rows() {
    let lt_tab = [];
    lt_tab.push(z2ui5_cl_util.abap_copy({ title: `first`, count: 1 }));
    lt_tab.push({ title: ``, count: 0 });
    lt_tab.push(z2ui5_cl_util.abap_copy({ title: `third`, count: 3 }));
    let lo_ajson = (z2ui5_cl_ajson.create_empty());
    lo_ajson.set({ iv_ignore_empty: false, iv_path: `/`, iv_val: lt_tab });
    const lo_act = lo_ajson.filter(new lcl_empty_filter_keep_rows());
    cl_abap_unit_assert.assert_equals({ exp: `[{"count":1,"title":"first"},{},{"count":3,"title":"third"}]`, act: lo_act.stringify() });
    const ls_nest = {};
    lo_ajson = (z2ui5_cl_ajson.create_empty());
    lo_ajson.set({ iv_ignore_empty: false, iv_path: `/sub`, iv_val: ls_nest });
    cl_abap_unit_assert.assert_equals({ exp: ``, act: lo_ajson.filter(new lcl_empty_filter_keep_rows()).stringify() });
  }

  test_omit_filters_serial() {
    let li_omit = null;
    let li_paths = null;
    li_omit = new lcl_empty_filter_keep_rows();
    cl_abap_unit_assert.assert_true(z2ui5_cl_ui5_util_context.rtti_check_serializable({ val: li_omit }));
    li_paths = new lcl_initial_paths_filter([`MIN`]);
    cl_abap_unit_assert.assert_true(z2ui5_cl_ui5_util_context.rtti_check_serializable({ val: li_paths }));
    cl_abap_unit_assert.assert_true(z2ui5_cl_ui5_util_context.rtti_check_serializable({ val: new lcl_and_filter({ ii_first: li_paths, ii_second: li_omit }) }));
    cl_abap_unit_assert.assert_false(z2ui5_cl_ui5_util_context.rtti_check_serializable({ val: new ltcl_bad_filter() }));
  }

  test_bind_filter_not_serial() {
    let li_client = null;
    let lo_app = null;
    let lx = null;
    li_client = z2ui5_cl_util.abap_cast(this.mo_client);
    lo_app = z2ui5_cl_util.abap_cast(this.mo_action.mo_app.mo_app);
    try {
      li_client._bind({ val: lo_app.mv_name, custom_filter: new ltcl_bad_filter() });
      cl_abap_unit_assert.fail(`a non-serializable custom_filter must be refused at bind time - serialized into the draft it fails only at db_save on a real system`);
    } catch (_caught1) {
      lx = _caught1;
      cl_abap_unit_assert.assert_true((String(lx.get_text()).toLowerCase().includes(String(`serializable`).toLowerCase())));
    }
  }

  test_omit_initial_db_save() {
    let li_client = null;
    let lo_app = null;
    let lo_cont = null;
    let lo_cont_db = null;
    let lo_app_db = null;
    li_client = z2ui5_cl_util.abap_cast(this.mo_client);
    lo_cont = this.mo_action.mo_app;
    lo_app = z2ui5_cl_util.abap_cast(lo_cont.mo_app);
    lo_app.mv_name = `kept across the draft`;
    li_client._bind({ val: lo_app.mv_name, omit_initial: true });
    lo_cont.ms_draft.id = `TEST_OMIT_INITIAL_DRAFT`;
    lo_cont.db_save();
    z2ui5_cl_ui5_app_cont.db_load_buffer_clear();
    lo_cont_db = z2ui5_cl_ui5_app_cont.db_load(`TEST_OMIT_INITIAL_DRAFT`);
    lo_app_db = z2ui5_cl_util.abap_cast(lo_cont_db.mo_app);
    cl_abap_unit_assert.assert_equals({ exp: `kept across the draft`, act: lo_app_db.mv_name });
    let lr_attri = null;
    lr_attri = (() => { try { return lo_cont_db.mt_attri.find((row) => row.name === `MV_NAME`) ?? null; } catch { return null; } })();
    cl_abap_unit_assert.assert_bound(lr_attri);
    cl_abap_unit_assert.assert_equals({ exp: true, act: lr_attri.bind });
  }

  test_bind_tab_cell() {
    let li_client = null;
    let lo_app = null;
    li_client = z2ui5_cl_util.abap_cast(this.mo_client);
    lo_app = z2ui5_cl_util.abap_cast(this.mo_action.mo_app.mo_app);
    lo_app.mt_emp.push(z2ui5_cl_util.abap_copy({ name: `Michael Adams`, job: `Scrum Master` }));
    lo_app.mt_emp.push(z2ui5_cl_util.abap_copy({ name: `John Miller`, job: `Product Owner` }));
    cl_abap_unit_assert.assert_equals({ exp: `{/MT_EMP/0/NAME}`, act: li_client._bind({ val: lo_app.mt_emp[(1) - 1].name, tab: lo_app.mt_emp, tab_index: 1 }) });
    cl_abap_unit_assert.assert_equals({ exp: `{/MT_EMP/1/JOB}`, act: li_client._bind({ val: lo_app.mt_emp[(2) - 1].job, tab: lo_app.mt_emp, tab_index: 2 }) });
  }

  test_bind_tab_cell_assign() {
    let sy_subrc = 0;
    let fs_emp = null;
    let _fs$fs_emp = null;
    let li_client = null;
    let lo_app = null;
    li_client = z2ui5_cl_util.abap_cast(this.mo_client);
    lo_app = z2ui5_cl_util.abap_cast(this.mo_action.mo_app.mo_app);
    lo_app.mt_emp.push(z2ui5_cl_util.abap_copy({ name: `Michael Adams`, job: `Scrum Master` }));
    lo_app.mt_emp.push(z2ui5_cl_util.abap_copy({ name: `John Miller`, job: `Product Owner` }));
    fs_emp = lo_app.mt_emp[(1) - 1];
    _fs$fs_emp = null;
    sy_subrc = 0;
    cl_abap_unit_assert.assert_equals({ exp: `{/MT_EMP/0/NAME}`, act: li_client._bind({ val: fs_emp.name, tab: lo_app.mt_emp, tab_index: 1 }) });
    fs_emp = lo_app.mt_emp[(2) - 1];
    _fs$fs_emp = null;
    sy_subrc = 0;
    cl_abap_unit_assert.assert_equals({ exp: `{/MT_EMP/1/JOB}`, act: li_client._bind({ val: fs_emp.job, tab: lo_app.mt_emp, tab_index: 2 }) });
  }

  test_set_app_state_active() {
    let temp31 = null;
    let li_client = null;
    temp31 = z2ui5_cl_util.abap_cast(this.mo_client);
    li_client = temp31;
    li_client.set_app_state_active(true);
    cl_abap_unit_assert.assert_equals({ exp: true, act: this.mo_action.ms_next.s_nav.set_app_state_active });
  }
}





class ltcl_app_price_editor extends z2ui5_if_app {
  mt_product = [];
  mv_message = ``;
  mv_saved = false;
  mv_bind_path = ``;

  label_of({ field } = {}) {
    let result = ``;
    switch (field) {
      case `PRICE`:
        result = `Price`;
        break;
      case `QTY`:
        result = `Quantity`;
        break;
      default:
        result = z2ui5_cl_util.abap_tab_assign(result, z2ui5_cl_util.abap_copy(field));
        break;
    }
    return result;
  }

  message_add({ val } = {}) {
    if (!z2ui5_cl_util.abap_is_initial(this.mv_message)) {
      this.mv_message = this.mv_message + `; `;
    }
    this.mv_message = this.mv_message + val;
  }

  async main(client) {
    let sy_tabix = 0;
    let sy_subrc = 0;
    let ls_row = { name: ``, price: 0, t_pos: [] };
    const ls_get = client.get();
    this.mv_message = ``;
    sy_tabix = 0;
    for (const ls_skip of ls_get.T_MODEL_SKIPPED) {
      sy_tabix++;
      if (ls_skip.name === `MT_PRODUCT`) {
        {
          const _t = this.mt_product;
          const _i = (ls_skip.row) - 1;
          sy_subrc = _i >= 0 && _i < _t.length ? 0 : 4;
          if (sy_subrc === 0) ls_row = _t[_i];
        }
        if (sy_subrc !== 0) {
          continue;
        }
        this.message_add({ val: `${this.label_of({ field: ls_skip.field })} of '${ls_row.name}' was not accepted` });
        continue;
      }
      if (ls_skip.name === `MT_PRODUCT-T_POS`) {
        this.message_add({ val: `${this.label_of({ field: ls_skip.field })} in a position row was not accepted` });
        continue;
      }
    }
    if (ls_get.EVENT === `SAVE`) {
      this.mv_saved = (z2ui5_cl_util.abap_is_initial(this.mv_message));
    }
    this.mv_bind_path = client._bind_edit(this.mt_product);
  }
}





class ltcl_test_model_skipped {
  mo_app = null;
  mo_action = null;

  setup() {
    let ls_product = { name: ``, price: 0, t_pos: [] };
    const lo_http = new z2ui5_cl_ui5_handler({ val: `` });
    this.mo_action = new z2ui5_cl_ui5_action({ val: lo_http });
    this.mo_app = new ltcl_app_price_editor();
    ls_product = { name: ``, price: 0, t_pos: [] };
    ls_product.name = `Notebook`;
    ls_product.price = `1249.00`;
    ls_product.t_pos.push(z2ui5_cl_util.abap_copy({ qty: 1 }));
    this.mo_app.mt_product.push(z2ui5_cl_util.abap_copy(ls_product));
    ls_product = { name: ``, price: 0, t_pos: [] };
    ls_product.name = `Monitor`;
    ls_product.price = `299.00`;
    this.mo_app.mt_product.push(z2ui5_cl_util.abap_copy(ls_product));
    this.mo_action.mo_app.mo_app = this.mo_app;
    this.roundtrip();
  }

  roundtrip({ model = ``, event = `` } = {}) {
    this.mo_action.ms_actual = { event: ``, t_event_arg: [], check_on_navigated: false, r_data: null, t_model_skipped: [] };
    if (!z2ui5_cl_util.abap_is_initial(model)) {
      this.mo_action.ms_actual.t_model_skipped = this.mo_action.mo_app.model_json_parse((z2ui5_cl_ajson.parse(model)));
    }
    this.mo_action.ms_actual.event = z2ui5_cl_util.abap_tab_assign(this.mo_action.ms_actual.event, z2ui5_cl_util.abap_copy(event));
    const lo_client = new z2ui5_cl_ui5_client({ action: this.mo_action });
    this.mo_app.main(lo_client);
  }

  test_accepted_price_silent() {
    this.roundtrip({ model: `{"MT_PRODUCT":{"__delta":{"1":{"PRICE":"1250.00"}}}}`, event: `SAVE` });
    cl_abap_unit_assert.assert_equals({ exp: (`1250.00`), act: (this.mo_app.mt_product[(2) - 1].price) });
    cl_abap_unit_assert.assert_initial(this.mo_app.mv_message);
    cl_abap_unit_assert.assert_equals({ exp: true, act: this.mo_app.mv_saved });
  }

  test_refused_price_reported() {
    this.roundtrip({ model: `{"MT_PRODUCT":{"__delta":{"1":{"PRICE":"1,250.00"}}}}`, event: `SAVE` });
    cl_abap_unit_assert.assert_equals({ exp: (`299.00`), act: (this.mo_app.mt_product[(2) - 1].price) });
    cl_abap_unit_assert.assert_equals({ exp: `Price of 'Monitor' was not accepted`, act: this.mo_app.mv_message });
  }

  test_save_no_longer_lies() {
    this.roundtrip({ model: `{"MT_PRODUCT":{"__delta":{"0":{"PRICE":"abc"},"1":{"PRICE":"350.00"}}}}`, event: `SAVE` });
    cl_abap_unit_assert.assert_equals({ exp: (`350.00`), act: (this.mo_app.mt_product[(2) - 1].price) });
    cl_abap_unit_assert.assert_equals({ exp: (`1249.00`), act: (this.mo_app.mt_product[(1) - 1].price) });
    cl_abap_unit_assert.assert_equals({ exp: false, act: this.mo_app.mv_saved });
    cl_abap_unit_assert.assert_equals({ exp: `Price of 'Notebook' was not accepted`, act: this.mo_app.mv_message });
  }

  test_trace_is_per_roundtrip() {
    this.roundtrip({ model: `{"MT_PRODUCT":{"__delta":{"1":{"PRICE":"1,250.00"}}}}`, event: `SAVE` });
    cl_abap_unit_assert.assert_equals({ exp: `Price of 'Monitor' was not accepted`, act: this.mo_app.mv_message });
    this.roundtrip({ event: `SAVE` });
    cl_abap_unit_assert.assert_initial(this.mo_app.mv_message);
    cl_abap_unit_assert.assert_equals({ exp: true, act: this.mo_app.mv_saved });
  }

  test_nested_row_unresolved() {
    this.roundtrip({ model: `{"MT_PRODUCT":{"__delta":{"0":{"T_POS":{"__delta":{"0":{"QTY":"seven"}}}}}}}`, event: `SAVE` });
    cl_abap_unit_assert.assert_equals({ exp: 1, act: this.mo_app.mt_product[(1) - 1].t_pos[(1) - 1].qty });
    cl_abap_unit_assert.assert_equals({ exp: `Quantity in a position row was not accepted`, act: this.mo_app.mv_message });
    cl_abap_unit_assert.assert_equals({ exp: false, act: this.mo_app.mv_saved });
  }

  test_bind_path_is_not_name() {
    cl_abap_unit_assert.assert_equals({ exp: `{/MT_PRODUCT}`, act: this.mo_app.mv_bind_path });
    this.roundtrip({ model: `{"MT_PRODUCT":{"__delta":{"1":{"PRICE":"1,250.00"}}}}` });
    cl_abap_unit_assert.assert_equals({ exp: 1, act: this.mo_action.ms_actual.t_model_skipped.length });
    cl_abap_unit_assert.assert_equals({ exp: `MT_PRODUCT`, act: this.mo_action.ms_actual.t_model_skipped[(1) - 1].name });
  }
}





module.exports = {
  __main: "z2ui5_cl_ui5_client",
  __classes: { lcl_empty_filter_keep_rows, lcl_initial_paths_filter, lcl_and_filter, ltcl_test_app, ltcl_bad_filter, ltcl_test_client, ltcl_app_price_editor, ltcl_test_model_skipped },
  __tests: {"ltcl_test_client":["test_instantiation","test_view_display","test_view_destroy","test_view_model_update","test_nest_model_update","test_popup_display","test_popup_destroy","test_popup_model_update","test_popover_display","test_popover_destroy","test_popover_model_update","test_nest_view_display","test_nest_view_destroy","test_nest2_view_display","test_nest2_view_destroy","test_message_box_display","test_message_box_dependent","test_message_box_type","test_message_toast","test_set_nav_routing","test_set_nav_routing_default","test_follow_up_action","test_follow_up_action_ev","test_follow_up_action_nav","test_follow_up_action_ctrl","test_check_on_init","test_check_on_init_done","test_check_on_event","test_check_on_event_empty","test_check_on_navigated","test_nav_app_call","test_nav_app_call_id_stable","test_nav_app_leave_event","test_nav_app_leave_r_data","test_nav_leave_r_data_empty","test_nav_leave_r_data_not_sup","test_nav_leave_r_data_unbound","test_check_app_prev_stack","test_set_push_state","test_get_event","test_get_event_arg","test_set_app_state_active","test_omit_initial_paths","test_omit_initial_keeps_rows","test_omit_filters_serial","test_bind_filter_not_serial","test_omit_initial_db_save","test_bind_tab_cell","test_bind_tab_cell_assign","test_event_arg_shorthand","test_event_arg_appends","test_event_arg_empty","test_bind_path_alias"],"ltcl_test_model_skipped":["test_accepted_price_silent","test_refused_price_reported","test_save_no_longer_lies","test_trace_is_per_roundtrip","test_nested_row_unresolved","test_bind_path_is_not_name"]},
};
