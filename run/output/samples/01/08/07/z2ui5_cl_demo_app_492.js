const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_492 extends z2ui5_if_app {
  view_display({ client } = {}) {
    const page = z2ui5_cl_xml_view.factory()
      .shell()
      .page({ title: `abap2UI5 - Sample: Collapsing Margins`, navbuttonpress: client._event_nav_app_leave(), shownavbutton: client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.ui.core.StandardMargins/sample/sap.m.sample.StandardMarginsCollapse` });
    page.panel({ class: `sapUiSmallMarginBottom` }).content().text(`This panel has a 16px (1rem) bottom margin.`);
    page.panel({ width: `auto`, class: `sapUiSmallMargin` })
      .content()
      .text(`This panel has a 16px margin all around. As you can see, the margins do not add to the margins of the bottom or top panel.`);
    page.panel({ class: `sapUiSmallMarginTop` }).content().text(`This panel has a 16px top margin.`);
    client.view_display(page.stringify());
  }

  async main(client) {
    if (client.check_on_init()) {
      this.view_display({ client: client });
    }
  }
}

module.exports = z2ui5_cl_demo_app_492;
