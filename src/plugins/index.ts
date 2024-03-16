import pinia from "../store";
import router from "../router";
import type { App } from "vue";
import vuetify from "@/plugins/vuetify";
import axios from "@/plugins/axios";
import vuePageTitle from "@/plugins/vue-page-title";

export function registerPlugins(app: App) {
  app.use(axios).use(vuetify).use(vuePageTitle).use(router).use(pinia);
}
