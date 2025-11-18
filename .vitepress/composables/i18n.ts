import { useData } from 'vitepress';

export type Lang = 'en' | 'ru';

const messages = {
  en: {
    header: {
      home: 'Home',
      search: 'Search',
      localeSwitch: 'Русский'
    },
    map: {
      villageData: 'Villages sheet'
    },
    nav: {
      menu: 'Menu',
      toc: 'Contents'
    },
    footer: {
      license: 'License CC BY 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
      contact: 'Write to us',
      contactEmail: 'mailto:alkaitagi@outlook.com',
    },
    notes: {
      backToNotes: 'Field Notes'
    }
  },
  ru: {
    header: {
      home: 'Главная',
      search: 'Поиск',
      localeSwitch: 'English'
    },
    map: {
      villageData: 'Таблица сёл'
    },
    nav: {
      menu: 'Меню',
      toc: 'Содержание'
    },
    footer: {
      license: 'Лицензия CC BY 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by/4.0/deed.ru',
      contact: 'Написать нам',
      contactEmail: 'mailto:alkaitagi@outlook.com',
    },
    notes: {
      backToNotes: 'Полевые заметки'
    }
  }
} as const;

export function useI18n() {
  const { lang } = useData();

  const t = (key: string): string => {
    const locale = lang.value as Lang;
    const keys = key.split('.');
    let value: any = messages[locale];

    for (const k of keys) {
      value = value?.[k];
    }

    return value || key;
  };

  /**
   * Build a localized path from segments
   * @example buildPath('/notes', '#intro') => '/ru/notes#intro' (for Russian)
   * @example buildPath('/grammar/cases') => '/grammar/cases' (for English)
   */
  const buildPath = (...segments: string[]): string => {
    const localePrefix = lang.value === "ru" ? "/ru" : "";
    return [localePrefix, ...segments].filter(Boolean).join("");
  };

  return { t, buildPath };
}
