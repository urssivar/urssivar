import type { NuxtUIOptions } from "@nuxt/ui/unplugin";

export default <NuxtUIOptions>{
  colors: {
    primary: "blue",
    neutral: "neutral",
  },
  button: {
    slots: {
      base: "cursor-pointer rounded-full",
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
  slideover: {
    slots: {
      overlay: "data-[state=open]:animate-[fade-in_100ms_ease-out] data-[state=closed]:animate-[fade-out_100ms_ease-in]",
      container: "p-0",
      content: [
        "data-[state=open]:animate-[slide-in_100ms_ease-out] data-[state=closed]:animate-[slide-out_100ms_ease-in]",
        "w-[calc(100%-var(--spacing)*16.5)]! ring-0! border-default shadow-md!"
      ],
      body: "px-2! py-4! h-full flex flex-col gap-8",
    },
    compoundVariants: [
      {
        side: 'left',
        inset: false,
        class: {
          content: 'border-r'
        }
      }, {
        side: 'right',
        inset: false,
        class: {
          content: 'border-l'
        }
      },
    ],
  },
  modal: {
    slots: {
      overlay: "data-[state=open]:animate-[fade-in_100ms_ease-out] data-[state=closed]:animate-[fade-out_100ms_ease-in]",
      content: [
        "data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in]",
        "rounded-none! ring-0! border border-default shadow-md!"
      ]
    }
  },
  tooltip: {
    slots: {
      content: [
        "data-[state=instant-open]:animate-[scale-in_100ms_ease-out]",
        "print:hidden rounded-none! ring-0! border border-default"
      ]
    },
  },
};
