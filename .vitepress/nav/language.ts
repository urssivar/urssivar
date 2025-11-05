import { LanguageNav } from "./types";

export const languageNav: LanguageNav = {
  ru: {
    title: 'Кайтагский язык',
    path: 'language',
    sections: [
      {
        title: 'Грамматика',
        path: 'grammar',
        articles: [
          { title: 'Введение', path: 'intro' },
          // { title: 'Падежи', path: 'cases' },
          // { title: 'Связки', path: 'copulas' },
        ]
      },
      {
        title: 'Словарь',
        path: 'dictionary',
        articles: [
          { title: 'Введение', path: 'intro' },
        ]
      },
    ]
  },
  en: {
    title: 'Kaitag Language',
    path: 'language',
    sections: [
      {
        title: 'Grammar',
        path: 'grammar',
        articles: [
          { title: 'Introduction', path: 'intro' },
          // { title: 'Cases', path: 'cases' },
          // { title: 'Copulas', path: 'copulas' },
        ]
      },
      {
        title: 'Dictionary',
        path: 'dictionary',
        articles: [
          { title: 'Introduction', path: 'intro' },
        ]
      },
    ]
  }
};
