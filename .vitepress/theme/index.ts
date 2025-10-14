// https://vitepress.dev/guide/custom-theme
import Layout from './Layout.vue';
import type { Theme } from 'vitepress';

import './style.css';
import ui from '@nuxt/ui/vue-plugin';

export default {
  Layout,
  enhanceApp({ app }) {
    app.use(ui);
  }
} satisfies Theme
