// Liquid glass (after iOS 26), progressively enhanced:
//  - every browser: translucent blur + specular rim from .glass / .glass-dark (main.css)
//  - Chromium: an SVG displacement filter in backdrop-filter bends what sits behind the
//    glass, so lines and colour visibly flow through it (html.liquid gates the CSS)
//  - fine pointers: the highlight follows the cursor across the surface (--mx / --my)

const FILTER = `
<svg width="0" height="0" aria-hidden="true" style="position:absolute">
  <filter id="liquid-glass" x="0%" y="0%" width="100%" height="100%" color-interpolation-filters="sRGB">
    <feTurbulence type="fractalNoise" baseFrequency="0.006 0.009" numOctaves="2" seed="7" result="noise" />
    <feGaussianBlur in="noise" stdDeviation="3" result="soft" />
    <feDisplacementMap in="SourceGraphic" in2="soft" scale="46" xChannelSelector="R" yChannelSelector="G" />
  </filter>
</svg>`

export function installLiquidGlass() {
  if (typeof window === 'undefined') return

  const brands = (navigator as Navigator & { userAgentData?: { brands: { brand: string }[] } }).userAgentData?.brands
  if (brands?.some((b) => b.brand === 'Chromium')) {
    document.body.insertAdjacentHTML('beforeend', FILTER)
    document.documentElement.classList.add('liquid')
  }

  if (!matchMedia('(pointer: fine)').matches) return
  let last: HTMLElement | null = null
  window.addEventListener(
    'pointermove',
    (e) => {
      const el = (e.target as Element | null)?.closest?.<HTMLElement>('.glass, .glass-dark') ?? null
      if (last && last !== el) {
        last.style.removeProperty('--mx')
        last.style.removeProperty('--my')
      }
      last = el
      if (!el) return
      const r = el.getBoundingClientRect()
      el.style.setProperty('--mx', `${(((e.clientX - r.left) / r.width) * 100).toFixed(1)}%`)
      el.style.setProperty('--my', `${(((e.clientY - r.top) / r.height) * 100).toFixed(1)}%`)
    },
    { passive: true },
  )
}
