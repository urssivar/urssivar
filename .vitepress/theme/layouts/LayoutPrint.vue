<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import { transformPrintDom } from "../print/transform";
import { useI18n } from "@/composables/i18n";
import Stamp from "../../components/Stamp.vue";

const { baseUrl } = useI18n();

const CANONICAL_ORIGIN = "https://urssivar.com";
const rootEl = ref<HTMLElement>();

onMounted(() =>
  nextTick(() => {
    if (rootEl.value) {
      transformPrintDom(rootEl.value, CANONICAL_ORIGIN);
    }
  }),
);
</script>

<template>
  <main ref="rootEl">
    <Content />
    <div
      class="no-number break-before-page h-[calc(100vh-100px)] bg-red-100 relative"
    >
      <div class="absolute w-full top-1/2 -translate-y-1/2">
        <a :href="baseUrl">
          <Stamp class="m-0!" />
        </a>
      </div>
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
