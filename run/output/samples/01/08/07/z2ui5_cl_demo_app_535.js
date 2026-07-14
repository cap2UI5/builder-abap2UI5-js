const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_535 extends z2ui5_if_app {
  view_display({ client } = {}) {
    const page = z2ui5_cl_xml_view.factory()
      .shell()
      .page({ title: `abap2UI5 - Sample: Object Page with LazyLoading`, navbuttonpress: client._event_nav_app_leave(), shownavbutton: client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.uxap.ObjectPageLayout/sample/sap.uxap.sample.ObjectPageOnJSONWithLazyLoading` });
    const object_page_layout = page.object_page_layout({ enablelazyloading: true, uppercaseanchorbar: false });
    const header_title = object_page_layout.header_title().object_page_dyn_header_title();
    header_title.heading(`uxap`).title(`ObjectPage with LazyLoading`);
    header_title.snapped_title_on_mobile().title(`ObjectPage with LazyLoading`);
    header_title.actions(`uxap`)
      .button({ text: `Edit`, type: `Emphasized` })
      .button({ type: `Transparent`, text: `Delete` })
      .button({ type: `Transparent`, text: `Copy` })
      .overflow_toolbar_button({ icon: `sap-icon://action`, type: `Transparent`, text: `Share`, tooltip: `action` });
    const sections = object_page_layout.sections();
    for (let sy_index = 1; sy_index <= 11; sy_index++) {
      this.render_section({ sections, index: sy_index });
    }
    client.view_display(page.stringify());
  }

  render_section({ sections, index } = {}) {
    let sy_tabix = 0;
    let t_employees = [];
    t_employees = [{ name: `Michael Adams`, job: `Scrum Master` }, { name: `John Miller`, job: `Product Owner` }, { name: `Richard Wilson`, job: `Ux Designer` }, { name: `Julie Armstrong`, job: `Quality Engineer` }, { name: `Denise Smith`, job: `Team Member` }, { name: `Richard Adams`, job: `Team Member` }];
    const job_grid = sections.object_page_section({ titleuppercase: false, title: `my section` })
      .sub_sections()
      .object_page_sub_section({ title: `Section ${index}`, mode: `Expanded`, titleuppercase: false })
      .blocks()
      .grid({ default_span: `L4 M6 S12`, hspacing: `0`, width: `100%` });
    sy_tabix = 0;
    for (const s_employee of t_employees) {
      sy_tabix++;
      job_grid.vertical_layout().label(s_employee.name).label(s_employee.job);
    }
  }

  async main(client) {
    if (client.check_on_init()) {
      this.view_display({ client: client });
    }
  }
}

module.exports = z2ui5_cl_demo_app_535;
