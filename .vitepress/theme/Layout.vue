<script setup lang="ts">
import { useData } from "vitepress";
import Layout404 from "./layouts/Layout404.vue";
import LayoutDocs from "./layouts/LayoutDocs.vue";

const { page } = useData();
</script>

<template>
  <UApp :tooltip="{ delayDuration: 300 }">
    <Layout404 v-if="page.isNotFound" />
    <LayoutDocs v-else />
  </UApp>
</template>
