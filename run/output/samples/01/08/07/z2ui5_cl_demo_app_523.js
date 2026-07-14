const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_523 extends z2ui5_if_app {
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
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.ui.layout.form.Form/sample/sap.ui.layout.sample.FormToolbar` });
    const form = page.vbox(`sapUiSmallMargin`)
      ._generic({ name: `Form`, ns: `form`, t_prop: [{ n: `id`, v: `FormToolbar` }, { n: `editable`, v: `true` }, { n: `ariaLabelledBy`, v: `Title1` }] });
    form.form_toolbar()
      .toolbar({ id: `TB1` })
      .title({ id: `Title1`, text: `Address` })
      .toolbar_spacer()
      .button({ icon: `sap-icon://settings` })
      .button({ icon: `sap-icon://drop-down-list` });
    form._generic({ name: `layout`, ns: `form` })
      ._generic({ name: `ResponsiveGridLayout`, ns: `form`, t_prop: [{ n: `labelSpanXL`, v: `4` }, { n: `labelSpanL`, v: `3` }, { n: `labelSpanM`, v: `4` }, { n: `labelSpanS`, v: `12` }, { n: `adjustLabelSpan`, v: `false` }, { n: `emptySpanXL`, v: `0` }, { n: `emptySpanL`, v: `4` }, { n: `emptySpanM`, v: `0` }, { n: `emptySpanS`, v: `0` }, { n: `columnsXL`, v: `2` }, { n: `columnsL`, v: `1` }, { n: `columnsM`, v: `1` }, { n: `singleContainerFullSize`, v: `false` }] });
    const containers = form._generic({ name: `formContainers`, ns: `form` });
    const container_office = containers._generic({ name: `FormContainer`, ns: `form`, t_prop: [{ n: `ariaLabelledBy`, v: `Title2` }] });
    container_office.form_toolbar()
      .toolbar()
      .title({ id: `Title2`, text: `Office` })
      .toolbar_spacer()
      .button({ icon: `sap-icon://settings` });
    const elements_office = container_office._generic({ name: `formElements`, ns: `form` });
    elements_office._generic({ name: `FormElement`, ns: `form`, t_prop: [{ n: `label`, v: `Name` }] })
      ._generic({ name: `fields`, ns: `form` })
      .input({ id: `name`, value: this.client._bind_edit(this.supplier_name) });
    const fields_street = elements_office._generic({ name: `FormElement`, ns: `form`, t_prop: [{ n: `label`, v: `Street` }] })
      ._generic({ name: `fields`, ns: `form` });
    fields_street.input(this.client._bind_edit(this.street));
    fields_street.input(this.client._bind_edit(this.house_number)).get().layout_data().grid_data(`XL2 L1 M3 S4`);
    const fields_zip = elements_office._generic({ name: `FormElement`, ns: `form`, t_prop: [{ n: `label`, v: `ZIP Code/City` }] })
      ._generic({ name: `fields`, ns: `form` });
    fields_zip.input(this.client._bind_edit(this.zip_code)).get().layout_data().grid_data(`XL2 L1 M3 S4`);
    fields_zip.input(this.client._bind_edit(this.city));
    elements_office._generic({ name: `FormElement`, ns: `form`, t_prop: [{ n: `label`, v: `Country` }] })
      ._generic({ name: `fields`, ns: `form` })
      .select({ id: `country`, width: `100%`, selectedkey: this.client._bind_edit(this.country) })
      .items()
      .item({ text: `Germany`, key: `Germany` })
      .item({ text: `USA`, key: `USA` })
      .item({ text: `England`, key: `England` });
    const container_online = containers._generic({ name: `FormContainer`, ns: `form`, t_prop: [{ n: `ariaLabelledBy`, v: `Title3` }] });
    container_online.form_toolbar()
      .toolbar()
      .title({ id: `Title3`, text: `Online` })
      .toolbar_spacer()
      .button({ icon: `sap-icon://settings` });
    const elements_online = container_online._generic({ name: `formElements`, ns: `form` });
    elements_online._generic({ name: `FormElement`, ns: `form`, t_prop: [{ n: `label`, v: `Web` }] })
      ._generic({ name: `fields`, ns: `form` })
      .input({ id: `url`, type: `Url`, value: this.client._bind_edit(this.url) });
    elements_online._generic({ name: `FormElement`, ns: `form`, t_prop: [{ n: `label`, v: `Twitter` }] })
      ._generic({ name: `fields`, ns: `form` })
      .input({ id: `twitter`, value: this.client._bind_edit(this.twitter) });
    this.client.view_display(page.stringify());
  }
}

module.exports = z2ui5_cl_demo_app_523;
