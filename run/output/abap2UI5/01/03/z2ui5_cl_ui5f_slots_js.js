
class z2ui5_cl_ui5f_slots_js {
  static get() {
    let result = ``;
    result = `sap.ui.define(` + `
` + `  [` + `
` + `    "sap/ui/core/mvc/XMLView",` + `
` + `    "sap/ui/core/Fragment",` + `
` + `    "sap/ui/model/json/JSONModel",` + `
` + `    "z2ui5/core/Lib",` + `
` + `    "z2ui5/core/Env",` + `
` + `    "z2ui5/core/ViewSlots",` + `
` + `    "z2ui5/core/Context",` + `
` + `  ],` + `
` + `  (XMLView, Fragment, JSONModel, Lib, Env, ViewSlots, Context) => {` + `
` + `    "use strict";` + `
` + `` + `
` + `    function applyStoredSizeLimit(ctx, viewKey, oModel) {` + `
` + `      if (!oModel) return;` + `
` + `` + `
` + `      const limit = Lib.effectiveSizeLimit(ctx.state.viewSizeLimits, viewKey);` + `
` + `      if (limit !== undefined) oModel.setSizeLimit(limit);` + `
` + `    }` + `
` + `` + `
` + `    function trackChanges(oModel) {` + `
` + `      oModel._z2ui5Tracked = true;` + `
` + `` + `
` + `      oModel._z2ui5ChangedPaths = new Set();` + `
` + `      oModel.attachPropertyChange((e) => {` + `
` + `        const params = e.getParameters();` + `
` + `        const raw = params.path;` + `
` + `        const ctx = params.context;` + `
` + `        if (!raw) return;` + `
` + `` + `
` + `        const changedPath =` + `
` + `          ctx && !raw.startsWith("/") ? \`\${ctx.getPath()}/\${raw}\` : raw;` + `
` + `        if (changedPath.startsWith("/")) {` + `
` + `          oModel._z2ui5ChangedPaths.add(changedPath);` + `
` + `        }` + `
` + `      });` + `
` + `      return oModel;` + `
` + `    }` + `
` + `` + `
` + `    function resolveTrackedModel(oView) {` + `
` + `      return ViewSlots.trackedModel(oView);` + `
` + `    }` + `
` + `` + `
` + `    function dataForSlot(slotKey, data) {` + `
` + `      if (!data || Lib.isRootModelSlot(slotKey)) return data;` + `
` + `      if (typeof structuredClone === "function") return structuredClone(data);` + `
` + `      return JSON.parse(JSON.stringify(data));` + `
` + `    }` + `
` + `` + `
` + `    function createViewModel(` + `
` + `      ctx,` + `
` + `      slotKey = "MAIN",` + `
` + `      data = ctx.state.oResponse?.OVIEWMODEL,` + `
` + `    ) {` + `
` + `      const oModel = trackChanges(new JSONModel(dataForSlot(slotKey, data)));` + `
` + `` + `
` + `      if (data && data === ctx.state.oResponse?.OVIEWMODEL) {` + `
` + `        oModel._z2ui5BuiltFrom = ctx.state.oResponse;` + `
` + `      }` + `
` + `      return oModel;` + `
` + `    }` + `
` + `` + `
` + `    function isSuperseded(ctx, seq) {` + `
` + `      return seq !== undefined && seq !== ctx.server.requestSeq;` + `
` + `    }` + `
` + `` + `
` + `    async function loadSlotFragment(ctx, slotKey, fragmentId, xml, seq) {` + `
` + `      const oModel = createViewModel(ctx, slotKey);` + `
` + `      applyStoredSizeLimit(ctx, slotKey, oModel);` + `
` + `` + `
` + `      await Env.preloadFragmentModules(xml);` + `
` + `` + `
` + `      const oFragment = await Context.runAsOwner(ctx, () =>` + `
` + `        Fragment.load({` + `
` + `          definition: xml,` + `
` + `          controller: ViewSlots.getController(ctx, slotKey),` + `
` + `          id: ViewSlots.ownId(ctx, fragmentId),` + `
` + `        }),` + `
` + `      );` + `
` + `      if (!Lib.isAlive(ctx.state.oApp) || isSuperseded(ctx, seq)) {` + `
` + `        oFragment.destroy();` + `
` + `        return null;` + `
` + `      }` + `
` + `      oFragment.setModel(oModel);` + `
` + `      return oFragment;` + `
` + `    }` + `
` + `` + `
` + `    async function displayFragment(ctx, xml, seq) {` + `
` + `      const oFragment = await loadSlotFragment(` + `
` + `        ctx,` + `
` + `        "POPUP",` + `
` + `        "popupId",` + `
` + `        xml,` + `
` + `        seq,` + `
` + `      );` + `
` + `      if (!oFragment) return;` + `
` + `` + `
` + `      ViewSlots.setView(ctx, "POPUP", oFragment, xml);` + `
` + `      oFragment.open();` + `
` + `    }` + `
` + `` + `
` + `    async function displayPopover(ctx, xml, openById, seq) {` + `
` + `      const oFragment = await loadSlotFragment(` + `
` + `        ctx,` + `
` + `        "POPOVER",` + `
` + `        "popoverId",` + `
` + `        xml,` + `
` + `        seq,` + `
` + `      );` + `
` + `      if (!oFragment) return;` + `
` + `` + `
` + `      const oControl = ViewSlots.resolveById(ctx, openById);` + `
` + `` + `
` + `      if (!oControl) {` + `
` + `        Lib.logError(\`displayPopover: openBy control '\${openById}' not found\`);` + `
` + `        oFragment.destroy();` + `
` + `        return;` + `
` + `      }` + `
` + `      ViewSlots.setView(ctx, "POPOVER", oFragment, xml);` + `
` + `` + `
` + `      Lib.whenRendered(oControl, oFragment, () => oFragment.openBy(oControl));` + `
` + `    }` + `
` + `` + `
` + `    function templatePreprocessors(xml, oTemplateModel) {` + `
` + `      if (!Lib.usesXmlTemplating(xml)) return undefined;` + `
` + `      return { xml: { models: { template: oTemplateModel } } };` + `
` + `    }` + `
` + `` + `
` + `    async function displayNestedView(ctx, xml, slotKey, mOptions, seq) {` + `
` + `      const oMainView = ViewSlots.getView(ctx, "MAIN");` + `
` + `      const oTemplateModel =` + `
` + `        oMainView?.getModel("http") ?? oMainView?.getModel();` + `
` + `      const oView = await Context.runAsOwner(ctx, () =>` + `
` + `        XMLView.create({` + `
` + `          definition: xml,` + `
` + `          controller: ViewSlots.getController(ctx, slotKey),` + `
` + `          preprocessors: templatePreprocessors(xml, oTemplateModel),` + `
` + `        }),` + `
` + `      );` + `
` + `` + `
` + `      if (!Lib.isAlive(ctx.state.oApp) || isSuperseded(ctx, seq)) {` + `
` + `        oView.destroy();` + `
` + `        return;` + `
` + `      }` + `
` + `` + `
` + `      const {` + `
` + `        id: ID,` + `
` + `        methodDestroy: METHOD_DESTROY,` + `
` + `        methodInsert: METHOD_INSERT,` + `
` + `      } = mOptions;` + `
` + `` + `
` + `      const oParent = ViewSlots.byId(ctx, "MAIN", ID);` + `
` + `      if (!oParent) {` + `
` + `        Lib.logError(` + `
` + `          \`displayNestedView: parent control '\${ID}' not found, nested view discarded\`,` + `
` + `        );` + `
` + `        oView.destroy();` + `
` + `        return;` + `
` + `      }` + `
` + `` + `
` + `      if (METHOD_DESTROY) {` + `
` + `        try {` + `
` + `          oParent[METHOD_DESTROY]();` + `
` + `        } catch (e) {` + `
` + `          Lib.logError(` + `
` + `            \`displayNestedView: parent destroy method '\${METHOD_DESTROY}' failed\`,` + `
` + `            e,` + `
` + `          );` + `
` + `        }` + `
` + `      }` + `
` + `      try {` + `
` + `        oParent[METHOD_INSERT](oView);` + `
` + `      } catch (e) {` + `
` + `        Lib.logError("displayNestedView: parent insert method failed", e);` + `
` + `        oView.destroy();` + `
` + `        return;` + `
` + `      }` + `
` + `      ViewSlots.setView(ctx, slotKey, oView, xml);` + `
` + `    }` + `
` + `` + `
` + `    async function displayView(ctx, xml, viewModel, mOptions = {}) {` + `
` + `      const oViewModel = createViewModel(ctx, "MAIN", viewModel);` + `
` + `` + `
` + `      const switchPath = mOptions.switchDefaultModelPath;` + `
` + `` + `
` + `      let oModel;` + `
` + `      if (switchPath) {` + `
` + `        const ODataModel = await Lib.requireODataModel();` + `
` + `        oModel = new ODataModel({` + `
` + `          serviceUrl: switchPath,` + `
` + `          annotationURI: mOptions.switchDefaultModelAnnoUri || "",` + `
` + `        });` + `
` + `` + `
` + `        ctx.state.odataClients.add(oModel);` + `
` + `      } else {` + `
` + `        oModel = oViewModel;` + `
` + `      }` + `
` + `` + `
` + `      applyStoredSizeLimit(ctx, "MAIN", oViewModel);` + `
` + `      if (switchPath) applyStoredSizeLimit(ctx, "MAIN", oModel);` + `
` + `` + `
` + `      const oView = await Context.runAsOwner(ctx, () =>` + `
` + `        XMLView.create({` + `
` + `          definition: xml,` + `
` + `          models: oModel,` + `
` + `          controller: ViewSlots.getController(ctx, "MAIN"),` + `
` + `` + `
` + `          id: ViewSlots.ownId(ctx, "mainView"),` + `
` + `          preprocessors: templatePreprocessors(xml, oViewModel),` + `
` + `        }),` + `
` + `      );` + `
` + `` + `
` + `      const discardBuild = () => {` + `
` + `        oView.destroy();` + `
` + `` + `
` + `        ctx.state.odataClients.delete(oModel);` + `
` + `        oModel.destroy();` + `
` + `        if (switchPath) oViewModel.destroy();` + `
` + `      };` + `
` + `` + `
` + `      if (!Lib.isAlive(ctx.state.oApp)) {` + `
` + `        discardBuild();` + `
` + `        return;` + `
` + `      }` + `
` + `` + `
` + `      ViewSlots.setView(ctx, "MAIN", oView, xml);` + `
` + `      if (switchPath) oView.setModel(oViewModel, "http");` + `
` + `      ctx.state.oApp.removeAllPages();` + `
` + `      ctx.state.oApp.insertPage(oView);` + `
` + `    }` + `
` + `` + `
` + `    function chainBuild(ctx, seq, build) {` + `
` + `      ctx.server.viewBuild = Promise.resolve(ctx.server.viewBuild)` + `
` + `        .catch(() => {})` + `
` + `        .then(() => {` + `
` + `          if (isSuperseded(ctx, seq)) {` + `
` + `            return undefined;` + `
` + `          }` + `
` + `          return build();` + `
` + `        });` + `
` + `      return ctx.server.viewBuild;` + `
` + `    }` + `
` + `` + `
` + `    function displayMain(ctx, xml, mOptions, seq) {` + `
` + `      return chainBuild(ctx, seq, () => {` + `
` + `        ViewSlots.destroy(ctx, "MAIN");` + `
` + `` + `
` + `        for (const oClient of ctx.state.odataClients) {` + `
` + `          try {` + `
` + `            oClient.destroy();` + `
` + `          } catch (e) {` + `
` + `            Lib.logError("displayMain: destroying an OData client failed", e);` + `
` + `          }` + `
` + `        }` + `
` + `        ctx.state.odataClients.clear();` + `
` + `` + `
` + `        ViewSlots.destroy(ctx, "POPUP");` + `
` + `        ViewSlots.destroy(ctx, "POPOVER");` + `
` + `        return displayView(ctx, xml, ctx.state.oResponse?.OVIEWMODEL, mOptions);` + `
` + `      });` + `
` + `    }` + `
` + `` + `
` + `    function displayStandalone(ctx, slotKey, xml, mOptions, seq) {` + `
` + `      return chainBuild(ctx, seq, () => {` + `
` + `        ViewSlots.destroy(ctx, slotKey);` + `
` + `        if (slotKey === "POPUP") return displayFragment(ctx, xml, seq);` + `
` + `        return displayPopover(ctx, xml, mOptions.openById, seq);` + `
` + `      });` + `
` + `    }` + `
` + `` + `
` + `    function updateModelIfRequired(ctx, slotKey) {` + `
` + `      const oView = ViewSlots.getView(ctx, slotKey);` + `
` + `      if (!oView) return;` + `
` + `` + `
` + `      const sSlotApp = ViewSlots.getViewApp(ctx, slotKey);` + `
` + `      const sResponseApp = ctx.state.oResponse?.APP;` + `
` + `      if (sSlotApp && sResponseApp && sSlotApp !== sResponseApp) return;` + `
` + `` + `
` + `      const tracked = resolveTrackedModel(oView);` + `
` + `      if (tracked) {` + `
` + `        if (` + `
` + `          tracked._z2ui5BuiltFrom &&` + `
` + `          tracked._z2ui5BuiltFrom === ctx.state.oResponse` + `
` + `        ) {` + `
` + `          return;` + `
` + `        }` + `
` + `        applyStoredSizeLimit(ctx, slotKey, tracked);` + `
` + `` + `
` + `        const pending = tracked._z2ui5ChangedPaths;` + `
` + `        const keep = [];` + `
` + `        if (pending?.size) {` + `
` + `          for (const path of pending) {` + `
` + `            const value = tracked.getProperty(path);` + `
` + `` + `
` + `            if (value !== undefined) keep.push([path, value]);` + `
` + `          }` + `
` + `        }` + `
` + `        tracked.setData(dataForSlot(slotKey, ctx.state.oResponse?.OVIEWMODEL));` + `
` + `` + `
` + `        keep.forEach(([path, value], i) => {` + `
` + `          tracked.setProperty(path, value, undefined, i < keep.length - 1);` + `
` + `        });` + `
` + `        return;` + `
` + `      }` + `
` + `` + `
` + `      const oModel = createViewModel(ctx, slotKey);` + `
` + `      applyStoredSizeLimit(ctx, slotKey, oModel);` + `
` + `      oView.setModel(oModel);` + `
` + `    }` + `
` + `` + `
` + `    function action(ctx, method, slotKey, xml, mOptions, seq) {` + `
` + `      const options = mOptions || {};` + `
` + `      if (method === "destroy") {` + `
` + `        ViewSlots.destroy(ctx, slotKey);` + `
` + `        return undefined;` + `
` + `      }` + `
` + `      if (method === "updateModel") {` + `
` + `        for (const slot of ViewSlots.slots) {` + `
` + `          if (slot.ownsModel) updateModelIfRequired(ctx, slot.key);` + `
` + `        }` + `
` + `        return undefined;` + `
` + `      }` + `
` + `` + `
` + `      if (isSuperseded(ctx, seq)) return undefined;` + `
` + `` + `
` + `      if (slotKey === "MAIN") {` + `
` + `        ctx.state.lastMainDisplayOptions = options;` + `
` + `        return displayMain(ctx, xml, options, seq);` + `
` + `      }` + `
` + `      if (slotKey === "POPUP" || slotKey === "POPOVER") {` + `
` + `        return displayStandalone(ctx, slotKey, xml, options, seq);` + `
` + `      }` + `
` + `      ViewSlots.destroy(ctx, slotKey);` + `
` + `      return displayNestedView(ctx, xml, slotKey, options, seq);` + `
` + `    }` + `
` + `` + `
` + `    return {` + `
` + `      action,` + `
` + `      resolveTrackedModel,` + `
` + `    };` + `
` + `  },` + `
` + `);` + `
` + `` + `
` + ``;
    return result;
  }
}

module.exports = z2ui5_cl_ui5f_slots_js;

