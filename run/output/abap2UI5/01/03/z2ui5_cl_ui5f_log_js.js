
class z2ui5_cl_ui5f_log_js {
  static get() {
    let result = ``;
    result = `sap.ui.define(` + `
` + `  ["z2ui5/core/Lib", "z2ui5/devtools/Console", "z2ui5/devtools/Recorder"],` + `
` + `  (Lib, Console, Recorder) => {` + `
` + `    "use strict";` + `
` + `` + `
` + `    const LEVEL_LABEL = {` + `
` + `      error: "ERROR",` + `
` + `      warn: "WARN ",` + `
` + `      info: "INFO ",` + `
` + `      log: "LOG  ",` + `
` + `      debug: "DEBUG",` + `
` + `    };` + `
` + `` + `
` + `    const SOURCE_WIDTH = 10;` + `
` + `` + `
` + `    const CONTINUATION_INDENT = " ".repeat(23 + SOURCE_WIDTH);` + `
` + `` + `
` + `    function frameworkEntryText(entry) {` + `
` + `      if (entry.error === undefined) return entry.message;` + `
` + `      let detail;` + `
` + `      if (entry.error && typeof entry.error === "object") {` + `
` + `        detail = entry.error.stack || entry.error.message;` + `
` + `      }` + `
` + `      if (!detail) {` + `
` + `        try {` + `
` + `          detail = String(entry.error);` + `
` + `        } catch {` + `
` + `          detail = "(error could not be rendered)";` + `
` + `        }` + `
` + `      }` + `
` + `      return \`\${entry.message}\\n\${detail}\`;` + `
` + `    }` + `
` + `` + `
` + `    function messageLevel(message) {` + `
` + `      const method = String(message.method || "").toLowerCase();` + `
` + `      if (method === "error" || method === "alert") return "error";` + `
` + `      if (method === "warning") return "warn";` + `
` + `      return "info";` + `
` + `    }` + `
` + `` + `
` + `    function messageSource(message) {` + `
` + `      return message.target === "MESSAGE_BOX"` + `
` + `        ? \`box.\${message.method || "show"}\`` + `
` + `        : "toast";` + `
` + `    }` + `
` + `` + `
` + `    function collectLog(ctx) {` + `
` + `      const out = [];` + `
` + `      for (const entry of Lib.errors || []) {` + `
` + `        out.push({` + `
` + `          ts: entry.ts,` + `
` + `          level: "error",` + `
` + `          source: "framework",` + `
` + `          text: frameworkEntryText(entry),` + `
` + `        });` + `
` + `      }` + `
` + `      for (const entry of Console.getEntries()) {` + `
` + `        out.push({` + `
` + `          ts: entry.ts,` + `
` + `          level: entry.level,` + `
` + `          source: entry.source,` + `
` + `          text: entry.text,` + `
` + `          previousLoad: entry.previousLoad,` + `
` + `        });` + `
` + `      }` + `
` + `      for (const record of Recorder.getRecords(ctx)) {` + `
` + `        for (const message of record.messages || []) {` + `
` + `          out.push({` + `
` + `            ts: record.ts,` + `
` + `            level: messageLevel(message),` + `
` + `            source: messageSource(message),` + `
` + `            text: message.text,` + `
` + `            previousLoad: record.previousLoad,` + `
` + `          });` + `
` + `        }` + `
` + `      }` + `
` + `      out.sort((a, b) => {` + `
` + `        if (a.ts === b.ts) return 0;` + `
` + `        return a.ts < b.ts ? -1 : 1;` + `
` + `      });` + `
` + `      return out;` + `
` + `    }` + `
` + `` + `
` + `    function countLevels(entries) {` + `
` + `      const out = { error: 0, warn: 0, info: 0, log: 0, debug: 0 };` + `
` + `      for (const entry of entries) {` + `
` + `        if (out[entry.level] !== undefined) out[entry.level] += 1;` + `
` + `      }` + `
` + `      return out;` + `
` + `    }` + `
` + `` + `
` + `    function formatLog(ctx) {` + `
` + `      const entries = collectLog(ctx);` + `
` + `      const lines = ["abap2UI5 Developer Tools - Log"];` + `
` + `      lines.push("");` + `
` + `      lines.push(` + `
` + `        "  One timeline of everything the app logged, so the browser's own",` + `
` + `      );` + `
` + `      lines.push(` + `
` + `        "  devtools do not have to be open. The origin is in the third",` + `
` + `      );` + `
` + `      lines.push("  column:");` + `
` + `      lines.push("");` + `
` + `      lines.push(` + `
` + `        "    framework   the framework's own error log (Lib.logError)",` + `
` + `      );` + `
` + `      lines.push("    ui5         UI5's log - binding and control problems");` + `
` + `      lines.push("    console     a console.* call from the app or a library");` + `
` + `      lines.push("    uncaught    an uncaught error");` + `
` + `      lines.push("    rejection   an unhandled promise rejection");` + `
` + `      lines.push("    toast/box   a backend message the user was shown");` + `
` + `      lines.push("");` + `
` + `      const counts = countLevels(entries);` + `
` + `      const dropped = Console.getDropped();` + `
` + `      lines.push(` + `
` + `        \`  \${entries.length} entr(ies) - \${counts.error} error,\` +` + `
` + `          \` \${counts.warn} warn, \${counts.info} info, \${counts.log} log,\` +` + `
` + `          \` \${counts.debug} debug\` +` + `
` + `          (dropped ? \` (\${dropped} older console entries dropped)\` : ""),` + `
` + `      );` + `
` + `      lines.push("");` + `
` + `      if (!entries.length) {` + `
` + `        lines.push("  (nothing logged yet)");` + `
` + `        return lines.join("\\n");` + `
` + `      }` + `
` + `      for (const entry of entries) {` + `
` + `        const label = LEVEL_LABEL[entry.level] || entry.level.toUpperCase();` + `
` + `        const head =` + `
` + `          \`  \${entry.ts.slice(11, 23)}\${entry.previousLoad ? "*" : " "} \` +` + `
` + `          \`\${label}  \${entry.source.padEnd(SOURCE_WIDTH)}\`;` + `
` + `        const [first, ...rest] = String(entry.text).split("\\n");` + `
` + `        lines.push(\`\${head}\${first}\`);` + `
` + `` + `
` + `        for (const line of rest) {` + `
` + `          lines.push(\`\${CONTINUATION_INDENT}\${line.trim()}\`);` + `
` + `        }` + `
` + `      }` + `
` + `      if (entries.some((entry) => entry.previousLoad)) {` + `
` + `        lines.push("");` + `
` + `        lines.push(` + `
` + `          "  A '*' after the time marks an entry of the PREVIOUS page load," +` + `
` + `            " carried across the reload.",` + `
` + `        );` + `
` + `      }` + `
` + `      return lines.join("\\n");` + `
` + `    }` + `
` + `` + `
` + `    return { collectLog, countLevels, formatLog };` + `
` + `  },` + `
` + `);` + `
` + `` + `
` + ``;
    return result;
  }
}

module.exports = z2ui5_cl_ui5f_log_js;

