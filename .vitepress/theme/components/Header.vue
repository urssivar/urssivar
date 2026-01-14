<script setup lang="ts">
import NavBar from "./NavBar.vue";
import LocaleSwitch from "./LocaleSwitch.vue";
import SearchButton from "./SearchButton.vue";
import { useI18n } from "@/composables/i18n";
import { computed, ref } from "vue";
import { useNav } from "@/composables/nav";

const { t, baseUrl } = useI18n();

const nav = useNav();

const isHome = computed(() => {
  return nav.article?.url == baseUrl.value;
});

const tooltipOpen = ref(false);
</script>

<template>
  <NavBar>
    <template #leading>
      <a
        :href="baseUrl"
        class="flex gap-1 items-center text-default decoration-transparent select-none group"
        :aria-label="t('header.home')"
        @mouseover="tooltipOpen = true"
        @mouseleave="tooltipOpen = false"
      >
        <UTooltip :text="t('header.home')" v-model:open="tooltipOpen">
          <div
            class="transition group-hover:bg-accented/50 group-active:bg-accented/50 rounded-full py-1"
          >
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
