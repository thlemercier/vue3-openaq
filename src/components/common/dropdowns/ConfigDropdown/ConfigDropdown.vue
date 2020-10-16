<script lang='ts'>
import { computed, defineComponent, ref, SetupContext } from 'vue'
// import { useMatchMedia } from '@/core/composable/useMediaMatch'
import Popover from '../../Popover/Popover.vue'

export default defineComponent({
  name: 'ConfigDropdown',
  components: { Popover },
  props: {
    ariaLabel: {
      type: String,
      required: true,
    },
  },
  emits: ['onClose', 'onOpen'],
  setup (_, { emit }: SetupContext) {
    // const { isDesktop } = useMatchMedia()

    const isDropdownOpen = ref(false)
    const toggleIsDropdownOpen = () => {
      isDropdownOpen.value = !isDropdownOpen.value
    }

    return {
      // isDesktop: computed(() => isDesktop.value),
      isDropdownOpen,
      toggleIsDropdownOpen,
    }
  },
})
</script>

<style lang="scss" scopped src="./ConfigDropdown.scss"></style>
<template>
  <div class="config-dropdown-wrapper">
    <Popover
      on="click"
      :open="isDropdownOpen"
      @onClose="toggleIsDropdownOpen"
      @onOpen="toggleIsDropdownOpen"
      anchor="bottom left"
      :offset="5"
    >
      <template #trigger>
        <button
          class="config-dropdown_button"
          tabindex="0"
          :aria-expanded="isDropdownOpen"
          :aria-label="ariaLabel"
        >
          <div class="config-dropdown_button_label"><slot name="label" /></div>
          <div class="config-dropdown_button_value"><slot name="value" /></div>
        </button>
      </template>
      <slot />
    </Popover>
  </div>
</template>
