export interface Article {
    title: string;
    path: string;
}

export interface Section {
    title: string;
    path: string;
    articles: Article[];
}

export interface Module {
    title: string;
    path: string;
    sections: Section[];
}

export interface LanguageNav {
    ru: Module;
    en: Module;
}
