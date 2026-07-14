const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_419 extends z2ui5_if_app {
  client = null;

  view_display({ client } = {}) {
    const page = z2ui5_cl_xml_view.factory()
      .shell()
      .page({ title: `abap2UI5 - Sample: Shell Bar with title mega menu`, navbuttonpress: client._event_nav_app_leave(), shownavbutton: client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.f.ShellBar/sample/sap.f.sample.ShellBar` });
    page.shell_bar({ title: `Application Title`, secondtitle: `Short description`, homeicon: `https://sapui5.hana.ondemand.com/sdk/resources/sap/ui/documentation/sdk/images/logo_sap.png`, showcopilot: true, showsearch: true, shownotifications: true, notificationsnumber: `2` })
      ._generic({ name: `menu`, ns: `f` })
      ._generic(`Menu`)
      .menu_item({ text: `Flight booking`, icon: `sap-icon://flight` })
      .menu_item({ text: `Car rental`, icon: `sap-icon://car-rental` });
    client.view_display(page.stringify());
  }

  async main(client) {
    this.client = z2ui5_cl_util.abap_copy(client);
    if (client.check_on_init()) {
      this.view_display({ client: client });
    }
  }
}

module.exports = z2ui5_cl_demo_app_419;
