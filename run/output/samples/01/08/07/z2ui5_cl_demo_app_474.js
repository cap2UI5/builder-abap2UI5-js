const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_474 extends z2ui5_if_app {
  selected_item_text = ``;
  client = null;

  async main(client) {
    this.client = z2ui5_cl_util.abap_copy(client);
    if (client.check_on_init()) {
      this.view_display();
    } else if (client.check_on_event(`SELECTION_CHANGE`)) {
      client.message_toast_display(`oEvent.getParameter('item').getText(): '${client.get_event_arg(1)}' selected`);
      this.selected_item_text = `getSelectedItem(): ${client.get_event_arg(1)}`;
      client.view_model_update();
    }
  }

  view_display() {
    const view = z2ui5_cl_xml_view.factory();
    const page = view.shell()
      .page({ title: `abap2UI5 - Sample: Segmented Button`, navbuttonpress: this.client._event_nav_app_leave(), shownavbutton: this.client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.m.SegmentedButton/sample/sap.m.sample.SegmentedButton` });
    const page2 = page.page({ showheader: false, class: `sapUiContentPadding` });
    page2.sub_header()
      .overflow_toolbar()
      .toolbar_spacer()
      .segmented_button(`kids`)
      .items()
      .segmented_button_item({ text: `Kids`, key: `kids` })
      .segmented_button_item({ text: `Adults` })
      .segmented_button_item({ text: `Seniors` })
      .get_parent()
      .get_parent()
      .toolbar_spacer();
    const vbox = page2.vbox({ width: `100%` });
    vbox._generic({ name: `SegmentedButton`, t_prop: [{ n: `selectedKey`, v: `satellite` }, { n: `class`, v: `sapUiSmallMarginBottom` }] })
      .items()
      .segmented_button_item({ text: `Map` })
      .segmented_button_item({ text: `Satellite`, key: `satellite` })
      .segmented_button_item({ text: `Hybrid` });
    vbox._generic({ name: `SegmentedButton`, t_prop: [{ n: `selectedKey`, v: `competitor` }, { n: `class`, v: `sapUiSmallMarginBottom` }] })
      .items()
      .segmented_button_item({ icon: `sap-icon://taxi` })
      .segmented_button_item({ icon: `sap-icon://lab` })
      .segmented_button_item({ icon: `sap-icon://competitor`, key: `competitor` });
    vbox._generic({ name: `SegmentedButton`, t_prop: [{ n: `class`, v: `sapUiSmallMarginBottom` }] })
      .items()
      .segmented_button_item({ text: `Selected` })
      .segmented_button_item({ text: `Enabled` })
      .segmented_button_item({ text: `Disabled`, enabled: false });
    vbox.label(`Fire selectionChange event`);
    vbox.segmented_button({ selection_change: this.client._event(`SELECTION_CHANGE`, [`\${$parameters>/item/mProperties/text}`]) })
      .items()
      .segmented_button_item({ text: `One` })
      .segmented_button_item({ text: `Two` })
      .segmented_button_item({ text: `Three` });
    vbox.text(this.client._bind(this.selected_item_text));
    page2.footer()
      .overflow_toolbar()
      .toolbar_spacer()
      .segmented_button(`small`)
      .items()
      .segmented_button_item({ text: `Small`, key: `small` })
      .segmented_button_item({ text: `Medium` })
      .segmented_button_item({ text: `Large` })
      .get_parent()
      .get_parent()
      .toolbar_spacer();
    this.client.view_display(view.stringify());
  }
}

module.exports = z2ui5_cl_demo_app_474;
