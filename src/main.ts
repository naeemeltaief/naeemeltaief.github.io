import { createApp } from 'vue'
import '@fontsource-variable/bricolage-grotesque/opsz.css'
import '@fontsource-variable/inter/index.css'
import '@fontsource-variable/jetbrains-mono/index.css'
import './styles/main.css'
import App from './App.vue'
import { router } from './router'
import { vReveal } from './composables/reveal'

// Mount after the first navigation resolves so the footer never renders above an empty <main> (CLS).
const app = createApp(App).use(router).directive('reveal', vReveal)
router.isReady().then(() => app.mount('#app'))
