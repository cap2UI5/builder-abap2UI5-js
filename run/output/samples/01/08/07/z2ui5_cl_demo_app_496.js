const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_496 extends z2ui5_if_app {
  view_display({ client } = {}) {
    const page = z2ui5_cl_xml_view.factory()
      .shell()
      .page({ title: `abap2UI5 - Sample: Two-Sided Margins`, navbuttonpress: client._event_nav_app_leave(), shownavbutton: client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.ui.core.StandardMargins/sample/sap.m.sample.StandardMarginsTwoSided` });
    page.text({ text: `This sample demonstrates convenience classes which let you set a margin at two opposite sides (top/bottom and begin/end).`, class: `sapUiExploredNoMarginInfo` });
    page.panel({ class: `sapUiMediumMarginTopBottom` })
      .content()
      .text({ text: `This panel uses margin class 'sapUiMediumMarginTopBottom' to clear a 32px (2rem) space at the panel's top and bottom.`, class: `sapMH4FontSize` })
      .text(`Since we do not apply horizontal margins in this case, we do not need to reset the panel's default width in this case. Therefore it is NOT necessary to set the modify the panel's 'width' property.`);
    page.panel({ width: `auto`, class: `sapUiMediumMarginBeginEnd` })
      .content()
      .text({ text: `This panel uses margin class 'sapUiMediumMarginBeginEnd' to clear a 32px space at the panel's left and right side.`, class: `sapMH4FontSize` })
      .text(`Since we do apply horizontal margins in this case, we have to set the panel's width to 'auto'.`);
    client.view_display(page.stringify());
  }

  async main(client) {
    if (client.check_on_init()) {
      this.view_display({ client: client });
    }
  }
}

module.exports = z2ui5_cl_demo_app_496;
