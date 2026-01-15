<script setup lang="ts">
import { useDictData, type Letter } from "@/composables/dictionary";
import { cleanHeadword } from "@/utils";
import { reactive, ref } from "vue";
import { useAutoCycle } from "@/composables/autoCycle";

const { letters, dict } = useDictData();

const words = reactive(Object.fromEntries(letters.value.map((l) => [l, "•"])));

function setRandomWord(l: Letter) {
  const list = dict[l];
  if (!list.length) return;
  const i = Math.floor(Math.random() * list.length);
  words[l] = cleanHeadword(list[i].headword);
}

const selectedLetter = ref<Letter | null>(null);

const autoHover = useAutoCycle({
  onEnter: () => {
    const i = Math.floor(Math.random() * letters.value.length);
    const letter = letters.value[i];

    selectedLetter.value = letter;
    setRandomWord(letter);
  },
  duration: 2000,
  gap: 0,
  resumeDelay: 1000,
});

function onLetterEnter(l: Letter) {
  autoHover.stop();
  selectedLetter.value = l;
  setRandomWord(l);
}

function onLetterLeave() {
  selectedLetter.value = null;
  autoHover.resume();
}
</script>

<template>
  <div
    class="band text-center grid grid-cols-6 md:grid-cols-7"
    data-pagefind-ignore
  >
    <div
      v-for="l in letters"
      :key="l"
      class="letter p-3 relative cursor-pointer flex justify-center"
      :class="{ current: selectedLetter === l }"
      @mouseenter="onLetterEnter(l)"
      @mouseleave="onLetterLeave"
    >
      <span
        lang="xdq"
        class="select-none capitalize transition-opacity ease-out text-muted"
      >
        {{ l }}
      </span>
      <div
        class="text-sm md:text-base opacity-0 pointer-events-none top-1/2 -translate-y-1/2 absolute transition-opacity duration-200 ease-out text-shadow-xs"
      >
        <span lang="xdq">{{ words[l] }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "@/theme/styles/index.css";

[lang="xdq"] {
  @apply font-semibold;
}

.letter:hover > :nth-child(1),
.letter.current > :nth-child(1) {
  @apply opacity-0 pointer-events-none;
}

.letter:hover > :nth-child(2),
.letter.current > :nth-child(2) {
  @apply opacity-100 pointer-events-auto;
}
</style>
