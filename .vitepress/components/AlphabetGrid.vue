<script setup lang="ts">
import { useDictData, type Letter } from "@/composables/useDictData";
import { cleanHeadword } from "@/utils";
import { onBeforeUnmount, onMounted, reactive, ref } from "vue";

const { letters, dict } = useDictData();

const words = reactive(Object.fromEntries(letters.value.map((l) => [l, "•"])));

function randomWord(l: Letter) {
  const list = dict[l];
  if (!list.length) return;
  const i = Math.floor(Math.random() * list.length);
  words[l] = cleanHeadword(list[i].headword);
}

const selectedLetter = ref<Letter | null>(null);
let autoHoverTimer: ReturnType<typeof setTimeout> | null = null;

function scheduleAutoHover() {
  const DURATION = 2500;

  const i = Math.floor(Math.random() * letters.value.length);
  const letter = letters.value[i];

  selectedLetter.value = letter;
  randomWord(letter);

  autoHoverTimer = setTimeout(scheduleAutoHover, DURATION);
}

function pauseAutoHover() {
  if (autoHoverTimer) {
    clearTimeout(autoHoverTimer);
    autoHoverTimer = null;
  }
}

function onLetterEnter(l: Letter) {
  pauseAutoHover();
  selectedLetter.value = l;
  randomWord(l);
}

function onLetterLeave() {
  const DELAY = 500;
  selectedLetter.value = null;
  autoHoverTimer = setTimeout(scheduleAutoHover, DELAY);
}

onMounted(scheduleAutoHover);
onBeforeUnmount(pauseAutoHover);
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
          class="text-[0.875rem] md:text-base leading-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]"
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
  @apply opacity-0;
}

.letter:hover > :nth-child(2),
.letter.current > :nth-child(2) {
  @apply opacity-100;
}
</style>
