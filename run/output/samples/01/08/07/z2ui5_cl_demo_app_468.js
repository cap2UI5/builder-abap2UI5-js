const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_468 extends z2ui5_if_app {
  enabled = false;

  view_display({ client } = {}) {
    const view = z2ui5_cl_xml_view.factory();
    const page = view.shell()
      .page({ title: `abap2UI5 - Sample: OverflowToolbar - Enabled`, navbuttonpress: client._event_nav_app_leave(), shownavbutton: client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.m.OverflowToolbar/sample/sap.m.sample.ToolbarEnabled` });
    page.invisible_text({ ns: `core`, id: `text1`, text: `Label text` });
    page.checkbox({ text: `Enabled`, selected: client._bind_edit(this.enabled) });
    page.overflow_toolbar({ id: `toolbar`, enabled: client._bind_edit(this.enabled) })
      .button({ text: `Accept`, type: `Accept` })
      .toolbar_spacer()
      .checkbox({ text: `CheckBox` })
      .toolbar_spacer()
      .input({ arialabelledby: `text1`, width: `100px`, value: `Input` })
      .toolbar_spacer()
      .radio_button({ text: `RadioButton` })
      .get_parent()
      .toolbar_spacer()
      .button({ text: `Reject`, type: `Reject` });
    client.view_display(view.stringify());
  }

  async main(client) {
    if (client.check_on_init()) {
      this.enabled = true;
      this.view_display({ client: client });
    }
  }
}

module.exports = z2ui5_cl_demo_app_468;
