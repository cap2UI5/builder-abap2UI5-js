const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_458 extends z2ui5_if_app {
  t_products = [];
  client = null;

  async main(client) {
    this.client = z2ui5_cl_util.abap_copy(client);
    if (client.check_on_init()) {
      this.on_init();
    }
  }

  on_init() {
    this.t_products = [{ name: `Notebook Basic 15`, product_id: `HT-1000` }, { name: `Notebook Basic 17`, product_id: `HT-1001` }, { name: `Notebook Basic 18`, product_id: `HT-1002` }, { name: `Notebook Basic 19`, product_id: `HT-1003` }, { name: `ITelO Vault`, product_id: `HT-1007` }, { name: `Notebook Professional 15`, product_id: `HT-1010` }, { name: `Notebook Professional 17`, product_id: `HT-1011` }, { name: `ITelO Vault Net`, product_id: `HT-1020` }, { name: `ITelO Vault SAT`, product_id: `HT-1021` }, { name: `Comfort Easy`, product_id: `HT-1022` }, { name: `Comfort Senior`, product_id: `HT-1023` }, { name: `Ergo Screen E-I`, product_id: `HT-1030` }, { name: `Flat Basic`, product_id: `HT-1035` }, { name: `Flat Future`, product_id: `HT-1036` }];
    this.t_products.sort((a, b) => ((a.name > b.name ? 1 : a.name < b.name ? -1 : 0)));
    this.view_display();
  }

  view_display() {
    const view = z2ui5_cl_xml_view.factory();
    const page = view.shell()
      .page({ title: `abap2UI5 - Sample: MultiInput with Max Tokens`, navbuttonpress: this.client._event_nav_app_leave(), shownavbutton: this.client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.m.MultiInput/sample/sap.m.sample.MultiInputMaxTokens` });
    const layout = page.vertical_layout({ class: `sapUiContentPadding`, width: `100%` });
    layout.label({ text: `No more than 2 products can be added`, width: `100%`, labelfor: `multiInput1` });
    layout._generic({ name: `MultiInput`, t_prop: [{ n: `id`, v: `multiInput1` }, { n: `width`, v: `70%` }, { n: `maxTokens`, v: `2` }, { n: `showValueHelp`, v: `false` }, { n: `suggestionItems`, v: this.client._bind(this.t_products) }] })
      .item({ key: `{PRODUCT_ID}`, text: `{NAME}` });
    this.client.view_display(view.stringify());
  }
}

module.exports = z2ui5_cl_demo_app_458;
