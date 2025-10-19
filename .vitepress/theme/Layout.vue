<script setup lang="ts">
import { Content, useData } from 'vitepress';
import Link from '@/components/Link.vue';
import TableOfContents from './components/TableOfContents.vue';
import SidebarNav from './components/SidebarNav.vue';
import NavBar from './components/NavBar.vue';
import HomeBrand from './components/HomeBrand.vue';
import LocaleSwitch from './components/LocaleSwitch.vue';
import { useHeaderClicks } from '@/composables/useHeaderClicks';
import { useLanguageNav } from '@/composables/useLanguageNav';

const { frontmatter } = useData();
useHeaderClicks();

const { currentSection } = useLanguageNav();
</script>

<template>
  <UApp>
    <div class="min-h-screen flex flex-col">
      <NavBar>
        <template #leading>
          <HomeBrand />
        </template>
        <template #trailing>
          <UButton icon="i-material-symbols:search-rounded" />
          <LocaleSwitch />
        </template>
      </NavBar>

      <NavBar v-if="currentSection" class="lg:hidden sticky top-0 z-10 bg-default/75 backdrop-blur-sm shadow-xs">
        <template #leading>
          <UDrawer direction="left" :handle="false" :ui="{ content: 'w-2/3 sm:w-80 rounded-none p-8' }">
            <UButton icon="i-material-symbols:menu-rounded" />
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
            <UButton icon="i-material-symbols:toc-rounded" />
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


      <div class="flex-1 min-h-24" />

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
    </div>
  </UApp>
</template>
