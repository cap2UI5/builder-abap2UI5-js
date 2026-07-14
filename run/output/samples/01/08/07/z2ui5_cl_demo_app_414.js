const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_414 extends z2ui5_if_app {
  client = null;

  view_display() {
    const view = z2ui5_cl_xml_view.factory();
    const page = view.shell()
      .page({ title: `abap2UI5 - Sample: Object Page Layout Section sample`, navbuttonpress: this.client._event_nav_app_leave(), shownavbutton: this.client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.uxap.ObjectPageSection/sample/sap.uxap.sample.ObjectPageSection` });
    const object_page = page.object_page_layout({ uppercaseanchorbar: false });
    object_page.header_title().object_page_header({ objecttitle: `Section sample` });
    object_page.header_content(`uxap`)
      .object_attribute({ text: `This example explains the rules for the rendering of sections` });
    const sections = object_page.sections();
    const subsections1 = sections.object_page_section({ titleuppercase: false, title: `Section 1` }).sub_sections();
    subsections1.object_page_sub_section({ title: `Subsection 1.1`, titleuppercase: false })
      .blocks()
      .text(`The title of the first section is not shown in the page but it is shown in the AnchorBar. Subsection titles are displayed.`);
    subsections1.object_page_sub_section({ title: `Subsection 1.2`, titleuppercase: false })
      .blocks()
      .text(`If there are several Subsections in a section, the subsection names are displayed in a popup when clicking the section name in the AnchorBar.`);
    sections.object_page_section({ titleuppercase: false, title: `Section 2` });
    sections.object_page_section({ titleuppercase: false, title: `Section 3` })
      .sub_sections()
      .object_page_sub_section({ titleuppercase: false })
      .blocks()
      .text(`Section 2 is empty and is not displayed between section 1 and section 3.`);
    sections.object_page_section({ titleuppercase: false, title: `Section 4` })
      .sub_sections()
      .object_page_sub_section({ titleuppercase: false })
      .blocks()
      .text(`Single Subsections are promoted to section.`);
    sections.object_page_section({ titleuppercase: false, title: `Section 5` })
      .sub_sections()
      .object_page_sub_section({ titleuppercase: false })
      .blocks()
      .text(`Single Subsections are promoted to section. When they do not have a name, the section name is used.`);
    this.client.view_display(view.stringify());
  }

  async main(client) {
    this.client = z2ui5_cl_util.abap_copy(client);
    if (client.check_on_init()) {
      this.view_display();
    }
  }
}

module.exports = z2ui5_cl_demo_app_414;
