<script setup lang="ts">
import { useData } from "vitepress";
import Footer from "./components/Footer.vue";
import Header from "./components/Header.vue";
import Layout404 from "./layouts/Layout404.vue";
import LayoutDocs from "./layouts/LayoutDocs.vue";

const { page } = useData();
</script>

<template>
  <UApp :tooltip="{ delayDuration: 300 }">
    <div class="min-h-screen flex flex-col bg-muted dark:bg-default">
      <Header class="mt-12 mb-2.5" />
      <div class="grow">
        <Layout404 v-if="page.isNotFound" />
        <LayoutDocs v-else />
      </div>
      <Footer class="mt-12" />
    </div>
  </UApp>
</template>
