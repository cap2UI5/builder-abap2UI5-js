
class z2ui5_cl_ui5f_session_js {
  static get() {
    let result = ``;
    result = `sap.ui.define(["sap/ui/Device", "z2ui5/core/Lib"], (Device, Lib) => {` + `
` + `  "use strict";` + `
` + `` + `
` + `  let deviceStatic;` + `
` + `  function getDeviceStatic() {` + `
` + `    if (!deviceStatic) {` + `
` + `      deviceStatic = {` + `
` + `        SYSTEM: Lib.deriveSystemType(Device.system),` + `
` + `        BROWSER: {` + `
` + `          NAME: Device.browser.name || "",` + `
` + `          VERSION: String(Device.browser.version || ""),` + `
` + `        },` + `
` + `        OS: {` + `
` + `          NAME: Device.os.name || "",` + `
` + `          VERSION: String(Device.os.version || ""),` + `
` + `        },` + `
` + `        SUPPORT: {` + `
` + `          TOUCH: Device.support.touch || false,` + `
` + `          POINTER: Device.support.pointer || false,` + `
` + `          RETINA: Device.support.retina || false,` + `
` + `        },` + `
` + `      };` + `
` + `    }` + `
` + `    return deviceStatic;` + `
` + `  }` + `
` + `` + `
` + `  function getDeviceLive() {` + `
` + `    return {` + `
` + `      ORIENTATION: Device.orientation.portrait ? "portrait" : "landscape",` + `
` + `      RESIZE: {` + `
` + `        WIDTH: Device.resize.width || window.innerWidth,` + `
` + `        HEIGHT: Device.resize.height || window.innerHeight,` + `
` + `      },` + `
` + `    };` + `
` + `  }` + `
` + `` + `
` + `  function config(ctx, oConfig, draftId) {` + `
` + `    const latches = ctx.session;` + `
` + `    const live = getDeviceLive();` + `
` + `    const liveKey = JSON.stringify(live);` + `
` + `    if (latches.configSent && draftId) {` + `
` + `      if (liveKey === latches.liveSent) {` + `
` + `        latches.pending = null;` + `
` + `        return {};` + `
` + `      }` + `
` + `      latches.pending = { live: liveKey };` + `
` + `      return { S_DEVICE: live };` + `
` + `    }` + `
` + `    latches.pending = { config: Boolean(oConfig?.S_UI5), live: liveKey };` + `
` + `    return {` + `
` + `      S_UI5: oConfig?.S_UI5,` + `
` + `      ComponentData: oConfig?.ComponentData,` + `
` + `      S_DEVICE: { ...getDeviceStatic(), ...live },` + `
` + `    };` + `
` + `  }` + `
` + `` + `
` + `  function takePending(ctx) {` + `
` + `    const p = ctx.session.pending;` + `
` + `    ctx.session.pending = null;` + `
` + `    return p;` + `
` + `  }` + `
` + `` + `
` + `  function confirmSent(ctx, p) {` + `
` + `    if (!p) return;` + `
` + `    const latches = ctx.session;` + `
` + `    if (p.config) latches.configSent = true;` + `
` + `    if (p.live !== undefined) latches.liveSent = p.live;` + `
` + `    if (p.location) latches.locationSent = true;` + `
` + `  }` + `
` + `` + `
` + `  function location(ctx, draftId) {` + `
` + `    const latches = ctx.session;` + `
` + `    if (draftId && latches.locationSent) return null;` + `
` + `` + `
` + `    latches.pending = { ...latches.pending, location: true };` + `
` + `    return {` + `
` + `      ORIGIN: window.location.origin,` + `
` + `      PATHNAME: window.location.pathname,` + `
` + `      SEARCH: window.location.search,` + `
` + `    };` + `
` + `  }` + `
` + `` + `
` + `  function reset(ctx) {` + `
` + `    const latches = ctx.session;` + `
` + `    latches.configSent = false;` + `
` + `    latches.liveSent = "";` + `
` + `    latches.pending = null;` + `
` + `    latches.locationSent = false;` + `
` + `  }` + `
` + `` + `
` + `  return { config, takePending, confirmSent, location, reset };` + `
` + `});` + `
` + `` + `
` + ``;
    return result;
  }
}

module.exports = z2ui5_cl_ui5f_session_js;

