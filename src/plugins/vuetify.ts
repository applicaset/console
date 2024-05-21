import "@mdi/font/css/materialdesignicons.css";
import "@/styles/main.scss";
import { createVuetify, VuetifyOptions } from "vuetify";
import { md3 } from "vuetify/blueprints";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { VSnackbarQueue } from "vuetify/labs/VSnackbarQueue";

const opts: VuetifyOptions = {
  blueprint: md3,
  components: { ...components, VSnackbarQueue },
  directives,
  theme: {
    defaultTheme: "light",
    themes: {
      // fontFamily: {
      //   sans: ['"Open Sans"'],
      //   mono: ['"JetBrains Mono"'],
      // },
      light: {
        colors: {
          background: "#F3F4F6",
          surface: "#FFFFFF",
          primary: "#008B8B",
          secondary: "#8B008B",
          success: "#00AA00",
          warning: "#FB8C00",
          error: "#FF5252",
          info: "#2196F3",
        },
      },
      dark: {
        dark: true,
        colors: {
          primary: "#008b8b",
          secondary: "#36b68a",
          success: "#00AA00",
          warning: "#FB8C00",
          error: "#FF5252",
          info: "#2196F3",
        },
      },
    },
  },
  icons: {
    defaultSet: "mdi",
  },
  defaults: {
    global: {
      ripple: false,
    },
    VCard: {
      rounded: "md",
      variant: "flat",
    },
    VBtn: {
      rounded: "md",
      flat: true,
      style: [{ textTransform: "none" }],
    },
    VTextField: {
      variant: "outlined",
      persistentPlaceholder: true,
    },
  },
};

const vuetify = createVuetify(opts);

vuetify.theme.global.name.value = window.matchMedia(
  "(prefers-color-scheme: dark)",
).matches
  ? "dark"
  : "light";

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", ({ matches }) => {
    vuetify.theme.global.name.value = matches ? "dark" : "light";
  });

export default vuetify;
