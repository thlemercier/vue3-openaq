import { ComputedRef, PropType, Ref } from 'vue'

export type ValueShape = string | { [key: string]: unknown }

export interface InputProps {
  value: ValueShape
  name: string
  options: ValueShape[]
  isOpen?: boolean
  getLabel?: (option: ValueShape) => string
  getValue?: (option: ValueShape) => string
  isDisabled?: (option: unknown, index?: number) => boolean
}

export const inputProps = {
  value: {
    type: [String, Object],
    required: true,
    default: 'initialValue',
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
  isOpen: {
    type: Boolean,
    default: false,
  },
  getLabel: {
    type: Function as PropType<(option: ValueShape, index?: number) => string>,
    default: (option: ValueShape) => option as string,
  },
  getValue: {
    type: Function as PropType<(option: unknown, index?: number) => string>,
    default: (option: ValueShape) => option as string,
  },
  isDisabled: {
    type: Function as PropType<(option: unknown, index?: number) => boolean>,
  },
}

export interface TemplateProps {
  isOpen: Ref<boolean>
  defaultOption: ComputedRef<ValueShape>
  selectedOption: Ref<ValueShape>
  setSelectedOption: (option: ValueShape) => void
  apply: () => void
  open: () => void
  cancel: () => void
  filteredOptions: ComputedRef<ValueShape[]>
  filterValue: Ref<string>

}

export const EmittedEvents = {
  change: 'change',
}
