
class z2ui5_cl_ui5f_scrfocus_js {
  static get() {
    let result = ``;
    result = `sap.ui.define(` + `
` + `  [` + `
` + `    "sap/ui/core/Element",` + `
` + `    "z2ui5/core/Lib",` + `
` + `    "z2ui5/core/Env",` + `
` + `    "z2ui5/core/ViewSlots",` + `
` + `  ],` + `
` + `  (Element, Lib, Env, ViewSlots) => {` + `
` + `    "use strict";` + `
` + `` + `
` + `    function closestUi5Element(dom) {` + `
` + `      if (Element.closestTo) return Element.closestTo(dom) ?? null;` + `
` + `      let el = dom;` + `
` + `      while (el && el.getAttribute) {` + `
` + `        if (el.hasAttribute("data-sap-ui")) {` + `
` + `          return Env.getElementById(el.id);` + `
` + `        }` + `
` + `        el = el.parentElement;` + `
` + `      }` + `
` + `      return null;` + `
` + `    }` + `
` + `` + `
` + `    function stripSlotPrefix(ctx, fullId, slot) {` + `
` + `      const view = ViewSlots.getView(ctx, slot.key);` + `
` + `      if (!view) return fullId;` + `
` + `      const prefix = slot.fragmentId` + `
` + `        ? \`\${ViewSlots.fragmentIdOf(ctx, slot)}--\`` + `
` + `        : \`\${view.getId()}--\`;` + `
` + `      return fullId.startsWith(prefix) ? fullId.slice(prefix.length) : fullId;` + `
` + `    }` + `
` + `` + `
` + `    function focusTextInput(active, ui5El) {` + `
` + `      if (Lib.isTextInput(active)) return active;` + `
` + `      const focusRef = ui5El?.getFocusDomRef?.();` + `
` + `      if (Lib.isTextInput(focusRef)) return focusRef;` + `
` + `      const root = ui5El?.getDomRef?.();` + `
` + `      const inner = root?.querySelector?.("input, textarea");` + `
` + `      return Lib.isTextInput(inner) ? inner : null;` + `
` + `    }` + `
` + `` + `
` + `    function getFocusInfo(ctx) {` + `
` + `      try {` + `
` + `        const active = document.activeElement;` + `
` + `        if (!active) return undefined;` + `
` + `        const ui5El = closestUi5Element(active);` + `
` + `        if (!ui5El) return undefined;` + `
` + `        const fullId = ui5El.getId();` + `
` + `        let id = fullId;` + `
` + `        for (const slot of ViewSlots.slots) {` + `
` + `          const local = stripSlotPrefix(ctx, fullId, slot);` + `
` + `          if (local !== fullId) {` + `
` + `            id = local;` + `
` + `            break;` + `
` + `          }` + `
` + `        }` + `
` + `` + `
` + `        const info = { ID: id };` + `
` + `        const caret = Lib.readCaret(focusTextInput(active, ui5El));` + `
` + `        if (caret) {` + `
` + `          info.SELECTION_START = caret.start;` + `
` + `          info.SELECTION_END = caret.end;` + `
` + `        }` + `
` + `        return info;` + `
` + `      } catch (e) {` + `
` + `        Lib.logError("getFocusInfo: focus capture failed", e);` + `
` + `        return undefined;` + `
` + `      }` + `
` + `    }` + `
` + `` + `
` + `    function clearScrollCache(ctx) {` + `
` + `      const cache = ctx.scroll;` + `
` + `      cache.target = undefined;` + `
` + `      cache.ui5El = undefined;` + `
` + `      cache.slotKey = undefined;` + `
` + `    }` + `
` + `` + `
` + `    function onScrollCapture(ctx, event) {` + `
` + `      const target = event.target;` + `
` + `      if (!target || target.nodeType !== 1) return;` + `
` + `      const _scrollCache = ctx.scroll;` + `
` + `` + `
` + `      if (target !== _scrollCache.target) {` + `
` + `        const ui5El = closestUi5Element(target);` + `
` + `        _scrollCache.target = target;` + `
` + `        _scrollCache.ui5El = ui5El;` + `
` + `        _scrollCache.slotKey = ui5El` + `
` + `          ? ViewSlots.containingSlotKey(ctx, ui5El)` + `
` + `          : undefined;` + `
` + `      }` + `
` + `` + `
` + `      if (_scrollCache.slotKey) {` + `
` + `        ctx.state.lastScrolled[_scrollCache.slotKey] = {` + `
` + `          control: _scrollCache.ui5El,` + `
` + `          dom: target,` + `
` + `        };` + `
` + `      }` + `
` + `    }` + `
` + `` + `
` + `    function getScrollInfo(ctx) {` + `
` + `      const _scrollCache = ctx.scroll;` + `
` + `      if (_scrollCache.target && !_scrollCache.target.isConnected) {` + `
` + `        clearScrollCache(ctx);` + `
` + `      }` + `
` + `` + `
` + `      const store = ctx.state.lastScrolled;` + `
` + `      const out = {};` + `
` + `      for (const slot of ViewSlots.slots) {` + `
` + `        const entry = store[slot.key];` + `
` + `        if (!entry) continue;` + `
` + `` + `
` + `        if (!entry.dom.isConnected || !Lib.isAlive(entry.control)) {` + `
` + `          delete store[slot.key];` + `
` + `          continue;` + `
` + `        }` + `
` + `` + `
` + `        const id = stripSlotPrefix(ctx, entry.control.getId(), slot);` + `
` + `        out[slot.key] = {` + `
` + `          ID: id,` + `
` + `          X: entry.dom.scrollLeft || 0,` + `
` + `          Y: entry.dom.scrollTop || 0,` + `
` + `        };` + `
` + `      }` + `
` + `` + `
` + `      return Object.keys(out).length ? out : undefined;` + `
` + `    }` + `
` + `` + `
` + `    function reset(ctx) {` + `
` + `      clearScrollCache(ctx);` + `
` + `    }` + `
` + `` + `
` + `    return {` + `
` + `      getFocusInfo,` + `
` + `      getScrollInfo,` + `
` + `      onScrollCapture,` + `
` + `      closestUi5Element,` + `
` + `      focusTextInput,` + `
` + `      reset,` + `
` + `    };` + `
` + `  },` + `
` + `);` + `
` + `` + `
` + ``;
    return result;
  }
}

module.exports = z2ui5_cl_ui5f_scrfocus_js;

