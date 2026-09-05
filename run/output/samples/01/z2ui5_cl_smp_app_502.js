const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_smp_app_502 extends z2ui5_if_app {
  answer = ``;
  client = null;

  async main(client) {
    this.client = client;
    if (client.check_on_navigated()) {
      this.view_display();
    } else if (client.check_on_event()) {
      this.on_event();
    }
  }

  on_event() {
    const event = this.client.get_event();
    if ((this.on_event_basic({ event: event }) === true || this.on_event_basic({ event: event }) === `X`)) {
      return;
    }
    if ((this.on_event_message({ event: event }) === true || this.on_event_message({ event: event }) === `X`)) {
      return;
    }
    if ((this.on_event_data({ event: event }) === true || this.on_event_data({ event: event }) === `X`)) {
      return;
    }
    this.on_event_box({ event: event });
  }

  on_event_basic({ event } = {}) {
    let result = false;
    let count;
    result = true;
    switch (event) {
      case `TEXT`:
        this.client.message_box_display(`The document was saved.`);
        break;
      case `NUMBER`:
        count = 42;
        this.client.message_box_display(count);
        break;
      case `HTML`:
        this.client.message_box_display(`<strong>Three checks failed:</strong><ul><li>No plant</li><li>No price</li><li>No route</li></ul>`);
        break;
      case `ESCAPE`:
        this.client.message_box_display(this.get_t_row({ rows: 2 }));
        break;
      default:
        result = false;
        break;
    }
    return result;
  }

  on_event_message({ event } = {}) {
    let result = false;
    let s_message;
    let s_t100;
    let value;
    let error;
    let t_empty = [];
    result = true;
    switch (event) {
      case `MSG_ONE`:
        s_message = { type: `S`, id: `Z2UI5`, number: `001`, message: `Order 4711 was created` };
        this.client.message_box_display(s_message);
        break;
      case `MSG_TABLE`:
        this.client.message_box_display(this.get_t_message());
        break;
      case `MSG_T100`:
        s_t100 = { msgty: `I`, msgid: `00`, msgno: `001`, msgv1: `The text`, msgv2: `comes from`, msgv3: `message class`, msgv4: `00` };
        this.client.message_box_display(s_t100);
        break;
      case `MSG_EXCEPTION`:
        try {
          value = z2ui5_cl_util.abap_div(1, 0);
          this.client.message_box_display(`${value}`);
        } catch (_caught1) {
          error = _caught1;
          this.client.message_box_display(error);
        }
        break;
      case `MSG_EMPTY`:
        this.client.message_box_display(t_empty);
        this.client.message_toast_display(`No box - the message table was empty`);
        break;
      default:
        result = false;
        break;
    }
    return result;
  }

  on_event_data({ event } = {}) {
    let result = false;
    let sy_subrc = 0;
    let fs_s_tree = null;
    let _fs$fs_s_tree = null;
    let address;
    let tree;
    let s_order = { vbeln: ``, kunnr: ``, erdat: null, s_address: { street: ``, city: ``, country: `` }, t_item: [] };
    result = true;
    switch (event) {
      case `DATA_TABLE`:
        s_order = this.get_s_order();
        this.client.message_box_display(s_order.t_item);
        break;
      case `DATA_STRUCTURE`:
        s_order = this.get_s_order();
        this.client.message_box_display(s_order);
        break;
      case `DATA_OBJECT`:
        this.client.message_box_display(this);
        break;
      case `DATA_REFERENCE`:
        s_order = this.get_s_order();
        address = (s_order.s_address);
        this.client.message_box_display(address);
        break;
      case `LIMIT_ROWS`:
        this.client.message_box_display(this.get_t_row({ rows: 120 }));
        break;
      case `LIMIT_DEPTH`:
        tree = this.get_tree();
        fs_s_tree = tree;
        _fs$fs_s_tree = null;
        sy_subrc = 0;
        if (sy_subrc === 0) {
          this.client.message_box_display(fs_s_tree);
        }
        break;
      default:
        result = false;
        break;
    }
    return result;
  }

  on_event_box({ event } = {}) {
    let type;
    let s_order = { vbeln: ``, kunnr: ``, erdat: null, s_address: { street: ``, city: ``, country: `` }, t_item: [] };
    switch (event) {
      case `BOX_TYPE`:
        type = this.client.get_event_arg();
        this.client.message_box_display(`This box was opened with type = ${type}`, type);
        break;
      case `BOX_OPTIONS`:
        this.client.message_box_display({ text: `The delivery date lies in the past.`, type: `warning`, title: `Please check`, icon: `WARNING`, contentwidth: `25rem`, styleclass: `sapUiSizeCompact`, textdirection: `Inherit`, closeonnavigation: false });
        break;
      case `BOX_ACTIONS`:
        this.client.message_box_display(`Delete document 4711?`, `warning`, `Delete`, undefined, `BOX_CLOSED`, [`DELETE`, `Later`, `CANCEL`], `DELETE`, `CANCEL`);
        break;
      case `BOX_CLOSED`:
        this.answer = this.client.get_event_arg();
        this.client.message_toast_display(`You pressed ${this.answer}`);
        break;
      case `BOX_DETAILS`:
        this.client.message_box_display(`The posting was rejected.`, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, `<ul><li>Company code 1000 is closed</li><li>Period 08 is not open</li></ul>`);
        break;
      case `BOX_DETAILS_TAKEN`:
        s_order = this.get_s_order();
        this.client.message_box_display(s_order.t_item, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, `this text is not shown - the table owns the details`);
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
      .a({ n: `xmlns:core`, v: `sap.ui.core` })
      .a({ n: `xmlns:form`, v: `sap.ui.layout.form` });
    const page = view.ele(`Shell`)
      .ele(`Page`)
      .a({ n: `title`, v: `abap2UI5 - Message - MessageBox for Any Data` })
      .a({ n: `showNavButton`, b: this.client.check_app_prev_stack() })
      .a({ n: `navButtonPress`, v: this.client._event_nav_app_leave() });
    page.tag(`MessageStrip`)
      .a({ n: `text`, v: `client->message_box_display( ) takes TYPE any: throw in what the app already holds. ` + `Messages are recognized first and bring their own severity and title; everything else - a table, ` + `a structure, a tree, an object, a number, an HTML string - is rendered instead of dropped. ` + `One button per case, and each button is one call: the app pre-formats nothing.` })
      .a({ n: `type`, v: `Information` })
      .a({ n: `showIcon`, b: true })
      .a({ n: `class`, v: `sapUiSmallMargin` });
    const form = page.ele({ n: `SimpleForm`, ns: `form` })
      .a({ n: `editable`, b: true })
      .a({ n: `layout`, v: `ResponsiveGridLayout` })
      .a({ n: `labelSpanXL`, v: `2` })
      .a({ n: `labelSpanL`, v: `2` })
      .a({ n: `labelSpanM`, v: `3` })
      .a({ n: `labelSpanS`, v: `12` })
      .a({ n: `adjustLabelSpan`, v: `false` })
      .a({ n: `columnsXL`, v: `1` })
      .a({ n: `columnsL`, v: `1` })
      .a({ n: `columnsM`, v: `1` })
      .ele({ n: `content`, ns: `form` });
    this.render_basic({ form: form });
    this.render_message({ form: form });
    this.render_data({ form: form });
    this.render_limit({ form: form });
    this.render_box({ form: form });
    this.client.view_display(view.stringify());
  }

  render_basic({ form } = {}) {
    this.render_section({ form, title: `A text, a number, HTML` });
    this.render_demo({ form, label: `Text`, text: `A text`, descr: `A character value is its own text - the shape the method always had`, press: this.client._event(`TEXT`) });
    this.render_demo({ form, label: `Number`, text: `A number`, descr: `A number, a date, a hex value - shown the way the runtime writes it`, press: this.client._event(`NUMBER`) });
    this.render_demo({ form, label: `HTML`, text: `An HTML string`, descr: `Markup moves into the details, where UI5 renders it - the plain text stays in the box`, press: this.client._event(`HTML`) });
    this.render_demo({ form, label: `Escaping`, text: `Data that looks like HTML`, descr: `Every rendered value is escaped, so a value containing tags arrives as text`, press: this.client._event(`ESCAPE`) });
  }

  render_message({ form } = {}) {
    this.render_section({ form, title: `Messages - recognized first, and they bring their own severity` });
    this.render_demo({ form, label: `One message`, text: `A message structure`, descr: `The BAPIRET2 shape - type and title come from the message, not from the call`, press: this.client._event(`MSG_ONE`) });
    this.render_demo({ form, label: `Several messages`, text: `A message table`, descr: `One box: a counting headline, every text as a bullet, severity from the first`, press: this.client._event(`MSG_TABLE`) });
    this.render_demo({ form, label: `T100`, text: `id, number, placeholders`, descr: `No text in the structure - it is resolved from the message class of the system`, press: this.client._event(`MSG_T100`) });
    this.render_demo({ form, label: `Exception`, text: `A caught exception`, descr: `The box shows what get_text( ) renders, as an error`, press: this.client._event(`MSG_EXCEPTION`) });
    this.render_demo({ form, label: `Nothing`, text: `An empty message table`, descr: `The one case that shows no box at all - a call that returned nothing stays silent`, press: this.client._event(`MSG_EMPTY`) });
  }

  render_data({ form } = {}) {
    this.render_section({ form, title: `Any other data - rendered instead of dropped` });
    this.render_demo({ form, label: `Table`, text: `A business table`, descr: `A counting headline in the box, the rows as a numbered list below it`, press: this.client._event(`DATA_TABLE`) });
    this.render_demo({ form, label: `Structure`, text: `A nested structure`, descr: `Field names in bold; a nested structure and a nested table become lists of their own`, press: this.client._event(`DATA_STRUCTURE`) });
    this.render_demo({ form, label: `Object`, text: `An object reference`, descr: `The public instance state of the object - here the running app itself`, press: this.client._event(`DATA_OBJECT`) });
    this.render_demo({ form, label: `Data reference`, text: `A REF TO data`, descr: `The reference is followed and what it points at is rendered`, press: this.client._event(`DATA_REFERENCE`) });
  }

  render_limit({ form } = {}) {
    this.render_section({ form, title: `Where the renderer stops - announced, never silent` });
    this.render_demo({ form, label: `Row limit`, text: `120 rows, 100 shown`, descr: `The box renders the first hundred and says how many it left out`, press: this.client._event(`LIMIT_ROWS`) });
    this.render_demo({ form, label: `Depth limit`, text: `A tree, six levels deep`, descr: `Five levels are rendered, an ellipsis marks where it stopped`, press: this.client._event(`LIMIT_DEPTH`) });
  }

  render_box({ form } = {}) {
    let sy_tabix = 0;
    this.render_section({ form, title: `The box itself` });
    form.tag(`Label`).a({ n: `text`, v: `Type` });
    const row = form.ele(`HBox`).a({ n: `alignItems`, v: `Center` }).a({ n: `wrap`, v: `Wrap` });
    const t_type = [`information`, `success`, `warning`, `error`];
    sy_tabix = 0;
    for (const type of t_type) {
      sy_tabix++;
      row.tag(`Button`)
        .a({ n: `text`, v: type })
        .a({ n: `press`, v: this.client._event({ val: `BOX_TYPE`, arg: type }) })
        .a({ n: `class`, v: `sapUiTinyMarginEnd` });
    }
    row.tag(`Text`)
      .a({ n: `text`, v: `The severity, when the data does not bring one - information is the default` })
      .a({ n: `class`, v: `sapUiSmallMarginBegin` });
    this.render_demo({ form, label: `Options`, text: `title, icon, width, class`, descr: `Everything the box itself can be given, in one call`, press: this.client._event(`BOX_OPTIONS`) });
    this.render_demo({ form, label: `Actions`, text: `Buttons and onclose`, descr: `actions, emphasizedAction, initialFocus - the pressed one comes back through onclose`, press: this.client._event(`BOX_ACTIONS`) });
    form.tag(`Label`)
      .a({ n: `text`, v: `Your answer` })
      .tag(`Text`)
      .a({ n: `text`, v: this.client._bind(this.answer) });
    this.render_demo({ form, label: `Details`, text: `Details from the app`, descr: `The second block of the box - shown straight away, not behind a link`, press: this.client._event(`BOX_DETAILS`) });
    this.render_demo({ form, label: `Details, taken`, text: `A table plus details`, descr: `Details never overwrite a rendering - the table owns the slot, the text is dropped`, press: this.client._event(`BOX_DETAILS_TAKEN`) });
  }

  render_section({ form, title } = {}) {
    form.ele(`Toolbar`)
      .tag(`Title`)
      .a({ n: `text`, v: title })
      .a({ n: `level`, v: `H3` })
      .a({ n: `class`, v: `sapUiSmallMarginBegin sapUiSmallMarginTop sapUiTinyMarginBottom` })
      .end();
  }

  render_demo({ form, label, text, descr, press } = {}) {
    form.tag(`Label`).a({ n: `text`, v: label });
    const row = form.ele(`HBox`).a({ n: `alignItems`, v: `Center` }).a({ n: `wrap`, v: `Wrap` });
    row.tag(`Button`)
      .a({ n: `text`, v: text })
      .a({ n: `press`, v: press })
      .a({ n: `width`, v: `15rem` })
      .tag(`Text`)
      .a({ n: `text`, v: descr })
      .a({ n: `class`, v: `sapUiSmallMarginBegin` });
  }

  get_t_message() {
    let result = [];
    result = z2ui5_cl_util.abap_tab_assign(result, [{ type: `E`, id: `Z2UI5`, number: `010`, message: `Material 4711 is not available in plant 1000` }, { type: `W`, id: `Z2UI5`, number: `011`, message: `The delivery date was moved to 2026-10-01` }, { type: `I`, id: `Z2UI5`, number: `012`, message: `Pricing was redetermined` }, { type: `S`, id: `Z2UI5`, number: `013`, message: `Order 4711 was saved` }]);
    return result;
  }

  get_s_order() {
    let result = {};
    result = { vbeln: `0000004711`, kunnr: `0000001000`, erdat: `20260904`, s_address: { street: `Dietmar-Hopp-Allee 16`, city: `Walldorf`, country: `DE` }, t_item: [{ posnr: `000010`, matnr: `TG-11`, menge: 5, netwr: `249.90`, waers: `EUR` }, { posnr: `000020`, matnr: `TG-12`, menge: 2, netwr: `1199.00`, waers: `EUR` }, { posnr: `000030`, matnr: `TG-13`, menge: 12, netwr: `58.50`, waers: `EUR` }] };
    return result;
  }

  get_t_row({ rows } = {}) {
    let result = [];
    for (let sy_index = 1; sy_index <= rows; sy_index++) {
      result.push(z2ui5_cl_util.abap_copy({ key: `ROW-${sy_index}`, descr: `<b>Position ${sy_index}</b> of a result set nobody reads in a popup & nowhere else` }));
    }
    return result;
  }

  get_tree() {
    let result = null;
    let sy_subrc = 0;
    let fs_s_node = null;
    let _fs$fs_s_node = null;
    let child = null;
    for (let sy_index = 1; sy_index <= 6; sy_index++) {
      result = { name: ``, child: null };
      fs_s_node = result;
      _fs$fs_s_node = null;
      sy_subrc = 0;
      if (sy_subrc !== 0) {
        return result;
      }
      fs_s_node.name = `Level ${7 - sy_index}`;
      fs_s_node.child = child;
      child = result;
    }
    return result;
  }
}

module.exports = z2ui5_cl_smp_app_502;

const z2ui5_cl_ui5_view_builder = require("abap2UI5/z2ui5_cl_ui5_view_builder");
const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");

