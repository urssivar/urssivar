<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { LMap, LImageOverlay, LMarker, LTooltip } from '@vue-leaflet/vue-leaflet';
import { divIcon } from 'leaflet';
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
// CUSTOM MARKER ICON
// ============================================================================

const markerIcon = divIcon({
  html: '<div class="village-dot w-3 h-3 rounded-full border-2 border-white dark:border-gray-950 bg-rose-600 dark:bg-rose-500"></div>',
  className: 'custom-village-marker',
  iconSize: [12, 12],
  iconAnchor: [6, 6],
});

// ============================================================================
// AUTO-HOVER STATE
// ============================================================================

const mapRef = ref<any>(null);
let autoHoverInterval: ReturnType<typeof setInterval> | null = null;
let autoHoverTimeout: ReturnType<typeof setTimeout> | null = null;
let currentAutoHoverLayer: any = null;

function closeCurrentAutoHoverTooltip() {
  if (currentAutoHoverLayer?.getTooltip) {
    currentAutoHoverLayer.closeTooltip();
    currentAutoHoverLayer = null;
  }
}

function resetAutoHover() {
  if (autoHoverInterval) clearInterval(autoHoverInterval);
  if (autoHoverTimeout) clearTimeout(autoHoverTimeout);
  closeCurrentAutoHoverTooltip();

  autoHoverInterval = setInterval(() => {
    if (!mapRef.value?.leafletObject) return;

    const randomIndex = Math.floor(Math.random() * villages.length);
    const markers = mapRef.value.leafletObject._layers;

    // Find the marker at randomIndex
    let currentIndex = 0;
    for (const layerId in markers) {
      const layer = markers[layerId];
      if (layer.getTooltip) {
        if (currentIndex === randomIndex) {
          layer.openTooltip();
          currentAutoHoverLayer = layer;

          autoHoverTimeout = setTimeout(() => {
            closeCurrentAutoHoverTooltip();
          }, AUTO_HOVER.DURATION);
          break;
        }
        currentIndex++;
      }
    }
  }, AUTO_HOVER.INTERVAL);
}

function handleMarkerMouseOver() {
  resetAutoHover();
}

onMounted(() => {
  resetAutoHover();
});

onBeforeUnmount(() => {
  if (autoHoverInterval) clearInterval(autoHoverInterval);
  if (autoHoverTimeout) clearTimeout(autoHoverTimeout);
  closeCurrentAutoHoverTooltip();
});
</script>

<template>
  <div class="my-16 relative h-[350px] md:h-[475px] overflow-x-clip">
    <LMap ref="mapRef" :zoom="8" :center="mapCenter" :options="mapOptions" :use-global-leaflet="false"
      class="absolute left-1/2 -translate-x-1/2 w-screen h-full border-y border-gray-200 dark:border-gray-800"
      @ready="(mapInstance: any) => mapInstance.fitBounds(villageBounds)">
      <LImageOverlay url="/map.png" :bounds="imageBounds" :opacity="1" class-name="map-backdrop-image" />
      <LMarker v-for="village in villages" :key="village.name" :lat-lng="[village.lat, village.lng]" :icon="markerIcon"
        @mouseover="handleMarkerMouseOver">
        <LTooltip :options="{ direction: 'top', offset: [0, -8], className: 'village-tooltip' }">
          <span lang="xdq">{{ village.name }}</span>
        </LTooltip>
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

/* Custom marker styles */
:deep(.custom-village-marker) {
  background: transparent;
  border: none;
}

:deep(.village-dot) {
  transition: transform 200ms ease-out;
  cursor: pointer;
}

:deep(.leaflet-marker-icon:hover .village-dot) {
  transform: scale(1.5);
}

/* Custom tooltip styles */
:deep(.village-tooltip) {
  background: rgb(249 250 251) !important;
  color: rgb(17 24 39) !important;
  border: 1px solid rgb(229 231 235) !important;
  border-radius: 0 !important;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
  padding: 4px 8px !important;
  font-family: "IBM Plex Sans", sans-serif !important;
  font-size: 14px !important;
  font-weight: 700 !important;
  white-space: nowrap !important;
}

:deep(.village-tooltip::before) {
  border-top-color: rgb(249 250 251) !important;
}

@media (prefers-color-scheme: dark) {
  :deep(.village-tooltip) {
    background: rgb(3 7 18) !important;
    color: rgb(249 250 251) !important;
    border-color: rgb(31 41 55) !important;
  }

  :deep(.village-tooltip::before) {
    border-top-color: rgb(3 7 18) !important;
  }
}
</style>
