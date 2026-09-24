
class z2ui5_cl_ui5f_picker_js {
  static get() {
    let result = ``;
    result = `sap.ui.define(` + `
` + `  [` + `
` + `    "sap/ui/core/Element",` + `
` + `    "z2ui5/core/Lib",` + `
` + `    "z2ui5/core/Env",` + `
` + `    "z2ui5/core/ViewSlots",` + `
` + `    "z2ui5/devtools/Format",` + `
` + `    "z2ui5/devtools/SlotXml",` + `
` + `  ],` + `
` + `  (Element, Lib, Env, ViewSlots, Format, SlotXml) => {` + `
` + `    "use strict";` + `
` + `` + `
` + `    const { FRAMEWORK_CALL, describeValue } = Format;` + `
` + `` + `
` + `    const MAX_VALUE_CHARS = 80;` + `
` + `` + `
` + `    const OVERLAY_ID = "z2ui5DevToolsPickerOverlay";` + `
` + `` + `
` + `    let active = false;` + `
` + `` + `
` + `    let activeCtx = null;` + `
` + `    let onDone = null;` + `
` + `    let boundMove = null;` + `
` + `    let boundClick = null;` + `
` + `    let boundKey = null;` + `
` + `` + `
` + `    let lastNode = null;` + `
` + `    let frameId = 0;` + `
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
` + `          const control = Env.getElementById(id);` + `
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
` + `    const regExpEscape = (s) => s.replace(/[.*+?^\${}()|[\\]\\\\]/g, "\\\\$&");` + `
` + `` + `
` + `    function xmlAttributesOf(ctx, control, slotKey) {` + `
` + `      const localId = String(control.getId?.() || "")` + `
` + `        .split("--")` + `
` + `        .pop();` + `
` + `      const xml = SlotXml.slotXml(ctx, slotKey);` + `
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
` + `    function collectEvents(ctx, control, slotKey) {` + `
` + `      const registry = control.mEventRegistry || {};` + `
` + `      const attributes = xmlAttributesOf(ctx, control, slotKey);` + `
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
` + `      return describeValue(value, {` + `
` + `        max: MAX_VALUE_CHARS,` + `
` + `        absent: "(no value at this path)",` + `
` + `        empty: "(empty string)",` + `
` + `      });` + `
` + `    }` + `
` + `` + `
` + `    function describe(ctx, control) {` + `
` + `      if (!control) return "(no control found at that position)";` + `
` + `      const out = ["abap2UI5 Developer Tools - Picked control"];` + `
` + `      out.push("");` + `
` + `      out.push(\`  Type        \${control.getMetadata?.().getName?.() || "?"}\`);` + `
` + `      out.push(\`  Id          \${control.getId?.() || "?"}\`);` + `
` + `      const slotKey = ViewSlots.containingSlotKey?.(ctx, control);` + `
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
` + `      const events = collectEvents(ctx, control, slotKey);` + `
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
` + `    function stop(ctx) {` + `
` + `      if (!active) return;` + `
` + `      if (ctx && activeCtx !== ctx) return;` + `
` + `      active = false;` + `
` + `      activeCtx = null;` + `
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
` + `    function start(ctx, callback) {` + `
` + `      if (active) return;` + `
` + `      active = true;` + `
` + `      activeCtx = ctx;` + `
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
` + `          report = describe(ctx, control);` + `
` + `        } catch (e) {` + `
` + `          Lib.logError("DevTools Picker: describe failed", e);` + `
` + `          report = "(could not inspect that control)";` + `
` + `        }` + `
` + `` + `
` + `        if (ctx?.devtools) ctx.devtools.pickReport = report;` + `
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
` + `      lastReport: (ctx) => ctx?.devtools?.pickReport || "",` + `
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

