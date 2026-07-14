const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_495 extends z2ui5_if_app {
  view_display({ client } = {}) {
    const page = z2ui5_cl_xml_view.factory()
      .shell()
      .page({ title: `abap2UI5 - Sample: Single-Sided Margins`, navbuttonpress: client._event_nav_app_leave(), shownavbutton: client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.ui.core.StandardMargins/sample/sap.m.sample.StandardMarginsSingleSided` });
    page.panel({ width: `auto`, class: `sapUiLargeMarginBegin sapUiLargeMarginBottom` })
      .content()
      .text({ text: `This panel uses margin classes 'sapUiLargeMarginBegin' and 'sapUiLargeMarginBottom' to clear a 48px (3rem) space to the left and bottom.`, class: `sapMH4FontSize` })
      .text(`Since panels have a default width of 100%, horizontal margins are not displayed appropriately. Therefore we need to set the panel's 'width' property to 'auto'.`);
    page.text({ text: `To see what happens in Right-To-Left mode open 'Settings' by pressing the cog wheel button next to 'Entities'.`, class: `sapUiExploredNoMarginInfo` });
    client.view_display(page.stringify());
  }

  async main(client) {
    if (client.check_on_init()) {
      this.view_display({ client: client });
    }
  }
}

module.exports = z2ui5_cl_demo_app_495;
