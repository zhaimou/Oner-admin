import { createApp } from 'vue'
import App from './App.vue'
import { router } from '@/router/index.ts'
import pinia from '@/stores'
const app = createApp(App)

app.use(router).use(pinia).mount('#app')
