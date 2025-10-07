<template>
  <div
    class="mt-12 mb-4 mx-auto w-[152px] cursor-pointer opacity-30 hover:opacity-100 relative transition-opacity duration-200 group">
    <img src="/stamp-text.svg" alt=""
      class="block w-full invert brightness-75 dark:invert-0 dark:brightness-75 select-none pointer-events-none animate-spin-slow"
      aria-hidden="true" draggable="false">
    <img src="/stamp-logo.svg" alt=""
      class="absolute top-0 left-0 block w-full invert brightness-75 dark:invert-0 dark:brightness-75 select-none pointer-events-none rotate-[15deg] group-hover:rotate-0 transition-transform duration-200"
      aria-hidden="true" draggable="false">
  </div>
</template>

<style scoped>
@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.animate-spin-slow {
  animation: spin-slow 20s linear infinite;
}
</style>
