import { ElMessage } from 'element-plus'

export function getLightColor(color: string, leval?: number) {
  const reg = /^#?[0-9a-fA-F]{6}$/
  if (!reg.test(color)) {
    return ElMessage.warning('输入错误的hex颜色值')
  }
  const rgb = hexToRgb(color)
  console.log(rgb)
}

// 16进制转rgb10进制
function hexToRgb(str: any) {
  const hexs: any = ''
  const reg = /^#[0-9a-fA-F]{6}$/
  if (!reg.test(str)) return ElMessage.warning('错误的hex颜色')
  str = str.replace('#', '')
  const hexsArr = str.match(/../g)
  for (let i = 0; i < 3; i++) {
    hexs[i] = hexsArr.parseInt(hexs[i], 16)
  }
  return hexs
}
