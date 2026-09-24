
class z2ui5_cl_ui5f_devtools_js {
  static get() {
    let result = ``;
    result = `sap.ui.define(` + `
` + `  [` + `
` + `    "z2ui5/core/Lib",` + `
` + `    "z2ui5/devtools/Console",` + `
` + `    "z2ui5/devtools/DeveloperTools",` + `
` + `    "z2ui5/devtools/Picker",` + `
` + `    "z2ui5/devtools/Recorder",` + `
` + `  ],` + `
` + `  (Lib, Console, DeveloperTools, Picker, Recorder) => {` + `
` + `    "use strict";` + `
` + `` + `
` + `    const AUTO_OPEN_PARAM = "z2ui5-devtools";` + `
` + `` + `
` + `    function recordOf(ctx) {` + `
` + `      return ctx?.devtools || null;` + `
` + `    }` + `
` + `` + `
` + `    function get(ctx) {` + `
` + `      const record = recordOf(ctx);` + `
` + `      if (!record) return null;` + `
` + `      if (!record.tools) {` + `
` + `        const tools = new DeveloperTools();` + `
` + `        tools.ctx = ctx;` + `
` + `        record.tools = tools;` + `
` + `      }` + `
` + `      return record.tools;` + `
` + `    }` + `
` + `` + `
` + `    function toggle(ctx) {` + `
` + `      get(ctx)?.toggle();` + `
` + `    }` + `
` + `` + `
` + `    function show(ctx, tabKey) {` + `
` + `      get(ctx)?.show(tabKey);` + `
` + `    }` + `
` + `` + `
` + `    function searchParams() {` + `
` + `      try {` + `
` + `        return new URLSearchParams(window.location.search);` + `
` + `      } catch {` + `
` + `        return null;` + `
` + `      }` + `
` + `    }` + `
` + `` + `
` + `    function isAutoOpenRequested() {` + `
` + `      return Boolean(searchParams()?.has(AUTO_OPEN_PARAM));` + `
` + `    }` + `
` + `` + `
` + `    function autoOpenTab() {` + `
` + `      const value = searchParams()?.get(AUTO_OPEN_PARAM);` + `
` + `      if (value === null || value === undefined) return "";` + `
` + `      const key = value.toUpperCase();` + `
` + `      return key === "1" || key === "X" ? "" : key;` + `
` + `    }` + `
` + `` + `
` + `    function onErrorDetails(ctx) {` + `
` + `      const dialog = get(ctx);` + `
` + `      if (!dialog) return;` + `
` + `      dialog.reopenErrorOnClose = true;` + `
` + `      dialog.show("ERROR");` + `
` + `    }` + `
` + `` + `
` + `    function install(ctx) {` + `
` + `      const record = recordOf(ctx);` + `
` + `      if (!record || record.keydown) return;` + `
` + `` + `
` + `      Recorder.install(ctx);` + `
` + `` + `
` + `      Console.install();` + `
` + `      record.console = true;` + `
` + `` + `
` + `      record.onConsoleError = () => {` + `
` + `        if (record.tools?.oDialog?.isOpen?.()) return;` + `
` + `        show(ctx, "LOG");` + `
` + `      };` + `
` + `      Console.addOnError(record.onConsoleError);` + `
` + `` + `
` + `      record.errorDetailsHook = () => onErrorDetails(ctx);` + `
` + `      Lib.registerCallback(ctx, "onErrorDetails", record.errorDetailsHook);` + `
` + `` + `
` + `      record.keydown = (event) => {` + `
` + `        if (event.ctrlKey && event.key === "F12") toggle(ctx);` + `
` + `      };` + `
` + `      document.addEventListener("keydown", record.keydown);` + `
` + `` + `
` + `      if (isAutoOpenRequested()) show(ctx, autoOpenTab() || undefined);` + `
` + `    }` + `
` + `` + `
` + `    function exit(ctx) {` + `
` + `      const record = recordOf(ctx);` + `
` + `      if (!record) return;` + `
` + `      if (record.keydown) {` + `
` + `        document.removeEventListener("keydown", record.keydown);` + `
` + `        record.keydown = null;` + `
` + `      }` + `
` + `      if (record.errorDetailsHook) {` + `
` + `        Lib.unregisterCallback(ctx, "onErrorDetails", record.errorDetailsHook);` + `
` + `        record.errorDetailsHook = null;` + `
` + `      }` + `
` + `      if (record.onConsoleError) {` + `
` + `        Console.removeOnError(record.onConsoleError);` + `
` + `        record.onConsoleError = null;` + `
` + `      }` + `
` + `` + `
` + `      if (record.tools) {` + `
` + `        record.tools.destroy();` + `
` + `        record.tools = null;` + `
` + `      }` + `
` + `` + `
` + `      if (record.console) {` + `
` + `        record.console = false;` + `
` + `        Console.uninstall();` + `
` + `      }` + `
` + `      Recorder.uninstall(ctx);` + `
` + `` + `
` + `      Picker.stop(ctx);` + `
` + `    }` + `
` + `` + `
` + `    return {` + `
` + `      install,` + `
` + `      exit,` + `
` + `      toggle,` + `
` + `      show,` + `
` + `      isAutoOpenRequested,` + `
` + `      autoOpenTab,` + `
` + `    };` + `
` + `  },` + `
` + `);` + `
` + `` + `
` + ``;
    return result;
  }
}

module.exports = z2ui5_cl_ui5f_devtools_js;

