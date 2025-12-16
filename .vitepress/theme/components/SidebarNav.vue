<script setup lang="ts">
import { useDocsNav } from "@/composables/nav";

const nav = useDocsNav();
</script>

<template>
  <nav v-if="nav.module" class="navlinks text-sm flex flex-col">
    <a :href="nav.module.href" class="mb-6">
      {{ nav.module.text }}
    </a>

    <template v-if="nav.section">
      <a :href="nav.section.href">
        {{ nav.section.text }}
      </a>
      <div class="flex flex-col mb-6 ml-4">
        <a v-for="a in nav.allArticles" :key="a.href" :href="a.href" :class="{
          active: a.href === nav.article?.href,
        }">
          {{ a.text }}
        </a>

        <slot />
      </div>
    </template>

    <a v-for="s in nav.otherSections" :key="s.href" :href="s.href">
      {{ s.text }}
    </a>
  </nav>
</template>
