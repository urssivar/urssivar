import { onContentUpdated } from 'vitepress';

export function useHeaderClicks() {
    const addHeaderListeners = () => {
        document.querySelectorAll(':is(h1, h2, h3, h4, h5, h6)[id]')
            .forEach(header => {
                header.removeEventListener('click', handler);
                header.addEventListener('click', handler);
            });
    };

    const handler = (e: Event) => {
        const target = e.target as HTMLElement | null;
        if (!target || target.tagName === 'A') return;

        target.scrollIntoView({ behavior: 'smooth' });
        window.location.hash = target.id;
    };

    onContentUpdated(addHeaderListeners);
}
