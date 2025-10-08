<script setup lang="ts">
const fixed = ref(false);
</script>

<template>
  <div @click="fixed = true" class="mt-16 mb-8 mx-auto w-[152px] cursor-pointer relative select-none">
    <img src="/stamp-text.svg" alt="Urssivar: Kaitag Studies"
      class="block w-full invert-[88%] dark:invert-[12%] pointer-events-none animate-[spin_20s_linear_infinite]">
    <img src="/stamp-logo.svg" alt="Urssivar logo"
      class="absolute top-0 left-0 block w-full invert-[88%] dark:invert-[12%] pointer-events-none rotate-12 transition ease-out"
      :class="{ 'rotate-none': fixed }">
  </div>
</template>
