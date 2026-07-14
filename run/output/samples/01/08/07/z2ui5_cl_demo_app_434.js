const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_434 extends z2ui5_if_app {
  view_display({ client } = {}) {
    const pic1 = `https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-7777-large.jpg`;
    const pic3 = `https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-6100-large.jpg`;
    const page = z2ui5_cl_xml_view.factory()
      .shell()
      .page({ title: `abap2UI5 - Sample: Image with ImageMode.Background`, navbuttonpress: client._event_nav_app_leave(), shownavbutton: client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.m.Image/sample/sap.m.sample.ImageModeBackground` });
    const grid = page.vertical_layout({ class: `sapUiContentPadding`, width: `100%` })
      .content(`layout`)
      .grid(`XL3 L3 M6 S12`)
      .content(`layout`);
    const box1 = grid.vbox({ alignitems: `Center` });
    box1.image({ src: pic1, mode: `Background`, height: `10em`, width: `10em` })
      .get()
      .layout_data()
      .flex_item_data({ growfactor: `1` });
    box1.text({ text: `Background covers the entire container`, class: `sapUiSmallMarginTop` });
    const box2 = grid.vbox({ alignitems: `Center` });
    box2.image({ src: pic1, mode: `Background`, height: `10em`, backgroundsize: `5em 5em`, backgroundposition: `center`, width: `10em` })
      .get()
      .layout_data()
      .flex_item_data({ growfactor: `1` });
    box2.text({ text: `Center placed background`, class: `sapUiSmallMarginTop` });
    const box3 = grid.vbox({ alignitems: `Center` });
    box3.image({ src: pic1, mode: `Background`, height: `10em`, backgroundsize: `2em 2em`, backgroundrepeat: `repeat`, width: `10em` })
      .get()
      .layout_data()
      .flex_item_data({ growfactor: `1` });
    box3.text({ text: `Repeating background`, class: `sapUiSmallMarginTop` });
    const box4 = grid.vbox({ alignitems: `Center` });
    box4.hbox()
      .image({ src: pic3, mode: `Background`, height: `10em`, backgroundsize: `contain`, backgroundposition: `center center`, width: `6em` });
    box4.text({ text: `The background adjusts its lower dimension in order to fit in the container`, class: `sapUiSmallMarginTop` });
    client.view_display(page.stringify());
  }

  async main(client) {
    if (client.check_on_init()) {
      this.view_display({ client: client });
    }
  }
}

module.exports = z2ui5_cl_demo_app_434;
