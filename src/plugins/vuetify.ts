// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'
import { md3 } from 'vuetify/blueprints'

export default createVuetify({
  blueprint: md3,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#008b8b',
          secondary: '#36b68a',
        },
      },
      dark: {
        dark: true,
        colors: {
          primary: '#008b8b',
          secondary: '#36b68a',
        },
      },
    },
  },
})
