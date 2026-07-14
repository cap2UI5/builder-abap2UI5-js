const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_526 extends z2ui5_if_app {
  t_various_numbers = [];
  t_non_decimal = [];
  t_big_numbers = [];
  t_custom_currencies = [];
  client = null;

  async main(client) {
    this.client = z2ui5_cl_util.abap_copy(client);
    if (client.check_on_init()) {
      this.on_init();
    } else if (client.check_on_navigated()) {
      this.view_display();
    }
  }

  on_init() {
    this.t_various_numbers = [{ currency: `EUR`, price: `2300.12` }, { currency: `EUR`, price: `38` }, { currency: `JPY`, price: `1928472` }, { currency: `JPY`, price: `233.9385763` }, { currency: `USD`, price: `125.02` }, { currency: `USD`, price: `2125.02843` }, { currency: `TND`, price: `9283` }, { currency: `TND`, price: `235.0298` }];
    this.t_non_decimal = [{ currency: `JPY`, price: `2300.12` }, { currency: `JPY`, price: `38` }, { currency: `JPY`, price: `1928472` }, { currency: `JPY`, price: `233` }];
    this.t_big_numbers = [{ currency: `USD`, price: `12345678901234567890123` }, { currency: `USD`, price: `123456789012345678901.23` }];
    this.t_custom_currencies = [{ currency: `BGN4`, price: `123.4567` }, { currency: `WWWW`, price: `123.45676` }];
    this.view_display();
  }

  view_display() {
    const page = z2ui5_cl_xml_view.factory()
      .shell()
      .page({ title: `abap2UI5 - Sample: Currency`, navbuttonpress: this.client._event_nav_app_leave(), shownavbutton: this.client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.ui.unified.Currency/sample/sap.ui.unified.sample.Currency` });
    const layout_grid = page.grid(`XL7 L12 M12 S12`);
    layout_grid.list({ id: `listOneId`, headertext: `Various currencies with and without decimals`, items: this.client._bind(this.t_various_numbers) })
      .custom_list_item()
      .currency({ value: `{PRICE}`, currency: `{CURRENCY}`, usesymbol: false });
    layout_grid.list({ id: `listTwoId`, headertext: `Currency without decimals`, items: this.client._bind(this.t_non_decimal) })
      .custom_list_item()
      .currency({ value: `{PRICE}`, currency: `{CURRENCY}`, usesymbol: false });
    layout_grid.list({ id: `listThreeId`, headertext: `Currency without decimals using maxPrecision`, items: this.client._bind(this.t_non_decimal) })
      .custom_list_item()
      .currency({ value: `{PRICE}`, currency: `{CURRENCY}`, usesymbol: false, maxprecision: `0` });
    layout_grid.list({ id: `listFourId`, headertext: `Currency with really big numbers`, items: this.client._bind(this.t_big_numbers) })
      .custom_list_item()
      .currency({ stringvalue: `{PRICE}`, currency: `{CURRENCY}`, usesymbol: false });
    layout_grid.list({ id: `listFiveId`, headertext: `Custom currencies with decimals`, items: this.client._bind(this.t_custom_currencies) })
      .custom_list_item()
      .currency({ stringvalue: `{PRICE}`, currency: `{CURRENCY}`, usesymbol: false });
    layout_grid.list({ id: `listSixId`, headertext: `Different currencies with maxPrecision 3`, items: this.client._bind(this.t_various_numbers) })
      .custom_list_item()
      .currency({ stringvalue: `{PRICE}`, currency: `{CURRENCY}`, usesymbol: false, maxprecision: `3` });
    this.client.view_display(page.stringify());
  }
}

module.exports = z2ui5_cl_demo_app_526;
