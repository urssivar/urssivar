<script setup lang="ts">
import type { Word } from "@/composables/dictionary";
import type { Lang } from "@/composables/i18n";
import { useData } from "vitepress";
import { computed } from "vue";
import MarkdownIt from "markdown-it";

const md = new MarkdownIt();

const { word } = defineProps<{
  word: Word;
}>();

const data = useData();

const lang = computed(() => {
  return data.lang.value as Lang;
});

const notes = computed(() => {
  return [word.etymology?.[lang.value], word.note?.[lang.value]].filter(
    (n) => n
  );
});
</script>

<template>
  <div :id="word.id" class="mb-3">
    <a class="header-anchor mt-px" :href="`#${word.id}`" data-pagefind-ignore>
      #
    </a>
    <p class="pl-3 -indent-3 m-0">
      <span lang="xdq" class="font-semibold">
        {{ word.headword }}
      </span>

      {{ " " }}
      <span v-if="word.tags?.length" class="text-xs text-toned italic">
        {{ word.tags.map((t) => t[lang]).join(" ") }}
      </span>

      <span class="text-sm italic">
        <template v-if="word.forms?.length">
          <span class="ws">{{ " " }}</span>
          ...&nbsp;<span lang="xdq">
            {{ word.forms.join(", ") }}
          </span>
        </template>

        <template v-if="word.variants?.length">
          <span class="ws">{{ " " }}</span>
          //&nbsp;<span lang="xdq">
            {{ word.variants.join(", ") }}
          </span>
        </template>
      </span>
    </p>

    <ol
      class="m-0 ml-5"
      :class="{
        'p-0': word.definitions.length == 1,
      }"
    >
      <li v-for="d in word.definitions" class="leading-normal">
        {{ d.translation[lang] }}
        <ul class="text-sm text-default m-0" v-if="d.examples?.length">
          <li v-for="e in d.examples">
            <span lang="xdq">{{ e.text }}</span>
            <br />
            {{ e.translation[lang] }}
          </li>
        </ul>
      </li>
    </ol>

    <p
      v-for="n in notes"
      class="text-sm border-l-2 border-accented pl-2.5 m-0 ml-2 mt-1"
      v-html="md.renderInline(n)"
    />
  </div>
</template>

<style scoped>
@reference "@/theme/styles/index.css";

.ws {
  @apply text-base! font-normal! font-sans! ml-2;
}

ol > li:only-child::marker {
  color: transparent;
}
</style>
