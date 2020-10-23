import { RouteRecordRaw } from 'vue-router'
import { i18nInstance } from '../services/i18n'

export const pages: RouteRecordRaw[] = [
  {
    path: 'home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Home/Home.vue'),
  },
  {
    path: 'home3',
    name: 'Home3',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Home/Home.vue'),
  },
  {
    path: '',
    redirect: `/${i18nInstance.global.locale.value}/home`,
  },
  {
    path: '/:catchAll(.*)*',
    name: '404-b',
    redirect: `/${i18nInstance.global.locale.value}/home`,
  },
]
