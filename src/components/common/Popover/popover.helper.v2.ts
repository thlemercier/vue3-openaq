/**
 *********************
 * HELPERS
 *********************
 */

import { Anchors, AnchorType } from './Popover.types'

/**
 * @param {HTMLElement} el The HTML Element
 * @returns {number} The HTML Element height, including margin top and bottom
 */
const getHeight = (element: HTMLElement): number => {
  const styles = window.getComputedStyle(element)
  const { marginTop, marginBottom } = styles

  return element.offsetHeight + parseInt(marginTop, 10) + parseInt(marginBottom, 10)
}

/**
 * @param {HTMLElement} el The HTML Element
 * @returns {number} The HTML Element width, including margin left and right
 */
const getWidth = (element: HTMLElement): number => {
  const styles = window.getComputedStyle(element)
  const { marginLeft, marginRight } = styles

  return element.offsetWidth + parseInt(marginLeft, 10) + parseInt(marginRight, 10)
}

/**
 * @param {HTMLElement} el The HTML Element
 * @returns {number} The HTML Element viewport top position using getBoundingClientRect
 */
const getTopPosition = (element: HTMLElement, nested?: boolean): number => {
  if (nested) {
    return element.offsetTop
  }

  return element.getBoundingClientRect().y
}

/**
 * @param {HTMLElement} element The HTML Element
 * @returns {number} The HTML Element viewport left position using getBoundingClientRect
 */
const getLeftPosition = (element: HTMLElement, nested?: boolean): number => {
  if (nested) {
    return element.offsetLeft
  }

  return element.getBoundingClientRect().x
}

/**
 * @returns {number} The viewport width
 */
export const getWindowWidth = (): number => window.innerWidth

/**
 * @returns {number} The viewport height
 */
export const getWindowHeight = (): number => window.innerHeight

/**
 * Execute the given callback when the IntersectionObserverCallback is called by the IntersectionObserver.
 *
 * @param {Function} callback
 * @returns
 */
const handleIntersect = (callback: (isIntersecting: boolean) => void): IntersectionObserverCallback => (entries: IntersectionObserverEntry[]) => {
  entries.forEach(function (entry) {
    callback(entry.isIntersecting)
  })
}

/**
 * Update the transform CSS property of the given element with the new coordinates
 */
const applyCoordinates = (element: HTMLElement, xCoord = 0, yCoord = 0) => {
  element.style.transform = `translate3d(${xCoord}px, ${yCoord}px, 1px)`
}

/**
 *********************
 * COORDS GETTER
 *********************
 */

const AnchorCoords = {
  [Anchors.TOP_LEFT]: {
    get: (triggerEl: HTMLElement, contentEl: HTMLElement, offset = 0, nested = false) => {
      const xCoord = getLeftPosition(triggerEl, nested)
      const yCoord = getTopPosition(triggerEl, nested) - offset - getHeight(contentEl)

      return [xCoord, yCoord]
    },
  },
  [Anchors.TOP_CENTER]: {
    get: (triggerEl: HTMLElement, contentEl: HTMLElement, offset = 0, nested = false) => {
      const xCoord = ((getLeftPosition(triggerEl, nested) + getWidth(triggerEl)) / 2) - (getWidth(contentEl) / 2)
      const yCoord = getTopPosition(triggerEl, nested) - offset - getHeight(contentEl)

      return [xCoord, yCoord]
    },
  },
  [Anchors.TOP_RIGHT]: {
    get: (triggerEl: HTMLElement, contentEl: HTMLElement, offset = 0, nested = false) => {
      const xCoord = getLeftPosition(triggerEl, nested) + getWidth(triggerEl) - getWidth(contentEl)
      const yCoord = getTopPosition(triggerEl, nested) - offset - getHeight(contentEl)

      return [xCoord, yCoord]
    },
  },
  [Anchors.LEFT_CENTER]: {
    get: (triggerEl: HTMLElement, contentEl: HTMLElement, offset = 0, nested = false) => {
      const xCoord = getLeftPosition(triggerEl, nested) - offset - getWidth(contentEl)
      const yCoord = ((getTopPosition(triggerEl, nested) + getHeight(triggerEl)) / 2) - (getHeight(contentEl) / 2)

      return [xCoord, yCoord]
    },
  },
  [Anchors.RIGHT_CENTER]: {
    get: (triggerEl: HTMLElement, contentEl: HTMLElement, offset = 0, nested = false) => {
      const xCoord = getLeftPosition(triggerEl, nested) + getWidth(triggerEl) + offset
      const yCoord = ((getTopPosition(triggerEl, nested) + getHeight(triggerEl)) / 2) - (getHeight(contentEl) / 2)

      return [xCoord, yCoord]
    },
  },
  [Anchors.BOTTOM_LEFT]: {
    get: (triggerEl: HTMLElement, contentEl: HTMLElement, offset = 0, nested = false) => {
      const xCoord = getLeftPosition(triggerEl, nested)
      const yCoord = getTopPosition(triggerEl, nested) + getHeight(triggerEl) + offset

      return [xCoord, yCoord]
    },
  },
  [Anchors.BOTTOM_CENTER]: {
    get: (triggerEl: HTMLElement, contentEl: HTMLElement, offset = 0, nested = false) => {
      const xCoord = ((getLeftPosition(triggerEl, nested) + getWidth(triggerEl)) / 2) - (getWidth(contentEl) / 2)
      const yCoord = (getTopPosition(triggerEl, nested) + getHeight(triggerEl) + offset)

      return [xCoord, yCoord]
    },
  },
  [Anchors.BOTTOM_RIGHT]: {
    get: (triggerEl: HTMLElement, contentEl: HTMLElement, offset = 0, nested = false) => {
      const xCoord = getLeftPosition(triggerEl, nested) + getWidth(triggerEl) - getWidth(contentEl)
      const yCoord = getTopPosition(triggerEl, nested) + getHeight(triggerEl) + offset

      return [xCoord, yCoord]
    },
  },
}

/**
 * Get the closest parent BoundingClientRect that has an overflow content (scrollable parent).
 * If no scrollable parent has been found, use the window.
 *
 * @returns [ x, y, width, height ]
 */
const getClosestParentWithOverflowClientRect = (element: HTMLElement) => {
  let closestParent = element.parentElement

  while (closestParent && (closestParent?.clientWidth < element.clientWidth || closestParent?.clientHeight < element.clientHeight)) {
    closestParent = closestParent.parentElement
  }

  let x = 0
  let y = 0
  let width = getWindowWidth()
  let height = getWindowHeight()

  if (closestParent) {
    console.log('closestParent', closestParent)
    x = closestParent.getBoundingClientRect().x
    y = closestParent.getBoundingClientRect().y
    width = closestParent.getBoundingClientRect().width
    height = closestParent.getBoundingClientRect().height
  }

  return [x, y, width, height]
}

const detectLeftOverflow = (childX: number, parentX: number) => childX < parentX
const detectRightOverlow = (childX: number, childWidth: number, parentX: number, parentWidth: number) => (
  (childX + childWidth) > (parentX + parentWidth)
)
const detectTopOverlow = (childY: number, parentY: number) => childY < parentY
const detectBottomOverflow = (childY: number, childHeight: number, parentY: number, parentHeight: number) => (
  (childY + childHeight) > (parentY + parentHeight)
)

const handleOverflow = (contentEl: HTMLElement, nested: boolean, nestedXCoord: number, nestedYCoord: number) => {
  const { x: clRectX, y: clRectY } = contentEl.getBoundingClientRect()
  let xCoord = nested ? nestedXCoord : clRectX
  let yCoord = nested ? nestedYCoord : clRectY
  let redraw = false

  const [parentX, parentY, parentWidth, parentHeight] = getClosestParentWithOverflowClientRect(contentEl)

  if (detectLeftOverflow(clRectX, parentX)) {
    if (nested) {
      xCoord = xCoord - (clRectX - parentX)
    } else {
      xCoord = parentX
    }
    redraw = true
  } else if (detectRightOverlow(clRectX, getWidth(contentEl), parentX, parentWidth)) {
    if (nested) {
      xCoord = xCoord - (clRectX + getWidth(contentEl) - (parentX + parentWidth))
    } else {
      xCoord = (parentX + parentWidth) - getWidth(contentEl)
    }
    redraw = true
  }

  if (detectTopOverlow(clRectY, parentY)) {
    if (nested) {
      yCoord = yCoord - (clRectY - parentY)
    } else {
      yCoord = parentY
    }
    redraw = true
  } else if (detectBottomOverflow(clRectY, getHeight(contentEl), parentY, parentHeight)) {
    if (nested) {
      yCoord = yCoord - (clRectY + getHeight(contentEl) - (parentY + parentHeight))
    } else {
      yCoord = (parentY + parentHeight) - getHeight(contentEl)
    }
    redraw = true
  }

  if (redraw) {
    applyCoordinates(contentEl, xCoord, yCoord)
  }
}

/**
 *********************
 * EXPORTED FUNCTION
 *********************
 */

/**
 * Apply the given anchor placement of the contentEl relatively to the triggerEl
 *
 * @param {HTMLElement} triggerEl The HTML trigger Element
 * @param {HTMLElement} contentEl The HTML content Element
 * @param {AnchorOptions} anchor The anchor position, must be one of the AnchorOptions
 * @param {number} offset The offset to apply
 */
export const doPositionPopover = (
  triggerEl: HTMLElement,
  contentEl: HTMLElement,
  anchor: AnchorType | undefined = Anchors.BOTTOM_LEFT,
  offset: number | undefined = 0,
  nested: boolean | undefined = false,
): void => {
  const coords = AnchorCoords[anchor].get(triggerEl, contentEl, offset, nested)

  applyCoordinates(contentEl, coords[0], coords[1])

  handleOverflow(contentEl, nested, coords[0], coords[1])
}

/**
 * Provides a way to asynchronously observe changes in the intersection of a target element with a top-level document's viewport.
 *
 * @param triggerEl
 * @param callback
 * @returns
 */
export const createObserver = (triggerEl: HTMLElement | null, callback: (isIntersecting: boolean) => void): IntersectionObserver | undefined => {
  if (!triggerEl) {
    return undefined
  }

  // Options to declare the viewport as our reference for the intersection
  const options: IntersectionObserverInit = {
    root: null,
    rootMargin: '0px',
    threshold: [0, 1],
  }

  const observer = new IntersectionObserver(handleIntersect(callback), options)

  observer.observe(triggerEl)

  return observer
}
