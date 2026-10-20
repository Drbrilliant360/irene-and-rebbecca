import { AnimatePresence, m, useReducedMotion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { fill } from '../../content/LocaleProvider'
import type { ImageContent } from '../../content/types'
import { useFocusTrap } from '../../hooks/useFocusTrap'
import { SafeImage } from './SafeImage'
import { ChevronLeft, ChevronRight, Close } from './Icon'

interface LightboxProps {
  images: ImageContent[]
  index: number
  onIndexChange: (index: number) => void
  onClose: () => void
  labels: { label: string; close: string; prev: string; next: string; counter: string }
}

const controlClass =
  'inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 focus-visible:bg-white/25'

/** Modal photo viewer: focus trapped, Esc closes, ←/→ change photo. Loaded on demand. */
export default function Lightbox({ images, index, onIndexChange, onClose, labels }: LightboxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  useFocusTrap(ref, true, onClose)

  const total = images.length
  const go = (delta: number) => onIndexChange((index + delta + total) % total)
  const image = images[index]

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') onIndexChange((index + 1) % total)
      if (e.key === 'ArrowLeft') onIndexChange((index - 1 + total) % total)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [index, total, onIndexChange])

  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label={labels.label}
      className="fixed inset-0 z-[70] flex flex-col bg-blue-900/95 p-4 sm:p-8"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="flex items-center justify-between gap-4 text-white">
        <p aria-live="polite" className="font-bold">
          {fill(labels.counter, { n: index + 1, total })}
        </p>
        <button type="button" onClick={onClose} aria-label={labels.close} className={controlClass}>
          <Close aria-hidden="true" className="h-6 w-6" />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center gap-2 py-4 sm:gap-6">
        <button type="button" onClick={() => go(-1)} aria-label={labels.prev} className={controlClass}>
          <ChevronLeft aria-hidden="true" className="h-7 w-7" />
        </button>
        <AnimatePresence mode="wait" initial={false}>
          <m.figure
            key={image.src}
            className="flex max-h-full min-h-0 flex-1 flex-col items-center justify-center"
            initial={reduce ? false : { opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <SafeImage
              {...image}
              priority
              className="max-h-[70vh] w-auto max-w-full rounded-2xl object-contain shadow-lift"
            />
            {image.caption && <figcaption className="mt-4 text-center text-lg font-bold text-white">{image.caption}</figcaption>}
          </m.figure>
        </AnimatePresence>
        <button type="button" onClick={() => go(1)} aria-label={labels.next} className={controlClass}>
          <ChevronRight aria-hidden="true" className="h-7 w-7" />
        </button>
      </div>
    </div>
  )
}
