const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_440 extends z2ui5_if_app {
  t_products = [];

  view_display({ client } = {}) {
    const page = z2ui5_cl_xml_view.factory()
      .shell()
      .page({ title: `abap2UI5 - Sample: Link - Emphasized`, navbuttonpress: client._event_nav_app_leave(), shownavbutton: client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.m.Link/sample/sap.m.sample.LinkEmphasized` });
    const tab = page.table({ id: `idProductsTable`, inset: false, items: client._bind(this.t_products) });
    tab.header_toolbar().toolbar().title({ text: `Products`, level: `H2` });
    tab.columns()
      .column(`12em`)
      .text(`Product`)
      .get_parent()
      .column({ minscreenwidth: `Tablet`, demandpopin: true })
      .text(`Supplier`)
      .get_parent()
      .column({ minscreenwidth: `Tablet`, demandpopin: true, halign: `End` })
      .text(`Dimensions`)
      .get_parent()
      .column({ minscreenwidth: `Tablet`, demandpopin: true, halign: `End` })
      .text(`Weight`)
      .get_parent()
      .column({ halign: `End` })
      .text(`Price`);
    tab.items()
      .column_list_item()
      .cells()
      .link({ text: `{PRODUCT_ID}`, emphasized: true, href: `{PIC_URL}` })
      .text(`{SUPPLIER_NAME}`)
      .text(`{WIDTH} x {DEPTH} x {HEIGHT} {DIM_UNIT}`)
      .object_number({ number: `{WEIGHT_MEASURE}`, unit: `{WEIGHT_UNIT}` })
      .object_number({ number: `{PRICE}`, unit: `{CURRENCY_CODE}` });
    client.view_display(page.stringify());
  }

  async main(client) {
    if (client.check_on_init()) {
      this.t_products = [{ product_id: `HT-1000`, name: `Notebook Basic 15`, supplier_name: `Very Best Screens`, width: `30`, depth: `18`, height: `3`, dim_unit: `cm`, weight_measure: `4.2`, weight_unit: `KG`, price: `956.00`, currency_code: `EUR`, pic_url: `https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1000.jpg` }, { product_id: `HT-1001`, name: `Notebook Basic 17`, supplier_name: `Very Best Screens`, width: `29`, depth: `17`, height: `3.1`, dim_unit: `cm`, weight_measure: `4.5`, weight_unit: `KG`, price: `1249.00`, currency_code: `EUR`, pic_url: `https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1001.jpg` }, { product_id: `HT-1003`, name: `Notebook Basic 19`, supplier_name: `Smartcards`, width: `32`, depth: `21`, height: `4`, dim_unit: `cm`, weight_measure: `4.2`, weight_unit: `KG`, price: `1650.00`, currency_code: `EUR`, pic_url: `https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1003.jpg` }, { product_id: `HT-1007`, name: `ITelO Vault`, supplier_name: `Technocom`, width: `32`, depth: `22`, height: `3`, dim_unit: `cm`, weight_measure: `0.2`, weight_unit: `KG`, price: `299.00`, currency_code: `EUR`, pic_url: `https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1007.jpg` }, { product_id: `HT-1010`, name: `Notebook Professional 15`, supplier_name: `Very Best Screens`, width: `33`, depth: `20`, height: `3`, dim_unit: `cm`, weight_measure: `4.3`, weight_unit: `KG`, price: `1999.00`, currency_code: `EUR`, pic_url: `https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1010.jpg` }, { product_id: `HT-1020`, name: `ITelO Vault Net`, supplier_name: `Technocom`, width: `10`, depth: `1.8`, height: `17`, dim_unit: `cm`, weight_measure: `0.16`, weight_unit: `KG`, price: `459.00`, currency_code: `EUR`, pic_url: `https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1020.jpg` }];
      this.t_products.sort((a, b) => ((a.name > b.name ? 1 : a.name < b.name ? -1 : 0)));
      this.view_display({ client: client });
    }
  }
}

module.exports = z2ui5_cl_demo_app_440;
