<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute } from "vitepress";
import TableOfContents from "../components/TableOfContents.vue";
import SidebarNav from "../components/SidebarNav.vue";
import NavBar from "../components/NavBar.vue";
import DictionaryIndex from "@/components/DictionaryIndex.vue";
import { useI18n } from "@/composables/i18n";
import { useNav } from "@/composables/nav";

const nav = useNav();
const { t } = useI18n();
const menuOpen = ref(false);

const route = useRoute();
watch(
  () => route.path,
  () => {
    menuOpen.value = false;
  }
);
</script>

<template>
  <NavBar
    class="lg:hidden print:hidden sticky top-0 z-10 border-default border-b bg-default/75 backdrop-blur-sm shadow-xs"
  >
    <template #leading>
      <UDrawer
        direction="left"
        :handle="false"
        :ui="{
          content: 'w-2/3 sm:w-80 rounded-none',
          body: 'py-2',
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
          <SidebarNav @navigate="menuOpen = false">
            <DictionaryIndex
              v-if="nav.section?.path === 'dictionary'"
              variant="sidebar"
            />
          </SidebarNav>
        </template>
      </UDrawer>
    </template>
    <span class="font-semibold flex-1 text-center">
      {{ nav.section?.text }}
    </span>
    <template #trailing>
      <UDrawer
        direction="right"
        :handle="false"
        inset
        :ui="{
          content: 'w-2/3 sm:w-80',
          body: 'py-2',
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

  <div
    class="grid gap-6 grid-cols-1 lg:grid-cols-[1fr_calc(65ch+64px)_1fr] lg:mx-2.5 print:block"
  >
    <aside>
      <SidebarNav class="ml-auto">
        <DictionaryIndex
          v-if="nav.section?.path === 'dictionary'"
          variant="sidebar"
        />
      </SidebarNav>
    </aside>
    <main
      class="shadow bg-default border border-accented/50 dark:bg-muted/50 w-full px-16 py-16"
    >
      <article>
        <Content />
      </article>
    </main>
    <aside>
      <TableOfContents compact />
    </aside>
  </div>
</template>

<style lang="css" scoped>
@reference "@/theme/styles/index.css";

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
