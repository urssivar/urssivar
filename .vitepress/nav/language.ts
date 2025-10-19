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
          { title: 'Частицы', path: 'particles' },
          { title: 'Связки', path: 'copulas' },
          { title: 'Предикативы', path: 'predicatives' },
          { title: 'Вопросы', path: 'questions' },
          { title: 'Локативные падежи', path: 'locative-cases' }
        ]
      },
      {
        title: 'Словарь',
        path: 'dictionary',
        articles: [
          { title: 'Введение', path: 'intro' },
          { title: 'А', path: 'a' },
          { title: 'Б', path: 'b' },
          { title: 'В', path: 'v' },
          { title: 'Г', path: 'g' },
          { title: 'Д', path: 'd' },
          { title: 'Е', path: 'e' },
          { title: 'Ж', path: 'zh' },
          { title: 'З', path: 'z' },
          { title: 'И', path: 'i' },
          { title: 'Й', path: 'y' },
          { title: 'К', path: 'k' },
          { title: 'Л', path: 'l' },
          { title: 'М', path: 'm' },
          { title: 'Н', path: 'n' },
          { title: 'О', path: 'o' },
          { title: 'П', path: 'p' },
          { title: 'Р', path: 'r' },
          { title: 'С', path: 's' },
          { title: 'Т', path: 't' },
          { title: 'У', path: 'u' },
          { title: 'Ф', path: 'f' },
          { title: 'Х', path: 'kh' },
          { title: 'Ц', path: 'ts' },
          { title: 'Ч', path: 'ch' },
          { title: 'Ш', path: 'sh' },
          { title: 'Щ', path: 'shch' },
          { title: 'Ъ', path: 'hard-sign' },
          { title: 'Ы', path: 'y-sound' },
          { title: 'Ь', path: 'soft-sign' },
          { title: 'Э', path: 'e-sound' },
          { title: 'Ю', path: 'yu' },
          { title: 'Я', path: 'ya' }
        ]
      },
      {
        title: 'Разговорник',
        path: 'phrasebook',
        articles: []
      },
      {
        title: 'Тексты',
        path: 'texts',
        articles: []
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
          { title: 'Particles', path: 'particles' },
          { title: 'Copulas', path: 'copulas' },
          { title: 'Predicatives', path: 'predicatives' },
          { title: 'Questions', path: 'questions' },
          { title: 'Locative Cases', path: 'locative-cases' }
        ]
      },
      {
        title: 'Dictionary',
        path: 'dictionary',
        articles: [
          { title: 'Introduction', path: 'intro' },
          { title: 'A', path: 'a' },
          { title: 'B', path: 'b' },
          { title: 'V', path: 'v' },
          { title: 'G', path: 'g' },
          { title: 'D', path: 'd' },
          { title: 'E', path: 'e' },
          { title: 'Zh', path: 'zh' },
          { title: 'Z', path: 'z' },
          { title: 'I', path: 'i' },
          { title: 'Y', path: 'y' },
          { title: 'K', path: 'k' },
          { title: 'L', path: 'l' },
          { title: 'M', path: 'm' },
          { title: 'N', path: 'n' },
          { title: 'O', path: 'o' },
          { title: 'P', path: 'p' },
          { title: 'R', path: 'r' },
          { title: 'S', path: 's' },
          { title: 'T', path: 't' },
          { title: 'U', path: 'u' },
          { title: 'F', path: 'f' },
          { title: 'Kh', path: 'kh' },
          { title: 'Ts', path: 'ts' },
          { title: 'Ch', path: 'ch' },
          { title: 'Sh', path: 'sh' },
          { title: 'Shch', path: 'shch' },
          { title: 'Hard Sign', path: 'hard-sign' },
          { title: 'Y Sound', path: 'y-sound' },
          { title: 'Soft Sign', path: 'soft-sign' },
          { title: 'E Sound', path: 'e-sound' },
          { title: 'Yu', path: 'yu' },
          { title: 'Ya', path: 'ya' }
        ]
      },
      {
        title: 'Phrasebook',
        path: 'phrasebook',
        articles: []
      },
      {
        title: 'Texts',
        path: 'texts',
        articles: []
      }
    ]
  }
};
