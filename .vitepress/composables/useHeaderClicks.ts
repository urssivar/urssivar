import { onContentUpdated } from 'vitepress';

export function useHeaderClicks() {
    const addHeaderListeners = () => {
        document.querySelectorAll(':is(h2, h3, h4)[id]::before')
            .forEach(anchor => {
                anchor.removeEventListener('click', handler);
                anchor.addEventListener('click', handler);
            });
    };

    const handler = (e: Event) => {
        const target = e.target as HTMLElement;
        const header = target?.closest(':is(h2, h3, h4)');
        if (!header) return;

        const mouseEvent = e as MouseEvent;
        console.log(mouseEvent.offsetX);
        if (mouseEvent.offsetX > 0) return;

        header.scrollIntoView({ behavior: 'smooth' });
        window.location.hash = header.id;
    };

    onContentUpdated(addHeaderListeners);
}
