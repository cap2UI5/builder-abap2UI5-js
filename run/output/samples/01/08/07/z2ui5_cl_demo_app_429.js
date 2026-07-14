const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_429 extends z2ui5_if_app {
  t_nodes = [];
  client = null;

  async main(client) {
    this.client = z2ui5_cl_util.abap_copy(client);
    if (client.check_on_init()) {
      this.on_init();
    } else if (client.check_on_event(`BUTTON_PRESS`)) {
      client.message_toast_display(`Button pressed`);
    }
  }

  on_init() {
    this.t_nodes = [{ text: `Node1`, ref: `sap-icon://attachment-audio`, nodes: [{ text: `Node1-1`, ref: `sap-icon://attachment-e-pub`, nodes: [{ text: `Node1-1-1`, ref: `sap-icon://attachment-html` }, { text: `Node1-1-2`, ref: `sap-icon://attachment-photo`, nodes: [{ text: `Node1-1-1`, ref: `sap-icon://attachment-text-file`, nodes: [{ text: `Node1-1-1-1`, ref: `sap-icon://attachment-video` }, { text: `Node1-1-1-2`, ref: `sap-icon://attachment-zip-file` }, { text: `Node1-1-1-3`, ref: `sap-icon://course-program` }] }] }] }, { text: `Node1-2`, ref: `sap-icon://create` }] }, { text: `Node2`, ref: `sap-icon://customer-financial-fact-sheet` }];
    this.view_display();
  }

  view_display() {
    const page = z2ui5_cl_xml_view.factory()
      .shell()
      .page({ title: `abap2UI5 - Sample: Custom Tree Item`, navbuttonpress: this.client._event_nav_app_leave(), shownavbutton: this.client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.m.CustomTreeItem/sample/sap.m.sample.CustomTreeItem` });
    page.tree({ items: this.client._bind_edit(this.t_nodes), mode: `MultiSelect` })
      .items()
      ._generic(`CustomTreeItem`)
      .flex_box({ alignitems: `Start`, width: `100%` })
      .items()
      .button({ icon: `{REF}`, press: this.client._event(`BUTTON_PRESS`), class: `sapUiSmallMarginEnd` })
      .input(`{TEXT}`)
      .get()
      .layout_data()
      .flex_item_data({ growfactor: `1` });
    this.client.view_display(page.stringify());
  }
}

module.exports = z2ui5_cl_demo_app_429;
