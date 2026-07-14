const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_481 extends z2ui5_if_app {
  client = null;

  async main(client) {
    this.client = z2ui5_cl_util.abap_copy(client);
    if (client.check_on_init()) {
      this.view_display();
    } else if (client.check_on_event(`CHANGE`)) {
      client.message_toast_display(`Value changed to '${client.get_event_arg(1)}'`);
    }
  }

  render_item({ list, label } = {}) {
    let result = null;
    result = list.custom_list_item()
      .hbox({ class: `sapUiTinyMargin`, justifycontent: `SpaceBetween`, alignitems: `Center` })
      .vbox(`sapUiSmallMarginEnd`)
      .label({ text: label, wrapping: true })
      .get_parent()
      .vbox();
    return result;
  }

  view_display() {
    const page = z2ui5_cl_xml_view.factory()
      .shell()
      .page({ title: `abap2UI5 - Sample: StepInput`, navbuttonpress: this.client._event_nav_app_leave(), shownavbutton: this.client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.m.StepInput/sample/sap.m.sample.StepInput` });
    const change = this.client._event(`CHANGE`, [`\${$parameters>/value}`]);
    const list = page.list({ id: `idTable` });
    this.render_item({ list, label: `Step = 1 (default); value = 6, min = 5, max = 15, width = 120px` })
      .step_input({ value: `6`, min: `5`, max: `15`, width: `120px`, change });
    this.render_item({ list, label: `Step = 1 (default); value = 6, min = 5, max = 15, width = 120px, with validation on LiveChange` })
      .step_input({ value: `6`, min: `5`, max: `15`, width: `120px`, validationmode: `LiveChange`, change });
    this.render_item({ list, label: `Step = 5, no value, no min, no max, width = 120px` })
      .step_input({ step: `5`, width: `120px`, change });
    this.render_item({ list, label: `Step = 5, no value, no min, no max, width = 120px, largerStep = 3` })
      .step_input({ step: `5`, width: `120px`, largerstep: `3`, change });
    this.render_item({ list, label: `Step = 1.1, no value, displayValuePrecision = 1, min = -6, max = 23.5, width = 120px` })
      .step_input({ step: `1.1`, min: `-6`, max: `23.5`, width: `120px`, displayvalueprecision: `1`, change });
    this.render_item({ list, label: `Disabled, value = 12.3, displayValuePrecision = 1, width = 120px` })
      .step_input({ value: `12.3`, enabled: false, width: `120px`, displayvalueprecision: `1`, change });
    this.render_item({ list, label: `Read only, value = 123, default width of 100%` })
      .step_input({ value: `123`, editable: false, change });
    this.render_item({ list, label: `Step = 0.05; value = 1.32, displayValuePrecision = 3, min = -5, max = 15` })
      .step_input({ value: `1.32`, step: `0.05`, min: `-5`, max: `15`, displayvalueprecision: `3`, change });
    this.render_item({ list, label: `Step = 1.05; value = 1.5675, displayValuePrecision = 2, no Min and Max` })
      .step_input({ value: `1.5675`, step: `1.05`, displayvalueprecision: `2`, change });
    this.render_item({ list, label: `Step = -1 (which becomes 1), value = 20, width = 120px` })
      .step_input({ value: `20`, step: `-1`, width: `120px`, change });
    this.render_item({ list, label: `Step = 1 (default); value = 6, min = 5, max = 15, width = 240px, with added description and default fieldWidth 50%` })
      .step_input({ value: `6`, min: `5`, max: `15`, width: `240px`, description: `EUR`, change });
    this.render_item({ list, label: `Step = 1 (default); value = 160, with added description and fieldWidth set to 70%` })
      .step_input({ value: `160`, fieldwidth: `70%`, description: `EUR`, change });
    this.render_item({ list, label: `Step = 1 (default); value = 160, align:Center` })
      .step_input({ value: `160`, textalign: `Center`, change });
    this.render_item({ list, label: `Step = 5, stepMode = Multiple, min = -40, max = 100, value = 10,` })
      .step_input({ value: `10`, step: `5`, max: `100`, min: `-40`, stepmode: `Multiple`, change });
    this.client.view_display(page.stringify());
  }
}

module.exports = z2ui5_cl_demo_app_481;
