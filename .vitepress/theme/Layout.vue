<script setup lang="ts">
import { Content, useRouter, useData } from 'vitepress';
import Link from '@/components/Link.vue';
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

const isLanguageArticle = computed(() => {
  // Detect if we're on an article page, not just the subsection landing
  // Articles have at least one more path segment after the subsection
  const pattern = /\/language\/(grammar|dictionary|phrasebook|texts)\/[^/]+$/;
  return pattern.test(path.value);
});

const currentSubsection = computed(() => {
  const match = path.value.match(/\/language\/(grammar|dictionary|phrasebook|texts)/);
  return match ? match[1] : null;
});

const subsections = [
  { id: 'grammar', title: 'Грамматика' },
  { id: 'dictionary', title: 'Словарь' },
  { id: 'phrasebook', title: 'Разговорник' },
  { id: 'texts', title: 'Тексты' }
];

const articles = [
  { title: 'Падежи', path: '#' },
  { title: 'Частицы', path: '#' },
  { title: 'Связки', path: '#' }
];
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

    <div v-if="isLanguageSubsection" class="mt-12 mb-24">
      <div class="grid grid-cols-[220px_1fr_220px] gap-6 px-4">
        <!-- Left Sidebar -->
        <aside class="sticky top-[100px] max-h-[calc(100vh-120px)] overflow-y-auto">
          <nav class="flex flex-col gap-3">
            <Link :to="langBase + 'language'">
            Язык
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


            <!-- Separator -->
            <div class="border-t border-neutral-200 dark:border-neutral-800" />

            <!-- Articles List -->
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
        </aside>

        <!-- Main Content -->
        <Content class="content-container" />

        <!-- Right Spacer -->
        <div />
      </div>
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
