const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_486 extends z2ui5_if_app {
  toolbar_width = ``;
  client = null;

  async main(client) {
    this.client = z2ui5_cl_util.abap_copy(client);
    if (client.check_on_init()) {
      this.toolbar_width = `100%`;
      this.view_display();
    } else if (client.check_on_event(`SLIDER_CHANGE`)) {
      this.toolbar_width = `${client.get_event_arg(1)}%`;
      client.view_model_update();
    }
  }

  view_display() {
    const page = z2ui5_cl_xml_view.factory()
      .shell()
      .page({ title: `abap2UI5 - Sample: Toolbar - Shrinkable items`, navbuttonpress: this.client._event_nav_app_leave(), shownavbutton: this.client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.m.Toolbar/sample/sap.m.sample.ToolbarShrinkable` });
    page.slider({ livechange: this.client._event(`SLIDER_CHANGE`, [`\${$parameters>/value}`]), step: `20`, value: `100` });
    page.message_strip({ text: `By default, Toolbar items are shrinkable if they have percent-based width (e.g. Input, Slider)` + ` or implement the IShrinkable interface (e.g. Text, Label).`, class: `sapUiTinyMargin` });
    page.toolbar({ id: `toolbar1`, width: this.client._bind(this.toolbar_width) })
      ._generic_property({ n: `class`, v: `sapUiMediumMarginTop` })
      .label(`I am a text control, so I will shrink whenever the toolbar overflows.`)
      .toolbar_spacer()
      .button({ text: `Non-shrinkable button` })
      .toolbar_spacer()
      .search_field({ width: `100%`, placeholder: `My width is 100%, so I should shrink.` });
    page.message_strip({ text: `You can configure the item's shrinking-related properties by providing ToolbarLayoutData.`, class: `sapUiTinyMargin` });
    page.toolbar({ id: `toolbar2`, width: this.client._bind(this.toolbar_width) })
      ._generic_property({ n: `class`, v: `sapUiMediumMarginTop` })
      .label(`I am a non-shrinkable text.`)
      .get()
      .layout_data(``)
      .toolbar_layout_data({ shrinkable: false })
      .get_parent()
      .get_parent()
      .get_parent()
      .toolbar_spacer()
      .button({ text: `I am a shrinkable button, so I will shrink whenever the toolbar overflows.` })
      .get()
      .layout_data(``)
      .toolbar_layout_data({ shrinkable: true })
      .get_parent()
      .get_parent()
      .get_parent()
      .toolbar_spacer()
      .search_field({ width: `200px`, placeholder: `I have a fixed width (200px), so I cannot shrink.` });
    page.message_strip({ text: `You can determine to what extent an item shrinks by setting minWidth/maxWidth via ToolbarLayoutData.` + ` By default, minWidth is 48px in the Blue Crystal theme.`, class: `sapUiTinyMargin` });
    page.toolbar({ id: `toolbar3`, width: this.client._bind(this.toolbar_width) })
      ._generic_property({ n: `class`, v: `sapUiMediumMarginTop` })
      .label(`I should not shrink by more than 200px, because I am an important text.`)
      .get()
      .layout_data(``)
      .toolbar_layout_data({ shrinkable: true, minwidth: `200px` })
      .get_parent()
      .get_parent()
      .get_parent()
      .toolbar_spacer()
      .button({ text: `I cannot be wider than 400px, but I can shrink up to the theme's default minimum width.` })
      .get()
      .layout_data(``)
      .toolbar_layout_data({ shrinkable: true, maxwidth: `400px` })
      .get_parent()
      .get_parent()
      .get_parent();
    this.client.view_display(page.stringify());
  }
}

module.exports = z2ui5_cl_demo_app_486;
