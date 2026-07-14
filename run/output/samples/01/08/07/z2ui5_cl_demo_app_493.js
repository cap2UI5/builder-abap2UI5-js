const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_493 extends z2ui5_if_app {
  view_display({ client } = {}) {
    const page = z2ui5_cl_xml_view.factory()
      .shell()
      .page({ title: `abap2UI5 - Sample: Enforce Width 'auto'`, navbuttonpress: client._event_nav_app_leave(), shownavbutton: client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.ui.core.StandardMargins/sample/sap.m.sample.StandardMarginsEnforceWidthAuto` });
    const tab_items = page.icon_tab_bar({ expanded: true, class: `sapUiForceWidthAuto sapUiSmallMargin` }).items();
    tab_items.icon_tab_filter({ key: `info`, text: `Info` })
      .simple_form({ title: `A Form`, layout: `ResponsiveGridLayout` })
      .content(`form`)
      .label(`Label`)
      .text(`Value`);
    tab_items.icon_tab_filter({ key: `attachments`, text: `Attachments` })
      .list({ headertext: `A List`, showseparators: `Inner` });
    tab_items.icon_tab_filter({ key: `notes`, text: `Notes` }).feed_input();
    const info_text = `The IconTabBar above does not have a width property and renders a default width of '100%'. ` + `Therefore we use margin class 'sapUiForceWidthAuto' to set its width to 'auto'. ` + `To clear a 16px (1rem) space all around, we use class 'sapUiSmallMargin'.`;
    page.text({ text: info_text, class: `sapUiExploredNoMarginInfo` });
    client.view_display(page.stringify());
  }

  async main(client) {
    if (client.check_on_init()) {
      this.view_display({ client: client });
    }
  }
}

module.exports = z2ui5_cl_demo_app_493;
