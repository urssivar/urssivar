<template>
  <div>
    <nav class="navbar flex gap-2 h-16 items-center">
      <slot name="leading" />
      <div class="flex-1" />
      <slot />
      <div class="flex-1" />
      <slot name="trailing" />
    </nav>
  </div>
</template>
