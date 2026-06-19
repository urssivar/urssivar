<script setup lang="ts">
import type { Word } from "@/composables/dictionary";
import type { Lang } from "@/composables/i18n";
import { useData } from "vitepress";
import { computed } from "vue";
import { renderInline } from "@/markdown";

const { word } = defineProps<{
  word: Word;
}>();

const data = useData();

const lang = computed(() => {
  return data.lang.value as Lang;
});

const relations = computed(() =>
  [
    {
      prefix: "…",
      words: word.forms?.map((headword) => ({ headword, link: undefined })),
    },
    { prefix: "«", words: word.derived_from },
    {
      prefix: "=",
      words: word.variants?.map((headword) => ({ headword, link: undefined })),
    },
    { prefix: "+", words: word.see_also },
  ].filter((rel) => rel.words?.length),
);
const notes = computed(() =>
  [word.note?.[lang.value], word.etymology?.[lang.value]].filter(Boolean),
);
</script>

<template>
  <p :id="word.id" class="pl-3 -indent-3 my-0 leading-0">
    <h5 class="inline">{{ word.headword }}</h5>
    {{ " " }}
    <span v-if="word.tags?.length" class="text-xs text-toned italic">
      {{ word.tags.map((t) => t[lang]).join(" ") }}
    </span>

    <template v-for="(d, i) in word.definitions" :key="i">
      <span class="ws">{{ " " }}</span>
      <span v-if="word.definitions.length > 1" class="text-sm"
        >{{ i + 1 }}.&nbsp;</span
      >
      <span class="text-base leading-tight">{{ d.translation[lang] }}</span>
      <template v-if="d.note?.[lang]"
        >;
        <span
          class="text-sm text-toned"
          v-html="renderInline(d.note[lang]!)"
        />
      </template>

      <span v-for="(e, j) in d.examples ?? []" :key="j" class="text-sm">
        <span class="ws">{{ " " }}</span>
        •&nbsp;<strong>{{ e.text }}</strong>
        <span v-if="e.translation?.[lang]">
          {{ " " }}
          <template v-if="!/[.!?]$/.test(e.text)">—&nbsp;</template
          >{{ e.translation[lang] }}
        </span>
      </span>
    </template>

    <span class="text-xs text-toned italic leading-normal">
      <span v-for="rel in relations" :key="rel.prefix">
        <span class="ws">{{ " " }}</span>
        {{ rel.prefix }}&nbsp;<span v-for="(w, i) in rel.words" :key="w.headword">
          <a v-if="w.link" :href="w.link">{{ w.headword }}</a
          ><span v-else>{{ w.headword }}</span
          >{{ i < rel.words!.length - 1 ? ", " : "" }}
        </span>
      </span>
    </span>
    
    <span
      v-for="(html, i) in notes"
      :key="i"
      class="text-sm text-toned"
    >
      <span class="ws">{{ " " }}</span>
      <span v-html="renderInline(html!)" />
    </span>
  </p>
</template>

<style scoped>
@reference "@/theme/styles/index.css";

.ws {
  @apply font-normal! ml-1.5;
}

a {
  @apply decoration-[0.75px] hover:text-highlighted;
}
</style>
