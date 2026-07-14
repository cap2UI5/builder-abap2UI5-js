const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_531 extends z2ui5_if_app {
  view_display({ client } = {}) {
    const page = z2ui5_cl_xml_view.factory()
      .shell()
      .page({ title: `abap2UI5 - Sample: ObjectPageHeaderContent`, navbuttonpress: client._event_nav_app_leave(), shownavbutton: client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.uxap.ObjectPageHeaderContent/sample/sap.uxap.sample.HeaderContent` });
    const content = page._generic({ name: `ObjectPageHeaderContent`, ns: `uxap` }).content(`uxap`);
    content.vertical_layout()
      .object_status({ title: `User ID`, text: `12345678` })
      .get_parent()
      .object_status({ title: `Functional Area`, text: `Developement` })
      .get_parent()
      .object_status({ title: `Cost Center`, text: `PI DFA GD Programs and Product` })
      .get_parent()
      .object_status({ title: `Email`, text: `email@address.com` });
    content.text({ width: `200px`, text: `Hi, I'm Denise. I am passionate about what I do and I'll go the extra mile to make the customer win.` });
    content.object_status({ text: `In Stock`, state: `Error` });
    content.object_status({ title: `Label`, text: `In Stock`, state: `Warning` });
    content.object_number({ number: `1000`, unit: `SOOK`, emphasized: false, state: `Success` });
    content.progress_indicator({ percentvalue: `30`, displayvalue: `30%`, showvalue: true, state: `None` });
    content.vertical_layout()
      .label(`PC, Unrestricted-Use Stock`)
      .object_number({ class: `sapMObjectNumberLarge`, number: `219`, unit: `K` });
    const layout_small = content.vertical_layout();
    layout_small.layout_data(`layout`)
      ._generic({ name: `ObjectPageHeaderLayoutData`, ns: `uxap`, t_prop: [{ n: `visibleS`, v: `false` }] });
    layout_small.label(`PC, Not in Small Size`)
      .object_number({ class: `sapMObjectNumberLarge`, number: `220`, unit: `K` });
    const layout_medium = content.vertical_layout();
    layout_medium.layout_data(`layout`)
      ._generic({ name: `ObjectPageHeaderLayoutData`, ns: `uxap`, t_prop: [{ n: `visibleM`, v: `false` }] });
    layout_medium.label(`PC, Not in Medium Size`)
      .object_number({ class: `sapMObjectNumberLarge`, number: `221`, unit: `K` });
    const layout_large = content.vertical_layout();
    layout_large.layout_data(`layout`)
      ._generic({ name: `ObjectPageHeaderLayoutData`, ns: `uxap`, t_prop: [{ n: `visibleL`, v: `false` }, { n: `showSeparatorAfter`, v: `true` }] });
    layout_large.label(`PC, Not in Large Size`)
      .object_number({ class: `sapMObjectNumberLarge`, number: `219`, unit: `K` });
    content.object_attribute({ title: `Label`, text: `In Stock` });
    content.button({ icon: `sap-icon://nurse`, tooltip: `nurse` });
    content._generic(`Tokenizer`).token({ text: `Wayne Enterprises` }).token({ text: `Big's Caramels` });
    client.view_display(page.stringify());
  }

  async main(client) {
    if (client.check_on_init()) {
      this.view_display({ client: client });
    }
  }
}

module.exports = z2ui5_cl_demo_app_531;
