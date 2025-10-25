<script setup lang="ts">
import { computed } from 'vue';
import { useData } from 'vitepress';
import { useI18n } from '@/composables/useI18n';
import { dateString } from '@/utils';

const { frontmatter, lang, page } = useData();
const { t } = useI18n();

const notesLink = computed(() => {
    const path = page.value.filePath.split('/');
    return (lang.value === 'ru' ? '/ru' : '')
        + '/notes#'
        + path[path.length - 1].split('.')[0];
});
</script>

<template>
    <p v-if="frontmatter.date" class="">
        <a :href="notesLink">
            {{ t('notes.backToNotes') }}
        </a>
        ·
        {{ dateString(frontmatter.date) }}
    </p>
</template>
