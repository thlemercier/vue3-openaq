<script lang="ts">
import { defineComponent } from 'vue'
import {
  inputProps,
  EmittedEvents,
} from './ButtonWithTooltip.props'

export default defineComponent({
  name: 'ButtonWithTooltip',
  props: inputProps,
  emits: [EmittedEvents.click],
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scopped src="./ButtonWithTooltip.scss"></style>
<template>
  <button @click="$emit('click')" class="btn-with-tooltip" :class="{ [type]: true }" tabindex="0" :aria-label="ariaLabel">
    <slot />
  </button>
</template>
