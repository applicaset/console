// Plugins
import { loadFonts } from "./webfontloader";
import vuetify from "./vuetify";
import pinia from "../store";
import router from "../router";

// Types
import type { App } from "vue";
import VueAxios from "vue-axios";
import axios from "axios";

export function registerPlugins(app: App) {
  loadFonts();

  app.use(vuetify).use(router).use(pinia).use(VueAxios, axios);
}
