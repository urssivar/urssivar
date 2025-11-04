import dict from "../../../../.vitepress/data/dictionary.json";

export default {
  paths() {
    return Object.keys(dict).map((letter) => ({
      params: { letter }
    }));
  }
}
