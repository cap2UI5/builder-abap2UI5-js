const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_488 extends z2ui5_if_app {
  client = null;

  async main(client) {
    this.client = z2ui5_cl_util.abap_copy(client);
    if (client.check_on_init()) {
      this.view_display();
    }
  }

  view_display() {
    const page = z2ui5_cl_xml_view.factory()
      .shell()
      .page({ title: `abap2UI5 - Sample: No Container Content Padding`, navbuttonpress: this.client._event_nav_app_leave(), shownavbutton: this.client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.ui.core.ContainerPadding/sample/sap.m.sample.ContainerNoPadding` });
    page.message_strip({ text: `The IconTabBar and other container controls have a content padding by default.` + ` You can override default container content paddings by setting the CSS class` + ` 'sapUiNoContentPadding' to the container control`, class: `sapUiTinyMargin` });
    page.icon_tab_bar({ id: `idIconTabBar`, class: `sapUiNoContentPadding` })
      .content()
      .text(`IconTabBar content without padding`)
      .get_parent()
      .items()
      .icon_tab_filter({ showall: true, count: `123`, text: `Products`, key: `All` })
      .get_parent()
      .icon_tab_separator()
      .get_parent()
      .icon_tab_filter({ icon: `sap-icon://begin`, iconcolor: `Positive`, count: `53`, text: `Ok`, key: `Ok` })
      .get_parent()
      .icon_tab_filter({ icon: `sap-icon://compare`, iconcolor: `Critical`, count: `51`, text: `Heavy`, key: `Heavy` })
      .get_parent()
      .icon_tab_filter({ icon: `sap-icon://inventory`, iconcolor: `Negative`, count: `19`, text: `Overweight`, key: `Overweight` });
    this.client.view_display(page.stringify());
  }
}

module.exports = z2ui5_cl_demo_app_488;
