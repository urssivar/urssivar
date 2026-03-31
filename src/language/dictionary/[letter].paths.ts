import dict from "../../../.vitepress/data/dictionary.json";
import { capitalize } from "../../../.vitepress/utils";

export default {
  paths() {
    return Object.entries(dict).map(([letter, words]) => {
      const cap = capitalize(letter);
      return {
        params: {
          letter,
          words,
          title: `${cap} · Kaitag Dictionary`,
          description: `${words.length} Kaitag words beginning with ${cap}, with definitions, forms, and examples.`,
        }
      };
    });
  }
}
