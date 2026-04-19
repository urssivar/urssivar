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
  zoomSnap: 0.1,
};

const hoveredIndex = ref(-1);

const cornerClasses = [
  "origin-bottom-right rounded-br-none -translate-x-full -translate-y-full",
  "origin-bottom-left rounded-bl-none -translate-y-full",
  "origin-top-left rounded-tl-none",
  "origin-top-right rounded-tr-none -translate-x-full",
];
</script>

<template>
  <div class="breakout p-0 relative h-72 sm:h-144 overflow-clip isolate">
    <ClientOnly>
      <Transition name="fade" appear>
        <LMap
          :options="mapOptions"
          :use-global-leaflet="false"
          class="absolute left-1/2 -translate-x-1/2 w-screen h-full"
          @ready="
            (mapInstance: any) => {
              mapInstance.fitBounds(villageBounds);
              mapInstance.setZoom(mapInstance.getZoom() - 0.35, {
                animate: false,
              });
            }
          "
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
              <div class="relative size-full group font-sans">
                <div
                  class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 size-3.5 bg-primary rounded-full transition-shadow duration-200 ring-inset ring-(--ui-bg-elevated) ring-4 group-hover:ring-2"
                />
                <span
                  class="top-1/2 left-1/2 absolute inline-block text-xs font-semibold leading-none rounded-full px-1.5 py-0.5 bg-elevated/75 group-hover:bg-elevated border border-default transition-all duration-200 group-hover:scale-110 opacity-0 pointer-events-none sm:opacity-100 sm:pointer-events-auto group-hover:opacity-100 group-hover:pointer-events-auto shadow-sm"
                  :class="cornerClasses[village.corner]"
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
      class="navlinks absolute right-0 bottom-0 z-1000 m-2 bg-elevated text-xs flex print:hidden"
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

@media print {
  :deep(.leaflet-marker-icon) {
    display: block !important;
  }
}

.fade-enter-active {
  transition: opacity 500ms ease-out;
}

.fade-enter-from {
  opacity: 0;
}
</style>
