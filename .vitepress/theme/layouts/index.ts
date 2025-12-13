import LayoutLanding from './LayoutLanding.vue';
import LayoutDocs from './LayoutDocs.vue';
import LayoutPost from './LayoutPost.vue';
import LayoutArticle from './LayoutArticle.vue';

export const layouts = {
  landing: LayoutLanding,
  docs: LayoutDocs,
  post: LayoutPost,
  article: LayoutArticle,
} as const;

export type LayoutType = keyof typeof layouts;
