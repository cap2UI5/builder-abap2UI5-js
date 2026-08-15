// GENERATED from run/input/abap2UI5/src/01/02/z2ui5_cl_ui5_srv_event.clas.testclasses.abap — do not edit
const cl_abap_unit_assert = require("abap2UI5/cl_abap_unit_assert");
const z2ui5_cl_ui5_srv_event = require("abap2UI5/z2ui5_cl_ui5_srv_event");
const z2ui5_cl_ui5_util_context = require("abap2UI5/z2ui5_cl_ui5_util_context");
const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");
const z2ui5_if_client = require("abap2UI5/z2ui5_if_client");


class ltcl_test {
  event() {
    let lo_event = null;
    let lv_event = ``;
    lo_event = new z2ui5_cl_ui5_srv_event();
    lv_event = lo_event.get_event(`POST`);
    cl_abap_unit_assert.assert_equals({ exp: `.eB(['POST'])`, act: lv_event });
  }

  event_client() {
    let lo_event = null;
    let lv_event = ``;
    lo_event = new z2ui5_cl_ui5_srv_event();
    lv_event = lo_event.get_event_client(z2ui5_if_client.cs_event.set_focus);
    cl_abap_unit_assert.assert_equals({ exp: `.eF('SET_FOCUS')`, act: lv_event });
  }

  event_nav_container() {
    let lo_event = null;
    lo_event = new z2ui5_cl_ui5_srv_event();
    cl_abap_unit_assert.assert_equals({ exp: `.eF('CONTROL_BY_ID', 'myContainer', 'MAIN', 'to', 'myPage')`, act: lo_event.get_event_client({ val: z2ui5_if_client.cs_event.nav_container_to, t_arg: [`myContainer`, `myPage`] }) });
    cl_abap_unit_assert.assert_equals({ exp: `.eF('CONTROL_BY_ID', 'nestCon', 'NEST', 'to', 'nestPage')`, act: lo_event.get_event_client({ val: z2ui5_if_client.cs_event.nest_nav_container_to, t_arg: [`nestCon`, `nestPage`] }) });
  }

  event_popup_close() {
    let lo_event = null;
    lo_event = new z2ui5_cl_ui5_srv_event();
    cl_abap_unit_assert.assert_equals({ exp: `.eF('CONTROL_GLOBAL', 'VIEW_SLOTS', 'destroy', 'POPUP')`, act: lo_event.get_event_client(z2ui5_if_client.cs_event.popup_close) });
    cl_abap_unit_assert.assert_equals({ exp: `.eF('CONTROL_GLOBAL', 'VIEW_SLOTS', 'destroy', 'POPOVER')`, act: lo_event.get_event_client(z2ui5_if_client.cs_event.popover_close) });
    cl_abap_unit_assert.assert_equals({ exp: `["CONTROL_GLOBAL","VIEW_SLOTS","destroy","POPUP"]`, act: lo_event.get_event_client_json(z2ui5_if_client.cs_event.popup_close) });
  }

  event_with_args() {
    let lo_event = null;
    let temp1 = [];
    let lv_event = ``;
    let temp2 = false;
    let temp3 = false;
    lo_event = new z2ui5_cl_ui5_srv_event();
    temp1 = [];
    temp1.push(z2ui5_cl_util.abap_copy(`arg1`));
    lv_event = lo_event.get_event({ val: `MY_EVT`, t_arg: temp1 });
    temp2 = (String(lv_event).toLowerCase().includes(String(`MY_EVT`).toLowerCase()));
    cl_abap_unit_assert.assert_true(temp2);
    temp3 = (String(lv_event).toLowerCase().includes(String(`'arg1'`).toLowerCase()));
    cl_abap_unit_assert.assert_true(temp3);
  }

  event_multi_args() {
    let lo_event = null;
    let temp3 = [];
    let lv_event = ``;
    let temp4 = false;
    let temp5 = false;
    let temp6 = false;
    lo_event = new z2ui5_cl_ui5_srv_event();
    temp3 = [];
    temp3.push(z2ui5_cl_util.abap_copy(`a1`));
    temp3.push(z2ui5_cl_util.abap_copy(`a2`));
    temp3.push(z2ui5_cl_util.abap_copy(`a3`));
    lv_event = lo_event.get_event({ val: `EVT`, t_arg: temp3 });
    temp4 = (String(lv_event).toLowerCase().includes(String(`'a1'`).toLowerCase()));
    cl_abap_unit_assert.assert_true(temp4);
    temp5 = (String(lv_event).toLowerCase().includes(String(`'a2'`).toLowerCase()));
    cl_abap_unit_assert.assert_true(temp5);
    temp6 = (String(lv_event).toLowerCase().includes(String(`'a3'`).toLowerCase()));
    cl_abap_unit_assert.assert_true(temp6);
  }

  event_dollar_arg() {
    let lo_event = null;
    let temp5 = [];
    let lv_event = ``;
    let temp7 = false;
    let temp8 = false;
    lo_event = new z2ui5_cl_ui5_srv_event();
    temp5 = [];
    temp5.push(z2ui5_cl_util.abap_copy(`$event`));
    lv_event = lo_event.get_event({ val: `EVT`, t_arg: temp5 });
    temp7 = (String(lv_event).toLowerCase().includes(String(`$event`).toLowerCase()));
    cl_abap_unit_assert.assert_true(temp7);
    temp8 = (String(lv_event).toLowerCase().includes(String(`'$event'`).toLowerCase()));
    cl_abap_unit_assert.assert_false(temp8);
  }

  event_binding_arg() {
    let lo_event = null;
    let temp7 = [];
    let lv_event = ``;
    let temp9 = false;
    let temp10 = false;
    lo_event = new z2ui5_cl_ui5_srv_event();
    temp7 = [];
    temp7.push(z2ui5_cl_util.abap_copy(`{/MY_PATH}`));
    lv_event = lo_event.get_event({ val: `EVT`, t_arg: temp7 });
    temp9 = (String(lv_event).toLowerCase().includes(String(`{/MY_PATH}`).toLowerCase()));
    cl_abap_unit_assert.assert_true(temp9);
    temp10 = (String(lv_event).toLowerCase().includes(String(`'{/MY_PATH}'`).toLowerCase()));
    cl_abap_unit_assert.assert_false(temp10);
  }

  event_empty_arg() {
    let lo_event = null;
    let temp9 = [];
    let lv_event = ``;
    let temp11 = false;
    lo_event = new z2ui5_cl_ui5_srv_event();
    temp9 = [];
    temp9.push(z2ui5_cl_util.abap_copy(``));
    temp9.push(z2ui5_cl_util.abap_copy(`real`));
    lv_event = lo_event.get_event({ val: `EVT`, t_arg: temp9 });
    temp11 = (String(lv_event).toLowerCase().includes(String(`'real'`).toLowerCase()));
    cl_abap_unit_assert.assert_true(temp11);
  }

  event_empty_middle_arg() {
    let lo_event = null;
    lo_event = new z2ui5_cl_ui5_srv_event();
    cl_abap_unit_assert.assert_equals({ exp: `.eF('CONTROL_BY_ID', 'demoPanel', '', 'setExpanded', 'X')`, act: lo_event.get_event_client({ val: z2ui5_if_client.cs_event.control_by_id, t_arg: [`demoPanel`, `setExpanded`, `X`] }) });
  }

  event_trailing_empty_arg() {
    let lo_event = null;
    lo_event = new z2ui5_cl_ui5_srv_event();
    cl_abap_unit_assert.assert_equals({ exp: `.eF('CONTROL_BY_ID', 'demoPanel', '', 'setExpanded')`, act: lo_event.get_event_client({ val: z2ui5_if_client.cs_event.control_by_id, t_arg: [`demoPanel`, `setExpanded`, ``] }) });
  }

  event_view_param() {
    let lo_event = null;
    lo_event = new z2ui5_cl_ui5_srv_event();
    cl_abap_unit_assert.assert_equals({ exp: `.eF('CONTROL_BY_ID', 'demoPanel', 'POPOVER', 'setExpanded', 'X')`, act: lo_event.get_event_client({ val: z2ui5_if_client.cs_event.control_by_id, view: z2ui5_if_client.cs_view.popover, t_arg: [`demoPanel`, `setExpanded`, `X`] }) });
    cl_abap_unit_assert.assert_equals({ exp: `.eF('CONTROL_BY_ID', 'demoPanel', '', 'setExpanded', 'X')`, act: lo_event.get_event_client({ val: z2ui5_if_client.cs_event.control_by_id, view: z2ui5_if_client.cs_view.main, t_arg: [`demoPanel`, `setExpanded`, `X`] }) });
  }

  event_multi_req() {
    let lo_event = null;
    let temp11 = { check_allow_multi_req: false, check_prevent_default: false, prevent_default_expr: `` };
    let lv_event = ``;
    let temp12 = false;
    lo_event = new z2ui5_cl_ui5_srv_event();
    temp11 = { check_allow_multi_req: false, check_prevent_default: false, prevent_default_expr: `` };
    temp11.check_allow_multi_req = true;
    lv_event = lo_event.get_event({ val: `EVT`, s_cnt: temp11 });
    temp12 = (String(lv_event).toLowerCase().includes(String(`false,true`).toLowerCase()));
    cl_abap_unit_assert.assert_true(temp12);
  }

  event_prevent_default() {
    let lo_event = null;
    let ls_ctrl = { check_allow_multi_req: false, check_prevent_default: false, prevent_default_expr: `` };
    lo_event = new z2ui5_cl_ui5_srv_event();
    ls_ctrl = { check_allow_multi_req: false, check_prevent_default: false, prevent_default_expr: `` };
    ls_ctrl.check_prevent_default = true;
    cl_abap_unit_assert.assert_equals({ exp: `.eBP($event,true,['ITEM_PRESS'])`, act: lo_event.get_event({ val: `ITEM_PRESS`, s_cnt: ls_ctrl }) });
    cl_abap_unit_assert.assert_equals({ exp: `.eBP($event,true,['ITEM_PRESS'], $event.oSource.sId)`, act: lo_event.get_event({ val: `ITEM_PRESS`, t_arg: [`$event.oSource.sId`], s_cnt: ls_ctrl }) });
    ls_ctrl.check_allow_multi_req = true;
    cl_abap_unit_assert.assert_equals({ exp: `.eBP($event,true,['ITEM_PRESS',false,true])`, act: lo_event.get_event({ val: `ITEM_PRESS`, s_cnt: ls_ctrl }) });
    ls_ctrl = { check_allow_multi_req: false, check_prevent_default: false, prevent_default_expr: `` };
    cl_abap_unit_assert.assert_equals({ exp: `.eB(['ITEM_PRESS'])`, act: lo_event.get_event({ val: `ITEM_PRESS`, s_cnt: ls_ctrl }) });
  }

  event_prevent_default_expr() {
    let lo_event = null;
    let ls_ctrl = { check_allow_multi_req: false, check_prevent_default: false, prevent_default_expr: `` };
    lo_event = new z2ui5_cl_ui5_srv_event();
    ls_ctrl = { check_allow_multi_req: false, check_prevent_default: false, prevent_default_expr: `` };
    ls_ctrl.prevent_default_expr = `\${$parameters>/column}.getId().indexOf('COL_DATE') >= 0`;
    cl_abap_unit_assert.assert_equals({ exp: `.eBP($event,\${$parameters>/column}.getId().indexOf('COL_DATE') >= 0,['COLUMN_RESIZE'], \${$parameters>/width})`, act: lo_event.get_event({ val: `COLUMN_RESIZE`, t_arg: [`\${$parameters>/width}`], s_cnt: ls_ctrl }) });
    ls_ctrl.check_prevent_default = true;
    cl_abap_unit_assert.assert_equals({ exp: `.eBP($event,\${$parameters>/column}.getId().indexOf('COL_DATE') >= 0,['COLUMN_RESIZE'])`, act: lo_event.get_event({ val: `COLUMN_RESIZE`, s_cnt: ls_ctrl }) });
    ls_ctrl = { check_allow_multi_req: false, check_prevent_default: false, prevent_default_expr: `` };
    ls_ctrl.prevent_default_expr = `\${$parameters>/on}`;
    ls_ctrl.check_allow_multi_req = true;
    cl_abap_unit_assert.assert_equals({ exp: `.eBP($event,\${$parameters>/on},['COLUMN_RESIZE',false,true])`, act: lo_event.get_event({ val: `COLUMN_RESIZE`, s_cnt: ls_ctrl }) });
  }

  event_client_args() {
    let lo_event = null;
    let temp12 = [];
    let lv_event = ``;
    let temp13 = false;
    let temp14 = false;
    lo_event = new z2ui5_cl_ui5_srv_event();
    temp12 = [];
    temp12.push(z2ui5_cl_util.abap_copy(`param1`));
    lv_event = lo_event.get_event_client({ val: `CLOSE`, t_arg: temp12 });
    temp13 = (String(lv_event).toLowerCase().includes(String(`CLOSE`).toLowerCase()));
    cl_abap_unit_assert.assert_true(temp13);
    temp14 = (String(lv_event).toLowerCase().includes(String(`'param1'`).toLowerCase()));
    cl_abap_unit_assert.assert_true(temp14);
  }

  event_quote_escaped() {
    const lo_event = new z2ui5_cl_ui5_srv_event();
    const lt_arg = [`Value changed to '{0}'`];
    const lv_event = lo_event.get_event({ val: `EVT`, t_arg: lt_arg });
    cl_abap_unit_assert.assert_true((String(lv_event).toLowerCase().includes(String(`'Value changed to \\'{0}\\''`).toLowerCase())));
  }

  event_backslash_escaped() {
    const lo_event = new z2ui5_cl_ui5_srv_event();
    const lt_arg = [`\\',alert(1),'`];
    const lv_event = lo_event.get_event({ val: `EVT`, t_arg: lt_arg });
    cl_abap_unit_assert.assert_true((String(lv_event).toLowerCase().includes(String(`'\\\\\\',alert(1),\\''`).toLowerCase())));
    cl_abap_unit_assert.assert_false((String(lv_event).toLowerCase().includes(String(`',alert(1),'`).toLowerCase())));
  }

  event_lone_cr_escaped() {
    const lo_event = new z2ui5_cl_ui5_srv_event();
    const lv_cr = z2ui5_cl_ui5_util_context.cv_char_util_cr_lf.substr(0, 1);
    const lt_arg = [`before${lv_cr}after`];
    const lv_event = lo_event.get_event({ val: `EVT`, t_arg: lt_arg });
    cl_abap_unit_assert.assert_true((String(lv_event).toLowerCase().includes(String(`'before\\rafter'`).toLowerCase())));
    cl_abap_unit_assert.assert_false((String(lv_event).toLowerCase().includes(String(lv_cr).toLowerCase())));
  }

  event_placeholder_quoted() {
    const lo_event = new z2ui5_cl_ui5_srv_event();
    const lv_plain = lo_event.get_event({ val: `EVT`, t_arg: [`{0} Pressed`] });
    cl_abap_unit_assert.assert_true((String(lv_plain).toLowerCase().includes(String(`'{0} Pressed'`).toLowerCase())));
    const lv_cond = lo_event.get_event({ val: `EVT`, t_arg: [`{0?Pressed:Unpressed}`] });
    cl_abap_unit_assert.assert_true((String(lv_cond).toLowerCase().includes(String(`'{0?Pressed:Unpressed}'`).toLowerCase())));
  }

  json_basic() {
    const lo_event = new z2ui5_cl_ui5_srv_event();
    cl_abap_unit_assert.assert_equals({ exp: `["SET_TITLE","My Title"]`, act: lo_event.get_event_client_json({ val: z2ui5_if_client.cs_event.set_title, t_arg: [`My Title`] }) });
  }

  json_no_args() {
    const lo_event = new z2ui5_cl_ui5_srv_event();
    cl_abap_unit_assert.assert_equals({ exp: `["LOCATION_RELOAD"]`, act: lo_event.get_event_client_json(z2ui5_if_client.cs_event.location_reload) });
  }

  json_nav_container() {
    const lo_event = new z2ui5_cl_ui5_srv_event();
    cl_abap_unit_assert.assert_equals({ exp: `["CONTROL_BY_ID","myContainer","MAIN","to","myPage"]`, act: lo_event.get_event_client_json({ val: z2ui5_if_client.cs_event.nav_container_to, t_arg: [`myContainer`, `myPage`] }) });
  }

  json_view_param() {
    const lo_event = new z2ui5_cl_ui5_srv_event();
    cl_abap_unit_assert.assert_equals({ exp: `["CONTROL_BY_ID","demoPanel","POPOVER","setExpanded","X"]`, act: lo_event.get_event_client_json({ val: z2ui5_if_client.cs_event.control_by_id, view: z2ui5_if_client.cs_view.popover, t_arg: [`demoPanel`, `setExpanded`, `X`] }) });
    cl_abap_unit_assert.assert_equals({ exp: `["CONTROL_BY_ID","demoPanel","","setExpanded","X"]`, act: lo_event.get_event_client_json({ val: z2ui5_if_client.cs_event.control_by_id, t_arg: [`demoPanel`, `setExpanded`, `X`] }) });
  }

  json_empty_args() {
    const lo_event = new z2ui5_cl_ui5_srv_event();
    cl_abap_unit_assert.assert_equals({ exp: `["CONTROL_BY_ID","demoPanel","","setExpanded"]`, act: lo_event.get_event_client_json({ val: z2ui5_if_client.cs_event.control_by_id, t_arg: [`demoPanel`, `setExpanded`, ``] }) });
  }

  json_object_arg() {
    const lo_event = new z2ui5_cl_ui5_srv_event();
    cl_abap_unit_assert.assert_equals({ exp: `["STORE_DATA",{"KEY":"K1"}]`, act: lo_event.get_event_client_json({ val: z2ui5_if_client.cs_event.store_data, t_arg: [`{"KEY":"K1"}`] }) });
  }

  json_placeholder_stays_string() {
    const lo_event = new z2ui5_cl_ui5_srv_event();
    cl_abap_unit_assert.assert_equals({ exp: `["CONTROL_GLOBAL","MESSAGE_TOAST","show","{0} Pressed"]`, act: lo_event.get_event_client_json({ val: z2ui5_if_client.cs_event.control_global, t_arg: [`MESSAGE_TOAST`, `show`, `{0} Pressed`] }) });
  }

  json_escaping() {
    const lo_event = new z2ui5_cl_ui5_srv_event();
    cl_abap_unit_assert.assert_equals({ exp: `["CLIPBOARD_COPY","he said \\"hi\\" \\\\ bye"]`, act: lo_event.get_event_client_json({ val: z2ui5_if_client.cs_event.clipboard_copy, t_arg: [`he said "hi" \\ bye`] }) });
  }
}





module.exports = {
  __main: "z2ui5_cl_ui5_srv_event",
  __classes: { ltcl_test },
  __tests: {"ltcl_test":["event","event_client","event_with_args","event_multi_args","event_dollar_arg","event_binding_arg","event_empty_arg","event_empty_middle_arg","event_trailing_empty_arg","event_view_param","event_multi_req","event_prevent_default","event_prevent_default_expr","event_client_args","event_nav_container","event_popup_close","event_quote_escaped","event_backslash_escaped","event_lone_cr_escaped","event_placeholder_quoted","json_basic","json_no_args","json_nav_container","json_view_param","json_empty_args","json_object_arg","json_placeholder_stays_string","json_escaping"]},
};
