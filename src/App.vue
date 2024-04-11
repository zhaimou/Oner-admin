<template>
  <el-config-provider
    :size="assemblySize"
    :locale="locale"
    :button="buttonConfig"
  >
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup lang="ts">
import { useTheme } from '@/hook/useTheme'
import { ElConfigProvider } from 'element-plus'
import { useGlobalStore } from '@/stores/modules/global'
import { getBrowserLang } from '@/utils'
import { useI18n } from 'vue-i18n'
const { initTheme } = useTheme()
initTheme()
const globalStore = useGlobalStore()
const assemblySize = computed(() => globalStore.assemblySize)
import { RouterView } from 'vue-router'
import { computed, onMounted, reactive } from 'vue'
import { LanguageType } from './stores/interface'
import en from 'element-plus/es/locale/lang/en'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
// import { initDynamicRouter } from './router/modules/dynamicRouter'
// import router from './router'

const i18n = useI18n()
onMounted(async () => {
  //   await initDynamicRouter()
  //   console.log(router.options.history.location)
  //   router.replace(router.options.history.location);
  const language = globalStore.language ?? getBrowserLang()
  i18n.locale.value = language
  globalStore.setGlobalState('language', language as LanguageType)
})
const locale = computed(() => {
  if (globalStore.language == 'zh') return zhCn
  if (globalStore.language == 'en') return en
  return getBrowserLang() == 'zh' ? zhCn : en
})

const buttonConfig = reactive({ autoInsertSpace: false })
</script>

<style scoped></style>
