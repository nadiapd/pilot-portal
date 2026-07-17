import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({

  modules: ['@nuxt/eslint', '@nuxt/image', '@pinia/nuxt'],

  devtools: {
    enabled: process.env.NODE_ENV === 'production' ? false : true
  },
  app: {
    baseURL: `/${process.env.BASE_URL}`,
    head: {
      titleTemplate: '%s | Pilot Portal',
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Pilot\'s logbook and schedule companion.' }
      ],
      link: [
        { rel: 'icon', type: '/favicon.ico', href: 'https://susiair.com/favicon.ico' }
      ]
    }
  },

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    private: {
      USERNAME: '',
      PASSWORD: '',
      INTERNAL_API_SECRET: '',
      CRYPTO_KEY: '',
      JWT_SECRET: ''
    },
    public: {
      BASE_URL: process.env.BASE_URL,
      APP_URL: process.env.APP_URL
    }
  },

  compatibilityDate: '2026-07-15',

  vite: {
    plugins: [tailwindcss()]
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
