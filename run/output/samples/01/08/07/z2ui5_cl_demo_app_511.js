const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_511 extends z2ui5_if_app {
  color_set = ``;
  client = null;

  async main(client) {
    this.client = z2ui5_cl_util.abap_copy(client);
    if (client.check_on_init()) {
      this.color_set = `ColorSet5`;
      this.view_display();
    }
  }

  view_display() {
    let color_set_key;
    const morbi_text = `Morbi id ullamcorper lorem, vestibulum facilisis velit. Ut elementum aliquam nisl a pretium. ` + `Donec auctor mattis convallis. Aenean sodales tortor nec facilisis fringilla. Nam feugiat nulla at diam sollicitudin pretium. ` + `Sed at lacus volutpat, finibus arcu ultricies, convallis elit. Aliquam sollicitudin tortor sit amet mi consequat fringilla. ` + `Fusce nisl leo, tempor et nulla id, pellentesque suscipit augue. Morbi cursus molestie tellus. ` + `Ut volutpat orci interdum, condimentum risus sed, iaculis tellus. Proin nisi eros, tristique nec tortor quis, suscipit sodales dui.`;
    const form_text = `Donec bibendum diam nibh, sit amet ornare ante fermentum sed. Ut vulputate justo at orci sollicitudin, ` + `in gravida lectus aliquam. Vivamus tortor lorem, semper et diam ac, faucibus suscipit metus. ` + `Curabitur eget aliquet purus, id vestibulum sapien. Cras vitae imperdiet felis. ` + `Fusce placerat velit orci, at tempor nisl aliquam laoreet. Aliquam in sapien sit amet tortor laoreet feugiat id in ligula.`;
    const view = z2ui5_cl_xml_view.factory();
    const page = view.shell()
      .page({ title: `abap2UI5 - Sample: Block Layout with custom background color set for the cells`, navbuttonpress: this.client._event_nav_app_leave(), shownavbutton: this.client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.ui.layout.BlockLayout/sample/sap.ui.layout.sample.BlockLayoutCustomBackground` });
    const vbox = page.vbox();
    const select = vbox.hbox({ alignitems: `Center`, class: `sapUiContentPadding` })
      .label({ text: `Color set for all cells`, class: `sapUiTinyMarginEnd` })
      .select({ selectedkey: this.client._bind_edit(this.color_set) });
    for (let sy_index = 1; sy_index <= 11; sy_index++) {
      color_set_key = `ColorSet${sy_index}`;
      select.item({ key: color_set_key, text: (sy_index === 11 ? `${color_set_key} (transparent in SAP Horizon theme)` : color_set_key) });
    }
    const block_layout = vbox.block_layout();
    block_layout.block_layout_row()
      .block_layout_cell({ title: `Cells with Custom Color (Shade A)`, backgroundcolorset: this.client._bind_edit(this.color_set), backgroundcolorshade: `ShadeA` });
    block_layout.block_layout_row()
      .block_layout_cell({ title: `The Title`, titlealignment: `Center` })
      .text(`Donec bibendum diam nibh, sit amet ornare ante fermentum sed. Ut vulputate justo at orci sollicitudin.`)
      .get_parent()
      .block_layout_cell({ title: `An Icon (Shade B)`, backgroundcolorset: this.client._bind_edit(this.color_set), backgroundcolorshade: `ShadeB` })
      .icon({ src: `sap-icon://add-activity` });
    block_layout.block_layout_row()
      .block_layout_cell({ title: `Simple Form (Shade C)`, backgroundcolorset: this.client._bind_edit(this.color_set), backgroundcolorshade: `ShadeC` })
      .simple_form({ editable: true, backgrounddesign: `Transparent`, layout: `ResponsiveGridLayout` })
      .content(`form`)
      .label(`sap.m.Input`)
      .input({ type: `Text`, placeholder: `Enter Name ...` })
      .label(`sap.m.TextArea`)
      .text_area({ placeholder: `Please add your comment...`, rows: `6`, maxlength: `255`, width: `100%` })
      .label(`sap.m.Text`)
      .text(form_text);
    block_layout.block_layout_row()
      .block_layout_cell({ title: `Right Aligned Title (Shade D)`, titlealignment: `Right`, backgroundcolorset: this.client._bind_edit(this.color_set), backgroundcolorshade: `ShadeD` })
      .text(morbi_text);
    block_layout.block_layout_row()
      .block_layout_cell({ title: `Left Aligned Title (Shade E - Only Available for SAP Quartz and Horizon Themes)`, titlealignment: `Left`, backgroundcolorset: this.client._bind_edit(this.color_set), backgroundcolorshade: `ShadeE` })
      .text(morbi_text);
    block_layout.block_layout_row()
      .block_layout_cell({ title: `Default Aligned Title (Shade F - Only Available for SAP Quartz and Horizon Themes)`, backgroundcolorset: this.client._bind_edit(this.color_set), backgroundcolorshade: `ShadeF` })
      .text(morbi_text);
    this.client.view_display(view.stringify());
  }
}

module.exports = z2ui5_cl_demo_app_511;
