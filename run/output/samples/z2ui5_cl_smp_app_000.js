const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_smp_app_000 extends z2ui5_if_app {
  static c_legend = `Markers on a title: (A) performs a frontend action (client->follow_up_action( ) or a client-side interaction such as drag and drop); (C) uses an abap2UI5 custom control (the z2ui5.cc namespace); (A,C) both`;
  static cs_color = { active: `#0064D9`, inactive: `Neutral` };
  static cs_event = { search: `SEARCH`, nav: `NAV_APP`, install: `INSTALL` };
  static cs_class = { samples: `z2ui5_cl_smp_app_000`, controls: `z2ui5_cl_smpc_app_000`, controls_old: `z2ui5_cl_smpc_app_overview`, stack: `z2ui5_cl_smps_app_000`, stack_old: `z2ui5_cl_smps_app_00` };
  static cs_url = { docs: `https://abap2UI5.org`, samples: `https://github.com/abap2UI5/samples`, controls: `https://github.com/abap2UI5/samples-controls`, stack: `https://github.com/abap2UI5/samples-stack` };

  search = ``;
  client = null;
  s_scroll = { id: ``, x: 0, y: 0 };

  async main(client) {
    this.client = client;
    if (client.check_on_init()) {
      this.view_display();
      this.focus_search();
    } else if (client.check_on_navigated()) {
      this.focus_search();
      this.scroll_restore();
      this.view_display();
    } else if (client.check_on_event()) {
      this.on_event();
    }
  }

  on_event() {
    switch (this.client.get_event()) {
      case z2ui5_cl_smp_app_000.cs_event.search:
        this.view_display();
        this.focus_search();
        break;
      case z2ui5_cl_smp_app_000.cs_event.nav:
        this.app_call({ classname: this.client.get_event_arg() });
        break;
      case z2ui5_cl_smp_app_000.cs_event.install:
        this.install_display({ anchor: this.client.get_event_arg(), href: this.client.get_event_arg(2), name: this.client.get_event_arg(3) });
        break;
      default:
        this.app_call({ classname: this.client.get_event() });
        break;
    }
  }

  app_call({ classname } = {}) {
    let error;
    let li_app = null;
    const name = classname.toUpperCase();
    try {
      li_app = (() => { const _n = String(name); const _c = z2ui5_cl_util.rtti_get_class(_n.toLowerCase()); if (!_c) throw new Error(`CREATE OBJECT: class ${_n} not found`); return new _c(); })();
      this.s_scroll = z2ui5_cl_util.struct_lower_keys(({ ...this.client.get().S_SCROLL.MAIN }));
      this.client.nav_app_call(li_app);
    } catch (_caught1) {
      error = _caught1;
      this.client.message_box_display(`${name}: ${error.get_text()}`, `error`);
    }
  }

  focus_search() {
    this.client.follow_up_action(z2ui5_if_client.cs_event.set_focus, [`search`, `${this.search.length}`, `${this.search.length}`]);
  }

  scroll_restore() {
    if (z2ui5_cl_util.abap_is_initial(this.s_scroll.id)) {
      return;
    }
    this.client.follow_up_action(z2ui5_if_client.cs_event.scroll_to, [this.s_scroll.id, `${this.s_scroll.y}`, `${this.s_scroll.x}`]);
  }

  view_display() {
    let sy_tabix = 0;
    let base;
    let new_block;
    let tenths;
    let width;
    let row;
    const t_catalog_all = this.get_catalog();
    const t_catalog = this.catalog_filter({ t_catalog: t_catalog_all });
    const t_blocks = this.block_widths({ t_catalog: t_catalog });
    const view = z2ui5_cl_ui5_view_builder.factory()
      .ele({ n: `View`, ns: `mvc` })
      .a({ n: `displayBlock`, v: `true` })
      .a({ n: `height`, v: `100%` })
      .a({ n: `xmlns`, v: `sap.m` })
      .a({ n: `xmlns:mvc`, v: `sap.ui.core.mvc` })
      .a({ n: `xmlns:core`, v: `sap.ui.core` });
    const page = view.ele(`Shell`).ele(`Page`).a({ n: `id`, v: `page` });
    this.render_header({ page: page });
    this.render_sub_header({ page: page });
    const show_groups = this.group_titles_needed({ t_catalog: t_catalog });
    let prev_group = ``;
    let prev_base = ``;
    sy_tabix = 0;
    for (const tile of t_catalog) {
      sy_tabix++;
      base = this.header_base({ header: tile.header });
      new_block = false;
      if (tile.group !== prev_group) {
        if ((show_groups === true || show_groups === `X`)) {
          page.tag(`Title`)
            .a({ n: `text`, t: tile.group })
            .a({ n: `class`, v: `sapUiSmallMarginTop sapUiTinyMarginBottom` })
            .a({ n: `level`, v: `H3` });
          if (!z2ui5_cl_util.abap_is_initial(tile.intro)) {
            page.tag(`Text`)
              .a({ n: `text`, v: tile.intro })
              .a({ n: `class`, v: `sapUiSmallMarginBegin sapUiSmallMarginEnd sapUiTinyMarginBottom` });
          }
        } else {
          new_block = true;
        }
        prev_group = z2ui5_cl_util.abap_tab_assign(prev_group, z2ui5_cl_util.abap_copy(tile.group));
      } else if (base !== prev_base) {
        new_block = true;
      }
      prev_base = z2ui5_cl_util.abap_tab_assign(prev_base, z2ui5_cl_util.abap_copy(base));
      tenths = Math.trunc(z2ui5_cl_util.abap_div(((t_blocks.find((row) => row.group === tile.group && row.base === base).width + 45)), 10));
      width = `${Math.trunc(z2ui5_cl_util.abap_div(tenths, 10))}.${tenths % 10}em`;
      row = page.ele(`HBox`)
        .a({ n: `class`, t: ((new_block === true || new_block === `X`) ? `sapUiSmallMarginBegin sapUiSmallMarginTop` : `sapUiSmallMarginBegin`) })
        .a({ n: `alignItems`, v: `Center` })
        .a({ n: `wrap`, v: `Wrap` });
      if (z2ui5_cl_util.abap_is_initial(tile.sub)) {
        row.tag(`Link`)
          .a({ n: `text`, t: tile.header })
          .a({ n: `press`, v: this.client._event(tile.app) })
          .a({ n: `width`, t: width });
      } else {
        row.tag(`Link`)
          .a({ n: `text`, t: tile.header })
          .a({ n: `press`, v: this.client._event(tile.app) })
          .a({ n: `width`, t: width })
          .tag(`Text`)
          .a({ n: `text`, t: tile.sub });
      }
      row.ele({ n: `Icon`, ns: `core` })
        .a({ n: `src`, v: `sap-icon://source-code` })
        .a({ n: `size`, v: `0.875rem` })
        .a({ n: `class`, v: `sapUiTinyMarginBegin` })
        .a({ n: `tooltip`, t: `${tile.app} - show the ABAP source on GitHub` })
        .a({ n: `press`, v: this.open_url({ href: this.source_url({ tile: tile }) }) });
    }
    if (z2ui5_cl_util.abap_is_initial(t_catalog)) {
      page.tag(`Text`)
        .a({ n: `text`, v: `No sample matches the filter.` })
        .a({ n: `class`, v: `sapUiSmallMarginBegin` });
    } else {
      page.tag(`Text`)
        .a({ n: `text`, v: z2ui5_cl_smp_app_000.c_legend })
        .a({ n: `class`, v: `sapUiSmallMarginBegin sapUiSmallMarginTop` });
    }
    page.ele(`VBox`).a({ n: `height`, v: `4rem` });
    this.client.view_display(view.stringify());
  }

  render_header({ page } = {}) {
    const bar = page.ele(`customHeader`).ele(`Bar`);
    const left = bar.ele(`contentLeft`);
    left.tag(`Button`)
      .a({ n: `press`, v: this.client._event_nav_app_leave() })
      .a({ n: `visible`, b: this.client.check_app_prev_stack() })
      .a({ n: `icon`, v: `sap-icon://nav-back` })
      .a({ n: `type`, v: `Transparent` })
      .a({ n: `tooltip`, v: `Back` });
    left.tag(`Title`).a({ n: `text`, v: `abap2UI5 - Samples` }).a({ n: `level`, v: `H2` });
    const right = bar.ele(`contentRight`);
    this.header_button({ toolbar: right, icon: `sap-icon://lightbulb`, name: `Samples`, descr: `binding, events, popups, tables and much more`, class: z2ui5_cl_smp_app_000.cs_class.samples, href: z2ui5_cl_smp_app_000.cs_url.samples, here: true });
    this.header_button({ toolbar: right, icon: `sap-icon://palette`, name: `Control Samples`, descr: `the UI5 Demo Kit, rebuilt with abap2UI5`, class: z2ui5_cl_smp_app_000.cs_class.controls, class_old: z2ui5_cl_smp_app_000.cs_class.controls_old, href: z2ui5_cl_smp_app_000.cs_url.controls });
    this.header_button({ toolbar: right, icon: `sap-icon://database`, name: `Stack Samples`, descr: `OData, RAP, WebSockets and the Fiori Launchpad`, class: z2ui5_cl_smp_app_000.cs_class.stack, class_old: z2ui5_cl_smp_app_000.cs_class.stack_old, href: z2ui5_cl_smp_app_000.cs_url.stack });
    this.header_button({ toolbar: right, icon: `sap-icon://learning-assistant`, name: `Documentation`, descr: `guides, tutorials and the API reference`, href: z2ui5_cl_smp_app_000.cs_url.docs, group_start: true });
    this.header_button({ toolbar: right, icon: `sap-icon://globe`, name: `GitHub`, descr: `the source code of this repository`, href: z2ui5_cl_smp_app_000.cs_url.samples });
  }

  render_sub_header({ page } = {}) {
    const toolbar = page.ele(`subHeader`).ele(`OverflowToolbar`);
    toolbar.tag(`SearchField`)
      .a({ n: `width`, v: `24rem` })
      .a({ n: `search`, v: this.client._event(z2ui5_cl_smp_app_000.cs_event.search) })
      .a({ n: `value`, v: this.client._bind(this.search) })
      .a({ n: `id`, v: `search` })
      .a({ n: `placeholder`, v: `Filter samples` });
  }

  header_button({ toolbar, icon, name, descr, href, class: class_ = ``, class_old = ``, here = false, group_start = false } = {}) {
    let target = ``;
    let hint = ``;
    let color = ``;
    let press = ``;
    const tooltip = `${name} - ${descr}`;
    if ((here === true || here === `X`)) {
      hint = `${tooltip} - you are here`;
      color = z2ui5_cl_util.abap_tab_assign(color, z2ui5_cl_util.abap_copy(z2ui5_cl_smp_app_000.cs_color.inactive));
    } else {
      color = z2ui5_cl_util.abap_tab_assign(color, z2ui5_cl_util.abap_copy(z2ui5_cl_smp_app_000.cs_color.active));
      if (!z2ui5_cl_util.abap_is_initial(class_) && (this.class_installed({ val: class_ }) === true || this.class_installed({ val: class_ }) === `X`)) {
        target = z2ui5_cl_util.abap_tab_assign(target, z2ui5_cl_util.abap_copy(class_));
      } else if (!z2ui5_cl_util.abap_is_initial(class_old) && (this.class_installed({ val: class_old }) === true || this.class_installed({ val: class_old }) === `X`)) {
        target = z2ui5_cl_util.abap_tab_assign(target, z2ui5_cl_util.abap_copy(class_old));
      }
      if (!z2ui5_cl_util.abap_is_initial(target)) {
        hint = z2ui5_cl_util.abap_tab_assign(hint, z2ui5_cl_util.abap_copy(tooltip));
        press = this.client._event(z2ui5_cl_smp_app_000.cs_event.nav, [target]);
      } else if (z2ui5_cl_util.abap_is_initial(class_)) {
        hint = z2ui5_cl_util.abap_tab_assign(hint, z2ui5_cl_util.abap_copy(tooltip));
        press = this.open_url({ href: href });
      } else {
        hint = `${tooltip} - not installed on this system`;
        press = this.client._event(z2ui5_cl_smp_app_000.cs_event.install, [class_, href, name]);
      }
    }
    const css_class = ((group_start === true || group_start === `X`) ? `sapUiMediumMarginBegin sapUiTinyMarginEnd` : `sapUiTinyMarginBeginEnd`);
    toolbar.tag({ n: `Icon`, ns: `core` })
      .a({ n: `src`, t: icon })
      .a({ n: `size`, v: `1.125rem` })
      .a({ n: `class`, t: css_class })
      .a({ n: `tooltip`, t: hint });
    if (!z2ui5_cl_util.abap_is_initial(class_)) {
      toolbar.a({ n: `id`, t: class_ });
    }
    if (!z2ui5_cl_util.abap_is_initial(color)) {
      toolbar.a({ n: `color`, t: color });
    }
    if (!z2ui5_cl_util.abap_is_initial(press)) {
      toolbar.a({ n: `press`, v: press });
    }
  }

  install_display({ anchor, href, name } = {}) {
    const view = z2ui5_cl_ui5_view_builder.factory()
      .ele({ n: `FragmentDefinition`, ns: `core` })
      .a({ n: `xmlns`, v: `sap.m` })
      .a({ n: `xmlns:core`, v: `sap.ui.core` });
    view.ele(`Popover`)
      .a({ n: `title`, t: `${name} - not installed` })
      .a({ n: `placement`, v: `Bottom` })
      .a({ n: `contentWidth`, v: `26rem` })
      .ele(`VBox`)
      .a({ n: `class`, v: `sapUiSmallMargin` })
      .tag(`Text`)
      .a({ n: `text`, t: `This system does not have ${name} installed, so there is no app to jump to. ` + `Install the repository with abapGit, then this icon opens it right here.` })
      .tag(`Link`)
      .a({ n: `text`, v: href })
      .a({ n: `target`, v: `_blank` })
      .a({ n: `href`, v: href })
      .a({ n: `class`, v: `sapUiSmallMarginTop` });
    this.client.popover_display(view.stringify(), anchor);
  }

  open_url({ href } = {}) {
    let result = ``;
    result = this.client.follow_up_action_result(z2ui5_if_client.cs_event.urlhelper, [`REDIRECT`, `{ URL: '${href}', NEW_WINDOW: true }`]);
    return result;
  }

  source_url({ tile } = {}) {
    let result = ``;
    result = `${z2ui5_cl_smp_app_000.cs_url.samples}/blob/main/${tile.path}/${tile.app}.clas.abap`;
    return result;
  }

  class_installed({ val } = {}) {
    let result = false;
    let sy_subrc = 0;
    const name = val.toUpperCase();
    try {
      // TODO(abap2js): cl_abap_classdescr=>describe_by_name( EXPORTING p_name = name EXCEPTIONS type_not_found = 1 ).
      if (sy_subrc === 0) {
        result = true;
      }
    } catch (error) {
      result = false;
    }
    return result;
  }

  get_catalog() {
    let result = [];
    let sy_datum = "";
    result = z2ui5_cl_util.abap_tab_assign(result, [{ group: `Start here`, header: `Basics I`, sub: `Hello World, the Smallest App`, keywords: `hello world smallest first app minimal start here template`, intro: `The ones to read first, in order. One class, one view, one roundtrip - the shape every other sample in this repository grows from, plus the developer tools you will open when something does not render.`, path: `src/01`, app: `z2ui5_cl_smp_app_493` }, { group: `Start here`, header: `Basics II`, sub: `Data Binding: Input and Button`, keywords: `binding _bind model attribute value input button roundtrip messagebox serialize`, path: `src/01`, app: `z2ui5_cl_smp_app_494` }, { group: `Start here`, header: `Basics III`, sub: `Lifecycle: Init, Event, Navigated`, keywords: `lifecycle roundtrip main dispatcher state serialize check_on_init check_on_event check_on_navigated`, path: `src/01`, app: `z2ui5_cl_smp_app_495` }, { group: `Start here`, header: `Basics V`, sub: `The Developer Tools (Ctrl+F12)`, keywords: `developer tools devtools ctrl f12 debug inspect payload previous request response view xml view model source code log error adt export`, path: `src/01`, app: `z2ui5_cl_smp_app_496` }, { group: `Start here`, header: `Basics VI`, sub: `Unit Tests for the App Logic`, keywords: `unit test abapunit testclasses assert testable logic method`, path: `src/01`, app: `z2ui5_cl_smp_app_503` }, { group: `Get your data on screen`, header: `Binding`, sub: `A View Built From RTTI, No Field Named`, keywords: `rtti generic view runtime columns get_components describe_by_data no field name itab structure column cell binding`, intro: `How an ABAP field becomes something a user reads and edits: binding an attribute, the types that convert it, formatters, and views built from data rather than written out.`, path: `src/01`, app: `z2ui5_cl_smp_app_497` }, { group: `Get your data on screen`, header: `Binding`, sub: `Currency Amounts (sap.ui.model.type.Currency)`, keywords: `amount decimals leading zeros number format`, path: `src/01`, app: `z2ui5_cl_smp_app_067` }, { group: `Get your data on screen`, header: `Binding`, sub: `Dynamic Table Typed at Runtime (RTTI)`, keywords: `generic data reference create data ddic dynamic itab`, path: `src/01`, app: `z2ui5_cl_smp_app_061` }, { group: `Get your data on screen`, header: `Binding`, sub: `Expression Binding, Types and Composite Parts`, keywords: `formatter parts conditional regexp visible enabled syntax`, path: `src/01`, app: `z2ui5_cl_smp_app_027` }, { group: `Get your data on screen`, header: `Binding`, sub: `Model setSizeLimit for Large Tables (A)`, keywords: `combobox jsonmodel size limit large itab 100 entries`, path: `src/01`, app: `z2ui5_cl_smp_app_071` }, { group: `Get your data on screen`, header: `Binding`, sub: `Single Table Cell (tab_index)`, keywords: `cell input internal table row field level`, path: `src/01`, app: `z2ui5_cl_smp_app_144` }, { group: `Get your data on screen`, header: `Binding`, sub: `Structure Fields and INCLUDEs`, keywords: `structure component include flat form level`, path: `src/01`, app: `z2ui5_cl_smp_app_166` }, { group: `Get your data on screen`, header: `Binding`, sub: `Types for Integer, Decimal, Date and Time`, keywords: `type conversion sum amount number field`, path: `src/01`, app: `z2ui5_cl_smp_app_047` }, { group: `Get your data on screen`, header: `Formatter`, sub: `ABAP Date and Time Strings (DATS/TIMS)`, keywords: `dats tims conversion initial date 00000000 sy-datum`, path: `src/01`, app: `z2ui5_cl_smp_app_450` }, { group: `Get your data on screen`, header: `Formatter`, sub: `Date Object for the DatePicker`, keywords: `datepicker datevalue javascript date object iso`, path: `src/01`, app: `z2ui5_cl_smp_app_457` }, { group: `Get your data on screen`, header: `Formatter`, sub: `Date Objects for the PlanningCalendar`, keywords: `planningcalendar appointment javascript date object iso`, path: `src/01`, app: `z2ui5_cl_smp_app_456` }, { group: `Get your data on screen`, header: `Formatter`, sub: `Inline Icons in a Text`, keywords: `icon glyph placeholder text status expandinlineicons`, path: `src/01`, app: `z2ui5_cl_smp_app_466` }, { group: `Get your data on screen`, header: `Formatter`, sub: `When Not to Use One: Compute in ABAP`, keywords: `no formatter computed backend thin frontend prepare`, path: `src/01`, app: `z2ui5_cl_smp_app_453` }, { group: `Get your data on screen`, header: `Templating`, sub: `Build Columns Dynamically (template:repeat)`, keywords: `template repeat runtime generated columns if then else`, path: `src/01`, app: `z2ui5_cl_smp_app_173` }, { group: `Get your data on screen`, header: `Templating`, sub: `Dynamic Content in a Nested View`, keywords: `template repeat runtime generated nested nest_view_display`, path: `src/01`, app: `z2ui5_cl_smp_app_176` }, { group: `Show many rows`, header: `Grid Table`, sub: `Events on Cell Level`, keywords: `cell enter row index event grid alv`, intro: `Internal tables on screen - the responsive table, the grid table for large sets, lists and trees - with growing, selection, editing and everything a row can carry.`, path: `src/01`, app: `z2ui5_cl_smp_app_160` }, { group: `Show many rows`, header: `Grid Table`, sub: `Full Example with sap.ui.table`, keywords: `grid alv dynamicpage column row action currency search sort filter`, path: `src/01`, app: `z2ui5_cl_smp_app_070` }, { group: `Show many rows`, header: `Grid Table`, sub: `Keep Column Filters on Refresh (C)`, keywords: `column filter reset refresh uitableext grid alv`, path: `src/01`, app: `z2ui5_cl_smp_app_143` }, { group: `Show many rows`, header: `List`, sub: `Filter and Sort the Binding from ABAP (A)`, keywords: `binding_call getbinding sorter filter follow_up_action`, path: `src/01`, app: `z2ui5_cl_smp_app_454` }, { group: `Show many rows`, header: `List`, sub: `Live Filter on the Client, No Roundtrip (A)`, keywords: `binding_call live search client side no roundtrip filter`, path: `src/01`, app: `z2ui5_cl_smp_app_455` }, { group: `Show many rows`, header: `List`, sub: `StandardListItem, Highlight and Events`, keywords: `sap.m.list standardlistitem highlight infostate press selection`, path: `src/01`, app: `z2ui5_cl_smp_app_048` }, { group: `Show many rows`, header: `Table`, sub: `Drag and Drop Rows (A)`, keywords: `dnd dragdropinfo reorder rows move`, path: `src/01`, app: `z2ui5_cl_smp_app_459` }, { group: `Show many rows`, header: `Table`, sub: `Editable Cells, Add and Delete Rows`, keywords: `edit input add row delete multiselect toolbar`, path: `src/01`, app: `z2ui5_cl_smp_app_011` }, { group: `Show many rows`, header: `Table`, sub: `Filter Rows in the Backend`, keywords: `filter server side form growing where`, path: `src/01`, app: `z2ui5_cl_smp_app_045` }, { group: `Show many rows`, header: `Table`, sub: `Large Table with Growing and ScrollContainer`, keywords: `growing 10000 rows sticky toolbar sort performance`, path: `src/01`, app: `z2ui5_cl_smp_app_006` }, { group: `Show many rows`, header: `Table`, sub: `Live Search with Parallel Requests`, keywords: `live search parallel requests busy queue typing`, path: `src/01`, app: `z2ui5_cl_smp_app_059` }, { group: `Show many rows`, header: `Table`, sub: `Search in the Backend (SearchField)`, keywords: `search go enter server side where`, path: `src/01`, app: `z2ui5_cl_smp_app_053` }, { group: `Show many rows`, header: `Table`, sub: `Selection Modes: Single and Multi Select`, keywords: `selectionmode none single multi segmentedbutton checkbox`, path: `src/01`, app: `z2ui5_cl_smp_app_019` }, { group: `Show many rows`, header: `Tree`, sub: `Drag and Drop Nodes (A,C)`, keywords: `dnd move node hierarchy binding context`, path: `src/01`, app: `z2ui5_cl_smp_app_461` }, { group: `Show many rows`, header: `Tree`, sub: `Editable Nodes with CustomTreeItem (C)`, keywords: `customtreeitem rename input binding write back`, path: `src/01`, app: `z2ui5_cl_smp_app_463` }, { group: `Show many rows`, header: `Tree`, sub: `Inside a Dialog (C)`, keywords: `popup expand state hierarchy nodes`, path: `src/01`, app: `z2ui5_cl_smp_app_462` }, { group: `Show many rows`, header: `Tree`, sub: `Nested ABAP Table in a sap.m.Tree`, keywords: `hierarchy nodes nested json items`, path: `src/01`, app: `z2ui5_cl_smp_app_460` }, { group: `Talk to the user`, header: `Event`, sub: `Control Objects in t_arg (FacetFilter)`, keywords: `facetfilter filter object marshalling selected items`, intro: `The other direction: events arriving from the view, messages and message boxes going back, and the popups, popovers and menus that ask before something happens.`, path: `src/01`, app: `z2ui5_cl_smp_app_197` }, { group: `Talk to the user`, header: `Event`, sub: `Extra Arguments with t_arg`, keywords: `argument parameter payload event data fixed value`, path: `src/01`, app: `z2ui5_cl_smp_app_167` }, { group: `Talk to the user`, header: `Event`, sub: `Keep the Last Keystroke with check_queue_last`, keywords: `livechange keystroke queue busy roundtrip dropped event check_queue_last s_ctrl`, path: `src/01`, app: `z2ui5_cl_smp_app_511` }, { group: `Talk to the user`, header: `Event`, sub: `Keyboard Shortcuts, Ctrl+S (A)`, keywords: `shortcut hotkey ctrl key combination keyboard_shortcut`, path: `src/01`, app: `z2ui5_cl_smp_app_471` }, { group: `Talk to the user`, header: `Event`, sub: `Link with preventDefault (A)`, keywords: `link href default action check_prevent_default`, path: `src/01`, app: `z2ui5_cl_smp_app_472` }, { group: `Talk to the user`, header: `Menu`, sub: `Full Path of the Selected Item (A)`, keywords: `menuitem nested submenu textpath controller path`, path: `src/01`, app: `z2ui5_cl_smp_app_473` }, { group: `Talk to the user`, header: `Menu`, sub: `Menu Button with core:require`, keywords: `menubutton menuitem popover messagetoast require module`, path: `src/01`, app: `z2ui5_cl_smp_app_163` }, { group: `Talk to the user`, header: `Message`, sub: `Message Model and MessageManager (C)`, keywords: `messagemanager validation target field state central model`, path: `src/01`, app: `z2ui5_cl_smp_app_467` }, { group: `Talk to the user`, header: `Message`, sub: `MessageBox for Any Data`, keywords: `messagebox details table structure tree object reference escape limit action onclose`, path: `src/01`, app: `z2ui5_cl_smp_app_502` }, { group: `Talk to the user`, header: `Message`, sub: `MessageBox from SY, BAPIRET2 or Exception`, keywords: `t100 message class number exception cx_root error abend`, path: `src/01`, app: `z2ui5_cl_smp_app_008` }, { group: `Talk to the user`, header: `Message`, sub: `MessageBox, Types and Custom Actions`, keywords: `confirm warning error success information dialog action`, path: `src/01`, app: `z2ui5_cl_smp_app_382` }, { group: `Talk to the user`, header: `Message`, sub: `MessagePopover URL Policy (A)`, keywords: `url policy link security validator relative allow deny`, path: `src/01`, app: `z2ui5_cl_smp_app_474` }, { group: `Talk to the user`, header: `Message`, sub: `MessageView and MessagePopover (A)`, keywords: `messagepopover messageitem dialog grouped message list`, path: `src/01`, app: `z2ui5_cl_smp_app_452` }, { group: `Talk to the user`, header: `Popover`, sub: `Basic Example with Placement`, keywords: `placement anchor button confirm cancel popover_display`, path: `src/01`, app: `z2ui5_cl_smp_app_026` }, { group: `Talk to the user`, header: `Popover`, sub: `Open Together with the View Build`, keywords: `initial render one roundtrip anchor button`, path: `src/01`, app: `z2ui5_cl_smp_app_490` }, { group: `Talk to the user`, header: `Popover`, sub: `QuickView Contact Card`, keywords: `quickview contact card links grouped fields`, path: `src/01`, app: `z2ui5_cl_smp_app_109` }, { group: `Talk to the user`, header: `Popover`, sub: `Select from a List`, keywords: `list selection placement anchor`, path: `src/01`, app: `z2ui5_cl_smp_app_081` }, { group: `Talk to the user`, header: `Popover`, sub: `Toggle by ID (toggleBy) (A)`, keywords: `toggleby open close control_by_id whitelisted`, path: `src/01`, app: `z2ui5_cl_smp_app_465` }, { group: `Talk to the user`, header: `Popup`, sub: `Dialog inside a Dialog`, keywords: `nested stack popup in popup second dialog`, path: `src/01`, app: `z2ui5_cl_smp_app_161` }, { group: `Talk to the user`, header: `Popup`, sub: `Element Binding to the Selected Row (A)`, keywords: `element binding relative path aggregation dialog row`, path: `src/01`, app: `z2ui5_cl_smp_app_470` }, { group: `Talk to the user`, header: `Popup`, sub: `Navigate between Dialogs (NavContainer) (A)`, keywords: `navcontainer dialog pages back forward`, path: `src/01`, app: `z2ui5_cl_smp_app_170` }, { group: `Talk to the user`, header: `Popup`, sub: `Value Help: Suggestions and F4 Dialog`, keywords: `f4 search help suggestion input dialog select`, path: `src/01`, app: `z2ui5_cl_smp_app_009` }, { group: `Talk to the user`, header: `Popup`, sub: `Ways to Open a Dialog (A)`, keywords: `dialog sub app destroy rerender background view`, path: `src/01`, app: `z2ui5_cl_smp_app_012` }, { group: `Move through the app`, header: `Focus`, sub: `Focus a Table Cell by Column and Row (A)`, keywords: `table cell column row aggregation set_focus`, intro: `More than one view and more than one app: navigation and app calls, views nested inside views, and the small things that decide where the user is looking - focus, scrolling, a timer.`, path: `src/01`, app: `z2ui5_cl_smp_app_421` }, { group: `Move through the app`, header: `Focus`, sub: `Jump to the Next Input on Enter (A)`, keywords: `cursor enter tab next field form set_focus`, path: `src/01`, app: `z2ui5_cl_smp_app_189` }, { group: `Move through the app`, header: `Focus`, sub: `Set Focus and Select Text in an Input (A)`, keywords: `cursor set_focus selection position textfield`, path: `src/01`, app: `z2ui5_cl_smp_app_133` }, { group: `Move through the app`, header: `Hash`, sub: `Routing mode keep`, keywords: `routing mode keep navigation state preserved back nav_app_call`, path: `src/01`, app: `z2ui5_cl_smp_app_480` }, { group: `Move through the app`, header: `Navigation`, sub: `Call and Leave Apps (nav_app_call)`, keywords: `nav_app_call nav_app_leave sub app stack call back`, path: `src/01`, app: `z2ui5_cl_smp_app_024` }, { group: `Move through the app`, header: `Navigation`, sub: `Data Loss Protection on Leaving (A,C)`, keywords: `dirty unsaved changes leave confirmation warning`, path: `src/01`, app: `z2ui5_cl_smp_app_279` }, { group: `Move through the app`, header: `Navigation`, sub: `Return Data and Events to the Caller`, keywords: `r_data result get_app_prev return event payload`, path: `src/01`, app: `z2ui5_cl_smp_app_488` }, { group: `Move through the app`, header: `Navigation`, sub: `Uncaught Error and Error Popup`, keywords: `exception dump error handling debugtool restart retry`, path: `src/01`, app: `z2ui5_cl_smp_app_464` }, { group: `Move through the app`, header: `Nested View`, sub: `Basic Example (nest_view_display)`, keywords: `nest_view_display rerender model refresh sub view`, path: `src/01`, app: `z2ui5_cl_smp_app_065` }, { group: `Move through the app`, header: `Nested View`, sub: `Embed Another App's View`, keywords: `sub app class embed instantiate another app rtti`, path: `src/01`, app: `z2ui5_cl_smp_app_104` }, { group: `Move through the app`, header: `Nested View`, sub: `Master-Detail with FlexibleColumnLayout`, keywords: `fcl master detail list report two column split`, path: `src/01`, app: `z2ui5_cl_smp_app_097` }, { group: `Move through the app`, header: `Nested View`, sub: `Three Columns with FlexibleColumnLayout`, keywords: `fcl three column detail detail deep navigation`, path: `src/01`, app: `z2ui5_cl_smp_app_098` }, { group: `Move through the app`, header: `Scroll`, sub: `Scroll a Control into View (A)`, keywords: `scroll_into_view control id validation jump`, path: `src/01`, app: `z2ui5_cl_smp_app_363` }, { group: `Move through the app`, header: `Scroll`, sub: `Scroll to a Pixel Position (A)`, keywords: `position pixel scroll_to restore refresh toolbar`, path: `src/01`, app: `z2ui5_cl_smp_app_362` }, { group: `Move through the app`, header: `Timer`, sub: `Progress Indicator during a Backend Call (A)`, keywords: `progressindicator busy wait long running backend`, path: `src/01`, app: `z2ui5_cl_smp_app_064` }, { group: `Move through the app`, header: `Timer`, sub: `Refresh the View Every n Seconds (A)`, keywords: `interval polling auto refresh follow_up_action seconds`, path: `src/01`, app: `z2ui5_cl_smp_app_028` }, { group: `Reach outside the view`, header: `Browser`, sub: `Copy to Clipboard (A)`, keywords: `clipboard paste copy text area`, intro: `Where an app stops being only a view: the browser it runs in, the device it runs on, files in and out, custom CSS, and driving a control from the backend by its id.`, path: `src/01`, app: `z2ui5_cl_smp_app_325` }, { group: `Reach outside the view`, header: `Browser`, sub: `Local and Session Storage (A,C)`, keywords: `localstorage sessionstorage persist store_data offline`, path: `src/01`, app: `z2ui5_cl_smp_app_327` }, { group: `Reach outside the view`, header: `Browser`, sub: `Logout from the Client (A)`, keywords: `logoff signout icf session end fiori launchpad`, path: `src/01`, app: `z2ui5_cl_smp_app_361` }, { group: `Reach outside the view`, header: `Browser`, sub: `Open a URL in a New Tab (A)`, keywords: `url window open_new_tab link target`, path: `src/01`, app: `z2ui5_cl_smp_app_073` }, { group: `Reach outside the view`, header: `Browser`, sub: `Open Mail, Phone and SMS Links (A)`, keywords: `mailto tel sms urlhelper redirect native link`, path: `src/01`, app: `z2ui5_cl_smp_app_316` }, { group: `Reach outside the view`, header: `Browser`, sub: `Reload the Page (A)`, keywords: `reload refresh restart location_reload url`, path: `src/01`, app: `z2ui5_cl_smp_app_492` }, { group: `Reach outside the view`, header: `Browser`, sub: `Set the Tab Favicon (A)`, keywords: `favicon icon tab image data uri`, path: `src/01`, app: `z2ui5_cl_smp_app_491` }, { group: `Reach outside the view`, header: `Browser`, sub: `Set the Tab Title (A)`, keywords: `document.title tab caption headline set_title`, path: `src/01`, app: `z2ui5_cl_smp_app_125` }, { group: `Reach outside the view`, header: `Browser`, sub: `Soft Keyboard Mode on Mobile (A)`, keywords: `mobile numeric keypad keyboard_set_mode phone input`, path: `src/01`, app: `z2ui5_cl_smp_app_352` }, { group: `Reach outside the view`, header: `Control Behaviour`, sub: `Expand a Panel by ID (setExpanded) (A)`, keywords: `panel collapse expand setexpanded control_by_id whitelisted`, path: `src/01`, app: `z2ui5_cl_smp_app_448` }, { group: `Reach outside the view`, header: `Control Behaviour`, sub: `MultiInput with Tokens (C)`, keywords: `multiinput token tokens suggestion custom control`, path: `src/01`, app: `z2ui5_cl_smp_app_078` }, { group: `Reach outside the view`, header: `Control Behaviour`, sub: `Open the PDF Viewer by ID (A)`, keywords: `pdfviewer pdf document viewer popup control_by_id whitelisted`, path: `src/01`, app: `z2ui5_cl_smp_app_449` }, { group: `Reach outside the view`, header: `Control Behaviour`, sub: `Switch NavContainer Page by ID (A)`, keywords: `navcontainer icontabbar icontabheader page switch control_by_id whitelisted`, path: `src/01`, app: `z2ui5_cl_smp_app_088` }, { group: `Reach outside the view`, header: `Control Behaviour`, sub: `Wizard with Steps (A)`, keywords: `wizard step branching discardprogress setnextstep control_by_id`, path: `src/01`, app: `z2ui5_cl_smp_app_202` }, { group: `Reach outside the view`, header: `CSS`, sub: `Color Table Cells from the Backend`, keywords: `color background conditional formatting style data attribute`, path: `src/01`, app: `z2ui5_cl_smp_app_305` }, { group: `Reach outside the view`, header: `CSS`, sub: `FlexBox Layouts with Custom Classes`, keywords: `flexbox layout responsive navigation tile panel`, path: `src/01`, app: `z2ui5_cl_smp_app_255` }, { group: `Reach outside the view`, header: `CSS`, sub: `Ship Your Own CSS with the View`, keywords: `style stylesheet inline html class own design`, path: `src/01`, app: `z2ui5_cl_smp_app_050` }, { group: `Reach outside the view`, header: `Device`, sub: `Camera, Take Photos (C)`, keywords: `camera photo picture webcam capture facing mode`, path: `src/01`, app: `z2ui5_cl_smp_app_306` }, { group: `Reach outside the view`, header: `Device`, sub: `Device Model: Phone, Tablet, Desktop (A)`, keywords: `sap.ui.device responsive orientation resize media model`, path: `src/01`, app: `z2ui5_cl_smp_app_445` }, { group: `Reach outside the view`, header: `Device`, sub: `Geolocation from the Browser (C)`, keywords: `gps position latitude longitude altitude location`, path: `src/01`, app: `z2ui5_cl_smp_app_120` }, { group: `Reach outside the view`, header: `File`, sub: `Download to the Browser (A)`, keywords: `export save base64 attachment xstring document`, path: `src/01`, app: `z2ui5_cl_smp_app_186` }, { group: `Reach outside the view`, header: `File`, sub: `Upload to the Backend (C)`, keywords: `fileuploader base64 attachment import picture document`, path: `src/01`, app: `z2ui5_cl_smp_app_074` }]);
    return result;
  }

  catalog_filter({ t_catalog } = {}) {
    let result = [];
    let sy_tabix = 0;
    if (z2ui5_cl_util.abap_is_initial(this.search)) {
      result = z2ui5_cl_util.abap_tab_assign(result, z2ui5_cl_util.abap_copy(t_catalog));
      return result;
    }
    const pattern = this.search.toUpperCase();
    sy_tabix = 0;
    for (const tile of t_catalog) {
      sy_tabix++;
      if (String(`${tile.header} ${tile.sub} ${tile.keywords} ${tile.app}`.toUpperCase()).toLowerCase().includes(String(pattern).toLowerCase())) {
        result.push(z2ui5_cl_util.abap_copy(tile));
      }
    }
    return result;
  }

  block_widths({ t_catalog } = {}) {
    let result = [];
    let sy_tabix = 0;
    let sy_subrc = 0;
    let fs_block = null;
    let _fs$fs_block = null;
    let base;
    let width;
    sy_tabix = 0;
    for (const tile of t_catalog) {
      sy_tabix++;
      base = this.header_base({ header: tile.header });
      {
        const _t = result;
        const _i = _t.findIndex((_r) => _r.group === tile.group && _r.base === base);
        sy_subrc = _i >= 0 && _i < _t.length ? 0 : 4;
        fs_block = sy_subrc === 0 ? _t[_i] : null;
        _fs$fs_block = sy_subrc === 0 ? { o: _t, k: _i } : null;
      }
      if (sy_subrc !== 0) {
        fs_block = z2ui5_cl_util.abap_copy({ group: tile.group, base: base, width: 0 });
        result.push(fs_block);
      }
      width = this.header_width({ header: tile.header });
      if (width > fs_block.width) {
        fs_block.width = z2ui5_cl_util.abap_tab_assign(fs_block.width, z2ui5_cl_util.abap_copy(width));
      }
    }
    return result;
  }

  header_width({ header } = {}) {
    let result = 0;
    let char;
    let off = 0;
    while (header.length > off) {
      char = header.substr(off, 1);
      result = result + ([...String(char)].some(($c) => String(`MW`).includes($c)) ? 95 : [...String(char)].some(($c) => String(`mw`).includes($c)) ? 80 : [...String(char)].some(($c) => String(`ijltfrI. -`).includes($c)) ? 35 : [...String(char)].some(($c) => String(`ABCDEFGHJKLNOPQRSTUVXYZ`).includes($c)) ? 75 : 55);
      off = off + 1;
    }
    return result;
  }

  header_base({ header } = {}) {
    let result = ``;
    result = z2ui5_cl_util.abap_tab_assign(result, z2ui5_cl_util.abap_copy(header));
    let words = header.split(` `);
    const n = z2ui5_cl_util.abap_copy(words.length);
    if (n > 1 && !z2ui5_cl_util.abap_is_initial(words[(n) - 1]) && [...String(words[(n) - 1])].every(($c) => String(`IVXLCDM`).includes($c))) {
      // TODO(abap2js): DELETE words INDEX n.
      result = words.join(` `);
    }
    return result;
  }

  group_titles_needed({ t_catalog } = {}) {
    let result = false;
    let sy_tabix = 0;
    let first_group = ``;
    sy_tabix = 0;
    for (const tile of t_catalog) {
      sy_tabix++;
      if (sy_tabix === 1) {
        first_group = z2ui5_cl_util.abap_tab_assign(first_group, z2ui5_cl_util.abap_copy(tile.group));
      } else if (tile.group !== first_group) {
        result = true;
        return result;
      }
    }
    return result;
  }
}

module.exports = z2ui5_cl_smp_app_000;

const z2ui5_cl_ui5_view_builder = require("abap2UI5/z2ui5_cl_ui5_view_builder");
const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");
const z2ui5_if_client = require("abap2UI5/z2ui5_if_client");

