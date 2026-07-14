const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_473 extends z2ui5_if_app {
  width = ``;

  async main(client) {
    let view;
    let page;
    if (client.check_on_init()) {
      this.width = `100em`;
      view = z2ui5_cl_xml_view.factory();
      page = view.shell()
        .page({ title: `abap2UI5 - Sample: Scroll Container`, navbuttonpress: client._event_nav_app_leave(), shownavbutton: client.check_app_prev_stack() });
      page.header_content()
        .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.m.ScrollContainer/sample/sap.m.sample.ScrollContainer` });
      page.scroll_container({ height: `100%`, width: `100%`, vertical: true, focusable: true })
        .image({ src: `https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-7777-large.jpg`, width: client._bind(this.width) });
      client.view_display(view.stringify());
    }
  }
}

module.exports = z2ui5_cl_demo_app_473;
