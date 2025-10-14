// https://vitepress.dev/guide/custom-theme
import Layout from './Layout.vue'
import type { Theme } from 'vitepress'
import './style.css'

// Nuxt UI
import ui from '@nuxt/ui/vue-plugin'

// unhead for meta management
import { createHead } from '@unhead/vue'

// Import components
import Stamp from './components/Stamp.vue'
import VillageMap from './components/VillageMap.vue'

export default {
  Layout,
  enhanceApp({ app, router, siteData }) {
    // Set up Nuxt UI
    app.use(ui)

    // Set up unhead
    const head = createHead()
    app.use(head)

    // Register global components
    app.component('Stamp', Stamp)
    app.component('VillageMap', VillageMap)
  }
} satisfies Theme
