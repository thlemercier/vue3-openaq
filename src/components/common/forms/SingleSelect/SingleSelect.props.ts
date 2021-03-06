import { ComputedRef, PropType, Ref } from 'vue'

export interface InputProps {
  value: string
  options: unknown[]
  getValue: (option: unknown, index?: number) => string
  getLabel: (option: unknown, index?: number) => string
  isDisabled?: (option: unknown, index?: number) => boolean
  name: string
  applyOnChange?: boolean
}

export const inputProps = {
  value: {
    type: [String, Object],
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
    type: Function as PropType<(option: unknown, index?: number) => string>,
    required: true,
    default: () => console.warn('no getValue'),
  },
  getLabel: {
    type: Function as PropType<(option: unknown, index?: number) => string>,
    required: true,
    default: () => console.warn('no getLabel'),
  },
  isDisabled: {
    type: Function as PropType<(option: unknown, index?: number) => boolean>,
  },
}

export interface TemplateProps {
  setSelectedValue: (value: string) => void
  isDropdownOpen: Ref<boolean>
  open: () => void
  close: () => void
  defaultOption: ComputedRef<string>
}

export const EmittedEvents = {
  change: 'change',
}
