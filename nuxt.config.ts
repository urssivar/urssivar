// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint'],
  css: ['~/assets/css/main.css'],
  experimental: {
    inlineSSRStyles: false,
  },
  features: {
    inlineStyles: true,
  },
  router: {
    options: {
      strict: true
    }
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1'
        }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon-light.png', media: '(prefers-color-scheme: light)' },
        { rel: 'icon', type: 'image/png', href: '/favicon-dark.png', media: '(prefers-color-scheme: dark)' }
      ]
    }
  },
})
