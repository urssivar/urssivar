import { defineConfig } from 'vitepress';
import path from "path";
import ui from '@nuxt/ui/vite';
import MdMultimdTable from "markdown-it-multimd-table";
import MdMark from "markdown-it-mark";
import MdAutoNumber from "./plugins/markdown-it-auto-number";
import MdCustomSpans from "./plugins/markdown-it-custom-spans";
import MdColonBlock from "./plugins/markdown-it-colon-block";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Urssivar: Kaitag Studies",
  description: "Resources & technologies for preserving and studying Kaitag language, culture, history, and people.",
  srcDir: 'src',
  lang: 'en',

  cleanUrls: true,
  rewrites: {
    ':path(.*)/index.md': ':path.md',
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
    config: (md) => {
      md.use(MdMultimdTable, { rowspan: true });
      md.use(MdMark);
      md.use(MdAutoNumber);
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
        ui: {
          colors: {
            primary: 'blue',
            neutral: 'gray',
          },
          button: {
            slots: {
              base: "cursor-pointer",
              leadingIcon: 'text-highlighted',
            },
            defaultVariants: {
              color: 'neutral',
              variant: 'ghost',
            }
          },
          tooltip: {
            slots: {
              content: 'data-[state=instant-open]:animate-[scale-in_100ms_ease-out]'
            }
          },
        }
      })
    ]
  }
})
