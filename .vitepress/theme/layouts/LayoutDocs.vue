<script setup lang="ts">
import { ref, useTemplateRef, watch } from "vue";
import { useRoute } from "vitepress";
import { useMediaQuery } from "@vueuse/core";
import TableOfContents from "../components/TableOfContents.vue";
import SidebarNav from "../components/SidebarNav.vue";
import Toolbar from "../components/Toolbar.vue";
import Prose from "../components/Prose.vue";
import DictionaryIndex from "@/components/DictionaryIndex.vue";
import { useI18n } from "@/composables/i18n";
import { useNav } from "@/composables/nav";
import LayoutBase from "./LayoutBase.vue";
import Home from "../components/Home.vue";
import SearchButton from "../components/SearchButton.vue";
import LocaleSwitch from "../components/LocaleSwitch.vue";
import Footer from "../components/Footer.vue";

const nav = useNav();
const { t } = useI18n();
const menuOpen = ref(false);
const tocOpen = ref(false);

const route = useRoute();
watch(
  () => route.path,
  () => {
    menuOpen.value = false;
    tocOpen.value = false;
  },
);

const isWide = useMediaQuery("(width >= 1024px)");
const isSheet = useMediaQuery("(width >= 768px)");
const tocRef = useTemplateRef("toc");
</script>

<template>
  <div
    v-if="!isWide"
    class="print:hidden sticky top-0 z-10 border-accented/50 border-b bg-default dark:bg-[#1e1e1e] shadow-xs"
  >
    <Prose>
      <Toolbar class="h-12! -ml-1.5">
        <template #leading>
          <USlideover :close="false" side="left" v-model:open="menuOpen">
            <UTooltip :text="t('nav.menu')">
              <UButton
                icon="i-material-symbols:menu"
                :aria-label="t('nav.menu')"
              />
            </UTooltip>
            <template #body>
              <UButton
                icon="i-material-symbols:close"
                @click="menuOpen = false"
                class="absolute -right-12 top-4 shadow-md border border-accented/50 bg-default"
              />
              <Toolbar class="mx-1.5">
                <template #leading>
                  <Home />
                </template>
                <template #trailing>
                  <LocaleSwitch />
                </template>
              </Toolbar>
              <SidebarNav>
                <DictionaryIndex
                  v-if="nav.section?.path === 'dictionary'"
                  mode="sidebar"
                />
              </SidebarNav>
              <Footer class="mt-auto" />
            </template>
          </USlideover>
        </template>
        <span class="font-semibold flex-1 text-center">
          {{ nav.section?.text }}
        </span>
        <template #trailing>
          <USlideover
            :close="false"
            v-if="tocRef?.isVisible"
            side="right"
            v-model:open="tocOpen"
          >
            <UTooltip :text="t('nav.toc')">
              <UButton
                icon="i-material-symbols:toc"
                :aria-label="t('nav.toc')"
              />
            </UTooltip>
            <template #body>
              <UButton
                icon="i-material-symbols:close"
                @click="tocOpen = false"
                class="absolute -left-12 top-4 shadow-md bg-default border border-accented/50"
              />
              <TableOfContents class="text-sm!" />
            </template>
          </USlideover>
          <SearchButton />
        </template>
      </Toolbar>
    </Prose>
  </div>

  <LayoutBase>
    <template #header v-if="!isWide">
      <div />
    </template>
    <div
      class="grid md:mt-16 lg:mt-5.5 lg:mx-2 gap-4 grid-cols-1 lg:grid-cols-[1fr_auto_1fr] print:block"
    >
      <aside>
        <SidebarNav class="ml-auto">
          <DictionaryIndex
            v-if="nav.section?.path === 'dictionary'"
            mode="sidebar"
          />
        </SidebarNav>
      </aside>
      <main
        class="md:shadow-sm md:border border-accented/50 bg-default dark:bg-[#1e1e1e]"
      >
        <article>
          <Content />
        </article>
      </main>
      <aside>
        <TableOfContents ref="toc" compact />
      </aside>
    </div>
    <template #footer v-if="!isSheet">
      <div />
    </template>
  </LayoutBase>
</template>

<style lang="css" scoped>
@reference "@/theme/styles/index.css";

main {
  @apply mx-auto w-full md:w-[calc(65ch+var(--spacing)*32)] print:w-full;

  article {
    @apply my-20;

    :deep(> div > :not(.breakout)) {
      @apply mx-6 sm:mx-12 md:mx-16;
    }
  }
}

aside {
  @apply hidden lg:block;

  > * {
    @apply sticky top-0 py-4 max-h-screen max-w-64 overflow-y-auto;

    scrollbar-width: none;
    -ms-overflow-style: none;
    scroll-padding-block: --spacing(16);
    mask-image: linear-gradient(
      to bottom,
      transparent,
      black --spacing(6),
      black calc(100% - --spacing(6)),
      transparent
    );

    &::-webkit-scrollbar {
      @apply hidden;
    }
  }
}
</style>
