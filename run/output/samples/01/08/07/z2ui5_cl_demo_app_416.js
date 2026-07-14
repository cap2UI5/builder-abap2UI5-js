const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_416 extends z2ui5_if_app {
  t_items = [];
  slider_value = ``;
  panel_width = ``;
  client = null;

  async main(client) {
    this.client = z2ui5_cl_util.abap_copy(client);
    if (client.check_on_init()) {
      this.on_init();
    } else if (client.check_on_event(`SLIDER_MOVED`)) {
      this.panel_width = `${this.slider_value}%`;
      client.view_model_update();
    }
  }

  on_init() {
    this.slider_value = `100`;
    this.panel_width = `100%`;
    this.t_items = [{ title: `Grid item title 1`, subtitle: `Subtitle 1` }, { title: `Grid item title 2`, subtitle: `Subtitle 2` }, { title: `Grid item title 3`, subtitle: `Subtitle 3` }, { title: `Grid item title 4`, subtitle: `Subtitle 4` }, { title: `Grid item title 5`, subtitle: `Subtitle 5` }, { title: `Grid item title 6 Grid item title Grid item title Grid item title Grid item title Grid item title`, subtitle: `Subtitle 6` }, { title: `Very long Grid item title that should wrap 7`, subtitle: `This is a long subtitle 7` }, { title: `Grid item title B 8`, subtitle: `Subtitle 8` }, { title: `Grid item title B 9 Grid item title B  Grid item title B 9 Grid item title B 9Grid item title B 9title B 9 Grid item title B 9Grid item title B`, subtitle: `Subtitle 9` }, { title: `Grid item title B 10`, subtitle: `Subtitle 10` }, { title: `Grid item title B 11`, subtitle: `Subtitle 11` }, { title: `Grid item title B 12`, subtitle: `Subtitle 12` }, { title: `Grid item title 13`, subtitle: `Subtitle 13` }, { title: `Grid item title 14`, subtitle: `Subtitle 14` }, { title: `Grid item title 15`, subtitle: `Subtitle 15` }, { title: `Grid item title 16`, subtitle: `Subtitle 16` }, { title: `Grid item title 17`, subtitle: `Subtitle 17` }, { title: `Grid item title 18`, subtitle: `Subtitle 18` }, { title: `Very long Grid item title that should wrap 19`, subtitle: `This is a long subtitle 19` }, { title: `Grid item title B 20`, subtitle: `Subtitle 20` }, { title: `Grid item title B 21`, subtitle: `Subtitle 21` }, { title: `Grid item title B 22`, subtitle: `Subtitle 22` }, { title: `Grid item title B 23`, subtitle: `Subtitle 23` }, { title: `Grid item title B 24`, subtitle: `Subtitle 24` }, { title: `Grid item title B 21`, subtitle: `Subtitle 21` }, { title: `Grid item title B 22`, subtitle: `Subtitle 22` }, { title: `Grid item title B 23`, subtitle: `Subtitle 23` }];
    this.view_display();
  }

  view_display() {
    const view = z2ui5_cl_xml_view.factory();
    const page = view.shell()
      .page({ title: `abap2UI5 - Sample: Grid List - Basic examples`, navbuttonpress: this.client._event_nav_app_leave(), shownavbutton: this.client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.f.GridList/sample/sap.f.sample.GridListBasic` });
    page.slider({ value: this.client._bind_edit(this.slider_value), livechange: this.client._event(`SLIDER_MOVED`) });
    page.panel({ id: `panelForGridList`, backgrounddesign: `Transparent`, width: this.client._bind(this.panel_width) })
      .header_toolbar()
      .toolbar({ height: `3rem` })
      .title(`GridList with default grid layout`)
      .get_parent()
      .get_parent()
      .grid_list({ id: `gridList`, headertext: `GridList header`, items: this.client._bind(this.t_items) })
      .grid_list_item()
      .vbox(`sapUiSmallMargin`)
      .layout_data()
      .flex_item_data({ growfactor: `1`, shrinkfactor: `0` })
      .get_parent()
      .title({ text: `{TITLE}`, wrapping: true })
      .label({ text: `{SUBTITLE}`, wrapping: true });
    this.client.view_display(view.stringify());
  }
}

module.exports = z2ui5_cl_demo_app_416;
