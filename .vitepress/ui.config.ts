import type { NuxtUIOptions } from "@nuxt/ui/unplugin";

export default <NuxtUIOptions>{
  colors: {
    primary: "blue",
    neutral: "neutral",
  },
  button: {
    slots: {
      base: "cursor-pointer rounded-full",
      leadingIcon: "text-highlighted",
    },
    defaultVariants: {
      color: "neutral",
      variant: "ghost",
    },
    compoundVariants: {
      color: "neutral",
      variant: "ghost",
      class: "hover:bg-accented/50 active:bg-accented/50"
    },
  },
  drawer: {
    slots: {
      container: "p-0",
      content: "w-2/3 sm:w-80 rounded-none!",
      body: "mx-2 my-4 flex flex-col gap-8",
    }
  },
  modal: {
    slots: {
      overlay: 'data-[state=open]:animate-[fade-in_100ms_ease-out] data-[state=closed]:animate-[fade-out_100ms_ease-in]',
      content: 'data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in]'
    }
  },
  tooltip: {
    slots: {
      content: "print:hidden data-[state=instant-open]:animate-[scale-in_100ms_ease-out] rounded-none ring-0 border border-accented/50"
    },
  },
};
