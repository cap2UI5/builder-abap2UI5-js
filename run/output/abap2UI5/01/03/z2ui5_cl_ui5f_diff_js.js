
class z2ui5_cl_ui5f_diff_js {
  static get() {
    let result = ``;
    result = `sap.ui.define([], () => {` + `
` + `  "use strict";` + `
` + `` + `
` + `  const MAX_DIFF_ENTRIES = 200;` + `
` + `` + `
` + `  const MAX_DIFF_DEPTH = 12;` + `
` + `` + `
` + `  const MAX_DIFF_LINES = 4000;` + `
` + `` + `
` + `  const DIFF_LOOKAHEAD = 25;` + `
` + `` + `
` + `  function isPlainObject(value) {` + `
` + `    return value !== null && typeof value === "object" && !Array.isArray(value);` + `
` + `  }` + `
` + `` + `
` + `  function walk(before, after, path, out, depth) {` + `
` + `    if (out.length >= MAX_DIFF_ENTRIES) return;` + `
` + `    if (before === after) return;` + `
` + `    if (depth > MAX_DIFF_DEPTH) {` + `
` + `      out.push({ path, type: "changed", before: "(too deep)", after: "" });` + `
` + `      return;` + `
` + `    }` + `
` + `` + `
` + `    const bothObjects = isPlainObject(before) && isPlainObject(after);` + `
` + `    const bothArrays = Array.isArray(before) && Array.isArray(after);` + `
` + `` + `
` + `    if (bothObjects) {` + `
` + `      const keys = new Set([...Object.keys(before), ...Object.keys(after)]);` + `
` + `      for (const key of keys) {` + `
` + `        walk(before[key], after[key], \`\${path}/\${key}\`, out, depth + 1);` + `
` + `      }` + `
` + `      return;` + `
` + `    }` + `
` + `` + `
` + `    if (bothArrays) {` + `
` + `      const length = Math.max(before.length, after.length);` + `
` + `      for (let i = 0; i < length; i++) {` + `
` + `        walk(before[i], after[i], \`\${path}/\${i}\`, out, depth + 1);` + `
` + `      }` + `
` + `      return;` + `
` + `    }` + `
` + `` + `
` + `    if (before === undefined) {` + `
` + `      out.push({ path, type: "added", before: undefined, after });` + `
` + `      return;` + `
` + `    }` + `
` + `    if (after === undefined) {` + `
` + `      out.push({ path, type: "removed", before, after: undefined });` + `
` + `      return;` + `
` + `    }` + `
` + `    out.push({ path, type: "changed", before, after });` + `
` + `  }` + `
` + `` + `
` + `  function collectDiff(before, after) {` + `
` + `    const out = [];` + `
` + `    walk(before, after, "", out, 0);` + `
` + `    return out;` + `
` + `  }` + `
` + `` + `
` + `  function diffLines(beforeText, afterText) {` + `
` + `    const a = beforeText.split("\\n").slice(0, MAX_DIFF_LINES);` + `
` + `    const b = afterText.split("\\n").slice(0, MAX_DIFF_LINES);` + `
` + `    const out = [];` + `
` + `    let i = 0;` + `
` + `    let j = 0;` + `
` + `    while ((i < a.length || j < b.length) && out.length < MAX_DIFF_ENTRIES) {` + `
` + `      if (i < a.length && j < b.length && a[i] === b[j]) {` + `
` + `        i += 1;` + `
` + `        j += 1;` + `
` + `        continue;` + `
` + `      }` + `
` + `      let addedRun = -1;` + `
` + `      let removedRun = -1;` + `
` + `      for (let k = 1; k <= DIFF_LOOKAHEAD; k += 1) {` + `
` + `        if (` + `
` + `          addedRun < 0 &&` + `
` + `          i < a.length &&` + `
` + `          j + k < b.length &&` + `
` + `          a[i] === b[j + k]` + `
` + `        ) {` + `
` + `          addedRun = k;` + `
` + `        }` + `
` + `        if (` + `
` + `          removedRun < 0 &&` + `
` + `          j < b.length &&` + `
` + `          i + k < a.length &&` + `
` + `          b[j] === a[i + k]` + `
` + `        ) {` + `
` + `          removedRun = k;` + `
` + `        }` + `
` + `        if (addedRun >= 0 || removedRun >= 0) break;` + `
` + `      }` + `
` + `      if (addedRun >= 0 && (removedRun < 0 || addedRun <= removedRun)) {` + `
` + `        for (let k = 0; k < addedRun; k += 1) {` + `
` + `          out.push({ type: "+", line: b[j + k], number: j + k + 1 });` + `
` + `        }` + `
` + `        j += addedRun;` + `
` + `      } else if (removedRun >= 0) {` + `
` + `        for (let k = 0; k < removedRun; k += 1) {` + `
` + `          out.push({ type: "-", line: a[i + k], number: i + k + 1 });` + `
` + `        }` + `
` + `        i += removedRun;` + `
` + `      } else {` + `
` + `        if (i < a.length) {` + `
` + `          out.push({ type: "-", line: a[i], number: i + 1 });` + `
` + `          i += 1;` + `
` + `        }` + `
` + `        if (j < b.length) {` + `
` + `          out.push({ type: "+", line: b[j], number: j + 1 });` + `
` + `          j += 1;` + `
` + `        }` + `
` + `      }` + `
` + `    }` + `
` + `    return out;` + `
` + `  }` + `
` + `` + `
` + `  return {` + `
` + `    collectDiff,` + `
` + `    diffLines,` + `
` + `    MAX_DIFF_ENTRIES,` + `
` + `` + `
` + `    _internals: { MAX_DIFF_DEPTH, MAX_DIFF_LINES, DIFF_LOOKAHEAD },` + `
` + `  };` + `
` + `});` + `
` + `` + `
` + ``;
    return result;
  }
}

module.exports = z2ui5_cl_ui5f_diff_js;

