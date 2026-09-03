
class z2ui5_cl_ui5f_slots_js {
  static get() {
    let result = ``;
    result = `sap.ui.define(` + `
` + `  [` + `
` + `    "sap/ui/core/mvc/XMLView",` + `
` + `    "sap/ui/core/Fragment",` + `
` + `    "sap/ui/model/json/JSONModel",` + `
` + `    "sap/ui/model/odata/v2/ODataModel",` + `
` + `    "z2ui5/core/Server",` + `
` + `    "z2ui5/core/Lib",` + `
` + `    "z2ui5/core/ViewSlots",` + `
` + `    "z2ui5/core/AppState",` + `
` + `  ],` + `
` + `  (` + `
` + `    XMLView,` + `
` + `    Fragment,` + `
` + `    JSONModel,` + `
` + `    ODataModel,` + `
` + `    Server,` + `
` + `    Lib,` + `
` + `    ViewSlots,` + `
` + `    AppState,` + `
` + `  ) => {` + `
` + `    "use strict";` + `
` + `` + `
` + `    function applyStoredSizeLimit(viewKey, oModel) {` + `
` + `      if (!oModel) return;` + `
` + `` + `
` + `      const limit = Lib.effectiveSizeLimit(` + `
` + `        AppState.state.viewSizeLimits,` + `
` + `        viewKey,` + `
` + `      );` + `
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
` + `      slotKey = "MAIN",` + `
` + `      data = AppState.state.oResponse?.OVIEWMODEL,` + `
` + `    ) {` + `
` + `      return trackChanges(new JSONModel(dataForSlot(slotKey, data)));` + `
` + `    }` + `
` + `` + `
` + `    function isSuperseded(seq) {` + `
` + `      return seq !== undefined && seq !== Server._requestSeq;` + `
` + `    }` + `
` + `` + `
` + `    async function loadSlotFragment(slotKey, fragmentId, xml, seq) {` + `
` + `      const oModel = createViewModel(slotKey);` + `
` + `      applyStoredSizeLimit(slotKey, oModel);` + `
` + `      const oFragment = await Fragment.load({` + `
` + `        definition: xml,` + `
` + `        controller: ViewSlots.getController(slotKey),` + `
` + `        id: fragmentId,` + `
` + `      });` + `
` + `      if (!Lib.isAlive(AppState.state.oApp) || isSuperseded(seq)) {` + `
` + `        oFragment.destroy();` + `
` + `        return null;` + `
` + `      }` + `
` + `      oFragment.setModel(oModel);` + `
` + `      return oFragment;` + `
` + `    }` + `
` + `` + `
` + `    async function displayFragment(xml, seq) {` + `
` + `      const oFragment = await loadSlotFragment("POPUP", "popupId", xml, seq);` + `
` + `      if (!oFragment) return;` + `
` + `` + `
` + `      ViewSlots.setView("POPUP", oFragment, xml);` + `
` + `      oFragment.open();` + `
` + `    }` + `
` + `` + `
` + `    async function displayPopover(xml, openById, seq) {` + `
` + `      const oFragment = await loadSlotFragment(` + `
` + `        "POPOVER",` + `
` + `        "popoverId",` + `
` + `        xml,` + `
` + `        seq,` + `
` + `      );` + `
` + `      if (!oFragment) return;` + `
` + `` + `
` + `      const oControl = ViewSlots.resolveById(openById);` + `
` + `` + `
` + `      if (!oControl) {` + `
` + `        Lib.logError(\`displayPopover: openBy control '\${openById}' not found\`);` + `
` + `        oFragment.destroy();` + `
` + `        return;` + `
` + `      }` + `
` + `      ViewSlots.setView("POPOVER", oFragment, xml);` + `
` + `` + `
` + `      Lib.whenRendered(oControl, oFragment, () => oFragment.openBy(oControl));` + `
` + `    }` + `
` + `` + `
` + `    async function displayNestedView(xml, slotKey, mOptions, seq) {` + `
` + `      const oMainView = ViewSlots.getView("MAIN");` + `
` + `      const oTemplateModel =` + `
` + `        oMainView?.getModel("http") ?? oMainView?.getModel();` + `
` + `      const oView = await XMLView.create({` + `
` + `        definition: xml,` + `
` + `        controller: ViewSlots.getController(slotKey),` + `
` + `        preprocessors: { xml: { models: { template: oTemplateModel } } },` + `
` + `      });` + `
` + `` + `
` + `      if (!Lib.isAlive(AppState.state.oApp) || isSuperseded(seq)) {` + `
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
` + `      const oParent = ViewSlots.byId("MAIN", ID);` + `
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
` + `      ViewSlots.setView(slotKey, oView, xml);` + `
` + `    }` + `
` + `` + `
` + `    async function displayView(xml, viewModel, reqSeq, mOptions = {}) {` + `
` + `      const oViewModel = createViewModel("MAIN", viewModel);` + `
` + `` + `
` + `      const switchPath = mOptions.switchDefaultModelPath;` + `
` + `` + `
` + `      let oModel;` + `
` + `      if (switchPath) {` + `
` + `        oModel = new ODataModel({` + `
` + `          serviceUrl: switchPath,` + `
` + `          annotationURI: mOptions.switchDefaultModelAnnoUri || "",` + `
` + `        });` + `
` + `` + `
` + `        oModel._z2ui5OwnedOData = true;` + `
` + `      } else {` + `
` + `        oModel = oViewModel;` + `
` + `      }` + `
` + `` + `
` + `      applyStoredSizeLimit("MAIN", oViewModel);` + `
` + `      if (switchPath) applyStoredSizeLimit("MAIN", oModel);` + `
` + `` + `
` + `      const oView = await XMLView.create({` + `
` + `        definition: xml,` + `
` + `        models: oModel,` + `
` + `        controller: ViewSlots.getController("MAIN"),` + `
` + `        id: "mainView",` + `
` + `        preprocessors: { xml: { models: { template: oViewModel } } },` + `
` + `      });` + `
` + `` + `
` + `      const discardBuild = () => {` + `
` + `        oView.destroy();` + `
` + `        oModel.destroy();` + `
` + `        if (switchPath) oViewModel.destroy();` + `
` + `      };` + `
` + `` + `
` + `      if (!Lib.isAlive(AppState.state.oApp)) {` + `
` + `        discardBuild();` + `
` + `        return;` + `
` + `      }` + `
` + `` + `
` + `      if (isSuperseded(reqSeq) && ViewSlots.getView("MAIN")) {` + `
` + `        discardBuild();` + `
` + `        return;` + `
` + `      }` + `
` + `` + `
` + `      ViewSlots.setView("MAIN", oView, xml);` + `
` + `      if (switchPath) oView.setModel(oViewModel, "http");` + `
` + `      AppState.state.oApp.removeAllPages();` + `
` + `      AppState.state.oApp.insertPage(oView);` + `
` + `    }` + `
` + `` + `
` + `    function displayMain(xml, mOptions, seq) {` + `
` + `      Server._viewBuild = Promise.resolve(Server._viewBuild)` + `
` + `        .catch(() => {})` + `
` + `        .then(() => {` + `
` + `          if (isSuperseded(seq)) {` + `
` + `            return undefined;` + `
` + `          }` + `
` + `` + `
` + `          const oldMainDefault = ViewSlots.getView("MAIN")?.getModel?.();` + `
` + `          ViewSlots.destroy("MAIN");` + `
` + `          if (oldMainDefault?._z2ui5OwnedOData) oldMainDefault.destroy();` + `
` + `` + `
` + `          ViewSlots.destroy("POPUP");` + `
` + `          ViewSlots.destroy("POPOVER");` + `
` + `          return displayView(` + `
` + `            xml,` + `
` + `            AppState.state.oResponse?.OVIEWMODEL,` + `
` + `            seq,` + `
` + `            mOptions,` + `
` + `          );` + `
` + `        });` + `
` + `      return Server._viewBuild;` + `
` + `    }` + `
` + `` + `
` + `    function updateModelIfRequired(slotKey) {` + `
` + `      const oView = ViewSlots.getView(slotKey);` + `
` + `      if (!oView) return;` + `
` + `` + `
` + `      const sSlotApp = ViewSlots.getViewApp(slotKey);` + `
` + `      const sResponseApp = AppState.state.oResponse?.APP;` + `
` + `      if (sSlotApp && sResponseApp && sSlotApp !== sResponseApp) return;` + `
` + `` + `
` + `      const tracked = resolveTrackedModel(oView);` + `
` + `      if (tracked) {` + `
` + `        applyStoredSizeLimit(slotKey, tracked);` + `
` + `` + `
` + `        const pending = tracked._z2ui5ChangedPaths;` + `
` + `        const keep = [];` + `
` + `        if (pending?.size) {` + `
` + `          for (const path of pending)` + `
` + `            keep.push([path, tracked.getProperty(path)]);` + `
` + `        }` + `
` + `        tracked.setData(` + `
` + `          dataForSlot(slotKey, AppState.state.oResponse?.OVIEWMODEL),` + `
` + `        );` + `
` + `` + `
` + `        keep.forEach(([path, value], i) => {` + `
` + `          if (value !== undefined) {` + `
` + `            tracked.setProperty(path, value, undefined, i < keep.length - 1);` + `
` + `          }` + `
` + `        });` + `
` + `        return;` + `
` + `      }` + `
` + `` + `
` + `      const oModel = createViewModel(slotKey);` + `
` + `      applyStoredSizeLimit(slotKey, oModel);` + `
` + `      oView.setModel(oModel);` + `
` + `    }` + `
` + `` + `
` + `    function action(method, slotKey, xml, mOptions, seq) {` + `
` + `      if (method === "destroy") {` + `
` + `        ViewSlots.destroy(slotKey);` + `
` + `        return undefined;` + `
` + `      }` + `
` + `      if (method === "updateModel") {` + `
` + `        for (const slot of ViewSlots.slots) {` + `
` + `          if (slot.ownsModel) updateModelIfRequired(slot.key);` + `
` + `        }` + `
` + `        return undefined;` + `
` + `      }` + `
` + `` + `
` + `      if (isSuperseded(seq)) return undefined;` + `
` + `` + `
` + `      if (slotKey === "MAIN") {` + `
` + `        AppState.state.lastMainDisplayOptions = mOptions || {};` + `
` + `        return displayMain(xml, mOptions, seq);` + `
` + `      }` + `
` + `      ViewSlots.destroy(slotKey);` + `
` + `      if (slotKey === "POPUP") return displayFragment(xml, seq);` + `
` + `      if (slotKey === "POPOVER") {` + `
` + `        return displayPopover(xml, mOptions.openById, seq);` + `
` + `      }` + `
` + `      return displayNestedView(xml, slotKey, mOptions, seq);` + `
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

