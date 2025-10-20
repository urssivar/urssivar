export const uiConfig = {
  colors: {
    primary: 'blue',
    neutral: 'gray',
  },
  button: {
    slots: {
      base: 'cursor-pointer',
      leadingIcon: 'text-highlighted',
    },
    defaultVariants: {
      color: 'neutral',
      variant: 'ghost',
    }
  },
  tooltip: {
    slots: {
      content: 'data-[state=instant-open]:animate-[scale-in_100ms_ease-out]'
    },
  },
};
