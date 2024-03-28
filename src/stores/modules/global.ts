import { defineStore } from 'pinia'
// import piniaPersistConfig from '@/config/piniaPersistConfig'
import piniaPersistConfig from '@/config/piniaPersistConfig'
import { GlobalState } from '../interface'
export const useGlobalStore = defineStore('oner-global', {
  state: (): GlobalState => ({
    tabsIcon: true,
    isDark: false,
    primary: '#009688',
    isCollapse: false,
    accordion: true,
    breadcrumb: true,
    breadcrumbIcon: true,
    maximize: false,
    layout: 'vertical',
    tabs: true,
    footer: true,
  }),
  //相当于
  // state: () => {
  //     return {
  //         isDark: false
  //     }
  // }
  getters: {},
  actions: {
    // setGlobalState(key:keyof GlobalState,value:any) {
    //    if(Array.isArray(args)){
    //   this.$patch({[key] : value})
    // }else{
    // return 'error'
    // }
    // },
    // setGlobalState(...args: Array<ObjToKeyValArray<GlobalState>>) {
    //     // if
    //     if(Array.isArray(args)){
    //         this.$patch({ [args[0]]: args[1] });
    // // type ObjToKeyValArray<T> = {
    // //     [K in keyof T]: [K, T[K]];
    //   }[keyof T];

    setGlobalState(...args: any) {
      const [key, value] = args
      this.$patch({ [key]: value })
    },
  },
  persist: piniaPersistConfig('oner-global'),
})
// type ObjToKeyValArray<T> = {
//     [K in keyof T]: [K, T[K]];
//   }[keyof T];
