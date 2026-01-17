<script setup lang="ts">
import { ref, watch, onMounted, useTemplateRef, computed } from "vue";
import { onContentUpdated } from "vitepress";
import { useScrollSpy } from "@/composables/elementIdObserver";

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
const isVisible = computed(() => {
  return headers.value.length > 1;
});
defineExpose({ isVisible });

const { activeId, observer, isInZone } = useScrollSpy();
const links = useTemplateRef<HTMLAnchorElement[]>("links");

watch(
  activeId,
  (id) => {
    const link = links.value?.find((el) => el.hash === `#${id}`);
    link?.scrollIntoView({ block: "nearest" });
  },
  { flush: "post" },
);

function init() {
  observer.value?.disconnect();
  const elements = document.querySelectorAll(
    "article :is(h1, h2, h3, h4, h5, h6)[id]",
  );

  headers.value = [];
  activeId.value = "";
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

    if (!activeId.value || isInZone(el)) {
      activeId.value = h.id;
    }
  });
}

onMounted(init);
onContentUpdated(init);

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
    v-if="isVisible"
    class="navlinks flex flex-col"
    :class="[compact ? 'text-xs' : 'text-sm']"
  >
    <a
      v-for="h in headers"
      ref="links"
      :key="h.id"
      :href="`#${h.id}`"
      :class="{ active: activeId === h.id }"
    >
      <span
        class="block"
        :data-numbering="h.numbering"
        :class="[calculateIndent(h.level)]"
      >
        {{ h.text }}
      </span>
    </a>
  </nav>
</template>
