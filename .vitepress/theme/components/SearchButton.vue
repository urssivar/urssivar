<script setup lang="ts">
import { useI18n } from "@/composables/i18n";
import { onMounted, ref, watch } from "vue";
import type {
  Pagefind,
  PagefindSubResult,
  PagefindSearchAnchor,
} from "@/types/pagefind";

const { t } = useI18n();

const isOpen = ref(false);
const query = ref("");
const results = ref<PagefindSubResult[]>([]);
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
  const path = "/pagefind/pagefind.js";
  const pf = await import(path);
  await pf.init();
  pagefind = pf as unknown as Pagefind;
}

function findClosestAnchor(anchors: PagefindSearchAnchor[], location: number) {
  let closest = null;
  for (const anchor of anchors) {
    if (anchor.location <= location) {
      closest = anchor;
    } else {
      break;
    }
  }
  return closest;
}

async function search(q: string) {
  if (!q.trim() || !pagefind) {
    results.value = [];
    return;
  }
  loading.value = true;
  const search = await pagefind.debouncedSearch(q);
  if (!search || q !== query.value) return;

  const pages = await Promise.all(search.results.map((r) => r.data()));
  results.value = pages
    .flatMap((p) =>
      p.sub_results.map((sub) => {
        const loc = sub.weighted_locations?.[0]?.location ?? sub.locations?.[0];
        const anchor = loc != null ? findClosestAnchor(p.anchors, loc) : null;
        const url = anchor ? `${p.url}#${anchor.id}` : sub.url;

        const title =
          sub.title != p.meta?.title
            ? `${p.meta?.title} · ${sub.title}`
            : p.meta?.title;

        return {
          ...sub,
          url,
          title,
        };
      })
    )
    .slice(0, 15);
  loading.value = false;
}
</script>

<template>
  <UModal
    v-model:open="isOpen"
    :content="{ onCloseAutoFocus: (e: Event) => e.preventDefault() }"
    :ui="{
      header: 'm-0! p-0! min-h-14 font-medium',
      body: 'p-0! flex-1 flex flex-col',
      content: 'h-[70vh] max-h-[70vh]',
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
      <div class="flex flex-col flex-1 overflow-y-auto">
        <template v-if="results.length">
          <a
            v-for="result in results"
            :key="result.url"
            :href="result.url"
            class="py-3 px-6 hover:bg-elevated transition-colors no-underline block text-sm"
            @click="isOpen = false"
          >
            <div class="font-semibold mb-0.5">{{ result.title }}</div>
            <div class="line-clamp-2" v-html="result.excerpt" />
          </a>
        </template>
        <div v-else class="flex-1 flex items-center justify-center">
          <img
            src="/stamp-logo.svg"
            alt="Urssivar logo"
            class="size-80 invert-10 dark:invert-0 pointer-events-none"
          />
        </div>
      </div>
    </template>
  </UModal>
</template>

<style scoped>
@reference "@/theme/styles/index.css";

:deep(mark) {
  @apply bg-accented/75 rounded-sm px-1 py-0.5 no-underline!;
}
</style>
