// GENERATED from run/input/abap2UI5/src/01/02/z2ui5_cl_ui5_frontend.clas.testclasses.abap — do not edit
const cl_abap_unit_assert = require("abap2UI5/cl_abap_unit_assert");
const z2ui5_cl_ui5_action = require("abap2UI5/z2ui5_cl_ui5_action");
const z2ui5_cl_ui5_frontend = require("abap2UI5/z2ui5_cl_ui5_frontend");
const z2ui5_cl_ui5_handler = require("abap2UI5/z2ui5_cl_ui5_handler");
const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");
const z2ui5_if_client = require("abap2UI5/z2ui5_if_client");


class ltcl_test_action_front {
  mo_cut = null;
  mo_action = null;

  setup() {
    let lo_http = null;
    lo_http = new z2ui5_cl_ui5_handler({ val: `` });
    this.mo_action = new z2ui5_cl_ui5_action({ val: lo_http });
    this.mo_cut = new z2ui5_cl_ui5_frontend(this.mo_action);
  }

  queued() {
    let result = ``;
    const ls_action = (() => { try { return this.mo_action.ms_next.s_action.t_custom[(1) - 1] ?? null; } catch { return null; } })();
    if (ls_action.o_json != null) {
      result = ls_action.o_json.stringify();
    }
    return result;
  }

  test_toast_plain() {
    this.mo_cut.msg_toast({ text: `Saved` });
    cl_abap_unit_assert.assert_equals({ exp: `["MESSAGE_TOAST","show","Saved"]`, act: this.queued() });
  }

  test_toast_options() {
    this.mo_cut.msg_toast({ text: `Saved`, duration: `250`, my: `center center`, class: `myCls` });
    cl_abap_unit_assert.assert_equals({ exp: `["MESSAGE_TOAST","show","Saved",{"class":"myCls","duration":250,"my":"center center"}]`, act: this.queued() });
  }

  test_toast_duration_junk() {
    this.mo_cut.msg_toast({ text: `Saved`, duration: `abc` });
    cl_abap_unit_assert.assert_equals({ exp: `["MESSAGE_TOAST","show","Saved"]`, act: this.queued() });
  }

  test_toast_opt_out() {
    this.mo_cut.msg_toast({ text: `Saved`, autoclose: false });
    cl_abap_unit_assert.assert_equals({ exp: `["MESSAGE_TOAST","show","Saved",{"autoClose":false}]`, act: this.queued() });
  }

  test_box_default_type() {
    this.mo_cut.msg_box({ text: `Hello` });
    cl_abap_unit_assert.assert_equals({ exp: `["MESSAGE_BOX","show","Hello",{"title":"Information"}]`, act: this.queued() });
  }

  test_box_explicit_type() {
    this.mo_cut.msg_box({ text: `Delete?`, type: `Confirm`, onclose: `ANSWERED` });
    cl_abap_unit_assert.assert_equals({ exp: `["MESSAGE_BOX","confirm","Delete?",{"onClose":"ANSWERED"}]`, act: this.queued() });
  }

  test_box_unknown_type() {
    this.mo_cut.msg_box({ text: `Boom`, type: `garbage` });
    cl_abap_unit_assert.assert_equals({ exp: `["MESSAGE_BOX","show","Boom"]`, act: this.queued() });
  }

  test_box_icon_none() {
    this.mo_cut.msg_box({ text: `Boom`, type: `error`, icon: `NONE` });
    cl_abap_unit_assert.assert_equals({ exp: `["MESSAGE_BOX","error","Boom"]`, act: this.queued() });
  }

  test_box_actions() {
    this.mo_cut.msg_box({ text: `Delete?`, type: `confirm`, actions: [`OK`, `CANCEL`] });
    cl_abap_unit_assert.assert_equals({ exp: `["MESSAGE_BOX","confirm","Delete?",{"actions":["OK","CANCEL"]}]`, act: this.queued() });
  }

  test_box_msg_table_empty() {
    let lt_msg = [];
    this.mo_cut.msg_box({ text: lt_msg });
    cl_abap_unit_assert.assert_initial(this.mo_action.ms_next.s_action.t_custom);
  }

  serialized() {
    let result = ``;
    let sy_tabix = 0;
    this.mo_cut.slots_serialize();
    sy_tabix = 0;
    for (const ls_action of this.mo_action.ms_next.s_action.t_system) {
      sy_tabix++;
      if (!z2ui5_cl_util.abap_is_initial(result)) {
        result = result + `|`;
      }
      result = result + ls_action.o_json.stringify();
    }
    return result;
  }

  test_main_drops_teardowns() {
    this.mo_cut.slot_destroy({ slot: z2ui5_if_client.cs_view.popup });
    this.mo_cut.slot_destroy({ slot: z2ui5_if_client.cs_view.popover });
    this.mo_cut.slot_display({ slot: z2ui5_if_client.cs_view.main, xml: `<View/>` });
    cl_abap_unit_assert.assert_equals({ exp: `["VIEW_SLOTS","display","MAIN","<View/>"]`, act: this.serialized() });
  }

  test_main_keeps_displays() {
    this.mo_cut.slot_display({ slot: z2ui5_if_client.cs_view.popup, xml: `<Dialog/>` });
    this.mo_cut.slot_display({ slot: z2ui5_if_client.cs_view.main, xml: `<View/>` });
    cl_abap_unit_assert.assert_equals({ exp: `["VIEW_SLOTS","display","MAIN","<View/>"]|["VIEW_SLOTS","display","POPUP","<Dialog/>"]`, act: this.serialized() });
  }

  test_teardowns_no_main() {
    this.mo_cut.slot_destroy({ slot: z2ui5_if_client.cs_view.popup });
    this.mo_cut.slot_destroy({ slot: z2ui5_if_client.cs_view.popover });
    cl_abap_unit_assert.assert_equals({ exp: `["VIEW_SLOTS","destroy","POPUP"]|["VIEW_SLOTS","destroy","POPOVER"]`, act: this.serialized() });
  }
}





module.exports = {
  __main: "z2ui5_cl_ui5_frontend",
  __classes: { ltcl_test_action_front },
  __tests: {"ltcl_test_action_front":["test_toast_plain","test_toast_options","test_toast_duration_junk","test_toast_opt_out","test_box_default_type","test_box_explicit_type","test_box_unknown_type","test_box_icon_none","test_box_actions","test_box_msg_table_empty","test_main_drops_teardowns","test_main_keeps_displays","test_teardowns_no_main"]},
};
