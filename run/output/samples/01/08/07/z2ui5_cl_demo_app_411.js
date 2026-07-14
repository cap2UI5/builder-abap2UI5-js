const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_411 extends z2ui5_if_app {
  client = null;

  view_display() {
    const view = z2ui5_cl_xml_view.factory();
    const page = view.shell()
      .page({ title: `abap2UI5 - Sample: Object Page with ObjectPageHeaderActionButtons`, navbuttonpress: this.client._event_nav_app_leave(), shownavbutton: this.client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.m.GenericTag/sample/sap.uxap.sample.ObjectPageHeaderActionButtons` });
    const object_page = page.object_page_layout({ showtitleinheadercontent: true, uppercaseanchorbar: false });
    const header_title = object_page.header_title().object_page_dyn_header_title();
    header_title._generic({ name: `breadcrumbs`, ns: `uxap` })
      .breadcrumbs()
      .link({ text: `Page 1` })
      .link({ text: `Page 2` })
      .link({ text: `Page 3` })
      .link({ text: `Page 4` })
      .link({ text: `Page 5` });
    header_title.expanded_heading().title({ text: `Denise Smith`, wrapping: true });
    header_title.snapped_heading().title({ text: `Denise Smith`, wrapping: true });
    header_title.expanded_content(`uxap`).text(`Senior Developer`);
    header_title.snapped_content(`uxap`).text(`Senior Developer`);
    header_title.actions(`uxap`)
      .object_page_header_action_btn({ text: `Edit`, type: `Emphasized`, hidetext: false })
      .object_page_header_action_btn({ type: `Transparent`, text: `Delete`, hidetext: false, hideicon: true })
      .object_page_header_action_btn({ type: `Transparent`, text: `Copy`, hidetext: false, hideicon: true })
      .object_page_header_action_btn({ type: `Transparent`, text: `Add`, hidetext: false, hideicon: true })
      .object_page_header_action_btn({ icon: `sap-icon://action`, type: `Transparent`, text: `Share` })
      .get()
      ._generic_property({ n: `tooltip`, v: `action` });
    header_title._generic({ name: `navigationActions`, ns: `uxap` })
      .object_page_header_action_btn({ icon: `sap-icon://slim-arrow-up`, type: `Transparent` })
      .get()
      ._generic_property({ n: `tooltip`, v: `slim-arrow-up` })
      .get_parent()
      .object_page_header_action_btn({ icon: `sap-icon://slim-arrow-down`, type: `Transparent` })
      .get()
      ._generic_property({ n: `tooltip`, v: `slim-arrow-down` });
    header_title.content(`uxap`).generic_tag({ text: `Material Shortage`, status: `Warning` });
    object_page.header_content(`uxap`)
      .horizontal_layout({ allowwrapping: true })
      .vertical_layout({ class: `sapUiMediumMarginEnd` })
      .object_attribute({ title: `Location`, text: `Warehouse A` })
      .object_attribute({ title: `Halway`, text: `23L` })
      .object_attribute({ title: `Rack`, text: `34` })
      .get_parent()
      .vertical_layout()
      .object_attribute({ title: `Availability` })
      .object_status({ text: `In Stock`, state: `Success` });
    const sections = object_page.sections();
    const subsections1 = sections.object_page_section({ titleuppercase: false, id: `section1`, title: `Section 1` })
      .sub_sections();
    this.block_display({ blocks: subsections1.object_page_sub_section({ id: `section1_SS1`, title: `Subsection 1.1`, titleuppercase: false }).blocks() });
    this.block_display({ blocks: subsections1.object_page_sub_section({ id: `section1_SS2`, title: `Subsection 1.2`, titleuppercase: false }).blocks() });
    sections.object_page_section({ titleuppercase: false, id: `section2`, title: `Section 2` });
    this.block_display({ blocks: sections.object_page_section({ titleuppercase: false, id: `section3`, title: `Section 3` }).sub_sections().object_page_sub_section({ id: `section3_SS1`, title: ` `, titleuppercase: false }).blocks() });
    this.block_display({ blocks: sections.object_page_section({ titleuppercase: false, id: `section4`, title: `Section 4` }).sub_sections().object_page_sub_section({ id: `section4_SS1`, title: `Subsection 4.1`, titleuppercase: false }).blocks() });
    let index = 5;
    for (let sy_index = 1; sy_index <= 11; sy_index++) {
      this.block_display({ blocks: sections.object_page_section({ titleuppercase: false, title: `Section ${index}` }).sub_sections().object_page_sub_section({ title: ` `, titleuppercase: false }).blocks() });
      index = index + 1;
    }
    this.client.view_display(view.stringify());
  }

  block_display({ blocks } = {}) {
    blocks.simple_form({ editable: false, layout: `ResponsiveGridLayout` })
      .label(`Content`)
      .text(`some content goes here...`);
  }

  async main(client) {
    this.client = z2ui5_cl_util.abap_copy(client);
    if (client.check_on_init()) {
      this.view_display();
    }
  }
}

module.exports = z2ui5_cl_demo_app_411;
