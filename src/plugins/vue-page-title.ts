import { pageTitle } from "vue-page-title";
import router from "@/router";
import i18n from "@/plugins/i18n";

const vuePageTitle = pageTitle({
  router,
  suffix: ` | ${i18n.global.t("app.title")}`,
});

export default vuePageTitle;
