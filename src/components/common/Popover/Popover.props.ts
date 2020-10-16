/* eslint-disable */
import { Anchors, AnchorType, EventOption, OnEventOptions } from './Popover.types'
import { PropType } from 'vue'

export const PopoverProps = {
  open: {
    type: Boolean,
    default: false,
  },
  on: {
    type: String as PropType<OnEventOptions>,
    default: EventOption.HOVER,
  },
  anchor: {
    type: String as PropType<AnchorType>,
    default: Anchors.BOTTOM_LEFT,
  },
  closeOnEscape: {
    type: Boolean,
    default: false,
  },
  nested: {
    type: Boolean,
    default: false,
  },
  offset: {
    type: Number,
    default: 0,
  },
  eventListenerDelay: {
    type: Number,
    default: 100,
  },
  interactive: {
    type: Boolean,
    default: false,
  }
}