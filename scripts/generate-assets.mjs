// Renders brand assets (OG image + PNG icons) with a local Chrome.
// Requires: npm i -D playwright-core  (uses your installed Google Chrome).
import { chromium } from 'playwright-core'
import { readFileSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = new URL('..', import.meta.url)
const out = (f) => fileURLToPath(new URL(`public/${f}`, root))
const browser = await chromium.launch({ channel: 'chrome' })

const og = await browser.newPage({ viewport: { width: 1200, height: 630 } })
await og.goto(pathToFileURL(fileURLToPath(new URL('scripts/og-image.html', root))).href)
await og.evaluate(() => document.fonts.ready)
await og.screenshot({ path: out('og-image.png') })

const svg = readFileSync(out('favicon.svg'), 'utf8')
for (const [file, size, pad] of [['favicon-32.png', 32, 0], ['apple-touch-icon.png', 180, 0], ['icon-192.png', 192, 0], ['icon-512.png', 512, 0]]) {
  const p = await browser.newPage({ viewport: { width: size, height: size } })
  await p.setContent(`<body style="margin:0;padding:${pad}px">${svg.replace('<svg', `<svg width="${size}" height="${size}"`)}</body>`)
  await p.screenshot({ path: out(file), omitBackground: true })
}
await browser.close()
console.log('assets written to public/')
