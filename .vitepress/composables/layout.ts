import { computed } from 'vue';
import { useData } from 'vitepress';
import { useNavModule } from '@/composables/nav';
import LayoutLanding from '@/theme/layouts/LayoutLanding.vue';
import LayoutDocs from '@/theme/layouts/LayoutDocs.vue';
import LayoutPost from '@/theme/layouts/LayoutPost.vue';
import LayoutArticle from '@/theme/layouts/LayoutArticle.vue';

export const layouts = {
  landing: LayoutLanding,
  docs: LayoutDocs,
  post: LayoutPost,
  article: LayoutArticle,
} as const;

export type LayoutType = keyof typeof layouts;

export function useLayout() {
  const { frontmatter } = useData();
  const navModule = useNavModule();

  const layout = computed<LayoutType>(() => {
    if (frontmatter.value.layout) {
      return frontmatter.value.layout as LayoutType;
    }
    return navModule.value?.layout ?? 'article';
  });

  return layout;
}
