// A cap2UI5 app. Plain JavaScript: plain values, no async, no await, no ABAP.
import { defineApp } from "./define-app.mjs";

defineApp("ZCL_JS_HELLO", class {
  name = "";

  main(c) {
    if (c.isInitial) {
      c.view(
        `<mvc:View xmlns:mvc="sap.ui.core.mvc" xmlns="sap.m" displayBlock="true" height="100%">` +
        `<Shell><Page title="cap2UI5 - JS app">` +
        `<Input value="${c.bind("name")}"/>` +
        `<Button text="Go" press="${c.event("GO")}"/>` +
        `</Page></Shell></mvc:View>`);
    } else {
      c.messageBox(`Hello ${this.name}`);
    }
  }
});
console.log("[jsapp] ZCL_JS_HELLO registered");
