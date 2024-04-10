<template>
  <el-form ref="ruleFormRef" :model="ruleForm" :rules="phoneRules" size="large">
    <el-form-item prop="phone">
      <el-input
        v-model="ruleForm.phone"
        clearable
        placeholder="请输入手机号码"
      />
    </el-form-item>

    <el-form-item prop="verifyCode">
      <div class="verifyCode">
        <el-input
          v-model="ruleForm.verifyCode"
          clearable
          placeholder="请输入验证码"
        />
        <el-button>获取验证码 </el-button>
      </div>
    </el-form-item>
    <div class="loginBox">
      <el-form-item>
        <el-button
          class="w-full"
          size="default"
          type="primary"
          :loading="loading"
          @click="onLogin(ruleFormRef)"
        >
          登陆
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button class="w-full" size="default" @click="onBack">
          返回
        </el-button>
      </el-form-item>
    </div>
  </el-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useUserStore } from '@/stores/modules/user'
import { ElNotification, FormInstance, FormRules } from 'element-plus'
import { getTimeState } from '@/utils'
import { loginApi } from '@/api/modules/login'
import router from '@/router'
import { initDynamicRouter } from '@/router/modules/dynamicRouter'
import md5 from 'md5'
const userStore = useUserStore()
const ruleFormRef = ref<FormInstance>()

const ruleForm = reactive({
  phone: '',
  verifyCode: '',
})
const loading = ref(false)

const onBack = () => {
  userStore.setCurrentPage(0)
}
const onLogin = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (!valid) return
    // loading.value = true;
    try {
      // 1.执行登录接口
      const { data } = await loginApi({
        // ...loginForm,
        // password: md5(loginForm.password),
        username: 'admin',
        password: md5('123456'),
      })
      userStore.setToken(data.access_token)

      // 2.添加动态路由
      await initDynamicRouter()

      router.push('/home/index')

      ElNotification({
        title: getTimeState(),
        message: '欢迎登录 Oner-Admin',
        type: 'success',
        duration: 3000,
      })
    } catch (err) {
      console.log(err)
    }
  })
}

const phoneRules = reactive<FormRules>({
  phone: [
    {
      validator: (rule, value, callback) => {
        if (value === '') {
          callback(new Error())
        } else {
          callback()
        }
      },
      trigger: 'blur',
    },
  ],
  verifyCode: [
    {
      validator: (rule, value, callback) => {
        if (value === '') {
          callback(new Error())
        } else {
          callback()
        }
      },
      trigger: 'blur',
    },
  ],
})
</script>
<style lang="scss" scoped>
.verifyCode {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.loginBox {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  .el-button {
    width: 200px;
  }
}
</style>
