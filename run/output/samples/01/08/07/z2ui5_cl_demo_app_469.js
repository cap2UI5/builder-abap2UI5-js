const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_469 extends z2ui5_if_app {
  pdf_source = ``;
  client = null;

  view_display({ client } = {}) {
    const base_url = `https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/sample/PDFViewerPopup/`;
    const view = z2ui5_cl_xml_view.factory();
    const page = view.shell()
      .page({ title: `abap2UI5 - Sample: PDF Viewer - Popup`, navbuttonpress: client._event_nav_app_leave(), shownavbutton: client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.m.PDFViewer/sample/sap.m.sample.PDFViewerPopup` });
    page.carousel({ class: `sapUiContentPadding`, loop: true })
      .image({ id: `image1`, src: base_url + `sample1.jpg`, alt: `Example Picture 1`, press: client._event(`SHOW_PDF`, [`sample1.pdf`]) })
      .image({ id: `image2`, src: base_url + `sample2.jpg`, alt: `Example Picture 2`, press: client._event(`SHOW_PDF`, [`sample2.pdf`]) });
    client.view_display(view.stringify());
  }

  on_event({ client } = {}) {
    if (client.check_on_event(`SHOW_PDF`)) {
      this.pdf_source = `https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/sample/PDFViewerPopup/` + client.get_event_arg(1);
      this.popup_display();
    }
  }

  popup_display() {
    const popup = z2ui5_cl_xml_view.factory_popup();
    const dialog = popup.dialog({ title: `My Custom Title`, contentwidth: `760px`, contentheight: `600px`, afterclose: this.client._event_client(this.client.cs_event.popup_close) });
    dialog._generic({ name: `PDFViewer`, t_prop: [{ n: `source`, v: this.pdf_source }, { n: `height`, v: `100%` }] });
    dialog.end_button().button({ text: `Close`, press: this.client._event_client(this.client.cs_event.popup_close) });
    this.client.popup_display(popup.stringify());
  }

  async main(client) {
    this.client = z2ui5_cl_util.abap_copy(client);
    if (client.check_on_init()) {
      this.view_display({ client: client });
    }
    this.on_event({ client: client });
  }
}

module.exports = z2ui5_cl_demo_app_469;
