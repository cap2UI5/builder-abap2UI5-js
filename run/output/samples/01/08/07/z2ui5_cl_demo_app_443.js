const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_443 extends z2ui5_if_app {
  t_products = [];

  view_display({ client } = {}) {
    const page = z2ui5_cl_xml_view.factory()
      .shell()
      .page({ title: `abap2UI5 - Sample: List - Growing`, navbuttonpress: client._event_nav_app_leave(), shownavbutton: client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.m.List/sample/sap.m.sample.ListGrowing` });
    page.list({ headertext: `Products`, items: client._bind(this.t_products), growing: true, growingthreshold: `4`, growingscrolltoload: false })
      .items()
      .standard_list_item({ title: `{NAME}`, description: `{PRODUCT_ID}`, icon: `{PIC}`, iconinset: false });
    client.view_display(page.stringify());
  }

  async main(client) {
    let pic_url;
    if (client.check_on_init()) {
      pic_url = `https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/`;
      this.t_products = [{ name: `Notebook Basic 15`, product_id: `HT-1000`, pic: pic_url + `HT-1000.jpg` }, { name: `Notebook Basic 17`, product_id: `HT-1001`, pic: pic_url + `HT-1001.jpg` }, { name: `Notebook Basic 18`, product_id: `HT-1002`, pic: pic_url + `HT-1002.jpg` }, { name: `Notebook Basic 19`, product_id: `HT-1003`, pic: pic_url + `HT-1003.jpg` }, { name: `ITelO Vault`, product_id: `HT-1007`, pic: pic_url + `HT-1007.jpg` }, { name: `Notebook Professional 15`, product_id: `HT-1010`, pic: pic_url + `HT-1010.jpg` }, { name: `Notebook Professional 17`, product_id: `HT-1011`, pic: pic_url + `HT-1011.jpg` }, { name: `ITelO Vault Net`, product_id: `HT-1020`, pic: pic_url + `HT-1020.jpg` }, { name: `ITelO Vault SAT`, product_id: `HT-1021`, pic: pic_url + `HT-1021.jpg` }, { name: `Comfort Easy`, product_id: `HT-1022`, pic: pic_url + `HT-1022.jpg` }, { name: `Comfort Senior`, product_id: `HT-1023`, pic: pic_url + `HT-1023.jpg` }, { name: `Ergo Screen E-I`, product_id: `HT-1030`, pic: pic_url + `HT-1030.jpg` }];
      this.view_display({ client: client });
    }
  }
}

module.exports = z2ui5_cl_demo_app_443;
