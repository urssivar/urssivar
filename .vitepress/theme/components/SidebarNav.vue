<script setup lang="ts">
import { useNav } from "@/composables/nav";

const nav = useNav();
</script>

<template>
  <nav v-if="nav.module" class="navlinks text-sm flex flex-col">
    <a :href="nav.module.href" class="mb-6">
      {{ nav.module.text }}
    </a>

    <div v-if="nav.section" class="flex flex-col mb-6">
      <a :href="nav.section.href">
        {{ nav.section.text }}
      </a>

      <a
        v-for="a in nav.allArticles"
        :key="a.href"
        :href="a.href"
        class="ml-4"
        :class="{
          active: a.href === nav.article?.href,
        }"
      >
        <span>
          {{ a.text }}
        </span>
      </a>

      <slot />
    </div>

    <template v-for="s in nav.otherSections" :key="s.href">
      <a :href="s.href">
        {{ s.text }}
      </a>
    </template>
  </nav>
</template>
