import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import RouterView2 from './RouterView2.vue'
import { supportedLocales, SupportedLocale, i18nMiddleware } from '../services/i18n'
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
    beforeEnter (to, from, next) {
      console.log('beforeEnter MF')
      i18nMiddleware(to.params.locale as string)
      next()
    },
    children: pages,
  },
  {
    path: '',
    redirect: '/en',
  },
  {
    path: '/:catchAll(.*)*',
    redirect: '/en',
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
