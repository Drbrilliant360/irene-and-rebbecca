import { useEffect, useRef, type RefObject } from 'react'

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * Keeps Tab focus inside `ref` while `active`, closes on Escape, locks page scroll,
 * and returns focus to the previously focused element when released.
 */
export function useFocusTrap(
  ref: RefObject<HTMLElement>,
  active: boolean,
  onClose: () => void,
  /** Return false to skip restoring focus (e.g. when a link moved focus elsewhere). */
  shouldRestoreFocus: () => boolean = () => true,
) {
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose
  const restoreRef = useRef(shouldRestoreFocus)
  restoreRef.current = shouldRestoreFocus

  useEffect(() => {
    const container = ref.current
    if (!active || !container) return

    const previous = document.activeElement as HTMLElement | null
    const focusables = () => Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE))
    focusables()[0]?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onCloseRef.current()
        return
      }
      if (e.key !== 'Tab') return
      const items = focusables()
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = overflow
      if (restoreRef.current()) previous?.focus({ preventScroll: true })
    }
  }, [ref, active])
}
