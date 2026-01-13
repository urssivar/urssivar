<script setup lang="ts">
import { useNav } from "@/composables/nav";
import { watchEffect } from "vue";

const nav = useNav();
</script>

<template>
  <nav class="navlinks text-sm">
    <a
      v-if="nav.module"
      :href="nav.module.url"
      :class="{ active: nav.module == nav.article }"
    >
      {{ nav.module.text }}
    </a>
    <div class="ml-4" v-if="nav.module?.children">
      <template v-for="s in nav.module.children" :key="s.url">
        <a :href="s.url" :class="{ active: s == nav.article }">
          {{ s.text }}
        </a>
        <div class="ml-4" v-if="s == nav.section">
          <a
            v-for="a in nav.section.children"
            :key="a.url"
            :href="a.url"
            :class="{ active: a == nav.article }"
          >
            {{ a.text }}
          </a>
          <slot />
        </div>
      </template>
    </div>

    <div
      v-if="(nav.home.children?.length ?? 0) > 1"
      :class="{ 'mt-8': nav.module }"
    >
      <template v-for="m in nav.home.children" :key="m.url">
        <a v-if="m != nav.module" :href="m.url">
          {{ m.text }}
        </a>
      </template>
    </div>
  </nav>
</template>

<style lang="css" scoped>
@reference "@/theme/styles/index.css";

nav,
div {
  @apply flex flex-col;
}
</style>
