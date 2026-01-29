<script setup lang="ts">
import { useI18n } from "@/composables/i18n";
import Toolbar from "./Toolbar.vue";

const { t } = useI18n();
</script>

<template>
  <Toolbar>
    <div
      class="text-xs navlinks text-center flex justify-center items-center gap-2"
    >
      <a :href="t('footer.licenseUrl')">
        {{ t("footer.license") }}
      </a>
      <span class="select-none">·</span>
      <a :href="t('footer.contactEmail')">
        {{ t("footer.contact") }}
      </a>
    </div>
  </Toolbar>
</template>
