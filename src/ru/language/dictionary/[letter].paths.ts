import dict from "../../../../.vitepress/data/dictionary.json";
import { capitalize } from "../../../../.vitepress/utils";

export default {
  paths() {
    return Object.keys(dict).map((letter) => {
      const cap = capitalize(letter);
      return {
        params: {
          letter,
          words: dict[letter as keyof typeof dict],
          title: `${cap} · Кайтагский словарь`,
          description: `Слова кайтагского языка на букву ${cap}.`,
        }
      };
    });
  }
}
