// GENERATED from run/input/abap2UI5/src/00/03/z2ui5_cx_ui5_util_error.clas.testclasses.abap — do not edit
const cl_abap_unit_assert = require("abap2UI5/cl_abap_unit_assert");
const z2ui5_cl_ui5_util_context = require("abap2UI5/z2ui5_cl_ui5_util_context");
const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");
const z2ui5_cx_ui5_util_error = require("abap2UI5/z2ui5_cx_ui5_util_error");


class ltcl_unit_test {
  test_raise() {
    let lx;
    try {
      throw new z2ui5_cx_ui5_util_error({ val: `this is an error text` });
    } catch (_caught1) {
      lx = _caught1;
      cl_abap_unit_assert.assert_equals({ exp: `this is an error text`, act: lx.get_text() });
    }
  }

  test_raise_empty() {
    let lx;
    try {
      throw new z2ui5_cx_ui5_util_error();
    } catch (_caught1) {
      lx = _caught1;
      cl_abap_unit_assert.assert_bound(lx);
      cl_abap_unit_assert.assert_equals({ exp: `UNKNOWN_ERROR`, act: lx.get_text() });
    }
  }

  test_raise_with_prev() {
    let lx;
    let lv_text;
    const lx_prev = new z2ui5_cx_ui5_util_error({ val: `previous error` });
    try {
      throw new z2ui5_cx_ui5_util_error({ val: `current error`, previous: lx_prev });
    } catch (_caught1) {
      lx = _caught1;
      lv_text = lx.get_text();
      cl_abap_unit_assert.assert_true((String(lv_text).toLowerCase().includes(String(`current error`).toLowerCase())));
      cl_abap_unit_assert.assert_true((String(lv_text).toLowerCase().includes(String(`previous error`).toLowerCase())));
    }
  }

  test_raise_with_cx() {
    let lv_val;
    let lx_root;
    let lx;
    try {
      lv_val = z2ui5_cl_util.abap_div(1, 0);
    } catch (_caught1) {
      lx_root = _caught1;
    }
    try {
      throw new z2ui5_cx_ui5_util_error({ val: lx_root });
    } catch (_caught2) {
      lx = _caught2;
      cl_abap_unit_assert.assert_not_initial(lx.get_text());
      cl_abap_unit_assert.assert_bound(lx.ms_error.x_root);
    }
  }

  test_uuid_populated() {
    let lx;
    let lv_text;
    try {
      throw new z2ui5_cx_ui5_util_error({ val: `test` });
    } catch (_caught1) {
      lx = _caught1;
      cl_abap_unit_assert.assert_initial(lx.ms_error.uuid);
      lv_text = z2ui5_cx_ui5_util_error.get_text_full({ val: lx });
      cl_abap_unit_assert.assert_not_initial(lx.ms_error.uuid);
      cl_abap_unit_assert.assert_equals({ exp: 32, act: lx.ms_error.uuid.length });
      cl_abap_unit_assert.assert_true((String(lv_text).toLowerCase().includes(String(lx.ms_error.uuid).toLowerCase())));
    }
  }

  test_structured_val_no_dump() {
    let lx;
    let ls_probe = { a: 0, b: `` };
    ls_probe.a = 1;
    ls_probe.b = `not printable as a whole`;
    try {
      throw new z2ui5_cx_ui5_util_error({ val: ls_probe });
    } catch (_caught1) {
      lx = _caught1;
      cl_abap_unit_assert.assert_equals({ exp: `UNKNOWN_ERROR`, act: lx.get_text() });
    }
  }

  test_chain_texts() {
    const lx_inner = new z2ui5_cx_ui5_util_error({ val: `inner` });
    const lx_middle = new z2ui5_cx_ui5_util_error({ val: `middle`, previous: lx_inner });
    const lx_outer = new z2ui5_cx_ui5_util_error({ val: `outer`, previous: lx_middle });
    const lv_text = lx_outer.get_text();
    const lv_nl = z2ui5_cl_util.abap_copy(z2ui5_cl_ui5_util_context.cv_char_util_newline);
    cl_abap_unit_assert.assert_equals({ exp: `outer${lv_nl}middle${lv_nl}inner`, act: lv_text });
  }

  test_cause_kept_by_val() {
    let lx;
    let lv_nl;
    const lx_inner = new z2ui5_cx_ui5_util_error({ val: `root cause` });
    const lx_middle = new z2ui5_cx_ui5_util_error({ val: `middle layer`, previous: lx_inner });
    try {
      throw new z2ui5_cx_ui5_util_error({ val: lx_middle });
    } catch (_caught1) {
      lx = _caught1;
      lv_nl = z2ui5_cl_util.abap_copy(z2ui5_cl_ui5_util_context.cv_char_util_newline);
      cl_abap_unit_assert.assert_equals({ exp: `middle layer${lv_nl}root cause`, act: lx.get_text() });
      cl_abap_unit_assert.assert_bound(lx.previous);
    }
  }

  test_no_duplicate_text() {
    const lx_inner = new z2ui5_cx_ui5_util_error({ val: `same text` });
    const lx_outer = new z2ui5_cx_ui5_util_error({ val: `same text`, previous: lx_inner });
    cl_abap_unit_assert.assert_equals({ exp: `same text`, act: lx_outer.get_text() });
  }

  test_text_full_chain() {
    const lx_inner = new z2ui5_cx_ui5_util_error({ val: `root cause` });
    const lx_outer = new z2ui5_cx_ui5_util_error({ val: `outer problem`, previous: lx_inner });
    const lv_text = z2ui5_cx_ui5_util_error.get_text_full({ val: lx_outer });
    cl_abap_unit_assert.assert_true((String(lv_text).toLowerCase().includes(String(`--- error ---`).toLowerCase())));
    cl_abap_unit_assert.assert_true((String(lv_text).toLowerCase().includes(String(`outer problem`).toLowerCase())));
    cl_abap_unit_assert.assert_true((String(lv_text).toLowerCase().includes(String(`root cause`).toLowerCase())));
    cl_abap_unit_assert.assert_true((String(lv_text).toLowerCase().includes(String(`exception chain`).toLowerCase())));
    cl_abap_unit_assert.assert_true((String(lv_text).toLowerCase().includes(String(`[1] Z2UI5_CX_UI5_UTIL_ERROR`).toLowerCase())));
    cl_abap_unit_assert.assert_true((String(lv_text).toLowerCase().includes(String(`[2] Z2UI5_CX_UI5_UTIL_ERROR`).toLowerCase())));
    cl_abap_unit_assert.assert_true((String(lv_text).toLowerCase().includes(String(`context`).toLowerCase())));
  }

  test_text_full_any_cx() {
    let lv_val;
    let lx_root;
    try {
      lv_val = z2ui5_cl_util.abap_div(1, 0);
    } catch (_caught1) {
      lx_root = _caught1;
    }
    const lv_text = z2ui5_cx_ui5_util_error.get_text_full({ val: lx_root });
    cl_abap_unit_assert.assert_true((String(lv_text).toLowerCase().includes(String(`[1] CX_SY_ZERODIVIDE`).toLowerCase())));
    cl_abap_unit_assert.assert_true((String(lv_text).toLowerCase().includes(String(`exception chain`).toLowerCase())));
  }

  test_text_full_unbound() {
    let lx_unbound = null;
    cl_abap_unit_assert.assert_equals({ exp: `UNKNOWN_ERROR`, act: z2ui5_cx_ui5_util_error.get_text_full({ val: lx_unbound }) });
  }

  test_chain_bounded() {
    let lx = new z2ui5_cx_ui5_util_error({ val: `level 0` });
    for (let sy_index = 1; sy_index <= 30; sy_index++) {
      lx = new z2ui5_cx_ui5_util_error({ val: `level ${sy_index}`, previous: lx });
    }
    cl_abap_unit_assert.assert_true((String(z2ui5_cx_ui5_util_error.get_text_full({ val: lx })).toLowerCase().includes(String(`chain truncated`).toLowerCase())));
    cl_abap_unit_assert.assert_not_initial(lx.get_text());
  }
}





module.exports = {
  __main: "z2ui5_cx_ui5_util_error",
  __classes: { ltcl_unit_test },
  __tests: {"ltcl_unit_test":["test_raise","test_raise_empty","test_raise_with_prev","test_raise_with_cx","test_uuid_populated","test_structured_val_no_dump","test_chain_texts","test_cause_kept_by_val","test_no_duplicate_text","test_text_full_chain","test_text_full_any_cx","test_text_full_unbound","test_chain_bounded"]},
};
