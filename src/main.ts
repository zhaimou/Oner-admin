import App from './App.vue'
import { createApp } from 'vue'
import '../src/style/reset.scss'
import '@/style/common.scss'
import '@/style/element-dark.scss'
import '@/assets/fonts/font.scss'
import { router } from '@/router/index.ts'
import pinia from '@/stores'
import ElementPlus from 'element-plus'
import * as Icons from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import '@/assets/iconfont/iconfont.scss'
import '@/style/element.scss'
// import "element-plus/dist/index.css";
const app = createApp(App)
Object.keys(Icons).map((key) => {
  app.component(key, Icons[key as keyof typeof Icons])
})
app.use(ElementPlus).use(router).use(pinia).mount('#app')
// iconfont css
