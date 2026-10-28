import { watchEffect, type MaybeRefOrGetter, toValue } from 'vue'
import { profile } from '@/content/profile'

const site = (import.meta.env.VITE_SITE_URL || '').replace(/\/$/, '')

function setMeta(selector: string, attr: 'content' | 'href', value: string) {
  document.head.querySelector(selector)?.setAttribute(attr, value)
}

/** Keeps title, description, canonical and OG tags in sync with the current view. */
export function useHead(input: MaybeRefOrGetter<{ title?: string; description?: string; path: string }>) {
  watchEffect(() => {
    const { title = profile.seo.title, description = profile.seo.description, path } = toValue(input)
    document.title = title
    setMeta('meta[name="description"]', 'content', description)
    setMeta('meta[property="og:title"]', 'content', title)
    setMeta('meta[property="og:description"]', 'content', description)
    setMeta('meta[name="twitter:title"]', 'content', title)
    setMeta('meta[name="twitter:description"]', 'content', description)
    if (site) {
      setMeta('meta[property="og:url"]', 'content', site + path)
      setMeta('link[rel="canonical"]', 'href', site + path)
    }
  })
}
