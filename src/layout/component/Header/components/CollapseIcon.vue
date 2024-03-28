<template>
  <div>
    <el-icon class="collapse-icon" @click="changeCollapse">
      <component :is="GlobalStore.isCollapse ? 'expand' : 'fold'"></component>
    </el-icon>
  </div>
</template>

<script setup lang="ts">
import { useGlobalStore } from '@/stores/modules/global'
const GlobalStore = useGlobalStore()
const changeCollapse = () => {
  GlobalStore.setGlobalState('isCollapse', !GlobalStore.isCollapse)
}
</script>

<style scoped lang="scss">
.collapse-icon {
  margin-right: 20px;
  font-size: 22px;
  color: var(--el-header-text-color);
  cursor: pointer;
}
</style>
