<script setup lang="ts">
import NavBar from "./NavBar.vue";
import { useI18n } from "@/composables/i18n";

const { t } = useI18n();
</script>

<template>
  <NavBar class="text-xs print:hidden">
    <div class="navlinks flex items-center gap-2">
      <a :href="t('footer.licenseUrl')">
        {{ t("footer.license") }}
      </a>
      <span class="select-none">·</span>
      <a :href="t('footer.contactEmail')">
        {{ t("footer.contact") }}
      </a>
    </div>
  </NavBar>
</template>
