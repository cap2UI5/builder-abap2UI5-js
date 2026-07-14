const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_465 extends z2ui5_if_app {
  view_display({ client } = {}) {
    const view = z2ui5_cl_xml_view.factory();
    const page = view.shell()
      .page({ title: `abap2UI5 - Sample: Object Header Responsive V`, navbuttonpress: client._event_nav_app_leave(), shownavbutton: client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.m.ObjectHeader/sample/sap.m.sample.ObjectHeaderResponsiveV` });
    const header = page.object_header({ responsive: true, icon: `https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-6100.jpg`, iconalt: `Power Projector 4713`, intro: `A very powerful projector with special features for Internet usability, USB`, title: `Power Projector 4713`, backgrounddesign: `Translucent`, class: `sapUiResponsivePadding--header` });
    header.object_attribute({ title: `Manufacturer`, text: `Titanium` });
    header.object_attribute({ title: `Dimension per unit`, text: `51 x 42 x 18 cm` });
    header.markers().object_marker({ type: `Favorite` }).get_parent().object_marker({ type: `Flagged` });
    header._generic(`statuses`).object_status({ title: `Approval`, text: `Pending`, state: `Warning` });
    client.view_display(view.stringify());
  }

  async main(client) {
    if (client.check_on_init()) {
      this.view_display({ client: client });
    }
  }
}

module.exports = z2ui5_cl_demo_app_465;
