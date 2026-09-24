
class z2ui5_cl_ui5f_viewops_js {
  static get() {
    let result = ``;
    result = `sap.ui.define(["z2ui5/core/Lib", "z2ui5/core/ViewSlots"], (Lib, ViewSlots) => {` + `
` + `  "use strict";` + `
` + `` + `
` + `  const SMOOTH_SCROLL_MS = 300;` + `
` + `` + `
` + `  function evSetSizeLimit(oController, args) {` + `
` + `    const hasLimit = args[2] !== undefined && args[2] !== "";` + `
` + `    const viewKey = hasLimit ? args[2] : args[1];` + `
` + `    const limit = hasLimit ? Number(args[1]) : NaN;` + `
` + `` + `
` + `    const isValidLimit = Number.isFinite(limit) && limit > 0;` + `
` + `    const previous = oController.ctx.state.viewSizeLimits[viewKey];` + `
` + `    if (isValidLimit) {` + `
` + `      oController.ctx.state.viewSizeLimits[viewKey] = limit;` + `
` + `    } else {` + `
` + `      delete oController.ctx.state.viewSizeLimits[viewKey];` + `
` + `    }` + `
` + `` + `
` + `    if (previous === oController.ctx.state.viewSizeLimits[viewKey]) return;` + `
` + `` + `
` + `    const modelKey = Lib.isRootModelSlot(viewKey) ? "MAIN" : viewKey;` + `
` + `` + `
` + `    const view = ViewSlots.getView(oController.ctx, modelKey);` + `
` + `    const model = view` + `
` + `      ? (ViewSlots.trackedModel(view) ?? view.getModel())` + `
` + `      : undefined;` + `
` + `    if (model) {` + `
` + `      const effective = Lib.effectiveSizeLimit(` + `
` + `        oController.ctx.state.viewSizeLimits,` + `
` + `        viewKey,` + `
` + `      );` + `
` + `` + `
` + `      model.setSizeLimit(effective ?? 100);` + `
` + `      model.refresh(true);` + `
` + `    }` + `
` + `  }` + `
` + `` + `
` + `  async function evSetODataModel(oController, args) {` + `
` + `    let oModel;` + `
` + `    try {` + `
` + `      const ODataModel = await Lib.requireODataModel();` + `
` + `      oModel = new ODataModel({` + `
` + `        serviceUrl: args[1],` + `
` + `        annotationURI: args[3] || "",` + `
` + `      });` + `
` + `      const oView = ViewSlots.getView(oController.ctx, "MAIN");` + `
` + `      if (oView) {` + `
` + `        const name = args[2] || undefined;` + `
` + `` + `
` + `        const previous = oView.getModel(name);` + `
` + `        oView.setModel(oModel, name);` + `
` + `        oController.ctx.state.odataClients.add(oModel);` + `
` + `` + `
` + `        if (` + `
` + `          previous !== oModel &&` + `
` + `          oController.ctx.state.odataClients.has(previous)` + `
` + `        ) {` + `
` + `          oController.ctx.state.odataClients.delete(previous);` + `
` + `          previous.destroy();` + `
` + `        }` + `
` + `      } else {` + `
` + `        oModel.destroy();` + `
` + `      }` + `
` + `    } catch (e) {` + `
` + `      Lib.logError(\`SET_ODATA_MODEL: failed for '\${args[1]}'\`, e);` + `
` + `` + `
` + `      oController.ctx.state.odataClients.delete(oModel);` + `
` + `      oModel?.destroy?.();` + `
` + `    }` + `
` + `  }` + `
` + `` + `
` + `  function evBindElement(oController, args) {` + `
` + `    const slot = args[1] || "MAIN";` + `
` + `    const view = ViewSlots.getView(oController.ctx, slot);` + `
` + `    if (!view) {` + `
` + `      Lib.logError(\`BIND_ELEMENT: no view for slot '\${slot}'\`);` + `
` + `      return;` + `
` + `    }` + `
` + `    const path = String(args[3] ?? "").replace(/[{}]/g, "");` + `
` + `    if (!path) {` + `
` + `      Lib.logError("BIND_ELEMENT: empty binding path");` + `
` + `      return;` + `
` + `    }` + `
` + `    view.bindElement(\`\${path}/\${args[2]}\`);` + `
` + `  }` + `
` + `` + `
` + `  function evStartTimer(oController, args) {` + `
` + `    const timerKey = args[0];` + `
` + `    const callbackEvent = args[1];` + `
` + `    const delay = Number(args[2]) || 0;` + `
` + `    const timers = oController.ctx.state.timers;` + `
` + `    Lib.cancelTimer(timers[timerKey]);` + `
` + `    const fire = () => {` + `
` + `      delete timers[timerKey];` + `
` + `` + `
` + `      if (!Lib.isControllerAlive(oController)) return;` + `
` + `` + `
` + `      if (oController.ctx.state.isBusy) {` + `
` + `        const cancel = Lib.afterRoundtrip(oController, () => {` + `
` + `          timers[timerKey] = setTimeout(fire, 0);` + `
` + `        });` + `
` + `        if (!(timerKey in timers)) timers[timerKey] = cancel;` + `
` + `        return;` + `
` + `      }` + `
` + `` + `
` + `      oController.eB([callbackEvent, false, true]);` + `
` + `    };` + `
` + `    timers[timerKey] = setTimeout(fire, delay);` + `
` + `  }` + `
` + `` + `
` + `  function resolveTarget(oController, action, id) {` + `
` + `    const oElement = ViewSlots.resolveById(oController?.ctx, id);` + `
` + `    if (!oElement) Lib.logError(\`\${action}: no control '\${id}'\`);` + `
` + `    return oElement;` + `
` + `  }` + `
` + `` + `
` + `  function evSetFocus(oController, args) {` + `
` + `    const oElement = resolveTarget(oController, "SET_FOCUS", args[1]);` + `
` + `    if (!oElement) return;` + `
` + `` + `
` + `    const applyFocus = () => {` + `
` + `      try {` + `
` + `        const info = oElement.getFocusInfo();` + `
` + `        if (args[2] != null && args[2] !== "") {` + `
` + `          info.selectionStart = Number(args[2]);` + `
` + `        }` + `
` + `        if (args[3] != null && args[3] !== "") {` + `
` + `          info.selectionEnd = Number(args[3]);` + `
` + `        }` + `
` + `        oElement.applyFocusInfo(info);` + `
` + `      } catch (e) {` + `
` + `        Lib.logError(\`SET_FOCUS: failed for '\${args[1]}'\`, e);` + `
` + `      }` + `
` + `    };` + `
` + `` + `
` + `    Lib.whenRendered(` + `
` + `      oElement,` + `
` + `      oController,` + `
` + `      () => {` + `
` + `        applyFocus();` + `
` + `        const dom = oElement.getDomRef();` + `
` + `        if (dom && dom.contains(document.activeElement)) return;` + `
` + `` + `
` + `        const prevActive = document.activeElement;` + `
` + `` + `
` + `        const samePlace = (el) =>` + `
` + `          el == null ||` + `
` + `          el === document.body ||` + `
` + `          el === prevActive ||` + `
` + `          Boolean(el.id && prevActive && el.id === prevActive.id);` + `
` + `` + `
` + `        Lib.onNextRendering(` + `
` + `          oElement,` + `
` + `          () => {` + `
` + `            setTimeout(() => {` + `
` + `              if (!Lib.isControllerAlive(oController)) return;` + `
` + `` + `
` + `              if (!samePlace(document.activeElement)) return;` + `
` + `              applyFocus();` + `
` + `            }, 0);` + `
` + `          },` + `
` + `          "focusRetry",` + `
` + `        );` + `
` + `      },` + `
` + `      "focus",` + `
` + `    );` + `
` + `  }` + `
` + `` + `
` + `  function evScrollTo(oController, args) {` + `
` + `    try {` + `
` + `      const oElement = resolveTarget(oController, "SCROLL_TO", args[1]);` + `
` + `      if (!oElement) return;` + `
` + `      const y = Number(args[2]) || 0;` + `
` + `      const x = Number(args[3]) || 0;` + `
` + `      const behavior = args[4] || "auto";` + `
` + `      const smooth = behavior === "smooth";` + `
` + `` + `
` + `      let handled = false;` + `
` + `      try {` + `
` + `        const delegate = oElement.getScrollDelegate?.();` + `
` + `        if (delegate?.scrollTo) {` + `
` + `          delegate.scrollTo(x, y, smooth ? SMOOTH_SCROLL_MS : 0);` + `
` + `          handled = true;` + `
` + `        }` + `
` + `      } catch {}` + `
` + `` + `
` + `      if (!handled) {` + `
` + `        const dom =` + `
` + `          document.getElementById(\`\${oElement.getId()}-inner\`) ||` + `
` + `          oElement.getDomRef();` + `
` + `        if (dom?.scrollTo) {` + `
` + `          dom.scrollTo({ top: y, left: x, behavior });` + `
` + `        } else if (dom) {` + `
` + `          dom.scrollTop = y;` + `
` + `          dom.scrollLeft = x;` + `
` + `        } else if (oElement.scrollTo) {` + `
` + `          oElement.scrollTo(y, smooth ? SMOOTH_SCROLL_MS : 0);` + `
` + `        }` + `
` + `      }` + `
` + `    } catch (e) {` + `
` + `      Lib.logError(\`SCROLL_TO: failed for '\${args[1]}'\`, e);` + `
` + `    }` + `
` + `  }` + `
` + `` + `
` + `  function evScrollIntoView(oController, args) {` + `
` + `    try {` + `
` + `      const oElement = resolveTarget(oController, "SCROLL_INTO_VIEW", args[1]);` + `
` + `      if (!oElement) return;` + `
` + `      const dom = oElement.getDomRef();` + `
` + `      if (!dom || !dom.scrollIntoView) return;` + `
` + `      dom.scrollIntoView({` + `
` + `        behavior: args[2] || "smooth",` + `
` + `        block: args[3] || "start",` + `
` + `        inline: args[4] || "nearest",` + `
` + `      });` + `
` + `    } catch (e) {` + `
` + `      Lib.logError(\`SCROLL_INTO_VIEW: failed for '\${args[1]}'\`, e);` + `
` + `    }` + `
` + `  }` + `
` + `` + `
` + `  const handlers = {` + `
` + `    SET_SIZE_LIMIT: evSetSizeLimit,` + `
` + `    SET_ODATA_MODEL: evSetODataModel,` + `
` + `    BIND_ELEMENT: evBindElement,` + `
` + `    START_TIMER: evStartTimer,` + `
` + `    SET_FOCUS: evSetFocus,` + `
` + `    SCROLL_TO: evScrollTo,` + `
` + `    SCROLL_INTO_VIEW: evScrollIntoView,` + `
` + `  };` + `
` + `` + `
` + `  return { handlers };` + `
` + `});` + `
` + `` + `
` + ``;
    return result;
  }
}

module.exports = z2ui5_cl_ui5f_viewops_js;

