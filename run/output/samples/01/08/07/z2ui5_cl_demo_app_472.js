const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_472 extends z2ui5_if_app {
  rs1_value = ``;
  rs1_value2 = ``;
  rs2_value = ``;
  rs2_value2 = ``;
  rs3_value = ``;
  rs3_value2 = ``;
  rs4_value = ``;
  rs4_value2 = ``;
  rs5_value = ``;
  rs5_value2 = ``;

  view_display({ client } = {}) {
    const view = z2ui5_cl_xml_view.factory();
    const page = view.shell()
      .page({ title: `abap2UI5 - Sample: RangeSlider`, navbuttonpress: client._event_nav_app_leave(), shownavbutton: client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.m.RangeSlider/sample/sap.m.sample.RangeSlider` });
    const layout = page.vertical_layout({ class: `sapUiContentPadding`, width: `100%` });
    layout.text({ text: `RangeSlider with text fields`, class: `sapUiSmallMarginBottom` });
    layout.range_slider({ value: client._bind_edit(this.rs1_value), value2: client._bind_edit(this.rs1_value2), min: `0`, max: `100`, width: `80%`, class: `sapUiMediumMarginBottom` })
      .get()
      ._generic_property({ n: `showAdvancedTooltip`, v: `true` });
    layout.range_slider({ value: client._bind_edit(this.rs2_value), value2: client._bind_edit(this.rs2_value2), min: `-50`, max: `50`, width: `10rem`, class: `sapUiMediumMarginBottom` })
      .get()
      ._generic_property({ n: `showAdvancedTooltip`, v: `true` });
    layout.range_slider({ value: client._bind_edit(this.rs3_value), value2: client._bind_edit(this.rs3_value2), min: `0`, max: `100`, width: `10rem`, class: `sapUiMediumMarginBottom` })
      .get()
      ._generic_property({ n: `showAdvancedTooltip`, v: `true` });
    layout.range_slider({ value: client._bind_edit(this.rs4_value), value2: client._bind_edit(this.rs4_value2), min: `-1000`, max: `1000`, width: `100%`, class: `sapUiMediumMarginBottom` })
      .get()
      ._generic_property({ n: `showAdvancedTooltip`, v: `true` });
    layout.range_slider({ value: client._bind_edit(this.rs5_value), value2: client._bind_edit(this.rs5_value2), min: `0`, max: `500`, width: `100%`, class: `sapUiLargeMarginBottom` })
      .get()
      ._generic_property({ n: `showAdvancedTooltip`, v: `true` });
    layout.text({ text: `RangeSlider with inputs`, class: `sapUiSmallMarginBottom` });
    layout.range_slider({ value: `0`, value2: `100`, min: `0`, max: `500`, width: `100%`, class: `sapUiLargeMarginBottom` })
      .get()
      ._generic_property({ n: `showAdvancedTooltip`, v: `true` })
      ._generic_property({ n: `showHandleTooltip`, v: `false` })
      ._generic_property({ n: `inputsAsTooltips`, v: `true` });
    layout.text({ text: `RangeSlider with tickmarks`, class: `sapUiSmallMarginBottom` });
    layout.range_slider({ showtickmarks: true, value: `0`, value2: `10`, min: `0`, max: `10`, class: `sapUiMediumMarginBottom` })
      .get()
      ._generic_property({ n: `showAdvancedTooltip`, v: `true` });
    layout.range_slider({ showtickmarks: true, class: `sapUiMediumMarginBottom` })
      .get()
      ._generic_property({ n: `showAdvancedTooltip`, v: `true` });
    layout.text({ text: `RangeSlider with tickmarks and step '5'`, class: `sapUiSmallMarginBottom` });
    layout.range_slider({ showtickmarks: true, min: `-100`, max: `100`, step: `5`, class: `sapUiLargeMarginBottom` })
      .get()
      ._generic_property({ n: `showAdvancedTooltip`, v: `true` });
    layout.text({ text: `RangeSlider with tickmarks and labels`, class: `sapUiSmallMarginBottom` });
    layout.range_slider({ showtickmarks: true, value: `5`, value2: `20`, min: `0`, max: `30`, class: `sapUiSmallMarginBottom` })
      .get()
      ._generic_property({ n: `showAdvancedTooltip`, v: `true` })
      .responsive_scale({ tickmarksbetweenlabels: `3` });
    client.view_display(view.stringify());
  }

  async main(client) {
    if (client.check_on_init()) {
      this.rs1_value = `0`;
      this.rs1_value2 = `100`;
      this.rs2_value = `-50`;
      this.rs2_value2 = `50`;
      this.rs3_value = `20`;
      this.rs3_value2 = `80`;
      this.rs4_value = `-500`;
      this.rs4_value2 = `500`;
      this.rs5_value = `0`;
      this.rs5_value2 = `500`;
      this.view_display({ client: client });
    }
  }
}

module.exports = z2ui5_cl_demo_app_472;
