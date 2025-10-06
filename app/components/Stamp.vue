<template>
  <div class="stamp-wrapper">
    <img src="/stamp-text.png" alt="" class="stamp-text" aria-hidden="true" draggable="false">
    <img src="/stamp-logo.png" alt="" class="stamp-logo" aria-hidden="true" draggable="false">
  </div>
</template>

<style scoped>
.stamp-wrapper {
  margin: 2rem auto;
  width: 152px;
  cursor: pointer;
  opacity: 0.3;
  position: relative;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
}

.stamp-text,
.stamp-logo {
  display: block;
  width: 100%;
  filter: invert(1) brightness(0.8);
  user-select: none;
  pointer-events: none;
}

.stamp-text {
  animation: rotate-loop 20s linear infinite;
}

.stamp-logo {
  position: absolute;
  top: 0;
  left: 0;
  transform: rotate(15deg);
  transition: transform 0.2s;
}

.stamp-wrapper:hover .stamp-logo {
  transform: rotate(0);
}

@keyframes rotate-loop {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

@media (prefers-color-scheme: dark) {

  .stamp-text,
  .stamp-logo {
    filter: invert(0) brightness(0.8);
  }
}
</style>
