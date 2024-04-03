import { createRouter, createWebHashHistory } from 'vue-router'
import { staticRoutes, errorRoutes } from './modules/staticRouters'
import { useUserStore } from '@/stores/modules/user'
import NProgress from '@/config/nprogress'
// import { useAuthStore } from '@/stores/modules/auth';
// import { initDynamicRouter } from './modules/dynamicRouter';
const router = createRouter({
  history: createWebHashHistory(),
  routes: [...staticRoutes, ...errorRoutes],
  strict: false,
  scrollBehavior: () => ({ left: 0, top: 0 }),
  //   redirect: HOME_URL,
})

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  // const authStore = useAuthStore();
  NProgress.start()
  //   console.log(to, from, next)
  // 动态设置标题
  const title = import.meta.env.VITE_GLOB_APP_TITLE
  document.title = to.meta.title ? `${to.meta.title} - ${title}` : title

  // if (to.path.toLocaleLowerCase() === '/login') {
  // if (userStore.token) return next(from.fullPath);
  // return next();
  //  }

  // 5.判断是否有 Token，没有重定向到 login 页面
  if (!userStore.token) return next({ path: 'login', replace: true })
  //   else if(userStore.token){ next({path:'/home/index',})}
  else next()
  // 5.判断是否有 Token，没有重定向到 login 页面

  // 6.如果没有菜单列表，就重新请求菜单列表并添加动态路由
  //   if (!authStore.authMenuListGet.length) {
  //     await initDynamicRouter();
  //     return next({ ...to, replace: true });
  //   }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
