import { Lang } from "@/composables/i18n";

type NavNode = {
  title: string;
  path: string;
};

export type Article = NavNode
export type Section = NavNode & { articles: Article[]; }
export type Module = NavNode & { sections: Section[]; }

export type NavTree = Record<Lang, Module>
