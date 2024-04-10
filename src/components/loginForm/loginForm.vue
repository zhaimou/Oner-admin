<template>
  <el-form
    v-if="currentPage === 0"
    ref="ruleFormRef"
    :model="loginForm"
    status-icon
    :rules="rules"
    size="large"
  >
    <el-form-item prop="username">
      <el-input
        v-model="loginForm.username"
        type="text"
        autocomplete="off"
        placeholder="请输入用户名"
      >
        <template #prefix>
          <el-icon><User /></el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        v-model="loginForm.password"
        type="password"
        autocomplete="off"
        placeholder="请输入密码"
      >
        <template #prefix>
          <el-icon class="el-input__icon">
            <lock />
          </el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="verifyCode">
      <el-form-item prop="verifyCode">
        <el-input
          v-model="loginForm.verifyCode"
          clearable
          placeholder="'请输入正确的验证码'"
        >
          <template #prefix>
            <el-icon><Cpu /></el-icon>
          </template>
          <template #append>
            <ReImageVerify v-model:code="imgCode" />
          </template>
        </el-input>
      </el-form-item>
    </el-form-item>
    <div class="login-btn">
      <el-form-item>
        <!-- <el-icon><Refresh /></el-icon> -->
        <el-button
          icon="Refresh"
          @click="resetForm(ruleFormRef)"
          round
          size="large"
          >重置</el-button
        >
      </el-form-item>
      <el-form-item>
        <el-button
          icon="UserFilled"
          @click="loginAccount(ruleFormRef)"
          round
          size="large"
          type="primary"
          >登陆</el-button
        >
      </el-form-item>
    </div>
    <div class="opeartesBox">
      <el-form-item>
        <div class="opeartesButtons">
          <el-button
            v-for="(item, index) in operates"
            :key="index"
            size="default"
            round
            @click="userStore.setCurrentPage(index + 1)"
          >
            {{ item.title }}
          </el-button>
        </div>
      </el-form-item>
    </div>
  </el-form>
  <phone v-if="currentPage === 1" />
  <qrCode v-if="currentPage === 2" />
  <regist v-if="currentPage === 3" />
</template>

<script lang="ts" setup name="loginForm">
import { reactive, ref, watch, computed } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useRouter } from 'vue-router'
import { loginApi } from '@/api/modules/login'
import { useUserStore } from '@/stores/modules/user'
import { initDynamicRouter } from '@/router/modules/dynamicRouter'
import md5 from 'md5'
import { HOME_URL } from '@/config'
import { ElNotification } from 'element-plus'
import { getTimeState } from '@/utils'
import { Cpu } from '@element-plus/icons-vue'
import ReImageVerify from '@/components/reImageVerify/index.vue'
import phone from './components/phone.vue'
import qrCode from './components/qrCode.vue'
import regist from './components/regist.vue'
const operates = [
  {
    title: '手机登陆',
  },
  {
    title: '二维码登陆',
  },
  {
    title: '注册',
  },
]

const ruleFormRef = ref<FormInstance>()
const userStore = useUserStore()
// useUserStore
const loginForm = reactive({
  username: '',
  password: '',
  verifyCode: '',
})
const imgCode = ref('')
watch(imgCode, (value) => {
  userStore.setUserVerify(value)
})
const currentPage = computed(() => {
  return userStore.currentPage
})
const verifyCode = (rule: any, value: any, callback: any) => {
  if (userStore.userVerify === value) {
    callback()
  } else {
    callback(new Error('验证啊吗报错'))
  }
}
const rules = reactive<FormRules<typeof loginForm>>({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  verifyCode: [
    {
      required: true,
      validator: verifyCode,
      message: '请输入正确的验证码',
      trigger: 'blur',
    },
  ],
})

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
const router = useRouter()
const loginAccount = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (!valid) return
    // loading.value = true;
    try {
      // 1.执行登录接口
      const { data } = await loginApi({
        ...loginForm,
        password: md5(loginForm.password),
      })
      userStore.setToken(data.access_token)

      // 2.添加动态路由
      await initDynamicRouter()

      router.push(HOME_URL)

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
</script>
<style scope lang="scss">
.login-btn {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 30px;
  white-space: nowrap;
  .el-button {
    width: 185px;
  }
}
.opeartesButtons {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .el-button {
    width: 120px;
  }
}
</style>
