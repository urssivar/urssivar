import { computed } from "vue";
import kits from "@/data/dna.json";

export function useDNAData() {
  const villages = computed(() => {
    const villages = new Set<string>();
    kits.forEach((kit) => {
      if (kit.village) {
        villages.add(kit.village);
      }
    });
    return villages;
  });

  const haplogroupMap = computed(() => {
    const map = new Map<string, Map<string, number>>();

    kits.forEach((kit) => {
      const hg = kit.haplogroup;
      const sc = kit.subclade || kit.haplogroup;

      if (!map.has(hg)) {
        map.set(hg, new Map());
      }
      const subclades = map.get(hg)!;
      subclades.set(sc, (subclades.get(sc) || 0) + 1);
    });

    return map;
  });

  return {
    kits,
    villages,
    haplogroupMap,
  };
}
