import { Ref } from 'vue'

export const Anchors = {
  TOP_LEFT: 'top left',
  TOP_CENTER: 'top center',
  TOP_RIGHT: 'top right',
  LEFT_CENTER: 'left center',
  RIGHT_CENTER: 'right center',
  BOTTOM_LEFT: 'bottom left',
  BOTTOM_CENTER: 'bottom center',
  BOTTOM_RIGHT: 'bottom right',
} as const

export type AnchorType = typeof Anchors[keyof typeof Anchors]

export const EventOption = {
  HOVER: 'hover',
  CLICK: 'click',
}

export type OnEventOptions = typeof EventOption[keyof typeof EventOption]

export type PopoverInputProperties = {
  open: boolean
  on: OnEventOptions
  anchor: AnchorType
  closeOnEscape: boolean
  nested: boolean
  offset: number
  eventListenerDelay: number
  interactive: boolean
}
export type PopoverOutputProperties = {
  poppupTriggerRef: Ref<HTMLElement | null>
  poppupContentRef: Ref<HTMLElement | null>
  isOpen: Ref<boolean>
}
