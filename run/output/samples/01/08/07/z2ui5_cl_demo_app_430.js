const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_430 extends z2ui5_if_app {
  s_supplier = {};
  client = null;

  async main(client) {
    this.client = z2ui5_cl_util.abap_copy(client);
    if (client.check_on_init()) {
      this.on_init();
    }
  }

  on_init() {
    this.s_supplier = { supplier_name: `Red Point Stores`, street: `Main St`, house_number: `1618`, zip_code: `31415`, city: `Maintown`, country: `Germany` };
    this.view_display();
  }

  view_display() {
    const page = z2ui5_cl_xml_view.factory()
      .shell()
      .page({ title: `abap2UI5 - Sample: Display List Item`, navbuttonpress: this.client._event_nav_app_leave(), shownavbutton: this.client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.m.DisplayListItem/sample/sap.m.sample.DisplayListItem` });
    const list = page.vertical_layout({ class: `sapUiContentPadding`, width: `100%` }).list({ headertext: `Address` });
    list._generic({ name: `DisplayListItem`, t_prop: [{ n: `label`, v: `Name` }, { n: `value`, v: this.client._bind(this.s_supplier.supplier_name, { name: `s_supplier-supplier_name` }) }] });
    list._generic({ name: `DisplayListItem`, t_prop: [{ n: `label`, v: `Street` }, { n: `value`, v: `${this.client._bind(this.s_supplier.street, { name: `s_supplier-street` })} ${this.client._bind(this.s_supplier.house_number, { name: `s_supplier-house_number` })}` }] });
    list._generic({ name: `DisplayListItem`, t_prop: [{ n: `label`, v: `City` }, { n: `value`, v: `${this.client._bind(this.s_supplier.zip_code, { name: `s_supplier-zip_code` })} ${this.client._bind(this.s_supplier.city, { name: `s_supplier-city` })}` }, { n: `type`, v: `Navigation` }] });
    list._generic({ name: `DisplayListItem`, t_prop: [{ n: `label`, v: `Country` }, { n: `value`, v: this.client._bind(this.s_supplier.country, { name: `s_supplier-country` }) }, { n: `type`, v: `Navigation` }] });
    this.client.view_display(page.stringify());
  }
}

module.exports = z2ui5_cl_demo_app_430;
