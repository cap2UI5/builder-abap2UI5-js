const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_484 extends z2ui5_if_app {
  value_live_update = false;
  input_value = ``;
  get_value = ``;
  client = null;

  async main(client) {
    this.client = z2ui5_cl_util.abap_copy(client);
    if (client.check_on_init()) {
      this.get_value = ` `;
      this.view_display();
    } else if (client.check_on_event(`LIVE_CHANGE`)) {
      this.get_value = client.get_event_arg(1);
      client.view_model_update();
    }
  }

  view_display() {
    const page = z2ui5_cl_xml_view.factory()
      .shell()
      .page({ title: `abap2UI5 - Sample: TextArea - Value Update`, navbuttonpress: this.client._event_nav_app_leave(), shownavbutton: this.client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.m.TextArea/sample/sap.m.sample.TextAreaValueUpdate` });
    page.simple_form({ editable: true, layout: `ResponsiveGridLayout` })
      .content(`form`)
      .label(`ValueLiveUpdate`)
      .switch({ state: this.client._bind_edit(this.value_live_update) })
      .label(`Type here`)
      .text_area({ id: `TypeHere`, value: this.client._bind_edit(this.input_value), valueliveupdate: this.client._bind_edit(this.value_live_update) })
      .get()
      ._generic_property({ n: `liveChange`, v: this.client._event(`LIVE_CHANGE`, [`\${$parameters>/value}`]) })
      .get_parent()
      .label(`input.getValue()`)
      .text({ id: `getValue`, text: this.client._bind(this.get_value) })
      .label(`model.getProperty()`)
      .text({ id: `getProperty`, text: this.client._bind_edit(this.input_value) });
    this.client.view_display(page.stringify());
  }
}

module.exports = z2ui5_cl_demo_app_484;
