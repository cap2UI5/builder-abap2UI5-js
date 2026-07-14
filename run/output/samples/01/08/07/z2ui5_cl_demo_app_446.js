const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_446 extends z2ui5_if_app {
  t_products = [];
  mode = ``;

  view_display({ client } = {}) {
    const page = z2ui5_cl_xml_view.factory()
      .shell()
      .page({ title: `abap2UI5 - Sample: List - Selection`, navbuttonpress: client._event_nav_app_leave(), shownavbutton: client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.m.List/sample/sap.m.sample.ListSelection` });
    const product_list = page.list({ id: `ProductList`, items: client._bind(this.t_products), mode: client._bind_edit(this.mode), includeiteminselection: true });
    product_list.header_toolbar()
      .overflow_toolbar()
      .title({ text: `Products`, level: `H2` })
      .toolbar_spacer()
      .select({ selectedkey: client._bind_edit(this.mode) })
      .items()
      .item({ key: `None`, text: `No Selection` })
      .item({ key: `SingleSelect`, text: `Single Selection` })
      .item({ key: `SingleSelectLeft`, text: `Single Selection Left` })
      .item({ key: `SingleSelectMaster`, text: `Single Selection (Master)` })
      .item({ key: `MultiSelect`, text: `Multi Selection` });
    product_list.items()
      .standard_list_item({ title: `{NAME}`, description: `{PRODUCT_ID}`, icon: `{PIC}`, iconinset: false });
    client.view_display(page.stringify());
  }

  async main(client) {
    let pic_url;
    if (client.check_on_init()) {
      this.mode = `MultiSelect`;
      pic_url = `https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/`;
      this.t_products = [{ name: `Notebook Basic 15`, product_id: `HT-1000`, pic: pic_url + `HT-1000.jpg` }, { name: `Notebook Basic 17`, product_id: `HT-1001`, pic: pic_url + `HT-1001.jpg` }, { name: `Notebook Basic 18`, product_id: `HT-1002`, pic: pic_url + `HT-1002.jpg` }, { name: `Notebook Basic 19`, product_id: `HT-1003`, pic: pic_url + `HT-1003.jpg` }, { name: `ITelO Vault`, product_id: `HT-1007`, pic: pic_url + `HT-1007.jpg` }, { name: `Notebook Professional 15`, product_id: `HT-1010`, pic: pic_url + `HT-1010.jpg` }, { name: `Notebook Professional 17`, product_id: `HT-1011`, pic: pic_url + `HT-1011.jpg` }, { name: `ITelO Vault Net`, product_id: `HT-1020`, pic: pic_url + `HT-1020.jpg` }, { name: `ITelO Vault SAT`, product_id: `HT-1021`, pic: pic_url + `HT-1021.jpg` }, { name: `Comfort Easy`, product_id: `HT-1022`, pic: pic_url + `HT-1022.jpg` }];
      this.view_display({ client: client });
    }
  }
}

module.exports = z2ui5_cl_demo_app_446;
