import { createApp } from 'vue'
import '../src/style/reset.scss'
import App from './App.vue'
import { router } from '@/router/index.ts'
import pinia from '@/stores'
import ElementPlus from 'element-plus'
import * as Icons from '@element-plus/icons-vue'

const app = createApp(App)
Object.keys(Icons).map((key) => {
  app.component(key, Icons[key as keyof typeof Icons])
})
app.use(ElementPlus).use(router).use(pinia).mount('#app')
