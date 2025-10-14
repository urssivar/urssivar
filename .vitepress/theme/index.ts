// https://vitepress.dev/guide/custom-theme
import Layout from './Layout.vue'
import type { Theme } from 'vitepress'
import './style.css'

// Nuxt UI
import ui from '@nuxt/ui/vue-plugin'

// Import components
import Stamp from '../components/Stamp.vue'
import VillageMap from '../components/VillageMap.vue'

import { createRouter, createWebHistory } from 'vue-router'

export default {
  Layout,
  enhanceApp({ app }) {
    // Set up Nuxt UI
    app.use(ui)

    // Set up router
    const router = createRouter({
      routes: [],
      history: createWebHistory()
    })
    app.use(router);

    // Register global components
    app.component('Stamp', Stamp)
    app.component('VillageMap', VillageMap)
  }
} satisfies Theme
