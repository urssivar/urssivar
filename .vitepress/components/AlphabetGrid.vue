<script setup lang="ts">
import { useDictData, type Letter } from "@/composables/useDictData";
import { cleanHeadword } from "@/utils";
import { onBeforeUnmount, onMounted, reactive, ref } from "vue";

const { letters, dict } = useDictData();

const words = reactive(Object.fromEntries(letters.value.map((l) => [l, "•"])));
const activeLetters = ref(new Set<Letter>());

const timers = new Map<string, ReturnType<typeof setTimeout>>();
let isPaused = false;

function randomWord(l: Letter) {
  const list = dict[l];
  if (!list.length) return;
  const i = Math.floor(Math.random() * list.length);
  words[l] = cleanHeadword(list[i].headword);
}

function scheduleRandomActivation(cycleId: string) {
  if (isPaused) {
    // Reschedule if paused
    const timer = setTimeout(() => scheduleRandomActivation(cycleId), 100);
    timers.set(`${cycleId}-check`, timer);
    return;
  }

  const randomLetter =
    letters.value[Math.floor(Math.random() * letters.value.length)];

  activeLetters.value.add(randomLetter);
  randomWord(randomLetter);

  // Remove after display duration
  const displayTimer = setTimeout(() => {
    activeLetters.value.delete(randomLetter);
  }, 2000 + Math.random() * 1000);

  timers.set(`${cycleId}-display`, displayTimer);

  // Schedule next activation
  const nextTimer = setTimeout(() => {
    scheduleRandomActivation(cycleId);
  }, 1500 + Math.random() * 1000);

  timers.set(cycleId, nextTimer);
}

function pauseAutoHover() {
  isPaused = true;
}

function resumeAutoHover() {
  isPaused = false;
}

function onLetterEnter(l: Letter) {
  pauseAutoHover();
  activeLetters.value.add(l);
  randomWord(l);
}

function onLetterLeave() {
  activeLetters.value.clear();
  resumeAutoHover();
}

onMounted(() => {
  const numCycles = 5;
  for (let i = 0; i < numCycles; i++) {
    const cycleId = `cycle-${i}`;
    const initialDelay = i * 500;
    const timer = setTimeout(
      () => scheduleRandomActivation(cycleId),
      initialDelay
    );
    timers.set(cycleId, timer);
  }
});

onBeforeUnmount(() => {
  timers.forEach((timer) => clearTimeout(timer));
  timers.clear();
});
</script>

<template>
  <div
    lang="xdq"
    class="bg-elevated my-12 px-6 py-4 sm:px-8 sm:py-6 grid grid-cols-5 sm:grid-cols-10 text-center justify-center font-semibold"
  >
    <div
      v-for="l in letters"
      :key="l"
      class="letter p-3 relative cursor-pointer"
      :class="{ current: activeLetters.has(l) }"
      @mouseenter="onLetterEnter(l)"
      @mouseleave="onLetterLeave"
    >
      <span
        class="select-none capitalize text-muted transition-opacity duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] delay-100"
      >
        {{ l }}
      </span>
      <span
        class="leading-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
      >
        {{ words[l] }}
      </span>
    </div>
  </div>
</template>

<style scoped>
@reference "@/theme/style.css";

.letter:hover span:nth-child(1),
.letter.current span:nth-child(1) {
  @apply opacity-0 delay-[0];
}

.letter:hover span:nth-child(2),
.letter.current span:nth-child(2) {
  @apply opacity-100 delay-[100ms];
}
</style>
