import { defineStore } from 'pinia'
import { UserState } from '@/stores/interface'
import piniaPersistConfig from '@/config/piniaPersistConfig'

export const useUserStore = defineStore('Oner-user', {
  state: (): UserState => ({
    token: '',
    userInfo: { name: 'Oner' },
  }),
  getters: {},
  actions: {
    // Set Token
    setToken(token: string) {
      this.token = token
    },
    // Set setUserInfo
    setUserInfo(userInfo: UserState['userInfo']) {
      this.userInfo = userInfo
    },
  },
  persist: piniaPersistConfig('Oner-user'),
})
