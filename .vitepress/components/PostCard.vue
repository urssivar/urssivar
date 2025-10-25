<script setup lang="ts">
import { type ContentData } from 'vitepress';

defineProps<{
  page: ContentData
}>();
</script>

<template>
  <div class="my-8">
    <h4 class="title mt-0">
      <a :href="page.url">{{ page.frontmatter.title }}</a>
    </h4>
    <p>
      <span class="text-toned mr-[0.5em]">
        {{ page.frontmatter.date.toString().substring(0, 10) }}
      </span>
      {{ page.frontmatter.description }}
    </p>
  </div>
</template>

<style scoped>
.title::before {
  content: none;
}
</style>
