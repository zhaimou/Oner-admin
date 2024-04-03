import { FieldNamesProps } from '@/components/proTable/interface'
import { MenuOptions } from '@/types/global'

/**
 * @description 使用递归扁平化菜单，方便添加动态路由
 * @param {Array} menuList 菜单列表
 * @returns {Array}
 */
export function getFlatMenuList(menuList: MenuOptions[]): MenuOptions[] {
  const newMenuList: MenuOptions[] = JSON.parse(JSON.stringify(menuList))

  const res = newMenuList.flatMap((item) => [
    item,
    ...(item.children ? getFlatMenuList(item.children) : []),
  ])
  return res
}

/**
 * @description 使用递归过滤出需要渲染在左侧菜单的列表 (需剔除 isHide == true 的菜单)
 * @param {Array} menuList 菜单列表
 * @returns {Array}
 * */
export function getShowMenuList(menuList: MenuOptions[]) {
  const newMenuList: MenuOptions[] = JSON.parse(JSON.stringify(menuList))
  return newMenuList.filter((item) => {
    item.children?.length && (item.children = getShowMenuList(item.children))
    return !item.meta?.isHide
  })
}

/**
 * @description 使用递归找出所有面包屑存储到 pinia/vuex 中
 * @param {Array} menuList 菜单列表
 * @param {Array} parent 父级菜单
 * @param {Object} result 处理后的结果
 * @returns {Object}
 */
export const getAllBreadcrumbList = (
  menuList: MenuOptions[],
  parent = [],
  result: { [key: string]: any } = {}
) => {
  for (const item of menuList) {
    result[item.path] = [...parent, item]
    if (item.children)
      getAllBreadcrumbList(item.children, result[item.path], result)
  }
  return result
}

export function getTimeState() {
  const timeNow = new Date()
  const hours = timeNow.getHours()
  if (hours >= 6 && hours <= 10) return `早上好 🌅`
  if (hours >= 10 && hours <= 14) return `中午好 🔅`
  if (hours >= 14 && hours <= 18) return `下午好 🌇`
  if (hours >= 18 && hours <= 24) return `晚上好 🌙`
  if (hours >= 0 && hours <= 6) return `凌晨好 🥱`
}

export function handleProp(prop: string) {
  const propArr = prop.split('.')
  if (propArr.length == 1) return prop
  return propArr[propArr.length - 1]
}

export function handleRowAccordingToProp(
  row: { [key: string]: any },
  prop: string
) {
  if (!prop.includes('.')) return row[prop] ?? '--'
  prop.split('.').forEach((item) => (row = row[item] ?? '--'))
  return row
}

export function formatValue(callValue: any) {
  // 如果当前值为数组，使用 / 拼接（根据需求自定义）
  if (Array.isArray(callValue))
    return callValue.length ? callValue.join(' / ') : '--'
  return callValue ?? '--'
}

/**
 * @description 根据枚举列表查询当需要的数据（如果指定了 label 和 value 的 key值，会自动识别格式化）
 * @param {String} callValue 当前单元格值
 * @param {Array} enumData 字典列表
 * @param {Array} fieldNames label && value && children 的 key 值
 * @param {String} type 过滤类型（目前只有 tag）
 * @returns {String}
 * */

export function filterEnum(
  callValue: any,
  enumData?: any,
  fieldNames?: FieldNamesProps,
  type?: 'tag'
) {
  const value = fieldNames?.value ?? 'value'
  const label = fieldNames?.label ?? 'label'
  const children = fieldNames?.children ?? 'children'
  let filterData: { [key: string]: any } = {}
  // 判断 enumData 是否为数组
  if (Array.isArray(enumData))
    filterData = findItemNested(enumData, callValue, value, children)
  // 判断是否输出的结果为 tag 类型
  if (type == 'tag') {
    return filterData?.tagType ? filterData.tagType : ''
  } else {
    return filterData ? filterData[label] : '--'
  }
}

/**
 * @description 递归查找 callValue 对应的 enum 值
 * */
export function findItemNested(
  enumData: any,
  callValue: any,
  value: string,
  children: string
) {
  return enumData.reduce((accumulator: any, current: any) => {
    if (accumulator) return accumulator
    if (current[value] === callValue) return current
    if (current[children])
      return findItemNested(current[children], callValue, value, children)
  }, null)
}

export function generateUUID() {
  let uuid = ''
  for (let i = 0; i < 32; i++) {
    const random = (Math.random() * 16) | 0
    if (i === 8 || i === 12 || i === 16 || i === 20) uuid += '-'
    uuid += (i === 12 ? 4 : i === 16 ? (random & 3) | 8 : random).toString(16)
  }
  return uuid
}
