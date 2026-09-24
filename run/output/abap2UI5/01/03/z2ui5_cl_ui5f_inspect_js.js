
class z2ui5_cl_ui5f_inspect_js {
  static get() {
    let result = ``;
    result = `sap.ui.define(` + `
` + `  [` + `
` + `    "sap/ui/Device",` + `
` + `    "z2ui5/core/Lib",` + `
` + `    "z2ui5/core/Env",` + `
` + `    "z2ui5/core/ScrollFocus",` + `
` + `    "z2ui5/core/ViewSlots",` + `
` + `    "z2ui5/devtools/Recorder",` + `
` + `    "z2ui5/devtools/Format",` + `
` + `    "z2ui5/devtools/SlotXml",` + `
` + `    "z2ui5/devtools/Log",` + `
` + `    "z2ui5/devtools/Bindings",` + `
` + `    "z2ui5/devtools/Help",` + `
` + `  ],` + `
` + `  (` + `
` + `    Device,` + `
` + `    Lib,` + `
` + `    Env,` + `
` + `    ScrollFocus,` + `
` + `    ViewSlots,` + `
` + `    Recorder,` + `
` + `    Format,` + `
` + `    SlotXml,` + `
` + `    Log,` + `
` + `    Bindings,` + `
` + `    Help,` + `
` + `  ) => {` + `
` + `    "use strict";` + `
` + `` + `
` + `    const MAX_ARG_CHARS = 160;` + `
` + `` + `
` + `    const MAX_SCRAPED_EVENTS = 200;` + `
` + `` + `
` + `    const BOOTSTRAP_ATTRS = [` + `
` + `      ["Bootstrap theme", "theme"],` + `
` + `      ["Resource roots", "resourceroots"],` + `
` + `      ["On init", "oninit"],` + `
` + `      ["Compat version", "compatversion"],` + `
` + `      ["Async", "async"],` + `
` + `      ["Frame options", "frameoptions"],` + `
` + `      ["Binding syntax", "bindingsyntax"],` + `
` + `      ["Libs", "libs"],` + `
` + `    ];` + `
` + `` + `
` + `    const CALLBACK_ARRAYS = [` + `
` + `      "onBeforeRoundtrip",` + `
` + `      "onAfterRoundtrip",` + `
` + `      "onAfterRendering",` + `
` + `      "onBeforeEventFrontend",` + `
` + `      "onErrorDetails",` + `
` + `    ];` + `
` + `` + `
` + `    const EVENT_CALL = new RegExp(Format.FRAMEWORK_CALL.source, "g");` + `
` + `` + `
` + `    const WORD_CHAR = /[a-z0-9_]/;` + `
` + `    const isWordChar = (ch) => ch !== undefined && WORD_CHAR.test(ch);` + `
` + `` + `
` + `    const LABEL_WIDTH = 24;` + `
` + `` + `
` + `    function line(label, value) {` + `
` + `      const text =` + `
` + `        value === undefined || value === null || value === "" ? "-" : value;` + `
` + `      return \`  \${label.padEnd(LABEL_WIDTH)}\${text}\`;` + `
` + `    }` + `
` + `` + `
` + `    function yesNo(value) {` + `
` + `      return value ? "yes" : "no";` + `
` + `    }` + `
` + `` + `
` + `    const { truncate, section, renderValue } = Format;` + `
` + `` + `
` + `    function bootstrapElement() {` + `
` + `      try {` + `
` + `        return document.getElementById("sap-ui-bootstrap");` + `
` + `      } catch {` + `
` + `        return null;` + `
` + `      }` + `
` + `    }` + `
` + `` + `
` + `    function bootstrapAttr(el, name) {` + `
` + `      return el?.getAttribute?.(\`data-sap-ui-\${name}\`) || "";` + `
` + `    }` + `
` + `` + `
` + `    function resourceUrl(namespace) {` + `
` + `      try {` + `
` + `        return sap.ui.require?.toUrl ? sap.ui.require.toUrl(namespace) : "";` + `
` + `      } catch {` + `
` + `        return "";` + `
` + `      }` + `
` + `    }` + `
` + `` + `
` + `    function getContentDensity() {` + `
` + `      try {` + `
` + `        const classes = document.body?.classList;` + `
` + `        if (classes?.contains("sapUiSizeCompact")) return "Compact";` + `
` + `        if (classes?.contains("sapUiSizeCozy")) return "Cozy";` + `
` + `      } catch {` + `
` + `        return "";` + `
` + `      }` + `
` + `      return "(neither class set)";` + `
` + `    }` + `
` + `` + `
` + `    function getDistribution(sUi5) {` + `
` + `      const gav = sUi5?.GAV || "";` + `
` + `      if (!gav) return "";` + `
` + `      return gav.includes("com.sap.ui5") ? "SAPUI5" : "OpenUI5";` + `
` + `    }` + `
` + `` + `
` + `    function modelAttributeCount(ctx, slotKey) {` + `
` + `      const data = ViewSlots.trackedModel(` + `
` + `        ViewSlots.getView(ctx, slotKey),` + `
` + `      )?.getData?.();` + `
` + `      if (!data) return 0;` + `
` + `      return Object.keys(data).length;` + `
` + `    }` + `
` + `` + `
` + `    function formatSlots(ctx) {` + `
` + `      const lines = [];` + `
` + `      for (const slot of ViewSlots.slots) {` + `
` + `        const view = ViewSlots.getView(ctx, slot.key);` + `
` + `        const xml = ViewSlots.getViewXml(ctx, slot.key);` + `
` + `        if (!view && !xml) {` + `
` + `          lines.push(line(slot.key, "empty"));` + `
` + `          continue;` + `
` + `        }` + `
` + `        const parts = [];` + `
` + `        parts.push(view ? "filled" : "xml only");` + `
` + `        if (xml) parts.push(\`\${xml.length} chars XML\`);` + `
` + `        if (slot.ownsModel) {` + `
` + `          parts.push(\`\${modelAttributeCount(ctx, slot.key)} model attributes\`);` + `
` + `        } else {` + `
` + `          parts.push("inherits MAIN model");` + `
` + `        }` + `
` + `        lines.push(line(slot.key, parts.join(", ")));` + `
` + `      }` + `
` + `      return lines;` + `
` + `    }` + `
` + `` + `
` + `    function formatEnvironment(ctx) {` + `
` + `      const state = ctx.state;` + `
` + `      const oConfig = state.oConfig;` + `
` + `      const sUi5 = oConfig.S_UI5;` + `
` + `      const responseFront = state.responseData?.S_FRONT;` + `
` + `      const out = ["abap2UI5 Developer Tools - Environment"];` + `
` + `` + `
` + `      out.push(section("App"));` + `
` + `      out.push(line("App class", responseFront?.APP));` + `
` + `      out.push(line("Rendered app", state.renderedApp));` + `
` + `      out.push(line("Draft id (received)", responseFront?.ID));` + `
` + `      out.push(line("Draft id (sent)", state.oBody?.S_FRONT?.ID));` + `
` + `      out.push(line("Last event", state.oBody?.S_FRONT?.EVENT));` + `
` + `      out.push(line("Roundtrip in flight", yesNo(state.isBusy)));` + `
` + `` + `
` + `      out.push(section("Session"));` + `
` + `      out.push(line("sap-contextid", state.contextId));` + `
` + `      out.push(line("Backend endpoint", state.url));` + `
` + `      out.push(line("Served by backend", yesNo(state.checkLocal)));` + `
` + `      out.push(line("Launchpad", yesNo(state.oLaunchpad)));` + `
` + `      out.push(line("Origin", window.location.origin));` + `
` + `      out.push(line("Pathname", window.location.pathname));` + `
` + `      out.push(line("Search", window.location.search));` + `
` + `      out.push(line("Hash", window.location.hash));` + `
` + `` + `
` + `      out.push(section("Routing"));` + `
` + `      out.push(line("Hash routing", yesNo(state.navRouting)));` + `
` + `      out.push(line("Mode", state.navMode));` + `
` + `      out.push(line("Current app", state.currentApp));` + `
` + `      out.push(line("Current draft id", state.currentDraftId));` + `
` + `` + `
` + `      out.push(section("UI5"));` + `
` + `` + `
` + `      out.push(line("Version", sap.ui.version));` + `
` + `` + `
` + `      out.push(line("Distribution", getDistribution(sUi5)));` + `
` + `      out.push(line("Build timestamp", sUi5?.BUILDTIMESTAMP));` + `
` + `` + `
` + `      out.push(line("Theme", Env.getTheme()));` + `
` + `      const locale = Env.getLocale();` + `
` + `      out.push(line("Language", locale.language));` + `
` + `      out.push(line("Text direction", locale.rtl ? "RTL" : "LTR"));` + `
` + `      out.push(line("Content density", getContentDensity()));` + `
` + `` + `
` + `      out.push(...formatBootstrap(ctx));` + `
` + `` + `
` + `      out.push(section("Device"));` + `
` + `      out.push(line("System", Lib.deriveSystemType(Device.system)));` + `
` + `      out.push(` + `
` + `        line(` + `
` + `          "Browser",` + `
` + `          \`\${Device.browser.name || "?"} \${Device.browser.version || ""}\`.trim(),` + `
` + `        ),` + `
` + `      );` + `
` + `      out.push(` + `
` + `        line(` + `
` + `          "OS",` + `
` + `          \`\${Device.os.name || "?"} \${Device.os.version || ""}\`.trim(),` + `
` + `        ),` + `
` + `      );` + `
` + `      out.push(` + `
` + `        line(` + `
` + `          "Orientation",` + `
` + `          Device.orientation.portrait ? "portrait" : "landscape",` + `
` + `        ),` + `
` + `      );` + `
` + `      out.push(` + `
` + `        line(` + `
` + `          "Window",` + `
` + `          \`\${Device.resize.width || window.innerWidth} x \` +` + `
` + `            \`\${Device.resize.height || window.innerHeight}\`,` + `
` + `        ),` + `
` + `      );` + `
` + `      out.push(line("Touch", yesNo(Device.support.touch)));` + `
` + `      out.push(line("Pointer", yesNo(Device.support.pointer)));` + `
` + `      out.push(line("Retina", yesNo(Device.support.retina)));` + `
` + `` + `
` + `      out.push(...formatFrontendInfo(ctx));` + `
` + `` + `
` + `      out.push(section("View slots"));` + `
` + `      out.push(...formatSlots(ctx));` + `
` + `` + `
` + `      return out.join("\\n");` + `
` + `    }` + `
` + `` + `
` + `    function formatBootstrap(ctx) {` + `
` + `      const out = [section("UI5 bootstrap")];` + `
` + `      const el = bootstrapElement();` + `
` + `      if (!el) {` + `
` + `        out.push('  (no <script id="sap-ui-bootstrap"> on this page -');` + `
` + `        out.push("  UI5 was started some other way, e.g. by a launchpad)");` + `
` + `      } else {` + `
` + `        out.push(line("SDK source", el.src || bootstrapAttr(el, "src")));` + `
` + `        for (const [label, attr] of BOOTSTRAP_ATTRS) {` + `
` + `          const value = bootstrapAttr(el, attr);` + `
` + `          if (value) out.push(line(label, truncate(value, MAX_ARG_CHARS)));` + `
` + `        }` + `
` + `      }` + `
` + `` + `
` + `      out.push("");` + `
` + `` + `
` + `      out.push(line("Resource base", resourceUrl("")));` + `
` + `      out.push(line("z2ui5 root", resourceUrl("z2ui5")));` + `
` + `` + `
` + `      const cci = ctx.state.ccResourceRoot;` + `
` + `      const ccc = ctx.state.cccResourceRoot;` + `
` + `      if (cci) out.push(line("z2ui5_cci root", cci));` + `
` + `      if (ccc) out.push(line("z2ui5_ccc root", ccc));` + `
` + `      return out;` + `
` + `    }` + `
` + `` + `
` + `    function formatFrontendInfo(ctx) {` + `
` + `      const out = [section("Frontend info sent to the backend")];` + `
` + `      out.push("  (client->get( )-s_focus / -s_scroll, live for the next");` + `
` + `      out.push("  roundtrip - see -s_ui5 / -s_device above)");` + `
` + `      out.push("");` + `
` + `` + `
` + `      let focus;` + `
` + `      let scroll;` + `
` + `      try {` + `
` + `        focus = ScrollFocus.getFocusInfo(ctx);` + `
` + `        scroll = ScrollFocus.getScrollInfo(ctx);` + `
` + `      } catch (e) {` + `
` + `        Lib.logError("DevTools Inspect: reading focus/scroll failed", e);` + `
` + `        out.push("  (focus / scroll info unavailable)");` + `
` + `        return out;` + `
` + `      }` + `
` + `` + `
` + `      out.push(line("Focused control", focus?.ID));` + `
` + `      if (focus?.SELECTION_START !== undefined) {` + `
` + `        out.push(` + `
` + `          line("Caret", \`\${focus.SELECTION_START} - \${focus.SELECTION_END}\`),` + `
` + `        );` + `
` + `      }` + `
` + `      out.push("");` + `
` + `      let anyScroll = false;` + `
` + `      for (const slot of ViewSlots.slots) {` + `
` + `        const entry = scroll?.[slot.key];` + `
` + `        if (!entry) continue;` + `
` + `        anyScroll = true;` + `
` + `        out.push(` + `
` + `          line(` + `
` + `            \`Scroll \${slot.key}\`,` + `
` + `            \`\${entry.ID || "(unnamed)"}  x \${entry.X || 0} / y \${entry.Y || 0}\`,` + `
` + `          ),` + `
` + `        );` + `
` + `      }` + `
` + `      if (!anyScroll) out.push(line("Scroll", "nothing scrolled yet"));` + `
` + `      return out;` + `
` + `    }` + `
` + `` + `
` + `    function scrapeEvents(xml) {` + `
` + `      if (!xml) return [];` + `
` + `      const found = new Set();` + `
` + `` + `
` + `      for (const match of xml.matchAll(EVENT_CALL)) {` + `
` + `        if (found.size >= MAX_SCRAPED_EVENTS) break;` + `
` + `        found.add(\`\${match[1]}  \${match[2]}\`);` + `
` + `      }` + `
` + `      return Array.from(found).sort();` + `
` + `    }` + `
` + `` + `
` + `    function formatShortcuts(ctx) {` + `
` + `      const shortcuts = ctx.state.shortcuts || {};` + `
` + `      const combos = Object.keys(shortcuts).sort();` + `
` + `      if (!combos.length) return ["  (none registered)"];` + `
` + `      const out = [];` + `
` + `      for (const combo of combos) {` + `
` + `        const scopes = shortcuts[combo];` + `
` + `        for (const scope of Object.keys(scopes)) {` + `
` + `          const entry = scopes[scope];` + `
` + `          out.push(` + `
` + `            \`  \${combo.padEnd(22)}\${(scope || "(global)").padEnd(12)}\` +` + `
` + `              \`-> \${entry?.event || "?"}\`,` + `
` + `          );` + `
` + `        }` + `
` + `      }` + `
` + `      return out;` + `
` + `    }` + `
` + `` + `
` + `    function formatRegistry(ctx) {` + `
` + `      const state = ctx.state;` + `
` + `      const out = ["abap2UI5 Developer Tools - Registry"];` + `
` + `` + `
` + `      out.push(section("Keyboard shortcuts (combo / scope / backend event)"));` + `
` + `      out.push(...formatShortcuts(ctx));` + `
` + `` + `
` + `      out.push(section("Pending backend timers"));` + `
` + `      const timers = Object.keys(state.timers || {});` + `
` + `      out.push(timers.length ? \`  \${timers.join(", ")}\` : "  (none pending)");` + `
` + `` + `
` + `      out.push(section("Framework callbacks registered"));` + `
` + `      for (const name of CALLBACK_ARRAYS) {` + `
` + `        out.push(line(name, (state[name] || []).length));` + `
` + `      }` + `
` + `` + `
` + `      out.push(section("Model size limits"));` + `
` + `      const limits = state.viewSizeLimits || {};` + `
` + `      const limitKeys = Object.keys(limits);` + `
` + `      if (!limitKeys.length) out.push("  (UI5 default everywhere)");` + `
` + `      for (const key of limitKeys) out.push(line(key, limits[key]));` + `
` + `` + `
` + `      out.push(section("Backend events bound in the current views"));` + `
` + `      let any = false;` + `
` + `      for (const slot of ViewSlots.slots) {` + `
` + `        const events = scrapeEvents(SlotXml.slotXml(ctx, slot.key));` + `
` + `        if (!events.length) continue;` + `
` + `        any = true;` + `
` + `        out.push(\`  [\${slot.key}]\`);` + `
` + `        for (const event of events) out.push(\`    \${event}\`);` + `
` + `      }` + `
` + `      if (!any) out.push("  (no event bindings found in the current views)");` + `
` + `      out.push("");` + `
` + `      out.push(` + `
` + `        "  Scraped from the view XML the backend sent - eB rounds a trip," +` + `
` + `          " eF is handled in the browser.",` + `
` + `      );` + `
` + `` + `
` + `      return out.join("\\n");` + `
` + `    }` + `
` + `` + `
` + `    function renderArg(arg) {` + `
` + `      return renderValue(arg, MAX_ARG_CHARS);` + `
` + `    }` + `
` + `` + `
` + `    function renderActionList(list, title) {` + `
` + `      const out = [section(title)];` + `
` + `      if (!Array.isArray(list) || !list.length) {` + `
` + `        out.push("  (none)");` + `
` + `        return out;` + `
` + `      }` + `
` + `      list.forEach((item, index) => {` + `
` + `        const number = String(index + 1).padStart(3);` + `
` + `        if (!Array.isArray(item)) {` + `
` + `          out.push(\`\${number}  [not run] \${truncate(item, MAX_ARG_CHARS)}\`);` + `
` + `          return;` + `
` + `        }` + `
` + `        const [name, ...args] = item;` + `
` + `        out.push(\`\${number}  \${name}\`);` + `
` + `        for (const arg of args) out.push(\`       \${renderArg(arg)}\`);` + `
` + `      });` + `
` + `      return out;` + `
` + `    }` + `
` + `` + `
` + `    function formatActions(ctx) {` + `
` + `      const sAction = ctx.state.responseData?.S_FRONT?.S_ACTION;` + `
` + `      const out = ["abap2UI5 Developer Tools - Actions of the last response"];` + `
` + `      out.push("");` + `
` + `      out.push(` + `
` + `        "  T_SYSTEM runs first, in order, before the view is rendered;" +` + `
` + `          " T_CUSTOM runs last, once the DOM exists.",` + `
` + `      );` + `
` + `      out.push(` + `
` + `        ...renderActionList(sAction?.T_SYSTEM, "T_SYSTEM (view lifecycle)"),` + `
` + `      );` + `
` + `      out.push(...renderActionList(sAction?.T_CUSTOM, "T_CUSTOM (app)"));` + `
` + `      return out.join("\\n");` + `
` + `    }` + `
` + `` + `
` + `    function findEventLine(source, eventName) {` + `
` + `      if (!source || !eventName) return 0;` + `
` + `      const lines = source.split("\\n");` + `
`;
    result = result + `      const needle = eventName.toLowerCase();` + `
` + `      for (let i = 0; i < lines.length; i++) {` + `
` + `        const haystack = lines[i].toLowerCase();` + `
` + `        let from = haystack.indexOf(needle);` + `
` + `        while (from !== -1) {` + `
` + `          const before = haystack[from - 1];` + `
` + `          const after = haystack[from + needle.length];` + `
` + `          if (!isWordChar(before) && !isWordChar(after)) return i + 1;` + `
` + `          from = haystack.indexOf(needle, from + 1);` + `
` + `        }` + `
` + `      }` + `
` + `      return 0;` + `
` + `    }` + `
` + `` + `
` + `    function formatError(ctx) {` + `
` + `      const err = ctx.state.lastError;` + `
` + `      if (!err) return "(no fatal error captured this session)";` + `
` + `      return err.title ? \`\${err.title}\\n\\n\${err.text}\` : err.text;` + `
` + `    }` + `
` + `` + `
` + `    function formatOverview(ctx) {` + `
` + `      const state = ctx.state;` + `
` + `      const responseFront = state.responseData?.S_FRONT;` + `
` + `      const out = ["abap2UI5 Developer Tools"];` + `
` + `` + `
` + `      out.push(section("App"));` + `
` + `      out.push(line("App class", responseFront?.APP));` + `
` + `      out.push(line("Draft id", responseFront?.ID));` + `
` + `      out.push(` + `
` + `        line("Last event", state.oBody?.S_FRONT?.EVENT || "(app start)"),` + `
` + `      );` + `
` + `      out.push(line("Roundtrip in flight", yesNo(state.isBusy)));` + `
` + `` + `
` + `      out.push(section("Status"));` + `
` + `` + `
` + `      out.push(` + `
` + `        line(` + `
` + `          "Fatal error",` + `
` + `          state.lastError` + `
` + `            ? \`YES - "\${truncate(state.lastError.title || state.lastError.text, 50)}" (Problems > Error)\`` + `
` + `            : "none this session",` + `
` + `        ),` + `
` + `      );` + `
` + `` + `
` + `      const counts = Log.countLevels(Log.collectLog(ctx));` + `
` + `      const loud = counts.error + counts.warn;` + `
` + `      out.push(` + `
` + `        line(` + `
` + `          "Log",` + `
` + `          \`\${counts.error} error, \${counts.warn} warn, \${counts.info} info\` +` + `
` + `            (loud ? "  (Problems > Log)" : ""),` + `
` + `        ),` + `
` + `      );` + `
` + `` + `
` + `      const records = Recorder.getRecords(ctx);` + `
` + `      const last = records[records.length - 1];` + `
` + `      out.push(` + `
` + `        line(` + `
` + `          "Roundtrips",` + `
` + `          last` + `
` + `            ? \`\${records.length} recorded, last \${formatOverviewMs(last)}\` +` + `
` + `                " (Roundtrips > History)"` + `
` + `            : "none recorded yet",` + `
` + `        ),` + `
` + `      );` + `
` + `      out.push(` + `
` + `        line(` + `
` + `          "Payload recording",` + `
` + `          Recorder.isRecordingPayloads()` + `
` + `            ? "ON - Model Diff and View Diff work"` + `
` + `            : "OFF - switch it on in Roundtrips for the diffs",` + `
` + `        ),` + `
` + `      );` + `
` + `` + `
` + `      out.push(section("UI5"));` + `
` + `` + `
` + `      out.push(line("Version", sap.ui.version));` + `
` + `` + `
` + `      out.push(line("Distribution", getDistribution(ctx.state.oConfig.S_UI5)));` + `
` + `      out.push(line("Theme", Env.getTheme()));` + `
` + `` + `
` + `      out.push(section("View slots"));` + `
` + `      out.push(...formatSlots(ctx));` + `
` + `` + `
` + `      out.push(section("Getting around"));` + `
` + `      out.push("  Ctrl+F12          open / close these tools");` + `
` + `      out.push("  Search field      one term across every tab at once");` + `
` + `      out.push("  (i) in the footer what every tab answers");` + `
` + `      out.push(` + `
` + `        "  Report a Bug      the whole session state as a GitHub issue body",` + `
` + `      );` + `
` + `` + `
` + `      return out.join("\\n");` + `
` + `    }` + `
` + `` + `
` + `    function formatOverviewMs(record) {` + `
` + `      const parts = [];` + `
` + `      if (record.totalMs !== null && record.totalMs !== undefined) {` + `
` + `        parts.push(\`\${Math.round(record.totalMs)} ms total\`);` + `
` + `      }` + `
` + `      if (record.backendMs !== null && record.backendMs !== undefined) {` + `
` + `        parts.push(\`\${Math.round(record.backendMs)} ms backend\`);` + `
` + `      }` + `
` + `      const timing = parts.length ? \` \${parts.join(", ")}\` : "";` + `
` + `      return \`"\${record.event || "(start)"}"\${timing}\`;` + `
` + `    }` + `
` + `` + `
` + `    return {` + `
` + `      formatEnvironment,` + `
` + `      formatError,` + `
` + `      formatOverview,` + `
` + `      formatRegistry,` + `
` + `      formatActions,` + `
` + `      findEventLine,` + `
` + `` + `
` + `      formatLog: Log.formatLog,` + `
` + `      formatBindings: Bindings.formatBindings,` + `
` + `      formatHelp: Help.formatHelp,` + `
` + `` + `
` + `      _internals: { scrapeEvents, getDistribution },` + `
` + `    };` + `
` + `  },` + `
` + `);` + `
` + `` + `
` + ``;
    return result;
  }
}

module.exports = z2ui5_cl_ui5f_inspect_js;

