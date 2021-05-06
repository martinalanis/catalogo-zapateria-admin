import colors from 'vuetify/es5/util/colors'
import es from 'vuetify/es5/locale/es'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - AdminPanel',
    title: 'AdminPanel',
    htmlAttrs: {
      lang: 'es',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/png', href: '/logo.png' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~scss/styles.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  env: {
    urlApi: process.env.NODE_ENV !== 'production'
      ? process.env.URL_API
      : 'https://api.zapateriasdleon.com/api',
    imgPath: process.env.NODE_ENV !== 'production'
      ? process.env.IMG_PATH
      : 'https://api.zapateriasdleon.com/img'
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/dayjs'
  ],

  router: {
    middleware: ['auth']
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    credentials: true,
    baseUrl: process.env.NODE_ENV !== 'production'
      ? process.env.URL_API
      : 'https://api.zapateriasdleon.com/api'
  },

  auth: {
    strategies: {
      laravelSanctum: {
        provider: 'laravel/sanctum',
        url: process.env.NODE_ENV !== 'production'
          ? 'http://localhost/zapateria/api/public'
          : 'https://api.zapateriasdleon.com',
        // user endpoint uses packages defaults https://github.com/nuxt-community/auth-module/blob/dev/src/providers/laravel-sanctum.ts
        endpoints: {
          login: {
            url: '/api/admin/login'
          },
          logout: {
            url: '/api/logout'
          },
          user: {
            url: '/api/user'
          }
        },
        user: {
          property: false
        }
      }
    },
    redirect: {
      // If user not logged en requires redirecto to
      login: '/login',
      // redirect after logout
      logout: '/login',
      // if user loggedIn go to home
      home: '/'
    }
  },

  dayjs: {
    locales: ['es'],
    defaultLocale: 'es',
    defaultTimeZone: 'America/Mexico_City',
    plugins: [
      'utc', // import 'dayjs/plugin/utc'
      'timezone' // import 'dayjs/plugin/timezone'
    ]
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
    lang: {
      locales: { es },
      current: 'es'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
