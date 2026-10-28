<script setup lang="ts">
withDefaults(defineProps<{ tone?: 'ink' | 'paper' }>(), { tone: 'ink' })
</script>

<template>
  <div class="phone" :class="`phone--${tone}`">
    <div class="phone__screen">
      <div class="phone__island" aria-hidden="true" />
      <slot />
    </div>
  </div>
</template>

<style scoped>
.phone {
  position: relative;
  aspect-ratio: 9 / 19;
  border-radius: 2.6rem;
  padding: 0.55rem;
  background: linear-gradient(145deg, #2a2f39, #0c0e12 45%, #1d2129);
  box-shadow:
    0 0 0 1px rgb(255 255 255 / 0.06) inset,
    0 1px 0 1px rgb(255 255 255 / 0.08) inset,
    0 40px 80px -30px rgb(12 14 18 / 0.55),
    0 18px 30px -18px rgb(12 14 18 / 0.5);
}
.phone__screen {
  position: relative;
  height: 100%;
  overflow: hidden;
  border-radius: 2.1rem;
  container-type: inline-size;
}
.phone--ink .phone__screen {
  background: #0f1217;
  color: var(--color-paper);
}
.phone--paper .phone__screen {
  background: #f7f6f2;
  color: var(--color-ink);
}
.phone__island {
  position: absolute;
  z-index: 5;
  top: 0.6rem;
  left: 50%;
  width: 30%;
  height: 1.35rem;
  transform: translateX(-50%);
  border-radius: 999px;
  background: #000;
}
</style>
