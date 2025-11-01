import { onBeforeUnmount, onMounted } from "vue";

interface UseAutoCycleOptions {
  onEnter: () => void;
  onExit?: () => void;
  duration: number;
  gap: number;
  resumeDelay: number;
}

export function useAutoCycle({
  onEnter,
  onExit,
  duration,
  gap,
  resumeDelay,
}: UseAutoCycleOptions) {
  let timer: ReturnType<typeof setTimeout> | null = null;

  function next() {
    timer = setTimeout(() => {
      onEnter();
      timer = setTimeout(() => {
        onExit?.();
        next();
      }, duration);
    }, gap);
  }

  function stop() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }

  function resume() {
    stop();
    timer = setTimeout(next, resumeDelay);
  }

  onMounted(next);
  onBeforeUnmount(stop);

  return {
    stop,
    resume,
  };
}
