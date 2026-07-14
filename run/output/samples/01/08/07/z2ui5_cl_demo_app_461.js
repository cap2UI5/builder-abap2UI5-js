const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_461 extends z2ui5_if_app {
  view_display({ client } = {}) {
    const view = z2ui5_cl_xml_view.factory();
    const page = view.shell()
      .page({ title: `abap2UI5 - Sample: Object Header - Condensed`, navbuttonpress: client._event_nav_app_leave(), shownavbutton: client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.m.ObjectHeader/sample/sap.m.sample.ObjectHeaderCondensed` });
    page.object_header({ title: `Notebook Basic 15`, condensed: true, number: `956.00`, numberunit: `EUR`, class: `sapUiResponsivePadding--header` })
      .object_attribute({ text: `4.2 KG 30 x 18 x 3 cm` });
    client.view_display(view.stringify());
  }

  async main(client) {
    if (client.check_on_init()) {
      this.view_display({ client: client });
    }
  }
}

module.exports = z2ui5_cl_demo_app_461;
