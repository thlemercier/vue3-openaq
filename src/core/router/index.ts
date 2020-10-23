import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import RouterViewWrapper from './RouterViewWrapper.vue'
import { supportedLocales, i18nMiddleware, i18nInstance } from '../services/i18n'
import { pages } from './pages'

const getLocaleRegex = () => {
  const regex = supportedLocales
    .map(({ base }) => base)
    .join('|')

  return `(${regex})`
}

const routes: RouteRecordRaw[] = [
  {
    path: `/:locale${getLocaleRegex()}`,
    component: RouterViewWrapper,
    beforeEnter: i18nMiddleware,
    children: pages,
  },
  {
    path: '',
    redirect: `/${i18nInstance.global.locale.value}/home`,
  },
  {
    path: '/:catchAll(.*)*',
    name: '404',
    redirect: `/${i18nInstance.global.locale.value}/home`,
  },
]

const router = createRouter({
  history: process.env.NODE_ENV === 'production' ? createWebHashHistory('/vue3-openaq/') : createWebHashHistory(),
  routes,
})

export default router
