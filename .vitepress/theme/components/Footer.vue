<script setup lang="ts">
import Link from '@/components/Link.vue';
import NavBar from './NavBar.vue';
import { useI18n } from '@/composables/useI18n';

const { t } = useI18n();
</script>

<template>
    <NavBar class="border-b-0 border-t">
        <template #leading>
            <Link :to="t('footer.licenseUrl')">
            <UButton variant="link" size="sm">
                {{ t('footer.license') }}
            </UButton>
            </Link>
        </template>
        <template #trailing>
            <Link to="https://t.me/urssivar">
            <UTooltip :text="t('footer.telegram')">
                <UButton variant="link" icon="i-ix:telegram-logo" :aria-label="t('footer.telegram')" />
            </UTooltip>
            </Link>
            <Link to="https://youtube.com/@urssivar">
            <UTooltip :text="t('footer.youtube')">
                <UButton variant="link" icon="i-ix:youtube-filled" :aria-label="t('footer.youtube')" />
            </UTooltip>
            </Link>
            <Link to="https://github.com/urssivar">
            <UTooltip :text="t('footer.github')">
                <UButton variant="link" icon="i-ix:github-logo" :aria-label="t('footer.github')" />
            </UTooltip>
            </Link>
        </template>
    </NavBar>
</template>
