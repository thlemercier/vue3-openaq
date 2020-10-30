<script lang="ts">
import { computed, defineComponent, ref, SetupContext, watch } from 'vue'
import { RadioButton } from '../..'
import ButtonWithTooltip from '../../buttons/ButtonWithTooltip.vue'
import Popover from '../../Popover/Popover.vue'
import {
  InputProps,
  inputProps,
  TemplateProps,
  EmittedEvents,
  ValueShape,
} from './SingleSelectV2.props'

export default defineComponent({
  name: 'SingleSelectV2',
  props: inputProps,
  emits: [EmittedEvents.change],
  setup (props: Readonly<InputProps>, context: SetupContext): TemplateProps {
    const defaultOption = computed(() => props.value)
    const isOpen = ref(Boolean(props.isOpen))
    const filterValue = ref('')

    const selectedOption = ref(defaultOption.value)

    const filteredOptions = computed(() => {
      if (filterValue.value.length) {
        return props.options.filter((option) => {
          if (props.getLabel) {
            return props.getLabel(option).toLowerCase().includes(filterValue.value.toLowerCase())
          }

          return (option as string).toLowerCase() === filterValue.value.toLowerCase()
        })
      }

      return props.options
    })

    const setSelectedOption = (value: ValueShape) => {
      selectedOption.value = props.options.find((currentOption) => props.getValue && props.getValue(currentOption) === value) || props.options[0]
    }

    const apply = () => {
      context.emit('change', selectedOption.value)
      isOpen.value = false
      filterValue.value = ''
    }

    const open = () => {
      isOpen.value = true
    }

    const cancel = () => {
      selectedOption.value = defaultOption.value
      isOpen.value = false
      filterValue.value = ''
    }

    watch(() => [props.isOpen], ([newIsOpen]) => {
      isOpen.value = Boolean(newIsOpen)
    })

    return {
      isOpen,
      defaultOption,
      selectedOption,
      setSelectedOption,
      apply,
      open,
      cancel,
      filteredOptions,
      filterValue,
    }
  },
  components: {
    Popover,
    RadioButton,
    ButtonWithTooltip,
  },
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scopped src="./SingleSelectV2.scss"></style>
<template>
  <div>
    <Popover
        on="click"
        :open="isOpen"
        @onClose="cancel"
        @onOpen="open"
        anchor="bottom left"
        :offset="5"
      >
        <template #trigger>
          <ButtonWithTooltip
              :aria-expanded="isOpen"
              :ariaLabel="getLabel(defaultOption)"
            >
              <slot name="trigger" :value="getLabel(defaultOption)">
                {{ getLabel(defaultOption) }}
              </slot>
            </ButtonWithTooltip>
        </template>
        <div class="single-select_container flexColumn p_5 p_b_0">
          <div class="single-select_search m_b_5">
            <input type="text" v-model="filterValue" placeholder="Search..." />
          </div>
          <ul class="single-select_options flexColumn m_b_5 m_t_5">
            <span v-if="!filteredOptions.length">No Results</span>
            <li v-for="(option, index) in filteredOptions" :key="getValue(option)" class="single-select_options_option">
              <RadioButton
                :name="name"
                :id="getValue(option, index)"
                :inputValue="getValue(option, index)"
                :label="getLabel(option, index)"
                :value="getValue(selectedOption)"
                @change="setSelectedOption"
                :disabled="isDisabled && isDisabled(option)"
              />
            </li>
          </ul>
          <section class="single-select_actions flexRow alignEnd">
            <ButtonWithTooltip @click="apply" ariaLabel="Apply" type='submit' class="m_l_auto m_r_5">Apply</ButtonWithTooltip>
            <ButtonWithTooltip @click="cancel" ariaLabel="Cancel" type='cancel'>Cancel</ButtonWithTooltip>
          </section>
        </div>
    </Popover>
  </div>
</template>
