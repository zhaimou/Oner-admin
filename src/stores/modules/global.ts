import { defineStore } from 'pinia'
// import piniaPersistConfig from '@/config/piniaPersistConfig'
import piniaPersistConfig from '@/config/piniaPersistConfig'
export const useGlobalConfig = defineStore('globalConfig', {
  state: () => ({
    isDark: false,
    primary: '#009688',
  }),
  //相当于
  // state: () => {
  //     return {
  //         isDark: false
  //     }
  // }
  persist: piniaPersistConfig('globalConfig'),
})
