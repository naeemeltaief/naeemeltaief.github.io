<script setup lang="ts">
import { ArrowUpRight, GraduationCap, Map, Ship, Users } from 'lucide-vue-next'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import ProjectVisual from '@/components/visuals/ProjectVisual.vue'
import { featuredProjects, indexProjects, type IconName } from '@/content/projects'

const icons: Record<IconName, typeof Map> = { graduation: GraduationCap, users: Users, map: Map, ship: Ship }
</script>

<template>
  <section id="work" aria-labelledby="work-title" class="on-ink relative bg-ink py-24 text-paper md:py-36">
    <div class="shell">
      <SectionHeading id="work-title" index="01" eyebrow="Selected work" title="Payments, public services and the tools in between." dark>
        A few projects where the engineering mattered as much as the interface. Each one opens into a short case study.
      </SectionHeading>

      <ol class="mt-16 grid gap-6 md:mt-24 md:gap-8">
        <li
          v-for="(p, i) in featuredProjects"
          :key="p.slug"
          v-reveal
          class="group relative grid overflow-hidden rounded-[var(--radius-lg)] border border-[var(--line-dark)] bg-ink-2 transition-colors duration-500 hover:border-paper/25 lg:grid-cols-12"
        >
          <div class="lg:col-span-7" :class="i % 2 ? 'lg:order-2' : ''">
            <ProjectVisual :kind="p.visual!" class="h-full min-h-full" />
          </div>
          <div class="flex flex-col p-6 sm:p-8 lg:col-span-5 lg:p-10" :class="i % 2 ? 'lg:order-1' : ''">
            <div class="flex items-center justify-between gap-4">
              <span class="font-mono text-[0.72rem] text-signal">0{{ i + 1 }}</span>
              <span class="eyebrow text-mute-dark">{{ p.domain }}</span>
            </div>
            <h3 class="mt-8 font-display text-[clamp(1.7rem,3vw,2.6rem)] font-semibold leading-[1.02] tracking-tight">
              <RouterLink :to="`/work/${p.slug}`" class="after:absolute after:inset-0 after:content-['']">
                {{ p.title }}
              </RouterLink>
            </h3>
            <p class="mt-2 font-mono text-[0.8rem] text-mute-dark">{{ p.kicker }}</p>
            <p class="mt-6 max-w-[42ch] leading-relaxed text-paper/80">{{ p.summary }}</p>

            <dl class="mt-8 grid grid-cols-2 gap-4 border-t border-[var(--line-dark)] pt-6 text-sm">
              <div v-if="p.context || p.client">
                <dt class="text-mute-dark">{{ p.context ? 'Built at' : 'Client' }}</dt>
                <dd class="mt-1">{{ p.context ?? p.client }}</dd>
              </div>
              <div>
                <dt class="text-mute-dark">Platforms</dt>
                <dd class="mt-1">{{ p.platforms.join(' · ') }}</dd>
              </div>
            </dl>

            <span
              class="mt-auto inline-flex items-center gap-2 pt-10 text-[0.95rem] font-semibold"
              aria-hidden="true"
            >
              Read the case study
              <span class="grid size-9 place-items-center rounded-full border border-[var(--line-dark)] transition-all duration-500 group-hover:rotate-45 group-hover:border-signal group-hover:bg-signal group-hover:text-ink">
                <ArrowUpRight class="size-4" />
              </span>
            </span>
          </div>
        </li>
      </ol>

      <!-- Index of further work -->
      <div class="mt-24 grid gap-8 md:grid-cols-12">
        <h3 v-reveal class="eyebrow text-mute-dark md:col-span-3">Also shipped</h3>
        <ul class="border-t border-[var(--line-dark)] md:col-span-9">
          <li v-for="p in indexProjects" :key="p.slug" v-reveal class="border-b border-[var(--line-dark)]">
            <RouterLink
              :to="`/work/${p.slug}`"
              class="row group/row grid grid-cols-[auto_1fr_auto] items-center gap-x-5 gap-y-1 py-6 md:grid-cols-[auto_14rem_1fr_auto]"
            >
              <span class="grid size-11 place-items-center rounded-full border border-[var(--line-dark)] text-mute-dark transition-colors duration-500 group-hover/row:border-signal group-hover/row:text-signal">
                <component :is="icons[p.icon!]" class="size-5" aria-hidden="true" />
              </span>
              <span>
                <span class="block font-display text-[1.35rem] font-semibold tracking-tight">{{ p.title }}</span>
                <span class="block text-sm text-mute-dark md:hidden">{{ p.kicker }}</span>
              </span>
              <span class="hidden text-[0.95rem] leading-snug text-paper/70 md:block">{{ p.summary }}</span>
              <ArrowUpRight
                class="size-5 text-mute-dark transition-transform duration-500 group-hover/row:-translate-y-0.5 group-hover/row:translate-x-0.5 group-hover/row:text-paper"
                aria-hidden="true"
              />
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.row {
  transition: padding 0.5s var(--ease-out-expo);
}
@media (hover: hover) {
  .row:hover {
    padding-left: 0.75rem;
  }
}
</style>
