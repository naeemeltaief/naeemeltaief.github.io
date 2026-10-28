<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { BookOpen, Check, Fingerprint, Flame, GraduationCap, HeartPulse, Lock, Nfc, Phone, Ship, ShieldAlert } from 'lucide-vue-next'
import PhoneFrame from './PhoneFrame.vue'
import { useReducedMotion } from '@/composables/motion'

/**
 * Illustrative product composition (not a product screenshot):
 * a card is tokenised, tapped over NFC and approved.
 * Flanking phones and a shipment notification hint at the other domains:
 * public safety (1415), education (Refd) and logistics (Roya Shipping).
 */
const PAN = '•••• •••• •••• 4821'
const TOKEN = '4F2A 9C17 0B3E 7D21'
const GLYPHS = '0123456789ABCDEF'

// One loop = 10 ticks, each mapped to a phase of the payment flow.
const timeline = ['card', 'card', 'card', 'token', 'tap', 'tap', 'approved', 'approved', 'approved', 'approved'] as const

const checks = ['Device binding', 'Cardholder verified', 'Token reference encrypted']

const subjects = [
  { name: 'Mathematics', score: 86 },
  { name: 'Science', score: 78 },
  { name: 'Arabic', score: 91 },
]
const shipment = ['Loaded · Port of Genoa', 'In transit · Mediterranean', 'Arrived · Misrata port']

const reduced = useReducedMotion()
const tick = ref(8)
const number = ref(TOKEN)
const root = ref<HTMLElement>()
const phase = computed(() => timeline[tick.value])
const tokenised = computed(() => phase.value !== 'card')
const shipStage = computed(() => Math.min(2, Math.floor(tick.value / 4)))

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
  <figure ref="root" class="hero-device relative mx-auto w-full max-w-[36rem]">
    <!-- Concentric NFC field behind the phones -->
    <div class="field" :class="{ 'is-active': phase === 'tap' }" aria-hidden="true">
      <span v-for="n in 4" :key="n" :style="{ '--n': n }" />
    </div>

    <div class="stage relative" aria-hidden="true">
      <!-- 1415 emergency (left, behind) -->
      <div class="side side--left">
        <PhoneFrame tone="paper">
          <div class="flex h-full flex-col px-[8%] pb-[10%] pt-[24%]">
            <p class="font-display text-[11cqw] font-bold leading-none tracking-tight">1415</p>
            <p class="mt-1 text-[4.4cqw] text-mute">Emergency contact</p>
            <div class="mt-[8%] grid gap-[4cqw]">
              <div v-for="s in [{ i: HeartPulse, t: 'Medical' }, { i: Flame, t: 'Fire' }, { i: ShieldAlert, t: 'Security' }]" :key="s.t" class="flex items-center gap-[3cqw] rounded-[3cqw] bg-ink px-[5cqw] py-[5cqw] text-paper">
                <component :is="s.i" class="size-[6cqw] text-signal" /><span class="text-[5cqw] font-semibold">{{ s.t }}</span>
              </div>
            </div>
            <div class="call mt-auto flex items-center justify-center gap-[2cqw] rounded-full bg-signal py-[5cqw] text-[5cqw] font-bold text-ink">
              <Phone class="size-[5cqw]" /> Call for help
            </div>
          </div>
        </PhoneFrame>
      </div>

      <!-- Refd school progress (right, behind) -->
      <div class="side side--right">
        <PhoneFrame tone="paper">
          <div class="flex h-full flex-col px-[8%] pt-[24%]">
            <div class="flex items-center gap-[2cqw] text-[4.4cqw] text-mute"><GraduationCap class="size-[5cqw]" /> Term progress</div>
            <p class="mt-[2cqw] font-display text-[8.6cqw] font-bold leading-none tracking-tight">Grade 7 · B</p>
            <div class="mt-[8%] grid gap-[5cqw]">
              <div v-for="sub in subjects" :key="sub.name">
                <div class="flex justify-between text-[4.4cqw] font-medium">
                  <span>{{ sub.name }}</span><span class="font-mono text-mute">{{ sub.score }}%</span>
                </div>
                <div class="mt-[1.5cqw] h-[2cqw] rounded-full bg-ink/10">
                  <div class="bar h-full rounded-full bg-ink" :style="{ width: `${sub.score}%` }" />
                </div>
              </div>
            </div>
            <div class="mt-[10%] flex items-center gap-[3cqw] rounded-[3cqw] bg-ink px-[5cqw] py-[4.5cqw] text-paper">
              <BookOpen class="size-[5.5cqw] text-signal" /><span class="text-[4.4cqw] font-semibold">3 new materials</span>
            </div>
          </div>
        </PhoneFrame>
      </div>

      <!-- Wallet: tokenise · tap · approve (front) -->
      <div class="front">
        <PhoneFrame>
          <div class="flex h-full flex-col px-[7%] pb-[8%] pt-[18%] font-sans">
            <div class="flex items-center justify-between text-[3.6cqw] font-medium text-paper/60">
              <span>Wallet</span>
              <span class="inline-flex items-center gap-1"><Lock class="size-[3.4cqw]" /> Device bound</span>
            </div>

            <!-- Card -->
            <div class="card mt-[6%]" :class="{ 'is-token': tokenised }">
              <div class="flex items-start justify-between">
                <span class="chip-ic" />
                <Nfc class="size-[6cqw] text-paper/70" />
              </div>
              <div class="mt-auto">
                <p class="text-[3cqw] uppercase tracking-[0.18em] text-paper/55">
                  {{ tokenised ? 'Device token' : 'Card number' }}
                </p>
                <p class="mt-1 font-mono text-[4.7cqw] tracking-[0.06em] tabular-nums">{{ number }}</p>
              </div>
            </div>

            <!-- Security checks, ticking off as the flow progresses -->
            <ul class="mt-[6%] grid gap-[2cqw] text-[3.7cqw]">
              <li v-for="(c, i) in checks" :key="c" class="flex items-center justify-between rounded-[2.5cqw] bg-white/[0.04] px-[4cqw] py-[3cqw]">
                <span class="text-paper/70">{{ c }}</span>
                <span class="check" :class="{ 'is-done': tick >= i + 1 }">
                  <Check class="size-[3.4cqw]" />
                </span>
              </li>
            </ul>

            <!-- Status area -->
            <div class="relative mt-auto flex flex-col items-center text-center">
              <div class="status-orb" :class="`is-${phase}`">
                <Check v-if="phase === 'approved'" class="size-[9cqw]" />
                <Nfc v-else-if="phase === 'tap'" class="size-[9cqw]" />
                <Fingerprint v-else class="size-[9cqw]" />
              </div>
              <p class="mt-[4cqw] text-[5cqw] font-semibold">
                {{
                  phase === 'card'
                    ? 'Verifying cardholder'
                    : phase === 'token'
                      ? 'Token provisioned'
                      : phase === 'tap'
                        ? 'Hold near reader'
                        : 'Payment approved'
                }}
              </p>
              <p class="mt-1 text-[3.7cqw] text-paper/50">Card data never leaves the token</p>
            </div>
          </div>
        </PhoneFrame>
      </div>

      <!-- Roya shipment notification, liquid glass -->
      <div class="notice glass bg-white/70">
        <span class="grid size-8 shrink-0 place-items-center rounded-[0.6rem] bg-ink text-paper"><Ship class="size-4" /></span>
        <div class="min-w-0">
          <p class="flex items-center justify-between gap-2 text-[0.62rem] text-mute">
            <span>Roya Shipping</span><span>now</span>
          </p>
          <Transition name="swap" mode="out-in">
            <p :key="shipStage" class="truncate text-[0.74rem] font-semibold text-ink">{{ shipment[shipStage] }}</p>
          </Transition>
        </div>
      </div>
    </div>

    <figcaption class="mt-4 text-right font-mono text-[0.66rem] uppercase tracking-[0.12em] text-mute">
      Illustrative interfaces — payments · public safety · education · logistics
    </figcaption>
  </figure>
</template>

<style scoped>
.stage {
  aspect-ratio: 1 / 1.08;
}
.front {
  position: relative;
  z-index: 10;
  width: 50%;
  margin-inline: auto;
}
.side {
  position: absolute;
  top: 9%;
  width: 38%;
  filter: saturate(0.9);
  transition: transform 0.8s var(--ease-out-expo);
}
.side--left {
  left: 0;
  transform: rotate(-7deg);
}
.side--right {
  right: 0;
  transform: rotate(7deg);
}
.hero-device:hover .side--left {
  transform: rotate(-9deg) translateX(-4%);
}
.hero-device:hover .side--right {
  transform: rotate(9deg) translateX(4%);
}
.side :deep(.phone) {
  border-radius: 2rem;
}
.side :deep(.phone__screen) {
  border-radius: 1.6rem;
}
.call {
  animation: call 2.4s ease-in-out infinite;
}
@keyframes call {
  50% {
    box-shadow: 0 0 0 4cqw rgb(255 90 31 / 0.18);
  }
}
.bar {
  transform-origin: left;
  animation: grow 1.4s var(--ease-out-expo) both;
}
@keyframes grow {
  from {
    transform: scaleX(0);
  }
}
.notice {
  position: absolute;
  z-index: 20;
  top: 58%;
  right: -3%;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  width: min(62%, 15rem);
  padding: 0.6rem 0.75rem 0.6rem 0.6rem;
  border-radius: 1.1rem;
  animation: float 6s ease-in-out infinite;
}
@keyframes float {
  50% {
    transform: translateY(-6px);
  }
}
.swap-enter-active,
.swap-leave-active {
  transition:
    opacity 0.3s,
    transform 0.3s var(--ease-out-expo);
}
.swap-enter-from {
  opacity: 0;
  transform: translateY(6px);
}
.swap-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

.field {
  position: absolute;
  inset: 0 0 8% 0;
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
  padding: 5cqw;
  border-radius: 5cqw;
  background:
    radial-gradient(120% 140% at 100% 0%, rgb(255 90 31 / 0.55), transparent 55%),
    linear-gradient(135deg, #2a2f39, #14171d);
  box-shadow: 0 0 0 1px rgb(255 255 255 / 0.08) inset;
  transition: background 0.8s;
}
.card.is-token {
  background:
    radial-gradient(120% 140% at 100% 0%, rgb(110 140 255 / 0.4), transparent 55%),
    linear-gradient(135deg, #1d2129, #0c0e12);
}
.chip-ic {
  width: 8.5cqw;
  height: 6cqw;
  border-radius: 1.5cqw;
  background: linear-gradient(135deg, #d8c79a, #9f8a55);
}

.status-orb {
  display: grid;
  place-items: center;
  width: 21cqw;
  height: 21cqw;
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
  width: 6cqw;
  height: 6cqw;
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
</style>
