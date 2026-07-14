const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_428 extends z2ui5_if_app {
  t_products = [];
  client = null;

  async main(client) {
    this.client = z2ui5_cl_util.abap_copy(client);
    if (client.check_on_init()) {
      this.on_init();
    }
  }

  on_init() {
    this.t_products = [{ product_id: `HT-1000`, name: `Notebook Basic 15`, supplier_name: `Very Best Screens` }, { product_id: `HT-1001`, name: `Notebook Basic 17`, supplier_name: `Very Best Screens` }, { product_id: `HT-1002`, name: `Notebook Basic 18`, supplier_name: `Very Best Screens` }, { product_id: `HT-1003`, name: `Notebook Basic 19`, supplier_name: `Smartcards` }, { product_id: `HT-1007`, name: `ITelO Vault`, supplier_name: `Technocom` }, { product_id: `HT-1010`, name: `Notebook Professional 15`, supplier_name: `Very Best Screens` }, { product_id: `HT-1011`, name: `Notebook Professional 17`, supplier_name: `Very Best Screens` }, { product_id: `HT-1020`, name: `ITelO Vault Net`, supplier_name: `Technocom` }, { product_id: `HT-1021`, name: `ITelO Vault SAT`, supplier_name: `Technocom` }, { product_id: `HT-1022`, name: `Comfort Easy`, supplier_name: `Technocom` }, { product_id: `HT-1023`, name: `Comfort Senior`, supplier_name: `Technocom` }, { product_id: `HT-1030`, name: `Ergo Screen E-I`, supplier_name: `Very Best Screens` }, { product_id: `HT-1031`, name: `Ergo Screen E-II`, supplier_name: `Very Best Screens` }, { product_id: `HT-1032`, name: `Ergo Screen E-III`, supplier_name: `Very Best Screens` }, { product_id: `HT-1035`, name: `Flat Basic`, supplier_name: `Very Best Screens` }, { product_id: `HT-1036`, name: `Flat Future`, supplier_name: `Very Best Screens` }, { product_id: `HT-1040`, name: `Laser Professional Eco`, supplier_name: `Alpha Printers` }, { product_id: `HT-1041`, name: `Laser Basic`, supplier_name: `Alpha Printers` }, { product_id: `HT-1042`, name: `Laser Allround`, supplier_name: `Alpha Printers` }, { product_id: `HT-1060`, name: `Cordless Mouse`, supplier_name: `Oxynum` }, { product_id: `HT-1061`, name: `Speed Mouse`, supplier_name: `Oxynum` }, { product_id: `HT-1062`, name: `Track Mouse`, supplier_name: `Oxynum` }, { product_id: `HT-1063`, name: `Ergonomic Keyboard`, supplier_name: `Oxynum` }];
    this.view_display();
  }

  view_display() {
    const page = z2ui5_cl_xml_view.factory()
      .shell()
      .page({ title: `abap2UI5 - Sample: ComboBox - Grouping of items`, navbuttonpress: this.client._event_nav_app_leave(), shownavbutton: this.client.check_app_prev_stack(), class: `sapUiContentPadding` });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.m.ComboBox/sample/sap.m.sample.ComboBoxGrouping` });
    page.combobox({ items: `{path:'` + this.client._bind(this.t_products, { path: true }) + `', sorter: { path: 'SUPPLIER_NAME', descending: false, group: true } }` })
      .item({ key: `{PRODUCT_ID}`, text: `{NAME}` });
    this.client.view_display(page.stringify());
  }
}

module.exports = z2ui5_cl_demo_app_428;
