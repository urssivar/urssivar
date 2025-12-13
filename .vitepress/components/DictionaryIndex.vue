<script setup lang="ts">
import { useDictData } from "@/composables/dictionary";
import { useData } from "vitepress";
import { computed } from "vue";

defineProps<{
  variant: "print" | "intro" | "sidebar";
}>();

const { letters, dict } = useDictData();

const { params } = useData();

const letter = computed(() => {
  const l = params.value?.letter;
  return letters.value.includes(l) ? l : "";
});
</script>

<template>
  <div
    v-if="variant === 'sidebar'"
    class="grid grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 border-default border-t border-dashed pt-1.5 mt-1.5"
  >
    <a
      v-for="l in letters"
      :href="`./${l}`"
      :key="l"
      class="capitalize text-center"
      :class="{ active: l === letter }"
    >
      {{ l }}
    </a>
  </div>
  <div v-else class="my-6 grid gap-1 grid-cols-5 sm:grid-cols-9">
    <a
      v-for="l in letters"
      :href="(variant === 'print' ? '#' : './') + l"
      class="text-center rounded-md p-2 flex flex-col !no-underline bg-elevated hover:bg-accented/75"
    >
      <span lang="xdq" class="text-lg font-semibold leading-tight capitalize">
        {{ l }}
      </span>
      <span class="text-xs text-toned">
        {{ dict[l].length || "-" }}
      </span>
    </a>
  </div>
</template>
