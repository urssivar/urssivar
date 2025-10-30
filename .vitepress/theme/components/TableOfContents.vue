<script setup lang="ts">
import { ref, onMounted } from "vue";
import { onContentUpdated } from "vitepress";
import { useElementIdObserver } from "@/composables/useElementIdObserver";

interface HeaderElement {
  id: string;
  html: string;
  level: number;
}

const headers = ref<HeaderElement[]>([]);
const { observingId, observer } = useElementIdObserver();

const observeHeaders = () => {
  observer.value?.disconnect();
  const elements = document.querySelectorAll("article :is(h1, h2, h3, h4)");

  headers.value = [];
  elements.forEach((el) => {
    if (el.id) {
      headers.value.push({
        level: parseInt(el.tagName[1]),
        html: el.innerHTML,
        id: el.id,
      });
      observer.value?.observe(el);
    }
  });
};

onMounted(observeHeaders);

onContentUpdated(observeHeaders);

const getPadding = (level: number) => {
  switch (level) {
    case 3:
      return "ml-3";
    case 4:
      return "ml-6";
    default:
      return "";
  }
};
</script>

<template>
  <nav class="navlinks text-xs flex flex-col">
    <a
      v-for="h in headers"
      :key="h.id"
      :href="`#${h.id}`"
      :class="{ 'text-highlighted': observingId === h.id }"
    >
      <div :class="getPadding(h.level)" v-html="h.html" />
    </a>
  </nav>
</template>
