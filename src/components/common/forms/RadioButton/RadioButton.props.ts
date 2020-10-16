import { WritableComputedRef } from 'vue'

export interface InputProps {
  name: string
  label: string
  modelValue: string
  value: string
  id: string
}

export const inputProps = {
  name: {
    type: String,
    required: true,
    default: 'name',
  },
  label: {
    type: String,
    required: true,
    default: 'label',
  },
  modelValue: {
    type: String,
    required: true,
    default: 'modelValue',
  },
  value: {
    type: String,
    required: true,
    default: 'value',
  },
  id: {
    type: String,
    required: true,
    default: 'id',
  },
  // on: {
  //   type: String as PropType<OnEventOptions>,  >> Enum
  //   default: EventOption.HOVER,
  // },
}

export interface TemplateProps {
  model: WritableComputedRef<string>
  name: string
  label: string
  value: string
  id: string
}

export const EmittedEvents = {
  OnChange: 'onChance',
}
