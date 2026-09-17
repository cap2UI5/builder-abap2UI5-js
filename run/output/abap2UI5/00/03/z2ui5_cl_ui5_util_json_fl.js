
class z2ui5_cl_ui5_util_json_fl {
  static gi_no_empty_values = null;
  static gi_mapper_upper = null;

  static create_no_empty_values() {
    let result = null;
    if (z2ui5_cl_ui5_util_json_fl.gi_no_empty_values == null) {
      z2ui5_cl_ui5_util_json_fl.gi_no_empty_values = new z2ui5_cl_ui5_util_json_fl();
    }
    result = z2ui5_cl_ui5_util_json_fl.gi_no_empty_values;
    return result;
  }

  static mapper_upper() {
    let result = null;
    if (z2ui5_cl_ui5_util_json_fl.gi_mapper_upper == null) {
      z2ui5_cl_ui5_util_json_fl.gi_mapper_upper = z2ui5_cl_ajson_mapping.create_upper_case();
    }
    result = z2ui5_cl_ui5_util_json_fl.gi_mapper_upper;
    return result;
  }

  keep_node({ is_node, iv_visit = z2ui5_if_ajson_filter.visit_type.value } = {}) {
    let rv_keep = false;
    rv_keep = true;
    switch (iv_visit) {
      case z2ui5_if_ajson_filter.visit_type.value:
        switch (is_node.type) {
          case z2ui5_if_ajson_types.node_type.boolean:
            rv_keep = (is_node.value !== `false`);
            break;
          case z2ui5_if_ajson_types.node_type.number:
            rv_keep = (![...String(is_node.value)].every(($c) => String(`0.-+Ee`).includes($c)));
            break;
          case z2ui5_if_ajson_types.node_type.string:
            rv_keep = (is_node.value !== ``);
            break;
        }
        break;
      case z2ui5_if_ajson_filter.visit_type.close:
        rv_keep = (is_node.children !== 0);
        break;
    }
    return rv_keep;
  }
}

module.exports = z2ui5_cl_ui5_util_json_fl;

const z2ui5_cl_ajson_mapping = require("abap2UI5/z2ui5_cl_ajson_mapping");
const z2ui5_if_ajson_filter = require("abap2UI5/z2ui5_if_ajson_filter");
const z2ui5_if_ajson_types = require("abap2UI5/z2ui5_if_ajson_types");

