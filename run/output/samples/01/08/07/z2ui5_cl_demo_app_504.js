const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_504 extends z2ui5_if_app {
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
    const binding = `path: '${date_path}', type: 'sap.ui.model.type.Date'`;
    const source = `source: { pattern: 'yyyy-MM-dd' }`;
    const page = z2ui5_cl_xml_view.factory()
      .shell()
      .page({ title: `abap2UI5 - Sample: Date Type - Source As Date`, navbuttonpress: this.client._event_nav_app_leave(), shownavbutton: this.client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.ui.model.type.Date/sample/sap.ui.core.sample.TypeDateAsDate` });
    page.simple_form({ title: `Date Input`, editable: true, width: `auto`, class: `sapUiResponsiveMargin`, layout: `ResponsiveGridLayout`, labelspanl: `3`, labelspanm: `3`, emptyspanl: `4`, emptyspanm: `4`, columnsl: `1`, columnsm: `1` })
      .content(`form`)
      .label(`Date`)
      .date_picker(`{ ${binding}, formatOptions: { ${source} } }`);
    page.simple_form({ title: `Format Options`, width: `auto`, class: `sapUiResponsiveMargin`, layout: `ResponsiveGridLayout`, labelspanl: `3`, labelspanm: `3`, emptyspanl: `4`, emptyspanm: `4`, columnsl: `1`, columnsm: `1` })
      .content(`form`)
      .label(`Short`)
      .text(`{ ${binding}, formatOptions: { ${source}, style: 'short' } }`)
      .label(`Medium`)
      .text(`{ ${binding}, formatOptions: { ${source}, style: 'medium' } }`)
      .label(`Long`)
      .text(`{ ${binding}, formatOptions: { ${source}, style: 'long' } }`)
      .label(`Full`)
      .text(`{ ${binding}, formatOptions: { ${source}, style: 'full' } }`);
    page.simple_form({ title: `Relative Time Format`, width: `auto`, class: `sapUiResponsiveMargin`, layout: `ResponsiveGridLayout`, labelspanl: `3`, labelspanm: `3`, emptyspanl: `4`, emptyspanm: `4`, columnsl: `1`, columnsm: `1` })
      .content(`form`)
      .label(`Relative Time`)
      .text(`{ ${binding}, formatOptions: { ${source}, relative: true, relativeScale: 'auto' } }`);
    this.client.view_display(page.stringify());
  }
}

module.exports = z2ui5_cl_demo_app_504;
