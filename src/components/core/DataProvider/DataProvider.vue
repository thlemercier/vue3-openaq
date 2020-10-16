<script lang="ts">
import { AppStore } from '@/core/store'
import { AppModuleActionTypes } from '@/core/store/typings/app.module.interface'
import { Country } from '@/core/typings'
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'DataProvider',
  async setup () {
    const appStore = useStore<AppStore>()
    const countries = computed<Country[]>(() => appStore.state.app.countries)

    await appStore.dispatch(`app/${AppModuleActionTypes.FETCH_MANDATORY_DATA}`)
  },
})
</script>

<template>
  <slot />
</template>
