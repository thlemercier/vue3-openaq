import { LocaleMessageDictionary, createI18n, VueMessageType } from 'vue-i18n'
import { NavigationGuardNext, RouteLocationNormalized, RouteLocationNormalizedLoaded, Router } from 'vue-router'
import { http } from './fetch'

export interface SupportedLocale {
  code: string
  labelKey: string
  base: string
}
export const supportedLocales: SupportedLocale[] = [
  {
    code: 'EN',
    labelKey: 'lang.EN',
    base: 'en',
  },
  {
    code: 'FR',
    labelKey: 'lang.FR',
    base: 'fr',
  },
]

export const i18nInstance = createI18n({ locale: 'en' })

export const i18nMiddleware = async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const locale: SupportedLocale | undefined = supportedLocales.find(({ base }) => base === to?.params.locale)

  if (locale) {
    const langProps = await http.get(`/i18n/${locale.code}`, undefined, true)

    i18nInstance.global.locale.value = locale.code
    i18nInstance.global.setLocaleMessage(locale.code, langProps as LocaleMessageDictionary<VueMessageType>)
    next()
  }
}

export const changeLanguage = async (newLocale: SupportedLocale, route: RouteLocationNormalizedLoaded, router: Router) => {
  if (newLocale) {
    const langProps = await http.get(`/i18n/${newLocale.code}`, undefined, true)

    i18nInstance.global.locale.value = newLocale.code
    i18nInstance.global.setLocaleMessage(newLocale.code, langProps as LocaleMessageDictionary<VueMessageType>)

    const currentLocale = route.params.locale
    const path = route.fullPath.replace(`/${currentLocale}/`, `/${newLocale.base}/`)

    router.push({ path })
  }
}
