const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_485 extends z2ui5_if_app {
  t_products = [];
  client = null;

  async main(client) {
    this.client = z2ui5_cl_util.abap_copy(client);
    if (client.check_on_init()) {
      this.on_init();
    } else if (client.check_on_event(`BUTTON_PRESS`)) {
      client.message_toast_display(`Header toolbar button pressed.`);
    }
  }

  on_init() {
    this.t_products = [{ name: `Notebook Basic 15`, product_id: `HT-1000` }, { name: `Notebook Basic 17`, product_id: `HT-1001` }, { name: `Notebook Basic 18`, product_id: `HT-1002` }, { name: `Notebook Basic 19`, product_id: `HT-1003` }, { name: `ITelO Vault`, product_id: `HT-1007` }, { name: `Notebook Professional 15`, product_id: `HT-1010` }, { name: `Notebook Professional 17`, product_id: `HT-1011` }, { name: `ITelO Vault Net`, product_id: `HT-1020` }, { name: `ITelO Vault SAT`, product_id: `HT-1021` }, { name: `Comfort Easy`, product_id: `HT-1022` }, { name: `Comfort Senior`, product_id: `HT-1023` }, { name: `Ergo Screen E-I`, product_id: `HT-1030` }, { name: `Ergo Screen E-II`, product_id: `HT-1031` }, { name: `Ergo Screen E-III`, product_id: `HT-1032` }, { name: `Flat Basic`, product_id: `HT-1035` }, { name: `Flat Future`, product_id: `HT-1036` }];
    this.view_display();
  }

  view_display() {
    const page = z2ui5_cl_xml_view.factory()
      .shell()
      .page({ title: `abap2UI5 - Sample: Title`, navbuttonpress: this.client._event_nav_app_leave(), shownavbutton: this.client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.m.Title/sample/sap.m.sample.Title` });
    page.page({ title: `Page Header Title`, titlelevel: `H2`, enablescrolling: true, showfooter: false })
      .list(this.client._bind(this.t_products))
      .header_toolbar()
      .toolbar()
      .title({ text: `Products`, level: `H3` })
      .toolbar_spacer()
      .button({ icon: `sap-icon://settings`, press: this.client._event(`BUTTON_PRESS`) })
      .get_parent()
      .get_parent()
      .items()
      .standard_list_item({ title: `{NAME}`, description: `{PRODUCT_ID}` });
    this.client.view_display(page.stringify());
  }
}

module.exports = z2ui5_cl_demo_app_485;
