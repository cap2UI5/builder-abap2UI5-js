const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_405 extends z2ui5_if_app {
  client = null;

  async main(client) {
    this.client = z2ui5_cl_util.abap_copy(client);
    if (client.check_on_init()) {
      this.view_display();
    }
  }

  view_display() {
    const css = `.sapUiDemoFlexBoxSizeAdjustments .sapMFlexItem {` + `  border: 1px dashed #000;` + `  margin: 0.1875rem;` + `  padding: 0.1875rem;` + `}` + `.sapUiDemoFlexBoxSizeAdjustmentsZeroWidthItems .sapMFlexItem {` + `  width: 0;` + `}`;
    const view = z2ui5_cl_xml_view.factory();
    view._generic({ name: `style`, ns: `html` })._cc_plain_xml(css).get_parent();
    const page = view.shell()
      .page({ title: `abap2UI5 - Sample: Flex Box - Size Adjustments`, navbuttonpress: this.client._event_nav_app_leave(), shownavbutton: this.client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.m.FlexBox/sample/sap.m.sample.FlexBoxSizeAdjustments` });
    const vbox = page.vbox();
    vbox.panel({ headertext: `Equal flexibility and content`, class: `sapUiDemoFlexBoxSizeAdjustments` })
      .flex_box({ alignitems: `Start` })
      .button({ text: `1`, width: `100%`, type: `Emphasized`, class: `sapUiSmallMarginEnd` })
      .get()
      .layout_data()
      .flex_item_data({ growfactor: `1` })
      .get_parent()
      .get_parent()
      .button({ text: `2`, width: `100%`, type: `Reject`, class: `sapUiSmallMarginEnd` })
      .get()
      .layout_data()
      .flex_item_data({ growfactor: `1` })
      .get_parent()
      .get_parent()
      .button({ text: `3`, width: `100%`, type: `Accept` })
      .get()
      .layout_data()
      .flex_item_data({ growfactor: `1` });
    vbox.panel({ headertext: `Different flexibility, equal content`, class: `sapUiDemoFlexBoxSizeAdjustments` })
      .flex_box({ alignitems: `Start` })
      .button({ text: `1`, width: `100%`, type: `Emphasized`, class: `sapUiSmallMarginEnd` })
      .get()
      .layout_data()
      .flex_item_data({ growfactor: `1` })
      .get_parent()
      .get_parent()
      .button({ text: `2`, width: `100%`, type: `Reject`, class: `sapUiSmallMarginEnd` })
      .get()
      .layout_data()
      .flex_item_data({ growfactor: `2` })
      .get_parent()
      .get_parent()
      .button({ text: `3`, width: `100%`, type: `Accept` })
      .get()
      .layout_data()
      .flex_item_data({ growfactor: `3` });
    vbox.panel({ headertext: `Equal flexibility, different content`, class: `sapUiDemoFlexBoxSizeAdjustments` })
      .flex_box({ alignitems: `Start` })
      .button({ text: `1`, width: `50px`, type: `Emphasized`, class: `sapUiSmallMarginEnd` })
      .get()
      .layout_data()
      .flex_item_data({ growfactor: `1` })
      .get_parent()
      .get_parent()
      .button({ text: `2`, width: `100px`, type: `Reject`, class: `sapUiSmallMarginEnd` })
      .get()
      .layout_data()
      .flex_item_data({ growfactor: `1` })
      .get_parent()
      .get_parent()
      .button({ text: `3`, width: `150px`, type: `Accept` })
      .get()
      .layout_data()
      .flex_item_data({ growfactor: `1` });
    vbox.panel({ headertext: `Equal flexibility, different content, width 0`, class: `sapUiDemoFlexBoxSizeAdjustments` })
      .flex_box({ alignitems: `Start`, class: `sapUiDemoFlexBoxSizeAdjustmentsZeroWidthItems` })
      .button({ text: `1`, width: `100%`, type: `Emphasized`, class: `sapUiSmallMarginEnd` })
      .get()
      .layout_data()
      .flex_item_data({ growfactor: `1` })
      .get_parent()
      .get_parent()
      .button({ text: `2`, width: `100%`, type: `Reject`, class: `sapUiSmallMarginEnd` })
      .get()
      .layout_data()
      .flex_item_data({ growfactor: `1` })
      .get_parent()
      .get_parent()
      .button({ text: `3`, width: `100%`, type: `Accept` })
      .get()
      .layout_data()
      .flex_item_data({ growfactor: `1` });
    vbox.panel({ headertext: `Different flexibility and content, width 0`, class: `sapUiDemoFlexBoxSizeAdjustments` })
      .flex_box({ alignitems: `Start`, class: `sapUiDemoFlexBoxSizeAdjustmentsZeroWidthItems` })
      .button({ text: `1`, width: `50px`, type: `Emphasized`, class: `sapUiSmallMarginEnd` })
      .get()
      .layout_data()
      .flex_item_data({ growfactor: `1` })
      .get_parent()
      .get_parent()
      .button({ text: `2`, width: `100px`, type: `Reject`, class: `sapUiSmallMarginEnd` })
      .get()
      .layout_data()
      .flex_item_data({ growfactor: `1` })
      .get_parent()
      .get_parent()
      .button({ text: `3`, width: `150px`, type: `Accept` })
      .get()
      .layout_data()
      .flex_item_data({ growfactor: `1` });
    this.client.view_display(view.stringify());
  }
}

module.exports = z2ui5_cl_demo_app_405;
