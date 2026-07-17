// GENERATED from run/input/abap2UI5/src/01/02/z2ui5_cl_core_client.clas.testclasses.abap — do not edit
const cl_abap_unit_assert = require("abap2UI5/cl_abap_unit_assert");
const z2ui5_cl_core_handler = require("abap2UI5/z2ui5_cl_core_handler");
const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");
const z2ui5_if_client = require("abap2UI5/z2ui5_if_client");


class ltcl_test_app extends z2ui5_if_app {
  mv_name = ``;

  async main(client) {
  }
}



class ltcl_test_client {
  mo_client = null;
  mo_action = null;

  setup() {
    let lo_http = null;
    let lo_test_app = null;
    lo_http = new z2ui5_cl_core_handler({ val: `` });
    this.mo_action = /* TODO(abap2js): NEW #( ) */ null;
    lo_test_app = /* TODO(abap2js): NEW #( ) */ null;
    lo_test_app.check_initialized = false;
    this.mo_action.mo_app.mo_app = z2ui5_cl_util.abap_copy(lo_test_app);
    this.mo_client = /* TODO(abap2js): NEW #( ) */ null;
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
    temp1 = z2ui5_cl_util.abap_copy(this.mo_client);
    li_client = z2ui5_cl_util.abap_copy(temp1);
    li_client.view_display(`<View></View>`);
    cl_abap_unit_assert.assert_equals({ exp: `<View></View>`, act: this.mo_action.ms_next.s_set.s_view.xml });
  }

  test_view_destroy() {
    let temp2 = null;
    let li_client = null;
    temp2 = z2ui5_cl_util.abap_copy(this.mo_client);
    li_client = z2ui5_cl_util.abap_copy(temp2);
    li_client.view_destroy();
    cl_abap_unit_assert.assert_equals({ exp: true, act: this.mo_action.ms_next.s_set.s_view.check_destroy });
  }

  test_view_model_update() {
    let temp3 = null;
    let li_client = null;
    temp3 = z2ui5_cl_util.abap_copy(this.mo_client);
    li_client = z2ui5_cl_util.abap_copy(temp3);
    li_client.view_model_update();
    cl_abap_unit_assert.assert_equals({ exp: true, act: this.mo_action.ms_next.s_set.s_view.check_update_model });
  }

  test_popup_display() {
    let temp4 = null;
    let li_client = null;
    temp4 = z2ui5_cl_util.abap_copy(this.mo_client);
    li_client = z2ui5_cl_util.abap_copy(temp4);
    li_client.popup_display(`<Dialog/>`);
    cl_abap_unit_assert.assert_equals({ exp: `<Dialog/>`, act: this.mo_action.ms_next.s_set.s_popup.xml });
    cl_abap_unit_assert.assert_equals({ exp: false, act: this.mo_action.ms_next.s_set.s_popup.check_destroy });
  }

  test_popup_destroy() {
    let temp5 = null;
    let li_client = null;
    temp5 = z2ui5_cl_util.abap_copy(this.mo_client);
    li_client = z2ui5_cl_util.abap_copy(temp5);
    li_client.popup_destroy();
    cl_abap_unit_assert.assert_equals({ exp: true, act: this.mo_action.ms_next.s_set.s_popup.check_destroy });
  }

  test_popup_model_update() {
    let temp6 = null;
    let li_client = null;
    temp6 = z2ui5_cl_util.abap_copy(this.mo_client);
    li_client = z2ui5_cl_util.abap_copy(temp6);
    li_client.popup_model_update();
    cl_abap_unit_assert.assert_equals({ exp: true, act: this.mo_action.ms_next.s_set.s_popup.check_update_model });
  }

  test_popover_display() {
    let temp7 = null;
    let li_client = null;
    temp7 = z2ui5_cl_util.abap_copy(this.mo_client);
    li_client = z2ui5_cl_util.abap_copy(temp7);
    li_client.popover_display({ xml: `<Popover/>`, by_id: `btn1` });
    cl_abap_unit_assert.assert_equals({ exp: `<Popover/>`, act: this.mo_action.ms_next.s_set.s_popover.xml });
    cl_abap_unit_assert.assert_equals({ exp: `btn1`, act: this.mo_action.ms_next.s_set.s_popover.open_by_id });
  }

  test_popover_destroy() {
    let temp8 = null;
    let li_client = null;
    temp8 = z2ui5_cl_util.abap_copy(this.mo_client);
    li_client = z2ui5_cl_util.abap_copy(temp8);
    li_client.popover_destroy();
    cl_abap_unit_assert.assert_equals({ exp: true, act: this.mo_action.ms_next.s_set.s_popover.check_destroy });
  }

  test_popover_model_update() {
    let temp9 = null;
    let li_client = null;
    temp9 = z2ui5_cl_util.abap_copy(this.mo_client);
    li_client = z2ui5_cl_util.abap_copy(temp9);
    li_client.popover_model_update();
    cl_abap_unit_assert.assert_equals({ exp: true, act: this.mo_action.ms_next.s_set.s_popover.check_update_model });
  }

  test_nest_view_display() {
    let temp10 = null;
    let li_client = null;
    temp10 = z2ui5_cl_util.abap_copy(this.mo_client);
    li_client = z2ui5_cl_util.abap_copy(temp10);
    li_client.nest_view_display({ val: `<NestView/>`, id: `nest1`, method_insert: `addMidColumnPage`, method_destroy: `removeMidColumnPage` });
    cl_abap_unit_assert.assert_equals({ exp: `<NestView/>`, act: this.mo_action.ms_next.s_set.s_view_nest.xml });
    cl_abap_unit_assert.assert_equals({ exp: `nest1`, act: this.mo_action.ms_next.s_set.s_view_nest.id });
    cl_abap_unit_assert.assert_equals({ exp: `addMidColumnPage`, act: this.mo_action.ms_next.s_set.s_view_nest.method_insert });
  }

  test_nest_view_destroy() {
    let temp11 = null;
    let li_client = null;
    temp11 = z2ui5_cl_util.abap_copy(this.mo_client);
    li_client = z2ui5_cl_util.abap_copy(temp11);
    li_client.nest_view_destroy();
    cl_abap_unit_assert.assert_equals({ exp: true, act: this.mo_action.ms_next.s_set.s_view_nest.check_destroy });
  }

  test_nest2_view_display() {
    let temp12 = null;
    let li_client = null;
    temp12 = z2ui5_cl_util.abap_copy(this.mo_client);
    li_client = z2ui5_cl_util.abap_copy(temp12);
    li_client.nest2_view_display({ val: `<Nest2View/>`, id: `nest2`, method_insert: `addEndColumnPage` });
    cl_abap_unit_assert.assert_equals({ exp: `<Nest2View/>`, act: this.mo_action.ms_next.s_set.s_view_nest2.xml });
    cl_abap_unit_assert.assert_equals({ exp: `nest2`, act: this.mo_action.ms_next.s_set.s_view_nest2.id });
  }

  test_nest2_view_destroy() {
    let temp13 = null;
    let li_client = null;
    temp13 = z2ui5_cl_util.abap_copy(this.mo_client);
    li_client = z2ui5_cl_util.abap_copy(temp13);
    li_client.nest2_view_destroy();
    cl_abap_unit_assert.assert_equals({ exp: true, act: this.mo_action.ms_next.s_set.s_view_nest2.check_destroy });
  }

  test_message_box_display() {
    let temp14 = null;
    let li_client = null;
    temp14 = z2ui5_cl_util.abap_copy(this.mo_client);
    li_client = z2ui5_cl_util.abap_copy(temp14);
    li_client.message_box_display(`Hello World`);
    cl_abap_unit_assert.assert_equals({ exp: `Hello World`, act: this.mo_action.ms_next.s_set.s_msg_box.text });
    cl_abap_unit_assert.assert_equals({ exp: `show`, act: this.mo_action.ms_next.s_set.s_msg_box.type });
  }

  test_message_box_type() {
    let temp15 = null;
    let li_client = null;
    temp15 = z2ui5_cl_util.abap_copy(this.mo_client);
    li_client = z2ui5_cl_util.abap_copy(temp15);
    li_client.message_box_display({ text: `Error occurred`, type: `error` });
    cl_abap_unit_assert.assert_equals({ exp: `Error occurred`, act: this.mo_action.ms_next.s_set.s_msg_box.text });
    cl_abap_unit_assert.assert_equals({ exp: `error`, act: this.mo_action.ms_next.s_set.s_msg_box.type });
  }

  test_message_box_dependent() {
    let temp15b = null;
    let li_client = null;
    temp15b = z2ui5_cl_util.abap_copy(this.mo_client);
    li_client = z2ui5_cl_util.abap_copy(temp15b);
    li_client.message_box_display({ text: `The quantity exceeds the plan.`, type: `confirm`, dependenton: `myPage`, contentwidth: `20rem` });
    cl_abap_unit_assert.assert_equals({ exp: `myPage`, act: this.mo_action.ms_next.s_set.s_msg_box.dependenton });
    cl_abap_unit_assert.assert_equals({ exp: `20rem`, act: this.mo_action.ms_next.s_set.s_msg_box.contentwidth });
  }

  test_message_toast() {
    let temp16 = null;
    let li_client = null;
    temp16 = z2ui5_cl_util.abap_copy(this.mo_client);
    li_client = z2ui5_cl_util.abap_copy(temp16);
    li_client.message_toast_display(`Saved`);
    cl_abap_unit_assert.assert_equals({ exp: `Saved`, act: this.mo_action.ms_next.s_set.s_msg_toast.text });
  }

  test_follow_up_action() {
    let temp17 = null;
    let li_client = null;
    temp17 = z2ui5_cl_util.abap_copy(this.mo_client);
    li_client = z2ui5_cl_util.abap_copy(temp17);
    li_client.follow_up_action(`sap.m.MessageToast.show('test')`);
    cl_abap_unit_assert.assert_equals({ exp: 1, act: this.mo_action.ms_next.s_set.s_follow_up_action.custom_js.length });
  }

  test_follow_up_action_ev() {
    let li_client = null;
    li_client = z2ui5_cl_util.abap_copy(this.mo_client);
    li_client.follow_up_action({ val: z2ui5_if_client.cs_event.set_title, t_arg: [`My Title`] });
    li_client.follow_up_action(z2ui5_if_client.cs_event.history_back);
    cl_abap_unit_assert.assert_equals({ exp: 2, act: this.mo_action.ms_next.s_set.s_follow_up_action.custom_js.length });
    cl_abap_unit_assert.assert_equals({ exp: `.eF('SET_TITLE', 'My Title')`, act: this.mo_action.ms_next.s_set.s_follow_up_action.custom_js[(1) - 1] });
    cl_abap_unit_assert.assert_equals({ exp: `.eF('HISTORY_BACK')`, act: this.mo_action.ms_next.s_set.s_follow_up_action.custom_js[(2) - 1] });
  }

  test_check_on_init() {
    let li_app = null;
    li_app = z2ui5_cl_util.abap_copy(this.mo_action.mo_app.mo_app);
    li_app.check_initialized = false;
    cl_abap_unit_assert.assert_equals({ exp: false, act: li_app.check_initialized });
  }

  test_check_on_init_done() {
    let li_app = null;
    li_app = z2ui5_cl_util.abap_copy(this.mo_action.mo_app.mo_app);
    li_app.check_initialized = true;
    cl_abap_unit_assert.assert_equals({ exp: true, act: li_app.check_initialized });
  }

  test_check_on_event() {
    let temp21 = null;
    let li_client = null;
    this.mo_action.ms_actual.event = `BUTTON_PRESS`;
    temp21 = z2ui5_cl_util.abap_copy(this.mo_client);
    li_client = z2ui5_cl_util.abap_copy(temp21);
    cl_abap_unit_assert.assert_equals({ exp: true, act: li_client.check_on_event(`BUTTON_PRESS`) });
    cl_abap_unit_assert.assert_equals({ exp: false, act: li_client.check_on_event(`OTHER_EVENT`) });
  }

  test_check_on_event_empty() {
    let temp22 = null;
    let li_client = null;
    this.mo_action.ms_actual.event = ``;
    temp22 = z2ui5_cl_util.abap_copy(this.mo_client);
    li_client = z2ui5_cl_util.abap_copy(temp22);
    cl_abap_unit_assert.assert_equals({ exp: false, act: li_client.check_on_event() });
  }

  test_check_on_navigated() {
    let temp23 = null;
    let li_client = null;
    this.mo_action.ms_actual.check_on_navigated = true;
    temp23 = z2ui5_cl_util.abap_copy(this.mo_client);
    li_client = z2ui5_cl_util.abap_copy(temp23);
    cl_abap_unit_assert.assert_equals({ exp: true, act: li_client.check_on_navigated() });
  }

  test_nav_app_call() {
    let lo_new_app = null;
    let temp24 = null;
    let li_client = null;
    let lv_id = ``;
    lo_new_app = /* TODO(abap2js): NEW #( ) */ null;
    temp24 = z2ui5_cl_util.abap_copy(this.mo_client);
    li_client = z2ui5_cl_util.abap_copy(temp24);
    lv_id = li_client.nav_app_call(lo_new_app);
    cl_abap_unit_assert.assert_not_initial(lv_id);
    cl_abap_unit_assert.assert_bound(this.mo_action.ms_next.o_app_call);
  }

  test_nav_app_call_id_stable() {
    let lo_new_app = null;
    let li_client = null;
    let lv_id_first = ``;
    let lv_id_second = ``;
    lo_new_app = /* TODO(abap2js): NEW #( ) */ null;
    li_client = z2ui5_cl_util.abap_copy(this.mo_client);
    lv_id_first = li_client.nav_app_call(lo_new_app);
    lv_id_second = li_client.nav_app_call(lo_new_app);
    cl_abap_unit_assert.assert_not_initial(lv_id_second);
    cl_abap_unit_assert.assert_equals({ exp: lv_id_first, act: lv_id_second });
    cl_abap_unit_assert.assert_equals({ exp: lv_id_first, act: lo_new_app.id_app });
  }

  test_nav_app_leave_event() {
    let lo_app = null;
    let li_client = null;
    lo_app = /* TODO(abap2js): NEW #( ) */ null;
    li_client = z2ui5_cl_util.abap_copy(this.mo_client);
    li_client.nav_app_leave({ app: lo_app, event: `MY_EVENT` });
    cl_abap_unit_assert.assert_bound(this.mo_action.ms_next.o_app_leave);
    cl_abap_unit_assert.assert_equals({ exp: `MY_EVENT`, act: this.mo_action.ms_next.next_event });
    cl_abap_unit_assert.assert_equals({ exp: 0, act: this.mo_action.ms_next.s_set.s_follow_up_action.custom_js.length });
  }

  test_nav_app_leave_r_data() {
    let lo_app = null;
    let li_client = null;
    let lv_data = ``;
    lo_app = /* TODO(abap2js): NEW #( ) */ null;
    li_client = z2ui5_cl_util.abap_copy(this.mo_client);
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
    lo_app = /* TODO(abap2js): NEW #( ) */ null;
    li_client = z2ui5_cl_util.abap_copy(this.mo_client);
    li_client.nav_app_leave({ app: lo_app, event: `MY_EVENT`, r_data: lv_data });
    cl_abap_unit_assert.assert_bound(this.mo_action.ms_next.r_data);
    // TODO(abap2js): ASSIGN mo_action->ms_next-r_data->* TO <data>.
    cl_abap_unit_assert.assert_initial(fs_data);
  }

  test_nav_leave_r_data_not_sup() {
    let lo_app = null;
    let li_client = null;
    lo_app = /* TODO(abap2js): NEW #( ) */ null;
    li_client = z2ui5_cl_util.abap_copy(this.mo_client);
    li_client.nav_app_leave({ app: lo_app, event: `MY_EVENT` });
    cl_abap_unit_assert.assert_not_bound(this.mo_action.ms_next.r_data);
  }

  test_nav_leave_r_data_unbound() {
    let lo_app = null;
    let li_client = null;
    let lr_data = null;
    lo_app = /* TODO(abap2js): NEW #( ) */ null;
    li_client = z2ui5_cl_util.abap_copy(this.mo_client);
    li_client.nav_app_leave({ app: lo_app, event: `MY_EVENT`, r_data: lr_data });
    cl_abap_unit_assert.assert_not_bound(this.mo_action.ms_next.r_data);
  }

  test_check_app_prev_stack() {
    let temp25 = null;
    let li_client = null;
    temp25 = z2ui5_cl_util.abap_copy(this.mo_client);
    li_client = z2ui5_cl_util.abap_copy(temp25);
    cl_abap_unit_assert.assert_equals({ exp: false, act: li_client.check_app_prev_stack() });
    this.mo_action.mo_app.ms_draft.id_prev_app_stack = `PREV_ID`;
    cl_abap_unit_assert.assert_equals({ exp: true, act: li_client.check_app_prev_stack() });
  }

  test_set_push_state() {
    let temp26 = null;
    let li_client = null;
    temp26 = z2ui5_cl_util.abap_copy(this.mo_client);
    li_client = z2ui5_cl_util.abap_copy(temp26);
    li_client.set_push_state(`mystate`);
    cl_abap_unit_assert.assert_equals({ exp: `mystate`, act: this.mo_action.ms_next.s_set.set_push_state });
  }

  test_set_nav_back() {
    let temp27 = null;
    let li_client = null;
    temp27 = z2ui5_cl_util.abap_copy(this.mo_client);
    li_client = z2ui5_cl_util.abap_copy(temp27);
    li_client.set_nav_back(true);
    cl_abap_unit_assert.assert_equals({ exp: true, act: this.mo_action.ms_next.s_set.set_nav_back });
  }

  test_get_event_arg() {
    let temp28 = [];
    let temp30 = null;
    let li_client = null;
    temp28 = null;
    temp28.push(`arg1`);
    temp28.push(`arg2`);
    this.mo_action.ms_actual.t_event_arg = z2ui5_cl_util.abap_copy(temp28);
    temp30 = z2ui5_cl_util.abap_copy(this.mo_client);
    li_client = z2ui5_cl_util.abap_copy(temp30);
    cl_abap_unit_assert.assert_equals({ exp: `arg1`, act: li_client.get_event_arg(1) });
    cl_abap_unit_assert.assert_equals({ exp: `arg2`, act: li_client.get_event_arg(2) });
  }

  test_set_app_state_active() {
    let temp31 = null;
    let li_client = null;
    temp31 = z2ui5_cl_util.abap_copy(this.mo_client);
    li_client = z2ui5_cl_util.abap_copy(temp31);
    li_client.set_app_state_active(true);
    cl_abap_unit_assert.assert_equals({ exp: true, act: this.mo_action.ms_next.s_set.set_app_state_active });
  }
}



module.exports = {
  __main: "z2ui5_cl_core_client",
  __classes: { ltcl_test_app, ltcl_test_client },
  __tests: {"ltcl_test_client":["test_instantiation","test_view_display","test_view_destroy","test_view_model_update","test_popup_display","test_popup_destroy","test_popup_model_update","test_popover_display","test_popover_destroy","test_popover_model_update","test_nest_view_display","test_nest_view_destroy","test_nest2_view_display","test_nest2_view_destroy","test_message_box_display","test_message_box_dependent","test_message_box_type","test_message_toast","test_follow_up_action","test_follow_up_action_ev","test_check_on_init","test_check_on_init_done","test_check_on_event","test_check_on_event_empty","test_check_on_navigated","test_nav_app_call","test_nav_app_call_id_stable","test_nav_app_leave_event","test_nav_app_leave_r_data","test_nav_leave_r_data_empty","test_nav_leave_r_data_not_sup","test_nav_leave_r_data_unbound","test_check_app_prev_stack","test_set_push_state","test_set_nav_back","test_get_event_arg","test_set_app_state_active"]},
};
