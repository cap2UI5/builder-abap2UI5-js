const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_515 extends z2ui5_if_app {
  t_products = [];

  view_display({ client } = {}) {
    const page = z2ui5_cl_xml_view.factory()
      .shell()
      .page({ title: `abap2UI5 - Sample: Fix Flex - Vertical Direction with minFlexSize`, navbuttonpress: client._event_nav_app_leave(), shownavbutton: client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.ui.layout.FixFlex/sample/sap.ui.layout.sample.FixFlexMinFlexSize` });
    const layout = page.fix_flex({ ns: `layout` });
    layout._generic_property({ n: `minFlexSize`, v: `400` });
    const header = layout.fix_content(`layout`)
      .object_header({ responsive: true, fullscreenoptimized: true, intro: `Notebook Basic 15 with 2,80 GHz quad core, 15" LCD, 4 GB DDR3 RAM, 500 GB Hard Disc, Windows 8 Pro`, title: `Long title truncated to 80 chars on all devices and to 50 chars on phone portrait`, number: `956.00`, numberunit: `EUR`, numberstate: `Success`, backgrounddesign: `Translucent` });
    header.attributes().object_attribute({ title: `Manufacturer`, text: `Very Best Screens` });
    header.statuses().object_status({ title: `Approval`, text: `Pending`, state: `Warning` });
    const markers = header.markers();
    markers.object_marker({ type: `Flagged` });
    markers.object_marker({ type: `Favorite` });
    const products_table = layout.flex_content(`layout`)
      .table({ id: `idProductsTable`, items: client._bind(this.t_products), growing: true, growingthreshold: `50` });
    products_table.header_toolbar().overflow_toolbar().title({ text: `Products`, level: `H2` });
    products_table.columns()
      .column(`12em`)
      .text(`Product`)
      .get_parent()
      .column({ minscreenwidth: `Tablet`, demandpopin: true })
      .text(`Supplier`)
      .get_parent()
      .column({ minscreenwidth: `Tablet`, demandpopin: true, halign: `Right` })
      .text(`Dimensions`)
      .get_parent()
      .column({ minscreenwidth: `Tablet`, demandpopin: true, halign: `Center` })
      .text(`Weight`)
      .get_parent()
      .column({ halign: `Right` })
      .text(`Price`);
    products_table.items()
      .column_list_item()
      .cells()
      .object_identifier({ title: `{NAME}`, text: `{PRODUCT_ID}` })
      .get_parent()
      .text(`{SUPPLIER_NAME}`)
      .text(`{DIMENSIONS}`)
      .object_number({ number: `{WEIGHT_MEASURE}`, unit: `{WEIGHT_UNIT}` })
      .object_number({ number: `{PRICE}`, unit: `{CURRENCY_CODE}` });
    client.view_display(page.stringify());
  }

  async main(client) {
    if (client.check_on_init()) {
      this.t_products = [{ name: `Notebook Basic 15`, product_id: `HT-1000`, supplier_name: `Very Best Screens`, dimensions: `30 x 18 x 3 cm`, weight_measure: `4.2`, weight_unit: `KG`, price: `956.00`, currency_code: `EUR` }, { name: `Notebook Basic 17`, product_id: `HT-1001`, supplier_name: `Very Best Screens`, dimensions: `29 x 17 x 3.1 cm`, weight_measure: `4.5`, weight_unit: `KG`, price: `1249.00`, currency_code: `EUR` }, { name: `Notebook Basic 18`, product_id: `HT-1002`, supplier_name: `Very Best Screens`, dimensions: `28 x 19 x 2.5 cm`, weight_measure: `4.2`, weight_unit: `KG`, price: `1570.00`, currency_code: `EUR` }, { name: `Notebook Basic 19`, product_id: `HT-1003`, supplier_name: `Smartcards`, dimensions: `32 x 21 x 4 cm`, weight_measure: `4.2`, weight_unit: `KG`, price: `1650.00`, currency_code: `EUR` }, { name: `ITelO Vault`, product_id: `HT-1007`, supplier_name: `Technocom`, dimensions: `32 x 22 x 3 cm`, weight_measure: `0.2`, weight_unit: `KG`, price: `299.00`, currency_code: `EUR` }, { name: `Notebook Professional 15`, product_id: `HT-1010`, supplier_name: `Very Best Screens`, dimensions: `33 x 20 x 3 cm`, weight_measure: `4.3`, weight_unit: `KG`, price: `1999.00`, currency_code: `EUR` }, { name: `Notebook Professional 17`, product_id: `HT-1011`, supplier_name: `Very Best Screens`, dimensions: `33 x 23 x 2 cm`, weight_measure: `4.1`, weight_unit: `KG`, price: `2299.00`, currency_code: `EUR` }, { name: `ITelO Vault Net`, product_id: `HT-1020`, supplier_name: `Technocom`, dimensions: `10 x 1.8 x 17 cm`, weight_measure: `0.16`, weight_unit: `KG`, price: `459.00`, currency_code: `EUR` }, { name: `ITelO Vault SAT`, product_id: `HT-1021`, supplier_name: `Technocom`, dimensions: `11 x 1.7 x 18 cm`, weight_measure: `0.18`, weight_unit: `KG`, price: `149.00`, currency_code: `EUR` }, { name: `Comfort Easy`, product_id: `HT-1022`, supplier_name: `Technocom`, dimensions: `84 x 1.5 x 14 cm`, weight_measure: `0.2`, weight_unit: `KG`, price: `1679.00`, currency_code: `EUR` }];
      this.t_products.sort((a, b) => ((a.name > b.name ? 1 : a.name < b.name ? -1 : 0)));
      this.view_display({ client: client });
    }
  }
}

module.exports = z2ui5_cl_demo_app_515;
