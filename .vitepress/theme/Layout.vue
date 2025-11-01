<script setup lang="ts">
import { ref } from "vue";
import { Content, useData } from "vitepress";
import TableOfContents from "./components/TableOfContents.vue";
import SidebarNav from "./components/SidebarNav.vue";
import NavBar from "./components/NavBar.vue";
import { useLanguageNav } from "@/composables/useLanguageNav";
import { useI18n } from "@/composables/useI18n";
import Footer from "./components/Footer.vue";
import Header from "./components/Header.vue";
import NotesHeader from "./components/NotesHeader.vue";

const { frontmatter } = useData();

const { currentSection } = useLanguageNav();
const { t } = useI18n();

const menuOpen = ref(false);
</script>

<template>
  <UApp :tooltip="{ delayDuration: 300 }">
    <div class="min-h-screen flex flex-col">
      <Header />

      <NavBar
        v-if="currentSection"
        class="lg:hidden sticky top-0 z-10 border-default border-b bg-default/75 backdrop-blur-sm shadow-xs"
      >
        <template #leading>
          <UDrawer
            direction="left"
            :handle="false"
            :ui="{ content: 'w-2/3 sm:w-80 rounded-none p-8' }"
            v-model:open="menuOpen"
          >
            <UTooltip :text="t('nav.menu')">
              <UButton
                icon="i-material-symbols:menu-rounded"
                :aria-label="t('nav.menu')"
              />
            </UTooltip>
            <template #content>
              <SidebarNav class="w-full" @navigate="menuOpen = false" />
            </template>
          </UDrawer>
        </template>
        <span class="font-semibold flex-1 text-center">
          {{ currentSection?.title }}
        </span>
        <template #trailing>
          <UDrawer
            direction="right"
            :handle="false"
            inset
            :ui="{ content: 'w-2/3 sm:w-80 p-8' }"
          >
            <UTooltip :text="t('nav.toc')">
              <UButton
                icon="i-material-symbols:toc-rounded"
                :aria-label="t('nav.toc')"
              />
            </UTooltip>
            <template #content>
              <TableOfContents class="w-full text-sm!" />
            </template>
          </UDrawer>
        </template>
      </NavBar>

      <hr class="air" />

      <div
        v-if="currentSection"
        class="lg:px-4 grid grid-cols-1 lg:grid-cols-[1fr_65ch_1fr]"
      >
        <aside class="hidden lg:block">
          <SidebarNav class="sticky top-8" @navigate="menuOpen = false" />
        </aside>
        <article class="w-full">
          <Content />
        </article>
        <aside class="hidden lg:block">
          <TableOfContents class="sticky top-8" />
        </aside>
      </div>
      <Content v-else-if="frontmatter.wide" />
      <article v-else>
        <NotesHeader />
        <Content />
      </article>

      <hr class="flex-1 air" />

      <Footer />
    </div>
  </UApp>
</template>
