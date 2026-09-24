
class z2ui5_cl_ui5f_console_js {
  static get() {
    let result = ``;
    result = `sap.ui.define(["z2ui5/devtools/Persist"], (Persist) => {` + `
` + `  "use strict";` + `
` + `` + `
` + `  const MAX_ENTRIES = 300;` + `
` + `` + `
` + `  const MAX_TEXT_CHARS = 2000;` + `
` + `` + `
` + `  const MAX_DEPTH = 4;` + `
` + `` + `
` + `  const MAX_ITEMS = 20;` + `
` + `` + `
` + `  const MAX_NODES = 1000;` + `
` + `` + `
` + `  const RELOAD_KEY = "z2ui5.devtools.console";` + `
` + `  const RELOAD_MAX_ENTRIES = 40;` + `
` + `` + `
` + `  const ALERT_KEY = "z2ui5.devtools.openOnError";` + `
` + `` + `
` + `  const METHODS = ["log", "info", "warn", "error", "debug"];` + `
` + `` + `
` + `  let entries = [];` + `
` + `  let dropped = 0;` + `
` + `` + `
` + `  const originals = {};` + `
` + `` + `
` + `  let users = 0;` + `
` + `  let ui5Listener = null;` + `
` + `  let onWindowError = null;` + `
` + `  let onRejection = null;` + `
` + `  let onPageHide = null;` + `
` + `` + `
` + `  const onErrorEntry = new Set();` + `
` + `` + `
` + `  let capturing = false;` + `
` + `` + `
` + `  let pendingUi5Echo = null;` + `
` + `` + `
` + `  function push(level, source, text) {` + `
` + `    if (entries.length >= MAX_ENTRIES) {` + `
` + `      entries.shift();` + `
` + `      dropped += 1;` + `
` + `    }` + `
` + `    let body = text;` + `
` + `    if (body.length > MAX_TEXT_CHARS) {` + `
` + `      body = \`\${body.slice(0, MAX_TEXT_CHARS)}... (\${body.length} chars)\`;` + `
` + `    }` + `
` + `    const entry = {` + `
` + `      ts: new Date().toISOString(),` + `
` + `      level,` + `
` + `      source,` + `
` + `      text: body,` + `
` + `    };` + `
` + `    entries.push(entry);` + `
` + `    if (level === "error" && onErrorEntry.size && isAlertOnError()) {` + `
` + `      for (const fn of onErrorEntry) {` + `
` + `        try {` + `
` + `          fn(entry);` + `
` + `        } catch {}` + `
` + `      }` + `
` + `    }` + `
` + `  }` + `
` + `` + `
` + `  function addOnError(fn) {` + `
` + `    if (typeof fn === "function") onErrorEntry.add(fn);` + `
` + `  }` + `
` + `` + `
` + `  function removeOnError(fn) {` + `
` + `    onErrorEntry.delete(fn);` + `
` + `  }` + `
` + `` + `
` + `  function isAlertOnError() {` + `
` + `    return Persist.readFlag(ALERT_KEY);` + `
` + `  }` + `
` + `` + `
` + `  function setAlertOnError(enabled) {` + `
` + `    Persist.writeFlag(ALERT_KEY, enabled);` + `
` + `  }` + `
` + `` + `
` + `  function persist() {` + `
` + `    const errors = entries` + `
` + `      .filter((entry) => entry.level === "error")` + `
` + `      .slice(-RELOAD_MAX_ENTRIES)` + `
` + `      .map((entry) => ({ ...entry, previousLoad: true }));` + `
` + `    Persist.saveList(RELOAD_KEY, errors);` + `
` + `  }` + `
` + `` + `
` + `  function restore() {` + `
` + `    const stored = Persist.takeList(RELOAD_KEY);` + `
` + `    if (stored.length) entries = stored.slice(-RELOAD_MAX_ENTRIES);` + `
` + `  }` + `
` + `` + `
` + `  function isErrorLike(value) {` + `
` + `    if (!value || typeof value !== "object") return false;` + `
` + `    if (Object.prototype.toString.call(value) === "[object Error]") return true;` + `
` + `    return typeof value.stack === "string" && typeof value.message === "string";` + `
` + `  }` + `
` + `` + `
` + `  function renderArg(value) {` + `
` + `    if (value === undefined) return "undefined";` + `
` + `    if (value === null) return "null";` + `
` + `    const type = typeof value;` + `
` + `    if (type === "string") return value;` + `
` + `    if (type === "number" || type === "boolean" || type === "bigint") {` + `
` + `      return String(value);` + `
` + `    }` + `
` + `    if (type === "function") return \`[function \${value.name || "anonymous"}]\`;` + `
` + `    if (type === "symbol") return String(value);` + `
` + `    if (isErrorLike(value)) {` + `
` + `      return value.stack || \`\${value.name || "Error"}: \${value.message}\`;` + `
` + `    }` + `
` + `    try {` + `
` + `      const ancestors = [];` + `
` + `      const walked = new WeakMap();` + `
` + `      let nodes = 0;` + `
` + `      return JSON.stringify(value, function replace(key, val) {` + `
` + `        if (typeof val === "object" && val !== null) {` + `
` + `          if (++nodes > MAX_NODES) return "[...]";` + `
` + `          const holder = walked.get(this) || this;` + `
` + `          while (` + `
` + `            ancestors.length > 0 &&` + `
` + `            ancestors[ancestors.length - 1] !== holder` + `
` + `          ) {` + `
` + `            ancestors.pop();` + `
` + `          }` + `
` + `          if (ancestors.includes(val)) return "[Circular]";` + `
` + `` + `
` + `          if (ancestors.length >= MAX_DEPTH) return "[...]";` + `
` + `          ancestors.push(val);` + `
` + `          if (Array.isArray(val) && val.length > MAX_ITEMS) {` + `
` + `            const head = val.slice(0, MAX_ITEMS);` + `
` + `            head.push(\`[... \${val.length - MAX_ITEMS} more]\`);` + `
` + `            walked.set(head, val);` + `
` + `            return head;` + `
` + `          }` + `
` + `` + `
` + `          const keys = Object.keys(val);` + `
` + `          if (keys.length > MAX_ITEMS) {` + `
` + `            const head = {};` + `
` + `            for (const k of keys.slice(0, MAX_ITEMS)) head[k] = val[k];` + `
` + `            head[\`... \${keys.length - MAX_ITEMS} more\`] = "[...]";` + `
` + `            walked.set(head, val);` + `
` + `            return head;` + `
` + `          }` + `
` + `        }` + `
` + `        if (isErrorLike(val)) return val.stack || String(val);` + `
` + `        return val;` + `
` + `      });` + `
` + `    } catch {` + `
` + `      try {` + `
` + `        return String(value);` + `
` + `      } catch {` + `
` + `        return "[unrenderable]";` + `
` + `      }` + `
` + `    }` + `
` + `  }` + `
` + `` + `
` + `  function renderArgs(args) {` + `
` + `    return args.map(renderArg).join(" ");` + `
` + `  }` + `
` + `` + `
` + `  function captureConsole(level, args) {` + `
` + `    if (capturing) return;` + `
` + `    capturing = true;` + `
` + `    try {` + `
` + `      const text = renderArgs(args);` + `
` + `` + `
` + `      const echo = pendingUi5Echo;` + `
` + `      pendingUi5Echo = null;` + `
` + `` + `
` + `      if (echo && (text === echo || text.startsWith(\`\${echo} \`))) return;` + `
` + `      push(level, "console", text);` + `
` + `    } catch {` + `
` + `    } finally {` + `
` + `      capturing = false;` + `
` + `    }` + `
` + `  }` + `
` + `` + `
` + `  const UI5_LEVELS = {` + `
` + `    0: "error",` + `
` + `    1: "error",` + `
` + `    2: "warn",` + `
` + `    3: "info",` + `
` + `    4: "debug",` + `
` + `    5: "debug",` + `
` + `  };` + `
` + `` + `
` + `  function captureUi5(logEntry) {` + `
` + `    try {` + `
` + `      const level = UI5_LEVELS[logEntry?.level] || "info";` + `
` + `      const component = logEntry?.component ? \`[\${logEntry.component}] \` : "";` + `
` + `      const details = logEntry?.details ? \` - \${logEntry.details}\` : "";` + `
` + `      push(level, "ui5", \`\${component}\${logEntry?.message || ""}\${details}\`);` + `
` + `` + `
` + `      pendingUi5Echo =` + `
` + `        \`\${logEntry?.date || ""} \${logEntry?.time || ""} \` +` + `
` + `        \`\${logEntry?.message || ""} - \${logEntry?.details || ""} \` +` + `
` + `        \`\${logEntry?.component || ""}\`;` + `
` + `    } catch {}` + `
` + `  }` + `
` + `` + `
` + `  function installConsole() {` + `
` + `    for (const name of METHODS) {` + `
` + `      const original = window.console?.[name];` + `
` + `      if (typeof original !== "function") continue;` + `
` + `      originals[name] = original;` + `
` + `` + `
` + `      window.console[name] = function (...args) {` + `
` + `        try {` + `
` + `          original.apply(window.console, args);` + `
` + `        } finally {` + `
` + `          captureConsole(name, args);` + `
` + `        }` + `
` + `      };` + `
` + `    }` + `
` + `  }` + `
` + `` + `
` + `  function uninstallConsole() {` + `
` + `    for (const [name, original] of Object.entries(originals)) {` + `
` + `      window.console[name] = original;` + `
` + `      delete originals[name];` + `
` + `    }` + `
` + `  }` + `
` + `` + `
` + `  function installUi5Log() {` + `
` + `    const Log = sap.ui.require("sap/base/Log");` + `
` + `    if (!Log?.addLogListener) return;` + `
` + `    ui5Listener = { onLogEntry: captureUi5 };` + `
` + `    try {` + `
` + `      Log.addLogListener(ui5Listener);` + `
` + `    } catch {` + `
` + `      ui5Listener = null;` + `
` + `    }` + `
` + `  }` + `
` + `` + `
` + `  function uninstallUi5Log() {` + `
` + `    if (!ui5Listener) return;` + `
` + `    const Log = sap.ui.require("sap/base/Log");` + `
` + `    try {` + `
` + `      Log?.removeLogListener?.(ui5Listener);` + `
` + `    } catch {}` + `
` + `    ui5Listener = null;` + `
` + `  }` + `
` + `` + `
` + `  function install() {` + `
` + `    users += 1;` + `
` + `    if (users > 1) return;` + `
` + `    restore();` + `
` + `` + `
` + `    onWindowError = (event) => {` + `
` + `      const stack = event?.error?.stack;` + `
` + `` + `
` + `      if (stack) {` + `
` + `        push("error", "uncaught", stack);` + `
` + `        return;` + `
` + `      }` + `
` + `      const where = event?.filename` + `
` + `        ? \` (\${event.filename}:\${event.lineno || 0}:\${event.colno || 0})\`` + `
` + `        : "";` + `
` + `      push("error", "uncaught", \`\${event?.message || "unknown error"}\${where}\`);` + `
` + `    };` + `
` + `    onRejection = (event) => {` + `
` + `      const reason = event?.reason;` + `
` + `      push(` + `
` + `        "error",` + `
` + `        "rejection",` + `
` + `        reason?.stack || renderArg(reason) || "unhandled rejection",` + `
` + `      );` + `
` + `    };` + `
` + `    onPageHide = persist;` + `
` + `    window.addEventListener("error", onWindowError);` + `
` + `    window.addEventListener("unhandledrejection", onRejection);` + `
` + `    window.addEventListener("pagehide", onPageHide);` + `
` + `` + `
` + `    installUi5Log();` + `
` + `    installConsole();` + `
` + `  }` + `
` + `` + `
` + `  function uninstall() {` + `
` + `    if (!users) return;` + `
` + `    users -= 1;` + `
` + `    if (users) return;` + `
` + `    uninstallConsole();` + `
` + `    uninstallUi5Log();` + `
` + `    if (onWindowError) window.removeEventListener("error", onWindowError);` + `
` + `    if (onRejection) {` + `
` + `      window.removeEventListener("unhandledrejection", onRejection);` + `
` + `    }` + `
` + `    if (onPageHide) window.removeEventListener("pagehide", onPageHide);` + `
` + `    onWindowError = null;` + `
` + `    onRejection = null;` + `
` + `    onPageHide = null;` + `
` + `    onErrorEntry.clear();` + `
` + `    pendingUi5Echo = null;` + `
` + `    entries = [];` + `
` + `    dropped = 0;` + `
` + `  }` + `
` + `` + `
` + `  function getEntries() {` + `
` + `    return entries;` + `
` + `  }` + `
` + `` + `
` + `  function getDropped() {` + `
` + `    return dropped;` + `
` + `  }` + `
` + `` + `
` + `  return {` + `
` + `    install,` + `
` + `    uninstall,` + `
` + `    addOnError,` + `
` + `    removeOnError,` + `
` + `    isAlertOnError,` + `
` + `    setAlertOnError,` + `
` + `    getEntries,` + `
` + `    getDropped,` + `
` + `` + `
` + `    _internals: {` + `
` + `      renderArg,` + `
` + `      MAX_ENTRIES,` + `
` + `      MAX_TEXT_CHARS,` + `
` + `      MAX_ITEMS,` + `
` + `      MAX_NODES,` + `
` + `    },` + `
` + `  };` + `
` + `});` + `
` + `` + `
` + ``;
    return result;
  }
}

module.exports = z2ui5_cl_ui5f_console_js;

