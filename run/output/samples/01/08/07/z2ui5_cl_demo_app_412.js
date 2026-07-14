const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_412 extends z2ui5_if_app {
  client = null;

  view_display() {
    const view = z2ui5_cl_xml_view.factory();
    const page = view.shell()
      .page({ title: `abap2UI5 - Sample: Object Page Header Content Priorities`, navbuttonpress: this.client._event_nav_app_leave(), shownavbutton: this.client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.uxap.ObjectPageHeaderContent/sample/sap.uxap.sample.ObjectPageHeaderContentPriorities` });
    const object_page = page.object_page_layout({ showtitleinheadercontent: true, uppercaseanchorbar: false });
    const header_title = object_page.header_title().object_page_dyn_header_title();
    header_title.expanded_heading().title({ text: `Denise Smith`, wrapping: true });
    header_title.snapped_heading()
      .flex_box({ fitcontainer: true, alignitems: `Center` })
      .title({ text: `Denise Smith`, wrapping: true });
    header_title.expanded_content(`uxap`).text(`Senior Developer`);
    header_title.snapped_content(`uxap`).text(`Senior Developer`);
    header_title.snapped_title_on_mobile().title(`Senior Developer`);
    header_title.actions(`uxap`)
      .button({ text: `Edit`, type: `Emphasized` })
      .button({ type: `Transparent`, text: `Delete` })
      .button({ type: `Transparent`, text: `Copy` })
      .overflow_toolbar_button({ icon: `sap-icon://action`, type: `Transparent`, text: `Share`, tooltip: `action` });
    const header_content = object_page.header_content(`uxap`).flex_box({ wrap: `Wrap` });
    header_content.vertical_layout({ class: `sapUiSmallMarginBeginEnd` })
      .object_status({ title: `User ID`, text: `12345678` })
      .get_parent()
      .object_status({ title: `Language`, text: `English` })
      .get_parent()
      .object_status({ title: `Country`, text: `USA` })
      .get_parent()
      .object_status({ title: `Phone Number`, text: `1-844-726-7733` });
    header_content.vertical_layout({ class: `sapUiSmallMarginBeginEnd` })
      .object_status({ title: `Functional Area`, text: `Developement` })
      .get_parent()
      .object_status({ title: `Cost Center`, text: `PI DFA GD Programs and Product` })
      .get_parent()
      .object_status({ title: `Email`, text: `email@address.com` });
    const layout = header_content.vertical_layout({ class: `sapUiSmallMarginBeginEnd` });
    layout.layout_data(`layout`)
      ._generic({ name: `ObjectPageHeaderLayoutData`, ns: `uxap`, t_prop: [{ n: `visibleS`, v: `false` }, { n: `visibleM`, v: `false` }] });
    layout.object_status({ text: `Senior UI Developer`, state: `Success` });
    layout.rating_indicator({ maxvalue: `6`, value: `5`, tooltip: `Rating Tooltip` });
    const subsections = object_page.sections()
      .object_page_section({ titleuppercase: false, title: `2014 Goals Plan` })
      .sub_sections();
    for (let sy_index = 1; sy_index <= 4; sy_index++) {
      this.block_display({ blocks: subsections.object_page_sub_section({ title: `Goal summary`, titleuppercase: false }).blocks() });
    }
    this.client.view_display(view.stringify());
  }

  block_display({ blocks } = {}) {
    blocks.simple_form({ editable: false, layout: `ColumnLayout` })
      .label(`Evangelize the UI framework across the company`)
      .text(`4 days overdue Cascaded`)
      .label(`Get trained in development management direction`)
      .text(`Due Nov 21`)
      .label(`Mentor junior developers`)
      .text(`Due Dec 31 Cascaded`);
  }

  async main(client) {
    this.client = z2ui5_cl_util.abap_copy(client);
    if (client.check_on_init()) {
      this.view_display();
    }
  }
}

module.exports = z2ui5_cl_demo_app_412;
