import ObsyncPlugin from "@/main";
import { App, PluginSettingTab, Setting } from "obsidian";

export interface ObsyncPluginSettings {
  serverURL: string;
  apiKey?: string;
  vaultName?: string;
  active: boolean;
}

export const DEFAULT_SETTINGS: ObsyncPluginSettings = {
  serverURL: "http://localhost:8000",
  active: false,
};

export class ObsyncSettingsTab extends PluginSettingTab {
  plugin: ObsyncPlugin;

  constructor(app: App, plugin: ObsyncPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;

    containerEl.empty();

    new Setting(containerEl)
      .setName("Server URL")
      .setDesc("URL of the Obsync server")
      .addText((text) =>
        text
          .setPlaceholder("Obsync server URL")
          .setValue(this.plugin.settings.serverURL)
          .onChange(async (value) => {
            this.plugin.settings.serverURL = value;
            this.plugin.client.serverURL = value;
            await this.plugin.saveSettings();
          })
      );
    new Setting(containerEl)
      .setName("Server API key")
      .setDesc("API key used to authenticate to the Obsync server")
      .addText((text) =>
        text
          .setPlaceholder("Server API key")
          .setValue(this.plugin.settings.apiKey || "")
          .onChange(async (apiKey) => {
            this.plugin.settings.apiKey = apiKey;
            this.plugin.client.key = apiKey;
            await this.plugin.saveSettings();
          })
      );
    new Setting(containerEl)
      .setName("Vault name")
      .setDesc("Name of the vault to sync (defaults to the current vault name)")
      .addText((text) => {
        text
          .setPlaceholder("Vault name")
          .setValue(this.plugin.settings.vaultName || this.app.vault.getName())
          .onChange(async (vaultName) => {
            this.plugin.settings.vaultName = vaultName;
            await this.plugin.saveSettings();
          });
      });
    new Setting(containerEl)
      .setName("Activate syncing")
      .setDesc(
        "Activate file syncing to an Obsync server. WARNING: Make sure to back up your vault before activating this extension!"
      )
      .addToggle((toggle) => {
        toggle
          .setValue(this.plugin.settings.active)
          .onChange(async (active) => {
            this.plugin.settings.active = active;
            await this.plugin.saveSettings();
            this.plugin.syncFiles();
          });
      });
  }
}
