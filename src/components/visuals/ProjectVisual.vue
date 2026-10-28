<script setup lang="ts">
import { BellRing, BookOpen, Flame, GraduationCap, HeartPulse, Lock, MessageCircle, Phone, ShieldAlert } from 'lucide-vue-next'
import PhoneFrame from './PhoneFrame.vue'
import type { VisualKind } from '@/content/projects'

/** Illustrative compositions for case studies — never presented as real screenshots. */
defineProps<{ kind: VisualKind; caption?: boolean }>()

const subjects = [
  { name: 'Mathematics', score: 86 },
  { name: 'Science', score: 78 },
  { name: 'Arabic', score: 91 },
]

// Deterministic pseudo-QR so the pattern is stable between renders.
const qr = Array.from({ length: 21 * 21 }, (_, i) => {
  const x = i % 21
  const y = Math.floor(i / 21)
  const finder = (cx: number, cy: number) => {
    const dx = x - cx
    const dy = y - cy
    if (dx < 0 || dy < 0 || dx > 6 || dy > 6) return null
    const edge = dx === 0 || dy === 0 || dx === 6 || dy === 6
    const core = dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4
    return edge || core
  }
  const f = finder(0, 0) ?? finder(14, 0) ?? finder(0, 14)
  if (f !== null) return f
  return ((x * 7 + y * 13 + x * y) % 5) < 2
})
</script>

<template>
  <figure class="visual relative isolate overflow-hidden" :class="`visual--${kind}`">
    <div class="blueprint-dark absolute inset-0 -z-10" aria-hidden="true" />

    <!-- SCA: push approval + QR -->
    <div v-if="kind === 'sca'" class="stage" aria-hidden="true">
      <div class="phone-slot">
        <PhoneFrame>
          <div class="flex h-full flex-col px-2.5 pt-[22%]">
            <div class="rounded-xl bg-white/10 p-2.5 ring-1 ring-white/10 backdrop-blur">
              <div class="flex items-center gap-1.5 text-[3.5cqw] text-paper/60">
                <BellRing class="size-2.5" /> Now · Payment request
              </div>
              <p class="mt-1.5 text-[4.6cqw] font-semibold leading-tight text-paper">Approve this payment?</p>
              <p class="mt-0.5 font-mono text-[3.6cqw] text-paper/60">Token ···· 7D21</p>
              <div class="mt-2 grid grid-cols-2 gap-1.5 text-[3.8cqw] font-semibold">
                <span class="rounded-md bg-white/10 py-1.5 text-center text-paper">Decline</span>
                <span class="rounded-md bg-token py-1.5 text-center text-ink">Approve</span>
              </div>
            </div>
            <div class="mt-auto mb-[14%] flex flex-col items-center gap-1 text-paper/60">
              <Lock class="size-3.5" />
              <span class="text-[3.5cqw]">Strong customer authentication</span>
            </div>
          </div>
        </PhoneFrame>
      </div>
      <div class="ml-[6%] flex w-[30%] flex-col items-center gap-3">
        <div class="w-full rounded-2xl bg-paper p-3 shadow-2xl">
          <svg viewBox="0 0 21 21" class="block w-full" shape-rendering="crispEdges">
            <template v-for="(on, i) in qr" :key="i">
              <rect v-if="on" :x="i % 21" :y="Math.floor(i / 21)" width="1" height="1" fill="#0c0e12" />
            </template>
          </svg>
        </div>
        <span class="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-paper/60">or scan to approve</span>
      </div>
    </div>

    <!-- Emergency 1415 -->
    <div v-else-if="kind === 'emergency'" class="stage" aria-hidden="true">
      <div class="phone-slot rotate-[5deg]">
        <PhoneFrame tone="paper">
          <div class="flex h-full flex-col px-3 pb-[10%] pt-[22%]">
            <p class="font-display text-[10.4cqw] font-bold leading-none tracking-tight">1415</p>
            <p class="mt-1 text-[3.8cqw] text-mute">Emergency contact centre</p>
            <div class="mt-3 grid gap-1.5">
              <div class="flex items-center gap-2 rounded-lg bg-ink px-2.5 py-2.5 text-paper">
                <HeartPulse class="size-3.5 text-signal" /><span class="text-[4.3cqw] font-semibold">Medical</span>
              </div>
              <div class="flex items-center gap-2 rounded-lg bg-ink px-2.5 py-2.5 text-paper">
                <Flame class="size-3.5 text-signal" /><span class="text-[4.3cqw] font-semibold">Fire</span>
              </div>
              <div class="flex items-center gap-2 rounded-lg bg-ink px-2.5 py-2.5 text-paper">
                <ShieldAlert class="size-3.5 text-signal" /><span class="text-[4.3cqw] font-semibold">Security</span>
              </div>
            </div>
            <div class="mt-auto flex items-center justify-center gap-1.5 rounded-full bg-signal py-2.5 text-[4.3cqw] font-bold text-ink">
              <Phone class="size-3" /> Call for help
            </div>
          </div>
        </PhoneFrame>
      </div>
      <div class="pulse" aria-hidden="true"><span /><span /></div>
    </div>

    <!-- Refd: student progress, school notifications and messaging -->
    <div v-else-if="kind === 'school'" class="stage" aria-hidden="true">
      <div class="phone-slot -rotate-[4deg]">
        <PhoneFrame tone="paper">
          <div class="flex h-full flex-col px-3 pt-[22%]">
            <div class="flex items-center gap-1.5 text-[3.5cqw] text-mute">
              <GraduationCap class="size-3" /> Term progress
            </div>
            <p class="mt-1 font-display text-[7.4cqw] font-bold leading-none tracking-tight">Grade 7 · B</p>
            <div class="mt-3 grid gap-2">
              <div v-for="s in subjects" :key="s.name">
                <div class="flex justify-between text-[3.5cqw] font-medium">
                  <span>{{ s.name }}</span><span class="font-mono text-mute">{{ s.score }}%</span>
                </div>
                <div class="mt-0.5 h-1.5 rounded-full bg-ink/10">
                  <div class="h-full rounded-full bg-ink" :style="{ width: `${s.score}%` }" />
                </div>
              </div>
            </div>
            <div class="mt-3 flex items-center gap-2 rounded-lg bg-ink px-2.5 py-2 text-paper">
              <BookOpen class="size-3.5 text-signal" />
              <span class="text-[3.8cqw] font-semibold">3 new learning materials</span>
            </div>
          </div>
        </PhoneFrame>
      </div>
      <div class="ml-[5%] flex w-[34%] flex-col gap-3">
        <div class="note">
          <div class="flex items-center gap-1.5 text-[0.6rem] text-paper/60"><BellRing class="size-3" /> School · Now</div>
          <p class="mt-1 text-[0.72rem] font-semibold leading-snug text-paper">Parent–teacher meeting on Thursday</p>
        </div>
        <div class="note translate-x-[12%]">
          <div class="flex items-center gap-1.5 text-[0.6rem] text-paper/60"><MessageCircle class="size-3" /> Class teacher</div>
          <p class="mt-1 text-[0.72rem] leading-snug text-paper/85">Great improvement in maths this week.</p>
        </div>
      </div>
    </div>

    <!-- Dynamic form builder: data in, form out -->
    <div v-else class="stage gap-[5%]" aria-hidden="true">
      <pre class="code"><span class="c">// field definitions</span>
[
  { <span class="k">type</span>: <span class="s">"text"</span>,
    <span class="k">name</span>: <span class="s">"full_name"</span>,
    <span class="k">required</span>: <span class="b">true</span> },
  { <span class="k">type</span>: <span class="s">"email"</span>,
    <span class="k">name</span>: <span class="s">"email"</span> },
  { <span class="k">type</span>: <span class="s">"dropdown"</span>,
    <span class="k">name</span>: <span class="s">"department"</span> },
  { <span class="k">type</span>: <span class="s">"checkbox"</span>,
    <span class="k">name</span>: <span class="s">"consent"</span> }
]</pre>
      <span class="font-mono text-xl text-signal">→</span>
      <div class="phone-slot">
        <PhoneFrame tone="paper">
          <div class="flex h-full flex-col gap-2 px-3 pt-[22%]">
            <p class="text-[4.9cqw] font-bold">New request</p>
            <div v-for="f in ['Full name', 'Email', 'Department']" :key="f">
              <p class="text-[3.5cqw] font-medium text-mute">{{ f }}</p>
              <div class="mt-0.5 h-5 rounded-md border border-ink/15 bg-white" />
            </div>
            <p class="text-[3.3cqw] font-medium text-signal-ink">Full name is required</p>
            <div class="flex items-center gap-1.5">
              <span class="size-3 rounded-[3px] bg-ink" /><span class="text-[3.5cqw]">I agree</span>
            </div>
            <div class="mt-1 rounded-md bg-ink py-1.5 text-center text-[3.8cqw] font-semibold text-paper">Submit</div>
          </div>
        </PhoneFrame>
      </div>
    </div>

    <figcaption
      v-if="caption !== false"
      class="absolute bottom-3 left-4 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-paper/45"
    >
      Illustrative mockup
    </figcaption>
  </figure>
</template>

<style scoped>
.visual {
  aspect-ratio: 1 / 1;
  background: radial-gradient(90% 90% at 70% 20%, #1d2129, #0f1217 70%);
}
@media (min-width: 640px) {
  .visual {
    aspect-ratio: 4 / 3.2;
  }
}
.visual--sca {
  background: radial-gradient(80% 80% at 20% 20%, rgb(110 140 255 / 0.18), transparent 60%), #0f1217;
}
.visual--emergency {
  background: radial-gradient(70% 70% at 50% 60%, rgb(255 90 31 / 0.2), transparent 65%), #0f1217;
}
.visual--school {
  background: radial-gradient(80% 80% at 75% 25%, rgb(158 197 255 / 0.16), transparent 60%), #0f1217;
}
.stage {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 7% 6% 9%;
}
.phone-slot {
  height: 86%;
  flex-shrink: 0;
}
.stage :deep(.phone) {
  height: 100%;
  transition: transform 0.8s var(--ease-out-expo);
}
.group:hover .stage :deep(.phone) {
  transform: translateY(-6px);
}

.note {
  padding: 0.7rem 0.8rem;
  border-radius: 0.9rem;
  background: rgb(255 255 255 / 0.08);
  box-shadow:
    0 0 0 1px rgb(255 255 255 / 0.1) inset,
    0 30px 50px -20px rgb(0 0 0 / 0.6);
  backdrop-filter: blur(8px);
}

.pulse {
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: -1;
  width: 70%;
  aspect-ratio: 1;
  transform: translate(-50%, -50%);
}
.pulse span {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 1px solid rgb(255 90 31 / 0.4);
  animation: pulse 3s ease-out infinite;
}
.pulse span + span {
  animation-delay: 1.5s;
}
@keyframes pulse {
  from {
    transform: scale(0.5);
    opacity: 1;
  }
  to {
    transform: scale(1.1);
    opacity: 0;
  }
}

.code {
  width: 46%;
  margin: 0;
  padding: 1rem 1.1rem;
  border-radius: 0.9rem;
  background: #0b0d10;
  box-shadow: 0 0 0 1px rgb(255 255 255 / 0.08) inset;
  color: rgb(241 239 233 / 0.85);
  font-family: var(--font-mono);
  font-size: clamp(0.5rem, 1vw, 0.72rem);
  line-height: 1.55;
  overflow: hidden;
}
.code .c {
  color: rgb(241 239 233 / 0.4);
}
.code .k {
  color: #9ec5ff;
}
.code .s {
  color: var(--color-token);
}
.code .b {
  color: var(--color-signal);
}
</style>
