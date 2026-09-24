
class z2ui5_cl_ui5f_slotxml_js {
  static get() {
    let result = ``;
    result = `sap.ui.define(["z2ui5/core/ViewSlots"], (ViewSlots) => {` + `
` + `  "use strict";` + `
` + `` + `
` + `  function viewContent(view) {` + `
` + `    return view?.mProperties?.viewContent;` + `
` + `  }` + `
` + `` + `
` + `  function slotXml(ctx, slotKey) {` + `
` + `    if (!slotKey) return "";` + `
` + `    return (` + `
` + `      viewContent(ViewSlots.getView?.(ctx, slotKey)) ||` + `
` + `      ViewSlots.getViewXml?.(ctx, slotKey) ||` + `
` + `      ""` + `
` + `    );` + `
` + `  }` + `
` + `` + `
` + `  return { viewContent, slotXml };` + `
` + `});` + `
` + `` + `
` + ``;
    return result;
  }
}

module.exports = z2ui5_cl_ui5f_slotxml_js;

