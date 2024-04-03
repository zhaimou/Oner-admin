import {
  ResPage,
  ReqUserParams,
  ResUserList,
  ResStatus,
  ResGender,
  ResRole,
  ResDepartment,
} from '@/api/interface/index'
import { PORT1 } from '@/api/config/servicePort'
import http from '@/api'

/**
 * @name 用户管理模块
 */
// 获取用户列表
export const getUserList = (params: ReqUserParams) => {
  return http.post<ResPage<ResUserList>>(PORT1 + `/user/list`, params)
}

// 获取树形用户列表
export const getUserTreeList = (params: ReqUserParams) => {
  return http.post<ResPage<ResUserList>>(PORT1 + `/user/tree/list`, params)
}

// 新增用户
export const addUser = (params: { id: string }) => {
  return http.post(PORT1 + `/user/add`, params)
}

// 批量添加用户
export const BatchAddUser = (params: FormData) => {
  return http.post(PORT1 + `/user/import`, params)
}

// 编辑用户
export const editUser = (params: { id: string }) => {
  return http.post(PORT1 + `/user/edit`, params)
}

// 删除用户
export const deleteUser = (params: { id: string[] }) => {
  return http.post(PORT1 + `/user/delete`, params)
}

// 切换用户状态
export const changeUserStatus = (params: { id: string; status: number }) => {
  return http.post(PORT1 + `/user/change`, params)
}

// 重置用户密码
export const resetUserPassWord = (params: { id: string }) => {
  return http.post(PORT1 + `/user/rest_password`, params)
}

// 导出用户数据
export const exportUserInfo = (params: ReqUserParams) => {
  return http.download(PORT1 + `/user/export`, params)
}

// 获取用户状态字典
export const getUserStatus = () => {
  return http.get<ResStatus[]>(PORT1 + `/user/status`)
}

// 获取用户性别字典
export const getUserGender = () => {
  return http.get<ResGender[]>(PORT1 + `/user/gender`)
}

// 获取用户部门列表
export const getUserDepartment = () => {
  return http.get<ResDepartment[]>(PORT1 + `/user/department`)
}

// 获取用户角色字典
export const getUserRole = () => {
  return http.get<ResRole[]>(PORT1 + `/user/role`)
}
