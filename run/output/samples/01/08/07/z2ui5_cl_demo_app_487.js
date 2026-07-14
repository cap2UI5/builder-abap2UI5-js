const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_487 extends z2ui5_if_app {
  t_nodes = [];
  client = null;

  async main(client) {
    this.client = z2ui5_cl_util.abap_copy(client);
    if (client.check_on_init()) {
      this.on_init();
    }
  }

  on_init() {
    this.t_nodes = [{ text: `Node1`, ref: `sap-icon://attachment-audio`, nodes: [{ text: `Node1-1`, ref: `sap-icon://attachment-e-pub`, nodes: [{ text: `Node1-1-1`, ref: `sap-icon://attachment-html` }, { text: `Node1-1-2`, ref: `sap-icon://attachment-photo`, nodes: [{ text: `Node1-1-2-1`, ref: `sap-icon://attachment-text-file`, nodes: [{ text: `Node1-1-2-1-1`, ref: `sap-icon://attachment-video` }, { text: `Node1-1-2-1-2`, ref: `sap-icon://attachment-zip-file` }, { text: `Node1-1-2-1-3`, ref: `sap-icon://course-program` }] }] }] }, { text: `Node1-2`, ref: `sap-icon://create` }] }, { text: `Node2`, ref: `sap-icon://customer-financial-fact-sheet` }];
    this.view_display();
  }

  view_display() {
    const page = z2ui5_cl_xml_view.factory()
      .shell()
      .page({ title: `abap2UI5 - Sample: Tree - Basic`, navbuttonpress: this.client._event_nav_app_leave(), shownavbutton: this.client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.m.Tree/sample/sap.m.sample.Tree` });
    page.tree({ id: `Tree`, items: this.client._bind(this.t_nodes) }).items().standard_tree_item({ title: `{TEXT}` });
    this.client.view_display(page.stringify());
  }
}

module.exports = z2ui5_cl_demo_app_487;
