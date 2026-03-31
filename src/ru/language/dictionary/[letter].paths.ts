import dict from "../../../../.vitepress/data/dictionary.json";
import { capitalize } from "../../../../.vitepress/utils";

export default {
  paths() {
    return Object.entries(dict).map(([letter, words]) => {
      const cap = capitalize(letter);
      return {
        params: {
          letter,
          words,
          title: `${cap} · Кайтагский словарь`,
          description: `${words.length} слов кайтагского языка на букву ${cap} — с определениями, формами и примерами.`,
        }
      };
    });
  }
}
