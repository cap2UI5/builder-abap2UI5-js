const z2ui5_cl_ajson = require("abap2UI5/z2ui5_cl_ajson");
const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_401 extends z2ui5_if_app {
  t_products = [];
  t_products_all = [];
  t_categories = [];
  t_suppliers = [];
  client = null;
  t_range_category = [];
  t_range_supplier = [];

  async main(client) {
    this.client = z2ui5_cl_util.abap_copy(client);
    if (client.check_on_init()) {
      this.set_data();
      this.view_display();
    } else if (client.check_on_event(`RESET`)) {
      this.t_range_category = {};
      this.t_range_supplier = {};
      this.t_products = z2ui5_cl_util.abap_copy(this.t_products_all);
      client.view_model_update();
    } else if (client.check_on_event(`LIST_CLOSE_CATEGORY`)) {
      this.on_event_list_close({ facet: `CATEGORY` });
    } else if (client.check_on_event(`LIST_CLOSE_SUPPLIER`)) {
      this.on_event_list_close({ facet: `SUPPLIER` });
    }
  }

  set_data() {
    this.t_products = [{ name: `Comfort Easy`, category: `Accessories`, supplier_name: `Technocom`, dimensions: `84 x 1.5 x 14 cm`, weight_measure: `0.2`, weight_unit: `KG`, weight_state: `Success`, price: `1679.00`, currency_code: `EUR` }, { name: `Comfort Senior`, category: `Accessories`, supplier_name: `Technocom`, dimensions: `80 x 1.6 x 13 cm`, weight_measure: `0.8`, weight_unit: `KG`, weight_state: `Success`, price: `512.00`, currency_code: `EUR` }, { name: `Ergo Screen E-I`, category: `Flat Screen Monitors`, supplier_name: `Very Best Screens`, dimensions: `37 x 12 x 36 cm`, weight_measure: `21`, weight_unit: `KG`, weight_state: `Error`, price: `230.00`, currency_code: `EUR` }, { name: `ITelO Vault`, category: `Accessories`, supplier_name: `Technocom`, dimensions: `32 x 22 x 3 cm`, weight_measure: `0.2`, weight_unit: `KG`, weight_state: `Success`, price: `299.00`, currency_code: `EUR` }, { name: `ITelO Vault Net`, category: `Accessories`, supplier_name: `Technocom`, dimensions: `10 x 1.8 x 17 cm`, weight_measure: `0.16`, weight_unit: `KG`, weight_state: `Success`, price: `459.00`, currency_code: `EUR` }, { name: `ITelO Vault SAT`, category: `Accessories`, supplier_name: `Technocom`, dimensions: `11 x 1.7 x 18 cm`, weight_measure: `0.18`, weight_unit: `KG`, weight_state: `Success`, price: `149.00`, currency_code: `EUR` }, { name: `Notebook Basic 15`, category: `Laptops`, supplier_name: `Very Best Screens`, dimensions: `30 x 18 x 3 cm`, weight_measure: `4.2`, weight_unit: `KG`, weight_state: `Warning`, price: `956.00`, currency_code: `EUR` }, { name: `Notebook Basic 17`, category: `Laptops`, supplier_name: `Very Best Screens`, dimensions: `29 x 17 x 3.1 cm`, weight_measure: `4.5`, weight_unit: `KG`, weight_state: `Warning`, price: `1249.00`, currency_code: `EUR` }, { name: `Notebook Basic 19`, category: `Laptops`, supplier_name: `Smartcards`, dimensions: `32 x 21 x 4 cm`, weight_measure: `4.2`, weight_unit: `KG`, weight_state: `Warning`, price: `1650.00`, currency_code: `EUR` }, { name: `Notebook Professional 15`, category: `Accessories`, supplier_name: `Very Best Screens`, dimensions: `33 x 20 x 3 cm`, weight_measure: `4.3`, weight_unit: `KG`, weight_state: `Warning`, price: `1999.00`, currency_code: `EUR` }];
    this.t_products.sort((a, b) => ((a.name > b.name ? 1 : a.name < b.name ? -1 : 0)));
    this.t_products_all = z2ui5_cl_util.abap_copy(this.t_products);
    this.t_categories = [{ text: `Accessories`, count: 6 }, { text: `Flat Screen Monitors`, count: 1 }, { text: `Laptops`, count: 3 }];
    this.t_suppliers = [{ text: `Smartcards`, count: 1 }, { text: `Technocom`, count: 5 }, { text: `Very Best Screens`, count: 4 }];
  }

  view_display() {
    const view = z2ui5_cl_xml_view.factory();
    const page = view.shell()
      .page({ title: `abap2UI5 - Sample: Facet Filter - Light`, navbuttonpress: this.client._event_nav_app_leave(), shownavbutton: this.client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.m.FacetFilter/sample/sap.m.sample.FacetFilterLight` });
    const vbox = page.vbox({ id: `idVBox` });
    vbox.facet_filter({ id: `idFacetFilter`, type: `Light`, showpersonalization: true, showreset: true, reset: this.client._event(`RESET`) })
      .facet_filter_list({ title: `Category`, key: `Category`, mode: `MultiSelect`, listclose: this.client._event(`LIST_CLOSE_CATEGORY`, [`$event.mParameters.selectedItems`]), items: this.client._bind(this.t_categories) })
      .facet_filter_item({ text: `{TEXT}`, key: `{TEXT}`, counter: `{COUNT}` })
      .get_parent()
      .get_parent()
      .facet_filter_list({ title: `SupplierName`, key: `SupplierName`, mode: `MultiSelect`, listclose: this.client._event(`LIST_CLOSE_SUPPLIER`, [`$event.mParameters.selectedItems`]), items: this.client._bind(this.t_suppliers) })
      .facet_filter_item({ text: `{TEXT}`, key: `{TEXT}`, counter: `{COUNT}` });
    const tab = vbox.table({ id: `idProductsTable`, inset: false, items: this.client._bind(this.t_products) });
    tab.header_toolbar().overflow_toolbar().title({ text: `Products`, level: `H2` }).toolbar_spacer();
    const columns = tab.columns();
    columns.column(`12em`).text(`Product`);
    columns.column({ minscreenwidth: `Tablet`, demandpopin: true }).text(`Supplier`);
    columns.column({ minscreenwidth: `Desktop`, demandpopin: true, halign: `End` }).text(`Dimensions`);
    columns.column({ minscreenwidth: `Desktop`, demandpopin: true, halign: `Center` }).text(`Weight`);
    columns.column({ halign: `End` }).text(`Price`);
    const cells = tab.items().column_list_item({ valign: `Middle` }).cells();
    cells.object_identifier({ title: `{NAME}`, text: `{CATEGORY}` }).get_parent();
    cells.text(`{SUPPLIER_NAME}`);
    cells.text(`{DIMENSIONS}`);
    cells.object_number({ number: `{WEIGHT_MEASURE}`, unit: `{WEIGHT_UNIT}`, state: `{WEIGHT_STATE}` });
    cells.object_number({ number: `{PRICE}`, unit: `{CURRENCY_CODE}` });
    this.client.view_display(view.stringify());
  }

  on_event_list_close({ facet } = {}) {
    let sy_tabix = 0;
    let t_arg;
    let json;
    let t_range = [];
    try {
      t_arg = this.client.get().T_EVENT_ARG;
      json = z2ui5_cl_ajson.parse(t_arg[(1) - 1]);
      sy_tabix = 0;
      for (const member of json.members(`/`)) {
        sy_tabix++;
        t_range.push({ sign: `I`, option: `EQ`, low: json.get(`/${member}/mProperties/text`) });
      }
    } catch (error) {
    }
    if (facet === `CATEGORY`) {
      this.t_range_category = z2ui5_cl_util.abap_copy(t_range);
    } else {
      this.t_range_supplier = z2ui5_cl_util.abap_copy(t_range);
    }
    this.t_products = z2ui5_cl_util.abap_copy(this.t_products_all);
    for (let _i = this.t_products.length - 1; _i >= 0; _i--) { const row = this.t_products[_i]; if (!((($v, $r) => !$r || !$r.length || $r.some(($x) => ($x.option === `BT` ? $v >= $x.low && $v <= $x.high : $x.option === `NE` ? $v !== $x.low : $x.option === `CP` ? String($v).includes(String($x.low).replace(/\*/g, "")) : $v === $x.low)))(row.category, this.t_range_category)) || !((($v, $r) => !$r || !$r.length || $r.some(($x) => ($x.option === `BT` ? $v >= $x.low && $v <= $x.high : $x.option === `NE` ? $v !== $x.low : $x.option === `CP` ? String($v).includes(String($x.low).replace(/\*/g, "")) : $v === $x.low)))(row.supplier_name, this.t_range_supplier))) this.t_products.splice(_i, 1); }
    this.client.view_model_update();
  }
}

module.exports = z2ui5_cl_demo_app_401;
