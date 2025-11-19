<script setup lang="ts">
import { useLayout } from "@/composables/layout";
import Footer from "./components/Footer.vue";
import Header from "./components/Header.vue";
import LayoutLanding from "./layouts/LayoutLanding.vue";
import LayoutDocs from "./layouts/LayoutDocs.vue";
import LayoutPost from "./layouts/LayoutPost.vue";
import LayoutArticle from "./layouts/LayoutArticle.vue";

const layout = useLayout();

const layouts = {
  landing: LayoutLanding,
  docs: LayoutDocs,
  post: LayoutPost,
  article: LayoutArticle,
};
</script>

<template>
  <UApp :tooltip="{ delayDuration: 300 }">
    <Header />
    <hr class="air" />

    <component :is="layouts[layout]" />

    <hr class="grow air" />
    <Footer />
  </UApp>
</template>
