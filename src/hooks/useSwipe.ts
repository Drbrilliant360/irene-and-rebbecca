import { useRef, type PointerEvent } from 'react'

/**
 * Horizontal swipe for touch screens. Spread the returned handlers on the swipe area.
 * A swipe is a mostly-horizontal drag of at least 50px; taps and vertical scrolls are ignored.
 */
export function useSwipe(onLeft: () => void, onRight: () => void) {
  const start = useRef<{ x: number; y: number } | null>(null)

  return {
    onPointerDown: (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') start.current = { x: e.clientX, y: e.clientY }
    },
    onPointerUp: (e: PointerEvent) => {
      const s = start.current
      start.current = null
      if (!s) return
      const dx = e.clientX - s.x
      const dy = e.clientY - s.y
      if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy) * 1.5) return
      if (dx < 0) onLeft()
      else onRight()
    },
    onPointerCancel: () => {
      start.current = null
    },
  }
}
