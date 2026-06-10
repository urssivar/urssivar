<script setup lang="ts">
import { useNav } from "@/composables/nav";

const nav = useNav();
</script>

<template>
  <nav class="navlinks text-sm">
    <a
      :href="nav.home.url"
      :class="{ active: !nav.module, 'mb-8': nav.module }"
    >
      {{ nav.home.text }}
    </a>

    <template v-if="nav.module">
      <a :href="nav.module.url" :class="{ active: nav.module == nav.article }">
        {{ nav.module.text }}
      </a>

      <template v-for="s in nav.module?.children" :key="s.url">
        <a :href="s.url" :class="{ active: s == nav.article }">
          <span class="block ml-4">
            {{ s.text }}
          </span>
        </a>

        <template v-if="s == nav.section">
          <a
            v-for="a in nav.section.children"
            :key="a.url"
            :href="a.url"
            :class="{ active: a == nav.article }"
          >
            <span class="block ml-8">
              {{ a.text }}
            </span>
          </a>
          <div class="ml-8">
            <slot />
          </div>
        </template>
      </template>

      <div class="mb-8" />
    </template>

    <template v-for="m in nav.home.children" :key="m.url">
      <template v-if="m != nav.module">
        <a :href="m.url">
          {{ m.text }}
        </a>
        <a
          v-if="!nav.module"
          v-for="s in m.children"
          :key="s.url"
          :href="s.url"
        >
          <span class="block ml-4">
            {{ s.text }}
          </span>
        </a>
      </template>
    </template>
  </nav>
</template>

<style lang="css" scoped>
@reference "@/theme/styles/index.css";

nav,
div {
  @apply flex flex-col;
}
</style>
