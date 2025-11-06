import { computed } from 'vue';
import { useData, useRouter } from 'vitepress';
import { languageNav } from '../nav/language';
import { Article, Module, Section } from '@/nav/types';
import type { Lang } from './i18n';

export function useLanguageNav() {
  const { lang } = useData();
  const router = useRouter();

  const nav = computed<Module>(() => {
    const locale = lang.value as Lang;
    return languageNav[locale] || languageNav.en;
  });

  const buildNavPath = (...items: (string | undefined)[]) => {
    return (lang.value === 'ru' ? '/ru/' : '/')
      + [nav.value.path, ...items]
        .filter(i => !!i)
        .join('/');
  };

  const currentSection = computed(() => {
    const sectionPath = router.route.path
      .substring(buildNavPath().length + 1)
      .split('/')[0];
    return nav.value.sections
      .find(s => s.path === sectionPath);
  });

  const currentArticle = computed(() => {
    const pathItems = router.route.path.split('/');
    const articlePath = pathItems[pathItems.length - 1];
    return currentSection.value?.articles
      .find(a => a.path === articlePath);
  });

  const getModulePath = () => buildNavPath();
  const getSectionPath = (section: Section) => buildNavPath(
    section.path,
    section.articles[0].path
  );
  const getArticlePath = (article: Article) => buildNavPath(
    currentSection.value?.path,
    article.path
  );

  return {
    nav,
    currentSection,
    currentArticle,
    getModulePath,
    getSectionPath,
    getArticlePath
  };
}
