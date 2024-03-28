import { useAuthStore } from '@/stores/modules/auth.ts'
import { RouteRecordRaw } from 'vue-router'
import { router } from '@/router/index.ts'

// import { useUserStore} from "@/stores/modules/uesr";

const modules = import.meta.glob('@/views/**/*.vue')
export const initDynamicRouter = async () => {
  // const userStore = useUserStore();
  const authStore = useAuthStore()
  try {
    await authStore.getAuthMenuList()

    await authStore.getAuthButtonList()

    // if(authStore.authMenuListGet.length === 0){

    // }
    // console.log(authStore.flatMenuListGet)
    authStore.flatMenuListGet.map((item) => {
      item.children && delete item.children
      if (item.component && typeof item.component == 'string') {
        item.component = modules['/src/views' + item.component + '.vue']
        // console.log(modules)
      }
      if (item.meta.isFull) {
        router.addRoute(item as unknown as RouteRecordRaw)
      } else {
        router.addRoute('layout', item as unknown as RouteRecordRaw)
      }
    })
  } catch (err) {
    console.log(err)
  }
}
