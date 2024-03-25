import { useAuthStore } from '@/stores/modules/auth.ts'
// import { useUserStore} from "@/stores/modules/uesr";

// const modules = import.meta.glob("@/views/**/*.vue");
export const initDynamicRouter = async () => {
  // const userStore = useUserStore();
  const authStore = useAuthStore()
  try {
    await authStore.getAuthMenuList()
    await authStore.getAuthButtonList()
  } catch (err) {
    console.log(err)
  }
}
