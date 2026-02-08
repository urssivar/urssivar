<script setup lang="ts">
import { ref, useTemplateRef, watch } from "vue";
import { useRoute } from "vitepress";
import TableOfContents from "../components/TableOfContents.vue";
import SidebarNav from "../components/SidebarNav.vue";
import Toolbar from "../components/Toolbar.vue";
import Prose from "../components/Prose.vue";
import DictionaryIndex from "@/components/DictionaryIndex.vue";
import { useI18n } from "@/composables/i18n";
import { useNav } from "@/composables/nav";
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

const tocRef = useTemplateRef("toc");
</script>

<template>
  <div class="min-h-screen flex flex-col bg-muted dark:bg-default">
    <div class="lg:hidden print:hidden border-b sticky top-0 z-10 sheet">
      <Prose>
        <Toolbar class="h-16! -ml-1.5">
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
                  class="absolute -right-12.5 top-4 shadow-sm border border-default bg-default"
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
            {{ (nav.section ?? nav.module ?? nav.home)?.text }}
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
                  class="absolute -left-12.5 top-4 shadow-sm border border-default bg-default"
                />
                <TableOfContents class="text-sm!" />
              </template>
            </USlideover>
            <SearchButton />
          </template>
        </Toolbar>
      </Prose>
    </div>
    <Prose class="hidden lg:block mt-16 z-20 print:hidden">
      <Toolbar class="-mx-1.5">
        <template #leading>
          <Home />
        </template>
        <template #trailing>
          <SearchButton />
          <LocaleSwitch />
        </template>
      </Toolbar>
    </Prose>

    <div
      class="grid md:mt-16 lg:mt-5.5 lg:mx-2 print:m-0 gap-4 grid-cols-1 lg:grid-cols-[1fr_auto_1fr] print:block"
    >
      <aside>
        <SidebarNav class="ml-auto">
          <DictionaryIndex
            v-if="nav.section?.path === 'dictionary'"
            mode="sidebar"
          />
        </SidebarNav>
      </aside>
      <main class="print:py-px sheet md:border">
        <article>
          <div class="hidden print:block">
            <div class="-ml-1.5 mb-16">
              <Home />
            </div>
          </div>
          <Content />
        </article>
      </main>
      <aside>
        <TableOfContents ref="toc" compact />
      </aside>
    </div>

    <Prose class="hidden md:block print:hidden mt-auto">
      <Footer class="mt-16 mb-4" />
    </Prose>
  </div>
</template>

<style lang="css" scoped>
@reference "@/theme/styles/index.css";

main {
  @apply mx-auto w-full md:w-[calc(65ch+var(--spacing)*32)] print:w-full print:px-[0.75in];

  article {
    @apply my-20;
  }
}

:deep(article > div > div > :not(.breakout)) {
  @apply mx-6 sm:mx-12 md:mx-16 print:mx-0;
}

:deep(.breakout) {
  @apply print:max-w-none print:-mx-[0.75in] print:px-[0.75in];
}

aside {
  @apply hidden lg:block;

  > * {
    @apply sticky top-0 py-4 my-16 max-h-screen max-w-64 overflow-y-auto;

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

.sheet {
  @apply shadow-sm border-default bg-default dark:bg-[#1e1e1e] print:shadow-none print:border-none;
}
</style>

<style lang="css">
@reference "@/theme/styles/index.css";

@page {
  margin: 1in 0;
}

@page :first {
  margin-top: 0;
}

@page :left {
  @bottom-left {
    content: counter(page);
    @apply text-xs text-dimmed mx-[0.75in];
  }
}

@page :right {
  @bottom-right {
    content: counter(page);
    @apply text-xs text-dimmed mx-[0.75in];
  }
}

aside,
button,
[role="button"],
.header-anchor {
  @apply print:hidden!;
}
</style>
