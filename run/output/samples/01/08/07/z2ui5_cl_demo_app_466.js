const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_466 extends z2ui5_if_app {
  client = null;

  view_display({ client } = {}) {
    const view = z2ui5_cl_xml_view.factory();
    const page = view.shell()
      .page({ title: `abap2UI5 - Sample: Object Identifier`, navbuttonpress: client._event_nav_app_leave(), shownavbutton: client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.m.ObjectIdentifier/sample/sap.m.sample.ObjectIdentifier` });
    page.vertical_layout({ class: `sapUiContentPadding`, width: `100%` })
      .object_identifier({ title: `Power Projector 4713`, text: `A very powerful projector with special features for Internet usability, USB`, titleactive: true, titlepress: client._event(`TITLE_PRESSED`) });
    client.view_display(view.stringify());
  }

  on_event({ client } = {}) {
    if (client.check_on_event(`TITLE_PRESSED`)) {
      client.message_box_display(`Title was clicked!`);
    }
  }

  async main(client) {
    this.client = z2ui5_cl_util.abap_copy(client);
    if (client.check_on_init()) {
      this.view_display({ client: client });
    }
    this.on_event({ client: client });
  }
}

module.exports = z2ui5_cl_demo_app_466;
