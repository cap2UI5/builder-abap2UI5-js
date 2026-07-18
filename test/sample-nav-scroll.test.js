/**
 * Wire-level regression for the starter-sample flow the live site exposes:
 * start z2ui5_cl_sample_app_001, jump into a sample (tile press sends the
 * classname as EVENT + the current scroll position in CONFIG.S_SCROLL),
 * nav back — the sample must be back on screen AND restore the scroll
 * position via a fully-formatted SCROLL_TO follow-up action (a bare
 * "SCROLL_TO" without arguments was the broken-scroll bug).
 */
const path = require("path");

const core = (p) => require(path.join(__dirname, "..", "core", "srv", "z2ui5", p));

describe("sample_app_001 — jump-in and scroll restore", () => {
  jest.setTimeout(30000);

  const S = (o) => ({ ORIGIN: "http://x", PATHNAME: "/", SEARCH: "", HASH: "", ...o });

  test("tile press navigates, nav-back restores the scroll position", async () => {
    const draft = core("01/01/z2ui5_cl_core_srv_draft");
    const types = core("01/02/z2ui5_if_core_types");
    const mem = new Map();
    draft.set_store({ load: async (id) => mem.get(id), save: async (e) => void mem.set(e.id, e) });
    const handler = core("02/z2ui5_cl_http_handler");

    const start = await handler({ data: { value: { S_FRONT: S({ SEARCH: "?app_start=z2ui5_cl_sample_app_001" }) } } });
    expect(start.S_FRONT.APP).toBe("z2ui5_cl_sample_app_001");

    const nav = await handler({
      data: {
        value: {
          S_FRONT: S({
            ID: start.S_FRONT.ID,
            EVENT: "Z2UI5_CL_DEMO_APP_004",
            CONFIG: { S_SCROLL: { MAIN: { ID: "page", X: 0, Y: 333 } } },
          }),
        },
      },
    });
    expect(nav.S_FRONT.APP).toBe("z2ui5_cl_demo_app_004");

    const back = await handler({
      data: { value: { S_FRONT: S({ ID: nav.S_FRONT.ID, EVENT: types.cs_event_nav_app_leave }) } },
    });
    expect(back.S_FRONT.APP).toBe("z2ui5_cl_sample_app_001");
    expect(back.S_FRONT.PARAMS.S_FOLLOW_UP_ACTION.CUSTOM_JS).toContain(".eF('SCROLL_TO','page','333','0')");
  });

  test("startup app links the starter sample in What's next", async () => {
    const draft = core("01/01/z2ui5_cl_core_srv_draft");
    const mem = new Map();
    draft.set_store({ load: async (id) => mem.get(id), save: async (e) => void mem.set(e.id, e) });
    const handler = core("02/z2ui5_cl_http_handler");

    const r = await handler({ data: { value: { S_FRONT: S({}) } } });
    expect(r.S_FRONT.APP).toBe("z2ui5_cl_app_startup");
    // the What's-next button opens the starter sample (upstream behavior)
    expect(r.S_FRONT.PARAMS.S_VIEW.XML).toContain("z2ui5_cl_sample_app_001");
  });
});
