import App from './App.vue'
import { createApp } from 'vue'

import '@/style/reset.scss'

import '@/style/common.scss'

import '@/assets/iconfont/iconfont.scss'

import '@/assets/fonts/font.scss'

import 'element-plus/dist/index.css'

import 'element-plus/theme-chalk/dark/css-vars.css'

import '@/style/element-dark.scss'

import '@/style/element.scss'

import 'virtual:svg-icons-register'
import ElementPlus from 'element-plus'
import directives from '@/directives/index'
import * as Icons from '@element-plus/icons-vue'

import router from '@/router/index.ts'
import I18n from '@/languages/index'
import pinia from '@/stores'
// import "element-plus/dist/index.css";
const app = createApp(App)
Object.keys(Icons).map((key) => {
  app.component(key, Icons[key as keyof typeof Icons])
})
app
  .use(ElementPlus)
  .use(directives)
  .use(I18n)
  .use(router)
  .use(pinia)
  .mount('#app')
// iconfont css
