const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_439 extends z2ui5_if_app {
  view_display({ client } = {}) {
    const warning_text = `Warning message. Extra long text used as a warning message. Extra long text used as a warning message - 2. ` + `Extra long text used as a warning message - 3. Extra long text used as a warning message - 4. ` + `Extra long text used as a warning message - 5.`;
    const page = z2ui5_cl_xml_view.factory()
      .shell()
      .page({ title: `abap2UI5 - Sample: Input - Value States`, navbuttonpress: client._event_nav_app_leave(), shownavbutton: client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.m.Input/sample/sap.m.sample.InputValueState` });
    const box = page.vbox(`sapUiSmallMargin`);
    box.input({ value: `Value state None`, class: `sapUiSmallMarginTopBottom` });
    box.input({ valuestate: `Success`, value: `Value state Success`, class: `sapUiSmallMarginTopBottom` });
    box.input({ valuestate: `Warning`, valuestatetext: warning_text, value: `Value state Warning.`, class: `sapUiSmallMarginTopBottom` });
    box.input({ valuestate: `Warning`, value: `Value state Warning with message containing a link.`, class: `sapUiSmallMarginTopBottom` });
    box.input({ valuestate: `Error`, value: `Value state Error`, class: `sapUiSmallMarginTopBottom` });
    box.input({ valuestate: `Information`, value: `Value state Information`, class: `sapUiSmallMarginTopBottom` });
    box.input({ valuestate: `Information`, value: `Value state Information with message containing multiple links.`, class: `sapUiSmallMarginTopBottom` });
    client.view_display(page.stringify());
  }

  async main(client) {
    if (client.check_on_init()) {
      this.view_display({ client: client });
    }
  }
}

module.exports = z2ui5_cl_demo_app_439;
