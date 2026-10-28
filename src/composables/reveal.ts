import type { Directive } from 'vue'

/**
 * v-reveal — fades/slides an element in once it enters the viewport.
 * Pure CSS transitions + one shared IntersectionObserver; reduced motion is handled in CSS.
 * Usage: v-reveal  or  v-reveal="120"  (delay in ms)
 */
let observer: IntersectionObserver | undefined

function getObserver() {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in')
            observer!.unobserve(entry.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
  }
  return observer
}

export const vReveal: Directive<HTMLElement, number | undefined> = {
  mounted(el, binding) {
    el.classList.add('reveal')
    if (binding.value) el.style.setProperty('--reveal-delay', `${binding.value}ms`)
    if (!('IntersectionObserver' in window)) return el.classList.add('is-in')
    getObserver().observe(el)
  },
  beforeUnmount(el) {
    observer?.unobserve(el)
  },
}
