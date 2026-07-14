const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_490 extends z2ui5_if_app {
  view_display({ client } = {}) {
    const strip_text = `A panel by default has a fixed content padding of 1rem (16px). ` + `By by setting the CSS class 'sapUiResponsiveContentPadding' to the container control ` + `you will get a responsive padding based on the current screen size and the app mode around ` + `the content area. On phone devices and small screens no padding is applied, on tablet devices ` + `and inside a SplitApp control a medium padding is applied, and on desktop and fullscreen ` + `applications a large padding is applied. Try the fullscreen mode of the Explored ` + `app to see the difference`;
    const lorem = `Lorem ipsum dolor st amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. ` + `At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. ` + `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. ` + `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat`;
    const page = z2ui5_cl_xml_view.factory()
      .shell()
      .page({ title: `abap2UI5 - Sample: Responsive Container Content Padding`, navbuttonpress: client._event_nav_app_leave(), shownavbutton: client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.ui.core.ContainerPadding/sample/sap.m.sample.ContainerResponsivePadding` });
    page.message_strip({ text: strip_text, class: `sapUiTinyMargin` });
    const panel = page.panel({ class: `sapUiResponsiveContentPadding` });
    panel.header_toolbar()
      .toolbar({ height: `3rem` })
      .text({ text: `Header`, class: `sapMH4FontSize` })
      .toolbar_spacer()
      .button({ icon: `sap-icon://settings` })
      .button({ icon: `sap-icon://drop-down-list` });
    panel.content()
      .horizontal_layout()
      .image({ width: `10em`, densityaware: false, src: `https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-7777-large.jpg` })
      .get_parent()
      .text(lorem);
    client.view_display(page.stringify());
  }

  async main(client) {
    if (client.check_on_init()) {
      this.view_display({ client: client });
    }
  }
}

module.exports = z2ui5_cl_demo_app_490;
