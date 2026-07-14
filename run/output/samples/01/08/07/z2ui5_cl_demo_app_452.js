const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_452 extends z2ui5_if_app {
  t_products = [];

  view_display({ client } = {}) {
    let sy_tabix = 0;
    let supplier = ``;
    const page = z2ui5_cl_xml_view.factory()
      .shell()
      .page({ title: `abap2UI5 - Sample: MultiComboBox - Grouping of items`, navbuttonpress: client._event_nav_app_leave(), shownavbutton: client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.m.MultiComboBox/sample/sap.m.sample.MultiComboBoxGrouping` });
    const combo = page.vertical_layout({ class: `sapUiContentPadding`, width: `100%` })
      .multi_combobox({ width: `500px` });
    sy_tabix = 0;
    for (const s_product of this.t_products) {
      sy_tabix++;
      if (s_product.supplier_name !== supplier) {
        supplier = z2ui5_cl_util.abap_copy(s_product.supplier_name);
        combo._generic({ name: `SeparatorItem`, ns: `core`, t_prop: [{ n: `text`, v: s_product.supplier_name }] });
      }
      combo.item({ key: s_product.product_id, text: s_product.name });
    }
    client.view_display(page.stringify());
  }

  async main(client) {
    if (client.check_on_init()) {
      this.t_products = [{ product_id: `HT-1000`, name: `Notebook Basic 15`, supplier_name: `Very Best Screens` }, { product_id: `HT-1001`, name: `Notebook Basic 17`, supplier_name: `Very Best Screens` }, { product_id: `HT-1002`, name: `Notebook Basic 18`, supplier_name: `Very Best Screens` }, { product_id: `HT-1003`, name: `Notebook Basic 19`, supplier_name: `Smartcards` }, { product_id: `HT-1007`, name: `ITelO Vault`, supplier_name: `Technocom` }, { product_id: `HT-1010`, name: `Notebook Professional 15`, supplier_name: `Very Best Screens` }, { product_id: `HT-1011`, name: `Notebook Professional 17`, supplier_name: `Very Best Screens` }, { product_id: `HT-1020`, name: `ITelO Vault Net`, supplier_name: `Technocom` }, { product_id: `HT-1021`, name: `ITelO Vault SAT`, supplier_name: `Technocom` }, { product_id: `HT-1022`, name: `Comfort Easy`, supplier_name: `Technocom` }, { product_id: `HT-1023`, name: `Comfort Senior`, supplier_name: `Technocom` }, { product_id: `HT-1030`, name: `Ergo Screen E-I`, supplier_name: `Very Best Screens` }, { product_id: `HT-1031`, name: `Ergo Screen E-II`, supplier_name: `Very Best Screens` }, { product_id: `HT-1032`, name: `Ergo Screen E-III`, supplier_name: `Very Best Screens` }, { product_id: `HT-1035`, name: `Flat Basic`, supplier_name: `Very Best Screens` }, { product_id: `HT-1036`, name: `Flat Future`, supplier_name: `Very Best Screens` }];
      this.t_products.sort((a, b) => ((a.supplier_name > b.supplier_name ? 1 : a.supplier_name < b.supplier_name ? -1 : 0)));
      this.view_display({ client: client });
    }
  }
}

module.exports = z2ui5_cl_demo_app_452;
