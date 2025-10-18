import { onBeforeMount, onUnmounted, ref } from 'vue';

export function useElementIdObserver() {
    const observingId = ref('');
    const observer = ref<IntersectionObserver>();

    onBeforeMount(() => {
        observer.value = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        observingId.value = entry.target.id;
                    }
                });
            },
            { rootMargin: '0px 0px -70% 0px' }
        );
    });

    onUnmounted(() => observer.value?.disconnect());

    return { observingId, observer };
}
