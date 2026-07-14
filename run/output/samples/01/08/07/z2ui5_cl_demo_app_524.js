const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_524 extends z2ui5_if_app {
  supplier_name = ``;
  street = ``;
  house_number = ``;
  zip_code = ``;
  city = ``;
  country = ``;
  url = ``;
  twitter = ``;
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
    this.supplier_name = `Red Point Stores`;
    this.street = `Main St`;
    this.house_number = `1618`;
    this.zip_code = `31415`;
    this.city = `Maintown`;
    this.country = `Germany`;
    this.url = `http://www.sap.com`;
    this.twitter = `@sap`;
    this.view_display();
  }

  view_display() {
    const page = z2ui5_cl_xml_view.factory()
      .shell()
      .page({ title: `abap2UI5 - Sample: Fullscreen - with toolbar`, navbuttonpress: this.client._event_nav_app_leave(), shownavbutton: this.client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.ui.layout.form.SimpleForm/sample/sap.ui.layout.sample.SimpleFormToolbar` });
    const form = page.vbox(`sapUiSmallMargin`)
      .simple_form({ id: `SimpleFormToolbar`, editable: true, layout: `ResponsiveGridLayout`, labelspanxl: `4`, labelspanl: `3`, labelspanm: `4`, labelspans: `12`, adjustlabelspan: false, emptyspanxl: `0`, emptyspanl: `4`, emptyspanm: `0`, emptyspans: `0`, columnsxl: `2`, columnsl: `1`, columnsm: `1`, singlecontainerfullsize: false })
      ._generic_property({ n: `ariaLabelledBy`, v: `Title1` });
    form.form_toolbar()
      .toolbar({ id: `TB1` })
      .title({ id: `Title1`, text: `Address` })
      .toolbar_spacer()
      .button({ icon: `sap-icon://settings` })
      .button({ icon: `sap-icon://drop-down-list` });
    const content = form.content(`form`);
    content.toolbar()
      ._generic_property({ n: `ariaLabelledBy`, v: `Title2` })
      .title({ id: `Title2`, text: `Office` })
      .toolbar_spacer()
      .button({ icon: `sap-icon://settings` });
    content.label(`Name`)
      .input(this.client._bind_edit(this.supplier_name))
      .label(`Street/No.`)
      .input(this.client._bind_edit(this.street));
    content.input(this.client._bind_edit(this.house_number)).get().layout_data().grid_data(`XL2 L1 M3 S4`);
    content.label(`ZIP Code/City`);
    content.input(this.client._bind_edit(this.zip_code)).get().layout_data().grid_data(`XL2 L1 M3 S4`);
    content.input(this.client._bind_edit(this.city))
      .label(`Country`)
      .select({ id: `country`, selectedkey: this.client._bind_edit(this.country) })
      .items()
      .item({ text: `England`, key: `England` })
      .item({ text: `Germany`, key: `Germany` })
      .item({ text: `USA`, key: `USA` });
    content.toolbar()
      ._generic_property({ n: `ariaLabelledBy`, v: `Title3` })
      .title({ id: `Title3`, text: `Online` })
      .toolbar_spacer()
      .button({ icon: `sap-icon://settings` });
    content.label(`Web`)
      .input({ value: this.client._bind_edit(this.url), type: `Url` })
      .label(`Twitter`)
      .input(this.client._bind_edit(this.twitter));
    this.client.view_display(page.stringify());
  }
}

module.exports = z2ui5_cl_demo_app_524;
