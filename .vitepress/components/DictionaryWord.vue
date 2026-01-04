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
  <p :id="word.id" class="pl-3 -indent-3 m-0 leading-0">
    <a
      class="header-anchor mt-px leading-relaxed"
      :href="`#${word.id}`"
      data-pagefind-ignore
    >
      #
    </a>

    <span lang="xdq" class="font-semibold">
      {{ word.headword }}
    </span>

    {{ " " }}
    <span v-if="word.tags?.length" class="text-xs text-toned italic">
      {{ word.tags.map((t) => t[lang]).join(" ") }}
    </span>

    <template v-for="(d, i) in word.definitions">
      <span class="ws">{{ " " }}</span>
      <span v-if="word.definitions.length > 1" class="text-sm">
        {{ `${i + 1}.` }}&nbsp;</span
      >
      <span>{{ d.translation[lang] }}</span>

      <template v-for="e in d.examples ?? []">
        <span class="ws">{{ " " }}</span>
        <span class="text-sm/relaxed text-toned">
          •&nbsp;<span lang="xdq" class="leading-[1.15]">
            {{ e.text }}
          </span>
          {{ /[.!?]$/.test(e.text) ? "" : " – " }}
          {{ e.translation[lang] }}
        </span>
      </template>
    </template>

    <span class="text-sm/relaxed italic">
      <template v-if="word.forms?.length">
        <span class="ws">{{ " " }}</span>
        ...
        <span lang="xdq" class="leading-[1.15]">
          {{ word.forms.join(", ") }}
        </span>
      </template>

      <template v-if="word.variants?.length">
        <span class="ws">{{ " " }}</span>
        //
        <span lang="xdq" class="leading-[1.15]">
          {{ word.variants.join(", ") }}
        </span>
      </template>
    </span>
  </p>
</template>

<style scoped>
@reference "@/theme/styles/index.css";

.ws {
  @apply text-base! font-normal! font-sans! ml-2;
}
</style>
