<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowUpRight, Menu, X } from 'lucide-vue-next'
import BrandMark from '@/components/ui/BrandMark.vue'
import { navItems } from '@/content/nav'
import { profile } from '@/content/profile'

const route = useRoute()
const scrolled = ref(false)
const open = ref(false)
const menuButton = ref<HTMLButtonElement>()
const panel = ref<HTMLElement>()

const overDark = ref(false)

// Switch to the ink theme while a dark (.on-ink) section sits under the header.
function onScroll() {
  scrolled.value = window.scrollY > 12
  const below = document.elementsFromPoint(window.innerWidth / 2, 76).find((el) => !el.closest('header'))
  overDark.value = !!below?.closest('.on-ink')
}

function close(returnFocus = true) {
  open.value = false
  if (returnFocus) menuButton.value?.focus()
}

function onKeydown(e: KeyboardEvent) {
  if (!open.value) return
  if (e.key === 'Escape') return close()
  // Keep keyboard focus inside the open menu
  if (e.key === 'Tab' && panel.value) {
    const items = panel.value.querySelectorAll<HTMLElement>('a, button')
    const first = items[0]
    const last = items[items.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }
}

watch(open, async (isOpen) => {
  document.documentElement.style.overflow = isOpen ? 'hidden' : ''
  if (isOpen) {
    await nextTick()
    panel.value?.querySelector<HTMLElement>('a')?.focus()
  }
})
watch(() => route.fullPath, () => {
  close(false)
  requestAnimationFrame(onScroll)
})

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKeydown)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKeydown)
  document.documentElement.style.overflow = ''
})
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500"
    :class="
      open
        ? 'border-b border-[var(--line)] bg-paper'
        : !scrolled
          ? 'border-b border-transparent'
          : overDark
            ? 'is-dark border-b border-[var(--line-dark)] bg-ink/85 text-paper backdrop-blur-xl'
            : 'border-b border-[var(--line)] bg-paper/85 backdrop-blur-xl backdrop-saturate-150'
    "
  >
    <div class="shell flex h-[var(--header-h)] items-center justify-between gap-6">
      <RouterLink
        to="/"
        class="group flex items-center gap-3"
      >
        <span class="sr-only sm:hidden">{{ profile.name }} — home</span>
        <span class="block size-9 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-rotate-6">
          <BrandMark :inverted="overDark && scrolled && !open" />
        </span>
        <span class="hidden leading-tight sm:block">
          <span class="block font-display text-[1.05rem] font-semibold tracking-tight">{{ profile.name }}</span>
          <span class="block font-mono text-[0.68rem] uppercase tracking-[0.12em] text-mute">Mobile · Fintech</span>
        </span>
      </RouterLink>

      <nav aria-label="Primary" class="hidden lg:block">
        <ul class="flex items-center gap-1">
          <li v-for="item in navItems" :key="item.hash">
            <RouterLink
              :to="{ path: '/', hash: item.hash }"
              class="nav-link relative rounded-full px-4 py-2 text-[0.92rem] font-medium text-ink/80 transition-colors hover:text-ink"
            >
              {{ item.label }}
            </RouterLink>
          </li>
        </ul>
      </nav>

      <div class="flex items-center gap-2">
        <RouterLink
          :to="{ path: '/', hash: '#contact' }"
          class="header-cta hidden h-11 items-center gap-2 rounded-full bg-ink px-5 text-[0.9rem] font-semibold text-paper transition-colors duration-300 hover:bg-signal hover:text-ink sm:inline-flex"
        >
          Start a project
          <ArrowUpRight class="size-4" aria-hidden="true" />
        </RouterLink>
        <button
          ref="menuButton"
          type="button"
          class="menu-btn inline-flex size-11 items-center justify-center rounded-full border border-[var(--line)] lg:hidden"
          :aria-expanded="open"
          aria-controls="mobile-menu"
          :aria-label="open ? 'Close menu' : 'Open menu'"
          @click="open = !open"
        >
          <X v-if="open" class="size-5" aria-hidden="true" />
          <Menu v-else class="size-5" aria-hidden="true" />
        </button>
      </div>
    </div>

    <Transition name="sheet">
      <div
        v-if="open"
        id="mobile-menu"
        ref="panel"
        class="fixed inset-x-0 bottom-0 top-[var(--header-h)] flex flex-col overflow-y-auto bg-paper lg:hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
      >
        <nav aria-label="Mobile" class="shell flex flex-1 flex-col pt-6 pb-8">
          <ul class="flex-1">
            <li
              v-for="(item, i) in navItems"
              :key="item.hash"
              class="sheet-item border-b border-[var(--line)]"
              :style="{ '--i': i }"
            >
              <RouterLink
                :to="{ path: '/', hash: item.hash }"
                class="flex items-baseline justify-between py-5 font-display text-[2.2rem] font-semibold tracking-tight"
              >
                {{ item.label }}
                <span class="font-mono text-xs text-mute">0{{ i + 1 }}</span>
              </RouterLink>
            </li>
          </ul>
          <div class="mt-8 grid gap-3">
            <RouterLink
              :to="{ path: '/', hash: '#contact' }"
              class="flex h-14 items-center justify-center gap-2 rounded-full bg-ink font-semibold text-paper"
            >
              Start a project <ArrowUpRight class="size-4" aria-hidden="true" />
            </RouterLink>
            <a
              :href="`mailto:${profile.email}`"
              class="flex h-14 items-center justify-center rounded-full border border-[var(--line)] font-medium"
            >
              {{ profile.email }}
            </a>
          </div>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.nav-link::after {
  content: '';
  position: absolute;
  left: 1rem;
  right: 1rem;
  bottom: 0.35rem;
  height: 1px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.5s var(--ease-out-expo);
}
.nav-link:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}

.sheet-enter-active,
.sheet-leave-active {
  transition: opacity 0.35s var(--ease-out-expo);
}
.sheet-enter-from,
.sheet-leave-to {
  opacity: 0;
}
.sheet-enter-active .sheet-item {
  transition:
    transform 0.6s var(--ease-out-expo),
    opacity 0.6s var(--ease-out-expo);
  transition-delay: calc(var(--i) * 45ms);
}
.sheet-enter-from .sheet-item {
  opacity: 0;
  transform: translateY(16px);
}
.is-dark .nav-link {
  color: rgb(241 239 233 / 0.8);
}
.is-dark .nav-link:hover {
  color: var(--color-paper);
}
.is-dark .header-cta {
  background: var(--color-paper);
  color: var(--color-ink);
}
.is-dark .header-cta:hover {
  background: var(--color-signal);
}
.is-dark .menu-btn {
  border-color: var(--line-dark);
}
.is-dark .text-mute {
  color: var(--color-mute-dark);
}
</style>
