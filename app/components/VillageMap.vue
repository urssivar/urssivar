<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import villages from '~/data/villages.json';

// ============================================================================
// TYPES
// ============================================================================

interface Village {
  name: string;
  lat: number;
  lng: number;
}

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
// LEAFLET MAP SETUP
// ============================================================================

const mapContainer = ref<HTMLElement | null>(null);
let map: L.Map | null = null;
let markers: L.CircleMarker[] = [];
let autoHoverInterval: ReturnType<typeof setInterval> | null = null;
let autoHoverTimeout: ReturnType<typeof setTimeout> | null = null;
let isManualHover = false;

onMounted(() => {
  if (!mapContainer.value) return;

  // Calculate bounds from villages
  const bounds = L.latLngBounds(
    villages.map(v => [v.lat, v.lng] as [number, number])
  );

  // Initialize map with no interactivity
  map = L.map(mapContainer.value, {
    zoomControl: false,
    dragging: false,
    touchZoom: false,
    scrollWheelZoom: false,
    doubleClickZoom: false,
    boxZoom: false,
    keyboard: false,
    attributionControl: false,
  });

  // Fit to village bounds with padding
  map.fitBounds(bounds, { padding: [50, 50] });

  // Add backdrop image overlay
  L.imageOverlay('/map.png', [
    [MAP_EXPORT_BOUNDS.minLat, MAP_EXPORT_BOUNDS.minLng],
    [MAP_EXPORT_BOUNDS.maxLat, MAP_EXPORT_BOUNDS.maxLng],
  ], {
    opacity: 1,
    className: 'map-backdrop-image',
  }).addTo(map);

  // Add village markers
  villages.forEach((village: Village) => {
    const marker = L.circleMarker([village.lat, village.lng], {
      radius: 6,
      fillColor: '#dc2626',
      color: '#ffffff',
      weight: 2,
      fillOpacity: 1,
      className: 'village-marker',
    });

    marker.bindTooltip(village.name, {
      permanent: false,
      direction: 'top',
      offset: [0, -10],
      className: 'village-tooltip',
    });

    marker.on('mouseover', () => {
      isManualHover = true;
      marker.setStyle({ radius: 9 });
    });

    marker.on('mouseout', () => {
      isManualHover = false;
      marker.setStyle({ radius: 6 });
    });

    marker.addTo(map!);
    markers.push(marker);
  });

  // Start auto-hover animation
  startAutoHover();
});

onBeforeUnmount(() => {
  if (autoHoverInterval) clearInterval(autoHoverInterval);
  if (autoHoverTimeout) clearTimeout(autoHoverTimeout);
  if (map) map.remove();
});

// ============================================================================
// AUTO-HOVER ANIMATION
// ============================================================================

function startAutoHover() {
  const autoHover = () => {
    if (isManualHover || markers.length === 0) return;

    const randomIndex = Math.floor(Math.random() * markers.length);
    const marker = markers[randomIndex];
    if (!marker) return;

    marker.openTooltip();
    marker.setStyle({ radius: 9 });

    autoHoverTimeout = setTimeout(() => {
      if (!isManualHover) {
        marker.closeTooltip();
        marker.setStyle({ radius: 6 });
      }
    }, AUTO_HOVER.DURATION);
  };

  autoHoverInterval = setInterval(autoHover, AUTO_HOVER.INTERVAL);
}
</script>

<template>
  <div class="village-map">
    <div ref="mapContainer" class="map-container"></div>
  </div>
</template>

<style scoped>
.village-map {
  margin: 3rem 0;
  position: relative;
  width: 100%;
  height: 600px;
  max-width: 65ch;
  margin-left: auto;
  margin-right: auto;
  padding: 0 1rem;
}

.map-container {
  width: 100%;
  height: 100%;
  filter: brightness(0.8);
}

@media (prefers-color-scheme: dark) {
  .map-container {
    filter: invert(1) brightness(0.8);
  }
}

/* Override Leaflet default styles */
:deep(.leaflet-container) {
  background: transparent;
}

:deep(.map-backdrop-image) {
  /* Ensure the backdrop is behind markers */
  z-index: 1;
}

:deep(.village-marker) {
  z-index: 1000;
  transition: all 0.2s;
  cursor: pointer;
}

@media (prefers-color-scheme: dark) {
  :deep(.village-marker) {
    fill: #fca5a5 !important;
    stroke: #1a1a1a !important;
  }
}

/* Tooltip styling to match original design */
:deep(.village-tooltip) {
  background: #333333 !important;
  color: #ffffff !important;
  border: none !important;
  padding: 0.25rem 0.5rem !important;
  font-size: 0.875rem !important;
  font-weight: bold !important;
  white-space: nowrap !important;
  box-shadow: none !important;
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
