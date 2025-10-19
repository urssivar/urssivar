<script setup lang="ts">
import Link from '@/components/Link.vue';
import { useLanguageNav } from '@/composables/useLanguageNav';

const { nav, currentSection, currentArticle, getModulePath, getSectionPath, getArticlePath } = useLanguageNav();
</script>

<template>
  <nav class="navlinks text-sm flex flex-col">
    <Link :to="getModulePath()" class="font-semibold">
    {{ nav.title }}
    </Link>

    <div class="m-3" />

    <template v-if="currentSection">
      <Link :to="getSectionPath(currentSection)" class="font-semibold">
      {{ currentSection.title }}
      </Link>

      <Link v-for="article in currentSection.articles" :key="article.path" :to="getArticlePath(article)" :class="{
        'text-highlighted': article.path === currentArticle?.path
      }">
      <span class="ml-4">
        {{ article.title }}
      </span>
      </Link>

      <div class="m-3" />
    </template>

    <Link v-for="section in nav.sections" :key="section.path" :to="getSectionPath(section)" class="font-semibold">
    {{ section.title }}
    </Link>
  </nav>
</template>
