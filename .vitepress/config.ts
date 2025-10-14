import { defineConfig } from 'vitepress'
import ui from '@nuxt/ui/vite'
import tailwindcss from '@tailwindcss/vite'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Urssivar: Kaitag Studies",
  description: "Resources & technologies for preserving and studying Kaitag language, culture, history, and people.",
  srcDir: 'src',
  lang: 'en',

  cleanUrls: true,
  head: [
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon-light.svg', media: '(prefers-color-scheme: light)' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon-dark.svg', media: '(prefers-color-scheme: dark)' }],
    ['link', { rel: 'preload', as: 'image', href: '/map.webp', type: 'image/webp' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap' }]
  ],

  locales: {
    root: {
      label: 'English',
      lang: 'en'
    },
    ru: {
      label: 'Русский',
      lang: 'ru'
    }
  },

  vite: {
    plugins: [
      ui(),
      tailwindcss()
    ]
  }
})
