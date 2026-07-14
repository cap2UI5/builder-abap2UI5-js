const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_467 extends z2ui5_if_app {
  view_display({ client } = {}) {
    const view = z2ui5_cl_xml_view.factory();
    const page = view.shell()
      .page({ title: `abap2UI5 - Sample: Object Number`, navbuttonpress: client._event_nav_app_leave(), shownavbutton: client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.m.ObjectNumber/sample/sap.m.sample.ObjectNumber` });
    const layout = page.vertical_layout({ class: `sapUiContentPadding`, width: `100%` });
    layout.label({ text: `ObjectNumber`, class: `sapUiSmallMarginTop`, design: `Bold` });
    layout.horizontal_layout({ class: `sapUiContentPadding` })
      .object_number({ class: `sapUiSmallMarginBottom`, number: `856.49`, unit: `EUR` })
      .object_number({ class: `sapUiSmallMarginBottom`, number: `81.70`, unit: `EUR`, state: `Error` })
      .object_number({ class: `sapUiSmallMarginBottom`, number: `219.00`, unit: `EUR`, state: `Warning` })
      .object_number({ class: `sapUiSmallMarginBottom`, number: `59.00`, unit: `EUR`, state: `Success` })
      .object_number({ class: `sapUiSmallMarginBottom`, number: `6.50`, unit: `EUR`, state: `Information` });
    const layout2 = page.vertical_layout({ class: `sapUiContentPadding`, width: `100%` });
    layout2.label({ text: `ObjectNumber with style sapMObjectNumberLarge applied`, class: `sapUiSmallMarginTop`, design: `Bold` });
    layout2.object_number({ class: `sapMObjectNumberLarge`, number: `78.90`, unit: `EUR`, emphasized: false, state: `None` });
    layout2.label({ text: `ObjectNumber wrapped via sapMObjectNumberLongText`, class: `sapUiSmallMarginTop`, design: `Bold` });
    layout2.panel({ backgrounddesign: `Transparent`, width: `100px` })
      .object_number({ class: `sapMObjectNumberLongText`, number: `12345678901234567890`, unit: `EUR`, emphasized: false, state: `None` });
    client.view_display(view.stringify());
  }

  async main(client) {
    if (client.check_on_init()) {
      this.view_display({ client: client });
    }
  }
}

module.exports = z2ui5_cl_demo_app_467;
