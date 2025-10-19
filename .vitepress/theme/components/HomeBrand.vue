<script setup lang="ts">
import { computed } from 'vue';
import { useData, useRouter } from 'vitepress';
import Link from '@/components/Link.vue';

const { lang } = useData();
const router = useRouter();

const isHome = computed(() => {
  const path = router.route.path;
  return path === '/' || path === '/ru';
});

const homeLink = computed(() => {
  return lang.value === 'ru' ? '/ru' : '/';
});
</script>

<template>
  <Link :to="homeLink" class="flex gap-1.5 items-center text-default decoration-transparent">
  <img src="/favicon-dark.svg" alt="Urssivar logo"
    class="mx-1 size-6 invert-[88%] dark:invert-[12%] select-none pointer-events-none">
  <span v-if="!isHome" class="font-bold text-lg">
    Urssivar
  </span>
  </Link>
</template>
