const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_534 extends z2ui5_if_app {
  view_display({ client } = {}) {
    const page = z2ui5_cl_xml_view.factory()
      .shell()
      .page({ title: `abap2UI5 - Sample: Object Page with LazyLoading without blocks`, navbuttonpress: client._event_nav_app_leave(), shownavbutton: client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.uxap.ObjectPageLayout/sample/sap.uxap.sample.ObjectPageLazyLoadingWithoutBlocks` });
    const object_page_layout = page.object_page_layout({ enablelazyloading: true, uppercaseanchorbar: false });
    const header_title = object_page_layout.header_title().object_page_dyn_header_title();
    header_title.heading(`uxap`).title(`ObjectPage with LazyLoading without the use of Blocks`);
    header_title.snapped_title_on_mobile().title(`ObjectPage with LazyLoading without the use of Blocks`);
    header_title.actions(`uxap`)
      .button({ text: `Edit`, type: `Emphasized` })
      .button({ type: `Transparent`, text: `Delete` })
      .button({ type: `Transparent`, text: `Copy` })
      .overflow_toolbar_button({ icon: `sap-icon://action`, type: `Transparent`, text: `Share`, tooltip: `action` });
    const sections = object_page_layout.sections();
    for (let sy_index = 1; sy_index <= 21; sy_index++) {
      this.render_section({ sections, index: sy_index });
    }
    client.view_display(page.stringify());
  }

  render_section({ sections, index } = {}) {
    sections.object_page_section({ titleuppercase: false, title: `my section` })
      .sub_sections()
      .object_page_sub_section({ id: `Section${index}`, title: `Section ${index}`, mode: `Expanded`, titleuppercase: false })
      .blocks()
      ._generic({ name: `ObjectPageLazyLoader`, ns: `uxap`, t_prop: [{ n: `id`, v: `Section${index}stashed` }, { n: `stashed`, v: `true` }] })
      .vbox(`sapUiSmallMargin`)
      .simple_form({ title: `Address`, editable: false, layout: `ResponsiveGridLayout`, labelspanl: `3`, labelspanm: `3`, emptyspanl: `4`, emptyspanm: `4`, columnsl: `1`, columnsm: `1`, maxcontainercols: `2`, width: `auto`, class: `sapUxAPObjectPageSubSectionAlignContent` })
      .label(`Name`)
      .text(`Red Point Stores`)
      .label(`Street/No.`)
      .text(`Main St 1618`)
      .label(`ZIP Code/City`)
      .text(`31415 Maintown`)
      .label(`Country`)
      .text(`Germany`);
  }

  async main(client) {
    if (client.check_on_init()) {
      this.view_display({ client: client });
    }
  }
}

module.exports = z2ui5_cl_demo_app_534;
