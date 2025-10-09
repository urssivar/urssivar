export default defineAppConfig({
    ui: {
        colors: {
            primary: 'blue',
            neutral: 'gray',
        },
        tooltip: {
            slots: {
                content: 'data-[state=instant-open]:animate-[scale-in_100ms_ease-out]'
            }
        },
        link: {
            base: 'focus-visible:outline-primary',
            variants: {
                active: {
                    false: 'text-primary underline decoration-inherit',
                    true: 'text-muted'
                },
            },
        }
    },
    colorMode: {
        preference: 'system'
    }
});
