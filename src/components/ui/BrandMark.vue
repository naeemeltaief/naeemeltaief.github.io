<script setup lang="ts">
defineProps<{ inverted?: boolean }>()
</script>

<template>
  <svg viewBox="0 0 64 64" aria-hidden="true" class="h-full w-full">
    <rect width="64" height="64" rx="16" :fill="inverted ? '#f1efe9' : '#0c0e12'" />
    <path
      d="M17 46V18h6.2l13.6 18.4V18H43v28h-6.1L23.2 27.6V46z"
      :fill="inverted ? '#0c0e12' : '#f1efe9'"
    />
    <circle cx="49.5" cy="42.5" r="4.5" fill="#ff5a1f" />
  </svg>
</template>
