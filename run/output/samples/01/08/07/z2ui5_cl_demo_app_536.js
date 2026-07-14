const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_536 extends z2ui5_if_app {
  t_employees = [];

  view_display({ client } = {}) {
    this.t_employees = [{ name: `Michael Adams`, job: `Scrum Master` }, { name: `John Miller`, job: `Product Owner` }, { name: `Richard Wilson`, job: `Ux Designer` }, { name: `Julie Armstrong`, job: `Quality Engineer` }, { name: `Denise Smith`, job: `Team Member` }, { name: `Richard Adams`, job: `Team Member` }];
    const page = z2ui5_cl_xml_view.factory()
      .shell()
      .page({ title: `abap2UI5 - Sample: Object Page with predefined selected section in Tab navigation mode`, navbuttonpress: client._event_nav_app_leave(), shownavbutton: client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.uxap.ObjectPageLayout/sample/sap.uxap.sample.ObjectPageSelectedSection` });
    const object_page_layout = page.object_page_layout({ enablelazyloading: true, useicontabbar: true, showtitleinheadercontent: true, uppercaseanchorbar: false })
      ._generic_property({ n: `selectedSection`, v: `personal` });
    const header_title = object_page_layout.header_title().object_page_dyn_header_title();
    header_title.expanded_heading().title({ text: `Denise Smith`, wrapping: true });
    header_title.snapped_heading()
      .flex_box({ fitcontainer: true, alignitems: `Center` })
      .image({ src: `https://sapui5.hana.ondemand.com/test-resources/sap/uxap/images/imageID_275314.png`, width: `2rem`, class: `sapUiTinyMarginEnd` })
      .title({ text: `Denise Smith`, wrapping: true });
    header_title.expanded_content(`uxap`).text(`Senior UI Developer`);
    header_title.snapped_content(`uxap`).text(`Senior UI Developer`);
    header_title.snapped_title_on_mobile().title(`Senior UI Developer`);
    header_title.actions(`uxap`)
      .button({ text: `Edit`, type: `Emphasized` })
      .button({ type: `Transparent`, text: `Delete` })
      .button({ type: `Transparent`, text: `Copy` })
      .overflow_toolbar_button({ icon: `sap-icon://action`, type: `Transparent`, text: `Share`, tooltip: `action` });
    const flex_box = object_page_layout.header_content(`uxap`).flex_box({ wrap: `Wrap`, fitcontainer: true });
    flex_box.image({ src: `https://sapui5.hana.ondemand.com/test-resources/sap/uxap/images/imageID_275314.png`, width: `5rem`, class: `sapUiSmallMarginEnd` });
    flex_box.vertical_layout({ class: `sapUiSmallMarginBeginEnd` })
      .link({ text: `+33 6 4512 5158` })
      .link({ text: `DeniseSmith@sap.com` });
    flex_box.horizontal_layout({ class: `sapUiSmallMarginBeginEnd` })
      .image({ src: `https://sapui5.hana.ondemand.com/test-resources/sap/uxap/images/linkedin.png` })
      .image({ src: `https://sapui5.hana.ondemand.com/test-resources/sap/uxap/images/Twitter.png`, class: `sapUiSmallMarginBegin` });
    flex_box.vertical_layout({ class: `sapUiSmallMarginBeginEnd` })
      .label(`Hello! I am Denise and I use UxAP`)
      .vbox()
      .label(`Achieved goals`)
      .progress_indicator({ percentvalue: `30`, displayvalue: `30%` });
    flex_box.vertical_layout({ class: `sapUiSmallMarginBeginEnd` }).label(`San Jose, USA`);
    const sections = object_page_layout.sections();
    this.render_goals_section({ sections: sections });
    this.render_personal_section({ sections: sections });
    this.render_employment_section({ sections: sections });
    this.render_connections_section({ sections: sections });
    client.view_display(page.stringify());
  }

  render_goals_section({ sections } = {}) {
    sections.object_page_section({ titleuppercase: false, id: `goals`, title: `2014 Goals Plan` })
      .sub_sections()
      .object_page_sub_section({ id: `goalsSS1`, titleuppercase: false })
      .blocks()
      .simple_form({ editable: false, layout: `ColumnLayout` })
      .label(`Evangelize the UI framework across the company`)
      .text(`4 days overdue Cascaded`)
      .label(`Get trained in development management direction`)
      .text(`Due Nov 21`)
      .label(`Mentor junior developers`)
      .text(`Due Dec 31 Cascaded`);
  }

  render_personal_section({ sections } = {}) {
    const sub_sections = sections.object_page_section({ titleuppercase: false, id: `personal`, title: `Personal` })
      .sub_sections();
    const connect_blocks = sub_sections.object_page_sub_section({ id: `personalSS1`, title: `Connect`, titleuppercase: false })
      .blocks();
    connect_blocks.simple_form({ editable: false, layout: `ColumnLayout`, width: `100%` })
      .title({ ns: `core`, text: `Phone Numbers` })
      .label(`Home`)
      .text(`+ 1 415-321-1234`)
      .label(`Office phone`)
      .text(`+ 1 415-321-5555`);
    connect_blocks.simple_form({ editable: false, layout: `ColumnLayout`, width: `100%` })
      .title({ ns: `core`, text: `Social Accounts` })
      .label(`LinkedIn`)
      .text(`/DeniseSmith`)
      .label(`Twitter`)
      .text(`@DeniseSmith`);
    connect_blocks.simple_form({ editable: false, layout: `ColumnLayout`, width: `100%` })
      .title({ ns: `core`, text: `Addresses` })
      .label(`Home Address`)
      .text(`2096 Mission Street`)
      .label(`Mailing Address`)
      .text(`PO Box 32114`);
    connect_blocks.simple_form({ editable: false, layout: `ColumnLayout`, width: `100%` })
      .title({ ns: `core`, text: `Mailing Address` })
      .label(`Work`)
      .text(`DeniseSmith@sap.com`);
    const payment = sub_sections.object_page_sub_section({ id: `personalSS2`, title: `Payment information`, titleuppercase: false });
    payment.blocks()
      .simple_form({ editable: false, layout: `ColumnLayout` })
      .title({ ns: `core`, text: `Main Payment Method` })
      .label(`Bank Transfer`)
      .text(`Sparkasse Heimfeld, Germany`);
    payment.more_blocks()
      .simple_form({ editable: false, layout: `ColumnLayout` })
      .title({ ns: `core`, text: `Payment method for Expenses` })
      .label(`Extra Travel Expenses`)
      .text(`Cash 100 USD`);
  }

  render_employment_section({ sections } = {}) {
    let sy_tabix = 0;
    const sub_sections = sections.object_page_section({ titleuppercase: false, id: `employment`, title: `Employment` })
      .sub_sections();
    const job_info_blocks = sub_sections.object_page_sub_section({ id: `employmentSS1`, title: `Job information`, titleuppercase: false })
      .blocks();
    job_info_blocks.simple_form({ editable: false, layout: `ResponsiveGridLayout`, labelspanl: `4`, labelspanm: `4`, labelspans: `4`, emptyspanl: `0`, emptyspanm: `0`, emptyspans: `0`, maxcontainercols: `2`, width: `100%` })
      .label(`Job classification`)
      .text(`Senior Ui Developer (UIDEV-SR)`)
      .label(`Pay Grade`)
      .text(`Salary Grade 18 (GR-14)`)
      .label(`Job title`)
      .text(`Developer`)
      .label(`Local Job Title`)
      .label(`Ui Developer`);
    job_info_blocks.simple_form({ editable: false, layout: `ResponsiveGridLayout`, labelspanl: `4`, labelspanm: `4`, labelspans: `4`, emptyspanl: `0`, emptyspanm: `0`, emptyspans: `0`, maxcontainercols: `2`, width: `100%` })
      .label(`Employee Class`)
      .text(`Employee`)
      .label(`FTE`)
      .text(`1`)
      .label(`Standard Weekly Hours`)
      .label(`40`);
    job_info_blocks.horizontal_layout({ class: `sapUiSmallMarginTop` })
      .vertical_layout()
      .label(`Manager`)
      .horizontal_layout()
      .vertical_layout()
      .text(`James Smith`)
      .text(`Development Manager`);
    const details = sub_sections.object_page_sub_section({ id: `employmentSS2`, title: `Employee Details`, titleuppercase: false });
    details.blocks()
      .simple_form({ editable: false, layout: `ResponsiveGridLayout`, labelspanl: `4`, labelspanm: `4`, labelspans: `4`, emptyspanl: `0`, emptyspanm: `0`, emptyspans: `0`, maxcontainercols: `2`, width: `100%` })
      .title({ ns: `core`, text: `Termination information` })
      .label(`Ok to return`)
      .text(`No`)
      .label(`Regret Termination`)
      .text(`Yes`);
    const more_details = details.more_blocks();
    more_details.simple_form({ editable: false, layout: `ResponsiveGridLayout`, labelspanl: `4`, labelspanm: `4`, labelspans: `4`, emptyspanl: `0`, emptyspanm: `0`, emptyspans: `0`, maxcontainercols: `2`, width: `100%` })
      .label(`Start Date`)
      .text(`Jan 01, 2001`)
      .label(`End Date`)
      .text(`Jun 30, 2014`)
      .label(`Last Date Worked`)
      .text(`Jun 01, 2014`)
      .label(`Payroll End Date`)
      .text(`Jun 01, 2014`);
    more_details.simple_form({ editable: false, layout: `ResponsiveGridLayout`, labelspanl: `4`, labelspanm: `4`, labelspans: `4`, emptyspanl: `0`, emptyspanm: `0`, emptyspans: `0`, maxcontainercols: `2`, width: `100%` })
      .label(`Payroll End Date`)
      .text(`Jan 01, 2014`)
      .label(`Benefits End Date`)
      .text(`Jun 30, 2014`)
      .label(`Stock End Date`)
      .text(`Jun 01, 2014`)
      .label(`Eligible for Salary Contribution`)
      .text(`No`);
    const job_grid = sub_sections.object_page_sub_section({ id: `employmentSS3`, title: `Job Relationship`, titleuppercase: false })
      .blocks()
      .grid({ default_span: `L4 M6 S12`, hspacing: `0`, width: `100%` });
    sy_tabix = 0;
    for (const s_employee of this.t_employees) {
      sy_tabix++;
      job_grid.vertical_layout().label(s_employee.name).label(s_employee.job);
    }
  }

  render_connections_section({ sections } = {}) {
    let sy_tabix = 0;
    const connections_blocks = sections.object_page_section({ titleuppercase: false, id: `connections`, title: `Connections` })
      .sub_sections()
      .object_page_sub_section({ id: `connectionsSS1`, titleuppercase: false })
      .blocks();
    sy_tabix = 0;
    for (const s_employee of this.t_employees) {
      sy_tabix++;
      connections_blocks.panel()
        .vbox()
        .image({ src: `https://sapui5.hana.ondemand.com/test-resources/sap/uxap/images/person.png` })
        .label(s_employee.name)
        .label(s_employee.job);
    }
  }

  async main(client) {
    if (client.check_on_init()) {
      this.view_display({ client: client });
    }
  }
}

module.exports = z2ui5_cl_demo_app_536;
