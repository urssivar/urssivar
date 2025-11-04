import type { PageData } from "vitepress";
import { capitalize } from "./utils";

export default async function (pageData: PageData) {
  transformDictionaryPage(pageData);
}

function transformDictionaryPage(pageData: PageData) {
  if (!pageData.params?.letter
    || !pageData.relativePath.includes('/dictionary/'))
    return;

  const letter = capitalize(pageData.params.letter);
  const lang = pageData.relativePath.startsWith('ru/') ? 'ru' : 'en';

  const titles = {
    en: `${letter} · Kaitag Dictionary`,
    ru: `${letter} · Кайтагский словарь`
  };

  const descriptions = {
    en: `Kaitag words starting with ${letter}`,
    ru: `Слова кайтагского языка на букву ${letter}`
  };

  pageData.title = titles[lang];
  pageData.description = descriptions[lang];

}
