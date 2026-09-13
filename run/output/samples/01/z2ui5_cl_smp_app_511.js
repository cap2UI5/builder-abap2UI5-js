const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_smp_app_511 extends z2ui5_if_app {
  plain_backend = ``;
  plain_count = 0;
  queued_backend = ``;
  queued_count = 0;
  client = null;

  async main(client) {
    this.client = client;
    if (client.check_on_navigated()) {
      this.view_display();
    } else if (client.check_on_event(`PLAIN`)) {
      this.plain_backend = client.get_event_arg();
      this.plain_count = this.plain_count + 1;
    } else if (client.check_on_event(`QUEUED`)) {
      this.queued_backend = client.get_event_arg();
      this.queued_count = this.queued_count + 1;
    }
  }

  view_display() {
    const view = z2ui5_cl_ui5_view_builder.factory()
      .ele({ n: `View`, ns: `mvc` })
      .a({ n: `displayBlock`, v: `true` })
      .a({ n: `height`, v: `100%` })
      .a({ n: `xmlns`, v: `sap.m` })
      .a({ n: `xmlns:mvc`, v: `sap.ui.core.mvc` })
      .a({ n: `xmlns:layout`, v: `sap.ui.layout` });
    const page = view.ele(`Shell`)
      .ele(`Page`)
      .a({ n: `title`, v: `abap2UI5 - Event - Keep the Last Keystroke with check_queue_last` })
      .a({ n: `showNavButton`, b: this.client.check_app_prev_stack() })
      .a({ n: `navButtonPress`, v: this.client._event_nav_app_leave() });
    page.tag(`MessageStrip`)
      .a({ n: `text`, v: `abap2UI5 runs one round-trip at a time, and an event fired while one is in flight is dropped. ` + `Type quickly into both fields: the left backend value stops at an earlier keystroke, the right one ` + `ends on what you typed - its wire is registered with s_ctrl-check_queue_last, so the last event ` + `fired during the flight is kept and sent once the response has landed. The flag is for ` + `per-keystroke wires only (liveChange, liveSearch, sliderChange) and is not combined with ` + `check_allow_multi_req, which sends every keystroke at once and lets the responses land in any order.` })
      .a({ n: `type`, v: `Information` })
      .a({ n: `showIcon`, b: true })
      .a({ n: `class`, v: `sapUiSmallMargin` });
    const grid = page.ele({ n: `Grid`, ns: `layout` })
      .a({ n: `defaultSpan`, v: `XL6 L6 M6 S12` })
      .ele({ n: `content`, ns: `layout` });
    grid.ele(`VBox`)
      .a({ n: `class`, v: `sapUiSmallMargin` })
      .tag(`Title`)
      .a({ n: `text`, v: `Plain wire - dropped while busy` })
      .a({ n: `level`, v: `H4` })
      .tag(`Input`)
      .a({ n: `placeholder`, v: `Type quickly ...` })
      .a({ n: `liveChange`, v: this.client._event(`PLAIN`, [`\${$parameters>/value}`]) })
      .tag(`Label`)
      .a({ n: `text`, v: `Value in the backend` })
      .tag(`Text`)
      .a({ n: `text`, v: this.client._bind(this.plain_backend) })
      .tag(`Label`)
      .a({ n: `text`, v: `Round-trips` })
      .tag(`Text`)
      .a({ n: `text`, v: this.client._bind(this.plain_count) });
    grid.ele(`VBox`)
      .a({ n: `class`, v: `sapUiSmallMargin` })
      .tag(`Title`)
      .a({ n: `text`, v: `check_queue_last - the last keystroke is kept` })
      .a({ n: `level`, v: `H4` })
      .tag(`Input`)
      .a({ n: `placeholder`, v: `Type quickly ...` })
      .a({ n: `liveChange`, v: this.client._event(`QUEUED`, [`\${$parameters>/value}`], { check_queue_last: true }) })
      .tag(`Label`)
      .a({ n: `text`, v: `Value in the backend` })
      .tag(`Text`)
      .a({ n: `text`, v: this.client._bind(this.queued_backend) })
      .tag(`Label`)
      .a({ n: `text`, v: `Round-trips` })
      .tag(`Text`)
      .a({ n: `text`, v: this.client._bind(this.queued_count) });
    this.client.view_display(view.stringify());
  }
}

module.exports = z2ui5_cl_smp_app_511;

const z2ui5_cl_ui5_view_builder = require("abap2UI5/z2ui5_cl_ui5_view_builder");

