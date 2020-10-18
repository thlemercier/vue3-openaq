import { createApp } from 'vue'
import Root from '@/components/core/Root/Root.vue'
import router from '@/core/router'
import store from '@/core/store'
import { i18nInstance } from '@/core/services/i18n'

import '@/core/styles/global.scss'

createApp(Root)
  .use(store)
  .use(i18nInstance)
  .use(router)
  .mount('#app')
