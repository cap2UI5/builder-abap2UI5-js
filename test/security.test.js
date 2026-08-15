// Security regression tests for the dynamic class-resolution hardening:
//   - class names are validated before they reach path.join()+require(),
//     closing the ?app_start= path-traversal into an arbitrary module;
//   - draft deserialization resolves the app strictly by (validated) class
//     name and ignores the persisted __filePath, so a crafted draft can't
//     require() an attacker-chosen path.
const z2ui5_cl_util = require("../core/srv/z2ui5/00/03/z2ui5_cl_util");
const z2ui5_cl_ui5_srv_draft = require("../core/srv/z2ui5/01/01/z2ui5_cl_ui5_srv_draft");

describe("class-name validation (_is_safe_class_name)", () => {
  test("accepts bare ABAP-style names, rejects everything else", () => {
    for (const ok of ["z2ui5_cl_ui5_app_hi_world", "ZCL_APP_1", "a", "cls123"]) {
      expect(z2ui5_cl_util._is_safe_class_name(ok)).toBe(true);
    }
    for (const bad of [
      "../evil",
      "../../etc/passwd",
      "a/b",
      "a.b",
      "cls-1",
      "cls 1",
      "cls$",
      "",
      null,
      undefined,
      42,
    ]) {
      expect(z2ui5_cl_util._is_safe_class_name(bad)).toBe(false);
    }
  });
});

describe("dynamic class resolution rejects traversal", () => {
  test("_findClassFile returns null for a traversing name", () => {
    expect(z2ui5_cl_util._findClassFile("../../../../etc/passwd")).toBeNull();
    expect(z2ui5_cl_util._findClassFile("../z2ui5_cl_util")).toBeNull();
  });

  test("rtti_get_class / rtti_check_class_exists refuse unsafe names", () => {
    expect(z2ui5_cl_util.rtti_get_class("../../../../etc/passwd")).toBeNull();
    expect(z2ui5_cl_util.rtti_check_class_exists("../secret")).toBe(false);
  });
});

describe("draft deserialization", () => {
  test("throws on an unsafe persisted __className", () => {
    const forged = JSON.stringify({ __className: "../../../../etc/passwd", x: 1 });
    expect(() => z2ui5_cl_ui5_srv_draft.deserialize(forged)).toThrow(/unsafe class name/i);
  });

  test("ignores __filePath and resolves the class from the registry", () => {
    class z2ui5_test_secapp {}
    z2ui5_cl_util.register_app_class("z2ui5_test_secapp", z2ui5_test_secapp);
    const draft = JSON.stringify({
      __className: "z2ui5_test_secapp",
      __filePath: "../../../../../../tmp/evil", // must NOT be require()d
      marker: "ok",
    });
    const app = z2ui5_cl_ui5_srv_draft.deserialize(draft);
    expect(app).toBeInstanceOf(z2ui5_test_secapp);
    expect(app.marker).toBe("ok");
  });

  test("throws when a (safe) class name cannot be resolved anywhere", () => {
    const draft = JSON.stringify({ __className: "z2ui5_no_such_class_xyz", x: 1 });
    expect(() => z2ui5_cl_ui5_srv_draft.deserialize(draft)).toThrow(/not found/i);
  });
});
