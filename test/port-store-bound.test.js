// The sync port store is a bounded cache in front of the platform store.
//
// A 2026-08 review read the two draft paths — the async platform store wired
// through engine.set_store(), and the synchronous ABAP-shaped methods going
// through z2ui5_port — as two rival stores with only one wired, and called it
// the largest correctness defect in the app. It is actually a deliberate
// composition: db_load tries the process buffer, then this store synchronously
// (because transpiled ABAP cannot await), then falls through to the durable
// store. A miss is a fall-through, not a wrong answer.
//
// What WAS a real defect: the cache was unbounded, so a long-running server
// accumulated every draft payload it had ever written, duplicating in RAM what
// the database already held. These tests pin the bound and the fall-through
// property that makes evicting safe.
"use strict";

const path = require("path");

const PORT = path.join(__dirname, "..", "core", "srv", "z2ui5", "z2ui5_port.js");

// The cap is read per call, so the env can simply be set for the test and
// cleared afterwards — no module-registry juggling needed.
const ENV = "Z2UI5_PORT_MAX_ROWS";
const savedEnv = process.env[ENV];

function freshPort(env = {}) {
  if (ENV in env) process.env[ENV] = env[ENV]; else delete process.env[ENV];
  const mod = require(PORT);
  mod._reset();
  return mod;
}

afterEach(() => {
  if (savedEnv === undefined) delete process.env[ENV]; else process.env[ENV] = savedEnv;
  require(PORT)._reset();
});

describe("the in-memory table set is bounded", () => {
  test("keeps at most the cap, evicting the oldest rows first", () => {
    const port = freshPort({ [ENV]: "10" });


    for (let i = 0; i < 25; i++) {
      port.db({ op: "modify", table: "z2ui5_t_01", row: { id: `D${i}`, data: "x".repeat(64) } });
    }

    const rows = port.db({ op: "select_table", table: "z2ui5_t_01", fields: [], where: [] });
    expect(rows).toHaveLength(10);
    // the survivors are the newest ones
    expect(rows.map((r) => r.id)).toEqual(
      Array.from({ length: 10 }, (_, i) => `D${15 + i}`),
    );
  });

  test("an evicted id reads as absent rather than as a wrong row", () => {
    // This is the property that makes eviction safe: the caller falls through
    // to the durable store instead of being handed stale or foreign data.
    const port = freshPort({ [ENV]: "3" });


    for (const id of ["A", "B", "C", "D"]) {
      port.db({ op: "modify", table: "z2ui5_t_01", row: { id, data: "payload" } });
    }

    const gone = port.db({
      op: "select_single", table: "z2ui5_t_01", fields: [],
      where: [{ field: "id", op: "eq", value: "A" }],
    });
    expect(gone).toBeUndefined();
    expect(port.sy_subrc).toBe(4);

    const kept = port.db({
      op: "select_single", table: "z2ui5_t_01", fields: [],
      where: [{ field: "id", op: "eq", value: "D" }],
    });
    expect(kept).toMatchObject({ id: "D" });
    expect(port.sy_subrc).toBe(0);
  });

  test("updating an existing row does not count as growth", () => {
    const port = freshPort({ [ENV]: "5" });


    for (let i = 0; i < 20; i++) {
      port.db({ op: "modify", table: "z2ui5_t_01", row: { id: "SAME", data: `v${i}` } });
    }

    const rows = port.db({ op: "select_table", table: "z2ui5_t_01", fields: [], where: [] });
    expect(rows).toHaveLength(1);
    expect(rows[0].data).toBe("v19");
  });

  test("the cap can be disabled deliberately", () => {
    const port = freshPort({ [ENV]: "0" });

    for (let i = 0; i < 50; i++) {
      port.db({ op: "modify", table: "z2ui5_t_01", row: { id: `X${i}` } });
    }
    expect(port.db({ op: "select_table", table: "z2ui5_t_01", fields: [], where: [] })).toHaveLength(50);
  });

  test("each table is bounded on its own", () => {
    const port = freshPort({ [ENV]: "4" });

    for (let i = 0; i < 10; i++) {
      port.db({ op: "modify", table: "z2ui5_t_01", row: { id: `A${i}` } });
      port.db({ op: "modify", table: "z2ui5_t_91", row: { id: `B${i}` } });
    }
    expect(port.db({ op: "select_table", table: "z2ui5_t_01", fields: [], where: [] })).toHaveLength(4);
    expect(port.db({ op: "select_table", table: "z2ui5_t_91", fields: [], where: [] })).toHaveLength(4);
  });
});

describe("a wired platform store replaces the cache entirely", () => {
  test("set_store swaps the backend, and _reset restores the default", () => {
    const port = freshPort();
    const calls = [];
    port.set_store({
      select: (t, w) => { calls.push(["select", t, w]); return [{ id: "FROM_PLATFORM" }]; },
      upsert: (t, r) => calls.push(["upsert", t, r]),
      remove: () => 0,
    });

    const rows = port.db({ op: "select_table", table: "z2ui5_t_01", fields: [], where: [] });
    expect(rows).toEqual([{ id: "FROM_PLATFORM" }]);
    expect(calls[0][0]).toBe("select");

    port._reset();
    expect(port.db({ op: "select_table", table: "z2ui5_t_01", fields: [], where: [] })).toEqual([]);
  });
});
