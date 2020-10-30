<script lang='ts'>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ConfigDropdownTrigger',
  props: {
    ariaLabel: {
      type: String,
      required: true,
    },
    open: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['onClose', 'onOpen'],
})
</script>

<style lang="scss" scopped src="./ConfigDropdownTrigger.scss"></style>
<template>
  <button
    class="config-dropdown_button"
    tabindex="0"
    :aria-expanded="open"
    :aria-label="ariaLabel"
  >
    <div class="config-dropdown_button_label"><slot name="label" /></div>
    <div class="config-dropdown_button_value"><slot name="value" /></div>
  </button>
</template>
