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
  <p :id="word.id" class="pl-3 -indent-3 my-0 leading-0">
    <h5 class="inline">
      {{ word.headword }}
    </h5>

    {{ " " }}
    <span v-if="word.tags?.length" class="text-xs text-toned italic">
      {{ word.tags.map((t) => t[lang]).join(" ") }}
    </span>

    <template v-for="(d, i) in word.definitions">
      <span class="ws">{{ " " }}</span>
      <span v-if="word.definitions.length > 1" class="text-sm">
        {{ `${i + 1}.` }}&nbsp;</span
      >
      <span class="text-base leading-tight">{{ d.translation[lang] }}</span>

      <span v-for="e in d.examples ?? []" class="text-sm">
        <span class="ws">{{ " " }}</span>
        •&nbsp;<strong>{{ e.text }}</strong>
        <span v-if="e.translation?.[lang]">
          {{ " " }}
          <template v-if="!/[.!?]$/.test(e.text)">–&nbsp;</template
          >{{ e.translation[lang] }}
        </span>
      </span>
    </template>

    <span class="text-xs text-toned leading-normal">
      <span v-if="word.forms?.length">
        <span class="ws">{{ " " }}</span>
        …&nbsp;<em>
          {{ word.forms.join(", ") }}
        </em>
      </span>
      <span v-if="word.variants?.length">
        <span class="ws">{{ " " }}</span>
        =&nbsp;<em>{{ word.variants.join(", ") }}</em>
      </span>
      <span v-if="word.derived_from?.length">
        <span class="ws">{{ " " }}</span>
        «&nbsp;<span v-for="(w, i) in word.derived_from">
          <a :href="w.link"><em>{{ w.headword }}</em></a>{{ i < word.derived_from.length - 1 ? ", " : "" }}
        </span>
      </span>
      <span v-if="word.see_also?.length">
        <span class="ws">{{ " " }}</span>
        +&nbsp;<span v-for="(w, i) in word.see_also">
          <a :href="w.link"><em>{{ w.headword }}</em></a>{{
            i < word.see_also.length - 1 ? ", " : "" }}
        </span>
      </span>
    </span>
  </p>
</template>

<style scoped>
@reference "@/theme/styles/index.css";

.ws {
  @apply font-normal! ml-1;
}
</style>
