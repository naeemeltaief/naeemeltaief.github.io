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
}
.btn--primary::before {
  background: var(--color-signal);
}
.btn--primary:hover {
  color: var(--color-ink);
}

.btn--ghost {
  border: 1px solid var(--line);
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
  border: 1px solid var(--line-dark);
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
