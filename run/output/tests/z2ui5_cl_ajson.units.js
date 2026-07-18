// GENERATED from run/input/abap2UI5/src/00/01/z2ui5_cl_ajson.clas.testclasses.abap — do not edit
const cl_abap_char_utilities = require("abap2UI5/cl_abap_char_utilities");
const cl_abap_typedescr = require("abap2UI5/cl_abap_typedescr");
const cl_abap_unit_assert = require("abap2UI5/cl_abap_unit_assert");
const z2ui5_cl_ajson = require("abap2UI5/z2ui5_cl_ajson");
const z2ui5_cl_ajson_refinitlib = require("abap2UI5/z2ui5_cl_ajson_refinitlib");
const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");
const z2ui5_if_ajson_filter = require("abap2UI5/z2ui5_if_ajson_filter");
const z2ui5_if_ajson_types = require("abap2UI5/z2ui5_if_ajson_types");
const { lcl_utils, lcl_json_parser, lcl_json_serializer, lcl_json_to_abap, lcl_abap_to_json, lcl_filter_runner, lcl_mapper_runner, lcl_mutator_queue } = require("abap2UI5/z2ui5_cl_ajson").__locals;

// transpiled ABAP interface — constants only, types/methods have no JS form
const lif_kind = {
  any: cl_abap_typedescr.typekind_any,
  date: cl_abap_typedescr.typekind_date,
  time: cl_abap_typedescr.typekind_time,
  packed: cl_abap_typedescr.typekind_packed,
  table: cl_abap_typedescr.typekind_table,
  struct_flat: cl_abap_typedescr.typekind_struct1,
  struct_deep: cl_abap_typedescr.typekind_struct2,
  data_ref: cl_abap_typedescr.typekind_dref,
  object_ref: cl_abap_typedescr.typekind_oref,
  utclong: `p`,
  enum: `k`,
  numeric: { int1: cl_abap_typedescr.typekind_int1, int2: cl_abap_typedescr.typekind_int2, int4: cl_abap_typedescr.typekind_int, int8: `8`, float: cl_abap_typedescr.typekind_float, packed: cl_abap_typedescr.typekind_packed, decfloat16: cl_abap_typedescr.typekind_decfloat16, decfloat34: cl_abap_typedescr.typekind_decfloat34 },
  texts: { char: cl_abap_typedescr.typekind_char, numc: cl_abap_typedescr.typekind_num, string: cl_abap_typedescr.typekind_string },
  binary: { hex: cl_abap_typedescr.typekind_hex, xstring: cl_abap_typedescr.typekind_xstring },
  deep_targets: { table: cl_abap_typedescr.typekind_table, struct_flat: cl_abap_typedescr.typekind_struct1, struct_deep: cl_abap_typedescr.typekind_struct2, data_ref: cl_abap_typedescr.typekind_dref, object_ref: cl_abap_typedescr.typekind_oref },
};


// transpiled ABAP interface — constants only, types/methods have no JS form
const lif_mutator_runner = {
};



class lcl_nodes_helper {
  mt_nodes = [];

  add({ iv_str } = {}) {
    let lv_children = ``;
    let lv_index = ``;
    let lv_order = ``;
    let fs_n = {};
    this.mt_nodes.push(fs_n);
    [fs_n.path, fs_n.name, fs_n.type, fs_n.value, lv_index, lv_children, lv_order] = iv_str.split(`|`);
    fs_n.path = String(fs_n.path).replace(/^ +| +$/g, "").replace(/ +/g, ` `);
    fs_n.name = String(fs_n.name).replace(/^ +| +$/g, "").replace(/ +/g, ` `);
    fs_n.type = String(fs_n.type).replace(/^ +| +$/g, "").replace(/ +/g, ` `);
    fs_n.value = String(fs_n.value).replace(/^ +| +$/g, "").replace(/ +/g, ` `);
    fs_n.index = z2ui5_cl_util.abap_tab_assign(fs_n.index, z2ui5_cl_util.abap_copy(lv_index));
    fs_n.children = z2ui5_cl_util.abap_tab_assign(fs_n.children, z2ui5_cl_util.abap_copy(lv_children));
    fs_n.order = z2ui5_cl_util.abap_tab_assign(fs_n.order, z2ui5_cl_util.abap_copy(lv_order));
  }

  sorted() {
    let rt_nodes = [];
    rt_nodes = z2ui5_cl_util.abap_tab_assign(rt_nodes, z2ui5_cl_util.abap_copy(this.mt_nodes));
    return rt_nodes;
  }

  clear() {
    this.mt_nodes = [];
  }
}





class ltcl_parser_test {
  mo_cut = null;
  mo_nodes = null;

  setup() {
    this.mo_cut = new lcl_json_parser();
    this.mo_nodes = new lcl_nodes_helper();
  }

  parse_bare_values() {
    let lt_act = [];
    this.mo_nodes.add({ iv_str: ` | |str |abc | |0` });
    lt_act = this.mo_cut.parse({ iv_json: `"abc"` });
    cl_abap_unit_assert.assert_equals({ act: lt_act, exp: this.mo_nodes.mt_nodes });
    this.mo_nodes.clear();
    this.mo_nodes.add({ iv_str: ` | |num |-123 | |0` });
    lt_act = this.mo_cut.parse({ iv_json: `-123` });
    cl_abap_unit_assert.assert_equals({ act: lt_act, exp: this.mo_nodes.mt_nodes });
    this.mo_nodes.clear();
    this.mo_nodes.add({ iv_str: ` | |bool |true | |0` });
    lt_act = this.mo_cut.parse({ iv_json: `true` });
    cl_abap_unit_assert.assert_equals({ act: lt_act, exp: this.mo_nodes.mt_nodes });
    this.mo_nodes.clear();
    this.mo_nodes.add({ iv_str: ` | |bool |false | |0` });
    lt_act = this.mo_cut.parse({ iv_json: `false` });
    cl_abap_unit_assert.assert_equals({ act: lt_act, exp: this.mo_nodes.mt_nodes });
    this.mo_nodes.clear();
    this.mo_nodes.add({ iv_str: ` | |null | | |0` });
    lt_act = this.mo_cut.parse({ iv_json: `null` });
    cl_abap_unit_assert.assert_equals({ act: lt_act, exp: this.mo_nodes.mt_nodes });
  }

  parse_error() {
    let lt_act = [];
    let lx_err = null;
    try {
      lt_act = this.mo_cut.parse({ iv_json: `abc` });
      cl_abap_unit_assert.fail(`Parsing of string w/o quotes must fail (spec)`);
    } catch (_caught1) {
      lx_err = _caught1;
      cl_abap_unit_assert.assert_char_cp({ act: lx_err.get_text(), exp: `*parsing error*` });
      cl_abap_unit_assert.assert_char_cp({ act: lx_err.location, exp: `Line 1, Offset 1` });
    }
    try {
      lt_act = this.mo_cut.parse({ iv_json: `{` + cl_abap_char_utilities.newline + `"ok": "abc",` + cl_abap_char_utilities.newline + `"error"` + cl_abap_char_utilities.newline + `}` });
      cl_abap_unit_assert.fail(`Parsing of invalid JSON must fail (spec)`);
    } catch (_caught2) {
      lx_err = _caught2;
      cl_abap_unit_assert.assert_char_cp({ act: lx_err.get_text(), exp: `*parsing error*` });
      cl_abap_unit_assert.assert_char_cp({ act: lx_err.location, exp: `Line 3, Offset 8` });
    }
  }

  parse_string() {
    this.mo_nodes.add({ iv_str: `                 |         |object |                        |  |1` });
    this.mo_nodes.add({ iv_str: `/                |string   |str    |abc                     |  |0` });
    let lt_act = [];
    lt_act = this.mo_cut.parse({ iv_json: `{"string": "abc"}` });
    cl_abap_unit_assert.assert_equals({ act: lt_act, exp: this.mo_nodes.mt_nodes });
  }

  parse_number() {
    this.mo_nodes.add({ iv_str: `                 |         |object |                        |  |1` });
    this.mo_nodes.add({ iv_str: `/                |number   |num    |123                     |  |0` });
    let lt_act = [];
    lt_act = this.mo_cut.parse({ iv_json: `{"number": 123}` });
    cl_abap_unit_assert.assert_equals({ act: lt_act, exp: this.mo_nodes.mt_nodes });
  }

  parse_float() {
    this.mo_nodes.add({ iv_str: `                 |         |object |                        |  |1` });
    this.mo_nodes.add({ iv_str: `/                |float    |num    |123.45                  |  |0` });
    let lt_act = [];
    this.mo_cut = new lcl_json_parser();
    lt_act = this.mo_cut.parse({ iv_json: `{"float": 123.45}` });
    cl_abap_unit_assert.assert_equals({ act: lt_act, exp: this.mo_nodes.mt_nodes });
  }

  parse_boolean() {
    this.mo_nodes.add({ iv_str: `                 |         |object |                        |  |1` });
    this.mo_nodes.add({ iv_str: `/                |boolean  |bool   |true                    |  |0` });
    let lt_act = [];
    lt_act = this.mo_cut.parse({ iv_json: `{"boolean": true}` });
    cl_abap_unit_assert.assert_equals({ act: lt_act, exp: this.mo_nodes.mt_nodes });
  }

  parse_false() {
    this.mo_nodes.add({ iv_str: `                 |         |object |                        |  |1` });
    this.mo_nodes.add({ iv_str: `/                |false    |bool   |false                   |  |0` });
    let lt_act = [];
    lt_act = this.mo_cut.parse({ iv_json: `{"false": false}` });
    cl_abap_unit_assert.assert_equals({ act: lt_act, exp: this.mo_nodes.mt_nodes });
  }

  parse_null() {
    this.mo_nodes.add({ iv_str: `                 |         |object |                        |  |1` });
    this.mo_nodes.add({ iv_str: `/                |null     |null   |                        |  |0` });
    let lt_act = [];
    lt_act = this.mo_cut.parse({ iv_json: `{"null": null}` });
    cl_abap_unit_assert.assert_equals({ act: lt_act, exp: this.mo_nodes.mt_nodes });
  }

  parse_date() {
    this.mo_nodes.add({ iv_str: `                 |         |object |                        |  |1` });
    this.mo_nodes.add({ iv_str: `/                |date     |str    |2020-03-15              |  |0` });
    let lt_act = [];
    lt_act = this.mo_cut.parse({ iv_json: `{"date": "2020-03-15"}` });
    cl_abap_unit_assert.assert_equals({ act: lt_act, exp: this.mo_nodes.mt_nodes });
  }

  parse_input_xstring() {
    this.mo_nodes.add({ iv_str: `                 |         |object |                        |  |1` });
    this.mo_nodes.add({ iv_str: `/                |string   |str    |abc                     |  |0` });
    let lt_act = [];
    let lv_xstr = null;
    lv_xstr = `7B22737472696E67223A2022616263227D0A`;
    lt_act = this.mo_cut.parse({ iv_json: lv_xstr });
    cl_abap_unit_assert.assert_equals({ act: lt_act, exp: this.mo_nodes.mt_nodes });
  }

  parse_input_string() {
    this.mo_nodes.add({ iv_str: `                 |         |object |                        |  |1` });
    this.mo_nodes.add({ iv_str: `/                |string   |str    |abc                     |  |0` });
    let lt_act = [];
    let lv_str = ``;
    lv_str = `{"string": "abc"}`;
    lt_act = this.mo_cut.parse({ iv_json: lv_str });
    cl_abap_unit_assert.assert_equals({ act: lt_act, exp: this.mo_nodes.mt_nodes });
  }

  parse_input_string_table() {
    this.mo_nodes.add({ iv_str: `                 |         |object |                        |  |2` });
    this.mo_nodes.add({ iv_str: `/                |string   |str    |abc                     |  |0` });
    this.mo_nodes.add({ iv_str: `/                |number   |num    |123                     |  |0` });
    let lt_act = [];
    let lt_json = [];
    lt_json.push(z2ui5_cl_util.abap_copy(`{`));
    lt_json.push(z2ui5_cl_util.abap_copy(`"string": "abc",`));
    lt_json.push(z2ui5_cl_util.abap_copy(`"number": 123`));
    lt_json.push(z2ui5_cl_util.abap_copy(`}`));
    lt_act = this.mo_cut.parse({ iv_json: lt_json });
    cl_abap_unit_assert.assert_equals({ act: lt_act, exp: this.mo_nodes.mt_nodes });
  }

  parse_input_error() {
    let lo_cut = null;
    let lx = null;
    let lv_numc = ``;
    let lt_hashed = [];
    lo_cut = new lcl_json_parser();
    try {
      lo_cut.parse({ iv_json: lv_numc });
      cl_abap_unit_assert.fail();
    } catch (_caught1) {
      lx = _caught1;
      cl_abap_unit_assert.assert_not_initial(lx);
    }
    try {
      lo_cut.parse({ iv_json: lt_hashed });
      cl_abap_unit_assert.fail();
    } catch (_caught2) {
      lx = _caught2;
      cl_abap_unit_assert.assert_not_initial(lx);
    }
  }

  static sample_json({ iv_separator } = {}) {
    let rv_json = ``;
    rv_json = `{\\n` + `  "string": "abc",\\n` + `  "number": 123,\\n` + `  "float": 123.45,\\n` + `  "boolean": true,\\n` + `  "false": false,\\n` + `  "null": null,\\n` + `  "date": "2020-03-15",\\n` + `  "issues": [\\n` + `    {\\n` + `      "message": "Indentation problem ...",\\n` + `      "key": "indentation",\\n` + `      "start": {\\n` + `        "row": 4,\\n` + `        "col": 3\\n` + `      },\\n` + `      "end": {\\n` + `        "row": 4,\\n` + `        "col": 26\\n` + `      },\\n` + `      "filename": "./zxxx.prog.abap"\\n` + `    },\\n` + `    {\\n` + `      "message": "Remove space before XXX",\\n` + `      "key": "space_before_dot",\\n` + `      "start": {\\n` + `        "row": 3,\\n` + `        "col": 21\\n` + `      },\\n` + `      "end": {\\n` + `        "row": 3,\\n` + `        "col": 22\\n` + `      },\\n` + `      "filename": "./zxxx.prog.abap"\\n` + `    }\\n` + `  ]\\n` + `}`;
    rv_json = String(rv_json).replaceAll(`\\n`, iv_separator ?? ``);
    return rv_json;
  }

  parse() {
    let lo_cut = null;
    let lt_act = [];
    let lo_nodes = null;
    lo_nodes = new lcl_nodes_helper();
    lo_nodes.add({ iv_str: `                 |         |object |                        |  |8` });
    lo_nodes.add({ iv_str: `/                |string   |str    |abc                     |  |0` });
    lo_nodes.add({ iv_str: `/                |number   |num    |123                     |  |0` });
    lo_nodes.add({ iv_str: `/                |float    |num    |123.45                  |  |0` });
    lo_nodes.add({ iv_str: `/                |boolean  |bool   |true                    |  |0` });
    lo_nodes.add({ iv_str: `/                |false    |bool   |false                   |  |0` });
    lo_nodes.add({ iv_str: `/                |null     |null   |                        |  |0` });
    lo_nodes.add({ iv_str: `/                |date     |str    |2020-03-15              |  |0` });
    lo_nodes.add({ iv_str: `/                |issues   |array  |                        |  |2` });
    lo_nodes.add({ iv_str: `/issues/         |1        |object |                        |1 |5` });
    lo_nodes.add({ iv_str: `/issues/1/       |message  |str    |Indentation problem ... |  |0` });
    lo_nodes.add({ iv_str: `/issues/1/       |key      |str    |indentation             |  |0` });
    lo_nodes.add({ iv_str: `/issues/1/       |start    |object |                        |  |2` });
    lo_nodes.add({ iv_str: `/issues/1/start/ |row      |num    |4                       |  |0` });
    lo_nodes.add({ iv_str: `/issues/1/start/ |col      |num    |3                       |  |0` });
    lo_nodes.add({ iv_str: `/issues/1/       |end      |object |                        |  |2` });
    lo_nodes.add({ iv_str: `/issues/1/end/   |row      |num    |4                       |  |0` });
    lo_nodes.add({ iv_str: `/issues/1/end/   |col      |num    |26                      |  |0` });
    lo_nodes.add({ iv_str: `/issues/1/       |filename |str    |./zxxx.prog.abap        |  |0` });
    lo_nodes.add({ iv_str: `/issues/         |2        |object |                        |2 |5` });
    lo_nodes.add({ iv_str: `/issues/2/       |message  |str    |Remove space before XXX |  |0` });
    lo_nodes.add({ iv_str: `/issues/2/       |key      |str    |space_before_dot        |  |0` });
    lo_nodes.add({ iv_str: `/issues/2/       |start    |object |                        |  |2` });
    lo_nodes.add({ iv_str: `/issues/2/start/ |row      |num    |3                       |  |0` });
    lo_nodes.add({ iv_str: `/issues/2/start/ |col      |num    |21                      |  |0` });
    lo_nodes.add({ iv_str: `/issues/2/       |end      |object |                        |  |2` });
    lo_nodes.add({ iv_str: `/issues/2/end/   |row      |num    |3                       |  |0` });
    lo_nodes.add({ iv_str: `/issues/2/end/   |col      |num    |22                      |  |0` });
    lo_nodes.add({ iv_str: `/issues/2/       |filename |str    |./zxxx.prog.abap        |  |0` });
    lo_cut = new lcl_json_parser();
    lt_act = lo_cut.parse({ iv_json: ltcl_parser_test.sample_json() });
    cl_abap_unit_assert.assert_equals({ act: lt_act, exp: lo_nodes.mt_nodes });
    lt_act = lo_cut.parse({ iv_json: ltcl_parser_test.sample_json({ iv_separator: `${cl_abap_char_utilities.newline}` }) });
    cl_abap_unit_assert.assert_equals({ act: lt_act, exp: lo_nodes.mt_nodes });
    lt_act = lo_cut.parse({ iv_json: ltcl_parser_test.sample_json({ iv_separator: `${cl_abap_char_utilities.cr_lf}` }) });
    cl_abap_unit_assert.assert_equals({ act: lt_act, exp: lo_nodes.mt_nodes });
  }

  parse_keeping_order() {
    let lo_cut = null;
    let lt_act = [];
    let lo_nodes = null;
    lo_nodes = new lcl_nodes_helper();
    lo_nodes.add({ iv_str: `                 |         |object |                        |  |8 |0` });
    lo_nodes.add({ iv_str: `/                |string   |str    |abc                     |  |0 |1` });
    lo_nodes.add({ iv_str: `/                |number   |num    |123                     |  |0 |2` });
    lo_nodes.add({ iv_str: `/                |float    |num    |123.45                  |  |0 |3` });
    lo_nodes.add({ iv_str: `/                |boolean  |bool   |true                    |  |0 |4` });
    lo_nodes.add({ iv_str: `/                |false    |bool   |false                   |  |0 |5` });
    lo_nodes.add({ iv_str: `/                |null     |null   |                        |  |0 |6` });
    lo_nodes.add({ iv_str: `/                |date     |str    |2020-03-15              |  |0 |7` });
    lo_nodes.add({ iv_str: `/                |issues   |array  |                        |  |2 |8` });
    lo_nodes.add({ iv_str: `/issues/         |1        |object |                        |1 |5 |0` });
    lo_nodes.add({ iv_str: `/issues/1/       |message  |str    |Indentation problem ... |  |0 |1` });
    lo_nodes.add({ iv_str: `/issues/1/       |key      |str    |indentation             |  |0 |2` });
    lo_nodes.add({ iv_str: `/issues/1/       |start    |object |                        |  |2 |3` });
    lo_nodes.add({ iv_str: `/issues/1/start/ |row      |num    |4                       |  |0 |1` });
    lo_nodes.add({ iv_str: `/issues/1/start/ |col      |num    |3                       |  |0 |2` });
    lo_nodes.add({ iv_str: `/issues/1/       |end      |object |                        |  |2 |4` });
    lo_nodes.add({ iv_str: `/issues/1/end/   |row      |num    |4                       |  |0 |1` });
    lo_nodes.add({ iv_str: `/issues/1/end/   |col      |num    |26                      |  |0 |2` });
    lo_nodes.add({ iv_str: `/issues/1/       |filename |str    |./zxxx.prog.abap        |  |0 |5` });
    lo_nodes.add({ iv_str: `/issues/         |2        |object |                        |2 |5 |0` });
    lo_nodes.add({ iv_str: `/issues/2/       |message  |str    |Remove space before XXX |  |0 |1` });
    lo_nodes.add({ iv_str: `/issues/2/       |key      |str    |space_before_dot        |  |0 |2` });
    lo_nodes.add({ iv_str: `/issues/2/       |start    |object |                        |  |2 |3` });
    lo_nodes.add({ iv_str: `/issues/2/start/ |row      |num    |3                       |  |0 |1` });
    lo_nodes.add({ iv_str: `/issues/2/start/ |col      |num    |21                      |  |0 |2` });
    lo_nodes.add({ iv_str: `/issues/2/       |end      |object |                        |  |2 |4` });
    lo_nodes.add({ iv_str: `/issues/2/end/   |row      |num    |3                       |  |0 |1` });
    lo_nodes.add({ iv_str: `/issues/2/end/   |col      |num    |22                      |  |0 |2` });
    lo_nodes.add({ iv_str: `/issues/2/       |filename |str    |./zxxx.prog.abap        |  |0 |5` });
    lo_cut = new lcl_json_parser();
    lt_act = lo_cut.parse({ iv_json: ltcl_parser_test.sample_json(), iv_keep_item_order: true });
    cl_abap_unit_assert.assert_equals({ act: lt_act, exp: lo_nodes.mt_nodes });
    lt_act = lo_cut.parse({ iv_json: ltcl_parser_test.sample_json({ iv_separator: `${cl_abap_char_utilities.newline}` }), iv_keep_item_order: true });
    cl_abap_unit_assert.assert_equals({ act: lt_act, exp: lo_nodes.mt_nodes });
    lt_act = lo_cut.parse({ iv_json: ltcl_parser_test.sample_json({ iv_separator: `${cl_abap_char_utilities.cr_lf}` }), iv_keep_item_order: true });
    cl_abap_unit_assert.assert_equals({ act: lt_act, exp: lo_nodes.mt_nodes });
  }

  duplicate_key() {
    let lo_cut = null;
    let lx = null;
    try {
      lo_cut = new lcl_json_parser();
      lo_cut.parse({ iv_json: `{ "a" = 1, "a" = 1 }` });
      cl_abap_unit_assert.fail();
    } catch (_caught1) {
      lx = _caught1;
      cl_abap_unit_assert.assert_not_initial(lx);
    }
  }

  non_json() {
    let lo_cut = null;
    let lx = null;
    try {
      lo_cut = new lcl_json_parser();
      lo_cut.parse({ iv_json: `<html><head><title>X</title></head><body><h1>Y</h1></body></html>` });
      cl_abap_unit_assert.fail();
    } catch (_caught1) {
      lx = _caught1;
      cl_abap_unit_assert.assert_not_initial(lx);
    }
  }

  special_characters_in_name() {
    this.mo_nodes.add({ iv_str: `                 |                 |object |                        |  |6` });
    this.mo_nodes.add({ iv_str: `/                |a\\backslash     |num    |1                       |  |0` });
    this.mo_nodes.add({ iv_str: `/                |contains/slash   |num    |2                       |  |0` });
    this.mo_nodes.add({ iv_str: `/                |quoted"text"     |num    |4                       |  |0` });
    this.mo_nodes.add({ iv_str: `/                |line
feed       |num    |5                       |  |0` });
    this.mo_nodes.add({ iv_str: `/                |with	tab        |num    |6                       |  |0` });
    this.mo_nodes.add({ iv_str: `/                |one/two/slash    |num    |7                       |  |0` });
    let lt_act = [];
    let lv_str = ``;
    lv_str = `{ "a\\\\backslash": 1, "contains/slash": 2,` + ` "quoted\\"text\\"": 4, "line\\nfeed": 5, "with\\ttab": 6,` + ` "one/two/slash": 7 }`;
    lt_act = this.mo_cut.parse({ iv_json: lv_str });
    cl_abap_unit_assert.assert_equals({ act: lt_act, exp: this.mo_nodes.mt_nodes });
  }

  special_characters_in_path() {
    this.mo_nodes.add({ iv_str: `                 |                 |object |                        |  |6` });
    this.mo_nodes.add({ iv_str: `/                |a\\backslash     |object |                        |  |1` });
    this.mo_nodes.add({ iv_str: `/a\\backslash/   |a                |num    |1                       |  |0` });
    this.mo_nodes.add({ iv_str: `/                |contains/slash   |object |                        |  |1` });
    this.mo_nodes.add({ iv_str: `/contains	slash/|b                |num    |2                       |  |0` });
    this.mo_nodes.add({ iv_str: `/                |quoted"text"     |object |                        |  |1` });
    this.mo_nodes.add({ iv_str: `/quoted"text"/   |d                |num    |4                       |  |0` });
    this.mo_nodes.add({ iv_str: `/                |line
feed       |object |                        |  |1` });
    this.mo_nodes.add({ iv_str: `/line
feed/     |e                |num    |5                       |  |0` });
    this.mo_nodes.add({ iv_str: `/                |with	tab        |object |                        |  |1` });
    this.mo_nodes.add({ iv_str: `/with	tab/      |f                |num    |6                       |  |0` });
    this.mo_nodes.add({ iv_str: `/                |one/two/slash    |object |                        |  |1` });
    this.mo_nodes.add({ iv_str: `/one	two	slash/|g                |num    |7                       |  |0` });
    let lt_act = [];
    let lv_str = ``;
    lv_str = `{ "a\\\\backslash": { "a": 1 }, "contains/slash": { "b": 2 },` + ` "quoted\\"text\\"": { "d": 4 },` + ` "line\\nfeed": { "e": 5 }, "with\\ttab": { "f": 6 },` + ` "one/two/slash": { "g": 7 } }`;
    lt_act = this.mo_cut.parse({ iv_json: lv_str });
    cl_abap_unit_assert.assert_equals({ act: lt_act, exp: this.mo_nodes.mt_nodes });
  }

  special_characters_in_value() {
    this.mo_nodes.add({ iv_str: `                 |                 |object |                        |  |6` });
    this.mo_nodes.add({ iv_str: `/                |a                |str    |a\\backslash            |  |0` });
    this.mo_nodes.add({ iv_str: `/                |b                |str    |contains/slash          |  |0` });
    this.mo_nodes.add({ iv_str: `/                |d                |str    |quoted"text"            |  |0` });
    this.mo_nodes.add({ iv_str: `/                |e                |str    |line
feed              |  |0` });
    this.mo_nodes.add({ iv_str: `/                |f                |str    |with	tab               |  |0` });
    this.mo_nodes.add({ iv_str: `/                |g                |str    |one/two/slash           |  |0` });
    let lt_act = [];
    let lv_str = ``;
    lv_str = `{ "a": "a\\\\backslash", "b": "contains/slash",` + ` "d": "quoted\\"text\\"", "e": "line\\nfeed", "f": "with\\ttab",` + ` "g": "one/two/slash" }`;
    lt_act = this.mo_cut.parse({ iv_json: lv_str });
    cl_abap_unit_assert.assert_equals({ act: lt_act, exp: this.mo_nodes.mt_nodes });
  }

  unicode_characters() {
    let lv_uchar = ``;
    try {
      let lv_fm_name = null;
      lv_fm_name = `CL_ABAP_CONV_IN_CE`;
      // TODO(abap2js): CALL METHOD (lv_fm_name)=>uccpi EXPORTING uccp = 4660 RECEIVING char = lv_uchar.
    } catch (error) {
      cl_abap_unit_assert.fail({ level: if_aunit_constants.tolerable });
    }
    this.mo_nodes.add({ iv_str: `                 |                 |object |                        |  |3` });
    this.mo_nodes.add({ iv_str: `/                |unicode${lv_uchar}         |num    |3                       |  |0` });
    this.mo_nodes.add({ iv_str: `/                |unicode${lv_uchar}         |object |                        |  |1` });
    this.mo_nodes.add({ iv_str: `/unicode${lv_uchar}/       |c                |num    |3                       |  |0` });
    this.mo_nodes.add({ iv_str: `/                |c                |str    |unicode${lv_uchar}                |  |0` });
    let lt_act = [];
    let lv_str = ``;
    lv_str = `{ "unicode\\u1234": 3,` + ` "unicode\\u1234": { "c": 3 }, ` + ` "c": "unicode\\u1234" }`;
    lt_act = this.mo_cut.parse({ iv_json: lv_str });
    cl_abap_unit_assert.assert_equals({ act: lt_act, exp: this.mo_nodes.mt_nodes });
  }

  parse_empty_object() {
    let lo_cut = null;
    let lt_act = [];
    this.mo_nodes.add({ iv_str: `                 |         |object |                        |  |0` });
    lo_cut = new lcl_json_parser();
    lt_act = lo_cut.parse({ iv_json: `{}` });
    cl_abap_unit_assert.assert_equals({ act: lt_act, exp: this.mo_nodes.mt_nodes });
  }

  parse_empty_string() {
    let lo_cut = null;
    lo_cut = new lcl_json_parser();
    try {
      lo_cut.parse({ iv_json: `` });
      cl_abap_unit_assert.fail(`empty string should raise an exception`);
    } catch (error) {
    }
  }
}





class ltcl_serializer_test {
  static sample_json() {
    let rv_json = ``;
    rv_json = `{\\n` + `  "boolean": true,\\n` + `  "date": "2020-03-15",\\n` + `  "false": false,\\n` + `  "float": 123.45,\\n` + `  "issues": [\\n` + `    {\\n` + `      "end": {\\n` + `        "col": 26,\\n` + `        "row": 4\\n` + `      },\\n` + `      "filename": "./zxxx.prog.abap",\\n` + `      "key": "indentation",\\n` + `      "message": "Indentation problem ...",\\n` + `      "start": {\\n` + `        "col": 3,\\n` + `        "row": 4\\n` + `      }\\n` + `    },\\n` + `    {\\n` + `      "end": {\\n` + `        "col": 22,\\n` + `        "row": 3\\n` + `      },\\n` + `      "filename": "./zxxx.prog.abap",\\n` + `      "key": "space_before_dot",\\n` + `      "message": "Remove space before XXX",\\n` + `      "start": {\\n` + `        "col": 21,\\n` + `        "row": 3\\n` + `      }\\n` + `    }\\n` + `  ],\\n` + `  "null": null,\\n` + `  "number": 123,\\n` + `  "string": "abc"\\n` + `}`;
    rv_json = rv_json.replaceAll(`\\n`, cl_abap_char_utilities.newline);
    return rv_json;
  }

  static sample_nodes() {
    let rt_nodes = [];
    let lo_nodes = null;
    lo_nodes = new lcl_nodes_helper();
    lo_nodes.add({ iv_str: `                 |         |object |                        |  |8` });
    lo_nodes.add({ iv_str: `/                |string   |str    |abc                     |  |0` });
    lo_nodes.add({ iv_str: `/                |number   |num    |123                     |  |0` });
    lo_nodes.add({ iv_str: `/                |float    |num    |123.45                  |  |0` });
    lo_nodes.add({ iv_str: `/                |boolean  |bool   |true                    |  |0` });
    lo_nodes.add({ iv_str: `/                |false    |bool   |false                   |  |0` });
    lo_nodes.add({ iv_str: `/                |null     |null   |                        |  |0` });
    lo_nodes.add({ iv_str: `/                |date     |str    |2020-03-15              |  |0` });
    lo_nodes.add({ iv_str: `/                |issues   |array  |                        |  |2` });
    lo_nodes.add({ iv_str: `/issues/         |1        |object |                        |1 |5` });
    lo_nodes.add({ iv_str: `/issues/1/       |message  |str    |Indentation problem ... |  |0` });
    lo_nodes.add({ iv_str: `/issues/1/       |key      |str    |indentation             |  |0` });
    lo_nodes.add({ iv_str: `/issues/1/       |start    |object |                        |  |2` });
    lo_nodes.add({ iv_str: `/issues/1/start/ |row      |num    |4                       |  |0` });
    lo_nodes.add({ iv_str: `/issues/1/start/ |col      |num    |3                       |  |0` });
    lo_nodes.add({ iv_str: `/issues/1/       |end      |object |                        |  |2` });
    lo_nodes.add({ iv_str: `/issues/1/end/   |row      |num    |4                       |  |0` });
    lo_nodes.add({ iv_str: `/issues/1/end/   |col      |num    |26                      |  |0` });
    lo_nodes.add({ iv_str: `/issues/1/       |filename |str    |./zxxx.prog.abap        |  |0` });
    lo_nodes.add({ iv_str: `/issues/         |2        |object |                        |2 |5` });
    lo_nodes.add({ iv_str: `/issues/2/       |message  |str    |Remove space before XXX |  |0` });
    lo_nodes.add({ iv_str: `/issues/2/       |key      |str    |space_before_dot        |  |0` });
    lo_nodes.add({ iv_str: `/issues/2/       |start    |object |                        |  |2` });
    lo_nodes.add({ iv_str: `/issues/2/start/ |row      |num    |3                       |  |0` });
    lo_nodes.add({ iv_str: `/issues/2/start/ |col      |num    |21                      |  |0` });
    lo_nodes.add({ iv_str: `/issues/2/       |end      |object |                        |  |2` });
    lo_nodes.add({ iv_str: `/issues/2/end/   |row      |num    |3                       |  |0` });
    lo_nodes.add({ iv_str: `/issues/2/end/   |col      |num    |22                      |  |0` });
    lo_nodes.add({ iv_str: `/issues/2/       |filename |str    |./zxxx.prog.abap        |  |0` });
    rt_nodes = lo_nodes.sorted();
    return rt_nodes;
  }

  stringify_condensed() {
    let lv_act = ``;
    let lv_exp = ``;
    lv_act = lcl_json_serializer.stringify({ it_json_tree: ltcl_serializer_test.sample_nodes() });
    lv_exp = ltcl_serializer_test.sample_json();
    lv_exp = lv_exp.replaceAll(cl_abap_char_utilities.newline, ``);
    lv_exp = String(lv_exp).replace(/^ +| +$/g, "").replace(/ +/g, ` `);
    lv_exp = lv_exp.replaceAll(`: `, `:`);
    lv_exp = lv_exp.replaceAll(`{ `, `{`);
    lv_exp = lv_exp.replaceAll(`[ `, `[`);
    lv_exp = lv_exp.replaceAll(` }`, `}`);
    lv_exp = lv_exp.replaceAll(` ]`, `]`);
    lv_exp = lv_exp.replaceAll(`, `, `,`);
    cl_abap_unit_assert.assert_equals({ act: lv_act, exp: lv_exp });
  }

  stringify_indented() {
    let lv_act = ``;
    let lv_exp = ``;
    lv_act = lcl_json_serializer.stringify({ it_json_tree: ltcl_serializer_test.sample_nodes(), iv_indent: 2 });
    lv_exp = ltcl_serializer_test.sample_json();
    cl_abap_unit_assert.assert_equals({ act: lv_act, exp: lv_exp });
  }

  array_index() {
    let lv_act = ``;
    let lv_exp = ``;
    let lo_nodes = null;
    lo_nodes = new lcl_nodes_helper();
    lo_nodes.add({ iv_str: `                |    |array  |                        |  |3` });
    lo_nodes.add({ iv_str: `/               |1   |str    |abc                     |2 |0` });
    lo_nodes.add({ iv_str: `/               |2   |num    |123                     |1 |0` });
    lo_nodes.add({ iv_str: `/               |3   |num    |123.45                  |3 |0` });
    lv_act = lcl_json_serializer.stringify({ it_json_tree: lo_nodes.sorted() });
    lv_exp = `[123,"abc",123.45]`;
    cl_abap_unit_assert.assert_equals({ act: lv_act, exp: lv_exp });
  }

  item_order() {
    let lv_act = ``;
    let lv_exp = ``;
    let lo_nodes = null;
    lo_nodes = new lcl_nodes_helper();
    lo_nodes.add({ iv_str: `                |       |object |                   |  |3 |0` });
    lo_nodes.add({ iv_str: `/               |beta   |str    |b                  |  |0 |3` });
    lo_nodes.add({ iv_str: `/               |zulu   |str    |z                  |  |0 |1` });
    lo_nodes.add({ iv_str: `/               |alpha  |str    |a                  |  |0 |2` });
    lv_act = lcl_json_serializer.stringify({ it_json_tree: lo_nodes.sorted() });
    lv_exp = `{"alpha":"a","beta":"b","zulu":"z"}`;
    cl_abap_unit_assert.assert_equals({ act: lv_act, exp: lv_exp });
    lv_act = lcl_json_serializer.stringify({ it_json_tree: lo_nodes.sorted(), iv_keep_item_order: true });
    lv_exp = `{"zulu":"z","alpha":"a","beta":"b"}`;
    cl_abap_unit_assert.assert_equals({ act: lv_act, exp: lv_exp });
  }

  simple_indented() {
    let lv_act = ``;
    let lv_exp = ``;
    let lo_nodes = null;
    lo_nodes = new lcl_nodes_helper();
    lo_nodes.add({ iv_str: `                |    |array  |                        |  |3` });
    lo_nodes.add({ iv_str: `/               |1   |object |                        |2 |2` });
    lo_nodes.add({ iv_str: `/1/             |a   |num    |1                       |  |0` });
    lo_nodes.add({ iv_str: `/1/             |b   |num    |2                       |  |0` });
    lo_nodes.add({ iv_str: `/               |2   |num    |123                     |1 |0` });
    lo_nodes.add({ iv_str: `/               |3   |num    |123.45                  |3 |0` });
    lv_act = lcl_json_serializer.stringify({ it_json_tree: lo_nodes.sorted(), iv_indent: 2 });
    lv_exp = `[\\n` + `  123,\\n` + `  {\\n` + `    "a": 1,\\n` + `    "b": 2\\n` + `  },\\n` + `  123.45\\n` + `]`;
    lv_exp = lv_exp.replaceAll(`\\n`, cl_abap_char_utilities.newline);
    cl_abap_unit_assert.assert_equals({ act: lv_act, exp: lv_exp });
  }

  empty_set() {
    let lv_act = ``;
    let lv_exp = ``;
    let lo_nodes = null;
    lo_nodes = new lcl_nodes_helper();
    lo_nodes.add({ iv_str: `                |    |array  |                        |  |0` });
    lv_act = lcl_json_serializer.stringify({ it_json_tree: lo_nodes.sorted(), iv_indent: 0 });
    lv_exp = `[]`;
    cl_abap_unit_assert.assert_equals({ act: lv_act, exp: lv_exp });
    lv_act = lcl_json_serializer.stringify({ it_json_tree: lo_nodes.sorted(), iv_indent: 2 });
    lv_exp = `[]`;
    cl_abap_unit_assert.assert_equals({ act: lv_act, exp: lv_exp });
  }

  escape_string() {
    let lv_act = ``;
    let lv_exp = ``;
    let lv_val = ``;
    let lo_nodes = null;
    lo_nodes = new lcl_nodes_helper();
    lv_val = `a` + `"` + `\\` + cl_abap_char_utilities.horizontal_tab + cl_abap_char_utilities.cr_lf;
    lo_nodes.add({ iv_str: ` | |str |${lv_val}| |0` });
    lv_act = lcl_json_serializer.stringify({ it_json_tree: lo_nodes.sorted() });
    lv_exp = `"a\\"\\\\\\t\\r\\n"`;
    cl_abap_unit_assert.assert_equals({ act: lv_act, exp: lv_exp });
  }

  empty() {
    let lv_act = ``;
    let lv_exp = ``;
    let lo_nodes = null;
    lo_nodes = new lcl_nodes_helper();
    lv_act = lcl_json_serializer.stringify({ it_json_tree: lo_nodes.sorted() });
    lv_exp = ``;
    cl_abap_unit_assert.assert_equals({ act: lv_act, exp: lv_exp });
  }
}





class ltcl_utils_test {
  string_to_xstring_utf8() {
    cl_abap_unit_assert.assert_equals({ act: lcl_utils.string_to_xstring_utf8({ iv_str: `123` }), exp: `313233` });
  }

  validate_array_index() {
    cl_abap_unit_assert.assert_equals({ act: lcl_utils.validate_array_index({ iv_path: `x`, iv_index: `123` }), exp: 123 });
    try {
      lcl_utils.validate_array_index({ iv_path: `x`, iv_index: `a` });
      cl_abap_unit_assert.fail();
    } catch (error) {
    }
    try {
      lcl_utils.validate_array_index({ iv_path: `x`, iv_index: `0` });
      cl_abap_unit_assert.fail();
    } catch (error) {
    }
  }

  normalize_path() {
    cl_abap_unit_assert.assert_equals({ act: lcl_utils.normalize_path({ iv_path: `` }), exp: `/` });
    cl_abap_unit_assert.assert_equals({ act: lcl_utils.normalize_path({ iv_path: `/` }), exp: `/` });
    cl_abap_unit_assert.assert_equals({ act: lcl_utils.normalize_path({ iv_path: `abc` }), exp: `/abc/` });
    cl_abap_unit_assert.assert_equals({ act: lcl_utils.normalize_path({ iv_path: `/abc` }), exp: `/abc/` });
    cl_abap_unit_assert.assert_equals({ act: lcl_utils.normalize_path({ iv_path: `abc/` }), exp: `/abc/` });
    cl_abap_unit_assert.assert_equals({ act: lcl_utils.normalize_path({ iv_path: `/abc/` }), exp: `/abc/` });
  }

  split_path() {
    let ls_exp = { path: ``, name: `` };
    let lv_path = ``;
    lv_path = ``;
    ls_exp.path = ``;
    ls_exp.name = ``;
    cl_abap_unit_assert.assert_equals({ act: lcl_utils.split_path({ iv_path: lv_path }), exp: ls_exp });
    lv_path = `/`;
    ls_exp.path = ``;
    ls_exp.name = ``;
    cl_abap_unit_assert.assert_equals({ act: lcl_utils.split_path({ iv_path: lv_path }), exp: ls_exp });
    lv_path = `/abc/`;
    ls_exp.path = `/`;
    ls_exp.name = `abc`;
    cl_abap_unit_assert.assert_equals({ act: lcl_utils.split_path({ iv_path: lv_path }), exp: ls_exp });
    lv_path = `abc`;
    ls_exp.path = `/`;
    ls_exp.name = `abc`;
    cl_abap_unit_assert.assert_equals({ act: lcl_utils.split_path({ iv_path: lv_path }), exp: ls_exp });
    lv_path = `/abc`;
    ls_exp.path = `/`;
    ls_exp.name = `abc`;
    cl_abap_unit_assert.assert_equals({ act: lcl_utils.split_path({ iv_path: lv_path }), exp: ls_exp });
    lv_path = `abc/`;
    ls_exp.path = `/`;
    ls_exp.name = `abc`;
    cl_abap_unit_assert.assert_equals({ act: lcl_utils.split_path({ iv_path: lv_path }), exp: ls_exp });
    lv_path = `/abc/xyz`;
    ls_exp.path = `/abc/`;
    ls_exp.name = `xyz`;
    cl_abap_unit_assert.assert_equals({ act: lcl_utils.split_path({ iv_path: lv_path }), exp: ls_exp });
    lv_path = `/abc/xyz/`;
    ls_exp.path = `/abc/`;
    ls_exp.name = `xyz`;
    cl_abap_unit_assert.assert_equals({ act: lcl_utils.split_path({ iv_path: lv_path }), exp: ls_exp });
  }
}





class ltcl_reader_test {
  slice() {
    let lo_cut = null;
    let lo_nodes = null;
    lo_nodes = new lcl_nodes_helper();
    lo_nodes.add({ iv_str: `          |         |array  |                        |  |2` });
    lo_nodes.add({ iv_str: `/         |1        |object |                        |1 |5` });
    lo_nodes.add({ iv_str: `/1/       |message  |str    |Indentation problem ... |  |0` });
    lo_nodes.add({ iv_str: `/1/       |key      |str    |indentation             |  |0` });
    lo_nodes.add({ iv_str: `/1/       |start    |object |                        |  |2` });
    lo_nodes.add({ iv_str: `/1/start/ |row      |num    |4                       |  |0` });
    lo_nodes.add({ iv_str: `/1/start/ |col      |num    |3                       |  |0` });
    lo_nodes.add({ iv_str: `/1/       |end      |object |                        |  |2` });
    lo_nodes.add({ iv_str: `/1/end/   |row      |num    |4                       |  |0` });
    lo_nodes.add({ iv_str: `/1/end/   |col      |num    |26                      |  |0` });
    lo_nodes.add({ iv_str: `/1/       |filename |str    |./zxxx.prog.abap        |  |0` });
    lo_nodes.add({ iv_str: `/         |2        |object |                        |2 |5` });
    lo_nodes.add({ iv_str: `/2/       |message  |str    |Remove space before XXX |  |0` });
    lo_nodes.add({ iv_str: `/2/       |key      |str    |space_before_dot        |  |0` });
    lo_nodes.add({ iv_str: `/2/       |start    |object |                        |  |2` });
    lo_nodes.add({ iv_str: `/2/start/ |row      |num    |3                       |  |0` });
    lo_nodes.add({ iv_str: `/2/start/ |col      |num    |21                      |  |0` });
    lo_nodes.add({ iv_str: `/2/       |end      |object |                        |  |2` });
    lo_nodes.add({ iv_str: `/2/end/   |row      |num    |3                       |  |0` });
    lo_nodes.add({ iv_str: `/2/end/   |col      |num    |22                      |  |0` });
    lo_nodes.add({ iv_str: `/2/       |filename |str    |./zxxx.prog.abap        |  |0` });
    lo_cut = z2ui5_cl_ajson.parse(ltcl_parser_test.sample_json());
    lo_cut = z2ui5_cl_util.abap_cast(lo_cut.slice(`/issues`));
    cl_abap_unit_assert.assert_equals({ act: lo_cut.mt_json_tree, exp: lo_nodes.sorted() });
    lo_nodes = new lcl_nodes_helper();
    lo_nodes.add({ iv_str: `                 |         |object |                        |  |8` });
    lo_nodes.add({ iv_str: `/                |string   |str    |abc                     |  |0` });
    lo_nodes.add({ iv_str: `/                |number   |num    |123                     |  |0` });
    lo_nodes.add({ iv_str: `/                |float    |num    |123.45                  |  |0` });
    lo_nodes.add({ iv_str: `/                |boolean  |bool   |true                    |  |0` });
    lo_nodes.add({ iv_str: `/                |false    |bool   |false                   |  |0` });
    lo_nodes.add({ iv_str: `/                |null     |null   |                        |  |0` });
    lo_nodes.add({ iv_str: `/                |date     |str    |2020-03-15              |  |0` });
    lo_nodes.add({ iv_str: `/                |issues   |array  |                        |  |2` });
    lo_nodes.add({ iv_str: `/issues/         |1        |object |                        |1 |5` });
    lo_nodes.add({ iv_str: `/issues/1/       |message  |str    |Indentation problem ... |  |0` });
    lo_nodes.add({ iv_str: `/issues/1/       |key      |str    |indentation             |  |0` });
    lo_nodes.add({ iv_str: `/issues/1/       |start    |object |                        |  |2` });
    lo_nodes.add({ iv_str: `/issues/1/start/ |row      |num    |4                       |  |0` });
    lo_nodes.add({ iv_str: `/issues/1/start/ |col      |num    |3                       |  |0` });
    lo_nodes.add({ iv_str: `/issues/1/       |end      |object |                        |  |2` });
    lo_nodes.add({ iv_str: `/issues/1/end/   |row      |num    |4                       |  |0` });
    lo_nodes.add({ iv_str: `/issues/1/end/   |col      |num    |26                      |  |0` });
    lo_nodes.add({ iv_str: `/issues/1/       |filename |str    |./zxxx.prog.abap        |  |0` });
    lo_nodes.add({ iv_str: `/issues/         |2        |object |                        |2 |5` });
    lo_nodes.add({ iv_str: `/issues/2/       |message  |str    |Remove space before XXX |  |0` });
    lo_nodes.add({ iv_str: `/issues/2/       |key      |str    |space_before_dot        |  |0` });
    lo_nodes.add({ iv_str: `/issues/2/       |start    |object |                        |  |2` });
    lo_nodes.add({ iv_str: `/issues/2/start/ |row      |num    |3                       |  |0` });
    lo_nodes.add({ iv_str: `/issues/2/start/ |col      |num    |21                      |  |0` });
    lo_nodes.add({ iv_str: `/issues/2/       |end      |object |                        |  |2` });
    lo_nodes.add({ iv_str: `/issues/2/end/   |row      |num    |3                       |  |0` });
    lo_nodes.add({ iv_str: `/issues/2/end/   |col      |num    |22                      |  |0` });
    lo_nodes.add({ iv_str: `/issues/2/       |filename |str    |./zxxx.prog.abap        |  |0` });
    lo_cut = z2ui5_cl_ajson.parse(ltcl_parser_test.sample_json());
    lo_cut = z2ui5_cl_util.abap_cast(lo_cut.slice(`/`));
    cl_abap_unit_assert.assert_equals({ act: lo_cut.mt_json_tree, exp: lo_nodes.sorted() });
    lo_nodes = new lcl_nodes_helper();
    lo_nodes.add({ iv_str: `  |         |object |                        | |2` });
    lo_nodes.add({ iv_str: `/ |row      |num    |3                       | |0` });
    lo_nodes.add({ iv_str: `/ |col      |num    |21                      | |0` });
    lo_cut = z2ui5_cl_ajson.parse(ltcl_parser_test.sample_json());
    lo_cut = z2ui5_cl_util.abap_cast(lo_cut.slice(`/issues/2/start/`));
    cl_abap_unit_assert.assert_equals({ act: lo_cut.mt_json_tree, exp: lo_nodes.sorted() });
  }

  get_value() {
    let lo_cut = null;
    lo_cut = z2ui5_cl_util.abap_cast(z2ui5_cl_ajson.parse(ltcl_parser_test.sample_json()));
    cl_abap_unit_assert.assert_equals({ act: lo_cut.get(`/string`), exp: `abc` });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.get(`/string/`), exp: `abc` });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.get(`/boolean`), exp: `true` });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.get(`/issues/2/start/row`), exp: `3` });
  }

  get_node_type() {
    let li_cut = null;
    li_cut = z2ui5_cl_ajson.parse(ltcl_parser_test.sample_json());
    cl_abap_unit_assert.assert_equals({ act: li_cut.get_node_type(`/`), exp: z2ui5_if_ajson_types.node_type.object });
    cl_abap_unit_assert.assert_equals({ act: li_cut.get_node_type(`/string`), exp: z2ui5_if_ajson_types.node_type.string });
    cl_abap_unit_assert.assert_equals({ act: li_cut.get_node_type(`/number`), exp: z2ui5_if_ajson_types.node_type.number });
    cl_abap_unit_assert.assert_equals({ act: li_cut.get_node_type(`/float`), exp: z2ui5_if_ajson_types.node_type.number });
    cl_abap_unit_assert.assert_equals({ act: li_cut.get_node_type(`/boolean`), exp: z2ui5_if_ajson_types.node_type.boolean });
    cl_abap_unit_assert.assert_equals({ act: li_cut.get_node_type(`/false`), exp: z2ui5_if_ajson_types.node_type.boolean });
    cl_abap_unit_assert.assert_equals({ act: li_cut.get_node_type(`/null`), exp: z2ui5_if_ajson_types.node_type.null });
    cl_abap_unit_assert.assert_equals({ act: li_cut.get_node_type(`/date`), exp: z2ui5_if_ajson_types.node_type.string });
    cl_abap_unit_assert.assert_equals({ act: li_cut.get_node_type(`/issues`), exp: z2ui5_if_ajson_types.node_type.array });
  }

  get_date() {
    let lo_cut = null;
    let lo_nodes = null;
    let lv_exp = null;
    lo_cut = new z2ui5_cl_ajson();
    lv_exp = `20200728`;
    lo_nodes = new lcl_nodes_helper();
    lo_nodes.add({ iv_str: `  |         |object |                        | |1` });
    lo_nodes.add({ iv_str: `/ |date1    |str    |2020-07-28              | |0` });
    lo_cut.mt_json_tree = z2ui5_cl_util.abap_tab_assign(lo_cut.mt_json_tree, z2ui5_cl_util.abap_copy(lo_nodes.mt_nodes));
    cl_abap_unit_assert.assert_equals({ act: lo_cut.get_date(`/date1`), exp: lv_exp });
    lo_nodes = new lcl_nodes_helper();
    lo_nodes.add({ iv_str: `  |         |object |                        | |1` });
    lo_nodes.add({ iv_str: `/ |date1    |str    |2020-07-28T01:00:00Z    | |0` });
    lo_cut.mt_json_tree = z2ui5_cl_util.abap_tab_assign(lo_cut.mt_json_tree, z2ui5_cl_util.abap_copy(lo_nodes.mt_nodes));
    cl_abap_unit_assert.assert_equals({ act: lo_cut.get_date(`/date1`), exp: lv_exp });
    lo_nodes = new lcl_nodes_helper();
    lo_nodes.add({ iv_str: `  |         |object |                        | |1` });
    lo_nodes.add({ iv_str: `/ |date1    |str    |20200728                | |0` });
    lo_cut.mt_json_tree = z2ui5_cl_util.abap_tab_assign(lo_cut.mt_json_tree, z2ui5_cl_util.abap_copy(lo_nodes.mt_nodes));
    cl_abap_unit_assert.assert_equals({ act: lo_cut.get_date(`/date1`), exp: `` });
  }

  get_timestamp() {
    let lo_cut = null;
    let lo_nodes = null;
    let lv_exp = `20200728000000`;
    lo_cut = new z2ui5_cl_ajson();
    lo_nodes = new lcl_nodes_helper();
    lo_nodes.add({ iv_str: `  |         |object |                        | |1` });
    lo_nodes.add({ iv_str: `/ |timestamp|str    |2020-07-28T00:00:00Z    | |0` });
    lo_cut.mt_json_tree = z2ui5_cl_util.abap_tab_assign(lo_cut.mt_json_tree, z2ui5_cl_util.abap_copy(lo_nodes.mt_nodes));
    cl_abap_unit_assert.assert_equals({ act: lo_cut.get_timestamp(`/timestamp`), exp: lv_exp });
  }

  get_timestampl() {
    let lo_cut = null;
    let lo_nodes = null;
    let lv_exp = `20200728123456.78934`;
    lo_cut = new z2ui5_cl_ajson();
    lo_nodes = new lcl_nodes_helper();
    lo_nodes.add({ iv_str: `  |         |object |                          | |1` });
    lo_nodes.add({ iv_str: `/ |timestamp|str    |2020-07-28T12:34:56.78934Z| |0` });
    lo_cut.mt_json_tree = z2ui5_cl_util.abap_tab_assign(lo_cut.mt_json_tree, z2ui5_cl_util.abap_copy(lo_nodes.mt_nodes));
    cl_abap_unit_assert.assert_equals({ act: lo_cut.get_timestampl(`/timestamp`), exp: lv_exp });
  }

  exists() {
    let lo_cut = null;
    lo_cut = z2ui5_cl_util.abap_cast(z2ui5_cl_ajson.parse(ltcl_parser_test.sample_json()));
    cl_abap_unit_assert.assert_equals({ act: lo_cut.exists(`/string`), exp: true });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.exists(`/string/`), exp: true });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.exists(`/xxx`), exp: false });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.exists(`/issues/2/start/row`), exp: true });
  }

  value_integer() {
    let lo_cut = null;
    lo_cut = z2ui5_cl_util.abap_cast(z2ui5_cl_ajson.parse(ltcl_parser_test.sample_json()));
    cl_abap_unit_assert.assert_equals({ act: lo_cut.get_integer(`/string`), exp: 0 });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.get_integer(`/number`), exp: 123 });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.get_integer(`/float`), exp: 123 });
  }

  value_number() {
    let lo_cut = null;
    lo_cut = z2ui5_cl_util.abap_cast(z2ui5_cl_ajson.parse(ltcl_parser_test.sample_json()));
    cl_abap_unit_assert.assert_equals({ act: lo_cut.get_number(`/string`), exp: 0 });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.get_number(`/number`), exp: `123.0` });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.get_number(`/float`), exp: `123.45` });
  }

  value_boolean() {
    let lo_cut = null;
    lo_cut = z2ui5_cl_util.abap_cast(z2ui5_cl_ajson.parse(ltcl_parser_test.sample_json()));
    cl_abap_unit_assert.assert_equals({ act: lo_cut.get_boolean(`/string`), exp: true });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.get_boolean(`/number`), exp: true });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.get_boolean(`/xxx`), exp: false });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.get_boolean(`/boolean`), exp: true });
  }

  value_string() {
    let lo_cut = null;
    lo_cut = z2ui5_cl_util.abap_cast(z2ui5_cl_ajson.parse(ltcl_parser_test.sample_json()));
    cl_abap_unit_assert.assert_equals({ act: lo_cut.get_string(`/string`), exp: `abc` });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.get_string(`/number`), exp: `123` });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.get_string(`/xxx`), exp: `` });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.get_string(`/boolean`), exp: `true` });
  }

  members() {
    let lt_exp = [];
    let lo_cut = null;
    lo_cut = z2ui5_cl_util.abap_cast(z2ui5_cl_ajson.parse(ltcl_parser_test.sample_json()));
    lt_exp = [];
    lt_exp.push(z2ui5_cl_util.abap_copy(`1`));
    lt_exp.push(z2ui5_cl_util.abap_copy(`2`));
    cl_abap_unit_assert.assert_equals({ act: lo_cut.members(`/issues`), exp: lt_exp });
    lt_exp = [];
    lt_exp.push(z2ui5_cl_util.abap_copy(`col`));
    lt_exp.push(z2ui5_cl_util.abap_copy(`row`));
    cl_abap_unit_assert.assert_equals({ act: lo_cut.members(`/issues/1/start/`), exp: lt_exp });
  }

  array_to_string_table() {
    let lo_cut = null;
    let lo_nodes = null;
    let lt_act = [];
    let lt_exp = [];
    lo_nodes = new lcl_nodes_helper();
    lo_nodes.add({ iv_str: `  |         |array  |                        | |6` });
    lo_nodes.add({ iv_str: `/ |1        |num    |123                     |1|0` });
    lo_nodes.add({ iv_str: `/ |2        |num    |234                     |2|0` });
    lo_nodes.add({ iv_str: `/ |3        |str    |abc                     |3|0` });
    lo_nodes.add({ iv_str: `/ |4        |bool   |true                    |4|0` });
    lo_nodes.add({ iv_str: `/ |5        |bool   |false                   |5|0` });
    lo_nodes.add({ iv_str: `/ |6        |null   |null                    |6|0` });
    lt_exp.push(z2ui5_cl_util.abap_copy(`123`));
    lt_exp.push(z2ui5_cl_util.abap_copy(`234`));
    lt_exp.push(z2ui5_cl_util.abap_copy(`abc`));
    lt_exp.push(z2ui5_cl_util.abap_copy(`X`));
    lt_exp.push(z2ui5_cl_util.abap_copy(``));
    lt_exp.push(z2ui5_cl_util.abap_copy(``));
    lo_cut = new z2ui5_cl_ajson();
    lo_cut.mt_json_tree = z2ui5_cl_util.abap_tab_assign(lo_cut.mt_json_tree, z2ui5_cl_util.abap_copy(lo_nodes.mt_nodes));
    lt_act = lo_cut.array_to_string_table(`/`);
    cl_abap_unit_assert.assert_equals({ act: lt_act, exp: lt_exp });
    let lx = null;
    lo_nodes = new lcl_nodes_helper();
    lo_nodes.add({ iv_str: `  |         |object |                        | |1` });
    lo_nodes.add({ iv_str: `/ |a        |str    |abc                     | |0` });
    lo_cut.mt_json_tree = z2ui5_cl_util.abap_tab_assign(lo_cut.mt_json_tree, z2ui5_cl_util.abap_copy(lo_nodes.mt_nodes));
    try {
      lo_cut.array_to_string_table(`/x`);
      cl_abap_unit_assert.fail();
    } catch (_caught1) {
      lx = _caught1;
      cl_abap_unit_assert.assert_equals({ act: lx.message, exp: `Path not found: /x` });
    }
    try {
      lo_cut.array_to_string_table(`/`);
      cl_abap_unit_assert.fail();
    } catch (_caught2) {
      lx = _caught2;
      cl_abap_unit_assert.assert_equals({ act: lx.message, exp: `Array expected at: /` });
    }
    try {
      lo_cut.array_to_string_table(`/a`);
      cl_abap_unit_assert.fail();
    } catch (_caught3) {
      lx = _caught3;
      cl_abap_unit_assert.assert_equals({ act: lx.message, exp: `Array expected at: /a` });
    }
    lo_nodes = new lcl_nodes_helper();
    lo_nodes.add({ iv_str: `  |         |array  |                        | |1` });
    lo_nodes.add({ iv_str: `/ |1        |object |                        |1|0` });
    lo_cut.mt_json_tree = z2ui5_cl_util.abap_tab_assign(lo_cut.mt_json_tree, z2ui5_cl_util.abap_copy(lo_nodes.mt_nodes));
    try {
      lo_cut.array_to_string_table(`/`);
      cl_abap_unit_assert.fail();
    } catch (_caught4) {
      lx = _caught4;
      cl_abap_unit_assert.assert_equals({ act: lx.message, exp: `Cannot convert [object] to string at [/1]` });
    }
  }
}





class ltcl_json_to_abap {
  to_abap_struc() {
    let lo_cut = null;
    let ls_mock = { str: ``, int: 0, float: 0, bool: false, obj: { a: ``, b: 0 }, tab: [], tab_plain: [], tab_hashed: [], oref: null, dref: null, date1: null, date2: null, timestamp1: 0, timestamp2: 0, timestamp3: 0, timestamp4: 0, timestamp5: 0 };
    let ls_exp = { str: ``, int: 0, float: 0, bool: false, obj: { a: ``, b: 0 }, tab: [], tab_plain: [], tab_hashed: [], oref: null, dref: null, date1: null, date2: null, timestamp1: 0, timestamp2: 0, timestamp3: 0, timestamp4: 0, timestamp5: 0 };
    let lv_exp_date = `20200728`;
    let lv_exp_timestamp = 20200728000000;
    let lo_nodes = null;
    lo_nodes = new lcl_nodes_helper();
    lo_nodes.add({ iv_str: `       |           |object |                          | ` });
    lo_nodes.add({ iv_str: `/      |str        |str    |hello                     | ` });
    lo_nodes.add({ iv_str: `/      |int        |num    |5                         | ` });
    lo_nodes.add({ iv_str: `/      |float      |num    |5.5                       | ` });
    lo_nodes.add({ iv_str: `/      |bool       |bool   |true                      | ` });
    lo_nodes.add({ iv_str: `/      |obj        |object |                          | ` });
    lo_nodes.add({ iv_str: `/obj/  |a          |str    |world                     | ` });
    lo_nodes.add({ iv_str: `/      |tab        |array  |                          | ` });
    lo_nodes.add({ iv_str: `/      |date1      |str    |2020-07-28                | ` });
    lo_nodes.add({ iv_str: `/      |date2      |str    |2020-07-28T00:00:00Z      | ` });
    lo_nodes.add({ iv_str: `/      |timestamp1 |str    |2020-07-28T00:00:00       | ` });
    lo_nodes.add({ iv_str: `/      |timestamp2 |str    |2020-07-28T00:00:00Z      | ` });
    lo_nodes.add({ iv_str: `/      |timestamp3 |str    |2020-07-28T01:00:00+01:00 | ` });
    lo_nodes.add({ iv_str: `/      |timestamp4 |str    |2020-07-28T01:00:00+01:00 | ` });
    lo_nodes.add({ iv_str: `/      |timestamp5 |str    |2020-07-28T00:00:00.12345Z| ` });
    lo_cut = new lcl_json_to_abap();
    const _out0 = { it_nodes: lo_nodes.sorted(), c_container: ls_mock };
    lo_cut.to_abap(_out0);
    if ("c_container" in _out0) ls_mock = _out0.c_container;
    ls_exp.str = `hello`;
    ls_exp.int = 5;
    ls_exp.float = `5.5`;
    ls_exp.bool = true;
    ls_exp.obj.a = `world`;
    ls_exp.date1 = z2ui5_cl_util.abap_tab_assign(ls_exp.date1, z2ui5_cl_util.abap_copy(lv_exp_date));
    ls_exp.date2 = z2ui5_cl_util.abap_tab_assign(ls_exp.date2, z2ui5_cl_util.abap_copy(lv_exp_date));
    ls_exp.timestamp1 = z2ui5_cl_util.abap_tab_assign(ls_exp.timestamp1, z2ui5_cl_util.abap_copy(lv_exp_timestamp));
    ls_exp.timestamp2 = z2ui5_cl_util.abap_tab_assign(ls_exp.timestamp2, z2ui5_cl_util.abap_copy(lv_exp_timestamp));
    ls_exp.timestamp3 = z2ui5_cl_util.abap_tab_assign(ls_exp.timestamp3, z2ui5_cl_util.abap_copy(lv_exp_timestamp));
    ls_exp.timestamp4 = z2ui5_cl_util.abap_tab_assign(ls_exp.timestamp4, z2ui5_cl_util.abap_copy(lv_exp_timestamp));
    ls_exp.timestamp5 = lv_exp_timestamp + `0.12345`;
    cl_abap_unit_assert.assert_equals({ act: ls_mock, exp: ls_exp });
  }

  to_abap_timestamp_initial() {
    let lo_cut = null;
    let lv_mock = 0;
    let lo_nodes = null;
    lo_nodes = new lcl_nodes_helper();
    lo_nodes.add({ iv_str: `       |           |str    |0000-00-00T00:00:00Z| ` });
    lo_cut = new lcl_json_to_abap();
    const _out0 = { it_nodes: lo_nodes.sorted(), c_container: lv_mock };
    lo_cut.to_abap(_out0);
    if ("c_container" in _out0) lv_mock = _out0.c_container;
    cl_abap_unit_assert.assert_equals({ act: lv_mock, exp: 0 });
  }

  to_abap_timestamp_long() {
    let lo_cut = null;
    let lx = null;
    let lv_mock = 0;
    let lv_exp_timestamp = 20200728000000;
    let lo_nodes = null;
    lo_nodes = new lcl_nodes_helper();
    lo_nodes.add({ iv_str: `       |           |str    |2020-07-28T00:00:00.12345Z| ` });
    try {
      lo_cut = new lcl_json_to_abap();
      const _out0 = { it_nodes: lo_nodes.sorted(), c_container: lv_mock };
      lo_cut.to_abap(_out0);
      if ("c_container" in _out0) lv_mock = _out0.c_container;
      cl_abap_unit_assert.fail();
    } catch (_caught1) {
      lx = _caught1;
      cl_abap_unit_assert.assert_equals({ act: lx.message, exp: `Unexpected timestamp format` });
    }
    lo_nodes = new lcl_nodes_helper();
    lo_nodes.add({ iv_str: `       |           |str    |2020-07-28T00:00:00.00000Z| ` });
    lo_cut = new lcl_json_to_abap();
    const _out1 = { it_nodes: lo_nodes.sorted(), c_container: lv_mock };
    lo_cut.to_abap(_out1);
    if ("c_container" in _out1) lv_mock = _out1.c_container;
    cl_abap_unit_assert.assert_equals({ act: lv_mock, exp: lv_exp_timestamp });
  }

  to_abap_time() {
    let lo_cut = null;
    let lv_mock = null;
    let lo_nodes = null;
    lo_nodes = new lcl_nodes_helper();
    lo_nodes.add({ iv_str: `       |           |str    |11:11:11| ` });
    lo_cut = new lcl_json_to_abap();
    const _out0 = { it_nodes: lo_nodes.sorted(), c_container: lv_mock };
    lo_cut.to_abap(_out0);
    if ("c_container" in _out0) lv_mock = _out0.c_container;
    cl_abap_unit_assert.assert_equals({ act: lv_mock, exp: `111111` });
    let lv_mock_init = null;
    lo_nodes = new lcl_nodes_helper();
    lo_nodes.add({ iv_str: `       |           |str    || ` });
    lo_cut = new lcl_json_to_abap();
    const _out1 = { it_nodes: lo_nodes.sorted(), c_container: lv_mock_init };
    lo_cut.to_abap(_out1);
    if ("c_container" in _out1) lv_mock_init = _out1.c_container;
    cl_abap_unit_assert.assert_equals({ act: lv_mock_init, exp: `000000` });
  }

  to_abap_str_to_packed() {
    let lo_cut = null;
    let lv_act = 0;
    let lo_nodes = null;
    lo_nodes = new lcl_nodes_helper();
    lo_nodes.add({ iv_str: `       |           |str    |1.3333                    | ` });
    lo_cut = new lcl_json_to_abap();
    const _out0 = { it_nodes: lo_nodes.sorted(), c_container: lv_act };
    lo_cut.to_abap(_out0);
    if ("c_container" in _out0) lv_act = _out0.c_container;
    cl_abap_unit_assert.assert_equals({ act: lv_act, exp: `1.333` });
  }

  to_abap_value() {
    let lo_cut = null;
    let lv_mock = ``;
    let lo_nodes = null;
    lo_nodes = new lcl_nodes_helper();
    lo_nodes.add({ iv_str: `       |           |str    |hello                     | ` });
    lo_cut = new lcl_json_to_abap();
    const _out0 = { it_nodes: lo_nodes.sorted(), c_container: lv_mock };
    lo_cut.to_abap(_out0);
    if ("c_container" in _out0) lv_mock = _out0.c_container;
    cl_abap_unit_assert.assert_equals({ act: lv_mock, exp: `hello` });
  }

  to_abap_array() {
    let lo_cut = null;
    let lt_mock = [];
    let lt_exp = [];
    let lo_nodes = null;
    lo_nodes = new lcl_nodes_helper();
    lo_nodes.add({ iv_str: `       |           |array    |                     | ` });
    lo_nodes.add({ iv_str: `/      |1          |str      |One                  |1` });
    lo_nodes.add({ iv_str: `/      |2          |str      |Two                  |2` });
    lo_cut = new lcl_json_to_abap();
    const _out0 = { it_nodes: lo_nodes.sorted(), c_container: lt_mock };
    lo_cut.to_abap(_out0);
    if ("c_container" in _out0) lt_mock = _out0.c_container;
    lt_exp.push(z2ui5_cl_util.abap_copy(`One`));
    lt_exp.push(z2ui5_cl_util.abap_copy(`Two`));
    cl_abap_unit_assert.assert_equals({ act: lt_mock, exp: lt_exp });
  }

  to_abap_array_of_arrays_simple() {
    let lo_cut = null;
    let lt_mock = [];
    let lt_exp = [];
    let lt_tmp = [];
    let lo_nodes = null;
    lo_nodes = new lcl_nodes_helper();
    lo_nodes.add({ iv_str: `       |           |array    |                    | ` });
    lo_nodes.add({ iv_str: `/      |1          |array    |                    |1` });
    lo_nodes.add({ iv_str: `/      |2          |array    |                    |2` });
    lo_nodes.add({ iv_str: `/1/    |1          |str      |One                 |1` });
    lo_nodes.add({ iv_str: `/2/    |1          |str      |Two                 |1` });
    lo_cut = new lcl_json_to_abap();
    const _out0 = { it_nodes: lo_nodes.sorted(), c_container: lt_mock };
    lo_cut.to_abap(_out0);
    if ("c_container" in _out0) lt_mock = _out0.c_container;
    lt_tmp.push(z2ui5_cl_util.abap_copy(`One`));
    lt_exp.push(z2ui5_cl_util.abap_copy(lt_tmp));
    lt_tmp = [];
    lt_tmp.push(z2ui5_cl_util.abap_copy(`Two`));
    lt_exp.push(z2ui5_cl_util.abap_copy(lt_tmp));
    cl_abap_unit_assert.assert_equals({ act: lt_mock, exp: lt_exp });
  }

  to_abap_array_of_arrays() {
    let lo_cut = null;
    let lt_mock = [];
    let lt_exp = [];
    let lt_tmp = [];
    let lo_nodes = null;
    lo_nodes = new lcl_nodes_helper();
    lo_nodes.add({ iv_str: `       |           |array    |                    | ` });
    lo_nodes.add({ iv_str: `/      |1          |array    |                    |1` });
    lo_nodes.add({ iv_str: `/      |2          |array    |                    |2` });
    lo_nodes.add({ iv_str: `/1/    |1          |str      |One                 |1` });
    lo_nodes.add({ iv_str: `/1/    |2          |str      |Two                 |2` });
    lo_nodes.add({ iv_str: `/2/    |1          |str      |Three               |1` });
    lo_nodes.add({ iv_str: `/2/    |2          |str      |Four                |2` });
    lo_cut = new lcl_json_to_abap();
    const _out0 = { it_nodes: lo_nodes.sorted(), c_container: lt_mock };
    lo_cut.to_abap(_out0);
    if ("c_container" in _out0) lt_mock = _out0.c_container;
    lt_tmp.push(z2ui5_cl_util.abap_copy(`One`));
    lt_tmp.push(z2ui5_cl_util.abap_copy(`Two`));
    lt_exp.push(z2ui5_cl_util.abap_copy(lt_tmp));
    lt_tmp = [];
    lt_tmp.push(z2ui5_cl_util.abap_copy(`Three`));
    lt_tmp.push(z2ui5_cl_util.abap_copy(`Four`));
    lt_exp.push(z2ui5_cl_util.abap_copy(lt_tmp));
    cl_abap_unit_assert.assert_equals({ act: lt_mock, exp: lt_exp });
  }

  to_abap_w_tab_of_struc() {
    let lo_cut = null;
    let ls_mock = { str: ``, int: 0, float: 0, bool: false, obj: { a: ``, b: 0 }, tab: [], tab_plain: [], tab_hashed: [], oref: null, dref: null, date1: null, date2: null, timestamp1: 0, timestamp2: 0, timestamp3: 0, timestamp4: 0, timestamp5: 0 };
    let ls_exp = { str: ``, int: 0, float: 0, bool: false, obj: { a: ``, b: 0 }, tab: [], tab_plain: [], tab_hashed: [], oref: null, dref: null, date1: null, date2: null, timestamp1: 0, timestamp2: 0, timestamp3: 0, timestamp4: 0, timestamp5: 0 };
    let lo_nodes = null;
    lo_nodes = new lcl_nodes_helper();
    lo_nodes.add({ iv_str: `       |           |object |                          | ` });
    lo_nodes.add({ iv_str: `/      |tab        |array  |                          | ` });
    lo_nodes.add({ iv_str: `/tab/  |1          |object |                          |1` });
    lo_nodes.add({ iv_str: `/tab/1/|a          |str    |One                       | ` });
    lo_nodes.add({ iv_str: `/tab/  |2          |object |                          |2` });
    lo_nodes.add({ iv_str: `/tab/2/|a          |str    |Two                       | ` });
    lo_cut = new lcl_json_to_abap();
    const _out0 = { it_nodes: lo_nodes.sorted(), c_container: ls_mock };
    lo_cut.to_abap(_out0);
    if ("c_container" in _out0) ls_mock = _out0.c_container;
    let ls_elem = { a: ``, b: 0 };
    ls_elem.a = `One`;
    ls_exp.tab.push(z2ui5_cl_util.abap_copy(ls_elem));
    ls_elem.a = `Two`;
    ls_exp.tab.push(z2ui5_cl_util.abap_copy(ls_elem));
    cl_abap_unit_assert.assert_equals({ act: ls_mock, exp: ls_exp });
  }

  to_abap_w_plain_tab() {
    let lo_cut = null;
    let ls_mock = { str: ``, int: 0, float: 0, bool: false, obj: { a: ``, b: 0 }, tab: [], tab_plain: [], tab_hashed: [], oref: null, dref: null, date1: null, date2: null, timestamp1: 0, timestamp2: 0, timestamp3: 0, timestamp4: 0, timestamp5: 0 };
    let ls_exp = { str: ``, int: 0, float: 0, bool: false, obj: { a: ``, b: 0 }, tab: [], tab_plain: [], tab_hashed: [], oref: null, dref: null, date1: null, date2: null, timestamp1: 0, timestamp2: 0, timestamp3: 0, timestamp4: 0, timestamp5: 0 };
    let lo_nodes = null;
    lo_nodes = new lcl_nodes_helper();
    lo_nodes.add({ iv_str: `             |           |object |                          | ` });
    lo_nodes.add({ iv_str: `/            |tab_plain  |array  |                          | ` });
    lo_nodes.add({ iv_str: `/tab_plain/  |1          |str    |One                       |1` });
    lo_nodes.add({ iv_str: `/tab_plain/  |2          |str    |Two                       |2` });
    lo_cut = new lcl_json_to_abap();
    const _out0 = { it_nodes: lo_nodes.sorted(), c_container: ls_mock };
    lo_cut.to_abap(_out0);
    if ("c_container" in _out0) ls_mock = _out0.c_container;
    ls_exp.tab_plain.push(z2ui5_cl_util.abap_copy(`One`));
    ls_exp.tab_plain.push(z2ui5_cl_util.abap_copy(`Two`));
    cl_abap_unit_assert.assert_equals({ act: ls_mock, exp: ls_exp });
  }

  to_abap_hashed_plain_tab() {
    let lo_cut = null;
    let lt_mock = [];
    let lt_exp = [];
    let lo_nodes = null;
    lo_nodes = new lcl_nodes_helper();
    lo_nodes.add({ iv_str: `            |           |array  |                          | ` });
    lo_nodes.add({ iv_str: `/           |1          |str    |One                       |1` });
    lo_nodes.add({ iv_str: `/           |2          |str    |Two                       |2` });
    lo_cut = new lcl_json_to_abap();
    const _out0 = { it_nodes: lo_nodes.sorted(), c_container: lt_mock };
    lo_cut.to_abap(_out0);
    if ("c_container" in _out0) lt_mock = _out0.c_container;
    lt_exp.push(z2ui5_cl_util.abap_copy(`One`));
    lt_exp.push(z2ui5_cl_util.abap_copy(`Two`));
    cl_abap_unit_assert.assert_equals({ act: lt_mock, exp: lt_exp });
  }

  to_abap_hashed_tab() {
    let lo_cut = null;
    let lt_mock = [];
    let lt_exp = [];
    let lo_nodes = null;
    lo_nodes = new lcl_nodes_helper();
    lo_nodes.add({ iv_str: `              |           |array  |                          | ` });
    lo_nodes.add({ iv_str: `/             |1          |object |                          |1` });
    lo_nodes.add({ iv_str: `/             |2          |object |                          |2` });
    lo_nodes.add({ iv_str: `/1/           |a          |str    |One                       | ` });
    lo_nodes.add({ iv_str: `/1/           |b          |num    |1                         | ` });
    lo_nodes.add({ iv_str: `/2/           |a          |str    |Two                       | ` });
    lo_nodes.add({ iv_str: `/2/           |b          |num    |2                         | ` });
    lo_cut = new lcl_json_to_abap();
    const _out0 = { it_nodes: lo_nodes.sorted(), c_container: lt_mock };
    lo_cut.to_abap(_out0);
    if ("c_container" in _out0) lt_mock = _out0.c_container;
    let ls_elem = { a: ``, b: 0 };
    ls_elem.a = `One`;
    ls_elem.b = 1;
    lt_exp.push(z2ui5_cl_util.abap_copy(ls_elem));
    ls_elem.a = `Two`;
    ls_elem.b = 2;
    lt_exp.push(z2ui5_cl_util.abap_copy(ls_elem));
    cl_abap_unit_assert.assert_equals({ act: lt_mock, exp: lt_exp });
  }

  to_abap_sorted_tab() {
    let lo_cut = null;
    let lt_mock = [];
    let lt_exp = [];
    let lo_nodes = null;
    lo_nodes = new lcl_nodes_helper();
    lo_nodes.add({ iv_str: `              |           |array  |                          | ` });
    lo_nodes.add({ iv_str: `/             |1          |object |                          |1` });
    lo_nodes.add({ iv_str: `/             |2          |object |                          |2` });
    lo_nodes.add({ iv_str: `/1/           |a          |str    |One                       | ` });
    lo_nodes.add({ iv_str: `/1/           |b          |num    |1                         | ` });
    lo_nodes.add({ iv_str: `/2/           |a          |str    |Two                       | ` });
    lo_nodes.add({ iv_str: `/2/           |b          |num    |2                         | ` });
    lo_cut = new lcl_json_to_abap();
    const _out0 = { it_nodes: lo_nodes.sorted(), c_container: lt_mock };
    lo_cut.to_abap(_out0);
    if ("c_container" in _out0) lt_mock = _out0.c_container;
    let ls_elem = { a: ``, b: 0 };
    ls_elem.a = `One`;
    ls_elem.b = 1;
    lt_exp.push(z2ui5_cl_util.abap_copy(ls_elem));
    ls_elem.a = `Two`;
    ls_elem.b = 2;
    lt_exp.push(z2ui5_cl_util.abap_copy(ls_elem));
    cl_abap_unit_assert.assert_equals({ act: lt_mock, exp: lt_exp });
  }

  to_abap_negative() {
    let lo_cut = null;
    let lx = null;
    let ls_mock = { str: ``, int: 0, float: 0, bool: false, obj: { a: ``, b: 0 }, tab: [], tab_plain: [], tab_hashed: [], oref: null, dref: null, date1: null, date2: null, timestamp1: 0, timestamp2: 0, timestamp3: 0, timestamp4: 0, timestamp5: 0 };
    lo_cut = new lcl_json_to_abap();
    let lo_nodes = null;
    try {
      lo_nodes = new lcl_nodes_helper();
      lo_nodes.add({ iv_str: `     |      |object | ` });
      lo_nodes.add({ iv_str: `/    |str   |object | ` });
      const _out0 = { it_nodes: lo_nodes.sorted(), c_container: ls_mock };
      lo_cut.to_abap(_out0);
      if ("c_container" in _out0) ls_mock = _out0.c_container;
      cl_abap_unit_assert.fail();
    } catch (_caught1) {
      lx = _caught1;
      cl_abap_unit_assert.assert_equals({ act: lx.message, exp: `Expected structure` });
    }
    try {
      lo_nodes = new lcl_nodes_helper();
      lo_nodes.add({ iv_str: `     |      |object | ` });
      lo_nodes.add({ iv_str: `/    |str   |array  | ` });
      const _out1 = { it_nodes: lo_nodes.sorted(), c_container: ls_mock };
      lo_cut.to_abap(_out1);
      if ("c_container" in _out1) ls_mock = _out1.c_container;
      cl_abap_unit_assert.fail();
    } catch (_caught2) {
      lx = _caught2;
      cl_abap_unit_assert.assert_equals({ act: lx.message, exp: `Expected table` });
    }
    try {
      lo_nodes = new lcl_nodes_helper();
      lo_nodes.add({ iv_str: `     |      |object |      ` });
      lo_nodes.add({ iv_str: `/    |int   |str    |hello ` });
      const _out2 = { it_nodes: lo_nodes.sorted(), c_container: ls_mock };
      lo_cut.to_abap(_out2);
      if ("c_container" in _out2) ls_mock = _out2.c_container;
      cl_abap_unit_assert.fail();
    } catch (_caught3) {
      lx = _caught3;
      cl_abap_unit_assert.assert_equals({ act: lx.message, exp: `Source is not a number` });
    }
    try {
      lo_nodes = new lcl_nodes_helper();
      lo_nodes.add({ iv_str: `     |      |object |        ` });
      lo_nodes.add({ iv_str: `/    |date1 |str    |baddate ` });
      const _out3 = { it_nodes: lo_nodes.sorted(), c_container: ls_mock };
      lo_cut.to_abap(_out3);
      if ("c_container" in _out3) ls_mock = _out3.c_container;
      cl_abap_unit_assert.fail();
    } catch (_caught4) {
      lx = _caught4;
      cl_abap_unit_assert.assert_equals({ act: lx.message, exp: `Unexpected date format` });
    }
    try {
      lo_nodes = new lcl_nodes_helper();
      lo_nodes.add({ iv_str: `    |        |object |        ` });
      lo_nodes.add({ iv_str: `/   |missing |str    |123     ` });
      const _out4 = { it_nodes: lo_nodes.sorted(), c_container: ls_mock };
      lo_cut.to_abap(_out4);
      if ("c_container" in _out4) ls_mock = _out4.c_container;
      cl_abap_unit_assert.fail();
    } catch (_caught5) {
      lx = _caught5;
      cl_abap_unit_assert.assert_equals({ act: lx.message, exp: `Path not found` });
    }
    try {
      let lt_str = [];
      lo_nodes = new lcl_nodes_helper();
      lo_nodes.add({ iv_str: `      |     |array  |      | ` });
      lo_nodes.add({ iv_str: `/     |a    |str    |hello |1` });
      const _out5 = { it_nodes: lo_nodes.sorted(), c_container: lt_str };
      lo_cut.to_abap(_out5);
      if ("c_container" in _out5) lt_str = _out5.c_container;
      cl_abap_unit_assert.fail();
    } catch (_caught6) {
      lx = _caught6;
      cl_abap_unit_assert.assert_equals({ act: lx.message, exp: `Need index to access tables` });
    }
    try {
      let lr_obj = null;
      lo_nodes = new lcl_nodes_helper();
      lo_nodes.add({ iv_str: `      |     |str  |hello      | ` });
      const _out6 = { it_nodes: lo_nodes.sorted(), c_container: lr_obj };
      lo_cut.to_abap(_out6);
      if ("c_container" in _out6) lr_obj = _out6.c_container;
      cl_abap_unit_assert.fail();
    } catch (_caught7) {
      lx = _caught7;
      cl_abap_unit_assert.assert_equals({ act: lx.message, exp: `Cannot assign to ref` });
    }
    try {
      let lt_hashed = [];
      lo_nodes = new lcl_nodes_helper();
      lo_nodes.add({ iv_str: `            |           |array  |                          | ` });
      lo_nodes.add({ iv_str: `/           |1          |str    |One                       |1` });
      lo_nodes.add({ iv_str: `/           |2          |str    |One                       |2` });
      const _out7 = { it_nodes: lo_nodes.sorted(), c_container: lt_hashed };
      lo_cut.to_abap(_out7);
      if ("c_container" in _out7) lt_hashed = _out7.c_container;
      cl_abap_unit_assert.fail();
    } catch (_caught8) {
      lx = _caught8;
      cl_abap_unit_assert.assert_equals({ act: lx.message, exp: `Duplicate insertion` });
    }
  }

  to_abap_corresponding() {
    let lo_cut = null;
    let ls_act = { a: ``, b: 0 };
    let ls_exp = { a: ``, b: 0 };
    let lo_nodes = null;
    lo_nodes = new lcl_nodes_helper();
    lo_nodes.add({ iv_str: `       |           |object |                          | ` });
    lo_nodes.add({ iv_str: `/      |a          |str    |test                      | ` });
    lo_nodes.add({ iv_str: `/      |c          |num    |24022022                  | ` });
    ls_exp.a = `test`;
    lo_cut = new lcl_json_to_abap({ iv_corresponding: true });
    const _out0 = { it_nodes: lo_nodes.sorted(), c_container: ls_act };
    lo_cut.to_abap(_out0);
    if ("c_container" in _out0) ls_act = _out0.c_container;
    cl_abap_unit_assert.assert_equals({ act: ls_act, exp: ls_exp });
  }

  to_abap_corresponding_negative() {
    let lo_cut = null;
    let ls_act = { a: ``, b: 0 };
    let ls_exp = { a: ``, b: 0 };
    let lo_nodes = null;
    let lx = null;
    lo_nodes = new lcl_nodes_helper();
    lo_nodes.add({ iv_str: `       |           |object |                          | ` });
    lo_nodes.add({ iv_str: `/      |a          |str    |test                      | ` });
    lo_nodes.add({ iv_str: `/      |c          |num    |24022022                  | ` });
    ls_exp.a = `test`;
    ls_exp.b = 24022022;
    try {
      lo_cut = new lcl_json_to_abap();
      const _out0 = { it_nodes: lo_nodes.sorted(), c_container: ls_act };
      lo_cut.to_abap(_out0);
      if ("c_container" in _out0) ls_act = _out0.c_container;
      cl_abap_unit_assert.fail();
    } catch (_caught1) {
      lx = _caught1;
      cl_abap_unit_assert.assert_equals({ act: lx.message, exp: `Path not found` });
    }
  }

  to_abap_corresponding_public() {
    let lo_cut = null;
    let ls_act = { a: ``, b: 0 };
    let ls_exp = { a: ``, b: 0 };
    let li_json = null;
    let lo_nodes = null;
    lo_nodes = new lcl_nodes_helper();
    lo_nodes.add({ iv_str: `       |           |object |                          | ` });
    lo_nodes.add({ iv_str: `/      |a          |str    |test                      | ` });
    lo_nodes.add({ iv_str: `/      |c          |num    |24022022                  | ` });
    ls_exp.a = `test`;
    lo_cut = new z2ui5_cl_ajson();
    lo_cut.mt_json_tree = z2ui5_cl_util.abap_tab_assign(lo_cut.mt_json_tree, z2ui5_cl_util.abap_copy(lo_nodes.mt_nodes));
    const _out0 = { iv_corresponding: true, ev_container: ls_act };
    lo_cut.to_abap(_out0);
    if ("ev_container" in _out0) ls_act = _out0.ev_container;
    cl_abap_unit_assert.assert_equals({ act: ls_act, exp: ls_exp });
    ls_act = { a: ``, b: 0 };
    li_json = lo_cut.to_abap_corresponding_only();
    const _out1 = { ev_container: ls_act };
    li_json.to_abap(_out1);
    if ("ev_container" in _out1) ls_act = _out1.ev_container;
    cl_abap_unit_assert.assert_equals({ act: ls_act, exp: ls_exp });
  }

  to_abap_corresponding_pub_neg() {
    let lo_cut = null;
    let ls_act = { a: ``, b: 0 };
    let ls_exp = { a: ``, b: 0 };
    let lo_nodes = null;
    let lx = null;
    lo_nodes = new lcl_nodes_helper();
    lo_nodes.add({ iv_str: `       |           |object |                          | ` });
    lo_nodes.add({ iv_str: `/      |a          |str    |test                      | ` });
    lo_nodes.add({ iv_str: `/      |c          |num    |24022022                  | ` });
    ls_exp.a = `test`;
    lo_cut = new z2ui5_cl_ajson();
    lo_cut.mt_json_tree = z2ui5_cl_util.abap_tab_assign(lo_cut.mt_json_tree, z2ui5_cl_util.abap_copy(lo_nodes.mt_nodes));
    try {
      const _out0 = { ev_container: ls_act };
      lo_cut.to_abap(_out0);
      if ("ev_container" in _out0) ls_act = _out0.ev_container;
      cl_abap_unit_assert.fail();
    } catch (_caught1) {
      lx = _caught1;
      cl_abap_unit_assert.assert_equals({ act: lx.message, exp: `Path not found` });
    }
  }

  to_abap_compressed_stdrd() {
    let sy_subrc = 0;
    let lt_foo_bar = [];
    let ls_foo_bar = { foo: ``, bar: `` };
    let lo_ajson = null;
    let lv_json = ``;
    lv_json = `[` + `  {` + `    "foo": "abc",` + `    "bar": "123"` + `  },` + `  {` + `    "foo": "cde"` + `  }` + `]`;
    lo_ajson = z2ui5_cl_ajson.parse(lv_json);
    const _out0 = { ev_container: lt_foo_bar };
    lo_ajson.to_abap(_out0);
    if ("ev_container" in _out0) lt_foo_bar = _out0.ev_container;
    {
      const _t = lt_foo_bar;
      const _i = _t.findIndex((_r) => _r.foo === `cde`);
      sy_subrc = _i >= 0 && _i < _t.length ? 0 : 4;
      if (sy_subrc === 0) ls_foo_bar = _t[_i];
    }
    cl_abap_unit_assert.assert_initial({ act: ls_foo_bar.bar });
  }

  to_abap_compressed_stdrd_key() {
    let sy_subrc = 0;
    let lt_foo_bar = [];
    let ls_foo_bar = { foo: ``, bar: `` };
    let lo_ajson = null;
    let lv_json = ``;
    lv_json = `[` + `  {` + `    "foo": "abc",` + `    "bar": "123"` + `  },` + `  {` + `    "foo": "cde"` + `  }` + `]`;
    lo_ajson = z2ui5_cl_ajson.parse(lv_json);
    const _out0 = { ev_container: lt_foo_bar };
    lo_ajson.to_abap(_out0);
    if ("ev_container" in _out0) lt_foo_bar = _out0.ev_container;
    {
      const _t = lt_foo_bar;
      const _i = _t.findIndex((_r) => _r.foo === `cde`);
      sy_subrc = _i >= 0 && _i < _t.length ? 0 : 4;
      if (sy_subrc === 0) ls_foo_bar = _t[_i];
    }
    cl_abap_unit_assert.assert_initial({ act: ls_foo_bar.bar });
  }

  to_abap_compressed_sort() {
    let sy_subrc = 0;
    let lt_foo_bar = [];
    let ls_foo_bar = { foo: ``, bar: `` };
    let lo_ajson = null;
    let lv_json = ``;
    lv_json = `[` + `  {` + `    "foo": "abc",` + `    "bar": "123"` + `  },` + `  {` + `    "foo": "cde"` + `  }` + `]`;
    lo_ajson = z2ui5_cl_ajson.parse(lv_json);
    const _out0 = { ev_container: lt_foo_bar };
    lo_ajson.to_abap(_out0);
    if ("ev_container" in _out0) lt_foo_bar = _out0.ev_container;
    {
      const _t = lt_foo_bar;
      const _i = _t.findIndex((_r) => _r.foo === `cde`);
      sy_subrc = _i >= 0 && _i < _t.length ? 0 : 4;
      if (sy_subrc === 0) ls_foo_bar = _t[_i];
    }
    cl_abap_unit_assert.assert_initial({ act: ls_foo_bar.bar });
  }

  to_abap_compressed_sort_unique() {
    let sy_subrc = 0;
    let lt_foo_bar = [];
    let ls_foo_bar = { foo: ``, bar: `` };
    let lo_ajson = null;
    let lv_json = ``;
    lv_json = `[` + `  {` + `    "foo": "abc",` + `    "bar": "123"` + `  },` + `  {` + `    "foo": "cde"` + `  }` + `]`;
    lo_ajson = z2ui5_cl_ajson.parse(lv_json);
    const _out0 = { ev_container: lt_foo_bar };
    lo_ajson.to_abap(_out0);
    if ("ev_container" in _out0) lt_foo_bar = _out0.ev_container;
    {
      const _t = lt_foo_bar;
      const _i = _t.findIndex((_r) => _r.foo === `cde`);
      sy_subrc = _i >= 0 && _i < _t.length ? 0 : 4;
      if (sy_subrc === 0) ls_foo_bar = _t[_i];
    }
    cl_abap_unit_assert.assert_initial({ act: ls_foo_bar.bar });
  }

  to_abap_compressed_hash() {
    let sy_subrc = 0;
    let lt_foo_bar = [];
    let ls_foo_bar = { foo: ``, bar: `` };
    let lo_ajson = null;
    let lv_json = ``;
    lv_json = `[` + `  {` + `    "foo": "abc",` + `    "bar": "123"` + `  },` + `  {` + `    "foo": "cde"` + `  }` + `]`;
    lo_ajson = z2ui5_cl_ajson.parse(lv_json);
    const _out0 = { ev_container: lt_foo_bar };
    lo_ajson.to_abap(_out0);
    if ("ev_container" in _out0) lt_foo_bar = _out0.ev_container;
    {
      const _t = lt_foo_bar;
      const _i = _t.findIndex((_r) => _r.foo === `cde`);
      sy_subrc = _i >= 0 && _i < _t.length ? 0 : 4;
      if (sy_subrc === 0) ls_foo_bar = _t[_i];
    }
    cl_abap_unit_assert.assert_initial({ act: ls_foo_bar.bar });
  }
}





class ltcl_writer_test {
  prove_path_exists() {
    let lo_cut = null;
    let lo_nodes_exp = null;
    lo_cut = z2ui5_cl_ajson.create_empty();
    lo_nodes_exp = new lcl_nodes_helper();
    lo_nodes_exp.add({ iv_str: `        |      |object |     ||1` });
    lo_nodes_exp.add({ iv_str: `/       |a     |object |     ||1` });
    lo_nodes_exp.add({ iv_str: `/a/     |b     |object |     ||1` });
    lo_nodes_exp.add({ iv_str: `/a/b/   |c     |object |     ||1` });
    lo_nodes_exp.add({ iv_str: `/a/b/c/ |d     |object |     ||0` });
    lo_cut.prove_path_exists(`/a/b/c/d/`);
    cl_abap_unit_assert.assert_equals({ act: lo_cut.mt_json_tree, exp: lo_nodes_exp.sorted() });
    lo_nodes_exp = new lcl_nodes_helper();
    lo_nodes_exp.add({ iv_str: `         |      |object |     ||1` });
    lo_nodes_exp.add({ iv_str: `/        |a     |object |     ||1` });
    lo_nodes_exp.add({ iv_str: `/a/      |b     |object |     ||1` });
    lo_nodes_exp.add({ iv_str: `/a/b/    |c     |object |     ||1` });
    lo_nodes_exp.add({ iv_str: `/a/b/c/  |d     |object |     ||1` });
    lo_nodes_exp.add({ iv_str: `/a/b/c/d |e     |object |     ||0` });
    lo_cut.prove_path_exists(`/a/b/c/d/e/`);
  }

  delete_subtree() {
    let lo_cut = null;
    let lo_nodes_exp = null;
    lo_cut = z2ui5_cl_ajson.create_empty();
    lo_nodes_exp = new lcl_nodes_helper();
    lo_nodes_exp.add({ iv_str: `        |      |object |     ||1` });
    lo_nodes_exp.add({ iv_str: `/       |a     |object |     ||1` });
    lo_nodes_exp.add({ iv_str: `/a/     |b     |object |     ||1` });
    lo_nodes_exp.add({ iv_str: `/a/b/   |c     |object |     ||1` });
    lo_nodes_exp.add({ iv_str: `/a/b/c/ |d     |object |     ||0` });
    lo_cut.mt_json_tree = z2ui5_cl_util.abap_tab_assign(lo_cut.mt_json_tree, z2ui5_cl_util.abap_copy(lo_nodes_exp.mt_nodes));
    lo_nodes_exp = new lcl_nodes_helper();
    lo_nodes_exp.add({ iv_str: `        |      |object |     ||1` });
    lo_nodes_exp.add({ iv_str: `/       |a     |object |     ||0` });
    lo_cut.delete_subtree({ iv_path: `/a/`, iv_name: `b` });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.mt_json_tree, exp: lo_nodes_exp.sorted() });
  }

  delete() {
    let lo_cut = null;
    let lo_nodes_exp = null;
    lo_cut = z2ui5_cl_ajson.create_empty();
    lo_nodes_exp = new lcl_nodes_helper();
    lo_nodes_exp.add({ iv_str: `        |      |object |     ||1` });
    lo_nodes_exp.add({ iv_str: `/       |a     |object |     ||1` });
    lo_nodes_exp.add({ iv_str: `/a/     |b     |object |     ||1` });
    lo_nodes_exp.add({ iv_str: `/a/b/   |c     |object |     ||1` });
    lo_nodes_exp.add({ iv_str: `/a/b/c/ |d     |object |     ||0` });
    lo_cut.mt_json_tree = z2ui5_cl_util.abap_tab_assign(lo_cut.mt_json_tree, z2ui5_cl_util.abap_copy(lo_nodes_exp.mt_nodes));
    lo_nodes_exp = new lcl_nodes_helper();
    lo_nodes_exp.add({ iv_str: `        |      |object |     ||1` });
    lo_nodes_exp.add({ iv_str: `/       |a     |object |     ||0` });
    lo_cut.delete({ iv_path: `/a/b` });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.mt_json_tree, exp: lo_nodes_exp.sorted() });
    lo_nodes_exp = new lcl_nodes_helper();
    lo_nodes_exp.add({ iv_str: `        |      |object |     ||1` });
    lo_nodes_exp.add({ iv_str: `/       |a     |object |     ||1` });
    lo_nodes_exp.add({ iv_str: `/a/     |b     |object |     ||1` });
    lo_nodes_exp.add({ iv_str: `/a/b/   |c     |object |     ||1` });
    lo_nodes_exp.add({ iv_str: `/a/b/c/ |d     |object |     ||0` });
    lo_cut.mt_json_tree = z2ui5_cl_util.abap_tab_assign(lo_cut.mt_json_tree, z2ui5_cl_util.abap_copy(lo_nodes_exp.mt_nodes));
    lo_nodes_exp = new lcl_nodes_helper();
    lo_nodes_exp.add({ iv_str: `        |      |object |     ||1` });
    lo_nodes_exp.add({ iv_str: `/       |a     |object |     ||0` });
    lo_cut.delete({ iv_path: `/a/b/` });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.mt_json_tree, exp: lo_nodes_exp.sorted() });
  }

  set_ajson() {
    let lo_nodes = null;
    let lo_src = null;
    let lo_cut = null;
    let li_writer = null;
    lo_src = z2ui5_cl_ajson.create_empty();
    lo_cut = z2ui5_cl_ajson.create_empty();
    li_writer = lo_cut;
    lo_nodes = new lcl_nodes_helper();
    lo_nodes.add({ iv_str: `        |      |object |     ||1` });
    lo_nodes.add({ iv_str: `/       |x     |object |     ||2` });
    lo_nodes.add({ iv_str: `/x/     |b     |str    |abc  ||0` });
    lo_nodes.add({ iv_str: `/x/     |c     |num    |10   ||0` });
    lo_src.mt_json_tree = z2ui5_cl_util.abap_tab_assign(lo_src.mt_json_tree, z2ui5_cl_util.abap_copy(lo_nodes.mt_nodes));
    li_writer.set({ iv_path: ``, iv_val: lo_src });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.mt_json_tree, exp: lo_nodes.sorted() });
    li_writer.set({ iv_path: `/`, iv_val: lo_src });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.mt_json_tree, exp: lo_nodes.sorted() });
    lo_nodes = new lcl_nodes_helper();
    lo_nodes.add({ iv_str: `        |      |object |     ||1` });
    lo_nodes.add({ iv_str: `/       |a     |object |     ||1` });
    lo_nodes.add({ iv_str: `/a/     |b     |object |     ||1` });
    lo_nodes.add({ iv_str: `/a/b/     |c     |object |     ||1` });
    lo_nodes.add({ iv_str: `/a/b/c/   |x     |object |     ||2` });
    lo_nodes.add({ iv_str: `/a/b/c/x/ |b     |str    |abc  ||0` });
    lo_nodes.add({ iv_str: `/a/b/c/x/ |c     |num    |10   ||0` });
    li_writer.clear();
    li_writer.set({ iv_path: `/a/b/c`, iv_val: lo_src });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.mt_json_tree, exp: lo_nodes.sorted() });
    lo_nodes = new lcl_nodes_helper();
    lo_nodes.add({ iv_str: `        |      |object |     ||1` });
    lo_nodes.add({ iv_str: `/       |a     |object |     ||1` });
    lo_nodes.add({ iv_str: `/a/       |b     |object |     ||1` });
    lo_nodes.add({ iv_str: `/a/b/     |x     |object |     ||2` });
    lo_nodes.add({ iv_str: `/a/b/x/   |b     |str    |abc  ||0` });
    lo_nodes.add({ iv_str: `/a/b/x/   |c     |num    |10   ||0` });
    li_writer.set({ iv_path: `/a/b`, iv_val: lo_src });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.mt_json_tree, exp: lo_nodes.sorted() });
  }

  set_value() {
    let lo_nodes = null;
    let lo_cut = null;
    let li_writer = null;
    lo_cut = z2ui5_cl_ajson.create_empty();
    li_writer = lo_cut;
    lo_nodes = new lcl_nodes_helper();
    lo_nodes.add({ iv_str: `        |      |object |     ||1` });
    lo_nodes.add({ iv_str: `/       |x     |object |     ||2` });
    lo_nodes.add({ iv_str: `/x/     |b     |str    |abc  ||0` });
    lo_nodes.add({ iv_str: `/x/     |c     |num    |10   ||0` });
    li_writer.set({ iv_path: `/x/b`, iv_val: `abc` });
    li_writer.set({ iv_path: `/x/c`, iv_val: 10 });
    li_writer.set({ iv_path: `/x/d`, iv_val: 0 });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.mt_json_tree, exp: lo_nodes.sorted() });
  }

  ignore_empty() {
    let lo_nodes = null;
    let li_cut = null;
    li_cut = z2ui5_cl_ajson.create_empty();
    lo_nodes = new lcl_nodes_helper();
    lo_nodes.add({ iv_str: `        |      |object |     ||1` });
    lo_nodes.add({ iv_str: `/       |a     |num    |1    ||0` });
    li_cut.set({ iv_path: `/a`, iv_val: 1 });
    li_cut.set({ iv_path: `/b`, iv_val: 0 });
    cl_abap_unit_assert.assert_equals({ act: li_cut.mt_json_tree, exp: lo_nodes.sorted() });
    lo_nodes = new lcl_nodes_helper();
    lo_nodes.add({ iv_str: `        |      |object |     ||2` });
    lo_nodes.add({ iv_str: `/       |a     |num    |1    ||0` });
    lo_nodes.add({ iv_str: `/       |b     |num    |0    ||0` });
    li_cut.set({ iv_ignore_empty: false, iv_path: `/b`, iv_val: 0 });
    cl_abap_unit_assert.assert_equals({ act: li_cut.mt_json_tree, exp: lo_nodes.sorted() });
  }

  set_obj() {
    let lo_nodes = null;
    let lo_cut = null;
    let li_writer = null;
    let ls_struc = { b: `abc`, c: 10, d: `20220401` };
    lo_cut = z2ui5_cl_ajson.create_empty();
    li_writer = lo_cut;
    lo_nodes = new lcl_nodes_helper();
    lo_nodes.add({ iv_str: `        |      |object |           ||1` });
    lo_nodes.add({ iv_str: `/       |x     |object |           ||3` });
    lo_nodes.add({ iv_str: `/x/     |b     |str    |abc        ||0` });
    lo_nodes.add({ iv_str: `/x/     |c     |num    |10         ||0` });
    lo_nodes.add({ iv_str: `/x/     |d     |str    |2022-04-01 ||0` });
    li_writer.set({ iv_path: `/x`, iv_val: ls_struc });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.mt_json_tree, exp: lo_nodes.sorted() });
  }

  set_obj_w_date_time() {
    let lo_nodes = null;
    let lo_cut = null;
    let li_writer = null;
    let ls_struc = { d: `20220401`, d_empty: null, t: `200103`, t_empty: null, ts: 20220401200103, p: `123.45` };
    lo_cut = z2ui5_cl_ajson.create_empty().format_datetime();
    li_writer = lo_cut;
    lo_nodes = new lcl_nodes_helper();
    lo_nodes.add({ iv_str: `      |        |object |           ||6` });
    lo_nodes.add({ iv_str: `/     |d       |str    |2022-04-01 ||0` });
    lo_nodes.add({ iv_str: `/     |d_empty |str    |           ||0` });
    lo_nodes.add({ iv_str: `/     |t       |str    |20:01:03   ||0` });
    lo_nodes.add({ iv_str: `/     |t_empty |str    |           ||0` });
    lo_nodes.add({ iv_str: `/     |ts      |str    |2022-04-01T20:01:03Z ||0` });
    lo_nodes.add({ iv_str: `/     |p       |num    |123.45     ||0` });
    li_writer.set({ iv_path: `/`, iv_val: ls_struc });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.mt_json_tree, exp: lo_nodes.sorted() });
  }

  set_tab() {
    let lo_nodes = null;
    let lo_cut = null;
    let li_writer = null;
    let lt_tab = [];
    lo_cut = z2ui5_cl_ajson.create_empty();
    li_writer = lo_cut;
    lt_tab.push(z2ui5_cl_util.abap_copy(`hello`));
    lt_tab.push(z2ui5_cl_util.abap_copy(`world`));
    lo_nodes = new lcl_nodes_helper();
    lo_nodes.add({ iv_str: `        |      |object |     | |1` });
    lo_nodes.add({ iv_str: `/       |x     |array  |     | |2` });
    lo_nodes.add({ iv_str: `/x/     |1     |str    |hello|1|0` });
    lo_nodes.add({ iv_str: `/x/     |2     |str    |world|2|0` });
    li_writer.set({ iv_path: `/x`, iv_val: lt_tab });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.mt_json_tree, exp: lo_nodes.sorted() });
  }

  set_tab_hashed() {
    let lo_nodes = null;
    let lo_cut = null;
    let li_writer = null;
    let lt_tab = [];
    lo_cut = z2ui5_cl_ajson.create_empty();
    li_writer = lo_cut;
    lt_tab.push(z2ui5_cl_util.abap_copy(`hello`));
    lt_tab.push(z2ui5_cl_util.abap_copy(`world`));
    lo_nodes = new lcl_nodes_helper();
    lo_nodes.add({ iv_str: `        |      |object |     | |1` });
    lo_nodes.add({ iv_str: `/       |x     |array  |     | |2` });
    lo_nodes.add({ iv_str: `/x/     |1     |str    |hello|1|0` });
    lo_nodes.add({ iv_str: `/x/     |2     |str    |world|2|0` });
    li_writer.set({ iv_path: `/x`, iv_val: lt_tab });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.mt_json_tree, exp: lo_nodes.sorted() });
  }

  set_tab_nested_struct() {
    // TODO(abap2js): INCLUDE TYPE ty_include.
    let lo_nodes = null;
    let li_cut = null;
    let ls_tab = { dat: null };
    let lt_tab = [];
    li_cut = z2ui5_cl_ajson.create_empty();
    ls_tab.str = `hello`;
    ls_tab.int = 123;
    ls_tab.dat = `4041`;
    lt_tab.push(z2ui5_cl_util.abap_copy(ls_tab));
    ls_tab.str = `world`;
    ls_tab.int = 456;
    ls_tab.dat = `6061`;
    lt_tab.push(z2ui5_cl_util.abap_copy(ls_tab));
    lo_nodes = new lcl_nodes_helper();
    lo_nodes.add({ iv_str: `        |      |array  |     |0|2` });
    lo_nodes.add({ iv_str: `/       |1     |object |     |1|3` });
    lo_nodes.add({ iv_str: `/       |2     |object |     |2|3` });
    lo_nodes.add({ iv_str: `/1/     |dat   |str    |4041 |0|0` });
    lo_nodes.add({ iv_str: `/1/     |int   |num    |123  |0|0` });
    lo_nodes.add({ iv_str: `/1/     |str   |str    |hello|0|0` });
    lo_nodes.add({ iv_str: `/2/     |dat   |str    |6061 |0|0` });
    lo_nodes.add({ iv_str: `/2/     |int   |num    |456  |0|0` });
    lo_nodes.add({ iv_str: `/2/     |str   |str    |world|0|0` });
    li_cut.set({ iv_path: `/`, iv_val: lt_tab });
    cl_abap_unit_assert.assert_equals({ act: li_cut.mt_json_tree, exp: lo_nodes.sorted() });
  }

  set_ref_to_data() {
    let lo_nodes = null;
    let lo_cut = null;
    let li_writer = null;
    let lv_foo = 0;
    let lr_foo = null;
    lo_cut = z2ui5_cl_ajson.create_empty();
    li_writer = lo_cut;
    lo_nodes = new lcl_nodes_helper();
    lo_nodes.add({ iv_str: `        |      |num    |10         ||0` });
    lv_foo = 10;
    lr_foo = lv_foo;
    li_writer.set({ iv_path: `/`, iv_val: lr_foo });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.mt_json_tree, exp: lo_nodes.sorted() });
  }

  set_ref_to_data_struct() {
    let lo_nodes = null;
    let lo_cut = null;
    let li_writer = null;
    let lv_foo = ``;
    let ls_struc = { r: null };
    lo_cut = z2ui5_cl_ajson.create_empty();
    li_writer = lo_cut;
    lo_nodes = new lcl_nodes_helper();
    lo_nodes.add({ iv_str: `        |      |object |           ||1` });
    lo_nodes.add({ iv_str: `/       |r     |str    |abc        ||0` });
    lv_foo = `abc`;
    ls_struc.r = lv_foo;
    li_writer.set({ iv_path: `/`, iv_val: ls_struc });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.mt_json_tree, exp: lo_nodes.sorted() });
  }

  arrays() {
    let lo_cut = null;
    let lo_nodes_exp = null;
    let li_writer = null;
    lo_cut = z2ui5_cl_ajson.create_empty();
    li_writer = lo_cut;
    lo_nodes_exp = new lcl_nodes_helper();
    lo_nodes_exp.add({ iv_str: `        |      |object |     | |1` });
    lo_nodes_exp.add({ iv_str: `/       |a     |array  |     | |0` });
    li_writer.touch_array({ iv_path: `/a` });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.mt_json_tree, exp: lo_nodes_exp.sorted() });
    lo_nodes_exp = new lcl_nodes_helper();
    lo_nodes_exp.add({ iv_str: `        |      |object |     | |1` });
    lo_nodes_exp.add({ iv_str: `/       |a     |array  |     | |1` });
    lo_nodes_exp.add({ iv_str: `/a/     |1     |str    |hello|1|0` });
    li_writer.push({ iv_path: `/a`, iv_val: `hello` });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.mt_json_tree, exp: lo_nodes_exp.sorted() });
    lo_nodes_exp = new lcl_nodes_helper();
    lo_nodes_exp.add({ iv_str: `        |      |object |     | |1` });
    lo_nodes_exp.add({ iv_str: `/       |a     |array  |     | |2` });
    lo_nodes_exp.add({ iv_str: `/a/     |1     |str    |hello|1|0` });
    lo_nodes_exp.add({ iv_str: `/a/     |2     |object |     |2|1` });
    lo_nodes_exp.add({ iv_str: `/a/2/   |x     |str    |world| |0` });
    let ls_dummy = { x: `world` };
    li_writer.push({ iv_path: `/a`, iv_val: ls_dummy });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.mt_json_tree, exp: lo_nodes_exp.sorted() });
    li_writer.touch_array({ iv_path: `/a` });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.mt_json_tree, exp: lo_nodes_exp.sorted() });
    lo_nodes_exp = new lcl_nodes_helper();
    lo_nodes_exp.add({ iv_str: `        |      |object |     | |1` });
    lo_nodes_exp.add({ iv_str: `/       |a     |array  |     | |0` });
    li_writer.touch_array({ iv_path: `/a`, iv_clear: true });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.mt_json_tree, exp: lo_nodes_exp.sorted() });
    lo_nodes_exp = new lcl_nodes_helper();
    lo_nodes_exp.add({ iv_str: `        |      |object |     | |1` });
    lo_nodes_exp.add({ iv_str: `/       |a     |array  |     | |2` });
    lo_nodes_exp.add({ iv_str: `/a/     |1     |object |     |1|1` });
    lo_nodes_exp.add({ iv_str: `/a/1/   |x     |num    |123  | |0` });
    lo_nodes_exp.add({ iv_str: `/a/     |2     |num    |234  |2|0` });
    li_writer.set({ iv_path: `/a/1/x`, iv_val: 123 });
    li_writer.set({ iv_path: `/a/2`, iv_val: 234 });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.mt_json_tree, exp: lo_nodes_exp.sorted() });
  }

  arrays_negative() {
    let lo_cut = null;
    let li_writer = null;
    lo_cut = z2ui5_cl_ajson.create_empty();
    li_writer = lo_cut;
    li_writer.touch_array({ iv_path: `/a` });
    li_writer.push({ iv_path: `/a`, iv_val: 123 });
    let lx = null;
    try {
      li_writer.touch_array({ iv_path: `/a/1` });
      cl_abap_unit_assert.fail();
    } catch (_caught1) {
      lx = _caught1;
      cl_abap_unit_assert.assert_equals({ act: lx.message, exp: `Path [/a/1] already used and is not array` });
    }
    try {
      li_writer.push({ iv_path: `/a/1`, iv_val: 123 });
      cl_abap_unit_assert.fail();
    } catch (_caught2) {
      lx = _caught2;
      cl_abap_unit_assert.assert_equals({ act: lx.message, exp: `Path [/a/1] is not array` });
    }
    try {
      li_writer.push({ iv_path: `/x`, iv_val: 123 });
      cl_abap_unit_assert.fail();
    } catch (_caught3) {
      lx = _caught3;
      cl_abap_unit_assert.assert_equals({ act: lx.message, exp: `Path [/x] does not exist` });
    }
    try {
      li_writer.set({ iv_path: `/a/abc/x`, iv_val: 123 });
      cl_abap_unit_assert.fail();
    } catch (_caught4) {
      lx = _caught4;
      cl_abap_unit_assert.assert_equals({ act: lx.message, exp: `Cannot add non-numeric key [abc] to array [/a/]` });
    }
    try {
      li_writer.set({ iv_path: `/a/abc`, iv_val: 123 });
      cl_abap_unit_assert.fail();
    } catch (_caught5) {
      lx = _caught5;
      cl_abap_unit_assert.assert_equals({ act: lx.message, exp: `Cannot add non-numeric key [abc] to array [/a/]` });
    }
    try {
      li_writer.set({ iv_path: `/a/0`, iv_val: 123 });
      cl_abap_unit_assert.fail();
    } catch (_caught6) {
      lx = _caught6;
      cl_abap_unit_assert.assert_equals({ act: lx.message, exp: `Cannot add zero key to array [/a/]` });
    }
  }

  root_assignment() {
    let lo_cut = null;
    let lo_nodes_exp = null;
    let li_writer = null;
    let ls_dummy = { x: `hello` };
    lo_cut = z2ui5_cl_ajson.create_empty();
    li_writer = lo_cut;
    lo_nodes_exp = new lcl_nodes_helper();
    lo_nodes_exp.add({ iv_str: `        |      |object |     ||1` });
    lo_nodes_exp.add({ iv_str: `/       |x     |str    |hello||0` });
    li_writer.set({ iv_path: `/`, iv_val: ls_dummy });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.mt_json_tree, exp: lo_nodes_exp.sorted() });
    lo_nodes_exp = new lcl_nodes_helper();
    lo_nodes_exp.add({ iv_str: `        |      |object |     ||1` });
    lo_nodes_exp.add({ iv_str: `/       |x     |str    |hello||0` });
    li_writer.clear();
    li_writer.set({ iv_path: ``, iv_val: ls_dummy });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.mt_json_tree, exp: lo_nodes_exp.sorted() });
    lo_nodes_exp = new lcl_nodes_helper();
    lo_nodes_exp.add({ iv_str: `        |      |array  |     | |1` });
    lo_nodes_exp.add({ iv_str: `/       |1     |str    |hello|1|0` });
    li_writer.clear();
    li_writer.touch_array({ iv_path: `` });
    li_writer.push({ iv_path: ``, iv_val: `hello` });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.mt_json_tree, exp: lo_nodes_exp.sorted() });
    lo_nodes_exp = new lcl_nodes_helper();
    lo_nodes_exp.add({ iv_str: `        |      |str    |hello||0` });
    li_writer.clear();
    li_writer.set({ iv_path: ``, iv_val: `hello` });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.mt_json_tree, exp: lo_nodes_exp.sorted() });
  }

  set_bool_abap_bool() {
    let lo_cut = null;
    let lo_nodes_exp = null;
    let li_writer = null;
    lo_cut = z2ui5_cl_ajson.create_empty();
    li_writer = lo_cut;
    lo_nodes_exp = new lcl_nodes_helper();
    lo_nodes_exp.add({ iv_str: `        |      |object |      ||2` });
    lo_nodes_exp.add({ iv_str: `/       |a     |bool   |true  ||0` });
    lo_nodes_exp.add({ iv_str: `/       |b     |bool   |false ||0` });
    li_writer.set_boolean({ iv_path: `/a`, iv_val: true });
    li_writer.set_boolean({ iv_path: `/b`, iv_val: false });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.mt_json_tree, exp: lo_nodes_exp.sorted() });
  }

  set_bool_int() {
    let lo_cut = null;
    let lo_nodes_exp = null;
    let li_writer = null;
    lo_cut = z2ui5_cl_ajson.create_empty();
    li_writer = lo_cut;
    lo_nodes_exp = new lcl_nodes_helper();
    lo_nodes_exp.add({ iv_str: `        |      |object |      ||2` });
    lo_nodes_exp.add({ iv_str: `/       |a     |bool   |true  ||0` });
    lo_nodes_exp.add({ iv_str: `/       |b     |bool   |false ||0` });
    li_writer.set_boolean({ iv_path: `/a`, iv_val: 1 });
    li_writer.set_boolean({ iv_path: `/b`, iv_val: 0 });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.mt_json_tree, exp: lo_nodes_exp.sorted() });
  }

  set_bool_tab() {
    let lo_cut = null;
    let lo_nodes_exp = null;
    let li_writer = null;
    let lt_tab = [];
    lo_cut = z2ui5_cl_ajson.create_empty();
    li_writer = lo_cut;
    lo_nodes_exp = new lcl_nodes_helper();
    lo_nodes_exp.add({ iv_str: `        |      |object |      ||2` });
    lo_nodes_exp.add({ iv_str: `/       |a     |bool   |true  ||0` });
    lo_nodes_exp.add({ iv_str: `/       |b     |bool   |false ||0` });
    lt_tab.push(z2ui5_cl_util.abap_copy(`hello`));
    li_writer.set_boolean({ iv_path: `/a`, iv_val: lt_tab });
    lt_tab = [];
    li_writer.set_boolean({ iv_path: `/b`, iv_val: lt_tab });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.mt_json_tree, exp: lo_nodes_exp.sorted() });
  }

  set_str() {
    let lo_cut = null;
    let lo_nodes_exp = null;
    let li_writer = null;
    let lv_date = null;
    lo_cut = z2ui5_cl_ajson.create_empty();
    li_writer = lo_cut;
    lo_nodes_exp = new lcl_nodes_helper();
    lo_nodes_exp.add({ iv_str: `        |      |object |         ||3` });
    lo_nodes_exp.add({ iv_str: `/       |a     |str    |123      ||0` });
    lo_nodes_exp.add({ iv_str: `/       |b     |str    |X        ||0` });
    lo_nodes_exp.add({ iv_str: `/       |c     |str    |20200705 ||0` });
    li_writer.set_string({ iv_path: `/a`, iv_val: `123` });
    li_writer.set_string({ iv_path: `/b`, iv_val: true });
    lv_date = `20200705`;
    li_writer.set_string({ iv_path: `/c`, iv_val: lv_date });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.mt_json_tree, exp: lo_nodes_exp.sorted() });
  }

  set_int() {
    let lo_cut = null;
    let lo_nodes_exp = null;
    let li_writer = null;
    lo_cut = z2ui5_cl_ajson.create_empty();
    li_writer = lo_cut;
    lo_nodes_exp = new lcl_nodes_helper();
    lo_nodes_exp.add({ iv_str: `        |      |object |         ||1` });
    lo_nodes_exp.add({ iv_str: `/       |a     |num    |123      ||0` });
    li_writer.set_integer({ iv_path: `/a`, iv_val: 123 });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.mt_json_tree, exp: lo_nodes_exp.sorted() });
  }

  set_number() {
    let lo_nodes_exp = null;
    let li_json = null;
    let lv_p = 123.45;
    li_json = z2ui5_cl_ajson.create_empty();
    lo_nodes_exp = new lcl_nodes_helper();
    lo_nodes_exp.add({ iv_str: `        |      |object |         ||1` });
    lo_nodes_exp.add({ iv_str: `/       |a     |num    |123.45   ||0` });
    li_json.set({ iv_path: `/a`, iv_val: lv_p });
    cl_abap_unit_assert.assert_equals({ act: li_json.mt_json_tree, exp: lo_nodes_exp.sorted() });
  }

  set_date() {
    let lo_cut = null;
    let lo_nodes_exp = null;
    let li_writer = null;
    let lv_date = null;
    lo_cut = z2ui5_cl_ajson.create_empty();
    li_writer = lo_cut;
    lo_nodes_exp = new lcl_nodes_helper();
    lo_nodes_exp.add({ iv_str: `        |      |object |           ||2` });
    lo_nodes_exp.add({ iv_str: `/       |a     |str    |2020-07-05 ||0` });
    lo_nodes_exp.add({ iv_str: `/       |b     |str    |           ||0` });
    lv_date = `20200705`;
    li_writer.set_date({ iv_path: `/a`, iv_val: lv_date });
    lv_date = null;
    li_writer.set_date({ iv_path: `/b`, iv_val: lv_date });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.mt_json_tree, exp: lo_nodes_exp.sorted() });
  }

  set_timestamp() {
    let lo_cut = null;
    let lo_nodes_exp = null;
    let li_writer = null;
    let lv_timestamp = 0;
    lo_cut = z2ui5_cl_ajson.create_empty();
    li_writer = lo_cut;
    lo_nodes_exp = new lcl_nodes_helper();
    lo_nodes_exp.add({ iv_str: `        |      |object |                     ||1` });
    lo_nodes_exp.add({ iv_str: `/       |a     |str    |2021-05-05T12:00:00Z ||0` });
    lv_timestamp = `20210505120000`;
    li_writer.set_timestamp({ iv_path: `/a`, iv_val: lv_timestamp });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.mt_json_tree, exp: lo_nodes_exp.sorted() });
  }

  set_timestampl() {
    let lo_cut = null;
    let lo_nodes_exp = null;
    let li_writer = null;
    let lv_timestampl = 0;
    lo_cut = z2ui5_cl_ajson.create_empty();
    li_writer = lo_cut;
    lo_nodes_exp = new lcl_nodes_helper();
    lo_nodes_exp.add({ iv_str: `        |      |object |                            ||1` });
    lo_nodes_exp.add({ iv_str: `/       |a     |str    |2021-05-05T12:00:00.123456Z ||0` });
    lv_timestampl = `20210505120000.123456`;
    li_writer.set_timestampl({ iv_path: `/a`, iv_val: lv_timestampl });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.mt_json_tree, exp: lo_nodes_exp.sorted() });
  }

  set_utclong() {
    let sy_subrc = 0;
    let fs_utclong = null;
    let _fs$fs_utclong = null;
    let lo_cut = null;
    let lo_nodes_exp = null;
    let li_writer = null;
    let lr_utclong = null;
    try {
      // TODO(abap2js): CREATE DATA lr_utclong TYPE ('utclong').
      fs_utclong = lr_utclong;
      _fs$fs_utclong = null;
      sy_subrc = 0;
    } catch (error) {
      return;
    }
    lo_cut = z2ui5_cl_ajson.create_empty();
    li_writer = lo_cut;
    lo_nodes_exp = new lcl_nodes_helper();
    lo_nodes_exp.add({ iv_str: `        |      |object |                            ||1` });
    lo_nodes_exp.add({ iv_str: `/       |a     |str    |2021-05-05T12:00:00.1234567Z||0` });
    fs_utclong = `2021-05-05 12:00:00.1234567`;
    if (_fs$fs_utclong) _fs$fs_utclong.o[_fs$fs_utclong.k] = fs_utclong;
    li_writer.set({ iv_path: `/a`, iv_val: fs_utclong });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.mt_json_tree, exp: lo_nodes_exp.sorted() });
  }

  read_only() {
    let lo_cut = null;
    let li_writer = null;
    lo_cut = z2ui5_cl_ajson.create_empty();
    li_writer = lo_cut;
    li_writer.set({ iv_path: `/a`, iv_val: `abc` });
    li_writer.touch_array({ iv_path: `/b` });
    li_writer.push({ iv_path: `/b`, iv_val: `abc` });
    lo_cut.freeze();
    try {
      li_writer.set({ iv_path: `/c`, iv_val: `abc` });
      cl_abap_unit_assert.fail();
    } catch (error) {
    }
    try {
      li_writer.touch_array({ iv_path: `/d` });
      cl_abap_unit_assert.fail();
    } catch (error) {
    }
    try {
      li_writer.push({ iv_path: `/b`, iv_val: `xyz` });
      cl_abap_unit_assert.fail();
    } catch (error) {
    }
    try {
      li_writer.delete({ iv_path: `/a` });
      cl_abap_unit_assert.fail();
    } catch (error) {
    }
    try {
      li_writer.clear();
      cl_abap_unit_assert.fail();
    } catch (error) {
    }
  }

  set_array_obj() {
    let lo_cut = null;
    let lo_nodes_exp = null;
    let li_writer = null;
    lo_nodes_exp = new lcl_nodes_helper();
    lo_nodes_exp.add({ iv_str: `                 |         |object |                        |  |1` });
    lo_nodes_exp.add({ iv_str: `/                |issues   |array  |                        |  |2` });
    lo_nodes_exp.add({ iv_str: `/issues/         |1        |object |                        |1 |1` });
    lo_nodes_exp.add({ iv_str: `/issues/         |2        |object |                        |2 |1` });
    lo_nodes_exp.add({ iv_str: `/issues/1/       |end      |object |                        |  |2` });
    lo_nodes_exp.add({ iv_str: `/issues/1/end/   |col      |num    |26                      |  |0` });
    lo_nodes_exp.add({ iv_str: `/issues/1/end/   |row      |num    |4                       |  |0` });
    lo_nodes_exp.add({ iv_str: `/issues/2/       |end      |object |                        |  |2` });
    lo_nodes_exp.add({ iv_str: `/issues/2/end/   |col      |num    |22                      |  |0` });
    lo_nodes_exp.add({ iv_str: `/issues/2/end/   |row      |num    |3                       |  |0` });
    lo_cut = z2ui5_cl_ajson.create_empty();
    li_writer = lo_cut;
    li_writer.touch_array({ iv_path: `/issues` });
    li_writer.set({ iv_path: `/issues/1/end/col`, iv_val: 26 });
    li_writer.set({ iv_path: `/issues/1/end/row`, iv_val: 4 });
    li_writer.set({ iv_path: `/issues/2/end/col`, iv_val: 22 });
    li_writer.set({ iv_path: `/issues/2/end/row`, iv_val: 3 });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.mt_json_tree, exp: lo_nodes_exp.sorted() });
  }

  set_with_type() {
    let lo_sample = null;
    let lo_cut = null;
    let li_writer = null;
    lo_sample = z2ui5_cl_ajson.parse(ltcl_parser_test.sample_json());
    lo_cut = z2ui5_cl_ajson.create_empty();
    li_writer = lo_cut;
    this.set_with_type_slice({ io_json_in: lo_sample, io_json_out: li_writer, iv_path: `/` });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.mt_json_tree, exp: lo_sample.mt_json_tree });
  }

  set_with_type_slice({ io_json_in, io_json_out, iv_path } = {}) {
    let sy_tabix = 0;
    let lv_path = ``;
    sy_tabix = 0;
    for (const fs_node of io_json_in.mt_json_tree) {
      sy_tabix++;
      if (!(fs_node.path === iv_path)) continue;
      lv_path = fs_node.path + fs_node.name + `/`;
      switch (fs_node.type) {
        case z2ui5_if_ajson_types.node_type.array:
          io_json_out.touch_array(lv_path);
          this.set_with_type_slice({ io_json_in, io_json_out, iv_path: lv_path });
          break;
        case z2ui5_if_ajson_types.node_type.object:
          this.set_with_type_slice({ io_json_in, io_json_out, iv_path: lv_path });
          break;
        default:
          io_json_out.set({ iv_path: lv_path, iv_val: fs_node.value, iv_node_type: fs_node.type });
          break;
      }
    }
  }

  overwrite_w_keep_order_set() {
    let li_cut = null;
    let ls_dummy = { b: 0, a: 0 };
    li_cut = z2ui5_cl_ajson.create_empty().set({ iv_ignore_empty: false, iv_path: `/`, iv_val: ls_dummy });
    cl_abap_unit_assert.assert_equals({ act: li_cut.stringify(), exp: `{"a":0,"b":0}` });
    li_cut = z2ui5_cl_ajson.create_empty().keep_item_order().set({ iv_ignore_empty: false, iv_path: `/`, iv_val: ls_dummy });
    cl_abap_unit_assert.assert_equals({ act: li_cut.stringify(), exp: `{"b":0,"a":0}` });
    li_cut.set({ iv_path: `/a`, iv_val: 1 });
    cl_abap_unit_assert.assert_equals({ act: li_cut.stringify(), exp: `{"b":0,"a":1}` });
  }

  new_array_w_keep_order_touch() {
    let li_cut = null;
    li_cut = z2ui5_cl_ajson.create_empty().set({ iv_path: `/b`, iv_val: 1 });
    li_cut.touch_array(`/a`);
    cl_abap_unit_assert.assert_equals({ act: li_cut.stringify(), exp: `{"a":[],"b":1}` });
    li_cut = z2ui5_cl_ajson.create_empty().keep_item_order().set({ iv_path: `/b`, iv_val: 1 });
    li_cut.touch_array(`/a`);
    cl_abap_unit_assert.assert_equals({ act: li_cut.stringify(), exp: `{"b":1,"a":[]}` });
  }

  overwrite_w_keep_order_touch() {
    let li_cut = null;
    let ls_dummy = { b: 0, a: [] };
    li_cut = z2ui5_cl_ajson.create_empty().set({ iv_ignore_empty: false, iv_path: `/`, iv_val: ls_dummy });
    cl_abap_unit_assert.assert_equals({ act: li_cut.stringify(), exp: `{"a":[],"b":0}` });
    li_cut = z2ui5_cl_ajson.create_empty().keep_item_order().set({ iv_ignore_empty: false, iv_path: `/`, iv_val: ls_dummy });
    cl_abap_unit_assert.assert_equals({ act: li_cut.stringify(), exp: `{"b":0,"a":[]}` });
    li_cut.touch_array({ iv_path: `/a`, iv_clear: true });
    cl_abap_unit_assert.assert_equals({ act: li_cut.stringify(), exp: `{"b":0,"a":[]}` });
  }

  setx() {
    cl_abap_unit_assert.assert_equals({ act: z2ui5_cl_ajson.new().setx(`/a:1`).stringify(), exp: `{"a":1}` });
    cl_abap_unit_assert.assert_equals({ act: z2ui5_cl_ajson.new().setx(`/a : 1`).stringify(), exp: `{"a":1}` });
    cl_abap_unit_assert.assert_equals({ act: z2ui5_cl_ajson.new().setx(`/a:"1"`).stringify(), exp: `{"a":"1"}` });
    cl_abap_unit_assert.assert_equals({ act: z2ui5_cl_ajson.new().setx(`/a:abc`).stringify(), exp: `{"a":"abc"}` });
    cl_abap_unit_assert.assert_equals({ act: z2ui5_cl_ajson.new().setx(`/a:null`).stringify(), exp: `{"a":null}` });
    cl_abap_unit_assert.assert_equals({ act: z2ui5_cl_ajson.new().setx(`/a:true`).stringify(), exp: `{"a":true}` });
    cl_abap_unit_assert.assert_equals({ act: z2ui5_cl_ajson.new().setx(`/a:"true"`).stringify(), exp: `{"a":"true"}` });
    cl_abap_unit_assert.assert_equals({ act: z2ui5_cl_ajson.new().setx(`/a:false`).stringify(), exp: `{"a":false}` });
    cl_abap_unit_assert.assert_equals({ act: z2ui5_cl_ajson.new().setx(`/a/b:1`).stringify(), exp: `{"a":{"b":1}}` });
    cl_abap_unit_assert.assert_equals({ act: z2ui5_cl_ajson.new().setx(`/:1`).stringify(), exp: `1` });
    cl_abap_unit_assert.assert_equals({ act: z2ui5_cl_ajson.new().setx(`:1`).stringify(), exp: `1` });
    cl_abap_unit_assert.assert_equals({ act: z2ui5_cl_ajson.new().setx(`/a:""`).stringify(), exp: `{"a":""}` });
  }

  setx_float() {
    cl_abap_unit_assert.assert_equals({ act: z2ui5_cl_ajson.new().setx(`/a:1.123`).stringify(), exp: `{"a":1.123}` });
    cl_abap_unit_assert.assert_equals({ act: z2ui5_cl_ajson.new().setx(`/a:00.123`).stringify(), exp: `{"a":"00.123"}` });
    cl_abap_unit_assert.assert_equals({ act: z2ui5_cl_ajson.new().setx(`/a:.123`).stringify(), exp: `{"a":".123"}` });
    cl_abap_unit_assert.assert_equals({ act: z2ui5_cl_ajson.new().setx(`/a:123.`).stringify(), exp: `{"a":"123."}` });
    cl_abap_unit_assert.assert_equals({ act: z2ui5_cl_ajson.new().setx(`/a:1..123`).stringify(), exp: `{"a":"1..123"}` });
  }

  setx_complex() {
    cl_abap_unit_assert.assert_equals({ act: z2ui5_cl_ajson.new().setx(`/a:{"b" : 1}`).stringify(), exp: `{"a":{"b":1}}` });
    cl_abap_unit_assert.assert_equals({ act: z2ui5_cl_ajson.new().setx(`/a:{}`).stringify(), exp: `{"a":{}}` });
    cl_abap_unit_assert.assert_equals({ act: z2ui5_cl_ajson.new().setx(`/a:[1, 2]`).stringify(), exp: `{"a":[1,2]}` });
    cl_abap_unit_assert.assert_equals({ act: z2ui5_cl_ajson.new().setx(`/a:[]`).stringify(), exp: `{"a":[]}` });
    try {
      z2ui5_cl_ajson.new().setx(`/a:{"b" : 1`);
      cl_abap_unit_assert.fail();
    } catch (error) {
    }
    try {
      z2ui5_cl_ajson.new().setx(`/a:[1, 2`);
      cl_abap_unit_assert.fail();
    } catch (error) {
    }
  }

  setx_complex_w_keep_order() {
    let li_cut = null;
    let ls_dummy = { f: 5, e: 6 };
    li_cut = z2ui5_cl_ajson.new({ iv_keep_item_order: true });
    li_cut.setx(`/c:3`);
    li_cut.set({ iv_path: `/b`, iv_val: ls_dummy });
    li_cut.setx(`/a:1`);
    cl_abap_unit_assert.assert_equals({ act: li_cut.stringify(), exp: `{"c":3,"b":{"f":5,"e":6},"a":1}` });
    li_cut.setx(`/b:{"z":9,"y":8}`);
    cl_abap_unit_assert.assert_equals({ act: li_cut.stringify(), exp: `{"c":3,"b":{"z":9,"y":8},"a":1}` });
    li_cut.setx(`/0:9`);
    cl_abap_unit_assert.assert_equals({ act: li_cut.stringify(), exp: `{"c":3,"b":{"z":9,"y":8},"a":1,"0":9}` });
  }
}





class ltcl_integrated {
  array_simple() {
    let lt_act = [];
    let lt_exp = [];
    let lv_exp = ``;
    let lv_src = ``;
    lv_src = `[`;
    for (let sy_index = 1; sy_index <= 10; sy_index++) {
      if (sy_index !== 1) {
        lv_src = lv_src + `, `;
      }
      lv_src = lv_src + `"${sy_index}"`;
      lv_exp = `${sy_index}`;
      lt_exp.push(z2ui5_cl_util.abap_copy(lv_exp));
    }
    lv_src = lv_src + `]`;
    let li_reader = null;
    li_reader = z2ui5_cl_ajson.parse(lv_src);
    const _out0 = { ev_container: lt_act };
    li_reader.to_abap(_out0);
    if ("ev_container" in _out0) lt_act = _out0.ev_container;
    cl_abap_unit_assert.assert_equals({ act: lt_act, exp: lt_exp });
  }

  array_index() {
    let lt_act = [];
    let lt_exp = [];
    let ls_exp = { row: 0, col: 0 };
    let lv_src = ``;
    lv_src = `[`;
    for (let sy_index = 1; sy_index <= 10; sy_index++) {
      if (sy_index !== 1) {
        lv_src = lv_src + `, `;
      }
      lv_src = lv_src + `{ "row": ${sy_index} }`;
      ls_exp.row = z2ui5_cl_util.abap_tab_assign(ls_exp.row, z2ui5_cl_util.abap_copy(sy_index));
      lt_exp.push(z2ui5_cl_util.abap_copy(ls_exp));
    }
    lv_src = lv_src + `]`;
    let li_reader = null;
    li_reader = z2ui5_cl_ajson.parse(lv_src);
    const _out0 = { ev_container: lt_act };
    li_reader.to_abap(_out0);
    if ("ev_container" in _out0) lt_act = _out0.ev_container;
    cl_abap_unit_assert.assert_equals({ act: lt_act, exp: lt_exp });
  }

  reader() {
    let lv_source = ``;
    let li_reader = null;
    lv_source = ltcl_parser_test.sample_json();
    li_reader = z2ui5_cl_ajson.parse(lv_source);
    cl_abap_unit_assert.assert_equals({ act: li_reader.get(`/string`), exp: `abc` });
    let ls_act = { string: ``, number: 0, float: 0, boolean: false, false: false, null: ``, date: ``, issues: [] };
    let ls_exp = { string: ``, number: 0, float: 0, boolean: false, false: false, null: ``, date: ``, issues: [] };
    ls_exp.string = `abc`;
    ls_exp.number = 123;
    ls_exp.float = `123.45`;
    ls_exp.boolean = true;
    ls_exp.false = false;
    ls_exp.date = `2020-03-15`;
    let fs_i = { message: ``, key: ``, filename: ``, start: { row: 0, col: 0 }, end: { row: 0, col: 0 } };
    ls_exp.issues.push(fs_i);
    fs_i.message = `Indentation problem ...`;
    fs_i.key = `indentation`;
    fs_i.filename = `./zxxx.prog.abap`;
    fs_i.start.row = 4;
    fs_i.start.col = 3;
    fs_i.end.row = 4;
    fs_i.end.col = 26;
    fs_i = { message: ``, key: ``, filename: ``, start: { row: 0, col: 0 }, end: { row: 0, col: 0 } };
    ls_exp.issues.push(fs_i);
    fs_i.message = `Remove space before XXX`;
    fs_i.key = `space_before_dot`;
    fs_i.filename = `./zxxx.prog.abap`;
    fs_i.start.row = 3;
    fs_i.start.col = 21;
    fs_i.end.row = 3;
    fs_i.end.col = 22;
    const _out0 = { ev_container: ls_act };
    li_reader.to_abap(_out0);
    if ("ev_container" in _out0) ls_act = _out0.ev_container;
    cl_abap_unit_assert.assert_equals({ act: ls_act, exp: ls_exp });
  }

  stringify() {
    let lo_cut = null;
    let li_writer = null;
    let lv_exp = ``;
    let ls_dummy = { x: 0 };
    let ls_data = { str: ``, cls: null };
    ls_dummy.x = 1;
    lo_cut = z2ui5_cl_ajson.create_empty();
    li_writer = lo_cut;
    li_writer.set({ iv_path: `/a`, iv_val: 1 });
    li_writer.set({ iv_path: `/b`, iv_val: `B` });
    li_writer.set({ iv_path: `/c`, iv_val: true });
    li_writer.set_null({ iv_path: `/d` });
    lv_exp = `{"a":1,"b":"B","c":true,"d":null}`;
    cl_abap_unit_assert.assert_equals({ act: lo_cut.stringify(), exp: lv_exp });
    li_writer.touch_array({ iv_path: `/e` });
    li_writer.touch_array({ iv_path: `/f` });
    li_writer.push({ iv_path: `/f`, iv_val: 5 });
    li_writer.push({ iv_path: `/f`, iv_val: ls_dummy });
    li_writer.set({ iv_path: `/g`, iv_val: ls_dummy });
    lv_exp = `{"a":1,"b":"B","c":true,"d":null,"e":[],"f":[5,{"x":1}],"g":{"x":1}}`;
    cl_abap_unit_assert.assert_equals({ act: lo_cut.stringify(), exp: lv_exp });
    lv_exp = `{\\n` + `  "a": 1,\\n` + `  "b": "B",\\n` + `  "c": true,\\n` + `  "d": null,\\n` + `  "e": [],\\n` + `  "f": [\\n` + `    5,\\n` + `    {\\n` + `      "x": 1\\n` + `    }\\n` + `  ],\\n` + `  "g": {\\n` + `    "x": 1\\n` + `  }\\n` + `}`;
    lv_exp = lv_exp.replaceAll(`\\n`, cl_abap_char_utilities.newline);
    cl_abap_unit_assert.assert_equals({ act: lo_cut.stringify({ iv_indent: 2 }), exp: lv_exp });
    ls_data.str = `test`;
    li_writer = lo_cut;
    li_writer.set({ iv_path: `/`, iv_val: ls_data });
    lv_exp = `{"cls":null,"str":"test"}`;
    cl_abap_unit_assert.assert_equals({ act: lo_cut.stringify(), exp: lv_exp });
  }

  item_order_integrated() {
    let ls_dummy = { zulu: ``, alpha: ``, beta: `` };
    let lv_act = ``;
    let lv_exp = ``;
    let li_cut = null;
    ls_dummy.alpha = `a`;
    ls_dummy.beta = `b`;
    ls_dummy.zulu = `z`;
    li_cut = z2ui5_cl_ajson.create_empty();
    li_cut.set({ iv_path: `/`, iv_val: ls_dummy });
    lv_act = li_cut.stringify();
    lv_exp = `{"alpha":"a","beta":"b","zulu":"z"}`;
    cl_abap_unit_assert.assert_equals({ act: lv_act, exp: lv_exp });
    li_cut = z2ui5_cl_ajson.create_empty();
    li_cut.keep_item_order();
    li_cut.set({ iv_path: `/`, iv_val: ls_dummy });
    lv_act = li_cut.stringify();
    lv_exp = `{"zulu":"z","alpha":"a","beta":"b"}`;
    cl_abap_unit_assert.assert_equals({ act: lv_act, exp: lv_exp });
  }

  chaining() {
    let li_cut = null;
    li_cut = z2ui5_cl_ajson.create_empty();
    cl_abap_unit_assert.assert_bound(li_cut.set({ iv_path: `/a`, iv_val: 1 }));
    cl_abap_unit_assert.assert_bound(li_cut.delete({ iv_path: `/a` }));
    cl_abap_unit_assert.assert_bound(li_cut.touch_array({ iv_path: `/array` }));
    cl_abap_unit_assert.assert_bound(li_cut.push({ iv_path: `/array`, iv_val: `1` }));
    cl_abap_unit_assert.assert_bound(li_cut.keep_item_order());
  }

  push_json() {
    let li_cut = null;
    let li_sub = null;
    let lv_act = ``;
    let lv_exp = ``;
    li_cut = z2ui5_cl_ajson.create_empty();
    li_sub = z2ui5_cl_ajson.create_empty().set({ iv_path: `a`, iv_val: `1` });
    li_cut.touch_array(`/list`);
    li_cut.push({ iv_path: `/list`, iv_val: `hello` });
    li_cut.push({ iv_path: `/list`, iv_val: z2ui5_cl_ajson.create_empty().set({ iv_path: `a`, iv_val: `1` }) });
    li_cut.push({ iv_path: `/list`, iv_val: z2ui5_cl_ajson.create_empty().set({ iv_path: `/`, iv_val: `world` }) });
    lv_act = li_cut.stringify();
    lv_exp = `{"list":["hello",{"a":"1"},"world"]}`;
    cl_abap_unit_assert.assert_equals({ act: lv_act, exp: lv_exp });
  }

  is_empty() {
    let li_cut = null;
    li_cut = z2ui5_cl_ajson.create_empty();
    cl_abap_unit_assert.assert_equals({ exp: true, act: li_cut.is_empty() });
    li_cut.set({ iv_path: `/x`, iv_val: `123` });
    cl_abap_unit_assert.assert_equals({ exp: false, act: li_cut.is_empty() });
  }
}





class ltcl_abap_to_json {
  set_ajson() {
    let lo_nodes = null;
    let lo_src = null;
    lo_src = z2ui5_cl_ajson.create_empty();
    lo_nodes = new lcl_nodes_helper();
    lo_nodes.add({ iv_str: `        |      |object |     ||1` });
    lo_nodes.add({ iv_str: `/       |a     |object |     ||1` });
    lo_nodes.add({ iv_str: `/a/     |b     |object |     ||1` });
    lo_nodes.add({ iv_str: `/a/b/   |c     |object |     ||0` });
    lo_src.mt_json_tree = z2ui5_cl_util.abap_tab_assign(lo_src.mt_json_tree, z2ui5_cl_util.abap_copy(lo_nodes.mt_nodes));
    let lt_nodes = [];
    lt_nodes = lcl_abap_to_json.convert({ iv_data: lo_src });
    cl_abap_unit_assert.assert_equals({ act: lt_nodes, exp: lo_nodes.mt_nodes });
  }

  set_value_number() {
    let lo_nodes_exp = null;
    let lt_nodes = [];
    lo_nodes_exp = new lcl_nodes_helper();
    lo_nodes_exp.add({ iv_str: `        |      |num |1     ||` });
    lt_nodes = lcl_abap_to_json.convert({ iv_data: 1 });
    cl_abap_unit_assert.assert_equals({ act: lt_nodes, exp: lo_nodes_exp.mt_nodes });
  }

  set_value_string() {
    let lo_nodes_exp = null;
    let lt_nodes = [];
    lo_nodes_exp = new lcl_nodes_helper();
    lo_nodes_exp.add({ iv_str: `        |      |str |abc     ||` });
    lt_nodes = lcl_abap_to_json.convert({ iv_data: `abc` });
    cl_abap_unit_assert.assert_equals({ act: lt_nodes, exp: lo_nodes_exp.mt_nodes });
  }

  set_value_true() {
    let lo_nodes_exp = null;
    let lt_nodes = [];
    lo_nodes_exp = new lcl_nodes_helper();
    lo_nodes_exp.add({ iv_str: `        |      |bool |true     ||` });
    lt_nodes = lcl_abap_to_json.convert({ iv_data: true });
    cl_abap_unit_assert.assert_equals({ act: lt_nodes, exp: lo_nodes_exp.mt_nodes });
  }

  set_value_false() {
    let lo_nodes_exp = null;
    let lt_nodes = [];
    lo_nodes_exp = new lcl_nodes_helper();
    lo_nodes_exp.add({ iv_str: `        |      |bool |false    ||` });
    lt_nodes = lcl_abap_to_json.convert({ iv_data: false });
    cl_abap_unit_assert.assert_equals({ act: lt_nodes, exp: lo_nodes_exp.mt_nodes });
  }

  set_value_xsdboolean() {
    let lo_nodes_exp = null;
    let lt_nodes = [];
    let lv_xsdboolean = false;
    lo_nodes_exp = new lcl_nodes_helper();
    lo_nodes_exp.add({ iv_str: `        |      |bool |true     ||` });
    lv_xsdboolean = `X`;
    lt_nodes = lcl_abap_to_json.convert({ iv_data: lv_xsdboolean });
    cl_abap_unit_assert.assert_equals({ act: lt_nodes, exp: lo_nodes_exp.mt_nodes });
  }

  set_null() {
    let lo_nodes_exp = null;
    let lt_nodes = [];
    let lv_null_ref = null;
    lo_nodes_exp = new lcl_nodes_helper();
    lo_nodes_exp.add({ iv_str: `       |      |null |null ||` });
    lt_nodes = lcl_abap_to_json.convert({ iv_data: lv_null_ref });
    cl_abap_unit_assert.assert_equals({ act: lt_nodes, exp: lo_nodes_exp.mt_nodes });
  }

  set_value_timestamp() {
    let lo_nodes_exp = null;
    let lt_nodes = [];
    let lv_timezone = ``;
    let lv_timestamp = 0;
    lo_nodes_exp = new lcl_nodes_helper();
    lo_nodes_exp.add({ iv_str: `        |      |str |2022-08-31T00:00:00Z||` });
    lv_timestamp = Number(`${`20220831`}${`000000`}`) || 0;
    lt_nodes = lcl_abap_to_json.convert({ iv_data: lcl_abap_to_json.format_timestamp({ iv_ts: lv_timestamp }) });
    cl_abap_unit_assert.assert_equals({ act: lt_nodes, exp: lo_nodes_exp.mt_nodes });
  }

  set_value_timestamp_initial() {
    let lo_nodes_exp = null;
    let lt_nodes = [];
    let lv_timestamp = 0;
    lo_nodes_exp = new lcl_nodes_helper();
    lo_nodes_exp.add({ iv_str: `        |      |str |0000-00-00T00:00:00Z||` });
    lv_timestamp = 0;
    lt_nodes = lcl_abap_to_json.convert({ iv_data: lcl_abap_to_json.format_timestamp({ iv_ts: lv_timestamp }) });
    cl_abap_unit_assert.assert_equals({ act: lt_nodes, exp: lo_nodes_exp.mt_nodes });
  }

  set_value_timestampl() {
    let lo_nodes_exp = null;
    let lt_nodes = [];
    let lv_timezone = ``;
    let lv_timestampl = 0;
    lo_nodes_exp = new lcl_nodes_helper();
    lo_nodes_exp.add({ iv_str: `        |      |str |2022-08-31T12:34:56.1234567Z||` });
    lv_timestampl = Number(`${`20220831`}${`123456`}`) || 0;
    lv_timestampl = lv_timestampl + `0.1234567`;
    lt_nodes = lcl_abap_to_json.convert({ iv_data: lcl_abap_to_json.format_timestampl({ iv_ts: lv_timestampl }) });
    cl_abap_unit_assert.assert_equals({ act: lt_nodes, exp: lo_nodes_exp.mt_nodes });
  }

  set_value_timestampl_initial() {
    let lo_nodes_exp = null;
    let lt_nodes = [];
    let lv_timestampl = 0;
    lo_nodes_exp = new lcl_nodes_helper();
    lo_nodes_exp.add({ iv_str: `        |      |str |0000-00-00T00:00:00.0Z||` });
    lv_timestampl = 0;
    lt_nodes = lcl_abap_to_json.convert({ iv_data: lcl_abap_to_json.format_timestampl({ iv_ts: lv_timestampl }) });
    cl_abap_unit_assert.assert_equals({ act: lt_nodes, exp: lo_nodes_exp.mt_nodes });
  }

  prefix() {
    let lo_nodes_exp = null;
    let lt_nodes = [];
    let ls_prefix = { path: ``, name: `` };
    ls_prefix.path = `/a/`;
    ls_prefix.name = `b`;
    lo_nodes_exp = new lcl_nodes_helper();
    lo_nodes_exp.add({ iv_str: `/a/       |b     |num |1     ||` });
    lt_nodes = lcl_abap_to_json.convert({ iv_data: 1, is_prefix: ls_prefix });
    cl_abap_unit_assert.assert_equals({ act: lt_nodes, exp: lo_nodes_exp.mt_nodes });
  }

  set_obj() {
    let lo_nodes_exp = null;
    let ls_struc = { a: ``, b: 0, c: false, d: false };
    let lt_nodes = [];
    ls_struc.a = `abc`;
    ls_struc.b = 10;
    ls_struc.c = true;
    ls_struc.d = `X`;
    lo_nodes_exp = new lcl_nodes_helper();
    lo_nodes_exp.add({ iv_str: `       |      |object |     ||4` });
    lo_nodes_exp.add({ iv_str: `/      |a     |str    |abc  ||0` });
    lo_nodes_exp.add({ iv_str: `/      |b     |num    |10   ||0` });
    lo_nodes_exp.add({ iv_str: `/      |c     |bool   |true ||0` });
    lo_nodes_exp.add({ iv_str: `/      |d     |bool   |true ||0` });
    lt_nodes = lcl_abap_to_json.convert({ iv_data: ls_struc });
    cl_abap_unit_assert.assert_equals({ act: lt_nodes, exp: lo_nodes_exp.mt_nodes });
  }

  set_complex_obj() {
    let lo_nodes_exp = null;
    let ls_struc = { el: ``, struc: { a: ``, b: 0, c: false, d: false }, tab: [], stab: [] };
    let lt_nodes = [];
    ls_struc.a = `abc`;
    ls_struc.b = 10;
    ls_struc.c = true;
    ls_struc.d = `X`;
    ls_struc.el = `elem`;
    ls_struc.struc.a = `deep`;
    ls_struc.struc.b = 123;
    ls_struc.stab.push(z2ui5_cl_util.abap_copy(`hello`));
    ls_struc.stab.push(z2ui5_cl_util.abap_copy(`world`));
    let fs_i = { a: ``, b: 0, c: false, d: false };
    ls_struc.tab.push(fs_i);
    fs_i.a = `abc`;
    fs_i = { a: ``, b: 0, c: false, d: false };
    ls_struc.tab.push(fs_i);
    fs_i.a = `bcd`;
    lo_nodes_exp = new lcl_nodes_helper();
    lo_nodes_exp.add({ iv_str: `       |      |object |     ||8` });
    lo_nodes_exp.add({ iv_str: `/      |a     |str    |abc  ||0` });
    lo_nodes_exp.add({ iv_str: `/      |b     |num    |10   ||0` });
    lo_nodes_exp.add({ iv_str: `/      |c     |bool   |true ||0` });
    lo_nodes_exp.add({ iv_str: `/      |d     |bool   |true ||0` });
    lo_nodes_exp.add({ iv_str: `/      |el    |str    |elem ||0` });
    lo_nodes_exp.add({ iv_str: `/      |struc |object |     ||4` });
    lo_nodes_exp.add({ iv_str: `/struc/|a     |str    |deep ||0` });
    lo_nodes_exp.add({ iv_str: `/struc/|b     |num    |123  ||0` });
    lo_nodes_exp.add({ iv_str: `/struc/|c     |bool   |false||0` });
    lo_nodes_exp.add({ iv_str: `/struc/|d     |bool   |false||0` });
    lo_nodes_exp.add({ iv_str: `/      |tab   |array  |     | |2` });
    lo_nodes_exp.add({ iv_str: `/tab/  |1     |object |     |1|4` });
    lo_nodes_exp.add({ iv_str: `/tab/1/|a     |str    |abc  | |0` });
    lo_nodes_exp.add({ iv_str: `/tab/1/|b     |num    |0    | |0` });
    lo_nodes_exp.add({ iv_str: `/tab/1/|c     |bool   |false| |0` });
    lo_nodes_exp.add({ iv_str: `/tab/1/|d     |bool   |false| |0` });
    lo_nodes_exp.add({ iv_str: `/tab/  |2     |object |     |2|4` });
    lo_nodes_exp.add({ iv_str: `/tab/2/|a     |str    |bcd  | |0` });
    lo_nodes_exp.add({ iv_str: `/tab/2/|b     |num    |0    | |0` });
    lo_nodes_exp.add({ iv_str: `/tab/2/|c     |bool   |false| |0` });
    lo_nodes_exp.add({ iv_str: `/tab/2/|d     |bool   |false| |0` });
    lo_nodes_exp.add({ iv_str: `/      |stab  |array  |     | |2` });
    lo_nodes_exp.add({ iv_str: `/stab/ |1     |str    |hello|1|0` });
    lo_nodes_exp.add({ iv_str: `/stab/ |2     |str    |world|2|0` });
    lt_nodes = lcl_abap_to_json.convert({ iv_data: ls_struc });
    cl_abap_unit_assert.assert_equals({ act: lt_nodes, exp: lo_nodes_exp.mt_nodes });
  }

  set_include_with_suffix() {
    let lo_nodes_exp = null;
    let ls_struc = { el: `` };
    let lt_nodes = [];
    ls_struc.a_suf = `abc`;
    ls_struc.b_suf = 10;
    ls_struc.c_suf = true;
    ls_struc.d_suf = `X`;
    ls_struc.el = `elem`;
    lo_nodes_exp = new lcl_nodes_helper();
    lo_nodes_exp.add({ iv_str: `       |      |object |     ||5` });
    lo_nodes_exp.add({ iv_str: `/      |a_suf |str    |abc  ||0` });
    lo_nodes_exp.add({ iv_str: `/      |b_suf |num    |10   ||0` });
    lo_nodes_exp.add({ iv_str: `/      |c_suf |bool   |true ||0` });
    lo_nodes_exp.add({ iv_str: `/      |d_suf |bool   |true ||0` });
    lo_nodes_exp.add({ iv_str: `/      |el    |str    |elem ||0` });
    lt_nodes = lcl_abap_to_json.convert({ iv_data: ls_struc });
    cl_abap_unit_assert.assert_equals({ act: lt_nodes, exp: lo_nodes_exp.mt_nodes });
  }

  set_array() {
    let lo_nodes_exp = null;
    let lt_nodes = [];
    let lt_tab = [];
    let fs_s = { a: ``, b: 0, c: false, d: false };
    lt_tab.push(fs_s);
    fs_s.a = `abc`;
    fs_s.b = 10;
    fs_s = { a: ``, b: 0, c: false, d: false };
    lt_tab.push(fs_s);
    fs_s.a = `bcd`;
    fs_s.b = 20;
    lo_nodes_exp = new lcl_nodes_helper();
    lo_nodes_exp.add({ iv_str: `       |      |array  |     | |2` });
    lo_nodes_exp.add({ iv_str: `/      |1     |object |     |1|4` });
    lo_nodes_exp.add({ iv_str: `/1/    |a     |str    |abc  | |0` });
    lo_nodes_exp.add({ iv_str: `/1/    |b     |num    |10   | |0` });
    lo_nodes_exp.add({ iv_str: `/1/    |c     |bool   |false| |0` });
    lo_nodes_exp.add({ iv_str: `/1/    |d     |bool   |false| |0` });
    lo_nodes_exp.add({ iv_str: `/      |2     |object |     |2|4` });
    lo_nodes_exp.add({ iv_str: `/2/    |a     |str    |bcd  | |0` });
    lo_nodes_exp.add({ iv_str: `/2/    |b     |num    |20   | |0` });
    lo_nodes_exp.add({ iv_str: `/2/    |c     |bool   |false| |0` });
    lo_nodes_exp.add({ iv_str: `/2/    |d     |bool   |false| |0` });
    lt_nodes = lcl_abap_to_json.convert({ iv_data: lt_tab });
    cl_abap_unit_assert.assert_equals({ act: lt_nodes, exp: lo_nodes_exp.mt_nodes });
    let lt_strtab = [];
    lt_strtab.push(z2ui5_cl_util.abap_copy(`abc`));
    lt_strtab.push(z2ui5_cl_util.abap_copy(`bcd`));
    lo_nodes_exp = new lcl_nodes_helper();
    lo_nodes_exp.add({ iv_str: `       |      |array  |     | |2` });
    lo_nodes_exp.add({ iv_str: `/      |1     |str    |abc  |1|0` });
    lo_nodes_exp.add({ iv_str: `/      |2     |str    |bcd  |2|0` });
    lt_nodes = lcl_abap_to_json.convert({ iv_data: lt_strtab });
    cl_abap_unit_assert.assert_equals({ act: lt_nodes, exp: lo_nodes_exp.mt_nodes });
  }
}





class ltcl_filter_test {
  mt_visit_history = [];

  keep_node({ is_node, iv_visit = z2ui5_if_ajson_filter.visit_type.value } = {}) {
    let rv_keep = false;
    let ls_visit_history = { path: ``, type: null };
    if (iv_visit > 0) {
      ls_visit_history.type = z2ui5_cl_util.abap_tab_assign(ls_visit_history.type, z2ui5_cl_util.abap_copy(iv_visit));
      ls_visit_history.path = is_node.path + is_node.name + `/`;
      this.mt_visit_history.push(z2ui5_cl_util.abap_copy(ls_visit_history));
    }
    rv_keep = (!([...String(is_node.name)].some(($c) => String(`xX`).includes($c))) && !([...String(is_node.value)].some(($c) => String(`xX`).includes($c))));
    return rv_keep;
  }

  simple_test() {
    let lo_json = null;
    let lo_json_filtered = null;
    let lo_nodes_exp = null;
    lo_json = z2ui5_cl_ajson.create_empty();
    lo_json.set({ iv_path: `/a`, iv_val: 1 });
    lo_json.set({ iv_path: `/b`, iv_val: 1 });
    lo_json.set({ iv_path: `/x`, iv_val: 1 });
    lo_json.set({ iv_path: `/c/x`, iv_val: 1 });
    lo_json.set({ iv_path: `/c/y`, iv_val: 1 });
    lo_json_filtered = z2ui5_cl_ajson.create_from({ ii_source_json: lo_json, ii_filter: this });
    lo_nodes_exp = new lcl_nodes_helper();
    lo_nodes_exp.add({ iv_str: `       |      |object |     | |3` });
    lo_nodes_exp.add({ iv_str: `/      |a     |num    |1    | |0` });
    lo_nodes_exp.add({ iv_str: `/      |b     |num    |1    | |0` });
    lo_nodes_exp.add({ iv_str: `/      |c     |object |     | |1` });
    lo_nodes_exp.add({ iv_str: `/c/    |y     |num    |1    | |0` });
    cl_abap_unit_assert.assert_equals({ act: lo_json_filtered.mt_json_tree, exp: lo_nodes_exp.sorted() });
  }

  array_test() {
    let lo_json = null;
    let lo_json_filtered = null;
    let lo_nodes_exp = null;
    lo_json = z2ui5_cl_ajson.create_empty();
    lo_json.touch_array(`/`);
    lo_json.push({ iv_path: `/`, iv_val: `a` });
    lo_json.push({ iv_path: `/`, iv_val: `x` });
    lo_json.push({ iv_path: `/`, iv_val: `b` });
    lo_json.push({ iv_path: `/`, iv_val: `c` });
    lo_json.push({ iv_path: `/`, iv_val: `d` });
    lo_json.push({ iv_path: `/`, iv_val: `e` });
    lo_json.push({ iv_path: `/`, iv_val: `f` });
    lo_json.push({ iv_path: `/`, iv_val: `g` });
    lo_json.push({ iv_path: `/`, iv_val: `h` });
    lo_json.push({ iv_path: `/`, iv_val: `i` });
    lo_json.push({ iv_path: `/`, iv_val: `j` });
    lo_json_filtered = z2ui5_cl_ajson.create_from({ ii_source_json: lo_json, ii_filter: this });
    lo_nodes_exp = new lcl_nodes_helper();
    lo_nodes_exp.add({ iv_str: `       |      |array  |     | |10` });
    lo_nodes_exp.add({ iv_str: `/      |1     |str    |a    |1|0` });
    lo_nodes_exp.add({ iv_str: `/      |2     |str    |b    |2|0` });
    lo_nodes_exp.add({ iv_str: `/      |3     |str    |c    |3|0` });
    lo_nodes_exp.add({ iv_str: `/      |4     |str    |d    |4|0` });
    lo_nodes_exp.add({ iv_str: `/      |5     |str    |e    |5|0` });
    lo_nodes_exp.add({ iv_str: `/      |6     |str    |f    |6|0` });
    lo_nodes_exp.add({ iv_str: `/      |7     |str    |g    |7|0` });
    lo_nodes_exp.add({ iv_str: `/      |8     |str    |h    |8|0` });
    lo_nodes_exp.add({ iv_str: `/      |9     |str    |i    |9|0` });
    lo_nodes_exp.add({ iv_str: `/      |10    |str    |j    |10|0` });
    cl_abap_unit_assert.assert_equals({ act: lo_json_filtered.mt_json_tree, exp: lo_nodes_exp.sorted() });
  }

  visit_types() {
    let lo_json = null;
    let lo_json_filtered = null;
    let lt_visits_exp = [];
    let ls_dummy = { d: 10, e: 20 };
    this.mt_visit_history = [];
    lo_json = z2ui5_cl_ajson.create_empty();
    lo_json.touch_array(`/`);
    lo_json.push({ iv_path: `/`, iv_val: `a` });
    lo_json.push({ iv_path: `/`, iv_val: `b` });
    lo_json.push({ iv_path: `/`, iv_val: ls_dummy });
    lo_json_filtered = z2ui5_cl_ajson.create_from({ ii_source_json: lo_json, ii_filter: this });
    let fs_v = {};
    lt_visits_exp.push(fs_v);
    fs_v.path = `/`;
    fs_v.type = z2ui5_cl_util.abap_tab_assign(fs_v.type, z2ui5_cl_util.abap_copy(z2ui5_if_ajson_filter.visit_type.open));
    fs_v = {};
    lt_visits_exp.push(fs_v);
    fs_v.path = `/3/`;
    fs_v.type = z2ui5_cl_util.abap_tab_assign(fs_v.type, z2ui5_cl_util.abap_copy(z2ui5_if_ajson_filter.visit_type.open));
    fs_v = {};
    lt_visits_exp.push(fs_v);
    fs_v.path = `/3/`;
    fs_v.type = z2ui5_cl_util.abap_tab_assign(fs_v.type, z2ui5_cl_util.abap_copy(z2ui5_if_ajson_filter.visit_type.close));
    fs_v = {};
    lt_visits_exp.push(fs_v);
    fs_v.path = `/`;
    fs_v.type = z2ui5_cl_util.abap_tab_assign(fs_v.type, z2ui5_cl_util.abap_copy(z2ui5_if_ajson_filter.visit_type.close));
    cl_abap_unit_assert.assert_equals({ act: this.mt_visit_history, exp: lt_visits_exp });
  }
}





class ltcl_mapper_test {
  rename_node(_args = {}) {
    let { is_node, cv_name } = _args;
    if (String(cv_name).substr(0, 1) === `a`) {
      cv_name = cv_name.toUpperCase();
    }
    if (cv_name === `set_this_empty`) {
      cv_name = null;
    }
    if (is_node.index !== 0) {
      cl_abap_unit_assert.fail(`rename must not be called for direct array items`);
    }
    Object.assign(_args, { cv_name });
  }

  to_abap({ iv_path, iv_name } = {}) {
    let rv_result = ``;
    return rv_result;
  }

  to_json({ iv_path, iv_name } = {}) {
    let rv_result = ``;
    return rv_result;
  }

  simple_test() {
    let lo_json = null;
    let lo_json_filtered = null;
    let lo_nodes_exp = null;
    lo_json = z2ui5_cl_ajson.create_empty();
    lo_json.set({ iv_path: `/ab`, iv_val: 1 });
    lo_json.set({ iv_path: `/bc`, iv_val: 2 });
    lo_json.set({ iv_path: `/c/ax`, iv_val: 3 });
    lo_json.set({ iv_path: `/c/by`, iv_val: 4 });
    lo_json.set({ iv_path: `/a/ax`, iv_val: 5 });
    lo_json.set({ iv_path: `/a/by`, iv_val: 6 });
    lo_json_filtered = z2ui5_cl_ajson.create_from({ ii_source_json: lo_json, ii_mapper: this });
    lo_nodes_exp = new lcl_nodes_helper();
    lo_nodes_exp.add({ iv_str: `       |      |object |     | |4` });
    lo_nodes_exp.add({ iv_str: `/      |AB    |num    |1    | |0` });
    lo_nodes_exp.add({ iv_str: `/      |bc    |num    |2    | |0` });
    lo_nodes_exp.add({ iv_str: `/      |c     |object |     | |2` });
    lo_nodes_exp.add({ iv_str: `/c/    |AX    |num    |3    | |0` });
    lo_nodes_exp.add({ iv_str: `/c/    |by    |num    |4    | |0` });
    lo_nodes_exp.add({ iv_str: `/      |A     |object |     | |2` });
    lo_nodes_exp.add({ iv_str: `/A/    |AX    |num    |5    | |0` });
    lo_nodes_exp.add({ iv_str: `/A/    |by    |num    |6    | |0` });
    cl_abap_unit_assert.assert_equals({ act: lo_json_filtered.mt_json_tree, exp: lo_nodes_exp.sorted() });
  }

  array_test() {
    let lo_json = null;
    let lo_json_filtered = null;
    let lo_nodes_exp = null;
    lo_json = z2ui5_cl_ajson.create_empty();
    lo_json.touch_array({ iv_path: `/` });
    lo_json.set({ iv_path: `/1/ab`, iv_val: 1 });
    lo_json.set({ iv_path: `/1/bc`, iv_val: 2 });
    lo_json.set({ iv_path: `/2/ax`, iv_val: 3 });
    lo_json.set({ iv_path: `/2/by`, iv_val: 4 });
    lo_json_filtered = z2ui5_cl_ajson.create_from({ ii_source_json: lo_json, ii_mapper: this });
    lo_nodes_exp = new lcl_nodes_helper();
    lo_nodes_exp.add({ iv_str: `       |      |array  |     | |2` });
    lo_nodes_exp.add({ iv_str: `/      |1     |object |     |1|2` });
    lo_nodes_exp.add({ iv_str: `/      |2     |object |     |2|2` });
    lo_nodes_exp.add({ iv_str: `/1/    |AB    |num    |1    | |0` });
    lo_nodes_exp.add({ iv_str: `/1/    |bc    |num    |2    | |0` });
    lo_nodes_exp.add({ iv_str: `/2/    |AX    |num    |3    | |0` });
    lo_nodes_exp.add({ iv_str: `/2/    |by    |num    |4    | |0` });
    cl_abap_unit_assert.assert_equals({ act: lo_json_filtered.mt_json_tree, exp: lo_nodes_exp.sorted() });
  }

  duplication_test() {
    let lo_json = null;
    let lx_err = null;
    lo_json = z2ui5_cl_ajson.create_empty();
    lo_json.set({ iv_path: `/ab`, iv_val: 1 });
    lo_json.set({ iv_path: `/AB`, iv_val: 2 });
    try {
      z2ui5_cl_ajson.create_from({ ii_source_json: lo_json, ii_mapper: this });
      cl_abap_unit_assert.fail();
    } catch (_caught1) {
      lx_err = _caught1;
      cl_abap_unit_assert.assert_char_cp({ act: lx_err.get_text(), exp: `Renamed node has a duplicate @/AB` });
    }
  }

  trivial() {
    let lo_json = null;
    let lo_json_filtered = null;
    let lo_nodes_exp = null;
    lo_json = z2ui5_cl_ajson.create_empty();
    lo_json_filtered = z2ui5_cl_ajson.create_from({ ii_source_json: lo_json, ii_mapper: this });
    cl_abap_unit_assert.assert_initial(lo_json_filtered.mt_json_tree);
    lo_json.set({ iv_path: `/`, iv_val: 1 });
    lo_json_filtered = z2ui5_cl_ajson.create_from({ ii_source_json: lo_json, ii_mapper: this });
    lo_nodes_exp = new lcl_nodes_helper();
    lo_nodes_exp.add({ iv_str: `       |      |num    |1    | |0` });
    cl_abap_unit_assert.assert_equals({ act: lo_json_filtered.mt_json_tree, exp: lo_nodes_exp.sorted() });
  }

  empty_name_test() {
    let lo_json = null;
    let lx_err = null;
    lo_json = z2ui5_cl_ajson.create_empty();
    lo_json.set({ iv_path: `/set_this_empty`, iv_val: 1 });
    try {
      z2ui5_cl_ajson.create_from({ ii_source_json: lo_json, ii_mapper: this });
      cl_abap_unit_assert.fail();
    } catch (_caught1) {
      lx_err = _caught1;
      cl_abap_unit_assert.assert_char_cp({ act: lx_err.get_text(), exp: `Renamed node name cannot be empty @/set_this_empty` });
    }
  }
}





class ltcl_cloning_test {
  clone_test() {
    let li_json = null;
    let li_json_new = null;
    let lo_nodes_exp = null;
    li_json = z2ui5_cl_ajson.create_empty();
    li_json.set({ iv_path: `/ab`, iv_val: 1 });
    li_json.set({ iv_path: `/xy`, iv_val: 2 });
    li_json_new = li_json.clone();
    lo_nodes_exp = new lcl_nodes_helper();
    lo_nodes_exp.add({ iv_str: `       |      |object |     | |2` });
    lo_nodes_exp.add({ iv_str: `/      |ab    |num    |1    | |0` });
    lo_nodes_exp.add({ iv_str: `/      |xy    |num    |2    | |0` });
    cl_abap_unit_assert.assert_equals({ act: li_json.mt_json_tree, exp: lo_nodes_exp.sorted() });
    cl_abap_unit_assert.assert_equals({ act: li_json_new.mt_json_tree, exp: lo_nodes_exp.sorted() });
    li_json.set({ iv_path: `/ab`, iv_val: 5 });
    cl_abap_unit_assert.assert_equals({ act: li_json.get_integer(`/ab`), exp: 5 });
    cl_abap_unit_assert.assert_equals({ act: li_json_new.get_integer(`/ab`), exp: 1 });
  }

  filter_test() {
    let li_json = null;
    let li_json_new = null;
    let lo_nodes_exp = null;
    li_json = z2ui5_cl_ajson.create_empty();
    li_json.set({ iv_path: `/ab`, iv_val: 1 });
    li_json.set({ iv_path: `/xy`, iv_val: 2 });
    li_json_new = li_json.filter(this);
    lo_nodes_exp = new lcl_nodes_helper();
    lo_nodes_exp.add({ iv_str: `       |      |object |     | |1` });
    lo_nodes_exp.add({ iv_str: `/      |ab    |num    |1    | |0` });
    cl_abap_unit_assert.assert_equals({ act: li_json_new.mt_json_tree, exp: lo_nodes_exp.sorted() });
  }

  mapper_test() {
    let li_json = null;
    let li_json_new = null;
    let lo_nodes_exp = null;
    li_json = z2ui5_cl_ajson.create_empty();
    li_json.set({ iv_path: `/ab`, iv_val: 1 });
    li_json.set({ iv_path: `/xy`, iv_val: 2 });
    li_json_new = li_json.map(this);
    lo_nodes_exp = new lcl_nodes_helper();
    lo_nodes_exp.add({ iv_str: `       |      |object |     | |2` });
    lo_nodes_exp.add({ iv_str: `/      |AB    |num    |1    | |0` });
    lo_nodes_exp.add({ iv_str: `/      |xy    |num    |2    | |0` });
    cl_abap_unit_assert.assert_equals({ act: li_json_new.mt_json_tree, exp: lo_nodes_exp.sorted() });
  }

  rename_node(_args = {}) {
    let { is_node, cv_name } = _args;
    if (String(cv_name).substr(0, 1) === `a`) {
      cv_name = cv_name.toUpperCase();
    }
    Object.assign(_args, { cv_name });
  }

  to_abap({ iv_path, iv_name } = {}) {
    let rv_result = ``;
    return rv_result;
  }

  to_json({ iv_path, iv_name } = {}) {
    let rv_result = ``;
    return rv_result;
  }

  keep_node({ is_node, iv_visit = z2ui5_if_ajson_filter.visit_type.value } = {}) {
    let rv_keep = false;
    rv_keep = (!is_node.name || String(is_node.name).substr(0, 1) !== `x`);
    return rv_keep;
  }

  mapper_and_filter() {
    let li_json = null;
    let li_json_new = null;
    let lo_nodes_exp = null;
    li_json = z2ui5_cl_ajson.new();
    li_json.set({ iv_path: `/ab`, iv_val: 1 });
    li_json.set({ iv_path: `/bc`, iv_val: 2 });
    li_json.set({ iv_path: `/xy`, iv_val: 3 });
    li_json_new = z2ui5_cl_ajson.create_from({ ii_source_json: li_json, ii_filter: this, ii_mapper: this });
    lo_nodes_exp = new lcl_nodes_helper();
    lo_nodes_exp.add({ iv_str: `       |      |object |     | |2` });
    lo_nodes_exp.add({ iv_str: `/      |AB    |num    |1    | |0` });
    lo_nodes_exp.add({ iv_str: `/      |bc    |num    |2    | |0` });
    cl_abap_unit_assert.assert_equals({ act: li_json_new.mt_json_tree, exp: lo_nodes_exp.sorted() });
  }

  opts_copying() {
    let li_json = null;
    let li_json_new = null;
    li_json = z2ui5_cl_ajson.new().keep_item_order();
    li_json.set({ iv_path: `/ab`, iv_val: 1 });
    li_json_new = li_json.clone();
    cl_abap_unit_assert.assert_equals({ act: li_json_new.opts().keep_item_order, exp: true });
  }
}





class ltcl_data_ref_test {
  to_abap_data_ref() {
    let lo_cut = null;
    let li_refs = null;
    let lt_refs = [];
    let ls_refs = { path: ``, name: ``, dref: null };
    let ls_data = { str: ``, int: 0, itab: [] };
    let ls_mock = { str: null, int: null, itab: null };
    let lo_nodes = null;
    lo_nodes = new lcl_nodes_helper();
    lo_nodes.add({ iv_str: `        |           |object |                          | ` });
    lo_nodes.add({ iv_str: `/       |str        |str    |hello                     | ` });
    lo_nodes.add({ iv_str: `/       |int        |num    |42                        | ` });
    ls_refs.path = `/`;
    ls_refs.name = `str`;
    ls_refs.dref = ls_data.str;
    lt_refs.push(z2ui5_cl_util.abap_copy(ls_refs));
    ls_refs.name = `int`;
    ls_refs.dref = ls_data.int;
    lt_refs.push(z2ui5_cl_util.abap_copy(ls_refs));
    li_refs = z2ui5_cl_ajson_refinitlib.create_path_refs_init(lt_refs);
    lo_cut = new lcl_json_to_abap({ ii_refs_initiator: li_refs });
    const _out0 = { it_nodes: lo_nodes.sorted(), c_container: ls_mock };
    lo_cut.to_abap(_out0);
    if ("c_container" in _out0) ls_mock = _out0.c_container;
    cl_abap_unit_assert.assert_equals({ act: ls_data.str, exp: `hello` });
    cl_abap_unit_assert.assert_equals({ act: ls_data.int, exp: 42 });
  }

  to_abap_data_ref_table() {
    let lo_cut = null;
    let li_refs = null;
    let lt_refs = [];
    let ls_refs = { path: ``, name: ``, dref: null };
    let ls_data = { str: ``, int: 0, itab: [] };
    let ls_mock = { str: null, int: null, itab: null };
    let lt_exp = [];
    let lo_nodes = null;
    lo_nodes = new lcl_nodes_helper();
    lo_nodes.add({ iv_str: `        |           |object |                          | ` });
    lo_nodes.add({ iv_str: `/       |itab       |array  |                          | ` });
    lo_nodes.add({ iv_str: `/itab/  |1          |str    |one                       |1` });
    lo_nodes.add({ iv_str: `/itab/  |2          |str    |two                       |2` });
    ls_refs.path = `/`;
    ls_refs.name = `itab`;
    ls_refs.dref = ls_data.itab;
    lt_refs.push(z2ui5_cl_util.abap_copy(ls_refs));
    li_refs = z2ui5_cl_ajson_refinitlib.create_path_refs_init(lt_refs);
    lo_cut = new lcl_json_to_abap({ ii_refs_initiator: li_refs });
    const _out0 = { it_nodes: lo_nodes.sorted(), c_container: ls_mock };
    lo_cut.to_abap(_out0);
    if ("c_container" in _out0) ls_mock = _out0.c_container;
    lt_exp.push(z2ui5_cl_util.abap_copy(`one`));
    lt_exp.push(z2ui5_cl_util.abap_copy(`two`));
    cl_abap_unit_assert.assert_equals({ act: ls_data.itab, exp: lt_exp });
  }

  to_abap_data_ref_negative() {
    let lo_cut = null;
    let li_refs = null;
    let lt_refs = [];
    let ls_mock = { str: null, int: null, itab: null };
    let lo_nodes = null;
    let lx = null;
    lo_nodes = new lcl_nodes_helper();
    lo_nodes.add({ iv_str: `        |           |object |                          | ` });
    lo_nodes.add({ iv_str: `/       |itab       |array  |                          | ` });
    lo_nodes.add({ iv_str: `/itab/  |1          |str    |one                       |1` });
    li_refs = z2ui5_cl_ajson_refinitlib.create_path_refs_init(lt_refs);
    try {
      lo_cut = new lcl_json_to_abap({ ii_refs_initiator: li_refs });
      const _out0 = { it_nodes: lo_nodes.sorted(), c_container: ls_mock };
      lo_cut.to_abap(_out0);
      if ("c_container" in _out0) ls_mock = _out0.c_container;
      cl_abap_unit_assert.fail();
    } catch (_caught1) {
      lx = _caught1;
      cl_abap_unit_assert.assert_equals({ act: lx.message, exp: `Cannot use initial data ref` });
    }
  }

  to_abap_data_ref_no_initiator() {
    let lo_cut = null;
    let ls_mock = { str: null, int: null, itab: null };
    let lo_nodes = null;
    let lx = null;
    lo_nodes = new lcl_nodes_helper();
    lo_nodes.add({ iv_str: `        |           |object |                          | ` });
    lo_nodes.add({ iv_str: `/       |itab       |array  |                          | ` });
    lo_nodes.add({ iv_str: `/itab/  |1          |str    |one                       |1` });
    try {
      lo_cut = new lcl_json_to_abap();
      const _out0 = { it_nodes: lo_nodes.sorted(), c_container: ls_mock };
      lo_cut.to_abap(_out0);
      if ("c_container" in _out0) ls_mock = _out0.c_container;
      cl_abap_unit_assert.fail();
    } catch (_caught1) {
      lx = _caught1;
      cl_abap_unit_assert.assert_equals({ act: lx.message, exp: `Missing ref initiator` });
    }
  }
}





module.exports = {
  __main: "z2ui5_cl_ajson",
  __classes: { lcl_utils, lcl_json_parser, lcl_json_serializer, lcl_json_to_abap, lcl_abap_to_json, lcl_filter_runner, lcl_mapper_runner, lcl_mutator_queue, lcl_nodes_helper, ltcl_parser_test, ltcl_serializer_test, ltcl_utils_test, ltcl_reader_test, ltcl_json_to_abap, ltcl_writer_test, ltcl_integrated, ltcl_abap_to_json, ltcl_filter_test, ltcl_mapper_test, ltcl_cloning_test, ltcl_data_ref_test },
  __tests: {"ltcl_parser_test":["parse","parse_keeping_order","parse_string","parse_number","parse_float","parse_boolean","parse_false","parse_null","parse_date","parse_bare_values","parse_error","parse_input_xstring","parse_input_string","parse_input_string_table","parse_input_error","duplicate_key","non_json","special_characters_in_name","special_characters_in_path","special_characters_in_value","unicode_characters","parse_empty_object","parse_empty_string"],"ltcl_serializer_test":["stringify_condensed","stringify_indented","array_index","item_order","simple_indented","empty_set","escape_string","empty"],"ltcl_utils_test":["normalize_path","split_path","validate_array_index","string_to_xstring_utf8"],"ltcl_reader_test":["get_value","get_node_type","exists","value_integer","value_number","value_boolean","value_string","members","slice","array_to_string_table","get_date","get_timestamp","get_timestampl"],"ltcl_json_to_abap":["to_abap_struc","to_abap_timestamp_initial","to_abap_timestamp_long","to_abap_value","to_abap_array","to_abap_array_of_arrays_simple","to_abap_array_of_arrays","to_abap_w_tab_of_struc","to_abap_w_plain_tab","to_abap_hashed_tab","to_abap_sorted_tab","to_abap_hashed_plain_tab","to_abap_negative","to_abap_corresponding","to_abap_corresponding_negative","to_abap_corresponding_public","to_abap_corresponding_pub_neg","to_abap_time","to_abap_str_to_packed","to_abap_compressed_stdrd","to_abap_compressed_stdrd_key","to_abap_compressed_sort","to_abap_compressed_sort_unique","to_abap_compressed_hash"],"ltcl_writer_test":["set_ajson","set_value","ignore_empty","set_obj","set_obj_w_date_time","set_tab","set_tab_hashed","set_tab_nested_struct","set_ref_to_data","set_ref_to_data_struct","prove_path_exists","delete_subtree","delete","arrays","arrays_negative","root_assignment","set_bool_abap_bool","set_bool_int","set_bool_tab","set_str","set_int","set_number","set_date","set_timestamp","set_timestampl","set_utclong","read_only","set_array_obj","set_with_type","new_array_w_keep_order_touch","overwrite_w_keep_order_touch","overwrite_w_keep_order_set","setx","setx_float","setx_complex","setx_complex_w_keep_order"],"ltcl_integrated":["reader","array_index","array_simple","stringify","item_order_integrated","chaining","push_json","is_empty"],"ltcl_abap_to_json":["set_ajson","set_value_number","set_value_string","set_value_true","set_value_false","set_value_xsdboolean","set_value_timestamp","set_value_timestamp_initial","set_value_timestampl","set_value_timestampl_initial","set_null","set_obj","set_array","set_complex_obj","set_include_with_suffix","prefix"],"ltcl_filter_test":["simple_test","array_test","visit_types"],"ltcl_mapper_test":["simple_test","array_test","duplication_test","empty_name_test","trivial"],"ltcl_cloning_test":["clone_test","filter_test","mapper_test","mapper_and_filter","opts_copying"],"ltcl_data_ref_test":["to_abap_data_ref","to_abap_data_ref_table","to_abap_data_ref_negative","to_abap_data_ref_no_initiator"]},
};
