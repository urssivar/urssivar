import { computed } from "vue";
import dict from "@/data/dictionary.json";

export type Letter = keyof typeof dict;
export type Word = typeof dict[Letter][number];

export function useDictData() {
  const letters = computed(() => {
    return Object.keys(dict) as Letter[];
  });

  return {
    letters,
    dict,
  };
}
