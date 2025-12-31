<script setup lang="ts">
import { useData } from "vitepress";
import { useLayout, layouts } from "@/composables/layout";
import Footer from "./components/Footer.vue";
import Header from "./components/Header.vue";
import Layout404 from "./layouts/Layout404.vue";

const { page } = useData();
const layout = useLayout();
</script>

<template>
  <UApp :tooltip="{ delayDuration: 300 }">
    <div class="min-h-screen flex flex-col">
      <Header />
      <div class="grow">
        <Layout404 v-if="page.isNotFound" />
        <component v-else :is="layouts[layout]" />
      </div>
      <Footer />
    </div>
  </UApp>
</template>
