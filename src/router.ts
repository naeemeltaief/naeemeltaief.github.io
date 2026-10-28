import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
import { prefersReducedMotion } from './composables/motion'

function waitFor(selector: string, timeout = 2000) {
  return new Promise<void>((resolve) => {
    const start = performance.now()
    const check = () =>
      document.querySelector(selector) || performance.now() - start > timeout
        ? requestAnimationFrame(() => resolve())
        : setTimeout(check, 50)
    check()
  })
}

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    {
      path: '/work/:slug',
      name: 'case-study',
      // Case studies are code-split: the home page never pays for them.
      component: () => import('./views/CaseStudyView.vue'),
      props: true,
    },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('./views/NotFoundView.vue') },
  ],
  scrollBehavior(to, from, saved) {
    if (saved) return saved
    const behavior = prefersReducedMotion() ? 'auto' : 'smooth'
    if (to.hash) {
      // Coming from another route, the target only exists once the page transition has finished.
      if (from.name && from.name !== to.name) return waitFor(to.hash).then(() => ({ el: to.hash, top: 72, behavior }))
      return { el: to.hash, top: 72, behavior }
    }
    return { top: 0 }
  },
})
