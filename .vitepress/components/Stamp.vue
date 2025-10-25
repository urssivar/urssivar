<script setup lang="ts">
import { ref } from 'vue';

const fixed = ref(false);
</script>

<template>
  <div @mousedown="fixed = true" class="my-24 mx-auto size-36 cursor-pointer relative select-none">
    <img src="/stamp-text.svg" alt="Urssivar: Kaitag Studies"
      class="block w-full invert-[90%] dark:invert-0 pointer-events-none animate-[spin_20s_linear_infinite]">
    <img src="/stamp-logo.svg" alt="Urssivar logo"
      class="absolute top-0 left-0 block w-full invert-[90%] dark:invert-0 pointer-events-none rotate-12 transition ease-out"
      :class="{ 'rotate-none': fixed }">
  </div>
</template>
