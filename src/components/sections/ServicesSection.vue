<script setup lang="ts">
import { ArrowRight, Compass, CreditCard, Layers, Plug, Rocket, Smartphone } from 'lucide-vue-next'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import ButtonLink from '@/components/ui/ButtonLink.vue'
import { services, type ServiceIcon } from '@/content/services'

const icons: Record<ServiceIcon, typeof Rocket> = {
  smartphone: Smartphone,
  rocket: Rocket,
  'credit-card': CreditCard,
  plug: Plug,
  layers: Layers,
  compass: Compass,
}
</script>

<template>
  <section id="services" aria-labelledby="services-title" class="on-ink relative overflow-hidden bg-ink py-24 text-paper md:py-36">
    <div class="shell">
      <SectionHeading id="services-title" index="05" eyebrow="Services" title="What I can build with you." dark>
        For founders, product teams and companies who need a mobile product done properly — or a mobile team pointed in
        the right direction.
      </SectionHeading>

      <ul class="mt-14 grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-[var(--line-dark)] bg-[var(--line-dark)] md:mt-20 md:grid-cols-2 lg:grid-cols-3">
        <li
          v-for="(s, i) in services"
          :key="s.id"
          v-reveal="(i % 3) * 80"
          class="service group relative flex flex-col bg-ink p-7 sm:p-9"
        >
          <div class="flex items-center justify-between">
            <span class="grid size-12 place-items-center rounded-2xl bg-ink-3 text-signal transition-colors duration-500 group-hover:bg-signal group-hover:text-ink">
              <component :is="icons[s.icon]" class="size-5" aria-hidden="true" />
            </span>
            <span class="font-mono text-[0.72rem] text-mute-dark">S—0{{ i + 1 }}</span>
          </div>
          <h3 class="mt-8 font-display text-[1.55rem] font-semibold leading-tight tracking-tight">{{ s.title }}</h3>
          <p class="mt-4 text-[0.95rem] leading-relaxed text-mute-dark">
            <span class="sr-only">The problem: </span>{{ s.problem }}
          </p>
          <p class="mt-4 leading-relaxed text-paper/90">
            <span class="sr-only">What you get: </span>{{ s.value }}
          </p>
          <p class="mt-auto flex items-center gap-2 pt-8 font-mono text-[0.72rem] uppercase tracking-[0.1em] text-mute-dark">
            <span class="size-1.5 rounded-full bg-token" aria-hidden="true" /> {{ s.proof }}
          </p>
        </li>
      </ul>

      <div v-reveal class="mt-12 flex flex-col items-start justify-between gap-6 rounded-[var(--radius-lg)] border border-[var(--line-dark)] p-7 sm:flex-row sm:items-center sm:p-9">
        <p class="max-w-[46ch] font-display text-[1.4rem] font-semibold leading-snug tracking-tight">
          Not sure which of these you need? Describe the problem — I’ll tell you honestly what I’d do.
        </p>
        <ButtonLink :to="{ path: '/', hash: '#contact' }" variant="signal" size="lg">
          Talk it through <ArrowRight class="arrow size-4" aria-hidden="true" />
        </ButtonLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.service::before {
  content: '';
  position: absolute;
  inset: 0 0 auto;
  height: 2px;
  background: var(--color-signal);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.7s var(--ease-out-expo);
}
.service:hover::before {
  transform: scaleX(1);
}
.service {
  transition: background-color 0.5s;
}
.service:hover {
  background: var(--color-ink-2);
}
</style>
