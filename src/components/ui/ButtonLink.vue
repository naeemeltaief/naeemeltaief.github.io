<script setup lang="ts">
import { computed } from 'vue'
import type { RouteLocationRaw } from 'vue-router'

const props = withDefaults(
  defineProps<{
    to?: RouteLocationRaw
    href?: string
    variant?: 'primary' | 'ghost' | 'light' | 'signal'
    size?: 'md' | 'lg'
    download?: boolean | string
    external?: boolean
  }>(),
  { variant: 'primary', size: 'md', download: undefined },
)

const tag = computed(() => (props.to ? 'RouterLink' : 'a'))
// Only pass the attributes that apply: an undefined `href` on RouterLink would override its own href.
const linkAttrs = computed(() =>
  props.to
    ? { to: props.to }
    : {
        href: props.href,
        download: props.download || undefined,
        target: props.external ? '_blank' : undefined,
        rel: props.external ? 'noopener noreferrer' : undefined,
      },
)
const classes = computed(() => [
  'btn group',
  `btn--${props.variant}`,
  props.size === 'lg' ? 'h-14 px-7 text-[1rem]' : 'h-12 px-5 text-[0.95rem]',
])
</script>

<template>
  <component
    :is="tag"
    v-bind="linkAttrs"
    :class="classes"
  >
    <slot />
  </component>
</template>

<style scoped>
.btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  border-radius: 999px;
  font-weight: 600;
  letter-spacing: -0.01em;
  white-space: nowrap;
  isolation: isolate;
  overflow: hidden;
  transition:
    transform 0.4s var(--ease-out-expo),
    background-color 0.3s,
    color 0.3s,
    border-color 0.3s;
}
.btn:active {
  transform: scale(0.97);
}
/* Fill sweeps up from the bottom on hover */
.btn::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: inherit;
  transform: translateY(101%);
  transition: transform 0.5s var(--ease-out-expo);
}
.btn:hover::before {
  transform: translateY(0);
}
.btn :deep(svg) {
  transition: transform 0.4s var(--ease-out-expo);
}
.btn:hover :deep(.arrow) {
  transform: translateX(3px);
}
.btn:hover :deep(.arrow-down) {
  transform: translateY(2px);
}

.btn--primary {
  background: var(--color-ink);
  color: var(--color-paper);
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 0.18),
    0 12px 28px -14px rgb(12 14 18 / 0.55);
}
.btn--primary::before {
  background: var(--color-signal);
}
.btn--primary:hover {
  color: var(--color-ink);
}

.btn--ghost {
  border: 1px solid rgb(255 255 255 / 0.65);
  background: linear-gradient(180deg, rgb(255 255 255 / 0.6), rgb(255 255 255 / 0.28));
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 0.95),
    0 10px 24px -14px rgb(12 14 18 / 0.3);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  backdrop-filter: blur(16px) saturate(180%);
  color: var(--color-ink);
}
.btn--ghost::before {
  background: var(--color-ink);
}
.btn--ghost:hover {
  color: var(--color-paper);
  border-color: var(--color-ink);
}

.btn--light {
  border: 1px solid rgb(255 255 255 / 0.14);
  background: linear-gradient(180deg, rgb(255 255 255 / 0.1), rgb(255 255 255 / 0.03));
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.2);
  -webkit-backdrop-filter: blur(16px) saturate(160%);
  backdrop-filter: blur(16px) saturate(160%);
  color: var(--color-paper);
}
.btn--light::before {
  background: var(--color-paper);
}
.btn--light:hover {
  color: var(--color-ink);
}

.btn--signal {
  background: var(--color-signal);
  color: var(--color-ink);
}
.btn--signal::before {
  background: var(--color-paper);
}
</style>
