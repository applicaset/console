import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "./plugins/axios";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.js";

import hljs from "highlight.js/lib/core";
import shell from "highlight.js/lib/languages/shell";
import hljsVuePlugin from "@highlightjs/vue-plugin";
import "highlight.js/styles/dark.css";

import axios from "axios";
import VueAxios from "vue-axios";

hljs.registerLanguage("shell", shell);

createApp(App)
  .use(store)
  .use(router)
  .use(VueAxios, axios)
  .use(hljsVuePlugin)
  .mount("#app");
