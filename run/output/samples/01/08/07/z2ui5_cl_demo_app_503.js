const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_503 extends z2ui5_if_app {
  amount = 0;
  currency = ``;
  client = null;

  async main(client) {
    this.client = z2ui5_cl_util.abap_copy(client);
    if (client.check_on_init()) {
      this.amount = `123456789.123`;
      this.currency = `USD`;
      this.view_display();
    }
  }

  view_display() {
    const amount_path = this.client._bind_edit(this.amount, { path: true });
    const currency_path = this.client._bind_edit(this.currency, { path: true });
    const parts = `parts: [ '${amount_path}', '${currency_path}' ], type: 'sap.ui.model.type.Currency'`;
    const page = z2ui5_cl_xml_view.factory()
      .shell()
      .page({ title: `abap2UI5 - Sample: Currency Format`, navbuttonpress: this.client._event_nav_app_leave(), shownavbutton: this.client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.ui.model.type.Currency/sample/sap.ui.core.sample.TypeCurrency` });
    page.simple_form({ title: `Input`, editable: true, width: `auto`, class: `sapUiResponsiveMargin`, layout: `ResponsiveGridLayout`, labelspanl: `3`, labelspanm: `3`, emptyspanl: `4`, emptyspanm: `4`, columnsl: `1`, columnsm: `1` })
      .content(`form`)
      .label(`One field`)
      .input(`{ ${parts} }`)
      .label(`Two field`)
      .input(`{ ${parts}, formatOptions: { showMeasure: false } }`)
      .input(`{ ${parts}, formatOptions: { showNumber: false } }`);
    page.simple_form({ title: `Format options`, width: `auto`, class: `sapUiResponsiveMargin`, layout: `ResponsiveGridLayout`, labelspanl: `3`, labelspanm: `3`, emptyspanl: `4`, emptyspanm: `4`, columnsl: `1`, columnsm: `1` })
      .content(`form`)
      .label(`Default`)
      .text(`{ ${parts} }`)
      .label(`currencyCode:false`)
      .text(`{ ${parts}, formatOptions: { currencyCode: false } }`)
      .label(`style:'short'`)
      .text(`{ ${parts}, formatOptions: { style: 'short' } }`)
      .label(`style:'long'`)
      .text(`{ ${parts}, formatOptions: { style: 'long' } }`);
    this.client.view_display(page.stringify());
  }
}

module.exports = z2ui5_cl_demo_app_503;
