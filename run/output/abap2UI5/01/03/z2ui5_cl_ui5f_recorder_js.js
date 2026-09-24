
class z2ui5_cl_ui5f_recorder_js {
  static get() {
    let result = ``;
    result = `sap.ui.define(` + `
` + `  [` + `
` + `    "z2ui5/core/Lib",` + `
` + `    "z2ui5/devtools/Format",` + `
` + `    "z2ui5/devtools/Persist",` + `
` + `    "z2ui5/devtools/Diff",` + `
` + `  ],` + `
` + `  (Lib, Format, Persist, Diff) => {` + `
` + `    "use strict";` + `
` + `` + `
` + `    const { formatBytes, renderValue } = Format;` + `
` + `    const { collectDiff, diffLines, MAX_DIFF_ENTRIES } = Diff;` + `
` + `` + `
` + `    const MAX_RECORDS = 50;` + `
` + `` + `
` + `    const PAYLOAD_BUDGET_BYTES = 2 * 1024 * 1024;` + `
` + `` + `
` + `    const PAYLOAD_FLAG_KEY = "z2ui5.devtools.recordPayloads";` + `
` + `` + `
` + `    const RELOAD_KEY = "z2ui5.devtools.history";` + `
` + `    const RELOAD_MAX_RECORDS = 30;` + `
` + `` + `
` + `    const UNPAIRED_FLUSH_MS = 5000;` + `
` + `` + `
` + `    const MAX_MESSAGE_CHARS = 500;` + `
` + `` + `
` + `    const MAX_DIFF_VALUE_CHARS = 120;` + `
` + `` + `
` + `    function recorderOf(ctx) {` + `
` + `      return ctx?.devtools?.recorder || null;` + `
` + `    }` + `
` + `` + `
` + `    function createRecorder() {` + `
` + `      return {` + `
` + `        records: [],` + `
` + `        nextSeq: 1,` + `
` + `        unpaired: [],` + `
` + `        lastEntryStart: -1,` + `
` + `        payloadBytes: 0,` + `
` + `        observer: null,` + `
` + `        afterRenderingHook: null,` + `
` + `        onPageHide: null,` + `
` + `      };` + `
` + `    }` + `
` + `` + `
` + `    function backendUrl(ctx) {` + `
` + `      const url = ctx?.state?.url;` + `
` + `      if (!url) return "";` + `
` + `      try {` + `
` + `        return new URL(url, window.location.href).href;` + `
` + `      } catch {` + `
` + `        return "";` + `
` + `      }` + `
` + `    }` + `
` + `` + `
` + `    function wallClockIso(mark) {` + `
` + `      const origin =` + `
` + `        typeof performance !== "undefined" ? performance.timeOrigin : undefined;` + `
` + `      if (typeof origin === "number" && typeof mark === "number") {` + `
` + `        return new Date(origin + mark).toISOString();` + `
` + `      }` + `
` + `      return new Date().toISOString();` + `
` + `    }` + `
` + `` + `
` + `    function now() {` + `
` + `      return typeof performance !== "undefined" && performance.now` + `
` + `        ? performance.now()` + `
` + `        : 0;` + `
` + `    }` + `
` + `` + `
` + `    function acceptEntry(rec, entry) {` + `
` + `      if (!entry || entry.startTime <= rec.lastEntryStart) return;` + `
` + `      rec.lastEntryStart = entry.startTime;` + `
` + `      rec.unpaired.push({` + `
` + `        start: entry.startTime,` + `
` + `        end: entry.responseEnd || entry.startTime,` + `
` + `` + `
` + `        bytes: entry.decodedBodySize || null,` + `
` + `      });` + `
` + `    }` + `
` + `` + `
` + `    function sweepEntries(ctx, rec) {` + `
` + `      if (typeof performance === "undefined" || !performance.getEntriesByName) {` + `
` + `        return;` + `
` + `      }` + `
` + `      const url = backendUrl(ctx);` + `
` + `      if (!url) return;` + `
` + `      let entries;` + `
` + `      try {` + `
` + `        entries = performance.getEntriesByName(url, "resource");` + `
` + `      } catch {` + `
` + `        return;` + `
` + `      }` + `
` + `` + `
` + `      const fresh = [];` + `
` + `      for (let i = entries.length - 1; i >= 0; i -= 1) {` + `
` + `        if (entries[i].startTime <= rec.lastEntryStart) break;` + `
` + `        fresh.push(entries[i]);` + `
` + `      }` + `
` + `      for (let i = fresh.length - 1; i >= 0; i -= 1) acceptEntry(rec, fresh[i]);` + `
` + `    }` + `
` + `` + `
` + `    function takeNetworkFor(rec, tRendered) {` + `
` + `      const unpaired = rec.unpaired;` + `
` + `      let index = -1;` + `
` + `      for (let i = unpaired.length - 1; i >= 0; i--) {` + `
` + `        if (unpaired[i].end <= tRendered) {` + `
` + `          index = i;` + `
` + `          break;` + `
` + `        }` + `
` + `      }` + `
` + `      if (index === -1) return null;` + `
` + `      const stale = unpaired.slice(0, index);` + `
` + `      const match = unpaired[index];` + `
` + `      rec.unpaired = unpaired.slice(index + 1);` + `
` + `      for (const entry of stale) pushUnrendered(rec, entry);` + `
` + `      return match;` + `
` + `    }` + `
` + `` + `
` + `    function flushStaleUnpaired(rec) {` + `
` + `      if (!rec.unpaired.length) return;` + `
` + `      const cutoff = now() - UNPAIRED_FLUSH_MS;` + `
` + `      const stale = rec.unpaired.filter((entry) => entry.end < cutoff);` + `
` + `      if (!stale.length) return;` + `
` + `      rec.unpaired = rec.unpaired.filter((entry) => entry.end >= cutoff);` + `
` + `      for (const entry of stale) pushUnrendered(rec, entry);` + `
` + `    }` + `
` + `` + `
` + `    function pushUnrendered(rec, entry) {` + `
` + `      pushRecord(rec, {` + `
` + `        ts: wallClockIso(entry.start),` + `
` + `        event: "",` + `
` + `        idSent: "",` + `
` + `        idReceived: "",` + `
` + `        app: "",` + `
` + `        reqBytes: null,` + `
` + `        respBytes: entry.bytes,` + `
` + `        backendMs: Math.round(entry.end - entry.start),` + `
` + `        renderMs: null,` + `
` + `        totalMs: null,` + `
` + `        systemActions: 0,` + `
` + `        customActions: 0,` + `
` + `        messages: [],` + `
` + `        rendered: false,` + `
` + `        request: null,` + `
` + `        response: null,` + `
` + `      });` + `
` + `` + `
` + `      rec.records.sort((a, b) => (a.ts < b.ts ? -1 : a.ts > b.ts ? 1 : 0));` + `
` + `    }` + `
` + `` + `
` + `    function extractMessages(response) {` + `
` + `      const custom = response?.S_FRONT?.S_ACTION?.T_CUSTOM;` + `
` + `      if (!Array.isArray(custom)) return [];` + `
` + `      const out = [];` + `
` + `      for (const item of custom) {` + `
` + `        if (!Array.isArray(item) || item[0] !== "CONTROL_GLOBAL") continue;` + `
` + `        const target = item[1];` + `
` + `        if (target !== "MESSAGE_TOAST" && target !== "MESSAGE_BOX") continue;` + `
` + `        let text = typeof item[3] === "string" ? item[3] : "";` + `
` + `        if (text.length > MAX_MESSAGE_CHARS) {` + `
` + `          text = \`\${text.slice(0, MAX_MESSAGE_CHARS)}...\`;` + `
` + `        }` + `
` + `        out.push({ target, method: item[2] || "", text });` + `
` + `      }` + `
` + `      return out;` + `
` + `    }` + `
` + `` + `
` + `    function recordBytes(record) {` + `
` + `      if (!record.request && !record.response) return 0;` + `
` + `      return (record.reqBytes || 0) + (record.respBytes || 0);` + `
` + `    }` + `
` + `` + `
` + `    function enforcePayloadBudget(rec) {` + `
` + `      for (const record of rec.records) {` + `
` + `        if (rec.payloadBytes <= PAYLOAD_BUDGET_BYTES) return;` + `
` + `        if (!record.request && !record.response) continue;` + `
` + `        rec.payloadBytes -= recordBytes(record);` + `
` + `        record.request = null;` + `
` + `        record.response = null;` + `
` + `        record.payloadEvicted = true;` + `
` + `      }` + `
` + `    }` + `
` + `` + `
` + `    function pushRecord(rec, record) {` + `
` + `      record.seq = rec.nextSeq++;` + `
` + `      rec.records.push(record);` + `
` + `      rec.payloadBytes += recordBytes(record);` + `
` + `      while (rec.records.length > MAX_RECORDS) {` + `
` + `        const dropped = rec.records.shift();` + `
` + `        rec.payloadBytes -= recordBytes(dropped);` + `
` + `      }` + `
` + `      enforcePayloadBudget(rec);` + `
` + `    }` + `
` + `` + `
` + `    function isRecordingPayloads() {` + `
` + `      return Persist.readFlag(PAYLOAD_FLAG_KEY);` + `
` + `    }` + `
` + `` + `
` + `    function setRecordingPayloads(ctx, enabled) {` + `
` + `      Persist.writeFlag(PAYLOAD_FLAG_KEY, enabled);` + `
` + `      if (!enabled) dropAllPayloads(recorderOf(ctx));` + `
` + `    }` + `
` + `` + `
` + `    function dropAllPayloads(rec) {` + `
` + `      if (!rec) return;` + `
` + `      for (const record of rec.records) {` + `
` + `        record.request = null;` + `
` + `        record.response = null;` + `
` + `      }` + `
` + `      rec.payloadBytes = 0;` + `
` + `    }` + `
` + `` + `
` + `    function measureRequest(ctx, oBody) {` + `
` + `      if (!oBody) return null;` + `
` + `      const known = ctx.state.lastRequestBytes;` + `
` + `      if (typeof known === "number") return known;` + `
` + `      try {` + `
` + `        return JSON.stringify({ value: oBody }).length;` + `
` + `      } catch {` + `
` + `        return null;` + `
` + `      }` + `
` + `    }` + `
` + `` + `
` + `    function onAfterRendering(ctx) {` + `
` + `      try {` + `
` + `        const rec = recorderOf(ctx);` + `
` + `        if (!rec) return;` + `
` + `        const state = ctx.state;` + `
` + `        const tRendered = now();` + `
` + `        sweepEntries(ctx, rec);` + `
` + `        const net = takeNetworkFor(rec, tRendered);` + `
` + `        const response = state.responseData;` + `
` + `        const sFront = response?.S_FRONT;` + `
` + `        const keepPayloads = isRecordingPayloads();` + `
` + `        const reqBytes = measureRequest(ctx, state.oBody);` + `
` + `` + `
` + `        pushRecord(rec, {` + `
` + `          ts: new Date().toISOString(),` + `
` + `          event: state.oBody?.S_FRONT?.EVENT || "",` + `
` + `          idSent: state.oBody?.S_FRONT?.ID || "",` + `
` + `          idReceived: sFront?.ID || "",` + `
` + `          app: sFront?.APP || "",` + `
` + `          reqBytes: reqBytes,` + `
` + `          respBytes: net?.bytes ?? null,` + `
` + `          backendMs: net ? Math.round(net.end - net.start) : null,` + `
` + `          renderMs: net ? Math.round(tRendered - net.end) : null,` + `
` + `          totalMs: net ? Math.round(tRendered - net.start) : null,` + `
` + `          systemActions: sFront?.S_ACTION?.T_SYSTEM?.length || 0,` + `
` + `          customActions: sFront?.S_ACTION?.T_CUSTOM?.length || 0,` + `
` + `` + `
` + `          messages: extractMessages(response),` + `
` + `          rendered: true,` + `
` + `` + `
` + `          request: keepPayloads ? state.oBody : null,` + `
` + `          response: keepPayloads ? response : null,` + `
` + `        });` + `
` + `        flushStaleUnpaired(rec);` + `
` + `      } catch (e) {` + `
` + `        Lib.logError("DevTools Recorder: onAfterRendering failed", e);` + `
` + `      }` + `
` + `    }` + `
` + `` + `
` + `    function withoutPayloads(record) {` + `
` + `      const copy = { ...record };` + `
` + `      delete copy.request;` + `
` + `      delete copy.response;` + `
` + `      return copy;` + `
` + `    }` + `
` + `` + `
` + `    function persist(rec) {` + `
` + `      const slim = rec.records.slice(-RELOAD_MAX_RECORDS).map((record) => ({` + `
` + `        ...withoutPayloads(record),` + `
` + `        previousLoad: true,` + `
` + `      }));` + `
` + `      Persist.saveList(RELOAD_KEY, slim);` + `
` + `    }` + `
` + `` + `
` + `    function restore(rec) {` + `
` + `      const stored = Persist.takeList(RELOAD_KEY);` + `
` + `      if (!stored.length) return;` + `
` + `      rec.records = stored.slice(-RELOAD_MAX_RECORDS);` + `
` + `` + `
` + `      rec.nextSeq = (rec.records[rec.records.length - 1]?.seq || 0) + 1;` + `
` + `    }` + `
` + `` + `
` + `    function install(ctx) {` + `
` + `      if (!ctx?.devtools || recorderOf(ctx)) return;` + `
` + `      const rec = createRecorder();` + `
` + `      ctx.devtools.recorder = rec;` + `
` + `      restore(rec);` + `
` + `      rec.afterRenderingHook = () => onAfterRendering(ctx);` + `
` + `      Lib.registerCallback(ctx, "onAfterRendering", rec.afterRenderingHook);` + `
` + `` + `
` + `      rec.onPageHide = () => persist(rec);` + `
` + `      window.addEventListener("pagehide", rec.onPageHide);` + `
` + `` + `
` + `      if (typeof PerformanceObserver === "undefined") return;` + `
` + `      try {` + `
` + `        rec.observer = new PerformanceObserver((list) => {` + `
` + `          const url = backendUrl(ctx);` + `
` + `          if (!url) return;` + `
` + `          for (const entry of list.getEntries()) {` + `
` + `            if (entry.name === url) acceptEntry(rec, entry);` + `
` + `          }` + `
` + `        });` + `
` + `` + `
` + `        rec.observer.observe({ type: "resource", buffered: true });` + `
` + `      } catch {` + `
` + `        rec.observer = null;` + `
` + `      }` + `
` + `    }` + `
` + `` + `
` + `    function uninstall(ctx) {` + `
` + `      const rec = recorderOf(ctx);` + `
` + `      if (!rec) return;` + `
` + `      ctx.devtools.recorder = null;` + `
` + `      Lib.unregisterCallback(ctx, "onAfterRendering", rec.afterRenderingHook);` + `
` + `      rec.afterRenderingHook = null;` + `
` + `      if (rec.onPageHide) {` + `
` + `        window.removeEventListener("pagehide", rec.onPageHide);` + `
` + `        rec.onPageHide = null;` + `
` + `      }` + `
` + `      if (rec.observer) {` + `
` + `        try {` + `
` + `          rec.observer.disconnect();` + `
` + `        } catch {}` + `
` + `        rec.observer = null;` + `
` + `      }` + `
` + `    }` + `
` + `` + `
` + `    function getRecords(ctx) {` + `
` + `      const rec = recorderOf(ctx);` + `
` + `      if (!rec) return [];` + `
` + `      flushStaleUnpaired(rec);` + `
` + `      return rec.records;` + `
` + `    }` + `
` + `` + `
` + `    function pad(value, width, right) {` + `
` + `      const text = value === null || value === undefined ? "-" : String(value);` + `
` + `      if (text.length >= width) return text;` + `
` + `      const fill = " ".repeat(width - text.length);` + `
` + `      return right ? fill + text : text + fill;` + `
` + `    }` + `
` + `` + `
` + `    function formatMs(ms) {` + `
` + `      return ms === null || ms === undefined ? "-" : \`\${ms} ms\`;` + `
` + `    }` + `
` + `` + `
` + `    function shortId(id) {` + `
` + `      if (!id) return "-";` + `
` + `      return id.length > 8 ? \`..\${id.slice(-6)}\` : id;` + `
` + `    }` + `
` + `` + `
` + `    function navigationLines(list) {` + `
` + `      const hops = [];` + `
` + `      let previous = null;` + `
` + `      for (const record of list) {` + `
` + `        if (!record.app || record.app === previous) continue;` + `
` + `        hops.push({` + `
` + `          seq: record.seq,` + `
` + `          from: previous,` + `
` + `          to: record.app,` + `
` + `          event: record.event,` + `
` + `          draft: record.idReceived,` + `
` + `        });` + `
` + `        previous = record.app;` + `
` + `      }` + `
` + `      if (hops.length < 2) return [];` + `
` + `      const out = ["App navigation observed this session"];` + `
` + `      for (const hop of hops) {` + `
` + `        out.push(` + `
` + `          \`  #\${String(hop.seq).padEnd(4)}\` +` + `
` + `            \`\${hop.from ? \`\${hop.from} -> \` : "start "}\${hop.to}\` +` + `
` + `            \`\${hop.event ? \`   via \${hop.event}\` : ""}\` +` + `
` + `            \`   draft \${shortId(hop.draft)}\`,` + `
` + `        );` + `
` + `      }` + `
` + `      out.push("");` + `
` + `      return out;` + `
` + `    }` + `
` + `` + `
` + `    function summaryLines(list) {` + `
` + `      const timed = list.filter((r) => r.backendMs !== null);` + `
` + `      if (!timed.length) return [];` + `
` + `      const out = ["Summary"];` + `
` + `      const backend = timed.map((r) => r.backendMs);` + `
` + `      const avg = Math.round(` + `
` + `        backend.reduce((a, b) => a + b, 0) / backend.length,` + `
` + `      );` + `
` + `      const slowest = timed.reduce((a, b) =>` + `
` + `        b.backendMs > a.backendMs ? b : a,` + `
` + `      );` + `
` + `      out.push(` + `
` + `        \`  Backend: avg \${avg} ms over \${timed.length} roundtrip(s),\` +` + `
` + `          \` slowest #\${slowest.seq} \${slowest.event || "(start)"}\` +` + `
` + `          \` at \${slowest.backendMs} ms\`,` + `
` + `      );` + `
` + `      const sized = list.filter((r) => r.respBytes !== null);` + `
` + `      if (sized.length) {` + `
`;
    result = result + `        const biggest = sized.reduce((a, b) =>` + `
` + `          b.respBytes > a.respBytes ? b : a,` + `
` + `        );` + `
` + `        const total = sized.reduce((sum, r) => sum + r.respBytes, 0);` + `
` + `        out.push(` + `
` + `          \`  Response: \${formatBytes(total)} total,\` +` + `
` + `            \` largest #\${biggest.seq} \${biggest.event || "(start)"}\` +` + `
` + `            \` at \${formatBytes(biggest.respBytes)}\`,` + `
` + `        );` + `
` + `      }` + `
` + `      const failed = list.filter((r) => !r.rendered).length;` + `
` + `      if (failed) {` + `
` + `        out.push(\`  \${failed} roundtrip(s) never reached the render phase.\`);` + `
` + `      }` + `
` + `      return out;` + `
` + `    }` + `
` + `` + `
` + `    function formatHistory(ctx) {` + `
` + `      const list = getRecords(ctx);` + `
` + `      const lines = [];` + `
` + `      lines.push(` + `
` + `        \`Roundtrip history - \${list.length} of max \${MAX_RECORDS} records\`,` + `
` + `      );` + `
` + `      const recording = isRecordingPayloads();` + `
` + `      lines.push(` + `
` + `        \`Payload recording: \${recording ? "ON" : "OFF"}\` +` + `
` + `          \` (retained \${formatBytes(recorderOf(ctx)?.payloadBytes || 0)} of \` +` + `
` + `          \`\${formatBytes(PAYLOAD_BUDGET_BYTES)} budget)\`,` + `
` + `      );` + `
` + `      if (!recording) {` + `
` + `        lines.push(` + `
` + `          \`Switch "Record Payloads" on to keep request/response bodies and\` +` + `
` + `            \` enable the Model Diff and View Diff tabs.\`,` + `
` + `        );` + `
` + `      }` + `
` + `      lines.push("");` + `
` + `      if (!list.length) {` + `
` + `        lines.push("(no roundtrip recorded yet)");` + `
` + `        return lines.join("\\n");` + `
` + `      }` + `
` + `` + `
` + `      lines.push(` + `
` + `        pad("#", 5) +` + `
` + `          pad("TIME", 14) +` + `
` + `          pad("EVENT", 22) +` + `
` + `          pad("TOTAL", 10, true) +` + `
` + `          pad("BACKEND", 10, true) +` + `
` + `          pad("RENDER", 10, true) +` + `
` + `          pad("REQ", 10, true) +` + `
` + `          pad("RESP", 10, true) +` + `
` + `          "  " +` + `
` + `          pad("DRAFT", 10) +` + `
` + `          pad("ACT", 8) +` + `
` + `          "PAYLOAD",` + `
` + `      );` + `
` + `      lines.push("-".repeat(118));` + `
` + `` + `
` + `      for (const record of list) {` + `
` + `        const time = record.ts.slice(11, 23);` + `
` + `        const actions = \`\${record.systemActions}/\${record.customActions}\`;` + `
` + `        let payload = "-";` + `
` + `        if (record.request || record.response) payload = "kept";` + `
` + `        else if (record.payloadEvicted) payload = "evicted";` + `
` + `        lines.push(` + `
` + `          pad(record.previousLoad ? \`\${record.seq}*\` : record.seq, 5) +` + `
` + `            pad(time, 14) +` + `
` + `            pad(` + `
` + `              record.rendered ? record.event || "(start)" : "(no render)",` + `
` + `              22,` + `
` + `            ) +` + `
` + `            pad(formatMs(record.totalMs), 10, true) +` + `
` + `            pad(formatMs(record.backendMs), 10, true) +` + `
` + `            pad(formatMs(record.renderMs), 10, true) +` + `
` + `            pad(formatBytes(record.reqBytes), 10, true) +` + `
` + `            pad(formatBytes(record.respBytes), 10, true) +` + `
` + `            "  " +` + `
` + `            pad(shortId(record.idReceived), 10) +` + `
` + `            pad(actions, 8) +` + `
` + `            payload,` + `
` + `        );` + `
` + `      }` + `
` + `` + `
` + `      lines.push("");` + `
` + `      lines.push(...navigationLines(list));` + `
` + `      lines.push(...summaryLines(list));` + `
` + `      lines.push("");` + `
` + `      lines.push(` + `
` + `        "TOTAL = request start to rendered, BACKEND = network + ABAP," +` + `
` + `          " RENDER = response end to rendered.",` + `
` + `      );` + `
` + `      lines.push(` + `
` + `        "ACT = system/custom action counts. A '(no render)' row is a" +` + `
` + `          " roundtrip that never reached the render phase",` + `
` + `      );` + `
` + `` + `
` + `      lines.push(` + `
` + `        "(error response, aborted request, or a parallel request whose" +` + `
` + `          " result was discarded as stale).",` + `
` + `      );` + `
` + `      if (list.some((record) => record.previousLoad)) {` + `
` + `        lines.push(` + `
` + `          "A '*' after the number marks a roundtrip of the PREVIOUS page" +` + `
` + `            " load, carried across the reload.",` + `
` + `        );` + `
` + `      }` + `
` + `      return lines.join("\\n");` + `
` + `    }` + `
` + `` + `
` + `    function displayedXml(response, slotKey) {` + `
` + `      const system = response?.S_FRONT?.S_ACTION?.T_SYSTEM;` + `
` + `      if (!Array.isArray(system)) return "";` + `
` + `      for (const item of system) {` + `
` + `        if (!Array.isArray(item)) continue;` + `
` + `        if (item[0] !== "VIEW_SLOTS" || item[1] !== "display") continue;` + `
` + `        if (item[2] !== slotKey) continue;` + `
` + `        if (typeof item[3] === "string") return item[3];` + `
` + `      }` + `
` + `      return "";` + `
` + `    }` + `
` + `` + `
` + `    function lastTwoViews(ctx, slotKey) {` + `
` + `      const records = getRecords(ctx);` + `
` + `      const withView = [];` + `
` + `      for (let i = records.length - 1; i >= 0 && withView.length < 2; i--) {` + `
` + `        const xml = displayedXml(records[i].response, slotKey);` + `
` + `        if (xml) withView.unshift({ record: records[i], xml });` + `
` + `      }` + `
` + `      return withView.length < 2 ? null : withView;` + `
` + `    }` + `
` + `` + `
` + `    function formatViewDiff(ctx) {` + `
` + `      if (!isRecordingPayloads()) {` + `
` + `        return (` + `
` + `          "View diff needs payload recording.\\n\\n" +` + `
` + `          'Switch "Record Payloads" on in the Roundtrips action bar, then' +` + `
` + `          " trigger at least two roundtrips that rebuild the view - the diff\\n" +` + `
` + `          "compares the view XML of the two most recently recorded rebuilds."` + `
` + `        );` + `
` + `      }` + `
` + `` + `
` + `      const pair = lastTwoViews(ctx, "MAIN");` + `
` + `      if (!pair) {` + `
` + `        return (` + `
` + `          "Not enough recorded view rebuilds yet - the diff needs two.\\n\\n" +` + `
` + `          "Only a response that actually rebuilt the MAIN view counts; a\\n" +` + `
` + `          "roundtrip that only pushed the model does not."` + `
` + `        );` + `
` + `      }` + `
` + `      const [previous, current] = pair;` + `
` + `      const out = [` + `
` + `        \`View XML diff: roundtrip #\${previous.record.seq}\` +` + `
` + `          \` (\${previous.record.event || "(start)"}) ->\` +` + `
` + `          \` #\${current.record.seq} (\${current.record.event || "(start)"})\`,` + `
` + `        "",` + `
` + `      ];` + `
` + `      const changes = diffLines(` + `
` + `        prettifyForDiff(previous.xml),` + `
` + `        prettifyForDiff(current.xml),` + `
` + `      );` + `
` + `      if (!changes.length) {` + `
` + `        out.push("(the two rebuilds produced identical view XML)");` + `
` + `        return out.join("\\n");` + `
` + `      }` + `
` + `      out.push(` + `
` + `        \`\${changes.length}\${changes.length >= MAX_DIFF_ENTRIES ? "+" : ""} changed line(s):\`,` + `
` + `      );` + `
` + `      out.push("");` + `
` + `      for (const change of changes) {` + `
` + `        out.push(` + `
` + `          \`  \${change.type} \${String(change.number).padStart(5)}  \` +` + `
` + `            \`\${change.line.trim()}\`,` + `
` + `        );` + `
` + `      }` + `
` + `      if (changes.length >= MAX_DIFF_ENTRIES) {` + `
` + `        out.push("");` + `
` + `        out.push(\`(stopped after \${MAX_DIFF_ENTRIES} changes)\`);` + `
` + `      }` + `
` + `      return out.join("\\n");` + `
` + `    }` + `
` + `` + `
` + `    function prettifyForDiff(xml) {` + `
` + `      return xml.replace(/></g, ">\\n<");` + `
` + `    }` + `
` + `` + `
` + `    function lastTwoResponses(ctx) {` + `
` + `      const withPayload = getRecords(ctx).filter((record) => record.response);` + `
` + `      if (withPayload.length < 2) return null;` + `
` + `      return withPayload.slice(-2);` + `
` + `    }` + `
` + `` + `
` + `    function formatModelDiff(ctx) {` + `
` + `      if (!isRecordingPayloads()) {` + `
` + `        return (` + `
` + `          "Model diff needs payload recording.\\n\\n" +` + `
` + `          'Switch "Record Payloads" on in the Roundtrips action bar, then' +` + `
` + `          " trigger at least two roundtrips - the diff compares the MODEL of\\n" +` + `
` + `          "the two most recently recorded responses."` + `
` + `        );` + `
` + `      }` + `
` + `      const pair = lastTwoResponses(ctx);` + `
` + `      if (!pair) {` + `
` + `        return (` + `
` + `          "Not enough recorded responses yet - the diff needs two.\\n\\n" +` + `
` + `          "Trigger another roundtrip and reopen this tab."` + `
` + `        );` + `
` + `      }` + `
` + `      const [previous, current] = pair;` + `
` + `      const out = collectDiff(` + `
` + `        previous.response?.MODEL,` + `
` + `        current.response?.MODEL,` + `
` + `      );` + `
` + `` + `
` + `      const header = [` + `
` + `        \`Model diff: roundtrip #\${previous.seq} (\${previous.event || "(start)"})\` +` + `
` + `          \` -> #\${current.seq} (\${current.event || "(start)"})\`,` + `
` + `        "",` + `
` + `      ];` + `
` + `      if (!out.length) {` + `
` + `        header.push("(the two responses carry an identical MODEL)");` + `
` + `        return header.join("\\n");` + `
` + `      }` + `
` + `      header.push(` + `
` + `        \`\${out.length}\${out.length >= MAX_DIFF_ENTRIES ? "+" : ""}\` +` + `
` + `          \` differing path(s):\`,` + `
` + `      );` + `
` + `      header.push("");` + `
` + `      for (const entry of out) {` + `
` + `        const path = entry.path || "/";` + `
` + `        if (entry.type === "added") {` + `
` + `          header.push(\`+ \${path}\`);` + `
` + `          header.push(\`    \${renderValue(entry.after, MAX_DIFF_VALUE_CHARS)}\`);` + `
` + `        } else if (entry.type === "removed") {` + `
` + `          header.push(\`- \${path}\`);` + `
` + `          header.push(\`    \${renderValue(entry.before, MAX_DIFF_VALUE_CHARS)}\`);` + `
` + `        } else {` + `
` + `          header.push(\`~ \${path}\`);` + `
` + `          header.push(` + `
` + `            \`    before: \${renderValue(entry.before, MAX_DIFF_VALUE_CHARS)}\`,` + `
` + `          );` + `
` + `          header.push(` + `
` + `            \`    after:  \${renderValue(entry.after, MAX_DIFF_VALUE_CHARS)}\`,` + `
` + `          );` + `
` + `        }` + `
` + `      }` + `
` + `      if (out.length >= MAX_DIFF_ENTRIES) {` + `
` + `        header.push("");` + `
` + `        header.push(\`(stopped after \${MAX_DIFF_ENTRIES} differences)\`);` + `
` + `      }` + `
` + `      return header.join("\\n");` + `
` + `    }` + `
` + `` + `
` + `    function exportJson(ctx) {` + `
` + `      const records = getRecords(ctx);` + `
` + `      const payload = {` + `
` + `        exportedAt: new Date().toISOString(),` + `
` + `        payloadsRecorded: isRecordingPayloads(),` + `
` + `        records,` + `
` + `      };` + `
` + `      try {` + `
` + `        return JSON.stringify(payload, null, 2);` + `
` + `      } catch {` + `
` + `        const metaOnly = records.map(withoutPayloads);` + `
` + `        return JSON.stringify({ ...payload, records: metaOnly }, null, 2);` + `
` + `      }` + `
` + `    }` + `
` + `` + `
` + `    return {` + `
` + `      install,` + `
` + `      uninstall,` + `
` + `      getRecords,` + `
` + `      exportJson,` + `
` + `      isRecordingPayloads,` + `
` + `      setRecordingPayloads,` + `
` + `      formatHistory,` + `
` + `      formatModelDiff,` + `
` + `      formatViewDiff,` + `
` + `` + `
` + `      _internals: { MAX_RECORDS, PAYLOAD_BUDGET_BYTES, PAYLOAD_FLAG_KEY },` + `
` + `    };` + `
` + `  },` + `
` + `);` + `
` + `` + `
` + ``;
    return result;
  }
}

module.exports = z2ui5_cl_ui5f_recorder_js;

