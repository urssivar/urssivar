<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import { transformPrintDom } from "../print/transform";
import Home from "@/theme/components/Home.vue";
import Stamp from "@/components/Stamp.vue";
import "../styles/print.css";

const rootEl = ref<HTMLElement>();

onMounted(async () => {
  await nextTick();
  if (rootEl.value) transformPrintDom(rootEl.value);
});
</script>

<template>
  <main ref="rootEl">
    <Home class="mb-16" />
    <Content />
    <div
      class="break-before-page flex items-center justify-center h-[calc(100vh-2in)]"
    >
      <Stamp />
    </div>
  </main>
</template>

<style scoped>
@reference "@/theme/styles/index.css";

main {
  @apply print:px-18;
}

:deep(.breakout) {
  @apply print:max-w-none print:-mx-18 print:px-18;
}
</style>
