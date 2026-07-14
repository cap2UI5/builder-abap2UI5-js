const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_489 extends z2ui5_if_app {
  view_display({ client } = {}) {
    const strip_text = `A layout container by default does not add margins or paddings to the content area. ` + `By combining the margin and padding concepts you can flexibly design your application layout ` + `without having to add any custom CSS. This example shows a HorizontalLayout that is layouted ` + `with the standard margin and padding classes provided by UI5.`;
    const image_url = `https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-7777-large.jpg`;
    const page = z2ui5_cl_xml_view.factory()
      .shell()
      .page({ title: `abap2UI5 - Sample: Container Content Padding and Margins`, navbuttonpress: client._event_nav_app_leave(), shownavbutton: client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.ui.core.ContainerPadding/sample/sap.m.sample.ContainerPaddingAndMargin` });
    page.message_strip({ text: strip_text, class: `sapUiTinyMargin` });
    const layout = page.scroll_container().horizontal_layout({ class: `sapUiContentPadding` });
    layout.image({ densityaware: false, src: image_url, width: `5em`, class: `sapUiSmallMarginEnd` })
      .get()
      .layout_data()
      .flex_item_data({ growfactor: `1` });
    layout.image({ densityaware: false, src: image_url, width: `10em`, class: `sapUiSmallMarginEnd` })
      .get()
      .layout_data()
      .flex_item_data({ growfactor: `2` });
    layout.image({ densityaware: false, src: image_url, width: `15em` })
      .get()
      .layout_data()
      .flex_item_data({ growfactor: `3` });
    client.view_display(page.stringify());
  }

  async main(client) {
    if (client.check_on_init()) {
      this.view_display({ client: client });
    }
  }
}

module.exports = z2ui5_cl_demo_app_489;
