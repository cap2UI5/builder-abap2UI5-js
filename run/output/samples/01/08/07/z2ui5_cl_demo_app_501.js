const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_501 extends z2ui5_if_app {
  client = null;

  async main(client) {
    this.client = z2ui5_cl_util.abap_copy(client);
    if (client.check_on_init()) {
      this.view_display();
    } else if (client.check_on_event(`STETHOSCOPE`)) {
      client.message_toast_display(`Over budget!`);
    }
  }

  view_display() {
    const page = z2ui5_cl_xml_view.factory()
      .shell()
      .page({ title: `abap2UI5 - Sample: Icon`, navbuttonpress: this.client._event_nav_app_leave(), shownavbutton: this.client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.ui.core.Icon/sample/sap.ui.core.sample.Icon` });
    page.hbox({ class: `sapUiSmallMargin` })
      .icon({ src: `sap-icon://syringe`, size: `1.5rem`, color: `#031E48` })
      .get()
      .layout_data()
      .flex_item_data({ growfactor: `1` })
      .get_parent()
      .get_parent()
      .icon({ src: `sap-icon://pharmacy`, size: `2.5rem`, color: `#64E4CE` })
      .get()
      .layout_data()
      .flex_item_data({ growfactor: `1` })
      .get_parent()
      .get_parent()
      .icon({ src: `sap-icon://electrocardiogram`, size: `5rem`, color: `#E69A17` })
      .get()
      .layout_data()
      .flex_item_data({ growfactor: `1` })
      .get_parent()
      .get_parent()
      .icon({ src: `sap-icon://doctor`, size: `7.5rem`, color: `#1C4C98` })
      .get()
      .layout_data()
      .flex_item_data({ growfactor: `1` })
      .get_parent()
      .get_parent()
      .icon({ src: `sap-icon://stethoscope`, size: `10rem`, color: `#8875E7`, press: this.client._event(`STETHOSCOPE`) })
      .get()
      .layout_data()
      .flex_item_data({ growfactor: `1` });
    this.client.view_display(page.stringify());
  }
}

module.exports = z2ui5_cl_demo_app_501;
