
class z2ui5_cl_ui5f_shortcut_js {
  static get() {
    let result = ``;
    result = `sap.ui.define(["z2ui5/core/Lib", "z2ui5/core/ViewSlots"], (Lib, ViewSlots) => {` + `
` + `  "use strict";` + `
` + `` + `
` + `  const SHORTCUT_MODIFIERS = ["ctrl", "shift", "alt", "meta"];` + `
` + `` + `
` + `  const SHORTCUT_ALIASES = {` + `
` + `    control: "ctrl",` + `
` + `    cmd: "meta",` + `
` + `    command: "meta",` + `
` + `    option: "alt",` + `
` + `    esc: "escape",` + `
` + `    del: "delete",` + `
` + `    ins: "insert",` + `
` + `    return: "enter",` + `
` + `    space: " ",` + `
` + `  };` + `
` + `` + `
` + `  function shortcutToken(part) {` + `
` + `    const t = part.trim().toLowerCase();` + `
` + `` + `
` + `    return Object.prototype.hasOwnProperty.call(SHORTCUT_ALIASES, t)` + `
` + `      ? SHORTCUT_ALIASES[t]` + `
` + `      : t;` + `
` + `  }` + `
` + `` + `
` + `  function normalizeShortcut(combo) {` + `
` + `    const parts = String(combo ?? "")` + `
` + `      .split("+")` + `
` + `      .map(shortcutToken)` + `
` + `      .filter((p) => p !== "");` + `
` + `    const mods = SHORTCUT_MODIFIERS.filter((m) => parts.includes(m));` + `
` + `    const keys = parts.filter((p) => !SHORTCUT_MODIFIERS.includes(p));` + `
` + `    if (keys.length === 0) return "";` + `
` + `    return [...mods, keys[keys.length - 1]].join("+");` + `
` + `  }` + `
` + `` + `
` + `  function shortcutFromEvent(oEvent) {` + `
` + `    const key = String(oEvent.key ?? "").toLowerCase();` + `
` + `` + `
` + `    if (key === "" || SHORTCUT_MODIFIERS.includes(shortcutToken(key)))` + `
` + `      return "";` + `
` + `    const mods = [];` + `
` + `    if (oEvent.ctrlKey) mods.push("ctrl");` + `
` + `    if (oEvent.shiftKey) mods.push("shift");` + `
` + `    if (oEvent.altKey) mods.push("alt");` + `
` + `    if (oEvent.metaKey) mods.push("meta");` + `
` + `    return [...mods, key].join("+");` + `
` + `  }` + `
` + `` + `
` + `  const SHORTCUT_SLOTS = ["POPOVER", "POPUP", "NEST2", "NEST", "MAIN"];` + `
` + `` + `
` + `  const SHORTCUT_GLOBAL = "";` + `
` + `` + `
` + `  function scopeControlOpen(ctx, id) {` + `
` + `    const c = ViewSlots.resolveById(ctx, id);` + `
` + `    if (!c) return false;` + `
` + `    if (typeof c.isOpen === "function") return !!c.isOpen();` + `
` + `    return typeof c.getVisible === "function" ? c.getVisible() !== false : true;` + `
` + `  }` + `
` + `` + `
` + `  function shortcutEntry(ctx, combo) {` + `
` + `    const shortcuts = ctx.state.shortcuts;` + `
` + `    if (!Object.prototype.hasOwnProperty.call(shortcuts, combo)) {` + `
` + `      return undefined;` + `
` + `    }` + `
` + `    const scopes = shortcuts[combo];` + `
` + `    for (const key of Object.keys(scopes)) {` + `
` + `      if (key === SHORTCUT_GLOBAL || SHORTCUT_SLOTS.includes(key)) continue;` + `
` + `      if (scopeControlOpen(ctx, key)) return scopes[key];` + `
` + `    }` + `
` + `    for (const key of SHORTCUT_SLOTS) {` + `
` + `      if (scopes[key] && ViewSlots.getView(ctx, key)) return scopes[key];` + `
` + `    }` + `
` + `    return scopes[SHORTCUT_GLOBAL];` + `
` + `  }` + `
` + `` + `
` + `  function installShortcutListener(ctx) {` + `
` + `    if (ctx.shortcuts.listener || typeof document === "undefined") return;` + `
` + `    const listener = (oEvent) => {` + `
` + `      try {` + `
` + `        const entry = shortcutEntry(ctx, shortcutFromEvent(oEvent));` + `
` + `        if (!entry) return;` + `
` + `` + `
` + `        if (!Lib.isControllerAlive(entry.controller)) return;` + `
` + `` + `
` + `        oEvent.preventDefault();` + `
` + `        entry.controller.eB([entry.event]);` + `
` + `      } catch (e) {` + `
` + `        Lib.logError("KEYBOARD_SHORTCUT: dispatch failed", e);` + `
` + `      }` + `
` + `    };` + `
` + `    ctx.shortcuts.listener = listener;` + `
` + `    document.addEventListener("keydown", listener);` + `
` + `  }` + `
` + `` + `
` + `  function reset(ctx) {` + `
` + `    const listener = ctx?.shortcuts?.listener;` + `
` + `    if (!listener || typeof document === "undefined") return;` + `
` + `    document.removeEventListener("keydown", listener);` + `
` + `    ctx.shortcuts.listener = null;` + `
` + `  }` + `
` + `` + `
` + `  function evKeyboardShortcut(oController, args) {` + `
` + `    const ctx = oController?.ctx;` + `
` + `    if (!ctx) {` + `
` + `      Lib.logError("KEYBOARD_SHORTCUT: no context to register in");` + `
` + `      return;` + `
` + `    }` + `
` + `    const combo = normalizeShortcut(args[1]);` + `
` + `    if (!combo) {` + `
` + `      Lib.logError(` + `
` + `        \`KEYBOARD_SHORTCUT: '\${args[1]}' names no key to bind (modifiers only?)\`,` + `
` + `      );` + `
` + `      return;` + `
` + `    }` + `
` + `` + `
` + `    const raw = String(args[3] ?? "");` + `
` + `    const upper = raw.toUpperCase();` + `
` + `    const scope = SHORTCUT_SLOTS.includes(upper) ? upper : raw;` + `
` + `    const shortcuts = ctx.state.shortcuts;` + `
` + `` + `
` + `    if (combo in Object.prototype) {` + `
` + `      Lib.logError(\`KEYBOARD_SHORTCUT: '\${args[1]}' is not a key combination\`);` + `
` + `      return;` + `
` + `    }` + `
` + `` + `
` + `    const scopes = shortcuts[combo] ?? (shortcuts[combo] = Object.create(null));` + `
` + `    if (!args[2]) {` + `
` + `      delete scopes[scope];` + `
` + `` + `
` + `      if (Object.keys(scopes).length === 0) delete shortcuts[combo];` + `
` + `      return;` + `
` + `    }` + `
` + `` + `
` + `    scopes[scope] = { event: args[2], controller: oController };` + `
` + `    installShortcutListener(ctx);` + `
` + `  }` + `
` + `` + `
` + `  const handlers = {` + `
` + `    KEYBOARD_SHORTCUT: evKeyboardShortcut,` + `
` + `  };` + `
` + `` + `
` + `  return { handlers, reset };` + `
` + `});` + `
` + `` + `
` + ``;
    return result;
  }
}

module.exports = z2ui5_cl_ui5f_shortcut_js;

