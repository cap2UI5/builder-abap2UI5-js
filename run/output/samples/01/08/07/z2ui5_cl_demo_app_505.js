const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_505 extends z2ui5_if_app {
  date = ``;
  client = null;

  async main(client) {
    this.client = z2ui5_cl_util.abap_copy(client);
    if (client.check_on_init()) {
      this.date = `${sy_datum}`;
      this.view_display();
    }
  }

  view_display() {
    const date_path = this.client._bind_edit(this.date, { path: true });
    const view = z2ui5_cl_xml_view.factory();
    const page = view.shell()
      .page({ title: `abap2UI5 - Sample: Date Type - Source As String`, navbuttonpress: this.client._event_nav_app_leave(), shownavbutton: this.client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.ui.model.type.Date/sample/sap.ui.core.sample.TypeDateAsString` });
    page.simple_form({ width: `auto`, class: `sapUiResponsiveMargin`, layout: `ResponsiveGridLayout`, editable: true, labelspanl: `3`, labelspanm: `3`, emptyspanl: `4`, emptyspanm: `4`, columnsl: `1`, columnsm: `1`, title: `Date Input` })
      .content(`form`)
      .label(`Date`)
      .date_picker(`{ path: '${date_path}', type: 'sap.ui.model.type.Date', formatOptions: { source: { pattern: 'yyyy-MM-dd' } } }`);
    page.simple_form({ width: `auto`, class: `sapUiResponsiveMargin`, layout: `ResponsiveGridLayout`, labelspanl: `3`, labelspanm: `3`, emptyspanl: `4`, emptyspanm: `4`, columnsl: `1`, columnsm: `1`, title: `Format Options` })
      .content(`form`)
      .label(`Short`)
      .text(`{ path: '${date_path}', type: 'sap.ui.model.type.Date', formatOptions: { style: 'short', source: { pattern: 'yyyy-MM-dd' } } }`)
      .label(`Medium`)
      .text(`{ path: '${date_path}', type: 'sap.ui.model.type.Date', formatOptions: { style: 'medium', source: { pattern: 'yyyy-MM-dd' } } }`)
      .label(`Long`)
      .text(`{ path: '${date_path}', type: 'sap.ui.model.type.Date', formatOptions: { style: 'long', source: { pattern: 'yyyy-MM-dd' } } }`)
      .label(`Full`)
      .text(`{ path: '${date_path}', type: 'sap.ui.model.type.Date', formatOptions: { style: 'full', source: { pattern: 'yyyy-MM-dd' } } }`);
    this.client.view_display(view.stringify());
  }
}

module.exports = z2ui5_cl_demo_app_505;
