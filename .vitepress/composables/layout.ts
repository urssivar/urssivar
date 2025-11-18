import { computed } from 'vue';
import { useRouter, useData } from 'vitepress';

export type LayoutType = 'landing' | 'docs' | 'post' | 'article';

export function useLayout() {
  const router = useRouter();
  const { frontmatter } = useData();

  const layout = computed<LayoutType>(() => {
    if (frontmatter.value.layout) {
      return frontmatter.value.layout as LayoutType;
    }

    const path = router.route.path.replace(/^\/ru\//, '/');


    if (path.match(/^\/language\//)) return 'docs';
    if (path.match(/^\/notes\//)) return 'post';

    return 'article';
  });

  return layout;
}
