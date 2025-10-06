<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

interface Village {
  name: string
  lat: number
  lng: number
}

type NormalizedVillage = Village & { x: number; y: number }

const villages = ref<Village[]>([])
const hoveredVillage = ref<NormalizedVillage | null>(null)
const tooltipPos = ref({ x: 0, y: 0 })

const mapDimensions = computed(() => {
  if (villages.value.length === 0) {
    return { width: 100, height: 100, minLat: 0, maxLat: 0, minLng: 0, scale: 1 }
  }

  const lats = villages.value.map(v => v.lat)
  const lngs = villages.value.map(v => v.lng)
  const minLat = Math.min(...lats)
  const maxLat = Math.max(...lats)
  const minLng = Math.min(...lngs)
  const maxLng = Math.max(...lngs)
  const latRange = maxLat - minLat
  const lngRange = maxLng - minLng
  const scale = Math.max(latRange, lngRange)

  return {
    width: (lngRange / scale) * 100,
    height: (latRange / scale) * 100,
    minLat,
    maxLat,
    minLng,
    scale
  }
})

const normalizedVillages = computed<NormalizedVillage[]>(() => {
  if (villages.value.length === 0) return []
  const { minLat, maxLat, minLng, scale } = mapDimensions.value

  return villages.value.map(village => ({
    ...village,
    x: ((village.lng - minLng) / scale) * 100,
    y: ((maxLat - village.lat) / scale) * 100
  }))
})

onMounted(async () => {
  try {
    const response = await fetch('/villages.csv')
    const text = await response.text()
    const lines = text.trim().split('\n').slice(1)

    villages.value = lines
      .map(line => {
        const [name, lat, lng] = line.split(',')
        if (!name || !lat || !lng) return null
        return { name: name.trim(), lat: parseFloat(lat), lng: parseFloat(lng) }
      })
      .filter((v): v is Village => v !== null)
  } catch (error) {
    console.error('Failed to load villages:', error)
  }
})

function handleMouseEnter(event: MouseEvent, village: NormalizedVillage) {
  const group = event.currentTarget as SVGGElement
  const svg = group.ownerSVGElement
  const ctm = svg?.getScreenCTM()
  if (!svg || !ctm) return

  const point = svg.createSVGPoint()
  const bbox = group.getBBox()
  point.x = bbox.x + bbox.width / 2
  point.y = bbox.y

  const screenPoint = point.matrixTransform(ctm)
  tooltipPos.value = { x: screenPoint.x, y: screenPoint.y }
  hoveredVillage.value = village
}

function handleMouseLeave() {
  hoveredVillage.value = null
}
</script>

<template>
  <div class="village-map">
    <svg :viewBox="`-5 -5 ${mapDimensions.width + 10} ${mapDimensions.height + 10}`" preserveAspectRatio="xMidYMid meet">
      <g v-for="village in normalizedVillages" :key="village.name" @mouseenter="(e) => handleMouseEnter(e, village)"
        @mouseleave="handleMouseLeave">
        <circle :cx="village.x" :cy="village.y" r="1.6" class="village-hitbox" />
        <circle :cx="village.x" :cy="village.y" r="0.8" class="village-point" />
      </g>
    </svg>

    <Transition name="fade">
      <div v-if="hoveredVillage" class="village-tooltip"
        :style="{ left: `${tooltipPos.x}px`, top: `${tooltipPos.y}px` }">
        {{ hoveredVillage.name }}
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.village-map {
  position: relative;
  margin-top: 7rem;
}

svg {
  width: 100%;
  height: auto;
}

.village-hitbox {
  fill: transparent;
  cursor: pointer;
}

.village-point {
  fill: currentColor;
  opacity: 0.3;
  pointer-events: none;
  transition: 0.2s;
}

g:hover .village-point {
  opacity: 1;
  r: 1.2
}

.village-tooltip {
  position: fixed;
  pointer-events: none;
  background: rgba(0, 0, 0, 0.75);
  color: #fff;
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  white-space: nowrap;
  transform: translate(-50%, -100%) translateY(-4px);
  z-index: 1000;
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
