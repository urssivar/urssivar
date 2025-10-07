<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { LMap, LImageOverlay, LMarker } from '@vue-leaflet/vue-leaflet';
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
// HOVER & AUTO-HOVER STATE
// ============================================================================

const activeVillageIndex = ref<number | null>(null);
const isManualHover = ref(false);
const tooltipOpenStates = ref<boolean[]>(new Array(villages.length).fill(false));

let autoHoverInterval: ReturnType<typeof setInterval> | null = null;
let autoHoverTimeout: ReturnType<typeof setTimeout> | null = null;

function handleMouseOver(index: number) {
  isManualHover.value = true;
  activeVillageIndex.value = index;
}

function handleMouseOut() {
  isManualHover.value = false;
  activeVillageIndex.value = null;
}

function isMarkerActive(index: number) {
  return activeVillageIndex.value === index;
}

// ============================================================================
// AUTO-HOVER ANIMATION
// ============================================================================

function startAutoHover() {
  const autoHover = () => {
    if (isManualHover.value) return;

    const randomIndex = Math.floor(Math.random() * villages.length);

    activeVillageIndex.value = randomIndex;
    tooltipOpenStates.value[randomIndex] = true;

    autoHoverTimeout = setTimeout(() => {
      if (!isManualHover.value) {
        activeVillageIndex.value = null;
        tooltipOpenStates.value[randomIndex] = false;
      }
    }, AUTO_HOVER.DURATION);
  };

  autoHoverInterval = setInterval(autoHover, AUTO_HOVER.INTERVAL);
}

onMounted(() => {
  startAutoHover();
});

onBeforeUnmount(() => {
  if (autoHoverInterval) clearInterval(autoHoverInterval);
  if (autoHoverTimeout) clearTimeout(autoHoverTimeout);
});
</script>

<template>
  <div class="my-12 relative h-[350px] md:h-[475px] overflow-x-clip">
    <LMap :zoom="8" :center="mapCenter" :options="mapOptions" :use-global-leaflet="false"
      class="absolute left-1/2 -translate-x-1/2 w-screen h-full"
      @ready="(mapInstance: any) => mapInstance.fitBounds(villageBounds, { padding: [50, 50] })">
      <LImageOverlay url="/map.png" :bounds="imageBounds" :opacity="1" class-name="map-backdrop-image" />

      <LMarker v-for="(village, index) in villages" :key="village.name" :lat-lng="[village.lat, village.lng]">
        <UTooltip v-model:open="tooltipOpenStates[index]" :text="village.name"
          :content="{ side: 'top', sideOffset: 8 }">
          <div :class="[
            'w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 bg-red-600 cursor-pointer transition-all duration-200',
            isMarkerActive(index) ? 'scale-150' : 'scale-100'
          ]" @mouseover="handleMouseOver(index)" @mouseout="handleMouseOut" />
        </UTooltip>
      </LMarker>
    </LMap>
  </div>
</template>

<style scoped>
/* Override Leaflet default styles */
:deep(.leaflet-container) {
  background: transparent;
}

:deep(.map-backdrop-image) {
  z-index: 1;
  filter: brightness(0.8);
}

@media (prefers-color-scheme: dark) {
  :deep(.map-backdrop-image) {
    filter: invert(1) brightness(0.8);
  }
}
</style>
