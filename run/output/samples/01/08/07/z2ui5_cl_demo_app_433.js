const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_433 extends z2ui5_if_app {
  t_products = [];

  view_display({ client } = {}) {
    const page = z2ui5_cl_xml_view.factory()
      .shell()
      .page({ title: `abap2UI5 - Sample: Icon Tab Bar - Stretch Content Height`, navbuttonpress: client._event_nav_app_leave(), shownavbutton: client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.m.IconTabBar/sample/sap.m.sample.IconTabBarStretchContent` });
    const items = page.icon_tab_bar({ id: `idIconTabBarStretchContent`, stretchcontentheight: true, backgrounddesign: `Transparent`, applycontentpadding: false, class: `sapUiResponsiveContentPadding` })
      .items();
    items.icon_tab_filter({ text: `Products`, key: `products` })
      .scroll_container({ height: `100%`, width: `100%`, horizontal: false, vertical: true })
      .list(client._bind(this.t_products))
      .standard_list_item({ title: `{NAME}`, counter: `{QUANTITY}` });
    items.icon_tab_filter({ text: `Attachments`, key: `attachments` }).text(`Attachments go here ...`);
    items.icon_tab_filter({ text: `Notes`, key: `notes` }).text(`Notes go here ...`);
    items.icon_tab_filter({ text: `People`, key: `people` }).text(`People content goes here ...`);
    client.view_display(page.stringify());
  }

  async main(client) {
    if (client.check_on_init()) {
      this.t_products = [{ name: `Notebook Basic 15`, quantity: `10` }, { name: `Notebook Basic 17`, quantity: `20` }, { name: `Notebook Basic 18`, quantity: `10` }, { name: `Notebook Basic 19`, quantity: `15` }, { name: `ITelO Vault`, quantity: `15` }, { name: `Notebook Professional 15`, quantity: `16` }, { name: `Notebook Professional 17`, quantity: `17` }, { name: `ITelO Vault Net`, quantity: `14` }];
      this.view_display({ client: client });
    }
  }
}

module.exports = z2ui5_cl_demo_app_433;
