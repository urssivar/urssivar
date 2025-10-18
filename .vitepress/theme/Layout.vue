<script setup lang="ts">
import { Content, useRouter, useData } from 'vitepress';
import Link from '@/components/Link.vue';
import TableOfContents from './components/TableOfContents.vue';
import SidebarNav from './components/SidebarNav.vue';
import { computed, ref } from 'vue';
import { useHeaderClicks } from '@/composables/useHeaderClicks';

const { frontmatter } = useData();
useHeaderClicks();

const router = useRouter();
const path = computed(() => {
  return router.route.path;
});

const RU = '/ru';
const EN = '/';
const isRu = computed(() => {
  return path.value === RU || path.value.startsWith(RU + '/');
});
const langBase = computed(() => {
  return isRu.value ? RU + '/' : EN;
});
const isHome = computed(() => {
  return path.value === EN || path.value === RU;
});

const homeLink = computed(() => {
  return isRu.value ? RU : EN;
});
const langLink = computed(() => {
  return isHome.value
    ? isRu.value ? EN : RU
    : isRu.value ? path.value.replace(RU, '') : RU + path.value;
});

// Language subsection article detection
const isLanguageSubsection = computed(() => {
  const pattern = /\/language\/(grammar|dictionary|phrasebook|texts)/;
  return pattern.test(path.value);
});
</script>

<template>
  <UApp>
    <div class="border-default border-b">
      <nav class="flex gap-2 py-2 items-center content-container">
        <Link :to="homeLink" class="flex gap-1.5 items-center text-default decoration-transparent">
        <img src="/favicon-dark.svg" alt="Urssivar logo"
          class="mx-1 size-6 invert-[88%] dark:invert-[12%] select-none pointer-events-none">
        <span v-if="!isHome" class="font-bold text-lg">
          Urssivar
        </span>
        </Link>
        <div class="flex-1" />
        <UButton icon="i-material-symbols:search-rounded" />
        <Link :to="langLink">
        <UButton icon="i-material-symbols:translate-rounded" />
        </Link>
      </nav>
    </div>

    <div v-if="isLanguageSubsection"
      class="lg:hidden sticky top-0 z-10 bg-default/75 backdrop-blur-sm border-default border-b shadow-xs">
      <nav class="flex items-center gap-2 py-2 content-container">
        <UDrawer direction="left" :handle="false"
          :ui="{ content: 'w-2/3 sm:w-72 p-4 rounded-none', overlay: 'backdrop-blur-sm' }">
          <UButton icon="i-material-symbols:menu-rounded" />
          <template #content>
            <SidebarNav class="w-full mt-12 mb-24" />
          </template>
        </UDrawer>
        <span class="font-semibold flex-1 text-center">
          Грамматика
        </span>
        <UDrawer direction="right" :handle="false"
          :ui="{ content: 'w-2/3 sm:w-72 p-4 rounded-none', overlay: 'backdrop-blur-xs' }">
          <UButton icon="i-material-symbols:toc-rounded" />
          <template #content>
            <TableOfContents class="w-full mt-12 mb-24 text-sm!" />
          </template>
        </UDrawer>
      </nav>
    </div>

    <div v-if="isLanguageSubsection">
      <div class="mt-12 mb-24 grid px-4 grid-cols-1 gap-8 lg:grid-cols-[1fr_65ch_1fr]">
        <aside class="hidden lg:block">
          <SidebarNav class="sticky top-12" />
        </aside>

        <Content class="content-container w-full" />

        <aside class="hidden lg:block">
          <TableOfContents class="sticky top-12" />
        </aside>
      </div>

    </div>

    <Content v-else class="mt-12" :class="{
      'content-container': !(isHome || frontmatter.wide),
      'mb-24': !isHome
    }" />

    <div class="border-default border-t">
      <nav class="flex gap-2 py-2 text-xs items-center content-container ">
        <span>Лицензия CC BY 4.0</span>
        <div class="flex-1" />
        <Link to="https://t.me/urssivar">
        <UButton icon="i-ix:telegram-logo" />
        </Link>
        <Link to="https://youtube.com/@urssivar">
        <UButton icon="i-ix:youtube-filled" />
        </Link>
        <Link to="https://github.com/urssivar">
        <UButton icon="i-ix:github-logo" />
        </Link>
      </nav>
    </div>
  </UApp>
</template>
