<template>
  <Maximize v-show="maximize" />
  <Tabs v-show="tabs" />
  <el-main>
    <router-view v-slot="{ Component, route }">
      <transition appear name="fade-transform" mode="out-in">
        <keep-alive :include="keepAliveName">
          <component
            :is="createComponentWrapper(Component, route)"
            v-if="isRouterShow"
            :key="route.fullPath"
          />
        </keep-alive>
      </transition>
    </router-view>
    <el-footer v-show="footer">
      <Footer />
    </el-footer>
  </el-main>
</template>

<script setup lang="ts">
// <KeepAlive> 是一个内置组件，它的功能是在多个组件间动态切换时缓存被移除的组件实例。
// 当使用 :key="route.fullPath" 和 <keep-alive> 结合时，
// 在路由切换时，组件实际上是被销毁然后重新创建的，而不是简单地缓存和复用之前的组件状态。
// 这是因为 :key 的存在会导致组件被强制重新渲染，而 <keep-alive> 只是将销毁的组件实例缓存起来，以便在需要时快速恢复状态。
import Maximize from './component/Maximize.vue'
import Footer from '@/layout/component/Footer/index.vue'
import { useDebounceFn } from '@vueuse/core'
import { useKeepAliveStore } from '../../../stores/modules/keepAlive'
import { useGlobalStore } from '../../../stores/modules/global'
import { ref, onBeforeUnmount, provide, watch, h } from 'vue'
import { storeToRefs } from 'pinia'
// import Tabs from '@/layout/component/Tabs'
import Tabs from '@/layout/component/Tabs/index.vue'
const globalStore = useGlobalStore()
const KeepAliveStore = useKeepAliveStore()
const { maximize, isCollapse, layout, footer, tabs } = storeToRefs(globalStore)
const { keepAliveName } = storeToRefs(KeepAliveStore)
// 给子组件注入页面刷新方法
const isRouterShow = ref(true)
const refreshCurrentPage = (val: boolean) => (isRouterShow.value = val)
provide('refresh', refreshCurrentPage)
// 监听当前页面是否最大化，动态添加 class
watch(
  () => maximize.value,
  () => {
    const app = document.getElementById('app') as HTMLElement
    if (maximize.value) app.classList.add('main-maximize')
    else app.classList.remove('main-maximize')
  },
  { immediate: true }
)
watch(
  () => layout.value,
  () => {
    const body = document.body as HTMLElement
    body.setAttribute('class', layout.value)
  },
  { immediate: true }
)
//
const wrapperMap = new Map()
function createComponentWrapper(component: any, route: any) {
  if (!component) return
  const wrapperName = route.fullPath
  let wrapper = wrapperMap.get(wrapperName)
  if (!wrapper) {
    //渲染一个指定的组件
    wrapper = { name: wrapperName, render: () => h(component) }
    wrapperMap.set(wrapperName, wrapper)
  }
  return h(wrapper)
}
const screenWidth = ref(0)
const listeningWindow = useDebounceFn(() => {
  screenWidth.value = document.body.clientWidth
  if (!isCollapse.value && screenWidth.value < 1200)
    globalStore.setGlobalState('isCollapse', true)
  if (isCollapse.value && screenWidth.value > 1200)
    globalStore.setGlobalState('isCollapse', false)
}, 100)
window.addEventListener('resize', listeningWindow, false)
onBeforeUnmount(() => {
  window.removeEventListener('resize', listeningWindow)
})
</script>

<style scoped></style>
