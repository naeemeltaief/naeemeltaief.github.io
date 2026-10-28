# Naeem Eltaief — Portfolio

Personal site for **Naeem Eltaief, Technical Mobile Team Lead**. It's built with Vue 3, Vite, TypeScript, Tailwind CSS v4 and GSAP.

There are three kinds of page: one long home page, eight case-study pages (`/work/:slug`) and a 404 page. Each case-study URL gets its own pre-built HTML file, so links and social previews work on any static host.

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build → dist/
npm run preview    # serve dist/ locally
```

You need Node 20 or newer.

## Configuration

Copy `.env.example` to `.env.local` and adjust as needed.

| Variable             | Purpose                                                                                                                                                                                       |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `VITE_SITE_URL`      | Public address of the site, with no trailing slash. It's used for canonical URLs, Open Graph tags, `sitemap.xml` and `robots.txt`. Default: `https://naeemeltaief.me`.                          |
| `VITE_FORM_ENDPOINT` | Optional. A form service that accepts JSON posts, for example a Formspree URL like `https://formspree.io/f/xxxx`. **If this is empty**, the contact form opens the visitor's email app with the message already filled in. |

### Contact form

The form always does something real; it never fakes a successful submission.

- **Without an endpoint (the default):** the form checks the input, then opens a pre-filled `mailto:` addressed to `naeem.eltaief@me.com`. The status message tells the visitor what happened and gives a fallback link.
- **With an endpoint:** the form sends the message as JSON and shows a real success or error message. To set this up with Formspree:
  1. Create a free form at formspree.io.
  2. Set `VITE_FORM_ENDPOINT=https://formspree.io/f/<id>`.
  3. Rebuild the site.

A hidden honeypot field filters out simple spam bots.

## Deployment

`npm run build` produces a fully static `dist/` folder. On top of the standard Vite build, a small plugin in `vite.config.ts` writes:

- `dist/work/<slug>/index.html` for every case study, with that page's own title, description, canonical URL and Open Graph tags
- `404.html`, which works as the fallback page for single-page apps on GitHub Pages
- `sitemap.xml` and `robots.txt`, built from `VITE_SITE_URL`

Every route exists as a real file, so **no rewrite rules are needed** on any host.

- **GitHub Pages:** `.github/workflows/deploy.yml` builds and deploys on every push to `main`. To set it up:
  1. In the repository, go to Settings → Pages → Source and choose **GitHub Actions**.
  2. Optionally, add the repository variables `SITE_URL` and `FORM_ENDPOINT`.
- **Netlify or Vercel:** set the build command to `npm run build` and the output folder to `dist`.
- **Any static host:** upload the contents of `dist/`.

> ⚠️ **Domain:** `naeemeltaief.github.io` currently redirects to `naeemeltaief.me`, but that domain doesn't resolve (no DNS records). Do one of the following:
> - Point the domain's DNS at GitHub Pages and add a `public/CNAME` file containing `naeemeltaief.me`.
> - Or set `VITE_SITE_URL` to wherever the site will actually live.

## Project structure

```
src/
  content/        ← all copy and data (edit here, not in components)
    profile.ts      name, links, SEO copy
    experience.ts   roles, dates, highlights, education
    projects.ts     case studies
    capabilities.ts skill groups, each with where it was used
    services.ts     services and the 5-step process
    pending.ts      missing case-study details (dev-only, never shipped)
    nav.ts
  components/
    layout/       SiteHeader (adapts over dark sections, accessible mobile menu), SiteFooter
    sections/     Hero, Work, About, Experience, Expertise, Services, Process, Contact
    visuals/      PhoneFrame, HeroDevice (animated tokenise → tap → approve story), ProjectVisual
    ui/           ButtonLink, SectionHeading, BrandMark, PendingNote
  composables/    v-reveal directive, reduced-motion, head/meta, local time
  styles/main.css design tokens (@theme), base styles, shared components
  views/          HomeView, CaseStudyView (lazy-loaded), NotFoundView
scripts/          OG image template + asset generator
public/           CV PDF, favicons, OG image, manifest
```

### Design system

All design tokens are defined in `src/styles/main.css` under `@theme`:

- **Colours:** paper `#f1efe9`, ink `#0c0e12`, signal `#ff5a1f`, token green `#3ddc97`.
- **Contrast-safe text colours:** `mute` and `signal-ink` for use on paper; `mute-dark` for use on ink.
- **Type:** Bricolage Grotesque (display), Inter (body) and JetBrains Mono (labels). All three are self-hosted through Fontsource.
- **Easing:** curves are defined as tokens.
- **Layout helpers:** shared classes include `.shell`, `.display-*`, `.eyebrow`, `.blueprint` and `.chip`.

### Motion

How animation is handled across the site:

- **Libraries:** GSAP and its plugins load only when needed, through dynamic import:
  - SplitText runs the hero headline reveal.
  - ScrollTrigger draws the timeline and process connector lines.
- **Scroll reveals:** these use one shared `IntersectionObserver` plus CSS transitions.
- **Hero animation:** it pauses when it's off-screen or the browser tab is hidden.
- **Reduced motion:** under `prefers-reduced-motion`, every animation is disabled and the hero shows a static final frame.

### Brand assets

`public/og-image.png` and the PNG icons are rendered from `scripts/og-image.html` and `public/favicon.svg`. To regenerate them:

```bash
npm i -D playwright-core   # uses your installed Google Chrome
node scripts/generate-assets.mjs
```

## Quality checks (last run)

- **Lighthouse (mobile), home page and case study:** Performance 100 · Accessibility 100 · Best Practices 100 · SEO 100. Measured values: CLS 0.012, LCP 1.5 s, TBT 50 ms.
- **Automated browser tests passed:**
  - mobile menu: focus moves in, Escape closes it, focus returns to the button
  - anchor scrolling, including from a case study back to the home page
  - form validation, including moving focus to the first invalid field
  - building the `mailto:` link
  - arrow-key navigation in the Expertise tabs
  - reduced-motion mode
  - no horizontal overflow at 390 px or 1440 px
  - zero console errors

## Content to supply

Everything on the site comes from the CV or from public profiles: GitHub, and pub.dev for `dynamic_form_builder`. **No metrics, testimonials or client logos were invented.** All phone and terminal mockups are labelled *Illustrative*, so none of them can be mistaken for real screenshots.

In `npm run dev`, every case study shows a dashed **"Dev only · content to supply"** box. Its contents live in `src/content/pending.ts`, and this module is left out of production builds.

### Case studies

| Case study            | Needed                                                                                                          |
| --------------------- | --------------------------------------------------------------------------------------------------------------- |
| HCE Card Tokenization | Product name (if it can be named publicly), launch date, approved screenshots, any outcome figures you can share |
| Mastercard SCA        | Product name, screenshots of the enrolment and approval flows, release timeline                                  |
| Local Contact Center 1415 | Your specific responsibilities, store links, screenshots                                                    |
| Refd, Environmental Services, Roya Shipping | Which employer or client each was for, your role, store links, screenshots               |
| Baldety               | Confirm the context: it appears to be the "municipal employee services" work from Dojoon. Also your role and screenshots |

### Copy written for you to approve

These lines put your working style into words. They aren't quotes from the CV, so check them:

- **About section:** the pull quote *"Lead from the codebase, not from above it."* and the four principles.
- **Process section:** the five steps, describing how you work.
- **Current role:** the description follows the career update you gave: technical direction, vision, architecture, standards, hands-on.

### Things to double-check in the CV

- **Overlapping dates:** Masarat Fintech runs to Sep 2026, but WASL Global starts Jun 2026. The site shows the dates exactly as the CV has them.
- **Job title:** the downloadable CV (`public/Naeem_Eltaief_CV.pdf`) still says "Technical Team Lead". The site uses **Technical Mobile Team Lead**. When the CV is updated, replace the PDF with the new version under the same filename.
- **References:** the CV's references were left off the site on purpose, because they include other people's email addresses. They're still in the downloadable CV.
