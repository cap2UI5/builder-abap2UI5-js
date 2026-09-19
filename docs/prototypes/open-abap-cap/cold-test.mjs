// THE COLD TEST — does app state survive a process restart?
//
// Process A boots CAP, runs roundtrip 1, and is KILLED. Process B is a fresh
// boot: new ABAP runtime, empty app_cont buffer, nothing in memory. It gets the
// draft id and must answer correctly. The only thing bridging the two is the
// row in cap2ui5.Drafts - a normal CDS entity in a file-backed database.
//
// This is what the earlier spikes could not show: the JS-serializer probe kept
// the live object in a Map, and the JS-app probe shared one runtime.
import { spawn } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";

let PORT = 5000 + Math.floor(Math.random() * 2000);                 // fresh port per boot: npx spawns a child, so
const url = () => `http://127.0.0.1:${PORT}/rest/root/z2ui5`;  // killing the wrapper
// leaves the real server listening. The DB FILE bridges the processes, not the port.

async function boot(label) {
  PORT += 1;
  const p = spawn("npx", ["cds-serve"], {
    env: { ...process.env, PORT: String(PORT) },
    stdio: ["ignore", "pipe", "pipe"],
  });
  let out = "";
  p.stdout.on("data", (d) => (out += d));
  p.stderr.on("data", (d) => (out += d));
  for (let i = 0; i < 60; i++) {
    await sleep(1000);
    if (out.includes("server listening")) {
      console.log(`  [${label}] up after ${i + 1}s`);
      return { p, out: () => out };
    }
    if (p.exitCode !== null) throw new Error(`${label} died:\n${out.slice(-1500)}`);
  }
  throw new Error(`${label} never started:\n${out.slice(-1500)}`);
}

const post = async (appName, id, event, model) => {
  const body = { value: { S_FRONT: {
    ID: id || "", APP: appName, EVENT: event || "", T_EVENT_ARG: [],
    ORIGIN: "http://127.0.0.1", PATHNAME: "/rest/root/z2ui5",
    SEARCH: id ? "" : `?app_start=${appName}`, HASH: "", CONFIG: {} },
    XX: {}, MODEL: model || {} } };
  const r = await fetch(url(), { method: "POST",
    headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  const t = await r.text();
  try { return JSON.parse(t); } catch { return { __raw: t.slice(0, 400) }; }
};

const act = (r) => JSON.stringify(r?.S_FRONT?.S_ACTION?.T_SYSTEM?.[0]
  ?? r?.S_FRONT?.S_ACTION?.T_CUSTOM?.[0] ?? r?.__raw ?? null)?.slice(0, 130);

const run = async (app, expect) => {
  console.log(`\n=== ${app} ===`);
  let s = await boot("process A");
  const r1 = await post(app);
  const id = r1?.S_FRONT?.ID;
  console.log(`  A roundtrip 1  MODEL=${JSON.stringify(r1?.MODEL)}  id=${id}`);
  console.log(`                 ${act(r1)}`);
  if (s.out().includes("[store]")) console.log("  store installed: yes");
  s.p.kill("SIGKILL");
  await sleep(2500);
  console.log("  --- process A killed, nothing left in memory ---");

  s = await boot("process B");
  const r2 = await post(app, id, app.startsWith("ZCL_JS") ? "GO" : "BUTTON_POST", { NAME: "Ada" });
  console.log(`  B roundtrip 2  ${act(r2)}`);
  s.p.kill("SIGKILL");
  await sleep(1500);
  const ok = JSON.stringify(r2).includes(expect);
  console.log(`  RESULT: ${ok ? "state SURVIVED the restart" : "state LOST"}`);
  return ok;
};

const ctl = await run("z2ui5_cl_ui5_app_hi_world", "Your name is Ada");   // control
const js = await run("ZCL_JS_HELLO", "Hello Ada");                        // subject

console.log(`\nVERDICT  control=${ctl ? "ok" : "BROKEN"}  js-app-cold-restart=${js}`);
process.exit(0);
