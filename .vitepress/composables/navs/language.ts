import { NavTree } from "./types";

export const languageNav = <NavTree>{
  ru: {
    text: 'Кайтагский язык',
    path: 'language',
    layout: 'docs',
    sections: [
      {
        text: 'Грамматика',
        path: 'grammar',
        articles: [
          { text: 'Введение', path: 'intro' },
          // { text: 'Падежи', path: 'cases' },
          // { text: 'Связки', path: 'copulas' },
        ]
      },
      {
        text: 'Словарь',
        path: 'dictionary',
        articles: [
          { text: 'Введение', path: 'intro' },
        ]
      },
    ]
  },
  en: {
    text: 'Kaitag Language',
    path: 'language',
    layout: 'docs',
    sections: [
      {
        text: 'Grammar',
        path: 'grammar',
        articles: [
          { text: 'Introduction', path: 'intro' },
          // { text: 'Cases', path: 'cases' },
          // { text: 'Copulas', path: 'copulas' },
        ]
      },
      {
        text: 'Dictionary',
        path: 'dictionary',
        articles: [
          { text: 'Introduction', path: 'intro' },
        ]
      },
    ]
  }
};
