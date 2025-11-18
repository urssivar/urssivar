<script setup lang="ts">
import { computed } from "vue";
import { useData } from "vitepress";
import { useI18n } from "@/composables/i18n";
import { dateString } from "@/utils";

const { frontmatter, page } = useData();
const { t, buildPath } = useI18n();

const notesLink = computed(() => {
  const path = page.value.filePath.split("/");
  const anchor = "#" + path[path.length - 1].split(".")[0];
  return buildPath("/notes", anchor);
});
</script>

<template>
  <p v-if="frontmatter.date" class="mt-0">
    <a :href="notesLink">
      {{ t("notes.backToNotes") }}
    </a>
    ·
    {{ dateString(frontmatter.date) }}
  </p>
</template>
