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
  <nav v-else class="stripe grid grid-cols-5 sm:grid-cols-9">
    <a
      v-for="l in letters"
      :href="(variant === 'print' ? '#' : './') + l"
      class="text-center p-2 flex flex-col no-underline! group"
    >
      <div class="group-hover:scale-125 transition duration-200">
        <span lang="xdq" l class="font-semibold leading-tight capitalize">
          {{ l }}
        </span>
      </div>
      <span class="text-xs text-toned transition">
        {{ dict[l].length || "–" }}
      </span>
    </a>
  </nav>
</template>
