import { createRouter, createWebHashHistory } from 'vue-router'
import { staticRoutes, errorRoutes } from './modules/staticRouters'
import { useUserStore } from '@/stores/modules/user'
import NProgress from '@/config/nprogress'
import { useAuthStore } from '@/stores/modules/auth'
// import { useAuthStore } from '@/stores/modules/auth';
import { initDynamicRouter } from './modules/dynamicRouter'
import { ROUTER_WHITE_LIST } from '@/config'
const router = createRouter({
  history: createWebHashHistory(),
  routes: [...staticRoutes, ...errorRoutes],
  strict: false,
  scrollBehavior: () => ({ left: 0, top: 0 }),
  //   redirect: HOME_URL,
})

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  const authStore = useAuthStore()
  // 1.NProgress 开始
  NProgress.start()
  // 2.动态设置标题
  const title = import.meta.env.VITE_GLOB_APP_TITLE
  document.title = to.meta.title ? `${to.meta.title} - ${title}` : title
  // 3.判断是访问登陆页，有 Token 就在当前页面，没有 Token 重置路由到登陆页
  if (to.path.toLocaleLowerCase() === '/login') {
    // console.log(from)
    if (userStore.token) return next(from.fullPath)
    resetRouter()
    return next()
  }
  // 4.判断访问页面是否在路由白名单地址(静态路由)中，如果存在直接放行
  if (ROUTER_WHITE_LIST.includes(to.path)) return next()

  // 5.判断是否有 Token，没有重定向到 login 页面
  if (!userStore.token) return next({ path: '/login', replace: true })
  //resetRouter();
  // 6.如果没有菜单列表，就重新请求菜单列表并添加动态路由
  if (!authStore.authMenuListGet.length) {
    // console.log('123')
    await initDynamicRouter()
    // return next({ ...to, replace: true })
    router.replace(router.options.history.location)
    // return next(to,replace:true)
  }

  // 7.存储 routerName 做按钮权限筛选
  authStore.setRouteName(to.name as string)

  // 8.正常访问页面
  next()
})
//   router.beforeEach(async (to, from, next) => {
//     const userStore = useUserStore();
//     const authStore = useAuthStore();

//     // 1.NProgress 开始
//     NProgress.start();

//     // 2.动态设置标题
//     const title = import.meta.env.VITE_GLOB_APP_TITLE;
//     document.title = to.meta.title ? `${to.meta.title} - ${title}` : title;
//     if(userStore.token){
//       resetRouter()
//       await initDynamicRouter()
//     }
//     // 3.判断是访问登陆页，有 Token 就在当前页面，没有 Token 重置路由到登陆页
//     if (to.path.toLocaleLowerCase() === '/login') {
//       if (userStore.token) return next(from.fullPath);
//       resetRouter();
//       return next();
//     }

//     // 4.判断访问页面是否在路由白名单地址(静态路由)中，如果存在直接放行
//     if (ROUTER_WHITE_LIST.includes(to.path)) return next();

//     // 5.判断是否有 Token，没有重定向到 login 页面
//     if (!userStore.token) return next({ path: 'login', replace: true });

//     // 6.如果没有菜单列表，就重新请求菜单列表并添加动态路由
//     if (!authStore.authMenuListGet.length) {
//       await initDynamicRouter();
//       return next({ ...to, replace: true });
//     }

//     // 7.存储 routerName 做按钮权限筛选
//     authStore.setRouteName(to.name as string);

//     // 8.正常访问页面
//     next();
//   });
export const resetRouter = () => {
  const authStore = useAuthStore()
  authStore.flatMenuListGet.forEach((route) => {
    const { name } = route
    if (name && router.hasRoute(name)) router.removeRoute(name)
  })
}
router.afterEach(() => {
  NProgress.done()
})

export default router
