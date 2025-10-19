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
          { title: 'Падежи', path: 'cases' },
          { title: 'Связки', path: 'copulas' },
        ]
      },
      {
        title: 'Словарь',
        path: 'dictionary',
        articles: [
          { title: 'Введение', path: 'intro' },
        ]
      },
      {
        title: 'Разговорник',
        path: 'phrasebook',
        articles: [
          { title: 'Введение', path: 'intro' },
        ]
      },
      {
        title: 'Тексты',
        path: 'texts',
        articles: [
          { title: 'Введение', path: 'intro' },
        ]
      }
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
          { title: 'Cases', path: 'cases' },
          { title: 'Copulas', path: 'copulas' },
        ]
      },
      {
        title: 'Dictionary',
        path: 'dictionary',
        articles: [
          { title: 'Introduction', path: 'intro' },
        ]
      },
      {
        title: 'Phrasebook',
        path: 'phrasebook',
        articles: [
          { title: 'Introduction', path: 'intro' },
        ]
      },
      {
        title: 'Texts',
        path: 'texts',
        articles: [
          { title: 'Introduction', path: 'intro' },
        ]
      }
    ]
  }
};
