<template>
  <el-form ref="ruleFormRef" :model="ruleForm" :rules="registRule" size="large">
    <el-form-item
      :rules="[
        {
          required: true,
          message: '请输入用户名',
          trigger: 'blur',
        },
      ]"
      prop="username"
    >
      <el-input
        v-model="ruleForm.username"
        clearable
        placeholder="请输入用户名"
      />
    </el-form-item>

    <el-form-item prop="phone">
      <el-input v-model="ruleForm.phone" clearable placeholder="请输入手机号" />
    </el-form-item>
    <el-form-item prop="verifyCode">
      <div class="verifyCodeBox">
        <el-input
          v-model="ruleForm.verifyCode"
          clearable
          placeholder="请输入验证码"
        />
        <el-button class="ml-2"> 发送验证码 </el-button>
      </div>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        v-model="ruleForm.password"
        clearable
        show-password
        placeholder="请输入密码"
        prefix-icon="Lock"
      />
    </el-form-item>
    <el-form-item
      :rules="repeatPasswordRule.repeatPassword"
      prop="repeatPassword"
    >
      <el-input
        v-model="ruleForm.repeatPassword"
        clearable
        show-password
        placeholder="请核对密码"
        prefix-icon="Lock"
      />
    </el-form-item>
    <div class="btnBox">
      <el-form-item>
        <el-button
          class="w-full"
          size="default"
          type="primary"
          :loading="loading"
          @click="onUpdate(ruleFormRef)"
        >
          确定
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
import { ElMessage, FormInstance, FormRules } from 'element-plus'
const userStore = useUserStore()
const ruleFormRef = ref<FormInstance>()
const checked = ref(false)
const loading = ref(false)

const ruleForm = reactive({
  username: '',
  phone: '',
  verifyCode: '',
  password: '',
  repeatPassword: '',
})

const onBack = () => {
  userStore.setCurrentPage(0)
}

const onUpdate = async (formEl: FormInstance | undefined) => {
  loading.value = true
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      if (checked.value) {
        // 模拟请求，需根据实际开发进行修改
        setTimeout(() => {
          ElMessage({
            type: 'success',
          })
          loading.value = false
        }, 2000)
      } else {
        loading.value = false
        ElMessage({
          type: 'warning',
        })
      }
    } else {
      loading.value = false
      return fields
    }
  })
}
const REGEXP_SIX = /\d{6}/
const REGEXP_PWD =
  /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)]|[()])+$)(?!^.*[\u4E00-\u9FA5].*$)([^(0-9a-zA-Z)]|[()]|[a-z]|[A-Z]|[0-9]){8,18}$/
const registRule = reactive<FormRules>({
  phone: [
    {
      validator: (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Empty'))
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
          callback(new Error('empty'))
        } else if (!REGEXP_SIX.test(value)) {
          callback(new Error('模拟真实业务场景不符合'))
        } else {
          callback()
        }
      },
      trigger: 'blur',
    },
  ],
  password: [
    {
      validator: (rule, value, callback) => {
        if (value === '') {
          callback(new Error('empty'))
        } else if (!REGEXP_PWD.test(value)) {
          callback(new Error('没有满足8-18位,必须为数字和英文混搭的规则'))
        } else {
          callback()
        }
      },
      trigger: 'blur',
    },
  ],
})
const repeatPasswordRule = reactive<FormRules>({
  repeatPassword: [
    {
      validator: (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Empty'))
        } else if (ruleForm.password !== value) {
          callback(new Error('两次密码输入不一致'))
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
//   .verifyCode{
//       display: flex;
//       justify-content:space-between;
//       align-items: center;
//       width:100%;
//   }
.btnBox {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  .el-button {
    width: 150px;
  }
}
.verifyCodeBox {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
}
</style>
