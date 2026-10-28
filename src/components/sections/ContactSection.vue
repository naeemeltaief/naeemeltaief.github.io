<script setup lang="ts">
import { computed, nextTick, reactive, ref } from 'vue'
import { ArrowUpRight, Check, Copy, Github, Linkedin, Mail, Phone, Send, TriangleAlert } from 'lucide-vue-next'
import { profile } from '@/content/profile'
import { services } from '@/content/services'

/**
 * Two honest modes:
 *  - VITE_FORM_ENDPOINT set  → POSTs JSON to that endpoint (e.g. Formspree) with real success/error states.
 *  - not set                 → opens the visitor's email app with the message pre-filled (mailto).
 */
const endpoint = import.meta.env.VITE_FORM_ENDPOINT as string | undefined
const mode = endpoint ? 'endpoint' : 'mailto'

const form = reactive({ name: '', email: '', topic: '', message: '', company: '' /* honeypot */ })
const touched = reactive({ name: false, email: false, message: false })
const status = ref<'idle' | 'sending' | 'sent' | 'mailto' | 'error'>('idle')
const copied = ref(false)

const errors = computed(() => ({
  name: form.name.trim().length < 2 ? 'Please enter your name.' : '',
  email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim()) ? '' : 'Please enter a valid email address.',
  message: form.message.trim().length < 20 ? 'A couple of sentences helps — at least 20 characters.' : '',
}))
const show = (f: keyof typeof touched) => (touched[f] ? errors.value[f] : '')

const topics = [...services.map((s) => s.title), 'Full-time role', 'Something else']

function mailtoHref() {
  const subject = `${form.topic || 'Project enquiry'} — ${form.name.trim()}`
  const body = `${form.message.trim()}\n\n— ${form.name.trim()}\n${form.email.trim()}`
  return `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

async function submit(e: Event) {
  touched.name = touched.email = touched.message = true
  if (Object.values(errors.value).some(Boolean)) {
    await nextTick()
    const firstInvalid = (e.target as HTMLFormElement).querySelector<HTMLElement>('[aria-invalid="true"]')
    firstInvalid?.focus()
    return
  }
  if (form.company) return // bot filled the honeypot

  if (mode === 'mailto') {
    window.location.href = mailtoHref()
    status.value = 'mailto'
    return
  }

  status.value = 'sending'
  try {
    const res = await fetch(endpoint!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ name: form.name, email: form.email, topic: form.topic, message: form.message }),
    })
    if (!res.ok) throw new Error(String(res.status))
    status.value = 'sent'
    Object.assign(form, { name: '', email: '', topic: '', message: '' })
    Object.assign(touched, { name: false, email: false, message: false })
  } catch {
    status.value = 'error'
  }
}

async function copyEmail() {
  try {
    await navigator.clipboard.writeText(profile.email)
    copied.value = true
    setTimeout(() => (copied.value = false), 2000)
  } catch {
    /* clipboard unavailable — the address is visible to copy manually */
  }
}

const channels = [
  { icon: Linkedin, label: 'LinkedIn', value: 'in/naeemeltaief', href: profile.links.linkedin },
  { icon: Github, label: 'GitHub', value: '@naeemeltaief', href: profile.links.github },
  { icon: Phone, label: 'Phone', value: profile.phone, href: profile.phoneHref },
]
</script>

<template>
  <section id="contact" aria-labelledby="contact-title" class="on-ink relative overflow-hidden bg-ink text-paper">
    <div class="blueprint-dark absolute inset-0 [mask-image:linear-gradient(to_bottom,#000,transparent_70%)]" aria-hidden="true" />
    <div class="shell relative grid gap-14 py-24 md:py-36 lg:grid-cols-12 lg:gap-10">
      <div class="lg:col-span-6">
        <p v-reveal class="eyebrow flex items-center gap-3 text-mute-dark">
          <span class="text-signal">07</span><span class="h-px w-8 bg-current opacity-40" aria-hidden="true" /> Contact
        </p>
        <h2 id="contact-title" v-reveal="60" class="display-xl mt-6">
          Let’s build something <span class="text-signal">solid.</span>
        </h2>
        <p v-reveal="120" class="lede mt-7 max-w-[46ch] text-mute-dark">
          Tell me about your product, your team or the problem in front of you. You’ll get a straight answer on how I’d
          approach it.
        </p>

        <div v-reveal="160" class="mt-10 rounded-[var(--radius-md)] border border-[var(--line-dark)] p-5">
          <p class="eyebrow text-mute-dark">Email</p>
          <div class="mt-2 flex flex-wrap items-center gap-3">
            <a :href="`mailto:${profile.email}`" class="break-all font-display text-[clamp(1.25rem,2.4vw,1.8rem)] font-semibold tracking-tight underline decoration-paper/25 underline-offset-[6px] transition-colors hover:decoration-signal">
              {{ profile.email }}
            </a>
            <button
              type="button"
              class="inline-flex h-9 items-center gap-1.5 rounded-full border border-[var(--line-dark)] px-3 text-sm text-mute-dark transition-colors hover:border-paper/40 hover:text-paper"
              @click="copyEmail"
            >
              <component :is="copied ? Check : Copy" class="size-3.5" aria-hidden="true" />
              {{ copied ? 'Copied' : 'Copy' }}
            </button>
            <span class="sr-only" aria-live="polite">{{ copied ? 'Email address copied' : '' }}</span>
          </div>
        </div>

        <ul v-reveal="200" class="mt-4 grid gap-3 sm:grid-cols-3">
          <li v-for="c in channels" :key="c.label">
            <a
              :href="c.href"
              :target="c.href.startsWith('http') ? '_blank' : undefined"
              :rel="c.href.startsWith('http') ? 'noopener noreferrer' : undefined"
              class="group flex h-full flex-col rounded-[var(--radius-md)] border border-[var(--line-dark)] p-4 transition-colors hover:border-paper/40"
            >
              <span class="flex items-center justify-between text-mute-dark">
                <component :is="c.icon" class="size-4" aria-hidden="true" />
                <ArrowUpRight class="size-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
              <span class="mt-5 text-sm text-mute-dark">{{ c.label }}</span>
              <span class="mt-0.5 font-medium">{{ c.value }}</span>
              <span v-if="c.href.startsWith('http')" class="sr-only">(opens in a new tab)</span>
            </a>
          </li>
        </ul>
      </div>

      <div class="lg:col-span-6 lg:pl-6">
        <form
          v-reveal="120"
          novalidate
          class="rounded-[var(--radius-lg)] bg-paper p-6 text-ink sm:p-9"
          aria-describedby="form-note"
          @submit.prevent="submit"
        >
          <h3 class="font-display text-[1.6rem] font-semibold tracking-tight">Start a project</h3>
          <p id="form-note" class="mt-1 text-sm text-mute">
            {{ mode === 'mailto' ? 'Sends from your own email app — nothing is stored on this site.' : 'I usually reply by email.' }}
          </p>

          <div class="mt-7 grid gap-5 sm:grid-cols-2">
            <div class="field">
              <label for="cf-name">Name</label>
              <input id="cf-name" v-model="form.name" type="text" autocomplete="name" required :aria-invalid="!!show('name')" aria-describedby="cf-name-err" @blur="touched.name = true" />
              <p id="cf-name-err" class="err" aria-live="polite">{{ show('name') }}</p>
            </div>
            <div class="field">
              <label for="cf-email">Email</label>
              <input id="cf-email" v-model="form.email" type="email" autocomplete="email" inputmode="email" required :aria-invalid="!!show('email')" aria-describedby="cf-email-err" @blur="touched.email = true" />
              <p id="cf-email-err" class="err" aria-live="polite">{{ show('email') }}</p>
            </div>
          </div>

          <div class="field mt-1">
            <label for="cf-topic">What do you need? <span class="font-normal text-mute">(optional)</span></label>
            <select id="cf-topic" v-model="form.topic">
              <option value="">Choose a topic</option>
              <option v-for="t in topics" :key="t" :value="t">{{ t }}</option>
            </select>
          </div>

          <div class="field mt-5">
            <label for="cf-message">Message</label>
            <textarea id="cf-message" v-model="form.message" rows="5" required :aria-invalid="!!show('message')" aria-describedby="cf-message-err" placeholder="What are you building, and where are you stuck?" @blur="touched.message = true" />
            <p id="cf-message-err" class="err" aria-live="polite">{{ show('message') }}</p>
          </div>

          <!-- Honeypot: hidden from people and assistive tech -->
          <div class="hidden" aria-hidden="true">
            <label for="cf-company">Company</label>
            <input id="cf-company" v-model="form.company" tabindex="-1" autocomplete="off" />
          </div>

          <button
            type="submit"
            :disabled="status === 'sending'"
            class="mt-3 inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-ink font-semibold text-paper transition-colors duration-300 hover:bg-signal hover:text-ink disabled:opacity-60"
          >
            <template v-if="status === 'sending'">Sending…</template>
            <template v-else>
              {{ mode === 'mailto' ? 'Compose email' : 'Send message' }}
              <component :is="mode === 'mailto' ? Mail : Send" class="size-4" aria-hidden="true" />
            </template>
          </button>

          <div role="status" aria-live="polite" class="mt-4 min-h-[1.5rem] text-sm">
            <p v-if="status === 'sent'" class="flex items-start gap-2 text-ink">
              <Check class="mt-0.5 size-4 shrink-0 text-[#14804a]" aria-hidden="true" /> Thanks — your message is on its way. I’ll reply by email.
            </p>
            <p v-else-if="status === 'mailto'" class="flex items-start gap-2 text-ink">
              <Check class="mt-0.5 size-4 shrink-0 text-[#14804a]" aria-hidden="true" />
              <span>
                Your email app should open with the message ready to send. Nothing happened?
                <a :href="mailtoHref()" class="font-semibold underline underline-offset-4">Try again</a> or write to
                {{ profile.email }}.
              </span>
            </p>
            <p v-else-if="status === 'error'" class="flex items-start gap-2 text-signal-ink">
              <TriangleAlert class="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              <span>
                Something went wrong sending that. Please email
                <a :href="mailtoHref()" class="font-semibold underline underline-offset-4">{{ profile.email }}</a> directly.
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>
.field {
  display: grid;
  gap: 0.4rem;
}
.field label {
  font-size: 0.875rem;
  font-weight: 600;
}
.field input,
.field select,
.field textarea {
  width: 100%;
  border-radius: 0.9rem;
  border: 1px solid rgb(12 14 18 / 0.18);
  background: #fff;
  padding: 0.85rem 1rem;
  font-size: 1rem; /* ≥16px avoids iOS zoom on focus */
  color: var(--color-ink);
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
}
.field select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%230c0e12' stroke-width='2.5'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  padding-right: 2.5rem;
}
.field textarea {
  resize: vertical;
  min-height: 8rem;
}
.field input:focus,
.field select:focus,
.field textarea:focus {
  outline: none;
  border-color: var(--color-ink);
  box-shadow: 0 0 0 3px rgb(255 90 31 / 0.35);
}
.field [aria-invalid='true'] {
  border-color: var(--color-signal-ink);
}
.err {
  min-height: 1.1rem;
  font-size: 0.8rem;
  color: var(--color-signal-ink);
}
</style>
