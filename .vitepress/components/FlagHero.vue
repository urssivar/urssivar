<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import {
  WebGLRenderer,
  Scene,
  OrthographicCamera,
  PlaneGeometry,
  ShaderMaterial,
  Mesh,
  TextureLoader,
  LinearMipMapLinearFilter,
  LinearFilter,
  Clock,
} from "three";
import vertexShader from "@/shaders/flag.vert.glsl?raw";
import fragmentShader from "@/shaders/flag.frag.glsl?raw";

const props = defineProps<{ texture: string }>();

const containerRef = ref<HTMLElement>();
const ready = ref(false);

let renderer: WebGLRenderer | null = null;
let animationId = 0;
let resizeObserver: ResizeObserver | null = null;
let clock: Clock | null = null;
let material: ShaderMaterial | null = null;
let reducedMotion = false;
let paused = false;

const scene = new Scene();
const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);

function render() {
  if (!renderer || !material || paused) return;
  material.uniforms.uTime.value = clock!.getElapsedTime();
  renderer.render(scene, camera);
  if (!reducedMotion) animationId = requestAnimationFrame(render);
}

function handleResize() {
  if (!renderer || !containerRef.value || !material) return;
  const { clientWidth: w, clientHeight: h } = containerRef.value;
  if (w === 0 || h === 0) return;
  renderer.setSize(w, h);
  material.uniforms.uCanvasAspect.value = w / h;
}

function onVisibilityChange() {
  paused = document.hidden;
  if (!paused && !reducedMotion) render();
}

onMounted(async () => {
  await nextTick();
  if (!containerRef.value) return;

  reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  renderer = new WebGLRenderer({ antialias: true, alpha: true });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(window.devicePixelRatio);
  containerRef.value.appendChild(renderer.domElement);
  renderer.domElement.classList.add("absolute", "inset-0", "w-full", "h-full");

  const tex = new TextureLoader().load(props.texture, (t) => {
    material!.uniforms.uTexAspect.value = t.image.width / t.image.height;
  });
  tex.minFilter = LinearMipMapLinearFilter;
  tex.magFilter = LinearFilter;
  tex.generateMipmaps = true;

  material = new ShaderMaterial({
    vertexShader,
    fragmentShader,
    transparent: true,
    uniforms: {
      uTime: { value: 0 },
      uTexture: { value: tex },
      uTexAspect: { value: 1.5 },
      uCanvasAspect: { value: 1.0 },
    },
  });

  const mesh = new Mesh(new PlaneGeometry(2, 2, 80, 60), material);
  scene.add(mesh);

  clock = new Clock();
  handleResize();
  ready.value = true;
  render();

  resizeObserver = new ResizeObserver(handleResize);
  resizeObserver.observe(containerRef.value);
  document.addEventListener("visibilitychange", onVisibilityChange);
});

onUnmounted(() => {
  cancelAnimationFrame(animationId);
  resizeObserver?.disconnect();
  document.removeEventListener("visibilitychange", onVisibilityChange);
  renderer?.dispose();
  material?.dispose();
  renderer = null;
});
</script>

<template>
  <div ref="containerRef" class="breakout bg-transparent p-0 relative h-60 sm:h-60 overflow-hidden">
    <div v-if="!ready" class="absolute inset-0" />
  </div>
</template>

<style scoped>
:deep(canvas) {
  animation: fadeIn 500ms ease-out forwards;
}
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@media print { :deep(canvas) { display: none; } }
</style>
