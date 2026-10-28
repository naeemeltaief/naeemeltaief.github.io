import { defineConfig, loadEnv, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { projects } from './src/content/projects.ts'
import { profile } from './src/content/profile.ts'

/**
 * Static-host helpers, run after the client build:
 *  - one index.html per case study with route-specific <title>, description, canonical and OG tags
 *    (social previews + deep links work on any static host, no server rewrites needed)
 *  - 404.html SPA fallback (GitHub Pages), sitemap.xml and robots.txt using VITE_SITE_URL
 */
function staticRoutes(siteUrl: string): Plugin {
  const site = siteUrl.replace(/\/$/, '')
  const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
  let outDir = 'dist'

  return {
    name: 'static-routes',
    apply: 'build',
    configResolved(c) {
      outDir = c.build.outDir
    },
    closeBundle() {
      const base = readFileSync(resolve(outDir, 'index.html'), 'utf8')
      const withMeta = (html: string, title: string, description: string, path: string) =>
        html
          .replace(/<title>.*?<\/title>/, `<title>${esc(title)}</title>`)
          .replace(/(name="description" content=")[^"]*"/, `$1${esc(description)}"`)
          .replace(/(property="og:title" content=")[^"]*"/, `$1${esc(title)}"`)
          .replace(/(property="og:description" content=")[^"]*"/, `$1${esc(description)}"`)
          .replace(/(name="twitter:title" content=")[^"]*"/, `$1${esc(title)}"`)
          .replace(/(name="twitter:description" content=")[^"]*"/, `$1${esc(description)}"`)
          .replace(/(property="og:url" content=")[^"]*"/, `$1${site}${path}"`)
          .replace(/(rel="canonical" href=")[^"]*"/, `$1${site}${path}"`)

      for (const p of projects) {
        const path = `/work/${p.slug}`
        const dir = resolve(outDir, `work/${p.slug}`)
        mkdirSync(dir, { recursive: true })
        writeFileSync(
          resolve(dir, 'index.html'),
          withMeta(base, `${p.title} — ${p.kicker} · ${profile.name}`, p.summary, path),
        )
      }

      writeFileSync(
        resolve(outDir, '404.html'),
        withMeta(base, `Page not found · ${profile.name}`, profile.seo.description, '/').replace(
          '<head>',
          '<head>\n    <meta name="robots" content="noindex" />',
        ),
      )

      const urls = ['/', ...projects.map((p) => `/work/${p.slug}`)]
      const today = new Date().toISOString().slice(0, 10)
      writeFileSync(
        resolve(outDir, 'sitemap.xml'),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
          .map((u) => `  <url><loc>${site}${u}</loc><lastmod>${today}</lastmod></url>`)
          .join('\n')}\n</urlset>\n`,
      )
      writeFileSync(resolve(outDir, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap.xml\n`)
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const siteUrl = env.VITE_SITE_URL || 'https://naeemeltaief.tech'

  return {
    plugins: [vue(), tailwindcss(), staticRoutes(siteUrl)],
    resolve: {
      alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
    },
    build: {
      target: 'es2020',
      cssCodeSplit: true,
    },
  }
})
