<script lang="ts">
import { AppStore } from '@/core/store'
import { AppModuleActionTypes } from '@/core/store/typings/app.module.interface'
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'DataProvider',
  async setup () {
    const route = useRoute()

    console.log('currentRoute', route.fullPath)
    const appStore = useStore<AppStore>()

    await appStore.dispatch(`app/${AppModuleActionTypes.FETCH_MANDATORY_DATA}`)
  },
})
</script>

<template>
  <slot />
</template>
