<script setup lang="ts">
import { ref } from "vue";

const fixed = ref(false);
</script>

<template>
  <div
    @mousedown="fixed = true"
    class="mx-auto my-12 size-36 cursor-pointer relative select-none"
  >
    <img
      src="/stamp-text.svg"
      alt="Urssivar: Kaitag Studies"
      class="block w-full invert-90 dark:invert-0 pointer-events-none animate-[spin_60s_linear_infinite] print:animate-none"
    />
    <img
      src="/stamp-logo.svg"
      alt="Urssivar logo"
      class="absolute top-0 left-0 block w-full invert-90 dark:invert-0 pointer-events-none rotate-12 print:rotate-none transition-transform ease-out"
      :class="{ 'rotate-none': fixed }"
    />
  </div>
</template>
