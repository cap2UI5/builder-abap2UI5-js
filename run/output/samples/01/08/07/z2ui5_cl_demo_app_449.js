const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_449 extends z2ui5_if_app {
  t_messages = [];

  view_display({ client } = {}) {
    const page = z2ui5_cl_xml_view.factory()
      .shell()
      .page({ title: `abap2UI5 - Sample: Message View connected with Message Model`, navbuttonpress: client._event_nav_app_leave(), shownavbutton: client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.m.MessageView/sample/sap.m.sample.MessageViewMessageManager` });
    page.message_view({ items: client._bind(this.t_messages) })
      .message_item({ type: `{TYPE}`, title: `{MESSAGE}`, subtitle: `{ADDITIONAL_TEXT}`, description: `{DESCRIPTION}` });
    client.view_display(page.stringify());
  }

  async main(client) {
    if (client.check_on_init()) {
      this.t_messages = [{ type: `Error`, message: `Error message`, additional_text: `Example of additionalText`, description: `Example of description` }, { type: `Information`, message: `Information message`, additional_text: `Example of additionalText`, description: `Example of description` }, { type: `Success`, message: `Success message`, additional_text: `Example of additionalText`, description: `Example of description` }, { type: `Warning`, message: `Warning message`, additional_text: `Example of additionalText`, description: `Example of description` }];
      this.view_display({ client: client });
    }
  }
}

module.exports = z2ui5_cl_demo_app_449;
