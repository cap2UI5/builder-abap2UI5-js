
class z2ui5_cl_ui5f_msgmgr_js {
  static get() {
    let result = ``;
    result = `sap.ui.define(` + `
` + `  [` + `
` + `    "sap/ui/core/Control",` + `
` + `    "sap/ui/core/message/Message",` + `
` + `    "z2ui5/core/Lib",` + `
` + `    "z2ui5/core/Env",` + `
` + `    "z2ui5/core/ViewSlots",` + `
` + `    "z2ui5/core/Context",` + `
` + `  ],` + `
` + `  (Control, Message, Lib, Env, ViewSlots, Context) => {` + `
` + `    "use strict";` + `
` + `` + `
` + `    const KEY_SEP = String.fromCharCode(1);` + `
` + `` + `
` + `    const keyOf = (o) =>` + `
` + `      [` + `
` + `        o.MESSAGE,` + `
` + `        o.TYPE,` + `
` + `        o.TARGET,` + `
` + `        o.DESCRIPTION,` + `
` + `        o.ADDITIONALTEXT,` + `
` + `        o.CODE,` + `
` + `      ].join(KEY_SEP);` + `
` + `` + `
` + `    return Control.extend("z2ui5.cc.MessageManager", {` + `
` + `      metadata: {` + `
` + `        properties: {` + `
` + `          items: { type: "object" },` + `
` + `          checkInit: { type: "boolean", defaultValue: false },` + `
` + `        },` + `
` + `        events: {` + `
` + `          change: { allowPreventDefault: true, parameters: {} },` + `
` + `        },` + `
` + `      },` + `
` + `` + `
` + `      init() {` + `
` + `        this._added = new Map();` + `
` + `        this._ready = false;` + `
` + `        this._unhook = Lib.hookCallback(this, "onAfterRendering", "setup");` + `
` + `      },` + `
` + `      exit() {` + `
` + `        this._unhook();` + `
` + `` + `
` + `        if (this._added.size && this._messaging) {` + `
` + `          this._messaging.removeMessages([...this._added.values()]);` + `
` + `        }` + `
` + `        this._added.clear();` + `
` + `      },` + `
` + `      renderer: Lib.EMPTY_RENDERER,` + `
` + `` + `
` + `      setup() {` + `
` + `        const messaging = Env.getMessaging();` + `
` + `        if (!Lib.claimOnce(this, messaging)) return;` + `
` + `        this._messaging = messaging;` + `
` + `` + `
` + `        const ctx = Context.of(this);` + `
` + `        if (!ctx) {` + `
` + `          Lib.logError(` + `
` + `            "MessageManager.setup: no component context, messages carry no processor",` + `
` + `          );` + `
` + `        }` + `
` + `        const view = ctx` + `
` + `          ? ViewSlots.getView(` + `
` + `              ctx,` + `
` + `              ViewSlots.containingSlotKey(ctx, this) ?? "MAIN",` + `
` + `            )` + `
` + `          : undefined;` + `
` + `        this._processor = view?.getModel?.() ?? null;` + `
` + `        this._ready = true;` + `
` + `` + `
` + `        this.reconcile();` + `
` + `      },` + `
` + `` + `
` + `      setItems(aItems) {` + `
` + `        this.setProperty("items", aItems, true);` + `
` + `        if (this._ready) this.reconcile();` + `
` + `        return this;` + `
` + `      },` + `
` + `` + `
` + `      reconcile() {` + `
` + `        const rows = this.getProperty("items") || [];` + `
` + `        const wanted = new Map(rows.map((r) => [keyOf(r), r]));` + `
` + `` + `
` + `        let changed = false;` + `
` + `` + `
` + `        for (const [key, oMessage] of this._added) {` + `
` + `          if (!wanted.has(key)) {` + `
` + `            this._messaging.removeMessages(oMessage);` + `
` + `            this._added.delete(key);` + `
` + `            changed = true;` + `
` + `          }` + `
` + `        }` + `
` + `` + `
` + `        for (const [key, r] of wanted) {` + `
` + `          if (this._added.has(key)) continue;` + `
` + `          changed = true;` + `
` + `          const oMessage = new Message({` + `
` + `            message: r.MESSAGE ?? "",` + `
` + `            description: r.DESCRIPTION ?? "",` + `
` + `            type: r.TYPE ?? "Error",` + `
` + `            target: r.TARGET ?? "",` + `
` + `            additionalText: r.ADDITIONALTEXT ?? "",` + `
` + `` + `
` + `            code: r.CODE ?? "",` + `
` + `            processor: this._processor,` + `
` + `          });` + `
` + `          this._messaging.addMessages(oMessage);` + `
` + `          this._added.set(key, oMessage);` + `
` + `        }` + `
` + `        if (changed) this.fireChange();` + `
` + `      },` + `
` + `    });` + `
` + `  },` + `
` + `);` + `
` + `` + `
` + ``;
    return result;
  }
}

module.exports = z2ui5_cl_ui5f_msgmgr_js;

