<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import { transformPrintDom } from "../print/transform";

const rootEl = ref<HTMLElement>();

onMounted(async () => {
  await nextTick();
  if (rootEl.value) transformPrintDom(rootEl.value);
});
</script>

<template>
  <main ref="rootEl">
    <Content />
  </main>
</template>
