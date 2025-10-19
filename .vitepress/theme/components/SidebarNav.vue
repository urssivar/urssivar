<script setup lang="ts">
import Link from '@/components/Link.vue';
import { useNav } from '@/composables/useNav';

const { nav, currentSection, otherSections, currentArticle, getModulePath, getSectionPath, getArticlePath } = useNav();
</script>

<template>
  <nav class="text-sm flex flex-col">
    <Link :to="getModulePath()" class="navlink font-semibold">
    {{ nav.title }}
    </Link>

    <template v-if="currentSection">
      <div class="m-3" />

      <Link :to="getSectionPath(currentSection)" class="navlink font-semibold">
      {{ currentSection.title }}
      </Link>

      <Link v-for="article in currentSection.articles" :key="article.path" :to="getArticlePath(article)" class="navlink"
        :class="{
          'text-highlighted': article.path === currentArticle?.path
        }">
      <span class="ml-4">
        {{ article.title }}
      </span>
      </Link>

      <div class="m-3" />
    </template>

    <Link v-for="section in otherSections" :key="section.path" :to="getSectionPath(section)"
      class="navlink font-semibold">
    {{ section.title }}
    </Link>
  </nav>
</template>
