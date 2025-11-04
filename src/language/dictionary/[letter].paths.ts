import dict from "../../../.vitepress/data/dict.json";

export default {
  paths() {
    return Object.keys(dict).map((letter) => ({
      params: { letter }
    }));
  }
}
