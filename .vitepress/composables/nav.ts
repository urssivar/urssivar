import { useRouter } from "vitepress";
import { Lang, useI18n } from "./i18n";
import { computed, readonly } from "vue";
import path from "path";

export function useNav() {
  const router = useRouter();
  const { baseUrl } = useI18n();
  const { lang } = useI18n();

  function resolve(base: string, branch: NavPage, paths: string[]) {
    const page = <ResolvedNavPage>{
      text: branch.text[lang.value],
      url: base + (branch.path ? branch.path + "/" : ""),
      path: branch.path,
    }
    if (paths.length && page.path == paths[0]) {
      page.children = branch.children
        ?.map(c => resolve(page.url, c, paths.slice(1)))
        ?? [];
    }
    return page;
  }

  const paths = computed(() => {
    const paths = router.route.path
      .substring(baseUrl.value.length)
      .split("/")
      .filter(Boolean)
    return ["", ...paths];
  })

  const home = computed(() => {
    return resolve(baseUrl.value, navTree, paths.value);
  });

  const module = computed(() => {
    return home.value?.children
      ?.find((c) => c.path === paths.value[1]);
  });

  const section = computed(() => {
    return module.value?.children
      ?.find((c) => c.path === paths.value[2]);
  });

  const article = computed(() => {
    return [
      home.value, module.value, section.value,
      ...section.value?.children ?? []
    ]?.find((c) => c?.url === router.route.path)
  })

  return readonly({
    home, module, section, article
  });
}

interface ResolvedNavPage {
  text: string,
  url: string,
  path: string,
  children?: ResolvedNavPage[]
};

interface NavPage {
  text: Record<Lang, string>,
  path: string,
  children?: NavPage[]
};

const navTree = <NavPage>{
  text: { en: "Urssivar", ru: "Urssivar", },
  path: "",
  children: [
    {
      text: { en: "Language", ru: "Язык", },
      path: "language",
      children: [
        {
          text: { en: "Grammar", ru: "Грамматика", },
          path: "grammar",
        },
        {
          text: { en: "Dictionary", ru: "Словарь", },
          path: "dictionary",
        },
      ]
    },
    {
      text: { en: "Genealogy", ru: "Генеалогия", },
      path: "genealogy",
    },
    {
      text: { en: "Notes", ru: "Заметки", },
      path: "notes",
    }
  ]
};
