const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_smp_app_468 extends z2ui5_if_app {
  input = ``;
  counter = 0;
  client = null;

  async main(client) {
    this.client = client;
    if (client.check_on_init()) {
      this.view_display();
    } else if (client.check_on_navigated()) {
      this.view_display();
    } else if (client.check_on_event()) {
      this.on_event();
    }
  }

  on_event() {
    switch (this.client.get().EVENT) {
      case `INC`:
        this.counter = this.counter + 1;
        this.view_display();
        break;
      case `GO_DETAIL`:
        this.client.nav_app_call(new z2ui5_cl_smp_app_469());
        break;
    }
  }

  view_display() {
    this.client.set_nav_routing(this.client.cs_nav_mode.fresh);
    const view = z2ui5_cl_xml_view.factory();
    const page = view.shell()
      .page({ title: `abap2UI5 - Navigation - Routing Mode fresh`, navbuttonpress: this.client._event_nav_app_leave(), shownavbutton: this.client.check_app_prev_stack() });
    page.message_strip({ text: `Add some state (type / raise the counter), open the detail page, then press your ` + `BROWSER Back button and watch this page.`, type: `Information`, showicon: true, class: `sapUiSmallMargin` });
    const form = page.grid(`L6 M12 S12`).content(`layout`).simple_form(`Routing mode fresh`).content(`form`);
    form.label(`1. Some state - type here`);
    form.input(this.client._bind(this.input));
    form.label(`and raise a counter`);
    form.button({ text: `increment (${this.counter})`, press: this.client._event(`INC`) });
    form.label(`2. Navigate forward`);
    form.button({ text: `go to the detail page (nav_app_call)`, type: `Emphasized`, press: this.client._event(`GO_DETAIL`) });
    page.message_strip({ text: `fresh: the URL carries the class only (#/app/<CLASS>). After the detail page, the ` + `browser Back button starts this app FRESH - input and counter are reset.`, type: `Success`, showicon: true, class: `sapUiSmallMargin` });
    this.client.view_display(view.stringify());
  }
}

module.exports = z2ui5_cl_smp_app_468;

// TODO(abap2js): unresolved reference z2ui5_cl_smp_app_469 — add require manually
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");

