const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_500 extends z2ui5_if_app {
  selected_key = ``;
  client = null;

  async main(client) {
    this.client = z2ui5_cl_util.abap_copy(client);
    if (client.check_on_init()) {
      this.selected_key = `invalidKey`;
      this.view_display();
    } else if (client.check_on_event(`HOME`)) {
      this.selected_key = `invalidKey`;
      client.view_model_update();
    }
  }

  view_display() {
    const page = z2ui5_cl_xml_view.factory()
      .shell()
      .page({ title: `abap2UI5 - Sample: ToolHeader with IconTabHeader`, navbuttonpress: this.client._event_nav_app_leave(), shownavbutton: this.client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.tnt.ToolHeader/sample/sap.tnt.sample.ToolHeaderIconTabHeader` });
    page.text({ text: `Simple IconTabHeader`, class: `sapUiTinyMarginTop sapUiSmallMarginBegin` });
    page.tool_header()
      ._generic_property({ n: `class`, v: `sapUiTinyMarginTop sapUiTinyMarginEnd sapUiTinyMarginBegin` })
      .button({ icon: `sap-icon://home`, type: `Transparent`, press: this.client._event(`HOME`) })
      .get()
      .layout_data()
      .overflow_toolbar_layout_data({ priority: `NeverOverflow` })
      .get(`ToolHeader`)
      .icon_tab_header({ selectedkey: this.client._bind_edit(this.selected_key), backgrounddesign: `Transparent`, mode: `Inline` })
      .layout_data()
      ._generic({ name: `OverflowToolbarLayoutData`, t_prop: [{ n: `priority`, v: `NeverOverflow` }, { n: `shrinkable`, v: `true` }] })
      .get(`IconTabHeader`)
      .items()
      .icon_tab_filter({ text: `Documentation` })
      .get_parent()
      .icon_tab_filter({ text: `Explored` })
      .get_parent()
      .icon_tab_filter({ text: `API Reference` })
      .get_parent()
      .icon_tab_filter({ text: `Demo Apps` })
      .get(`ToolHeader`)
      .button({ icon: `sap-icon://search`, type: `Transparent` })
      .get()
      .layout_data()
      .overflow_toolbar_layout_data({ priority: `NeverOverflow` })
      .get(`ToolHeader`)
      .button({ icon: `sap-icon://comment`, type: `Transparent` })
      .get()
      .layout_data()
      .overflow_toolbar_layout_data({ priority: `NeverOverflow` })
      .get(`ToolHeader`)
      .menu_button({ type: `Transparent` })
      ._generic_property({ n: `icon`, v: `sap-icon://hint` })
      .layout_data()
      .overflow_toolbar_layout_data({ priority: `NeverOverflow` })
      .get(`MenuButton`)
      .menu()
      .menu_item({ text: `Edit`, icon: `sap-icon://edit` })
      .menu_item({ text: `Save`, icon: `sap-icon://save` });
    this.client.view_display(page.stringify());
  }
}

module.exports = z2ui5_cl_demo_app_500;
