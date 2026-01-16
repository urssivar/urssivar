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
  ".": () => {
    isOpen.value = true;
  },
});
watch(isOpen, (open) => {
  if (open) {
    query.value = "";
    results.value = [];
  }
});

onMounted(async () => {
  try {
    const path = "/pagefind/pagefind.js";
    pagefind = await import(/* @vite-ignore */ path);
    await pagefind.options({ excerptLength: 20 });
    pagefind.init();
  } catch {
    // Pagefind not available (dev mode or not yet indexed)
  }
});

watch(query, search);
async function search(q: string) {
  if (!q.trim() || !pagefind) {
    results.value = [];
    return;
  }
  loading.value = true;
  const search = await pagefind.debouncedSearch(q);
  if (!search || q !== query.value) return;

  const pages = await Promise.all(
    search.results.slice(0, 25).map((r) => r.data())
  );
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
    .slice(0, 50);
  loading.value = false;
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
</script>

<template>
  <UModal
    v-model:open="isOpen"
    :content="{ onCloseAutoFocus: (e: Event) => e.preventDefault() }"
    :ui="{
      overlay: 'z-100',
      content: 'z-100 h-[70vh] max-h-[70vh] rounded-none',
      header: 'm-0! p-0! min-h-12 font-medium',
      body: 'p-0! flex-1 flex flex-col',
    }"
  >
    <UTooltip :text="t('header.search')" :kbds="['.']">
      <UButton
        class="btn-outer"
        icon="i-material-symbols:search"
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
          base: 'ml-3 py-3',
        }"
        variant="none"
      />
      <UButton
        icon="i-material-symbols:close-rounded"
        @click="isOpen = false"
        class="mr-2"
      />
    </template>
    <template #body>
      <div class="flex flex-col flex-1 overflow-y-auto">
        <template v-if="results.length">
          <a
            v-for="result in results"
            :key="result.url"
            :href="result.url"
            class="py-3 px-6 transition-colors hover:bg-elevated no-underline block text-sm"
            @click="isOpen = false"
          >
            <div class="font-semibold mb-0.5">{{ result.title }}</div>
            <div class="line-clamp-2" v-html="result.excerpt" />
          </a>
        </template>
        <div
          v-else
          class="flex-1 flex items-center justify-center select-none pointer-events-none"
        >
          <img
            src="/stamp-logo.svg"
            alt="Urssivar logo"
            class="size-80 invert-90 dark:invert-0 opacity-30"
          />
        </div>
      </div>
    </template>
  </UModal>
</template>

<style scoped>
@reference "@/theme/styles/index.css";

:deep(mark) {
  @apply bg-accented/75 px-1 no-underline!;
}
</style>
