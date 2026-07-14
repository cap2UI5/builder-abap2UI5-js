const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_404 extends z2ui5_if_app {
  client = null;

  async main(client) {
    this.client = z2ui5_cl_util.abap_copy(client);
    if (client.check_on_init()) {
      this.view_display();
    }
  }

  view_display() {
    const css = `.nestedFlexboxes .item1 {` + `  padding: 1rem;` + `  background-color: #d1dbbd;` + `}` + `.nestedFlexboxes .item2 {` + `  padding: 1rem;` + `  background-color: #7D8A2E;` + `}` + `.nestedFlexboxes .item3 {` + `  padding: 1rem;` + `  background-color: #C9D787;` + `}` + `.nestedFlexboxes .item4 {` + `  padding: 1rem;` + `  background-color: #FFFFFF;` + `}` + `.nestedFlexboxes .item5 {` + `  padding: 1rem;` + `  background-color: #FFC0A9;` + `}` + `.nestedFlexboxes .item6 {` + `  padding: 1rem;` + `  background-color: #FF8598;` + `}` + `.nestedFlexboxes h2 {` + `  color: #32363a;` + `}`;
    const view = z2ui5_cl_xml_view.factory();
    view._generic({ name: `style`, ns: `html` })._cc_plain_xml(css).get_parent();
    const page = view.shell()
      .page({ title: `abap2UI5 - Sample: Flex Box - Nested`, navbuttonpress: this.client._event_nav_app_leave(), shownavbutton: this.client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.m.FlexBox/sample/sap.m.sample.FlexBoxNested` });
    page.hbox({ fitcontainer: true, alignitems: `Stretch`, class: `sapUiSmallMargin nestedFlexboxes` })
      .html(`<h2>1</h2>`)
      .layout_data(`core`)
      .flex_item_data({ growfactor: `2`, styleclass: `item1` })
      .get_parent()
      .get_parent()
      .html(`<h2>2</h2>`)
      .layout_data(`core`)
      .flex_item_data({ growfactor: `3`, styleclass: `item2` })
      .get_parent()
      .get_parent()
      .vbox({ fitcontainer: true })
      .layout_data()
      .flex_item_data({ growfactor: `7` })
      .get_parent()
      .html(`<h2>3</h2>`)
      .layout_data(`core`)
      .flex_item_data({ growfactor: `5`, styleclass: `item3` })
      .get_parent()
      .get_parent()
      .hbox({ fitcontainer: true, alignitems: `Stretch` })
      .layout_data()
      .flex_item_data({ growfactor: `3` })
      .get_parent()
      .html(`<h2>4</h2>`)
      .layout_data(`core`)
      .flex_item_data({ growfactor: `1`, styleclass: `item4` })
      .get_parent()
      .get_parent()
      .html(`<h2>5</h2>`)
      .layout_data(`core`)
      .flex_item_data({ growfactor: `1`, styleclass: `item5` })
      .get_parent()
      .get_parent()
      .get_parent()
      .get_parent()
      .html(`<h2>6</h2>`)
      .layout_data(`core`)
      .flex_item_data({ growfactor: `5`, styleclass: `item6` });
    this.client.view_display(view.stringify());
  }
}

module.exports = z2ui5_cl_demo_app_404;
