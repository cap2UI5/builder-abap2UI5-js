const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_421 extends z2ui5_if_app {
  child1 = false;
  child2 = false;
  child3 = false;
  client = null;

  view_display({ client } = {}) {
    this.child1 = true;
    this.child2 = false;
    this.child3 = true;
    const child1_bind = client._bind_edit(this.child1);
    const child2_bind = client._bind_edit(this.child2);
    const child3_bind = client._bind_edit(this.child3);
    const page = z2ui5_cl_xml_view.factory()
      .shell()
      .page({ title: `abap2UI5 - Sample: Tri-State Check Box`, navbuttonpress: client._event_nav_app_leave(), shownavbutton: client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.m.CheckBox/sample/sap.m.sample.CheckBoxTriState` });
    page.vertical_layout()
      .text(`Which languages(s) do you speak?`)
      .checkbox({ text: `select / deselect all`, selected: `{= $${child1_bind} || $${child2_bind} || $${child3_bind} }`, partiallyselected: `{= !($${child1_bind} && $${child2_bind} && $${child3_bind})}`, select: client._event(`PARENT_CLICKED`, [`\${$parameters>/selected}`]) })
      .html(`<hr>`)
      .get_parent()
      .checkbox({ text: `English`, selected: child1_bind })
      .checkbox({ text: `German`, selected: child2_bind })
      .checkbox({ text: `French`, selected: child3_bind });
    client.view_display(page.stringify());
  }

  on_event({ client } = {}) {
    let selected;
    if (client.check_on_event(`PARENT_CLICKED`)) {
      selected = (client.get_event_arg(1) === `true`);
      this.child1 = z2ui5_cl_util.abap_copy(selected);
      this.child2 = z2ui5_cl_util.abap_copy(selected);
      this.child3 = z2ui5_cl_util.abap_copy(selected);
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

module.exports = z2ui5_cl_demo_app_421;
