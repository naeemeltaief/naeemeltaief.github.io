import { onBeforeUnmount, onMounted, ref } from 'vue'

const query = '(prefers-reduced-motion: reduce)'

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia(query).matches

/** Reactive reduced-motion preference that follows OS changes live. */
export function useReducedMotion() {
  const reduced = ref(prefersReducedMotion())
  let mql: MediaQueryList | undefined
  const update = (e: MediaQueryListEvent) => (reduced.value = e.matches)
  onMounted(() => {
    mql = window.matchMedia(query)
    reduced.value = mql.matches
    mql.addEventListener('change', update)
  })
  onBeforeUnmount(() => mql?.removeEventListener('change', update))
  return reduced
}
