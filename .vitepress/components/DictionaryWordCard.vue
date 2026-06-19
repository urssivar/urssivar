<script setup lang="ts">
import type { Word } from "@/composables/dictionary";
import type { Lang } from "@/composables/i18n";
import { useData } from "vitepress";
import { computed } from "vue";
import { cleanHeadword } from "@/utils";
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
    { prefix: "«", words: word.derived_from },
    { prefix: "+", words: word.see_also },
  ].filter((rel) => rel.words?.length),
);

const notes = computed(() =>
  [word.note?.[lang.value], word.etymology?.[lang.value]].filter(Boolean),
);
</script>

<template>
  <div class="my-6">
    <a class="header-anchor" :href="`#${word.id}`" data-pagefind-ignore> § </a>
    <div class="pl-3 -indent-3 m-0 my-1">
      <h5
        :id="word.id"
        :data-toc-text="cleanHeadword(word.headword)"
        class="inline"
      >
        {{ word.headword }}
      </h5>
      {{ " " }}
      <span v-if="word.tags?.length" class="text-xs text-toned italic pl-0.5">
        {{ word.tags.map((t) => t[lang]).join(" ") }}
      </span>
      <span v-if="word.forms?.length" class="text-sm text-toned pl-2 italic">
        …&nbsp;{{ word.forms.join(", ") }}
      </span>
    </div>

    <ol
      class="ml-5"
      :class="{
        'p-0': word.definitions.length == 1,
      }"
    >
      <li v-for="(d, i) in word.definitions" :key="i">
        <p>
          <span>{{ d.translation[lang] }}</span>
          <span v-if="d.aliases?.[lang]?.length" class="sr-only">
            &nbsp;+&nbsp;{{ d.aliases[lang]!.join(", ") }}
          </span>
          <template v-if="d.note?.[lang]"
            >;
            <span
              class="text-sm text-toned"
              v-html="renderInline(d.note[lang]!)"
            />
          </template>
        </p>
        <ul v-if="d.examples?.length" class="text-sm">
          <li v-for="(e, j) in d.examples" :key="j">
            <strong>{{ e.text }}</strong>
            <span v-if="e.translation?.[lang]" class="gloss">
              —&nbsp;{{ e.translation[lang] }}
            </span>
          </li>
        </ul>
      </li>
    </ol>

    <p
      v-for="(html, i) in notes"
      :key="i"
      class="text-sm text-toned my-2!"
      v-html="renderInline(html!)"
    />

    <p class="text-xs text-toned italic -indent-2 my-2!">
      <span v-if="word.variants?.length" class="ml-2">
        =&nbsp;{{ word.variants.join(", ") }}
      </span>
      <span v-for="rel in relations" :key="rel.prefix" class="ml-2">
        {{ rel.prefix }}&nbsp;<span v-for="(w, i) in rel.words" :key="w.link">
          <a :href="w.link"> {{ w.headword }} </a
          >{{ i < rel.words!.length - 1 ? ", " : "" }}
        </span>
      </span>
    </p>
  </div>
</template>

<style scoped>
@reference "@/theme/styles/index.css";

ol > li:only-child::marker {
  @apply text-transparent;
}

ol > li::marker {
  @apply text-sm;
}

ul > li::marker {
  @apply text-xs;
}

li {
  @apply my-1;
}

p {
  @apply m-0 leading-tight;
}

a {
  @apply decoration-[0.75px] hover:text-highlighted;
}
</style>
