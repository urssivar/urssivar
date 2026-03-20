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
  Vector2,
} from "three";
import vertexShader from "@/shaders/flag.vert.glsl?raw";
import fragmentShader from "@/shaders/flag.frag.glsl?raw";

const props = defineProps<{ texture: string }>();

const containerRef = ref<HTMLElement>();

let renderer: WebGLRenderer | null = null;
let animationId = 0;
let resizeObserver: ResizeObserver | null = null;
let startTime = 0;
let material: ShaderMaterial | null = null;
let geometry: PlaneGeometry | null = null;
let scene: Scene | null = null;
let camera: OrthographicCamera | null = null;
let reducedMotion = false;
let paused = false;

function render() {
  if (!renderer || !material || !scene || !camera || paused) return;
  material.uniforms.uTime.value = (performance.now() - startTime) / 1000;
  renderer.render(scene, camera);
  if (!reducedMotion) {
    cancelAnimationFrame(animationId);
    animationId = requestAnimationFrame(render);
  }
}

function handleResize() {
  if (!renderer || !containerRef.value || !material) return;
  const { clientWidth: w, clientHeight: h } = containerRef.value;
  if (w === 0 || h === 0) return;
  renderer.setSize(w, h);
  material.uniforms.uCanvasAspect.value = w / h;
  if (reducedMotion) render();
}

function onContextLost(e: Event) {
  e.preventDefault();
  cancelAnimationFrame(animationId);
  paused = true;
}

function onContextRestored() {
  paused = false;
  startTime = performance.now();
  render();
}

function onVisibilityChange() {
  paused = document.hidden;
  if (!paused && !reducedMotion) render();
}

onMounted(async () => {
  await nextTick();
  if (!containerRef.value) return;

  reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  scene = new Scene();
  camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);

  renderer = new WebGLRenderer({ antialias: false, alpha: true });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  containerRef.value.appendChild(renderer.domElement);
  renderer.domElement.classList.add("absolute", "inset-0", "w-full", "h-full");

  const tex = new TextureLoader().load(
    props.texture,
    (t) => {
      material!.uniforms.uTexAspect.value = t.image.width / t.image.height;
    },
    undefined,
    () => {
      if (renderer) renderer.domElement.style.display = "none";
    },
  );
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
      uTexAspect: { value: 2.0 },
      uCanvasAspect: { value: 1.0 },
      uScale: { value: new Vector2(2.8, 4.5) },
    },
  });

  geometry = new PlaneGeometry(2, 2, 50, 50);
  const mesh = new Mesh(geometry, material);
  mesh.scale.set(1.2, 2.0, 1);
  scene!.add(mesh);

  startTime = performance.now();
  handleResize();
  render();

  resizeObserver = new ResizeObserver(handleResize);
  resizeObserver.observe(containerRef.value);
  document.addEventListener("visibilitychange", onVisibilityChange);
  renderer.domElement.addEventListener("webglcontextlost", onContextLost);
  renderer.domElement.addEventListener("webglcontextrestored", onContextRestored);
});

onUnmounted(() => {
  cancelAnimationFrame(animationId);
  resizeObserver?.disconnect();
  document.removeEventListener("visibilitychange", onVisibilityChange);
  renderer?.domElement.removeEventListener("webglcontextlost", onContextLost);
  renderer?.domElement.removeEventListener("webglcontextrestored", onContextRestored);
  material?.uniforms.uTexture.value?.dispose();
  renderer?.dispose();
  material?.dispose();
  geometry?.dispose();
  renderer = null;
  material = null;
  geometry = null;
  scene = null;
  camera = null;
});
</script>

<template>
  <div ref="containerRef" class="breakout overflow-hidden h-60 sm:h-80 relative" />
</template>

<style scoped>
:deep(canvas) {
  animation: fadeIn 500ms ease-out forwards;
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@media print {
  :deep(canvas) {
    display: none;
  }
}
</style>
