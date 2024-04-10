<template>
  <div class="fullscreen">
    <i
      :class="['iconfont', isFullscreen ? 'icon-suoxiao' : 'icon-fangda']"
      class="toolBar-icon"
      @click="handleFullScreen"
    ></i>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import screenfull from 'screenfull'

const isFullscreen = ref(screenfull.isFullscreen)

onMounted(() => {
  screenfull.on('change', () => {
    if (screenfull.isFullscreen) isFullscreen.value = true
    else isFullscreen.value = false
  })
})
const handleFullScreen = () => {
  screenfull.toggle()
}
</script>
