const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_425 extends z2ui5_if_app {
  t_countries = [];
  client = null;

  async main(client) {
    this.client = z2ui5_cl_util.abap_copy(client);
    if (client.check_on_init()) {
      this.on_init();
    }
  }

  on_init() {
    this.t_countries = [{ key: `DZ`, text: `Algeria` }, { key: `AR`, text: `Argentina` }, { key: `AU`, text: `Australia` }, { key: `AT`, text: `Austria` }, { key: `BH`, text: `Bahrain` }, { key: `BE`, text: `Belgium` }, { key: `BA`, text: `Bosnia and Herzegovina` }, { key: `BR`, text: `Brazil` }, { key: `BG`, text: `Bulgaria` }, { key: `CA`, text: `Canada` }, { key: `CL`, text: `Chile` }, { key: `CO`, text: `Colombia` }, { key: `HR`, text: `Croatia` }, { key: `CU`, text: `Cuba` }, { key: `CZ`, text: `Czech Republic` }, { key: `DK`, text: `Denmark` }, { key: `EG`, text: `Egypt` }, { key: `EE`, text: `Estonia` }, { key: `FI`, text: `Finland` }, { key: `FR`, text: `France` }, { key: `GER`, text: `Germany` }, { key: `GH`, text: `Ghana` }, { key: `GR`, text: `Greece` }, { key: `HU`, text: `Hungary` }, { key: `IN`, text: `India` }, { key: `ID`, text: `Indonesia` }, { key: `IE`, text: `Ireland` }, { key: `IL`, text: `Israel` }, { key: `IT`, text: `Italy` }, { key: `JP`, text: `Japan` }];
    // TODO(abap2js): SORT t_countries BY text.
    this.view_display();
  }

  view_display() {
    const page = z2ui5_cl_xml_view.factory()
      .shell()
      .page({ title: `abap2UI5 - Sample: Combo box - Default Filtering`, navbuttonpress: this.client._event_nav_app_leave(), shownavbutton: this.client.check_app_prev_stack(), class: `sapUiContentPadding` });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.m.ComboBox/sample/sap.m.sample.ComboBoxDefaultFiltering` });
    page.vbox()
      .label({ text: `Enter a search term, e.g. "A", and see filtered list.`, labelfor: `idComboBox` })
      .combobox({ id: `idComboBox`, showsecondaryvalues: true, items: this.client._bind(this.t_countries) })
      .list_item({ key: `{KEY}`, text: `{TEXT}`, additionaltext: `{KEY}` });
    this.client.view_display(page.stringify());
  }
}

module.exports = z2ui5_cl_demo_app_425;
