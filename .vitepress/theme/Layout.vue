<script setup lang="ts">
import { Content, useData } from 'vitepress';
import TableOfContents from './components/TableOfContents.vue';
import SidebarNav from './components/SidebarNav.vue';
import NavBar from './components/NavBar.vue';
import { useHeaderClicks } from '@/composables/useHeaderClicks';
import { useLanguageNav } from '@/composables/useLanguageNav';
import { useI18n } from '@/composables/useI18n';
import Footer from './components/Footer.vue';
import Header from './components/Header.vue';

const { frontmatter } = useData();
useHeaderClicks();

const { currentSection } = useLanguageNav();
const { t } = useI18n();

// TODO: doesn't detect RU lang on home
// it's likely due to moving the ru.md file to root via rewrites
// need to solve together with Vitepress rewrites & LocaleConfig
// and normalize the .md links too
// TODO fix header anchors turning й to и
// TODO fix tooltip animation reverted to instant somehow
</script>

<template>
  <UApp :tooltip="{ delayDuration: 300 }">
    <div class="min-h-screen flex flex-col">
      <Header />

      <NavBar v-if="currentSection" class="lg:hidden sticky top-0 z-10 bg-default/75 backdrop-blur-sm shadow-xs">
        <template #leading>
          <UDrawer direction="left" :handle="false" :ui="{ content: 'w-2/3 sm:w-80 rounded-none p-8' }">
            <UTooltip :text="t('nav.menu')">
              <UButton icon="i-material-symbols:menu-rounded" :aria-label="t('nav.menu')" />
            </UTooltip>
            <template #content>
              <SidebarNav class="w-full text-toned" />
            </template>
          </UDrawer>
        </template>
        <span class="font-semibold flex-1 text-center">
          {{ currentSection?.title }}
        </span>
        <template #trailing>
          <UDrawer direction="right" :handle="false" inset :ui="{ content: 'w-2/3 sm:w-80 p-8' }">
            <UTooltip :text="t('nav.toc')">
              <UButton icon="i-material-symbols:toc-rounded" :aria-label="t('nav.toc')" />
            </UTooltip>
            <template #content>
              <TableOfContents class="w-full text-sm! text-toned" />
            </template>
          </UDrawer>
        </template>
      </NavBar>

      <div class="h-12" />

      <div v-if="currentSection" class="lg:px-4 grid grid-cols-1 lg:grid-cols-[1fr_65ch_1fr]">
        <aside class="hidden lg:block">
          <SidebarNav class="sticky top-12" />
        </aside>
        <article class="w-full">
          <Content />
        </article>
        <aside class="hidden lg:block">
          <TableOfContents class="sticky top-12" />
        </aside>
      </div>
      <Content v-else-if="frontmatter.wide" />
      <article v-else>
        <Content />
      </article>

      <div class="flex-1" />

      <Footer class="mt-24" />
    </div>
  </UApp>
</template>
