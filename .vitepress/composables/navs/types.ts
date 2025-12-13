import type { Lang } from "@/composables/i18n";
import type { LayoutType } from "@/composables/layout";

export type NavNode = { text: string; path: string; };

export type Article = NavNode
export type Section = NavNode & { articles: Article[]; }
export type Module = NavNode & { sections?: Section[]; layout?: LayoutType; }

export type NavTree = Record<Lang, Module>
