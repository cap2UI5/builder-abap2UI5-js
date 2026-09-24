
class z2ui5_cl_ui5f_env_js {
  static get() {
    let result = ``;
    result = `sap.ui.define(["sap/ui/core/Element", "z2ui5/core/Lib"], (Element, Lib) => {` + `
` + `  "use strict";` + `
` + `` + `
` + `  function getElementById(sId) {` + `
` + `    if (!sId) return null;` + `
` + `    if (Element.getElementById) return Element.getElementById(sId) || null;` + `
` + `` + `
` + `    if (sap.ui.getCore) {` + `
` + `      const core = sap.ui.getCore();` + `
` + `      if (core?.byId) return core.byId(sId) || null;` + `
` + `    }` + `
` + `` + `
` + `    return null;` + `
` + `  }` + `
` + `` + `
` + `  let messagingFacade = null;` + `
` + `  function getMessaging() {` + `
` + `    if (messagingFacade) return messagingFacade;` + `
` + `    const Messaging = sap.ui.require("sap/ui/core/Messaging");` + `
` + `    if (Messaging) {` + `
` + `      messagingFacade = Messaging;` + `
` + `      return Messaging;` + `
` + `    }` + `
` + `` + `
` + `    if (sap.ui.getCore) {` + `
` + `      const core = sap.ui.getCore();` + `
` + `      if (core?.getMessageManager) {` + `
` + `        messagingFacade = core.getMessageManager();` + `
` + `        return messagingFacade;` + `
` + `      }` + `
` + `    }` + `
` + `` + `
` + `    return null;` + `
` + `  }` + `
` + `` + `
` + `  function getThemingModule() {` + `
` + `    return sap.ui.require("sap/ui/core/Theming") || null;` + `
` + `  }` + `
` + `` + `
` + `  function getTheme() {` + `
` + `    try {` + `
` + `      const Theming = getThemingModule();` + `
` + `      if (Theming?.getTheme) return Theming.getTheme();` + `
` + `` + `
` + `      if (sap.ui.getCore) {` + `
` + `        const config = sap.ui.getCore().getConfiguration?.();` + `
` + `        if (config?.getTheme) return config.getTheme();` + `
` + `      }` + `
` + `    } catch (e) {` + `
` + `      Lib.logError("Env: reading theme failed", e);` + `
` + `    }` + `
` + `    return "";` + `
` + `  }` + `
` + `` + `
` + `  function getLocale() {` + `
` + `    try {` + `
` + `      const Localization = sap.ui.require("sap/base/i18n/Localization");` + `
` + `      if (Localization?.getLanguage) {` + `
` + `        return {` + `
` + `          language: Localization.getLanguage(),` + `
` + `          rtl: Boolean(Localization.getRTL?.()),` + `
` + `        };` + `
` + `      }` + `
` + `` + `
` + `      if (sap.ui.getCore) {` + `
` + `        const config = sap.ui.getCore().getConfiguration?.();` + `
` + `        if (config?.getLanguage) {` + `
` + `          return {` + `
` + `            language: config.getLanguage(),` + `
` + `            rtl: Boolean(config.getRTL?.()),` + `
` + `          };` + `
` + `        }` + `
` + `      }` + `
` + `    } catch (e) {` + `
` + `      Lib.logError("Env: reading locale failed", e);` + `
` + `    }` + `
` + `    return { language: "", rtl: false };` + `
` + `  }` + `
` + `` + `
` + `  function hasMessagingModule() {` + `
` + `    const rawVersion = String(sap.ui.version || "");` + `
` + `` + `
` + `    const [major, minor] = rawVersion.split(".").map(Number);` + `
` + `    if (!Number.isFinite(major) || !Number.isFinite(minor)) return true;` + `
` + `    return major > 1 || (major === 1 && minor >= 118);` + `
` + `  }` + `
` + `` + `
` + `  function fragmentLoadsSync() {` + `
` + `    const rawVersion = String(sap.ui.version || "");` + `
` + `` + `
` + `    const [major, minor] = rawVersion.split(".").map(Number);` + `
` + `    if (!Number.isFinite(major) || !Number.isFinite(minor)) return false;` + `
` + `    return major === 1 && minor < 84;` + `
` + `  }` + `
` + `` + `
` + `  const XMLNS = /\\bxmlns(?::([\\w.-]+))?\\s*=\\s*["']([\\w.]+)["']/g;` + `
` + `  const ELEMENT = /<(?:([\\w.-]+):)?([A-Z]\\w*)[\\s/>]/g;` + `
` + `  function fragmentControlModules(xml) {` + `
` + `    const text = String(xml ?? "");` + `
` + `    const namespaces = new Map();` + `
` + `    for (const [, prefix, namespace] of text.matchAll(XMLNS)) {` + `
` + `      namespaces.set(prefix ?? "", namespace);` + `
` + `    }` + `
` + `    const result = new Set();` + `
` + `    for (const [, prefix, name] of text.matchAll(ELEMENT)) {` + `
` + `      const namespace = namespaces.get(prefix ?? "");` + `
` + `      if (!namespace || name === "FragmentDefinition") continue;` + `
` + `      result.add(\`\${namespace.replace(/\\./g, "/")}/\${name}\`);` + `
` + `    }` + `
` + `    return [...result];` + `
` + `  }` + `
` + `` + `
` + `  function preloadFragmentModules(xml) {` + `
` + `    if (!fragmentLoadsSync()) return Promise.resolve();` + `
` + `    const modules = fragmentControlModules(xml);` + `
` + `    if (!modules.length) return Promise.resolve();` + `
` + `    return new Promise((resolve) => {` + `
` + `      sap.ui.require(` + `
` + `        modules,` + `
` + `        () => resolve(),` + `
` + `        (e) => {` + `
` + `          Lib.logError("Env: preloading the fragment's controls failed", e);` + `
` + `          resolve();` + `
` + `        },` + `
` + `      );` + `
` + `    });` + `
` + `  }` + `
` + `` + `
` + `  function controlFilters(binding) {` + `
` + `    if (!binding) return undefined;` + `
` + `    if (typeof binding.getFilters === "function") {` + `
` + `      return binding.getFilters("Control");` + `
` + `    }` + `
` + `    return binding.aFilters;` + `
` + `  }` + `
` + `` + `
` + `  return {` + `
` + `    getElementById,` + `
` + `    getMessaging,` + `
` + `    controlFilters,` + `
` + `    getThemingModule,` + `
` + `    getTheme,` + `
` + `    getLocale,` + `
` + `    hasMessagingModule,` + `
` + `    fragmentLoadsSync,` + `
` + `    fragmentControlModules,` + `
` + `    preloadFragmentModules,` + `
` + `  };` + `
` + `});` + `
` + `` + `
` + ``;
    return result;
  }
}

module.exports = z2ui5_cl_ui5f_env_js;

