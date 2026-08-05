const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_453 extends z2ui5_if_app {
  t_products = [];
  client = null;

  async main(client) {
    this.client = client;
    if (client.check_on_init()) {
      this.t_products = z2ui5_cl_util.abap_tab_assign(this.t_products, [{ name: `Comfort Easy`, weight: 650, price: `249.99`, currency: `EUR`, width: 30, depth: 21, height: 3, dim_unit: `cm`, status: `Available`, delivery: `Shipped` }, { name: `Notebook Basic 15`, weight: 1500, price: `956`, currency: `EUR`, width: 40, depth: 28, height: 0, dim_unit: `cm`, status: `Out of Stock`, delivery: `Failed Shipping` }, { name: `Ergo Screen E-I`, weight: 2100, price: `230.5`, currency: `EUR`, width: 54, depth: 46, height: 8, dim_unit: `cm`, status: `Discontinued`, delivery: `Pending` }]);
      this.products_prepare();
      this.view_display();
    }
  }

  products_prepare() {
    let sy_tabix = 0;
    sy_tabix = 0;
    for (const product of this.t_products) {
      sy_tabix++;
      product.weight_state = (product.weight < 1000 ? `Success` : product.weight < 2000 ? `Warning` : `Error`);
      product.price_disp = `${product.price}`;
      product.dimensions = `${product.width} x ${product.depth} x ` + `${product.height} ${product.dim_unit}`;
      product.status_icon = (product.status === `Available` ? `sap-icon://accept` : product.status === `Out of Stock` ? `sap-icon://alert` : product.status === `Discontinued` ? `sap-icon://decline` : null);
      product.status_state = (product.status === `Available` ? `Success` : product.status === `Out of Stock` ? `Warning` : product.status === `Discontinued` ? `Error` : `None`);
      product.delivery_state = (product.delivery === `Shipped` ? `Success` : product.delivery === `Failed Shipping` ? `Error` : `None`);
    }
  }

  view_display() {
    const view = z2ui5_cl_xml_view.factory();
    const page = view.shell()
      .page({ title: `abap2UI5 - Formatter - thin frontend`, navbuttonpress: this.client._event_nav_app_leave(), shownavbutton: this.client.check_app_prev_stack() });
    page.message_strip({ text: `Every column is bound to a plain model field. The state, the icon, the rounded ` + `price and the dimension string are computed in ABAP (products_prepare) - the ` + `frontend only renders. Sample 450 shows what does belong in a formatter: the ` + `date conversion the backend physically cannot do.`, type: `Information`, showicon: true, class: `sapUiSmallMargin` });
    const tab = page.table({ id: `productTable`, items: this.client._bind(this.t_products) });
    tab.columns()
      .column()
      .text(`Product`)
      .get_parent()
      .column()
      .text(`Weight (g)`)
      .get_parent()
      .column()
      .text(`Price`)
      .get_parent()
      .column()
      .text(`Dimensions`)
      .get_parent()
      .column()
      .text(`Status`)
      .get_parent()
      .column()
      .text(`Delivery`)
      .get_parent();
    tab.items()
      .column_list_item()
      .cells()
      .text(`{NAME}`)
      .object_number({ number: `{WEIGHT}`, unit: `g`, state: `{WEIGHT_STATE}` })
      .object_number({ number: `{PRICE_DISP}`, unit: `{CURRENCY}` })
      .text(`{DIMENSIONS}`)
      .object_status({ text: `{STATUS}`, icon: `{STATUS_ICON}`, state: `{STATUS_STATE}` })
      .get_parent()
      .object_status({ text: `{DELIVERY}`, state: `{DELIVERY_STATE}` });
    this.client.view_display(view.stringify());
  }
}

module.exports = z2ui5_cl_demo_app_453;

const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");

