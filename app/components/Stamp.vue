<template>
  <div class="stamp-wrapper">
    <img src="/stamp.png" alt="" class="stamp" aria-hidden="true" draggable="false">
  </div>
</template>

<style scoped>
.stamp-wrapper {
  margin: auto;
  width: 10%;
  transition: 0.2s;
  cursor: pointer;
  opacity: 0.3;
  transform: rotate(15deg);

  &:hover {
    transform: rotate(0);
    opacity: 1;
  }
}

.stamp {
  display: block;
  width: 100%;
  filter: invert(1) brightness(0.8);
  user-select: none;
  pointer-events: none;
}

@media (prefers-color-scheme: dark) {
  .stamp {
    filter: invert(0) brightness(0.8);
  }
}
</style>
