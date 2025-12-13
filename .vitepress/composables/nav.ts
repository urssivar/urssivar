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

  function buildLink(
    node: NavNode | undefined,
    paths: (NavNode | undefined)[] = []
  ) {
    return node && {
      ...node, href: buildPath('/',
        [module.value, ...paths]
          .filter(i => !!i)
          .map(i => i.path)
          .join('/')
      )
    };
  }

  const section = computed(() => {
    const base = buildLink(module.value)?.href;
    if (!base) return;

    const sectionPath = router.route.path
      .substring(base.length + 1)
      .split('/')[0];
    return module.value?.sections
      ?.find(s => s.path === sectionPath);
  });

  const article = computed(() => {
    if (!section.value) return;

    const pathItems = router.route.path.split('/');
    const articlePath = pathItems[pathItems.length - 1];
    return section.value.articles
      .find(a => a.path === articlePath)
  });

  return readonly({
    module: computed(() => buildLink(module.value)),
    section: computed(() => buildLink(section.value, [
      section.value, section.value?.articles[0]
    ])),
    article: computed(() => buildLink(article.value, [
      section.value, article.value
    ])),
    allArticles: computed(() => section.value?.articles.map(
      a => buildLink(a, [section.value, a])
    )),
    otherSections: computed(() => module.value?.sections?.map(
      s => buildLink(s, [s, s.articles[0]])
    )),
  });
}
