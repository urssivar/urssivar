<template>
  <div>
    <nav class="navbar flex items-center gap-4 h-16">
      <slot name="leading" />
      <div class="flex-1" />
      <slot />
      <div class="flex-1" />
      <slot name="trailing" />
    </nav>
  </div>
</template>
