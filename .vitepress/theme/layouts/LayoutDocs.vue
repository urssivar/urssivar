<script setup lang="ts">
import { ref } from "vue";
import { Content } from "vitepress";
import TableOfContents from "../components/TableOfContents.vue";
import SidebarNav from "../components/SidebarNav.vue";
import NavBar from "../components/NavBar.vue";
import { useLanguageNav } from "@/composables/languageNav";
import { useI18n } from "@/composables/i18n";
import BaseLayout from "./BaseLayout.vue";

const { currentSection } = useLanguageNav();
const { t } = useI18n();
const menuOpen = ref(false);
</script>

<template>
  <BaseLayout>
    <template #header>
      <NavBar
        class="lg:hidden sticky top-0 z-10 border-default border-b bg-default/75 backdrop-blur-sm shadow-xs"
      >
        <template #leading>
          <UDrawer
            direction="left"
            :handle="false"
            :ui="{
              content: 'w-2/3 sm:w-80 rounded-none',
              body: 'p-2',
            }"
            v-model:open="menuOpen"
          >
            <UTooltip :text="t('nav.menu')">
              <UButton
                icon="i-material-symbols:menu-rounded"
                :aria-label="t('nav.menu')"
              />
            </UTooltip>
            <template #body>
              <SidebarNav @navigate="menuOpen = false" />
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
            :ui="{
              content: 'w-2/3 sm:w-80',
              body: 'p-2',
            }"
          >
            <UTooltip :text="t('nav.toc')">
              <UButton
                icon="i-material-symbols:toc-rounded"
                :aria-label="t('nav.toc')"
              />
            </UTooltip>
            <template #body>
              <TableOfContents class="text-sm!" />
            </template>
          </UDrawer>
        </template>
      </NavBar>
    </template>
    <div class="lg:px-4 lg:gap-4 grid grid-cols-1 lg:grid-cols-[1fr_65ch_1fr]">
      <aside class="hidden lg:block border-r border-default border-dashed pr-4">
        <SidebarNav @navigate="menuOpen = false" />
      </aside>
      <article class="w-full">
        <Content />
      </article>
      <aside class="hidden lg:block">
        <TableOfContents class="sticky top-8" />
      </aside>
    </div>
  </BaseLayout>
</template>
