const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_436 extends z2ui5_if_app {
  t_products = [];

  view_display({ client } = {}) {
    const page = z2ui5_cl_xml_view.factory()
      .shell()
      .page({ title: `abap2UI5 - Sample: Input - Assisted Two Values`, navbuttonpress: client._event_nav_app_leave(), shownavbutton: client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.m.Input/sample/sap.m.sample.InputAssistedTwoValues` });
    const layout = page.vertical_layout({ class: `sapUiContentPadding`, width: `100%` });
    layout.label({ text: `Product`, labelfor: `productInput` });
    layout.input({ id: `productInput`, placeholder: `Enter product`, showsuggestion: true, suggestionitems: client._bind(this.t_products) })
      .get()
      .suggestion_items()
      .list_item({ text: `{NAME}`, additionaltext: `{SUPPLIER_NAME}` });
    client.view_display(page.stringify());
  }

  async main(client) {
    if (client.check_on_init()) {
      this.t_products = [{ name: `Notebook Basic 15`, supplier_name: `Very Best Screens` }, { name: `Notebook Basic 17`, supplier_name: `Very Best Screens` }, { name: `Notebook Basic 18`, supplier_name: `Very Best Screens` }, { name: `Notebook Basic 19`, supplier_name: `Smartcards` }, { name: `ITelO Vault`, supplier_name: `Technocom` }, { name: `Notebook Professional 15`, supplier_name: `Very Best Screens` }, { name: `Notebook Professional 17`, supplier_name: `Very Best Screens` }, { name: `ITelO Vault Net`, supplier_name: `Technocom` }];
      this.view_display({ client: client });
    }
  }
}

module.exports = z2ui5_cl_demo_app_436;
