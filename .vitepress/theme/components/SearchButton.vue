<script setup lang="ts">
import { useI18n } from "@/composables/i18n";
import { title } from "process";
import { nextTick, ref, watch } from "vue";

const { t } = useI18n();

const isOpen = ref(false);

defineShortcuts({
  "/": () => (isOpen.value = !isOpen.value),
});

let isLoaded = false;
function loadPagefind() {
  if (isLoaded) return;
  isLoaded = true;

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "/pagefind/pagefind-ui.css";
  document.head.appendChild(link);

  const script = document.createElement("script");
  script.src = "/pagefind/pagefind-ui.js";
  script.onload = () => {
    // @ts-expect-error - PagefindUI is loaded dynamically
    new PagefindUI({
      element: "#pagefind-search",
      showSubResults: true,
      showImages: false,
    });
  };
  document.head.appendChild(script);
}

watch(isOpen, async (open) => {
  if (open) {
    await nextTick();
    loadPagefind();
    const input = document.querySelector(
      "#pagefind-search input"
    ) as HTMLInputElement;
    input?.focus();
  }
});
</script>

<template>
  <UModal
    v-model:open="isOpen"
    :title="t('header.search')"
    :ui="{
      title: 'm-0',
    }"
  >
    <UTooltip :text="t('header.search')" :kbds="['/']">
      <UButton
        icon="i-material-symbols:search-rounded"
        :aria-label="t('header.search')"
      />
    </UTooltip>

    <template #body>
      <div id="pagefind-search" class="flex-1 overflow-y-auto" />
    </template>
  </UModal>
</template>
