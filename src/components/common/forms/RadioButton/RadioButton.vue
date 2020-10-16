<script lang="ts">
import { computed, defineComponent, SetupContext } from 'vue'
import {
  InputProps,
  inputProps,
  TemplateProps,
  EmittedEvents,
} from './RadioButton.props'

export default defineComponent({
  name: 'RadioButton',
  props: inputProps,
  emits: [EmittedEvents.OnChange],
  setup (props: Readonly<InputProps>, context: SetupContext): TemplateProps {
    const model = computed({
      get: () => props.modelValue,
      set: (value) => context.emit('update:modelValue', value),
    })

    return {
      name: props.name,
      label: props.label,
      id: props.id,
      model,
      value: props.value,
    }
  },
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scopped src="./RadioButton.scss"></style>
<template>
  <div class="radio-button" @click="$emit('update:modelValue', value)">
    <input
      type="radio"
      :name="name"
      :id="id"
      :value="value"
      v-model="model"
    />
    <div class="radio-button_label">
      <label :for="name">{{label}}</label>
    </div>
  </div>
</template>
