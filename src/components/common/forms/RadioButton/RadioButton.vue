<script lang="ts">
import { computed, defineComponent, SetupContext } from 'vue'
import {
  InputProps,
  inputProps,
  TemplateProps,
  EmittedEvents,
} from './RadioButton.props'

/**
 * A Radio Button Component.
 * -------------------------
 * Usage: (
 *  <RadioButton
 *    name="group-name" <<< The common name shared between all radio button: input#attr-name
 *    id="current-id"   <<< The unique ID specific to this radio button: input#attr-id. shared with input#attr-value
 *    inputValue="current-value" <<< The input control's value: input#attr-value
 *    label="label"   <<< The label next to the radio
 *    disabled="false/true"   <<< (optional) can(not) interact with the input: input#attr-disabled
 *    :value="selectedValue"  <<< The value from the RadioButton parent's state
 *    @change="setSelectedValue" <<< The function from the RadioButton parent
 *  />
 * )
 */
export default defineComponent({
  name: 'RadioButton',
  props: inputProps,
  emits: [EmittedEvents.change],
  setup (props: Readonly<InputProps>, context: SetupContext): TemplateProps {
    const model = computed({
      get: () => props.value,
      set: (value) => context.emit('change', value),
    })

    const onChange = () => {
      if (!props.disabled) {
        model.value = props.inputValue
      }
    }

    return {
      model,
      onChange,
    }
  },
})
</script>

<style lang="scss" scopped src="./RadioButton.scss"></style>
<template>
  <div
    :tabIndex="disabled ? -1 : 0"
    role="radio"
    :aria-label="label"
    :aria-checked="inputValue === model"
    class="radio-button"
    :class="{ 'disabled': disabled }"
    @click="onChange"
    @keyup.enter="onChange"
  >
    <input
      class="radio-button_input"
      type="radio"
      :name="name"
      :id="id"
      :value="inputValue"
      :disabled="disabled"
      v-model="model"
    />
    <div class="radio-button_inner-input" :class="{ 'checked': inputValue === model}"></div>
    <div class="radio-button_label">
      <label :for="id">{{label}}</label>
    </div>
  </div>
</template>
