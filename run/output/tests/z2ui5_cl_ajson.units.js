// GENERATED from run/input/abap2UI5/src/00/01/z2ui5_cl_ajson.clas.testclasses.abap — do not edit
const cl_abap_char_utilities = require("abap2UI5/cl_abap_char_utilities");
const cl_abap_unit_assert = require("abap2UI5/cl_abap_unit_assert");
const z2ui5_cl_ajson = require("abap2UI5/z2ui5_cl_ajson");
const z2ui5_cl_ajson_refinitlib = require("abap2UI5/z2ui5_cl_ajson_refinitlib");
const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");
const z2ui5_if_ajson_filter = require("abap2UI5/z2ui5_if_ajson_filter");
const z2ui5_if_ajson_types = require("abap2UI5/z2ui5_if_ajson_types");


class lcl_nodes_helper {
  mt_nodes = null;

  add({ iv_str } = {}) {
    let lv_children = ``;
    let lv_index = ``;
    let lv_order = ``;
    this.mt_nodes.push({});
    [fs_n.path, fs_n.name, fs_n.type, fs_n.value, lv_index, lv_children, lv_order] = iv_str.split(`|`);
    // TODO(abap2js): CONDENSE <n>-path.
    // TODO(abap2js): CONDENSE <n>-name.
    // TODO(abap2js): CONDENSE <n>-type.
    // TODO(abap2js): CONDENSE <n>-value.
    fs_n.index = z2ui5_cl_util.abap_copy(lv_index);
    fs_n.children = z2ui5_cl_util.abap_copy(lv_children);
    fs_n.order = z2ui5_cl_util.abap_copy(lv_order);
  }

  sorted() {
    let rt_nodes = null;
    rt_nodes = z2ui5_cl_util.abap_copy(this.mt_nodes);
    return rt_nodes;
  }

  clear() {
    this.mt_nodes = null;
  }
}



class ltcl_parser_test {
  mo_cut = null;
  mo_nodes = null;

  setup() {
    this.mo_cut = null; // TODO(abap2js): CREATE OBJECT mo_cut.
    this.mo_nodes = null; // TODO(abap2js): CREATE OBJECT mo_nodes.
  }

  parse_bare_values() {
    let lt_act = null;
    this.mo_nodes.add(` | |str |abc | |0`);
    lt_act = this.mo_cut.parse(`"abc"`);
    cl_abap_unit_assert.assert_equals({ act: lt_act, exp: this.mo_nodes.mt_nodes });
    this.mo_nodes.clear();
    this.mo_nodes.add(` | |num |-123 | |0`);
    lt_act = this.mo_cut.parse(`-123`);
    cl_abap_unit_assert.assert_equals({ act: lt_act, exp: this.mo_nodes.mt_nodes });
    this.mo_nodes.clear();
    this.mo_nodes.add(` | |bool |true | |0`);
    lt_act = this.mo_cut.parse(`true`);
    cl_abap_unit_assert.assert_equals({ act: lt_act, exp: this.mo_nodes.mt_nodes });
    this.mo_nodes.clear();
    this.mo_nodes.add(` | |bool |false | |0`);
    lt_act = this.mo_cut.parse(`false`);
    cl_abap_unit_assert.assert_equals({ act: lt_act, exp: this.mo_nodes.mt_nodes });
    this.mo_nodes.clear();
    this.mo_nodes.add(` | |null | | |0`);
    lt_act = this.mo_cut.parse(`null`);
    cl_abap_unit_assert.assert_equals({ act: lt_act, exp: this.mo_nodes.mt_nodes });
  }

  parse_error() {
    let lt_act = null;
    let lx_err = null;
    try {
      lt_act = this.mo_cut.parse(`abc`);
      cl_abap_unit_assert.fail(`Parsing of string w/o quotes must fail (spec)`);
    } catch (lx_err) {
      cl_abap_unit_assert.assert_char_cp({ act: lx_err.get_text(), exp: `*parsing error*` });
      cl_abap_unit_assert.assert_char_cp({ act: lx_err.location, exp: `Line 1, Offset 1` });
    }
    try {
      lt_act = this.mo_cut.parse(`{` + cl_abap_char_utilities.newline + `"ok": "abc",` + cl_abap_char_utilities.newline + `"error"` + cl_abap_char_utilities.newline + `}`);
      cl_abap_unit_assert.fail(`Parsing of invalid JSON must fail (spec)`);
    } catch (lx_err) {
      cl_abap_unit_assert.assert_char_cp({ act: lx_err.get_text(), exp: `*parsing error*` });
      cl_abap_unit_assert.assert_char_cp({ act: lx_err.location, exp: `Line 3, Offset 8` });
    }
  }

  parse_string() {
    this.mo_nodes.add(`                 |         |object |                        |  |1`);
    this.mo_nodes.add(`/                |string   |str    |abc                     |  |0`);
    let lt_act = null;
    lt_act = this.mo_cut.parse(`{"string": "abc"}`);
    cl_abap_unit_assert.assert_equals({ act: lt_act, exp: this.mo_nodes.mt_nodes });
  }

  parse_number() {
    this.mo_nodes.add(`                 |         |object |                        |  |1`);
    this.mo_nodes.add(`/                |number   |num    |123                     |  |0`);
    let lt_act = null;
    lt_act = this.mo_cut.parse(`{"number": 123}`);
    cl_abap_unit_assert.assert_equals({ act: lt_act, exp: this.mo_nodes.mt_nodes });
  }

  parse_float() {
    this.mo_nodes.add(`                 |         |object |                        |  |1`);
    this.mo_nodes.add(`/                |float    |num    |123.45                  |  |0`);
    let lt_act = null;
    this.mo_cut = null; // TODO(abap2js): CREATE OBJECT mo_cut.
    lt_act = this.mo_cut.parse(`{"float": 123.45}`);
    cl_abap_unit_assert.assert_equals({ act: lt_act, exp: this.mo_nodes.mt_nodes });
  }

  parse_boolean() {
    this.mo_nodes.add(`                 |         |object |                        |  |1`);
    this.mo_nodes.add(`/                |boolean  |bool   |true                    |  |0`);
    let lt_act = null;
    lt_act = this.mo_cut.parse(`{"boolean": true}`);
    cl_abap_unit_assert.assert_equals({ act: lt_act, exp: this.mo_nodes.mt_nodes });
  }

  parse_false() {
    this.mo_nodes.add(`                 |         |object |                        |  |1`);
    this.mo_nodes.add(`/                |false    |bool   |false                   |  |0`);
    let lt_act = null;
    lt_act = this.mo_cut.parse(`{"false": false}`);
    cl_abap_unit_assert.assert_equals({ act: lt_act, exp: this.mo_nodes.mt_nodes });
  }

  parse_null() {
    this.mo_nodes.add(`                 |         |object |                        |  |1`);
    this.mo_nodes.add(`/                |null     |null   |                        |  |0`);
    let lt_act = null;
    lt_act = this.mo_cut.parse(`{"null": null}`);
    cl_abap_unit_assert.assert_equals({ act: lt_act, exp: this.mo_nodes.mt_nodes });
  }

  parse_date() {
    this.mo_nodes.add(`                 |         |object |                        |  |1`);
    this.mo_nodes.add(`/                |date     |str    |2020-03-15              |  |0`);
    let lt_act = null;
    lt_act = this.mo_cut.parse(`{"date": "2020-03-15"}`);
    cl_abap_unit_assert.assert_equals({ act: lt_act, exp: this.mo_nodes.mt_nodes });
  }

  parse_input_xstring() {
    this.mo_nodes.add(`                 |         |object |                        |  |1`);
    this.mo_nodes.add(`/                |string   |str    |abc                     |  |0`);
    let lt_act = null;
    let lv_xstr = null;
    lv_xstr = `7B22737472696E67223A2022616263227D0A`;
    lt_act = this.mo_cut.parse(lv_xstr);
    cl_abap_unit_assert.assert_equals({ act: lt_act, exp: this.mo_nodes.mt_nodes });
  }

  parse_input_string() {
    this.mo_nodes.add(`                 |         |object |                        |  |1`);
    this.mo_nodes.add(`/                |string   |str    |abc                     |  |0`);
    let lt_act = null;
    let lv_str = ``;
    lv_str = `{"string": "abc"}`;
    lt_act = this.mo_cut.parse(lv_str);
    cl_abap_unit_assert.assert_equals({ act: lt_act, exp: this.mo_nodes.mt_nodes });
  }

  parse_input_string_table() {
    this.mo_nodes.add(`                 |         |object |                        |  |2`);
    this.mo_nodes.add(`/                |string   |str    |abc                     |  |0`);
    this.mo_nodes.add(`/                |number   |num    |123                     |  |0`);
    let lt_act = null;
    let lt_json = [];
    lt_json.push(`{`);
    lt_json.push(`"string": "abc",`);
    lt_json.push(`"number": 123`);
    lt_json.push(`}`);
    lt_act = this.mo_cut.parse(lt_json);
    cl_abap_unit_assert.assert_equals({ act: lt_act, exp: this.mo_nodes.mt_nodes });
  }

  parse_input_error() {
    let lo_cut = null;
    let lx = null;
    let lv_numc = ``;
    let lt_hashed = [];
    lo_cut = null; // TODO(abap2js): CREATE OBJECT lo_cut.
    try {
      lo_cut.parse(lv_numc);
      cl_abap_unit_assert.fail();
    } catch (lx) {
      cl_abap_unit_assert.assert_not_initial(lx);
    }
    try {
      lo_cut.parse(lt_hashed);
      cl_abap_unit_assert.fail();
    } catch (lx) {
      cl_abap_unit_assert.assert_not_initial(lx);
    }
  }

  static sample_json({ iv_separator } = {}) {
    let rv_json = ``;
    rv_json = `{\\n` + `  "string": "abc",\\n` + `  "number": 123,\\n` + `  "float": 123.45,\\n` + `  "boolean": true,\\n` + `  "false": false,\\n` + `  "null": null,\\n` + `  "date": "2020-03-15",\\n` + `  "issues": [\\n` + `    {\\n` + `      "message": "Indentation problem ...",\\n` + `      "key": "indentation",\\n` + `      "start": {\\n` + `        "row": 4,\\n` + `        "col": 3\\n` + `      },\\n` + `      "end": {\\n` + `        "row": 4,\\n` + `        "col": 26\\n` + `      },\\n` + `      "filename": "./zxxx.prog.abap"\\n` + `    },\\n` + `    {\\n` + `      "message": "Remove space before XXX",\\n` + `      "key": "space_before_dot",\\n` + `      "start": {\\n` + `        "row": 3,\\n` + `        "col": 21\\n` + `      },\\n` + `      "end": {\\n` + `        "row": 3,\\n` + `        "col": 22\\n` + `      },\\n` + `      "filename": "./zxxx.prog.abap"\\n` + `    }\\n` + `  ]\\n` + `}`;
    // TODO(abap2js): REPLACE ALL OCCURRENCES OF '\n' IN rv_json WITH iv_separator.
    return rv_json;
  }

  parse() {
    let lo_cut = null;
    let lt_act = null;
    let lo_nodes = null;
    lo_nodes = null; // TODO(abap2js): CREATE OBJECT lo_nodes.
    lo_nodes.add(`                 |         |object |                        |  |8`);
    lo_nodes.add(`/                |string   |str    |abc                     |  |0`);
    lo_nodes.add(`/                |number   |num    |123                     |  |0`);
    lo_nodes.add(`/                |float    |num    |123.45                  |  |0`);
    lo_nodes.add(`/                |boolean  |bool   |true                    |  |0`);
    lo_nodes.add(`/                |false    |bool   |false                   |  |0`);
    lo_nodes.add(`/                |null     |null   |                        |  |0`);
    lo_nodes.add(`/                |date     |str    |2020-03-15              |  |0`);
    lo_nodes.add(`/                |issues   |array  |                        |  |2`);
    lo_nodes.add(`/issues/         |1        |object |                        |1 |5`);
    lo_nodes.add(`/issues/1/       |message  |str    |Indentation problem ... |  |0`);
    lo_nodes.add(`/issues/1/       |key      |str    |indentation             |  |0`);
    lo_nodes.add(`/issues/1/       |start    |object |                        |  |2`);
    lo_nodes.add(`/issues/1/start/ |row      |num    |4                       |  |0`);
    lo_nodes.add(`/issues/1/start/ |col      |num    |3                       |  |0`);
    lo_nodes.add(`/issues/1/       |end      |object |                        |  |2`);
    lo_nodes.add(`/issues/1/end/   |row      |num    |4                       |  |0`);
    lo_nodes.add(`/issues/1/end/   |col      |num    |26                      |  |0`);
    lo_nodes.add(`/issues/1/       |filename |str    |./zxxx.prog.abap        |  |0`);
    lo_nodes.add(`/issues/         |2        |object |                        |2 |5`);
    lo_nodes.add(`/issues/2/       |message  |str    |Remove space before XXX |  |0`);
    lo_nodes.add(`/issues/2/       |key      |str    |space_before_dot        |  |0`);
    lo_nodes.add(`/issues/2/       |start    |object |                        |  |2`);
    lo_nodes.add(`/issues/2/start/ |row      |num    |3                       |  |0`);
    lo_nodes.add(`/issues/2/start/ |col      |num    |21                      |  |0`);
    lo_nodes.add(`/issues/2/       |end      |object |                        |  |2`);
    lo_nodes.add(`/issues/2/end/   |row      |num    |3                       |  |0`);
    lo_nodes.add(`/issues/2/end/   |col      |num    |22                      |  |0`);
    lo_nodes.add(`/issues/2/       |filename |str    |./zxxx.prog.abap        |  |0`);
    lo_cut = null; // TODO(abap2js): CREATE OBJECT lo_cut.
    lt_act = lo_cut.parse(ltcl_parser_test.sample_json());
    cl_abap_unit_assert.assert_equals({ act: lt_act, exp: lo_nodes.mt_nodes });
    lt_act = lo_cut.parse(ltcl_parser_test.sample_json({ iv_separator: `${cl_abap_char_utilities.newline}` }));
    cl_abap_unit_assert.assert_equals({ act: lt_act, exp: lo_nodes.mt_nodes });
    lt_act = lo_cut.parse(ltcl_parser_test.sample_json({ iv_separator: `${cl_abap_char_utilities.cr_lf}` }));
    cl_abap_unit_assert.assert_equals({ act: lt_act, exp: lo_nodes.mt_nodes });
  }

  parse_keeping_order() {
    let lo_cut = null;
    let lt_act = null;
    let lo_nodes = null;
    lo_nodes = null; // TODO(abap2js): CREATE OBJECT lo_nodes.
    lo_nodes.add(`                 |         |object |                        |  |8 |0`);
    lo_nodes.add(`/                |string   |str    |abc                     |  |0 |1`);
    lo_nodes.add(`/                |number   |num    |123                     |  |0 |2`);
    lo_nodes.add(`/                |float    |num    |123.45                  |  |0 |3`);
    lo_nodes.add(`/                |boolean  |bool   |true                    |  |0 |4`);
    lo_nodes.add(`/                |false    |bool   |false                   |  |0 |5`);
    lo_nodes.add(`/                |null     |null   |                        |  |0 |6`);
    lo_nodes.add(`/                |date     |str    |2020-03-15              |  |0 |7`);
    lo_nodes.add(`/                |issues   |array  |                        |  |2 |8`);
    lo_nodes.add(`/issues/         |1        |object |                        |1 |5 |0`);
    lo_nodes.add(`/issues/1/       |message  |str    |Indentation problem ... |  |0 |1`);
    lo_nodes.add(`/issues/1/       |key      |str    |indentation             |  |0 |2`);
    lo_nodes.add(`/issues/1/       |start    |object |                        |  |2 |3`);
    lo_nodes.add(`/issues/1/start/ |row      |num    |4                       |  |0 |1`);
    lo_nodes.add(`/issues/1/start/ |col      |num    |3                       |  |0 |2`);
    lo_nodes.add(`/issues/1/       |end      |object |                        |  |2 |4`);
    lo_nodes.add(`/issues/1/end/   |row      |num    |4                       |  |0 |1`);
    lo_nodes.add(`/issues/1/end/   |col      |num    |26                      |  |0 |2`);
    lo_nodes.add(`/issues/1/       |filename |str    |./zxxx.prog.abap        |  |0 |5`);
    lo_nodes.add(`/issues/         |2        |object |                        |2 |5 |0`);
    lo_nodes.add(`/issues/2/       |message  |str    |Remove space before XXX |  |0 |1`);
    lo_nodes.add(`/issues/2/       |key      |str    |space_before_dot        |  |0 |2`);
    lo_nodes.add(`/issues/2/       |start    |object |                        |  |2 |3`);
    lo_nodes.add(`/issues/2/start/ |row      |num    |3                       |  |0 |1`);
    lo_nodes.add(`/issues/2/start/ |col      |num    |21                      |  |0 |2`);
    lo_nodes.add(`/issues/2/       |end      |object |                        |  |2 |4`);
    lo_nodes.add(`/issues/2/end/   |row      |num    |3                       |  |0 |1`);
    lo_nodes.add(`/issues/2/end/   |col      |num    |22                      |  |0 |2`);
    lo_nodes.add(`/issues/2/       |filename |str    |./zxxx.prog.abap        |  |0 |5`);
    lo_cut = null; // TODO(abap2js): CREATE OBJECT lo_cut.
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
      lo_cut = null; // TODO(abap2js): CREATE OBJECT lo_cut.
      lo_cut.parse(`{ "a" = 1, "a" = 1 }`);
      cl_abap_unit_assert.fail();
    } catch (lx) {
      cl_abap_unit_assert.assert_not_initial(lx);
    }
  }

  non_json() {
    let lo_cut = null;
    let lx = null;
    try {
      lo_cut = null; // TODO(abap2js): CREATE OBJECT lo_cut.
      lo_cut.parse(`<html><head><title>X</title></head><body><h1>Y</h1></body></html>`);
      cl_abap_unit_assert.fail();
    } catch (lx) {
      cl_abap_unit_assert.assert_not_initial(lx);
    }
  }

  special_characters_in_name() {
    this.mo_nodes.add(`                 |                 |object |                        |  |6`);
    this.mo_nodes.add(`/                |a\\backslash     |num    |1                       |  |0`);
    this.mo_nodes.add(`/                |contains/slash   |num    |2                       |  |0`);
    this.mo_nodes.add(`/                |quoted"text"     |num    |4                       |  |0`);
    this.mo_nodes.add(`/                |line
feed       |num    |5                       |  |0`);
    this.mo_nodes.add(`/                |with	tab        |num    |6                       |  |0`);
    this.mo_nodes.add(`/                |one/two/slash    |num    |7                       |  |0`);
    let lt_act = null;
    let lv_str = ``;
    lv_str = `{ "a\\\\backslash": 1, "contains/slash": 2,` + ` "quoted\\"text\\"": 4, "line\\nfeed": 5, "with\\ttab": 6,` + ` "one/two/slash": 7 }`;
    lt_act = this.mo_cut.parse(lv_str);
    cl_abap_unit_assert.assert_equals({ act: lt_act, exp: this.mo_nodes.mt_nodes });
  }

  special_characters_in_path() {
    this.mo_nodes.add(`                 |                 |object |                        |  |6`);
    this.mo_nodes.add(`/                |a\\backslash     |object |                        |  |1`);
    this.mo_nodes.add(`/a\\backslash/   |a                |num    |1                       |  |0`);
    this.mo_nodes.add(`/                |contains/slash   |object |                        |  |1`);
    this.mo_nodes.add(`/contains	slash/|b                |num    |2                       |  |0`);
    this.mo_nodes.add(`/                |quoted"text"     |object |                        |  |1`);
    this.mo_nodes.add(`/quoted"text"/   |d                |num    |4                       |  |0`);
    this.mo_nodes.add(`/                |line
feed       |object |                        |  |1`);
    this.mo_nodes.add(`/line
feed/     |e                |num    |5                       |  |0`);
    this.mo_nodes.add(`/                |with	tab        |object |                        |  |1`);
    this.mo_nodes.add(`/with	tab/      |f                |num    |6                       |  |0`);
    this.mo_nodes.add(`/                |one/two/slash    |object |                        |  |1`);
    this.mo_nodes.add(`/one	two	slash/|g                |num    |7                       |  |0`);
    let lt_act = null;
    let lv_str = ``;
    lv_str = `{ "a\\\\backslash": { "a": 1 }, "contains/slash": { "b": 2 },` + ` "quoted\\"text\\"": { "d": 4 },` + ` "line\\nfeed": { "e": 5 }, "with\\ttab": { "f": 6 },` + ` "one/two/slash": { "g": 7 } }`;
    lt_act = this.mo_cut.parse(lv_str);
    cl_abap_unit_assert.assert_equals({ act: lt_act, exp: this.mo_nodes.mt_nodes });
  }

  special_characters_in_value() {
    this.mo_nodes.add(`                 |                 |object |                        |  |6`);
    this.mo_nodes.add(`/                |a                |str    |a\\backslash            |  |0`);
    this.mo_nodes.add(`/                |b                |str    |contains/slash          |  |0`);
    this.mo_nodes.add(`/                |d                |str    |quoted"text"            |  |0`);
    this.mo_nodes.add(`/                |e                |str    |line
feed              |  |0`);
    this.mo_nodes.add(`/                |f                |str    |with	tab               |  |0`);
    this.mo_nodes.add(`/                |g                |str    |one/two/slash           |  |0`);
    let lt_act = null;
    let lv_str = ``;
    lv_str = `{ "a": "a\\\\backslash", "b": "contains/slash",` + ` "d": "quoted\\"text\\"", "e": "line\\nfeed", "f": "with\\ttab",` + ` "g": "one/two/slash" }`;
    lt_act = this.mo_cut.parse(lv_str);
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
    this.mo_nodes.add(`                 |                 |object |                        |  |3`);
    this.mo_nodes.add(`/                |unicode${lv_uchar}         |num    |3                       |  |0`);
    this.mo_nodes.add(`/                |unicode${lv_uchar}         |object |                        |  |1`);
    this.mo_nodes.add(`/unicode${lv_uchar}/       |c                |num    |3                       |  |0`);
    this.mo_nodes.add(`/                |c                |str    |unicode${lv_uchar}                |  |0`);
    let lt_act = null;
    let lv_str = ``;
    lv_str = `{ "unicode\\u1234": 3,` + ` "unicode\\u1234": { "c": 3 }, ` + ` "c": "unicode\\u1234" }`;
    lt_act = this.mo_cut.parse(lv_str);
    cl_abap_unit_assert.assert_equals({ act: lt_act, exp: this.mo_nodes.mt_nodes });
  }

  parse_empty_object() {
    let lo_cut = null;
    let lt_act = null;
    this.mo_nodes.add(`                 |         |object |                        |  |0`);
    lo_cut = null; // TODO(abap2js): CREATE OBJECT lo_cut.
    lt_act = lo_cut.parse(`{}`);
    cl_abap_unit_assert.assert_equals({ act: lt_act, exp: this.mo_nodes.mt_nodes });
  }

  parse_empty_string() {
    let lo_cut = null;
    lo_cut = null; // TODO(abap2js): CREATE OBJECT lo_cut.
    try {
      lo_cut.parse(``);
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
    let rt_nodes = null;
    let lo_nodes = null;
    lo_nodes = null; // TODO(abap2js): CREATE OBJECT lo_nodes.
    lo_nodes.add(`                 |         |object |                        |  |8`);
    lo_nodes.add(`/                |string   |str    |abc                     |  |0`);
    lo_nodes.add(`/                |number   |num    |123                     |  |0`);
    lo_nodes.add(`/                |float    |num    |123.45                  |  |0`);
    lo_nodes.add(`/                |boolean  |bool   |true                    |  |0`);
    lo_nodes.add(`/                |false    |bool   |false                   |  |0`);
    lo_nodes.add(`/                |null     |null   |                        |  |0`);
    lo_nodes.add(`/                |date     |str    |2020-03-15              |  |0`);
    lo_nodes.add(`/                |issues   |array  |                        |  |2`);
    lo_nodes.add(`/issues/         |1        |object |                        |1 |5`);
    lo_nodes.add(`/issues/1/       |message  |str    |Indentation problem ... |  |0`);
    lo_nodes.add(`/issues/1/       |key      |str    |indentation             |  |0`);
    lo_nodes.add(`/issues/1/       |start    |object |                        |  |2`);
    lo_nodes.add(`/issues/1/start/ |row      |num    |4                       |  |0`);
    lo_nodes.add(`/issues/1/start/ |col      |num    |3                       |  |0`);
    lo_nodes.add(`/issues/1/       |end      |object |                        |  |2`);
    lo_nodes.add(`/issues/1/end/   |row      |num    |4                       |  |0`);
    lo_nodes.add(`/issues/1/end/   |col      |num    |26                      |  |0`);
    lo_nodes.add(`/issues/1/       |filename |str    |./zxxx.prog.abap        |  |0`);
    lo_nodes.add(`/issues/         |2        |object |                        |2 |5`);
    lo_nodes.add(`/issues/2/       |message  |str    |Remove space before XXX |  |0`);
    lo_nodes.add(`/issues/2/       |key      |str    |space_before_dot        |  |0`);
    lo_nodes.add(`/issues/2/       |start    |object |                        |  |2`);
    lo_nodes.add(`/issues/2/start/ |row      |num    |3                       |  |0`);
    lo_nodes.add(`/issues/2/start/ |col      |num    |21                      |  |0`);
    lo_nodes.add(`/issues/2/       |end      |object |                        |  |2`);
    lo_nodes.add(`/issues/2/end/   |row      |num    |3                       |  |0`);
    lo_nodes.add(`/issues/2/end/   |col      |num    |22                      |  |0`);
    lo_nodes.add(`/issues/2/       |filename |str    |./zxxx.prog.abap        |  |0`);
    rt_nodes = lo_nodes.sorted();
    return rt_nodes;
  }

  stringify_condensed() {
    let lv_act = ``;
    let lv_exp = ``;
    lv_act = lcl_json_serializer.stringify(ltcl_serializer_test.sample_nodes());
    lv_exp = ltcl_serializer_test.sample_json();
    lv_exp = lv_exp.replaceAll(cl_abap_char_utilities.newline, ``);
    // TODO(abap2js): CONDENSE lv_exp.
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
    lo_nodes = null; // TODO(abap2js): CREATE OBJECT lo_nodes.
    lo_nodes.add(`                |    |array  |                        |  |3`);
    lo_nodes.add(`/               |1   |str    |abc                     |2 |0`);
    lo_nodes.add(`/               |2   |num    |123                     |1 |0`);
    lo_nodes.add(`/               |3   |num    |123.45                  |3 |0`);
    lv_act = lcl_json_serializer.stringify(lo_nodes.sorted());
    lv_exp = `[123,"abc",123.45]`;
    cl_abap_unit_assert.assert_equals({ act: lv_act, exp: lv_exp });
  }

  item_order() {
    let lv_act = ``;
    let lv_exp = ``;
    let lo_nodes = null;
    lo_nodes = null; // TODO(abap2js): CREATE OBJECT lo_nodes.
    lo_nodes.add(`                |       |object |                   |  |3 |0`);
    lo_nodes.add(`/               |beta   |str    |b                  |  |0 |3`);
    lo_nodes.add(`/               |zulu   |str    |z                  |  |0 |1`);
    lo_nodes.add(`/               |alpha  |str    |a                  |  |0 |2`);
    lv_act = lcl_json_serializer.stringify(lo_nodes.sorted());
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
    lo_nodes = null; // TODO(abap2js): CREATE OBJECT lo_nodes.
    lo_nodes.add(`                |    |array  |                        |  |3`);
    lo_nodes.add(`/               |1   |object |                        |2 |2`);
    lo_nodes.add(`/1/             |a   |num    |1                       |  |0`);
    lo_nodes.add(`/1/             |b   |num    |2                       |  |0`);
    lo_nodes.add(`/               |2   |num    |123                     |1 |0`);
    lo_nodes.add(`/               |3   |num    |123.45                  |3 |0`);
    lv_act = lcl_json_serializer.stringify({ it_json_tree: lo_nodes.sorted(), iv_indent: 2 });
    lv_exp = `[\\n` + `  123,\\n` + `  {\\n` + `    "a": 1,\\n` + `    "b": 2\\n` + `  },\\n` + `  123.45\\n` + `]`;
    lv_exp = lv_exp.replaceAll(`\\n`, cl_abap_char_utilities.newline);
    cl_abap_unit_assert.assert_equals({ act: lv_act, exp: lv_exp });
  }

  empty_set() {
    let lv_act = ``;
    let lv_exp = ``;
    let lo_nodes = null;
    lo_nodes = null; // TODO(abap2js): CREATE OBJECT lo_nodes.
    lo_nodes.add(`                |    |array  |                        |  |0`);
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
    lo_nodes = null; // TODO(abap2js): CREATE OBJECT lo_nodes.
    lv_val = `a` + `"` + `\\` + cl_abap_char_utilities.horizontal_tab + cl_abap_char_utilities.cr_lf;
    lo_nodes.add(` | |str |${lv_val}| |0`);
    lv_act = lcl_json_serializer.stringify(lo_nodes.sorted());
    lv_exp = `"a\\"\\\\\\t\\r\\n"`;
    cl_abap_unit_assert.assert_equals({ act: lv_act, exp: lv_exp });
  }

  empty() {
    let lv_act = ``;
    let lv_exp = ``;
    let lo_nodes = null;
    lo_nodes = null; // TODO(abap2js): CREATE OBJECT lo_nodes.
    lv_act = lcl_json_serializer.stringify(lo_nodes.sorted());
    lv_exp = ``;
    cl_abap_unit_assert.assert_equals({ act: lv_act, exp: lv_exp });
  }
}



class ltcl_utils_test {
  string_to_xstring_utf8() {
    cl_abap_unit_assert.assert_equals({ act: lcl_utils.string_to_xstring_utf8(`123`), exp: `313233` });
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
    cl_abap_unit_assert.assert_equals({ act: lcl_utils.normalize_path(``), exp: `/` });
    cl_abap_unit_assert.assert_equals({ act: lcl_utils.normalize_path(`/`), exp: `/` });
    cl_abap_unit_assert.assert_equals({ act: lcl_utils.normalize_path(`abc`), exp: `/abc/` });
    cl_abap_unit_assert.assert_equals({ act: lcl_utils.normalize_path(`/abc`), exp: `/abc/` });
    cl_abap_unit_assert.assert_equals({ act: lcl_utils.normalize_path(`abc/`), exp: `/abc/` });
    cl_abap_unit_assert.assert_equals({ act: lcl_utils.normalize_path(`/abc/`), exp: `/abc/` });
  }

  split_path() {
    let ls_exp = null;
    let lv_path = ``;
    lv_path = ``;
    ls_exp.path = ``;
    ls_exp.name = ``;
    cl_abap_unit_assert.assert_equals({ act: lcl_utils.split_path(lv_path), exp: ls_exp });
    lv_path = `/`;
    ls_exp.path = ``;
    ls_exp.name = ``;
    cl_abap_unit_assert.assert_equals({ act: lcl_utils.split_path(lv_path), exp: ls_exp });
    lv_path = `/abc/`;
    ls_exp.path = `/`;
    ls_exp.name = `abc`;
    cl_abap_unit_assert.assert_equals({ act: lcl_utils.split_path(lv_path), exp: ls_exp });
    lv_path = `abc`;
    ls_exp.path = `/`;
    ls_exp.name = `abc`;
    cl_abap_unit_assert.assert_equals({ act: lcl_utils.split_path(lv_path), exp: ls_exp });
    lv_path = `/abc`;
    ls_exp.path = `/`;
    ls_exp.name = `abc`;
    cl_abap_unit_assert.assert_equals({ act: lcl_utils.split_path(lv_path), exp: ls_exp });
    lv_path = `abc/`;
    ls_exp.path = `/`;
    ls_exp.name = `abc`;
    cl_abap_unit_assert.assert_equals({ act: lcl_utils.split_path(lv_path), exp: ls_exp });
    lv_path = `/abc/xyz`;
    ls_exp.path = `/abc/`;
    ls_exp.name = `xyz`;
    cl_abap_unit_assert.assert_equals({ act: lcl_utils.split_path(lv_path), exp: ls_exp });
    lv_path = `/abc/xyz/`;
    ls_exp.path = `/abc/`;
    ls_exp.name = `xyz`;
    cl_abap_unit_assert.assert_equals({ act: lcl_utils.split_path(lv_path), exp: ls_exp });
  }
}



class ltcl_reader_test {
  slice() {
    let lo_cut = null;
    let lo_nodes = null;
    lo_nodes = null; // TODO(abap2js): CREATE OBJECT lo_nodes.
    lo_nodes.add(`          |         |array  |                        |  |2`);
    lo_nodes.add(`/         |1        |object |                        |1 |5`);
    lo_nodes.add(`/1/       |message  |str    |Indentation problem ... |  |0`);
    lo_nodes.add(`/1/       |key      |str    |indentation             |  |0`);
    lo_nodes.add(`/1/       |start    |object |                        |  |2`);
    lo_nodes.add(`/1/start/ |row      |num    |4                       |  |0`);
    lo_nodes.add(`/1/start/ |col      |num    |3                       |  |0`);
    lo_nodes.add(`/1/       |end      |object |                        |  |2`);
    lo_nodes.add(`/1/end/   |row      |num    |4                       |  |0`);
    lo_nodes.add(`/1/end/   |col      |num    |26                      |  |0`);
    lo_nodes.add(`/1/       |filename |str    |./zxxx.prog.abap        |  |0`);
    lo_nodes.add(`/         |2        |object |                        |2 |5`);
    lo_nodes.add(`/2/       |message  |str    |Remove space before XXX |  |0`);
    lo_nodes.add(`/2/       |key      |str    |space_before_dot        |  |0`);
    lo_nodes.add(`/2/       |start    |object |                        |  |2`);
    lo_nodes.add(`/2/start/ |row      |num    |3                       |  |0`);
    lo_nodes.add(`/2/start/ |col      |num    |21                      |  |0`);
    lo_nodes.add(`/2/       |end      |object |                        |  |2`);
    lo_nodes.add(`/2/end/   |row      |num    |3                       |  |0`);
    lo_nodes.add(`/2/end/   |col      |num    |22                      |  |0`);
    lo_nodes.add(`/2/       |filename |str    |./zxxx.prog.abap        |  |0`);
    lo_cut = z2ui5_cl_ajson.parse(ltcl_parser_test.sample_json());
    lo_cut = lo_cut.slice(`/issues`);
    cl_abap_unit_assert.assert_equals({ act: lo_cut.mt_json_tree, exp: lo_nodes.sorted() });
    lo_nodes = null; // TODO(abap2js): CREATE OBJECT lo_nodes.
    lo_nodes.add(`                 |         |object |                        |  |8`);
    lo_nodes.add(`/                |string   |str    |abc                     |  |0`);
    lo_nodes.add(`/                |number   |num    |123                     |  |0`);
    lo_nodes.add(`/                |float    |num    |123.45                  |  |0`);
    lo_nodes.add(`/                |boolean  |bool   |true                    |  |0`);
    lo_nodes.add(`/                |false    |bool   |false                   |  |0`);
    lo_nodes.add(`/                |null     |null   |                        |  |0`);
    lo_nodes.add(`/                |date     |str    |2020-03-15              |  |0`);
    lo_nodes.add(`/                |issues   |array  |                        |  |2`);
    lo_nodes.add(`/issues/         |1        |object |                        |1 |5`);
    lo_nodes.add(`/issues/1/       |message  |str    |Indentation problem ... |  |0`);
    lo_nodes.add(`/issues/1/       |key      |str    |indentation             |  |0`);
    lo_nodes.add(`/issues/1/       |start    |object |                        |  |2`);
    lo_nodes.add(`/issues/1/start/ |row      |num    |4                       |  |0`);
    lo_nodes.add(`/issues/1/start/ |col      |num    |3                       |  |0`);
    lo_nodes.add(`/issues/1/       |end      |object |                        |  |2`);
    lo_nodes.add(`/issues/1/end/   |row      |num    |4                       |  |0`);
    lo_nodes.add(`/issues/1/end/   |col      |num    |26                      |  |0`);
    lo_nodes.add(`/issues/1/       |filename |str    |./zxxx.prog.abap        |  |0`);
    lo_nodes.add(`/issues/         |2        |object |                        |2 |5`);
    lo_nodes.add(`/issues/2/       |message  |str    |Remove space before XXX |  |0`);
    lo_nodes.add(`/issues/2/       |key      |str    |space_before_dot        |  |0`);
    lo_nodes.add(`/issues/2/       |start    |object |                        |  |2`);
    lo_nodes.add(`/issues/2/start/ |row      |num    |3                       |  |0`);
    lo_nodes.add(`/issues/2/start/ |col      |num    |21                      |  |0`);
    lo_nodes.add(`/issues/2/       |end      |object |                        |  |2`);
    lo_nodes.add(`/issues/2/end/   |row      |num    |3                       |  |0`);
    lo_nodes.add(`/issues/2/end/   |col      |num    |22                      |  |0`);
    lo_nodes.add(`/issues/2/       |filename |str    |./zxxx.prog.abap        |  |0`);
    lo_cut = z2ui5_cl_ajson.parse(ltcl_parser_test.sample_json());
    lo_cut = lo_cut.slice(`/`);
    cl_abap_unit_assert.assert_equals({ act: lo_cut.mt_json_tree, exp: lo_nodes.sorted() });
    lo_nodes = null; // TODO(abap2js): CREATE OBJECT lo_nodes.
    lo_nodes.add(`  |         |object |                        | |2`);
    lo_nodes.add(`/ |row      |num    |3                       | |0`);
    lo_nodes.add(`/ |col      |num    |21                      | |0`);
    lo_cut = z2ui5_cl_ajson.parse(ltcl_parser_test.sample_json());
    lo_cut = lo_cut.slice(`/issues/2/start/`);
    cl_abap_unit_assert.assert_equals({ act: lo_cut.mt_json_tree, exp: lo_nodes.sorted() });
  }

  get_value() {
    let lo_cut = null;
    lo_cut = z2ui5_cl_ajson.parse(ltcl_parser_test.sample_json());
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
    lo_cut = null; // TODO(abap2js): CREATE OBJECT lo_cut.
    lv_exp = `20200728`;
    lo_nodes = null; // TODO(abap2js): CREATE OBJECT lo_nodes.
    lo_nodes.add(`  |         |object |                        | |1`);
    lo_nodes.add(`/ |date1    |str    |2020-07-28              | |0`);
    lo_cut.mt_json_tree = z2ui5_cl_util.abap_copy(lo_nodes.mt_nodes);
    cl_abap_unit_assert.assert_equals({ act: lo_cut.get_date(`/date1`), exp: lv_exp });
    lo_nodes = null; // TODO(abap2js): CREATE OBJECT lo_nodes.
    lo_nodes.add(`  |         |object |                        | |1`);
    lo_nodes.add(`/ |date1    |str    |2020-07-28T01:00:00Z    | |0`);
    lo_cut.mt_json_tree = z2ui5_cl_util.abap_copy(lo_nodes.mt_nodes);
    cl_abap_unit_assert.assert_equals({ act: lo_cut.get_date(`/date1`), exp: lv_exp });
    lo_nodes = null; // TODO(abap2js): CREATE OBJECT lo_nodes.
    lo_nodes.add(`  |         |object |                        | |1`);
    lo_nodes.add(`/ |date1    |str    |20200728                | |0`);
    lo_cut.mt_json_tree = z2ui5_cl_util.abap_copy(lo_nodes.mt_nodes);
    cl_abap_unit_assert.assert_equals({ act: lo_cut.get_date(`/date1`), exp: `` });
  }

  get_timestamp() {
    let lo_cut = null;
    let lo_nodes = null;
    let lv_exp = null;
    lo_cut = null; // TODO(abap2js): CREATE OBJECT lo_cut.
    lo_nodes = null; // TODO(abap2js): CREATE OBJECT lo_nodes.
    lo_nodes.add(`  |         |object |                        | |1`);
    lo_nodes.add(`/ |timestamp|str    |2020-07-28T00:00:00Z    | |0`);
    lo_cut.mt_json_tree = z2ui5_cl_util.abap_copy(lo_nodes.mt_nodes);
    cl_abap_unit_assert.assert_equals({ act: lo_cut.get_timestamp(`/timestamp`), exp: lv_exp });
  }

  get_timestampl() {
    let lo_cut = null;
    let lo_nodes = null;
    let lv_exp = null;
    lo_cut = null; // TODO(abap2js): CREATE OBJECT lo_cut.
    lo_nodes = null; // TODO(abap2js): CREATE OBJECT lo_nodes.
    lo_nodes.add(`  |         |object |                          | |1`);
    lo_nodes.add(`/ |timestamp|str    |2020-07-28T12:34:56.78934Z| |0`);
    lo_cut.mt_json_tree = z2ui5_cl_util.abap_copy(lo_nodes.mt_nodes);
    cl_abap_unit_assert.assert_equals({ act: lo_cut.get_timestampl(`/timestamp`), exp: lv_exp });
  }

  exists() {
    let lo_cut = null;
    lo_cut = z2ui5_cl_ajson.parse(ltcl_parser_test.sample_json());
    cl_abap_unit_assert.assert_equals({ act: lo_cut.exists(`/string`), exp: true });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.exists(`/string/`), exp: true });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.exists(`/xxx`), exp: false });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.exists(`/issues/2/start/row`), exp: true });
  }

  value_integer() {
    let lo_cut = null;
    lo_cut = z2ui5_cl_ajson.parse(ltcl_parser_test.sample_json());
    cl_abap_unit_assert.assert_equals({ act: lo_cut.get_integer(`/string`), exp: 0 });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.get_integer(`/number`), exp: 123 });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.get_integer(`/float`), exp: 123 });
  }

  value_number() {
    let lo_cut = null;
    lo_cut = z2ui5_cl_ajson.parse(ltcl_parser_test.sample_json());
    cl_abap_unit_assert.assert_equals({ act: lo_cut.get_number(`/string`), exp: 0 });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.get_number(`/number`), exp: `123.0` });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.get_number(`/float`), exp: `123.45` });
  }

  value_boolean() {
    let lo_cut = null;
    lo_cut = z2ui5_cl_ajson.parse(ltcl_parser_test.sample_json());
    cl_abap_unit_assert.assert_equals({ act: lo_cut.get_boolean(`/string`), exp: true });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.get_boolean(`/number`), exp: true });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.get_boolean(`/xxx`), exp: false });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.get_boolean(`/boolean`), exp: true });
  }

  value_string() {
    let lo_cut = null;
    lo_cut = z2ui5_cl_ajson.parse(ltcl_parser_test.sample_json());
    cl_abap_unit_assert.assert_equals({ act: lo_cut.get_string(`/string`), exp: `abc` });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.get_string(`/number`), exp: `123` });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.get_string(`/xxx`), exp: `` });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.get_string(`/boolean`), exp: `true` });
  }

  members() {
    let lt_exp = [];
    let lo_cut = null;
    lo_cut = z2ui5_cl_ajson.parse(ltcl_parser_test.sample_json());
    lt_exp = null;
    lt_exp.push(`1`);
    lt_exp.push(`2`);
    cl_abap_unit_assert.assert_equals({ act: lo_cut.members(`/issues`), exp: lt_exp });
    lt_exp = null;
    lt_exp.push(`col`);
    lt_exp.push(`row`);
    cl_abap_unit_assert.assert_equals({ act: lo_cut.members(`/issues/1/start/`), exp: lt_exp });
  }

  array_to_string_table() {
    let lo_cut = null;
    let lo_nodes = null;
    let lt_act = [];
    let lt_exp = [];
    lo_nodes = null; // TODO(abap2js): CREATE OBJECT lo_nodes.
    lo_nodes.add(`  |         |array  |                        | |6`);
    lo_nodes.add(`/ |1        |num    |123                     |1|0`);
    lo_nodes.add(`/ |2        |num    |234                     |2|0`);
    lo_nodes.add(`/ |3        |str    |abc                     |3|0`);
    lo_nodes.add(`/ |4        |bool   |true                    |4|0`);
    lo_nodes.add(`/ |5        |bool   |false                   |5|0`);
    lo_nodes.add(`/ |6        |null   |null                    |6|0`);
    lt_exp.push(`123`);
    lt_exp.push(`234`);
    lt_exp.push(`abc`);
    lt_exp.push(`X`);
    lt_exp.push(``);
    lt_exp.push(``);
    lo_cut = null; // TODO(abap2js): CREATE OBJECT lo_cut.
    lo_cut.mt_json_tree = z2ui5_cl_util.abap_copy(lo_nodes.mt_nodes);
    lt_act = lo_cut.array_to_string_table(`/`);
    cl_abap_unit_assert.assert_equals({ act: lt_act, exp: lt_exp });
    let lx = null;
    lo_nodes = null; // TODO(abap2js): CREATE OBJECT lo_nodes.
    lo_nodes.add(`  |         |object |                        | |1`);
    lo_nodes.add(`/ |a        |str    |abc                     | |0`);
    lo_cut.mt_json_tree = z2ui5_cl_util.abap_copy(lo_nodes.mt_nodes);
    try {
      lo_cut.array_to_string_table(`/x`);
      cl_abap_unit_assert.fail();
    } catch (lx) {
      cl_abap_unit_assert.assert_equals({ act: lx.message, exp: `Path not found: /x` });
    }
    try {
      lo_cut.array_to_string_table(`/`);
      cl_abap_unit_assert.fail();
    } catch (lx) {
      cl_abap_unit_assert.assert_equals({ act: lx.message, exp: `Array expected at: /` });
    }
    try {
      lo_cut.array_to_string_table(`/a`);
      cl_abap_unit_assert.fail();
    } catch (lx) {
      cl_abap_unit_assert.assert_equals({ act: lx.message, exp: `Array expected at: /a` });
    }
    lo_nodes = null; // TODO(abap2js): CREATE OBJECT lo_nodes.
    lo_nodes.add(`  |         |array  |                        | |1`);
    lo_nodes.add(`/ |1        |object |                        |1|0`);
    lo_cut.mt_json_tree = z2ui5_cl_util.abap_copy(lo_nodes.mt_nodes);
    try {
      lo_cut.array_to_string_table(`/`);
      cl_abap_unit_assert.fail();
    } catch (lx) {
      cl_abap_unit_assert.assert_equals({ act: lx.message, exp: `Cannot convert [object] to string at [/1]` });
    }
  }
}



class ltcl_json_to_abap {
  to_abap_struc() {
    let lo_cut = null;
    let ls_mock = null;
    let ls_exp = null;
    let lv_exp_date = null;
    let lv_exp_timestamp = null;
    let lo_nodes = null;
    lo_nodes = null; // TODO(abap2js): CREATE OBJECT lo_nodes.
    lo_nodes.add(`       |           |object |                          | `);
    lo_nodes.add(`/      |str        |str    |hello                     | `);
    lo_nodes.add(`/      |int        |num    |5                         | `);
    lo_nodes.add(`/      |float      |num    |5.5                       | `);
    lo_nodes.add(`/      |bool       |bool   |true                      | `);
    lo_nodes.add(`/      |obj        |object |                          | `);
    lo_nodes.add(`/obj/  |a          |str    |world                     | `);
    lo_nodes.add(`/      |tab        |array  |                          | `);
    lo_nodes.add(`/      |date1      |str    |2020-07-28                | `);
    lo_nodes.add(`/      |date2      |str    |2020-07-28T00:00:00Z      | `);
    lo_nodes.add(`/      |timestamp1 |str    |2020-07-28T00:00:00       | `);
    lo_nodes.add(`/      |timestamp2 |str    |2020-07-28T00:00:00Z      | `);
    lo_nodes.add(`/      |timestamp3 |str    |2020-07-28T01:00:00+01:00 | `);
    lo_nodes.add(`/      |timestamp4 |str    |2020-07-28T01:00:00+01:00 | `);
    lo_nodes.add(`/      |timestamp5 |str    |2020-07-28T00:00:00.12345Z| `);
    lo_cut = null; // TODO(abap2js): CREATE OBJECT lo_cut.
    lo_cut.to_abap({ it_nodes: lo_nodes.sorted(), c_container: ls_mock });
    ls_exp.str = `hello`;
    ls_exp.int = 5;
    ls_exp.float = `5.5`;
    ls_exp.bool = true;
    ls_exp.obj.a = `world`;
    ls_exp.date1 = z2ui5_cl_util.abap_copy(lv_exp_date);
    ls_exp.date2 = z2ui5_cl_util.abap_copy(lv_exp_date);
    ls_exp.timestamp1 = z2ui5_cl_util.abap_copy(lv_exp_timestamp);
    ls_exp.timestamp2 = z2ui5_cl_util.abap_copy(lv_exp_timestamp);
    ls_exp.timestamp3 = z2ui5_cl_util.abap_copy(lv_exp_timestamp);
    ls_exp.timestamp4 = z2ui5_cl_util.abap_copy(lv_exp_timestamp);
    ls_exp.timestamp5 = lv_exp_timestamp + `0.12345`;
    cl_abap_unit_assert.assert_equals({ act: ls_mock, exp: ls_exp });
  }

  to_abap_timestamp_initial() {
    let lo_cut = null;
    let lv_mock = null;
    let lo_nodes = null;
    lo_nodes = null; // TODO(abap2js): CREATE OBJECT lo_nodes.
    lo_nodes.add(`       |           |str    |0000-00-00T00:00:00Z| `);
    lo_cut = null; // TODO(abap2js): CREATE OBJECT lo_cut.
    lo_cut.to_abap({ it_nodes: lo_nodes.sorted(), c_container: lv_mock });
    cl_abap_unit_assert.assert_equals({ act: lv_mock, exp: 0 });
  }

  to_abap_timestamp_long() {
    let lo_cut = null;
    let lx = null;
    let lv_mock = null;
    let lv_exp_timestamp = null;
    let lo_nodes = null;
    lo_nodes = null; // TODO(abap2js): CREATE OBJECT lo_nodes.
    lo_nodes.add(`       |           |str    |2020-07-28T00:00:00.12345Z| `);
    try {
      lo_cut = null; // TODO(abap2js): CREATE OBJECT lo_cut.
      lo_cut.to_abap({ it_nodes: lo_nodes.sorted(), c_container: lv_mock });
      cl_abap_unit_assert.fail();
    } catch (lx) {
      cl_abap_unit_assert.assert_equals({ act: lx.message, exp: `Unexpected timestamp format` });
    }
    lo_nodes = null; // TODO(abap2js): CREATE OBJECT lo_nodes.
    lo_nodes.add(`       |           |str    |2020-07-28T00:00:00.00000Z| `);
    lo_cut = null; // TODO(abap2js): CREATE OBJECT lo_cut.
    lo_cut.to_abap({ it_nodes: lo_nodes.sorted(), c_container: lv_mock });
    cl_abap_unit_assert.assert_equals({ act: lv_mock, exp: lv_exp_timestamp });
  }

  to_abap_time() {
    let lo_cut = null;
    let lv_mock = null;
    let lo_nodes = null;
    lo_nodes = null; // TODO(abap2js): CREATE OBJECT lo_nodes.
    lo_nodes.add(`       |           |str    |11:11:11| `);
    lo_cut = null; // TODO(abap2js): CREATE OBJECT lo_cut.
    lo_cut.to_abap({ it_nodes: lo_nodes.sorted(), c_container: lv_mock });
    cl_abap_unit_assert.assert_equals({ act: lv_mock, exp: `111111` });
    let lv_mock_init = null;
    lo_nodes = null; // TODO(abap2js): CREATE OBJECT lo_nodes.
    lo_nodes.add(`       |           |str    || `);
    lo_cut = null; // TODO(abap2js): CREATE OBJECT lo_cut.
    lo_cut.to_abap({ it_nodes: lo_nodes.sorted(), c_container: lv_mock_init });
    cl_abap_unit_assert.assert_equals({ act: lv_mock_init, exp: `000000` });
  }

  to_abap_str_to_packed() {
    let lo_cut = null;
    let lv_act = 0;
    let lo_nodes = null;
    lo_nodes = null; // TODO(abap2js): CREATE OBJECT lo_nodes.
    lo_nodes.add(`       |           |str    |1.3333                    | `);
    lo_cut = null; // TODO(abap2js): CREATE OBJECT lo_cut.
    lo_cut.to_abap({ it_nodes: lo_nodes.sorted(), c_container: lv_act });
    cl_abap_unit_assert.assert_equals({ act: lv_act, exp: `1.333` });
  }

  to_abap_value() {
    let lo_cut = null;
    let lv_mock = ``;
    let lo_nodes = null;
    lo_nodes = null; // TODO(abap2js): CREATE OBJECT lo_nodes.
    lo_nodes.add(`       |           |str    |hello                     | `);
    lo_cut = null; // TODO(abap2js): CREATE OBJECT lo_cut.
    lo_cut.to_abap({ it_nodes: lo_nodes.sorted(), c_container: lv_mock });
    cl_abap_unit_assert.assert_equals({ act: lv_mock, exp: `hello` });
  }

  to_abap_array() {
    let lo_cut = null;
    let lt_mock = [];
    let lt_exp = [];
    let lo_nodes = null;
    lo_nodes = null; // TODO(abap2js): CREATE OBJECT lo_nodes.
    lo_nodes.add(`       |           |array    |                     | `);
    lo_nodes.add(`/      |1          |str      |One                  |1`);
    lo_nodes.add(`/      |2          |str      |Two                  |2`);
    lo_cut = null; // TODO(abap2js): CREATE OBJECT lo_cut.
    lo_cut.to_abap({ it_nodes: lo_nodes.sorted(), c_container: lt_mock });
    lt_exp.push(`One`);
    lt_exp.push(`Two`);
    cl_abap_unit_assert.assert_equals({ act: lt_mock, exp: lt_exp });
  }

  to_abap_array_of_arrays_simple() {
    let lo_cut = null;
    let lt_mock = [];
    let lt_exp = [];
    let lt_tmp = [];
    let lo_nodes = null;
    lo_nodes = null; // TODO(abap2js): CREATE OBJECT lo_nodes.
    lo_nodes.add(`       |           |array    |                    | `);
    lo_nodes.add(`/      |1          |array    |                    |1`);
    lo_nodes.add(`/      |2          |array    |                    |2`);
    lo_nodes.add(`/1/    |1          |str      |One                 |1`);
    lo_nodes.add(`/2/    |1          |str      |Two                 |1`);
    lo_cut = null; // TODO(abap2js): CREATE OBJECT lo_cut.
    lo_cut.to_abap({ it_nodes: lo_nodes.sorted(), c_container: lt_mock });
    lt_tmp.push(`One`);
    lt_exp.push(lt_tmp);
    lt_tmp = null;
    lt_tmp.push(`Two`);
    lt_exp.push(lt_tmp);
    cl_abap_unit_assert.assert_equals({ act: lt_mock, exp: lt_exp });
  }

  to_abap_array_of_arrays() {
    let lo_cut = null;
    let lt_mock = [];
    let lt_exp = [];
    let lt_tmp = [];
    let lo_nodes = null;
    lo_nodes = null; // TODO(abap2js): CREATE OBJECT lo_nodes.
    lo_nodes.add(`       |           |array    |                    | `);
    lo_nodes.add(`/      |1          |array    |                    |1`);
    lo_nodes.add(`/      |2          |array    |                    |2`);
    lo_nodes.add(`/1/    |1          |str      |One                 |1`);
    lo_nodes.add(`/1/    |2          |str      |Two                 |2`);
    lo_nodes.add(`/2/    |1          |str      |Three               |1`);
    lo_nodes.add(`/2/    |2          |str      |Four                |2`);
    lo_cut = null; // TODO(abap2js): CREATE OBJECT lo_cut.
    lo_cut.to_abap({ it_nodes: lo_nodes.sorted(), c_container: lt_mock });
    lt_tmp.push(`One`);
    lt_tmp.push(`Two`);
    lt_exp.push(lt_tmp);
    lt_tmp = null;
    lt_tmp.push(`Three`);
    lt_tmp.push(`Four`);
    lt_exp.push(lt_tmp);
    cl_abap_unit_assert.assert_equals({ act: lt_mock, exp: lt_exp });
  }

  to_abap_w_tab_of_struc() {
    let lo_cut = null;
    let ls_mock = null;
    let ls_exp = null;
    let lo_nodes = null;
    lo_nodes = null; // TODO(abap2js): CREATE OBJECT lo_nodes.
    lo_nodes.add(`       |           |object |                          | `);
    lo_nodes.add(`/      |tab        |array  |                          | `);
    lo_nodes.add(`/tab/  |1          |object |                          |1`);
    lo_nodes.add(`/tab/1/|a          |str    |One                       | `);
    lo_nodes.add(`/tab/  |2          |object |                          |2`);
    lo_nodes.add(`/tab/2/|a          |str    |Two                       | `);
    lo_cut = null; // TODO(abap2js): CREATE OBJECT lo_cut.
    lo_cut.to_abap({ it_nodes: lo_nodes.sorted(), c_container: ls_mock });
    let ls_elem = null;
    ls_elem.a = `One`;
    ls_exp.tab.push(ls_elem);
    ls_elem.a = `Two`;
    ls_exp.tab.push(ls_elem);
    cl_abap_unit_assert.assert_equals({ act: ls_mock, exp: ls_exp });
  }

  to_abap_w_plain_tab() {
    let lo_cut = null;
    let ls_mock = null;
    let ls_exp = null;
    let lo_nodes = null;
    lo_nodes = null; // TODO(abap2js): CREATE OBJECT lo_nodes.
    lo_nodes.add(`             |           |object |                          | `);
    lo_nodes.add(`/            |tab_plain  |array  |                          | `);
    lo_nodes.add(`/tab_plain/  |1          |str    |One                       |1`);
    lo_nodes.add(`/tab_plain/  |2          |str    |Two                       |2`);
    lo_cut = null; // TODO(abap2js): CREATE OBJECT lo_cut.
    lo_cut.to_abap({ it_nodes: lo_nodes.sorted(), c_container: ls_mock });
    ls_exp.tab_plain.push(`One`);
    ls_exp.tab_plain.push(`Two`);
    cl_abap_unit_assert.assert_equals({ act: ls_mock, exp: ls_exp });
  }

  to_abap_hashed_plain_tab() {
    let lo_cut = null;
    let lt_mock = [];
    let lt_exp = [];
    let lo_nodes = null;
    lo_nodes = null; // TODO(abap2js): CREATE OBJECT lo_nodes.
    lo_nodes.add(`            |           |array  |                          | `);
    lo_nodes.add(`/           |1          |str    |One                       |1`);
    lo_nodes.add(`/           |2          |str    |Two                       |2`);
    lo_cut = null; // TODO(abap2js): CREATE OBJECT lo_cut.
    lo_cut.to_abap({ it_nodes: lo_nodes.sorted(), c_container: lt_mock });
    lt_exp.push(`One`);
    lt_exp.push(`Two`);
    cl_abap_unit_assert.assert_equals({ act: lt_mock, exp: lt_exp });
  }

  to_abap_hashed_tab() {
    let lo_cut = null;
    let lt_mock = null;
    let lt_exp = null;
    let lo_nodes = null;
    lo_nodes = null; // TODO(abap2js): CREATE OBJECT lo_nodes.
    lo_nodes.add(`              |           |array  |                          | `);
    lo_nodes.add(`/             |1          |object |                          |1`);
    lo_nodes.add(`/             |2          |object |                          |2`);
    lo_nodes.add(`/1/           |a          |str    |One                       | `);
    lo_nodes.add(`/1/           |b          |num    |1                         | `);
    lo_nodes.add(`/2/           |a          |str    |Two                       | `);
    lo_nodes.add(`/2/           |b          |num    |2                         | `);
    lo_cut = null; // TODO(abap2js): CREATE OBJECT lo_cut.
    lo_cut.to_abap({ it_nodes: lo_nodes.sorted(), c_container: lt_mock });
    let ls_elem = null;
    ls_elem.a = `One`;
    ls_elem.b = 1;
    lt_exp.push(ls_elem);
    ls_elem.a = `Two`;
    ls_elem.b = 2;
    lt_exp.push(ls_elem);
    cl_abap_unit_assert.assert_equals({ act: lt_mock, exp: lt_exp });
  }

  to_abap_sorted_tab() {
    let lo_cut = null;
    let lt_mock = null;
    let lt_exp = null;
    let lo_nodes = null;
    lo_nodes = null; // TODO(abap2js): CREATE OBJECT lo_nodes.
    lo_nodes.add(`              |           |array  |                          | `);
    lo_nodes.add(`/             |1          |object |                          |1`);
    lo_nodes.add(`/             |2          |object |                          |2`);
    lo_nodes.add(`/1/           |a          |str    |One                       | `);
    lo_nodes.add(`/1/           |b          |num    |1                         | `);
    lo_nodes.add(`/2/           |a          |str    |Two                       | `);
    lo_nodes.add(`/2/           |b          |num    |2                         | `);
    lo_cut = null; // TODO(abap2js): CREATE OBJECT lo_cut.
    lo_cut.to_abap({ it_nodes: lo_nodes.sorted(), c_container: lt_mock });
    let ls_elem = null;
    ls_elem.a = `One`;
    ls_elem.b = 1;
    lt_exp.push(ls_elem);
    ls_elem.a = `Two`;
    ls_elem.b = 2;
    lt_exp.push(ls_elem);
    cl_abap_unit_assert.assert_equals({ act: lt_mock, exp: lt_exp });
  }

  to_abap_negative() {
    let lo_cut = null;
    let lx = null;
    let ls_mock = null;
    lo_cut = null; // TODO(abap2js): CREATE OBJECT lo_cut.
    let lo_nodes = null;
    try {
      lo_nodes = null; // TODO(abap2js): CREATE OBJECT lo_nodes.
      lo_nodes.add(`     |      |object | `);
      lo_nodes.add(`/    |str   |object | `);
      lo_cut.to_abap({ it_nodes: lo_nodes.sorted(), c_container: ls_mock });
      cl_abap_unit_assert.fail();
    } catch (lx) {
      cl_abap_unit_assert.assert_equals({ act: lx.message, exp: `Expected structure` });
    }
    try {
      lo_nodes = null; // TODO(abap2js): CREATE OBJECT lo_nodes.
      lo_nodes.add(`     |      |object | `);
      lo_nodes.add(`/    |str   |array  | `);
      lo_cut.to_abap({ it_nodes: lo_nodes.sorted(), c_container: ls_mock });
      cl_abap_unit_assert.fail();
    } catch (lx) {
      cl_abap_unit_assert.assert_equals({ act: lx.message, exp: `Expected table` });
    }
    try {
      lo_nodes = null; // TODO(abap2js): CREATE OBJECT lo_nodes.
      lo_nodes.add(`     |      |object |      `);
      lo_nodes.add(`/    |int   |str    |hello `);
      lo_cut.to_abap({ it_nodes: lo_nodes.sorted(), c_container: ls_mock });
      cl_abap_unit_assert.fail();
    } catch (lx) {
      cl_abap_unit_assert.assert_equals({ act: lx.message, exp: `Source is not a number` });
    }
    try {
      lo_nodes = null; // TODO(abap2js): CREATE OBJECT lo_nodes.
      lo_nodes.add(`     |      |object |        `);
      lo_nodes.add(`/    |date1 |str    |baddate `);
      lo_cut.to_abap({ it_nodes: lo_nodes.sorted(), c_container: ls_mock });
      cl_abap_unit_assert.fail();
    } catch (lx) {
      cl_abap_unit_assert.assert_equals({ act: lx.message, exp: `Unexpected date format` });
    }
    try {
      lo_nodes = null; // TODO(abap2js): CREATE OBJECT lo_nodes.
      lo_nodes.add(`    |        |object |        `);
      lo_nodes.add(`/   |missing |str    |123     `);
      lo_cut.to_abap({ it_nodes: lo_nodes.sorted(), c_container: ls_mock });
      cl_abap_unit_assert.fail();
    } catch (lx) {
      cl_abap_unit_assert.assert_equals({ act: lx.message, exp: `Path not found` });
    }
    try {
      let lt_str = [];
      lo_nodes = null; // TODO(abap2js): CREATE OBJECT lo_nodes.
      lo_nodes.add(`      |     |array  |      | `);
      lo_nodes.add(`/     |a    |str    |hello |1`);
      lo_cut.to_abap({ it_nodes: lo_nodes.sorted(), c_container: lt_str });
      cl_abap_unit_assert.fail();
    } catch (lx) {
      cl_abap_unit_assert.assert_equals({ act: lx.message, exp: `Need index to access tables` });
    }
    try {
      let lr_obj = null;
      lo_nodes = null; // TODO(abap2js): CREATE OBJECT lo_nodes.
      lo_nodes.add(`      |     |str  |hello      | `);
      lo_cut.to_abap({ it_nodes: lo_nodes.sorted(), c_container: lr_obj });
      cl_abap_unit_assert.fail();
    } catch (lx) {
      cl_abap_unit_assert.assert_equals({ act: lx.message, exp: `Cannot assign to ref` });
    }
    try {
      let lt_hashed = [];
      lo_nodes = null; // TODO(abap2js): CREATE OBJECT lo_nodes.
      lo_nodes.add(`            |           |array  |                          | `);
      lo_nodes.add(`/           |1          |str    |One                       |1`);
      lo_nodes.add(`/           |2          |str    |One                       |2`);
      lo_cut.to_abap({ it_nodes: lo_nodes.sorted(), c_container: lt_hashed });
      cl_abap_unit_assert.fail();
    } catch (lx) {
      cl_abap_unit_assert.assert_equals({ act: lx.message, exp: `Duplicate insertion` });
    }
  }

  to_abap_corresponding() {
    let lo_cut = null;
    let ls_act = null;
    let ls_exp = null;
    let lo_nodes = null;
    lo_nodes = null; // TODO(abap2js): CREATE OBJECT lo_nodes.
    lo_nodes.add(`       |           |object |                          | `);
    lo_nodes.add(`/      |a          |str    |test                      | `);
    lo_nodes.add(`/      |c          |num    |24022022                  | `);
    ls_exp.a = `test`;
    lo_cut = null; // TODO(abap2js): CREATE OBJECT lo_cut EXPORTING iv_corresponding = abap_true.
    lo_cut.to_abap({ it_nodes: lo_nodes.sorted(), c_container: ls_act });
    cl_abap_unit_assert.assert_equals({ act: ls_act, exp: ls_exp });
  }

  to_abap_corresponding_negative() {
    let lo_cut = null;
    let ls_act = null;
    let ls_exp = null;
    let lo_nodes = null;
    let lx = null;
    lo_nodes = null; // TODO(abap2js): CREATE OBJECT lo_nodes.
    lo_nodes.add(`       |           |object |                          | `);
    lo_nodes.add(`/      |a          |str    |test                      | `);
    lo_nodes.add(`/      |c          |num    |24022022                  | `);
    ls_exp.a = `test`;
    ls_exp.b = 24022022;
    try {
      lo_cut = null; // TODO(abap2js): CREATE OBJECT lo_cut.
      lo_cut.to_abap({ it_nodes: lo_nodes.sorted(), c_container: ls_act });
      cl_abap_unit_assert.fail();
    } catch (lx) {
      cl_abap_unit_assert.assert_equals({ act: lx.message, exp: `Path not found` });
    }
  }

  to_abap_corresponding_public() {
    let lo_cut = null;
    let ls_act = null;
    let ls_exp = null;
    let li_json = null;
    let lo_nodes = null;
    lo_nodes = null; // TODO(abap2js): CREATE OBJECT lo_nodes.
    lo_nodes.add(`       |           |object |                          | `);
    lo_nodes.add(`/      |a          |str    |test                      | `);
    lo_nodes.add(`/      |c          |num    |24022022                  | `);
    ls_exp.a = `test`;
    lo_cut = null; // TODO(abap2js): CREATE OBJECT lo_cut.
    lo_cut.mt_json_tree = z2ui5_cl_util.abap_copy(lo_nodes.mt_nodes);
    // TODO(abap2js): lo_cut->to_abap( EXPORTING iv_corresponding = abap_true IMPORTING ev_container = ls_act ).
    cl_abap_unit_assert.assert_equals({ act: ls_act, exp: ls_exp });
    ls_act = null;
    li_json = lo_cut.to_abap_corresponding_only();
    // TODO(abap2js): li_json->to_abap( IMPORTING ev_container = ls_act ).
    cl_abap_unit_assert.assert_equals({ act: ls_act, exp: ls_exp });
  }

  to_abap_corresponding_pub_neg() {
    let lo_cut = null;
    let ls_act = null;
    let ls_exp = null;
    let lo_nodes = null;
    let lx = null;
    lo_nodes = null; // TODO(abap2js): CREATE OBJECT lo_nodes.
    lo_nodes.add(`       |           |object |                          | `);
    lo_nodes.add(`/      |a          |str    |test                      | `);
    lo_nodes.add(`/      |c          |num    |24022022                  | `);
    ls_exp.a = `test`;
    lo_cut = null; // TODO(abap2js): CREATE OBJECT lo_cut.
    lo_cut.mt_json_tree = z2ui5_cl_util.abap_copy(lo_nodes.mt_nodes);
    try {
      // TODO(abap2js): lo_cut->to_abap( IMPORTING ev_container = ls_act ).
      cl_abap_unit_assert.fail();
    } catch (lx) {
      cl_abap_unit_assert.assert_equals({ act: lx.message, exp: `Path not found` });
    }
  }

  to_abap_compressed_stdrd() {
    let sy_subrc = 0;
    let lt_foo_bar = [];
    let ls_foo_bar = null;
    let lo_ajson = null;
    let lv_json = ``;
    lv_json = `[` + `  {` + `    "foo": "abc",` + `    "bar": "123"` + `  },` + `  {` + `    "foo": "cde"` + `  }` + `]`;
    lo_ajson = z2ui5_cl_ajson.parse(lv_json);
    // TODO(abap2js): lo_ajson->to_abap( IMPORTING ev_container = lt_foo_bar ).
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
    let ls_foo_bar = null;
    let lo_ajson = null;
    let lv_json = ``;
    lv_json = `[` + `  {` + `    "foo": "abc",` + `    "bar": "123"` + `  },` + `  {` + `    "foo": "cde"` + `  }` + `]`;
    lo_ajson = z2ui5_cl_ajson.parse(lv_json);
    // TODO(abap2js): lo_ajson->to_abap( IMPORTING ev_container = lt_foo_bar ).
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
    let ls_foo_bar = null;
    let lo_ajson = null;
    let lv_json = ``;
    lv_json = `[` + `  {` + `    "foo": "abc",` + `    "bar": "123"` + `  },` + `  {` + `    "foo": "cde"` + `  }` + `]`;
    lo_ajson = z2ui5_cl_ajson.parse(lv_json);
    // TODO(abap2js): lo_ajson->to_abap( IMPORTING ev_container = lt_foo_bar ).
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
    let ls_foo_bar = null;
    let lo_ajson = null;
    let lv_json = ``;
    lv_json = `[` + `  {` + `    "foo": "abc",` + `    "bar": "123"` + `  },` + `  {` + `    "foo": "cde"` + `  }` + `]`;
    lo_ajson = z2ui5_cl_ajson.parse(lv_json);
    // TODO(abap2js): lo_ajson->to_abap( IMPORTING ev_container = lt_foo_bar ).
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
    let ls_foo_bar = null;
    let lo_ajson = null;
    let lv_json = ``;
    lv_json = `[` + `  {` + `    "foo": "abc",` + `    "bar": "123"` + `  },` + `  {` + `    "foo": "cde"` + `  }` + `]`;
    lo_ajson = z2ui5_cl_ajson.parse(lv_json);
    // TODO(abap2js): lo_ajson->to_abap( IMPORTING ev_container = lt_foo_bar ).
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
    lo_nodes_exp = null; // TODO(abap2js): CREATE OBJECT lo_nodes_exp.
    lo_nodes_exp.add(`        |      |object |     ||1`);
    lo_nodes_exp.add(`/       |a     |object |     ||1`);
    lo_nodes_exp.add(`/a/     |b     |object |     ||1`);
    lo_nodes_exp.add(`/a/b/   |c     |object |     ||1`);
    lo_nodes_exp.add(`/a/b/c/ |d     |object |     ||0`);
    lo_cut.prove_path_exists(`/a/b/c/d/`);
    cl_abap_unit_assert.assert_equals({ act: lo_cut.mt_json_tree, exp: lo_nodes_exp.sorted() });
    lo_nodes_exp = null; // TODO(abap2js): CREATE OBJECT lo_nodes_exp.
    lo_nodes_exp.add(`         |      |object |     ||1`);
    lo_nodes_exp.add(`/        |a     |object |     ||1`);
    lo_nodes_exp.add(`/a/      |b     |object |     ||1`);
    lo_nodes_exp.add(`/a/b/    |c     |object |     ||1`);
    lo_nodes_exp.add(`/a/b/c/  |d     |object |     ||1`);
    lo_nodes_exp.add(`/a/b/c/d |e     |object |     ||0`);
    lo_cut.prove_path_exists(`/a/b/c/d/e/`);
  }

  delete_subtree() {
    let lo_cut = null;
    let lo_nodes_exp = null;
    lo_cut = z2ui5_cl_ajson.create_empty();
    lo_nodes_exp = null; // TODO(abap2js): CREATE OBJECT lo_nodes_exp.
    lo_nodes_exp.add(`        |      |object |     ||1`);
    lo_nodes_exp.add(`/       |a     |object |     ||1`);
    lo_nodes_exp.add(`/a/     |b     |object |     ||1`);
    lo_nodes_exp.add(`/a/b/   |c     |object |     ||1`);
    lo_nodes_exp.add(`/a/b/c/ |d     |object |     ||0`);
    lo_cut.mt_json_tree = z2ui5_cl_util.abap_copy(lo_nodes_exp.mt_nodes);
    lo_nodes_exp = null; // TODO(abap2js): CREATE OBJECT lo_nodes_exp.
    lo_nodes_exp.add(`        |      |object |     ||1`);
    lo_nodes_exp.add(`/       |a     |object |     ||0`);
    lo_cut.delete_subtree({ iv_path: `/a/`, iv_name: `b` });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.mt_json_tree, exp: lo_nodes_exp.sorted() });
  }

  delete() {
    let lo_cut = null;
    let lo_nodes_exp = null;
    lo_cut = z2ui5_cl_ajson.create_empty();
    lo_nodes_exp = null; // TODO(abap2js): CREATE OBJECT lo_nodes_exp.
    lo_nodes_exp.add(`        |      |object |     ||1`);
    lo_nodes_exp.add(`/       |a     |object |     ||1`);
    lo_nodes_exp.add(`/a/     |b     |object |     ||1`);
    lo_nodes_exp.add(`/a/b/   |c     |object |     ||1`);
    lo_nodes_exp.add(`/a/b/c/ |d     |object |     ||0`);
    lo_cut.mt_json_tree = z2ui5_cl_util.abap_copy(lo_nodes_exp.mt_nodes);
    lo_nodes_exp = null; // TODO(abap2js): CREATE OBJECT lo_nodes_exp.
    lo_nodes_exp.add(`        |      |object |     ||1`);
    lo_nodes_exp.add(`/       |a     |object |     ||0`);
    lo_cut.delete({ iv_path: `/a/b` });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.mt_json_tree, exp: lo_nodes_exp.sorted() });
    lo_nodes_exp = null; // TODO(abap2js): CREATE OBJECT lo_nodes_exp.
    lo_nodes_exp.add(`        |      |object |     ||1`);
    lo_nodes_exp.add(`/       |a     |object |     ||1`);
    lo_nodes_exp.add(`/a/     |b     |object |     ||1`);
    lo_nodes_exp.add(`/a/b/   |c     |object |     ||1`);
    lo_nodes_exp.add(`/a/b/c/ |d     |object |     ||0`);
    lo_cut.mt_json_tree = z2ui5_cl_util.abap_copy(lo_nodes_exp.mt_nodes);
    lo_nodes_exp = null; // TODO(abap2js): CREATE OBJECT lo_nodes_exp.
    lo_nodes_exp.add(`        |      |object |     ||1`);
    lo_nodes_exp.add(`/       |a     |object |     ||0`);
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
    li_writer = z2ui5_cl_util.abap_copy(lo_cut);
    lo_nodes = null; // TODO(abap2js): CREATE OBJECT lo_nodes.
    lo_nodes.add(`        |      |object |     ||1`);
    lo_nodes.add(`/       |x     |object |     ||2`);
    lo_nodes.add(`/x/     |b     |str    |abc  ||0`);
    lo_nodes.add(`/x/     |c     |num    |10   ||0`);
    lo_src.mt_json_tree = z2ui5_cl_util.abap_copy(lo_nodes.mt_nodes);
    li_writer.set({ iv_path: ``, iv_val: lo_src });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.mt_json_tree, exp: lo_nodes.sorted() });
    li_writer.set({ iv_path: `/`, iv_val: lo_src });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.mt_json_tree, exp: lo_nodes.sorted() });
    lo_nodes = null; // TODO(abap2js): CREATE OBJECT lo_nodes.
    lo_nodes.add(`        |      |object |     ||1`);
    lo_nodes.add(`/       |a     |object |     ||1`);
    lo_nodes.add(`/a/     |b     |object |     ||1`);
    lo_nodes.add(`/a/b/     |c     |object |     ||1`);
    lo_nodes.add(`/a/b/c/   |x     |object |     ||2`);
    lo_nodes.add(`/a/b/c/x/ |b     |str    |abc  ||0`);
    lo_nodes.add(`/a/b/c/x/ |c     |num    |10   ||0`);
    li_writer.clear();
    li_writer.set({ iv_path: `/a/b/c`, iv_val: lo_src });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.mt_json_tree, exp: lo_nodes.sorted() });
    lo_nodes = null; // TODO(abap2js): CREATE OBJECT lo_nodes.
    lo_nodes.add(`        |      |object |     ||1`);
    lo_nodes.add(`/       |a     |object |     ||1`);
    lo_nodes.add(`/a/       |b     |object |     ||1`);
    lo_nodes.add(`/a/b/     |x     |object |     ||2`);
    lo_nodes.add(`/a/b/x/   |b     |str    |abc  ||0`);
    lo_nodes.add(`/a/b/x/   |c     |num    |10   ||0`);
    li_writer.set({ iv_path: `/a/b`, iv_val: lo_src });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.mt_json_tree, exp: lo_nodes.sorted() });
  }

  set_value() {
    let lo_nodes = null;
    let lo_cut = null;
    let li_writer = null;
    lo_cut = z2ui5_cl_ajson.create_empty();
    li_writer = z2ui5_cl_util.abap_copy(lo_cut);
    lo_nodes = null; // TODO(abap2js): CREATE OBJECT lo_nodes.
    lo_nodes.add(`        |      |object |     ||1`);
    lo_nodes.add(`/       |x     |object |     ||2`);
    lo_nodes.add(`/x/     |b     |str    |abc  ||0`);
    lo_nodes.add(`/x/     |c     |num    |10   ||0`);
    li_writer.set({ iv_path: `/x/b`, iv_val: `abc` });
    li_writer.set({ iv_path: `/x/c`, iv_val: 10 });
    li_writer.set({ iv_path: `/x/d`, iv_val: 0 });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.mt_json_tree, exp: lo_nodes.sorted() });
  }

  ignore_empty() {
    let lo_nodes = null;
    let li_cut = null;
    li_cut = z2ui5_cl_ajson.create_empty();
    lo_nodes = null; // TODO(abap2js): CREATE OBJECT lo_nodes.
    lo_nodes.add(`        |      |object |     ||1`);
    lo_nodes.add(`/       |a     |num    |1    ||0`);
    li_cut.set({ iv_path: `/a`, iv_val: 1 });
    li_cut.set({ iv_path: `/b`, iv_val: 0 });
    cl_abap_unit_assert.assert_equals({ act: li_cut.mt_json_tree, exp: lo_nodes.sorted() });
    lo_nodes = null; // TODO(abap2js): CREATE OBJECT lo_nodes.
    lo_nodes.add(`        |      |object |     ||2`);
    lo_nodes.add(`/       |a     |num    |1    ||0`);
    lo_nodes.add(`/       |b     |num    |0    ||0`);
    li_cut.set({ iv_ignore_empty: false, iv_path: `/b`, iv_val: 0 });
    cl_abap_unit_assert.assert_equals({ act: li_cut.mt_json_tree, exp: lo_nodes.sorted() });
  }

  set_obj() {
    let lo_nodes = null;
    let lo_cut = null;
    let li_writer = null;
    // TODO(abap2js): DATA BEGIN OF ls_struc,
    let b = ``;
    let c = 0;
    let d = null;
    // TODO(abap2js): DATA END OF ls_struc.
    lo_cut = z2ui5_cl_ajson.create_empty();
    li_writer = z2ui5_cl_util.abap_copy(lo_cut);
    lo_nodes = null; // TODO(abap2js): CREATE OBJECT lo_nodes.
    lo_nodes.add(`        |      |object |           ||1`);
    lo_nodes.add(`/       |x     |object |           ||3`);
    lo_nodes.add(`/x/     |b     |str    |abc        ||0`);
    lo_nodes.add(`/x/     |c     |num    |10         ||0`);
    lo_nodes.add(`/x/     |d     |str    |2022-04-01 ||0`);
    li_writer.set({ iv_path: `/x`, iv_val: ls_struc });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.mt_json_tree, exp: lo_nodes.sorted() });
  }

  set_obj_w_date_time() {
    let lo_nodes = null;
    let lo_cut = null;
    let li_writer = null;
    // TODO(abap2js): DATA BEGIN OF ls_struc,
    let d = null;
    let d_empty = null;
    let t = null;
    let t_empty = null;
    let ts = null;
    let p = null;
    // TODO(abap2js): DATA END OF ls_struc.
    lo_cut = z2ui5_cl_ajson.create_empty().format_datetime();
    li_writer = z2ui5_cl_util.abap_copy(lo_cut);
    lo_nodes = null; // TODO(abap2js): CREATE OBJECT lo_nodes.
    lo_nodes.add(`      |        |object |           ||6`);
    lo_nodes.add(`/     |d       |str    |2022-04-01 ||0`);
    lo_nodes.add(`/     |d_empty |str    |           ||0`);
    lo_nodes.add(`/     |t       |str    |20:01:03   ||0`);
    lo_nodes.add(`/     |t_empty |str    |           ||0`);
    lo_nodes.add(`/     |ts      |str    |2022-04-01T20:01:03Z ||0`);
    lo_nodes.add(`/     |p       |num    |123.45     ||0`);
    li_writer.set({ iv_path: `/`, iv_val: ls_struc });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.mt_json_tree, exp: lo_nodes.sorted() });
  }

  set_tab() {
    let lo_nodes = null;
    let lo_cut = null;
    let li_writer = null;
    let lt_tab = [];
    lo_cut = z2ui5_cl_ajson.create_empty();
    li_writer = z2ui5_cl_util.abap_copy(lo_cut);
    lt_tab.push(`hello`);
    lt_tab.push(`world`);
    lo_nodes = null; // TODO(abap2js): CREATE OBJECT lo_nodes.
    lo_nodes.add(`        |      |object |     | |1`);
    lo_nodes.add(`/       |x     |array  |     | |2`);
    lo_nodes.add(`/x/     |1     |str    |hello|1|0`);
    lo_nodes.add(`/x/     |2     |str    |world|2|0`);
    li_writer.set({ iv_path: `/x`, iv_val: lt_tab });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.mt_json_tree, exp: lo_nodes.sorted() });
  }

  set_tab_hashed() {
    let lo_nodes = null;
    let lo_cut = null;
    let li_writer = null;
    let lt_tab = [];
    lo_cut = z2ui5_cl_ajson.create_empty();
    li_writer = z2ui5_cl_util.abap_copy(lo_cut);
    lt_tab.push(`hello`);
    lt_tab.push(`world`);
    lo_nodes = null; // TODO(abap2js): CREATE OBJECT lo_nodes.
    lo_nodes.add(`        |      |object |     | |1`);
    lo_nodes.add(`/       |x     |array  |     | |2`);
    lo_nodes.add(`/x/     |1     |str    |hello|1|0`);
    lo_nodes.add(`/x/     |2     |str    |world|2|0`);
    li_writer.set({ iv_path: `/x`, iv_val: lt_tab });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.mt_json_tree, exp: lo_nodes.sorted() });
  }

  set_tab_nested_struct() {
    // TODO(abap2js): INCLUDE TYPE ty_include.
    let lo_nodes = null;
    let li_cut = null;
    let ls_tab = null;
    let lt_tab = [];
    li_cut = z2ui5_cl_ajson.create_empty();
    ls_tab.str = `hello`;
    ls_tab.int = 123;
    ls_tab.dat = `4041`;
    lt_tab.push(ls_tab);
    ls_tab.str = `world`;
    ls_tab.int = 456;
    ls_tab.dat = `6061`;
    lt_tab.push(ls_tab);
    lo_nodes = null; // TODO(abap2js): CREATE OBJECT lo_nodes.
    lo_nodes.add(`        |      |array  |     |0|2`);
    lo_nodes.add(`/       |1     |object |     |1|3`);
    lo_nodes.add(`/       |2     |object |     |2|3`);
    lo_nodes.add(`/1/     |dat   |str    |4041 |0|0`);
    lo_nodes.add(`/1/     |int   |num    |123  |0|0`);
    lo_nodes.add(`/1/     |str   |str    |hello|0|0`);
    lo_nodes.add(`/2/     |dat   |str    |6061 |0|0`);
    lo_nodes.add(`/2/     |int   |num    |456  |0|0`);
    lo_nodes.add(`/2/     |str   |str    |world|0|0`);
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
    li_writer = z2ui5_cl_util.abap_copy(lo_cut);
    lo_nodes = null; // TODO(abap2js): CREATE OBJECT lo_nodes.
    lo_nodes.add(`        |      |num    |10         ||0`);
    lv_foo = 10;
    // TODO(abap2js): GET REFERENCE OF lv_foo INTO lr_foo.
    li_writer.set({ iv_path: `/`, iv_val: lr_foo });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.mt_json_tree, exp: lo_nodes.sorted() });
  }

  set_ref_to_data_struct() {
    let lo_nodes = null;
    let lo_cut = null;
    let li_writer = null;
    let lv_foo = ``;
    // TODO(abap2js): DATA BEGIN OF ls_struc,
    let r = null;
    // TODO(abap2js): DATA END OF ls_struc.
    lo_cut = z2ui5_cl_ajson.create_empty();
    li_writer = z2ui5_cl_util.abap_copy(lo_cut);
    lo_nodes = null; // TODO(abap2js): CREATE OBJECT lo_nodes.
    lo_nodes.add(`        |      |object |           ||1`);
    lo_nodes.add(`/       |r     |str    |abc        ||0`);
    lv_foo = `abc`;
    // TODO(abap2js): GET REFERENCE OF lv_foo INTO ls_struc-r.
    li_writer.set({ iv_path: `/`, iv_val: ls_struc });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.mt_json_tree, exp: lo_nodes.sorted() });
  }

  arrays() {
    let lo_cut = null;
    let lo_nodes_exp = null;
    let li_writer = null;
    lo_cut = z2ui5_cl_ajson.create_empty();
    li_writer = z2ui5_cl_util.abap_copy(lo_cut);
    lo_nodes_exp = null; // TODO(abap2js): CREATE OBJECT lo_nodes_exp.
    lo_nodes_exp.add(`        |      |object |     | |1`);
    lo_nodes_exp.add(`/       |a     |array  |     | |0`);
    li_writer.touch_array({ iv_path: `/a` });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.mt_json_tree, exp: lo_nodes_exp.sorted() });
    lo_nodes_exp = null; // TODO(abap2js): CREATE OBJECT lo_nodes_exp.
    lo_nodes_exp.add(`        |      |object |     | |1`);
    lo_nodes_exp.add(`/       |a     |array  |     | |1`);
    lo_nodes_exp.add(`/a/     |1     |str    |hello|1|0`);
    li_writer.push({ iv_path: `/a`, iv_val: `hello` });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.mt_json_tree, exp: lo_nodes_exp.sorted() });
    lo_nodes_exp = null; // TODO(abap2js): CREATE OBJECT lo_nodes_exp.
    lo_nodes_exp.add(`        |      |object |     | |1`);
    lo_nodes_exp.add(`/       |a     |array  |     | |2`);
    lo_nodes_exp.add(`/a/     |1     |str    |hello|1|0`);
    lo_nodes_exp.add(`/a/     |2     |object |     |2|1`);
    lo_nodes_exp.add(`/a/2/   |x     |str    |world| |0`);
    // TODO(abap2js): DATA BEGIN OF ls_dummy,
    let x = ``;
    // TODO(abap2js): DATA END OF ls_dummy.
    li_writer.push({ iv_path: `/a`, iv_val: ls_dummy });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.mt_json_tree, exp: lo_nodes_exp.sorted() });
    li_writer.touch_array({ iv_path: `/a` });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.mt_json_tree, exp: lo_nodes_exp.sorted() });
    lo_nodes_exp = null; // TODO(abap2js): CREATE OBJECT lo_nodes_exp.
    lo_nodes_exp.add(`        |      |object |     | |1`);
    lo_nodes_exp.add(`/       |a     |array  |     | |0`);
    li_writer.touch_array({ iv_path: `/a`, iv_clear: true });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.mt_json_tree, exp: lo_nodes_exp.sorted() });
    lo_nodes_exp = null; // TODO(abap2js): CREATE OBJECT lo_nodes_exp.
    lo_nodes_exp.add(`        |      |object |     | |1`);
    lo_nodes_exp.add(`/       |a     |array  |     | |2`);
    lo_nodes_exp.add(`/a/     |1     |object |     |1|1`);
    lo_nodes_exp.add(`/a/1/   |x     |num    |123  | |0`);
    lo_nodes_exp.add(`/a/     |2     |num    |234  |2|0`);
    li_writer.set({ iv_path: `/a/1/x`, iv_val: 123 });
    li_writer.set({ iv_path: `/a/2`, iv_val: 234 });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.mt_json_tree, exp: lo_nodes_exp.sorted() });
  }

  arrays_negative() {
    let lo_cut = null;
    let li_writer = null;
    lo_cut = z2ui5_cl_ajson.create_empty();
    li_writer = z2ui5_cl_util.abap_copy(lo_cut);
    li_writer.touch_array({ iv_path: `/a` });
    li_writer.push({ iv_path: `/a`, iv_val: 123 });
    let lx = null;
    try {
      li_writer.touch_array({ iv_path: `/a/1` });
      cl_abap_unit_assert.fail();
    } catch (lx) {
      cl_abap_unit_assert.assert_equals({ act: lx.message, exp: `Path [/a/1] already used and is not array` });
    }
    try {
      li_writer.push({ iv_path: `/a/1`, iv_val: 123 });
      cl_abap_unit_assert.fail();
    } catch (lx) {
      cl_abap_unit_assert.assert_equals({ act: lx.message, exp: `Path [/a/1] is not array` });
    }
    try {
      li_writer.push({ iv_path: `/x`, iv_val: 123 });
      cl_abap_unit_assert.fail();
    } catch (lx) {
      cl_abap_unit_assert.assert_equals({ act: lx.message, exp: `Path [/x] does not exist` });
    }
    try {
      li_writer.set({ iv_path: `/a/abc/x`, iv_val: 123 });
      cl_abap_unit_assert.fail();
    } catch (lx) {
      cl_abap_unit_assert.assert_equals({ act: lx.message, exp: `Cannot add non-numeric key [abc] to array [/a/]` });
    }
    try {
      li_writer.set({ iv_path: `/a/abc`, iv_val: 123 });
      cl_abap_unit_assert.fail();
    } catch (lx) {
      cl_abap_unit_assert.assert_equals({ act: lx.message, exp: `Cannot add non-numeric key [abc] to array [/a/]` });
    }
    try {
      li_writer.set({ iv_path: `/a/0`, iv_val: 123 });
      cl_abap_unit_assert.fail();
    } catch (lx) {
      cl_abap_unit_assert.assert_equals({ act: lx.message, exp: `Cannot add zero key to array [/a/]` });
    }
  }

  root_assignment() {
    let lo_cut = null;
    let lo_nodes_exp = null;
    let li_writer = null;
    // TODO(abap2js): DATA BEGIN OF ls_dummy,
    let x = ``;
    // TODO(abap2js): DATA END OF ls_dummy.
    lo_cut = z2ui5_cl_ajson.create_empty();
    li_writer = z2ui5_cl_util.abap_copy(lo_cut);
    lo_nodes_exp = null; // TODO(abap2js): CREATE OBJECT lo_nodes_exp.
    lo_nodes_exp.add(`        |      |object |     ||1`);
    lo_nodes_exp.add(`/       |x     |str    |hello||0`);
    li_writer.set({ iv_path: `/`, iv_val: ls_dummy });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.mt_json_tree, exp: lo_nodes_exp.sorted() });
    lo_nodes_exp = null; // TODO(abap2js): CREATE OBJECT lo_nodes_exp.
    lo_nodes_exp.add(`        |      |object |     ||1`);
    lo_nodes_exp.add(`/       |x     |str    |hello||0`);
    li_writer.clear();
    li_writer.set({ iv_path: ``, iv_val: ls_dummy });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.mt_json_tree, exp: lo_nodes_exp.sorted() });
    lo_nodes_exp = null; // TODO(abap2js): CREATE OBJECT lo_nodes_exp.
    lo_nodes_exp.add(`        |      |array  |     | |1`);
    lo_nodes_exp.add(`/       |1     |str    |hello|1|0`);
    li_writer.clear();
    li_writer.touch_array({ iv_path: `` });
    li_writer.push({ iv_path: ``, iv_val: `hello` });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.mt_json_tree, exp: lo_nodes_exp.sorted() });
    lo_nodes_exp = null; // TODO(abap2js): CREATE OBJECT lo_nodes_exp.
    lo_nodes_exp.add(`        |      |str    |hello||0`);
    li_writer.clear();
    li_writer.set({ iv_path: ``, iv_val: `hello` });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.mt_json_tree, exp: lo_nodes_exp.sorted() });
  }

  set_bool_abap_bool() {
    let lo_cut = null;
    let lo_nodes_exp = null;
    let li_writer = null;
    lo_cut = z2ui5_cl_ajson.create_empty();
    li_writer = z2ui5_cl_util.abap_copy(lo_cut);
    lo_nodes_exp = null; // TODO(abap2js): CREATE OBJECT lo_nodes_exp.
    lo_nodes_exp.add(`        |      |object |      ||2`);
    lo_nodes_exp.add(`/       |a     |bool   |true  ||0`);
    lo_nodes_exp.add(`/       |b     |bool   |false ||0`);
    li_writer.set_boolean({ iv_path: `/a`, iv_val: true });
    li_writer.set_boolean({ iv_path: `/b`, iv_val: false });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.mt_json_tree, exp: lo_nodes_exp.sorted() });
  }

  set_bool_int() {
    let lo_cut = null;
    let lo_nodes_exp = null;
    let li_writer = null;
    lo_cut = z2ui5_cl_ajson.create_empty();
    li_writer = z2ui5_cl_util.abap_copy(lo_cut);
    lo_nodes_exp = null; // TODO(abap2js): CREATE OBJECT lo_nodes_exp.
    lo_nodes_exp.add(`        |      |object |      ||2`);
    lo_nodes_exp.add(`/       |a     |bool   |true  ||0`);
    lo_nodes_exp.add(`/       |b     |bool   |false ||0`);
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
    li_writer = z2ui5_cl_util.abap_copy(lo_cut);
    lo_nodes_exp = null; // TODO(abap2js): CREATE OBJECT lo_nodes_exp.
    lo_nodes_exp.add(`        |      |object |      ||2`);
    lo_nodes_exp.add(`/       |a     |bool   |true  ||0`);
    lo_nodes_exp.add(`/       |b     |bool   |false ||0`);
    lt_tab.push(`hello`);
    li_writer.set_boolean({ iv_path: `/a`, iv_val: lt_tab });
    lt_tab = null;
    li_writer.set_boolean({ iv_path: `/b`, iv_val: lt_tab });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.mt_json_tree, exp: lo_nodes_exp.sorted() });
  }

  set_str() {
    let lo_cut = null;
    let lo_nodes_exp = null;
    let li_writer = null;
    let lv_date = null;
    lo_cut = z2ui5_cl_ajson.create_empty();
    li_writer = z2ui5_cl_util.abap_copy(lo_cut);
    lo_nodes_exp = null; // TODO(abap2js): CREATE OBJECT lo_nodes_exp.
    lo_nodes_exp.add(`        |      |object |         ||3`);
    lo_nodes_exp.add(`/       |a     |str    |123      ||0`);
    lo_nodes_exp.add(`/       |b     |str    |X        ||0`);
    lo_nodes_exp.add(`/       |c     |str    |20200705 ||0`);
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
    li_writer = z2ui5_cl_util.abap_copy(lo_cut);
    lo_nodes_exp = null; // TODO(abap2js): CREATE OBJECT lo_nodes_exp.
    lo_nodes_exp.add(`        |      |object |         ||1`);
    lo_nodes_exp.add(`/       |a     |num    |123      ||0`);
    li_writer.set_integer({ iv_path: `/a`, iv_val: 123 });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.mt_json_tree, exp: lo_nodes_exp.sorted() });
  }

  set_number() {
    let lo_nodes_exp = null;
    let li_json = null;
    let lv_p = 0;
    li_json = z2ui5_cl_ajson.create_empty();
    lo_nodes_exp = null; // TODO(abap2js): CREATE OBJECT lo_nodes_exp.
    lo_nodes_exp.add(`        |      |object |         ||1`);
    lo_nodes_exp.add(`/       |a     |num    |123.45   ||0`);
    li_json.set({ iv_path: `/a`, iv_val: lv_p });
    cl_abap_unit_assert.assert_equals({ act: li_json.mt_json_tree, exp: lo_nodes_exp.sorted() });
  }

  set_date() {
    let lo_cut = null;
    let lo_nodes_exp = null;
    let li_writer = null;
    let lv_date = null;
    lo_cut = z2ui5_cl_ajson.create_empty();
    li_writer = z2ui5_cl_util.abap_copy(lo_cut);
    lo_nodes_exp = null; // TODO(abap2js): CREATE OBJECT lo_nodes_exp.
    lo_nodes_exp.add(`        |      |object |           ||2`);
    lo_nodes_exp.add(`/       |a     |str    |2020-07-05 ||0`);
    lo_nodes_exp.add(`/       |b     |str    |           ||0`);
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
    let lv_timestamp = null;
    lo_cut = z2ui5_cl_ajson.create_empty();
    li_writer = z2ui5_cl_util.abap_copy(lo_cut);
    lo_nodes_exp = null; // TODO(abap2js): CREATE OBJECT lo_nodes_exp.
    lo_nodes_exp.add(`        |      |object |                     ||1`);
    lo_nodes_exp.add(`/       |a     |str    |2021-05-05T12:00:00Z ||0`);
    lv_timestamp = `20210505120000`;
    li_writer.set_timestamp({ iv_path: `/a`, iv_val: lv_timestamp });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.mt_json_tree, exp: lo_nodes_exp.sorted() });
  }

  set_timestampl() {
    let lo_cut = null;
    let lo_nodes_exp = null;
    let li_writer = null;
    let lv_timestampl = null;
    lo_cut = z2ui5_cl_ajson.create_empty();
    li_writer = z2ui5_cl_util.abap_copy(lo_cut);
    lo_nodes_exp = null; // TODO(abap2js): CREATE OBJECT lo_nodes_exp.
    lo_nodes_exp.add(`        |      |object |                            ||1`);
    lo_nodes_exp.add(`/       |a     |str    |2021-05-05T12:00:00.123456Z ||0`);
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
      // TODO(abap2js): ASSIGN lr_utclong->* TO <utclong>.
    } catch (error) {
      return;
    }
    lo_cut = z2ui5_cl_ajson.create_empty();
    li_writer = z2ui5_cl_util.abap_copy(lo_cut);
    lo_nodes_exp = null; // TODO(abap2js): CREATE OBJECT lo_nodes_exp.
    lo_nodes_exp.add(`        |      |object |                            ||1`);
    lo_nodes_exp.add(`/       |a     |str    |2021-05-05T12:00:00.1234567Z||0`);
    fs_utclong = `2021-05-05 12:00:00.1234567`;
    if (_fs$fs_utclong) _fs$fs_utclong.o[_fs$fs_utclong.k] = fs_utclong;
    li_writer.set({ iv_path: `/a`, iv_val: fs_utclong });
    cl_abap_unit_assert.assert_equals({ act: lo_cut.mt_json_tree, exp: lo_nodes_exp.sorted() });
  }

  read_only() {
    let lo_cut = null;
    let li_writer = null;
    lo_cut = z2ui5_cl_ajson.create_empty();
    li_writer = z2ui5_cl_util.abap_copy(lo_cut);
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
    lo_nodes_exp = null; // TODO(abap2js): CREATE OBJECT lo_nodes_exp.
    lo_nodes_exp.add(`                 |         |object |                        |  |1`);
    lo_nodes_exp.add(`/                |issues   |array  |                        |  |2`);
    lo_nodes_exp.add(`/issues/         |1        |object |                        |1 |1`);
    lo_nodes_exp.add(`/issues/         |2        |object |                        |2 |1`);
    lo_nodes_exp.add(`/issues/1/       |end      |object |                        |  |2`);
    lo_nodes_exp.add(`/issues/1/end/   |col      |num    |26                      |  |0`);
    lo_nodes_exp.add(`/issues/1/end/   |row      |num    |4                       |  |0`);
    lo_nodes_exp.add(`/issues/2/       |end      |object |                        |  |2`);
    lo_nodes_exp.add(`/issues/2/end/   |col      |num    |22                      |  |0`);
    lo_nodes_exp.add(`/issues/2/end/   |row      |num    |3                       |  |0`);
    lo_cut = z2ui5_cl_ajson.create_empty();
    li_writer = z2ui5_cl_util.abap_copy(lo_cut);
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
    li_writer = z2ui5_cl_util.abap_copy(lo_cut);
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
    // TODO(abap2js): DATA BEGIN OF ls_dummy,
    let b = 0;
    let a = 0;
    // TODO(abap2js): DATA END OF ls_dummy.
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
    // TODO(abap2js): DATA BEGIN OF ls_dummy,
    let b = 0;
    let a = [];
    // TODO(abap2js): DATA END OF ls_dummy.
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
    // TODO(abap2js): DATA BEGIN OF ls_dummy,
    let f = 0;
    let e = 0;
    // TODO(abap2js): DATA END OF ls_dummy.
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
      lt_exp.push(lv_exp);
    }
    lv_src = lv_src + `]`;
    let li_reader = null;
    li_reader = z2ui5_cl_ajson.parse(lv_src);
    // TODO(abap2js): li_reader->to_abap( IMPORTING ev_container = lt_act ).
    cl_abap_unit_assert.assert_equals({ act: lt_act, exp: lt_exp });
  }

  array_index() {
    let lt_act = [];
    let lt_exp = [];
    let ls_exp = null;
    let lv_src = ``;
    lv_src = `[`;
    for (let sy_index = 1; sy_index <= 10; sy_index++) {
      if (sy_index !== 1) {
        lv_src = lv_src + `, `;
      }
      lv_src = lv_src + `{ "row": ${sy_index} }`;
      ls_exp.row = z2ui5_cl_util.abap_copy(sy_index);
      lt_exp.push(ls_exp);
    }
    lv_src = lv_src + `]`;
    let li_reader = null;
    li_reader = z2ui5_cl_ajson.parse(lv_src);
    // TODO(abap2js): li_reader->to_abap( IMPORTING ev_container = lt_act ).
    cl_abap_unit_assert.assert_equals({ act: lt_act, exp: lt_exp });
  }

  reader() {
    let lv_source = ``;
    let li_reader = null;
    lv_source = ltcl_parser_test.sample_json();
    li_reader = z2ui5_cl_ajson.parse(lv_source);
    cl_abap_unit_assert.assert_equals({ act: li_reader.get(`/string`), exp: `abc` });
    let ls_act = null;
    let ls_exp = null;
    ls_exp.string = `abc`;
    ls_exp.number = 123;
    ls_exp.float = `123.45`;
    ls_exp.boolean = true;
    ls_exp.false = false;
    ls_exp.date = `2020-03-15`;
    ls_exp.issues.push({});
    fs_i.message = `Indentation problem ...`;
    fs_i.key = `indentation`;
    fs_i.filename = `./zxxx.prog.abap`;
    fs_i.start.row = 4;
    fs_i.start.col = 3;
    fs_i.end.row = 4;
    fs_i.end.col = 26;
    ls_exp.issues.push({});
    fs_i.message = `Remove space before XXX`;
    fs_i.key = `space_before_dot`;
    fs_i.filename = `./zxxx.prog.abap`;
    fs_i.start.row = 3;
    fs_i.start.col = 21;
    fs_i.end.row = 3;
    fs_i.end.col = 22;
    // TODO(abap2js): li_reader->to_abap( IMPORTING ev_container = ls_act ).
    cl_abap_unit_assert.assert_equals({ act: ls_act, exp: ls_exp });
  }

  stringify() {
    let lo_cut = null;
    let li_writer = null;
    let lv_exp = ``;
    // TODO(abap2js): DATA BEGIN OF ls_dummy,
    let x = 0;
    // TODO(abap2js): DATA END OF ls_dummy.
    // TODO(abap2js): DATA BEGIN OF ls_data,
    let str = ``;
    let cls = null;
    // TODO(abap2js): DATA END OF ls_data.
    ls_dummy.x = 1;
    lo_cut = z2ui5_cl_ajson.create_empty();
    li_writer = z2ui5_cl_util.abap_copy(lo_cut);
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
    li_writer = z2ui5_cl_util.abap_copy(lo_cut);
    li_writer.set({ iv_path: `/`, iv_val: ls_data });
    lv_exp = `{"cls":null,"str":"test"}`;
    cl_abap_unit_assert.assert_equals({ act: lo_cut.stringify(), exp: lv_exp });
  }

  item_order_integrated() {
    // TODO(abap2js): DATA BEGIN OF ls_dummy,
    let zulu = ``;
    let alpha = ``;
    let beta = ``;
    // TODO(abap2js): DATA END OF ls_dummy.
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
    lo_nodes = null; // TODO(abap2js): CREATE OBJECT lo_nodes.
    lo_nodes.add(`        |      |object |     ||1`);
    lo_nodes.add(`/       |a     |object |     ||1`);
    lo_nodes.add(`/a/     |b     |object |     ||1`);
    lo_nodes.add(`/a/b/   |c     |object |     ||0`);
    lo_src.mt_json_tree = z2ui5_cl_util.abap_copy(lo_nodes.mt_nodes);
    let lt_nodes = null;
    lt_nodes = lcl_abap_to_json.convert({ iv_data: lo_src });
    cl_abap_unit_assert.assert_equals({ act: lt_nodes, exp: lo_nodes.mt_nodes });
  }

  set_value_number() {
    let lo_nodes_exp = null;
    let lt_nodes = null;
    lo_nodes_exp = null; // TODO(abap2js): CREATE OBJECT lo_nodes_exp.
    lo_nodes_exp.add(`        |      |num |1     ||`);
    lt_nodes = lcl_abap_to_json.convert({ iv_data: 1 });
    cl_abap_unit_assert.assert_equals({ act: lt_nodes, exp: lo_nodes_exp.mt_nodes });
  }

  set_value_string() {
    let lo_nodes_exp = null;
    let lt_nodes = null;
    lo_nodes_exp = null; // TODO(abap2js): CREATE OBJECT lo_nodes_exp.
    lo_nodes_exp.add(`        |      |str |abc     ||`);
    lt_nodes = lcl_abap_to_json.convert({ iv_data: `abc` });
    cl_abap_unit_assert.assert_equals({ act: lt_nodes, exp: lo_nodes_exp.mt_nodes });
  }

  set_value_true() {
    let lo_nodes_exp = null;
    let lt_nodes = null;
    lo_nodes_exp = null; // TODO(abap2js): CREATE OBJECT lo_nodes_exp.
    lo_nodes_exp.add(`        |      |bool |true     ||`);
    lt_nodes = lcl_abap_to_json.convert({ iv_data: true });
    cl_abap_unit_assert.assert_equals({ act: lt_nodes, exp: lo_nodes_exp.mt_nodes });
  }

  set_value_false() {
    let lo_nodes_exp = null;
    let lt_nodes = null;
    lo_nodes_exp = null; // TODO(abap2js): CREATE OBJECT lo_nodes_exp.
    lo_nodes_exp.add(`        |      |bool |false    ||`);
    lt_nodes = lcl_abap_to_json.convert({ iv_data: false });
    cl_abap_unit_assert.assert_equals({ act: lt_nodes, exp: lo_nodes_exp.mt_nodes });
  }

  set_value_xsdboolean() {
    let lo_nodes_exp = null;
    let lt_nodes = null;
    let lv_xsdboolean = false;
    lo_nodes_exp = null; // TODO(abap2js): CREATE OBJECT lo_nodes_exp.
    lo_nodes_exp.add(`        |      |bool |true     ||`);
    lv_xsdboolean = `X`;
    lt_nodes = lcl_abap_to_json.convert({ iv_data: lv_xsdboolean });
    cl_abap_unit_assert.assert_equals({ act: lt_nodes, exp: lo_nodes_exp.mt_nodes });
  }

  set_null() {
    let lo_nodes_exp = null;
    let lt_nodes = null;
    let lv_null_ref = null;
    lo_nodes_exp = null; // TODO(abap2js): CREATE OBJECT lo_nodes_exp.
    lo_nodes_exp.add(`       |      |null |null ||`);
    lt_nodes = lcl_abap_to_json.convert({ iv_data: lv_null_ref });
    cl_abap_unit_assert.assert_equals({ act: lt_nodes, exp: lo_nodes_exp.mt_nodes });
  }

  set_value_timestamp() {
    let lo_nodes_exp = null;
    let lt_nodes = null;
    let lv_timezone = null;
    let lv_timestamp = null;
    lo_nodes_exp = null; // TODO(abap2js): CREATE OBJECT lo_nodes_exp.
    lo_nodes_exp.add(`        |      |str |2022-08-31T00:00:00Z||`);
    // TODO(abap2js): CONVERT DATE '20220831' TIME '000000' INTO TIME STAMP lv_timestamp TIME ZONE lv_timezone.
    lt_nodes = lcl_abap_to_json.convert(lcl_abap_to_json.format_timestamp(lv_timestamp));
    cl_abap_unit_assert.assert_equals({ act: lt_nodes, exp: lo_nodes_exp.mt_nodes });
  }

  set_value_timestamp_initial() {
    let lo_nodes_exp = null;
    let lt_nodes = null;
    let lv_timestamp = null;
    lo_nodes_exp = null; // TODO(abap2js): CREATE OBJECT lo_nodes_exp.
    lo_nodes_exp.add(`        |      |str |0000-00-00T00:00:00Z||`);
    lv_timestamp = 0;
    lt_nodes = lcl_abap_to_json.convert(lcl_abap_to_json.format_timestamp(lv_timestamp));
    cl_abap_unit_assert.assert_equals({ act: lt_nodes, exp: lo_nodes_exp.mt_nodes });
  }

  set_value_timestampl() {
    let lo_nodes_exp = null;
    let lt_nodes = null;
    let lv_timezone = null;
    let lv_timestampl = null;
    lo_nodes_exp = null; // TODO(abap2js): CREATE OBJECT lo_nodes_exp.
    lo_nodes_exp.add(`        |      |str |2022-08-31T12:34:56.1234567Z||`);
    // TODO(abap2js): CONVERT DATE '20220831' TIME '123456' INTO TIME STAMP lv_timestampl TIME ZONE lv_timezone.
    lv_timestampl = lv_timestampl + `0.1234567`;
    lt_nodes = lcl_abap_to_json.convert(lcl_abap_to_json.format_timestampl(lv_timestampl));
    cl_abap_unit_assert.assert_equals({ act: lt_nodes, exp: lo_nodes_exp.mt_nodes });
  }

  set_value_timestampl_initial() {
    let lo_nodes_exp = null;
    let lt_nodes = null;
    let lv_timestampl = null;
    lo_nodes_exp = null; // TODO(abap2js): CREATE OBJECT lo_nodes_exp.
    lo_nodes_exp.add(`        |      |str |0000-00-00T00:00:00.0Z||`);
    lv_timestampl = 0;
    lt_nodes = lcl_abap_to_json.convert(lcl_abap_to_json.format_timestampl(lv_timestampl));
    cl_abap_unit_assert.assert_equals({ act: lt_nodes, exp: lo_nodes_exp.mt_nodes });
  }

  prefix() {
    let lo_nodes_exp = null;
    let lt_nodes = null;
    let ls_prefix = null;
    ls_prefix.path = `/a/`;
    ls_prefix.name = `b`;
    lo_nodes_exp = null; // TODO(abap2js): CREATE OBJECT lo_nodes_exp.
    lo_nodes_exp.add(`/a/       |b     |num |1     ||`);
    lt_nodes = lcl_abap_to_json.convert({ iv_data: 1, is_prefix: ls_prefix });
    cl_abap_unit_assert.assert_equals({ act: lt_nodes, exp: lo_nodes_exp.mt_nodes });
  }

  set_obj() {
    let lo_nodes_exp = null;
    let ls_struc = null;
    let lt_nodes = null;
    ls_struc.a = `abc`;
    ls_struc.b = 10;
    ls_struc.c = true;
    ls_struc.d = `X`;
    lo_nodes_exp = null; // TODO(abap2js): CREATE OBJECT lo_nodes_exp.
    lo_nodes_exp.add(`       |      |object |     ||4`);
    lo_nodes_exp.add(`/      |a     |str    |abc  ||0`);
    lo_nodes_exp.add(`/      |b     |num    |10   ||0`);
    lo_nodes_exp.add(`/      |c     |bool   |true ||0`);
    lo_nodes_exp.add(`/      |d     |bool   |true ||0`);
    lt_nodes = lcl_abap_to_json.convert({ iv_data: ls_struc });
    cl_abap_unit_assert.assert_equals({ act: lt_nodes, exp: lo_nodes_exp.mt_nodes });
  }

  set_complex_obj() {
    let lo_nodes_exp = null;
    let ls_struc = null;
    let lt_nodes = null;
    ls_struc.a = `abc`;
    ls_struc.b = 10;
    ls_struc.c = true;
    ls_struc.d = `X`;
    ls_struc.el = `elem`;
    ls_struc.struc.a = `deep`;
    ls_struc.struc.b = 123;
    ls_struc.stab.push(`hello`);
    ls_struc.stab.push(`world`);
    ls_struc.tab.push({});
    fs_i.a = `abc`;
    ls_struc.tab.push({});
    fs_i.a = `bcd`;
    lo_nodes_exp = null; // TODO(abap2js): CREATE OBJECT lo_nodes_exp.
    lo_nodes_exp.add(`       |      |object |     ||8`);
    lo_nodes_exp.add(`/      |a     |str    |abc  ||0`);
    lo_nodes_exp.add(`/      |b     |num    |10   ||0`);
    lo_nodes_exp.add(`/      |c     |bool   |true ||0`);
    lo_nodes_exp.add(`/      |d     |bool   |true ||0`);
    lo_nodes_exp.add(`/      |el    |str    |elem ||0`);
    lo_nodes_exp.add(`/      |struc |object |     ||4`);
    lo_nodes_exp.add(`/struc/|a     |str    |deep ||0`);
    lo_nodes_exp.add(`/struc/|b     |num    |123  ||0`);
    lo_nodes_exp.add(`/struc/|c     |bool   |false||0`);
    lo_nodes_exp.add(`/struc/|d     |bool   |false||0`);
    lo_nodes_exp.add(`/      |tab   |array  |     | |2`);
    lo_nodes_exp.add(`/tab/  |1     |object |     |1|4`);
    lo_nodes_exp.add(`/tab/1/|a     |str    |abc  | |0`);
    lo_nodes_exp.add(`/tab/1/|b     |num    |0    | |0`);
    lo_nodes_exp.add(`/tab/1/|c     |bool   |false| |0`);
    lo_nodes_exp.add(`/tab/1/|d     |bool   |false| |0`);
    lo_nodes_exp.add(`/tab/  |2     |object |     |2|4`);
    lo_nodes_exp.add(`/tab/2/|a     |str    |bcd  | |0`);
    lo_nodes_exp.add(`/tab/2/|b     |num    |0    | |0`);
    lo_nodes_exp.add(`/tab/2/|c     |bool   |false| |0`);
    lo_nodes_exp.add(`/tab/2/|d     |bool   |false| |0`);
    lo_nodes_exp.add(`/      |stab  |array  |     | |2`);
    lo_nodes_exp.add(`/stab/ |1     |str    |hello|1|0`);
    lo_nodes_exp.add(`/stab/ |2     |str    |world|2|0`);
    lt_nodes = lcl_abap_to_json.convert({ iv_data: ls_struc });
    cl_abap_unit_assert.assert_equals({ act: lt_nodes, exp: lo_nodes_exp.mt_nodes });
  }

  set_include_with_suffix() {
    let lo_nodes_exp = null;
    let ls_struc = null;
    let lt_nodes = null;
    ls_struc.a_suf = `abc`;
    ls_struc.b_suf = 10;
    ls_struc.c_suf = true;
    ls_struc.d_suf = `X`;
    ls_struc.el = `elem`;
    lo_nodes_exp = null; // TODO(abap2js): CREATE OBJECT lo_nodes_exp.
    lo_nodes_exp.add(`       |      |object |     ||5`);
    lo_nodes_exp.add(`/      |a_suf |str    |abc  ||0`);
    lo_nodes_exp.add(`/      |b_suf |num    |10   ||0`);
    lo_nodes_exp.add(`/      |c_suf |bool   |true ||0`);
    lo_nodes_exp.add(`/      |d_suf |bool   |true ||0`);
    lo_nodes_exp.add(`/      |el    |str    |elem ||0`);
    lt_nodes = lcl_abap_to_json.convert({ iv_data: ls_struc });
    cl_abap_unit_assert.assert_equals({ act: lt_nodes, exp: lo_nodes_exp.mt_nodes });
  }

  set_array() {
    let lo_nodes_exp = null;
    let lt_nodes = null;
    let lt_tab = [];
    lt_tab.push({});
    fs_s.a = `abc`;
    fs_s.b = 10;
    lt_tab.push({});
    fs_s.a = `bcd`;
    fs_s.b = 20;
    lo_nodes_exp = null; // TODO(abap2js): CREATE OBJECT lo_nodes_exp.
    lo_nodes_exp.add(`       |      |array  |     | |2`);
    lo_nodes_exp.add(`/      |1     |object |     |1|4`);
    lo_nodes_exp.add(`/1/    |a     |str    |abc  | |0`);
    lo_nodes_exp.add(`/1/    |b     |num    |10   | |0`);
    lo_nodes_exp.add(`/1/    |c     |bool   |false| |0`);
    lo_nodes_exp.add(`/1/    |d     |bool   |false| |0`);
    lo_nodes_exp.add(`/      |2     |object |     |2|4`);
    lo_nodes_exp.add(`/2/    |a     |str    |bcd  | |0`);
    lo_nodes_exp.add(`/2/    |b     |num    |20   | |0`);
    lo_nodes_exp.add(`/2/    |c     |bool   |false| |0`);
    lo_nodes_exp.add(`/2/    |d     |bool   |false| |0`);
    lt_nodes = lcl_abap_to_json.convert({ iv_data: lt_tab });
    cl_abap_unit_assert.assert_equals({ act: lt_nodes, exp: lo_nodes_exp.mt_nodes });
    let lt_strtab = [];
    lt_strtab.push(`abc`);
    lt_strtab.push(`bcd`);
    lo_nodes_exp = null; // TODO(abap2js): CREATE OBJECT lo_nodes_exp.
    lo_nodes_exp.add(`       |      |array  |     | |2`);
    lo_nodes_exp.add(`/      |1     |str    |abc  |1|0`);
    lo_nodes_exp.add(`/      |2     |str    |bcd  |2|0`);
    lt_nodes = lcl_abap_to_json.convert({ iv_data: lt_strtab });
    cl_abap_unit_assert.assert_equals({ act: lt_nodes, exp: lo_nodes_exp.mt_nodes });
  }
}



class ltcl_filter_test {
  mt_visit_history = [];

  keep_node() {
    let ls_visit_history = null;
    if (iv_visit > 0) {
      ls_visit_history.type = z2ui5_cl_util.abap_copy(iv_visit);
      ls_visit_history.path = is_node.path + is_node.name + `/`;
      this.mt_visit_history.push(ls_visit_history);
    }
    rv_keep = (!([...String(is_node.name)].some(($c) => String(`xX`).includes($c))) && !([...String(is_node.value)].some(($c) => String(`xX`).includes($c))));
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
    lo_nodes_exp = null; // TODO(abap2js): CREATE OBJECT lo_nodes_exp.
    lo_nodes_exp.add(`       |      |object |     | |3`);
    lo_nodes_exp.add(`/      |a     |num    |1    | |0`);
    lo_nodes_exp.add(`/      |b     |num    |1    | |0`);
    lo_nodes_exp.add(`/      |c     |object |     | |1`);
    lo_nodes_exp.add(`/c/    |y     |num    |1    | |0`);
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
    lo_nodes_exp = null; // TODO(abap2js): CREATE OBJECT lo_nodes_exp.
    lo_nodes_exp.add(`       |      |array  |     | |10`);
    lo_nodes_exp.add(`/      |1     |str    |a    |1|0`);
    lo_nodes_exp.add(`/      |2     |str    |b    |2|0`);
    lo_nodes_exp.add(`/      |3     |str    |c    |3|0`);
    lo_nodes_exp.add(`/      |4     |str    |d    |4|0`);
    lo_nodes_exp.add(`/      |5     |str    |e    |5|0`);
    lo_nodes_exp.add(`/      |6     |str    |f    |6|0`);
    lo_nodes_exp.add(`/      |7     |str    |g    |7|0`);
    lo_nodes_exp.add(`/      |8     |str    |h    |8|0`);
    lo_nodes_exp.add(`/      |9     |str    |i    |9|0`);
    lo_nodes_exp.add(`/      |10    |str    |j    |10|0`);
    cl_abap_unit_assert.assert_equals({ act: lo_json_filtered.mt_json_tree, exp: lo_nodes_exp.sorted() });
  }

  visit_types() {
    let lo_json = null;
    let lo_json_filtered = null;
    let lt_visits_exp = null;
    // TODO(abap2js): DATA BEGIN OF ls_dummy,
    let d = 0;
    let e = 0;
    // TODO(abap2js): DATA END OF ls_dummy.
    this.mt_visit_history = [];
    lo_json = z2ui5_cl_ajson.create_empty();
    lo_json.touch_array(`/`);
    lo_json.push({ iv_path: `/`, iv_val: `a` });
    lo_json.push({ iv_path: `/`, iv_val: `b` });
    lo_json.push({ iv_path: `/`, iv_val: ls_dummy });
    lo_json_filtered = z2ui5_cl_ajson.create_from({ ii_source_json: lo_json, ii_filter: this });
    lt_visits_exp.push({});
    fs_v.path = `/`;
    fs_v.type = z2ui5_cl_util.abap_copy(z2ui5_if_ajson_filter.visit_type.open);
    lt_visits_exp.push({});
    fs_v.path = `/3/`;
    fs_v.type = z2ui5_cl_util.abap_copy(z2ui5_if_ajson_filter.visit_type.open);
    lt_visits_exp.push({});
    fs_v.path = `/3/`;
    fs_v.type = z2ui5_cl_util.abap_copy(z2ui5_if_ajson_filter.visit_type.close);
    lt_visits_exp.push({});
    fs_v.path = `/`;
    fs_v.type = z2ui5_cl_util.abap_copy(z2ui5_if_ajson_filter.visit_type.close);
    cl_abap_unit_assert.assert_equals({ act: this.mt_visit_history, exp: lt_visits_exp });
  }
}



class ltcl_mapper_test {
  rename_node() {
    if (String(cv_name).substr(0, 1) === `a`) {
      cv_name = cv_name.toUpperCase();
    }
    if (cv_name === `set_this_empty`) {
      cv_name = null;
    }
    if (is_node.index !== 0) {
      cl_abap_unit_assert.fail(`rename must not be called for direct array items`);
    }
  }

  to_abap() {
  }

  to_json() {
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
    lo_nodes_exp = null; // TODO(abap2js): CREATE OBJECT lo_nodes_exp.
    lo_nodes_exp.add(`       |      |object |     | |4`);
    lo_nodes_exp.add(`/      |AB    |num    |1    | |0`);
    lo_nodes_exp.add(`/      |bc    |num    |2    | |0`);
    lo_nodes_exp.add(`/      |c     |object |     | |2`);
    lo_nodes_exp.add(`/c/    |AX    |num    |3    | |0`);
    lo_nodes_exp.add(`/c/    |by    |num    |4    | |0`);
    lo_nodes_exp.add(`/      |A     |object |     | |2`);
    lo_nodes_exp.add(`/A/    |AX    |num    |5    | |0`);
    lo_nodes_exp.add(`/A/    |by    |num    |6    | |0`);
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
    lo_nodes_exp = null; // TODO(abap2js): CREATE OBJECT lo_nodes_exp.
    lo_nodes_exp.add(`       |      |array  |     | |2`);
    lo_nodes_exp.add(`/      |1     |object |     |1|2`);
    lo_nodes_exp.add(`/      |2     |object |     |2|2`);
    lo_nodes_exp.add(`/1/    |AB    |num    |1    | |0`);
    lo_nodes_exp.add(`/1/    |bc    |num    |2    | |0`);
    lo_nodes_exp.add(`/2/    |AX    |num    |3    | |0`);
    lo_nodes_exp.add(`/2/    |by    |num    |4    | |0`);
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
    } catch (lx_err) {
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
    lo_nodes_exp = null; // TODO(abap2js): CREATE OBJECT lo_nodes_exp.
    lo_nodes_exp.add(`       |      |num    |1    | |0`);
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
    } catch (lx_err) {
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
    lo_nodes_exp = null; // TODO(abap2js): CREATE OBJECT lo_nodes_exp.
    lo_nodes_exp.add(`       |      |object |     | |2`);
    lo_nodes_exp.add(`/      |ab    |num    |1    | |0`);
    lo_nodes_exp.add(`/      |xy    |num    |2    | |0`);
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
    lo_nodes_exp = null; // TODO(abap2js): CREATE OBJECT lo_nodes_exp.
    lo_nodes_exp.add(`       |      |object |     | |1`);
    lo_nodes_exp.add(`/      |ab    |num    |1    | |0`);
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
    lo_nodes_exp = null; // TODO(abap2js): CREATE OBJECT lo_nodes_exp.
    lo_nodes_exp.add(`       |      |object |     | |2`);
    lo_nodes_exp.add(`/      |AB    |num    |1    | |0`);
    lo_nodes_exp.add(`/      |xy    |num    |2    | |0`);
    cl_abap_unit_assert.assert_equals({ act: li_json_new.mt_json_tree, exp: lo_nodes_exp.sorted() });
  }

  rename_node() {
    if (String(cv_name).substr(0, 1) === `a`) {
      cv_name = cv_name.toUpperCase();
    }
  }

  to_abap() {
  }

  to_json() {
  }

  keep_node() {
    rv_keep = (!is_node.name || String(is_node.name).substr(0, 1) !== `x`);
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
    lo_nodes_exp = null; // TODO(abap2js): CREATE OBJECT lo_nodes_exp.
    lo_nodes_exp.add(`       |      |object |     | |2`);
    lo_nodes_exp.add(`/      |AB    |num    |1    | |0`);
    lo_nodes_exp.add(`/      |bc    |num    |2    | |0`);
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
    let lt_refs = null;
    let ls_refs = null;
    let ls_data = null;
    let ls_mock = null;
    let lo_nodes = null;
    lo_nodes = null; // TODO(abap2js): CREATE OBJECT lo_nodes.
    lo_nodes.add(`        |           |object |                          | `);
    lo_nodes.add(`/       |str        |str    |hello                     | `);
    lo_nodes.add(`/       |int        |num    |42                        | `);
    ls_refs.path = `/`;
    ls_refs.name = `str`;
    // TODO(abap2js): GET REFERENCE OF ls_data-str INTO ls_refs-dref.
    lt_refs.push(ls_refs);
    ls_refs.name = `int`;
    // TODO(abap2js): GET REFERENCE OF ls_data-int INTO ls_refs-dref.
    lt_refs.push(ls_refs);
    li_refs = z2ui5_cl_ajson_refinitlib.create_path_refs_init(lt_refs);
    lo_cut = null; // TODO(abap2js): CREATE OBJECT lo_cut EXPORTING ii_refs_initiator = li_refs.
    lo_cut.to_abap({ it_nodes: lo_nodes.sorted(), c_container: ls_mock });
    cl_abap_unit_assert.assert_equals({ act: ls_data.str, exp: `hello` });
    cl_abap_unit_assert.assert_equals({ act: ls_data.int, exp: 42 });
  }

  to_abap_data_ref_table() {
    let lo_cut = null;
    let li_refs = null;
    let lt_refs = null;
    let ls_refs = null;
    let ls_data = null;
    let ls_mock = null;
    let lt_exp = [];
    let lo_nodes = null;
    lo_nodes = null; // TODO(abap2js): CREATE OBJECT lo_nodes.
    lo_nodes.add(`        |           |object |                          | `);
    lo_nodes.add(`/       |itab       |array  |                          | `);
    lo_nodes.add(`/itab/  |1          |str    |one                       |1`);
    lo_nodes.add(`/itab/  |2          |str    |two                       |2`);
    ls_refs.path = `/`;
    ls_refs.name = `itab`;
    // TODO(abap2js): GET REFERENCE OF ls_data-itab INTO ls_refs-dref.
    lt_refs.push(ls_refs);
    li_refs = z2ui5_cl_ajson_refinitlib.create_path_refs_init(lt_refs);
    lo_cut = null; // TODO(abap2js): CREATE OBJECT lo_cut EXPORTING ii_refs_initiator = li_refs.
    lo_cut.to_abap({ it_nodes: lo_nodes.sorted(), c_container: ls_mock });
    lt_exp.push(`one`);
    lt_exp.push(`two`);
    cl_abap_unit_assert.assert_equals({ act: ls_data.itab, exp: lt_exp });
  }

  to_abap_data_ref_negative() {
    let lo_cut = null;
    let li_refs = null;
    let lt_refs = null;
    let ls_mock = null;
    let lo_nodes = null;
    let lx = null;
    lo_nodes = null; // TODO(abap2js): CREATE OBJECT lo_nodes.
    lo_nodes.add(`        |           |object |                          | `);
    lo_nodes.add(`/       |itab       |array  |                          | `);
    lo_nodes.add(`/itab/  |1          |str    |one                       |1`);
    li_refs = z2ui5_cl_ajson_refinitlib.create_path_refs_init(lt_refs);
    try {
      lo_cut = null; // TODO(abap2js): CREATE OBJECT lo_cut EXPORTING ii_refs_initiator = li_refs.
      lo_cut.to_abap({ it_nodes: lo_nodes.sorted(), c_container: ls_mock });
      cl_abap_unit_assert.fail();
    } catch (lx) {
      cl_abap_unit_assert.assert_equals({ act: lx.message, exp: `Cannot use initial data ref` });
    }
  }

  to_abap_data_ref_no_initiator() {
    let lo_cut = null;
    let ls_mock = null;
    let lo_nodes = null;
    let lx = null;
    lo_nodes = null; // TODO(abap2js): CREATE OBJECT lo_nodes.
    lo_nodes.add(`        |           |object |                          | `);
    lo_nodes.add(`/       |itab       |array  |                          | `);
    lo_nodes.add(`/itab/  |1          |str    |one                       |1`);
    try {
      lo_cut = null; // TODO(abap2js): CREATE OBJECT lo_cut.
      lo_cut.to_abap({ it_nodes: lo_nodes.sorted(), c_container: ls_mock });
      cl_abap_unit_assert.fail();
    } catch (lx) {
      cl_abap_unit_assert.assert_equals({ act: lx.message, exp: `Missing ref initiator` });
    }
  }
}



module.exports = {
  __main: "z2ui5_cl_ajson",
  __classes: { lcl_nodes_helper, ltcl_parser_test, ltcl_serializer_test, ltcl_utils_test, ltcl_reader_test, ltcl_json_to_abap, ltcl_writer_test, ltcl_integrated, ltcl_abap_to_json, ltcl_filter_test, ltcl_mapper_test, ltcl_cloning_test, ltcl_data_ref_test },
  __tests: {"ltcl_parser_test":["parse","parse_keeping_order","parse_string","parse_number","parse_float","parse_boolean","parse_false","parse_null","parse_date","parse_bare_values","parse_error","parse_input_xstring","parse_input_string","parse_input_string_table","parse_input_error","duplicate_key","non_json","special_characters_in_name","special_characters_in_path","special_characters_in_value","unicode_characters","parse_empty_object","parse_empty_string"],"ltcl_serializer_test":["stringify_condensed","stringify_indented","array_index","item_order","simple_indented","empty_set","escape_string","empty"],"ltcl_utils_test":["normalize_path","split_path","validate_array_index","string_to_xstring_utf8"],"ltcl_reader_test":["get_value","get_node_type","exists","value_integer","value_number","value_boolean","value_string","members","slice","array_to_string_table","get_date","get_timestamp","get_timestampl"],"ltcl_json_to_abap":["to_abap_struc","to_abap_timestamp_initial","to_abap_timestamp_long","to_abap_value","to_abap_array","to_abap_array_of_arrays_simple","to_abap_array_of_arrays","to_abap_w_tab_of_struc","to_abap_w_plain_tab","to_abap_hashed_tab","to_abap_sorted_tab","to_abap_hashed_plain_tab","to_abap_negative","to_abap_corresponding","to_abap_corresponding_negative","to_abap_corresponding_public","to_abap_corresponding_pub_neg","to_abap_time","to_abap_str_to_packed","to_abap_compressed_stdrd","to_abap_compressed_stdrd_key","to_abap_compressed_sort","to_abap_compressed_sort_unique","to_abap_compressed_hash"],"ltcl_writer_test":["set_ajson","set_value","ignore_empty","set_obj","set_obj_w_date_time","set_tab","set_tab_hashed","set_tab_nested_struct","set_ref_to_data","set_ref_to_data_struct","prove_path_exists","delete_subtree","delete","arrays","arrays_negative","root_assignment","set_bool_abap_bool","set_bool_int","set_bool_tab","set_str","set_int","set_number","set_date","set_timestamp","set_timestampl","set_utclong","read_only","set_array_obj","set_with_type","new_array_w_keep_order_touch","overwrite_w_keep_order_touch","overwrite_w_keep_order_set","setx","setx_float","setx_complex","setx_complex_w_keep_order"],"ltcl_integrated":["reader","array_index","array_simple","stringify","item_order_integrated","chaining","push_json","is_empty"],"ltcl_abap_to_json":["set_ajson","set_value_number","set_value_string","set_value_true","set_value_false","set_value_xsdboolean","set_value_timestamp","set_value_timestamp_initial","set_value_timestampl","set_value_timestampl_initial","set_null","set_obj","set_array","set_complex_obj","set_include_with_suffix","prefix"],"ltcl_filter_test":["simple_test","array_test","visit_types"],"ltcl_mapper_test":["simple_test","array_test","duplication_test","empty_name_test","trivial"],"ltcl_cloning_test":["clone_test","filter_test","mapper_test","mapper_and_filter","opts_copying"],"ltcl_data_ref_test":["to_abap_data_ref","to_abap_data_ref_table","to_abap_data_ref_negative","to_abap_data_ref_no_initiator"]},
};
