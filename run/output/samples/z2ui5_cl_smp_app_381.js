const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_smp_app_381 extends z2ui5_if_app {
  client = null;
  message = ``;
  duration = ``;
  width = ``;
  my = ``;
  at = ``;
  dock_to_anchor = false;
  offset = ``;
  collision = ``;
  animation_timing = ``;
  animation_duration = ``;
  autoclose = false;
  close_on_navigation = false;
  notify_close = false;
  css_class = ``;
  closed_count = 0;
  closed_text = ``;

  async main(client) {
    this.client = client;
    if (client.check_on_init()) {
      this.on_init();
      this.view_display();
    } else if (client.check_on_navigated()) {
      this.view_display();
    } else if (client.check_on_event(`SHOW`)) {
      this.show_toast();
    } else if (client.check_on_event(`TOAST_CLOSED`)) {
      this.closed_count = this.closed_count + 1;
      this.closed_text = `toast closed ${this.closed_count} time(s) - the onclose event reached the backend`;
    }
  }

  on_init() {
    this.message = `This is a message toast.`;
    this.duration = `3000`;
    this.width = `15em`;
    this.my = `center bottom`;
    this.at = `center bottom`;
    this.offset = `0 0`;
    this.collision = `fit fit`;
    this.animation_timing = `ease`;
    this.animation_duration = `1000`;
    this.autoclose = true;
    this.close_on_navigation = true;
    this.notify_close = true;
    this.css_class = `myToast`;
    this.closed_text = `no toast closed yet`;
  }

  show_toast() {
    this.client.follow_up_action(this.client.cs_event.control_global, [`MESSAGE_TOAST`, `show`, this.message, this.toast_options()]);
  }

  toast_options() {
    let result = ``;
    let sy_tabix = 0;
    let t_opt = [];
    if (!z2ui5_cl_util.abap_is_initial(this.duration)) {
      t_opt.push(z2ui5_cl_util.abap_copy(`"duration":${this.duration}`));
    }
    if (!z2ui5_cl_util.abap_is_initial(this.animation_duration)) {
      t_opt.push(z2ui5_cl_util.abap_copy(`"animationDuration":${this.animation_duration}`));
    }
    sy_tabix = 0;
    for (const s_opt of [{ name: `width`, val: this.width }, { name: `my`, val: this.my }, { name: `at`, val: this.at }, { name: `offset`, val: this.offset }, { name: `collision`, val: this.collision }, { name: `animationTimingFunction`, val: this.animation_timing }]) {
      sy_tabix++;
      if (!z2ui5_cl_util.abap_is_initial(s_opt.val)) {
        t_opt.push(z2ui5_cl_util.abap_copy(`"${s_opt.name}":"${s_opt.val}"`));
      }
    }
    t_opt.push(z2ui5_cl_util.abap_copy(`"autoClose":${((this.autoclose === true || this.autoclose === `X`) ? `true` : `false`)}`));
    t_opt.push(z2ui5_cl_util.abap_copy(`"closeOnBrowserNavigation":${((this.close_on_navigation === true || this.close_on_navigation === `X`) ? `true` : `false`)}`));
    if ((this.dock_to_anchor === true || this.dock_to_anchor === `X`)) {
      t_opt.push(z2ui5_cl_util.abap_copy(`"of":"#toastAnchor"`));
    }
    if (!z2ui5_cl_util.abap_is_initial(this.css_class)) {
      t_opt.push(z2ui5_cl_util.abap_copy(`"class":"${this.css_class}"`));
    }
    if ((this.notify_close === true || this.notify_close === `X`)) {
      t_opt.push(z2ui5_cl_util.abap_copy(`"onClose":"TOAST_CLOSED"`));
    }
    sy_tabix = 0;
    for (const option of t_opt) {
      sy_tabix++;
      if (z2ui5_cl_util.abap_is_initial(result)) {
        result = z2ui5_cl_util.abap_tab_assign(result, z2ui5_cl_util.abap_copy(option));
      } else {
        result = `${result},${option}`;
      }
    }
    result = `{${result}}`;
    return result;
  }

  view_display() {
    let sy_tabix = 0;
    const page = z2ui5_cl_ui5_view_builder.factory()
      .ele({ n: `View`, ns: `mvc` })
      .a({ n: `displayBlock`, v: `true` })
      .a({ n: `height`, v: `100%` })
      .a({ n: `xmlns`, v: `sap.m` })
      .a({ n: `xmlns:mvc`, v: `sap.ui.core.mvc` })
      .a({ n: `xmlns:core`, v: `sap.ui.core` })
      .a({ n: `xmlns:form`, v: `sap.ui.layout.form` })
      .ele(`Shell`)
      .ele(`Page`)
      .a({ n: `title`, v: `abap2UI5 - Message - MessageToast via the Global Object` })
      .a({ n: `showNavButton`, b: this.client.check_app_prev_stack() })
      .a({ n: `navButtonPress`, v: this.client._event_nav_app_leave() });
    page.tag(`MessageStrip`)
      .a({ n: `text`, v: `Two ways to a toast, and this is the UI5 one: follow_up_action( cs_event-control_global ) ` + `calls sap.m.MessageToast.show( ) itself, and its last argument is the option object of that API 1:1 - ` + `position, collision, animation, autoClose. Configure them below and watch the object travel. ` + `The other way is client->message_toast_display( ), which carries no UI5 option at all: it carries ` + `what an ABAP app decides, and Z2UI5_CL_SMP_APP_502 shows that side for the message box.` })
      .a({ n: `type`, v: `Information` })
      .a({ n: `showIcon`, b: true })
      .a({ n: `class`, v: `sapUiSmallMargin` });
    page.tag({ n: `HTML`, ns: `core` })
      .a({ n: `content`, v: `<style>.myToast \\{ background-color: #0a6ed1; color: #fff; \\}</style>` + `<div id="toastAnchor" class="sapUiSmallMargin" style="border: 2px dashed #0a6ed1; padding: 0.5rem; width: 14rem;">` + `the anchor box (id toastAnchor)</div>` });
    page.ele(`headerContent`)
      .tag(`Link`)
      .a({ n: `text`, v: `UI5 Demo Kit` })
      .a({ n: `target`, v: `_blank` })
      .a({ n: `href`, v: `https://sdk.openui5.org/entity/sap.m.MessageToast/sample/sap.m.sample.MessageToast` });
    const form = page.ele(`Panel`)
      .a({ n: `headerText`, v: `Message Toast Configuration` })
      .ele({ n: `SimpleForm`, ns: `form` })
      .a({ n: `title`, v: `Settings` })
      .a({ n: `editable`, b: true })
      .ele({ n: `content`, ns: `form` });
    form.tag(`Label`)
      .a({ n: `text`, v: `Message` })
      .tag(`Input`)
      .a({ n: `value`, v: this.client._bind(this.message) })
      .tag(`Label`)
      .a({ n: `text`, v: `Duration (ms)` })
      .tag(`Input`)
      .a({ n: `type`, v: `Number` })
      .a({ n: `value`, v: this.client._bind(this.duration) })
      .tag(`Label`)
      .a({ n: `text`, v: `Width` })
      .tag(`Input`)
      .a({ n: `value`, v: this.client._bind(this.width) });
    const select_my = form.tag(`Label`)
      .a({ n: `text`, v: `my` })
      .ele(`Select`)
      .a({ n: `selectedKey`, v: this.client._bind(this.my) });
    const select_at = form.tag(`Label`)
      .a({ n: `text`, v: `at` })
      .ele(`Select`)
      .a({ n: `selectedKey`, v: this.client._bind(this.at) });
    sy_tabix = 0;
    for (const position of this.get_positions()) {
      sy_tabix++;
      select_my.tag({ n: `Item`, ns: `core` }).a({ n: `key`, t: position }).a({ n: `text`, t: position });
      select_at.tag({ n: `Item`, ns: `core` }).a({ n: `key`, t: position }).a({ n: `text`, t: position });
    }
    form.tag(`Label`)
      .a({ n: `text`, v: `of - dock to the anchor box instead of the window` })
      .tag(`CheckBox`)
      .a({ n: `selected`, v: this.client._bind(this.dock_to_anchor) })
      .tag(`Label`)
      .a({ n: `text`, v: `offset` })
      .tag(`Input`)
      .a({ n: `value`, v: this.client._bind(this.offset) });
    form.tag(`Label`)
      .a({ n: `text`, v: `collision` })
      .ele(`Select`)
      .a({ n: `selectedKey`, v: this.client._bind(this.collision) })
      .tag({ n: `Item`, ns: `core` })
      .a({ n: `key`, v: `fit fit` })
      .a({ n: `text`, v: `fit fit - shift into the viewport` })
      .tag({ n: `Item`, ns: `core` })
      .a({ n: `key`, v: `flip flip` })
      .a({ n: `text`, v: `flip flip - flip to the opposite side` })
      .tag({ n: `Item`, ns: `core` })
      .a({ n: `key`, v: `flipfit flipfit` })
      .a({ n: `text`, v: `flipfit flipfit - flip first, then shift` })
      .tag({ n: `Item`, ns: `core` })
      .a({ n: `key`, v: `none none` })
      .a({ n: `text`, v: `none none - stay where told` });
    const select_animation = form.tag(`Label`)
      .a({ n: `text`, v: `animationTimingFunction` })
      .ele(`Select`)
      .a({ n: `selectedKey`, v: this.client._bind(this.animation_timing) });
    select_animation.tag({ n: `Item`, ns: `core` })
      .a({ n: `key`, v: `ease` })
      .a({ n: `text`, v: `ease` })
      .tag({ n: `Item`, ns: `core` })
      .a({ n: `key`, v: `linear` })
      .a({ n: `text`, v: `linear` })
      .tag({ n: `Item`, ns: `core` })
      .a({ n: `key`, v: `ease-in` })
      .a({ n: `text`, v: `ease-in` })
      .tag({ n: `Item`, ns: `core` })
      .a({ n: `key`, v: `ease-out` })
      .a({ n: `text`, v: `ease-out` })
      .tag({ n: `Item`, ns: `core` })
      .a({ n: `key`, v: `ease-in-out` })
      .a({ n: `text`, v: `ease-in-out` });
    form.tag(`Label`)
      .a({ n: `text`, v: `animationDuration (ms)` })
      .tag(`Input`)
      .a({ n: `type`, v: `Number` })
      .a({ n: `value`, v: this.client._bind(this.animation_duration) })
      .tag(`Label`)
      .a({ n: `text`, v: `autoClose` })
      .tag(`CheckBox`)
      .a({ n: `selected`, v: this.client._bind(this.autoclose) })
      .tag(`Label`)
      .a({ n: `text`, v: `closeOnBrowserNavigation` })
      .tag(`CheckBox`)
      .a({ n: `selected`, v: this.client._bind(this.close_on_navigation) })
      .tag(`Label`)
      .a({ n: `text`, v: `onclose - report the closing as a backend event` })
      .tag(`CheckBox`)
      .a({ n: `selected`, v: this.client._bind(this.notify_close) })
      .tag(`Label`)
      .a({ n: `text`, v: `class - a CSS class for the toast (myToast is styled above)` })
      .tag(`Input`)
      .a({ n: `value`, v: this.client._bind(this.css_class) });
    form.tag(`Button`)
      .a({ n: `press`, v: this.client._event(`SHOW`) })
      .a({ n: `text`, v: `Show Message Toast` })
      .a({ n: `type`, v: `Emphasized` });
    form.tag(`Label`)
      .a({ n: `text`, v: `the onclose event` })
      .tag(`Text`)
      .a({ n: `text`, v: this.client._bind(this.closed_text) });
    form.tag(`Label`)
      .a({ n: `text`, v: `wired, no round-trip - the text is composed on the client` })
      .tag(`Button`)
      .a({ n: `text`, v: `Compose on the client` })
      .a({ n: `press`, v: this.client.follow_up_action_result(this.client.cs_event.control_global, [`MESSAGE_TOAST`, `show`, `{0} - composed on the client, the backend never saw this press`, `\${$source>/text}`]) });
    this.client.view_display(page.stringify());
  }

  get_positions() {
    let result = [];
    result = z2ui5_cl_util.abap_tab_assign(result, [`begin top`, `begin center`, `begin bottom`, `left top`, `left center`, `left bottom`, `center top`, `center center`, `center bottom`, `right top`, `right center`, `right bottom`, `end top`, `end center`, `end bottom`]);
    return result;
  }
}

module.exports = z2ui5_cl_smp_app_381;

const z2ui5_cl_ui5_view_builder = require("abap2UI5/z2ui5_cl_ui5_view_builder");
const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");

