<template>
  <el-switch
    v-model="global.isDark"
    inline-prompt
    :active-icon="Sunny"
    :inactive-icon="Moon"
  />
</template>
<!-- @change="changeDark" -->
<script setup lang="ts" name="SwitchDark">
import { Sunny, Moon } from '@element-plus/icons-vue'
import { useGlobalStore } from '@/stores/modules/global.ts'
const global = useGlobalStore()
</script>
<style lang="scss" scope></style>
