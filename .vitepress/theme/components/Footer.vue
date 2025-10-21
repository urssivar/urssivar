<script setup lang="ts">
import Link from '@/components/Link.vue';
import NavBar from './NavBar.vue';
import { useI18n } from '@/composables/useI18n';

const { t } = useI18n();
</script>

<template>
    <NavBar class="border-b-0 navlinks text-xs">
        <Link :to="t('footer.licenseUrl')">
        {{ t('footer.license') }}
        </Link>
        <span class="select-none">·</span>
        <Link :to="t('footer.contactEmail')">
        {{ t('footer.contact') }}
        </Link>

        <!-- Social icons commented out - moved to Updates section
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
        -->
    </NavBar>
</template>
