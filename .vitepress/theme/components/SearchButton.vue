<script setup lang="ts">
import { useI18n } from "@/composables/i18n";
import { onMounted, ref, watch } from "vue";
import type { Pagefind, PagefindSearchFragment } from "@/types/pagefind";
import { title } from "process";

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
  if (!open) {
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
    :ui="{
      title: 'm-0 font-medium',
      body: 'p-0!',
    }"
  >
    <UTooltip :text="t('header.search')" :kbds="['/']">
      <UButton
        icon="i-material-symbols:search-rounded"
        :aria-label="t('header.search')"
      />
    </UTooltip>

    <template #title>
      <UInput
        v-model="query"
        :placeholder="t('header.search')"
        icon="i-material-symbols:search-rounded"
        autofocus
        size="xl"
      />
    </template>
    <template #body>
      <div v-if="loading" class="text-center py-4 text-muted">Loading...</div>

      <div v-else class="flex flex-col overflow-y-auto gap-2">
        <a
          v-for="result in results"
          :key="result.url"
          :href="result.url"
          class="py-3 px-6 hover:bg-elevated transition-colors no-underline"
          @click="isOpen = false"
        >
          <h4 class="mt-0 mb-1" v-if="result.meta?.title">
            {{ result.meta?.title }}
          </h4>
          <div class="text-sm line-clamp-2" v-html="result.excerpt" />
        </a>

        <div
          v-if="query && !results.length && !loading"
          class="text-muted py-4 text-center"
        >
          No results found
        </div>
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
