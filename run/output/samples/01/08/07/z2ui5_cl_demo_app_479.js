const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_479 extends z2ui5_if_app {
  t_products = [];
  client = null;

  async main(client) {
    this.client = z2ui5_cl_util.abap_copy(client);
    if (client.check_on_init()) {
      this.on_init();
    }
  }

  on_init() {
    const base_url = `https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/`;
    this.t_products = [{ product_id: `HT-1000`, name: `Notebook Basic 15`, product_pic_url: base_url + `HT-1000.jpg` }, { product_id: `HT-1001`, name: `Notebook Basic 17`, product_pic_url: base_url + `HT-1001.jpg` }, { product_id: `HT-1002`, name: `Notebook Basic 18`, product_pic_url: base_url + `HT-1002.jpg` }, { product_id: `HT-1003`, name: `Notebook Basic 19`, product_pic_url: base_url + `HT-1003.jpg` }, { product_id: `HT-1007`, name: `ITelO Vault`, product_pic_url: base_url + `HT-1007.jpg` }, { product_id: `HT-1010`, name: `Notebook Professional 15`, product_pic_url: base_url + `HT-1010.jpg` }, { product_id: `HT-1011`, name: `Notebook Professional 17`, product_pic_url: base_url + `HT-1011.jpg` }, { product_id: `HT-1020`, name: `ITelO Vault Net`, product_pic_url: base_url + `HT-1020.jpg` }, { product_id: `HT-1021`, name: `ITelO Vault SAT`, product_pic_url: base_url + `HT-1021.jpg` }, { product_id: `HT-1022`, name: `Comfort Easy`, product_pic_url: base_url + `HT-1022.jpg` }];
    this.t_products.sort((a, b) => ((a.name > b.name ? 1 : a.name < b.name ? -1 : 0)));
    this.view_display();
  }

  view_display() {
    const view = z2ui5_cl_xml_view.factory();
    const page = view.shell()
      .page({ title: `abap2UI5 - Sample: Standard List Item - Icon`, navbuttonpress: this.client._event_nav_app_leave(), shownavbutton: this.client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.m.StandardListItem/sample/sap.m.sample.StandardListItemIcon` });
    page.list({ headertext: `Products`, items: this.client._bind(this.t_products) })
      ._generic({ name: `StandardListItem`, t_prop: [{ n: `title`, v: `{NAME}` }, { n: `description`, v: `{PRODUCT_ID}` }, { n: `icon`, v: `{PRODUCT_PIC_URL}` }, { n: `iconDensityAware`, v: `false` }, { n: `iconInset`, v: `false` }] });
    this.client.view_display(view.stringify());
  }
}

module.exports = z2ui5_cl_demo_app_479;
