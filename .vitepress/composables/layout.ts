import { computed } from 'vue';
import { useData } from 'vitepress';
import { useNavModule } from '@/composables/nav';
import type { LayoutType } from '@/theme/layouts';

export type { LayoutType };

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
