const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_537 extends z2ui5_if_app {
  t_employees = [];
  client = null;

  async main(client) {
    this.client = z2ui5_cl_util.abap_copy(client);
    if (client.check_on_init()) {
      this.t_employees = [{ name: `Michael Adams`, picture: `https://sapui5.hana.ondemand.com/test-resources/sap/uxap/images/person.png`, job: `Scrum Master` }, { name: `John Miller`, picture: `https://sapui5.hana.ondemand.com/test-resources/sap/uxap/images/person.png`, job: `Product Owner` }, { name: `Richard Wilson`, picture: `https://sapui5.hana.ondemand.com/test-resources/sap/uxap/images/person.png`, job: `Ux Designer` }, { name: `Julie Armstrong`, picture: `https://sapui5.hana.ondemand.com/test-resources/sap/uxap/images/person.png`, job: `Quality Engineer` }, { name: `Denise Smith`, picture: `https://sapui5.hana.ondemand.com/test-resources/sap/uxap/images/person.png`, job: `Team Member` }, { name: `Richard Adams`, picture: `https://sapui5.hana.ondemand.com/test-resources/sap/uxap/images/person.png`, job: `Team Member` }];
      this.view_display();
    }
  }

  view_display() {
    let sy_tabix = 0;
    const view = z2ui5_cl_xml_view.factory();
    const page = view.shell()
      .page({ title: `abap2UI5 - Sample: Object Page using the Tab navigation mode`, navbuttonpress: this.client._event_nav_app_leave(), shownavbutton: this.client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.uxap.ObjectPageLayout/sample/sap.uxap.sample.ObjectPageTabNavigationMode` });
    const objectpage = page.object_page_layout({ enablelazyloading: true, useicontabbar: true, showtitleinheadercontent: true, uppercaseanchorbar: false });
    const header_title = objectpage.header_title().object_page_dyn_header_title();
    header_title.expanded_heading().title({ text: `Denise Smith`, wrapping: true });
    header_title.snapped_heading()
      .flex_box({ fitcontainer: true, alignitems: `Center` })
      .title({ text: `Denise Smith`, wrapping: true });
    header_title.expanded_content(`uxap`).text(`Senior UI Developer`);
    header_title.snapped_content(`uxap`).text(`Senior UI Developer`);
    header_title.snapped_title_on_mobile().title(`Senior UI Developer`);
    header_title.actions(`uxap`)
      .button({ text: `Edit`, type: `Emphasized` })
      .button({ type: `Transparent`, text: `Delete` })
      .button({ type: `Transparent`, text: `Copy` })
      .overflow_toolbar_button({ icon: `sap-icon://action`, type: `Transparent`, text: `Share`, tooltip: `action` });
    objectpage.header_content(`uxap`)
      .flex_box({ wrap: `Wrap`, fitcontainer: true })
      .vertical_layout({ class: `sapUiSmallMarginBeginEnd` })
      .link({ text: `+33 6 4512 5158` })
      .link({ text: `DeniseSmith@sap.com` })
      .get_parent()
      .horizontal_layout({ class: `sapUiSmallMarginBeginEnd` })
      .image({ src: `https://sapui5.hana.ondemand.com/test-resources/sap/uxap/images/linkedin.png` })
      .image({ src: `https://sapui5.hana.ondemand.com/test-resources/sap/uxap/images/Twitter.png`, class: `sapUiSmallMarginBegin` })
      .get_parent()
      .vertical_layout({ class: `sapUiSmallMarginBeginEnd` })
      .label(`Hello! I am Denise and I use UxAP`)
      .vbox()
      .label(`Achieved goals`)
      .progress_indicator({ percentvalue: `30`, displayvalue: `30%` })
      .get_parent()
      .get_parent()
      .vertical_layout({ class: `sapUiSmallMarginBeginEnd` })
      .label(`San Jose, USA`);
    const sections = objectpage.sections();
    sections.object_page_section({ titleuppercase: false, id: `goals`, title: `2014 Goals Plan` })
      .sub_sections()
      .object_page_sub_section({ id: `goalsSS1`, titleuppercase: false })
      .blocks()
      .simple_form({ editable: false, layout: `ColumnLayout` })
      .content(`form`)
      .label(`Evangelize the UI framework across the company`)
      .text(`4 days overdue Cascaded`)
      .label(`Get trained in development management direction`)
      .text(`Due Nov 21`)
      .label(`Mentor junior developers`)
      .text(`Due Dec 31 Cascaded`);
    const personal = sections.object_page_section({ titleuppercase: false, id: `personal`, title: `Personal` })
      .sub_sections();
    const connect = personal.object_page_sub_section({ id: `personalSS1`, title: `Connect`, titleuppercase: false })
      .blocks();
    connect.simple_form({ layout: `ColumnLayout`, width: `100%` })
      .content(`form`)
      .title({ ns: `core`, text: `Phone Numbers` })
      .label(`Home`)
      .text(`+ 1 415-321-1234`)
      .label(`Office phone`)
      .text(`+ 1 415-321-5555`);
    connect.simple_form({ editable: false, labelspanl: `4`, labelspanm: `4`, labelspans: `4`, emptyspanl: `0`, emptyspanm: `0`, emptyspans: `0`, width: `100%` })
      .content(`form`)
      .title({ ns: `core`, text: `Social Accounts` })
      .label(`LinkedIn`)
      .text(`/DeniseSmith`)
      .label(`Twitter`)
      .text(`@DeniseSmith`);
    connect.simple_form({ layout: `ColumnLayout`, editable: false, width: `100%` })
      .content(`form`)
      .title({ ns: `core`, text: `Addresses` })
      .label(`Home Address`)
      .text(`2096 Mission Street`)
      .label(`Mailing Address`)
      .text(`PO Box 32114`);
    connect.simple_form({ layout: `ColumnLayout`, width: `100%` })
      .content(`form`)
      .title({ ns: `core`, text: `Mailing Address` })
      .label(`Work`)
      .text(`DeniseSmith@sap.com`);
    const payment = personal.object_page_sub_section({ id: `personalSS2`, title: `Payment information`, titleuppercase: false });
    payment.blocks()
      .simple_form({ editable: false, layout: `ColumnLayout` })
      .content(`form`)
      .title({ ns: `core`, text: `Main Payment Method` })
      .label(`Bank Transfer`)
      .text(`Sparkasse Heimfeld, Germany`);
    payment.more_blocks()
      .simple_form({ editable: false, layout: `ColumnLayout` })
      .content(`form`)
      .title({ ns: `core`, text: `Payment method for Expenses` })
      .label(`Extra Travel Expenses`)
      .text(`Cash 100 USD`);
    const employment = sections.object_page_section({ titleuppercase: false, id: `employment`, title: `Employment` })
      .sub_sections();
    const job_info = employment.object_page_sub_section({ id: `employmentSS1`, title: `Job information`, titleuppercase: false })
      .blocks();
    job_info.simple_form({ labelspanl: `4`, labelspanm: `4`, editable: false, labelspans: `4`, emptyspanl: `0`, emptyspanm: `0`, emptyspans: `0`, layout: `ResponsiveGridLayout`, width: `100%` })
      .content(`form`)
      .label(`Job classification`)
      .text(`Senior Ui Developer (UIDEV-SR)`)
      .text(` `)
      .label(`Pay Grade`)
      .text(`Salary Grade 18 (GR-14)`)
      .text(` `)
      .label(`Job title`)
      .text(`Developer`)
      .text(` `)
      .label(`Local Job Title`)
      .label(`Ui Developer`);
    job_info.simple_form({ labelspanl: `4`, labelspanm: `4`, editable: false, labelspans: `4`, emptyspanl: `0`, emptyspanm: `0`, emptyspans: `0`, layout: `ResponsiveGridLayout`, width: `100%` })
      .content(`form`)
      .label(`Employee Class`)
      .text(`Employee`)
      .text(` `)
      .label(`FTE`)
      .text(`1`)
      .text(` `)
      .label(`Standard Weekly Hours`)
      .label(`40`);
    job_info.horizontal_layout({ class: `sapUiSmallMarginTop` })
      .vertical_layout()
      .label(`Manager`)
      .horizontal_layout()
      .content(`layout`)
      .vertical_layout()
      .text(`James Smith`)
      .text(`Development Manager`);
    const emp_detail = employment.object_page_sub_section({ id: `employmentSS2`, title: `Employee Details`, titleuppercase: false });
    emp_detail.blocks()
      .simple_form({ labelspanl: `4`, labelspanm: `4`, editable: false, labelspans: `4`, emptyspanl: `0`, emptyspanm: `0`, emptyspans: `0`, layout: `ResponsiveGridLayout`, width: `100%` })
      .content(`form`)
      .title({ ns: `core`, text: `Termination information` })
      .label(`Ok to return`)
      .text(`No`)
      .label(`Regret Termination`)
      .text(`Yes`);
    const emp_detail_more = emp_detail.more_blocks();
    emp_detail_more.simple_form({ labelspanl: `4`, labelspanm: `4`, labelspans: `4`, emptyspanl: `0`, emptyspanm: `0`, emptyspans: `0`, editable: false, layout: `ResponsiveGridLayout`, width: `100%` })
      .content(`form`)
      .label(`Start Date`)
      .text(`Jan 01, 2001`)
      .label(`End Date`)
      .text(`Jun 30, 2014`)
      .label(`Last Date Worked`)
      .text(`Jun 01, 2014`)
      .label(`Payroll End Date`)
      .text(`Jun 01, 2014`);
    emp_detail_more.simple_form({ labelspanl: `4`, labelspanm: `4`, editable: false, labelspans: `4`, emptyspanl: `0`, emptyspanm: `0`, emptyspans: `0`, layout: `ResponsiveGridLayout`, width: `100%` })
      .content(`form`)
      .label(`Payroll End Date`)
      .text(`Jan 01, 2014`)
      .label(`Benefits End Date`)
      .text(`Jun 30, 2014`)
      .label(`Stock End Date`)
      .text(`Jun 01, 2014`)
      .label(`Eligible for Salary Contribution`)
      .text(`No`);
    const job_relationship = employment.object_page_sub_section({ id: `employmentSS3`, title: `Job Relationship`, titleuppercase: false });
    const collapsed_content = job_relationship.blocks()
      .grid({ default_span: `L4 M6 S12`, hspacing: `0`, width: `100%` })
      .content(`layout`);
    this.employees_display({ grid_content: collapsed_content, index_from: 1, index_to: 2, linebreak: true });
    const expanded_content = job_relationship.more_blocks()
      .grid({ default_span: `L4 M6 S12`, hspacing: `0`, width: `100%` })
      .content(`layout`);
    this.employees_display({ grid_content: expanded_content, index_from: 3, index_to: 4 });
    this.employees_display({ grid_content: expanded_content, index_from: 5, index_to: 6 });
    const connections = sections.object_page_section({ titleuppercase: false, id: `connections`, title: `Connections` })
      .sub_sections()
      .object_page_sub_section({ id: `connectionsSS1`, titleuppercase: false })
      .blocks();
    sy_tabix = 0;
    for (const s_employee of this.t_employees) {
      sy_tabix++;
      connections.panel().vbox().image({ src: s_employee.picture }).label(s_employee.name).label(s_employee.job);
    }
    this.client.view_display(view.stringify());
  }

  employees_display({ grid_content, index_from, index_to, linebreak = false } = {}) {
    let sy_tabix = 0;
    const layout = grid_content.vertical_layout();
    if ((linebreak === true || linebreak === `X`)) {
      layout.layout_data(`layout`).grid_data({ linebreak: true });
    }
    sy_tabix = 0;
    for (const s_employee of this.t_employees) {
      sy_tabix++;
      layout.horizontal_layout()
        .grid({ default_span: `L4 M4 S4`, hspacing: `0`, width: `100%` })
        .content(`layout`)
        .vertical_layout()
        .label(s_employee.name)
        .label(s_employee.job)
        .layout_data(`layout`)
        .grid_data(`L12 M12 S12`);
    }
  }
}

module.exports = z2ui5_cl_demo_app_537;
