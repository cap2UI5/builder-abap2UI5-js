
class z2ui5_cl_ui5_view_builder {
  static gv_escape_specials = ``;
  static gv_escape_controls = ``;

  name = ``;
  prefix = ``;
  t_pair = [];
  t_child = [];
  parent = null;
  root = null;

  static factory() {
    let result = null;
    result = new z2ui5_cl_ui5_view_builder();
    result.root = z2ui5_cl_util.abap_tab_assign(result.root, z2ui5_cl_util.abap_copy(result));
    return result;
  }

  ele({ n, ns = `` } = {}) {
    let result = null;
    result = new z2ui5_cl_ui5_view_builder();
    result.root = this.root;
    result.parent = z2ui5_cl_util.abap_tab_assign(result.parent, z2ui5_cl_util.abap_copy(this));
    result.name = z2ui5_cl_util.abap_tab_assign(result.name, z2ui5_cl_util.abap_copy(n));
    result.prefix = z2ui5_cl_util.abap_tab_assign(result.prefix, z2ui5_cl_util.abap_copy(ns));
    this.t_child.push(z2ui5_cl_util.abap_copy(result));
    return result;
  }

  tag({ n, ns = `` } = {}) {
    let result = null;
    this.ele({ n, ns });
    result = z2ui5_cl_util.abap_tab_assign(result, z2ui5_cl_util.abap_copy(this));
    return result;
  }

  a({ n, v, b } = {}) {
    let result = null;
    let target;
    if (!(!z2ui5_cl_util.abap_is_initial(this.name) || !z2ui5_cl_util.abap_is_initial(this.t_child))) throw new Error(`ASSERT failed`);
    if (!(v !== undefined || b !== undefined)) throw new Error(`ASSERT failed`);
    let val = z2ui5_cl_util.abap_copy(v);
    if (b !== undefined) {
      if (!(z2ui5_cl_util.abap_is_initial(v))) throw new Error(`ASSERT failed`);
      val = ((b === true || b === `X`) ? `true` : `false`);
    }
    if (z2ui5_cl_util.abap_is_initial(this.t_child)) {
      if (!(!this.t_pair.some((row) => row.n === n))) throw new Error(`ASSERT failed`);
      this.t_pair.push(z2ui5_cl_util.abap_copy({ n: n, v: val }));
    } else {
      target = z2ui5_cl_util.abap_copy(this.t_child[(this.t_child.length) - 1]);
      if (!(!target.t_pair.some((row) => row.n === n))) throw new Error(`ASSERT failed`);
      target.t_pair.push(z2ui5_cl_util.abap_copy({ n: n, v: val }));
    }
    result = z2ui5_cl_util.abap_tab_assign(result, z2ui5_cl_util.abap_copy(this));
    return result;
  }

  end() {
    let result = null;
    if (!(this.parent != null)) throw new Error(`ASSERT failed`);
    result = this.parent;
    return result;
  }

  render_into(_args = {}) {
    let { ct_out } = _args;
    let sy_tabix = 0;
    let child = null;
    if (z2ui5_cl_util.abap_is_initial(this.name)) {
      sy_tabix = 0;
      for (const child of this.t_child) {
        sy_tabix++;
        const _out0 = { ct_out };
        child.render_into(_out0);
        if ("ct_out" in _out0) ct_out = _out0.ct_out;
      }
      Object.assign(_args, { ct_out });
      return;
    }
    const qname = (z2ui5_cl_util.abap_is_initial(this.prefix) ? this.name : `${this.prefix}:${this.name}`);
    let lt_attr = [];
    sy_tabix = 0;
    for (const lr_pair of this.t_pair) {
      sy_tabix++;
      lt_attr.push(z2ui5_cl_util.abap_copy(` ${lr_pair.n}="${this.xml_escape({ val: lr_pair.v })}"`));
    }
    const attrs = lt_attr.join(``);
    if (z2ui5_cl_util.abap_is_initial(this.t_child)) {
      ct_out.push(z2ui5_cl_util.abap_copy(`<${qname}${attrs}/>`));
      Object.assign(_args, { ct_out });
      return;
    }
    ct_out.push(z2ui5_cl_util.abap_copy(`<${qname}${attrs}>`));
    sy_tabix = 0;
    for (const child of this.t_child) {
      sy_tabix++;
      const _out1 = { ct_out };
      child.render_into(_out1);
      if ("ct_out" in _out1) ct_out = _out1.ct_out;
    }
    ct_out.push(z2ui5_cl_util.abap_copy(`</${qname}>`));
    Object.assign(_args, { ct_out });
  }

  xml_escape({ val } = {}) {
    let result = ``;
    let lv_off;
    let lv_len;
    if (z2ui5_cl_util.abap_is_initial(z2ui5_cl_ui5_view_builder.gv_escape_specials)) {
      z2ui5_cl_ui5_view_builder.gv_escape_controls = z2ui5_cl_ui5_util_context.conv_get_string_by_xstring({ val: (`0102030405060708` + `0B0C` + `0E0F101112131415161718191A1B1C1D1E1F`) });
      z2ui5_cl_ui5_view_builder.gv_escape_specials = `&<>"` + z2ui5_cl_ui5_util_context.cv_char_util_newline + String(z2ui5_cl_ui5_util_context.cv_char_util_cr_lf)
        .substr(0, 1) + z2ui5_cl_ui5_util_context.cv_char_util_horizontal_tab + z2ui5_cl_ui5_view_builder.gv_escape_controls;
    }
    if (![...String(val)].some(($c) => String(z2ui5_cl_ui5_view_builder.gv_escape_specials).includes($c))) {
      result = z2ui5_cl_util.abap_tab_assign(result, z2ui5_cl_util.abap_copy(val));
      return result;
    }
    result = z2ui5_cl_util.abap_tab_assign(result, z2ui5_cl_util.abap_copy(val));
    result = result.replaceAll(`&`, `&amp;`);
    result = result.replaceAll(`<`, `&lt;`);
    result = result.replaceAll(`>`, `&gt;`);
    result = result.replaceAll(`"`, `&quot;`);
    result = result.replaceAll(z2ui5_cl_ui5_util_context.cv_char_util_newline, `&#xA;`);
    result = result.replaceAll(String(z2ui5_cl_ui5_util_context.cv_char_util_cr_lf).substr(0, 1), `&#xD;`);
    result = result.replaceAll(z2ui5_cl_ui5_util_context.cv_char_util_horizontal_tab, `&#x9;`);
    if ([...String(result)].some(($c) => String(z2ui5_cl_ui5_view_builder.gv_escape_controls).includes($c))) {
      lv_off = 0;
      lv_len = z2ui5_cl_util.abap_copy(z2ui5_cl_ui5_view_builder.gv_escape_controls.length);
      while (lv_off < lv_len) {
        result = result.replaceAll(String(z2ui5_cl_ui5_view_builder.gv_escape_controls).substr(lv_off, 1), ``);
        lv_off = lv_off + 1;
      }
    }
    return result;
  }

  stringify() {
    let result = ``;
    let lt_out = [];
    const _out0 = { ct_out: lt_out };
    this.root.render_into(_out0);
    if ("ct_out" in _out0) lt_out = _out0.ct_out;
    result = lt_out.join(``);
    return result;
  }

  static escape_literal({ val } = {}) {
    let result = ``;
    result = z2ui5_cl_util.abap_tab_assign(result, z2ui5_cl_util.abap_copy(val));
    if (![...String(result)].some(($c) => String(`{}`).includes($c))) {
      return result;
    }
    result = result.replaceAll(`\\`, `\\\\`);
    result = result.replaceAll(`{`, `\\{`);
    result = result.replaceAll(`}`, `\\}`);
    return result;
  }
}

module.exports = z2ui5_cl_ui5_view_builder;

const z2ui5_cl_ui5_util_context = require("abap2UI5/z2ui5_cl_ui5_util_context");
const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");

// abap PREFERRED PARAMETER call style — see z2ui5_preferred_param.js
require("abap2UI5/z2ui5_preferred_param")(z2ui5_cl_ui5_view_builder, {
  ele: { preferred: `n`, params: [`n`, `ns`] },
  tag: { preferred: `n`, params: [`n`, `ns`] },
  a: { preferred: `n`, params: [`n`, `v`, `b`] },
  escape_literal: { preferred: `val`, params: [`val`] },
  xml_escape: { preferred: `val`, params: [`val`] },
});

