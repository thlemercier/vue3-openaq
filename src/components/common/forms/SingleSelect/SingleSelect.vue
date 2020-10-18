<script lang="ts">
import { defineComponent, SetupContext, ref, onMounted } from 'vue'
import { RadioButton } from '@/components/common'
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
    // Local Selected Value
    const selectedValue = ref<string>('')

    const setSelectedValue = (value: string) => {
      selectedValue.value = value

      // If applyOnChange we emit the new value to the parent straight away
      if (props.applyOnChange) {
        context.emit('change', value)
      }
    }

    onMounted(() => {
      selectedValue.value = props.getValue(props.value)
      console.log('selectedValue', selectedValue.value)
      console.log('options', props.options)
    })

    return {
      selectedValue,
      setSelectedValue,
    }
  },
  components: {
    RadioButton,
  },
})
</script>

<style lang="scss" scopped src="./SingleSelect.scss"></style>
<template>
  <div class="single-select_container flexColumn p_5 p_b_0">
      <div class="single-select_search"></div>
      <ul class="single-select_options flexColumn">
        <li v-for="(option, index) in options" :key="getValue(option)" class="single-select_options_option">
          <RadioButton
            :name="name"
            :id="getValue(option, index)"
            :inputValue="getValue(option, index)"
            :label="getLabel(option, index)"
            :disabled="isDisabled && isDisabled(option)"
            :value="selectedValue"
            @change="setSelectedValue"
          />
        </li>
      </ul>
      <div class="single-select_actions flexRow sticky-bottom">
        <button>Cancel</button>
        <button>Apply</button>
      </div>
    </div>
</template>
