<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { Check, Fingerprint, Lock, Nfc } from 'lucide-vue-next'
import PhoneFrame from './PhoneFrame.vue'
import { useReducedMotion } from '@/composables/motion'

/**
 * Illustrative product composition (not a product screenshot):
 * a card is tokenised, tapped over NFC and approved, while the side panel shows
 * the request travelling through the clean-architecture layers and back.
 */
const PAN = '•••• •••• •••• 4821'
const TOKEN = '4F2A 9C17 0B3E 7D21'
const GLYPHS = '0123456789ABCDEF'

// One loop = 10 ticks. Each tick maps to a phase and an active architecture layer.
const timeline = [
  { phase: 'card', layer: 0 },
  { phase: 'card', layer: 1 },
  { phase: 'card', layer: 2 },
  { phase: 'token', layer: 3 },
  { phase: 'tap', layer: 3 },
  { phase: 'tap', layer: 3 },
  { phase: 'approved', layer: 2 },
  { phase: 'approved', layer: 1 },
  { phase: 'approved', layer: 0 },
  { phase: 'approved', layer: -1 },
] as const

const layers = [
  { name: 'Presentation', detail: 'Flutter · BLoC' },
  { name: 'Domain', detail: 'Use cases' },
  { name: 'Bridge', detail: 'Platform channel' },
  { name: 'Native', detail: 'Payment SDK · HCE' },
]

const checks = ['Device binding', 'Cardholder verified', 'Token reference encrypted']

const reduced = useReducedMotion()
const tick = ref(8)
const number = ref(TOKEN)
const root = ref<HTMLElement>()
const step = computed(() => timeline[tick.value])
const tokenised = computed(() => step.value.phase !== 'card')
const goingDown = computed(() => tick.value <= 3)

let timer: number | undefined
let raf = 0
let visible = false

function scrambleTo(target: string) {
  cancelAnimationFrame(raf)
  if (reduced.value) return (number.value = target)
  const start = performance.now()
  const duration = 700
  const frame = (now: number) => {
    const p = Math.min(1, (now - start) / duration)
    const settled = Math.floor(p * target.length)
    number.value = target
      .split('')
      .map((ch, i) => (i < settled || ch === ' ' ? ch : GLYPHS[(Math.random() * 16) | 0]))
      .join('')
    if (p < 1) raf = requestAnimationFrame(frame)
  }
  raf = requestAnimationFrame(frame)
}

function play() {
  stop()
  if (reduced.value || !visible || document.hidden) return
  timer = window.setInterval(() => (tick.value = (tick.value + 1) % timeline.length), 1000)
}
function stop() {
  clearInterval(timer)
  timer = undefined
}

watch(tokenised, (isToken) => scrambleTo(isToken ? TOKEN : PAN))
watch(reduced, (r) => {
  if (r) {
    stop()
    tick.value = 8
    number.value = TOKEN
  } else play()
})

let io: IntersectionObserver | undefined
const onVisibility = () => (document.hidden ? stop() : play())

onMounted(() => {
  if (!reduced.value) {
    tick.value = 0
    number.value = PAN
  }
  io = new IntersectionObserver(([e]) => {
    visible = e.isIntersecting
    visible ? play() : stop()
  })
  if (root.value) io.observe(root.value)
  document.addEventListener('visibilitychange', onVisibility)
})
onBeforeUnmount(() => {
  stop()
  cancelAnimationFrame(raf)
  io?.disconnect()
  document.removeEventListener('visibilitychange', onVisibility)
})
</script>

<template>
  <figure ref="root" class="hero-device relative mx-auto w-full max-w-[34rem]">
    <!-- Concentric NFC field behind the phone -->
    <div class="field" :class="{ 'is-active': step.phase === 'tap' }" aria-hidden="true">
      <span v-for="n in 4" :key="n" :style="{ '--n': n }" />
    </div>

    <div class="relative mx-auto w-[min(78%,19rem)] sm:mr-4 sm:ml-auto" aria-hidden="true">
      <PhoneFrame>
        <div class="flex h-full flex-col px-[7%] pb-[8%] pt-[18%] font-sans">
          <div class="flex items-center justify-between text-[0.6rem] font-medium text-paper/60">
            <span>Wallet</span>
            <span class="inline-flex items-center gap-1"><Lock class="size-2.5" /> Device bound</span>
          </div>

          <!-- Card -->
          <div class="card mt-4" :class="{ 'is-token': tokenised }">
            <div class="flex items-start justify-between">
              <span class="chip-ic" />
              <Nfc class="size-4 text-paper/70" />
            </div>
            <div class="mt-auto">
              <p class="text-[0.5rem] uppercase tracking-[0.18em] text-paper/55">
                {{ tokenised ? 'Device token' : 'Card number' }}
              </p>
              <p class="mt-1 font-mono text-[0.78rem] tracking-[0.06em] tabular-nums">{{ number }}</p>
            </div>
          </div>

          <!-- Security checks, ticking off as the flow progresses -->
          <ul class="mt-4 grid gap-1.5 text-[0.62rem]">
            <li v-for="(c, i) in checks" :key="c" class="flex items-center justify-between rounded-lg bg-white/[0.04] px-2.5 py-2">
              <span class="text-paper/70">{{ c }}</span>
              <span class="check" :class="{ 'is-done': tick >= i + 1 }">
                <Check class="size-2.5" />
              </span>
            </li>
          </ul>

          <!-- Status area -->
          <div class="relative mt-auto flex flex-col items-center text-center">
            <div class="status-orb" :class="`is-${step.phase}`">
              <Check v-if="step.phase === 'approved'" class="size-6" />
              <Nfc v-else-if="step.phase === 'tap'" class="size-6" />
              <Fingerprint v-else class="size-6" />
            </div>
            <p class="mt-3 text-[0.82rem] font-semibold">
              {{
                step.phase === 'card'
                  ? 'Verifying cardholder'
                  : step.phase === 'token'
                    ? 'Token provisioned'
                    : step.phase === 'tap'
                      ? 'Hold near reader'
                      : 'Payment approved'
              }}
            </p>
            <p class="mt-1 text-[0.62rem] text-paper/50">Card data never leaves the token</p>
          </div>
        </div>
      </PhoneFrame>
    </div>

    <!-- Architecture panel -->
    <div
      class="arch relative mt-4 w-full rounded-[1.1rem] sm:absolute sm:bottom-[6%] sm:left-0 sm:mt-0 sm:w-[min(58%,15.5rem)] border border-[var(--line)] bg-paper/90 p-3 shadow-[0_24px_48px_-28px_rgb(12_14_18/0.45)] backdrop-blur"
      aria-hidden="true"
    >
      <div class="mb-2 flex items-center justify-between px-1">
        <span class="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-mute">Request path</span>
        <span class="font-mono text-[0.6rem] font-semibold text-ink">{{ goingDown ? '↓ out' : '↑ back' }}</span>
      </div>
      <ol class="grid grid-cols-2 gap-1 sm:grid-cols-1">
        <li
          v-for="(l, i) in layers"
          :key="l.name"
          class="layer flex items-center justify-between rounded-lg px-2.5 py-2"
          :class="{ 'is-active': step.layer === i }"
        >
          <span class="text-[0.72rem] font-semibold">{{ l.name }}</span>
          <span class="font-mono text-[0.58rem] opacity-70">{{ l.detail }}</span>
        </li>
      </ol>
    </div>

    <figcaption class="mt-4 text-right font-mono text-[0.66rem] uppercase tracking-[0.12em] text-mute">
      Illustrative interface — tokenise · tap · approve
    </figcaption>
  </figure>
</template>

<style scoped>
.field {
  position: absolute;
  inset: 0 0 8% 20%;
  display: grid;
  place-items: center;
  pointer-events: none;
}
.field span {
  position: absolute;
  width: calc(var(--n) * 24%);
  aspect-ratio: 1;
  border-radius: 50%;
  border: 1px solid var(--line);
  transition: border-color 0.6s;
}
.field.is-active span {
  border-color: rgb(255 90 31 / 0.5);
  animation: ring 1.6s var(--ease-out-expo) infinite;
  animation-delay: calc(var(--n) * 120ms);
}
@keyframes ring {
  0% {
    transform: scale(0.92);
    opacity: 0.2;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: scale(1.06);
    opacity: 0.2;
  }
}

.card {
  display: flex;
  flex-direction: column;
  aspect-ratio: 1.586;
  padding: 0.8rem;
  border-radius: 0.8rem;
  background:
    radial-gradient(120% 140% at 100% 0%, rgb(255 90 31 / 0.55), transparent 55%),
    linear-gradient(135deg, #2a2f39, #14171d);
  box-shadow: 0 0 0 1px rgb(255 255 255 / 0.08) inset;
  transition: background 0.8s;
}
.card.is-token {
  background:
    radial-gradient(120% 140% at 100% 0%, rgb(61 220 151 / 0.35), transparent 55%),
    linear-gradient(135deg, #1d2129, #0c0e12);
}
.chip-ic {
  width: 1.4rem;
  height: 1rem;
  border-radius: 0.25rem;
  background: linear-gradient(135deg, #d8c79a, #9f8a55);
}

.status-orb {
  display: grid;
  place-items: center;
  width: 3.6rem;
  height: 3.6rem;
  border-radius: 50%;
  background: rgb(241 239 233 / 0.08);
  color: var(--color-paper);
  transition:
    background-color 0.5s,
    color 0.5s,
    transform 0.5s var(--ease-out-expo);
}
.status-orb.is-tap {
  background: var(--color-signal);
  color: var(--color-ink);
  transform: scale(1.08);
}
.status-orb.is-approved {
  background: var(--color-token);
  color: var(--color-ink);
}

.check {
  display: grid;
  place-items: center;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  border: 1px solid rgb(241 239 233 / 0.2);
  color: transparent;
  transition:
    background-color 0.4s,
    color 0.4s,
    border-color 0.4s;
}
.check.is-done {
  background: var(--color-token);
  border-color: var(--color-token);
  color: var(--color-ink);
}
.layer {
  border: 1px solid transparent;
  transition:
    background-color 0.4s,
    color 0.4s,
    border-color 0.4s;
}
.layer.is-active {
  background: var(--color-ink);
  color: var(--color-paper);
}
.layer.is-active .font-mono {
  color: var(--color-signal);
  opacity: 1;
}
</style>
