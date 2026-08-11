const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_smp_app_327 extends z2ui5_if_app {
  s_storage = { type: ``, prefix: ``, key: ``, value: { field1: ``, field2: `` } };
  s_stored_value = { field1: ``, field2: `` };
  t_types = [];
  client = null;

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
    this.t_types = z2ui5_cl_util.abap_tab_assign(this.t_types, [{ type: `local` }, { type: `session` }]);
    this.s_storage = { type: `local`, prefix: `prefix1`, key: `key1`, value: { field1: `1`, field2: `textfld1` } };
    this.view_display();
  }

  on_event() {
    let lx_load;
    switch (this.client.get().EVENT) {
      case `LOCAL_STORAGE_LOADED`:
        try {
          // TODO(abap2js): z2ui5_cl_ajson=>parse( client->get_event_arg( 4 ) )->to_abap_corresponding_only( )->to_abap( IMPORTING ev_container = s_storage-value ).
        } catch (_caught1) {
          lx_load = _caught1;
          this.client.message_box_display(lx_load.get_text());
        }
        this.client.view_model_update();
        break;
      case `GET_STORED_VALUE`:
        this.s_storage.value = z2ui5_cl_util.abap_tab_assign(this.s_storage.value, z2ui5_cl_util.abap_copy(this.s_stored_value));
        this.client.view_model_update();
        break;
    }
  }

  view_display() {
    const view = z2ui5_cl_xml_view.factory();
    const page = view.shell()
      .page({ title: `abap2UI5 - Storage`, navbuttonpress: this.client._event_nav_app_leave(), shownavbutton: this.client.check_app_prev_stack() });
    page.message_strip({ text: `Reads and writes the browser's local or session storage. The ` + `value is a whole ABAP structure, not just a string: the write ` + `side sends it with the STORE_DATA frontend action, the invisible ` + `z2ui5:Storage control reads it back and reports it as JSON.`, type: `Information`, showicon: true, class: `sapUiSmallMargin` });
    page.simple_form({ title: `Local/Session Storage`, editable: true })
      .content(`form`)
      .label(`Type`)
      .select({ forceselection: true, selectedkey: this.client._bind(this.s_storage.type, { name: `s_storage-type` }), items: this.client._bind(this.t_types) })
      .item({ key: `{TYPE}`, text: `{TYPE}` })
      .get_parent()
      .label(`Prefix`)
      .input(this.client._bind(this.s_storage.prefix, { name: `s_storage-prefix` }))
      .label(`Key`)
      .input(this.client._bind(this.s_storage.key, { name: `s_storage-key` }))
      .label(`Value - Field 1`)
      .input({ value: this.client._bind(this.s_storage.value.field1, { name: `s_storage-value-field1` }), type: `Number` })
      .label(`Value - Field 2`)
      .input(this.client._bind(this.s_storage.value.field2, { name: `s_storage-value-field2` }))
      .label(``)
      .button({ text: `store`, press: this.client._event_client(z2ui5_if_client.cs_event.store_data, [`$${this.client._bind(this.s_storage)}`]) })
      .button({ text: `get`, press: this.client._event(`GET_STORED_VALUE`) });
    page._z2ui5()
      .storage({ finished: this.client._event(`LOCAL_STORAGE_LOADED`, [`\${$parameters>/type}`, `\${$parameters>/prefix}`, `\${$parameters>/key}`, `\${$parameters>/value}`]), type: this.client._bind(this.s_storage.type, { name: `s_storage-type` }), prefix: this.client._bind(this.s_storage.prefix, { name: `s_storage-prefix` }), key: this.client._bind(this.s_storage.key, { name: `s_storage-key` }), value: this.client._bind(this.s_stored_value) });
    this.client.view_display(view.stringify());
  }
}

module.exports = z2ui5_cl_smp_app_327;

const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_client = require("abap2UI5/z2ui5_if_client");

