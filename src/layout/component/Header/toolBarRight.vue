<template>
  <div class="tool-bar-ri">
    <div class="header-icon">
      <SearchMenu id="searchMenu" />
      <Message id="message" />
      <Fullscreen id="Fullscreen" />
      <AssemblySize id="AssemblySize" />
      <Language id="Language" />
    </div>
    <span class="username">{{ username }}</span>
    <Avatar />
  </div>
</template>

<script setup lang="ts">
import Fullscreen from './components/Fullscreen.vue'
import { computed } from 'vue'
import { useUserStore } from '@/stores/modules/user'
import Avatar from './components/Avatar.vue'
import Message from './components/Message.vue'
import SearchMenu from './components/SearchMenu.vue'
import AssemblySize from './components/AssemblySize.vue'
import Language from './components/Language.vue'
const UserStore = useUserStore()
const username = computed(() => UserStore.userInfo.name)
</script>

<style scoped lang="scss">
.tool-bar-ri {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 25px;
  .header-icon {
    display: flex;
    align-items: center;
    & > * {
      margin-left: 21px;
      color: var(--el-header-text-color);
    }
  }
  .username {
    margin: 0 20px;
    font-size: 15px;
    color: var(--el-header-text-color);
  }
}
</style>
