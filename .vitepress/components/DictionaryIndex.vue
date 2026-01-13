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
  <nav v-if="variant === 'sidebar'" class="grid grid-cols-4 xl:grid-cols-6">
    <a
      v-for="l in letters"
      :href="`./${l}`"
      :key="l"
      class="capitalize text-center"
      :class="{ active: l === letter }"
    >
      {{ l }}
    </a>
  </nav>
  <nav
    v-else
    class="my-6 grid grid-cols-5 sm:grid-cols-9 -mx-16 bg-elevated px-8 py-4 print:break-inside-avoid"
  >
    <a
      v-for="l in letters"
      :href="(variant === 'print' ? '#' : './') + l"
      class="text-center p-2 flex flex-col no-underline! group"
    >
      <span
        lang="xdq"
        class="text-lg font-semibold leading-tight capitalize group-hover:scale-125 transition"
      >
        {{ l }}
      </span>
      <span class="text-xs text-toned transition">
        {{ dict[l].length || "-" }}
      </span>
    </a>
  </nav>
</template>
