const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_smp_app_512 extends z2ui5_if_app {
  answer = ``;
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
      case `TYPE`:
        this.client.follow_up_action(this.client.cs_event.control_global, [`MESSAGE_BOX`, this.client.get_event_arg(), `MessageBox.${this.client.get_event_arg()}( ) - called by its own name`]);
        break;
      case `OPTIONS`:
        this.client.follow_up_action(this.client.cs_event.control_global, [`MESSAGE_BOX`, `warning`, `The delivery date lies in the past.`, `{"title":"Please check","icon":"WARNING","contentWidth":"25rem",` + `"textDirection":"Inherit","closeOnNavigation":false,"styleClass":"sapUiSizeCompact"}`]);
        break;
      case `DEPENDENT`:
        this.client.follow_up_action(this.client.cs_event.control_global, [`MESSAGE_BOX`, `information`, `This box is a dependent of the panel below - it dies with it.`, `{"dependentOn":"demoPanel"}`]);
        break;
      case `ACTIONS`:
        this.client.follow_up_action(this.client.cs_event.control_global, [`MESSAGE_BOX`, `warning`, `Delete document 4711?`, `{"title":"Delete","actions":["DELETE","Later","CANCEL"],` + `"emphasizedAction":"DELETE","initialFocus":"CANCEL","onClose":"ANSWERED"}`]);
        break;
      case `ANSWERED`:
        this.answer = this.client.get_event_arg();
        break;
    }
  }

  view_display() {
    let sy_tabix = 0;
    const view = z2ui5_cl_ui5_view_builder.factory()
      .ele({ n: `View`, ns: `mvc` })
      .a({ n: `displayBlock`, v: `true` })
      .a({ n: `height`, v: `100%` })
      .a({ n: `xmlns`, v: `sap.m` })
      .a({ n: `xmlns:mvc`, v: `sap.ui.core.mvc` })
      .a({ n: `xmlns:form`, v: `sap.ui.layout.form` });
    const page = view.ele(`Shell`)
      .ele(`Page`)
      .a({ n: `title`, v: `abap2UI5 - Message - MessageBox via the Global Object` })
      .a({ n: `showNavButton`, b: this.client.check_app_prev_stack() })
      .a({ n: `navButtonPress`, v: this.client._event_nav_app_leave() });
    page.tag(`MessageStrip`)
      .a({ n: `text`, v: `follow_up_action( cs_event-control_global ) calls sap.m.MessageBox itself: the ` + `display method is the box type, and the last argument is the option object of that API 1:1. ` + `Use it when you want the CONTROL - an icon, a width, a text direction, a dependent box. Use ` + `client->message_box_display( ) when you want the ABAP side - a BAPIRET2 table, an exception, ` + `a structure thrown in as it is: Z2UI5_CL_SMP_APP_502 shows that half.` })
      .a({ n: `type`, v: `Information` })
      .a({ n: `showIcon`, b: true })
      .a({ n: `class`, v: `sapUiSmallMargin` });
    const form = page.ele({ n: `SimpleForm`, ns: `form` })
      .a({ n: `editable`, b: true })
      .a({ n: `layout`, v: `ResponsiveGridLayout` })
      .ele({ n: `content`, ns: `form` });
    const row = form.tag(`Label`).a({ n: `text`, v: `The method is the type` }).ele(`HBox`);
    sy_tabix = 0;
    for (const type of [`information`, `success`, `warning`, `error`]) {
      sy_tabix++;
      row.tag(`Button`)
        .a({ n: `text`, v: type })
        .a({ n: `press`, v: this.client._event({ val: `TYPE`, arg: type }) })
        .a({ n: `class`, v: `sapUiTinyMarginEnd` });
    }
    this.render_demo({ form, label: `Options`, text: `icon, contentWidth, textDirection, ...`, descr: `The UI5 options, by their UI5 names - none of them is a parameter of the client method`, press: this.client._event(`OPTIONS`) });
    this.render_demo({ form, label: `dependentOn`, text: `A box tied to a control`, descr: `The id travels, the frontend resolves it - the box is destroyed with the control (UI5 1.124)`, press: this.client._event(`DEPENDENT`) });
    this.render_demo({ form, label: `Actions`, text: `Buttons and the answer`, descr: `onClose stays a backend event - the pressed action comes back as the first event argument`, press: this.client._event(`ACTIONS`) });
    form.tag(`Label`)
      .a({ n: `text`, v: `Your answer` })
      .tag(`Text`)
      .a({ n: `text`, v: this.client._bind(this.answer) });
    form.tag(`Label`)
      .a({ n: `text`, v: `Wired` })
      .tag(`Button`)
      .a({ n: `text`, v: `No round-trip at all` })
      .a({ n: `press`, v: this.client.follow_up_action_result(this.client.cs_event.control_global, [`MESSAGE_BOX`, `show`, `Opened by the press itself - the backend never saw it.`]) });
    page.ele(`Panel`)
      .a({ n: `id`, v: `demoPanel` })
      .a({ n: `headerText`, v: `demoPanel - the control the dependent box hangs on` })
      .a({ n: `class`, v: `sapUiSmallMargin` })
      .tag(`Text`)
      .a({ n: `text`, v: `A box opened with dependentOn is destroyed when this panel is.` });
    this.client.view_display(view.stringify());
  }

  render_demo({ form, label, text, descr, press } = {}) {
    form.tag(`Label`).a({ n: `text`, t: label });
    const row = form.ele(`HBox`).a({ n: `alignItems`, v: `Center` }).a({ n: `wrap`, v: `Wrap` });
    row.tag(`Button`)
      .a({ n: `text`, t: text })
      .a({ n: `press`, v: press })
      .a({ n: `width`, v: `15rem` })
      .tag(`Text`)
      .a({ n: `text`, t: descr })
      .a({ n: `class`, v: `sapUiSmallMarginBegin` });
  }
}

module.exports = z2ui5_cl_smp_app_512;

const z2ui5_cl_ui5_view_builder = require("abap2UI5/z2ui5_cl_ui5_view_builder");

