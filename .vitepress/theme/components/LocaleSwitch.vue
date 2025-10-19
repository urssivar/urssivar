<script setup lang="ts">
import { computed } from 'vue';
import { useData, useRouter } from 'vitepress';
import Link from '@/components/Link.vue';

const { lang } = useData();
const router = useRouter();

const langLink = computed(() => {
  const path = router.route.path;
  return lang.value === 'ru'
    ? path.replace('/ru', '')
    : '/ru' + path;
});
</script>

<template>
  <Link :to="langLink">
  <UButton icon="i-material-symbols:translate-rounded" />
  </Link>
</template>
