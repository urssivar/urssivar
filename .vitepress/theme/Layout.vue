<script setup lang="ts">
import { Content, useRouter, useData, onContentUpdated } from 'vitepress';
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

onContentUpdated(() => {
  document.querySelectorAll(':is(h1, h2, h3, h4, h5, h6)[id]')
    .forEach(header => {
      header.addEventListener('click', (e) => {
        if ((e.target as HTMLElement)?.tagName === 'A') return;
        header.scrollIntoView({ behavior: 'smooth' });
        window.location.hash = header.id;
      });
    });
})
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

    <template v-if="path.includes('/language')">
      <div class="content-container my-3">
        <nav class="flex gap-3 text-sm items-center font-semibold overflow-x-auto">
          <UButton icon="i-material-symbols:menu-rounded" size="xs" />
          <span class="select-none text-dimmed text-xs">/</span>
          <Link :to="langBase + 'language'">
          Язык
          </Link>
          <span class="select-none text-dimmed text-xs">/</span>
          <Link :to="langBase + 'language/grammar'">
          Грамматика
          </Link>
          <Link :to="langBase + 'language/dictionary'">
          Словарь
          </Link>
          <Link :to="langBase + 'language/phrasebook'">
          Разговорник
          </Link>
          <Link :to="langBase + 'language/texts'">
          Тексты
          </Link>
        </nav>
      </div>
      <USeparator />
    </template>

    <Content class="mt-12" :class="{
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
