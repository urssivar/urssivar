<script setup lang="ts">
import type { Word } from "@/composables/dictionary";
import type { Lang } from "@/composables/i18n";
import { useData } from "vitepress";
import { computed } from "vue";

defineProps<{
  word: Word;
}>();

const data = useData();

const lang = computed(() => {
  return data.lang.value as Lang;
});
</script>

<template>
  <p :id="word.id" class="pl-3 -indent-3 m-0 leading-tight text-highlighted">
    <h5 class="inline">
      <span lang="xdq">
        {{ word.headword }}
      </span>
    </h5>

    {{ " " }}
    <span v-if="word.tags?.length" class="text-xs text-toned italic ml-0.5">
      {{ word.tags.map((t) => t[lang]).join(" ") }}
    </span>

    <template v-for="(d, i) in word.definitions">
      <span class="ws">{{ " " }}</span>
      <span v-if="word.definitions.length > 1" class="text-sm">
        {{ `${i + 1}.` }}&nbsp;</span
      >
      <span>{{ d.translation[lang] }}</span>

      <span v-for="e in d.examples ?? []">
        <span class="ws">{{ " " }}</span>
        •&nbsp;<span lang="xdq" class="text-sm">{{ e.text }}</span>
        <span class="gloss text-sm" v-if="e.translation?.[lang]">
          {{ " " }}
          <template v-if="!/[.!?]$/.test(e.text)">–&nbsp;</template
          >{{ e.translation[lang] }}
        </span>
      </span>
    </template>

    <span v-if="word.forms?.length" class="text-xs text-default">
      <span class="ws">{{ " " }}</span>
      …&nbsp;<span lang="xdq" class="italic">
        {{ word.forms.join(", ") }}
      </span>
    </span>
    <span v-if="word.variants?.length" class="text-xs text-default">
      <span class="ws">{{ " " }}</span>
      ~&nbsp;<span lang="xdq" class="italic">
        {{ word.variants.join(", ") }}
      </span>
    </span>
  </p>
</template>

<style scoped>
@reference "@/theme/styles/index.css";

.ws {
  @apply text-base! font-normal! font-sans! ml-2;
}
</style>
