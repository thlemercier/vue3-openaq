import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import Root from '@/components/core/Root/Root.vue'
import router from '@/core/router'
import store from '@/core/store'

import '@/core/styles/global.scss'

const i18n = createI18n()

createApp(Root)
  .use(store)
  .use(i18n)
  .use(router)
  .mount('#app')
