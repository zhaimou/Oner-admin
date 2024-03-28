<template>
  <div class="footer">
    <a href="https://github.com/HalseySpicy" target="_blank">
      2024 © Oner-Admin By Oner Technology.
    </a>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  background-color: var(--el-bg-color);
  border-top: 1px solid var(--el-border-color-light);
  a {
    font-size: 14px;
    color: var(--el-text-color-secondary);
    text-decoration: none;
    letter-spacing: 0.5px;
  }
}
</style>
