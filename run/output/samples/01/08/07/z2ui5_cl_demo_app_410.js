const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_410 extends z2ui5_if_app {
  client = null;

  view_display() {
    const fix_text = `Fix content - Lorem Ipsum is simply dummy text of the printing and typesetting industry. ` + `Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley ` + `of type and scrambled it to make a type specimen book. ` + `It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ` + `It was popularised in the 1960s with the release of Letraset sheets containing.`;
    const view = z2ui5_cl_xml_view.factory();
    const page = view.shell()
      .page({ title: `abap2UI5 - Sample: Fix Flex - Fix container size`, navbuttonpress: this.client._event_nav_app_leave(), shownavbutton: this.client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.ui.layout.FixFlex/sample/sap.ui.layout.sample.FixFlexFixedSize` });
    page.fix_flex({ ns: `layout`, class: `fixFlexFixedSize`, fixcontentsize: `150px` })
      .fix_content(`layout`)
      .scroll_container({ height: `100%`, vertical: true })
      .text(fix_text)
      .text(fix_text)
      .text(fix_text)
      .text(fix_text)
      .get_parent()
      .get_parent()
      .flex_content(`layout`)
      .text({ class: `column1`, text: `This container is flexible and it will adapt its size to fill the remaining size in the FixFlex control` });
    this.client.view_display(view.stringify());
  }

  async main(client) {
    this.client = z2ui5_cl_util.abap_copy(client);
    if (client.check_on_init()) {
      this.view_display();
    }
  }
}

module.exports = z2ui5_cl_demo_app_410;
