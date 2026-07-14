const z2ui5_cl_util = require("abap2UI5/z2ui5_cl_util");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");

class z2ui5_cl_demo_app_527 extends z2ui5_if_app {
  t_expenses = [];
  client = null;

  async main(client) {
    this.client = z2ui5_cl_util.abap_copy(client);
    if (client.check_on_init()) {
      this.on_init();
    } else if (client.check_on_navigated()) {
      this.view_display();
    }
  }

  on_init() {
    this.t_expenses = [{ expense: `Flight`, transaction_amount: `560.67`, transaction_currency: `EUR`, exchange_rate: `1.00000`, amount: `560.67` }, { expense: `Meals`, transaction_amount: `180.50`, transaction_currency: `USD`, exchange_rate: `0.85654`, amount: `154.72` }, { expense: `Hotel`, transaction_amount: `675.00`, transaction_currency: `USD`, exchange_rate: `0.85654`, amount: `578.57` }, { expense: `Taxi`, transaction_amount: `15`, transaction_currency: `USD`, exchange_rate: `0.85654`, amount: `12.86` }, { expense: `Daily allowance`, transaction_amount: `80.00`, transaction_currency: `BGN`, exchange_rate: `0.51129`, amount: `40.90` }, { expense: `Daily allowance Japan`, transaction_amount: `7000`, transaction_currency: `JPY`, exchange_rate: `0.00670`, amount: `46.69` }];
    this.view_display();
  }

  view_display() {
    const page = z2ui5_cl_xml_view.factory()
      .shell()
      .page({ title: `abap2UI5 - Sample: Currency in Table`, navbuttonpress: this.client._event_nav_app_leave(), shownavbutton: this.client.check_app_prev_stack() });
    page.header_content()
      .link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.ui.unified.Currency/sample/sap.ui.unified.sample.CurrencyInTable` });
    const tab = page.table({ id: `idProductsTable`, items: this.client._bind(this.t_expenses) });
    const columns = tab.columns();
    columns.column({ id: `exapnseColumn`, halign: `Begin` }).text(`Expense`);
    columns.column({ id: `transactionAmountColumn`, halign: `End` }).text(`Transaction amount`);
    columns.column({ id: `exchangeRateColumn`, halign: `End` }).text(`Exchange rate`);
    columns.column({ id: `amountColumn`, halign: `End` }).text(`Amount`);
    const cells = tab.items().column_list_item().cells();
    cells.object_identifier({ text: `{EXPENSE}` });
    cells.currency({ value: `{TRANSACTION_AMOUNT}`, currency: `{TRANSACTION_CURRENCY}`, maxprecision: `2`, usesymbol: false });
    cells.object_number({ number: `{EXCHANGE_RATE}` });
    cells.object_number({ number: `{AMOUNT}`, unit: `EUR` });
    this.client.view_display(page.stringify());
  }
}

module.exports = z2ui5_cl_demo_app_527;
