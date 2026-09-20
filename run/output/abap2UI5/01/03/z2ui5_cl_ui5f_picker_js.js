
class z2ui5_cl_ui5f_picker_js {
  static get() {
    let result = ``;
    result = `sap.ui.define(` + `
` + `  [` + `
` + `    "sap/ui/core/Element",` + `
` + `    "z2ui5/core/Lib",` + `
` + `    "z2ui5/core/ViewSlots",` + `
` + `    "z2ui5/devtools/Format",` + `
` + `  ],` + `
` + `  (Element, Lib, ViewSlots, Format) => {` + `
` + `    "use strict";` + `
` + `` + `
` + `    const { FRAMEWORK_CALL } = Format;` + `
` + `` + `
` + `    const MAX_VALUE_CHARS = 80;` + `
` + `` + `
` + `    const OVERLAY_ID = "z2ui5DevToolsPickerOverlay";` + `
` + `` + `
` + `    let active = false;` + `
` + `    let onDone = null;` + `
` + `    let boundMove = null;` + `
` + `    let boundClick = null;` + `
` + `    let boundKey = null;` + `
` + `` + `
` + `    let lastNode = null;` + `
` + `    let frameId = 0;` + `
` + `` + `
` + `    let lastPickReport = "";` + `
` + `` + `
` + `    function truncate(value, max) {` + `
` + `      const text = String(value);` + `
` + `      return text.length <= max ? text : \`\${text.slice(0, max)}...\`;` + `
` + `    }` + `
` + `` + `
` + `    function controlFromDom(node) {` + `
` + `      if (!node) return null;` + `
` + `      if (Element.closestTo) {` + `
` + `        try {` + `
` + `          return Element.closestTo(node) || null;` + `
` + `        } catch {` + `
` + `          return null;` + `
` + `        }` + `
` + `      }` + `
` + `      let current = node;` + `
` + `      while (current && current !== document.body) {` + `
` + `        const id = current.id;` + `
` + `        if (id) {` + `
` + `          const control = Lib.getElementById(id);` + `
` + `          if (control) return control;` + `
` + `        }` + `
` + `        current = current.parentElement;` + `
` + `      }` + `
` + `      return null;` + `
` + `    }` + `
` + `` + `
` + `    function overlay() {` + `
` + `      let el = document.getElementById(OVERLAY_ID);` + `
` + `      if (!el) {` + `
` + `        el = document.createElement("div");` + `
` + `        el.id = OVERLAY_ID;` + `
` + `        el.style.position = "fixed";` + `
` + `        el.style.pointerEvents = "none";` + `
` + `        el.style.zIndex = "2147483647";` + `
` + `        el.style.background = "rgba(0, 112, 242, 0.25)";` + `
` + `        el.style.border = "2px solid #0070f2";` + `
` + `        el.style.borderRadius = "2px";` + `
` + `        el.style.display = "none";` + `
` + `        document.body.appendChild(el);` + `
` + `      }` + `
` + `      return el;` + `
` + `    }` + `
` + `` + `
` + `    function highlight(control) {` + `
` + `      const el = overlay();` + `
` + `      const dom = control?.getDomRef?.();` + `
` + `      if (!dom) {` + `
` + `        el.style.display = "none";` + `
` + `        return;` + `
` + `      }` + `
` + `      const rect = dom.getBoundingClientRect();` + `
` + `      el.style.display = "block";` + `
` + `      el.style.left = \`\${rect.left}px\`;` + `
` + `      el.style.top = \`\${rect.top}px\`;` + `
` + `      el.style.width = \`\${rect.width}px\`;` + `
` + `      el.style.height = \`\${rect.height}px\`;` + `
` + `    }` + `
` + `` + `
` + `    function removeOverlay() {` + `
` + `      document.getElementById(OVERLAY_ID)?.remove();` + `
` + `    }` + `
` + `` + `
` + `    function collectBindings(control) {` + `
` + `      const out = [];` + `
` + `      const infos = control.mBindingInfos || {};` + `
` + `      for (const [name, info] of Object.entries(infos)) {` + `
` + `        const parts = info.parts || (info.path !== undefined ? [info] : []);` + `
` + `        for (const part of parts) {` + `
` + `          const model = control.getModel(part.model);` + `
` + `          let value;` + `
` + `          try {` + `
` + `            value = model?.getProperty` + `
` + `              ? model.getProperty(` + `
` + `                  part.path,` + `
` + `                  control.getBindingContext(part.model),` + `
` + `                )` + `
` + `              : undefined;` + `
` + `          } catch {` + `
` + `            value = undefined;` + `
` + `          }` + `
` + `          out.push({` + `
` + `            name,` + `
` + `            path: part.path,` + `
` + `            model: part.model || "(default)",` + `
` + `            value,` + `
` + `          });` + `
` + `        }` + `
` + `      }` + `
` + `      return out;` + `
` + `    }` + `
` + `` + `
` + `    function slotXml(slotKey) {` + `
` + `      if (!slotKey) return "";` + `
` + `      return (` + `
` + `        ViewSlots.getView?.(slotKey)?.mProperties?.viewContent ||` + `
` + `        ViewSlots.getViewXml?.(slotKey) ||` + `
` + `        ""` + `
` + `      );` + `
` + `    }` + `
` + `` + `
` + `    const regExpEscape = (s) => s.replace(/[.*+?^\${}()|[\\]\\\\]/g, "\\\\$&");` + `
` + `` + `
` + `    function xmlAttributesOf(control, slotKey) {` + `
` + `      const localId = String(control.getId?.() || "")` + `
` + `        .split("--")` + `
` + `        .pop();` + `
` + `      const xml = slotXml(slotKey);` + `
` + `      if (!localId || !xml) return "";` + `
` + `` + `
` + `      const id = regExpEscape(localId);` + `
` + `      const idAttr = new RegExp(\`\\\\sid\\\\s*=\\\\s*(?:"\${id}"|'\${id}')\`);` + `
` + `      const at = xml.search(idAttr);` + `
` + `      if (at < 0) return "";` + `
` + `      const open = xml.lastIndexOf("<", at);` + `
` + `      const close = xml.indexOf(">", at);` + `
` + `      return open < 0 || close < 0 ? "" : xml.slice(open, close);` + `
` + `    }` + `
` + `` + `
` + `    function collectEvents(control, slotKey) {` + `
` + `      const registry = control.mEventRegistry || {};` + `
` + `      const attributes = xmlAttributesOf(control, slotKey);` + `
` + `      const out = [];` + `
` + `      for (const [name, handlers] of Object.entries(registry)) {` + `
` + `        for (const handler of handlers || []) {` + `
` + `          let match = FRAMEWORK_CALL.exec(String(handler?.fFunction || ""));` + `
` + `          if (!match && attributes) {` + `
` + `            const attr = new RegExp(` + `
` + `              \`\\\\s\${regExpEscape(name)}\\\\s*=\\\\s*(?:"([^"]*)"|'([^']*)')\`,` + `
` + `            ).exec(attributes);` + `
` + `            match = attr ? FRAMEWORK_CALL.exec(attr[1] ?? attr[2] ?? "") : null;` + `
` + `          }` + `
` + `          out.push(match ? \`\${name} -> \${match[1]}('\${match[2]}')\` : name);` + `
` + `        }` + `
` + `      }` + `
` + `      return out.sort();` + `
` + `    }` + `
` + `` + `
` + `    function renderValue(value) {` + `
` + `      if (value === undefined) return "(no value at this path)";` + `
` + `      if (value === null) return "null";` + `
` + `      if (Array.isArray(value)) return \`table, \${value.length} row(s)\`;` + `
` + `      if (typeof value === "object") {` + `
` + `        return \`structure, \${Object.keys(value).length} field(s)\`;` + `
` + `      }` + `
` + `      if (value === "") return "(empty string)";` + `
` + `      return truncate(value, MAX_VALUE_CHARS);` + `
` + `    }` + `
` + `` + `
` + `    function describe(control) {` + `
` + `      if (!control) return "(no control found at that position)";` + `
` + `      const out = ["abap2UI5 Developer Tools - Picked control"];` + `
` + `      out.push("");` + `
` + `      out.push(\`  Type        \${control.getMetadata?.().getName?.() || "?"}\`);` + `
` + `      out.push(\`  Id          \${control.getId?.() || "?"}\`);` + `
` + `      const slotKey = ViewSlots.containingSlotKey?.(control);` + `
` + `      out.push(\`  View slot   \${slotKey || "(not inside a view slot)"}\`);` + `
` + `` + `
` + `      const bindings = collectBindings(control);` + `
` + `      out.push("");` + `
` + `      out.push("Bindings");` + `
` + `      out.push("--------");` + `
` + `      if (!bindings.length) {` + `
` + `        out.push("  (this control carries no binding - it is static XML)");` + `
` + `      }` + `
` + `      for (const binding of bindings) {` + `
` + `        out.push(\`  \${binding.name}\`);` + `
` + `        out.push(\`      path   \${binding.path}   [model \${binding.model}]\`);` + `
` + `        out.push(\`      value  \${renderValue(binding.value)}\`);` + `
` + `      }` + `
` + `` + `
` + `      const events = collectEvents(control, slotKey);` + `
` + `      out.push("");` + `
` + `      out.push("Events");` + `
` + `      out.push("------");` + `
` + `      if (!events.length) out.push("  (no event handler attached)");` + `
` + `      for (const event of events) out.push(\`  \${event}\`);` + `
` + `` + `
` + `      out.push("");` + `
` + `      out.push(` + `
` + `        "  A binding path maps 1:1 onto the ABAP attribute the app bound" +` + `
` + `          " with client->_bind( ): /NAME is the attribute NAME.",` + `
` + `      );` + `
` + `      return out.join("\\n");` + `
` + `    }` + `
` + `` + `
` + `    function stop() {` + `
` + `      if (!active) return;` + `
` + `      active = false;` + `
` + `      document.removeEventListener("mousemove", boundMove, true);` + `
` + `      document.removeEventListener("click", boundClick, true);` + `
` + `      document.removeEventListener("keydown", boundKey, true);` + `
` + `      boundMove = null;` + `
` + `      boundClick = null;` + `
` + `      boundKey = null;` + `
` + `      if (frameId) {` + `
` + `        cancelAnimationFrame(frameId);` + `
` + `        frameId = 0;` + `
` + `      }` + `
` + `      lastNode = null;` + `
` + `` + `
` + `      onDone = null;` + `
` + `      removeOverlay();` + `
` + `    }` + `
` + `` + `
` + `    function start(callback) {` + `
` + `      if (active) return;` + `
` + `      active = true;` + `
` + `      onDone = callback;` + `
` + `` + `
` + `      boundMove = (event) => {` + `
` + `        if (event.target === lastNode) return;` + `
` + `        lastNode = event.target;` + `
` + `        if (frameId) return;` + `
` + `        frameId = requestAnimationFrame(() => {` + `
` + `          frameId = 0;` + `
` + `          if (active) highlight(controlFromDom(lastNode));` + `
` + `        });` + `
` + `      };` + `
` + `      boundClick = (event) => {` + `
` + `        event.preventDefault();` + `
` + `        event.stopPropagation();` + `
` + `        const control = controlFromDom(event.target);` + `
` + `        let report;` + `
` + `        try {` + `
` + `          report = describe(control);` + `
` + `        } catch (e) {` + `
` + `          Lib.logError("DevTools Picker: describe failed", e);` + `
` + `          report = "(could not inspect that control)";` + `
` + `        }` + `
` + `` + `
` + `        lastPickReport = report;` + `
` + `        const done = onDone;` + `
` + `        stop();` + `
` + `        if (done) done(report);` + `
` + `      };` + `
` + `      boundKey = (event) => {` + `
` + `        if (event.key !== "Escape") return;` + `
` + `        event.preventDefault();` + `
` + `        event.stopPropagation();` + `
` + `        const done = onDone;` + `
` + `        stop();` + `
` + `        if (done) done(null);` + `
` + `      };` + `
` + `` + `
` + `      document.addEventListener("mousemove", boundMove, true);` + `
` + `      document.addEventListener("click", boundClick, true);` + `
` + `      document.addEventListener("keydown", boundKey, true);` + `
` + `    }` + `
` + `` + `
` + `    return {` + `
` + `      start,` + `
` + `      stop,` + `
` + `      describe,` + `
` + `      isActive: () => active,` + `
` + `` + `
` + `      lastReport: () => lastPickReport,` + `
` + `      _internals: { collectBindings, collectEvents, renderValue },` + `
` + `    };` + `
` + `  },` + `
` + `);` + `
` + `` + `
` + ``;
    return result;
  }
}

module.exports = z2ui5_cl_ui5f_picker_js;

