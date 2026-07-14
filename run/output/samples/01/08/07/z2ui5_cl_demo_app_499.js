const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_499 extends z2ui5_if_app {
  expanded = false;
  walked_visible = false;
  client = null;

  async main(client) {
    this.client = z2ui5_cl_util.abap_copy(client);
    if (client.check_on_init()) {
      this.expanded = false;
      this.walked_visible = true;
      this.view_display();
    } else if (client.check_on_event(`TOGGLE_EXPANDED`)) {
      this.expanded = (!(this.expanded === true || this.expanded === `X`));
      client.view_model_update();
    } else if (client.check_on_event(`TOGGLE_WALKED`)) {
      this.walked_visible = (!(this.walked_visible === true || this.walked_visible === `X`));
      client.view_model_update();
    }
  }

  view_display() {
    const page = z2ui5_cl_xml_view.factory()
      .shell()
      .page({ title: `abap2UI5 - Sample: Side Navigation`, navbuttonpress: this.client._event_nav_app_leave(), shownavbutton: this.client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.tnt.SideNavigation/sample/sap.tnt.sample.SideNavigation` });
    page.vbox({ rendertype: `Bare`, alignitems: `Start`, height: `100%` })
      .button({ text: `Toggle Collapse/Expand`, icon: `sap-icon://menu2`, press: this.client._event(`TOGGLE_EXPANDED`) })
      .button({ text: `Show/Hide "Walked"`, icon: `sap-icon://menu2`, press: this.client._event(`TOGGLE_WALKED`) })
      .side_navigation({ selectedkey: `walked` })
      ._generic_property({ n: `expanded`, v: this.client._bind(this.expanded) })
      .navigation_list()
      .navigation_list_item({ text: `Home`, icon: `sap-icon://home` })
      .navigation_list_item({ text: `People`, icon: `sap-icon://people-connected` })
      ._generic({ name: `NavigationListItem`, ns: `tnt`, t_prop: [{ n: `text`, v: `Building` }, { n: `icon`, v: `sap-icon://building` }] })
      .navigation_list_item({ text: `Office 01` })
      .navigation_list_item({ text: `Office 02` })
      .get_parent()
      ._generic({ name: `NavigationListItem`, ns: `tnt`, t_prop: [{ n: `text`, v: `Mileage` }, { n: `icon`, v: `sap-icon://mileage` }] })
      .navigation_list_item({ text: `Driven` })
      ._generic({ name: `NavigationListItem`, ns: `tnt`, t_prop: [{ n: `text`, v: `Walked` }, { n: `key`, v: `walked` }, { n: `visible`, v: this.client._bind(this.walked_visible) }] })
      .get_parent()
      .get_parent()
      .navigation_list_item({ text: `Managing My Area`, icon: `sap-icon://kpi-managing-my-area` })
      .navigation_list_item({ text: `Flight`, icon: `sap-icon://flight` })
      .navigation_list_item({ text: `Map`, icon: `sap-icon://map-2` })
      .navigation_list_item({ text: `Running`, icon: `sap-icon://physical-activity` })
      .navigation_list_item({ text: `Scissors`, icon: `sap-icon://scissors` })
      .navigation_list_item({ text: `Transport`, icon: `sap-icon://passenger-train` })
      .get_parent()
      .fixed_item()
      .navigation_list()
      .navigation_list_item({ text: `Bar Chart`, icon: `sap-icon://bar-chart` })
      ._generic({ name: `NavigationListItem`, ns: `tnt`, t_prop: [{ n: `text`, v: `External Link` }, { n: `icon`, v: `sap-icon://attachment` }, { n: `href`, v: `https://sap.com` }, { n: `target`, v: `_blank` }] })
      .get_parent()
      ._generic({ name: `NavigationListItem`, ns: `tnt`, t_prop: [{ n: `text`, v: `External Link _top` }, { n: `icon`, v: `sap-icon://attachment` }, { n: `href`, v: `https://sap.com` }, { n: `target`, v: `_top` }] })
      .get_parent()
      .navigation_list_item({ text: `Compare`, icon: `sap-icon://compare` });
    this.client.view_display(page.stringify());
  }
}

module.exports = z2ui5_cl_demo_app_499;
