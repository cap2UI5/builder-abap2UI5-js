const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_517 extends z2ui5_if_app {
  s_person1 = {};
  s_person2 = {};
  s_person3 = {};

  view_display({ client } = {}) {
    const page = z2ui5_cl_xml_view.factory()
      .shell()
      .page({ title: `abap2UI5 - Sample: Grid - Info Layout`, navbuttonpress: client._event_nav_app_leave(), shownavbutton: client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.ui.layout.Grid/sample/sap.ui.layout.sample.GridInfo` });
    const content = page.grid({ class: `sapUiSmallMarginTop`, hspacing: `2`, default_span: `L6 M6 S10` })
      .content(`layout`);
    content.image({ src: client._bind(this.s_person1.pic_url, { name: `s_person1-pic_url` }), width: `100%` })
      .get()
      .layout_data()
      ._generic({ name: `GridData`, ns: `layout`, t_prop: [{ n: `span`, v: `L3 M3 S8` }, { n: `linebreakL`, v: `true` }, { n: `linebreakM`, v: `true` }, { n: `linebreakS`, v: `true` }] });
    content.vbox()
      .text({ text: client._bind(this.s_person1.name, { name: `s_person1-name` }), class: `nameTitle` })
      .text(client._bind(this.s_person1.description, { name: `s_person1-description` }));
    content.image({ src: client._bind(this.s_person2.pic_url, { name: `s_person2-pic_url` }), width: `100%` })
      .get()
      .layout_data()
      ._generic({ name: `GridData`, ns: `layout`, t_prop: [{ n: `span`, v: `L3 M3 S8` }, { n: `linebreakL`, v: `true` }, { n: `linebreakM`, v: `true` }, { n: `linebreakS`, v: `true` }] });
    content.vbox()
      .text({ text: client._bind(this.s_person2.name, { name: `s_person2-name` }), class: `nameTitle` })
      .text(client._bind(this.s_person2.description, { name: `s_person2-description` }));
    content.image({ src: client._bind(this.s_person3.pic_url, { name: `s_person3-pic_url` }), width: `100%` })
      .get()
      .layout_data()
      ._generic({ name: `GridData`, ns: `layout`, t_prop: [{ n: `span`, v: `L3 M3 S8` }, { n: `linebreakL`, v: `true` }, { n: `linebreakM`, v: `true` }, { n: `linebreakS`, v: `true` }] });
    content.vbox()
      .text({ text: client._bind(this.s_person3.name, { name: `s_person3-name` }), class: `nameTitle` })
      .text(client._bind(this.s_person3.description, { name: `s_person3-description` }));
    client.view_display(page.stringify());
  }

  async main(client) {
    if (client.check_on_init()) {
      this.s_person1 = { pic_url: `https://upload.wikimedia.org/wikipedia/commons/2/25/George_Washington_as_CIC_of_the_Continental_Army_bust.jpg`, name: `George Washington`, description: `George Washington was the first President of the United States, the commander-in-chief of the Continental Army ` + `during the American Revolutionary War, and one of the Founding Fathers of the United States.` };
      this.s_person2 = { pic_url: `https://upload.wikimedia.org/wikipedia/commons/a/aa/Dronning_victoria.jpg`, name: `Alexandrina Victoria`, description: `Queen Victoria was the monarch of the United Kingdom of Great Britain and Ireland from 20 June 1837 until her death. ` + `From 1 May 1876, she used the additional title of Empress of India.` };
      this.s_person3 = { pic_url: `https://upload.wikimedia.org/wikipedia/commons/f/fc/Frederic_II_de_prusse.jpg`, name: `Friedrich Der Große`, description: `Frederick II was King in Prussia of the Hohenzollern dynasty. He is best known for his brilliance in military campaigning ` + `and organization of Prussian armies. He became known as Frederick the Great and was nicknamed Der Alte Fritz.` };
      this.view_display({ client: client });
    }
  }
}

module.exports = z2ui5_cl_demo_app_517;
