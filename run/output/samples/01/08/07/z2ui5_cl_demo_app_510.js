const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_510 extends z2ui5_if_app {
  async main(client) {
    if (client.check_on_init()) {
      this.view_display({ client: client });
    }
  }

  view_display({ client } = {}) {
    const card_explorer_url = `https://sapui5.hana.ondemand.com/test-resources/sap/ui/integration/demokit/cardExplorer/index.html`;
    const page = z2ui5_cl_xml_view.factory()
      .shell()
      .page({ title: `abap2UI5 - Sample: Card Explorer`, navbuttonpress: client._event_nav_app_leave(), shownavbutton: client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.ui.integration.widgets.Card/sample/sap.ui.integration.sample.CardExplorer` });
    page.vbox(`sapUiContentPadding`)
      .link({ text: `Visit the Card Explorer`, href: card_explorer_url, emphasized: true, class: `sapUiSmallMargin`, target: `_blank` })
      .image({ src: `https://sapui5.hana.ondemand.com/resources/sap/ui/documentation/sdk/images/tools/CardExplorer.png`, alt: `Card Explorer`, class: `sapUiSmallMargin`, press: client._event_client(client.cs_event.open_new_tab, [card_explorer_url]) });
    client.view_display(page.stringify());
  }
}

module.exports = z2ui5_cl_demo_app_510;
