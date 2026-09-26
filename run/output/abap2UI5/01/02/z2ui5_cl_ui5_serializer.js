
class z2ui5_cl_ui5_serializer {
  model_for({ container } = {}) {
    let result = null;
    result = new z2ui5_cl_ui5_srv_model({ attri: container.mt_attri, app: container.mo_app });
    return result;
  }

  narrow({ container } = {}) {
    let result = null;
    result = container;
    return result;
  }

  xml_of({ container } = {}) {
    let result = ``;
    result = z2ui5_cl_ui5_util_context.xml_stringify({ any: container });
    return result;
  }

  parse({ val } = {}) {
    let result = null;
    let lo_cont = null;
    const _out0 = { xml: val, any: lo_cont };
    z2ui5_cl_ui5_util_context.xml_parse(_out0);
    if ("any" in _out0) lo_cont = _out0.any;
    result = lo_cont;
    return result;
  }

  stringify({ container } = {}) {
    let result = ``;
    const lo_cont = this.narrow({ container: container });
    const lo_model = this.model_for({ container: lo_cont });
    let lx_first = null;
    try {
      lo_model.main_attri_db_save_srtti();
      result = this.xml_of({ container: lo_cont });
      lo_model.main_attri_reattach();
      return result;
    } catch (_caught1) {
      lx_first = _caught1;
      lo_model.main_attri_reattach();
    }
    try {
      lo_model.main_attri_refresh();
      lo_model.main_attri_db_save_srtti();
      result = this.xml_of({ container: lo_cont });
      lo_model.main_attri_reattach();
      return result;
    } catch (error) {
      lo_model.main_attri_reattach();
    }
    throw new z2ui5_cx_ui5_util_error({ val: `APP_SERIALIZATION_ERROR - the app state could not be serialized. ` + `Please check if all generic data references are public attributes of your class`, previous: lx_first });
    return result;
  }
}

module.exports = z2ui5_cl_ui5_serializer;

const z2ui5_cl_ui5_srv_model = require("abap2UI5/z2ui5_cl_ui5_srv_model");
const z2ui5_cl_ui5_util_context = require("abap2UI5/z2ui5_cl_ui5_util_context");
const z2ui5_cx_ui5_util_error = require("abap2UI5/z2ui5_cx_ui5_util_error");

