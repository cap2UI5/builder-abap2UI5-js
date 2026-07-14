const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_525 extends z2ui5_if_app {
  t_data = [];
  client = null;

  async main(client) {
    this.client = z2ui5_cl_util.abap_copy(client);
    if (client.check_on_init()) {
      this.on_init();
    } else if (client.check_on_navigated()) {
      this.view_display();
    }
  }

  on_init() {
    this.t_data = [{ supplier: `Titanium`, street: `401 23rd St`, city: `Port Angeles`, phone: `5682-121-828`, open_orders: 10 }, { supplier: `Technocom`, street: `51 39th St`, city: `Smallfield`, phone: `2212-853-789`, open_orders: 0 }, { supplier: `Red Point Stores`, street: `451 55th St`, city: `Meridian`, phone: `2234-245-898`, open_orders: 5 }, { supplier: `Technocom`, street: `40 21st St`, city: `Bethesda`, phone: `5512-125-643`, open_orders: 0 }, { supplier: `Very Best Screens`, street: `123 72nd St`, city: `McLean`, phone: `5412-543-765`, open_orders: 6 }];
    this.view_display();
  }

  view_display() {
    const page = z2ui5_cl_xml_view.factory()
      .shell()
      .page({ title: `abap2UI5 - Sample: Multi Header`, navbuttonpress: this.client._event_nav_app_leave(), shownavbutton: this.client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.ui.table.Table/sample/sap.ui.table.sample.MultiHeader` });
    const tab = page.ui_table({ id: `table1`, rows: this.client._bind_edit(this.t_data), selectionmode: `MultiToggle` })
      ._generic_property({ n: `enableColumnFreeze`, v: `true` });
    tab.ui_extension().overflow_toolbar({ style: `Clear` }).title({ id: `title`, text: `Contacts` });
    const columns = tab.ui_columns();
    columns.ui_column({ width: `11rem`, sortproperty: `SUPPLIER`, filterproperty: `SUPPLIER` })
      .label({ text: `Supplier`, textalign: `Center`, width: `100%` })
      .ui_template()
      .text(`{SUPPLIER}`);
    columns.ui_column({ width: `11rem`, sortproperty: `STREET`, filterproperty: `STREET` })
      ._generic_property({ n: `headerSpan`, v: `3,2` })
      ._generic({ name: `multiLabels`, ns: `table` })
      .label({ text: `Contact`, textalign: `Center`, width: `100%` })
      .label({ text: `Address`, textalign: `Center`, width: `100%` })
      .label({ text: `Street`, textalign: `Center`, width: `100%` })
      .get_parent()
      .ui_template()
      .text({ text: `{STREET}`, wrapping: false });
    columns.ui_column({ width: `11rem`, sortproperty: `CITY` })
      ._generic_property({ n: `headerSpan`, v: `2` })
      ._generic({ name: `multiLabels`, ns: `table` })
      .label(`Contact`)
      .label(`Address`)
      .label({ text: `City`, textalign: `Center`, width: `100%` })
      .get_parent()
      .ui_template()
      .input(`{CITY}`);
    columns.ui_column({ width: `11rem`, sortproperty: `PHONE` })
      ._generic({ name: `multiLabels`, ns: `table` })
      .label(`Contact`)
      .label({ text: `Phone`, textalign: `Center`, width: `100%` })
      .get_parent()
      .ui_template()
      .input(`{PHONE}`);
    columns.ui_column({ width: `8rem`, halign: `End` })
      ._generic({ name: `multiLabels`, ns: `table` })
      .label({ visible: false })
      .label({ visible: false })
      .label(`Open Orders`)
      .get_parent()
      .ui_template()
      .text(`{OPEN_ORDERS}`);
    this.client.view_display(page.stringify());
  }
}

module.exports = z2ui5_cl_demo_app_525;
