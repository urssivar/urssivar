<script lang="ts">
export type DictionaryIndexMode = "default" | "sidebar";
</script>

<script setup lang="ts">
import { useDictData } from "@/composables/dictionary";
import { useData } from "vitepress";
import { computed } from "vue";

const { mode = "default" } = defineProps<{
  mode?: DictionaryIndexMode;
}>();

const { letters, dict } = useDictData();
const { params } = useData();

const urls = computed(() => {
  return Object.fromEntries(
    letters.value.map((l) => [l, dict[l].length ? l : undefined]),
  );
});
</script>

<template>
  <nav
    v-if="mode === 'sidebar'"
    class="grid grid-cols-5 sm:grid-cols-6 lg:grid-cols-4 xl:grid-cols-5"
  >
    <a
      v-for="l in letters"
      :href="urls[l]"
      :key="l"
      class="capitalize text-center"
      :class="{ active: l === params?.letter }"
    >
      {{ l }}
    </a>
  </nav>
  <nav v-else class="breakout grid grid-cols-7 sm:grid-cols-9">
    <a
      v-for="l in letters"
      :href="urls[l]"
      class="text-center py-2 flex flex-col no-underline! group"
    >
      <span
        class="text-lg font-semibold text-shadow-xs capitalize rounded-full group-hover:bg-accented/50 transition-colors"
      >
        {{ l }}
      </span>
      <span class="text-xs text-toned">
        {{ dict[l].length || "–" }}
      </span>
    </a>
  </nav>
</template>
