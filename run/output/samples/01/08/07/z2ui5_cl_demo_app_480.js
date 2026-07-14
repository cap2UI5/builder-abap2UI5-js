const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_480 extends z2ui5_if_app {
  client = null;

  async main(client) {
    this.client = z2ui5_cl_util.abap_copy(client);
    if (client.check_on_init()) {
      this.view_display();
    }
  }

  view_display() {
    const base_url = `https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/`;
    const view = z2ui5_cl_xml_view.factory();
    const page = view.shell()
      .page({ title: `abap2UI5 - Sample: Standard List Item - Adapt Title`, navbuttonpress: this.client._event_nav_app_leave(), shownavbutton: this.client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.m.StandardListItem/sample/sap.m.sample.StandardListItemTitle` });
    const list = page.list({ headertext: `Products` });
    list._generic({ name: `StandardListItem`, t_prop: [{ n: `title`, v: `Notebook Basic 15` }, { n: `description`, v: `HT-1000` }, { n: `icon`, v: base_url + `HT-1000.jpg` }, { n: `iconDensityAware`, v: `false` }, { n: `iconInset`, v: `false` }, { n: `adaptTitleSize`, v: `false` }] });
    list._generic({ name: `StandardListItem`, t_prop: [{ n: `title`, v: `Notebook Basic 17` }, { n: `description`, v: `` }, { n: `icon`, v: base_url + `HT-1001.jpg` }, { n: `iconDensityAware`, v: `false` }, { n: `iconInset`, v: `false` }, { n: `adaptTitleSize`, v: `false` }] });
    list._generic({ name: `StandardListItem`, t_prop: [{ n: `title`, v: `Notebook Basic 18` }, { n: `description`, v: `HT-1002` }, { n: `icon`, v: base_url + `HT-1002.jpg` }, { n: `iconDensityAware`, v: `false` }, { n: `iconInset`, v: `false` }, { n: `adaptTitleSize`, v: `false` }] });
    list._generic({ name: `StandardListItem`, t_prop: [{ n: `title`, v: `Notebook Basic 19` }, { n: `icon`, v: base_url + `HT-1003.jpg` }, { n: `iconDensityAware`, v: `false` }, { n: `iconInset`, v: `false` }, { n: `adaptTitleSize`, v: `false` }] });
    this.client.view_display(view.stringify());
  }
}

module.exports = z2ui5_cl_demo_app_480;
