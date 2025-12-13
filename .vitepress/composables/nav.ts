import { useData, useRouter } from "vitepress";
import { Lang, useI18n } from "./i18n";
import { computed, readonly } from "vue";

type Link = { text: string, href: string };

type NavNode = { title: string; path: string; };

export type Article = NavNode
export type Section = NavNode & { articles: Article[]; }
export type Module = NavNode & { sections: Section[]; }

export type NavTree = Record<Lang, Module>

export function useNav(tree: NavTree) {
  const { lang } = useData();
  const router = useRouter();
  const { buildPath } = useI18n();

  const module = computed<Module>(() => {
    const locale = lang.value as Lang;
    return tree[locale] || tree.en;
  });

  function getPath(...nodes: (NavNode | undefined)[]) {
    return buildPath('/',
      [module.value, ...nodes]
        .filter(i => !!i)
        .map(i => i.path)
        .join('/')
    );
  }

  const section = computed(() => {
    const sectionPath = router.route.path
      .substring(getPath().length + 1)
      .split('/')[0];
    return module.value.sections
      .find(s => s.path === sectionPath);
  });

  const article = computed(() => {
    const pathItems = router.route.path.split('/');
    const articlePath = pathItems[pathItems.length - 1];
    return section.value?.articles
      .find(a => a.path === articlePath)
  });

  return readonly({
    module: computed(() => <Link>{
      text: module.value.title,
      href: getPath()
    }),
    section: computed(() => section.value &&
      <Link>{
        text: section.value.title,
        href: getPath(section.value.articles[0], section.value)
      }),
    article: computed(() => article.value &&
      <Link>{
        text: article.value.title,
        href: getPath(article.value, section.value)
      }),
    allArticles: computed(() => section.value &&
      section.value.articles.map(a => <Link>{
        text: a.title,
        href: getPath(a, section.value)
      })),
    otherSections: computed(() => module.value.sections.map(s => <Link>{
      text: s.title,
      href: getPath(s.articles[0], s)
    })),
  });
}
