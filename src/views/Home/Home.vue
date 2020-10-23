<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'Home',
  setup () {
    const route = useRoute()

    return {
      msg: computed(() => route.fullPath),
    }
  },
})
</script>

<template>
  <div>{{ msg }}</div>
</template>
