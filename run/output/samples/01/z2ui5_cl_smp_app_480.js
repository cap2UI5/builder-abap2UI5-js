const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_smp_app_480 extends z2ui5_if_app {
  input = ``;
  counter = 0;
  client = null;

  async main(client) {
    this.client = client;
    if (client.check_on_navigated()) {
      this.view_display();
    } else if (client.check_on_event()) {
      this.on_event();
    }
  }

  on_event() {
    switch (this.client.get_event()) {
      case `INC`:
        this.counter = this.counter + 1;
        this.view_display();
        break;
      case `GO_DETAIL`:
        this.client.nav_app_call(new z2ui5_cl_smp_app_469());
        break;
    }
  }

  view_display() {
    if (this.client.check_on_init()) {
      this.client.follow_up_action(this.client.cs_event.hash_routing, [this.client.cs_nav_mode.keep]);
    }
    const view = z2ui5_cl_ui5_view_builder.factory()
      .ele({ n: `View`, ns: `mvc` })
      .a({ n: `displayBlock`, v: `true` })
      .a({ n: `height`, v: `100%` })
      .a({ n: `xmlns`, v: `sap.m` })
      .a({ n: `xmlns:mvc`, v: `sap.ui.core.mvc` })
      .a({ n: `xmlns:core`, v: `sap.ui.core` })
      .a({ n: `xmlns:form`, v: `sap.ui.layout.form` })
      .a({ n: `xmlns:layout`, v: `sap.ui.layout` });
    const page = view.ele(`Shell`)
      .ele(`Page`)
      .a({ n: `title`, v: `abap2UI5 - Navigation - Routing Mode keep` })
      .a({ n: `showNavButton`, b: this.client.check_app_prev_stack() })
      .a({ n: `navButtonPress`, v: this.client._event_nav_app_leave() });
    page.tag(`MessageStrip`)
      .a({ n: `text`, v: `Add some state (type / raise the counter), open the detail page, then press your ` + `BROWSER Back button and watch this page.` })
      .a({ n: `type`, v: `Information` })
      .a({ n: `showIcon`, b: true })
      .a({ n: `class`, v: `sapUiSmallMargin` });
    const form = page.ele({ n: `Grid`, ns: `layout` })
      .a({ n: `defaultSpan`, v: `L6 M12 S12` })
      .ele({ n: `content`, ns: `layout` })
      .ele({ n: `SimpleForm`, ns: `form` })
      .a({ n: `title`, v: `Routing mode keep` })
      .ele({ n: `content`, ns: `form` });
    form.tag(`Label`).a({ n: `text`, v: `1. Some state - type here` });
    form.tag(`Input`).a({ n: `value`, v: this.client._bind(this.input) });
    form.tag(`Label`).a({ n: `text`, v: `and raise a counter` });
    form.tag(`Button`)
      .a({ n: `press`, v: this.client._event(`INC`) })
      .a({ n: `text`, v: `increment (${this.counter})` });
    form.tag(`Label`).a({ n: `text`, v: `2. Navigate forward` });
    form.tag(`Button`)
      .a({ n: `press`, v: this.client._event(`GO_DETAIL`) })
      .a({ n: `text`, v: `go to the detail page (nav_app_call)` })
      .a({ n: `type`, v: `Emphasized` });
    page.tag(`MessageStrip`)
      .a({ n: `text`, v: `keep: the URL carries the app-state draft (#/app/<CLASS>/<DRAFT>). After the detail ` + `page, the browser Back button restores this page EXACTLY - input and counter come back.` })
      .a({ n: `type`, v: `Success` })
      .a({ n: `showIcon`, b: true })
      .a({ n: `class`, v: `sapUiSmallMargin` });
    this.client.view_display(view.stringify());
  }
}

module.exports = z2ui5_cl_smp_app_480;

const z2ui5_cl_smp_app_469 = require("./z2ui5_cl_smp_app_469");
const z2ui5_cl_ui5_view_builder = require("abap2UI5/z2ui5_cl_ui5_view_builder");

