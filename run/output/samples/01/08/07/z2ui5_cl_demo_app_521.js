const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_521 extends z2ui5_if_app {
  slider_value = 0;
  panel_width = ``;
  client = null;

  async main(client) {
    this.client = z2ui5_cl_util.abap_copy(client);
    if (client.check_on_init()) {
      this.slider_value = 100;
      this.panel_width = `100%`;
      this.view_display();
    } else if (client.check_on_navigated()) {
      this.view_display();
    } else if (client.check_on_event(`SLIDER_MOVED`)) {
      this.panel_width = `${this.slider_value}%`;
      client.view_model_update();
    }
  }

  view_display() {
    const item_style = `background-color:#3b6f9a;color:#ffffff;border-radius:10px;display:flex;align-items:center;justify-content:center;`;
    const page = z2ui5_cl_xml_view.factory()
      .shell()
      .page({ title: `abap2UI5 - Sample: CSSGrid`, navbuttonpress: this.client._event_nav_app_leave(), shownavbutton: this.client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.ui.layout.cssgrid.CSSGrid/sample/sap.ui.layout.sample.CSSGrid` });
    page.slider({ value: this.client._bind_edit(this.slider_value), livechange: this.client._event(`SLIDER_MOVED`), class: `sapUiSmallMarginBottom` });
    const panel = page.panel({ id: `gridLayout`, width: this.client._bind(this.panel_width), height: `100%` });
    panel.header_toolbar().overflow_toolbar({ height: `3rem` }).title(` CssGrid Layout example`);
    const grid = panel._generic({ name: `CSSGrid`, ns: `grid`, t_prop: [{ n: `id`, v: `grid1` }, { n: `gridTemplateColumns`, v: `1fr 2fr 1fr` }, { n: `gridTemplateRows`, v: `50px 200px 50px` }, { n: `gridGap`, v: `1rem` }] });
    grid.html(`<header style="${item_style}">Header</header>`)
      .layout_data(`core`)
      ._generic({ name: `GridItemLayoutData`, ns: `grid`, t_prop: [{ n: `gridColumn`, v: `1 / 4` }] });
    grid.html(`<aside style="${item_style}">Navigation</aside>`);
    grid.html(`<article style="${item_style}">Main Content</article>`);
    grid.html(`<aside style="${item_style}">Related Links</aside>`);
    grid.html(`<footer style="${item_style}">Footer</footer>`)
      .layout_data(`core`)
      ._generic({ name: `GridItemLayoutData`, ns: `grid`, t_prop: [{ n: `gridColumn`, v: `1 / 4` }] });
    this.client.view_display(page.stringify());
  }
}

module.exports = z2ui5_cl_demo_app_521;
