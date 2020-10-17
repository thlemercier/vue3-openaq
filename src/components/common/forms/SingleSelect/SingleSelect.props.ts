import { WritableComputedRef, PropType, Ref } from 'vue'

export interface InputProps {
  value: string
  options: unknown[]
  getValue: (option: unknown) => string
  getLabel: (option: unknown) => string
  isDisabled?: (option: unknown) => boolean
  name: string
  applyOnChange?: boolean
}

export const inputProps = {
  value: {
    type: String,
    required: true,
    default: 'modelValue',
  },
  name: {
    type: String,
    required: true,
    default: 'name',
  },
  options: {
    type: Array as PropType<unknown>,
    required: true,
    default: [],
  },
  getValue: {
    type: Function as PropType<(option: unknown) => string>,
    required: true,
    default: () => console.warn('no getValue'),
  },
  getLabel: {
    type: Function as PropType<(option: unknown) => string>,
    required: true,
    default: () => console.warn('no getLabel'),
  },
  isDisabled: {
    type: Function as PropType<(option: unknown) => boolean>,
  },
  applyOnChange: {
    type: Boolean,
  },
}

export interface TemplateProps {
  selectedValue: Ref<string | undefined>
  setSelectedValue: (value: string) => void
}

export const EmittedEvents = {
  OnChange: 'onChance',
}
