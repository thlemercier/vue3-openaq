import { RouteRecordRaw } from 'vue-router'

export const pages: RouteRecordRaw[] = [
  {
    path: 'home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Home/Home.vue'),
  },
  {
    path: '',
    redirect: '/home',
  },
]
