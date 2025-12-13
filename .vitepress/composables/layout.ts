import { computed } from 'vue';
import { useData } from 'vitepress';
import { useNavModule } from '@/composables/nav';

export type LayoutType = 'landing' | 'docs' | 'post' | 'article';

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
