<script setup lang="ts">
import { useI18n } from "@/composables/i18n";

const { t, baseUrl } = useI18n();
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 my-16 mx-6">
    <h5>{{ t("notFound.title") }}</h5>
    <a :href="baseUrl">
      <UButton class="btn-outer">
        {{ t("notFound.home") }}
      </UButton>
    </a>
  </div>
</template>
