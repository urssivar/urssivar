import { useDictData } from "@/composables/useDictData";

export default {
  paths() {
    const { letters } = useDictData();

    return Object.keys(letters).map((letter) => ({
      params: { letter }
    }));
  }
}
