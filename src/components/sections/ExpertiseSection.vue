<script setup lang="ts">
import { computed, ref } from 'vue'
import { CornerDownRight } from 'lucide-vue-next'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import { capabilities } from '@/content/capabilities'

const active = ref(0)
const current = computed(() => capabilities[active.value])
const tabs = ref<HTMLButtonElement[]>([])

// WAI-ARIA tabs: arrow keys move between tabs, Home/End jump.
function onKey(e: KeyboardEvent) {
  const last = capabilities.length - 1
  const map: Record<string, number> = {
    ArrowDown: active.value === last ? 0 : active.value + 1,
    ArrowRight: active.value === last ? 0 : active.value + 1,
    ArrowUp: active.value === 0 ? last : active.value - 1,
    ArrowLeft: active.value === 0 ? last : active.value - 1,
    Home: 0,
    End: last,
  }
  if (!(e.key in map)) return
  e.preventDefault()
  active.value = map[e.key]
  tabs.value[active.value]?.focus()
}
</script>

<template>
  <section id="expertise" aria-labelledby="expertise-title" class="relative isolate overflow-clip py-24 md:py-36">
    <div class="aurora aurora--soft" aria-hidden="true" />
    <div class="shell">
      <SectionHeading id="expertise-title" index="04" eyebrow="Expertise" title="Five capabilities, each with a track record.">
        No percentage bars. Each group below names the tools — and where I’ve actually used them.
      </SectionHeading>

      <div v-reveal class="glass mt-14 grid overflow-hidden rounded-[var(--radius-lg)] md:mt-20 lg:grid-cols-12">
        <div
          role="tablist"
          aria-label="Capability groups"
          aria-orientation="vertical"
          class="flex gap-1 overflow-x-auto border-b border-[var(--line)] bg-white/25 p-2 [scrollbar-width:none] lg:col-span-4 lg:flex-col lg:border-b-0 lg:border-r lg:p-3"
          @keydown="onKey"
        >
          <button
            v-for="(c, i) in capabilities"
            :id="`tab-${c.id}`"
            :key="c.id"
            ref="tabs"
            type="button"
            role="tab"
            :aria-selected="active === i"
            :aria-controls="`panel-${c.id}`"
            :tabindex="active === i ? 0 : -1"
            class="tab group flex shrink-0 items-center gap-4 rounded-2xl px-4 py-3.5 text-left transition-colors duration-300 lg:py-5"
            :class="active === i ? 'bg-ink text-paper' : 'text-ink/75 hover:bg-paper-3/60 hover:text-ink'"
            @click="active = i"
          >
            <span class="font-mono text-[0.72rem]" :class="active === i ? 'text-signal' : 'text-mute'">{{ c.label }}</span>
            <span class="font-display text-[1.05rem] font-semibold tracking-tight whitespace-nowrap lg:text-[1.3rem]">{{ c.title }}</span>
          </button>
        </div>

        <div
          :id="`panel-${current.id}`"
          role="tabpanel"
          :aria-labelledby="`tab-${current.id}`"
          tabindex="0"
          class="relative min-h-[26rem] p-7 sm:p-10 lg:col-span-8 lg:p-14"
        >
          <Transition name="swap" mode="out-in">
            <div :key="current.id">
              <p class="font-mono text-[0.72rem] text-signal-ink">{{ current.label }} / 0{{ capabilities.length }}</p>
              <h3 class="display-md mt-4">{{ current.title }}</h3>
              <p class="lede mt-4 max-w-[52ch] text-mute">{{ current.description }}</p>
              <ul class="mt-8 flex flex-wrap gap-2" aria-label="Skills">
                <li
                  v-for="(s, i) in current.skills"
                  :key="s"
                  class="skill rounded-full border border-[var(--line)] bg-paper px-4 py-2 text-[0.92rem] font-medium"
                  :style="{ '--i': i }"
                >
                  {{ s }}
                </li>
              </ul>
              <p class="mt-10 flex items-start gap-3 border-t border-[var(--line)] pt-6 text-[0.95rem]">
                <CornerDownRight class="mt-0.5 size-4 shrink-0 text-signal-ink" aria-hidden="true" />
                <span><span class="font-semibold">Where: </span><span class="text-mute">{{ current.evidence }}</span></span>
              </p>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.tablist::-webkit-scrollbar {
  display: none;
}
.swap-enter-active {
  transition:
    opacity 0.45s var(--ease-out-expo),
    transform 0.45s var(--ease-out-expo);
}
.swap-leave-active {
  transition: opacity 0.15s;
}
.swap-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.swap-leave-to {
  opacity: 0;
}
.swap-enter-active .skill {
  transition:
    opacity 0.5s var(--ease-out-expo),
    transform 0.5s var(--ease-out-expo);
  transition-delay: calc(var(--i) * 30ms + 80ms);
}
.swap-enter-from .skill {
  opacity: 0;
  transform: translateY(8px);
}
</style>
