<script setup lang="ts">
import { ref, onMounted } from "vue";
import { onContentUpdated } from "vitepress";
import { useElementIdObserver } from "@/composables/useElementIdObserver";

interface HeaderElement {
  id: string;
  text: string;
  level: number;
  number?: string;
}

const headers = ref<HeaderElement[]>([]);
const { observingId, observer } = useElementIdObserver();

const observeHeaders = () => {
  observer.value?.disconnect();
  const elements = document.querySelectorAll("article :is(h1, h2, h3, h4)[id]");
  const counters = { h2: 0, h3: 0, h4: 0 };

  headers.value = [];
  elements.forEach((el) => {
    const level = parseInt(el.tagName[1]);
    let numbering = [] as number[];

    if (el.hasAttribute("data-numbered")) {
      if (level === 2) {
        counters.h2++;
        counters.h3 = 0;
        counters.h4 = 0;
        numbering = [counters.h2];
      } else if (level === 3) {
        counters.h3++;
        counters.h4 = 0;
        numbering = [counters.h2, counters.h3];
      } else if (level === 4) {
        counters.h4++;
        numbering = [counters.h2, counters.h3, counters.h4];
      }
    }

    headers.value.push({
      level,
      text: el.textContent || "",
      id: el.id,
      number: numbering.join("."),
    });
    observer.value?.observe(el);
  });
};

onMounted(observeHeaders);

onContentUpdated(observeHeaders);
</script>

<template>
  <nav class="navlinks text-xs flex flex-col">
    <a
      v-for="h in headers"
      :key="h.id"
      :href="`#${h.id}`"
      :class="{ 'text-highlighted': observingId === h.id }"
    >
      <div
        :class="{
          'ml-3': h.level === 3,
          'ml-6': h.level === 4,
        }"
      >
        <span v-if="h.number" class="select-none mr-[0.5em]">{{
          h.number
        }}</span
        >{{ h.text }}
      </div>
    </a>
  </nav>
</template>
