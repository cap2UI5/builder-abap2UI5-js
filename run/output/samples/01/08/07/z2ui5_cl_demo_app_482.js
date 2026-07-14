const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_482 extends z2ui5_if_app {
  t_products = [];
  client = null;

  async main(client) {
    this.client = z2ui5_cl_util.abap_copy(client);
    if (client.check_on_init()) {
      this.on_init();
    }
  }

  on_init() {
    this.t_products = [{ name: `Notebook Basic 15`, product_id: `HT-1000`, supplier_name: `Very Best Screens`, width: `30`, depth: `18`, height: `3`, dim_unit: `cm` }, { name: `Notebook Basic 17`, product_id: `HT-1001`, supplier_name: `Very Best Screens`, width: `29`, depth: `17`, height: `3.1`, dim_unit: `cm` }, { name: `Notebook Basic 18`, product_id: `HT-1002`, supplier_name: `Very Best Screens`, width: `28`, depth: `19`, height: `2.5`, dim_unit: `cm` }, { name: `Notebook Basic 19`, product_id: `HT-1003`, supplier_name: `Smartcards`, width: `32`, depth: `21`, height: `4`, dim_unit: `cm` }, { name: `ITelO Vault`, product_id: `HT-1007`, supplier_name: `Technocom`, width: `32`, depth: `22`, height: `3`, dim_unit: `cm` }, { name: `Notebook Professional 15`, product_id: `HT-1010`, supplier_name: `Very Best Screens`, width: `33`, depth: `20`, height: `3`, dim_unit: `cm` }, { name: `Notebook Professional 17`, product_id: `HT-1011`, supplier_name: `Very Best Screens`, width: `33`, depth: `23`, height: `2`, dim_unit: `cm` }, { name: `ITelO Vault Net`, product_id: `HT-1020`, supplier_name: `Technocom`, width: `10`, depth: `1.8`, height: `17`, dim_unit: `cm` }, { name: `ITelO Vault SAT`, product_id: `HT-1021`, supplier_name: `Technocom`, width: `11`, depth: `1.7`, height: `18`, dim_unit: `cm` }, { name: `Comfort Easy`, product_id: `HT-1022`, supplier_name: `Technocom`, width: `84`, depth: `1.5`, height: `14`, dim_unit: `cm` }, { name: `Comfort Senior`, product_id: `HT-1023`, supplier_name: `Technocom`, width: `80`, depth: `1.6`, height: `13`, dim_unit: `cm` }, { name: `Ergo Screen E-I`, product_id: `HT-1030`, supplier_name: `Very Best Screens`, width: `37`, depth: `12`, height: `36`, dim_unit: `cm` }, { name: `Ergo Screen E-II`, product_id: `HT-1031`, supplier_name: `Very Best Screens`, width: `40.8`, depth: `19`, height: `43`, dim_unit: `cm` }, { name: `Ergo Screen E-III`, product_id: `HT-1032`, supplier_name: `Very Best Screens`, width: `40.8`, depth: `19`, height: `43`, dim_unit: `cm` }, { name: `Flat Basic`, product_id: `HT-1035`, supplier_name: `Very Best Screens`, width: `39`, depth: `20`, height: `41`, dim_unit: `cm` }, { name: `Flat Future`, product_id: `HT-1036`, supplier_name: `Very Best Screens`, width: `45`, depth: `26`, height: `46`, dim_unit: `cm` }];
    this.t_products.sort((a, b) => ((a.name > b.name ? 1 : a.name < b.name ? -1 : 0)));
    this.view_display();
  }

  view_display() {
    const page = z2ui5_cl_xml_view.factory()
      .shell()
      .page({ title: `abap2UI5 - Sample: Table - Alternate Row Colors`, navbuttonpress: this.client._event_nav_app_leave(), shownavbutton: this.client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.m.Table/sample/sap.m.sample.TableAlternateRowColors` });
    page.table({ id: `idProductsTable`, inset: false, alternaterowcolors: true, items: this.client._bind(this.t_products) })
      .header_toolbar()
      .overflow_toolbar()
      .title({ text: `Products`, level: `H2` })
      .get_parent()
      .get_parent()
      .columns()
      .column(`12em`)
      .text(`Product`)
      .get_parent()
      .column({ minscreenwidth: `Tablet`, demandpopin: true })
      .text(`Supplier`)
      .get_parent()
      .column({ minscreenwidth: `Tablet`, demandpopin: true, halign: `End` })
      .text(`Dimensions`)
      .get_parent()
      .get_parent()
      .items()
      .column_list_item({ valign: `Middle` })
      .cells()
      .object_identifier({ title: `{NAME}`, text: `{PRODUCT_ID}` })
      .get_parent()
      .text(`{SUPPLIER_NAME}`)
      .text(`{WIDTH} x {DEPTH} x {HEIGHT} {DIM_UNIT}`);
    this.client.view_display(page.stringify());
  }
}

module.exports = z2ui5_cl_demo_app_482;
