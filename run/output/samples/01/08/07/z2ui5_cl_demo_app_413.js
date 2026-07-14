const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_413 extends z2ui5_if_app {
  client = null;

  view_display() {
    const view = z2ui5_cl_xml_view.factory();
    const page = view.shell()
      .page({ title: `abap2UI5 - Sample: Navigation to Section sample`, navbuttonpress: this.client._event_nav_app_leave(), shownavbutton: this.client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.uxap.ObjectPageLayout/sample/sap.uxap.sample.AnchorBarNoPopover` });
    const object_page = page.object_page_layout({ showanchorbarpopover: false, uppercaseanchorbar: false });
    const header_title = object_page.header_title().object_page_dyn_header_title();
    header_title.heading(`uxap`).title(`Navigation to sections`);
    header_title.snapped_title_on_mobile().title(`Navigation to sections`);
    header_title.actions(`uxap`)
      .button({ text: `Edit`, type: `Emphasized` })
      .button({ type: `Transparent`, text: `Delete` })
      .button({ type: `Transparent`, text: `Copy` })
      .overflow_toolbar_button({ icon: `sap-icon://action`, type: `Transparent`, text: `Share`, tooltip: `action` });
    object_page.header_content(`uxap`)
      .title({ text: `This example shows how to change the default behavior in order to be able to navigate to sections instead of subsections, using the Anchor Bar`, titlestyle: `H6` });
    const sections = object_page.sections();
    const subsections1 = sections.object_page_section({ titleuppercase: false, title: `Section 1` }).sub_sections();
    this.block_display({ blocks: subsections1.object_page_sub_section({ title: `Subsection 1.1`, titleuppercase: false }).blocks() });
    this.block_display({ blocks: subsections1.object_page_sub_section({ title: `Subsection 1.2`, titleuppercase: false }).blocks() });
    const subsections2 = sections.object_page_section({ titleuppercase: false, title: `Section 2` }).sub_sections();
    this.block_display({ blocks: subsections2.object_page_sub_section({ title: `Subsection 2.1`, titleuppercase: false }).blocks() });
    this.block_display({ blocks: subsections2.object_page_sub_section({ title: `Subsection 2.2`, titleuppercase: false }).blocks() });
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

module.exports = z2ui5_cl_demo_app_413;
