<script setup lang="ts">
import NavBar from "./NavBar.vue";
import LocaleSwitch from "./LocaleSwitch.vue";
import { useI18n } from "@/composables/useI18n";
import { computed } from "vue";
import { useData } from "vitepress";

const { lang, frontmatter } = useData();
const { t } = useI18n();

const homeLink = computed(() => {
  return lang.value === "ru" ? "/ru" : "/";
});

const isLanding = computed(() => {
  return frontmatter.value.landing;
});
</script>

<template>
  <NavBar>
    <template #leading>
      <UTooltip :text="t('header.home')">
        <a
          :href="homeLink"
          class="flex gap-1.5 items-center text-default decoration-transparent"
          :aria-label="t('header.home')"
        >
          <img
            src="/favicon-dark.svg"
            alt=""
            class="mx-1 size-6 invert-[90%] dark:invert-0 select-none pointer-events-none"
          />
          <span
            v-if="!isLanding"
            aria-hidden="true"
            class="font-bold text-lg text-highlighted"
          >
            Urssivar
          </span>
        </a>
      </UTooltip>
    </template>
    <template #trailing>
      <UTooltip :text="t('header.search')">
        <UButton
          icon="i-material-symbols:search-rounded"
          :aria-label="t('header.search')"
        />
      </UTooltip>
      <LocaleSwitch />
    </template>
  </NavBar>
</template>
