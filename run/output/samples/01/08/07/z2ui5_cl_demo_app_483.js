const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_483 extends z2ui5_if_app {
  t_persons = [];
  contextual_width = ``;
  client = null;

  async main(client) {
    this.client = z2ui5_cl_util.abap_copy(client);
    if (client.check_on_init()) {
      this.on_init();
    } else if (client.check_on_event(`CHANGE_WIDTH`)) {
      this.contextual_width = `100px`;
      client.view_model_update();
    }
  }

  on_init() {
    this.contextual_width = `500px`;
    this.t_persons = [{ first_name: `John`, last_name: `Doe`, birth_date: `1986-05-11`, gender: `Male` }, { first_name: `Harry`, last_name: `Potter`, birth_date: `1976-05-19`, gender: `Male` }, { first_name: `Heinz`, last_name: `Piper`, birth_date: `1989-08-08`, gender: `Male` }, { first_name: `Indiana`, last_name: `Jones`, birth_date: `1991-12-03`, gender: `Male` }, { first_name: `Darth`, last_name: `Vader`, birth_date: `1977-02-24`, gender: `Male` }, { first_name: `Barbara`, last_name: `Dreher`, birth_date: `1999-08-31`, gender: `Female` }, { first_name: `Dante`, last_name: `Alighieri`, birth_date: `1982-04-22`, gender: `Male` }, { first_name: `Mark`, last_name: `Anson`, birth_date: `1984-05-24`, gender: `Male` }, { first_name: `Jane`, last_name: `Doe`, birth_date: `1976-07-17`, gender: `Female` }, { first_name: `Sean`, last_name: `Penn`, birth_date: `1977-09-15`, gender: `Male` }, { first_name: `Terry`, last_name: `Jones`, birth_date: `1988-06-07`, gender: `Male` }, { first_name: `Leia`, last_name: `Vader`, birth_date: `1991-11-09`, gender: `Female` }, { first_name: `Karla`, last_name: `Damon`, birth_date: `1981-12-08`, gender: `Female` }, { first_name: `Andante`, last_name: `Allegro`, birth_date: `1985-07-02`, gender: `Male` }, { first_name: `John`, last_name: `Dufke`, birth_date: `1979-08-17`, gender: `Male` }, { first_name: `Hermione`, last_name: `Potter`, birth_date: `1971-06-15`, gender: `Female` }, { first_name: `Dante`, last_name: `Alioli`, birth_date: `1987-05-11`, gender: `Male` }, { first_name: `Heinz`, last_name: `Pepper`, birth_date: `1995-10-21`, gender: `Male` }, { first_name: `John`, last_name: `Johnson`, birth_date: `1981-10-26`, gender: `Male` }, { first_name: `Luke`, last_name: `Vader`, birth_date: `1972-06-06`, gender: `Male` }, { first_name: `Petra`, last_name: `Delorean`, birth_date: `1988-04-24`, gender: `Female` }, { first_name: `Venus`, last_name: `Botticelli`, birth_date: `1976-09-08`, gender: `Female` }];
    this.view_display();
  }

  view_display() {
    const page = z2ui5_cl_xml_view.factory()
      .shell()
      .page({ title: `abap2UI5 - Sample: Table - ContextualWidth (Static)`, navbuttonpress: this.client._event_nav_app_leave(), shownavbutton: this.client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.m.Table/sample/sap.m.sample.TableContextualWidthStatic` });
    page.message_strip({ text: `Table is initially setting contextualWidth to 500px. Press button to change the contextualWidth.`, type: `Success`, class: `sapUiSmallMargin`, showicon: true });
    page.overflow_toolbar()
      .button({ text: `change contextualWidth to 100px`, press: this.client._event(`CHANGE_WIDTH`) });
    page.table({ id: `table`, contextualwidth: this.client._bind(this.contextual_width), popinlayout: `GridSmall`, headertext: `Products`, items: this.client._bind(this.t_persons) })
      .columns()
      .column()
      .header(``)
      .label(`First Name`)
      .get_parent()
      .get_parent()
      .column({ demandpopin: true, minscreenwidth: `Phone` })
      .header(``)
      .label(`Last Name`)
      .get_parent()
      .get_parent()
      .column({ minscreenwidth: `Phone`, demandpopin: true, popindisplay: `Inline`, halign: `Right` })
      .header(``)
      .label(`Birth Date`)
      .get_parent()
      .get_parent()
      .column({ width: `4rem`, demandpopin: true, halign: `Right`, minscreenwidth: `Tablet`, popindisplay: `Inline` })
      .header(``)
      .label(`Gender`)
      .get_parent()
      .get_parent()
      .get_parent()
      .items()
      .column_list_item()
      .cells()
      .label(`{FIRST_NAME}`)
      .label(`{LAST_NAME}`)
      .label(`{BIRTH_DATE}`)
      .label(`{GENDER}`);
    this.client.view_display(page.stringify());
  }
}

module.exports = z2ui5_cl_demo_app_483;
