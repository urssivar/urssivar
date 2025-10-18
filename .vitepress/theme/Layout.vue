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

// Drawer states
const isNavDrawerOpen = ref(false);
const isTocDrawerOpen = ref(false);
</script>

<template>
  <UApp>
    <div class="content-container my-3">
      <nav class="flex gap-1.5 text-sm items-center">
        <Link :to="homeLink" class="flex items-center gap-1.5 text-default decoration-transparent">
        <img src="/favicon-dark.svg" alt="Urssivar logo"
          class="size-6 invert-[88%] dark:invert-[12%] select-none pointer-events-none">
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
    <USeparator />

    <template v-if="isLanguageSubsection">
      <div class="lg:hidden sticky top-0 z-10 x-4 py-2.5 bg-default">
        <div class="flex items-center gap-2 content-container ">
          <UButton icon="i-material-symbols:menu" size="sm" color="neutral" variant="ghost"
            @click="isNavDrawerOpen = true" />
          <span class="text-sm font-semibold">
            Грамматика
          </span>
          <div class="flex-1" />
          <UButton icon="i-material-symbols:toc" size="sm" color="neutral" variant="ghost"
            @click="isTocDrawerOpen = true" />
        </div>
      </div>
      <USeparator class="lg:hidden sticky top-0 z-10" />
    </template>

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

      <!-- Nav Drawer (Mobile) -->
      <!-- <UDrawer v-model="isNavDrawerOpen" title="Navigation" side="left" :ui="{ title: 'text-base font-semibold' }">
        <nav class="flex flex-col gap-4">
          <Link :to="langBase + 'language'"
            class="text-sm font-semibold text-neutral-900 dark:text-neutral-100 decoration-transparent">
          ← Язык
          </Link>

          <USeparator />

          <div v-for="subsection in subsections" :key="subsection.id">
            <Link :to="langBase + 'language/' + subsection.id" :class="[
              'block text-sm font-semibold decoration-transparent transition-colors',
              currentSubsection === subsection.id
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
            ]">
            {{ subsection.title }}
            </Link>
          </div>

          <USeparator />

          <div class="space-y-1.5">
            <h5 class="text-xs font-semibold text-neutral-500 dark:text-neutral-500 uppercase tracking-wide">
              {{ currentSubsection }}
            </h5>
            <div v-for="article in articles" :key="article.title" class="space-y-1">
              <Link :to="article.path"
                class="block text-sm text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 decoration-transparent transition-colors">
              {{ article.title }}
              </Link>
            </div>
          </div>
        </nav>
      </UDrawer> -->

      <!-- <UDrawer v-model="isTocDrawerOpen" title="Contents" :ui="{ title: 'text-base font-semibold' }">
        <TableOfContents />
      </UDrawer> -->
    </div>

    <Content v-else class="mt-12" :class="{
      'content-container': !(isHome || frontmatter.wide),
      'mb-24': !isHome
    }" />

    <USeparator />
    <div class="content-container my-3">
      <nav class="flex gap-1.5 text-xs items-center">
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
