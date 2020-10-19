import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import RouterView2 from './RouterView2.vue'
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
    component: RouterView2,
    beforeEnter: i18nMiddleware,
    children: pages,
  },
  {
    path: '',
    redirect: `/${i18nInstance.global.locale.value}/home`,
  },
  {
    path: '/:catchAll(.*)*',
    redirect: `/${i18nInstance.global.locale.value}/home`,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
