<script setup lang="ts">
import { useLayout, layouts } from "@/composables/layout";
import Footer from "./components/Footer.vue";
import Header from "./components/Header.vue";

const layout = useLayout();
</script>

<template>
  <UApp :tooltip="{ delayDuration: 300 }">
    <div class="min-h-screen flex flex-col">
      <Header />
      <div class="grow">
        <component :is="layouts[layout]" />
      </div>
      <Footer/>
    </div>
  </UApp>
</template>
