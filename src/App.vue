<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { useTheme } from '@/hook/useTheme'
const { initTheme } = useTheme()
initTheme()

import { RouterView } from 'vue-router'

// const I18n = useI18n()
</script>

<style scoped></style>
