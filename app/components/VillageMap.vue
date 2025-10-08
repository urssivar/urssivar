<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { LMap, LImageOverlay, LMarker, LIcon } from '@vue-leaflet/vue-leaflet';
import 'leaflet/dist/leaflet.css';
import villages from '~/data/villages.json';
import type { LatLngBoundsExpression } from 'leaflet';

const villageBounds = computed<LatLngBoundsExpression>(() => {
  const lats = villages.map(v => v.lat);
  const lngs = villages.map(v => v.lng);
  return [
    [Math.min(...lats), Math.min(...lngs)],
    [Math.max(...lats), Math.max(...lngs)],
  ];
});

const imageBounds = computed<LatLngBoundsExpression>(() => {
  const MAP_EXPORT_BOUNDS = {
    minLng: 47.2754,
    maxLng: 48.2753,
    minLat: 41.8747,
    maxLat: 42.2207,
  } as const;

  return [
    [MAP_EXPORT_BOUNDS.minLat, MAP_EXPORT_BOUNDS.minLng],
    [MAP_EXPORT_BOUNDS.maxLat, MAP_EXPORT_BOUNDS.maxLng],
  ];
});

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
const selectedVillage = ref<string>('');
const markerElement = ref<HTMLElement>();
const markerRefs = ref<HTMLElement[]>([]);

function selectVillage(index: number) {
  const marker = markerRefs.value[index];
  if (!marker) return false;

  deselectVillage();

  selectedVillage.value = villages[index]!.name;
  tooltipOpen.value = true;
  markerElement.value = marker;

  (marker.firstChild?.firstChild as HTMLElement)
    ?.classList.add('scale-150');
  return true;
}

function deselectVillage() {
  tooltipOpen.value = false;
  (markerElement.value?.firstChild?.firstChild as HTMLElement)
    ?.classList.remove('scale-150');
}

let autoHoverTimer: ReturnType<typeof setTimeout> | null = null;

function scheduleAutoHover() {
  const AUTO_HOVER_DURATION = 3000;
  const AUTO_HOVER_INTERVAL = 2000;

  autoHoverTimer = setTimeout(() => {
    const i = Math.floor(Math.random() * villages.length);

    if (selectVillage(i)) {
      autoHoverTimer = setTimeout(() => {
        deselectVillage();
        scheduleAutoHover();
      }, AUTO_HOVER_DURATION);
    } else {
      scheduleAutoHover();
    }
  }, AUTO_HOVER_INTERVAL);
}

function pauseAutoHover() {
  if (autoHoverTimer) {
    clearTimeout(autoHoverTimer);
    autoHoverTimer = null;
  }
}

onBeforeUnmount(() => {
  pauseAutoHover();
});
</script>

<template>
  <UTooltip :open="tooltipOpen" :text="selectedVillage ?? ''" arrow :reference="markerElement" :content="{
    side: 'top',
  }" class="font-bold text-sm" />
  <div class="my-16 relative h-[15rem] sm:h-[30rem] overflow-x-clip">
    <ClientOnly>
      <Transition name="fade" appear>
        <LMap :options="mapOptions" :use-global-leaflet="false"
          class="absolute left-1/2 -translate-x-1/2 w-screen h-full" @ready="(mapInstance: any) => {
            mapInstance.fitBounds(villageBounds); scheduleAutoHover();
          }">
          <LImageOverlay url="/map.webp" :bounds="imageBounds" :opacity="1" class-name="map-backdrop-image" />
          <LMarker v-for="(village, i) in villages" :key="village.name" :lat-lng="[village.lat, village.lng]"
            @ready="(marker: any) => markerRefs[i] = marker._icon"
            @mouseover="() => { pauseAutoHover(); selectVillage(i); }"
            @mouseout="() => { deselectVillage(); scheduleAutoHover(); }">
            <LIcon>
              <div class="w-full h-full flex items-center justify-center">
                <div
                  class="village-dot w-3 h-3 rounded-full border-2 cursor-pointer transition-all ease-out border-white dark:border-gray-950 bg-blue-600 dark:bg-blue-400 hover:scale-150" />
              </div>
            </LIcon>
          </LMarker>
        </LMap>
      </Transition>
    </ClientOnly>
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

/* Fade transition */
.fade-enter-active {
  transition: opacity 0.3s ease-out;
}

.fade-enter-from {
  opacity: 0;
}
</style>
