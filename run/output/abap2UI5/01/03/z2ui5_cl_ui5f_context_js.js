
class z2ui5_cl_ui5f_context_js {
  static get() {
    let result = ``;
    result = `sap.ui.define(["z2ui5/core/AppState"], (AppState) => {` + `
` + `  "use strict";` + `
` + `` + `
` + `  const byComponent = new WeakMap();` + `
` + `` + `
` + `  const byView = new WeakMap();` + `
` + `` + `
` + `  function create(component) {` + `
` + `    const ctx = {` + `
` + `      component: component || null,` + `
` + `      id: typeof component?.getId === "function" ? component.getId() : "",` + `
` + `` + `
` + `      alive: true,` + `
` + `      state: AppState.createState(),` + `
` + `` + `
` + `      server: { requestSeq: 0, inflight: new Set(), viewBuild: null },` + `
` + `` + `
` + `      session: {` + `
` + `        configSent: false,` + `
` + `        liveSent: "",` + `
` + `        pending: null,` + `
` + `        locationSent: false,` + `
` + `      },` + `
` + `` + `
` + `      router: { navigate: null, hashListener: null },` + `
` + `` + `
` + `      shortcuts: { listener: null },` + `
` + `` + `
` + `      scroll: { target: undefined, ui5El: undefined, slotKey: undefined },` + `
` + `` + `
` + `      errorView: { title: "", details: "", options: {}, dialog: null },` + `
` + `` + `
` + `      devtools: {},` + `
` + `    };` + `
` + `    if (component) byComponent.set(component, ctx);` + `
` + `    return ctx;` + `
` + `  }` + `
` + `` + `
` + `  function destroy(ctx) {` + `
` + `    if (!ctx) return;` + `
` + `    ctx.alive = false;` + `
` + `    ctx.state = AppState.createState();` + `
` + `    if (ctx.component) byComponent.delete(ctx.component);` + `
` + `  }` + `
` + `` + `
` + `  function registerView(ctx, view) {` + `
` + `    if (ctx && view && typeof view === "object") byView.set(view, ctx);` + `
` + `  }` + `
` + `` + `
` + `  function runAsOwner(ctx, fn) {` + `
` + `    const component = ctx?.component;` + `
` + `    if (component && typeof component.runAsOwner === "function") {` + `
` + `      return component.runAsOwner(fn);` + `
` + `    }` + `
` + `    return fn();` + `
` + `  }` + `
` + `` + `
` + `  function of(anchor) {` + `
` + `    if (!anchor || typeof anchor !== "object") return null;` + `
` + `` + `
` + `    if (anchor.ctx && anchor.ctx.state) return anchor.ctx;` + `
` + `` + `
` + `    const own = byComponent.get(anchor);` + `
` + `    if (own) return own;` + `
` + `` + `
` + `    const Component = sap.ui.require?.("sap/ui/core/Component");` + `
` + `    if (Component && typeof Component.getOwnerComponentFor === "function") {` + `
` + `      const owner = Component.getOwnerComponentFor(anchor);` + `
` + `      const found = owner && byComponent.get(owner);` + `
` + `      if (found) return found;` + `
` + `    }` + `
` + `` + `
` + `    let node = anchor;` + `
` + `    for (let i = 0; node && i < 200; i++) {` + `
` + `      const found = byView.get(node);` + `
` + `      if (found) return found;` + `
` + `      node = typeof node.getParent === "function" ? node.getParent() : null;` + `
` + `    }` + `
` + `    return null;` + `
` + `  }` + `
` + `` + `
` + `  return { create, destroy, registerView, runAsOwner, of };` + `
` + `});` + `
` + `` + `
` + ``;
    return result;
  }
}

module.exports = z2ui5_cl_ui5f_context_js;

