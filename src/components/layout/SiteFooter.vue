<script setup lang="ts">
import { ArrowUp, ArrowUpRight } from 'lucide-vue-next'
import BrandMark from '@/components/ui/BrandMark.vue'
import { navItems } from '@/content/nav'
import { profile } from '@/content/profile'

const year = new Date().getFullYear()
const elsewhere = [
  { label: 'LinkedIn', href: profile.links.linkedin },
  { label: 'GitHub', href: profile.links.github },
  { label: 'pub.dev', href: profile.links.pubdev },
]
</script>

<template>
  <footer class="on-ink relative overflow-hidden bg-ink text-paper">
    <div class="shell"><div class="grid gap-12 border-t border-[var(--line-dark)] py-16 md:grid-cols-12">
      <div class="md:col-span-5">
        <div class="flex items-center gap-3">
          <span class="block size-10"><BrandMark inverted /></span>
          <div>
            <p class="font-display text-lg font-semibold">{{ profile.name }}</p>
            <p class="text-sm text-mute-dark">{{ profile.role }} · {{ profile.location }}</p>
          </div>
        </div>
        <p class="mt-6 max-w-sm text-[0.95rem] leading-relaxed text-mute-dark">
          Mobile products people rely on — engineered to keep working long after launch day.
        </p>
      </div>

      <nav aria-label="Footer" class="md:col-span-3">
        <h2 class="eyebrow mb-4 text-mute-dark">Index</h2>
        <ul class="grid grid-cols-2 gap-x-6 gap-y-2.5 md:grid-cols-1">
          <li v-for="item in navItems" :key="item.hash">
            <RouterLink :to="{ path: '/', hash: item.hash }" class="footer-link">{{ item.label }}</RouterLink>
          </li>
          <li><RouterLink :to="{ path: '/', hash: '#contact' }" class="footer-link">Contact</RouterLink></li>
        </ul>
      </nav>

      <div class="md:col-span-4">
        <h2 class="eyebrow mb-4 text-mute-dark">Elsewhere</h2>
        <ul class="grid gap-2.5">
          <li v-for="l in elsewhere" :key="l.href">
            <a :href="l.href" target="_blank" rel="noopener noreferrer" class="footer-link inline-flex items-center gap-1.5">
              {{ l.label }} <ArrowUpRight class="size-3.5 opacity-60" aria-hidden="true" />
              <span class="sr-only">(opens in a new tab)</span>
            </a>
          </li>
          <li>
            <a :href="profile.cvPath" download class="footer-link">Download CV (PDF)</a>
          </li>
          <li>
            <a :href="`mailto:${profile.email}`" class="footer-link">{{ profile.email }}</a>
          </li>
        </ul>
      </div>
    </div></div>

    <!-- Closing visual: oversized wordmark sitting on the baseline -->
    <div class="shell" aria-hidden="true">
      <!-- Drawn with generated content so it stays purely decorative -->
      <p class="wordmark select-none font-display font-semibold leading-[0.78] tracking-[-0.06em]" data-word="Naeem" />
    </div>

    <div class="shell"><div class="flex flex-col items-start justify-between gap-4 border-t border-[var(--line-dark)] py-6 text-sm text-mute-dark sm:flex-row sm:items-center">
      <p>© {{ year }} {{ profile.name }}. Designed and built with Vue.</p>
      <a href="#main" class="inline-flex items-center gap-2 transition-colors hover:text-paper">
        Back to top <ArrowUp class="size-4" aria-hidden="true" />
      </a>
    </div></div>
  </footer>
</template>

<style scoped>
.wordmark {
  font-size: clamp(5rem, 26vw, 24rem);
  margin-bottom: -0.04em;
}
.wordmark::before {
  content: attr(data-word);
  color: rgb(241 239 233 / 0.07);
}
.wordmark::after {
  content: '.';
  color: rgb(255 90 31 / 0.5);
}
.footer-link {
  color: var(--color-paper);
  background-image: linear-gradient(currentColor, currentColor);
  background-size: 0% 1px;
  background-position: 0 100%;
  background-repeat: no-repeat;
  transition: background-size 0.5s var(--ease-out-expo);
}
.footer-link:hover {
  background-size: 100% 1px;
}
</style>
