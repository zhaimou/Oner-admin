import { createRouter, createWebHashHistory } from 'vue-router'
import { staticRoutes, errorRoutes } from './modules/staticRouters'

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [...staticRoutes, ...errorRoutes],
  strict: false,
  // scrollBehavior: () => ({ left: 0, top: 0 })
  //   redirect: HOME_URL,
})

// router.beforeEach((to, from, next)=>{
// if(token){
// next('/main')
// }else{
// to.path('login')
// }
// })
//
