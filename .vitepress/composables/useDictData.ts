import { computed } from "vue";
import dict from "@/data/dict.json";

export type Letter = keyof typeof dict;

export const useDictData = () => {
  const letters = computed(() => {
    return Object.keys(dict) as Letter[];
  });

  return {
    letters,
    dict,
  };
};
