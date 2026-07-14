const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_530 extends z2ui5_if_app {
  view_display({ client } = {}) {
    const page = z2ui5_cl_xml_view.factory()
      .shell()
      .page({ title: `abap2UI5 - Sample: ObjectPageHeader with placeholder`, navbuttonpress: client._event_nav_app_leave(), shownavbutton: client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.uxap.ObjectPageHeader/sample/sap.uxap.sample.ProfileObjectPageHeader` });
    const object_page_layout = page.object_page_layout({ showtitleinheadercontent: true, uppercaseanchorbar: false });
    const header = object_page_layout.header_title()
      .object_page_header({ objecttitle: `Rowan Atkinson`, objectimageshape: `Circle`, objectsubtitle: `Manager, HCM`, isobjecttitlealwaysvisible: false, isobjectsubtitlealwaysvisible: false, isactionareaalwaysvisible: true, showplaceholder: true })
      .get();
    header._generic({ name: `navigationBar`, ns: `uxap` })
      .bar()
      .content_left()
      .button({ icon: `sap-icon://nav-back`, tooltip: `nav-back` })
      .get_parent()
      .content_middle()
      .text(`Employee Profile`);
    header.actions(`uxap`)
      .object_page_header_action_btn({ icon: `sap-icon://tree`, text: `tree` })
      .object_page_header_action_btn({ icon: `sap-icon://action`, text: `action` });
    const header_content = object_page_layout.header_content(`uxap`);
    header_content.vertical_layout()
      .object_status({ title: `Address`, text: `BLR.01, B2.023` })
      .get_parent()
      .object_status({ title: `Office phone`, text: `+91-90100-98100` })
      .get_parent()
      .object_status({ title: `Email`, text: `rowan@pic.com` });
    header_content.horizontal_layout()
      .image({ width: `21px`, height: `21px`, src: `https://sapui5.hana.ondemand.com/test-resources/sap/uxap/images/linkedInIcon.png` })
      .image({ width: `20px`, height: `20px`, src: `https://sapui5.hana.ondemand.com/test-resources/sap/uxap/images/facebookIcon.png` })
      .image({ width: `21px`, height: `21px`, src: `https://sapui5.hana.ondemand.com/test-resources/sap/uxap/images/twitterIcon.png` });
    header_content.object_status({ state: `Success`, icon: `sap-icon://employee-approvals`, text: `Available` });
    header_content.vertical_layout().label(`Bangalore, India`).label(`3:00 PM, Friday`);
    const sections = object_page_layout.sections();
    this.render_goals_section({ sections: sections });
    this.render_personal_section({ sections: sections });
    client.view_display(page.stringify());
  }

  render_goals_section({ sections } = {}) {
    sections.object_page_section({ titleuppercase: false, title: `2014 Goals Plan` })
      .sub_sections()
      .object_page_sub_section({ titleuppercase: false })
      .blocks()
      .simple_form({ editable: false, layout: `ColumnLayout` })
      .label(`Evangelize the UI framework across the company`)
      .text(`4 days overdue Cascaded`)
      .label(`Get trained in development management direction`)
      .text(`Due Nov 21`)
      .label(`Mentor junior developers`)
      .text(`Due Dec 31 Cascaded`);
  }

  render_personal_section({ sections } = {}) {
    const sub_sections = sections.object_page_section({ titleuppercase: false, title: `Personal` }).sub_sections();
    const connect_blocks = sub_sections.object_page_sub_section({ title: `Connect`, titleuppercase: false }).blocks();
    connect_blocks.simple_form({ editable: false, layout: `ColumnLayout`, width: `100%` })
      .title({ ns: `core`, text: `Phone Numbers` })
      .label(`Home`)
      .text(`+ 1 415-321-1234`)
      .label(`Office phone`)
      .text(`+ 1 415-321-5555`);
    connect_blocks.simple_form({ editable: false, layout: `ColumnLayout`, width: `100%` })
      .title({ ns: `core`, text: `Social Accounts` })
      .label(`LinkedIn`)
      .text(`/DeniseSmith`)
      .label(`Twitter`)
      .text(`@DeniseSmith`);
    connect_blocks.simple_form({ editable: false, layout: `ColumnLayout`, width: `100%` })
      .title({ ns: `core`, text: `Addresses` })
      .label(`Home Address`)
      .text(`2096 Mission Street`)
      .label(`Mailing Address`)
      .text(`PO Box 32114`);
    connect_blocks.simple_form({ editable: false, layout: `ColumnLayout`, width: `100%` })
      .title({ ns: `core`, text: `Mailing Address` })
      .label(`Work`)
      .text(`DeniseSmith@sap.com`);
    const payment = sub_sections.object_page_sub_section({ id: `paymentSubSection`, title: `Payment information`, titleuppercase: false });
    payment.blocks()
      .simple_form({ editable: false, layout: `ColumnLayout` })
      .title({ ns: `core`, text: `Main Payment Method` })
      .label(`Bank Transfer`)
      .text(`Sparkasse Heimfeld, Germany`);
    payment.more_blocks()
      .simple_form({ editable: false, layout: `ColumnLayout` })
      .title({ ns: `core`, text: `Payment method for Expenses` })
      .label(`Extra Travel Expenses`)
      .text(`Cash 100 USD`);
  }

  async main(client) {
    if (client.check_on_init()) {
      this.view_display({ client: client });
    }
  }
}

module.exports = z2ui5_cl_demo_app_530;
