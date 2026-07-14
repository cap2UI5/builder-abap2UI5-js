const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_418 extends z2ui5_if_app {
  t_items = [];
  width = ``;
  client = null;

  view_display({ client } = {}) {
    this.width = `100%`;
    this.t_items = [{ title: `Grid item title 1`, subtitle: `Subtitle 1`, group: `Group A` }, { title: `Grid item title 2`, subtitle: `Subtitle 2`, group: `Group A` }, { title: `Grid item title 3`, subtitle: `Subtitle 3`, group: `Group A` }, { title: `Grid item title 4`, subtitle: `Subtitle 4`, group: `Group A` }, { title: `Grid item title 5`, subtitle: `Subtitle 5`, group: `Group A` }, { title: `Grid item title 6`, subtitle: `Subtitle 6`, group: `Group A` }, { title: `Grid item title 7`, subtitle: `Subtitle 7`, group: `Group A` }, { title: `Grid item title 8`, subtitle: `Subtitle 8`, group: `Group A` }, { title: `Grid item title 9`, subtitle: `Subtitle 9`, group: `Group A` }, { title: `Grid item title 10`, subtitle: `Subtitle 10`, group: `Group B` }, { title: `Grid item title 11`, subtitle: `Subtitle 11`, group: `Group B` }, { title: `Grid item title 12`, subtitle: `Subtitle 12`, group: `Group B` }, { title: `Grid item title 13`, subtitle: `Subtitle 13`, group: `Group B` }, { title: `Grid item title 14`, subtitle: `Subtitle 14`, group: `Group B` }, { title: `Grid item title 15`, subtitle: `Subtitle 15`, group: `Group B` }, { title: `Grid item title 16`, subtitle: `Subtitle 16`, group: `Group B` }, { title: `Grid item title 17`, subtitle: `Subtitle 17`, group: `Group B` }, { title: `Grid item title 18`, subtitle: `Subtitle 18`, group: `Group B` }, { title: `Grid item title 19 Grid item title 19 Grid item title 19 Grid item title 19 Grid item title 19 Grid item title 19 Grid item title 19 `, subtitle: `Subtitle 19`, group: `Group B` }, { title: `Grid item title 20`, subtitle: `Subtitle 20`, group: `Group B` }, { title: `Grid item title 21`, subtitle: `Subtitle 21`, group: `Group B` }, { title: `Grid item title 22`, subtitle: `Subtitle 22`, group: `Group B` }, { title: `Grid item title 23`, subtitle: `Subtitle 23`, group: `Group B` }, { title: `Grid item title 24`, subtitle: `Subtitle 24`, group: `Group B` }, { title: `Grid item title 25`, subtitle: `Subtitle 25`, group: `Group B` }, { title: `Grid item title 26`, subtitle: `Subtitle 26`, group: `Group B` }, { title: `Grid item title 27`, subtitle: `Subtitle 27`, group: `Group B` }];
    const page = z2ui5_cl_xml_view.factory()
      .shell()
      .page({ title: `abap2UI5 - Sample: Grid List features - Grouping, Header, Growing`, navbuttonpress: client._event_nav_app_leave(), shownavbutton: client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.f.GridList/sample/sap.f.sample.GridListBoxContainerGrouping` });
    page.slider({ value: `100`, livechange: client._event(`SLIDER_MOVED`, [`\${$parameters>/value}`]) });
    page.panel({ id: `panelForGridList`, backgrounddesign: `Transparent`, width: client._bind(this.width) })
      .header_toolbar()
      .toolbar({ height: `3rem` })
      .title(`GridList with GridBoxLayout`)
      .get_parent()
      .get_parent()
      .grid_list({ id: `gridList`, growing: true, growingthreshold: `9`, items: `{path:'` + client._bind(this.t_items, { path: true }) + `', sorter: { path: 'GROUP', descending: false, group: true } }` })
      ._generic({ name: `headerToolbar`, ns: `f` })
      .toolbar()
      .title(`GridList, using custom header with SearchField`)
      .toolbar_spacer()
      .search_field({ width: `15rem` })
      .get_parent()
      .get_parent()
      .custom_layout(`f`)
      .grid_box_layout()
      .get_parent()
      .grid_list_item()
      .vbox()
      .vbox(`sapUiSmallMargin`)
      .layout_data()
      .flex_item_data({ growfactor: `1`, shrinkfactor: `0` })
      .get_parent()
      .title({ text: `{TITLE}`, wrapping: true })
      .label({ text: `{SUBTITLE}`, wrapping: true });
    client.view_display(page.stringify());
  }

  on_event({ client } = {}) {
    if (client.check_on_event(`SLIDER_MOVED`)) {
      this.width = `${client.get_event_arg(1)}%`;
      client.view_model_update();
    }
  }

  async main(client) {
    this.client = z2ui5_cl_util.abap_copy(client);
    if (client.check_on_init()) {
      this.view_display({ client: client });
    }
    this.on_event({ client: client });
  }
}

module.exports = z2ui5_cl_demo_app_418;
