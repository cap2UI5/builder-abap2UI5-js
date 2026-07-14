const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_441 extends z2ui5_if_app {
  t_products = [];

  view_display({ client } = {}) {
    const page = z2ui5_cl_xml_view.factory()
      .shell()
      .page({ title: `abap2UI5 - Sample: List - Counter Indication`, navbuttonpress: client._event_nav_app_leave(), shownavbutton: client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.m.List/sample/sap.m.sample.ListCounter` });
    page.list({ headertext: `Products`, items: client._bind(this.t_products) })
      .items()
      .standard_list_item({ title: `{NAME}`, counter: `{QUANTITY}` });
    client.view_display(page.stringify());
  }

  async main(client) {
    if (client.check_on_init()) {
      this.t_products = [{ name: `Notebook Basic 15`, quantity: 10 }, { name: `Notebook Basic 17`, quantity: 20 }, { name: `Notebook Basic 18`, quantity: 10 }, { name: `Notebook Basic 19`, quantity: 15 }, { name: `ITelO Vault`, quantity: 15 }, { name: `Notebook Professional 15`, quantity: 16 }, { name: `Notebook Professional 17`, quantity: 17 }, { name: `ITelO Vault Net`, quantity: 14 }, { name: `ITelO Vault SAT`, quantity: 50 }, { name: `Comfort Easy`, quantity: 30 }, { name: `Comfort Senior`, quantity: 24 }];
      this.view_display({ client: client });
    }
  }
}

module.exports = z2ui5_cl_demo_app_441;
