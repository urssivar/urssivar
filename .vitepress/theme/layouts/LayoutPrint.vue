<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import { transformPrintDom } from "../print/transform";
import Stamp from "@/components/Stamp.vue";
import VillageMap from "@/components/VillageMap.vue";
import { useI18n } from "@/composables/i18n";

const { baseUrl } = useI18n();

const CANONICAL_ORIGIN = "https://urssivar.com";
const rootEl = ref<HTMLElement>();

onMounted(async () => {
  await nextTick();
  if (rootEl.value) transformPrintDom(rootEl.value, CANONICAL_ORIGIN);
});
</script>

<template>
  <main ref="rootEl">
    <VillageMap class="mb-24!" />
    <Content />
    <a :href="baseUrl">
      <Stamp />
    </a>
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
