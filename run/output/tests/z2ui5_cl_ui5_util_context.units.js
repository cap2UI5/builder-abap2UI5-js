// GENERATED from run/input/abap2UI5/src/00/03/z2ui5_cl_ui5_util_context.clas.testclasses.abap — do not edit
const cl_abap_unit_assert = require("abap2UI5/cl_abap_unit_assert");
const z2ui5_cl_ui5_util_context = require("abap2UI5/z2ui5_cl_ui5_util_context");
const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");


class ltcl_test {
  test_bool_abap_true() {
    cl_abap_unit_assert.assert_equals({ exp: `true`, act: z2ui5_cl_ui5_util_context.boolean_abap_2_json({ val: true }) });
  }

  test_bool_abap_false() {
    cl_abap_unit_assert.assert_equals({ exp: `false`, act: z2ui5_cl_ui5_util_context.boolean_abap_2_json({ val: false }) });
  }

  test_bool_char_non_bool() {
    let lv_char = `X`;
    cl_abap_unit_assert.assert_equals({ exp: `X`, act: z2ui5_cl_ui5_util_context.boolean_abap_2_json({ val: lv_char }) });
  }

  test_bool_string_empty() {
    let lv_string = ``;
    cl_abap_unit_assert.assert_equals({ exp: ``, act: z2ui5_cl_ui5_util_context.boolean_abap_2_json({ val: lv_string }) });
  }

  test_bool_string_literal() {
    cl_abap_unit_assert.assert_equals({ exp: `true`, act: z2ui5_cl_ui5_util_context.boolean_abap_2_json({ val: `true` }) });
  }

  test_bool_string_binding() {
    cl_abap_unit_assert.assert_equals({ exp: `{path}`, act: z2ui5_cl_ui5_util_context.boolean_abap_2_json({ val: `{path}` }) });
  }

  test_bool_check_by_data() {
    let lv_char = `X`;
    let lv_int = 5;
    cl_abap_unit_assert.assert_true(z2ui5_cl_ui5_util_context.boolean_check_by_data({ val: true }));
    cl_abap_unit_assert.assert_true(z2ui5_cl_ui5_util_context.boolean_check_by_data({ val: false }));
    cl_abap_unit_assert.assert_false(z2ui5_cl_ui5_util_context.boolean_check_by_data({ val: lv_char }));
    cl_abap_unit_assert.assert_false(z2ui5_cl_ui5_util_context.boolean_check_by_data({ val: `X` }));
    cl_abap_unit_assert.assert_false(z2ui5_cl_ui5_util_context.boolean_check_by_data({ val: lv_int }));
  }

  test_bool_cache_hit() {
    z2ui5_cl_ui5_util_context.boolean_abap_2_json({ val: true });
    cl_abap_unit_assert.assert_equals({ exp: `true`, act: z2ui5_cl_ui5_util_context.boolean_abap_2_json({ val: true }) });
    cl_abap_unit_assert.assert_equals({ exp: `false`, act: z2ui5_cl_ui5_util_context.boolean_abap_2_json({ val: false }) });
  }

  test_url_param_case() {
    cl_abap_unit_assert.assert_equals({ exp: `MixedCase`, act: z2ui5_cl_ui5_util_context.url_param_get({ val: `app_start`, url: `https://h/p?APP_START=MixedCase` }) });
    cl_abap_unit_assert.assert_equals({ exp: `MixedCase`, act: z2ui5_cl_ui5_util_context.url_param_get({ val: `app_start`, url: `?APP_START=MixedCase` }) });
  }

  test_url_param_no_phantom() {
    cl_abap_unit_assert.assert_initial(z2ui5_cl_ui5_util_context.url_param_get_tab({ val: `` }));
    cl_abap_unit_assert.assert_equals({ exp: 1, act: z2ui5_cl_ui5_util_context.url_param_get_tab({ val: `?a=1&` }).length });
  }

  test_url_param_startup() {
    cl_abap_unit_assert.assert_equals({ exp: `foo`, act: z2ui5_cl_ui5_util_context.url_param_get({ val: `app_start`, url: `?x=1&sap-startup-params=app_start%3Dfoo` }) });
    cl_abap_unit_assert.assert_equals({ exp: `foo`, act: z2ui5_cl_ui5_util_context.url_param_get({ val: `app_start`, url: `?sap-startup-params=app_start%3Dfoo` }) });
    cl_abap_unit_assert.assert_equals({ exp: `foo`, act: z2ui5_cl_ui5_util_context.url_param_get({ val: `app_start`, url: `?sap-startup-params=app_start%3dfoo` }) });
  }

  test_app_url_hash_app() {
    cl_abap_unit_assert.assert_equals({ exp: `https://h/p?app_start=zcl_new`, act: z2ui5_cl_ui5_util_context.app_get_url({ classname: `ZCL_NEW`, origin: `https://h`, pathname: `/p`, search: ``, hash: `#/app/ZCL_OLD/DRAFT1` }) });
  }

  test_app_url_hash_shell() {
    cl_abap_unit_assert.assert_equals({ exp: `https://h/p?app_start=zcl_new#Shell-home`, act: z2ui5_cl_ui5_util_context.app_get_url({ classname: `ZCL_NEW`, origin: `https://h`, pathname: `/p`, search: ``, hash: `#Shell-home&/app/ZCL_OLD/DRAFT1` }) });
  }
}





class ltcl_string {
  test_trim_spaces() {
    cl_abap_unit_assert.assert_equals({ exp: `abc`, act: z2ui5_cl_ui5_util_context.c_trim({ val: `   abc   ` }) });
  }

  test_trim_tabs() {
    let lv_val = ``;
    lv_val = z2ui5_cl_ui5_util_context.cv_char_util_horizontal_tab + `abc` + z2ui5_cl_ui5_util_context.cv_char_util_horizontal_tab;
    cl_abap_unit_assert.assert_equals({ exp: `abc`, act: z2ui5_cl_ui5_util_context.c_trim({ val: lv_val }) });
  }

  test_trim_inner_kept() {
    cl_abap_unit_assert.assert_equals({ exp: `a b`, act: z2ui5_cl_ui5_util_context.c_trim({ val: ` a b ` }) });
  }

  test_trim_case() {
    cl_abap_unit_assert.assert_equals({ exp: `ABC`, act: z2ui5_cl_ui5_util_context.c_trim_upper({ val: ` aBc ` }) });
    cl_abap_unit_assert.assert_equals({ exp: `abc`, act: z2ui5_cl_ui5_util_context.c_trim_lower({ val: ` aBc ` }) });
  }

  test_bool_by_name() {
    cl_abap_unit_assert.assert_true(z2ui5_cl_ui5_util_context.boolean_check_by_name({ val: `ABAP_BOOL` }));
    cl_abap_unit_assert.assert_true(z2ui5_cl_ui5_util_context.boolean_check_by_name({ val: `XFELD` }));
    cl_abap_unit_assert.assert_true(z2ui5_cl_ui5_util_context.boolean_check_by_name({ val: `BOOLE_D` }));
    cl_abap_unit_assert.assert_false(z2ui5_cl_ui5_util_context.boolean_check_by_name({ val: `abap_bool` }));
    cl_abap_unit_assert.assert_false(z2ui5_cl_ui5_util_context.boolean_check_by_name({ val: `STRING` }));
    cl_abap_unit_assert.assert_false(z2ui5_cl_ui5_util_context.boolean_check_by_name({ val: `` }));
  }

  test_url_create() {
    let lt_params = [];
    lt_params = z2ui5_cl_util.abap_tab_assign(lt_params, [{ n: `a`, v: `1` }, { n: `b`, v: `2` }]);
    cl_abap_unit_assert.assert_equals({ exp: `a=1&b=2`, act: z2ui5_cl_ui5_util_context.url_param_create_url({ t_params: lt_params }) });
  }

  test_url_create_empty() {
    let lt_params = [];
    cl_abap_unit_assert.assert_equals({ exp: ``, act: z2ui5_cl_ui5_util_context.url_param_create_url({ t_params: lt_params }) });
  }

  test_url_roundtrip() {
    const lt_params = z2ui5_cl_ui5_util_context.url_param_get_tab({ val: `?a=1&b=2` });
    cl_abap_unit_assert.assert_equals({ exp: `a=1&b=2`, act: z2ui5_cl_ui5_util_context.url_param_create_url({ t_params: lt_params }) });
  }
}





class ltcl_rtti {
  test_check_clike() {
    let lv_int = 5;
    let lv_char = ``;
    let lv_numc = ``;
    let lv_date = null;
    let ls_row = { name: ``, city: `` };
    cl_abap_unit_assert.assert_true(z2ui5_cl_ui5_util_context.rtti_check_clike({ val: `abc` }));
    cl_abap_unit_assert.assert_true(z2ui5_cl_ui5_util_context.rtti_check_clike({ val: lv_char }));
    cl_abap_unit_assert.assert_true(z2ui5_cl_ui5_util_context.rtti_check_clike({ val: lv_numc }));
    cl_abap_unit_assert.assert_true(z2ui5_cl_ui5_util_context.rtti_check_clike({ val: lv_date }));
    cl_abap_unit_assert.assert_false(z2ui5_cl_ui5_util_context.rtti_check_clike({ val: lv_int }));
    cl_abap_unit_assert.assert_false(z2ui5_cl_ui5_util_context.rtti_check_clike({ val: ls_row }));
  }

  test_check_table() {
    let lt_row = [];
    let ls_row = { name: ``, city: `` };
    cl_abap_unit_assert.assert_true(z2ui5_cl_ui5_util_context.rtti_check_table({ val: lt_row }));
    cl_abap_unit_assert.assert_false(z2ui5_cl_ui5_util_context.rtti_check_table({ val: ls_row }));
    cl_abap_unit_assert.assert_false(z2ui5_cl_ui5_util_context.rtti_check_table({ val: `abc` }));
  }

  test_check_structure() {
    let ls_row = { name: ``, city: `` };
    let lt_row = [];
    cl_abap_unit_assert.assert_true(z2ui5_cl_ui5_util_context.rtti_check_structure({ val: ls_row }));
    cl_abap_unit_assert.assert_false(z2ui5_cl_ui5_util_context.rtti_check_structure({ val: `abc` }));
    cl_abap_unit_assert.assert_false(z2ui5_cl_ui5_util_context.rtti_check_structure({ val: lt_row }));
  }

  test_check_ref_data() {
    let lr_data = null;
    lr_data = ``;
    cl_abap_unit_assert.assert_true(z2ui5_cl_ui5_util_context.rtti_check_ref_data({ val: lr_data }));
    cl_abap_unit_assert.assert_false(z2ui5_cl_ui5_util_context.rtti_check_ref_data({ val: `abc` }));
  }

  test_bound_not_init() {
    let sy_subrc = 0;
    let fs_val = null;
    let _fs$fs_val = null;
    let lr_unbound = null;
    let lr_initial = null;
    let lr_filled = null;
    lr_initial = ``;
    lr_filled = ``;
    fs_val = lr_filled;
    _fs$fs_val = null;
    sy_subrc = 0;
    fs_val = `x`;
    if (_fs$fs_val) _fs$fs_val.o[_fs$fs_val.k] = fs_val;
    cl_abap_unit_assert.assert_false(z2ui5_cl_ui5_util_context.check_bound_a_not_initial({ val: lr_unbound }));
    cl_abap_unit_assert.assert_false(z2ui5_cl_ui5_util_context.check_bound_a_not_initial({ val: lr_initial }));
    cl_abap_unit_assert.assert_true(z2ui5_cl_ui5_util_context.check_bound_a_not_initial({ val: lr_filled }));
  }

  test_struc_to_pairs() {
    let ls_row = { name: ``, city: `` };
    ls_row.name = `Ada`;
    ls_row.city = `London`;
    const lt_pair = z2ui5_cl_ui5_util_context.itab_get_by_struc({ val: ls_row });
    cl_abap_unit_assert.assert_equals({ exp: 2, act: lt_pair.length });
    cl_abap_unit_assert.assert_equals({ exp: `Ada`, act: lt_pair.find((row) => row.n === `NAME`).v });
    cl_abap_unit_assert.assert_equals({ exp: `London`, act: lt_pair.find((row) => row.n === `CITY`).v });
  }

  test_scan_flag() {
    let ls_flags = { flag_a: false, flag_b: false, other: false };
    ls_flags.flag_a = true;
    ls_flags.flag_b = false;
    ls_flags.other = true;
    const lt_found = z2ui5_cl_ui5_util_context.scan_flag_prefix({ val: ls_flags, prefix: `FLAG_` });
    cl_abap_unit_assert.assert_equals({ exp: 1, act: lt_found.length });
    cl_abap_unit_assert.assert_equals({ exp: `A`, act: lt_found[(1) - 1] });
  }
}





class ltcl_itab {
  get_rows() {
    let result = [];
    result = z2ui5_cl_util.abap_tab_assign(result, [{ name: `Ada`, city: `London` }, { name: `Alan`, city: `Wilmslow` }, { name: `Grace`, city: `New York` }]);
    return result;
  }

  test_filter_all_fields() {
    let lt_row = this.get_rows();
    const _out0 = { val: `London`, tab: lt_row };
    z2ui5_cl_ui5_util_context.itab_filter_by_val(_out0);
    if ("tab" in _out0) lt_row = _out0.tab;
    cl_abap_unit_assert.assert_equals({ exp: 1, act: lt_row.length });
    cl_abap_unit_assert.assert_equals({ exp: `Ada`, act: lt_row[(1) - 1].name });
  }

  test_filter_ignore_case() {
    let lt_row = this.get_rows();
    const _out0 = { val: `ada`, ignore_case: true, tab: lt_row };
    z2ui5_cl_ui5_util_context.itab_filter_by_val(_out0);
    if ("tab" in _out0) lt_row = _out0.tab;
    cl_abap_unit_assert.assert_equals({ exp: 1, act: lt_row.length });
    cl_abap_unit_assert.assert_equals({ exp: `Ada`, act: lt_row[(1) - 1].name });
  }

  test_filter_named_field() {
    let lt_fields = [];
    let lt_row = this.get_rows();
    lt_fields.push(z2ui5_cl_util.abap_copy(`NAME`));
    const _out0 = { val: `London`, fields: lt_fields, tab: lt_row };
    z2ui5_cl_ui5_util_context.itab_filter_by_val(_out0);
    if ("tab" in _out0) lt_row = _out0.tab;
    cl_abap_unit_assert.assert_initial(lt_row);
  }

  test_filter_no_match() {
    let lt_row = this.get_rows();
    const _out0 = { val: `Nobody`, tab: lt_row };
    z2ui5_cl_ui5_util_context.itab_filter_by_val(_out0);
    if ("tab" in _out0) lt_row = _out0.tab;
    cl_abap_unit_assert.assert_initial(lt_row);
  }

  test_filter_elementary() {
    let lt_str = [];
    lt_str = z2ui5_cl_util.abap_tab_assign(lt_str, [`London`, `Wilmslow`, `New York`]);
    const _out0 = { val: `London`, tab: lt_str };
    z2ui5_cl_ui5_util_context.itab_filter_by_val(_out0);
    if ("tab" in _out0) lt_str = _out0.tab;
    cl_abap_unit_assert.assert_equals({ exp: 1, act: lt_str.length });
    cl_abap_unit_assert.assert_equals({ exp: `London`, act: lt_str[(1) - 1] });
  }

  test_corresponding() {
    let lt_target = [];
    const lt_row = this.get_rows();
    const _out0 = { val: lt_row, tab: lt_target };
    z2ui5_cl_ui5_util_context.itab_corresponding(_out0);
    if ("tab" in _out0) lt_target = _out0.tab;
    cl_abap_unit_assert.assert_equals({ exp: 3, act: lt_target.length });
    cl_abap_unit_assert.assert_equals({ exp: `Ada`, act: lt_target[(1) - 1].name });
    cl_abap_unit_assert.assert_initial(lt_target[(1) - 1].country);
  }
}





class ltcl_msg {
  test_msg_type_mapping() {
    cl_abap_unit_assert.assert_equals({ exp: `Error`, act: z2ui5_cl_ui5_util_context.ui5_get_msg_type({ val: `E` }) });
    cl_abap_unit_assert.assert_equals({ exp: `Success`, act: z2ui5_cl_ui5_util_context.ui5_get_msg_type({ val: `S` }) });
    cl_abap_unit_assert.assert_equals({ exp: `Warning`, act: z2ui5_cl_ui5_util_context.ui5_get_msg_type({ val: `W` }) });
    cl_abap_unit_assert.assert_equals({ exp: `Information`, act: z2ui5_cl_ui5_util_context.ui5_get_msg_type({ val: `I` }) });
    cl_abap_unit_assert.assert_equals({ exp: `Information`, act: z2ui5_cl_ui5_util_context.ui5_get_msg_type({ val: `X` }) });
    cl_abap_unit_assert.assert_equals({ exp: `Information`, act: z2ui5_cl_ui5_util_context.ui5_get_msg_type({ val: `` }) });
  }

  test_box_empty_skips() {
    let lt_msg = [];
    const ls_box = z2ui5_cl_ui5_util_context.ui5_msg_box_format({ val: lt_msg });
    cl_abap_unit_assert.assert_true(ls_box.skip);
  }

  test_box_single() {
    let lt_msg = [];
    lt_msg = z2ui5_cl_util.abap_tab_assign(lt_msg, [{ text: `boom`, type: `E` }]);
    const ls_box = z2ui5_cl_ui5_util_context.ui5_msg_box_format({ val: lt_msg });
    cl_abap_unit_assert.assert_false(ls_box.skip);
    cl_abap_unit_assert.assert_equals({ exp: `boom`, act: ls_box.text });
    cl_abap_unit_assert.assert_equals({ exp: `Error`, act: ls_box.title });
    cl_abap_unit_assert.assert_equals({ exp: `error`, act: ls_box.type });
    cl_abap_unit_assert.assert_initial(ls_box.details);
  }

  test_box_multiple() {
    let lt_msg = [];
    lt_msg = z2ui5_cl_util.abap_tab_assign(lt_msg, [{ text: `first`, type: `W` }, { text: `second`, type: `E` }]);
    const ls_box = z2ui5_cl_ui5_util_context.ui5_msg_box_format({ val: lt_msg });
    cl_abap_unit_assert.assert_false(ls_box.skip);
    cl_abap_unit_assert.assert_equals({ exp: `Warning`, act: ls_box.title });
    cl_abap_unit_assert.assert_equals({ exp: `<ul><li>first</li><li>second</li></ul>`, act: ls_box.details });
  }

  test_token_by_range() {
    let lt_range = [];
    lt_range = z2ui5_cl_util.abap_tab_assign(lt_range, [{ sign: `I`, option: `EQ`, low: `X` }, { sign: `I`, option: `BT`, low: `1`, high: `9` }, { sign: `I`, option: `CP`, low: `A` }, { sign: `E`, option: `EQ`, low: `Y` }]);
    const lt_token = z2ui5_cl_ui5_util_context.filter_get_token_t_by_range_t({ val: lt_range });
    cl_abap_unit_assert.assert_equals({ exp: 4, act: lt_token.length });
    cl_abap_unit_assert.assert_equals({ exp: `=X`, act: lt_token[(1) - 1].key });
    cl_abap_unit_assert.assert_equals({ exp: `1...9`, act: lt_token[(2) - 1].key });
    cl_abap_unit_assert.assert_equals({ exp: `*A*`, act: lt_token[(3) - 1].key });
    cl_abap_unit_assert.assert_equals({ exp: `!(=Y)`, act: lt_token[(4) - 1].key });
    cl_abap_unit_assert.assert_true(lt_token[(1) - 1].visible);
    cl_abap_unit_assert.assert_true(lt_token[(1) - 1].editable);
  }
}





class ltcl_msg_rap {
  test_fail_text_known() {
    cl_abap_unit_assert.assert_equals({ exp: `Entity not found`, act: z2ui5_cl_ui5_util_context.msg_get_rap_fail_text({ cause: 1 }) });
    cl_abap_unit_assert.assert_equals({ exp: `Authorization failure`, act: z2ui5_cl_ui5_util_context.msg_get_rap_fail_text({ cause: 3 }) });
    cl_abap_unit_assert.assert_equals({ exp: z2ui5_cl_ui5_util_context.msg_get_rap_fail_text({ cause: 4 }), act: z2ui5_cl_ui5_util_context.msg_get_rap_fail_text({ cause: 5 }) });
  }

  test_fail_text_unknown() {
    const lv_text = z2ui5_cl_ui5_util_context.msg_get_rap_fail_text({ cause: 99 });
    cl_abap_unit_assert.assert_char_cp({ exp: `*99*`, act: lv_text });
    cl_abap_unit_assert.assert_char_cp({ exp: `*Operation failed*`, act: lv_text });
  }

  test_fail_text_all_causes() {
    let lv_text;
    let lv_cause = 0;
    for (let sy_index = 1; sy_index <= 12; sy_index++) {
      lv_cause = sy_index - 1;
      lv_text = z2ui5_cl_ui5_util_context.msg_get_rap_fail_text({ cause: lv_cause });
      cl_abap_unit_assert.assert_not_initial({ act: lv_text, msg: `cause ${lv_cause} renders no text` });
      cl_abap_unit_assert.assert_false({ act: (String(lv_text).toLowerCase().includes(String(`cause code`).toLowerCase())), msg: `cause ${lv_cause} fell through to the ELSE branch` });
    }
  }

  test_flatten_pairs() {
    const ls_tky = { product_uuid: `ABC-1`, product_id: `4711` };
    cl_abap_unit_assert.assert_equals({ exp: `PRODUCT_UUID=ABC-1, PRODUCT_ID=4711`, act: z2ui5_cl_ui5_util_context.msg_get_rap_flatten({ val: ls_tky }) });
  }

  test_flatten_skips_empty() {
    const ls_tky = { product_id: `4711` };
    cl_abap_unit_assert.assert_equals({ exp: `PRODUCT_ID=4711`, act: z2ui5_cl_ui5_util_context.msg_get_rap_flatten({ val: ls_tky }) });
  }

  test_flatten_nested() {
    const ls_nested = { inner: { a: `1`, b: `2` }, c: `3` };
    cl_abap_unit_assert.assert_equals({ exp: `A=1, B=2, C=3`, act: z2ui5_cl_ui5_util_context.msg_get_rap_flatten({ val: ls_nested }) });
  }

  test_flatten_not_a_struct() {
    const lv_scalar = `not a structure`;
    cl_abap_unit_assert.assert_initial(z2ui5_cl_ui5_util_context.msg_get_rap_flatten({ val: lv_scalar }));
  }

  test_is_rap_struct_plain() {
    const ls_plain = { name: `Ada`, city: `London` };
    cl_abap_unit_assert.assert_equals({ exp: false, act: z2ui5_cl_ui5_util_context.check_is_rap_struct({ val: ls_plain }) });
  }
}





module.exports = {
  __main: "z2ui5_cl_ui5_util_context",
  __classes: { ltcl_test, ltcl_string, ltcl_rtti, ltcl_itab, ltcl_msg, ltcl_msg_rap },
  __tests: {"ltcl_test":["test_bool_abap_true","test_bool_abap_false","test_bool_char_non_bool","test_bool_string_empty","test_bool_string_literal","test_bool_string_binding","test_bool_check_by_data","test_bool_cache_hit","test_url_param_case","test_url_param_no_phantom","test_url_param_startup","test_app_url_hash_app","test_app_url_hash_shell"],"ltcl_string":["test_trim_spaces","test_trim_tabs","test_trim_inner_kept","test_trim_case","test_bool_by_name","test_url_create","test_url_create_empty","test_url_roundtrip"],"ltcl_rtti":["test_check_clike","test_check_table","test_check_structure","test_check_ref_data","test_bound_not_init","test_struc_to_pairs","test_scan_flag"],"ltcl_itab":["test_filter_all_fields","test_filter_ignore_case","test_filter_named_field","test_filter_no_match","test_filter_elementary","test_corresponding"],"ltcl_msg":["test_msg_type_mapping","test_box_empty_skips","test_box_single","test_box_multiple","test_token_by_range"],"ltcl_msg_rap":["test_fail_text_known","test_fail_text_unknown","test_fail_text_all_causes","test_flatten_pairs","test_flatten_skips_empty","test_flatten_nested","test_flatten_not_a_struct","test_is_rap_struct_plain"]},
};
