<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import villages from '~/data/villages.json';

interface Village {
  name: string;
  lat: number;
  lng: number;
}

type VillageMarker = Village & { x: number; y: number };

const activeVillage = ref<VillageMarker | null>(null);
const isManualHover = ref(false);
const tooltipPos = ref({ x: 0, y: 0 });

const mapDimensions = computed(() => {
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
    scale
  };
});

const villageMarkers = computed<VillageMarker[]>(() => {
  const { maxLat, minLng, scale } = mapDimensions.value;
  return villages.map(village => ({
    ...village,
    x: ((village.lng - minLng) / scale) * 100,
    y: ((maxLat - village.lat) / scale) * 100
  }));
});

function updateTooltipPosition(svgX: number, svgY: number) {
  const container = document.querySelector('.markers-container') as HTMLElement;
  const svg = container?.querySelector('.village-markers') as SVGSVGElement;
  if (!svg || !container) return;

  const rect = container.getBoundingClientRect();
  const point = svg.createSVGPoint();
  point.x = svgX;
  point.y = svgY;

  const ctm = svg.getScreenCTM();
  if (!ctm) return;

  const screenPoint = point.matrixTransform(ctm);
  tooltipPos.value = {
    x: screenPoint.x - rect.left,
    y: screenPoint.y - rect.top
  };
}

function startAutoHover() {
  const AUTO_HOVER_DURATION = 1800;
  const AUTO_HOVER_INTERVAL = 2500;

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
    }, AUTO_HOVER_DURATION);
  };

  setInterval(autoHover, AUTO_HOVER_INTERVAL);
}

onMounted(() => {
  startAutoHover();
});

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
    <svg :viewBox="`-5 -5 ${mapDimensions.width + 10} ${mapDimensions.height + 10}`" preserveAspectRatio="xMidYMid meet"
      class="map-backdrop">
      <image href="/map.svg" x="-100.18" y="-26.04" width="300.3" height="103.9" preserveAspectRatio="none" />
    </svg>

    <div class="markers-container">
      <svg :viewBox="`-5 -5 ${mapDimensions.width + 10} ${mapDimensions.height + 10}`" preserveAspectRatio="xMidYMid meet"
        class="village-markers">
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

.map-backdrop {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 100vw;
  height: 100%;
  top: 0;
  z-index: 0;
  filter: invert(0);
}

@media (prefers-color-scheme: dark) {
  .map-backdrop {
    filter: invert(1);
  }
}

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

.village-hitbox {
  r: 1.5;
  fill: transparent;
  cursor: pointer;
}

.village-point {
  r: 0.5;
  fill: #0066cc;
  stroke: #ffffff;
  stroke-width: 0.75;
  paint-order: stroke;
  pointer-events: none;
  transition: r 0.2s, stroke-width 0.2s;
}

@media (prefers-color-scheme: dark) {
  .village-point {
    fill: #7eb3ff;
    stroke: #1a1a1a;
  }
}

g:hover .village-point,
.village-point.hovered {
  r: 1.2;
}

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
