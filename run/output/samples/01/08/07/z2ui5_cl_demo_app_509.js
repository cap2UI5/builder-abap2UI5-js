const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_509 extends z2ui5_if_app {
  time = ``;
  client = null;

  async main(client) {
    this.client = z2ui5_cl_util.abap_copy(client);
    if (client.check_on_init()) {
      this.time = `${sy_uzeit}`;
      this.view_display();
    }
  }

  view_display() {
    const time_path = this.client._bind_edit(this.time, { path: true });
    const view = z2ui5_cl_xml_view.factory();
    const page = view.shell()
      .page({ title: `abap2UI5 - Sample: Time Type`, navbuttonpress: this.client._event_nav_app_leave(), shownavbutton: this.client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.ui.model.type.Time/sample/sap.ui.core.sample.TypeTimeAsTime` });
    page.simple_form({ width: `auto`, class: `sapUiResponsiveMargin`, layout: `ResponsiveGridLayout`, editable: true, labelspanl: `3`, labelspanm: `3`, emptyspanl: `4`, emptyspanm: `4`, columnsl: `1`, columnsm: `1`, title: `Time Input` })
      .content(`form`)
      .label(`Time`)
      .time_picker(`{ path: '${time_path}', type: 'sap.ui.model.type.Time', formatOptions: { source: { pattern: 'HH:mm:ss' } } }`);
    page.simple_form({ width: `auto`, class: `sapUiResponsiveMargin`, layout: `ResponsiveGridLayout`, labelspanl: `3`, labelspanm: `3`, emptyspanl: `4`, emptyspanm: `4`, columnsl: `1`, columnsm: `1`, title: `Style` })
      .content(`form`)
      .label(`Short`)
      .text(`{ path: '${time_path}', type: 'sap.ui.model.type.Time', formatOptions: { style: 'short', source: { pattern: 'HH:mm:ss' } } }`)
      .label(`Medium`)
      .text(`{ path: '${time_path}', type: 'sap.ui.model.type.Time', formatOptions: { style: 'medium', source: { pattern: 'HH:mm:ss' } } }`)
      .label(`Long`)
      .text(`{ path: '${time_path}', type: 'sap.ui.model.type.Time', formatOptions: { style: 'long', source: { pattern: 'HH:mm:ss' } } }`);
    this.client.view_display(view.stringify());
  }
}

module.exports = z2ui5_cl_demo_app_509;
