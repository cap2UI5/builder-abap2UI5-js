const z2ui5_cl_ui5_view_builder = require("../../02/z2ui5_cl_ui5_view_builder");
const z2ui5_if_app = require("../../02/z2ui5_if_app");

/**
 * The smallest complete abap2UI5 app: one input, one button, one roundtrip.
 * It is what `?app_start=z2ui5_cl_ui5_app_hi_world` starts and what the docs
 * point newcomers at, so it doubles as the reference for what an app looks
 * like — which is why it uses the current view builder rather than the
 * retired one it was written against.
 */
class z2ui5_cl_ui5_app_hi_world extends z2ui5_if_app {
  name = ``;

  async main(client) {
    // Upstream writes `check_on_navigated( )` here. This port must NOT: its
    // check_on_navigated() is false on the very first render, so the app
    // renders nothing, the framework re-enters, and the roundtrip never
    // returns — verified by hanging the engine. The two predicates have
    // genuinely diverged (z2ui5_cl_ui5_client is on the port-drift list), and
    // reconciling them is engine work, not an app edit.
    if (client.check_on_init()) {
      const view = z2ui5_cl_ui5_view_builder.factory()
        .ele({ n: `View`, ns: `mvc` })
        .a({ n: `xmlns`, v: `sap.m` })
        .a({ n: `xmlns:mvc`, v: `sap.ui.core.mvc` })
        .a({ n: `xmlns:core`, v: `sap.ui.core` })
        // SimpleForm and its content aggregation live in sap.ui.layout.form,
        // not in the default sap.m namespace — an unprefixed <SimpleForm>
        // resolves to sap.m.SimpleForm, which does not exist, and the view
        // fails to LOAD rather than to render.
        .a({ n: `xmlns:form`, v: `sap.ui.layout.form` })
        // displayBlock + height are what make the Shell fill the window; without
        // them the page renders in a collapsed box. Upstream carries both and
        // this port had dropped them — found by the wire-conformance gate
        // (scripts/conformance.js), which is also why they are not "cosmetic":
        // the view XML is the contract, and it differed.
        .a({ n: `displayBlock`, v: `true` })
        .a({ n: `height`, v: `100%` });

      const form = view
        .ele({ n: `Shell` })
        .ele({ n: `Page` })
        .a({ n: `title`, v: `abap2UI5 - Hello World` })
        .ele({ n: `SimpleForm`, ns: `form` })
        .a({ n: `editable`, b: true })
        .ele({ n: `content`, ns: `form` });

      form
        .tag({ n: `Title`, ns: `core` })
        .a({ n: `text`, v: `Enter a value and send it to the server...` })
        .tag({ n: `Label` })
        .a({ n: `text`, v: `Name` })
        .tag({ n: `Input` })
        .a({ n: `value`, v: client._bind_edit(this.name) })
        .tag({ n: `Button` })
        .a({ n: `text`, v: `Post` })
        .a({ n: `press`, v: client._event(`BUTTON_POST`) });

      client.view_display(view.stringify());
    } else if (client.check_on_event(`BUTTON_POST`)) {
      client.message_box_display(`Your name is ${this.name}`);
    }
  }
}

module.exports = z2ui5_cl_ui5_app_hi_world;
