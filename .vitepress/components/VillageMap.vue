<script setup lang="ts">
import { LMap, LImageOverlay, LMarker, LIcon } from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";
import villages from "@/data/villages.json";
import type { LatLngBoundsExpression } from "leaflet";
import { computed, ref } from "vue";
import { useAutoCycle } from "@/composables/autoCycle";
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

const tooltipOpen = ref(false);
const selectedVillage = ref<string>("");
const markerElement = ref<HTMLElement>();
const markerRefs = ref<HTMLElement[]>([]);

function selectVillage(index: number) {
  const marker = markerRefs.value[index];
  if (!marker) return;

  deselectVillage();

  selectedVillage.value = villages[index]!.name;
  tooltipOpen.value = true;
  markerElement.value = marker;

  (marker.firstChild?.firstChild as HTMLElement)?.classList.add("hover");
}

function deselectVillage() {
  tooltipOpen.value = false;
  (
    markerElement.value?.firstChild?.firstChild as HTMLElement
  )?.classList.remove("hover");
}

const autoHover = useAutoCycle({
  onEnter: () => {
    const i = Math.floor(Math.random() * villages.length);
    selectVillage(i);
  },
  onExit: deselectVillage,
  duration: 2500,
  gap: 500,
  resumeDelay: 1000,
});

function onVillageEnter(i: number) {
  autoHover.stop();
  selectVillage(i);
}

function onVillageLeave() {
  deselectVillage();
  autoHover.resume();
}
</script>

<template>
  <UTooltip
    :open="tooltipOpen"
    :reference="markerElement"
    :content="{ side: 'top', sideOffset: 10 }"
    :ui="{ content: 'h-7' }"
  >
    <template #content>
      <span lang="xdq" class="font-bold text-base">
        {{ selectedVillage }}
      </span>
    </template>
  </UTooltip>
  <div class="my-12 relative h-60 sm:h-120 overflow-x-clip">
    <div
      class="navlinks absolute right-0 bottom-0 z-20 m-2 bg-default rounded-sm font-sans text-xs flex"
    >
      <a
        href="https://docs.google.com/spreadsheets/d/1TWSpYp5W_XyjQi8bAPcLJgkfUwjRmS7s3fOGRdc5bD4"
        target="_blank"
        rel="noopener"
      >
        {{ t("map.villageData") }}
      </a>
    </div>
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
            @ready="(marker: any) => markerRefs[i] = marker._icon"
            @mouseover="onVillageEnter(i)"
            @mouseout="onVillageLeave"
            :z-index-offset="selectedVillage === village.name ? 1000 : 0"
          >
            <LIcon>
              <div
                class="w-full h-full flex items-center justify-center relative"
              >
                <div
                  class="village-dot absolute rounded-full cursor-pointer transition-all duration-200 ease-out border-bg bg-primary"
                />
              </div>
            </LIcon>
          </LMarker>
        </LMap>
      </Transition>
    </ClientOnly>
  </div>
</template>

<style scoped>
@reference "@/theme/styles/index.css";

/* Override Leaflet default styles */
:deep(.leaflet-container) {
  @apply bg-transparent;
}

:deep(.map-backdrop-image) {
  @apply invert-10 dark:invert-100 select-none;
}

:deep(.leaflet-marker-icon) {
  @apply bg-transparent border-0;
}

.village-dot {
  @apply size-3 sm:size-3.5 border-2 sm:border-3;

  &.hover {
    @apply size-5;
  }
}

/* Fade transition */
.fade-enter-active {
  transition: opacity 500ms ease-out;
}

.fade-enter-from {
  opacity: 0;
}
</style>
