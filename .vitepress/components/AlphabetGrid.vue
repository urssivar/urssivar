<script setup lang="ts">
import { useDictData, type Letter } from "@/composables/useDictData";
import { cleanHeadword } from "@/utils";
import { reactive } from "vue";

const { letters, dict } = useDictData();

const words = reactive(Object.fromEntries(letters.value.map((l) => [l, "•"])));

function randomWord(l: Letter) {
  const list = dict[l];
  if (!list.length) return;
  const i = Math.floor(Math.random() * list.length);
  words[l] = cleanHeadword(list[i].headword);
}
</script>

<template>
  <div
    lang="xdq"
    class="bg-elevated p-4 grid grid-cols-5 sm:grid-cols-10 text-center justify-center"
  >
    <div
      v-for="l in letters"
      :key="l"
      class="letter p-2 relative"
      @mouseenter="randomWord(l)"
    >
      <span class="select-none capitalize transition">
        {{ l }}
      </span>
      <span
        class="text-lg font-semibold leading-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-xs opacity-0 transition"
      >
        {{ words[l] }}
      </span>
    </div>
  </div>
</template>

<style scoped>
@reference "@/theme/style.css";

.letter:hover {
  span:nth-child(1) {
    @apply blur-xs opacity-0;
  }
  span:nth-child(2) {
    @apply blur-none opacity-100;
  }
}
</style>
