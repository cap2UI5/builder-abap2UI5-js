const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_450 extends z2ui5_if_app {
  dats = ``;
  tims = ``;
  dats_initial = ``;
  client = null;

  async main(client) {
    this.client = client;
    if (client.check_on_init()) {
      this.dats = `20260720`;
      this.tims = `134501`;
      this.dats_initial = `00000000`;
      this.view_display();
    }
  }

  view_display() {
    const view = z2ui5_cl_xml_view.factory();
    view._generic_property({ n: `core:require`, v: `{Formatter: 'z2ui5/model/formatter'}` });
    const page = view.shell()
      .page({ title: `abap2UI5 - Formatter - ABAP date strings`, navbuttonpress: this.client._event_nav_app_leave(), shownavbutton: this.client.check_app_prev_stack() });
    page.message_strip({ text: `The model carries the plain ABAP strings 20260720 / 134501; the curated formatter ` + `converts them at the binding. An initial DATS (00000000) yields null, so the field ` + `stays empty instead of rendering a wrong 1899 date.`, type: `Information`, showicon: true, class: `sapUiSmallMargin` });
    page.simple_form({ title: `DATS / TIMS strings as date objects`, editable: true })
      .content(`form`)
      .label(`DATS 20260720`)
      .date_picker({ displayformat: `long`, editable: false, datevalue: `{ path: '${this.client._bind(this.dats, { path: true })}', ` + `formatter: 'Formatter.DateAbapDateToDateObject' }` })
      .label(`DATS 00000000 (initial)`)
      .date_picker({ displayformat: `long`, editable: false, placeholder: `no date`, datevalue: `{ path: '${this.client._bind(this.dats_initial, { path: true })}', ` + `formatter: 'Formatter.DateAbapDateToDateObject' }` })
      .label(`DATS 20260720 + TIMS 134501`)
      ._generic({ name: `DateTimePicker`, t_prop: [{ n: `editable`, v: `false` }, { n: `dateValue`, v: `{ parts: [{path: '${this.client._bind(this.dats, { path: true })}'}, ` + `{path: '${this.client._bind(this.tims, { path: true })}'}], ` + `formatter: 'Formatter.DateAbapDateTimeToDateObject' }` }] });
    this.client.view_display(view.stringify());
  }
}

module.exports = z2ui5_cl_demo_app_450;

const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");

