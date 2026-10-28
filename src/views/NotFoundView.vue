<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next'
import ButtonLink from '@/components/ui/ButtonLink.vue'
import { useHead } from '@/composables/head'
import { profile } from '@/content/profile'

useHead({ title: `Page not found · ${profile.name}`, path: '/404' })
</script>

<template>
  <section class="blueprint relative flex min-h-[80svh] items-center pt-[var(--header-h)]">
    <div class="shell py-24">
      <p class="eyebrow text-signal-ink">Error 404</p>
      <h1 class="display-xl mt-6 max-w-[14ch]">This screen isn’t in the build.</h1>
      <p class="lede mt-6 max-w-[44ch] text-mute">The page you’re looking for doesn’t exist or has moved.</p>
      <div class="mt-10">
        <ButtonLink to="/" size="lg"><ArrowLeft class="size-4" aria-hidden="true" /> Back to the homepage</ButtonLink>
      </div>
    </div>
  </section>
</template>
