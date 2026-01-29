<script setup lang="ts">
import { dateString } from "@/utils";
import { type ContentData } from "vitepress";
import { computed } from "vue";

const props = defineProps<{
  page: ContentData;
}>();

const id = computed(() => {
  const url = props.page.url.split("/");
  return url[url.length - 1].split(".")[0];
});
</script>

<template>
  <div class="my-8">
    <h4 class="title mt-0">
      <a :id :href="page.url">{{ page.frontmatter.title }}</a>
    </h4>
    <p>
      <span class="mr-[0.5em]">
        {{ dateString(page.frontmatter.date) }}
      </span>
      {{ page.frontmatter.description }}
    </p>
  </div>
</template>
