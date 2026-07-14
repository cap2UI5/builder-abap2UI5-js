const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_470 extends z2ui5_if_app {
  view_display({ client } = {}) {
    const view = z2ui5_cl_xml_view.factory();
    const page = view.shell()
      .page({ title: `abap2UI5 - Sample: Fiori Object Page - Standard Classes`, navbuttonpress: client._event_nav_app_leave(), shownavbutton: client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.m.Page/sample/sap.m.sample.PageStandardClasses` });
    const sample_page = page.page({ id: `idPage`, title: ` Product XY`, class: `sapUiResponsivePadding--header` });
    const header = sample_page.object_header({ title: `Power Projector 4713`, backgrounddesign: `Solid`, number: `856.49`, numberunit: `EUR` });
    header.object_attribute({ title: `Weight`, text: `1467 g` });
    header.object_attribute({ title: `Dimensions`, text: `51 x 42 X 18 cm` });
    header._generic(`statuses`).object_status({ title: `Status`, text: `In Stock`, state: `Success` });
    const items = sample_page.icon_tab_bar({ expanded: `{device>/isNoPhone}`, class: `sapUiSmallMarginBottom sapUiResponsiveContentPadding` })
      .items();
    items.icon_tab_filter({ key: `info`, text: `Info` })
      .simple_form({ title: `A Form`, layout: `ResponsiveGridLayout` })
      .content(`form`)
      .label(`Label`)
      .text(`Value`);
    items.icon_tab_filter({ key: `attachments`, text: `Attachments` })
      .list({ headertext: `A List`, showseparators: `Inner` });
    items.icon_tab_filter({ key: `notes`, text: `Notes` }).feed_input();
    sample_page.simple_form({ title: `A Form`, layout: `ResponsiveGridLayout`, class: `sapUiForceWidthAuto sapUiResponsiveMargin` })
      .content(`form`)
      .label(`Label`)
      .text(`Value`);
    sample_page.list({ headertext: `A List`, backgrounddesign: `Translucent`, class: `sapUiResponsiveMargin` })
      ._generic_property({ n: `width`, v: `auto` });
    sample_page.table({ headertext: `A Table`, width: `auto`, class: `sapUiResponsiveMargin` });
    sample_page.panel({ headertext: `A Panel`, width: `auto`, class: `sapUiResponsiveMargin` });
    client.view_display(view.stringify());
  }

  async main(client) {
    if (client.check_on_init()) {
      this.view_display({ client: client });
    }
  }
}

module.exports = z2ui5_cl_demo_app_470;
