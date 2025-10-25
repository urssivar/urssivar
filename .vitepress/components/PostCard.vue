<script setup lang="ts">
import { type ContentData } from 'vitepress';

defineProps<{
  page: ContentData
}>();
</script>

<template>
  <div class="my-8">
    <span class="text-xs">
      {{ page.frontmatter.date.toString().substring(0, 10) }}
    </span>
    <h4 class="title mt-0">
      <a :href="page.url">{{ page.frontmatter.title }}</a>
    </h4>
    <p>{{ page.frontmatter.description }}</p>
  </div>
</template>

<style scoped>
.title::before {
  content: none;
}
</style>
