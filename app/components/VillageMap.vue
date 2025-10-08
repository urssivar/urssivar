<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { LMap, LImageOverlay, LMarker, LIcon } from '@vue-leaflet/vue-leaflet';
import 'leaflet/dist/leaflet.css';
import villages from '~/data/villages.json';
import type { LatLngBoundsExpression } from 'leaflet';

// ============================================================================
// CONSTANTS
// ============================================================================

/** QGIS map export bounds (EPSG:4326 / WGS 84) */
const MAP_EXPORT_BOUNDS = {
  minLng: 47.2754,
  maxLng: 48.2753,
  minLat: 41.8747,
  maxLat: 42.2207,
} as const;

/** Auto-hover animation timing (milliseconds) */
const AUTO_HOVER = {
  DURATION: 1800,
  INTERVAL: 2500,
} as const;

// ============================================================================
// MAP CONFIGURATION
// ============================================================================

const villageBounds = computed<LatLngBoundsExpression>(() => {
  const lats = villages.map(v => v.lat);
  const lngs = villages.map(v => v.lng);
  return [
    [Math.min(...lats), Math.min(...lngs)],
    [Math.max(...lats), Math.max(...lngs)],
  ];
});

const imageBounds = computed<LatLngBoundsExpression>(() => [
  [MAP_EXPORT_BOUNDS.minLat, MAP_EXPORT_BOUNDS.minLng],
  [MAP_EXPORT_BOUNDS.maxLat, MAP_EXPORT_BOUNDS.maxLng],
]);

const mapCenter = computed(() => [
  (MAP_EXPORT_BOUNDS.minLat + MAP_EXPORT_BOUNDS.maxLat) / 2,
  (MAP_EXPORT_BOUNDS.minLng + MAP_EXPORT_BOUNDS.maxLng) / 2,
]);

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

// ============================================================================
// TOOLTIP STATE
// ============================================================================

const tooltipOpen = ref(false);
const selectedVillage = ref<string | null>(null);
const markerElement = ref<HTMLElement>();

function handleMarkerHover(villageName: string, event: any) {
  selectedVillage.value = villageName;
  markerElement.value = event.target._icon.children[0];
  tooltipOpen.value = true;
}

// ============================================================================
// AUTO-HOVER STATE
// ============================================================================

const mapRef = ref<any>(null);
let autoHoverInterval: ReturnType<typeof setInterval> | null = null;
let autoHoverTimeout: ReturnType<typeof setTimeout> | null = null;

function resetAutoHover() {
  if (autoHoverInterval) clearInterval(autoHoverInterval);
  if (autoHoverTimeout) clearTimeout(autoHoverTimeout);

  autoHoverInterval = setInterval(() => {
    if (!mapRef.value?.leafletObject) return;

    const randomIndex = Math.floor(Math.random() * villages.length);
    const randomVillage = villages[randomIndex];
    const markers = mapRef.value.leafletObject._layers;

    // Find the marker element for the random village
    let currentIndex = 0;
    for (const layerId in markers) {
      const layer = markers[layerId];
      if (layer._icon) {
        if (currentIndex === randomIndex) {
          markerElement.value = layer._icon.children[0];
          selectedVillage.value = randomVillage.name;
          tooltipOpen.value = true;

          autoHoverTimeout = setTimeout(() => {
            tooltipOpen.value = false;
            setTimeout(() => {
              selectedVillage.value = null;
            }, 100); // Small delay for fade animation
          }, AUTO_HOVER.DURATION);
          break;
        }
        currentIndex++;
      }
    }
  }, AUTO_HOVER.INTERVAL);
}

onMounted(() => {
  resetAutoHover();
});

onBeforeUnmount(() => {
  if (autoHoverInterval) clearInterval(autoHoverInterval);
  if (autoHoverTimeout) clearTimeout(autoHoverTimeout);
  tooltipOpen.value = false;
  selectedVillage.value = null;
});

</script>

<template>
  <UTooltip :open="tooltipOpen" :text="selectedVillage ?? ''" arrow :reference="markerElement" :content="{
    side: 'top',
  }" class="font-bold text-sm" />
  <div class="my-16 relative h-[350px] md:h-[475px] overflow-x-clip">
    <LMap ref="mapRef" :zoom="8" :center="mapCenter" :options="mapOptions" :use-global-leaflet="false"
      class="absolute left-1/2 -translate-x-1/2 w-screen h-full border-y border-gray-200 dark:border-gray-800"
      @ready="(mapInstance: any) => mapInstance.fitBounds(villageBounds)">
      <LImageOverlay url="/map.png" :bounds="imageBounds" :opacity="1" class-name="map-backdrop-image" />
      <LMarker v-for="village in villages" :key="village.name" :lat-lng="[village.lat, village.lng]"
        @mouseover="(e) => { handleMarkerHover(village.name, e); resetAutoHover(); }" @mouseout="tooltipOpen = false">
        <LIcon>
          <div class="w-full h-full flex items-center justify-center">
            <div
              class="village-dot w-3 h-3 rounded-full border-2 cursor-pointer transition-all ease-out border-white dark:border-gray-950 bg-rose-600 dark:bg-rose-500 hover:scale-150" />
          </div>
        </LIcon>
      </LMarker>
    </LMap>
  </div>
</template>

<style scoped>
/* Override Leaflet default styles */
:deep(.leaflet-container) {
  @apply bg-transparent;
}

:deep(.map-backdrop-image) {
  @apply brightness-[0.8] dark:invert;
}

:deep(.leaflet-marker-icon) {
  @apply bg-transparent border-0;
}
</style>
