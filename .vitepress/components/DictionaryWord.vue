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

    <span v-for="(d, i) in word.definitions" class="ml-1">
      <span class="font-medium">
        <span v-if="word.definitions.length > 1" class="text-sm">
          {{ ` ${i + 1}. ` }}
        </span>
        {{ d.translation[lang] }}
      </span>

      <template v-for="e in d.examples ?? []">
        {{ " " }}
        <span
          class="border-l-4 border-default rounded-sm bg-elevated text-sm px-1"
        >
          <span lang="xdq">
            {{ e.text }}
          </span>
          {{ " · " }}
          {{ e.translation[lang] }}
        </span>
      </template>
    </span>

    <span class="text-sm text-toned">
      <span v-if="word.forms?.length">
        ...
        <span lang="xdq">
          {{ word.forms.join(", ") }}
        </span>
      </span>
      <span v-if="word.variants?.length">
        //
        <span lang="xdq">
          {{ word.variants.join(", ") }}
        </span>
      </span>
    </span>
  </p>
</template>
