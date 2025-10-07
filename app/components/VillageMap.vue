<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import villages from '~/data/villages.json';

// ============================================================================
// TYPES
// ============================================================================

interface Village {
  name: string;
  lat: number;
  lng: number;
}

interface VillageMarker extends Village {
  x: number;
  y: number;
}

interface MapDimensions {
  width: number;
  height: number;
  minLat: number;
  maxLat: number;
  minLng: number;
  maxLng: number;
  scale: number;
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

/** SVG coordinate space padding (adds breathing space inside the map) */
const VIEWBOX_PADDING = 15;

// ============================================================================
// COORDINATE SYSTEM
// ============================================================================

/**
 * Calculate village bounds and coordinate system scale
 *
 * The coordinate system is normalized so that the larger dimension
 * (longitude or latitude range) equals 100 units in SVG space.
 */
const mapDimensions = computed<MapDimensions>(() => {
  if (villages.length === 0) {
    return { width: 100, height: 100, minLat: 0, maxLat: 0, minLng: 0, maxLng: 0, scale: 1 };
  }

  const lats = villages.map(v => v.lat);
  const lngs = villages.map(v => v.lng);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);

  const latRange = maxLat - minLat;
  const lngRange = maxLng - minLng;
  const scale = Math.max(latRange, lngRange) || 1;

  return {
    width: (lngRange / scale) * 100,
    height: (latRange / scale) * 100,
    minLat,
    maxLat,
    minLng,
    maxLng,
    scale,
  };
});

/**
 * Calculate backdrop positioning based on map export bounds
 *
 * Aligns the QGIS exported map image with the village coordinate system.
 */
const backdropPosition = computed(() => {
  const { minLng, maxLat, scale } = mapDimensions.value;
  const { minLng: mapMinLng, maxLng: mapMaxLng, minLat: mapMinLat, maxLat: mapMaxLat } = MAP_EXPORT_BOUNDS;

  const width = ((mapMaxLng - mapMinLng) / scale) * 100;
  const height = ((mapMaxLat - mapMinLat) / scale) * 100;
  const x = -((minLng - mapMinLng) / scale) * 100;
  const y = -((mapMaxLat - maxLat) / scale) * 100;

  return { x, y, width, height };
});

/**
 * Convert village lat/lng coordinates to SVG coordinate space
 */
const villageMarkers = computed<VillageMarker[]>(() => {
  const { maxLat, minLng, scale } = mapDimensions.value;

  return villages.map(village => ({
    ...village,
    x: ((village.lng - minLng) / scale) * 100,
    y: ((maxLat - village.lat) / scale) * 100,
  }));
});

// ============================================================================
// HOVER & TOOLTIP STATE
// ============================================================================

const activeVillage = ref<VillageMarker | null>(null);
const isManualHover = ref(false);
const tooltipPos = ref({ x: 0, y: 0 });

const markersContainer = ref<HTMLElement | null>(null);
const markersSvg = ref<SVGSVGElement | null>(null);

/**
 * Update tooltip position based on SVG coordinates
 */
function updateTooltipPosition(svgX: number, svgY: number) {
  if (!markersSvg.value || !markersContainer.value) return;

  const rect = markersContainer.value.getBoundingClientRect();
  const point = markersSvg.value.createSVGPoint();
  point.x = svgX;
  point.y = svgY;

  const ctm = markersSvg.value.getScreenCTM();
  if (!ctm) return;

  const screenPoint = point.matrixTransform(ctm);
  tooltipPos.value = {
    x: screenPoint.x - rect.left,
    y: screenPoint.y - rect.top,
  };
}

// ============================================================================
// AUTO-HOVER ANIMATION
// ============================================================================

function startAutoHover() {
  const autoHover = () => {
    if (isManualHover.value || villageMarkers.value.length === 0) return;

    const randomIndex = Math.floor(Math.random() * villageMarkers.value.length);
    const village = villageMarkers.value[randomIndex];
    if (!village) return;

    activeVillage.value = village;
    updateTooltipPosition(village.x, village.y);

    setTimeout(() => {
      if (!isManualHover.value) {
        activeVillage.value = null;
      }
    }, AUTO_HOVER.DURATION);
  };

  setInterval(autoHover, AUTO_HOVER.INTERVAL);
}

onMounted(() => {
  startAutoHover();
});

// ============================================================================
// INTERACTION HANDLERS
// ============================================================================

function handleMouseEnter(village: VillageMarker) {
  isManualHover.value = true;
  activeVillage.value = village;
  updateTooltipPosition(village.x, village.y);
}

function handleMouseLeave() {
  isManualHover.value = false;
  activeVillage.value = null;
}
</script>

<template>
  <div class="village-map">
    <!-- Backdrop layer: Full-width QGIS map -->
    <svg
      :viewBox="`${-VIEWBOX_PADDING} ${-VIEWBOX_PADDING} ${mapDimensions.width + VIEWBOX_PADDING * 2} ${mapDimensions.height + VIEWBOX_PADDING * 2}`"
      preserveAspectRatio="xMidYMid meet" class="map-backdrop">
      <image href="/map.png" :x="backdropPosition.x" :y="backdropPosition.y" :width="backdropPosition.width"
        :height="backdropPosition.height" preserveAspectRatio="none" />
    </svg>

    <!-- Markers layer: Village dots constrained to reading column -->
    <div ref="markersContainer" class="markers-container">
      <svg ref="markersSvg"
        :viewBox="`${-VIEWBOX_PADDING} ${-VIEWBOX_PADDING} ${mapDimensions.width + VIEWBOX_PADDING * 2} ${mapDimensions.height + VIEWBOX_PADDING * 2}`"
        preserveAspectRatio="xMidYMid meet" class="village-markers">
        <g v-for="village in villageMarkers" :key="village.name" @mouseenter="handleMouseEnter(village)"
          @mouseleave="handleMouseLeave">
          <circle :cx="village.x" :cy="village.y" class="village-hitbox" />
          <circle :cx="village.x" :cy="village.y" class="village-point"
            :class="{ hovered: activeVillage?.name === village.name }" />
        </g>
      </svg>

      <Transition name="fade">
        <div v-if="activeVillage" class="village-tooltip"
          :style="{ left: `${tooltipPos.x}px`, top: `${tooltipPos.y}px` }">
          {{ activeVillage.name }}
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.village-map {
  margin: 3rem 0;
  position: relative;
  overflow-x: clip;
}

/* Backdrop layer: Full-width map bleeding edge-to-edge */
.map-backdrop {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 100vw;
  height: 100%;
  top: 0;
  box-sizing: border-box;
  z-index: 0;
  filter: invert(0) brightness(0.8);
}

@media (prefers-color-scheme: dark) {
  .map-backdrop {
    filter: invert(1) brightness(0.8);
  }
}

/* Markers layer: Constrained to reading column */
.markers-container {
  max-width: 65ch;
  margin: 0 auto;
  padding: 0 1rem;
  position: relative;
  z-index: 1;
}

.village-markers {
  width: 100%;
  height: auto;
}

/* Village marker styles */
.village-hitbox {
  r: 1.5;
  fill: transparent;
  cursor: pointer;
}

.village-point {
  r: 0.75;
  fill: #dc2626;
  stroke: #ffffff;
  stroke-width: 0.75;
  paint-order: stroke;
  pointer-events: none;
  transition: r 0.2s, stroke-width 0.2s;
}

@media (prefers-color-scheme: dark) {
  .village-point {
    fill: #fca5a5;
    stroke: #1a1a1a;
  }
}

g:hover .village-point,
.village-point.hovered {
  r: 1.2;
}

/* Tooltip */
.village-tooltip {
  position: absolute;
  pointer-events: none;
  background: #333333;
  color: #ffffff;
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  font-weight: bold;
  white-space: nowrap;
  transform: translate(-50%, -100%) translateY(-12px);
  z-index: 1000;
}

@media (prefers-color-scheme: dark) {
  .village-tooltip {
    background: #cccccc;
    color: #1a1a1a;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
