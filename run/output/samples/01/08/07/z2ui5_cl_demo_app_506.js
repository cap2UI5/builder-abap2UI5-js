const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_506 extends z2ui5_if_app {
  file_size = ``;
  client = null;

  async main(client) {
    this.client = z2ui5_cl_util.abap_copy(client);
    if (client.check_on_init()) {
      this.file_size = `100`;
      this.view_display();
    }
  }

  view_display() {
    const size_path = this.client._bind_edit(this.file_size, { path: true });
    const view = z2ui5_cl_xml_view.factory();
    const page = view.shell()
      .page({ title: `abap2UI5 - Sample: FileSize Type`, navbuttonpress: this.client._event_nav_app_leave(), shownavbutton: this.client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.ui.model.type.FileSize/sample/sap.ui.core.sample.TypeFileSize` });
    page.simple_form({ class: `sapUiResponsiveMargin`, layout: `ResponsiveGridLayout`, editable: true, labelspanl: `3`, labelspanm: `3`, emptyspanl: `4`, emptyspanm: `4`, columnsl: `1`, columnsm: `1`, title: `FileSize Input` })
      .content(`form`)
      .label(`FileSize`)
      .input(`{ path: '${size_path}', type: 'sap.ui.model.type.FileSize' }`);
    page.simple_form({ class: `sapUiResponsiveMargin`, layout: `ResponsiveGridLayout`, labelspanl: `3`, labelspanm: `3`, emptyspanl: `4`, emptyspanm: `4`, columnsl: `1`, columnsm: `1`, title: `Min Integer Digits (minimal number of non-fraction digits)` })
      .content(`form`)
      .label(`3 digits`)
      .text(`{ path: '${size_path}', type: 'sap.ui.model.type.FileSize', formatOptions: { minIntegerDigits: 3 } }`)
      .label(`5 digits`)
      .text(`{ path: '${size_path}', type: 'sap.ui.model.type.FileSize', formatOptions: { minIntegerDigits: 5 } }`);
    page.simple_form({ width: `auto`, class: `sapUiResponsiveMargin`, layout: `ResponsiveGridLayout`, labelspanl: `3`, labelspanm: `3`, emptyspanl: `4`, emptyspanm: `4`, columnsl: `1`, columnsm: `1`, title: `Max Integer Digits (maximal number of non-fraction digits)` })
      .content(`form`)
      .label(`2 digits`)
      .text(`{ path: '${size_path}', type: 'sap.ui.model.type.FileSize', formatOptions: { maxIntegerDigits: 2 } }`)
      .label(`5 digits`)
      .text(`{ path: '${size_path}', type: 'sap.ui.model.type.FileSize', formatOptions: { maxIntegerDigits: 5 } }`);
    page.simple_form({ width: `auto`, class: `sapUiResponsiveMargin`, layout: `ResponsiveGridLayout`, labelspanl: `3`, labelspanm: `3`, emptyspanl: `4`, emptyspanm: `4`, columnsl: `1`, columnsm: `1`, title: `Min Fraction Digits (minimal number of fraction digits)` })
      .content(`form`)
      .label(`2 digits`)
      .text(`{ path: '${size_path}', type: 'sap.ui.model.type.FileSize', formatOptions: { minFractionDigits: 2 } }`)
      .label(`5 digits`)
      .text(`{ path: '${size_path}', type: 'sap.ui.model.type.FileSize', formatOptions: { minFractionDigits: 5 } }`);
    page.simple_form({ width: `auto`, class: `sapUiResponsiveMargin`, layout: `ResponsiveGridLayout`, labelspanl: `3`, labelspanm: `3`, emptyspanl: `4`, emptyspanm: `4`, columnsl: `1`, columnsm: `1`, title: `Max Fraction Digits (maximal number of fraction digits)` })
      .content(`form`)
      .label(`2 digits`)
      .text(`{ path: '${size_path}', type: 'sap.ui.model.type.FileSize', formatOptions: { maxFractionDigits: 2 } }`)
      .label(`5 digits`)
      .text(`{ path: '${size_path}', type: 'sap.ui.model.type.FileSize', formatOptions: { maxFractionDigits: 5 } }`);
    this.client.view_display(view.stringify());
  }
}

module.exports = z2ui5_cl_demo_app_506;
