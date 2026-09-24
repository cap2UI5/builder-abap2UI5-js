
class z2ui5_cl_ui5f_ctrlcall_js {
  static get() {
    let result = ``;
    result = `sap.ui.define(` + `
` + `  [` + `
` + `    "sap/m/MessageBox",` + `
` + `    "sap/ui/core/BusyIndicator",` + `
` + `    "sap/ui/core/Popup",` + `
` + `    "z2ui5/core/Router",` + `
` + `    "z2ui5/core/Lib",` + `
` + `    "z2ui5/core/Env",` + `
` + `    "z2ui5/core/ViewSlots",` + `
` + `    "z2ui5/core/actions/Slots",` + `
` + `  ],` + `
` + `  (` + `
` + `    MessageBox,` + `
` + `    BusyIndicator,` + `
` + `    CorePopup,` + `
` + `    Router,` + `
` + `    Lib,` + `
` + `    Env,` + `
` + `    ViewSlots,` + `
` + `    Slots,` + `
` + `  ) => {` + `
` + `    "use strict";` + `
` + `` + `
` + `    let MessageToast;` + `
` + `    sap.ui.require(["sap/m/MessageToast"], (MT) => {` + `
` + `      MessageToast = MT;` + `
` + `    });` + `
` + `` + `
` + `    function applyToastClass(sClass) {` + `
` + `      const classes = sClass.trim().split(/\\s+/).filter(Boolean);` + `
` + `      if (!classes.length) return;` + `
` + `      const apply = () => {` + `
` + `        const toasts = document.querySelectorAll(".sapMMessageToast");` + `
` + `        const toastEl = toasts[toasts.length - 1];` + `
` + `        if (toastEl) toastEl.classList.add(...classes);` + `
` + `        return Boolean(toastEl);` + `
` + `      };` + `
` + `      if (!apply()) requestAnimationFrame(apply);` + `
` + `    }` + `
` + `` + `
` + `    function showToast(sText, mOptions, oController) {` + `
` + `      const o = { ...(mOptions || {}) };` + `
` + `      const sClass = o.class;` + `
` + `      delete o.class;` + `
` + `      if (o.onClose) {` + `
` + `        const sEvent = o.onClose;` + `
` + `` + `
` + `        o.onClose = () => {` + `
` + `          if (!Lib.isControllerAlive(oController)) return;` + `
` + `          oController.eB([sEvent]);` + `
` + `        };` + `
` + `      }` + `
` + `` + `
` + `      if (Object.keys(o).length) MessageToast.show(sText, o);` + `
` + `      else MessageToast.show(sText);` + `
` + `      if (sClass) applyToastClass(sClass);` + `
` + `    }` + `
` + `` + `
` + `    let iBoxNo = 0;` + `
` + `` + `
` + `    function expandBoxDetails(sDialogId) {` + `
` + `      const oDialog = Env.getElementById(sDialogId);` + `
` + `      const oLayout = oDialog?.getContent?.()[0];` + `
` + `      if (!oLayout?.getItems) return;` + `
` + `      for (const oItem of oLayout.getItems()) {` + `
` + `        if (!oItem?.isA) continue;` + `
` + `` + `
` + `        if (oItem.isA("sap.m.FormattedText")) oItem.setVisible(true);` + `
` + `        else if (oItem.isA("sap.m.Link")) oItem.setVisible(false);` + `
` + `      }` + `
` + `    }` + `
` + `` + `
` + `    function showBox(sType, sText, mOptions, oController) {` + `
` + `      const o = { ...(mOptions || {}) };` + `
` + `      if (o.onClose) {` + `
` + `        const sEvent = o.onClose;` + `
` + `` + `
` + `        o.onClose = (sAction) => {` + `
` + `          if (!Lib.isControllerAlive(oController)) return;` + `
` + `          oController.eB([sEvent], sAction);` + `
` + `        };` + `
` + `      }` + `
` + `      if (o.details) {` + `
` + `        o.details = Lib.sanitizeMessageDetails(o.details);` + `
` + `        if (!o.id) o.id = \`z2ui5MessageBox\${++iBoxNo}\`;` + `
` + `      }` + `
` + `      if (o.dependentOn) {` + `
` + `        const oDependentOn = ViewSlots.resolveById(` + `
` + `          oController?.ctx,` + `
` + `          o.dependentOn,` + `
` + `        );` + `
` + `        if (oDependentOn) o.dependentOn = oDependentOn;` + `
` + `        else delete o.dependentOn;` + `
` + `      }` + `
` + `` + `
` + `      let showFn = MessageBox[sType];` + `
` + `      if (typeof showFn !== "function") {` + `
` + `        Lib.logError(` + `
` + `          \`ControlCall: unknown message box type '\${sType}', shown via show()\`,` + `
` + `        );` + `
` + `        showFn = MessageBox.show;` + `
` + `      }` + `
` + `` + `
` + `      if (Object.keys(o).length) showFn(sText, o);` + `
` + `      else showFn(sText);` + `
` + `` + `
` + `      if (o.details) expandBoxDetails(o.id);` + `
` + `    }` + `
` + `` + `
` + `    const CONTROL_METHODS = {` + `
` + `      to: ["pageId", "string"],` + `
` + `      back: [],` + `
` + `` + `
` + `      backToPage: ["pageId"],` + `
` + `      toDetail: ["controlId"],` + `
` + `      toMaster: ["controlId"],` + `
` + `      backDetail: [],` + `
` + `      backMaster: [],` + `
` + `      setMode: ["string"],` + `
` + `      navigateBack: [],` + `
` + `      focus: [],` + `
` + `      scrollToIndex: ["int"],` + `
` + `      scrollTo: ["int", "int"],` + `
` + `      open: ["string"],` + `
` + `      close: [],` + `
` + `      setExpanded: ["bool"],` + `
` + `      discardProgress: ["controlId"],` + `
` + `      setNextStep: ["controlId"],` + `
` + `      setCurrentStep: ["controlId"],` + `
` + `      goToStep: ["controlId", "bool"],` + `
` + `      openBy: ["anchor"],` + `
` + `      toggleBy: ["anchor"],` + `
` + `      setActivePage: ["controlId"],` + `
` + `      expandToLevel: ["int"],` + `
` + `      collapseAll: [],` + `
` + `      expandSelected: [],` + `
` + `      collapseSelected: [],` + `
` + `      setHiddenInPopin: ["object"],` + `
` + `      setSticky: ["object"],` + `
` + `      setSelectedSection: ["controlIdOrNull"],` + `
` + `      setSelectedItem: ["controlIdOrNull"],` + `
` + `      setP13nData: ["object"],` + `
` + `` + `
` + `      setBadgeMinValue: ["int"],` + `
` + `      setBadgeMaxValue: ["int"],` + `
` + `` + `
` + `      css: ["string", "string"],` + `
` + `      enablePostButton: ["bool"],` + `
` + `      addStyleClass: ["string"],` + `
` + `      removeStyleClass: ["string"],` + `
` + `      toggleStyleClass: ["string"],` + `
` + `      setAsyncURLHandler: ["string"],` + `
` + `    };` + `
` + `` + `
` + `    Object.setPrototypeOf(CONTROL_METHODS, null);` + `
` + `` + `
` + `    const URL_POLICIES = {` + `
` + `      ALLOW_ALL: () => true,` + `
` + `` + `
` + `      RELATIVE_ONLY: (url) => !isAbsoluteUrl(url),` + `
` + `      DENY_ALL: () => false,` + `
` + `    };` + `
` + `` + `
` + `    const CSS_PROPERTIES = [` + `
` + `      "width",` + `
` + `      "min-width",` + `
` + `      "max-width",` + `
` + `      "height",` + `
` + `      "min-height",` + `
` + `      "max-height",` + `
` + `      "color",` + `
` + `      "background-color",` + `
` + `      "font-size",` + `
` + `      "opacity",` + `
` + `    ];` + `
` + `` + `
` + `    function isAbsoluteUrl(url) {` + `
` + `      const s = String(url ?? "").trim();` + `
` + `` + `
` + `      return /^[a-z][a-z0-9+.-]*:/i.test(s) || s.startsWith("//");` + `
` + `    }` + `
` + `` + `
` + `    const CONTROL_METHOD_DENY_EXACT = [` + `
` + `      "destroy",` + `
` + `      "exit",` + `
` + `      "fireEvent",` + `
` + `      "clone",` + `
` + `      "applySettings",` + `
` + `      "setAggregation",` + `
` + `      "addAggregation",` + `
` + `      "insertAggregation",` + `
` + `      "removeAggregation",` + `
` + `      "removeAllAggregation",` + `
` + `      "destroyAggregation",` + `
` + `      "setAssociation",` + `
` + `      "addAssociation",` + `
` + `      "removeAssociation",` + `
` + `      "removeAllAssociation",` + `
` + `    ];` + `
` + `` + `
` + `    const CONTROL_METHOD_DENY_PREFIXES = [` + `
` + `      "_",` + `
` + `      "bind",` + `
` + `      "unbind",` + `
` + `      "attach",` + `
` + `      "detach",` + `
` + `      "addDependent",` + `
` + `      "placeAt",` + `
` + `      "rerender",` + `
` + `      "invalidate",` + `
` + `      "setModel",` + `
` + `      "setBinding",` + `
` + `      "setParent",` + `
` + `    ];` + `
` + `` + `
` + `    const CONTROL_METHOD_DENY = new RegExp(` + `
` + `      "^(" + CONTROL_METHOD_DENY_PREFIXES.join("|") + ")",` + `
` + `    );` + `
` + `` + `
` + `    const CONTROL_METHOD_DENY_SET = new Set(CONTROL_METHOD_DENY_EXACT);` + `
` + `` + `
` + `    function isSafeControlMethod(method) {` + `
` + `      return (` + `
` + `        typeof method === "string" &&` + `
` + `        method.length > 0 &&` + `
` + `        !CONTROL_METHOD_DENY_SET.has(method) &&` + `
` + `        !CONTROL_METHOD_DENY.test(method)` + `
` + `      );` + `
` + `    }` + `
` + `` + `
` + `    const GLOBAL_TARGETS = {` + `
` + `      MESSAGE_TOAST: {` + `
` + `        get: () => MessageToast,` + `
` + `        methods: { show: ["string"] },` + `
` + `        display: (oController, method, aArgs, mOptions) =>` + `
` + `          showToast(aArgs[0], mOptions, oController),` + `
` + `      },` + `
` + `      MESSAGE_BOX: {` + `
` + `        get: () => MessageBox,` + `
` + `` + `
` + `        methods: {` + `
` + `          show: ["string"],` + `
` + `          alert: ["string"],` + `
` + `          confirm: ["string"],` + `
` + `          information: ["string"],` + `
` + `          warning: ["string"],` + `
` + `          error: ["string"],` + `
` + `          success: ["string"],` + `
` + `        },` + `
` + `        display: (oController, method, aArgs, mOptions) =>` + `
` + `          showBox(method, aArgs[0], mOptions, oController),` + `
` + `      },` + `
` + `` + `
` + `      VIEW_SLOTS: {` + `
` + `        get: () => ViewSlots,` + `
` + `` + `
` + `        methods: {` + `
` + `          destroy: ["string"],` + `
` + `          display: ["string", "string"],` + `
` + `` + `
` + `          updateModel: [],` + `
` + `        },` + `
` + `        display: (oController, method, aArgs, mOptions, ctx) =>` + `
` + `          Slots.action(` + `
` + `            oController?.ctx,` + `
` + `            method,` + `
` + `            aArgs[0],` + `
` + `            aArgs[1],` + `
` + `            mOptions,` + `
` + `            ctx?.seq,` + `
` + `          ),` + `
` + `      },` + `
` + `` + `
` + `      ROUTER: {` + `
` + `        get: () => Router,` + `
` + `        methods: { sync: [] },` + `
` + `        display: (oController, method, aArgs, mOptions, ctx) => {` + `
` + `          if (ctx?.response) ctx.response._routerOptions = mOptions;` + `
` + `          else Router.sync(oController?.ctx, mOptions);` + `
` + `        },` + `
` + `      },` + `
` + `      BUSY_INDICATOR: {` + `
` + `        get: () => BusyIndicator,` + `
` + `        methods: { show: ["int"], hide: [] },` + `
` + `      },` + `
` + `` + `
` + `      ICON_POOL: {` + `
` + `        get: () => sap.ui.require("sap/ui/core/IconPool"),` + `
` + `        methods: { registerFont: ["string", "string"] },` + `
` + `` + `
` + `        display: (oController, method, aArgs, mOptions, ctx, oIconPool) =>` + `
` + `          registerIconFont(oIconPool, aArgs[0], aArgs[1]),` + `
` + `      },` + `
` + `` + `
` + `      THEMING: {` + `
` + `        get: () => Env.getThemingModule(),` + `
` + `        methods: { setTheme: ["string"] },` + `
` + `      },` + `
` + `` + `
` + `      POPUP: {` + `
` + `        get: () => CorePopup,` + `
` + `        methods: { setWithinArea: ["within"] },` + `
` + `      },` + `
` + `` + `
` + `      INVISIBLE_MESSAGE: {` + `
` + `        get: () => {` + `
` + `          const IM = sap.ui.require("sap/ui/core/InvisibleMessage");` + `
` + `          return IM ? IM.getInstance() : undefined;` + `
` + `        },` + `
` + `        methods: { announce: ["string", "string"] },` + `
` + `      },` + `
` + `` + `
` + `      FORMATTING: {` + `
` + `        get: () => sap.ui.require("sap/base/i18n/Formatting"),` + `
` + `        methods: {` + `
` + `          setCustomCurrencies: ["object"],` + `
` + `          addCustomCurrencies: ["object"],` + `
` + `        },` + `
` + `      },` + `
` + `    };` + `
` + `` + `
` + `    Object.setPrototypeOf(GLOBAL_TARGETS, null);` + `
` + `` + `
` + `    const AGG_ITEM = /^([^/]+)\\/([A-Za-z_][\\w]*)\\/(\\d+)$/;` + `
` + `` + `
` + `    function resolveControl(raw, view, ctx) {` + `
` + `      const byId = (id) =>` + `
` + `        (view && ViewSlots.byId(ctx, view.toUpperCase(), id)) ||` + `
` + `        ViewSlots.resolveById(ctx, id);` + `
` + `` + `
` + `      const m = AGG_ITEM.exec(String(raw ?? ""));` + `
` + `      if (!m) return byId(raw);` + `
` + `` + `
` + `      const owner = byId(m[1]);` + `
` + `      if (!owner || typeof owner.getAggregation !== "function") {` + `
` + `        Lib.logError(\`aggregation item '\${raw}': no control '\${m[1]}'\`);` + `
` + `        return null;` + `
` + `      }` + `
` + `      const items = owner.getAggregation(m[2]);` + `
` + `      if (!Array.isArray(items)) {` + `
` + `        Lib.logError(` + `
` + `          \`aggregation item '\${raw}': '\${m[2]}' is no multiple aggregation of \${m[1]}\`,` + `
` + `        );` + `
` + `        return null;` + `
` + `      }` + `
` + `      const item = items[Number(m[3])];` + `
` + `      if (!item) {` + `
` + `        Lib.logError(` + `
` + `          \`aggregation item '\${raw}': \${m[2]} has \${items.length} item(s)\`,` + `
` + `        );` + `
` + `        return null;` + `
` + `      }` + `
` + `      return item;` + `
` + `    }` + `
` + `` + `
` + `    function resolveControlOrNull(raw, view, ctx) {` + `
` + `      if (raw === "" || raw === undefined || raw === null) return null;` + `
` + `      return resolveControl(raw, view, ctx) || null;` + `
` + `    }` + `
` + `` + `
` + `    function castArg(kind, raw, view, ctx) {` + `
` + `      switch (kind) {` + `
` + `        case "int":` + `
` + `          return Number(raw);` + `
` + `        case "bool":` + `
` + `          return raw === "true" || raw === "X" || raw === true;` + `
` + `        case "controlId":` + `
` + `          return resolveControl(raw, view, ctx);` + `
` + `        case "pageId": {` + `
` + `          const page = resolveControl(raw, view, ctx);` + `
` + `          if (page && typeof page.getId === "function") return page.getId();` + `
` + `` + `
` + `          Lib.logError(` + `
` + `            \`CONTROL_CALL: no control '\${raw}' for the page argument\`,` + `
` + `          );` + `
` + `          return raw;` + `
` + `        }` + `
` + `        case "controlIdOrNull":` + `
` + `          return resolveControlOrNull(raw, view, ctx);` + `
` + `        case "anchor":` + `
` + `          return resolveControl(raw, view, ctx);` + `
` + `        case "within":` + `
` + `          return resolveControlOrNull(raw, view, ctx);` + `
` + `        case "object":` + `
` + `          if (raw && typeof raw === "object") return raw;` + `
` + `          try {` + `
` + `            return JSON.parse(raw);` + `
` + `          } catch {` + `
` + `            Lib.logError(\`CONTROL_CALL: malformed object argument '\${raw}'\`);` + `
` + `            return {};` + `
` + `          }` + `
` + `        default:` + `
` + `          return raw;` + `
` + `      }` + `
` + `    }` + `
` + `` + `
` + `    function castArgAuto(raw) {` + `
` + `      if (raw === "X" || raw === "true") return true;` + `
` + `      if (raw === "" || raw === " " || raw === "false") return false;` + `
` + `      return raw;` + `
`;
    result = result + `    }` + `
` + `` + `
` + `    function setsStringProperty(control, method) {` + `
` + `      if (!control || typeof method !== "string" || !/^set[A-Z]/.test(method))` + `
` + `        return false;` + `
` + `      const prop = control.getMetadata?.()?.getAllProperties?.()[` + `
` + `        method.charAt(3).toLowerCase() + method.slice(4)` + `
` + `      ];` + `
` + `      if (!prop) return false;` + `
` + `      const primitive = prop.getType?.()?.getPrimitiveType?.()?.getName?.();` + `
` + `      return primitive ? primitive === "string" : prop.type === "string";` + `
` + `    }` + `
` + `` + `
` + `    const NULLABLE_KINDS = ["controlIdOrNull"];` + `
` + `` + `
` + `    function castArgs(kinds, rawArgs, view, target, ctx) {` + `
` + `      if (kinds === null) {` + `
` + `        const keepString = setsStringProperty(target?.control, target?.method);` + `
` + `        return rawArgs.map((raw, i) =>` + `
` + `          i === 0 && keepString ? raw : castArgAuto(raw),` + `
` + `        );` + `
` + `      }` + `
` + `` + `
` + `      let count = rawArgs.length;` + `
` + `      while (count < kinds.length && NULLABLE_KINDS.includes(kinds[count]))` + `
` + `        count++;` + `
` + `      return kinds` + `
` + `        .slice(0, count)` + `
` + `        .map((kind, i) => castArg(kind, rawArgs[i], view, ctx));` + `
` + `    }` + `
` + `` + `
` + `    const registeredIconFonts = new Set();` + `
` + `` + `
` + `    function registerIconFont(IconPool, fontFamily, fontURI) {` + `
` + `      if (!fontFamily || !fontURI) {` + `
` + `        Lib.logError(` + `
` + `          "ICON_POOL: registerFont needs a fontFamily AND a fontURI",` + `
` + `        );` + `
` + `        return;` + `
` + `      }` + `
` + `      if (registeredIconFonts.has(fontFamily)) return;` + `
` + `` + `
` + `      const uri = /^(?:[a-z]+:)?\\/\\//i.test(fontURI)` + `
` + `        ? fontURI` + `
` + `        : sap.ui.require.toUrl(fontURI);` + `
` + `      IconPool.registerFont({ fontFamily, fontURI: uri });` + `
` + `      registeredIconFonts.add(fontFamily);` + `
` + `    }` + `
` + `` + `
` + `    function selectedIndicesOf(control) {` + `
` + `      if (typeof control.getSelectedIndices === "function") {` + `
` + `        return control.getSelectedIndices();` + `
` + `      }` + `
` + `      if (` + `
` + `        typeof control.getSelectedItems === "function" &&` + `
` + `        typeof control.indexOfItem === "function"` + `
` + `      ) {` + `
` + `        return control` + `
` + `          .getSelectedItems()` + `
` + `          .map((item) => control.indexOfItem(item))` + `
` + `          .filter((i) => i >= 0);` + `
` + `      }` + `
` + `      return null;` + `
` + `    }` + `
` + `` + `
` + `    function whenAnchorRendered(anchor, oController, fn) {` + `
` + `      const guarded = () => {` + `
` + `        if (!Lib.isControllerAlive(oController)) return;` + `
` + `        fn();` + `
` + `      };` + `
` + `      if (anchor && typeof anchor.getDomRef === "function") {` + `
` + `        Lib.whenRendered(anchor, oController, guarded, "open");` + `
` + `      } else {` + `
` + `        guarded();` + `
` + `      }` + `
` + `    }` + `
` + `` + `
` + `    function pseudoToggleBy({ control, id, view, kinds, args, oController }) {` + `
` + `      if (!control || typeof control.openBy !== "function") {` + `
` + `        Lib.logError(` + `
` + `          \`CONTROL_BY_ID: 'toggleBy' not callable on control '\${id}'\`,` + `
` + `        );` + `
` + `        return;` + `
` + `      }` + `
` + `      const anchor = castArgs(` + `
` + `        kinds,` + `
` + `        args.slice(4),` + `
` + `        view,` + `
` + `        undefined,` + `
` + `        oController?.ctx,` + `
` + `      )[0];` + `
` + `` + `
` + `      whenAnchorRendered(anchor, oController, () => {` + `
` + `        if (control.isOpen?.()) control.close();` + `
` + `        else control.openBy(anchor);` + `
` + `      });` + `
` + `    }` + `
` + `` + `
` + `    function pseudoOpenBy({ control, id, view, kinds, args, oController }) {` + `
` + `      if (` + `
` + `        !control ||` + `
` + `        (typeof control.openBy !== "function" &&` + `
` + `          typeof control.open !== "function")` + `
` + `      ) {` + `
` + `        Lib.logError(\`CONTROL_BY_ID: 'openBy' not callable on control '\${id}'\`);` + `
` + `        return;` + `
` + `      }` + `
` + `      const anchor = castArgs(` + `
` + `        kinds,` + `
` + `        args.slice(4),` + `
` + `        view,` + `
` + `        undefined,` + `
` + `        oController?.ctx,` + `
` + `      )[0];` + `
` + `` + `
` + `      whenAnchorRendered(anchor, oController, () => {` + `
` + `        if (typeof control.openBy === "function") control.openBy(anchor);` + `
` + `        else control.open(false, anchor, "begin top", "begin bottom", anchor);` + `
` + `      });` + `
` + `    }` + `
` + `` + `
` + `    function pseudoCss({ control, id, args }) {` + `
` + `      const prop = String(args[4] ?? "").toLowerCase();` + `
` + `      if (!CSS_PROPERTIES.includes(prop)) {` + `
` + `        Lib.logError(` + `
` + `          \`CONTROL_BY_ID: css property '\${args[4]}' not allowed (allowed: \${CSS_PROPERTIES.join(", ")})\`,` + `
` + `        );` + `
` + `        return;` + `
` + `      }` + `
` + `      const el = control?.getDomRef?.();` + `
` + `      if (!el) {` + `
` + `        Lib.logError(\`CONTROL_BY_ID: 'css' - control '\${id}' has no DOM ref\`);` + `
` + `        return;` + `
` + `      }` + `
` + `      el.style.setProperty(prop, String(args[5] ?? ""));` + `
` + `    }` + `
` + `` + `
` + `    function pseudoExpandCollapse({ control, id, method }) {` + `
` + `      const op = method === "expandSelected" ? "expand" : "collapse";` + `
` + `      if (!control || typeof control[op] !== "function") {` + `
` + `        Lib.logError(` + `
` + `          \`CONTROL_BY_ID: '\${method}' not callable on control '\${id}'\`,` + `
` + `        );` + `
` + `        return;` + `
` + `      }` + `
` + `      const indices = selectedIndicesOf(control);` + `
` + `      if (indices === null) {` + `
` + `        Lib.logError(` + `
` + `          \`CONTROL_BY_ID: '\${method}' - control '\${id}' exposes no selection\`,` + `
` + `        );` + `
` + `        return;` + `
` + `      }` + `
` + `` + `
` + `      if (indices.length) control[op](indices);` + `
` + `    }` + `
` + `` + `
` + `    function pseudoSetAsyncURLHandler({ control, id, args }) {` + `
` + `      const policy = String(args[4] ?? "").toUpperCase();` + `
` + `      const isAllowed = URL_POLICIES[policy];` + `
` + `      if (!isAllowed) {` + `
` + `        Lib.logError(` + `
` + `          \`CONTROL_BY_ID: unknown URL policy '\${args[4]}' (allowed: \${Object.keys(URL_POLICIES).join(", ")})\`,` + `
` + `        );` + `
` + `        return;` + `
` + `      }` + `
` + `      if (!control || typeof control.setAsyncURLHandler !== "function") {` + `
` + `        Lib.logError(` + `
` + `          \`CONTROL_BY_ID: 'setAsyncURLHandler' not callable on control '\${id}'\`,` + `
` + `        );` + `
` + `        return;` + `
` + `      }` + `
` + `      control.setAsyncURLHandler((config) => {` + `
` + `        config?.promise?.resolve({` + `
` + `          allowed: isAllowed(config.url),` + `
` + `          id: config.id,` + `
` + `        });` + `
` + `      });` + `
` + `    }` + `
` + `` + `
` + `    function isRootPrototypeMethod(obj, method) {` + `
` + `      let owner = obj;` + `
` + `      while (` + `
` + `        owner !== null &&` + `
` + `        owner !== undefined &&` + `
` + `        !Object.prototype.hasOwnProperty.call(owner, method)` + `
` + `      ) {` + `
` + `        owner = Object.getPrototypeOf(owner);` + `
` + `      }` + `
` + `      return !!owner && Object.getPrototypeOf(owner) === null;` + `
` + `    }` + `
` + `` + `
` + `    const PSEUDO_METHODS = Object.assign(Object.create(null), {` + `
` + `      toggleBy: pseudoToggleBy,` + `
` + `      openBy: pseudoOpenBy,` + `
` + `      css: pseudoCss,` + `
` + `      expandSelected: pseudoExpandCollapse,` + `
` + `      collapseSelected: pseudoExpandCollapse,` + `
` + `      setAsyncURLHandler: pseudoSetAsyncURLHandler,` + `
` + `    });` + `
` + `` + `
` + `    function evControlCallById(oController, args) {` + `
` + `      const [, id, view, method] = args;` + `
` + `      let kinds = CONTROL_METHODS[method];` + `
` + `      if (!kinds) {` + `
` + `        if (!isSafeControlMethod(method)) {` + `
` + `          Lib.logError(\`CONTROL_BY_ID: method '\${method}' not allowed\`);` + `
` + `          return;` + `
` + `        }` + `
` + `        kinds = null;` + `
` + `      }` + `
` + `` + `
` + `      const ctx = oController?.ctx;` + `
` + `      const control = resolveControl(id, view, ctx);` + `
` + `      const pseudo = PSEUDO_METHODS[method];` + `
` + `      if (pseudo) {` + `
` + `        pseudo({ control, id, view, method, kinds, args, oController });` + `
` + `        return;` + `
` + `      }` + `
` + `` + `
` + `      const inherited =` + `
` + `        method === "constructor" || isRootPrototypeMethod(control, method);` + `
` + `      if (!control || inherited || typeof control[method] !== "function") {` + `
` + `        Lib.logError(` + `
` + `          \`CONTROL_BY_ID: '\${method}' not callable on control '\${id}'\`,` + `
` + `        );` + `
` + `        return;` + `
` + `      }` + `
` + `      control[method](` + `
` + `        ...castArgs(kinds, args.slice(4), view, { control, method }, ctx),` + `
` + `      );` + `
` + `    }` + `
` + `` + `
` + `    function evControlCall(oController, args, ctx) {` + `
` + `      const [, name, method] = args;` + `
` + `      const target = GLOBAL_TARGETS[name];` + `
` + `` + `
` + `      const kinds =` + `
` + `        target && Object.prototype.hasOwnProperty.call(target.methods, method)` + `
` + `          ? target.methods[method]` + `
` + `          : undefined;` + `
` + `      if (!kinds) {` + `
` + `        Lib.logError(\`CONTROL_GLOBAL: '\${name}.\${method}' not allowed\`);` + `
` + `        return;` + `
` + `      }` + `
` + `      const obj = target.get();` + `
` + `      if (!obj) {` + `
` + `        Lib.logError(\`CONTROL_GLOBAL: '\${name}.\${method}' not available\`);` + `
` + `        return;` + `
` + `      }` + `
` + `      let raw = args.slice(3);` + `
` + `` + `
` + `      let mOptions;` + `
` + `      if (target.display) {` + `
` + `        const last = raw[raw.length - 1];` + `
` + `        if (last && typeof last === "object") {` + `
` + `          mOptions = last;` + `
` + `          raw = raw.slice(0, -1);` + `
` + `        }` + `
` + `      }` + `
` + `` + `
` + `      if (kinds.length === 1 && kinds[0] === "string" && raw.length > 1) {` + `
` + `        raw = [formatTemplate(String(raw[0]), raw.slice(1))];` + `
` + `      }` + `
` + `` + `
` + `      if (target.display) {` + `
` + `        return target.display(` + `
` + `          oController,` + `
` + `          method,` + `
` + `          raw,` + `
` + `          mOptions || {},` + `
` + `          ctx,` + `
` + `          obj,` + `
` + `        );` + `
` + `      }` + `
` + `      if (typeof obj[method] !== "function") {` + `
` + `        Lib.logError(\`CONTROL_GLOBAL: '\${name}.\${method}' not available\`);` + `
` + `        return;` + `
` + `      }` + `
` + `      obj[method](` + `
` + `        ...castArgs(kinds, raw, undefined, undefined, oController?.ctx),` + `
` + `      );` + `
` + `    }` + `
` + `` + `
` + `    function formatTemplate(tpl, values) {` + `
` + `      return tpl.replace(` + `
` + `        /\\{(\\d+)(?:\\?([^:}]*):([^}]*))?\\}/g,` + `
` + `        (m, i, tText, fText) => {` + `
` + `          const n = Number(i);` + `
` + `          if (n >= values.length) return m;` + `
` + `          const v = String(values[n]);` + `
` + `          if (tText === undefined) return v;` + `
` + `          const truthy = v !== "" && !/^(false|0|undefined|null)$/i.test(v);` + `
` + `          return truthy ? tText : fText;` + `
` + `        },` + `
` + `      );` + `
` + `    }` + `
` + `` + `
` + `    const handlers = {` + `
` + `      CONTROL_BY_ID: evControlCallById,` + `
` + `      CONTROL_GLOBAL: evControlCall,` + `
` + `    };` + `
` + `` + `
` + `    for (const name of Object.keys(GLOBAL_TARGETS)) {` + `
` + `      handlers[name] = (oController, args, ctx) =>` + `
` + `        evControlCall(oController, ["CONTROL_GLOBAL", ...args], ctx);` + `
` + `    }` + `
` + `` + `
` + `    return { handlers, castArg };` + `
` + `  },` + `
` + `);` + `
` + `` + `
` + ``;
    return result;
  }
}

module.exports = z2ui5_cl_ui5f_ctrlcall_js;

