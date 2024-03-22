import { createApp } from 'vue'
import '../src/style/reset.scss'
import App from './App.vue'
import { router } from '@/router/index.ts'
import pinia from '@/stores'
import ElementPlus from 'element-plus'

const app = createApp(App)
app.use(ElementPlus).use(router).use(pinia).mount('#app')
