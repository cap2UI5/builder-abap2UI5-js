const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_471 extends z2ui5_if_app {
  expanded = false;
  client = null;

  view_display({ client } = {}) {
    const lorem = `Lorem ipsum dolor st amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. ` + `At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. ` + `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. ` + `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat`;
    const view = z2ui5_cl_xml_view.factory();
    const page = view.shell()
      .page({ title: `abap2UI5 - Sample: Panel - Expand / Collapse`, navbuttonpress: client._event_nav_app_leave(), shownavbutton: client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.m.Panel/sample/sap.m.sample.PanelExpanded` });
    page.panel({ expandable: true, headertext: `Panel with a header text`, width: `auto`, class: `sapUiResponsiveMargin` })
      .text(lorem);
    page.panel({ expandable: true, width: `auto`, class: `sapUiResponsiveMargin` })
      .header_toolbar()
      .overflow_toolbar({ style: `Clear` })
      .title(`Custom Toolbar with a header text`)
      .toolbar_spacer()
      .button({ icon: `sap-icon://settings` })
      .button({ icon: `sap-icon://drop-down-list` })
      .get_parent()
      .get_parent()
      .text(lorem);
    page.panel({ id: `expandablePanel`, expandable: true, expanded: client._bind_edit(this.expanded), width: `auto`, class: `sapUiResponsiveMargin` })
      .header_toolbar()
      .overflow_toolbar({ active: true, press: client._event(`TOOLBAR_PRESSED`) })
      .title(`Clickable Custom Toolbar with a header text`)
      .toolbar_spacer()
      .button({ icon: `sap-icon://settings` })
      .button({ icon: `sap-icon://drop-down-list` })
      .get_parent()
      .get_parent()
      .text(lorem);
    client.view_display(view.stringify());
  }

  on_event({ client } = {}) {
    if (client.check_on_event(`TOOLBAR_PRESSED`)) {
      this.expanded = (!(this.expanded === true || this.expanded === `X`));
      client.view_model_update();
    }
  }

  async main(client) {
    this.client = z2ui5_cl_util.abap_copy(client);
    if (client.check_on_init()) {
      this.view_display({ client: client });
    }
    this.on_event({ client: client });
  }
}

module.exports = z2ui5_cl_demo_app_471;
