import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import { md3 } from "vuetify/blueprints";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  blueprint: md3,
  components,
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
          primary: "#008b8b",
          secondary: "#8B008B",
          // tertiary: "#8B8B00",
          success: "#00AA00",
          info: "#2196F3",
          error: "#FF5252",
          warning: "#FB8C00",
        },
      },
      dark: {
        dark: true,
        colors: {
          primary: "#008b8b",
          secondary: "#36b68a",
          // tertiary: "#8B8B00",
          success: "#00AA00",
          info: "#2196F3",
          error: "#FF5252",
          warning: "#FB8C00",
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
    VCard: {},
    VBtn: {
      rounded: "md",
      flat: true,
      style: "text-transform: none;",
    },
  },
});

export default vuetify;
