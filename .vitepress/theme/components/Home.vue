<script setup lang="ts">
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
  <a
    :href="baseUrl"
    class="flex gap-1 items-center text-default decoration-transparent select-none group"
    :aria-label="t('header.home')"
    @mouseover="tooltipOpen = true"
    @mouseleave="tooltipOpen = false"
  >
    <UTooltip :text="t('header.home')" v-model:open="tooltipOpen">
      <div class="relative">
        <div
          class="absolute -translate-0.5 size-[calc(100%+var(--spacing)*1)] transition-colors group-hover:bg-accented/50 group-active:bg-accented/50 rounded-full"
        />
        <img
          src="/favicon-dark.svg"
          alt=""
          class="m-1 size-6 invert-90 dark:invert-0"
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
