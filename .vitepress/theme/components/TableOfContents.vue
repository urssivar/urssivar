<script setup lang="ts">
import { ref, onMounted } from "vue";
import { onContentUpdated } from "vitepress";
import { useElementIdObserver } from "@/composables/elementIdObserver";

interface HeaderElement {
  id: string;
  text: string;
  level: number;
  numbering: string | null;
}

const headers = ref<HeaderElement[]>([]);
const { observingId, observer } = useElementIdObserver();

const observeHeaders = () => {
  observer.value?.disconnect();
  const elements = document.querySelectorAll(
    "article :is(h1, h2, h3, h4, h5, h6)[id]"
  );

  headers.value = [];
  elements.forEach((el) => {
    const h = el.cloneNode(true) as HTMLElement;
    h.querySelector(".header-anchor")?.remove();

    headers.value.push({
      level: parseInt(h.tagName[1]),
      text: h.textContent,
      id: h.id,
      numbering: h.getAttribute("data-numbering"),
    });
    observer.value?.observe(el);
  });
};

onMounted(observeHeaders);

onContentUpdated(observeHeaders);
</script>

<template>
  <nav class="navlinks text-xs flex flex-col" data-pagefind-ignore>
    <a
      v-for="h in headers"
      :key="h.id"
      :href="`#${h.id}`"
      :class="{ active: observingId === h.id }"
    >
      <span
        :data-numbering="h.numbering"
        :class="{
          'ml-3': h.level === 3,
          'ml-6': h.level === 4,
        }"
      >
        {{ h.text }}
      </span>
    </a>
  </nav>
</template>
