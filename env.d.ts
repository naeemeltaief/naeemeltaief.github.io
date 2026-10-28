/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Public site origin, used for canonical URLs, OG tags and the sitemap. */
  readonly VITE_SITE_URL?: string
  /** Optional form endpoint (e.g. Formspree). Without it the contact form composes an email instead. */
  readonly VITE_FORM_ENDPOINT?: string
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}
