const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_smp_app_509 extends z2ui5_if_app {
  products_json = ``;
  config_json = ``;
  products_raw = ``;
  client = null;

  async main(client) {
    this.client = client;
    if (client.check_on_init()) {
      this.products_json = `[ { "name": "Notebook 15\\"", "price": 1299, "tags": "hardware, mobile" },` + ` { "name": "USB-C Dock", "price": 189, "tags": "accessories" },` + ` { "name": "Headset", "price": 79, "tags": "audio, accessories" } ]`;
      this.config_json = `{ "title": "Products from JSON", "sap.app": { "id": "z2ui5.demo", "version": "1.0.0" } }`;
      this.products_raw = z2ui5_cl_util.abap_tab_assign(this.products_raw, z2ui5_cl_util.abap_copy(this.products_json));
      this.view_display();
    } else if (client.check_on_navigated()) {
      this.view_display();
    }
  }

  view_display() {
    const config_path = this.client._bind(this.config_json, { json: true, path: true });
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
      .a({ n: `title`, v: `abap2UI5 - Binding - Pre-serialized JSON (json)` })
      .a({ n: `showNavButton`, b: this.client.check_app_prev_stack() })
      .a({ n: `navButtonPress`, v: this.client._event_nav_app_leave() });
    page.tag(`MessageStrip`)
      .a({ n: `text`, v: `Two strings hold JSON the app never parsed. Bound with json = abap_true they become ` + `model nodes: the list binds to the array, the title reads a member of the object - even ` + `one called sap.app. The same string bound the ordinary way arrives as text, which is ` + `what the last field shows.` })
      .a({ n: `type`, v: `Information` })
      .a({ n: `showIcon`, b: true })
      .a({ n: `class`, v: `sapUiSmallMargin` });
    const form = page.ele({ n: `SimpleForm`, ns: `form` })
      .a({ n: `title`, v: `Spliced in as JSON` })
      .a({ n: `editable`, b: true })
      .ele({ n: `content`, ns: `form` });
    form.tag(`Label`).a({ n: `text`, v: `a member of the object - its title` });
    form.tag(`Text`).a({ n: `text`, v: `{${config_path}/title}` });
    form.tag(`Label`).a({ n: `text`, v: `a key no ABAP component could carry - sap.app/id` });
    form.tag(`Text`).a({ n: `text`, v: `{${config_path}/sap.app/id} version {${config_path}/sap.app/version}` });
    form.tag(`Label`).a({ n: `text`, v: `the array, as an aggregation binding` });
    form.ele(`List`)
      .a({ n: `items`, v: this.client._bind(this.products_json, { json: true }) })
      .tag(`StandardListItem`)
      .a({ n: `title`, v: `{name}` })
      .a({ n: `description`, v: `{tags}` })
      .a({ n: `info`, v: `{price} EUR` });
    form.tag(`Label`).a({ n: `text`, v: `the same string, bound without json - one quoted string` });
    form.tag(`TextArea`)
      .a({ n: `value`, v: this.client._bind(this.products_raw) })
      .a({ n: `editable`, b: false })
      .a({ n: `rows`, v: `4` })
      .a({ n: `width`, v: `100%` });
    this.client.view_display(view.stringify());
  }
}

module.exports = z2ui5_cl_smp_app_509;

const z2ui5_cl_ui5_view_builder = require("abap2UI5/z2ui5_cl_ui5_view_builder");
const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");

