<template>
  <el-form
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
          @click="loginAccount()"
          round
          size="large"
          type="primary"
          >登陆</el-button
        >
      </el-form-item>
    </div>
  </el-form>
</template>

<script lang="ts" setup name="loginForm">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useRouter } from 'vue-router'
const ruleFormRef = ref<FormInstance>()

const loginForm = reactive({
  username: '',
  password: '',
})
//   const validateUser = (rule: any, value: any, callback: any) => {
//     let reg =/^[a-zA-Z0-9]{6,}$/
//   if (reg.test(value)){
//         return '输入正确'
//   }
//     console.log(rule,callback)
// } validator:validateUser,
const rules = reactive<FormRules<typeof loginForm>>({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
})

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
const router = useRouter()
const loginAccount = () => {
  router.push('/main')
}
</script>
<style scope lang="scss">
.login-btn {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 40px;
  white-space: nowrap;
  .el-button {
    width: 185px;
  }
}
</style>
