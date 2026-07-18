"use strict";
// Token-level helpers shared by every stage of the transpiler — predicates
// over @abaplint token objects, group matching, top-level scanners and the
// ABAP string-literal → JS template-literal rendering.

// ---------------------------------------------------------------------------
// token helpers
// ---------------------------------------------------------------------------

const KW = (s) => s.toUpperCase();

function tokify(statement) {
  return statement.getTokens().map((t) => ({ type: t.constructor.name, str: t.getStr(), row: t.getStart().getRow(), col: t.getStart().getCol() }));
}

/** true when b starts directly after a with no whitespace (ABAP offset syntax) */
function isAdjacent(a, b) {
  return a && b && a.row === b.row && b.col === a.col + a.str.length;
}

const isParenL = (t) => t.type === "ParenLeft" || t.type === "ParenLeftW" || t.type === "WParenLeft" || t.type === "WParenLeftW";
const isParenR = (t) => t.type === "ParenRight" || t.type === "ParenRightW" || t.type === "WParenRight" || t.type === "WParenRightW";
const isBrackL = (t) => /BracketLeft/.test(t.type);
const isBrackR = (t) => /BracketRight/.test(t.type);
const isTmplBegin = (t) => t.type === "StringTemplateBegin";
const isTmplMiddle = (t) => t.type === "StringTemplateMiddle";
const isTmplEnd = (t) => t.type === "StringTemplateEnd";
const isTmpl = (t) => t.type === "StringTemplate";
const isStr = (t) => t.type === "StringToken" || t.type === "String";
const isId = (t) => t.type === "Identifier";
const isDash = (t) => t.type === "Dash" || t.type === "WDash" || t.type === "DashW";
const isInstArrow = (t) => t.type === "InstanceArrow";
const isStatArrow = (t) => t.type === "StaticArrow";

function depthDelta(t) {
  if (isParenL(t) || isBrackL(t) || isTmplBegin(t)) return 1;
  if (isParenR(t) || isBrackR(t) || isTmplEnd(t)) return -1;
  return 0;
}

/** find index of matching closer for the opener at `start` */
function matchGroup(toks, start) {
  let depth = 0;
  for (let i = start; i < toks.length; i++) {
    depth += depthDelta(toks[i]);
    if (depth === 0) return i;
  }
  throw new Error("unbalanced group: " + toks.map((t) => t.str).join(" "));
}

/** split token list at top-level occurrences matching pred */
function splitTop(toks, pred) {
  const parts = [];
  let depth = 0;
  let cur = [];
  for (const t of toks) {
    const d = depthDelta(t);
    if (d > 0) depth++;
    if (d < 0) depth--;
    if (depth === 0 && d === 0 && pred(t)) {
      parts.push(cur);
      cur = [];
    } else {
      cur.push(t);
    }
  }
  parts.push(cur);
  return parts;
}

function escTemplateText(s) {
  return s.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
}

/** ABAP string-template escapes: structural \| \{ \} \\ plus the control
 *  characters \n (newline), \t (tab), \r (CR). Resolve them to the actual
 *  characters — escTemplateText() re-escapes backslashes/backticks for JS
 *  afterwards, and a literal newline is valid inside a JS template literal.
 *  Without \n/\t/\r a template like |...\n...| leaked the two-character
 *  sequence "\n" into the output (e.g. broken inline XML views). */
function unescAbapTemplate(s) {
  return s.replace(/\\(.)/g, (_m, c) =>
    c === "n" ? "\n" : c === "t" ? "\t" : c === "r" ? "\r" : c);
}

/** ABAP '...' literal → JS `...` literal */
function singleQuotedToBacktick(raw) {
  const inner = raw.slice(1, -1).replace(/''/g, "'");
  return "`" + escTemplateText(inner) + "`";
}

/** ABAP `...` literal → JS `...` literal (escapes \, ` and ${ for JS) */
function backtickToTemplate(raw) {
  const inner = raw.slice(1, -1).replace(/``/g, "`");
  return "`" + escTemplateText(inner) + "`";
}

/** render any ABAP string token as a JS template literal */
function stringToken(str) {
  return str.startsWith("'") ? singleQuotedToBacktick(str) : backtickToTemplate(str);
}

/** free-text ABAP source for a JS block comment — must not close the comment */
function commentSafe(src, max = 120) {
  return src.replace(/\*\//g, "* /").slice(0, max);
}

/** standalone paren (whitespace before) — a VALUE row, not a call group */
function isRowParen(t) {
  return t.type === "WParenLeft" || t.type === "WParenLeftW";
}

/** id [(- id)*] directly followed by "=" at toks[k] */
function looksLikeKey(toks, k) {
  if (!isId(toks[k])) return false;
  k++;
  while (isDash(toks[k] ?? { type: "" }) && isId(toks[k + 1] ?? { type: "" })) k += 2;
  return toks[k]?.str === "=";
}

function topIndexOfWord(toks, word, from = 0) {
  let depth = 0;
  for (let i = from; i < toks.length; i++) {
    depth += depthDelta(toks[i]);
    if (depth === 0 && isId(toks[i]) && KW(toks[i].str) === word && depthDelta(toks[i]) === 0) {
      if (i >= from && i !== from) return i;
      if (i === from && from === 0) return i;
    }
  }
  return -1;
}

function findTopWord(toks, word) {
  let depth = 0;
  for (let i = 0; i < toks.length; i++) {
    depth += depthDelta(toks[i]);
    if (depth === 0 && isId(toks[i]) && KW(toks[i].str) === word) return i;
  }
  return -1;
}

module.exports = { KW, tokify, isAdjacent, isParenL, isParenR, isBrackL, isBrackR, isTmplBegin, isTmplMiddle, isTmplEnd, isTmpl, isStr, isId, isDash, isInstArrow, isStatArrow, depthDelta, matchGroup, splitTop, escTemplateText, unescAbapTemplate, singleQuotedToBacktick, backtickToTemplate, stringToken, commentSafe, isRowParen, looksLikeKey, topIndexOfWord, findTopWord };
