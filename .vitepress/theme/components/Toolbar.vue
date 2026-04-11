<template>
  <nav class="h-8 flex items-center gap-4">
    <slot name="leading" />
    <div class="grow min-w-0">
      <slot />
    </div>
    <slot name="trailing" />
  </nav>
</template>
