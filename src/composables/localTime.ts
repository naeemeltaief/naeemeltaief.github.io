import { onBeforeUnmount, onMounted, ref } from 'vue'

/** Current wall-clock time in a given IANA zone, refreshed every 30s. */
export function useLocalTime(timeZone: string) {
  const fmt = new Intl.DateTimeFormat('en-GB', { timeZone, hour: '2-digit', minute: '2-digit' })
  const time = ref(fmt.format(new Date()))
  let id: number | undefined
  onMounted(() => (id = window.setInterval(() => (time.value = fmt.format(new Date())), 30_000)))
  onBeforeUnmount(() => clearInterval(id))
  return time
}
