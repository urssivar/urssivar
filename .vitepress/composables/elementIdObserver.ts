import { onBeforeMount, onUnmounted, ref } from "vue";

export function useScrollSpy(threshold = 0.3) {
  const activeId = ref("");
  const observer = ref<IntersectionObserver>();

  const isInZone = (element: Element) => {
    return element.getBoundingClientRect().top <= window.innerHeight * threshold;
  };

  onBeforeMount(() => {
    observer.value = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            activeId.value = entry.target.id;
          }
        });
      },
      { rootMargin: `0px 0px ${(threshold - 1) * 100}% 0px` }
    );
  });

  onUnmounted(() => observer.value?.disconnect());

  return { activeId, observer, isInZone };
}
