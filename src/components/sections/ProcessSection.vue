<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import { process } from '@/content/services'
import { prefersReducedMotion } from '@/composables/motion'

const track = ref<HTMLElement>()
let ctx: { revert: () => void } | undefined

onMounted(async () => {
  if (prefersReducedMotion() || !track.value) return
  const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')])
  gsap.registerPlugin(ScrollTrigger)
  ctx = gsap.context(() => {
    const mm = gsap.matchMedia()
    // Horizontal connector draws across on wide screens, vertical one on small screens.
    mm.add('(min-width: 1024px)', () => {
      gsap.fromTo('[data-line-x]', { scaleX: 0 }, {
        scaleX: 1, ease: 'none',
        scrollTrigger: { trigger: track.value, start: 'top 75%', end: 'bottom 60%', scrub: 0.6 },
      })
    })
    mm.add('(max-width: 1023px)', () => {
      gsap.fromTo('[data-line-y]', { scaleY: 0 }, {
        scaleY: 1, ease: 'none',
        scrollTrigger: { trigger: track.value, start: 'top 70%', end: 'bottom 70%', scrub: 0.6 },
      })
    })
  }, track.value)
})
onBeforeUnmount(() => ctx?.revert())
</script>

<template>
  <section id="process" aria-labelledby="process-title" class="relative py-24 md:py-36">
    <div class="shell">
      <SectionHeading id="process-title" index="06" eyebrow="Process" title="What working with me looks like.">
        A clear path from first conversation to a product in people’s hands — with the architecture decided before the
        screens, not after.
      </SectionHeading>

      <div ref="track" class="relative mt-14 md:mt-20">
        <!-- Connectors -->
        <div class="absolute left-[1.45rem] right-[10%] top-[1.45rem] hidden h-px bg-[var(--line)] lg:block" aria-hidden="true">
          <div data-line-x class="h-full origin-left bg-signal" />
        </div>
        <div class="absolute bottom-6 left-[1.45rem] top-6 w-px bg-[var(--line)] lg:hidden" aria-hidden="true">
          <div data-line-y class="h-full origin-top bg-signal" />
        </div>

        <ol class="grid gap-10 lg:grid-cols-5 lg:gap-6">
          <li v-for="(s, i) in process" :key="s.step" v-reveal="i * 90" class="relative grid grid-cols-[3rem_1fr] gap-5 lg:flex lg:flex-col lg:gap-0">
            <span class="relative z-10 grid size-[2.9rem] place-items-center rounded-full border border-ink bg-paper font-mono text-[0.78rem] font-medium">
              {{ s.step }}
            </span>
            <div class="flex flex-col lg:mt-8 lg:flex-1 lg:pr-4">
              <h3 class="font-display text-[1.45rem] font-semibold tracking-tight">{{ s.title }}</h3>
              <p class="mt-3 text-[0.95rem] leading-relaxed text-mute lg:mb-5">{{ s.body }}</p>
              <p class="mt-5 inline-flex self-start items-center gap-2 rounded-full lg:mt-auto bg-paper-2 px-3 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.08em]">
                <span class="text-signal-ink" aria-hidden="true">→</span>
                <span><span class="sr-only">Output: </span>{{ s.output }}</span>
              </p>
            </div>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>
