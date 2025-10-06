<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';

interface Village {
  name: string;
  lat: number;
  lng: number;
}

type NormalizedVillage = Village & { x: number; y: number };

const { data: csvText } = await useFetch('/villages.csv', {
  transform: (data) => data as string
});

const villages = computed<Village[]>(() => {
  if (!csvText.value) return [];
  const lines = csvText.value.trim().split('\n').slice(1);
  return lines
    .map(line => {
      const [name, lat, lng] = line.split(',');
      if (!name || !lat || !lng) return null;
      return { name: name.trim(), lat: parseFloat(lat), lng: parseFloat(lng) };
    })
    .filter((v): v is Village => v !== null);
});

const activeVillage = ref<NormalizedVillage | null>(null);
const isManualHover = ref(false);
const tooltipPos = ref({ x: 0, y: 0 });

const mapDimensions = computed(() => {
  const lats = villages.value.map(v => v.lat);
  const lngs = villages.value.map(v => v.lng);
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

const villageMarkers = computed<NormalizedVillage[]>(() => {
  const { maxLat, minLng, scale } = mapDimensions.value;
  return villages.value.map(village => ({
    ...village,
    x: ((village.lng - minLng) / scale) * 100,
    y: ((maxLat - village.lat) / scale) * 100
  }));
});

function updateTooltipPosition(svgX: number, svgY: number) {
  const mapEl = document.querySelector('.village-map') as HTMLElement;
  const svg = mapEl?.querySelector('svg') as SVGSVGElement;
  if (!svg || !mapEl) return;

  const rect = mapEl.getBoundingClientRect();
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

function handleMouseEnter(village: NormalizedVillage) {
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
    <svg :viewBox="`-5 -5 ${mapDimensions.width + 10} ${mapDimensions.height + 10}`"
      preserveAspectRatio="xMidYMid meet">
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
</template>

<style scoped>
.village-map {
  position: relative;
}

svg {
  width: 100%;
  height: auto;
}

.village-hitbox {
  r: 1.5;
  fill: transparent;
  cursor: pointer;
}

.village-point {
  r: 0.4;
  fill: currentColor;
  pointer-events: none;
  transition: r 0.2s;
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
