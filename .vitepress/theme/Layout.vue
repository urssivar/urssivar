<script setup lang="ts">
import { useData } from "vitepress";
import Layout404 from "./layouts/Layout404.vue";
import LayoutDocs from "./layouts/LayoutDocs.vue";
import LayoutPrint from "./layouts/LayoutPrint.vue";

const { page, frontmatter } = useData();
</script>

<template>
  <UApp :tooltip="{ delayDuration: 300 }">
    <Layout404 v-if="page.isNotFound" />
    <LayoutPrint v-else-if="frontmatter.layout === 'print'" />
    <LayoutDocs v-else />
  </UApp>
</template>
