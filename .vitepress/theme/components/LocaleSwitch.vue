<script setup lang="ts">
import { computed } from 'vue';
import { useData, useRouter } from 'vitepress';
import Link from '@/components/Link.vue';
import { useI18n } from '@/composables/useI18n';

const { lang } = useData();
const router = useRouter();
const { t } = useI18n();

const langLink = computed(() => {
  const path = router.route.path;
  console.log(lang.value, path);
  // TODO: doesn't detect RU lang on home
  // it's likely due to moving the ru.md file to root via rewrites
  // need to solve together with Vitepress rewrites & LocaleConfig
  // and normalize the .md links too
  return lang.value === 'ru'
    ? path.replace('/ru', '')
    : '/ru' + path;
});
</script>

<template>
  <UTooltip :text="t('header.localeSwitch')">
    <Link :to="langLink">
    <UButton icon="i-material-symbols:translate-rounded" :aria-label="t('header.localeSwitch')" />
    </Link>
  </UTooltip>
</template>
