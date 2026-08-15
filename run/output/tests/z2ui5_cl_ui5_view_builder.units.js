// GENERATED from run/input/abap2UI5/src/02/z2ui5_cl_ui5_view_builder.clas.testclasses.abap — do not edit
const cl_abap_unit_assert = require("abap2UI5/cl_abap_unit_assert");
const z2ui5_cl_ui5_util_context = require("abap2UI5/z2ui5_cl_ui5_util_context");
const z2ui5_cl_ui5_view_builder = require("abap2UI5/z2ui5_cl_ui5_view_builder");


class ltcl_builder {
  render_nested_view() {
    const view = z2ui5_cl_ui5_view_builder.factory();
    view.ele({ n: `View`, ns: `mvc` }).a({ n: `xmlns`, v: `sap.m` }).tag(`Text`).a({ n: `text`, v: `Hello` }).ele(`Panel`).tag(`Title`);
    cl_abap_unit_assert.assert_equals({ act: view.stringify(), exp: `<mvc:View xmlns="sap.m"><Text text="Hello"/><Panel><Title/></Panel></mvc:View>` });
  }

  a_after_ele_hits_the_element() {
    const view = z2ui5_cl_ui5_view_builder.factory();
    view.ele(`Page`).a({ n: `title`, v: `Home` }).ele(`Panel`).a({ n: `width`, v: `100%` });
    cl_abap_unit_assert.assert_equals({ act: view.stringify(), exp: `<Page title="Home"><Panel width="100%"/></Page>` });
  }

  a_after_tag_hits_the_tag() {
    const view = z2ui5_cl_ui5_view_builder.factory();
    view.ele(`Panel`).tag(`Title`).a({ n: `width`, v: `100%` });
    cl_abap_unit_assert.assert_equals({ act: view.stringify(), exp: `<Panel><Title width="100%"/></Panel>` });
  }

  a_after_end_hits_closed_ele() {
    const view = z2ui5_cl_ui5_view_builder.factory();
    view.ele(`Page`).ele(`Panel`).tag(`Title`).end().a({ n: `width`, v: `100%` });
    cl_abap_unit_assert.assert_equals({ act: view.stringify(), exp: `<Page><Panel width="100%"><Title/></Panel></Page>` });
  }

  tag_stays_and_siblings() {
    const view = z2ui5_cl_ui5_view_builder.factory();
    view.ele(`Page`).tag(`Text`).a({ n: `text`, v: `first` }).tag({ n: `Text`, ns: `m` }).a({ n: `text`, v: `second` }).tag(`ToolbarSpacer`);
    cl_abap_unit_assert.assert_equals({ act: view.stringify(), exp: `<Page><Text text="first"/><m:Text text="second"/><ToolbarSpacer/></Page>` });
  }

  trailing_end_is_optional() {
    const closed = z2ui5_cl_ui5_view_builder.factory();
    closed.ele(`Page`).ele(`Panel`).ele(`Title`).end().end();
    const open = z2ui5_cl_ui5_view_builder.factory();
    open.ele(`Page`).ele(`Panel`).ele(`Title`);
    cl_abap_unit_assert.assert_equals({ act: open.stringify(), exp: closed.stringify() });
  }

  escape_attribute_value() {
    const view = z2ui5_cl_ui5_view_builder.factory();
    view.tag(`Text`).a({ n: `text`, v: `a<b>&"c` });
    cl_abap_unit_assert.assert_equals({ act: view.stringify(), exp: `<Text text="a&lt;b&gt;&amp;&quot;c"/>` });
  }

  escape_whitespace_chars() {
    const view = z2ui5_cl_ui5_view_builder.factory();
    view.tag(`Text`).a({ n: `text`, v: `line1${z2ui5_cl_ui5_util_context.cv_char_util_newline}line2${z2ui5_cl_ui5_util_context.cv_char_util_horizontal_tab}end` });
    cl_abap_unit_assert.assert_equals({ act: view.stringify(), exp: `<Text text="line1&#xA;line2&#x9;end"/>` });
  }

  bool_parameter() {
    const view = z2ui5_cl_ui5_view_builder.factory();
    view.ele(`Panel`).a({ n: `visible`, b: true }).a({ n: `expanded`, b: false });
    cl_abap_unit_assert.assert_equals({ act: view.stringify(), exp: `<Panel visible="true" expanded="false"/>` });
  }
}





module.exports = {
  __main: "z2ui5_cl_ui5_view_builder",
  __classes: { ltcl_builder },
  __tests: {"ltcl_builder":["render_nested_view","a_after_ele_hits_the_element","a_after_tag_hits_the_tag","a_after_end_hits_closed_ele","tag_stays_and_siblings","trailing_end_is_optional","escape_attribute_value","escape_whitespace_chars","bool_parameter"]},
};
