const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_497 extends z2ui5_if_app {
  s_product1 = {};
  s_product2 = {};
  client = null;

  async main(client) {
    this.client = z2ui5_cl_util.abap_copy(client);
    if (client.check_on_init()) {
      this.s_product1 = { name: `Notebook Basic 15`, price: `956`, currency_code: `EUR`, weight: `4.2 KG`, dimensions: `30 x 18 x 3 cm`, description: `Notebook Basic 15 with 2,80 GHz quad core, 15" LCD, 4 GB DDR3 RAM, 500 GB Hard Disc, Windows 8 Pro` };
      this.s_product2 = { name: `Notebook Basic 17`, price: `1249`, currency_code: `EUR`, weight: `4.5 KG`, dimensions: `29 x 17 x 3.1 cm`, description: `Notebook Basic 17 with 2,80 GHz quad core, 17" LCD, 4 GB DDR3 RAM, 500 GB Hard Disc, Windows 8 Pro` };
      this.view_display();
    }
  }

  view_display() {
    const number1 = `{ parts: [ '${this.client._bind(this.s_product1.price, { name: `s_product1-price`, path: true })}', '${this.client._bind(this.s_product1.currency_code, { name: `s_product1-currency_code`, path: true })}' ],` + ` type: 'sap.ui.model.type.Currency', formatOptions: { showMeasure: false } }`;
    const number2 = `{ parts: [ '${this.client._bind(this.s_product2.price, { name: `s_product2-price`, path: true })}', '${this.client._bind(this.s_product2.currency_code, { name: `s_product2-currency_code`, path: true })}' ],` + ` type: 'sap.ui.model.type.Currency', formatOptions: { showMeasure: false } }`;
    const page = z2ui5_cl_xml_view.factory()
      .shell()
      .page({ title: `abap2UI5 - Sample: Remove Margins`, navbuttonpress: this.client._event_nav_app_leave(), shownavbutton: this.client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.ui.core.StandardMargins/sample/sap.m.sample.StandardNoMargins` });
    page.text(`ObjectHeader with its top and end margins removed:`);
    page.object_header({ title: this.client._bind(this.s_product1.name, { name: `s_product1-name` }), number: number1, numberunit: this.client._bind(this.s_product1.currency_code, { name: `s_product1-currency_code` }), class: `sapUiNoMarginTop sapUiNoMarginEnd` })
      ._generic(`statuses`)
      .object_status({ text: `Some Damaged`, state: `Error` })
      .get_parent()
      .object_status({ text: `In Stock`, state: `Success` })
      .get_parent()
      .get_parent()
      ._generic(`attributes`)
      .object_attribute({ text: this.client._bind(this.s_product1.weight, { name: `s_product1-weight` }) })
      .object_attribute({ text: this.client._bind(this.s_product1.dimensions, { name: `s_product1-dimensions` }) })
      .object_attribute({ text: this.client._bind(this.s_product1.description, { name: `s_product1-description` }) })
      .object_attribute({ text: `www.sap.com`, active: true });
    page.text(`ObjectHeader with its bottom and begin margins removed:`);
    page.object_header({ title: this.client._bind(this.s_product2.name, { name: `s_product2-name` }), number: number2, numberunit: this.client._bind(this.s_product2.currency_code, { name: `s_product2-currency_code` }), class: `sapUiNoMarginBottom sapUiNoMarginBegin` })
      ._generic(`statuses`)
      .object_status({ text: `Some Damaged`, state: `Error` })
      .get_parent()
      .object_status({ text: `In Stock`, state: `Success` })
      .get_parent()
      .get_parent()
      ._generic(`attributes`)
      .object_attribute({ text: this.client._bind(this.s_product2.weight, { name: `s_product2-weight` }) })
      .object_attribute({ text: this.client._bind(this.s_product2.dimensions, { name: `s_product2-dimensions` }) })
      .object_attribute({ text: this.client._bind(this.s_product2.description, { name: `s_product2-description` }) })
      .object_attribute({ text: `www.sap.com`, active: true });
    page.text(`By default, ObjectHeader instances come with a 16px (1rem) margin all around. In our example, we added pre-defined css classes ` + `'sapUiNoMarginTop' and 'sapUiNoMarginEnd' to remove the top and right margin from the first ObjectHeader and 'sapUiNoMarginBottom' ` + `and 'sapUiNoMarginBegin' to remove the bottom and left margin from the second ObjectHeader(in left-to-right mode). To see what happens ` + `in Right-To-Left mode open 'Settings' by pressing the cog wheel button next to 'Entities'.`);
    this.client.view_display(page.stringify());
  }
}

module.exports = z2ui5_cl_demo_app_497;
