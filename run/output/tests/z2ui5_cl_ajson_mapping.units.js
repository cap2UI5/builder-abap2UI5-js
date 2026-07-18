// GENERATED from run/input/abap2UI5/src/00/01/z2ui5_cl_ajson_mapping.clas.testclasses.abap — do not edit
const cl_abap_unit_assert = require("abap2UI5/cl_abap_unit_assert");
const z2ui5_cl_ajson = require("abap2UI5/z2ui5_cl_ajson");
const z2ui5_cl_ajson_mapping = require("abap2UI5/z2ui5_cl_ajson_mapping");
const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");


class lcl_mapping_fields {
  mt_mapping_fields = null;

  constructor({ it_mapping_fields } = {}) {
    let sy_tabix = 0;
    let ls_mapping_field = null;
    sy_tabix = 0;
    for (const ls_mapping_field of it_mapping_fields) {
      sy_tabix++;
      ls_mapping_field.abap = ls_mapping_field.abap.toUpperCase();
      this.mt_mapping_fields.push(ls_mapping_field);
    }
  }

  to_abap() {
    let sy_subrc = 0;
    let ls_mapping_field = null;
    // TODO(abap2js): READ TABLE mt_mapping_fields INTO ls_mapping_field WITH KEY json COMPONENTS json = iv_name.
    if (sy_subrc === 0) {
      rv_result = z2ui5_cl_util.abap_copy(ls_mapping_field.abap);
    }
  }

  to_json() {
    let sy_subrc = 0;
    let lv_field = ``;
    let ls_mapping_field = null;
    lv_field = iv_name.toUpperCase();
    // TODO(abap2js): READ TABLE mt_mapping_fields INTO ls_mapping_field WITH KEY abap COMPONENTS abap = lv_field.
    if (sy_subrc === 0) {
      rv_result = z2ui5_cl_util.abap_copy(ls_mapping_field.json);
    }
  }

  rename_node() {
  }
}



class lcl_rename {
  mt_rename_map = null;
  mv_rename_by = 0;

  constructor({ it_rename_map, iv_rename_by } = {}) {
    this.mt_rename_map = z2ui5_cl_util.abap_copy(it_rename_map);
    this.mv_rename_by = z2ui5_cl_util.abap_copy(iv_rename_by);
  }

  to_abap() {
  }

  to_json() {
  }

  rename_node() {
    let sy_tabix = 0;
    let sy_subrc = 0;
    let fs_r = null;
    let _fs$fs_r = null;
    let lv_full_path = ``;
    let lv_pair_found = false;
    switch (this.mv_rename_by) {
      case z2ui5_cl_ajson_mapping.rename_by.attr_name:
        // TODO(abap2js): READ TABLE mt_rename_map ASSIGNING <r> WITH TABLE KEY by_name COMPONENTS from = cv_name.
        lv_pair_found = (sy_subrc === 0);
        break;
      case z2ui5_cl_ajson_mapping.rename_by.full_path:
        lv_full_path = is_node.path + cv_name;
        // TODO(abap2js): READ TABLE mt_rename_map ASSIGNING <r> WITH TABLE KEY by_name COMPONENTS from = lv_full_path.
        lv_pair_found = (sy_subrc === 0);
        break;
      case z2ui5_cl_ajson_mapping.rename_by.pattern:
        lv_full_path = is_node.path + cv_name;
        sy_tabix = 0;
        for (const fs_r of this.mt_rename_map) {
          sy_tabix++;
          if (String(lv_full_path).includes(String(fs_r.from).replace(/\*/g, ""))) {
            lv_pair_found = true;
            break;
          }
        }
        break;
      default:
        lv_pair_found = false;
        break;
    }
    if ((lv_pair_found === true || lv_pair_found === `X`)) {
      cv_name = z2ui5_cl_util.abap_copy(fs_r.to);
    }
  }
}



class lcl_mapping_to_upper {
  mi_mapping_fields = null;

  constructor({ it_mapping_fields } = {}) {
    this.mi_mapping_fields = z2ui5_cl_ajson_mapping.create_field_mapping(it_mapping_fields);
  }

  to_abap() {
    rv_result = this.mi_mapping_fields.to_abap({ iv_path, iv_name });
  }

  to_json() {
    rv_result = this.mi_mapping_fields.to_json({ iv_path, iv_name });
    if (rv_result) {
      return;
    }
    rv_result = iv_name.toUpperCase();
  }

  rename_node() {
    cv_name = cv_name.toUpperCase();
  }
}



class lcl_mapping_to_lower {
  mi_mapping_fields = null;

  constructor({ it_mapping_fields } = {}) {
    this.mi_mapping_fields = z2ui5_cl_ajson_mapping.create_field_mapping(it_mapping_fields);
  }

  to_abap() {
    rv_result = this.mi_mapping_fields.to_abap({ iv_path, iv_name });
  }

  to_json() {
    rv_result = this.mi_mapping_fields.to_json({ iv_path, iv_name });
    if (rv_result) {
      return;
    }
    rv_result = iv_name.toLowerCase();
  }

  rename_node() {
    cv_name = cv_name.toLowerCase();
  }
}



class lcl_mapping_camel {
  mv_first_json_upper = false;
  mi_mapping_fields = null;

  constructor({ it_mapping_fields, iv_first_json_upper = true } = {}) {
    this.mi_mapping_fields = z2ui5_cl_ajson_mapping.create_field_mapping(it_mapping_fields);
    this.mv_first_json_upper = z2ui5_cl_util.abap_copy(iv_first_json_upper);
  }

  to_abap() {
    rv_result = this.mi_mapping_fields.to_abap({ iv_path, iv_name });
    if (rv_result) {
      return;
    }
    rv_result = z2ui5_cl_util.abap_copy(iv_name);
    // TODO(abap2js): REPLACE ALL OCCURRENCES OF REGEX `([a-z])([A-Z])` IN rv_result WITH `$1_$2` .
  }

  to_json() {
    let sy_tabix = 0;
    let lt_tokens = [];
    let lv_from = 0;
    rv_result = this.mi_mapping_fields.to_json({ iv_path, iv_name });
    if (rv_result) {
      return;
    }
    rv_result = z2ui5_cl_util.abap_copy(iv_name);
    // TODO(abap2js): REPLACE ALL OCCURRENCES OF `__` IN rv_result WITH `*`.
    // TODO(abap2js): TRANSLATE rv_result TO LOWER CASE.
    // TODO(abap2js): TRANSLATE rv_result USING `/_:_~_`.
    if ((this.mv_first_json_upper === true || this.mv_first_json_upper === `X`)) {
      lv_from = 1;
    } else {
      lv_from = 2;
    }
    lt_tokens = rv_result.split(`_`);
    sy_tabix = 0;
    for (const fs_token of lt_tokens) {
      sy_tabix++;
      // TODO(abap2js): TRANSLATE <token>(1) TO UPPER CASE.
    }
    rv_result = [lines, of_, lt_tokens].join(``);
    // TODO(abap2js): REPLACE ALL OCCURRENCES OF `*` IN rv_result WITH `_`.
  }

  rename_node() {
  }
}



class lcl_compound_mapper {
  mt_queue = null;

  constructor({ it_queue } = {}) {
    this.mt_queue = z2ui5_cl_util.abap_copy(it_queue);
  }

  rename_node() {
    let sy_tabix = 0;
    let ls_node = null;
    let li_mapper = null;
    ls_node = z2ui5_cl_util.abap_copy(is_node);
    sy_tabix = 0;
    for (const li_mapper of this.mt_queue) {
      sy_tabix++;
      li_mapper.rename_node({ is_node: ls_node, cv_name });
      ls_node.name = z2ui5_cl_util.abap_copy(cv_name);
    }
  }

  to_abap() {
  }

  to_json() {
  }
}



class lcl_to_snake {
  rename_node() {
    // TODO(abap2js): REPLACE ALL OCCURRENCES OF REGEX `([a-z])([A-Z])` IN cv_name WITH `$1_$2` .
    cv_name = cv_name.toLowerCase();
  }

  to_abap() {
  }

  to_json() {
  }
}



class lcl_to_camel {
  mv_first_json_upper = false;

  constructor({ iv_first_json_upper } = {}) {
    this.mv_first_json_upper = z2ui5_cl_util.abap_copy(iv_first_json_upper);
  }

  rename_node() {
    let sy_tabix = 0;
    const lc_forced_underscore_marker = cl_abap_char_utilities;
    let lt_tokens = [];
    let lv_from = 0;
    if ((this.mv_first_json_upper === true || this.mv_first_json_upper === `X`)) {
      lv_from = 1;
    } else {
      lv_from = 2;
    }
    // TODO(abap2js): REPLACE ALL OCCURRENCES OF `__` IN cv_name WITH lc_forced_underscore_marker.
    lt_tokens = cv_name.split(`_`);
    for (let _i = lt_tokens.length - 1; _i >= 0; _i--) { const row = lt_tokens[_i]; if (!row.table_line) lt_tokens.splice(_i, 1); }
    sy_tabix = 0;
    for (const fs_token of lt_tokens) {
      sy_tabix++;
      // TODO(abap2js): TRANSLATE <token>+0(1) TO UPPER CASE.
    }
    cv_name = [lines, of_, lt_tokens].join(``);
    // TODO(abap2js): REPLACE ALL OCCURRENCES OF lc_forced_underscore_marker IN cv_name WITH `_`.
  }

  to_abap() {
  }

  to_json() {
  }
}



class ltcl_test_mappers {
  from_json_to_json() {
    let lo_ajson = null;
    lo_ajson = z2ui5_cl_ajson.parse({ iv_json: `{"fieldData":"field_value"}`, ii_custom_mapping: z2ui5_cl_ajson_mapping.create_camel_case({ iv_first_json_upper: false }) });
    lo_ajson.set_string({ iv_path: `/fieldData`, iv_val: `E` });
    cl_abap_unit_assert.assert_equals({ act: lo_ajson.stringify(), exp: `{"fieldData":"E"}` });
  }

  to_abap() {
    let lo_ajson = null;
    let li_mapping = null;
    // TODO(abap2js): DATA BEGIN OF ls_result,
    let field_data = ``;
    // TODO(abap2js): DATA END OF ls_result.
    li_mapping = z2ui5_cl_ajson_mapping.create_camel_case();
    lo_ajson = z2ui5_cl_ajson.parse({ iv_json: `{"FieldData":"field_value"}`, ii_custom_mapping: li_mapping });
    // TODO(abap2js): lo_ajson->to_abap( IMPORTING ev_container = ls_result ).
    cl_abap_unit_assert.assert_equals({ act: ls_result.field_data, exp: `field_value` });
  }

  to_json() {
    let lo_ajson = null;
    let li_mapping = null;
    // TODO(abap2js): DATA BEGIN OF ls_result,
    let field_data = ``;
    // TODO(abap2js): DATA END OF ls_result.
    li_mapping = z2ui5_cl_ajson_mapping.create_camel_case({ iv_first_json_upper: false });
    ls_result.field_data = `field_value`;
    lo_ajson = z2ui5_cl_ajson.create_empty({ ii_custom_mapping: li_mapping });
    lo_ajson.set({ iv_path: `/`, iv_val: ls_result });
    cl_abap_unit_assert.assert_equals({ act: lo_ajson.stringify(), exp: `{"fieldData":"field_value"}` });
  }

  to_json_nested_struc() {
    let lo_ajson = null;
    let li_mapping = null;
    // TODO(abap2js): DATA BEGIN OF ls_result,
    let field_data = ``;
    // TODO(abap2js): DATA BEGIN OF struc_data,
    let field_more = ``;
    // TODO(abap2js): DATA END OF struc_data,
    // TODO(abap2js): DATA END OF ls_result.
    li_mapping = z2ui5_cl_ajson_mapping.create_camel_case({ iv_first_json_upper: false });
    ls_result.field_data = `field_value`;
    ls_result.struc_data.field_more = `field_more`;
    lo_ajson = z2ui5_cl_ajson.create_empty({ ii_custom_mapping: li_mapping });
    lo_ajson.set({ iv_path: `/`, iv_val: ls_result });
    cl_abap_unit_assert.assert_equals({ act: lo_ajson.stringify(), exp: `{"fieldData":"field_value","strucData":{"fieldMore":"field_more"}}` });
  }

  to_json_nested_table() {
    let lo_ajson = null;
    let li_mapping = null;
    let lv_value = ``;
    // TODO(abap2js): DATA BEGIN OF ls_result,
    let field_data = ``;
    // TODO(abap2js): DATA BEGIN OF struc_data,
    let field_more = [];
    // TODO(abap2js): DATA END OF struc_data,
    // TODO(abap2js): DATA END OF ls_result.
    li_mapping = z2ui5_cl_ajson_mapping.create_camel_case({ iv_first_json_upper: false });
    ls_result.field_data = `field_value`;
    lv_value = `field_more`;
    ls_result.struc_data.field_more.push(lv_value);
    lo_ajson = z2ui5_cl_ajson.create_empty({ ii_custom_mapping: li_mapping });
    lo_ajson.set({ iv_path: `/`, iv_val: ls_result });
    cl_abap_unit_assert.assert_equals({ act: lo_ajson.stringify(), exp: `{"fieldData":"field_value","strucData":{"fieldMore":["field_more"]}}` });
  }

  to_json_first_lower() {
    let lo_ajson = null;
    let li_mapping = null;
    // TODO(abap2js): DATA BEGIN OF ls_result,
    let field_data = ``;
    // TODO(abap2js): DATA END OF ls_result.
    li_mapping = z2ui5_cl_ajson_mapping.create_camel_case();
    ls_result.field_data = `field_value`;
    lo_ajson = z2ui5_cl_ajson.create_empty({ ii_custom_mapping: li_mapping });
    lo_ajson.set({ iv_path: `/`, iv_val: ls_result });
    cl_abap_unit_assert.assert_equals({ act: lo_ajson.stringify(), exp: `{"FieldData":"field_value"}` });
  }

  test_to_upper() {
    cl_abap_unit_assert.assert_equals({ act: z2ui5_cl_ajson.create_from({ ii_source_json: z2ui5_cl_ajson.parse(`{"a":1,"b":{"c":2}}`), ii_mapper: z2ui5_cl_ajson_mapping.create_upper_case() }).stringify(), exp: `{"A":1,"B":{"C":2}}` });
    cl_abap_unit_assert.assert_equals({ act: z2ui5_cl_ajson.parse(`{"a":1,"b":{"c":2}}`).map(z2ui5_cl_ajson_mapping.create_upper_case()).stringify(), exp: `{"A":1,"B":{"C":2}}` });
  }

  test_to_lower() {
    cl_abap_unit_assert.assert_equals({ act: z2ui5_cl_ajson.create_from({ ii_source_json: z2ui5_cl_ajson.parse(`{"A":1,"B":{"C":2}}`), ii_mapper: z2ui5_cl_ajson_mapping.create_lower_case() }).stringify(), exp: `{"a":1,"b":{"c":2}}` });
    cl_abap_unit_assert.assert_equals({ act: z2ui5_cl_ajson.parse(`{"A":1,"B":{"C":2}}`).map(z2ui5_cl_ajson_mapping.create_lower_case()).stringify(), exp: `{"a":1,"b":{"c":2}}` });
  }

  rename_by_attr() {
    let lt_map = null;
    let fs_i = {};
    lt_map.push(fs_i);
    fs_i.from = `a`;
    fs_i.to = `x`;
    fs_i = {};
    lt_map.push(fs_i);
    fs_i.from = `c`;
    fs_i.to = `y`;
    fs_i = {};
    lt_map.push(fs_i);
    fs_i.from = `d`;
    fs_i.to = `z`;
    cl_abap_unit_assert.assert_equals({ act: z2ui5_cl_ajson.create_from({ ii_source_json: z2ui5_cl_ajson.parse(`{"a":1,"b":{"c":2},"d":{"e":3}}`), ii_mapper: z2ui5_cl_ajson_mapping.create_rename(lt_map) }).stringify(), exp: `{"b":{"y":2},"x":1,"z":{"e":3}}` });
  }

  rename_by_path() {
    let lt_map = null;
    let fs_i = {};
    lt_map.push(fs_i);
    fs_i.from = `/b/a`;
    fs_i.to = `x`;
    cl_abap_unit_assert.assert_equals({ act: z2ui5_cl_ajson.create_from({ ii_source_json: z2ui5_cl_ajson.parse(`{"a":1,"b":{"a":2},"c":{"a":3}}`), ii_mapper: z2ui5_cl_ajson_mapping.create_rename({ it_rename_map: lt_map, iv_rename_by: z2ui5_cl_ajson_mapping.rename_by.full_path }) }).stringify(), exp: `{"a":1,"b":{"x":2},"c":{"a":3}}` });
  }

  rename_by_pattern() {
    let lt_map = null;
    let fs_i = {};
    lt_map.push(fs_i);
    fs_i.from = `/*/this*`;
    fs_i.to = `x`;
    cl_abap_unit_assert.assert_equals({ act: z2ui5_cl_ajson.create_from({ ii_source_json: z2ui5_cl_ajson.parse(`{"andthisnot":1,"b":{"thisone":2},"c":{"a":3}}`), ii_mapper: z2ui5_cl_ajson_mapping.create_rename({ it_rename_map: lt_map, iv_rename_by: z2ui5_cl_ajson_mapping.rename_by.pattern }) }).stringify(), exp: `{"andthisnot":1,"b":{"x":2},"c":{"a":3}}` });
  }

  compound_mapper() {
    let lt_map = null;
    let fs_i = {};
    lt_map.push(fs_i);
    fs_i.from = `/b/a`;
    fs_i.to = `x`;
    cl_abap_unit_assert.assert_equals({ act: z2ui5_cl_ajson.create_from({ ii_source_json: z2ui5_cl_ajson.parse(`{"a":1,"b":{"a":2},"c":{"a":3}}`), ii_mapper: z2ui5_cl_ajson_mapping.create_compound_mapper({ ii_mapper1: z2ui5_cl_ajson_mapping.create_rename({ it_rename_map: lt_map, iv_rename_by: z2ui5_cl_ajson_mapping.rename_by.full_path }), ii_mapper2: z2ui5_cl_ajson_mapping.create_upper_case() }) }).stringify(), exp: `{"A":1,"B":{"X":2},"C":{"A":3}}` });
  }

  to_snake() {
    cl_abap_unit_assert.assert_equals({ act: z2ui5_cl_ajson.create_from({ ii_source_json: z2ui5_cl_ajson.parse(`{"aB":1,"BbC":2,"cD":{"xY":3},"ZZ":4}`), ii_mapper: z2ui5_cl_ajson_mapping.create_to_snake_case() }).stringify(), exp: `{"a_b":1,"bb_c":2,"c_d":{"x_y":3},"zz":4}` });
  }

  to_camel() {
    cl_abap_unit_assert.assert_equals({ act: z2ui5_cl_ajson.create_from({ ii_source_json: z2ui5_cl_ajson.parse(`{"a_b":1,"bb_c":2,"c_d":{"x_y":3},"zz":4}`), ii_mapper: z2ui5_cl_ajson_mapping.create_to_camel_case() }).stringify(), exp: `{"aB":1,"bbC":2,"cD":{"xY":3},"zz":4}` });
    cl_abap_unit_assert.assert_equals({ act: z2ui5_cl_ajson.create_from({ ii_source_json: z2ui5_cl_ajson.parse(`{"a__b":1}`), ii_mapper: z2ui5_cl_ajson_mapping.create_to_camel_case() }).stringify(), exp: `{"a_b":1}` });
  }

  to_camel_1st_upper() {
    cl_abap_unit_assert.assert_equals({ act: z2ui5_cl_ajson.create_from({ ii_source_json: z2ui5_cl_ajson.parse(`{"aj_bc":1,"bb_c":2,"c_d":{"xq_yq":3},"zz":4}`), ii_mapper: z2ui5_cl_ajson_mapping.create_to_camel_case({ iv_first_json_upper: true }) }).stringify(), exp: `{"AjBc":1,"BbC":2,"CD":{"XqYq":3},"Zz":4}` });
  }
}



class ltcl_fields {
  to_abap() {
    let lo_ajson = null;
    let li_mapping = null;
    let lt_mapping_fields = null;
    let ls_mapping_field = null;
    // TODO(abap2js): DATA BEGIN OF ls_result,
    let abap_field = ``;
    let field = ``;
    // TODO(abap2js): DATA END OF ls_result.
    ls_mapping_field = null;
    ls_mapping_field.abap = `ABAP_FIELD`;
    ls_mapping_field.json = `json.field`;
    lt_mapping_fields.push(ls_mapping_field);
    li_mapping = z2ui5_cl_ajson_mapping.create_field_mapping(lt_mapping_fields);
    lo_ajson = z2ui5_cl_ajson.parse({ iv_json: `{"field":"value","json.field":"field_value"}`, ii_custom_mapping: li_mapping });
    // TODO(abap2js): lo_ajson->to_abap( IMPORTING ev_container = ls_result ).
    cl_abap_unit_assert.assert_equals({ act: ls_result.abap_field, exp: `field_value` });
    cl_abap_unit_assert.assert_equals({ act: ls_result.field, exp: `value` });
  }

  to_abap_with_slice() {
    // TODO(abap2js): DATA BEGIN OF ls_act,
    let y = 0;
    // TODO(abap2js): DATA END OF ls_act.
    let lo_cut = null;
    let lt_mapping_fields = null;
    let ls_mapping_field = null;
    ls_mapping_field = null;
    ls_mapping_field.abap = `Y`;
    ls_mapping_field.json = `c`;
    lt_mapping_fields.push(ls_mapping_field);
    lo_cut = z2ui5_cl_ajson.parse({ iv_json: `{"a":1,"b":{"c":2},"d":{"e":3}}`, ii_custom_mapping: z2ui5_cl_ajson_mapping.create_field_mapping(lt_mapping_fields) }).slice(`/b`);
    // TODO(abap2js): lo_cut->to_abap( IMPORTING ev_container = ls_act ).
    cl_abap_unit_assert.assert_equals({ act: ls_act.y, exp: 2 });
  }

  to_json_without_path() {
    cl_abap_unit_assert.assert_equals({ act: this.to_json({ iv_path: `/` }), exp: `{"field":"value","json.field":"field_value"}` });
  }

  to_json_with_path() {
    cl_abap_unit_assert.assert_equals({ act: this.to_json({ iv_path: `/samplePath` }), exp: `{"samplePath":{"field":"value","json.field":"field_value"}}` });
  }

  to_json({ iv_path } = {}) {
    let rv_result = ``;
    let lo_ajson = null;
    let li_mapping = null;
    let lt_mapping_fields = null;
    let ls_mapping_field = null;
    // TODO(abap2js): DATA BEGIN OF ls_result,
    let abap_field = ``;
    let field = ``;
    // TODO(abap2js): DATA END OF ls_result.
    ls_mapping_field = null;
    ls_mapping_field.abap = `ABAP_FIELD`;
    ls_mapping_field.json = `json.field`;
    lt_mapping_fields.push(ls_mapping_field);
    li_mapping = z2ui5_cl_ajson_mapping.create_field_mapping(lt_mapping_fields);
    ls_result.abap_field = `field_value`;
    ls_result.field = `value`;
    lo_ajson = z2ui5_cl_ajson.create_empty({ ii_custom_mapping: li_mapping });
    lo_ajson.set({ iv_path, iv_val: ls_result });
    rv_result = lo_ajson.stringify();
    return rv_result;
  }
}



class ltcl_to_lower {
  to_json() {
    let lo_ajson = null;
    let li_mapping = null;
    // TODO(abap2js): DATA BEGIN OF ls_result,
    let field_data = ``;
    // TODO(abap2js): DATA END OF ls_result.
    li_mapping = z2ui5_cl_ajson_mapping.create_lower_case();
    ls_result.field_data = `field_value`;
    lo_ajson = z2ui5_cl_ajson.create_empty({ ii_custom_mapping: li_mapping });
    lo_ajson.set({ iv_path: `/`, iv_val: ls_result });
    cl_abap_unit_assert.assert_equals({ act: lo_ajson.stringify(), exp: `{"field_data":"field_value"}` });
  }
}



class ltcl_to_upper {
  to_json() {
    let lo_ajson = null;
    let li_mapping = null;
    // TODO(abap2js): DATA BEGIN OF ls_result,
    let field_data = ``;
    // TODO(abap2js): DATA END OF ls_result.
    li_mapping = z2ui5_cl_ajson_mapping.create_upper_case();
    ls_result.field_data = `field_value`;
    lo_ajson = z2ui5_cl_ajson.create_empty({ ii_custom_mapping: li_mapping });
    lo_ajson.set({ iv_path: `/`, iv_val: ls_result });
    cl_abap_unit_assert.assert_equals({ act: lo_ajson.stringify(), exp: `{"FIELD_DATA":"field_value"}` });
  }
}



module.exports = {
  __main: "z2ui5_cl_ajson_mapping",
  __classes: { lcl_mapping_fields, lcl_rename, lcl_mapping_to_upper, lcl_mapping_to_lower, lcl_mapping_camel, lcl_compound_mapper, lcl_to_snake, lcl_to_camel, ltcl_test_mappers, ltcl_fields, ltcl_to_lower, ltcl_to_upper },
  __tests: {"ltcl_test_mappers":["from_json_to_json","to_abap","to_json","to_json_nested_struc","to_json_nested_table","to_json_first_lower","to_snake","to_camel","to_camel_1st_upper","rename_by_attr","rename_by_path","rename_by_pattern","compound_mapper","test_to_upper","test_to_lower"],"ltcl_fields":["to_json_without_path","to_json_with_path","to_abap","to_abap_with_slice"],"ltcl_to_lower":["to_json"],"ltcl_to_upper":["to_json"]},
};
