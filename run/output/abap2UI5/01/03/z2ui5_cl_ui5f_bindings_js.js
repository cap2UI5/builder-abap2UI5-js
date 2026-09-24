
class z2ui5_cl_ui5f_bindings_js {
  static get() {
    let result = ``;
    result = `sap.ui.define(` + `
` + `  [` + `
` + `    "z2ui5/core/Lib",` + `
` + `    "z2ui5/core/ViewSlots",` + `
` + `    "z2ui5/devtools/Format",` + `
` + `    "z2ui5/devtools/SlotXml",` + `
` + `  ],` + `
` + `  (Lib, ViewSlots, Format, SlotXml) => {` + `
` + `    "use strict";` + `
` + `` + `
` + `    const { truncate, formatBytes, section, describeValue } = Format;` + `
` + `` + `
` + `    const BINDING_PATH =` + `
` + `      /(?:\\{\\s*|\\$\\{\\s*|path\\s*:\\s*['"]|parts\\s*:\\s*\\[\\s*['"]|,\\s*['"])\\/([A-Za-z_][A-Za-z0-9_]*)/g;` + `
` + `` + `
` + `    function describeAttribute(value) {` + `
` + `      return describeValue(value, { typed: true });` + `
` + `    }` + `
` + `` + `
` + `    function formatSlotBindings(ctx, slotKey) {` + `
` + `      const view = ViewSlots.getView(ctx, slotKey);` + `
` + `      if (!view) return [];` + `
` + `` + `
` + `      const model = ViewSlots.trackedModel(view);` + `
` + `      const data = model?.getData?.();` + `
` + `      if (!data) return [];` + `
` + `      const out = [section(\`Slot \${slotKey}\`)];` + `
` + `` + `
` + `      const dirty = model._z2ui5ChangedPaths || new Set();` + `
` + `` + `
` + `      const dirtyAttrs = new Set(` + `
` + `        Array.from(dirty, (p) => p.split("/")[1]).filter(Boolean),` + `
` + `      );` + `
` + `      const keys = Object.keys(data).sort();` + `
` + `      if (!keys.length) out.push("  (model is empty)");` + `
` + `      for (const key of keys) {` + `
` + `        const path = \`/\${key}\`;` + `
` + `        const isDirty = dirtyAttrs.has(key);` + `
` + `        out.push(` + `
` + `          \`  \${isDirty ? "*" : " "} \${path.padEnd(30)}\${describeAttribute(data[key])}\`,` + `
` + `        );` + `
` + `      }` + `
` + `      if (dirty.size) {` + `
` + `        out.push("");` + `
` + `        out.push("  Edited paths queued for the next roundtrip:");` + `
` + `        for (const path of Array.from(dirty).sort()) out.push(\`    \${path}\`);` + `
` + `      }` + `
` + `      out.push(...formatPendingDelta(dirty, data));` + `
` + `      out.push(...formatBindingCheck(ctx, slotKey, data));` + `
` + `      out.push(...formatSizeRanking(data));` + `
` + `      return out;` + `
` + `    }` + `
` + `` + `
` + `    function scrapeBindingAttributes(xml) {` + `
` + `      if (!xml) return [];` + `
` + `      const found = new Set();` + `
` + `` + `
` + `      for (const match of xml.matchAll(BINDING_PATH)) found.add(match[1]);` + `
` + `      return Array.from(found).sort();` + `
` + `    }` + `
` + `` + `
` + `    function formatBindingCheck(ctx, slotKey, data) {` + `
` + `      const bound = scrapeBindingAttributes(SlotXml.slotXml(ctx, slotKey));` + `
` + `      if (!bound.length) return [];` + `
` + `      const missing = bound.filter((name) => !(name in data));` + `
` + `      const out = [];` + `
` + `      if (missing.length) {` + `
` + `        out.push("");` + `
` + `        out.push("  BOUND IN THE VIEW BUT NOT IN THE MODEL:");` + `
` + `        for (const name of missing) out.push(\`    /\${name}\`);` + `
` + `        out.push(` + `
` + `          "    -> a typo, a renamed ABAP attribute, or a missing" +` + `
` + `            " client->_bind( ).",` + `
` + `        );` + `
` + `      }` + `
` + `` + `
` + `      const boundSet = new Set(bound);` + `
` + `      const unused = Object.keys(data).filter((name) => !boundSet.has(name));` + `
` + `      if (unused.length) {` + `
` + `        out.push("");` + `
` + `        out.push(` + `
` + `          \`  \${unused.length} model attribute(s) not bound in this view:\` +` + `
` + `            \` \${unused.slice(0, 12).join(", ")}\` +` + `
` + `            \`\${unused.length > 12 ? ", ..." : ""}\`,` + `
` + `        );` + `
` + `      }` + `
` + `      return out;` + `
` + `    }` + `
` + `` + `
` + `    function attributeSize(value) {` + `
` + `      try {` + `
` + `        const json = JSON.stringify(value);` + `
` + `        return json === undefined ? 0 : json.length;` + `
` + `      } catch {` + `
` + `        return 0;` + `
` + `      }` + `
` + `    }` + `
` + `` + `
` + `    function formatSizeRanking(data) {` + `
` + `      const sizes = Object.keys(data)` + `
` + `        .map((name) => ({ name, size: attributeSize(data[name]) }))` + `
` + `        .sort((a, b) => b.size - a.size);` + `
` + `      const total = sizes.reduce((sum, entry) => sum + entry.size, 0);` + `
` + `      if (!total) return [];` + `
` + `      const out = ["", \`  Model size: \${formatBytes(total)} serialized\`];` + `
` + `` + `
` + `      for (const entry of sizes.slice(0, 8)) {` + `
` + `        if (!entry.size) continue;` + `
` + `        const share = Math.round((entry.size * 100) / total);` + `
` + `        const rows = Array.isArray(data[entry.name])` + `
` + `          ? \`, \${data[entry.name].length} row(s)\`` + `
` + `          : "";` + `
` + `        out.push(` + `
` + `          \`    \${\`/\${entry.name}\`.padEnd(30)}\${formatBytes(entry.size).padStart(8)}\` +` + `
` + `            \`  \${String(share).padStart(3)}%\${rows}\`,` + `
` + `        );` + `
` + `      }` + `
` + `      return out;` + `
` + `    }` + `
` + `` + `
` + `    function formatPendingDelta(dirty, data) {` + `
` + `      if (!dirty.size) return [];` + `
` + `      const out = ["", "  Delta the next roundtrip will send:"];` + `
` + `      try {` + `
` + `        const delta = Lib.buildDeltaFromPaths(dirty, data);` + `
` + `        const json = JSON.stringify(delta, null, 2);` + `
` + `        for (const line of truncate(json, 1200).split("\\n")) {` + `
` + `          out.push(\`    \${line}\`);` + `
` + `        }` + `
` + `      } catch (e) {` + `
` + `        Lib.logError("DevTools Bindings: building the delta preview failed", e);` + `
` + `        out.push("    (could not be built)");` + `
` + `      }` + `
` + `      return out;` + `
` + `    }` + `
` + `` + `
` + `    function formatBindings(ctx, slotKey) {` + `
` + `      const out = ["abap2UI5 Developer Tools - Model bindings"];` + `
` + `      out.push("");` + `
` + `      out.push(` + `
` + `        "  A '*' marks an attribute the user edited: those paths travel as" +` + `
` + `          " the delta of the next roundtrip.",` + `
` + `      );` + `
` + `      out.push(` + `
` + `        "  MAIN, NEST and NEST2 share one model by UI5 propagation, so they" +` + `
` + `          " are listed once, under MAIN.",` + `
` + `      );` + `
` + `      const slot = ViewSlots.slots.find(` + `
` + `        (entry) => entry.key === slotKey && entry.ownsModel,` + `
` + `      );` + `
` + `      const lines = slot ? formatSlotBindings(ctx, slot.key) : [];` + `
` + `      if (lines.length) {` + `
` + `        out.push(...lines);` + `
` + `      } else {` + `
` + `        out.push("\\n  (no slot carries a model yet)");` + `
` + `      }` + `
` + `      return out.join("\\n");` + `
` + `    }` + `
` + `` + `
` + `    return {` + `
` + `      formatBindings,` + `
` + `` + `
` + `      _internals: { scrapeBindingAttributes },` + `
` + `    };` + `
` + `  },` + `
` + `);` + `
` + `` + `
` + ``;
    return result;
  }
}

module.exports = z2ui5_cl_ui5f_bindings_js;

