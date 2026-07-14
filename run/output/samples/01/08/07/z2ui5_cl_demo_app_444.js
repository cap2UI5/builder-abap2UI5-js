const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_444 extends z2ui5_if_app {
  view_display({ client } = {}) {
    const pic_url = `https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/`;
    const page = z2ui5_cl_xml_view.factory()
      .shell()
      .page({ title: `abap2UI5 - Sample: List - Navigation Indication`, navbuttonpress: client._event_nav_app_leave(), shownavbutton: client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.m.List/sample/sap.m.sample.ListNavType` });
    page.list({ headertext: `Products` })
      .items()
      .standard_list_item({ title: `Notebook Basic 15`, description: `HT-1000`, icon: pic_url + `HT-1000.jpg`, iconinset: false, type: `Navigation` })
      .standard_list_item({ title: `Notebook Basic 17`, description: `HT-1001`, icon: pic_url + `HT-1001.jpg`, iconinset: false, type: `Navigation` })
      .standard_list_item({ title: `Notebook Basic 18`, description: `HT-1002`, icon: pic_url + `HT-1002.jpg`, iconinset: false });
    client.view_display(page.stringify());
  }

  async main(client) {
    if (client.check_on_init()) {
      this.view_display({ client: client });
    }
  }
}

module.exports = z2ui5_cl_demo_app_444;
