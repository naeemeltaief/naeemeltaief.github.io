<script setup lang="ts">
import { computed } from 'vue'
import { pending } from '@/content/pending'

const props = defineProps<{ slug: string }>()
const items = computed(() => pending[props.slug] ?? [])
</script>

<template>
  <aside v-if="items.length" class="rounded-[var(--radius-md)] border-2 border-dashed border-signal p-6">
    <p class="eyebrow text-signal-ink">Dev only · content to supply</p>
    <ul class="mt-3 list-disc space-y-1 pl-5 text-sm text-mute">
      <li v-for="p in items" :key="p">{{ p }}</li>
    </ul>
  </aside>
</template>
