import { Client } from "@/client";
import { Notice, Plugin, TAbstractFile } from "obsidian";
import {
  DEFAULT_SETTINGS,
  ObsyncPluginSettings,
  ObsyncSettingsTab,
} from "@/settings";

export default class ObsyncPlugin extends Plugin {
  settings: ObsyncPluginSettings;
  client: Client;

  async onload() {
    // load plugin settings
    await this._loadSettings();
    this.addSettingTab(new ObsyncSettingsTab(this.app, this));

    // initialize HTTP client used for file syncing with the Obsync server
    this.client = new Client(
      this.settings.serverURL,
      this.settings.apiKey || "No API key provided..."
    );

    // register file change event handlers
    this.app.workspace.onLayoutReady(() => {
      this.registerEvent(this.app.vault.on("create", this.onCreate));
    });
    this.registerEvent(this.app.vault.on("rename", this.onRename));
    this.registerEvent(this.app.vault.on("delete", this.onDelete));
    this.registerEvent(this.app.vault.on("modify", this.onModify));

    // sync files upon loading the extension
    if (this.settings.active) {
      this.syncFiles();
    }
  }

  async onunload() {}

  async _loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async syncFiles() {
    new Notice("Obsync is syncing files (not really right now)");
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  async onCreate(file: TAbstractFile) {
    console.log("create:", file.path);
  }

  async onRename(file: TAbstractFile) {
    console.log("rename:", file.path);
  }

  async onDelete(file: TAbstractFile) {
    console.log("delete:", file.path);
  }

  async onModify(file: TAbstractFile) {
    console.log("modify:", file.path);
  }
}
