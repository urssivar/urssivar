<script setup lang="ts">
import Link from '@/components/Link.vue';
import NavBar from './NavBar.vue';
</script>

<template>
    <NavBar class="border-b-0 border-t">
        <template #leading>
            <Link to="https://creativecommons.org/licenses/by/4.0/deed.ru">
            <UButton variant="link" size="sm">
                Лицензия CC BY 4.0
            </UButton>
            </Link>
        </template>
        <template #trailing>
            <Link to="https://t.me/urssivar">
            <UButton variant="link" icon="i-ix:telegram-logo" />
            </Link>
            <Link to="https://youtube.com/@urssivar">
            <UButton variant="link" icon="i-ix:youtube-filled" />
            </Link>
            <Link to="https://github.com/urssivar">
            <UButton variant="link" icon="i-ix:github-logo" />
            </Link>
        </template>
    </NavBar>
</template>
