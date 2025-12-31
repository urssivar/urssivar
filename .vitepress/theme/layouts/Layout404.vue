<script setup lang="ts">
import { useI18n } from "@/composables/i18n";
import BaseLayout from "./BaseLayout.vue";

const { t, buildPath } = useI18n();
</script>

<template>
  <BaseLayout>
    <div class="flex flex-col items-center justify-center gap-4">
      <h5>{{ t("notFound.title") }}</h5>
      <a :href="buildPath('/')">
        <UButton>{{ t("notFound.home") }}</UButton>
      </a>
    </div>
  </BaseLayout>
</template>
