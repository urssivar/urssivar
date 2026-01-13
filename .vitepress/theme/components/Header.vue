<script setup lang="ts">
import NavBar from "./NavBar.vue";
import LocaleSwitch from "./LocaleSwitch.vue";
import SearchButton from "./SearchButton.vue";
import { useI18n } from "@/composables/i18n";
import { computed, ref } from "vue";
import { useNav } from "@/composables/nav";

const { t, buildPath } = useI18n();

const homeLink = computed(() => {
  return buildPath("/");
});

const nav = useNav();

const isHome = computed(() => {
  return nav.article == nav.home;
});

const tooltipOpen = ref(false);
</script>

<template>
  <NavBar>
    <template #leading>
      <a
        :href="homeLink"
        class="flex gap-1 items-center text-default decoration-transparent select-none group"
        :aria-label="t('header.home')"
        @mouseover="tooltipOpen = true"
        @mouseleave="tooltipOpen = false"
      >
        <UTooltip :text="t('header.home')" v-model:open="tooltipOpen">
          <div class="transition group-hover:bg-accented/75 rounded-full py-1">
            <img
              src="/favicon-dark.svg"
              alt=""
              class="mx-1 size-6 invert-90 dark:invert-0"
            />
          </div>
        </UTooltip>
        <span
          v-if="!isHome"
          aria-hidden="true"
          class="font-bold text-lg text-highlighted"
        >
          Urssivar
        </span>
      </a>
    </template>
    <template #trailing>
      <SearchButton />
      <LocaleSwitch />
    </template>
  </NavBar>
</template>
