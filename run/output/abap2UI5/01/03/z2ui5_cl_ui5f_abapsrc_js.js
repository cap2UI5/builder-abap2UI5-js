
class z2ui5_cl_ui5f_abapsrc_js {
  static get() {
    let result = ``;
    result = `sap.ui.define(["z2ui5/devtools/Inspect"], (Inspect) => {` + `
` + `  "use strict";` + `
` + `` + `
` + `  let cache = null;` + `
` + `` + `
` + `  function appName(ctx) {` + `
` + `    return ctx?.state?.responseData?.S_FRONT?.APP || "";` + `
` + `  }` + `
` + `` + `
` + `  function sourceUrl(ctx) {` + `
` + `    const name = appName(ctx);` + `
` + `    if (!name) return "";` + `
` + `    return \`\${window.location.origin}/sap/bc/adt/oo/classes/\${encodeURIComponent(name)}/source/main\`;` + `
` + `  }` + `
` + `` + `
` + `  function adtUrl(ctx) {` + `
` + `    const url = sourceUrl(ctx);` + `
` + `    if (!url) return "";` + `
` + `    const event = ctx?.state?.oBody?.S_FRONT?.EVENT;` + `
` + `    if (!event || cache?.app !== appName(ctx) || !cache?.source) return url;` + `
` + `    const lineNumber = Inspect.findEventLine(cache.source, event);` + `
` + `    return lineNumber ? \`\${url}#start=\${lineNumber},1\` : url;` + `
` + `  }` + `
` + `` + `
` + `  function openInAdt(ctx) {` + `
` + `    const url = adtUrl(ctx);` + `
` + `    if (!url) return;` + `
` + `    window.open(url, "_blank", "noopener,noreferrer");` + `
` + `  }` + `
` + `` + `
` + `  function iframeHtml(ctx) {` + `
` + `    const url = sourceUrl(ctx);` + `
` + `    if (!url) return "";` + `
` + `    const iframe = document.createElement("iframe");` + `
` + `    iframe.setAttribute("src", url);` + `
` + `    iframe.setAttribute("style", "width:100%;height:85vh;border:none;");` + `
` + `    return iframe.outerHTML;` + `
` + `  }` + `
` + `` + `
` + `  async function fetchSource(ctx) {` + `
` + `    const url = sourceUrl(ctx);` + `
` + `    if (!url) return "";` + `
` + `    const name = appName(ctx);` + `
` + `    if (cache?.app === name) return cache.source;` + `
` + `    let source = "";` + `
` + `    try {` + `
` + `      const response = await fetch(url, {` + `
` + `        headers: { Accept: "text/plain" },` + `
` + `        credentials: "same-origin",` + `
` + `      });` + `
` + `      if (response.ok) source = await response.text();` + `
` + `    } catch {}` + `
` + `` + `
` + `    if (source) cache = { app: name, source };` + `
` + `    return source;` + `
` + `  }` + `
` + `` + `
` + `  return {` + `
` + `    appName,` + `
` + `    sourceUrl,` + `
` + `    adtUrl,` + `
` + `    openInAdt,` + `
` + `    iframeHtml,` + `
` + `    fetchSource,` + `
` + `` + `
` + `    _setCache: (value) => {` + `
` + `      cache = value;` + `
` + `    },` + `
` + `  };` + `
` + `});` + `
` + `` + `
` + ``;
    return result;
  }
}

module.exports = z2ui5_cl_ui5f_abapsrc_js;

