<script setup lang="ts">
import { useLanguageNav } from "@/composables/languageNav";
import DictIndex from "@/components/DictionaryIndex.vue";

const {
  nav,
  currentSection,
  currentArticle,
  getModulePath,
  getSectionPath,
  getArticlePath,
} = useLanguageNav();

defineEmits<{
  (e: "navigate"): void;
}>();
</script>

<template>
  <nav class="navlinks text-sm flex flex-col">
    <a :href="getModulePath()" @click="$emit('navigate')" class="mb-6">
      {{ nav.title }}
    </a>

    <div v-if="currentSection" class="flex flex-col mb-6">
      <a :href="getSectionPath(currentSection)" @click="$emit('navigate')">
        {{ currentSection.title }}
      </a>

      <a
        v-for="article in currentSection.articles"
        :key="article.path"
        :href="getArticlePath(article)"
        class="ml-4"
        :class="{
          'text-highlighted': article.path === currentArticle?.path,
        }"
        @click="$emit('navigate')"
      >
        <span>
          {{ article.title }}
        </span>
      </a>

      <DictIndex v-if="currentSection?.path === 'dictionary'" mode="sidebar" />
    </div>

    <a
      v-for="section in nav.sections"
      :key="section.path"
      :href="getSectionPath(section)"
      @click="$emit('navigate')"
    >
      {{ section.title }}
    </a>
  </nav>
</template>
