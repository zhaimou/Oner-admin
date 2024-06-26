<template>
  <div class="table-box">
    <ProTable
      ref="proTable"
      :columns="columns"
      :requestApi="getTableList"
      :init-param="initParam"
      :data-callback="dataCallback"
    >
      <!-- 表格 header 按钮 -->
      <template #tableHeader="scope">
        <el-button
          auth="'add'"
          type="primary"
          :icon="CirclePlus"
          @click="openDrawer('新增')"
          >新增用户</el-button
        >
        <!-- <el-button v-auth="'batchAdd'" type="primary" :icon="Upload" plain @click="batchAdd">批量添加用户</el-button> -->
        <el-button
          auth="'export'"
          type="primary"
          :icon="Download"
          plain
          @click="downloadFile"
          >导出用户数据</el-button
        >
        <el-button type="primary" plain>To 子集详情页面</el-button>
        <el-button
          type="danger"
          :icon="Delete"
          plain
          :disabled="!scope.isSelected"
          @click="batchDelete(scope.selectedListIds)"
        >
          批量删除用户
        </el-button>
      </template>
      <!-- Expand -->
      <template #expand="scope">
        {{ scope.row }}
      </template>
      <!-- usernameHeader -->
      <template #usernameHeader="scope">
        <el-button
          type="primary"
          @click="ElMessage.success('我是通过作用域插槽渲染的表头')"
        >
          {{ scope.column.label }}
        </el-button>
      </template>
      <!-- createTime -->
      <template #createTime="scope">
        <el-button
          type="primary"
          link
          @click="ElMessage.success('我是通过作用域插槽渲染的内容')"
        >
          {{ scope.row.createTime }}
        </el-button>
      </template>
      <!-- 表格操作 -->
      <template #operation="scope">
        <el-button
          type="primary"
          link
          :icon="View"
          @click="openDrawer('查看', scope.row)"
          >查看</el-button
        >
        <el-button
          type="primary"
          link
          :icon="EditPen"
          @click="openDrawer('编辑', scope.row)"
          >编辑</el-button
        >
        <!-- <el-button type="primary" link :icon="Refresh" @click="resetPass(scope.row)">重置密码</el-button> -->
        <el-button
          type="primary"
          link
          :icon="Delete"
          @click="deleteAccount(scope.row)"
          >删除</el-button
        >
      </template>
    </ProTable>
    <UserDrawer ref="drawerRef" />
    <ImportExcel ref="dialogRef" />
  </div>
</template>

<script setup lang="tsx">
import ProTable from '@/components/proTable/index.vue'
import UserDrawer from '@/views/proTable/components/UserDrawer.vue'
import ImportExcel from '@/components/importExcel/index.vue'
import { useDownload } from '@/hook/useDownload'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  ColumnProps,
  HeaderRenderScope,
  ProTableInstance,
} from '@/components/proTable/interface'
import { ResUserList } from '@/api/interface'
import { reactive, ref } from 'vue'
import { useAuthButtons } from '@/hook/useAuthButtons'
import { useHandleData } from '@/hook/useHandleData'
// import { useRouter } from "vue-router";
import {
  Delete,
  Download,
  CirclePlus,
  View,
  EditPen,
} from '@element-plus/icons-vue'
import {
  getUserList,
  deleteUser,
  editUser,
  addUser,
  changeUserStatus,
  //   resetUserPassWord,
  exportUserInfo,
  //   BatchAddUser,
  getUserStatus,
  getUserGender,
} from '@/api/modules/user'
// 获取用户列表数据
const proTable = ref<ProTableInstance>()
// const router = useRouter();
//获取表单列表
const getTableList = (params: any) => {
  let newParams = JSON.parse(JSON.stringify(params))
  newParams.createTime && (newParams.startTime = newParams.createTime[0])
  newParams.createTime && (newParams.endTime = newParams.createTime[1])
  delete newParams.createTime
  return getUserList(newParams)
}

const changeStatus = async (row: ResUserList) => {
  await useHandleData(
    changeUserStatus,
    { id: row.id, status: row.status == 1 ? 0 : 1 },
    `切换【${row.username}】用户状态`
  )
  proTable.value?.getTableList()
}
// RenderScope<T>
const headerRender = (scope: HeaderRenderScope<ResUserList>) => {
  return (
    <el-button
      type="primary"
      onClick={() => ElMessage.success('我是通过 tsx 语法渲染的表头')}
    >
      {scope.column.label}
    </el-button>
  )
}
const columns = reactive<ColumnProps<ResUserList>[]>([
  { type: 'selection', fixed: 'left', width: 70 },
  { type: 'sort', label: 'Sort', width: 80 },
  { type: 'expand', label: 'Expand', width: 85 },
  {
    prop: 'username',
    label: '用户姓名',
    search: { el: 'input', tooltip: '我是搜索提示' },
    render: (scope) => {
      return (
        <el-button
          type="primary"
          link
          onClick={() => ElMessage.success('我是通过 tsx 语法渲染的内容')}
        >
          {scope.row.username}
        </el-button>
      )
    },
  },
  {
    prop: 'gender',
    label: '性别',
    // 字典数据（本地数据）
    // enum: genderType,
    // 字典请求不带参数
    enum: getUserGender,
    // 字典请求携带参数
    // enum: () => getUserGender({ id: 1 }),
    search: { el: 'select', props: { filterable: true } },
    fieldNames: { label: 'genderLabel', value: 'genderValue' },
  },
  {
    // 多级 prop
    prop: 'user.detail.age',
    label: '年龄',
    search: {
      // 自定义 search 显示内容
      render: ({ searchParam }) => {
        return (
          <div class="flx-center">
            <el-input vModel_trim={searchParam.minAge} placeholder="最小年龄" />
            <span class="mr10 ml10">-</span>
            <el-input vModel_trim={searchParam.maxAge} placeholder="最大年龄" />
          </div>
        )
      },
    },
  },
  { prop: 'idCard', label: '身份证号', search: { el: 'input' } },
  { prop: 'email', label: '邮箱' },
  { prop: 'address', label: '居住地址' },
  {
    prop: 'status',
    label: '用户状态',
    enum: getUserStatus,
    search: { el: 'tree-select', props: { filterable: true } },
    fieldNames: { label: 'userLabel', value: 'userStatus' },
    render: (scope) => {
      return (
        <>
          {BUTTONS.value.status ? (
            <el-switch
              model-value={scope.row.status}
              active-text={scope.row.status ? '启用' : '禁用'}
              active-value={1}
              inactive-value={0}
              onClick={() => changeStatus(scope.row)}
            />
          ) : (
            <el-tag type={scope.row.status ? 'success' : 'danger'}>
              {scope.row.status ? '启用' : '禁用'}
            </el-tag>
          )}
        </>
      )
    },
  },
  {
    prop: 'createTime',
    label: '创建时间',
    headerRender,
    width: 180,
    search: {
      el: 'date-picker',
      span: 2,
      props: { type: 'datetimerange', valueFormat: 'YYYY-MM-DD HH:mm:ss' },
      defaultValue: ['2022-11-12 11:35:00', '2022-12-12 11:35:00'],
    },
  },
  { prop: 'operation', label: '操作', fixed: 'right', width: 330 },
])

const { BUTTONS } = useAuthButtons()
const initParam = reactive({ type: 1 })
// dataCallback 是对于返回的表格数据做处理，
// 如果你后台返回的数据不是 list && total && pageNum && pageSize 这些字段，
// 那么你可以在这里进行处理成这些字段
// 或者直接去 hooks/useTable.ts 文件中把字段改为你后端对应的就行
const dataCallback = (data: any) => {
  return {
    list: data.list,
    total: data.total,
    pageNum: data.pageNum,
    pageSize: data.pageSize,
  }
}
// 删除用户信息
const deleteAccount = async (params: ResUserList) => {
  await useHandleData(
    deleteUser,
    { id: [params.id] },
    `删除【${params.username}】用户`
  )
  proTable.value?.getTableList()
}

// 批量删除用户信息
const batchDelete = async (id: string[]) => {
  await useHandleData(deleteUser, { id }, '删除所选用户信息')
  proTable.value?.clearSelection()
  proTable.value?.getTableList()
}

// 导出用户列表
const downloadFile = async () => {
  ElMessageBox.confirm('确认导出用户数据?', '温馨提示', {
    type: 'warning',
  }).then(() =>
    useDownload(exportUserInfo, '用户列表', proTable.value?.searchParam)
  )
}

// 批量添加用户
// const dialogRef = ref<InstanceType<typeof ImportExcel> | null>(null);
// const batchAdd = () => {
//   const params = {
//     title: "用户",
//     tempApi: exportUserInfo,
//     importApi: BatchAddUser,
//     getTableList: proTable.value?.getTableList
//   };
//   dialogRef.value?.acceptParams(params);
// };

// 打开 drawer(新增、查看、编辑)
const drawerRef = ref<InstanceType<typeof UserDrawer> | null>(null)
const openDrawer = (title: string, row: Partial<ResUserList> = {}) => {
  const params = {
    title,
    isView: title === '查看',
    row: { ...row },
    api: title === '新增' ? addUser : title === '编辑' ? editUser : undefined,
    getTableList: proTable.value?.getTableList,
  }
  drawerRef.value?.acceptParams(params)
}
</script>
