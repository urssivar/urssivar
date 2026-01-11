import { defineConfig } from 'vitepress';
import path from "path";
import ui from '@nuxt/ui/vite';
import markdown from "./md";
import uiConfig from "./ui.config";
import transformPageData from './transforms';
import { pagefindDev } from './plugins/pagefind-dev';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Urssivar: Kaitag Studies",
  titleTemplate: false,
  description: "Preserving and studying Kaitag language, culture, history, and people.",
  srcDir: 'src',
  srcExclude: ['**/_*.md'],
  lang: 'en',

  cleanUrls: true,
  sitemap: {
    hostname: 'https://urssivar.com'
  },
  head: [
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1' }],

    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon-light.svg', media: '(prefers-color-scheme: light)' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon-dark.svg', media: '(prefers-color-scheme: dark)' }],

    ['link', { rel: 'preload', as: 'image', href: '/assets/map.webp', type: 'image/webp' }],

    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..800;1,400..800&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Noto+Sans+Math&display=swap" rel="stylesheet' }]
  ],

  transformPageData,

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

  markdown,
  vite: {
    server: {
      host: '0.0.0.0',
      port: 5173,
    },
    build: {
      rollupOptions: {
        external: ['/pagefind/pagefind.js']
      }
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname),
      },
    },
    plugins: [
      // @ts-expect-error - VitePress bundles its own Vite version causing type conflicts
      pagefindDev(),
      // @ts-expect-error - VitePress bundles its own Vite version causing type conflicts
      ui({
        autoImport: {
          dts: path.resolve(__dirname, 'auto-imports.d.ts')
        },
        components: {
          dts: path.resolve(__dirname, 'components.d.ts')
        },
        ui: uiConfig
      })
    ]
  }
})
