<script setup lang="ts">
import { useI18n } from "@/composables/i18n";
import { onMounted, ref, watch } from "vue";
import type { Pagefind, PagefindSearchFragment } from "@/types/pagefind";

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
      <UInput
        v-model="query"
        :placeholder="t('header.search')"
        icon="i-material-symbols:search-rounded"
        autofocus
        class="mb-4"
      />

      <div v-if="loading" class="text-center py-4 text-muted">Loading...</div>

      <div v-else class="overflow-y-auto max-h-[60vh] space-y-2">
        <a
          v-for="result in results"
          :key="result.url"
          :href="result.url"
          class="block rounded-sm px-3 py-2 hover:bg-elevated transition-colors"
          @click="isOpen = false"
        >
          <div class="font-medium">{{ result.meta?.title || "Untitled" }}</div>
          <div
            class="text-sm text-muted line-clamp-2"
            v-html="result.excerpt"
          />
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
