const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_432 extends z2ui5_if_app {
  client = null;

  async main(client) {
    this.client = z2ui5_cl_util.abap_copy(client);
    if (client.check_on_init()) {
      this.view_display();
    }
  }

  view_display() {
    const page = z2ui5_cl_xml_view.factory()
      .shell()
      .page({ title: `abap2UI5 - Sample: Icon Tab Bar - Overflow Behavior`, navbuttonpress: this.client._event_nav_app_leave(), shownavbutton: this.client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.m.IconTabBar/sample/sap.m.sample.IconTabBarOverflowSelectList` });
    const tab_items = page.icon_tab_bar({ id: `idIconTabBar`, class: `sapUiResponsiveContentPadding` }).items();
    for (let sy_index = 1; sy_index <= 30; sy_index++) {
      tab_items.icon_tab_filter({ text: `Tab ${sy_index}`, key: `${sy_index}` }).text(`Content ${sy_index}`);
    }
    this.client.view_display(page.stringify());
  }
}

module.exports = z2ui5_cl_demo_app_432;
