const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_502 extends z2ui5_if_app {
  async main(client) {
    let page;
    if (client.check_on_init()) {
      page = z2ui5_cl_xml_view.factory()
        .shell()
        .page({ title: `abap2UI5 - Sample: Basic Theme Parameters`, navbuttonpress: client._event_nav_app_leave(), shownavbutton: client.check_app_prev_stack() });
      page.header_content()
        .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.ui.core.theming/sample/sap.ui.core.sample.BasicThemeParameters` });
      page.vertical_layout({ class: `sapUiContentPadding`, width: `100%` })
        .content(`layout`)
        .message_strip({ text: `This sample is replaced with the Theme Parameter Toolbox. You can easily search, preview, and filter semantic theme parameters.`, type: `Information`, showicon: true, class: `sapUiMediumMarginBottom` })
        .link({ text: `Click here to open the Theme Parameter Toolbox`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/theming/webapp/index.html` });
      client.view_display(page.stringify());
    }
  }
}

module.exports = z2ui5_cl_demo_app_502;
