import { LocaleMessageDictionary, createI18n, VueMessageType } from 'vue-i18n'
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

export const i18nInstance = createI18n()

export const i18nMiddleware = async (localeParam: string) => {
  const locale: SupportedLocale | undefined = supportedLocales.find(({ base }) => base === localeParam)

  if (locale) {
    const langProps = await http.get(`/i18n/${locale.code}`, undefined, true)

    i18nInstance.global.locale.value = locale.code
    i18nInstance.global.setLocaleMessage(locale.code, langProps as LocaleMessageDictionary<VueMessageType>)
  }
}
