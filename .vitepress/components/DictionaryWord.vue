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
    <a class="header-anchor mt-px leading-relaxed" :href="`#${word.id}`">#</a>
    <span lang="xdq" class="font-semibold leading-0">
      {{ word.headword }}
    </span>
    {{ " " }}
    <span class="text-xs text-toned italic">
      {{ word.tags[lang].join(" ") }}
    </span>
    {{ " " }}
    {{ word.definitions[lang].map((w) => w + ";").join(" ") }}
    <span lang="xdq" class="text-base gloss font-medium">
      <span v-if="word.forms?.length"> ... {{ word.forms.join(", ") }} </span>
      <span v-if="word.variants?.length" class="italic">
        <br />
        // {{ word.variants.join(", ") }}
      </span>
    </span>
  </p>
</template>
