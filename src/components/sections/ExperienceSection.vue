<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import { education, roles } from '@/content/experience'
import { prefersReducedMotion } from '@/composables/motion'

const [lead, ...earlier] = roles

// The career arc, oldest → newest. Labels come from each role's `chapter`.
const arc = [...roles]
  .filter((r) => r.type !== 'Part time')
  .reverse()
  .map((r) => ({ chapter: r.chapter, year: r.start.slice(-4), company: r.company }))

const timeline = ref<HTMLElement>()
let ctx: { revert: () => void } | undefined

onMounted(async () => {
  if (prefersReducedMotion() || !timeline.value) return
  const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')])
  gsap.registerPlugin(ScrollTrigger)
  ctx = gsap.context(() => {
    gsap.fromTo(
      '[data-progress]',
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: { trigger: timeline.value, start: 'top 70%', end: 'bottom 70%', scrub: 0.6 },
      },
    )
  }, timeline.value)
})
onBeforeUnmount(() => ctx?.revert())
</script>

<template>
  <section id="experience" aria-labelledby="experience-title" class="relative bg-paper-2 py-24 md:py-36">
    <div class="shell">
      <SectionHeading id="experience-title" index="03" eyebrow="Experience" title="From shipping features to setting direction.">
        Five years, one direction of travel: from building interfaces, to owning payment-critical code, to deciding how
        a mobile team builds.
      </SectionHeading>

      <!-- Career arc rail -->
      <ol v-reveal class="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--line)] sm:grid-cols-5 md:mt-20" aria-label="Career arc, oldest to newest">
        <li
          v-for="(a, i) in arc"
          :key="a.chapter"
          class="relative px-4 py-4"
          :class="[i === arc.length - 1 ? 'bg-ink text-paper' : 'bg-paper-2', i === arc.length - 1 && arc.length % 2 ? 'col-span-2 sm:col-span-1' : '']"
        >
          <span class="font-mono text-[0.68rem]" :class="i === arc.length - 1 ? 'text-signal' : 'text-mute'">{{ a.year }}</span>
          <span class="mt-1 block font-display text-lg font-semibold tracking-tight">{{ a.chapter }}</span>
          <span class="block truncate text-xs" :class="i === arc.length - 1 ? 'text-mute-dark' : 'text-mute'">{{ a.company }}</span>
        </li>
      </ol>

      <!-- Current role — given the prominence it deserves -->
      <article v-reveal class="on-ink relative mt-8 overflow-hidden rounded-[var(--radius-lg)] bg-ink text-paper">
        <div class="blueprint-dark absolute inset-0" aria-hidden="true" />
        <div class="relative grid gap-10 p-7 sm:p-10 lg:grid-cols-12 lg:p-14">
          <div class="lg:col-span-5">
            <p class="inline-flex items-center gap-2 rounded-full border border-[var(--line-dark)] px-3 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.12em]">
              <span class="relative flex size-2">
                <span class="absolute inline-flex size-full animate-ping rounded-full bg-token opacity-60" />
                <span class="relative inline-flex size-2 rounded-full bg-token" />
              </span>
              Current role · {{ lead.start }} — {{ lead.end }}
            </p>
            <h3 class="mt-8 font-display text-[clamp(2rem,4vw,3.4rem)] font-semibold leading-[0.98] tracking-tight">
              {{ lead.title }}
            </h3>
            <p class="mt-3 text-lg text-mute-dark">
              {{ lead.company }} <span aria-hidden="true">—</span> {{ lead.companyNote }}
            </p>
            <div class="mt-8 grid grid-cols-3 gap-3 text-center">
              <div v-for="pillar in ['Vision', 'Architecture', 'Hands-on']" :key="pillar" class="rounded-xl border border-[var(--line-dark)] px-2 py-3">
                <span class="font-display text-[0.95rem] font-semibold">{{ pillar }}</span>
              </div>
            </div>
          </div>
          <ul class="grid content-start gap-5 lg:col-span-7">
            <li v-for="(h, i) in lead.highlights" :key="i" class="grid grid-cols-[2rem_1fr] gap-3 border-t border-[var(--line-dark)] pt-5 leading-relaxed text-paper/85">
              <span class="font-mono text-[0.72rem] text-signal">{{ String(i + 1).padStart(2, '0') }}</span>
              {{ h }}
            </li>
          </ul>
        </div>
      </article>

      <!-- Earlier roles -->
      <div ref="timeline" class="relative mt-16 md:mt-24">
        <div class="absolute bottom-0 left-[0.4rem] top-0 w-px bg-[var(--line)] md:left-[calc(25%-0.5px)]" aria-hidden="true">
          <div data-progress class="h-full w-full origin-top bg-signal" />
        </div>
        <ol class="grid gap-14">
          <li v-for="r in earlier" :key="r.id" v-reveal class="relative grid gap-4 pl-8 md:grid-cols-12 md:gap-8 md:pl-0">
            <span class="absolute left-0 top-1.5 size-[0.85rem] rounded-full border-2 border-signal bg-paper-2 md:left-[calc(25%-0.425rem)]" aria-hidden="true" />
            <div class="md:col-span-3 md:pr-10 md:text-right">
              <p class="font-mono text-[0.78rem] text-mute">{{ r.start }} — {{ r.end }}</p>
              <p class="mt-1 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-signal-ink">{{ r.chapter }} · {{ r.type }}</p>
            </div>
            <div class="md:col-span-4 md:pl-6">
              <h3 class="font-display text-[1.5rem] font-semibold leading-tight tracking-tight">{{ r.company }}</h3>
              <p class="mt-1 text-mute">{{ r.title }}</p>
              <ul class="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
                <li v-for="s in r.stack" :key="s" class="chip text-mute">{{ s }}</li>
              </ul>
            </div>
            <ul class="grid gap-3 leading-relaxed text-ink/80 md:col-span-5">
              <li v-for="(h, i) in r.highlights" :key="i" class="flex gap-3">
                <span class="mt-[0.7em] h-px w-3 shrink-0 bg-ink/40" aria-hidden="true" />
                {{ h }}
              </li>
            </ul>
          </li>
        </ol>
      </div>

      <!-- Education -->
      <div v-reveal class="mt-20 grid gap-6 border-t border-[var(--line)] pt-10 md:grid-cols-12 md:gap-8">
        <h3 class="eyebrow text-mute md:col-span-3">Education &amp; certification</h3>
        <ul class="grid gap-4 md:col-span-9 md:grid-cols-2">
          <li v-for="e in education" :key="e.title">
            <p class="font-semibold">{{ e.title }}</p>
            <p class="mt-1 text-sm text-mute">{{ e.place }}<template v-if="e.period"> · {{ e.period }}</template></p>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
