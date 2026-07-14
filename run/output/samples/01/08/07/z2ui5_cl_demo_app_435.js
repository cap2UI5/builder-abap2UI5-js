const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_435 extends z2ui5_if_app {
  t_products = [];

  view_display({ client } = {}) {
    const page = z2ui5_cl_xml_view.factory()
      .shell()
      .page({ title: `abap2UI5 - Sample: Input - Assisted Tabular Suggestions`, navbuttonpress: client._event_nav_app_leave(), shownavbutton: client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.m.Input/sample/sap.m.sample.InputAssistedTabularSuggestions` });
    const layout = page.vertical_layout({ class: `sapUiContentPadding`, width: `100%` });
    layout.label({ text: `Tabular suggestions with default configuration.`, labelfor: `productInput` });
    const input1 = layout.input({ id: `productInput`, placeholder: `Enter product`, showsuggestion: true, showtablesuggestionvaluehelp: false, suggestionrows: client._bind(this.t_products) })
      .get();
    input1.suggestion_columns()
      .column()
      .label(`Name`)
      .get_parent()
      .column({ halign: `Center` })
      .label(`Product ID`)
      .get_parent()
      .column({ halign: `Center` })
      .label(`Supplier Name`)
      .get_parent()
      .column({ halign: `End` })
      .label(`Price`);
    input1.suggestion_rows()
      .column_list_item()
      .cells()
      .label(`{NAME}`)
      .label(`{PRODUCT_ID}`)
      .label(`{SUPPLIER_NAME}`)
      .label(`{PRICE} {CURRENCY_CODE}`);
    layout.label({ text: `Tabular suggestions with enableTableAutoPopinMode="true"`, labelfor: `popinTableInput` });
    const input2 = layout.input({ id: `popinTableInput`, placeholder: `Enter product`, showsuggestion: true, showtablesuggestionvaluehelp: false, suggestionrows: client._bind(this.t_products) })
      .get();
    input2.suggestion_columns()
      .column(`20rem`)
      .label(`Name`)
      .get_parent()
      .column({ width: `10rem`, halign: `Center` })
      .label(`Product ID`)
      .get_parent()
      .column({ width: `10rem`, halign: `Center` })
      .label(`Supplier Name`)
      .get_parent()
      .column({ width: `10rem`, halign: `End` })
      .label(`Price`);
    input2.suggestion_rows()
      .column_list_item()
      .cells()
      .label(`{NAME}`)
      .label(`{PRODUCT_ID}`)
      .label(`{SUPPLIER_NAME}`)
      .label(`{PRICE} {CURRENCY_CODE}`);
    layout.label({ text: `Tabular suggestions with custom column popin configuration`, labelfor: `customPopinTableInput` });
    const input3 = layout.input({ id: `customPopinTableInput`, placeholder: `Enter product`, showsuggestion: true, showtablesuggestionvaluehelp: false, suggestionrows: client._bind(this.t_products) })
      .get();
    input3.suggestion_columns()
      .column(`20rem`)
      .label(`Name`)
      .get_parent()
      .column(`10rem`)
      .label(`Product ID`)
      .get_parent()
      .column({ width: `10rem`, popindisplay: `Inline`, minscreenwidth: `Large`, demandpopin: true })
      .label(`Supplier Name`)
      .get_parent()
      .column({ width: `10rem`, popindisplay: `Inline`, minscreenwidth: `Large`, demandpopin: true })
      .label(`Price`);
    input3.suggestion_rows()
      .column_list_item()
      .cells()
      .label(`{NAME}`)
      .label(`{PRODUCT_ID}`)
      .label(`{SUPPLIER_NAME}`)
      .label(`{PRICE} {CURRENCY_CODE}`);
    client.view_display(page.stringify());
  }

  async main(client) {
    if (client.check_on_init()) {
      this.t_products = [{ name: `Notebook Basic 15`, product_id: `HT-1000`, supplier_name: `Very Best Screens`, price: `956.00`, currency_code: `EUR` }, { name: `Notebook Basic 17`, product_id: `HT-1001`, supplier_name: `Very Best Screens`, price: `1249.00`, currency_code: `EUR` }, { name: `Notebook Basic 18`, product_id: `HT-1002`, supplier_name: `Very Best Screens`, price: `1570.00`, currency_code: `EUR` }, { name: `Notebook Basic 19`, product_id: `HT-1003`, supplier_name: `Smartcards`, price: `1650.00`, currency_code: `EUR` }, { name: `ITelO Vault`, product_id: `HT-1007`, supplier_name: `Technocom`, price: `299.00`, currency_code: `EUR` }, { name: `Notebook Professional 15`, product_id: `HT-1010`, supplier_name: `Very Best Screens`, price: `1999.00`, currency_code: `EUR` }, { name: `Notebook Professional 17`, product_id: `HT-1011`, supplier_name: `Very Best Screens`, price: `2299.00`, currency_code: `EUR` }, { name: `ITelO Vault Net`, product_id: `HT-1020`, supplier_name: `Technocom`, price: `459.00`, currency_code: `EUR` }];
      this.view_display({ client: client });
    }
  }
}

module.exports = z2ui5_cl_demo_app_435;
