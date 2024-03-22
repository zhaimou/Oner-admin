<template>
  <div class="container">
    <div class="login-box">
      <SwitchDark></SwitchDark>
    </div>
  </div>
</template>

<script setup lang="ts">
import SwitchDark from '@/components/switchDark/switchDark.vue'
</script>
<style scoped lang="scss">
.container {
  height: 100%;
  min-height: 550px;
  background-color: #eeeeee;
  background-image: url('@/assets/images/login_bg.svg');
  background-size: 100% 100%;
  background-size: cover;
  .login-box {
    display: flex;
    justify-content: right;
  }
}
</style>
