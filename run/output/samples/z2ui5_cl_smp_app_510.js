const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_smp_app_510 extends z2ui5_if_app {
  input_nest = ``;
  input_nest2 = ``;
  status = ``;
  client = null;

  async main(client) {
    this.client = client;
    if (client.check_on_init()) {
      this.status = `no nested view yet`;
      this.view_display();
    } else if (client.check_on_navigated()) {
      this.view_display();
    } else if (client.check_on_event()) {
      this.on_event();
    }
  }

  on_event() {
    switch (this.client.get_event()) {
      case `NEST_SHOW`:
        this.nest_display({ slot: z2ui5_if_client.cs_view.nested });
        this.status = `nested view 1 rendered into box_nest`;
        break;
      case `NEST_DESTROY`:
        this.client.nest_view_destroy();
        this.status = `nested view 1 destroyed - box_nest is empty again`;
        break;
      case `NEST2_SHOW`:
        this.nest_display({ slot: z2ui5_if_client.cs_view.nested2 });
        this.status = `nested view 2 rendered into box_nest2`;
        break;
      case `NEST2_DESTROY`:
        this.client.nest2_view_destroy();
        this.status = `nested view 2 destroyed - box_nest2 is empty again`;
        break;
      case `FOCUS_NEST`:
        this.client.follow_up_action(z2ui5_if_client.cs_event.control_by_id, [`inp_nest`, `focus`], z2ui5_if_client.cs_view.nested);
        this.status = `focus sent to id inp_nest, scoped to cs_view-nested`;
        break;
      case `FOCUS_NEST2`:
        this.client.follow_up_action(z2ui5_if_client.cs_event.control_by_id, [`inp_nest2`, `focus`], z2ui5_if_client.cs_view.nested2);
        this.status = `focus sent to id inp_nest2, scoped to cs_view-nested2`;
        break;
    }
  }

  nest_display({ slot } = {}) {
    const view = z2ui5_cl_ui5_view_builder.factory()
      .ele({ n: `View`, ns: `mvc` })
      .a({ n: `displayBlock`, v: `true` })
      .a({ n: `xmlns`, v: `sap.m` })
      .a({ n: `xmlns:mvc`, v: `sap.ui.core.mvc` })
      .a({ n: `xmlns:core`, v: `sap.ui.core` });
    const panel = view.ele(`Panel`)
      .a({ n: `headerText`, t: `nested view in slot ${slot}` })
      .a({ n: `class`, v: `sapUiSmallMarginTop` });
    if (slot === z2ui5_if_client.cs_view.nested) {
      panel.tag(`Input`)
        .a({ n: `id`, v: `inp_nest` })
        .a({ n: `placeholder`, v: `id inp_nest, slot NEST` })
        .a({ n: `value`, v: this.client._bind(this.input_nest) });
      this.client.nest_view_display(view.stringify(), `box_nest`, `addItem`, `removeAllItems`);
    } else {
      panel.tag(`Input`)
        .a({ n: `id`, v: `inp_nest2` })
        .a({ n: `placeholder`, v: `id inp_nest2, slot NEST2` })
        .a({ n: `value`, v: this.client._bind(this.input_nest2) });
      this.client.nest2_view_display(view.stringify(), `box_nest2`, `addItem`, `removeAllItems`);
    }
  }

  view_display() {
    const view = z2ui5_cl_ui5_view_builder.factory()
      .ele({ n: `View`, ns: `mvc` })
      .a({ n: `displayBlock`, v: `true` })
      .a({ n: `height`, v: `100%` })
      .a({ n: `xmlns`, v: `sap.m` })
      .a({ n: `xmlns:mvc`, v: `sap.ui.core.mvc` })
      .a({ n: `xmlns:core`, v: `sap.ui.core` });
    const page = view.ele(`Shell`)
      .ele(`Page`)
      .a({ n: `title`, v: `abap2UI5 - Nested View - Destroy and Target a Slot` })
      .a({ n: `showNavButton`, b: this.client.check_app_prev_stack() })
      .a({ n: `navButtonPress`, v: this.client._event_nav_app_leave() });
    page.tag(`MessageStrip`)
      .a({ n: `text`, v: `Show and destroy the two nested views, then send the focus into one of them: the ` + `view parameter of follow_up_action decides which slot the id lookup is scoped to - ` + `a slot that is not open finds nothing.` })
      .a({ n: `type`, v: `Information` })
      .a({ n: `showIcon`, b: true })
      .a({ n: `class`, v: `sapUiSmallMargin` });
    page.ele(`HBox`)
      .a({ n: `wrap`, v: `Wrap` })
      .a({ n: `class`, v: `sapUiSmallMargin` })
      .tag(`Button`)
      .a({ n: `text`, v: `show nested view 1` })
      .a({ n: `press`, v: this.client._event(`NEST_SHOW`) })
      .tag(`Button`)
      .a({ n: `text`, v: `destroy nested view 1` })
      .a({ n: `press`, v: this.client._event(`NEST_DESTROY`) })
      .tag(`Button`)
      .a({ n: `text`, v: `focus the input in slot nested` })
      .a({ n: `press`, v: this.client._event(`FOCUS_NEST`) })
      .tag(`ToolbarSpacer`)
      .a({ n: `width`, v: `1rem` })
      .tag(`Button`)
      .a({ n: `text`, v: `show nested view 2` })
      .a({ n: `press`, v: this.client._event(`NEST2_SHOW`) })
      .tag(`Button`)
      .a({ n: `text`, v: `destroy nested view 2` })
      .a({ n: `press`, v: this.client._event(`NEST2_DESTROY`) })
      .tag(`Button`)
      .a({ n: `text`, v: `focus the input in slot nested2` })
      .a({ n: `press`, v: this.client._event(`FOCUS_NEST2`) });
    page.tag(`MessageStrip`)
      .a({ n: `text`, v: this.client._bind(this.status) })
      .a({ n: `type`, v: `Success` })
      .a({ n: `showIcon`, b: true })
      .a({ n: `class`, v: `sapUiSmallMargin` });
    page.ele(`HBox`)
      .a({ n: `class`, v: `sapUiSmallMargin` })
      .tag(`VBox`)
      .a({ n: `id`, v: `box_nest` })
      .a({ n: `width`, v: `20rem` })
      .a({ n: `class`, v: `sapUiSmallMarginEnd` })
      .tag(`VBox`)
      .a({ n: `id`, v: `box_nest2` })
      .a({ n: `width`, v: `20rem` });
    this.client.view_display(view.stringify());
  }
}

module.exports = z2ui5_cl_smp_app_510;

const z2ui5_cl_ui5_view_builder = require("abap2UI5/z2ui5_cl_ui5_view_builder");
const z2ui5_if_client = require("abap2UI5/z2ui5_if_client");

