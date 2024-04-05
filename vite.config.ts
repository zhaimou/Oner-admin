import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vueJsx from '@vitejs/plugin-vue-jsx'
// import ElementPlus from 'unplugin-element-plus/vite'
// https://vitejs.dev/config/
// import Components from 'unplugin-vue-components/vite'
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import pkg from './package.json'
import dayjs from 'dayjs'

const { dependencies, devDependencies, name, version } = pkg
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
}

export default defineConfig({
  resolve: {
    //设置别名
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {
    __APP_INFO__: JSON.stringify(__APP_INFO__),
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [
        // ElementPlusResolver(),
        ElementPlusResolver({
          importStyle: 'sass',
          directives: true,
          version: '2.1.5',
        }),
      ],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    vueJsx(),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData: `@import "@/style/var.scss";`,
        additionalData: `@use "@/style/var.scss";`,
      },
    },
  },
})
