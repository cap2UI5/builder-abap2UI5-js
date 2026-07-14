const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_415 extends z2ui5_if_app {
  client = null;

  view_display() {
    const view = z2ui5_cl_xml_view.factory();
    const page = view.shell()
      .page({ title: `abap2UI5 - Sample: Subsection with Action buttons sample`, navbuttonpress: this.client._event_nav_app_leave(), shownavbutton: this.client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.uxap.ObjectPageSubSection/sample/sap.uxap.sample.ObjectPageSubSectionWithActions` });
    const object_page = page.object_page_layout({ uppercaseanchorbar: false });
    object_page.header_title().object_page_header({ objecttitle: `Action buttons sample` });
    const sections = object_page.sections();
    const subsections1 = sections.object_page_section({ titleuppercase: false, title: `examples` }).sub_sections();
    let subsection = subsections1.object_page_sub_section({ title: `Subsection with action buttons`, titleuppercase: false });
    this.block_display({ blocks: subsection.blocks() });
    subsection.actions(`uxap`).button({ icon: `sap-icon://synchronize` }).button({ icon: `sap-icon://expand` });
    this.block_display({ blocks: subsections1.object_page_sub_section({ title: `Subsection without action buttons`, titleuppercase: false }).blocks() });
    subsection = sections.object_page_section({ titleuppercase: false, title: `examples 2` })
      .sub_sections()
      .object_page_sub_section({ title: `Single subsection with action buttons`, titleuppercase: false });
    this.block_display({ blocks: subsection.blocks() });
    subsection.actions(`uxap`).button({ icon: `sap-icon://synchronize` }).button({ icon: `sap-icon://expand` });
    this.client.view_display(view.stringify());
  }

  block_display({ blocks } = {}) {
    blocks.text(`Block content goes here...`);
  }

  async main(client) {
    this.client = z2ui5_cl_util.abap_copy(client);
    if (client.check_on_init()) {
      this.view_display();
    }
  }
}

module.exports = z2ui5_cl_demo_app_415;
