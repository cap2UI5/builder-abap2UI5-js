const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_smp_app_498 extends z2ui5_if_app {
  quantity = ``;
  notes = ``;
  share_link = ``;
  client = null;

  async main(client) {
    this.client = client;
    if (client.check_on_init()) {
      client.app_state_set_active();
      this.view_display();
    } else if (client.check_on_navigated()) {
      this.view_display();
    } else if (client.check_on_event()) {
      this.on_event();
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
      .a({ n: `title`, v: `abap2UI5 - App State, Bookmark and Share` })
      .a({ n: `showNavButton`, b: this.client.check_app_prev_stack() })
      .a({ n: `navButtonPress`, v: this.client._event_nav_app_leave() });
    page.tag(`MessageStrip`)
      .a({ n: `text`, v: `app_state_set_active( ) keeps the id of the CURRENT app state in the URL ` + `(#/z2ui5-xapp-state=...). Type something, press post - and then reload the page, ` + `bookmark it, or share it: the state comes back.` })
      .a({ n: `type`, v: `Information` })
      .a({ n: `showIcon`, b: true })
      .a({ n: `class`, v: `sapUiSmallMargin` });
    const form = page.ele({ n: `SimpleForm`, ns: `form` })
      .a({ n: `title`, v: `The state a link can carry` })
      .a({ n: `editable`, b: true })
      .ele({ n: `content`, ns: `form` });
    form.tag(`Label`).a({ n: `text`, v: `quantity` });
    form.tag(`Input`).a({ n: `value`, v: this.client._bind(this.quantity) });
    form.tag(`Label`).a({ n: `text`, v: `notes` });
    form.tag(`Input`).a({ n: `value`, v: this.client._bind(this.notes) });
    form.tag(`Button`)
      .a({ n: `press`, v: this.client._event(`POST`) })
      .a({ n: `text`, v: `post` })
      .a({ n: `type`, v: `Emphasized` });
    form.tag(`Button`)
      .a({ n: `press`, v: this.client._event(`SHARE`) })
      .a({ n: `text`, v: `share - copy the link` })
      .a({ n: `icon`, v: `sap-icon://chain-link` });
    form.tag(`Label`).a({ n: `text`, v: `the link the share button copies` });
    form.tag(`Input`).a({ n: `value`, v: this.client._bind(this.share_link) }).a({ n: `editable`, b: false });
    page.tag(`MessageStrip`)
      .a({ n: `text`, v: `Share copies a link to exactly this state into the clipboard - the Fiori ` + `sap-xapp-state idea with the draft as the state container. The link lives until ` + `the draft expires; after that it starts the app fresh.` })
      .a({ n: `type`, v: `Success` })
      .a({ n: `showIcon`, b: true })
      .a({ n: `class`, v: `sapUiSmallMargin` });
    this.client.view_display(view.stringify());
  }

  on_event() {
    switch (this.client.get_event()) {
      case `POST`:
        this.client.message_toast_display(`data updated - the URL now names this state`);
        break;
      case `SHARE`:
        this.share_link = this.client.app_state_get_href();
        this.client.follow_up_action(z2ui5_if_client.cs_event.clipboard_copy, [this.share_link]);
        this.client.message_toast_display(`link copied - open it anywhere`);
        break;
    }
  }
}

module.exports = z2ui5_cl_smp_app_498;

const z2ui5_cl_ui5_view_builder = require("abap2UI5/z2ui5_cl_ui5_view_builder");
const z2ui5_if_client = require("abap2UI5/z2ui5_if_client");

