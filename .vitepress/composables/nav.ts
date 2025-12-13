import { useData, useRouter } from "vitepress";
import { Lang, useI18n } from "./i18n";
import { computed, readonly } from "vue";
import { navModules, type NavNode } from "@/navs";

export function useNavModule() {
  const { lang } = useData();
  const router = useRouter();
  const { buildPath } = useI18n();

  return computed(() => {
    const modulePath = router.route.path
      .substring(buildPath('/').length)
      .split('/')[0];
    const tree = navModules
      .find(m => m['en'].path === modulePath);

    const locale = lang.value as Lang;
    return tree && (tree[locale] || tree.en);
  });
}

export function useDocsNav() {
  const router = useRouter();
  const { buildPath } = useI18n();

  const module = useNavModule();

  function getPath(...nodes: (NavNode | undefined)[]) {
    return buildPath('/',
      [module.value, ...nodes]
        .filter(i => !!i)
        .map(i => i.path)
        .join('/')
    );
  }

  function getLink(node: NavNode, href: string) {
    return { ...node, href };
  }

  const section = computed(() => {
    const sectionPath = router.route.path
      .substring(getPath().length + 1)
      .split('/')[0];
    return module.value?.sections?.find(s => s.path === sectionPath);
  });

  const article = computed(() => {
    const pathItems = router.route.path.split('/');
    const articlePath = pathItems[pathItems.length - 1];
    return section.value?.articles
      .find(a => a.path === articlePath)
  });

  return readonly({
    module: computed(() => module.value && getLink(
      module.value,
      getPath()
    )),
    section: computed(() => section.value && getLink(
      section.value,
      getPath(section.value, section.value.articles[0])
    )),
    article: computed(() => article.value && getLink(
      article.value,
      getPath(section.value, article.value)
    )),
    allArticles: computed(() => section.value?.articles.map(
      a => getLink(a, getPath(section.value, a))
    )),
    otherSections: computed(() => module.value?.sections?.map(
      s => getLink(s, getPath(s, s.articles[0]))
    )),
  });
}
