<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import { transformPrintDom } from "../print/transform";
import Stamp from "../../components/Stamp.vue";

const CANONICAL_ORIGIN = "https://urssivar.com";
const rootEl = ref<HTMLElement>();

onMounted(async () => {
  await nextTick();
  if (rootEl.value) transformPrintDom(rootEl.value, CANONICAL_ORIGIN);
});
</script>

<template>
  <main ref="rootEl">
    <Content />
    <div class="no-number h-[calc(100vh-1in)]">
      <Stamp class="m-0! absolute top-1/2 -translate-y-1/2" />
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
