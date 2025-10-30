<script setup lang="ts">
import { useDictData } from "@/composables/useDictData";

defineProps<{
  mode: "print" | "intro" | "sidebar";
}>();

const { letters, dict } = useDictData();
</script>

<template>
  <div
    v-if="mode === 'sidebar'"
    class="grid gap-1 ml-4 px-2.5 py-1.5 grid-cols-4 sm:grid-cols-5"
  >
    <a
      v-for="l in letters"
      :href="`./${l}`"
      :key="l"
      class="capitalize text-center rounded-md bg-elevated hover:bg-accented/75"
    >
      {{ l }}
    </a>
  </div>
  <div v-else class="my-4 grid gap-1 grid-cols-5 sm:grid-cols-9">
    <a
      v-for="l in letters"
      :href="(mode === 'print' ? '#' : './') + l"
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
