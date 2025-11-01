import { defineConfig } from 'vitepress';
import path from "path";
import ui from '@nuxt/ui/vite';
import anchor from 'markdown-it-anchor';
import MdMultimdTable from "markdown-it-multimd-table";
import MdMark from "markdown-it-mark";
import MdNumbering from "./plugins/markdown-it-numbering";
import MdCustomSpans from "./plugins/markdown-it-custom-spans";
import MdColonBlock from "./plugins/markdown-it-colon-block";
import { uiConfig } from "./ui.config";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Urssivar: Kaitag Studies",
  titleTemplate: false,
  description: "Preserving and studying Kaitag language, culture, history, and people.",
  srcDir: 'src',
  lang: 'en',

  cleanUrls: true,
  sitemap: {
    hostname: 'https://urssivar.com'
  },
  head: [
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1' }],

    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon-light.svg', media: '(prefers-color-scheme: light)' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon-dark.svg', media: '(prefers-color-scheme: dark)' }],

    ['link', { rel: 'preload', as: 'image', href: '/map.webp', type: 'image/webp' }],

    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..800;1,400..800&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet' }]
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

  markdown: {
    anchor: {
      level: [1, 2, 3, 4],
      permalink: anchor.permalink.linkInsideHeader({
        symbol: '§'
      })
    },
    config: (md) => {
      md.use(MdMultimdTable, {
        multibody: false,
        autolabel: false,
      });
      md.use(MdMark);
      md.use(MdNumbering);
      md.use(MdCustomSpans);
      md.use(MdColonBlock);
    },
  },

  vite: {
    server: {
      host: '0.0.0.0',
      port: 5173
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname),
      },
    },
    plugins: [
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
