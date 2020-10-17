import { WritableComputedRef } from 'vue'

export interface InputProps {
  name: string
  label: string
  value: string
  inputValue: string
  id: string
  disabled?: boolean
}

export const inputProps = {
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  inputValue: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  disabled: {
    type: Boolean,
  },
} as const

export interface TemplateProps {
  model: WritableComputedRef<string>
  onChange: (event: { target: HTMLInputElement }) => void
}

export const EmittedEvents = {
  change: 'change',
}
