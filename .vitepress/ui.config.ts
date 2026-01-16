import type { NuxtUIOptions } from "@nuxt/ui/unplugin";

export default <NuxtUIOptions>{
  colors: {
    primary: 'blue',
    neutral: 'neutral',
  },
  button: {
    slots: {
      base: 'cursor-pointer rounded-full',
      leadingIcon: 'text-highlighted',
    },
    defaultVariants: {
      color: 'neutral',
      variant: 'ghost',
    },
  },
  tooltip: {
    slots: {
      content: 'print:hidden data-[state=instant-open]:animate-[scale-in_100ms_ease-out] rounded-none ring-0 border border-accented/50'
    },
  },
};
