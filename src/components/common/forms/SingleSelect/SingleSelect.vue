<script lang="ts">
import { defineComponent, SetupContext, ref, onMounted, computed } from 'vue'
import { RadioButton } from '@/components/common'
import Popover from '../../Popover/Popover.vue'
import {
  InputProps,
  inputProps,
  TemplateProps,
  EmittedEvents,
} from './SingleSelect.props'

/**
 * A Single Select Component, with a list of Radio Buttons.
 * -------------------------
 * Usage: (
 *  <SingleSelect />
 * )
 */
export default defineComponent({
  name: 'SingleSelect',
  props: inputProps,
  emits: [EmittedEvents.change],
  setup (props: Readonly<InputProps>, context: SetupContext): TemplateProps {
    const defaultOption = computed(() => props.value)

    const isDropdownOpen = ref(false)

    const open = () => {
      isDropdownOpen.value = true
    }

    const close = () => {
      isDropdownOpen.value = false
    }

    const setSelectedValue = (value: string) => {
      context.emit('change', value)
    }

    return {
      setSelectedValue,
      isDropdownOpen,
      open,
      close,
      defaultOption,
    }
  },
  components: {
    RadioButton,
    Popover,
  },
})
</script>

<style lang="scss" scopped src="./SingleSelect.scss"></style>
<template>
  <Popover
      on="click"
      :open="isDropdownOpen"
      @onClose="close()"
      @onOpen="open"
      anchor="bottom left"
      :offset="5"
    >
      <template #trigger>
        <slot name="trigger" :value="getLabel(defaultOption)" />
      </template>
      <div class="single-select_container flexColumn p_5 p_b_0">
        <div class="single-select_search">search</div>
        <ul class="single-select_options flexColumn">
          <li v-for="(option, index) in options" :key="getValue(option)" class="single-select_options_option">
          <RadioButton
            :name="name"
            :id="getValue(option, index)"
            :inputValue="getValue(option, index)"
            :label="getLabel(option, index)"
            :disabled="isDisabled && isDisabled(option)"
            :value="getValue(value)"
            @change="setSelectedValue"
          />
          </li>
        </ul>
        <section class="single-select_actions flexRow">
          <button>Cancel</button>
          <button>Apply</button>
        </section>
      </div>
      <!-- <div v-if="!applyOnChange" class="config-dropdown_actions flexRow sticky-bottom">
        <button @click="close('cancel')">Cancel</button>
        <button @click="close('apply')" :disabled="applyDisabled">Apply</button>
      </div> -->
    </Popover>

</template>
