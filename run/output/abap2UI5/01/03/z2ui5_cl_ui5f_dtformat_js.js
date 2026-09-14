
class z2ui5_cl_ui5f_dtformat_js {
  static get() {
    let result = ``;
    result = `sap.ui.define([], () => {` + `
` + `  "use strict";` + `
` + `` + `
` + `  const INDENT_UNIT = 3;` + `
` + `` + `
` + `  function toJson(val) {` + `
` + `    const safe = val === undefined ? null : val;` + `
` + `` + `
` + `    const ancestors = [];` + `
` + `    try {` + `
` + `      return JSON.stringify(` + `
` + `        safe,` + `
` + `        function (key, value) {` + `
` + `          if (typeof value === "object" && value !== null) {` + `
` + `            while (` + `
` + `              ancestors.length > 0 &&` + `
` + `              ancestors[ancestors.length - 1] !== this` + `
` + `            ) {` + `
` + `              ancestors.pop();` + `
` + `            }` + `
` + `            if (ancestors.includes(value)) return "[Circular]";` + `
` + `            ancestors.push(value);` + `
` + `          }` + `
` + `          return value;` + `
` + `        },` + `
` + `        INDENT_UNIT,` + `
` + `      );` + `
` + `    } catch {` + `
` + `      return String(safe);` + `
` + `    }` + `
` + `  }` + `
` + `` + `
` + `  const PRETTIFY_XSL = \`<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform">` + `
` + `        <xsl:strip-space elements="*" />` + `
` + `        <xsl:template match="para[content-style][not(text())]">` + `
` + `          <xsl:value-of select="normalize-space(.)" />` + `
` + `        </xsl:template>` + `
` + `        <xsl:template match="node()|@*">` + `
` + `          <xsl:copy>` + `
` + `            <xsl:apply-templates select="node()|@*" />` + `
` + `          </xsl:copy>` + `
` + `        </xsl:template>` + `
` + `        <xsl:output indent="yes" />` + `
` + `      </xsl:stylesheet>\`;` + `
` + `` + `
` + `  let _xmlSerializer = null;` + `
` + `  let _domParser = null;` + `
` + `  let _xsltProcessor = null;` + `
` + `` + `
` + `  function getDomParser() {` + `
` + `    if (!_domParser) _domParser = new DOMParser();` + `
` + `    return _domParser;` + `
` + `  }` + `
` + `` + `
` + `  function getXmlSerializer() {` + `
` + `    if (!_xmlSerializer) _xmlSerializer = new XMLSerializer();` + `
` + `    return _xmlSerializer;` + `
` + `  }` + `
` + `` + `
` + `  function getXsltProcessor() {` + `
` + `    if (_xsltProcessor) return _xsltProcessor;` + `
` + `    const xsltDoc = getDomParser().parseFromString(` + `
` + `      PRETTIFY_XSL,` + `
` + `      "application/xml",` + `
` + `    );` + `
` + `    _xsltProcessor = new XSLTProcessor();` + `
` + `    _xsltProcessor.importStylesheet(xsltDoc);` + `
` + `    return _xsltProcessor;` + `
` + `  }` + `
` + `` + `
` + `  function prettifyXml(sourceXml) {` + `
` + `    if (!sourceXml) return "";` + `
` + `    try {` + `
` + `      const xmlDoc = getDomParser().parseFromString(` + `
` + `        sourceXml,` + `
` + `        "application/xml",` + `
` + `      );` + `
` + `      const resultDoc = getXsltProcessor().transformToDocument(xmlDoc);` + `
` + `      if (!resultDoc) return sourceXml;` + `
` + `      const resultXml = getXmlSerializer().serializeToString(resultDoc);` + `
` + `` + `
` + `      return resultXml.replace(/&gt;/g, ">");` + `
` + `    } catch {` + `
` + `      return sourceXml;` + `
` + `    }` + `
` + `  }` + `
` + `` + `
` + `  function truncate(text, max) {` + `
` + `    const str = String(text);` + `
` + `    if (str.length <= max) return str;` + `
` + `    return \`\${str.slice(0, max)}... (\${str.length} chars)\`;` + `
` + `  }` + `
` + `` + `
` + `  function formatBytes(bytes) {` + `
` + `    if (bytes === null || bytes === undefined) return "-";` + `
` + `    if (bytes < 1024) return \`\${bytes} B\`;` + `
` + `    if (bytes < 1024 * 1024) return \`\${Math.round(bytes / 1024)} KB\`;` + `
` + `    return \`\${(bytes / (1024 * 1024)).toFixed(1)} MB\`;` + `
` + `  }` + `
` + `` + `
` + `  const FRAMEWORK_CALL =` + `
` + `    /\\b(eB|eBP|eF)\\s*\\((?:[^[]*\\[)?\\s*(?:&apos;|&quot;|['"])([A-Za-z0-9_.-]+)/;` + `
` + `` + `
` + `  return { toJson, prettifyXml, truncate, formatBytes, FRAMEWORK_CALL };` + `
` + `});` + `
` + `` + `
` + ``;
    return result;
  }
}

module.exports = z2ui5_cl_ui5f_dtformat_js;

