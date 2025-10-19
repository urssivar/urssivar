<script setup lang="ts">
import NavBar from './NavBar.vue';
import LocaleSwitch from './LocaleSwitch.vue';
import HomeBrand from './HomeBrand.vue';
</script>

<template>
    <NavBar>
        <template #leading>
            <HomeBrand />
        </template>
        <template #trailing>
            <UButton icon="i-material-symbols:search-rounded" />
            <LocaleSwitch />
        </template>
    </NavBar>
</template>
