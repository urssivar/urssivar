import { useData } from 'vitepress';

const messages = {
  en: {
    header: {
      home: 'Home',
      search: 'Search',
      localeSwitch: 'Русский'
    },
    nav: {
      menu: 'Menu',
      toc: 'Contents'
    },
    footer: {
      license: 'License CC BY 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
      telegram: 'Telegram channel',
      youtube: 'YouTube channel',
      github: 'GitHub repository',
    }
  },
  ru: {
    header: {
      home: 'Главная',
      search: 'Поиск',
      localeSwitch: 'English'
    },
    nav: {
      menu: 'Меню',
      toc: 'Содержание'
    },
    footer: {
      license: 'Лицензия CC BY 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by/4.0/deed.ru',
      telegram: 'Telegram канал',
      youtube: 'YouTube канал',
      github: 'GitHub репозиторий',
    }
  }
} as const;

export function useI18n() {
  const { lang } = useData();

  const t = (key: string): string => {
    const locale = lang.value as 'en' | 'ru';
    const keys = key.split('.');
    let value: any = messages[locale];

    for (const k of keys) {
      value = value?.[k];
    }

    return value || key;
  };

  return { t };
}
