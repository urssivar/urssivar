<script setup lang="ts">
import { computed } from "vue";
import { useData, useRouter } from "vitepress";
import { useI18n } from "@/composables/useI18n";

const { lang } = useData();
const router = useRouter();
const { t } = useI18n();

const langLink = computed(() => {
  const path = router.route.path;
  return lang.value === "ru" ? path.replace("/ru", "") : "/ru" + path;
});
</script>

<template>
  <UTooltip :text="t('header.localeSwitch')">
    <a :href="langLink">
      <UButton
        icon="i-material-symbols:translate-rounded"
        :aria-label="t('header.localeSwitch')"
      />
    </a>
  </UTooltip>
</template>
