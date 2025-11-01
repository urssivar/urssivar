<script setup lang="ts">
import { useDictData, type Letter } from "@/composables/useDictData";
import { cleanHeadword } from "@/utils";
import { reactive, ref } from "vue";
import { useAutoCycle } from "@/composables/useAutoHover";

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
  <div class="bg-elevated my-12 text-center">
    <div
      class="max-w-full md:max-w-screen-md mx-auto px-6 sm:px-8 py-4 sm:py-6 grid grid-cols-6 md:grid-cols-7"
    >
      <div
        v-for="l in letters"
        :key="l"
        class="letter p-3 relative cursor-pointer"
        :class="{ current: selectedLetter === l }"
        @mouseenter="onLetterEnter(l)"
        @mouseleave="onLetterLeave"
      >
        <span
          lang="xdq"
          class="font-semibold select-none capitalize text-muted transition-opacity duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]"
        >
          {{ l }}
        </span>
        <span
          class="text-[0.875rem] pointer-events-none md:text-base leading-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]"
        >
          <span lang="xdq" class="font-semibold leading-none">
            {{ words[l] }}
          </span>
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "@/theme/style.css";

.letter:hover > :nth-child(1),
.letter.current > :nth-child(1) {
  @apply opacity-0 pointer-events-none;
}

.letter:hover > :nth-child(2),
.letter.current > :nth-child(2) {
  @apply opacity-100 pointer-events-auto;
}
</style>
