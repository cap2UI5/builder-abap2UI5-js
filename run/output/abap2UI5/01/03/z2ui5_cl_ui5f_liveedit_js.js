
class z2ui5_cl_ui5f_liveedit_js {
  static get() {
    let result = ``;
    result = `sap.ui.define(` + `
` + `  [` + `
` + `    "z2ui5/core/actions/Slots",` + `
` + `    "z2ui5/core/Lib",` + `
` + `    "z2ui5/core/ViewSlots",` + `
` + `    "z2ui5/devtools/Tabs",` + `
` + `  ],` + `
` + `  (Slots, Lib, ViewSlots, Tabs) => {` + `
` + `    "use strict";` + `
` + `` + `
` + `    function slotOfTab(tabKey) {` + `
` + `      const tab = Tabs.get(tabKey);` + `
` + `      return tab?.aspect === "XML" ? tab.slot : undefined;` + `
` + `    }` + `
` + `` + `
` + `    function canApply(ctx, tabKey) {` + `
` + `      const slotKey = slotOfTab(tabKey);` + `
` + `      if (!slotKey) return false;` + `
` + `      return Boolean(ViewSlots.getView(ctx, slotKey));` + `
` + `    }` + `
` + `` + `
` + `    async function apply(ctx, tabKey, xml) {` + `
` + `      const slotKey = slotOfTab(tabKey);` + `
` + `      if (!slotKey) return "This tab shows no view slot - nothing to apply.";` + `
` + `      if (!xml || !xml.trim()) return "The editor is empty - nothing to apply.";` + `
` + `` + `
` + `      const oldView = ViewSlots.getView(ctx, slotKey);` + `
` + `      if (!oldView) return \`Slot \${slotKey} is not filled - nothing to apply.\`;` + `
` + `      const oldModel = oldView.getModel?.();` + `
` + `      const modelData = oldModel?.getData?.();` + `
` + `` + `
` + `      try {` + `
` + `        const options =` + `
` + `          slotKey === "MAIN" ? ctx.state.lastMainDisplayOptions || {} : {};` + `
` + `        await Slots.action(ctx, "display", slotKey, xml, options, undefined);` + `
` + `      } catch (e) {` + `
` + `        Lib.logError("DevTools LiveEdit: applying the edited XML failed", e);` + `
` + `        return \`Could not build the view: \${e?.message || e}\`;` + `
` + `      }` + `
` + `` + `
` + `      try {` + `
` + `        const newView = ViewSlots.getView(ctx, slotKey);` + `
` + `        const newModel = newView?.getModel?.();` + `
` + `        if (modelData && newModel?.setData && slotKey !== "MAIN") {` + `
` + `          newModel.setData(modelData);` + `
` + `        }` + `
` + `      } catch (e) {` + `
` + `        Lib.logError("DevTools LiveEdit: restoring the model failed", e);` + `
` + `      }` + `
` + `` + `
` + `      return (` + `
` + `        \`Applied to slot \${slotKey}. This is a LOCAL preview - the backend \` +` + `
` + `        \`knows nothing about it, and the next roundtrip replaces it.\`` + `
` + `      );` + `
` + `    }` + `
` + `` + `
` + `    function isBusy(ctx) {` + `
` + `      return Boolean(ctx?.state?.isBusy);` + `
` + `    }` + `
` + `` + `
` + `    return { apply, canApply, slotOfTab, isBusy };` + `
` + `  },` + `
` + `);` + `
` + `` + `
` + ``;
    return result;
  }
}

module.exports = z2ui5_cl_ui5f_liveedit_js;

