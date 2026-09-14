const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_smp_app_504 extends z2ui5_if_app {
  t_row = [];
  report = ``;
  report_text = ``;
  client = null;

  async main(client) {
    this.client = client;
    this.refused_apply();
    if (client.check_on_init()) {
      this.on_init();
    } else if (client.check_on_navigated()) {
      this.view_display();
    } else if (client.check_on_event()) {
      this.on_event();
    }
  }

  on_init() {
    this.t_row = z2ui5_cl_util.abap_tab_assign(this.t_row, [{ product: `Notebook 15"`, price: `1299.00`, currency: `EUR`, stock: 12, price_state: `None`, stock_state: `None`, t_item: [{ name: `SSD 1 TB`, qty: 1, qty_state: `None` }, { name: `RAM 16 GB`, qty: 2, qty_state: `None` }] }, { product: `Monitor 27"`, price: `349.90`, currency: `EUR`, stock: 5, price_state: `None`, stock_state: `None`, t_item: [{ name: `HDMI cable`, qty: 1, qty_state: `None` }] }, { product: `USB-C Dock`, price: `189.00`, currency: `EUR`, stock: 40, price_state: `None`, stock_state: `None`, t_item: [{ name: `Power supply`, qty: 1, qty_state: `None` }] }]);
    this.view_display();
  }

  refused_apply() {
    let sy_tabix = 0;
    let sy_subrc = 0;
    let fs_s_row = null;
    let _fs$fs_s_row = null;
    let fs_s_item = null;
    let _fs$fs_s_item = null;
    sy_tabix = 0;
    for (const fs_s_row of this.t_row) {
      sy_tabix++;
      fs_s_row.price_state = `None`;
      fs_s_row.stock_state = `None`;
      fs_s_row.price_text = ``;
      fs_s_row.stock_text = ``;
      const _sy_tabix_1 = sy_tabix;
      sy_tabix = 0;
      for (const fs_s_item of fs_s_row.t_item) {
        sy_tabix++;
        fs_s_item.qty_state = `None`;
        fs_s_item.qty_text = ``;
      }
      sy_tabix = _sy_tabix_1;
    }
    const t_skipped = this.client.get().T_MODEL_SKIPPED;
    this.report = ``;
    sy_tabix = 0;
    for (const s_skipped of t_skipped) {
      sy_tabix++;
      switch (s_skipped.name) {
        case `T_ROW`:
          {
            const _t = this.t_row;
            const _i = (s_skipped.row) - 1;
            sy_subrc = _i >= 0 && _i < _t.length ? 0 : 4;
            fs_s_row = sy_subrc === 0 ? _t[_i] : null;
            _fs$fs_s_row = sy_subrc === 0 ? { o: _t, k: _i } : null;
          }
          if (sy_subrc !== 0) {
            continue;
          }
          switch (s_skipped.field) {
            case `PRICE`:
              fs_s_row.price_state = `Error`;
              fs_s_row.price_text = `'${s_skipped.value}' is not a valid price - the stored value ${fs_s_row.price} stands`;
              break;
            case `STOCK`:
              fs_s_row.stock_state = `Error`;
              fs_s_row.stock_text = `'${s_skipped.value}' is not a whole number - the stored value ${fs_s_row.stock} stands`;
              break;
          }
          break;
        case `T_ROW-T_ITEM`:
          {
            const _t = this.t_row;
            const _i = (s_skipped.row_parent) - 1;
            sy_subrc = _i >= 0 && _i < _t.length ? 0 : 4;
            fs_s_row = sy_subrc === 0 ? _t[_i] : null;
            _fs$fs_s_row = sy_subrc === 0 ? { o: _t, k: _i } : null;
          }
          if (sy_subrc !== 0) {
            continue;
          }
          {
            const _t = fs_s_row.t_item;
            const _i = (s_skipped.row) - 1;
            sy_subrc = _i >= 0 && _i < _t.length ? 0 : 4;
            fs_s_item = sy_subrc === 0 ? _t[_i] : null;
            _fs$fs_s_item = sy_subrc === 0 ? { o: _t, k: _i } : null;
          }
          if (sy_subrc !== 0) {
            continue;
          }
          fs_s_item.qty_state = `Error`;
          fs_s_item.qty_text = `'${s_skipped.value}' is not a quantity - the stored value ${fs_s_item.qty} stands`;
          break;
      }
      this.report = `${this.report}${s_skipped.name} row ${s_skipped.row} field ${s_skipped.field}: '${s_skipped.value}' refused. `;
    }
    this.report_text = (z2ui5_cl_util.abap_is_initial(this.report) ? `Every cell of the last roundtrip converted.` : this.report);
  }

  on_event() {
    switch (this.client.get_event()) {
      case `SAVE`:
        if (z2ui5_cl_util.abap_is_initial(this.report)) {
          this.client.message_toast_display(`saved - every cell converted`);
        } else {
          this.client.message_box_display(`Not saved. ${this.report}`, `error`);
        }
        break;
      case `RESET`:
        this.on_init();
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
      .a({ n: `xmlns:core`, v: `sap.ui.core` });
    const page = view.ele(`Shell`)
      .ele(`Page`)
      .a({ n: `title`, v: `abap2UI5 - Table - Refused Cell Values (t_model_skipped)` })
      .a({ n: `showNavButton`, b: this.client.check_app_prev_stack() })
      .a({ n: `navButtonPress`, v: this.client._event_nav_app_leave() });
    page.tag(`MessageStrip`)
      .a({ n: `text`, v: `Type text into a price, a stock or a component quantity - 'abc', '12,50 EUR', 'seven' - ` + `and press Save. The cell that does not fit its ABAP type is skipped, not raised on: ` + `get( )-t_model_skipped names table, row and field, and the app marks the cell instead ` + `of reporting a success the model does not carry.` })
      .a({ n: `type`, v: `Information` })
      .a({ n: `showIcon`, b: true })
      .a({ n: `class`, v: `sapUiSmallMargin` });
    const tab = page.ele(`Table`)
      .a({ n: `items`, v: this.client._bind(this.t_row) })
      .a({ n: `class`, v: `sapUiSmallMargin` });
    tab.ele(`headerToolbar`)
      .ele(`OverflowToolbar`)
      .tag(`Title`)
      .a({ n: `text`, v: `Products - every cell editable` })
      .tag(`ToolbarSpacer`)
      .tag(`Button`)
      .a({ n: `text`, v: `Reset` })
      .a({ n: `press`, v: this.client._event(`RESET`) })
      .tag(`Button`)
      .a({ n: `text`, v: `Save` })
      .a({ n: `type`, v: `Emphasized` })
      .a({ n: `press`, v: this.client._event(`SAVE`) });
    tab.ele(`columns`)
      .ele(`Column`)
      .tag(`Text`)
      .a({ n: `text`, v: `Product` })
      .end()
      .ele(`Column`)
      .tag(`Text`)
      .a({ n: `text`, v: `Price (packed)` })
      .end()
      .ele(`Column`)
      .a({ n: `width`, v: `6rem` })
      .tag(`Text`)
      .a({ n: `text`, v: `Currency` })
      .end()
      .ele(`Column`)
      .tag(`Text`)
      .a({ n: `text`, v: `Stock (integer)` })
      .end()
      .ele(`Column`)
      .tag(`Text`)
      .a({ n: `text`, v: `Components (nested table)` })
      .end();
    const cells = tab.ele(`items`).ele(`ColumnListItem`).a({ n: `vAlign`, v: `Top` });
    cells.tag(`Text`).a({ n: `text`, v: `{PRODUCT}` });
    cells.tag(`Input`)
      .a({ n: `value`, v: `{PRICE}` })
      .a({ n: `valueState`, v: `{PRICE_STATE}` })
      .a({ n: `valueStateText`, v: `{PRICE_TEXT}` });
    cells.tag(`Text`).a({ n: `text`, v: `{CURRENCY}` });
    cells.tag(`Input`)
      .a({ n: `value`, v: `{STOCK}` })
      .a({ n: `valueState`, v: `{STOCK_STATE}` })
      .a({ n: `valueStateText`, v: `{STOCK_TEXT}` });
    cells.ele(`List`)
      .a({ n: `items`, v: `{T_ITEM}` })
      .a({ n: `showSeparators`, v: `None` })
      .ele(`CustomListItem`)
      .ele(`HBox`)
      .a({ n: `alignItems`, v: `Center` })
      .tag(`Text`)
      .a({ n: `text`, v: `{NAME}` })
      .a({ n: `width`, v: `8rem` })
      .tag(`Input`)
      .a({ n: `value`, v: `{QTY}` })
      .a({ n: `width`, v: `5rem` })
      .a({ n: `valueState`, v: `{QTY_STATE}` })
      .a({ n: `valueStateText`, v: `{QTY_TEXT}` });
    page.tag(`MessageStrip`)
      .a({ n: `text`, v: this.client._bind(this.report_text) })
      .a({ n: `type`, v: `Warning` })
      .a({ n: `showIcon`, b: true })
      .a({ n: `class`, v: `sapUiSmallMargin` });
    this.client.view_display(view.stringify());
  }
}

module.exports = z2ui5_cl_smp_app_504;

const z2ui5_cl_ui5_view_builder = require("abap2UI5/z2ui5_cl_ui5_view_builder");
const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");

