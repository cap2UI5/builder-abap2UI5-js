const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_408 extends z2ui5_if_app {
  client = null;

  async main(client) {
    let view;
    let page;
    this.client = z2ui5_cl_util.abap_copy(client);
    if (client.check_on_init()) {
      view = z2ui5_cl_xml_view.factory();
      page = view.shell()
        .page({ title: `abap2UI5 - Sample: Text`, navbuttonpress: client._event_nav_app_leave(), shownavbutton: client.check_app_prev_stack() });
      page.header_content()
        .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.m.Text/sample/sap.m.sample.Text` });
      page.vbox(`sapUiSmallMargin`)
        .text(`Lorem ipsum dolor st amet, consetetur sadipscing elitr, ` + `sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. ` + `At vero eos et accusam et justo duo dolores et ea rebum. ` + `Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. ` + `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, ` + `sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. ` + `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, ` + `sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat`);
      client.view_display(view.stringify());
    }
  }
}

module.exports = z2ui5_cl_demo_app_408;
