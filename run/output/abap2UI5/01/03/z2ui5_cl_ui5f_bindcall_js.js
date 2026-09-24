
class z2ui5_cl_ui5f_bindcall_js {
  static get() {
    let result = ``;
    result = `sap.ui.define(` + `
` + `  [` + `
` + `    "sap/ui/model/Filter",` + `
` + `    "sap/ui/model/FilterOperator",` + `
` + `    "sap/ui/model/Sorter",` + `
` + `    "z2ui5/core/Lib",` + `
` + `    "z2ui5/core/ViewSlots",` + `
` + `    "z2ui5/core/actions/ControlCall",` + `
` + `  ],` + `
` + `  (Filter, FilterOperator, Sorter, Lib, ViewSlots, ControlCall) => {` + `
` + `    "use strict";` + `
` + `` + `
` + `    const FILTER_OPERATORS = new Set([` + `
` + `      "BT",` + `
` + `      "Contains",` + `
` + `      "EndsWith",` + `
` + `      "EQ",` + `
` + `      "GE",` + `
` + `      "GT",` + `
` + `      "LE",` + `
` + `      "LT",` + `
` + `      "NB",` + `
` + `      "NE",` + `
` + `      "NotContains",` + `
` + `      "NotEndsWith",` + `
` + `      "NotStartsWith",` + `
` + `      "StartsWith",` + `
` + `    ]);` + `
` + `` + `
` + `    const isEmpty = (v) => v == null || v === "";` + `
` + `` + `
` + `    function buildFilterGroups(binding, json) {` + `
` + `      let groups = json;` + `
` + `      if (typeof json === "string") {` + `
` + `        try {` + `
` + `          groups = JSON.parse(json);` + `
` + `        } catch {` + `
` + `          Lib.logError("BINDING_CALL: malformed filter groups JSON");` + `
` + `          return;` + `
` + `        }` + `
` + `      }` + `
` + `      if (!Array.isArray(groups)) {` + `
` + `        Lib.logError("BINDING_CALL: filter groups must be an array");` + `
` + `        return;` + `
` + `      }` + `
` + `      groups = groups.filter((g) => Array.isArray(g) && g.length);` + `
` + `      if (!groups.length) {` + `
` + `        binding.filter([]);` + `
` + `        return;` + `
` + `      }` + `
` + `      const outer = [];` + `
` + `      for (const group of groups) {` + `
` + `        const inner = [];` + `
` + `        for (const row of group) {` + `
` + `          const [path, operator, value1, value2] = Array.isArray(row)` + `
` + `            ? row` + `
` + `            : [];` + `
` + `          if (typeof path !== "string" || !FILTER_OPERATORS.has(operator)) {` + `
` + `            Lib.logError(` + `
` + `              \`BINDING_CALL: bad filter row (path '\${path}' / operator '\${operator}')\`,` + `
` + `            );` + `
` + `            return;` + `
` + `          }` + `
` + `          inner.push(` + `
` + `            new Filter(path, FilterOperator[operator], value1, value2),` + `
` + `          );` + `
` + `        }` + `
` + `        outer.push(new Filter(inner, false));` + `
` + `      }` + `
` + `      binding.filter([new Filter(outer, true)]);` + `
` + `    }` + `
` + `` + `
` + `    const BINDING_METHODS = {` + `
` + `      filter(binding, params) {` + `
` + `        const [path, operator, value1, value2] = params;` + `
` + `` + `
` + `        if (` + `
` + `          params.length === 1 &&` + `
` + `          (Array.isArray(path) ||` + `
` + `            (typeof path === "string" && path.trimStart().startsWith("[")))` + `
` + `        ) {` + `
` + `          buildFilterGroups(binding, path);` + `
` + `          return;` + `
` + `        }` + `
` + `` + `
` + `        if (isEmpty(value1) && isEmpty(value2)) {` + `
` + `          binding.filter([]);` + `
` + `          return;` + `
` + `        }` + `
` + `        if (!FILTER_OPERATORS.has(operator)) {` + `
` + `          Lib.logError(\`BINDING_CALL: operator '\${operator}' not allowed\`);` + `
` + `          return;` + `
` + `        }` + `
` + `        binding.filter([` + `
` + `          new Filter(path, FilterOperator[operator], value1, value2),` + `
` + `        ]);` + `
` + `      },` + `
` + `      sort(binding, [path, descending, group]) {` + `
` + `        binding.sort([` + `
` + `          new Sorter(` + `
` + `            path,` + `
` + `            ControlCall.castArg("bool", descending),` + `
` + `            ControlCall.castArg("bool", group),` + `
` + `          ),` + `
` + `        ]);` + `
` + `      },` + `
` + `    };` + `
` + `` + `
` + `    Object.setPrototypeOf(BINDING_METHODS, null);` + `
` + `` + `
` + `    function evBindingCall(oController, args) {` + `
` + `      const [, id, aggregation, method] = args;` + `
` + `      const build = BINDING_METHODS[method];` + `
` + `      if (!build) {` + `
` + `        Lib.logError(\`BINDING_CALL: method '\${method}' not allowed\`);` + `
` + `        return;` + `
` + `      }` + `
` + `      const binding = ViewSlots.resolveById(oController?.ctx, id)?.getBinding?.(` + `
` + `        aggregation,` + `
` + `      );` + `
` + `      if (!binding || typeof binding[method] !== "function") {` + `
` + `        Lib.logError(` + `
` + `          \`BINDING_CALL: no '\${aggregation}' binding with '\${method}' on control '\${id}'\`,` + `
` + `        );` + `
` + `        return;` + `
` + `      }` + `
` + `      build(binding, args.slice(4));` + `
` + `    }` + `
` + `` + `
` + `    const handlers = {` + `
` + `      BINDING_CALL: evBindingCall,` + `
` + `    };` + `
` + `` + `
` + `    return { handlers };` + `
` + `  },` + `
` + `);` + `
` + `` + `
` + ``;
    return result;
  }
}

module.exports = z2ui5_cl_ui5f_bindcall_js;

