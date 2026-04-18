<script setup lang="ts">
import { LMap, LImageOverlay, LMarker, LIcon } from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";
import villages from "@/data/villages.json";
import type { LatLngBoundsExpression } from "leaflet";
import { computed, ref } from "vue";
import { useI18n } from "@/composables/i18n";

const { t } = useI18n();

const villageBounds = computed<LatLngBoundsExpression>(() => {
  const lats = villages.map((v) => v.lat);
  const lngs = villages.map((v) => v.lng);
  return [
    [Math.min(...lats), Math.min(...lngs)],
    [Math.max(...lats), Math.max(...lngs)],
  ];
});

// Updating Map Backdrop
// 1. QGIS export: EPSG:4326, bounds 47.2754-48.2753 lng, 41.8747-42.2207 lat
// 2. `[[minLat, minLng], [maxLat, maxLng]]`
const imageBounds: LatLngBoundsExpression = [
  [41.8747, 47.2754],
  [42.2207, 48.2753],
];

const mapOptions = {
  zoomControl: false,
  dragging: false,
  touchZoom: false,
  scrollWheelZoom: false,
  doubleClickZoom: false,
  boxZoom: false,
  keyboard: false,
  attributionControl: false,
};

const hoveredIndex = ref(-1);

// corner order: top-left, top-right, bottom-right, bottom-left
type Corner = "tl" | "tr" | "br" | "bl";
const CORNERS: Corner[] = ["tl", "tr", "br", "bl"];

function cornerFor(i: number): Corner {
  return CORNERS[i % 4]!;
}

const chipClass: Record<Corner, string> = {
  tl: "rounded-tl-none",
  tr: "rounded-tr-none -translate-x-full",
  br: "rounded-br-none -translate-x-full -translate-y-full",
  bl: "rounded-bl-none -translate-y-full",
};
</script>

<template>
  <div class="breakout p-0 relative h-60 sm:h-120 overflow-x-clip">
    <ClientOnly>
      <Transition name="fade" appear>
        <LMap
          :options="mapOptions"
          :use-global-leaflet="false"
          class="absolute left-1/2 -translate-x-1/2 w-screen h-full"
          @ready="(mapInstance: any) => mapInstance.fitBounds(villageBounds)"
        >
          <LImageOverlay
            url="/assets/map.webp"
            :bounds="imageBounds"
            :opacity="1"
            class-name="map-backdrop-image"
          />
          <LMarker
            v-for="(village, i) in villages"
            :key="village.name"
            :lat-lng="[village.lat, village.lng]"
            :z-index-offset="hoveredIndex === i ? 1000 : 0"
            @mouseover="hoveredIndex = i"
            @mouseout="hoveredIndex = -1"
          >
            <LIcon>
              <div class="relative w-full h-full group font-sans">
                <span
                  class="top-1/2 left-1/2 absolute inline-block sm:text-xs font-semibold leading-none rounded-full px-1.5 py-0.5 bg-elevated/75 group-hover:bg-elevated transition-colors duration-200"
                  :class="chipClass[cornerFor(i)]"
                >
                  {{ village.name }}
                </span>
              </div>
            </LIcon>
          </LMarker>
        </LMap>
      </Transition>
    </ClientOnly>
    <div
      class="navlinks absolute right-0 bottom-0 z-1 m-2 bg-elevated font-sans text-xs flex"
    >
      <a
        href="https://docs.google.com/spreadsheets/d/1TWSpYp5W_XyjQi8bAPcLJgkfUwjRmS7s3fOGRdc5bD4"
        target="_blank"
        rel="noopener"
      >
        {{ t("map.villageData") }}
      </a>
    </div>
  </div>
</template>

<style scoped>
@reference "@/theme/styles/index.css";

:deep(.leaflet-container) {
  @apply bg-transparent;
}

:deep(.map-backdrop-image) {
  @apply invert-10 dark:invert-100 select-none;
}

:deep(.leaflet-marker-icon) {
  @apply bg-transparent border-0;
}

.fade-enter-active {
  transition: opacity 500ms ease-out;
}

.fade-enter-from {
  opacity: 0;
}
</style>
