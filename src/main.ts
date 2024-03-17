import { registerPlugins } from "@/plugins";
import App from "./App.vue";
import { createApp } from "vue";
import { useDataStore } from "@/store/data";
// import "@fontsource/open-sans";
// import "@fontsource/fira-code";

const app = createApp(App);

registerPlugins(app);

const dataStore = useDataStore();
dataStore.setClusters(JSON.parse(import.meta.env.VITE_CLUSTERS) || {});

app.mount("#app");
