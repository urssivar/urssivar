<script setup lang="ts">
import SearchModal from "./SearchModal.vue";
import { useI18n } from "@/composables/i18n";

const { t } = useI18n();

const overlay = useOverlay();
const modal = overlay.create(SearchModal);

defineShortcuts({
  meta_k: modal.open,
});
</script>

<template>
  <UTooltip :text="t('header.search')" :kbds="['meta', 'K']">
    <UButton
      icon="i-material-symbols:search-rounded"
      :aria-label="t('header.search')"
      @click="modal.open"
    />
  </UTooltip>
</template>
