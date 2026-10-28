<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { ArrowDown, ArrowRight, FileDown } from 'lucide-vue-next'
import ButtonLink from '@/components/ui/ButtonLink.vue'
import HeroDevice from '@/components/visuals/HeroDevice.vue'
import { profile } from '@/content/profile'
import { prefersReducedMotion } from '@/composables/motion'
import { useLocalTime } from '@/composables/localTime'

const time = useLocalTime(profile.timezone)
const root = ref<HTMLElement>()
let ctx: { revert: () => void } | undefined

// Facts drawn straight from the CV — counts, not claims.
const facts = [
  { value: '5+', label: 'years shipping production apps' },
  { value: '2', label: 'card-payment platforms delivered' },
  { value: 'iOS · Android', label: 'native SDKs bridged into Flutter' },
  { value: 'pub.dev', label: 'open-source Flutter package' },
]

onMounted(async () => {
  if (prefersReducedMotion() || !root.value) return
  const [{ gsap }, { SplitText }] = await Promise.all([import('gsap'), import('gsap/SplitText')])
  gsap.registerPlugin(SplitText)
  await document.fonts.ready
  ctx = gsap.context(() => {
    const split = SplitText.create('[data-split]', { type: 'lines,words', mask: 'lines', linesClass: 'pb-[0.06em]' })
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
    tl.from(split.words, { yPercent: 110, duration: 1.1, stagger: 0.035 })
      .from('[data-fade]', { y: 20, autoAlpha: 0, duration: 0.9, stagger: 0.08 }, '-=0.8')
      .from('[data-device]', { y: 40, autoAlpha: 0, duration: 1.3 }, '-=1.1')
  }, root.value)
})

onBeforeUnmount(() => ctx?.revert())
</script>

<template>
  <section
    ref="root"
    aria-labelledby="hero-title"
    class="relative overflow-hidden pt-[calc(var(--header-h)+2.5rem)] md:pt-[calc(var(--header-h)+4rem)]"
  >
    <div class="blueprint pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(80%_70%_at_70%_30%,#000,transparent)]" aria-hidden="true" />

    <div class="shell grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
      <div class="lg:col-span-7">
        <p data-fade class="eyebrow flex flex-wrap items-center gap-x-3 gap-y-2 text-mute">
          <span class="inline-flex items-center gap-2 rounded-full bg-ink px-3 py-1.5 text-paper">
            <span class="size-1.5 rounded-full bg-signal" aria-hidden="true" />
            {{ profile.role }}
          </span>
          <span>{{ profile.company }} · {{ profile.location }}</span>
        </p>

        <h1 id="hero-title" data-split class="display-xl mt-7">
          Mobile products people trust with their <span class="text-signal-ink">money.</span>
        </h1>

        <p data-fade class="lede mt-7 max-w-[54ch] text-mute">
          I’m Naeem — a Flutter and native mobile engineer leading mobile at {{ profile.company }}. For five-plus
          years I’ve shipped production apps for fintech, government and logistics: from tap-to-pay card
          tokenization to a national emergency service.
        </p>

        <div data-fade class="mt-9 flex flex-wrap items-center gap-3">
          <ButtonLink :to="{ path: '/', hash: '#contact' }" size="lg">
            Start a project <ArrowRight class="arrow size-4" aria-hidden="true" />
          </ButtonLink>
          <ButtonLink :to="{ path: '/', hash: '#work' }" variant="ghost" size="lg">
            See selected work <ArrowDown class="arrow-down size-4" aria-hidden="true" />
          </ButtonLink>
          <a
            :href="profile.cvPath"
            download
            class="inline-flex h-14 items-center gap-2 px-3 text-[0.95rem] font-medium text-ink underline decoration-[var(--line)] underline-offset-[6px] transition-colors hover:decoration-signal"
          >
            <FileDown class="size-4" aria-hidden="true" /> Download CV <span class="text-mute">(PDF)</span>
          </a>
        </div>
      </div>

      <div data-device class="lg:col-span-5">
        <HeroDevice />
      </div>
    </div>

    <!-- Fact rail -->
    <div class="shell mt-16 md:mt-24">
      <dl class="grid grid-cols-2 border-t border-[var(--line)] md:grid-cols-4">
        <div
          v-for="(f, i) in facts"
          :key="f.label"
          data-fade
          class="flex flex-col border-b border-[var(--line)] py-6 pr-4 md:border-b-0"
          :class="i % 2 === 1 ? 'pl-4 border-l md:pl-6' : i > 0 ? 'md:border-l md:pl-6' : ''"
        >
          <dt class="order-2 mt-2 text-sm leading-snug text-mute">{{ f.label }}</dt>
          <dd class="order-1 font-display text-[clamp(1.4rem,2.4vw,2rem)] font-semibold tracking-tight">
            {{ f.value }}
          </dd>
        </div>
      </dl>
      <p data-fade class="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-[var(--line)] py-4 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-mute md:border-t">
        <span>{{ profile.location }}</span>
        <span aria-hidden="true">/</span>
        <span>
          Local time <time class="tabular-nums text-ink">{{ time }}</time> ({{ profile.utcOffset }})
        </span>
        <span aria-hidden="true">/</span>
        <span>Arabic · English</span>
      </p>
    </div>
  </section>
</template>
