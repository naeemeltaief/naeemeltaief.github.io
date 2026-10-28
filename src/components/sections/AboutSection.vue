<script setup lang="ts">
import SectionHeading from '@/components/ui/SectionHeading.vue'

const principles = [
  {
    title: 'Architecture is a product decision',
    body: 'The structure chosen on day one decides how fast a team can move on day three hundred. Clear layers, predictable state, swappable dependencies.',
  },
  {
    title: 'Security is part of the experience',
    body: 'Device binding, verification and approvals should feel like reassurance, not friction — and they belong in their own layer, not scattered through the UI.',
  },
  {
    title: 'Native where it matters, shared where it can',
    body: 'One Flutter codebase for the product; native Kotlin and Swift for what the platform does best, behind a clean platform-channel boundary.',
  },
  {
    title: 'Leave the codebase better',
    body: 'Shared packages, honest code review and documentation — and when a pattern repeats across apps, extract it. That’s how Dynamic Form Builder started.',
  },
]
</script>

<template>
  <section id="about" aria-labelledby="about-title" class="relative isolate overflow-clip py-24 md:py-36">
    <div class="aurora aurora--soft" aria-hidden="true" />
    <div class="shell">
      <SectionHeading id="about-title" index="02" eyebrow="About" title="Engineering that thinks like a product." />

      <div class="mt-14 grid gap-12 md:mt-20 md:grid-cols-12 md:gap-8">
        <div class="md:col-span-3">
          <figure v-reveal class="crop sticky top-28 rounded-[var(--radius-md)] bg-ink p-6 text-paper">
            <blockquote class="font-display text-[1.6rem] font-semibold leading-[1.1] tracking-tight">
              “Lead from the codebase, not from above it.”
            </blockquote>
            <figcaption class="mt-6 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-mute-dark">
              How I approach the technical mobile lead role
            </figcaption>
          </figure>
        </div>

        <div class="space-y-6 text-[1.08rem] leading-[1.7] text-ink/85 md:col-span-6">
          <p v-reveal>
            I started on the web — turning design files into responsive, accessible front-ends for client projects at
            QANA. The habit of caring about the last pixel came with me into mobile.
          </p>
          <p v-reveal>
            At Dojoon I built Flutter apps for public-sector clients, including the national 1415 emergency contact
            service, and introduced the reusable architecture and shared packages that made every next project faster
            to deliver.
          </p>
          <p v-reveal>
            Then fintech. At Masarat Fintech I worked on the parts of a payment app that can’t be wrong: card
            digitisation, contactless payments through Host Card Emulation over NFC, Mastercard SCA tokenization on iOS
            and Android, device binding and encrypted storage — with native SDKs bridged into one shared Flutter product.
          </p>
          <p v-reveal class="text-ink">
            Today I lead the technical direction of mobile at WASL Global: the vision, the architecture and the
            standards the team builds on. I still write the most security-critical code myself — because good technical
            decisions come from being close to the code.
          </p>
        </div>

        <aside v-reveal class="md:col-span-3" aria-label="At a glance">
          <dl class="grid gap-5 border-t border-[var(--line)] pt-5 text-sm">
            <div>
              <dt class="eyebrow text-mute">Focus</dt>
              <dd class="mt-1.5">Flutter · native iOS & Android · payments</dd>
            </div>
            <div>
              <dt class="eyebrow text-mute">Domains</dt>
              <dd class="mt-1.5">Fintech, government, education, logistics</dd>
            </div>
            <div>
              <dt class="eyebrow text-mute">Education</dt>
              <dd class="mt-1.5">BSc Information Technology — Mobile Computing, University of Tripoli</dd>
            </div>
            <div>
              <dt class="eyebrow text-mute">Languages</dt>
              <dd class="mt-1.5">Arabic (native), English (professional)</dd>
            </div>
          </dl>
        </aside>
      </div>

      <ol class="mt-20 grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-4 md:mt-28">
        <li
          v-for="(p, i) in principles"
          :key="p.title"
          v-reveal="i * 80"
          class="principle group flex flex-col bg-paper p-7 transition-colors duration-500 hover:bg-paper-2"
        >
          <span class="font-mono text-[0.72rem] text-signal-ink">P—0{{ i + 1 }}</span>
          <h3 class="mt-10 font-display text-[1.35rem] font-semibold leading-tight tracking-tight">{{ p.title }}</h3>
          <p class="mt-3 text-[0.95rem] leading-relaxed text-mute">{{ p.body }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>
