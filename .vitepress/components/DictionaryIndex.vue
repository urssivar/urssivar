<script lang="ts">
export type DictionaryIndexMode = "default" | "print" | "sidebar";
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

const letter = computed(() => {
  const l = params.value?.letter;
  return letters.value.includes(l) ? l : "";
});

function getUrl(letter: string) {
  return (mode === "print" ? "#" : "") + letter;
}
</script>

<template>
  <nav v-if="mode === 'sidebar'" class="grid grid-cols-4 xl:grid-cols-6">
    <a
      v-for="l in letters"
      :href="getUrl(l)"
      :key="l"
      class="capitalize text-center"
      :class="{ active: l === letter }"
    >
      {{ l }}
    </a>
  </nav>
  <nav v-else class="stripe grid grid-cols-5 sm:grid-cols-9">
    <a
      v-for="l in letters"
      :href="getUrl(l)"
      class="text-center p-2 flex flex-col no-underline! group"
    >
      <div
        class="group-hover:scale-125 group-hover:-translate-y-px transition-transform duration-200 ease-out"
      >
        <span
          lang="xdq"
          class="font-semibold text-shadow-xs leading-tight capitalize"
        >
          {{ l }}
        </span>
      </div>
      <span class="text-xs text-toned">
        {{ dict[l].length || "–" }}
      </span>
    </a>
  </nav>
</template>
