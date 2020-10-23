<script lang="ts">
import { defineComponent } from 'vue'
import { Header } from './Header'

export default defineComponent({
  name: 'Layout',
  components: {
    Header,
  },
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scopped src="./Layout.scss"></style>
<template>
  <section id="app-layout">
    <header id="layout-header">
      <Header />
    </header>
    <main id="layout-content">
      <slot />
    </main>
  </section>
  <span id="app-version">$$version_number$$</span>
</template>
