<script setup lang="ts">
import NavBar from './NavBar.vue';
import LocaleSwitch from './LocaleSwitch.vue';
import Link from '@/components/Link.vue';
import { computed } from 'vue';
import { useData } from 'vitepress';

const { lang, frontmatter } = useData();

const homeLink = computed(() => {
    return lang.value === 'ru' ? '/ru' : '/';
});

const isLanding = computed(() => {
    return frontmatter.value.landing;
});
</script>

<template>
    <NavBar class="border-b-0">
        <template #leading>
            <Link :to="homeLink" class="flex gap-1.5 items-center text-default decoration-transparent">
            <img src="/favicon-dark.svg" alt="Urssivar logo"
                class="mx-1 size-6 invert-[88%] dark:invert-[12%] select-none pointer-events-none">
            <span v-if="!isLanding" class="font-bold text-lg">
                Urssivar
            </span>
            </Link>
        </template>
        <template #trailing>
            <UButton icon="i-material-symbols:search-rounded" />
            <LocaleSwitch />
        </template>
    </NavBar>
</template>
