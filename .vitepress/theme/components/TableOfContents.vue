<script setup lang="ts">
import { ref, watch, onMounted, useTemplateRef } from "vue";
import { onContentUpdated } from "vitepress";
import { useElementIdObserver } from "@/composables/elementIdObserver";

const props = defineProps<{
  compact?: boolean;
}>();

interface HeaderElement {
  id: string;
  text: string;
  level: number;
  numbering?: string;
}

const headers = ref<HeaderElement[]>([]);
const { observingId, observer } = useElementIdObserver();
const links = useTemplateRef<HTMLAnchorElement[]>("links");

watch(observingId, (id) => {
  const link = links.value?.find((el) => el.hash === `#${id}`);
  link?.scrollIntoView({ block: "nearest" });
});

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
      text: h.dataset.tocText ?? h.textContent,
      id: h.id,
      numbering: h.dataset.numbering,
    });
    observer.value?.observe(el);
  });
};

onMounted(observeHeaders);

onContentUpdated(observeHeaders);

function calculateIndent(level: number) {
  switch (level) {
    case 3:
      return props.compact ? "ml-3" : "ml-4";
    case 4:
      return props.compact ? "ml-6" : "ml-8";
    default:
      return "";
  }
}
</script>

<template>
  <nav
    class="navlinks flex flex-col"
    :class="[compact ? 'text-xs' : 'text-sm']"
  >
    <a
      v-for="h in headers"
      ref="links"
      :key="h.id"
      :href="`#${h.id}`"
      :class="{ active: observingId === h.id }"
    >
      <span :data-numbering="h.numbering" :class="[calculateIndent(h.level)]">
        {{ h.text }}
      </span>
    </a>
  </nav>
</template>
