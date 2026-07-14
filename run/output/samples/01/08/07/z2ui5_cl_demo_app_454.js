const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_454 extends z2ui5_if_app {
  t_products = [];

  view_display({ client } = {}) {
    const page = z2ui5_cl_xml_view.factory()
      .shell()
      .page({ title: `abap2UI5 - Sample: MultiInput`, navbuttonpress: client._event_nav_app_leave(), shownavbutton: client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.m.MultiInput/sample/sap.m.sample.MultiInput` });
    const layout = page.vertical_layout({ class: `sapUiContentPadding`, width: `100%` });
    layout.label({ text: `Enter a search term, e.g. “Notebook”, and add matching products as tokens`, width: `100%`, labelfor: `multiInput` });
    layout.multi_input({ id: `multiInput`, width: `70%`, suggestionitems: client._bind(this.t_products), placeholder: `Products...`, showvaluehelp: false })
      .suggestion_items()
      .item({ key: `{PRODUCT_ID}`, text: `{NAME}` });
    layout.label({ text: `MultiInput with pre-selected tokens`, labelfor: `multiInput1` });
    layout.multi_input({ id: `multiInput1`, showsuggestion: false, width: `70%`, showvaluehelp: false })
      .tokens()
      .token({ key: `0001`, text: `Token 1` })
      .token({ key: `0002`, text: `Token 2` })
      .token({ key: `0003`, text: `Token 3` })
      .token({ key: `0004`, text: `Token 4` })
      .token({ key: `0005`, text: `Token 5` })
      .token({ key: `0006`, text: `Token 6` });
    layout.label({ text: `MultiInput with single long token`, labelfor: `multiInput2` });
    layout.multi_input({ id: `multiInput2`, showsuggestion: false, width: `300px`, showvaluehelp: false })
      .tokens()
      .token({ key: `longText`, text: `Very long long long long long long long text` });
    client.view_display(page.stringify());
  }

  async main(client) {
    if (client.check_on_init()) {
      this.t_products = [{ product_id: `HT-1000`, name: `Notebook Basic 15` }, { product_id: `HT-1001`, name: `Notebook Basic 17` }, { product_id: `HT-1002`, name: `Notebook Basic 18` }, { product_id: `HT-1003`, name: `Notebook Basic 19` }, { product_id: `HT-1007`, name: `ITelO Vault` }, { product_id: `HT-1010`, name: `Notebook Professional 15` }, { product_id: `HT-1011`, name: `Notebook Professional 17` }, { product_id: `HT-1020`, name: `ITelO Vault Net` }, { product_id: `HT-1021`, name: `ITelO Vault SAT` }, { product_id: `HT-1022`, name: `Comfort Easy` }, { product_id: `HT-1023`, name: `Comfort Senior` }, { product_id: `HT-1030`, name: `Ergo Screen E-I` }, { product_id: `HT-1031`, name: `Ergo Screen E-II` }, { product_id: `HT-1032`, name: `Ergo Screen E-III` }, { product_id: `HT-1035`, name: `Flat Basic` }, { product_id: `HT-1036`, name: `Flat Future` }];
      this.t_products.sort((a, b) => ((a.name > b.name ? 1 : a.name < b.name ? -1 : 0)));
      this.view_display({ client: client });
    }
  }
}

module.exports = z2ui5_cl_demo_app_454;
