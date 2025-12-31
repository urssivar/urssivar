<script setup lang="ts">
import { useI18n } from "@/composables/i18n";
import { onMounted, ref, watch } from "vue";
import type { Pagefind, PagefindSearchFragment } from "@/types/pagefind";
import { title } from "process";
import Header from "./Header.vue";

const { t } = useI18n();

const isOpen = ref(false);
const query = ref("");
const results = ref<PagefindSearchFragment[]>([]);
const loading = ref(false);

let pagefind: Pagefind;

defineShortcuts({
  "/": () => (isOpen.value = !isOpen.value),
});

watch(query, search);

watch(isOpen, (open) => {
  if (open) {
    query.value = "";
    results.value = [];
  }
});

onMounted(loadPagefind);

async function loadPagefind() {
  const pfPath = "/pagefind/pagefind.js";
  const pf = await import(pfPath);
  await pf.init();
  pagefind = pf as unknown as Pagefind;
}

async function search(q: string) {
  if (!q.trim() || !pagefind) {
    results.value = [];
    return;
  }
  loading.value = true;
  const search = await pagefind.debouncedSearch(q);
  if (!search) return;

  results.value = await Promise.all(
    search.results.slice(0, 10).map((r) => r.data())
  );
  loading.value = false;
}
</script>

<template>
  <UModal
    v-model:open="isOpen"
    :content="{ onCloseAutoFocus: (e: Event) => e.preventDefault() }"
    :ui="{
      header: 'm-0! p-0! min-h-14 font-medium',
      body: 'p-0! min-h-screen',
    }"
  >
    <UTooltip :text="t('header.search')" :kbds="['/']">
      <UButton
        icon="i-material-symbols:search-rounded"
        :aria-label="t('header.search')"
      />
    </UTooltip>

    <template #header>
      <UInput
        v-model="query"
        :placeholder="t('header.search') + '...'"
        autofocus
        class="w-full"
        size="xl"
        :ui="{
          base: 'ml-3 py-4',
        }"
        variant="none"
      />
      <UButton
        icon="i-material-symbols:close-rounded"
        @click="isOpen = false"
        class="rounded-full mr-2"
      />
    </template>
    <template #body>
      <div class="flex flex-col overflow-y-auto min-h-screen">
        <template v-if="results.length">
          <a
            v-for="result in results"
            :key="result.url"
            :href="result.url"
            class="py-3 px-6 hover:bg-elevated transition-colors no-underline"
            @click="isOpen = false"
          >
            <h5 class="mt-0 mb-0.5" v-if="result.meta?.title">
              {{ result.meta?.title }}
            </h5>
            <div class="text-sm line-clamp-2" v-html="result.excerpt" />
          </a>
        </template>
        <img
          v-else
          src="/stamp-logo.svg"
          alt="Urssivar logo"
          class="self-center size-80 invert-10 dark:invert-0 pointer-events-none"
        />
      </div>
    </template>
  </UModal>
</template>

<style scoped>
@reference "@/theme/styles/index.css";

:deep(mark) {
  @apply text-info font-medium no-underline!;
}
</style>
