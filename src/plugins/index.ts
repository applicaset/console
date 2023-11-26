// Plugins
import vuetify from "./vuetify";
import pinia from "../store";
import router from "../router";

// Types
import type { App } from "vue";
import axios from "@/plugins/axios";

export function registerPlugins(app: App) {
  app.use(axios).use(vuetify).use(router).use(pinia);
}
