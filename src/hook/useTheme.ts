import { DEFAULT_PRIMARY } from '@/config'
import { useGlobalConfig } from '../stores/modules/global'
import { storeToRefs } from 'pinia'
import { ElMessage } from 'element-plus'
// import { getLightColor } from '@/utils/ color';
export const useTheme = () => {
  const globalConfig = useGlobalConfig()
  const { isDark, primary } = storeToRefs(globalConfig)
  const switchDark = () => {
    const html = document.documentElement as HTMLElement
    if (isDark.value) html.setAttribute('class', 'dark')
    else html.setAttribute('class', '')
    changePrimary(primary.value)
  }
  const changePrimary = (val: string | null) => {
    if (!val) {
      ;(val = DEFAULT_PRIMARY),
        ElMessage({
          type: 'success',
          message: `主题颜色已重置为 ${DEFAULT_PRIMARY}`,
        })
    }
    document.documentElement.style.setProperty('el-primary-color', val)
    // document.documentElement.style.setProperty(
    //     "--el-color-primary-dark-2",
    //     isDark.value ? `${getLightColor(val, 0.2)}` : `${getDarkColor(val, 0.3)}`
    //   );
  }
  return {
    switchDark,
    changePrimary,
  }
}
