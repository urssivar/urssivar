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
  <div class="my-6">
    <a
      class="header-anchor font-medium"
      :href="`#${word.id}`"
      data-pagefind-ignore
    >
      §
    </a>
    <div class="pl-3 -indent-3 m-0 my-1">
      <h2
        :id="word.id"
        :data-toc-text="cleanHeadword(word.headword)"
        lang="xdq"
        class="font-semibold inline text-xl"
      >
        {{ word.headword }}
      </h2>

      {{ " " }}
      <span v-if="word.tags?.length" class="text-xs text-toned italic">
        {{ word.tags.map((t) => t[lang]).join(" ") }}
      </span>

      <span v-if="word.forms?.length" class="text-sm pl-2">
        …&nbsp;<span lang="xdq" class="italic">
          {{ word.forms.join(", ") }}
        </span>
      </span>
    </div>

    <ol
      class="m-0 ml-5"
      :class="{
        'p-0': word.definitions.length == 1,
      }"
    >
      <li v-for="d in word.definitions" class="leading-normal my-1">
        <p>
          {{ d.translation[lang]
          }}<span v-if="d.aliases?.[lang]?.length" class="sr-only">
            &nbsp;+&nbsp;{{ d.aliases[lang]!.join(", ") }} </span
          ><template v-if="d.note?.[lang]"
            >;
            <span
              v-if="d.note?.[lang]"
              class="text-default text-sm"
              v-html="md.renderInline(d.note[lang]!)"
            />
          </template>
        </p>
        <ul class="text-sm text-default m-0" v-if="d.examples?.length">
          <li v-for="e in d.examples" class="my-1">
            <span lang="xdq">{{ e.text }}</span>
            <template v-if="e.translation?.[lang]">
              —&nbsp;{{ e.translation[lang] }}
            </template>
          </li>
        </ul>
      </li>
    </ol>

    <p
      v-if="word.etymology?.[lang]"
      class="text-default text-sm my-2!"
      v-html="md.renderInline(word.etymology[lang]!)"
    />
    <p
      v-if="word.note?.[lang]"
      class="text-default text-sm my-2!"
      v-html="md.renderInline(word.note[lang]!)"
    />

    <p class="text-xs text-default -indent-2 my-2!">
      <span v-if="word.variants?.length" class="ml-2">
        ~&nbsp;<span lang="xdq" class="italic">
          {{ word.variants.join(", ") }}
        </span>
      </span>
      <span v-if="word.derived_from?.length" class="ml-2">
        «&nbsp;<span
          v-for="(w, i) in word.derived_from"
          lang="xdq"
          class="italic"
        >
          <a :href="w.link"> {{ w.headword }} </a
          >{{ i < word.derived_from.length - 1 ? ", " : "" }}
        </span>
      </span>
      <span v-if="word.see_also?.length" class="ml-2">
        »&nbsp;<span v-for="(w, i) in word.see_also" lang="xdq" class="italic">
          <a :href="w.link"> {{ w.headword }} </a
          >{{ i < word.see_also.length - 1 ? ", " : "" }}
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

p {
  @apply m-0 leading-tight;
}

span {
  @apply leading-0!;
}

a {
  @apply decoration-[0.75px] hover:text-highlighted;
}
</style>
