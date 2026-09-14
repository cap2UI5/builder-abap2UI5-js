const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_smp_app_508 extends z2ui5_if_app {
  t_row = [];
  quantity = 0;
  client = null;

  async main(client) {
    this.client = client;
    if (client.check_on_init()) {
      this.quantity = 120;
      this.t_row = z2ui5_cl_util.abap_tab_assign(this.t_row, [{ product: `Monitor 27"`, stock: 5 }, { product: `Headset`, stock: 9 }, { product: `Keyboard`, stock: 71 }, { product: `Notebook 15"`, stock: 12 }]);
      this.view_display();
    } else if (client.check_on_navigated()) {
      this.view_display();
    }
  }

  view_display() {
    const quantity_binding = this.client._bind(this.quantity);
    const quantity_path = this.client._bind_path(this.quantity);
    const rows_path = this.client._bind_path(this.t_row);
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
      .a({ n: `title`, v: `abap2UI5 - Binding - Path Only (_bind_path)` })
      .a({ n: `showNavButton`, b: this.client.check_app_prev_stack() })
      .a({ n: `navButtonPress`, v: this.client._event_nav_app_leave() });
    page.tag(`MessageStrip`)
      .a({ n: `text`, v: `_bind( ) returns the finished binding string; _bind_path( ) returns the bare path for the ` + `places that compose their own binding string: the expression that colours the status ` + `below, and the items binding of the list, which adds a sorter to the path. Change the ` + `quantity and press Enter to see the expression re-evaluate on the client.` })
      .a({ n: `type`, v: `Information` })
      .a({ n: `showIcon`, b: true })
      .a({ n: `class`, v: `sapUiSmallMargin` });
    const form = page.ele({ n: `SimpleForm`, ns: `form` })
      .a({ n: `title`, v: `One attribute, two spellings` })
      .a({ n: `editable`, b: true })
      .ele({ n: `content`, ns: `form` });
    form.tag(`Label`).a({ n: `text`, v: `quantity, bound with _bind( ) - the full binding` });
    form.tag(`Input`).a({ n: `value`, v: quantity_binding }).a({ n: `description`, t: quantity_binding });
    form.tag(`Label`).a({ n: `text`, v: `the same attribute inside an expression - needs the bare path` });
    form.tag(`ObjectStatus`)
      .a({ n: `text`, v: `{= \${${quantity_path}} > 100 ? 'more than 100 in stock' : 'running low' }` })
      .a({ n: `state`, v: `{= \${${quantity_path}} > 100 ? 'Success' : 'Warning' }` });
    form.tag(`Text`).a({ n: `text`, t: `_bind_path( quantity ) returned ${quantity_path}` });
    form.tag(`Label`).a({ n: `text`, v: `a table path with a sorter added - needs the bare path` });
    form.ele(`List`)
      .a({ n: `items`, v: `{ path: '${rows_path}', sorter: { path: 'PRODUCT' }, templateShareable: false }` })
      .tag(`StandardListItem`)
      .a({ n: `title`, v: `{PRODUCT}` })
      .a({ n: `info`, v: `{STOCK} in stock` });
    form.tag(`Text`)
      .a({ n: `text`, t: `_bind_path( t_row ) returned ${rows_path} - the list is sorted by product on the client` });
    this.client.view_display(view.stringify());
  }
}

module.exports = z2ui5_cl_smp_app_508;

const z2ui5_cl_ui5_view_builder = require("abap2UI5/z2ui5_cl_ui5_view_builder");
const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");

