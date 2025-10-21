<script setup lang="ts">
import { useLanguageNav } from '@/composables/useLanguageNav';

const { nav, currentSection, currentArticle, getModulePath, getSectionPath, getArticlePath } = useLanguageNav();
</script>

<template>
  <nav class="navlinks text-sm flex flex-col">
    <a :href="getModulePath()">
      {{ nav.title }}
    </a>

    <div class="m-3" />

    <template v-if="currentSection">
      <a :href="getSectionPath(currentSection)">
        {{ currentSection.title }}
      </a>

      <Link v-for="article in currentSection.articles" :key="article.path" :to="getArticlePath(article)" :class="{
        'text-highlighted': article.path === currentArticle?.path
      }">
      <span class="ml-4">
        {{ article.title }}
      </span>
      </a>

      <div class="m-3" />
    </template>

    <Link v-for="section in nav.sections" :key="section.path" :to="getSectionPath(section)">
    {{ section.title }}
    </a>
  </nav>
</template>
