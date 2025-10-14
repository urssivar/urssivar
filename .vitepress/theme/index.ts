// https://vitepress.dev/guide/custom-theme
import Layout from './Layout.vue';
import type { Theme } from 'vitepress';

import { createRouter, createWebHistory } from 'vue-router';

import './style.css';
import ui from '@nuxt/ui/vue-plugin';

export default {
  Layout,
  enhanceApp({ app }) {
    app.use(ui);

    const router = createRouter({
      routes: [],
      history: createWebHistory()
    });
    app.use(router);
  }
} satisfies Theme
