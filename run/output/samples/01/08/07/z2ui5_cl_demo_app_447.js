const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_447 extends z2ui5_if_app {
  client = null;

  view_display({ client } = {}) {
    const page = z2ui5_cl_xml_view.factory()
      .shell()
      .page({ title: `abap2UI5 - Sample: Message Box Initial Focus`, navbuttonpress: client._event_nav_app_leave(), shownavbutton: client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.m.MessageBox/sample/sap.m.sample.MessageBoxInitialFocus` });
    page.vertical_layout({ class: `sapUiContentPadding`, width: `100%` })
      .text(`Different approaches to set Initial focus`)
      .button({ text: `Action`, class: `sapUiSmallMarginBottom`, press: client._event(`INITIAL_FOCUS_ON_ACTION`), width: `250px` })
      .button({ text: `Custom action`, class: `sapUiSmallMarginBottom`, press: client._event(`INITIAL_FOCUS_ON_CUSTOM_ACTION`), width: `250px` });
    client.view_display(page.stringify());
  }

  on_event({ client } = {}) {
    if (client.check_on_event(`INITIAL_FOCUS_ON_ACTION`)) {
      client.message_box_display(`Initial button focus is set by attribute 
 initialFocus: sap.m.MessageBox.Action.CANCEL`, `warning`, `Focus on a Button`, `sapUiResponsivePadding--header sapUiResponsivePadding--content sapUiResponsivePadding--footer`, undefined, [`OK`, `CANCEL`], undefined, `CANCEL`, undefined, `WARNING`);
    } else if (client.check_on_event(`INITIAL_FOCUS_ON_CUSTOM_ACTION`)) {
      client.message_box_display(`Initial button focus is set by attribute 
 initialFocus: "Custom button" 
 Note: The name is not case sensitive`, `show`, `Focus on a Custom Action`, `sapUiResponsivePadding--header sapUiResponsivePadding--content sapUiResponsivePadding--footer`, undefined, [`YES`, `NO`, `Custom Action`], undefined, `Custom Action`, undefined, `WARNING`);
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

module.exports = z2ui5_cl_demo_app_447;
