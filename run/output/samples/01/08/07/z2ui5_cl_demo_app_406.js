const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_406 extends z2ui5_if_app {
  client = null;

  async main(client) {
    this.client = z2ui5_cl_util.abap_copy(client);
    if (client.check_on_init()) {
      this.view_display();
    }
  }

  view_display() {
    const view = z2ui5_cl_xml_view.factory();
    const page = view.shell()
      .page({ title: `abap2UI5 - Sample: Flexible sizing - Icon Tab Bar`, navbuttonpress: this.client._event_nav_app_leave(), shownavbutton: this.client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.m.Page/sample/sap.m.sample.PageListReportIconTabBar` });
    const page2 = page.page({ title: `Title`, enablescrolling: true, class: `sapUiResponsivePadding--header sapUiResponsivePadding--footer` });
    const vbox = page2.content().vbox({ fitcontainer: true });
    const form = vbox.simple_form({ id: `SimpleFormDisplay480`, editable: false, layout: `ResponsiveGridLayout`, title: `Address`, labelspanl: `4`, labelspanm: `4`, emptyspanl: `0`, emptyspanm: `0`, columnsl: `2`, columnsm: `2` });
    form.content(`form`)
      .title({ ns: `core`, text: `Office` })
      .label(`Name`)
      .text(`Red Point Stores`)
      .label(`Street/No.`)
      .text(`Main St 1618`)
      .label(`ZIP Code/City`)
      .text(`31415 Maintown`)
      .label(`Country`)
      .text(`Germany`)
      .title({ ns: `core`, text: `Online` })
      .label(`Web`)
      .text(`http://www.sap.com`)
      .label(`Twitter`)
      .text(`@sap`);
    form.layout_data(`form`)
      .flex_item_data({ shrinkfactor: `0`, backgrounddesign: `Solid`, styleclass: `sapContrastPlus` });
    const itb = vbox.icon_tab_bar({ uppercase: true, expandable: false, applycontentpadding: true, stretchcontentheight: true, class: `sapUiResponsiveContentPadding` });
    itb.items()
      .icon_tab_filter({ key: `balances`, text: `Balances` })
      .get_parent()
      .icon_tab_filter({ key: `compare`, text: `Compare` });
    const tab = itb.content().ui_table({ selectionmode: `MultiToggle`, visiblerowcountmode: `Auto`, rowheight: `32` });
    tab.ui_extension()
      .overflow_toolbar()
      .toolbar_spacer()
      .search_field({ width: `12rem` })
      .toolbar_spacer({ width: `1rem` })
      .segmented_button()
      .items()
      .segmented_button_item({ icon: `sap-icon://table-view` })
      .segmented_button_item({ icon: `sap-icon://bar-chart` })
      .get_parent()
      .get_parent()
      .toolbar_spacer({ width: `1rem` })
      .button({ icon: `sap-icon://group-2`, type: `Transparent` })
      .button({ icon: `sap-icon://action-settings`, type: `Transparent` });
    tab.ui_columns().ui_column().get_parent().ui_column().get_parent().ui_column().get_parent().ui_column();
    itb.layout_data().flex_item_data({ growfactor: `1`, basesize: `0%` });
    page2.footer()
      .overflow_toolbar()
      .content()
      .toolbar_spacer()
      .button({ text: `Grouped View` })
      .button({ text: `Classical Table` });
    this.client.view_display(view.stringify());
  }
}

module.exports = z2ui5_cl_demo_app_406;
