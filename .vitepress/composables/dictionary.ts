import { computed } from "vue";
import dict from "@/data/dictionary.json";
import { Lang } from "./i18n";

export type Letter = keyof typeof dict;

type BilingualText = Partial<Record<Lang, string>>;

export type Word = {
  id: string;
  headword: string;
  tags?: BilingualText[];
  forms?: string[];
  variants?: string[];
  definitions: {
    translation: Required<BilingualText>;
    tags?: BilingualText[];
    aliases?: {
      en?: string[];
      ru?: string[];
    };
    note?: BilingualText;
    examples?: {
      text: string;
      translation?: BilingualText;
    }[];
  }[];
  note?: BilingualText;
  etymology?: BilingualText;
}

export function useDictData() {
  const letters = computed(() => {
    return Object.keys(dict) as Letter[];
  });

  return {
    letters,
    dict,
  };
}
