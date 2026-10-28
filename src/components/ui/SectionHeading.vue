<script setup lang="ts">
withDefaults(
  defineProps<{
    index: string
    eyebrow: string
    title: string
    id?: string
    dark?: boolean
  }>(),
  { dark: false },
)
</script>

<template>
  <header class="grid gap-6 md:grid-cols-12 md:gap-8">
    <div class="md:col-span-3">
      <p v-reveal class="eyebrow flex items-center gap-3" :class="dark ? 'text-mute-dark' : 'text-mute'">
        <span :class="dark ? 'text-signal' : 'text-signal-ink'">{{ index }}</span>
        <span class="h-px w-8 bg-current opacity-40" aria-hidden="true" />
        {{ eyebrow }}
      </p>
    </div>
    <div class="md:col-span-9">
      <h2 :id="id" v-reveal="60" class="display-lg max-w-[18ch]">{{ title }}</h2>
      <div
        v-if="$slots.default"
        v-reveal="120"
        class="lede mt-6 max-w-[58ch]"
        :class="dark ? 'text-mute-dark' : 'text-mute'"
      >
        <slot />
      </div>
    </div>
  </header>
</template>
