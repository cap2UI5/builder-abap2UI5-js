// GENERATED from run/input/abap2UI5/src/00/01/z2ui5_cl_ajson_filter_lib.clas.testclasses.abap — do not edit
const cl_abap_unit_assert = require("abap2UI5/cl_abap_unit_assert");
const z2ui5_cl_ajson = require("abap2UI5/z2ui5_cl_ajson");
const z2ui5_cl_ajson_filter_lib = require("abap2UI5/z2ui5_cl_ajson_filter_lib");
const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");
const z2ui5_cx_ajson_error = require("abap2UI5/z2ui5_cx_ajson_error");
const z2ui5_if_ajson_filter = require("abap2UI5/z2ui5_if_ajson_filter");
const z2ui5_if_ajson_types = require("abap2UI5/z2ui5_if_ajson_types");


class lcl_empty_filter {
  keep_node() {
    rv_keep = ((iv_visit === z2ui5_if_ajson_filter.visit_type.value && is_node.type !== z2ui5_if_ajson_types.node_type.number && is_node.value) || (iv_visit === z2ui5_if_ajson_filter.visit_type.value && is_node.type === z2ui5_if_ajson_types.node_type.number && is_node.value !== `0`) || (iv_visit !== z2ui5_if_ajson_filter.visit_type.value && is_node.children > 0));
  }
}



class lcl_paths_filter {
  mt_skip_paths = [];
  mv_pattern_search = false;

  keep_node() {
    let sy_tabix = 0;
    let sy_subrc = 0;
    let lv_full_path = ``;
    lv_full_path = is_node.path + is_node.name;
    if ((this.mv_pattern_search === true || this.mv_pattern_search === `X`)) {
      rv_keep = true;
      sy_tabix = 0;
      for (const fs_p of this.mt_skip_paths) {
        sy_tabix++;
        if (String(lv_full_path).includes(String(fs_p).replace(/\*/g, ""))) {
          rv_keep = false;
          break;
        }
      }
    } else {
      {
        const _t = this.mt_skip_paths;
        const _i = _t.findIndex((_r) => _r === lv_full_path);
        sy_subrc = _i >= 0 && _i < _t.length ? 0 : 4;
      }
      rv_keep = (sy_subrc !== 0);
    }
  }

  constructor({ it_skip_paths, iv_skip_paths, iv_pattern_search } = {}) {
    let sy_tabix = 0;
    let lv_s = ``;
    let lt_tab = [];
    if ((!iv_skip_paths) === (!it_skip_paths)) {
      z2ui5_cx_ajson_error.raise(`no filter path specified`);
    }
    sy_tabix = 0;
    for (const lv_s of it_skip_paths) {
      sy_tabix++;
      lv_s = lv_s.trim();
      lt_tab.push(lv_s);
    }
    if (iv_skip_paths) {
      lt_tab = iv_skip_paths.split(`,`);
      sy_tabix = 0;
      for (const fs_s of lt_tab) {
        sy_tabix++;
        if (!fs_s) {
          // TODO(abap2js): DELETE lt_tab INDEX sy-tabix.
          continue;
        }
        fs_s = fs_s.trim();
      }
    }
    lt_tab.sort((a, b) => ((a.table_line > b.table_line ? 1 : a.table_line < b.table_line ? -1 : 0)));
    // TODO(abap2js): DELETE ADJACENT DUPLICATES FROM lt_tab.
    this.mt_skip_paths = z2ui5_cl_util.abap_copy(lt_tab);
    this.mv_pattern_search = z2ui5_cl_util.abap_copy(iv_pattern_search);
  }
}



class lcl_and_filter {
  mt_filters = [];

  keep_node() {
    let sy_tabix = 0;
    let li_filter = null;
    rv_keep = true;
    sy_tabix = 0;
    for (const li_filter of this.mt_filters) {
      sy_tabix++;
      rv_keep = li_filter.keep_node({ is_node, iv_visit });
      if (!(rv_keep === true || rv_keep === `X`)) {
        return;
      }
    }
  }

  constructor({ it_filters } = {}) {
    let sy_tabix = 0;
    let li_filter = null;
    sy_tabix = 0;
    for (const li_filter of it_filters) {
      sy_tabix++;
      if (!(li_filter.table_line != null)) continue;
      this.mt_filters.push(li_filter);
    }
  }
}



class ltcl_filters_test {
  empty_filter_simple() {
    let li_json = null;
    let li_json_filtered = null;
    li_json = z2ui5_cl_ajson.create_empty();
    li_json.set({ iv_path: `/a`, iv_val: `1` });
    li_json.set({ iv_ignore_empty: false, iv_path: `/b`, iv_val: `` });
    li_json.set({ iv_path: `/c`, iv_val: `3` });
    li_json.set({ iv_ignore_empty: false, iv_path: `/d`, iv_val: 0 });
    li_json.set_boolean({ iv_path: `/e`, iv_val: false });
    li_json.set_boolean({ iv_path: `/f`, iv_val: true });
    li_json.set_null(`/g`);
    li_json_filtered = z2ui5_cl_ajson.create_from({ ii_source_json: li_json, ii_filter: z2ui5_cl_ajson_filter_lib.create_empty_filter() });
    cl_abap_unit_assert.assert_equals({ act: li_json_filtered.stringify(), exp: `{"a":"1","c":"3","e":false,"f":true,"g":null}` });
  }

  empty_filter_deep() {
    let li_json = null;
    let li_json_filtered = null;
    li_json = z2ui5_cl_ajson.create_empty();
    li_json.set({ iv_path: `/a`, iv_val: `1` });
    li_json.set({ iv_ignore_empty: false, iv_path: `/b/c`, iv_val: `` });
    li_json.set({ iv_ignore_empty: false, iv_path: `/b/d`, iv_val: 0 });
    li_json.set({ iv_ignore_empty: false, iv_path: `/d/e`, iv_val: 0 });
    li_json_filtered = z2ui5_cl_ajson.create_from({ ii_source_json: li_json, ii_filter: z2ui5_cl_ajson_filter_lib.create_empty_filter() });
    cl_abap_unit_assert.assert_equals({ act: li_json_filtered.stringify(), exp: `{"a":"1"}` });
  }

  path_filter() {
    let li_json = null;
    let li_json_filtered = null;
    let lt_paths = [];
    lt_paths.push(`/b/c`);
    li_json = z2ui5_cl_ajson.create_empty();
    li_json.set({ iv_path: `/a`, iv_val: `1` });
    li_json.set({ iv_path: `/b/c`, iv_val: `2` });
    li_json.set({ iv_path: `/c/d`, iv_val: `3` });
    li_json_filtered = z2ui5_cl_ajson.create_from({ ii_source_json: li_json, ii_filter: z2ui5_cl_ajson_filter_lib.create_path_filter({ it_skip_paths: lt_paths }) });
    cl_abap_unit_assert.assert_equals({ act: li_json_filtered.stringify(), exp: `{"a":"1","b":{},"c":{"d":"3"}}` });
  }

  path_filter_string() {
    let li_json = null;
    let li_json_filtered = null;
    li_json = z2ui5_cl_ajson.create_empty();
    li_json.set({ iv_path: `/a`, iv_val: `1` });
    li_json.set({ iv_path: `/b/c`, iv_val: `2` });
    li_json.set({ iv_path: `/c/d`, iv_val: `3` });
    li_json_filtered = z2ui5_cl_ajson.create_from({ ii_source_json: li_json, ii_filter: z2ui5_cl_ajson_filter_lib.create_path_filter({ iv_skip_paths: `/b/c,/c/d` }) });
    cl_abap_unit_assert.assert_equals({ act: li_json_filtered.stringify(), exp: `{"a":"1","b":{},"c":{}}` });
  }

  path_filter_w_patterns() {
    let li_json = null;
    let li_json_filtered = null;
    li_json = z2ui5_cl_ajson.create_empty();
    li_json.set({ iv_path: `/@meta`, iv_val: `meta` });
    li_json.set({ iv_path: `/a`, iv_val: `1` });
    li_json.set({ iv_path: `/b/c`, iv_val: `2` });
    li_json.set({ iv_path: `/c/d`, iv_val: `3` });
    li_json.set({ iv_path: `/c/@meta2`, iv_val: `meta2` });
    li_json_filtered = z2ui5_cl_ajson.create_from({ ii_source_json: li_json, ii_filter: z2ui5_cl_ajson_filter_lib.create_path_filter({ iv_skip_paths: `/*/c,*/@*`, iv_pattern_search: true }) });
    cl_abap_unit_assert.assert_equals({ act: li_json_filtered.stringify(), exp: `{"a":"1","b":{},"c":{"d":"3"}}` });
  }

  path_filter_deep() {
    let li_json = null;
    let li_json_filtered = null;
    let lt_paths = [];
    lt_paths.push(`/b`);
    li_json = z2ui5_cl_ajson.create_empty();
    li_json.set({ iv_path: `/a`, iv_val: `1` });
    li_json.set({ iv_path: `/b/c`, iv_val: `2` });
    li_json.set({ iv_path: `/b/d`, iv_val: `x` });
    li_json.set({ iv_path: `/c/d`, iv_val: `3` });
    li_json_filtered = z2ui5_cl_ajson.create_from({ ii_source_json: li_json, ii_filter: z2ui5_cl_ajson_filter_lib.create_path_filter({ it_skip_paths: lt_paths }) });
    cl_abap_unit_assert.assert_equals({ act: li_json_filtered.stringify(), exp: `{"a":"1","c":{"d":"3"}}` });
  }

  and_filter() {
    let li_json = null;
    let li_json_filtered = null;
    let lt_filters = [];
    lt_filters.push(z2ui5_cl_ajson_filter_lib.create_empty_filter());
    lt_filters.push(z2ui5_cl_ajson_filter_lib.create_path_filter({ iv_skip_paths: `/c` }));
    li_json = z2ui5_cl_ajson.create_empty();
    li_json.set({ iv_path: `/a`, iv_val: `1` });
    li_json.set({ iv_ignore_empty: false, iv_path: `/b`, iv_val: `` });
    li_json.set({ iv_path: `/c`, iv_val: `3` });
    li_json.set({ iv_ignore_empty: false, iv_path: `/d`, iv_val: 0 });
    li_json_filtered = z2ui5_cl_ajson.create_from({ ii_source_json: li_json, ii_filter: z2ui5_cl_ajson_filter_lib.create_and_filter(lt_filters) });
    cl_abap_unit_assert.assert_equals({ act: li_json_filtered.stringify(), exp: `{"a":"1"}` });
  }

  mixed_case_filter() {
    let li_json = null;
    let li_json_filtered = null;
    li_json = z2ui5_cl_ajson.create_empty();
    li_json.set({ iv_path: `/a`, iv_val: `1` });
    li_json.set({ iv_path: `/bB`, iv_val: `2` });
    li_json.set({ iv_path: `/CC`, iv_val: `3` });
    li_json.set({ iv_path: `/cc`, iv_val: `4` });
    li_json.set({ iv_path: `/d`, iv_val: 5 });
    li_json_filtered = z2ui5_cl_ajson.create_from({ ii_source_json: li_json, ii_filter: z2ui5_cl_ajson_filter_lib.create_path_filter({ iv_skip_paths: `/bB,/CC` }) });
    cl_abap_unit_assert.assert_equals({ act: li_json_filtered.stringify(), exp: `{"a":"1","cc":"4","d":5}` });
  }
}



module.exports = {
  __main: "z2ui5_cl_ajson_filter_lib",
  __classes: { lcl_empty_filter, lcl_paths_filter, lcl_and_filter, ltcl_filters_test },
  __tests: {"ltcl_filters_test":["empty_filter_simple","empty_filter_deep","path_filter","path_filter_string","path_filter_w_patterns","path_filter_deep","and_filter","mixed_case_filter"]},
};
