<script lang="ts">
import { computed, defineComponent, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { changeLanguage, supportedLocales } from '../services/i18n'

export default defineComponent({
  name: 'RouterViewWrapper',
  setup () {
    const route = useRoute()
    const router = useRouter()

    const currentLocale = computed(() => route.params.locale)

    watch(() => [currentLocale.value], ([newLocale]) => {
      const language = supportedLocales.find(({ base }) => base === newLocale)

      if (language) {
        changeLanguage(language, route, router)
      }
    })
  },
})
</script>

<template>
  <div>
    <router-view />
  </div>
</template>
