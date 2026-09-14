const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_smp_app_506 extends z2ui5_if_app {
  price = ``;
  argument = ``;
  raw_arg = ``;
  lit_arg = ``;
  client = null;

  async main(client) {
    this.client = client;
    if (client.check_on_init()) {
      this.price = `1299.00`;
      this.argument = `\${${client._bind(this.price, { path: true })}}`;
      this.raw_arg = `-`;
      this.lit_arg = `-`;
      this.view_display();
    } else if (client.check_on_navigated()) {
      this.view_display();
    } else if (client.check_on_event()) {
      this.on_event();
    }
  }

  on_event() {
    switch (this.client.get_event()) {
      case `RAW`:
        this.raw_arg = this.client.get_event_arg();
        break;
      case `LITERAL`:
        this.lit_arg = this.client.get_event_arg();
        break;
      case `REBUILD`:
        this.raw_arg = `-`;
        this.lit_arg = `-`;
        this.view_display();
        break;
    }
  }

  view_display() {
    const view = z2ui5_cl_ui5_view_builder.factory()
      .ele({ n: `View`, ns: `mvc` })
      .a({ n: `displayBlock`, v: `true` })
      .a({ n: `height`, v: `100%` })
      .a({ n: `xmlns`, v: `sap.m` })
      .a({ n: `xmlns:mvc`, v: `sap.ui.core.mvc` })
      .a({ n: `xmlns:core`, v: `sap.ui.core` })
      .a({ n: `xmlns:form`, v: `sap.ui.layout.form` });
    const page = view.ele(`Shell`)
      .ele(`Page`)
      .a({ n: `title`, v: `abap2UI5 - Event - Literal Arguments (check_arg_literal)` })
      .a({ n: `showNavButton`, b: this.client.check_app_prev_stack() })
      .a({ n: `navButtonPress`, v: this.client._event_nav_app_leave() });
    page.tag(`MessageStrip`)
      .a({ n: `text`, t: `Both buttons send the same argument. Written raw, the $-expression is resolved and ` + `the bound price arrives; with s_ctrl-check_arg_literal the wire quotes it and the text ` + `arrives. Type any other text - $event, {= 1 + 1 } - press Rebuild, and the literal ` + `wire still delivers it unchanged.` })
      .a({ n: `type`, v: `Information` })
      .a({ n: `showIcon`, b: true })
      .a({ n: `class`, v: `sapUiSmallMargin` });
    const form = page.ele({ n: `SimpleForm`, ns: `form` })
      .a({ n: `title`, v: `One argument, two wires` })
      .a({ n: `editable`, b: true })
      .ele({ n: `content`, ns: `form` });
    form.tag(`Label`).a({ n: `text`, v: `The bound price the raw argument resolves to` });
    form.tag(`Input`).a({ n: `value`, v: this.client._bind(this.price) });
    form.tag(`Label`).a({ n: `text`, v: `The argument both buttons carry` });
    form.tag(`Input`).a({ n: `value`, v: this.client._bind(this.argument) });
    form.tag(`Button`)
      .a({ n: `text`, v: `Rebuild the view with this argument` })
      .a({ n: `press`, v: this.client._event(`REBUILD`) });
    const raw_expr = `\${${this.client._bind(this.price, { path: true })}}`;
    form.tag(`Label`).a({ n: `text`, v: `Raw - resolved on the client` });
    form.tag(`Button`)
      .a({ n: `text`, t: `Send ${raw_expr} raw` })
      .a({ n: `press`, v: this.client._event({ val: `RAW`, arg: raw_expr }) });
    form.tag(`Text`).a({ n: `text`, v: this.client._bind(this.raw_arg) });
    form.tag(`Label`).a({ n: `text`, v: `Literal - quoted by check_arg_literal` });
    form.tag(`Button`)
      .a({ n: `text`, t: `Send ${this.argument} as a literal` })
      .a({ n: `type`, v: `Emphasized` })
      .a({ n: `press`, v: this.client._event({ val: `LITERAL`, arg: this.argument, s_ctrl: { check_arg_literal: true } }) });
    form.tag(`Text`).a({ n: `text`, v: this.client._bind(this.lit_arg) });
    this.client.view_display(view.stringify());
  }
}

module.exports = z2ui5_cl_smp_app_506;

const z2ui5_cl_ui5_view_builder = require("abap2UI5/z2ui5_cl_ui5_view_builder");

