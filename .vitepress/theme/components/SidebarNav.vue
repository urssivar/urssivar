<script setup lang="ts">
import { useLanguageNav } from "@/composables/languageNav";

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
        v-for="a in currentSection.articles"
        :key="a.path"
        :href="getArticlePath(a)"
        class="ml-4"
        :class="{
          active: a.path === currentArticle?.path,
        }"
        @click="$emit('navigate')"
      >
        <span>
          {{ a.title }}
        </span>
      </a>

      <slot />
    </div>

    <template v-for="s in nav.sections" :key="s.path">
      <a
        v-if="currentSection?.path !== s.path"
        :href="getSectionPath(s)"
        @click="$emit('navigate')"
      >
        {{ s.title }}
      </a>
    </template>
  </nav>
</template>
