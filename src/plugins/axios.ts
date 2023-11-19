import axios from 'axios'
import VueAxios from 'vue-axios'
import { App } from "@vue/runtime-core";


const AxiosPlugin = {
  install(app: App) {
    app.use(VueAxios, axios)
    app.provide('axios', app.config.globalProperties.axios)
  }
};

export default AxiosPlugin;
