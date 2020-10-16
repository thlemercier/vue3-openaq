<template>
  <div
    ref="poppupTriggerRef"
    class="popover-trigger"
  >
    <slot name="trigger" />
  </div>
  <div
    v-if="isOpen"
    ref="poppupContentRef"
    class="popover-content"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, SetupContext, ref, Ref, onMounted, watch, nextTick } from 'vue'

import { PopoverInputProperties, PopoverOutputProperties, AnchorType } from './Popover.types'
import { createObserver, doPositionPopover } from './popover.helper.v2'

import { PopoverProps } from './Popover.props'
import { hasValue } from '@/core/services/helpers'

// Emitted Events
const EMITTED_EVENTS = {
  ON_OPEN: 'onOpen',
  ON_CLOSE: 'onClose',
}

export default defineComponent({
  props: PopoverProps,
  emits: [EMITTED_EVENTS.ON_OPEN, EMITTED_EVENTS.ON_CLOSE],
  setup (props: Readonly<PopoverInputProperties>, { emit }: SetupContext): PopoverOutputProperties {
    /*
     * **********************
     * *** Internal State ***
     * **********************
     */

    // Internal flag, is overrided by props.isOpen if exist
    const internalIsOpen = ref(false)

    // Flag to identify if a click outside of the trigger and content has happened
    const clickOutsideTriggered = ref(false)

    // Flag to initial scroll and resize event only once per component instance
    const windowEventListenerAttached: Ref<boolean> = ref(false)

    // Intersection Observer instance to keep track of the visibility of the trigger
    const intersectionObserver: Ref<IntersectionObserver | undefined> = ref()

    // Dom Reference for the trigger
    const poppupTriggerRef: Ref<HTMLElement | null> = ref(null)

    // Dom Reference for the content
    const poppupContentRef: Ref<HTMLElement | null> = ref(null)

    const isOpen: Ref<boolean> = ref(false)

    /*
     * *************************
     * *** Private Functions ***
     * *************************
     */

    // ...
    const clickOutsideObserver = (event: MouseEvent) => {
      event.stopPropagation()
      const element = event.target as HTMLElement
      const clickInPopover = element.classList.contains('popover-content') || element.closest('.popover-content') === poppupContentRef.value
      const clickOutsidePopover = element.closest('.popover-content') === null
      const clickInTrigger = element.closest('.popover-trigger') === poppupTriggerRef.value

      if (poppupContentRef.value && (poppupContentRef.value.getAttribute('data-nested-open') !== '1' || clickOutsidePopover)) {
        clickOutsideTriggered.value = isOpen.value && !(clickInPopover || clickInTrigger)
      }
    }

    const positionPopover = (): void => {
      if (isOpen.value && poppupTriggerRef.value && poppupContentRef.value) {
        doPositionPopover(poppupTriggerRef.value, poppupContentRef.value, props.anchor, props.offset, props.nested)
      }
    }

    const delay: Ref<boolean> = ref(false)
    const delayedPositionPopover = (): void => {
      if (!delay.value) {
        delay.value = true
        setTimeout(() => {
          delay.value = false
          positionPopover()
        }, props.eventListenerDelay)
      }
    }

    const closePopover = (): void => {
      document.removeEventListener('click', clickOutsideObserver)
      if (!hasValue(props.open)) {
        isOpen.value = false
      }
      document.removeEventListener('scroll', delayedPositionPopover, true)
      window.removeEventListener('resize', delayedPositionPopover)
      windowEventListenerAttached.value = false
      if (props.nested && poppupTriggerRef.value) {
        const parentContent = poppupTriggerRef.value.parentElement && poppupTriggerRef.value.parentElement.closest('.popover-content')

        if (parentContent) {
          parentContent.setAttribute('data-nested-open', '0')
        }
      }
    }
    const openPopover = (): void => {
      if (!hasValue(props.open)) {
        isOpen.value = true
      }

      document.body.addEventListener('click', clickOutsideObserver)
      if (poppupTriggerRef.value && props.nested) {
        const parentContent = poppupTriggerRef.value.parentElement && poppupTriggerRef.value.parentElement.closest('.popover-content')

        if (parentContent) {
          parentContent.setAttribute('data-nested-open', '1')
        }
      }
    }

    const autoCloseTimeout = ref(0)
    const togglePopover = (interactive?: boolean, keepOpen?: boolean) => (event: MouseEvent): void => {
      if (isOpen.value && !interactive) {
        if (hasValue(props.open)) {
          emit(EMITTED_EVENTS.ON_CLOSE)
        } else {
          closePopover()
        }
      } else if (hasValue(props.open)) {
        emit(EMITTED_EVENTS.ON_OPEN)
      } else {
        openPopover()
      }
    }

    onMounted(() => {
      isOpen.value = Boolean(props.open)

      if (props.on === 'click' && poppupTriggerRef.value !== null) {
        poppupTriggerRef.value.addEventListener('click', togglePopover())
      } else if (props.on === 'hover' && poppupTriggerRef.value !== null) {
        poppupTriggerRef.value.addEventListener('mouseenter', togglePopover())
        poppupTriggerRef.value.addEventListener('mouseleave', togglePopover(props.interactive))
      }
    })

    const initialize = (): void => {
      clickOutsideTriggered.value = false
      if (!intersectionObserver.value) {
        intersectionObserver.value = createObserver(poppupTriggerRef.value, (isIntersecting: boolean) => {
          if (!isIntersecting) {
            clickOutsideTriggered.value = true
          }
        })
      }

      nextTick(() => {
        positionPopover()

        if (!windowEventListenerAttached.value) {
          document.addEventListener('scroll', delayedPositionPopover, true)
          window.addEventListener('resize', delayedPositionPopover)
          windowEventListenerAttached.value = true
        }
      })
    }

    const destroy = (): void => {
      intersectionObserver.value && intersectionObserver.value.disconnect()
      intersectionObserver.value = undefined
    }

    /*
     * ****************
     * *** Watchers ***
     * ****************
     */

    watch(() => [clickOutsideTriggered.value], ([newValue]: boolean[]) => {
      if (newValue) {
        if (hasValue(props.open)) {
          emit(EMITTED_EVENTS.ON_CLOSE)
        } else {
          closePopover()
        }
      }
    })

    watch(() => [props.open], ([nexExtOpen]: boolean[], [oldExtOpen]: boolean[]) => {
      if (nexExtOpen !== oldExtOpen) {
        isOpen.value = Boolean(nexExtOpen)
        if (nexExtOpen) {
          openPopover()
        } else {
          closePopover()
        }
      }
    })

    watch(() => [isOpen.value], ([nexExtOpen]: boolean[]) => {
      if (nexExtOpen) {
        initialize()
      } else {
        destroy()
      }
    })

    return {
      isOpen,
      poppupContentRef,
      poppupTriggerRef,
    }
  },
})
</script>

<style lang="scss" scopped>
.popover-trigger {
  z-index: 0;
  display: inline-flex;
}

.popover-content {
  display: inline-flex;
  background: $primary-white;
  box-shadow: rgba(0, 0, 0, 0.16) 0 3px 6px, rgba(0, 0, 0, 0.23) 0 3px 6px;
  padding: 8px;
  border-radius: 3px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
}
</style>
