const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_498 extends z2ui5_if_app {
  expanded = false;
  sub_item_visible = false;
  client = null;

  async main(client) {
    this.client = z2ui5_cl_util.abap_copy(client);
    if (client.check_on_init()) {
      this.expanded = true;
      this.sub_item_visible = true;
      this.view_display();
    } else if (client.check_on_event(`TOGGLE_EXPANDED`)) {
      this.expanded = (!(this.expanded === true || this.expanded === `X`));
      client.view_model_update();
    } else if (client.check_on_event(`TOGGLE_SUB_ITEM`)) {
      this.sub_item_visible = (!(this.sub_item_visible === true || this.sub_item_visible === `X`));
      client.view_model_update();
    }
  }

  view_display() {
    const page = z2ui5_cl_xml_view.factory()
      .shell()
      .page({ title: `abap2UI5 - Sample: Navigation List`, navbuttonpress: this.client._event_nav_app_leave(), shownavbutton: this.client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.tnt.NavigationList/sample/sap.tnt.sample.NavigationList` });
    page.overflow_toolbar()
      .button({ text: `Toggle Collapse/Expand`, icon: `sap-icon://menu2`, press: this.client._event(`TOGGLE_EXPANDED`) })
      .button({ text: `Show/Hide SubItem 3`, icon: `sap-icon://menu2`, press: this.client._event(`TOGGLE_SUB_ITEM`) });
    page._generic({ name: `NavigationList`, ns: `tnt`, t_prop: [{ n: `width`, v: `320px` }, { n: `selectedKey`, v: `subItem3` }, { n: `expanded`, v: this.client._bind(this.expanded) }] })
      ._generic({ name: `NavigationListItem`, ns: `tnt`, t_prop: [{ n: `text`, v: `Item 1` }, { n: `key`, v: `rootItem1` }, { n: `icon`, v: `sap-icon://employee` }] })
      .navigation_list_item({ text: `Sub Item 1` })
      .navigation_list_item({ text: `Sub Item 2` })
      ._generic({ name: `NavigationListItem`, ns: `tnt`, t_prop: [{ n: `text`, v: `Sub Item 3` }, { n: `key`, v: `subItem3` }, { n: `visible`, v: this.client._bind(this.sub_item_visible) }] })
      .get_parent()
      .navigation_list_item({ text: `Sub Item 4` })
      ._generic({ name: `NavigationListItem`, ns: `tnt`, t_prop: [{ n: `text`, v: `Invisible Sub Item 5` }, { n: `visible`, v: `false` }] })
      .get_parent()
      ._generic({ name: `NavigationListItem`, ns: `tnt`, t_prop: [{ n: `text`, v: `Invisible Sub Item 6` }, { n: `visible`, v: `false` }] })
      .get_parent()
      .get_parent()
      ._generic({ name: `NavigationListItem`, ns: `tnt`, t_prop: [{ n: `text`, v: `Invisible Section` }, { n: `icon`, v: `sap-icon://employee` }, { n: `visible`, v: `false` }] })
      .navigation_list_item({ text: `Sub Item 1` })
      .navigation_list_item({ text: `Sub Item 2` })
      .navigation_list_item({ text: `Sub Item 3` })
      .navigation_list_item({ text: `Sub Item 4` })
      .get_parent()
      ._generic({ name: `NavigationListItem`, ns: `tnt`, t_prop: [{ n: `text`, v: `Item 2` }, { n: `icon`, v: `sap-icon://building` }] })
      .navigation_list_item({ text: `Sub Item 1` })
      .navigation_list_item({ text: `Sub Item 2` })
      .navigation_list_item({ text: `Sub Item 3` })
      .navigation_list_item({ text: `Sub Item 4` });
    this.client.view_display(page.stringify());
  }
}

module.exports = z2ui5_cl_demo_app_498;
