const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_smp_app_505 extends z2ui5_if_app {
  t_row = [];
  last_sort = ``;
  client = null;
  sort_order = ``;

  async main(client) {
    this.client = client;
    if (client.check_on_init()) {
      this.on_init();
    } else if (client.check_on_navigated()) {
      this.view_display();
    } else if (client.check_on_event()) {
      this.on_event();
    }
  }

  on_init() {
    let sy_tabix = 0;
    let created;
    this.t_row = z2ui5_cl_util.abap_tab_assign(this.t_row, [{ product: `Notebook 15"`, stock: 12, created: `20260115` }, { product: `Monitor 27"`, stock: 5, created: `20251203` }, { product: `USB-C Dock`, stock: 40, created: `20260302` }, { product: `Keyboard`, stock: 71, created: `20250928` }, { product: `Headset`, stock: 9, created: `20260107` }]);
    sy_tabix = 0;
    for (const row of this.t_row) {
      sy_tabix++;
      created = (row.created);
      row.created_text = `${String(created)
        .substr(6, 2)}.${String(created)
        .substr(4, 2)}.${String(created)
        .substr(0, 4)}`;
    }
    this.last_sort = `not sorted yet`;
    this.view_display();
  }

  on_event() {
    let property;
    if (this.client.check_on_event(`SORT`)) {
      property = this.client.get_event_arg(1);
      this.sort_order = this.client.get_event_arg(2);
      if (property === `CREATED_TEXT`) {
        if (this.sort_order === `Descending`) {
          this.t_row.sort((a, b) => ((a.created > b.created ? 1 : a.created < b.created ? -1 : 0)) * -1);
        } else {
          this.t_row.sort((a, b) => ((a.created > b.created ? 1 : a.created < b.created ? -1 : 0)));
        }
        this.last_sort = `Date ${this.sort_order} - sorted in the BACKEND by the real date, the client sort was cancelled`;
        this.view_display();
      } else {
        this.last_sort = `${property} ${this.sort_order} - sorted by the CLIENT, the default ran`;
      }
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
      .a({ n: `xmlns:table`, v: `sap.ui.table` });
    const page = view.ele(`Shell`)
      .ele(`Page`)
      .a({ n: `title`, v: `abap2UI5 - Event - Prevent Default per Column` })
      .a({ n: `showNavButton`, b: this.client.check_app_prev_stack() })
      .a({ n: `navButtonPress`, v: this.client._event_nav_app_leave() });
    page.tag(`MessageStrip`)
      .a({ n: `text`, v: `Press the column headers. Product and Stock sort on the client, as a grid table does. ` + `The Date column shows a text the client cannot sort correctly, so its client sort is ` + `cancelled by s_ctrl-prevent_default_expr - one expression on the one sort wire - and ` + `the backend sorts by the real date instead.` })
      .a({ n: `type`, v: `Information` })
      .a({ n: `showIcon`, b: true })
      .a({ n: `class`, v: `sapUiSmallMargin` });
    const tab = page.ele({ n: `Table`, ns: `table` })
      .a({ n: `rows`, v: this.client._bind(this.t_row) })
      .a({ n: `selectionMode`, v: `None` })
      .a({ n: `visibleRowCount`, v: `5` })
      .a({ n: `alternateRowColors`, b: true })
      .a({ n: `sort`, v: this.client._event(`SORT`, [`\${$parameters>/column}.getSortProperty()`, `\${$parameters>/sortOrder}`], { prevent_default_expr: `\${$parameters>/column}.getId().indexOf('COL_DATE') >= 0` }) });
    tab.ele({ n: `extension`, ns: `table` }).ele(`OverflowToolbar`).tag(`Title`).a({ n: `text`, v: `Products` });
    const columns = tab.ele({ n: `columns`, ns: `table` });
    columns.ele({ n: `Column`, ns: `table` })
      .a({ n: `id`, v: `COL_PRODUCT` })
      .a({ n: `sortProperty`, v: `PRODUCT` })
      .tag(`Text`)
      .a({ n: `text`, v: `Product (client sort)` })
      .ele({ n: `template`, ns: `table` })
      .tag(`Text`)
      .a({ n: `text`, v: `{PRODUCT}` });
    columns.ele({ n: `Column`, ns: `table` })
      .a({ n: `id`, v: `COL_STOCK` })
      .a({ n: `sortProperty`, v: `STOCK` })
      .a({ n: `hAlign`, v: `End` })
      .tag(`Text`)
      .a({ n: `text`, v: `Stock (client sort)` })
      .ele({ n: `template`, ns: `table` })
      .tag(`Text`)
      .a({ n: `text`, v: `{STOCK}` });
    const col_date = columns.ele({ n: `Column`, ns: `table` })
      .a({ n: `id`, v: `COL_DATE` })
      .a({ n: `sortProperty`, v: `CREATED_TEXT` });
    if (!z2ui5_cl_util.abap_is_initial(this.sort_order) && String(this.last_sort).toLowerCase().includes(String(`BACKEND`).toLowerCase())) {
      col_date.a({ n: `sorted`, b: true }).a({ n: `sortOrder`, v: this.sort_order });
    }
    col_date.tag(`Text`)
      .a({ n: `text`, v: `Created (backend sort)` })
      .ele({ n: `template`, ns: `table` })
      .tag(`Text`)
      .a({ n: `text`, v: `{CREATED_TEXT}` });
    page.tag(`MessageStrip`)
      .a({ n: `text`, v: this.client._bind(this.last_sort) })
      .a({ n: `type`, v: `Success` })
      .a({ n: `showIcon`, b: true })
      .a({ n: `class`, v: `sapUiSmallMargin` });
    this.client.view_display(view.stringify());
  }
}

module.exports = z2ui5_cl_smp_app_505;

const z2ui5_cl_ui5_view_builder = require("abap2UI5/z2ui5_cl_ui5_view_builder");
const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");

