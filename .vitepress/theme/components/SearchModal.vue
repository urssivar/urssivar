<script setup lang="ts">
import { watch, onMounted, onUnmounted, nextTick } from "vue";
import { useI18n } from "@/composables/i18n";

const open = defineModel<boolean>("open", { default: false });

const { t } = useI18n();

let pagefindLoaded = false;

// Load Pagefind UI via script tags (works after build)
function loadPagefind() {
  if (pagefindLoaded) return;
  pagefindLoaded = true;

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

// Load Pagefind UI when modal opens
watch(open, async (isOpen) => {
  if (isOpen) {
    await nextTick();
    loadPagefind();
    // Focus input
    const input = document.querySelector("#pagefind-search input") as HTMLInputElement;
    input?.focus();
  }
});

// Global Cmd+K listener
function handleGlobalKeydown(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.key === "k") {
    e.preventDefault();
    open.value = !open.value;
  }
}

onMounted(() => {
  window.addEventListener("keydown", handleGlobalKeydown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleGlobalKeydown);
});
</script>

<template>
  <UModal
    v-model:open="open"
    fullscreen
    :ui="{
      content: 'bg-default',
      body: 'p-0',
    }"
  >
    <template #body>
      <div class="flex flex-col h-full max-w-3xl mx-auto p-6">
        <!-- Header -->
        <div class="flex items-center justify-between mb-6">
          <span class="text-lg font-medium">{{ t("search.title") }}</span>
          <div class="flex items-center gap-2">
            <UKbd>Esc</UKbd>
            <UButton
              icon="i-material-symbols:close-rounded"
              variant="ghost"
              @click="open = false"
            />
          </div>
        </div>

        <!-- Pagefind UI container -->
        <div id="pagefind-search" class="flex-1 overflow-y-auto" />

        <!-- Dev mode message -->
        <!-- <div v-if="import.meta.env.DEV" class="text-center py-12 text-muted">
          {{ t("search.hint") }}
          <p class="mt-2 text-sm">Search unavailable in dev mode (run build first)</p>
        </div> -->
      </div>
    </template>
  </UModal>
</template>

