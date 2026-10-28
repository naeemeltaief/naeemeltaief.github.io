<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Map, Ship, Users } from 'lucide-vue-next'
import ProjectVisual from '@/components/visuals/ProjectVisual.vue'
import ButtonLink from '@/components/ui/ButtonLink.vue'
import NotFoundView from './NotFoundView.vue'
import { findProject, projects, type IconName } from '@/content/projects'
import { profile } from '@/content/profile'
import { useHead } from '@/composables/head'

const props = defineProps<{ slug: string }>()

const project = computed(() => findProject(props.slug))
const next = computed(() => {
  const i = projects.findIndex((p) => p.slug === props.slug)
  return projects[(i + 1) % projects.length]
})
// Development-only checklist of missing content; tree-shaken out of production builds.
const PendingNote = import.meta.env.DEV ? defineAsyncComponent(() => import('@/components/ui/PendingNote.vue')) : null
const icons: Record<IconName, typeof Map> = { users: Users, map: Map, ship: Ship }

useHead(() =>
  project.value
    ? {
        title: `${project.value.title} — ${project.value.kicker} · ${profile.name}`,
        description: project.value.summary,
        path: `/work/${project.value.slug}`,
      }
    : { title: `Page not found · ${profile.name}`, path: `/work/${props.slug}` },
)

const meta = computed(() => {
  const p = project.value
  if (!p) return []
  return [
    p.context && { label: 'Built at', value: p.context },
    p.client && { label: 'Client', value: p.client },
    p.role && { label: 'Role', value: p.role },
    { label: 'Platforms', value: p.platforms.join(' · ') },
    { label: 'Domain', value: p.domain },
  ].filter(Boolean) as { label: string; value: string }[]
})
</script>

<template>
  <NotFoundView v-if="!project" />
  <article v-else :aria-labelledby="`cs-${project.slug}`">
    <!-- Intro -->
    <header class="relative overflow-hidden pt-[calc(var(--header-h)+2.5rem)] md:pt-[calc(var(--header-h)+4rem)]">
      <div class="blueprint pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(70%_80%_at_80%_0%,#000,transparent)]" aria-hidden="true" />
      <div class="shell">
        <RouterLink
          :to="{ path: '/', hash: '#work' }"
          class="group inline-flex items-center gap-2 text-sm font-medium text-mute transition-colors hover:text-ink"
        >
          <ArrowLeft class="size-4 transition-transform duration-500 group-hover:-translate-x-1" aria-hidden="true" />
          All work
        </RouterLink>

        <div class="mt-10 grid gap-10 lg:grid-cols-12">
          <div class="lg:col-span-8">
            <p v-reveal class="eyebrow text-signal-ink">{{ project.kicker }}</p>
            <h1 :id="`cs-${project.slug}`" v-reveal="60" class="display-xl mt-5">{{ project.title }}</h1>
            <p v-reveal="120" class="lede mt-7 max-w-[52ch] text-mute">{{ project.summary }}</p>
          </div>
          <dl v-reveal="160" class="grid content-end gap-4 self-end border-t border-[var(--line)] pt-5 text-sm lg:col-span-4">
            <div v-for="m in meta" :key="m.label" class="grid grid-cols-[6.5rem_1fr] gap-3">
              <dt class="text-mute">{{ m.label }}</dt>
              <dd class="font-medium">{{ m.value }}</dd>
            </div>
          </dl>
        </div>
      </div>
    </header>

    <!-- Hero visual -->
    <div class="shell mt-14">
      <div v-reveal class="on-ink overflow-hidden rounded-[var(--radius-lg)] bg-ink">
        <ProjectVisual v-if="project.visual" :kind="project.visual" class="!aspect-[16/9] max-md:!aspect-[4/3.4]" />
        <div v-else class="blueprint-dark relative grid aspect-[16/7] place-items-center text-paper max-md:aspect-[4/3]">
          <div class="flex flex-col items-center text-center">
            <span class="grid size-20 place-items-center rounded-3xl bg-signal text-ink">
              <component :is="icons[project.icon!]" class="size-9" aria-hidden="true" />
            </span>
            <p class="mt-6 font-display text-[clamp(2rem,6vw,4.5rem)] font-semibold tracking-tight">{{ project.title }}</p>
            <p class="font-mono text-xs uppercase tracking-[0.14em] text-mute-dark">{{ project.domain }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Body -->
    <div class="shell grid gap-16 py-20 md:py-28 lg:grid-cols-12 lg:gap-10">
      <div class="space-y-16 lg:col-span-8">
        <section v-reveal aria-labelledby="cs-challenge">
          <h2 id="cs-challenge" class="eyebrow text-mute">The challenge</h2>
          <p class="mt-5 font-display text-[clamp(1.4rem,2.4vw,2rem)] font-medium leading-snug tracking-tight">
            {{ project.problem }}
          </p>
        </section>

        <section aria-labelledby="cs-approach">
          <h2 id="cs-approach" v-reveal class="eyebrow text-mute">Approach</h2>
          <ol class="mt-6 grid gap-px overflow-hidden rounded-[var(--radius-md)] border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2">
            <li v-for="(a, i) in project.approach" :key="a.title" v-reveal="i * 70" class="bg-paper p-6 sm:p-7" :class="project.approach.length === 1 ? 'sm:col-span-2' : ''">
              <span class="font-mono text-[0.72rem] text-signal-ink">{{ String(i + 1).padStart(2, '0') }}</span>
              <h3 class="mt-4 font-display text-[1.25rem] font-semibold tracking-tight">{{ a.title }}</h3>
              <p class="mt-2 leading-relaxed text-mute">{{ a.body }}</p>
            </li>
          </ol>
        </section>

        <section v-reveal aria-labelledby="cs-delivered">
          <h2 id="cs-delivered" class="eyebrow text-mute">What was delivered</h2>
          <ul class="mt-6 grid gap-3">
            <li v-for="d in project.delivered" :key="d" class="flex items-start gap-3 text-[1.05rem] leading-relaxed">
              <span class="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-ink text-paper">
                <Check class="size-3" aria-hidden="true" />
              </span>
              {{ d }}
            </li>
          </ul>
        </section>

        <component :is="PendingNote" v-if="PendingNote" :slug="project.slug" />
      </div>

      <aside class="lg:col-span-4">
        <div v-reveal class="sticky top-28 grid gap-8">
          <div>
            <h2 class="eyebrow text-mute">Stack</h2>
            <ul class="mt-4 flex flex-wrap gap-2">
              <li v-for="s in project.stack" :key="s" class="rounded-full border border-[var(--line)] px-3.5 py-1.5 text-sm">{{ s }}</li>
            </ul>
          </div>
          <div v-if="project.links?.length">
            <h2 class="eyebrow text-mute">Links</h2>
            <ul class="mt-4 grid gap-2">
              <li v-for="l in project.links" :key="l.href">
                <a :href="l.href" target="_blank" rel="noopener noreferrer" class="group inline-flex items-center gap-2 font-semibold underline decoration-[var(--line)] underline-offset-[5px] hover:decoration-signal">
                  {{ l.label }}
                  <ArrowUpRight class="size-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  <span class="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            </ul>
          </div>
          <div class="rounded-[var(--radius-md)] bg-ink p-6 text-paper">
            <p class="font-display text-[1.3rem] font-semibold leading-snug tracking-tight">Building something similar?</p>
            <p class="mt-2 text-sm text-mute-dark">I’m happy to talk through the architecture.</p>
            <ButtonLink :to="{ path: '/', hash: '#contact' }" variant="signal" class="mt-5">
              Start a conversation <ArrowRight class="arrow size-4" aria-hidden="true" />
            </ButtonLink>
          </div>
        </div>
      </aside>
    </div>

    <!-- Next -->
    <nav aria-label="Next case study" class="border-t border-[var(--line)]">
      <RouterLink :to="`/work/${next.slug}`" class="shell group flex items-center justify-between gap-6 py-12 md:py-16">
        <span>
          <span class="eyebrow block text-mute">Next case study</span>
          <span class="mt-3 block font-display text-[clamp(1.8rem,5vw,4rem)] font-semibold leading-none tracking-tight transition-colors duration-500 group-hover:text-signal-ink">
            {{ next.title }}
          </span>
        </span>
        <span class="grid size-14 shrink-0 place-items-center rounded-full border border-[var(--line)] transition-all duration-500 group-hover:border-ink group-hover:bg-ink group-hover:text-paper md:size-20">
          <ArrowRight class="size-6" aria-hidden="true" />
        </span>
      </RouterLink>
    </nav>
  </article>
</template>
