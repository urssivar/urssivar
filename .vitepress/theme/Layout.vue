<script setup lang="ts">
import { Content, useRouter, useData } from 'vitepress';
import Link from '@/components/Link.vue';
import TableOfContents from './components/TableOfContents.vue';
import SidebarNav from './components/SidebarNav.vue';
import NavBar from './components/NavBar.vue';
import { computed } from 'vue';
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
    <NavBar>
      <template #leading>
        <Link :to="homeLink" class="flex gap-1.5 items-center text-default decoration-transparent">
        <img src="/favicon-dark.svg" alt="Urssivar logo"
          class="mx-1 size-6 invert-[88%] dark:invert-[12%] select-none pointer-events-none">
        <span v-if="!isHome" class="font-bold text-lg">
          Urssivar
        </span>
        </Link>
      </template>
      <template #trailing>
        <UButton icon="i-material-symbols:search-rounded" />
        <Link :to="langLink">
        <UButton icon="i-material-symbols:translate-rounded" />
        </Link>
      </template>
    </NavBar>

    <NavBar v-if="isLanguageSubsection" class="lg:hidden sticky top-0 z-10 bg-default/75 backdrop-blur-sm shadow-xs">
      <template #leading>
        <UDrawer direction="left" :handle="false"
          :ui="{ content: 'w-2/3 sm:w-80 rounded-none p-4 pr-8', overlay: 'backdrop-blur-sm' }">
          <UButton icon="i-material-symbols:menu-rounded" />
          <template #content>
            <SidebarNav class="w-full mt-12 mb-24" />
          </template>
        </UDrawer>
      </template>
      <span class="font-semibold flex-1 text-center">
        Грамматика
      </span>
      <template #trailing>
        <UDrawer direction="right" :handle="false"
          :ui="{ content: 'w-2/3 sm:w-80 rounded-none p-8', overlay: 'backdrop-blur-sm' }">
          <UButton icon="i-material-symbols:toc-rounded" />
          <template #content>
            <TableOfContents class="w-full mt-12 mb-24 text-sm!" />
          </template>
        </UDrawer>
      </template>
    </NavBar>

    <div v-if="isLanguageSubsection" class="mt-12 mb-24 lg:px-4 grid grid-cols-1 lg:grid-cols-[1fr_65ch_1fr]">
      <aside class="hidden lg:block">
        <SidebarNav class="sticky top-12" />
      </aside>
      <Content class="content-container w-full" />
      <aside class="hidden lg:block">
        <TableOfContents class="sticky top-12" />
      </aside>
    </div>
    <Content v-else class="mt-12 mb-24" :class="{
      'content-container': !(isHome || frontmatter.wide),
      'mb-24': !isHome
    }" />

    <NavBar class="border-b-0 border-t">
      <template #leading>
        <span class="text-xs">Лицензия CC BY 4.0</span>
      </template>
      <template #trailing>
        <Link to="https://t.me/urssivar">
        <UButton icon="i-ix:telegram-logo" />
        </Link>
        <Link to="https://youtube.com/@urssivar">
        <UButton icon="i-ix:youtube-filled" />
        </Link>
        <Link to="https://github.com/urssivar">
        <UButton icon="i-ix:github-logo" />
        </Link>
      </template>
    </NavBar>
  </UApp>
</template>
