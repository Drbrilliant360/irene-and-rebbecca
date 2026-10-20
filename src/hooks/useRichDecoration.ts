import { useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface NetworkInformation {
  saveData?: boolean
  effectiveType?: string
}

/**
 * True when it's reasonable to load heavier decoration (the Three.js hero):
 * a wide screen, a fine pointer, no reduced-motion or data-saver preference, a fast-ish
 * connection, enough memory (where the browser reports it) and WebGL. Becomes true only after the page is idle, so it
 * never competes with the first paint. Most phones on mobile data never load it.
 */
export function useRichDecoration() {
  const reduce = useReducedMotion()
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (reduce) return
    const nav = navigator as Navigator & { connection?: NetworkInformation; deviceMemory?: number }
    const connection = nav.connection
    const capable =
      window.matchMedia('(min-width: 768px) and (pointer: fine)').matches &&
      !connection?.saveData &&
      !/(^|-)2g$/.test(connection?.effectiveType ?? '') &&
      (nav.deviceMemory ?? 4) >= 4 &&
      hasWebGL()
    if (!capable) return

    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1200))
    const cancel = window.cancelIdleCallback ?? window.clearTimeout
    const id = idle(() => setEnabled(true))
    return () => cancel(id)
  }, [reduce])

  return enabled
}

function hasWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  } catch {
    return false
  }
}
