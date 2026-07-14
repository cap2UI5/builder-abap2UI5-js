const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_422 extends z2ui5_if_app {
  client = null;

  view_display({ client } = {}) {
    const page = z2ui5_cl_xml_view.factory()
      .shell()
      .page({ title: `abap2UI5 - Sample: Color Palette in a form`, navbuttonpress: client._event_nav_app_leave(), shownavbutton: client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.m.ColorPalette/sample/sap.m.sample.ColorPalette` });
    page.simple_form({ editable: true, backgrounddesign: `Transparent`, singlecontainerfullsize: true, layout: `ResponsiveGridLayout` })
      .toolbar({ ns: `form` })
      .toolbar()
      .title(`Color Palette in a Form`)
      .get_parent()
      .get_parent()
      .content(`form`)
      .label(`Choose Color`)
      .color_palette({ colorselect: client._event(`COLOR_SELECT`, [`\${$parameters>/value}`, `\${$parameters>/defaultAction}`]) });
    client.view_display(page.stringify());
  }

  on_event({ client } = {}) {
    if (client.check_on_event(`COLOR_SELECT`)) {
      client.message_toast_display(`Color Selected: value - ${client.get_event_arg(1)}, 
 defaultAction - ${client.get_event_arg(2)}`);
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

module.exports = z2ui5_cl_demo_app_422;
