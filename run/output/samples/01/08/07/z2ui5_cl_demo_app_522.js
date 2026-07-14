const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_522 extends z2ui5_if_app {
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
    const page = z2ui5_cl_xml_view.factory()
      .shell()
      .page({ title: `abap2UI5 - Sample: Nested Example`, navbuttonpress: this.client._event_nav_app_leave(), shownavbutton: this.client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.ui.layout.cssgrid.CSSGrid/sample/sap.ui.layout.sample.NestedGrids` });
    page.slider({ value: this.client._bind_edit(this.slider_value), livechange: this.client._event(`SLIDER_MOVED`), class: `sapUiSmallMarginBottom` });
    const panel = page.panel({ id: `panelCSSGrid`, width: this.client._bind(this.panel_width), height: `100%` });
    panel.header_toolbar().overflow_toolbar({ height: `3rem` }).title(`CSS Grid Nested grids example`);
    const grid = panel._generic({ name: `CSSGrid`, ns: `grid`, t_prop: [{ n: `id`, v: `grid1` }, { n: `gridTemplateColumns`, v: `repeat(2,minmax(250px, 1fr))` }, { n: `gridTemplateRows`, v: `1fr 3fr` }, { n: `gridGap`, v: `1rem` }] });
    grid.vbox(`demoBox`).title({ text: `A Box`, wrapping: true }).text({ text: `A Box subtitle`, wrapping: true });
    grid.vbox(`demoBox`).title({ text: `B Box`, wrapping: true }).text({ text: `B Box subtitle`, wrapping: true });
    grid.vbox(`demoBox`).title({ text: `C Box`, wrapping: true }).text({ text: `C Box subtitle`, wrapping: true });
    const nested_grid = grid.vbox(`demoBox`)
      ._generic({ name: `CSSGrid`, ns: `grid`, t_prop: [{ n: `gridTemplateColumns`, v: `repeat(2,minmax(120px, 1fr))` }, { n: `gridGap`, v: `0.5rem` }] });
    nested_grid.vbox(`sapUiSmallMarginTop sapUiSmallMarginBegin sapUiSmallMarginEnd demoInnerBox`)
      .layout_data()
      ._generic({ name: `GridItemLayoutData`, ns: `grid`, t_prop: [{ n: `gridColumn`, v: `1 / 3` }, { n: `gridRow`, v: `1` }] })
      .get_parent()
      .get_parent()
      .title({ text: `E Box`, wrapping: true })
      .text({ text: `E Box subtitle`, wrapping: true });
    nested_grid.vbox(`sapUiSmallMarginBegin demoInnerBox`)
      .layout_data()
      ._generic({ name: `GridItemLayoutData`, ns: `grid`, t_prop: [{ n: `gridColumn`, v: `1` }, { n: `gridRow`, v: `2` }] })
      .get_parent()
      .get_parent()
      .title({ text: `F Box`, wrapping: true })
      .text({ text: `F Box subtitle`, wrapping: true });
    nested_grid.vbox(`sapUiSmallMarginEnd demoInnerBox`)
      .layout_data()
      ._generic({ name: `GridItemLayoutData`, ns: `grid`, t_prop: [{ n: `gridColumn`, v: `2` }, { n: `gridRow`, v: `2` }] })
      .get_parent()
      .get_parent()
      .title({ text: `G Box`, wrapping: true })
      .text({ text: `G Box subtitle`, wrapping: true });
    this.client.view_display(page.stringify());
  }
}

module.exports = z2ui5_cl_demo_app_522;
