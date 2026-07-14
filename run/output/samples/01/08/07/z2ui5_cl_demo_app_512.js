const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_512 extends z2ui5_if_app {
  t_products = [];
  slider_value = ``;
  selected_background = ``;
  client = null;

  async main(client) {
    this.client = z2ui5_cl_util.abap_copy(client);
    if (client.check_on_init()) {
      this.on_init();
    }
  }

  on_init() {
    this.slider_value = `100`;
    this.selected_background = `Default`;
    this.t_products = [{ product_id: `HT-1000`, name: `Notebook Basic 15`, supplier_name: `Very Best Screens`, width: `30`, depth: `18`, height: `3`, dim_unit: `cm`, weight_measure: `4.2`, weight_unit: `KG`, price: `956`, currency_code: `EUR` }, { product_id: `HT-1001`, name: `Notebook Basic 17`, supplier_name: `Very Best Screens`, width: `29`, depth: `17`, height: `3.1`, dim_unit: `cm`, weight_measure: `4.5`, weight_unit: `KG`, price: `1249`, currency_code: `EUR` }, { product_id: `HT-1002`, name: `Notebook Basic 18`, supplier_name: `Very Best Screens`, width: `28`, depth: `19`, height: `2.5`, dim_unit: `cm`, weight_measure: `4.2`, weight_unit: `KG`, price: `1570`, currency_code: `EUR` }, { product_id: `HT-1003`, name: `Notebook Basic 19`, supplier_name: `Smartcards`, width: `32`, depth: `21`, height: `4`, dim_unit: `cm`, weight_measure: `4.2`, weight_unit: `KG`, price: `1650`, currency_code: `EUR` }, { product_id: `HT-1007`, name: `ITelO Vault`, supplier_name: `Technocom`, width: `32`, depth: `22`, height: `3`, dim_unit: `cm`, weight_measure: `0.2`, weight_unit: `KG`, price: `299`, currency_code: `EUR` }, { product_id: `HT-1010`, name: `Notebook Professional 15`, supplier_name: `Very Best Screens`, width: `33`, depth: `20`, height: `3`, dim_unit: `cm`, weight_measure: `4.3`, weight_unit: `KG`, price: `1999`, currency_code: `EUR` }, { product_id: `HT-1011`, name: `Notebook Professional 17`, supplier_name: `Very Best Screens`, width: `33`, depth: `23`, height: `2`, dim_unit: `cm`, weight_measure: `4.1`, weight_unit: `KG`, price: `2299`, currency_code: `EUR` }, { product_id: `HT-1020`, name: `ITelO Vault Net`, supplier_name: `Technocom`, width: `10`, depth: `1.8`, height: `17`, dim_unit: `cm`, weight_measure: `0.16`, weight_unit: `KG`, price: `459`, currency_code: `EUR` }];
    this.t_products.sort((a, b) => ((a.name > b.name ? 1 : a.name < b.name ? -1 : 0)));
    this.view_display();
  }

  view_display() {
    const lorem = `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, ` + `sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est ` + `Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr.`;
    const lorem_short = `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, ` + `sed diam voluptua.`;
    const view = z2ui5_cl_xml_view.factory();
    const page = view.shell()
      .page({ title: `abap2UI5 - Sample: Block Layout`, navbuttonpress: this.client._event_nav_app_leave(), shownavbutton: this.client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.ui.layout.BlockLayout/sample/sap.ui.layout.sample.BlockLayoutDefault` });
    const form_content = page.simple_form({ editable: true, backgrounddesign: `Transparent`, layout: `ColumnLayout` })
      .content(`form`);
    form_content.label(`Parent width`);
    form_content.slider({ value: this.client._bind_edit(this.slider_value) });
    form_content.label(`Background`);
    form_content.segmented_button(this.client._bind_edit(this.selected_background))
      .items()
      .segmented_button_item({ key: `Default`, text: `Default` })
      .segmented_button_item({ key: `Light`, text: `Light` })
      .segmented_button_item({ key: `Accent`, text: `Accent` })
      .segmented_button_item({ key: `Dashboard`, text: `Dashboard` });
    const layout = page.vertical_layout({ id: `containerLayout`, width: `{= $` + this.client._bind_edit(this.slider_value) + ` + '%' }` });
    const block_layout = layout.block_layout({ id: `BlockLayout`, background: this.client._bind_edit(this.selected_background) });
    const row_accent1 = block_layout.block_layout_row();
    row_accent1._generic_property({ n: `accentCells`, v: `Accent1` });
    const cell_accent1 = row_accent1.block_layout_cell({ id: `Accent1`, width: `2`, title: `Left aligned heading` });
    cell_accent1.text(lorem);
    const radio_group = cell_accent1.radio_button_group({ columns: `2`, selectedindex: `2`, class: `sapUiMediumMarginTop` });
    radio_group.radio_button({ id: `RB2-1`, text: `Option 1` });
    radio_group.radio_button({ id: `RB2-2`, text: `Option 2`, editable: false });
    radio_group.radio_button({ id: `RB2-3`, text: `Option 3` });
    row_accent1.block_layout_cell({ title: `25% width cell` }).text(lorem);
    row_accent1.block_layout_cell({ titlealignment: `End`, title: `End aligned heading` }).text(lorem_short);
    const row_two_cells = block_layout.block_layout_row();
    row_two_cells.block_layout_cell({ title: `50% width cell` }).text(lorem);
    const cell_feed = row_two_cells.block_layout_cell({ title: `50% width cell` });
    cell_feed.feed_input({ showicon: true });
    cell_feed.feed_input({ showicon: true });
    const row_scrollable = block_layout.block_layout_row();
    row_scrollable._generic_property({ n: `scrollable`, v: `true` });
    row_scrollable.block_layout_cell({ width: `50`, title: `Cell inside scrollable row` }).text(lorem);
    row_scrollable.block_layout_cell({ width: `100`, title: `Centered Heading`, titlealignment: `Center` })
      .text(`Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore`);
    row_scrollable.block_layout_cell().text(lorem);
    row_scrollable.block_layout_cell({ width: `90` }).text(lorem);
    row_scrollable.block_layout_cell().text(lorem);
    row_scrollable.block_layout_cell().text(lorem);
    const row_form = block_layout.block_layout_row();
    const cell_form = row_form.block_layout_cell({ title: `75% width cell`, width: `3` });
    cell_form.simple_form({ editable: true, backgrounddesign: `Transparent`, layout: `ResponsiveGridLayout` })
      .content(`form`)
      .label(`Name on card`)
      .input()
      .label(`Card number`)
      .input()
      .label(`Security code`)
      .input()
      .label(`Expiration date`)
      .date_picker();
    cell_form.text(lorem);
    row_form.block_layout_cell({ title: `25% width cell` }).text(lorem);
    const row_quarters = block_layout.block_layout_row();
    for (let sy_index = 1; sy_index <= 4; sy_index++) {
      row_quarters.block_layout_cell({ title: `25% width cell` }).text(lorem);
    }
    for (let sy_index = 1; sy_index <= 3; sy_index++) {
      block_layout.block_layout_row().block_layout_cell().text(lorem);
    }
    const row_accent2 = block_layout.block_layout_row();
    row_accent2._generic_property({ n: `accentCells`, v: `Accent2` });
    const cell_accent2 = row_accent2.block_layout_cell({ id: `Accent2` });
    cell_accent2.message_strip(`You can use the cells with 100% width, if you set the vertical property of the row to true`);
    cell_accent2.text(lorem);
    const row_accent3 = block_layout.block_layout_row();
    row_accent3._generic_property({ n: `accentCells`, v: `Accent3` });
    const table = row_accent3.block_layout_cell({ id: `Accent3` })
      .table({ id: `idProductsTable`, inset: false, items: this.client._bind(this.t_products) });
    const columns = table.columns();
    columns.column(`12em`).text(`Product`);
    columns.column({ minscreenwidth: `Tablet`, demandpopin: true }).text(`Supplier`);
    columns.column({ minscreenwidth: `Tablet`, demandpopin: true, halign: `Right` }).text(`Dimensions`);
    columns.column({ minscreenwidth: `Tablet`, demandpopin: true, halign: `Center` }).text(`Weight`);
    columns.column({ halign: `Right` }).text(`Price`);
    const cells = table.items().column_list_item().cells();
    cells.object_identifier({ title: `{NAME}`, text: `{PRODUCT_ID}` });
    cells.text(`{SUPPLIER_NAME}`);
    cells.text(`{WIDTH} x {DEPTH} x {HEIGHT} {DIM_UNIT}`);
    cells.object_number({ number: `{WEIGHT_MEASURE}`, unit: `{WEIGHT_UNIT}` });
    cells.object_number({ number: `{ parts:[{path:'PRICE'},{path:'CURRENCY_CODE'}], type: 'sap.ui.model.type.Currency' }`, unit: `{CURRENCY_CODE}` });
    this.client.view_display(view.stringify());
  }
}

module.exports = z2ui5_cl_demo_app_512;
