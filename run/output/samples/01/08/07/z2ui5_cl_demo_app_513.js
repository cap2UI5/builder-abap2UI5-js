const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_513 extends z2ui5_if_app {
  selected_background = ``;
  slider_value = ``;
  container_width = ``;

  view_display({ client } = {}) {
    const text_long = `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, ` + `sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est ` + `Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr.`;
    const text_short = `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, ` + `sed diam voluptua.`;
    const strip_text = `Note: Usage of Disabled, Emphasized or Subtle links as titles is not recommended. Dark background designs, for example Accent, ` + `are not fully supported with regards to Accessibility when used with links as titles.`;
    const page = z2ui5_cl_xml_view.factory()
      .shell()
      .page({ title: `abap2UI5 - Sample: Block Layout with links as titles`, navbuttonpress: client._event_nav_app_leave(), shownavbutton: client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.ui.layout.BlockLayout/sample/sap.ui.layout.sample.BlockLayoutLinkTitle` });
    const form = page.simple_form({ editable: true, backgrounddesign: `Transparent`, layout: `ResponsiveGridLayout` })
      .content(`form`);
    form.label(`Parent width`);
    form.slider({ id: `widthSlider`, value: client._bind_edit(this.slider_value), livechange: client._event(`SLIDER_MOVED`) });
    form.label({ id: `backgroundLabel`, text: `Background` });
    const segmented_button = form.segmented_button(client._bind_edit(this.selected_background));
    segmented_button._generic_property({ n: `ariaDescribedBy`, v: `backgroundLabel` });
    segmented_button._generic_property({ n: `ariaLabelledBy`, v: `backgroundLabel` });
    segmented_button.items()
      .segmented_button_item({ key: `Default`, text: `Default` })
      .segmented_button_item({ key: `Light`, text: `Light` })
      .segmented_button_item({ key: `Dashboard`, text: `Dashboard` });
    page.message_strip({ type: `Warning`, text: strip_text, class: `sapUiSmallMarginBeginEnd sapUiSmallMarginTop` });
    const block = page.vertical_layout({ id: `containerLayout`, width: client._bind(this.container_width) })
      .block_layout({ id: `BlockLayout`, background: client._bind_edit(this.selected_background) });
    const row_1 = block.block_layout_row();
    row_1._generic_property({ n: `accentCells`, v: `Accent1` });
    row_1.block_layout_cell({ id: `Accent1`, width: `2`, title: `Left aligned heading` })
      .text(text_long)
      ._generic({ name: `titleLink`, ns: `layout` })
      .link({ text: `This is a title link`, href: `https://sdk.openui5.org/` });
    row_1.block_layout_cell({ title: `This is just a title` }).text(text_long);
    row_1.block_layout_cell({ titlealignment: `End`, title: `End aligned heading` })
      .text(text_short)
      ._generic({ name: `titleLink`, ns: `layout` })
      .link({ text: `This is a title link - wrapping true`, href: `https://sdk.openui5.org/`, wrapping: true });
    const row_2 = block.block_layout_row();
    row_2.block_layout_cell({ title: `This is just a title` }).text(text_long);
    row_2.block_layout_cell({ title: `25% width cell` })
      .text(text_long)
      ._generic({ name: `titleLink`, ns: `layout` })
      .link({ text: `This is a title link`, href: `https://sdk.openui5.org/` });
    row_2.block_layout_cell({ title: `25% width cell` })
      .text(text_long)
      ._generic({ name: `titleLink`, ns: `layout` })
      .link({ text: `This is a title link - open in new window`, href: `https://sdk.openui5.org/`, target: `_blank` });
    row_2.block_layout_cell({ title: `25% width cell` })
      .text(text_long)
      ._generic({ name: `titleLink`, ns: `layout` })
      .link({ text: `This is a title link - wrapping true`, href: `https://sdk.openui5.org/`, wrapping: true });
    client.view_display(page.stringify());
  }

  async main(client) {
    if (client.check_on_init()) {
      this.selected_background = `Default`;
      this.slider_value = `100`;
      this.container_width = `100%`;
      this.view_display({ client: client });
    } else if (client.check_on_event(`SLIDER_MOVED`)) {
      this.container_width = `${this.slider_value}%`;
      client.view_model_update();
    }
  }
}

module.exports = z2ui5_cl_demo_app_513;
