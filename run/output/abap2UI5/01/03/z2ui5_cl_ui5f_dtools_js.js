
class z2ui5_cl_ui5f_dtools_js {
  static get() {
    let result = ``;
    result = `sap.ui.define(` + `
` + `  [` + `
` + `    "sap/ui/core/Control",` + `
` + `    "sap/ui/core/Fragment",` + `
` + `    "sap/ui/model/json/JSONModel",` + `
` + `    "z2ui5/core/Lib",` + `
` + `    "z2ui5/core/ErrorView",` + `
` + `    "z2ui5/devtools/AbapSource",` + `
` + `    "z2ui5/devtools/Console",` + `
` + `    "z2ui5/devtools/Inspect",` + `
` + `    "z2ui5/devtools/LiveEdit",` + `
` + `    "z2ui5/devtools/Persist",` + `
` + `    "z2ui5/devtools/Picker",` + `
` + `    "z2ui5/devtools/Recorder",` + `
` + `    "z2ui5/devtools/Report",` + `
` + `    "z2ui5/devtools/Tabs",` + `
` + `  ],` + `
` + `  (` + `
` + `    Control,` + `
` + `    Fragment,` + `
` + `    JSONModel,` + `
` + `    Lib,` + `
` + `    ErrorView,` + `
` + `    AbapSource,` + `
` + `    Console,` + `
` + `    Inspect,` + `
` + `    LiveEdit,` + `
` + `    Persist,` + `
` + `    Picker,` + `
` + `    Recorder,` + `
` + `    Report,` + `
` + `    Tabs,` + `
` + `  ) => {` + `
` + `    "use strict";` + `
` + `` + `
` + `    const FRAGMENT_SUFFIX = "tools";` + `
` + `` + `
` + `    const LAST_TAB_KEY = "z2ui5.devtools.lastTab";` + `
` + `` + `
` + `    const DEFAULT_TAB = "OVERVIEW";` + `
` + `` + `
` + `    const STATUS_MS = 6000;` + `
` + `` + `
` + `    function readLastTab() {` + `
` + `      return Persist.read(LAST_TAB_KEY);` + `
` + `    }` + `
` + `` + `
` + `    function writeLastTab(tabKey) {` + `
` + `      Persist.write(LAST_TAB_KEY, tabKey);` + `
` + `    }` + `
` + `` + `
` + `    function resolveTab(ctx, tabKey) {` + `
` + `      if (Tabs.isEnabled(ctx, Tabs.get(tabKey))) return tabKey;` + `
` + `      if (Tabs.isKnown(tabKey)) {` + `
` + `        const sibling = Tabs.firstTabOf(ctx, Tabs.groupOf(tabKey));` + `
` + `        if (sibling) return sibling;` + `
` + `      }` + `
` + `      return DEFAULT_TAB;` + `
` + `    }` + `
` + `` + `
` + `    function preloadCodeEditor() {` + `
` + `      return new Promise((resolve) => {` + `
` + `        sap.ui.require(` + `
` + `          ["sap/ui/codeeditor/library", "sap/ui/codeeditor/CodeEditor"],` + `
` + `          () => resolve(),` + `
` + `` + `
` + `          () => resolve(),` + `
` + `        );` + `
` + `      });` + `
` + `    }` + `
` + `` + `
` + `    const DeveloperTools = Control.extend("z2ui5.devtools.DeveloperTools", {` + `
` + `      fragmentId() {` + `
` + `        return \`\${this.getId()}--\${FRAGMENT_SUFFIX}\`;` + `
` + `      },` + `
` + `` + `
` + `      renderTab(tabKey, oModel) {` + `
` + `        const ctx = this.ctx;` + `
` + `        const key = resolveTab(ctx, tabKey);` + `
` + `        const tab = Tabs.get(key);` + `
` + `        const data = oModel.getData();` + `
` + `` + `
` + `        data.selectedTab = key;` + `
` + `        data.selectedGroup = tab.group;` + `
` + `        writeLastTab(key);` + `
` + `` + `
` + `        const slots = Tabs.enabledSlots(ctx).map((slot) => ({` + `
` + `          key: slot.key,` + `
` + `          text: slot.label,` + `
` + `        }));` + `
` + `        data.slots = slots;` + `
` + `` + `
` + `        data.selectedSlot = tab.slot || data.selectedSlot || "MAIN";` + `
` + `        data.showSlotBar = Boolean(tab.slot) && slots.length > 1;` + `
` + `` + `
` + `        let views;` + `
` + `        if (tab.group === "VIEWDATA") {` + `
` + `          views = Tabs.aspectsOfSlot(ctx, data.selectedSlot).concat(` + `
` + `            Tabs.get("PICK"),` + `
` + `          );` + `
` + `        } else {` + `
` + `          views = Tabs.enabledTabs(ctx, tab.group);` + `
` + `        }` + `
` + `        data.views = views.map((entry) => ({` + `
` + `          key: entry.key,` + `
` + `          text: entry.label,` + `
` + `        }));` + `
` + `        data.showViewBar = data.views.length > 1;` + `
` + `` + `
` + `        data.isOverview = tab.group === "OVERVIEW";` + `
` + `        data.isRoundtrips = tab.group === "ROUNDTRIPS";` + `
` + `        data.isViewData = tab.group === "VIEWDATA";` + `
` + `        data.isSearch = tab.group === "SEARCH";` + `
` + `        data.isErrorView = key === "ERROR";` + `
` + `        data.isSourceView = key === "SOURCE";` + `
` + `        data.hasRetry =` + `
` + `          key === "ERROR" && typeof ctx.state.lastError?.onRetry === "function";` + `
` + `        data.recordPayloads = Recorder.isRecordingPayloads();` + `
` + `        data.openOnError = Console.isAlertOnError();` + `
` + `` + `
` + `        data.problemCount = this.problemCount();` + `
` + `` + `
` + `        if (tab.kind === "search") {` + `
` + `          this.displayEditor(oModel, Tabs.search(ctx, data.searchTerm), "text");` + `
` + `` + `
` + `          data.isTemplating = false;` + `
` + `          oModel.refresh();` + `
` + `          return;` + `
` + `        }` + `
` + `` + `
` + `        if (tab.kind === "source") {` + `
` + `          data.canApply = false;` + `
` + `          data.isTemplating = false;` + `
` + `          data.templatingSource = false;` + `
` + `          this.showAbapSource(oModel);` + `
` + `          return;` + `
` + `        }` + `
` + `` + `
` + `        this.displayEditor(oModel, Tabs.render(ctx, key), tab.kind);` + `
` + `` + `
` + `        data.canApply = LiveEdit.canApply(ctx, key);` + `
` + `        oModel.refresh();` + `
` + `      },` + `
` + `` + `
` + `      onGroupSelect(oEvent) {` + `
` + `        const oModel = oEvent.getSource().getModel();` + `
` + `        const groupKey = oEvent.getSource().getSelectedKey();` + `
` + `        this.renderTab(` + `
` + `          Tabs.firstTabOf(this.ctx, groupKey) || DEFAULT_TAB,` + `
` + `          oModel,` + `
` + `        );` + `
` + `      },` + `
` + `` + `
` + `      onViewSelect(oEvent) {` + `
` + `        const oSource = oEvent.getSource();` + `
` + `        this.renderTab(oSource.getSelectedKey(), oSource.getModel());` + `
` + `      },` + `
` + `` + `
` + `      onSlotSelect(oEvent) {` + `
` + `        const oSource = oEvent.getSource();` + `
` + `        const oModel = oSource.getModel();` + `
` + `        const aspect = Tabs.get(oModel.getData().selectedTab)?.aspect;` + `
` + `        this.renderTab(` + `
` + `          Tabs.tabFor(this.ctx, oSource.getSelectedKey(), aspect),` + `
` + `          oModel,` + `
` + `        );` + `
` + `      },` + `
` + `` + `
` + `      onSearch(oEvent) {` + `
` + `        const oSource = oEvent.getSource();` + `
` + `        const oModel = oSource.getModel();` + `
` + `        oModel.getData().searchTerm = oSource.getValue();` + `
` + `        this.renderTab("SEARCH", oModel);` + `
` + `      },` + `
` + `` + `
` + `      displayEditor(oModel, content, type) {` + `
` + `        const data = oModel.getData();` + `
` + `        data.editor_visible = true;` + `
` + `        data.source_visible = false;` + `
` + `` + `
` + `        data.canApply = false;` + `
` + `        data.isTemplating = Boolean(content?.includes("xmlns:template"));` + `
` + `` + `
` + `        data.templatingSource = false;` + `
` + `        data.value = content;` + `
` + `        data.previousValue = content;` + `
` + `        data.xContent = "";` + `
` + `        data.type = type;` + `
` + `        oModel.refresh();` + `
` + `      },` + `
` + `` + `
` + `      onTemplatingPress(oEvent) {` + `
` + `        const oSource = oEvent.getSource();` + `
` + `        const oModel = oSource.getModel();` + `
` + `        const data = oModel.getData();` + `
` + `` + `
` + `        if (oSource.getPressed()) {` + `
` + `          if (!data.xContent) {` + `
` + `            data.xContent = Tabs.renderTemplated(this.ctx, data.selectedTab);` + `
` + `          }` + `
` + `          data.value = data.xContent;` + `
` + `        } else {` + `
` + `          data.value = data.previousValue;` + `
` + `        }` + `
` + `        oModel.refresh();` + `
` + `      },` + `
` + `` + `
` + `      showAbapSource(oModel) {` + `
` + `        const contentControl = Fragment.byId(this.fragmentId(), "sourceHtml");` + `
` + `` + `
` + `        contentControl?.setContent(AbapSource.iframeHtml(this.ctx));` + `
` + `` + `
` + `        AbapSource.fetchSource(this.ctx);` + `
` + `` + `
` + `        if (!oModel) return;` + `
` + `        const data = oModel.getData();` + `
` + `        data.editor_visible = false;` + `
` + `        data.source_visible = true;` + `
` + `        oModel.refresh();` + `
` + `      },` + `
` + `` + `
` + `      onOpenAbapInAdt() {` + `
` + `        AbapSource.openInAdt(this.ctx);` + `
` + `      },` + `
` + `` + `
` + `      showStatus(oModel, text) {` + `
` + `        const data = oModel.getData();` + `
` + `        data.statusText = text;` + `
` + `        data.hasStatusText = Boolean(text);` + `
` + `        oModel.refresh();` + `
` + `        if (!text) return;` + `
` + `        clearTimeout(this._statusTimer);` + `
` + `        this._statusTimer = setTimeout(() => {` + `
` + `          if (Lib.isDestroyed(this)) return;` + `
` + `          data.statusText = "";` + `
` + `          data.hasStatusText = false;` + `
` + `          oModel.refresh();` + `
` + `        }, STATUS_MS);` + `
` + `      },` + `
` + `` + `
` + `      async onReportBug(oEvent) {` + `
` + `        const oModel = oEvent.getSource().getModel();` + `
` + `        const source = await AbapSource.fetchSource(this.ctx);` + `
` + `        if (Lib.isDestroyed(this)) return;` + `
` + `        this.showStatus(oModel, Report.copyMarkdown(this.ctx, source));` + `
` + `      },` + `
` + `` + `
` + `      async onExport() {` + `
` + `        const source = await AbapSource.fetchSource(this.ctx);` + `
` + `        if (Lib.isDestroyed(this)) return;` + `
` + `        Report.openDialog(this.ctx, AbapSource.appName(this.ctx), source);` + `
` + `      },` + `
` + `` + `
` + `      async onCopyTab(oEvent) {` + `
` + `        const oSource = oEvent.getSource();` + `
` + `        const data = oSource.getModel().getData();` + `
` + `        let text = data.value || "";` + `
` + `        if (data.isSourceView) {` + `
` + `          text = await AbapSource.fetchSource(this.ctx);` + `
` + `          if (Lib.isDestroyed(oSource)) return;` + `
` + `        }` + `
` + `        Lib.copyToClipboard(text);` + `
` + `` + `
` + `        Report.confirmOnButton(oSource);` + `
` + `      },` + `
` + `` + `
` + `      onErrorRetry() {` + `
` + `        const onRetry = this.ctx.state.lastError?.onRetry;` + `
` + `` + `
` + `        this.reopenErrorOnClose = false;` + `
` + `        this.close();` + `
` + `        if (typeof onRetry === "function") onRetry();` + `
` + `      },` + `
` + `      onErrorRestart() {` + `
` + `        window.location.reload();` + `
` + `      },` + `
` + `      onErrorLogout() {` + `
` + `        ErrorView.handleLogout(this.ctx);` + `
` + `      },` + `
` + `` + `
` + `      onToggleRecordPayloads(oEvent) {` + `
` + `        const oSource = oEvent.getSource();` + `
` + `        Recorder.setRecordingPayloads(this.ctx, oSource.getPressed());` + `
` + `        const oModel = oSource.getModel();` + `
` + `        this.renderTab(oModel.getData().selectedTab, oModel);` + `
` + `      },` + `
` + `` + `
` + `      onToggleOpenOnError(oEvent) {` + `
` + `        const oSource = oEvent.getSource();` + `
` + `        Console.setAlertOnError(oSource.getPressed());` + `
` + `        const oModel = oSource.getModel();` + `
` + `        oModel.getData().openOnError = Console.isAlertOnError();` + `
` + `        oModel.refresh();` + `
` + `      },` + `
` + `` + `
` + `      onPickControl() {` + `
` + `        const previousTab = this.oDialog?.getModel()?.getData()?.selectedTab;` + `
` + `        this.reopenErrorOnClose = false;` + `
` + `        this.close();` + `
` + `        Picker.start(this.ctx, (report) => {` + `
` + `          if (Lib.isDestroyed(this)) return;` + `
` + `          this.show(report ? "PICK" : previousTab);` + `
` + `        });` + `
` + `      },` + `
` + `` + `
` + `      async onApplyXml(oEvent) {` + `
` + `        const oModel = oEvent.getSource().getModel();` + `
` + `        const data = oModel.getData();` + `
` + `        if (LiveEdit.isBusy(this.ctx)) {` + `
` + `          this.showStatus(oModel, "A roundtrip is running - try again.");` + `
` + `          return;` + `
` + `        }` + `
` + `        const tabKey = data.selectedTab;` + `
` + `` + `
` + `        const before = this.backendXml(tabKey);` + `
` + `        const result = await LiveEdit.apply(this.ctx, tabKey, data.value);` + `
` + `        if (Lib.isDestroyed(this)) return;` + `
` + `        if (!this._appliedXml) this._appliedXml = {};` + `
` + `        this._appliedXml[tabKey] = {` + `
` + `          original: before,` + `
` + `` + `
` + `          applied: Tabs.render(this.ctx, tabKey),` + `
` + `        };` + `
` + `        this.showStatus(oModel, result);` + `
` + `      },` + `
` + `` + `
` + `      backendXml(tabKey) {` + `
` + `        const current = Tabs.render(this.ctx, tabKey);` + `
` + `        const record = this._appliedXml?.[tabKey];` + `
` + `        if (!record) return current;` + `
` + `        if (record.applied !== current) {` + `
` + `          delete this._appliedXml[tabKey];` + `
` + `          return current;` + `
` + `        }` + `
` + `        return record.original;` + `
` + `      },` + `
` + `` + `
` + `      onResetXml(oEvent) {` + `
` + `        const oModel = oEvent.getSource().getModel();` + `
` + `        const data = oModel.getData();` + `
` + `        const xml = this.backendXml(data.selectedTab);` + `
` + `        data.value = xml;` + `
` + `        data.previousValue = xml;` + `
` + `        oModel.refresh();` + `
` + `        this.showStatus(oModel, "");` + `
` + `      },` + `
` + `` + `
` + `      onShowHelp() {` + `
` + `        sap.ui.require(` + `
` + `          ["sap/m/Dialog", "sap/m/TextArea", "sap/m/Button"],` + `
` + `          (Dialog, TextArea, Button) => {` + `
` + `            const area = new TextArea({` + `
` + `              editable: false,` + `
` + `              width: "100%",` + `
` + `              rows: 25,` + `
` + `              growing: false,` + `
` + `            });` + `
` + `            area.setValue(Inspect.formatHelp());` + `
` + `            const dialog = new Dialog({` + `
` + `              title: "abap2UI5 - Developer Tools Help",` + `
` + `              stretch: true,` + `
` + `              content: [area],` + `
` + `              buttons: [` + `
` + `                new Button({` + `
` + `                  text: "Close",` + `
` + `                  type: "Emphasized",` + `
` + `                  press: () => dialog.close(),` + `
` + `                }),` + `
` + `              ],` + `
` + `              afterClose: () => dialog.destroy(),` + `
` + `            });` + `
` + `            dialog.open();` + `
` + `          },` + `
` + `        );` + `
` + `      },` + `
` + `` + `
` + `      onClose() {` + `
` + `        this.close();` + `
` + `      },` + `
` + `` + `
` + `      onEscape(oPromise) {` + `
` + `        oPromise.reject();` + `
` + `        this.close();` + `
` + `      },` + `
` + `` + `
` + `      async show(initialTab) {` + `
` + `        if (this._showPending) return;` + `
` + `        this._showPending = true;` + `
` + `        try {` + `
` + `          if (!this.oDialog) {` + `
` + `            await preloadCodeEditor();` + `
` + `            this.oDialog = await Fragment.load({` + `
` + `              name: "z2ui5.devtools.DeveloperTools",` + `
` + `              controller: this,` + `
` + `              id: this.fragmentId(),` + `
` + `            });` + `
` + `          }` + `
` + `` + `
` + `          if (Lib.isDestroyed(this)) {` + `
` + `            if (this.oDialog) this.oDialog.destroy();` + `
`;
    result = result + `            this.oDialog = null;` + `
` + `            return;` + `
` + `          }` + `
` + `` + `
` + `          const requested =` + `
` + `            typeof initialTab === "string" && initialTab` + `
` + `              ? initialTab` + `
` + `              : readLastTab();` + `
` + `` + `
` + `          const appName = AbapSource.appName(this.ctx);` + `
` + `          const oModel = new JSONModel({` + `
` + `            title: appName` + `
` + `              ? \`abap2UI5 - Developer Tools - \${appName}\`` + `
` + `              : "abap2UI5 - Developer Tools",` + `
` + `            selectedGroup: Tabs.DEFAULT_GROUP,` + `
` + `            selectedTab: DEFAULT_TAB,` + `
` + `            selectedSlot: "MAIN",` + `
` + `            searchTerm: "",` + `
` + `            slots: [],` + `
` + `            views: [],` + `
` + `            showSlotBar: false,` + `
` + `            showViewBar: false,` + `
` + `            isOverview: true,` + `
` + `            isRoundtrips: false,` + `
` + `            isViewData: false,` + `
` + `            isSearch: false,` + `
` + `            isErrorView: false,` + `
` + `            isSourceView: false,` + `
` + `            hasRetry: false,` + `
` + `            canApply: false,` + `
` + `            isTemplating: false,` + `
` + `            templatingSource: false,` + `
` + `            statusText: "",` + `
` + `            hasStatusText: false,` + `
` + `` + `
` + `            problemCount: this.problemCount(),` + `
` + `            recordPayloads: Recorder.isRecordingPayloads(),` + `
` + `            openOnError: Console.isAlertOnError(),` + `
` + `            type: "text",` + `
` + `            value: "",` + `
` + `            previousValue: "",` + `
` + `            xContent: "",` + `
` + `            source_visible: false,` + `
` + `            editor_visible: true,` + `
` + `          });` + `
` + `` + `
` + `          const oDialog = this.oDialog;` + `
` + `          oDialog.setModel(oModel);` + `
` + `          this.renderTab(requested, oModel);` + `
` + `          oDialog.open();` + `
` + `        } catch (e) {` + `
` + `          Lib.logError("DeveloperTools.show failed", e);` + `
` + `        } finally {` + `
` + `          this._showPending = false;` + `
` + `        }` + `
` + `      },` + `
` + `` + `
` + `      problemCount() {` + `
` + `        const errors = (Lib.errors || []).length;` + `
` + `        const total = errors + (this.ctx?.state?.lastError ? 1 : 0);` + `
` + `        return total ? String(total) : "";` + `
` + `      },` + `
` + `` + `
` + `      close() {` + `
` + `        if (!this.oDialog?.isOpen()) return;` + `
` + `` + `
` + `        const reopenError = this.reopenErrorOnClose;` + `
` + `        this.reopenErrorOnClose = false;` + `
` + `` + `
` + `        this.oDialog.close();` + `
` + `        if (reopenError) ErrorView.reopenErrorDialog(this.ctx);` + `
` + `      },` + `
` + `` + `
` + `      exit() {` + `
` + `        this.reopenErrorOnClose = false;` + `
` + `        clearTimeout(this._statusTimer);` + `
` + `        this._appliedXml = null;` + `
` + `        if (this.oDialog) {` + `
` + `          this.oDialog.close();` + `
` + `          this.oDialog.destroy();` + `
` + `          this.oDialog = null;` + `
` + `        }` + `
` + `      },` + `
` + `` + `
` + `      toggle() {` + `
` + `        if (this.oDialog?.isOpen()) {` + `
` + `          this.close();` + `
` + `        } else {` + `
` + `          this.show();` + `
` + `        }` + `
` + `      },` + `
` + `` + `
` + `      renderer: Lib.EMPTY_RENDERER,` + `
` + `    });` + `
` + `` + `
` + `    return DeveloperTools;` + `
` + `  },` + `
` + `);` + `
` + `` + `
` + ``;
    return result;
  }
}

module.exports = z2ui5_cl_ui5f_dtools_js;

