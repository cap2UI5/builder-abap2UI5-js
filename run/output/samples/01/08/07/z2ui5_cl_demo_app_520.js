const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_520 extends z2ui5_if_app {
  view_display({ client } = {}) {
    const image_url = `https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-7777-large.jpg`;
    const page = z2ui5_cl_xml_view.factory()
      .shell()
      .page({ title: `abap2UI5 - Sample: Vertical Layout`, navbuttonpress: client._event_nav_app_leave(), shownavbutton: client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.ui.layout.VerticalLayout/sample/sap.ui.layout.sample.VerticalLayout` });
    page.vertical_layout({ class: `sapUiContentPadding` })
      .image({ src: image_url, densityaware: true, width: `5em` })
      .image({ src: image_url, densityaware: true, width: `10em` })
      .image({ src: image_url, densityaware: true, width: `15em` });
    client.view_display(page.stringify());
  }

  async main(client) {
    if (client.check_on_init()) {
      this.view_display({ client: client });
    }
  }
}

module.exports = z2ui5_cl_demo_app_520;
