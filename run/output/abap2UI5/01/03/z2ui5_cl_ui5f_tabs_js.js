
class z2ui5_cl_ui5f_tabs_js {
  static get() {
    let result = ``;
    result = `sap.ui.define(` + `
` + `  [` + `
` + `    "z2ui5/core/ViewSlots",` + `
` + `    "z2ui5/devtools/Format",` + `
` + `    "z2ui5/devtools/Inspect",` + `
` + `    "z2ui5/devtools/Picker",` + `
` + `    "z2ui5/devtools/Recorder",` + `
` + `    "z2ui5/devtools/SlotXml",` + `
` + `  ],` + `
` + `  (ViewSlots, Format, Inspect, Picker, Recorder, SlotXml) => {` + `
` + `    "use strict";` + `
` + `` + `
` + `    function getModelJson(view) {` + `
` + `      const model = ViewSlots.trackedModel(view) ?? view?.getModel?.();` + `
` + `      return model?.getData?.();` + `
` + `    }` + `
` + `` + `
` + `    function hasModelData(ctx, slotKey) {` + `
` + `      const data = getModelJson(ViewSlots.getView(ctx, slotKey));` + `
` + `      return Boolean(data) && Object.keys(data).length > 0;` + `
` + `    }` + `
` + `` + `
` + `    function getRenderedContent(view) {` + `
` + `      return view?._xContent?.outerHTML;` + `
` + `    }` + `
` + `` + `
` + `    const getSlotXml = SlotXml.slotXml;` + `
` + `` + `
` + `    function slotFilled(ctx, slotKey) {` + `
` + `      return Boolean(getSlotXml(ctx, slotKey));` + `
` + `    }` + `
` + `` + `
` + `    const GROUPS = [` + `
` + `      { key: "OVERVIEW", label: "Overview" },` + `
` + `      { key: "PROBLEMS", label: "Problems" },` + `
` + `      { key: "ROUNDTRIPS", label: "Roundtrips" },` + `
` + `      { key: "VIEWDATA", label: "View & Data" },` + `
` + `      { key: "SYSTEM", label: "System" },` + `
` + `      { key: "SEARCH", label: "Search" },` + `
` + `    ];` + `
` + `` + `
` + `    const DEFAULT_GROUP = "OVERVIEW";` + `
` + `` + `
` + `    const SLOTS = [` + `
` + `      { key: "MAIN", label: "Main" },` + `
` + `      { key: "POPUP", label: "Popup" },` + `
` + `      { key: "POPOVER", label: "Popover" },` + `
` + `      { key: "NEST", label: "Nested 1" },` + `
` + `      { key: "NEST2", label: "Nested 2" },` + `
` + `    ];` + `
` + `` + `
` + `    const ASPECTS = ["XML", "MODEL", "BINDINGS"];` + `
` + `` + `
` + `    const TABS = [` + `
` + `      {` + `
` + `        key: "OVERVIEW",` + `
` + `        group: "OVERVIEW",` + `
` + `        label: "Overview",` + `
` + `        kind: "text",` + `
` + `        produce: (ctx) => Inspect.formatOverview(ctx),` + `
` + `` + `
` + `        searchable: false,` + `
` + `      },` + `
` + `` + `
` + `      {` + `
` + `        key: "ERROR",` + `
` + `        group: "PROBLEMS",` + `
` + `        label: "Error",` + `
` + `        kind: "text",` + `
` + `        produce: (ctx) => Inspect.formatError(ctx),` + `
` + `        enabled: (ctx) => Boolean(ctx.state.lastError),` + `
` + `        exportOrder: 20,` + `
` + `      },` + `
` + `      {` + `
` + `        key: "LOG",` + `
` + `        group: "PROBLEMS",` + `
` + `        label: "Log",` + `
` + `        kind: "text",` + `
` + `        produce: (ctx) => Inspect.formatLog(ctx),` + `
` + `        exportOrder: 30,` + `
` + `      },` + `
` + `` + `
` + `      {` + `
` + `        key: "HISTORY",` + `
` + `        group: "ROUNDTRIPS",` + `
` + `        label: "History",` + `
` + `        kind: "text",` + `
` + `        produce: (ctx) => Recorder.formatHistory(ctx),` + `
` + `        exportOrder: 40,` + `
` + `      },` + `
` + `      {` + `
` + `        key: "REQUEST",` + `
` + `        group: "ROUNDTRIPS",` + `
` + `        label: "Request",` + `
` + `        kind: "json",` + `
` + `        produce: (ctx) => Format.toJson(ctx.state.oBody),` + `
` + `        exportOrder: 80,` + `
` + `      },` + `
` + `      {` + `
` + `        key: "PLAIN",` + `
` + `        group: "ROUNDTRIPS",` + `
` + `        label: "Response",` + `
` + `        kind: "json",` + `
` + `        produce: (ctx) => Format.toJson(ctx.state.responseData),` + `
` + `        exportOrder: 70,` + `
` + `      },` + `
` + `      {` + `
` + `        key: "ACTIONS",` + `
` + `        group: "ROUNDTRIPS",` + `
` + `        label: "Actions",` + `
` + `        kind: "text",` + `
` + `        produce: (ctx) => Inspect.formatActions(ctx),` + `
` + `        exportOrder: 60,` + `
` + `      },` + `
` + `      {` + `
` + `        key: "DIFF",` + `
` + `        group: "ROUNDTRIPS",` + `
` + `        label: "Model Diff",` + `
` + `        kind: "text",` + `
` + `        produce: (ctx) => Recorder.formatModelDiff(ctx),` + `
` + `` + `
` + `        exportOrder: 50,` + `
` + `        inExport: (_ctx) => Recorder.isRecordingPayloads(),` + `
` + `      },` + `
` + `      {` + `
` + `        key: "VIEWDIFF",` + `
` + `        group: "ROUNDTRIPS",` + `
` + `        label: "View Diff",` + `
` + `        kind: "text",` + `
` + `        produce: (ctx) => Recorder.formatViewDiff(ctx),` + `
` + `        exportOrder: 51,` + `
` + `        inExport: (_ctx) => Recorder.isRecordingPayloads(),` + `
` + `      },` + `
` + `` + `
` + `      {` + `
` + `        key: "VIEW",` + `
` + `        group: "VIEWDATA",` + `
` + `        slot: "MAIN",` + `
` + `        aspect: "XML",` + `
` + `        label: "XML",` + `
` + `        kind: "xml",` + `
` + `        produce: (ctx) => Format.prettifyXml(getSlotXml(ctx, "MAIN")),` + `
` + `        rendered: (ctx) =>` + `
` + `          Format.prettifyXml(` + `
` + `            getRenderedContent(ViewSlots.getView(ctx, "MAIN")),` + `
` + `          ),` + `
` + `        enabled: (ctx) => slotFilled(ctx, "MAIN"),` + `
` + `        exportOrder: 90,` + `
` + `        exportTitle: "VIEW",` + `
` + `      },` + `
` + `      {` + `
` + `        key: "MODEL",` + `
` + `        group: "VIEWDATA",` + `
` + `        slot: "MAIN",` + `
` + `        aspect: "MODEL",` + `
` + `        label: "Model",` + `
` + `        kind: "json",` + `
` + `        produce: (ctx) =>` + `
` + `          Format.toJson(getModelJson(ViewSlots.getView(ctx, "MAIN"))),` + `
` + `        enabled: (ctx) => hasModelData(ctx, "MAIN"),` + `
` + `        exportOrder: 91,` + `
` + `        exportTitle: "VIEW MODEL",` + `
` + `      },` + `
` + `      {` + `
` + `        key: "BINDINGS",` + `
` + `        group: "VIEWDATA",` + `
` + `        slot: "MAIN",` + `
` + `        aspect: "BINDINGS",` + `
` + `        label: "Bindings",` + `
` + `        kind: "text",` + `
` + `        produce: (ctx) => Inspect.formatBindings(ctx, "MAIN"),` + `
` + `        enabled: (ctx) => hasModelData(ctx, "MAIN"),` + `
` + `        exportOrder: 92,` + `
` + `        exportTitle: "VIEW BINDINGS",` + `
` + `      },` + `
` + `` + `
` + `      {` + `
` + `        key: "POPUP",` + `
` + `        group: "VIEWDATA",` + `
` + `        slot: "POPUP",` + `
` + `        aspect: "XML",` + `
` + `        label: "XML",` + `
` + `        kind: "xml",` + `
` + `        produce: (ctx) => Format.prettifyXml(getSlotXml(ctx, "POPUP")),` + `
` + `        enabled: (ctx) => slotFilled(ctx, "POPUP"),` + `
` + `        exportOrder: 100,` + `
` + `` + `
` + `        exportTitle: "POPUP",` + `
` + `      },` + `
` + `      {` + `
` + `        key: "POPUP_MODEL",` + `
` + `        group: "VIEWDATA",` + `
` + `        slot: "POPUP",` + `
` + `        aspect: "MODEL",` + `
` + `        label: "Model",` + `
` + `        kind: "json",` + `
` + `        produce: (ctx) =>` + `
` + `          Format.toJson(getModelJson(ViewSlots.getView(ctx, "POPUP"))),` + `
` + `        enabled: (ctx) => hasModelData(ctx, "POPUP"),` + `
` + `        exportOrder: 101,` + `
` + `        exportTitle: "POPUP MODEL",` + `
` + `      },` + `
` + `      {` + `
` + `        key: "POPUP_BINDINGS",` + `
` + `        group: "VIEWDATA",` + `
` + `        slot: "POPUP",` + `
` + `        aspect: "BINDINGS",` + `
` + `        label: "Bindings",` + `
` + `        kind: "text",` + `
` + `        produce: (ctx) => Inspect.formatBindings(ctx, "POPUP"),` + `
` + `        enabled: (ctx) => hasModelData(ctx, "POPUP"),` + `
` + `        exportOrder: 102,` + `
` + `        exportTitle: "POPUP BINDINGS",` + `
` + `      },` + `
` + `` + `
` + `      {` + `
` + `        key: "POPOVER",` + `
` + `        group: "VIEWDATA",` + `
` + `        slot: "POPOVER",` + `
` + `        aspect: "XML",` + `
` + `        label: "XML",` + `
` + `        kind: "xml",` + `
` + `        produce: (ctx) => Format.prettifyXml(getSlotXml(ctx, "POPOVER")),` + `
` + `        enabled: (ctx) => slotFilled(ctx, "POPOVER"),` + `
` + `        exportOrder: 110,` + `
` + `        exportTitle: "POPOVER",` + `
` + `      },` + `
` + `      {` + `
` + `        key: "POPOVER_MODEL",` + `
` + `        group: "VIEWDATA",` + `
` + `        slot: "POPOVER",` + `
` + `        aspect: "MODEL",` + `
` + `        label: "Model",` + `
` + `        kind: "json",` + `
` + `        produce: (ctx) =>` + `
` + `          Format.toJson(getModelJson(ViewSlots.getView(ctx, "POPOVER"))),` + `
` + `        enabled: (ctx) => hasModelData(ctx, "POPOVER"),` + `
` + `        exportOrder: 111,` + `
` + `        exportTitle: "POPOVER MODEL",` + `
` + `      },` + `
` + `      {` + `
` + `        key: "POPOVER_BINDINGS",` + `
` + `        group: "VIEWDATA",` + `
` + `        slot: "POPOVER",` + `
` + `        aspect: "BINDINGS",` + `
` + `        label: "Bindings",` + `
` + `        kind: "text",` + `
` + `        produce: (ctx) => Inspect.formatBindings(ctx, "POPOVER"),` + `
` + `        enabled: (ctx) => hasModelData(ctx, "POPOVER"),` + `
` + `        exportOrder: 112,` + `
` + `        exportTitle: "POPOVER BINDINGS",` + `
` + `      },` + `
` + `` + `
` + `      {` + `
` + `        key: "NEST1",` + `
` + `        group: "VIEWDATA",` + `
` + `        slot: "NEST",` + `
` + `        aspect: "XML",` + `
` + `        label: "XML",` + `
` + `        kind: "xml",` + `
` + `        produce: (ctx) => Format.prettifyXml(getSlotXml(ctx, "NEST")),` + `
` + `        rendered: (ctx) =>` + `
` + `          Format.prettifyXml(` + `
` + `            getRenderedContent(ViewSlots.getView(ctx, "NEST")),` + `
` + `          ),` + `
` + `        enabled: (ctx) => slotFilled(ctx, "NEST"),` + `
` + `        exportOrder: 120,` + `
` + `        exportTitle: "NEST1",` + `
` + `      },` + `
` + `      {` + `
` + `        key: "NEST2",` + `
` + `        group: "VIEWDATA",` + `
` + `        slot: "NEST2",` + `
` + `        aspect: "XML",` + `
` + `        label: "XML",` + `
` + `        kind: "xml",` + `
` + `        produce: (ctx) => Format.prettifyXml(getSlotXml(ctx, "NEST2")),` + `
` + `        rendered: (ctx) =>` + `
` + `          Format.prettifyXml(` + `
` + `            getRenderedContent(ViewSlots.getView(ctx, "NEST2")),` + `
` + `          ),` + `
` + `        enabled: (ctx) => slotFilled(ctx, "NEST2"),` + `
` + `        exportOrder: 121,` + `
` + `        exportTitle: "NEST2",` + `
` + `      },` + `
` + `` + `
` + `      {` + `
` + `        key: "PICK",` + `
` + `        group: "VIEWDATA",` + `
` + `        aspect: "PICK",` + `
` + `        label: "Picked Control",` + `
` + `        kind: "text",` + `
` + `        produce: (ctx) =>` + `
` + `          Picker.lastReport(ctx) ||` + `
` + `          'No control picked yet - press "Pick Control", then click any' +` + `
` + `            " control in the app.",` + `
` + `        searchable: true,` + `
` + `      },` + `
` + `` + `
` + `      {` + `
` + `        key: "SEARCH",` + `
` + `        group: "SEARCH",` + `
` + `        label: "Search",` + `
` + `` + `
` + `        kind: "search",` + `
` + `        produce: () => "",` + `
` + `` + `
` + `        searchable: false,` + `
` + `      },` + `
` + `` + `
` + `      {` + `
` + `        key: "ENV",` + `
` + `        group: "SYSTEM",` + `
` + `        label: "Environment",` + `
` + `        kind: "text",` + `
` + `        produce: (ctx) => Inspect.formatEnvironment(ctx),` + `
` + `` + `
` + `        exportOrder: 10,` + `
` + `      },` + `
` + `      {` + `
` + `        key: "REGISTRY",` + `
` + `        group: "SYSTEM",` + `
` + `        label: "Registry",` + `
` + `        kind: "text",` + `
` + `        produce: (ctx) => Inspect.formatRegistry(ctx),` + `
` + `        exportOrder: 61,` + `
` + `      },` + `
` + `      {` + `
` + `        key: "SOURCE",` + `
` + `        group: "SYSTEM",` + `
` + `        label: "ABAP Source",` + `
` + `` + `
` + `        kind: "source",` + `
` + `        produce: () => "",` + `
` + `` + `
` + `        searchable: false,` + `
` + `      },` + `
` + `    ];` + `
` + `` + `
` + `    const byKey = new Map(TABS.map((tab) => [tab.key, tab]));` + `
` + `` + `
` + `    function get(tabKey) {` + `
` + `      return byKey.get(tabKey);` + `
` + `    }` + `
` + `` + `
` + `    function isKnown(tabKey) {` + `
` + `      return Boolean(tabKey && byKey.has(tabKey));` + `
` + `    }` + `
` + `` + `
` + `    function isEnabled(ctx, tab) {` + `
` + `      if (!tab) return false;` + `
` + `      try {` + `
` + `        return tab.enabled ? Boolean(tab.enabled(ctx)) : true;` + `
` + `      } catch {` + `
` + `        return false;` + `
` + `      }` + `
` + `    }` + `
` + `` + `
` + `    function groupOf(tabKey) {` + `
` + `      return get(tabKey)?.group || DEFAULT_GROUP;` + `
` + `    }` + `
` + `` + `
` + `    function enabledTabs(ctx, groupKey) {` + `
` + `      return TABS.filter(` + `
` + `        (tab) => tab.group === groupKey && isEnabled(ctx, tab),` + `
` + `      );` + `
` + `    }` + `
` + `` + `
` + `    function firstTabOf(ctx, groupKey) {` + `
` + `      const first = TABS.find(` + `
` + `        (tab) => tab.group === groupKey && isEnabled(ctx, tab),` + `
` + `      );` + `
` + `      return first?.key || "";` + `
` + `    }` + `
` + `` + `
` + `    function enabledSlots(ctx) {` + `
` + `      const available = new Set(` + `
` + `        enabledTabs(ctx, "VIEWDATA")` + `
` + `          .filter((tab) => tab.slot)` + `
` + `          .map((tab) => tab.slot),` + `
` + `      );` + `
` + `      return SLOTS.filter((slot) => available.has(slot.key));` + `
` + `    }` + `
` + `` + `
` + `    function aspectsOfSlot(ctx, slotKey) {` + `
` + `      return enabledTabs(ctx, "VIEWDATA")` + `
` + `        .filter((tab) => tab.slot === slotKey)` + `
` + `        .sort((a, b) => ASPECTS.indexOf(a.aspect) - ASPECTS.indexOf(b.aspect));` + `
` + `    }` + `
` + `` + `
` + `    function tabFor(ctx, slotKey, aspect) {` + `
` + `      const aspects = aspectsOfSlot(ctx, slotKey);` + `
` + `      const exact = aspects.find((tab) => tab.aspect === aspect);` + `
` + `      return (exact || aspects[0])?.key || "";` + `
` + `    }` + `
` + `` + `
` + `    function render(ctx, tabKey) {` + `
` + `      const tab = get(tabKey);` + `
` + `      if (!tab) return "";` + `
` + `      try {` + `
`;
    result = result + `        return tab.produce(ctx) ?? "";` + `
` + `      } catch (e) {` + `
` + `        return \`(\${tab.label} could not be rendered: \${e?.message || e})\`;` + `
` + `      }` + `
` + `    }` + `
` + `` + `
` + `    function renderTemplated(ctx, tabKey) {` + `
` + `      const tab = get(tabKey);` + `
` + `      if (!tab?.rendered) return "";` + `
` + `      try {` + `
` + `        return tab.rendered(ctx) || "";` + `
` + `      } catch {` + `
` + `        return "";` + `
` + `      }` + `
` + `    }` + `
` + `` + `
` + `    function searchableTabs(ctx) {` + `
` + `      return TABS.filter(` + `
` + `        (tab) => tab.searchable !== false && isEnabled(ctx, tab),` + `
` + `      );` + `
` + `    }` + `
` + `` + `
` + `    function exportTabs(ctx) {` + `
` + `      return TABS.filter((tab) => {` + `
` + `        if (tab.exportOrder === undefined) return false;` + `
` + `        if (!isEnabled(ctx, tab)) return false;` + `
` + `        try {` + `
` + `          return tab.inExport ? Boolean(tab.inExport(ctx)) : true;` + `
` + `        } catch {` + `
` + `          return false;` + `
` + `        }` + `
` + `      }).sort((a, b) => a.exportOrder - b.exportOrder);` + `
` + `    }` + `
` + `` + `
` + `    function exportTitle(tab) {` + `
` + `      return tab.exportTitle || tab.label.toUpperCase();` + `
` + `    }` + `
` + `` + `
` + `    const MAX_HITS_PER_TAB = 20;` + `
` + `` + `
` + `    function searchLabel(tab) {` + `
` + `      const group = GROUPS.find((entry) => entry.key === tab.group);` + `
` + `      const slot = SLOTS.find((entry) => entry.key === tab.slot);` + `
` + `      const parts = [group?.label || tab.group];` + `
` + `      if (slot) parts.push(slot.label);` + `
` + `      parts.push(tab.label);` + `
` + `      return parts.join(" > ");` + `
` + `    }` + `
` + `` + `
` + `    function search(ctx, term) {` + `
` + `      const needle = String(term || "").toLowerCase();` + `
` + `      if (!needle) return "(enter a search term)";` + `
` + `      const sections = [];` + `
` + `      let totalHits = 0;` + `
` + `` + `
` + `      for (const tab of searchableTabs(ctx)) {` + `
` + `        const text = render(ctx, tab.key);` + `
` + `        if (!text) continue;` + `
` + `        const lines = String(text).split("\\n");` + `
` + `        const hits = [];` + `
` + `        for (let i = 0; i < lines.length; i += 1) {` + `
` + `          if (!lines[i].toLowerCase().includes(needle)) continue;` + `
` + `          hits.push(\`    \${String(i + 1).padStart(5)}: \${lines[i].trim()}\`);` + `
` + `          if (hits.length >= MAX_HITS_PER_TAB) break;` + `
` + `        }` + `
` + `        if (!hits.length) continue;` + `
` + `        totalHits += hits.length;` + `
` + `        sections.push(` + `
` + `          \`  [\${searchLabel(tab)}]  \${hits.length}\` +` + `
` + `            \`\${hits.length >= MAX_HITS_PER_TAB ? "+" : ""} hit(s)\`,` + `
` + `        );` + `
` + `        sections.push(...hits);` + `
` + `        sections.push("");` + `
` + `      }` + `
` + `` + `
` + `      const head = [` + `
` + `        \`Search for "\${term}" across every tab\`,` + `
` + `        "",` + `
` + `        totalHits` + `
` + `          ? \`\${totalHits} hit(s) - the tab is named in brackets.\`` + `
` + `          : "(no hit in any tab)",` + `
` + `        "",` + `
` + `      ];` + `
` + `      return head.concat(sections).join("\\n");` + `
` + `    }` + `
` + `` + `
` + `    return {` + `
` + `      GROUPS,` + `
` + `      SLOTS,` + `
` + `      ASPECTS,` + `
` + `      DEFAULT_GROUP,` + `
` + `      get,` + `
` + `      isKnown,` + `
` + `      isEnabled,` + `
` + `      groupOf,` + `
` + `      enabledTabs,` + `
` + `      firstTabOf,` + `
` + `      enabledSlots,` + `
` + `      aspectsOfSlot,` + `
` + `      tabFor,` + `
` + `      render,` + `
` + `      renderTemplated,` + `
` + `      search,` + `
` + `      searchableTabs,` + `
` + `      exportTabs,` + `
` + `      exportTitle,` + `
` + `` + `
` + `      _internals: { TABS, getSlotXml, hasModelData, searchLabel },` + `
` + `    };` + `
` + `  },` + `
` + `);` + `
` + `` + `
` + ``;
    return result;
  }
}

module.exports = z2ui5_cl_ui5f_tabs_js;

