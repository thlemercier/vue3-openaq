<script lang="ts">
import { computed, defineComponent, SetupContext, ref, onMounted } from 'vue'
import { RadioButton } from '@/components/common'
import {
  InputProps,
  inputProps,
  TemplateProps,
  EmittedEvents,
} from './SingleSelect.props'

export default defineComponent({
  name: 'SingleSelect',
  props: inputProps,
  setup (props: Readonly<InputProps>, context: SetupContext): TemplateProps {
    const selectedValue = ref<string | undefined>(undefined)

    const setSelectedValue = (value: string) => {
      selectedValue.value = value

      if (props.applyOnChange) {
        context.emit('input', value)
      }
    }

    onMounted(() => {
      selectedValue.value = props.getValue(props.value)
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scopped src="./SingleSelect.scss"></style>
<template>
  <div class="single-select_container flexColumn p_5 p_b_0">
      <div class="single-select_search"></div>
      <ul class="single-select_options flexColumn">
        <li v-for="option in options" :key="getValue(option)" class="single-select_options_option">
          <RadioButton
            :name="name"
            :id="getValue(option)"
            :inputValue="getValue(option)"
            :label="getLabel(option)"
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
