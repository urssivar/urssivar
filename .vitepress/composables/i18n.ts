import { useData } from 'vitepress';
import { computed } from 'vue';

export type Lang = 'en' | 'ru';

const messages = {
  en: {
    header: {
      home: 'Home',
      search: 'Search',
      localeSwitch: 'Русский'
    },
    map: {
      villageData: 'Village table'
    },
    nav: {
      menu: 'Menu',
      toc: 'Contents'
    },
    footer: {
      license: 'CC BY 4.0 License',
      licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
      contact: 'Contact',
      contactEmail: 'mailto:alkaitagi@outlook.com',
    },
    notes: {
      backToNotes: 'Field Notes'
    },
    notFound: {
      title: 'Page not found',
      home: 'Go home'
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
      contact: 'Контакты',
      contactEmail: 'mailto:alkaitagi@outlook.com',
    },
    notes: {
      backToNotes: 'Полевые заметки'
    },
    notFound: {
      title: 'Страница не найдена',
      home: 'На главную'
    }
  }
} as const;

export function useI18n() {
  const { lang: langRaw } = useData();

  const lang = computed(() => {
    return langRaw.value as Lang;
  })

  const baseUrl = computed(() => {
    return lang.value === 'ru' ? '/ru/' : '/';
  })

  function t(key: string): string {
    const keys = key.split('.');
    let value: any = messages[lang.value];

    for (const k of keys) {
      value = value?.[k];
    }

    return value || key;
  }

  return { t, lang, baseUrl };
}
