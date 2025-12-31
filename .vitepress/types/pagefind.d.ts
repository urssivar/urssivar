/**
 * Pagefind Web Search API Types
 * Based on: https://github.com/pagefind/pagefind/blob/production-docs/pagefind_web_js/types/index.d.ts
 */

export interface Pagefind {
  init: () => Promise<void>;
  search: (
    query: string,
    options?: PagefindSearchOptions
  ) => Promise<PagefindSearchResults>;
  debouncedSearch: (
    query: string,
    options?: PagefindSearchOptions,
    debounceTimeoutMs?: number
  ) => Promise<PagefindSearchResults | null>;
  preload: (query: string, options?: PagefindSearchOptions) => Promise<void>;
  filters: () => Promise<PagefindFilterCounts>;
  options: (options: PagefindIndexOptions) => Promise<void>;
}

export interface PagefindIndexOptions {
  basePath?: string;
  baseUrl?: string;
  excerptLength?: number;
  indexWeight?: number;
  mergeFilter?: Record<string, string[]>;
  highlightParam?: string;
  ranking?: PagefindRankingWeights;
}

export interface PagefindRankingWeights {
  termSimilarity?: number;
  pageLength?: number;
  termSaturation?: number;
  termFrequency?: number;
}

export interface PagefindSearchOptions {
  preload?: boolean;
  verbose?: boolean;
  filters?: Record<string, string | string[]>;
  sort?: Record<string, "asc" | "desc">;
}

export interface PagefindSearchResults {
  results: PagefindSearchResult[];
  unfilteredResultCount: number;
  filters: PagefindFilterCounts;
  totalFilters: PagefindFilterCounts;
  timings: {
    preload: number;
    search: number;
    total: number;
  };
}

export interface PagefindSearchResult {
  id: string;
  score: number;
  words: number[];
  data: () => Promise<PagefindSearchFragment>;
}

export interface PagefindSearchFragment {
  url: string;
  content: string;
  raw_content?: string;
  excerpt: string;
  raw_url?: string;
  word_count: number;
  locations: number[];
  weighted_locations: PagefindWordLocation[];
  filters: Record<string, string[]>;
  meta: Record<string, string>;
  anchors: PagefindSearchAnchor[];
  sub_results: PagefindSubResult[];
}

export interface PagefindSubResult {
  title: string;
  url: string;
  excerpt: string;
  locations: number[];
  weighted_locations: PagefindWordLocation[];
  anchor?: PagefindSearchAnchor;
}

export interface PagefindWordLocation {
  weight: number;
  balanced_score: number;
  location: number;
}

export interface PagefindSearchAnchor {
  element: string;
  id: string;
  text?: string;
  location: number;
}

export type PagefindFilterCounts = Record<string, Record<string, number>>;
