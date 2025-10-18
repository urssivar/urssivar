import { onContentUpdated } from 'vitepress';

export function useHeaderClicks() {
    const addHeaderListeners = () => {
        document.querySelectorAll(':is(h2, h3, h4)[id]')
            .forEach(anchor => {
                anchor.removeEventListener('click', handler);
                anchor.addEventListener('click', handler);
            });
    };

    const handler = (e: Event) => {
        const header = e.target as HTMLElement | null;
        const mouseEvent = e as MouseEvent;
        if (!header || mouseEvent.offsetX > 0) return;

        // header.scrollIntoView({ behavior: 'smooth' });
        window.location.hash = header.id;
    };

    onContentUpdated(addHeaderListeners);
}
