<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { LMap, LImageOverlay, LCircleMarker, LTooltip } from '@vue-leaflet/vue-leaflet';
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

const markerOptions = {
  fillColor: '#dc2626',
  color: '#ffffff',
  weight: 2,
  fillOpacity: 1,
  className: 'village-marker',
};

const tooltipOptions = {
  permanent: false,
  direction: 'top' as const,
  offset: [0, -10] as [number, number],
  className: 'village-tooltip',
};

// ============================================================================
// HOVER & AUTO-HOVER STATE
// ============================================================================

const activeVillageIndex = ref<number | null>(null);
const isManualHover = ref(false);
const markerRefs = ref<any[]>([]);

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

function getMarkerRadius(index: number) {
  return activeVillageIndex.value === index ? 9 : 6;
}

// ============================================================================
// AUTO-HOVER ANIMATION
// ============================================================================

function startAutoHover() {
  const autoHover = () => {
    if (isManualHover.value || markerRefs.value.length === 0) return;

    const randomIndex = Math.floor(Math.random() * markerRefs.value.length);
    const markerRef = markerRefs.value[randomIndex];
    if (!markerRef?.leafletObject) return;

    activeVillageIndex.value = randomIndex;
    markerRef.leafletObject.openTooltip();

    autoHoverTimeout = setTimeout(() => {
      if (!isManualHover.value) {
        activeVillageIndex.value = null;
        markerRef.leafletObject.closeTooltip();
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
  <div class="village-map">
    <LMap
      :zoom="8"
      :center="mapCenter"
      :options="mapOptions"
      :use-global-leaflet="false"
      class="map-container"
      @ready="(mapInstance: any) => mapInstance.fitBounds(villageBounds, { padding: [50, 50] })"
    >
      <LImageOverlay
        url="/map.png"
        :bounds="imageBounds"
        :opacity="1"
        class-name="map-backdrop-image"
      />

      <LCircleMarker
        v-for="(village, index) in villages"
        :key="village.name"
        :ref="(el: any) => markerRefs[index] = el"
        :lat-lng="[village.lat, village.lng]"
        :radius="getMarkerRadius(index)"
        :fill-color="markerOptions.fillColor"
        :color="markerOptions.color"
        :weight="markerOptions.weight"
        :fill-opacity="markerOptions.fillOpacity"
        @mouseover="handleMouseOver(index)"
        @mouseout="handleMouseOut"
      >
        <LTooltip :options="tooltipOptions">
          {{ village.name }}
        </LTooltip>
      </LCircleMarker>
    </LMap>
  </div>
</template>

<style scoped>
.village-map {
  margin: 3rem 0;
  position: relative;
  height: 350px;
  overflow-x: clip;
}

@media (min-width: 768px) {
  .village-map {
    height: 475px;
  }
}

.map-container {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 100vw;
  height: 100%;
}

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

:deep(.village-marker) {
  z-index: 1000;
  transition: all 0.2s;
  cursor: pointer;
}

/* Tooltip styling to match original design */
:deep(.village-tooltip) {
  background: #333333 !important;
  color: #ffffff !important;
  border: none !important;
  border-radius: 0 !important;
  padding: 0.25rem 0.5rem !important;
  font-size: 0.875rem !important;
  font-weight: bold !important;
  white-space: nowrap !important;
  box-shadow: none !important;
  opacity: 1 !important;
}

:deep(.village-tooltip::before) {
  border-top-color: #333333 !important;
}

@media (prefers-color-scheme: dark) {
  :deep(.village-tooltip) {
    background: #cccccc !important;
    color: #1a1a1a !important;
  }

  :deep(.village-tooltip::before) {
    border-top-color: #cccccc !important;
  }
}
</style>
