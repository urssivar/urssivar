<template>
  <div>
    <nav class="navbar flex items-center gap-4 h-16">
      <slot name="leading" />
      <div class="grow" />
      <slot />
      <div class="grow" />
      <slot name="trailing" />
    </nav>
  </div>
</template>
