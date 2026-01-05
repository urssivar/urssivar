<script setup lang="ts">
import type { Word } from "@/composables/dictionary";
import type { Lang } from "@/composables/i18n";
import { useData } from "vitepress";
import { computed } from "vue";
import MarkdownIt from "markdown-it";
import { cleanHeadword } from "@/utils";

const md = new MarkdownIt();

const { word } = defineProps<{
  word: Word;
}>();

const data = useData();

const lang = computed(() => {
  return data.lang.value as Lang;
});
</script>

<template>
  <div class="my-4">
    <a class="header-anchor mt-px" :href="`#${word.id}`" data-pagefind-ignore>
      #
    </a>
    <div class="pl-3 -indent-3 m-0">
      <h3
        :id="word.id"
        :data-toc-text="cleanHeadword(word.headword)"
        lang="xdq"
        class="font-semibold inline"
      >
        {{ word.headword }}
      </h3>

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
    </div>

    <ol
      class="m-0 ml-5"
      :class="{
        'p-0': word.definitions.length == 1,
      }"
    >
      <li v-for="d in word.definitions" class="leading-normal">
        {{ d.translation[lang] }}
        <p
          v-if="d.note?.[lang]"
          class="note"
          v-html="md.renderInline(d.note[lang]!)"
        />
        <ul class="text-sm text-default m-0" v-if="d.examples?.length">
          <li v-for="e in d.examples">
            <span lang="xdq">{{ e.text }}</span>
            <template v-if="e.translation?.[lang]">
              <br />
              {{ e.translation[lang] }}
            </template>
          </li>
        </ul>
      </li>
    </ol>

    <p
      v-if="word.etymology?.[lang]"
      class="note"
      v-html="md.renderInline(word.etymology[lang]!)"
    />
    <p
      v-if="word.note?.[lang]"
      class="note"
      v-html="md.renderInline(word.note[lang]!)"
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

.note {
  @apply text-sm pl-2 py-0.5 m-0 my-1 ml-3 bg-linear-to-r from-elevated rounded-sm;
}
</style>
