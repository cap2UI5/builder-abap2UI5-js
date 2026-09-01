const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_smp_app_499 extends z2ui5_if_app {
  quantity = ``;
  variant = `a`;
  client = null;
  check_detail = false;

  async main(client) {
    this.client = client;
    if (client.check_on_navigated()) {
      this.view_display();
    } else if (client.check_on_event()) {
      this.on_event();
    }
  }

  view_display() {
    this.hash_apply();
    const view = z2ui5_cl_ui5_view_builder.factory()
      .ele({ n: `View`, ns: `mvc` })
      .a({ n: `displayBlock`, v: `true` })
      .a({ n: `height`, v: `100%` })
      .a({ n: `xmlns`, v: `sap.m` })
      .a({ n: `xmlns:mvc`, v: `sap.ui.core.mvc` })
      .a({ n: `xmlns:core`, v: `sap.ui.core` })
      .a({ n: `xmlns:form`, v: `sap.ui.layout.form` });
    const nav = view.ele(`Shell`).ele(`NavContainer`).a({ n: `id`, v: `nav` });
    const main = nav.ele(`Page`)
      .a({ n: `id`, v: `page-main` })
      .a({ n: `title`, v: `abap2UI5 - App-Owned Hash Routing` })
      .a({ n: `showNavButton`, b: this.client.check_app_prev_stack() })
      .a({ n: `navButtonPress`, v: this.client._event_nav_app_leave() });
    main.tag(`MessageStrip`)
      .a({ n: `text`, v: `The URL has no hash right now. Type something, open the detail page and watch ` + `the address bar: hash_set writes #/detail, and the BROWSER Back button returns here ` + `- with the input still set.` })
      .a({ n: `type`, v: `Information` })
      .a({ n: `showIcon`, b: true })
      .a({ n: `class`, v: `sapUiSmallMargin` });
    const form = main.ele({ n: `SimpleForm`, ns: `form` })
      .a({ n: `title`, v: `Some state` })
      .a({ n: `editable`, b: true })
      .ele({ n: `content`, ns: `form` });
    form.tag(`Label`).a({ n: `text`, v: `quantity` });
    form.tag(`Input`).a({ n: `value`, v: this.client._bind(this.quantity) });
    form.tag(`Button`)
      .a({ n: `press`, v: this.client._event(`GO_DETAIL`) })
      .a({ n: `text`, v: `open the detail page (#/detail)` })
      .a({ n: `type`, v: `Emphasized` });
    const detail = nav.ele(`Page`)
      .a({ n: `id`, v: `page-detail` })
      .a({ n: `title`, v: `Detail (#/detail)` })
      .a({ n: `showNavButton`, b: true })
      .a({ n: `navButtonPress`, v: this.client.follow_up_action_result(z2ui5_if_client.cs_event.hash_back, [`/`]) });
    detail.tag(`MessageStrip`)
      .a({ n: `text`, v: `This page is #/detail. Reload the browser or share the URL - it lands here. ` + `The back arrow is cs_event-hash_back with '/' as fallback: normally a real ` + `window.history.go(-1), and on a cold deep link a replace to the start page.` })
      .a({ n: `type`, v: `Success` })
      .a({ n: `showIcon`, b: true })
      .a({ n: `class`, v: `sapUiSmallMargin` });
    const vform = detail.ele({ n: `SimpleForm`, ns: `form` })
      .a({ n: `title`, v: `hash_replace - the URL follows, Back skips it` })
      .a({ n: `editable`, b: true })
      .ele({ n: `content`, ns: `form` });
    vform.tag(`Label`).a({ n: `text`, v: `variant (watch the URL - and note Back still returns to the first page)` });
    vform.ele(`SegmentedButton`)
      .a({ n: `selectedKey`, v: this.client._bind(this.variant) })
      .a({ n: `selectionChange`, v: this.client._event({ val: `VARIANT`, arg: `\${$parameters>/item}.getKey()` }) })
      .ele(`items`)
      .tag(`SegmentedButtonItem`)
      .a({ n: `key`, v: `a` })
      .a({ n: `text`, v: `Variant A` })
      .tag(`SegmentedButtonItem`)
      .a({ n: `key`, v: `b` })
      .a({ n: `text`, v: `Variant B` })
      .tag(`SegmentedButtonItem`)
      .a({ n: `key`, v: `c` })
      .a({ n: `text`, v: `Variant C` })
      .end()
      .end();
    detail.tag(`ObjectStatus`)
      .a({ n: `text`, v: this.client._bind(this.quantity) })
      .a({ n: `title`, v: `quantity from the first page` })
      .a({ n: `class`, v: `sapUiSmallMargin` });
    this.client.view_display(view.stringify());
    this.client.follow_up_action(z2ui5_if_client.cs_event.hash_attach_changed, [`HASH_CHANGED`]);
    if ((this.check_detail === true || this.check_detail === `X`)) {
      this.client.follow_up_action(this.client.cs_event.control_by_id, [`nav`, `to`, `page-detail`]);
    }
  }

  on_event() {
    switch (this.client.get_event()) {
      case `GO_DETAIL`:
        this.check_detail = true;
        this.client.follow_up_action(this.client.cs_event.control_by_id, [`nav`, `to`, `page-detail`]);
        this.client.hash_set(`/detail/${this.variant}`);
        break;
      case `VARIANT`:
        this.variant = this.client.get_event_arg();
        this.client.hash_replace(`/detail/${this.variant}`);
        break;
      case `HASH_CHANGED`:
        this.hash_apply();
        this.client.follow_up_action(this.client.cs_event.control_by_id, [`nav`, `to`, ((this.check_detail === true || this.check_detail === `X`) ? `page-detail` : `page-main`)]);
        break;
    }
  }

  hash_apply() {
    let lv_variant;
    const lv_hash = this.client.get().S_CONFIG.HASH;
    this.check_detail = (String(lv_hash).toLowerCase().includes(String(`/detail`).toLowerCase()));
    if ((this.check_detail === true || this.check_detail === `X`)) {
      lv_variant = (($v, $s) => { const $i = $v.indexOf($s); return $i < 0 ? `` : $v.slice($i + $s.length); })(lv_hash, `/detail/`);
      if ([...String(lv_variant)].every(($c) => String(`abc`).includes($c)) && !z2ui5_cl_util.abap_is_initial(lv_variant)) {
        this.variant = z2ui5_cl_util.abap_tab_assign(this.variant, z2ui5_cl_util.abap_copy(lv_variant));
      }
    }
  }
}

module.exports = z2ui5_cl_smp_app_499;

const z2ui5_cl_ui5_view_builder = require("abap2UI5/z2ui5_cl_ui5_view_builder");
const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");
const z2ui5_if_client = require("abap2UI5/z2ui5_if_client");

