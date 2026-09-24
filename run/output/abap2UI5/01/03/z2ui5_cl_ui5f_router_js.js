
class z2ui5_cl_ui5f_router_js {
  static get() {
    let result = ``;
    result = `sap.ui.define(` + `
` + `  ["sap/ui/core/routing/HashChanger", "z2ui5/core/Lib"],` + `
` + `  (HashChanger, Lib) => {` + `
` + `    "use strict";` + `
` + `` + `
` + `    const APP_ROUTE_PREFIX = "/app/";` + `
` + `` + `
` + `    const SHELL_SEPARATOR = "&/";` + `
` + `` + `
` + `    function hashChanger() {` + `
` + `      return HashChanger.getInstance();` + `
` + `    }` + `
` + `` + `
` + `    function splitHash(sHash) {` + `
` + `      const raw = String(sHash || "").replace(/^#/, "");` + `
` + `` + `
` + `      if (!raw || raw.startsWith("/")) return { shell: "", app: raw };` + `
` + `      const i = raw.indexOf(SHELL_SEPARATOR);` + `
` + `      if (i < 0) return { shell: "", app: raw };` + `
` + `      let app = raw.slice(i + SHELL_SEPARATOR.length).replace(/^\\/+/, "");` + `
` + `      if (app) app = \`/\${app}\`;` + `
` + `      return { shell: raw.slice(0, i), app };` + `
` + `    }` + `
` + `` + `
` + `    function appHashOf(sHash) {` + `
` + `      return splitHash(sHash).app;` + `
` + `    }` + `
` + `` + `
` + `    function getHash() {` + `
` + `      return appHashNormalized(hashChanger().getHash());` + `
` + `    }` + `
` + `` + `
` + `    function appHashNormalized(sHash) {` + `
` + `      const app = appHashOf(sHash);` + `
` + `` + `
` + `      if (app === "/") return "";` + `
` + `      return app && !app.startsWith("/") ? \`/\${app}\` : app;` + `
` + `    }` + `
` + `` + `
` + `    function getRawHash() {` + `
` + `      return String(window.location.hash || "").replace(/^#/, "");` + `
` + `    }` + `
` + `` + `
` + `    function patternFor(sClass, sDraftId) {` + `
` + `      const base = \`\${APP_ROUTE_PREFIX}\${sClass}\`;` + `
` + `      return sDraftId ? \`\${base}/\${sDraftId}\` : base;` + `
` + `    }` + `
` + `` + `
` + `    function segmentsOf(sHash) {` + `
` + `      const app = appHashOf(sHash).replace(/^\\/+/, "");` + `
` + `      const marker = "app/";` + `
` + `      if (!app.startsWith(marker)) return null;` + `
` + `` + `
` + `      return app.slice(marker.length).split(/[&?]/)[0].split("/");` + `
` + `    }` + `
` + `` + `
` + `    function parse(sHash) {` + `
` + `      const parts = segmentsOf(sHash);` + `
` + `      if (!parts) return null;` + `
` + `` + `
` + `      if (parts[0] === "") {` + `
` + `        if (parts.length < 3 || !parts[1] || !parts[2]) return null;` + `
` + `        return {` + `
` + `          app: \`/\${parts[1]}/\${parts[2]}\`,` + `
` + `          draft: parts.length > 3 ? parts[3] : "",` + `
` + `        };` + `
` + `      }` + `
` + `      if (!parts[0]) return null;` + `
` + `      return { app: parts[0], draft: parts.length > 1 ? parts[1] : "" };` + `
` + `    }` + `
` + `` + `
` + `    function navTo(sRoute, bReplace) {` + `
` + `      const sHash = String(sRoute || "").replace(/^\\/+/, "");` + `
` + `      if (bReplace) {` + `
` + `        hashChanger().replaceHash(sHash);` + `
` + `      } else {` + `
` + `        hashChanger().setHash(sHash);` + `
` + `      }` + `
` + `    }` + `
` + `` + `
` + `    function writeHash(ctx, sHash, bPush) {` + `
` + `      if (bPush) ctx.state.hashPushCount += 1;` + `
` + `      navTo(sHash, !bPush);` + `
` + `    }` + `
` + `` + `
` + `    function writeLegacyUrl(ctx, sSuffix, bPush) {` + `
` + `      const url = \`\${window.location.pathname}\${window.location.search}#\${getRawHash()}\${sSuffix}\`;` + `
` + `      if (bPush) {` + `
` + `        ctx.state.hashPushCount += 1;` + `
` + `        history.pushState(null, "", url);` + `
` + `      } else {` + `
` + `        history.replaceState(null, "", url);` + `
` + `      }` + `
` + `    }` + `
` + `` + `
` + `    function navBack(ctx, sFallback) {` + `
` + `      if (!sFallback || ctx.state.hashPushCount > 0) {` + `
` + `        window.history.back();` + `
` + `        return;` + `
` + `      }` + `
` + `      navTo(sFallback, true);` + `
` + `    }` + `
` + `` + `
` + `    function onHashChanged(ctx, sNewHash) {` + `
` + `      const state = ctx.state;` + `
` + `` + `
` + `      if (!state.navRouting) {` + `
` + `        dispatchAppHashChange(ctx, sNewHash);` + `
` + `        return;` + `
` + `      }` + `
` + `` + `
` + `      const route = parse(sNewHash);` + `
` + `      if (!route) return;` + `
` + `` + `
` + `      if (route.draft) {` + `
` + `        if (route.draft === state.currentDraftId) return;` + `
` + `      } else if (` + `
` + `        route.app.toUpperCase() === String(state.currentApp).toUpperCase()` + `
` + `      ) {` + `
` + `        return;` + `
` + `      }` + `
` + `` + `
` + `      state.navFromHash = true;` + `
` + `      if (ctx.router.navigate) ctx.router.navigate();` + `
` + `    }` + `
` + `` + `
` + `    function applyHashEvent(ctx, mOptions) {` + `
` + `      if (!mOptions.setHashEvent) return;` + `
` + `      const state = ctx.state;` + `
` + `      const sEvent = String(mOptions.setHashEvent).trim();` + `
` + `      state.hashEvent = sEvent || null;` + `
` + `` + `
` + `      state.appHash = appHashNormalized(getRawHash());` + `
` + `    }` + `
` + `` + `
` + `    function dispatchAppHashChange(ctx, sNewHash) {` + `
` + `      const state = ctx.state;` + `
` + `      if (!state.hashEvent) return;` + `
` + `      const appHash = appHashNormalized(sNewHash);` + `
` + `      if (appHash === state.appHash) return;` + `
` + `      const controller = state.oController;` + `
` + `      if (!controller || !Lib.isControllerAlive(controller)) return;` + `
` + `` + `
` + `      if (state.isBusy) {` + `
` + `        state.pendingAppHash = sNewHash;` + `
` + `        return;` + `
` + `      }` + `
` + `      state.pendingAppHash = null;` + `
` + `      state.appHash = appHash;` + `
` + `      controller.eB([state.hashEvent]);` + `
` + `    }` + `
` + `` + `
` + `    function dispatchPendingAppHash(ctx) {` + `
` + `      const state = ctx.state;` + `
` + `      const pending = state.pendingAppHash;` + `
` + `      if (pending === null || pending === undefined) return;` + `
` + `      state.pendingAppHash = null;` + `
` + `      dispatchAppHashChange(ctx, pending);` + `
` + `    }` + `
` + `` + `
` + `    function repointCallerEntry(ctx, mOptions, draftForRoute) {` + `
` + `      const state = ctx.state;` + `
` + `      const prevApp = mOptions.navAppCallPrevApp;` + `
` + `      const prevDraft = mOptions.navAppCallPrevId;` + `
` + `      if (!draftForRoute || !prevApp || !prevDraft) return;` + `
` + `      const prevRoute = patternFor(prevApp, prevDraft);` + `
` + `      if (getHash() === prevRoute) return;` + `
` + `` + `
` + `      state.currentDraftId = prevDraft;` + `
` + `      navTo(prevRoute, true);` + `
` + `    }` + `
` + `` + `
` + `    function applyMode(ctx, mOptions) {` + `
` + `      if (!mOptions.setNavRouting) return;` + `
` + `      const mode = String(mOptions.setNavRouting).toUpperCase();` + `
` + `      const on = mode === "KEEP" || mode === "FRESH";` + `
` + `      ctx.state.navRouting = on;` + `
` + `      ctx.state.navMode = on ? mode : null;` + `
` + `    }` + `
` + `` + `
` + `    function updateAppRoute(ctx, mOptions, ID, app) {` + `
` + `      const state = ctx.state;` + `
` + `` + `
` + `      const draftForRoute = state.navMode === "FRESH" ? null : ID;` + `
` + `` + `
` + `      state.currentApp = app;` + `
` + `      state.currentDraftId = draftForRoute;` + `
` + `` + `
` + `      if (state.navFromHash) {` + `
` + `        state.navFromHash = false;` + `
` + `        return;` + `
` + `      }` + `
` + `      if (mOptions.setPushState || mOptions.setHashReplace) return;` + `
` + `` + `
` + `      const route = patternFor(app, draftForRoute);` + `
` + `      if (mOptions.checkNavAppCall) {` + `
` + `        repointCallerEntry(ctx, mOptions, draftForRoute);` + `
` + `        state.currentApp = app;` + `
` + `        state.currentDraftId = draftForRoute;` + `
` + `        navTo(route);` + `
` + `      } else if (getHash() !== route) {` + `
` + `        navTo(route, true);` + `
` + `      }` + `
` + `    }` + `
` + `` + `
` + `    function sync(ctx, mOptions) {` + `
` + `      const ID = mOptions.id;` + `
` + `      try {` + `
` + `        applyMode(ctx, mOptions);` + `
` + `        applyHashEvent(ctx, mOptions);` + `
` + `` + `
` + `        const state = ctx.state;` + `
` + `` + `
` + `        const sAppWrite = mOptions.setPushState || mOptions.setHashReplace;` + `
` + `        const bPush = Boolean(mOptions.setPushState);` + `
` + `` + `
` + `        if (state.navRouting) {` + `
` + `          const app = state.oResponse?.APP;` + `
` + `          if (app) updateAppRoute(ctx, mOptions, ID, app);` + `
` + `` + `
` + `          if (!sAppWrite) return;` + `
` + `` + `
` + `          if (state.currentDraftId) {` + `
` + `            writeHash(` + `
` + `              ctx,` + `
` + `              patternFor(state.currentApp, state.currentDraftId) + sAppWrite,` + `
` + `              bPush,` + `
` + `            );` + `
` + `            return;` + `
` + `          }` + `
` + `        }` + `
` + `` + `
` + `        if (sAppWrite) {` + `
` + `          if (state.hashEvent) {` + `
` + `            state.appHash = appHashNormalized(sAppWrite);` + `
` + `            writeHash(ctx, sAppWrite, bPush);` + `
` + `            return;` + `
` + `          }` + `
` + `` + `
` + `          writeLegacyUrl(ctx, sAppWrite, bPush);` + `
` + `` + `
` + `          return;` + `
` + `        }` + `
` + `` + `
` + `        if (state.hashEvent) return;` + `
` + `` + `
` + `        const newHash = mOptions.setAppStateActive` + `
` + `          ? \`/z2ui5-xapp-state=\${ID || ""}\`` + `
` + `          : "";` + `
` + `        navTo(newHash, true);` + `
` + `      } catch (e) {` + `
` + `        Lib.logError("Router.sync: history update failed", e);` + `
` + `      }` + `
` + `    }` + `
` + `` + `
` + `    function init(ctx, fnNavigate) {` + `
` + `      ctx.router.navigate = fnNavigate;` + `
` + `` + `
` + `      const listener = (oEvent) =>` + `
` + `        onHashChanged(ctx, oEvent.getParameter("newHash"));` + `
` + `      ctx.router.hashListener = listener;` + `
` + `      hashChanger().attachEvent("hashChanged", listener);` + `
` + `` + `
` + `      hashChanger().init();` + `
` + `    }` + `
` + `` + `
` + `    function exit(ctx) {` + `
` + `      const listener = ctx.router.hashListener;` + `
` + `      if (listener) {` + `
` + `        hashChanger().detachEvent("hashChanged", listener);` + `
` + `        ctx.router.hashListener = null;` + `
` + `      }` + `
` + `      ctx.router.navigate = null;` + `
` + `    }` + `
` + `` + `
` + `    return {` + `
` + `      init,` + `
` + `      exit,` + `
` + `      splitHash,` + `
` + `      patternFor,` + `
` + `      parse,` + `
` + `      navTo,` + `
` + `      navBack,` + `
` + `      onHashChanged,` + `
` + `      dispatchPendingAppHash,` + `
` + `      sync,` + `
` + `    };` + `
` + `  },` + `
` + `);` + `
` + `` + `
` + ``;
    return result;
  }
}

module.exports = z2ui5_cl_ui5f_router_js;

