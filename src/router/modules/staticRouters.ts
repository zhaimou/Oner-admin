import { RouteRecordRaw } from 'vue-router'
export const staticRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/Main',
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue'),
  },
  {
    path: '/layout',
    name: 'layout',
    component: () => import('@/views/layout/layout.vue'),
  },
]

export const errorRoutes: RouteRecordRaw[] = [
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/components/error/404.vue'),
  },
  {
    path: '/403',
    name: '403',
    component: () => import('@/components/error/403.vue'),
    meta: {
      title: '403页面',
    },
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/components/error/404.vue'),
    meta: {
      title: '404页面',
    },
  },
  {
    path: '/500',
    name: '500',
    component: () => import('@/components/error/500.vue'),
    meta: {
      title: '500页面',
    },
  },
]
