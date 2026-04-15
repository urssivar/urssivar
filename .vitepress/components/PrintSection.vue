<script setup lang="ts">
defineProps<{
  path?: string;
  shift?: number;
}>();
</script>

<template>
  <div
    class="print-section"
    :data-path="path"
    :data-shift="shift"
  >
    <slot />
  </div>
</template>
