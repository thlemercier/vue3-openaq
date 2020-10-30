import { PropType } from 'vue'

export interface InputProps {
  ariaLabel?: string
  type?: string
}

export const inputProps = {
  ariaLabel: {
    type: String,
    default: 'Button',
  },
  type: {
    type: String,
    default: 'default',
  },
  classes: {
    type: String,
  },
}

export const EmittedEvents = {
  click: 'click',
}
