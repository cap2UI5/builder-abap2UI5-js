
class z2ui5_cl_ui5_json {
  mi_json = null;

  static factory({ val } = {}) {
    let result = null;
    let x;
    try {
      result = new z2ui5_cl_ui5_json();
      result.mi_json = z2ui5_cl_ajson.parse(val);
    } catch (_caught1) {
      x = _caught1;
      throw new z2ui5_cx_ui5_util_error({ val: x });
    }
    return result;
  }

  get_string({ path } = {}) {
    let result = ``;
    const lv_path = (path);
    result = this.mi_json.get_string(lv_path);
    return result;
  }

  get_integer({ path } = {}) {
    let result = 0;
    const lv_path = (path);
    try {
      if (this.mi_json.get_node_type(lv_path) !== z2ui5_if_ajson_types.node_type.number) {
        return result;
      }
      let lv_number = 0;
      lv_number = this.mi_json.get_string(lv_path);
      if (lv_number > 2147483647 || lv_number < - 2147483648) {
        return result;
      }
      result = this.mi_json.get_integer(lv_path);
    } catch (error) {
      result = 0;
    }
    return result;
  }

  get_boolean({ path } = {}) {
    let result = false;
    const lv_path = (path);
    if (this.mi_json.get_node_type(lv_path) === z2ui5_if_ajson_types.node_type.boolean) {
      result = this.mi_json.get_boolean(lv_path);
    }
    return result;
  }

  exists({ path } = {}) {
    let result = false;
    const lv_path = (path);
    result = this.mi_json.exists(lv_path);
    return result;
  }

  members({ path } = {}) {
    let result = [];
    const lv_path = (path);
    result = this.mi_json.members(lv_path);
    return result;
  }
}

module.exports = z2ui5_cl_ui5_json;

const z2ui5_cl_ajson = require("abap2UI5/z2ui5_cl_ajson");
const z2ui5_cx_ui5_util_error = require("abap2UI5/z2ui5_cx_ui5_util_error");
const z2ui5_if_ajson_types = require("abap2UI5/z2ui5_if_ajson_types");

