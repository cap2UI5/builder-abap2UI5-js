const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_231 extends z2ui5_if_app {
  drs1 = {};
  drs2 = {};
  drs3 = {};
  drs4 = {};
  drs5 = {};
  mindate = `20160101`;
  maxdate = `20161231`;
  text = ``;

  view_display({ client } = {}) {
    const view = z2ui5_cl_xml_view.factory();
    view._generic_property({ n: `core:require`, v: `{Helper:'z2ui5/Util'}` });
    const page = view.shell()
      .page({ title: `abap2UI5 - Sample: Date Range Selection`, navbuttonpress: client._event_nav_app_leave(), shownavbutton: client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.m.DateRangeSelection/sample/sap.m.sample.DateRangeSelection` });
    const vbox = page.vbox(`sapUiSmallMargin`);
    vbox.label({ text: `DateRangeSelection displayFormat 'yyyy/MM/dd', set via binding:`, labelfor: `DRS1` })
      .date_range_selection({ id: `DRS1`, displayformat: `yyyy/MM/dd`, valuestate: client._bind(this.drs1.valuestate, { name: `drs1-valuestate` }), change: client._event(`handleChange`, [`DRS1`, `\${$parameters>/valid}`]), datevalue: `{= Helper.DateCreateObject($` + client._bind(this.drs1.start, { name: `drs1-start` }) + `) }`, seconddatevalue: `{= Helper.DateCreateObject($` + client._bind(this.drs1.end, { name: `drs1-end` }) + `) }` });
    vbox.label({ text: `DateRangeSelection with minDate=2016-01-01 and maxDate=2016-12-31:`, labelfor: `DRS2` })
      .date_range_selection({ id: `DRS2`, mindate: `{= Helper.DateCreateObject($` + client._bind(this.mindate) + `) }`, maxdate: `{= Helper.DateCreateObject($` + client._bind(this.maxdate) + `) }`, valuestate: client._bind(this.drs2.valuestate, { name: `drs2-valuestate` }), change: client._event(`handleChange`, [`DRS2`, `\${$parameters>/valid}`]), datevalue: `{= Helper.DateCreateObject($` + client._bind(this.drs2.start, { name: `drs2-start` }) + `) }`, seconddatevalue: `{= Helper.DateCreateObject($` + client._bind(this.drs2.end, { name: `drs2-end` }) + `) }` });
    vbox.label({ text: `DateRangeSelection with OK button in the footer and with shortcut for today:`, labelfor: `DRS3` })
      .date_range_selection({ id: `DRS3`, showfooter: true, valuestate: client._bind(this.drs3.valuestate, { name: `drs3-valuestate` }), change: client._event(`handleChange`, [`DRS3`, `\${$parameters>/valid}`]), datevalue: `{= Helper.DateCreateObject($` + client._bind(this.drs3.start, { name: `drs3-start` }) + `) }`, seconddatevalue: `{= Helper.DateCreateObject($` + client._bind(this.drs3.end, { name: `drs3-end` }) + `) }` });
    vbox.label({ text: `DateRangeSelection with displayFormat 'MM/yyyy':`, labelfor: `DRS4` })
      .date_range_selection({ id: `DRS4`, valuestate: client._bind(this.drs4.valuestate, { name: `drs4-valuestate` }), change: client._event(`handleChange`, [`DRS4`, `\${$parameters>/valid}`]), displayformat: `MM/yyyy`, datevalue: `{= Helper.DateCreateObject($` + client._bind(this.drs4.start, { name: `drs4-start` }) + `) }`, seconddatevalue: `{= Helper.DateCreateObject($` + client._bind(this.drs4.end, { name: `drs4-end` }) + `) }` });
    vbox.label({ text: `DateRangeSelection with displayFormat 'yyyy':`, labelfor: `DRS5` })
      .date_range_selection({ id: `DRS5`, valuestate: client._bind(this.drs5.valuestate, { name: `drs5-valuestate` }), change: client._event(`handleChange`, [`DRS5`, `\${$parameters>/valid}`]), displayformat: `yyyy`, datevalue: `{= Helper.DateCreateObject($` + client._bind(this.drs5.start, { name: `drs5-start` }) + `) }`, seconddatevalue: `{= Helper.DateCreateObject($` + client._bind(this.drs5.end, { name: `drs5-end` }) + `) }` });
    vbox.label({ text: `Change event`, labelfor: `TextEvent` });
    vbox.text({ id: `TextEvent`, text: client._bind_edit(this.text) });
    client.view_display(page.stringify());
  }

  initialize() {
    this.drs1 = { start: `20140202`, end: `20140217`, valuestate: `None` };
    this.drs2 = { start: `20160216`, end: `20160218`, valuestate: `None` };
    this.drs3 = { start: `20140202`, end: `20140217`, valuestate: `None` };
    this.drs4 = { start: `20190402`, end: `20191017`, valuestate: `None` };
    this.drs5 = { start: `20090202`, end: `20250217`, valuestate: `None` };
  }

  on_event({ client } = {}) {
    let sy_subrc = 0;
    let fs_drs = null;
    let _fs$fs_drs = null;
    let args;
    let source;
    if (client.check_on_event(`handleChange`)) {
      args = client.get().T_EVENT_ARG;
      source = z2ui5_cl_util.abap_copy(args[(1) - 1]);
      // TODO(abap2js): ASSIGN me->(source) TO <drs>.
      fs_drs.valuestate = (args[(2) - 1] === `true` ? `None` : `Error`);
      this.text = `Id: ${source}
` + `From: ${fs_drs.start}
` + `To: ${fs_drs.end}`;
    }
  }

  async main(client) {
    if (client.check_on_init()) {
      this.initialize();
      this.view_display({ client: client });
    } else {
      client.view_model_update();
    }
    this.on_event({ client: client });
  }
}

module.exports = z2ui5_cl_demo_app_231;
