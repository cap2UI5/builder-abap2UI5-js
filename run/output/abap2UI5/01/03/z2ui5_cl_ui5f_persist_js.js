
class z2ui5_cl_ui5f_persist_js {
  static get() {
    let result = ``;
    result = `sap.ui.define([], () => {` + `
` + `  "use strict";` + `
` + `` + `
` + `  function read(key) {` + `
` + `    try {` + `
` + `      return window.sessionStorage?.getItem(key) || "";` + `
` + `    } catch {` + `
` + `      return "";` + `
` + `    }` + `
` + `  }` + `
` + `` + `
` + `  function write(key, value) {` + `
` + `    try {` + `
` + `      window.sessionStorage?.setItem(key, value);` + `
` + `    } catch {}` + `
` + `  }` + `
` + `` + `
` + `  function remove(key) {` + `
` + `    try {` + `
` + `      window.sessionStorage?.removeItem(key);` + `
` + `    } catch {}` + `
` + `  }` + `
` + `` + `
` + `  function readFlag(key) {` + `
` + `    return read(key) === "X";` + `
` + `  }` + `
` + `` + `
` + `  function writeFlag(key, enabled) {` + `
` + `    if (enabled) {` + `
` + `      write(key, "X");` + `
` + `    } else {` + `
` + `      remove(key);` + `
` + `    }` + `
` + `  }` + `
` + `` + `
` + `  function saveList(key, list) {` + `
` + `    if (!list.length) return;` + `
` + `    try {` + `
` + `      window.sessionStorage?.setItem(key, JSON.stringify(list));` + `
` + `    } catch {}` + `
` + `  }` + `
` + `` + `
` + `  function takeList(key) {` + `
` + `    let stored;` + `
` + `    try {` + `
` + `      stored = window.sessionStorage?.getItem(key);` + `
` + `      window.sessionStorage?.removeItem(key);` + `
` + `    } catch {` + `
` + `      return [];` + `
` + `    }` + `
` + `    if (!stored) return [];` + `
` + `    try {` + `
` + `      const parsed = JSON.parse(stored);` + `
` + `      return Array.isArray(parsed) ? parsed : [];` + `
` + `    } catch {` + `
` + `      return [];` + `
` + `    }` + `
` + `  }` + `
` + `` + `
` + `  return { read, write, remove, readFlag, writeFlag, saveList, takeList };` + `
` + `});` + `
` + `` + `
` + ``;
    return result;
  }
}

module.exports = z2ui5_cl_ui5f_persist_js;

