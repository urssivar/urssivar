// https://vitepress.dev/guide/custom-theme
import Layout from './Layout.vue';
import type { Theme } from 'vitepress';

import './styles/index.css';
import ui from '@nuxt/ui/vue-plugin';

export default {
  Layout,
  enhanceApp({ app }) {
    if (!import.meta.env.SSR) {
      app.use(ui);
    }
  }
} satisfies Theme
